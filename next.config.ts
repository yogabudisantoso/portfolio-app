import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `standalone` is required for the Docker image (the Dockerfile copies .next/standalone).
  // On Vercel, standalone + Next 16.3 triggers a known bug: Turbopack stops emitting
  // .next/next-server.js.nft.json when the Vercel build adapter is active, but the
  // standalone finalize step still reads it → ENOENT in onBuildComplete
  // (see vercel/next.js#96646). Vercel packages the build itself, so disable it there.
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
