# Next.js App Router (v15+) - AI Assistant Guidelines

This document contains instructions for AI coding assistants working on this Next.js project. It outlines the required project structure, routing conventions, and best practices based on the official Next.js documentation.

## 1. Project Structure & Colocation

*   **App Router**: Always use the `app` directory for routing. Do not use the `pages` directory.
*   **Top-Level Folders**:
    *   `app/`: Application code and routing.
    *   `public/`: Static assets (images, fonts, etc.).
*   **Colocation Strategy**: You may safely store project files (components, styles, tests) directly inside route segments within the `app` directory. A route is only publicly accessible if a `page.tsx` or `route.ts` is present.
*   **Private Folders**: Use an underscore prefix (`_folderName`) to opt a folder out of routing entirely (e.g., `_components`, `_lib`). This is useful for separating UI logic from routing logic.
*   **Route Groups**: Use parentheses (`(folderName)`) to organize routes logically without affecting the URL path (e.g., `(marketing)`, `(shop)`). Useful for opting specific segments into a layout or creating multiple root layouts.

## 2. File Conventions in `app/`

Use the following special file names for routing and UI behavior:

*   `page.tsx`: Defines the unique UI for a route and makes it publicly accessible.
*   `layout.tsx`: Shared UI for a segment and its children. **Must** accept a `children` prop. The Root Layout (`app/layout.tsx`) is required and must contain `<html>` and `<body>` tags.
*   `loading.tsx`: Loading UI (React Suspense boundary) for a route.
*   `error.tsx`: Error UI (React Error Boundary) for a route.
*   `not-found.tsx`: "Not found" UI.
*   `route.ts`: API endpoint.
*   `template.tsx`: Similar to layout, but creates a new instance (re-renders) on navigation.

## 3. Dynamic Routes & Parameters

*   **Dynamic Segments**: Create dynamic routes by wrapping a folder name in square brackets, e.g., `app/blog/[slug]/page.tsx`.
*   **Accessing Params**: In Server Components, access dynamic route parameters via the `params` prop.
    *   *Note: In modern Next.js, `params` is a Promise.*
    ```tsx
    export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
      const { slug } = await params;
      return <h1>{slug}</h1>;
    }
    ```

## 4. Search Parameters (Query Strings)

*   **Server Components**: Use the `searchParams` prop in `page.tsx` to read query strings.
    *   *Note: Using `searchParams` opts the page into dynamic rendering. In modern Next.js, `searchParams` is a Promise.*
    ```tsx
    export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
      const { query } = await searchParams;
    }
    ```
*   **Client Components**: Use the `useSearchParams` hook for client-side search parameter reading. Use `new URLSearchParams(window.location.search)` in event handlers to avoid re-renders.

## 5. Linking and Navigating Optimization

*   **`<Link>` Component**: Always use `<Link>` from `next/link` for internal navigation. It automatically provides:
    *   **Prefetching**: Loads route data in the background when links enter the viewport.
    *   **Client-side transitions**: Replaces content dynamically without full page reloads, keeping state and shared layouts intact.
    ```tsx
    import Link from 'next/link';
    <Link href="/dashboard">Dashboard</Link>
    ```
*   **Prefetching Behavior**:
    *   **Static routes** are fully prefetched.
    *   **Dynamic routes** are partially prefetched (only fetching shared layouts and `loading.tsx` boundaries).
    *   Disable prefetching for large lists (e.g., infinite scroll) using `<Link href="..." prefetch={false}>`.
*   **Streaming & Skeletons**: Always include `loading.tsx` in dynamic routes. It enables partial prefetching, immediate client-side navigation, and shows a `<Suspense>` fallback UI while the server renders the page.
*   **Slow Networks & UX**: Use the `useLinkStatus()` hook from `next/link` to detect and display loading indicators when a navigation is `pending`.
*   **Native History API (No Reloads)**: Use `window.history.pushState` or `window.history.replaceState` in Client Components to update search params or URL without navigation. This automatically syncs with Next.js hooks (`usePathname`, `useSearchParams`).
    ```tsx
    // Example: Updating sorting parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', 'asc');
    window.history.pushState(null, '', `?${params.toString()}`);
    ```
*   **Programmatic Navigation**: Use the `useRouter` hook from `next/navigation` in Client Components for complex routing logic.

## 6. Metadata & SEO

*   Place `favicon.ico`, `icon.png`, `apple-icon.png`, `opengraph-image.png`, and `twitter-image.png` inside the `app/` directory to automatically configure metadata images.
*   Use `sitemap.ts` and `robots.ts` in the `app/` directory to generate SEO files dynamically.

## 7. Global Types Helper

*   Use `PageProps` and `LayoutProps` generic types (automatically generated globally by Next.js) for typed component props:
    ```tsx
    export default async function Page(props: PageProps<'/blog/[slug]'>) {}
    ```

## 8. Server and Client Components

Next.js uses React Server Components by default. Use Client Components only when client-side interactivity is required.

*   **Server Components (Default)**:
    *   **Use cases**: Fetching data, accessing backend resources directly, keeping secrets (e.g., API keys), and reducing client JavaScript bundle size.
    *   *Rule*: Never use React hooks (`useState`, `useEffect`) or browser APIs (`window`, `localStorage`) in Server Components.
*   **Client Components (`"use client"`)**:
    *   **Use cases**: Interactivity (`onClick`, `onChange`), state management, lifecycle effects, browser-only APIs, and custom React hooks.
    *   *Rule*: Add the `"use client"` directive at the very top of the file, above all imports.
*   **Interleaving Components**:
    *   You can safely pass Server Components as props (usually via `children`) to Client Components.
    *   *Rule*: Do **not** import a Server Component directly into a Client Component. Instead, render the Client Component in a parent Server Component and pass the Server Component as a `children` prop.
*   **Context Providers**:
    *   React Context is not supported in Server Components.
    *   *Rule*: Create a dedicated Client Component (e.g., `theme-provider.tsx` with `"use client"`) that returns `<Context.Provider>{children}</Context.Provider>`. Import this provider into your Server Component (like `layout.tsx`) and wrap it around the children.
*   **Third-Party Components**:
    *   If a third-party UI component uses client features but lacks the `"use client"` directive, wrap it in a local Client Component file before using it inside a Server Component.
*   **Environment Poisoning Prevention**:
    *   Use the `server-only` package (by adding `import 'server-only';` at the top of the file) in modules containing sensitive server logic or secrets to ensure they cause a build error if accidentally imported into a Client Component.

## 9. Fetching Data & Streaming

Next.js provides powerful ways to fetch, cache, and stream data.

*   **Server Component Fetching (Preferred)**:
    *   **Direct API/DB Access**: You can directly use `fetch()` or query a database/ORM securely within Server Components since they never ship to the client.
    *   **Sequential vs Parallel**: To avoid waterfalls (sequential fetching), trigger all promises first, then `await Promise.all([promise1, promise2])` for parallel fetching.
*   **Memoization & Reusing Data**:
    *   **`fetch` Memoization**: Native `fetch` requests are automatically memoized during a render pass. You can call the same `fetch` in multiple components without duplicate network requests.
    *   **`React.cache`**: For non-fetch operations (like ORM queries) that you want to share across components during the same request, wrap the function in `React.cache(async () => {...})`.
*   **Streaming & Suspense**:
    *   **Route-Level**: Use `loading.tsx` to wrap an entire route in a Suspense boundary.
    *   **Granular-Level (Preferred)**: Wrap specific slow components in `<Suspense fallback={<Skeleton />}>` to stream them individually. This allows the fast parts of the page to load instantly while the slower data fetches stream in.
*   **Client Component Fetching**:
    *   **React `use` API**: You can fetch data (a Promise) in a Server Component, pass it as a prop to a Client Component, and resolve it there using `use(promise)`.
    *   **SWR / React Query**: For purely client-side fetching (e.g., polling, infinite scrolling), rely on community libraries like SWR or React Query.

## 10. Caching & Partial Prerendering (Cache Components)

Next.js (with `cacheComponents: true` enabled in `next.config.ts`) uses an advanced rendering model based on **Partial Prerendering (PPR)** and the `"use cache"` directive.

*   **The `"use cache"` Directive**:
    *   **Data-Level**: Add `"use cache"` at the top of an async data-fetching function to cache its result.
    *   **UI-Level**: Add `"use cache"` at the top of a Server Component to cache its entire rendered output.
    *   *Rule*: Selalu pasangkan `"use cache"` dengan `cacheLife('profile')` (contoh: `cacheLife('hours')`) untuk menentukan masa kedaluwarsa cache.
*   **Static Shell & `<Suspense>`**:
    *   By default, Next.js prerenders as much of the page as possible into a **Static Shell**.
    *   **Uncached Data**: Any component that fetches dynamic, uncached data **must** be wrapped in a `<Suspense>` boundary. If not, it will block the static shell from prerendering (triggering a `blocking-route` error).
*   **Runtime APIs (Cookies, Headers, SearchParams)**:
    *   Reading `cookies()`, `headers()`, or `searchParams` makes a component dynamic.
    *   *Rule*: You **must** wrap any component reading runtime APIs in a `<Suspense>` boundary. The fallback UI becomes part of the static shell, while the actual content streams in at request time.
    *   *Alternative*: Extract the runtime value (e.g., `sessionId` from cookies) in a non-cached component and pass it as a prop to a `<CachedContent>` component that uses `"use cache"`. The prop automatically becomes part of the cache key.
*   **Random Values & Timestamps**:
    *   Using `Math.random()`, `Date.now()`, or `crypto.randomUUID()` blocks prerendering.
    *   *Rule*: To generate a unique value per request, call `await connection()` from `next/server` before the random function, and wrap the component in `<Suspense>`.
*   **Runtime Prefetching**:
    *   When you use `<Link prefetch={true}>`, Next.js will perform a **runtime prerender** of the destination URL (including its specific `searchParams`), making the transition completely instant.

## 11. Revalidating (Cache Invalidation)

When using `"use cache"`, you need strategies to update the cached data so users don't see stale content indefinitely.

*   **Time-Based Revalidation (`cacheLife`)**:
    *   Use `cacheLife('profile')` directly below `"use cache"` to set time-based expiration.
    *   *Profiles*: `'seconds'`, `'minutes'`, `'hours'`, `'days'`, `'weeks'`, `'max'`, `'default'`.
    *   *Note*: A short-lived cache (like `'seconds'`) is automatically excluded from the prerendered static shell.
*   **Tagging Caches (`cacheTag`)**:
    *   Use `cacheTag('my-tag')` inside a `"use cache"` function to label the cache entry so it can be invalidated on-demand later.
*   **On-Demand Revalidation (Server Actions / Route Handlers)**:
    *   **`revalidateTag('my-tag', 'max')`**: Uses *stale-while-revalidate*. The user immediately gets the stale content while Next.js fetches fresh data in the background. Use this for background refreshes (e.g., blog posts, product catalog).
    *   **`updateTag('my-tag')`**: *Server Actions ONLY*. Immediately expires the cache. Use this for **read-your-own-writes** scenarios where the user must see their changes instantly after submitting a form (e.g., adding a comment, updating profile).
    *   **`revalidatePath('/path')`**: Invalidates all cache on a specific route. *Rule*: Prefer using tags (`revalidateTag` or `updateTag`) over paths because tags are more precise and prevent over-invalidation.

## 12. Error Handling

Next.js separates errors into **Expected Errors** (like failed validation) and **Uncaught Exceptions** (bugs/crashes).

*   **Expected Errors**:
    *   **Server Actions**: Do **not** use `try/catch` to throw errors to the client. Instead, return the error as an object (e.g., `{ message: 'Failed' }`) and handle it in the Client Component using the `useActionState` hook.
    *   **Server Components**: If a fetch fails, conditionally render a fallback UI directly or use the `redirect()` function.
    *   **Not Found (404)**: Call the `notFound()` function from `next/navigation` when a resource doesn't exist. This will automatically render the nearest `not-found.tsx` file.
*   **Uncaught Exceptions (Bugs)**:
    *   **`error.tsx`**: Creates a React Error Boundary. *Rule*: Must always be a Client Component (`"use client"`). It catches rendering errors from any child component and shows a fallback UI instead of crashing the app.
    *   **Component-Level Boundaries**: Use the `catchError` function from `next/error` to create granular error boundaries that wrap specific parts of a page instead of the entire route.
    *   **Global Errors**: `global-error.tsx` is used for errors in the Root Layout. *Rule*: Because it replaces the root layout when active, it **must** include its own `<html>` and `<body>` tags.
*   **Client Event Handlers**:
    *   React Error Boundaries (`error.tsx`) **do not** catch errors inside `onClick` or other event handlers. You must use a standard `try...catch` and store the error in `useState` to show it to the user.
    *   *Alternative*: If you wrap the failing code inside `startTransition` (from `useTransition`), the error *will* bubble up to the nearest `error.tsx` boundary.

## 13. CSS & Styling

Next.js provides multiple ways to style your application, but has specific recommendations for optimal performance and predictability.

*   **Tailwind CSS (Primary Recommendation)**:
    *   Use Tailwind CSS utility classes as your primary styling method for almost all components. It avoids naming collisions and keeps bundle sizes small.
*   **CSS Modules (For Scoped Custom CSS)**:
    *   When Tailwind isn't enough (e.g., complex animations or highly custom layouts), use CSS Modules (`filename.module.css`).
    *   *Rule*: Always use a consistent naming convention like `<name>.module.css` over `<name>.tsx` to keep styles scoped to the specific component without leaking.
*   **Global CSS**:
    *   *Rule*: Only use Global CSS (`globals.css`) for **truly global** styles (like Tailwind base directives, typography resets, or `body` styling).
    *   **Warning**: Never use Global CSS for component-specific styles. Next.js does not remove stylesheets when navigating between routes, which will cause styling conflicts if component styles are leaked globally.
*   **CSS Ordering & Import Rules**:
    *   CSS chunking in production is based on your **import order** in JavaScript/TypeScript.
    *   *Rule*: To avoid unpredictable styling, **do not** use linters or formatters that automatically sort your imports (like ESLint's `sort-imports`).
    *   Import global styles and Tailwind stylesheets exclusively at the root layout.

## 14. Image Optimization

Next.js provides a built-in `<Image>` component from `next/image` designed to automatically optimize images (WebP), lazy load, and prevent Cumulative Layout Shift (CLS).

*   **Using `next/image`**:
    *   *Rule*: Always use `<Image>` instead of the standard HTML `<img>` tag.
*   **Local Images (Static Import)**:
    *   Import images statically when possible (e.g., `import profilePic from './profile.png'`).
    *   Next.js will automatically infer the `width`, `height`, and a `blurDataURL` for a blur-up placeholder effect.
*   **Local Images (`public` Folder)**:
    *   You can put images in the `public/` directory and reference them starting with `/` (e.g., `src="/logo.png"`).
    *   *Rule*: If you use a string `src` for a local image, you **must** manually specify `width` and `height` properties.
*   **Dynamic Local Imports**:
    *   If you need to dynamically render local images in a Server Component, use `await import('@/path/to/image')` so you can still get the automatic `width`, `height`, and `blurDataURL` values.
*   **Remote Images**:
    *   When using remote URLs (e.g., from AWS S3 or a CMS), you **must** manually specify `width` and `height` (or use the `fill` property).
    *   *Rule*: Remote images require explicit permission. You must configure `remotePatterns` inside `next.config.ts` with strict matching (protocol, hostname, pathname) to prevent malicious domains.

## 15. Font Optimization

Next.js automatically optimizes web fonts (including Google Fonts) and self-hosts them at build time using the `next/font` module. This completely eliminates external network requests and prevents Layout Shifts (CLS).

*   **Google Fonts (`next/font/google`)**:
    *   Import Google Fonts directly from `next/font/google`. Next.js downloads them during the build process and serves them from your domain.
    *   *Rule*: Prefer variable fonts for the best performance. If a font is not variable, you **must** specify its `weight` array. Always specify `subsets` (e.g., `['latin']`).
*   **Local Fonts (`next/font/local`)**:
    *   Use `localFont` from `next/font/local` for custom downloaded fonts (e.g., `.woff2` files).
    *   *Rule*: The `src` path must be relative to the file where `localFont` is called. It can also accept an array of objects to map multiple font weights/styles to a single family.
*   **Applying Fonts**:
    *   Call the font function and use the `.className` or `.variable` property on your HTML element. To apply it globally, attach it to the `<html>` or `<body>` tag inside your Root Layout (`layout.tsx`).

## 16. Metadata and OG Images

Next.js provides powerful APIs to define SEO metadata and dynamically generate Open Graph (OG) images. 

*   **Static Metadata**:
    *   Export a `metadata` object from a `layout.tsx` or `page.tsx`.
    *   *Rule*: This is only supported in Server Components.
*   **Dynamic Metadata (`generateMetadata`)**:
    *   Export an `async function generateMetadata({ params, searchParams })` to fetch data for SEO tags dynamically.
    *   *Rule*: `params` and `searchParams` are now **Promises** in Next.js 15+ and must be `await`-ed before use.
*   **Memoizing Data Requests**:
    *   If both `generateMetadata` and the `Page` component need the same data (e.g., fetching a blog post), wrap the fetch function in React's `cache` so the database/API is only queried once during the render pass.
*   **File-Based Metadata**:
    *   You can place `favicon.ico`, `opengraph-image.jpg`, or `twitter-image.jpg` directly in any route folder. The deepest image in the folder structure takes precedence.
*   **Generated OG Images (`next/og`)**:
    *   Create an `opengraph-image.tsx` file to dynamically generate images using JSX and CSS.
    *   *Rule*: Use `ImageResponse` from `next/og`. The JSX styling uses a limited subset of CSS (via `satori`), so prefer Flexbox and avoid complex CSS like `display: grid`.

## 17. Route Handlers

Route Handlers (`route.ts`) are the App Router equivalent of API Routes, providing custom request handlers using native Web Request and Response APIs.

*   **File Convention**:
    *   Define API routes using `route.ts`.
    *   *Rule*: You **cannot** have a `route.ts` and a `page.tsx` at the exact same route segment level (e.g., `app/route.ts` and `app/page.tsx` will conflict). Put it in `app/api/route.ts`.
*   **Caching & Prerendering**:
    *   `GET` handlers are prerendered statically if they don't access dynamic data. However, if they access `cookies()`, `headers()`, `Math.random()`, or make network requests, they become dynamic.
    *   **Using `"use cache"` in Route Handlers**: You **cannot** place `"use cache"` directly inside the `GET()` or `POST()` function body. 
    *   *Rule*: To cache data in a Route Handler, you must extract the fetching logic into a separate helper function (e.g., `async function getData() { 'use cache'; ... }`), and call that helper from within your Route Handler.
*   **Typing the Context (`RouteContext`)**:
    *   When using dynamic segments (e.g., `app/api/users/[id]/route.ts`), the `context` parameter can be typed with the globally available `RouteContext` helper.
    *   *Rule*: Just like in Pages, `params` inside the `context` is a **Promise** and must be `await`-ed (e.g., `const { id } = await ctx.params`).

## 18. Proxy (Formerly Middleware)

Starting in Next.js 16, **Middleware has been renamed to Proxy**. It runs code before a request is completed to modify the response, rewrite, redirect, or modify headers.

*   **File Convention**:
    *   Create a `proxy.ts` file in the root of the project (or inside `src` if using a `src` directory), at the same level as the `app` directory.
    *   *Rule*: Do **not** create `middleware.ts`. Do **not** place `proxy.ts` inside the `app` directory. There can only be **one** `proxy.ts` file per project.
*   **Exporting**:
    *   Export a function either as `export function proxy(request: NextRequest)` or `export default function proxy(request: NextRequest)`.
*   **Matcher**:
    *   Use `export const config = { matcher: '/path/:path*' }` to restrict the Proxy to specific routes.
*   **Limitations**:
    *   *Rule*: Proxy is **not** meant for slow data fetching or complex authorization/session management.
    *   Fetch caching options (`options.cache`, `options.next.revalidate`) have **no effect** inside `proxy.ts`.
