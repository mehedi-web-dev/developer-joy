"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function FramerThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        aria-label="Toggle Dark and Light Mode"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white/90 dark:bg-[#161719]/90 backdrop-blur-xl shadow-2xl cursor-pointer text-xs font-mono font-medium transition-colors text-black dark:text-white"
      >
        {/* Sun Icon */}
        <Sun
          className={`w-3.5 h-3.5 transition-colors ${
            !isDark ? "text-amber-500 fill-amber-500" : "text-zinc-500"
          }`}
        />

        {/* Sliding Pill Indicator Switch */}
        <div className="relative w-8 h-4.5 rounded-full bg-zinc-200 dark:bg-zinc-800 p-0.5 flex items-center">
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`w-3.5 h-3.5 rounded-full shadow-sm ${
              isDark ? "bg-[#c6ff00] ml-auto" : "bg-black mr-auto"
            }`}
          />
        </div>

        {/* Moon Icon */}
        <Moon
          className={`w-3.5 h-3.5 transition-colors ${
            isDark ? "text-[#c6ff00] fill-[#c6ff00]" : "text-zinc-400"
          }`}
        />
      </motion.button>
    </div>
  );
}
