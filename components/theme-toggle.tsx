"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { language, setLanguage } = useLanguage();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex w-full items-center justify-center gap-2 p-2">
        <div className="h-12 w-24 rounded-full bg-muted animate-pulse" />
        <div className="h-12 w-24 rounded-full bg-muted animate-pulse" />
        <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex w-full items-center justify-center gap-2 p-2">
      {/* Language Toggle */}
      <div className="relative flex items-center bg-neutral-200 dark:bg-[#1a1a1a] rounded-full p-1 h-12 w-24 shadow-inner isolation-auto">
        <div
          className={cn(
            "absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-yellow-400 shadow-sm transition-transform duration-300 ease-in-out",
            language === "ID" ? "translate-x-full" : "translate-x-0"
          )}
        />
        <button
          onClick={() => setLanguage("US")}
          className={cn(
            "relative flex-1 flex items-center justify-center h-full rounded-full text-xs font-bold transition-colors z-10",
            language === "US" ? "text-black" : "text-muted-foreground"
          )}
        >
          US
        </button>
        <button
          onClick={() => setLanguage("ID")}
          className={cn(
            "relative flex-1 flex items-center justify-center h-full rounded-full text-xs font-bold transition-colors z-10",
            language === "ID" ? "text-black" : "text-muted-foreground"
          )}
        >
          ID
        </button>
      </div>

      {/* Theme Toggle */}
      <div className="relative flex items-center bg-neutral-200 dark:bg-[#1a1a1a] rounded-full p-1 h-12 w-24 shadow-inner isolation-auto">
        <div
          className={cn(
            "absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white dark:bg-[#333333] shadow-sm transition-transform duration-300 ease-in-out",
            isDark ? "translate-x-full" : "translate-x-0"
          )}
        />
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "relative flex-1 flex items-center justify-center h-full rounded-full transition-colors z-10",
            !isDark ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          <Sun className="h-4 w-4" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "relative flex-1 flex items-center justify-center h-full rounded-full transition-colors z-10",
            isDark ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          <Moon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
