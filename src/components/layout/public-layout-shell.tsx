"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { AnimatedBackground } from "@/components/background";
import { FramerThemeToggle } from "@/components/ui/framer-theme-toggle";

export interface PublicLayoutShellProps {
  children: React.ReactNode;
}

export function PublicLayoutShell({ children }: PublicLayoutShellProps) {
  const pathname = usePathname();
  const isAdminRoute = Boolean(
    pathname && (pathname === "/admin" || pathname.startsWith("/admin/"))
  );

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
      <FramerThemeToggle />
    </>
  );
}
