"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Clear any old legacy "theme" key from previous dark-mode default session
        const legacyTheme = localStorage.getItem("theme");
        if (legacyTheme) {
          localStorage.removeItem("theme");
        }
      }
    } catch {}
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      storageKey="joy-portfolio-theme"
      enableSystem={false}
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
