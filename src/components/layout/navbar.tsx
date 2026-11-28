"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);
  const [contactHovered, setContactHovered] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Me", href: "/#about" },
    { label: "Web development", href: "/#expectations" },
    { label: "Services", href: "/#services" },
    { label: "Portfolio", href: "/#portfolio-preview" },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    setIsOpen(false);
    if (pathname === "/") {
      if (href === "/" || href === "/#hero") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "/");
        return;
      }
      if (href.startsWith("/#")) {
        e.preventDefault();
        const id = href.replace("/#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", `/#${id}`);
        }
      }
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div ref={navRef} className="relative pointer-events-auto flex flex-col items-center">
        {/* ================= DESKTOP NAVBAR PILL ================= */}
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`hidden lg:flex items-center gap-7 px-5 py-2.5 rounded-full border transition-all duration-300 shadow-2xl backdrop-blur-xl ${
            scrolled
              ? "bg-white/95 dark:bg-[#141517]/95 border-black/15 dark:border-white/15 shadow-black/10 dark:shadow-black/80"
              : "bg-white/90 dark:bg-[#161719]/90 border-black/10 dark:border-white/10"
          }`}
        >
          {/* Monogram J Logo */}
          <Link
            href="/"
            onClick={(e) => handleLinkClick(e, "/")}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:scale-110 transition-transform focus:outline-none"
            aria-label="Home"
          >
            <span className="font-display font-extrabold text-base tracking-tight text-zinc-900 dark:text-white select-none">
              J
            </span>
          </Link>

          {/* Horizontal Desktop Navigation Links with 3D Cube Roll Effect */}
          <div className="flex items-center gap-7 text-[13.5px] font-sans font-medium">
            {navLinks.map((item) => {
              const isHovered = hoveredLink === item.label;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  onMouseEnter={() => setHoveredLink(item.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative flex items-center h-6 overflow-hidden cursor-pointer select-none"
                  style={{ perspective: "1200px" }}
                >
                  <motion.div
                    animate={{ rotateX: isHovered ? -90 : 0 }}
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "50% 0% 0px",
                    }}
                    className="flex flex-col items-center justify-start h-6 leading-6"
                  >
                    {/* Default Front Label */}
                    <span className="h-6 flex items-center text-zinc-600 dark:text-zinc-300 font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                    {/* 3D Rotated Hover Label in Lime Accent */}
                    <span
                      className="h-6 flex items-center text-[#65a30d] dark:text-[#c6ff00] font-bold whitespace-nowrap"
                      style={{
                        transform: "rotateX(90deg)",
                        transformOrigin: "50% 0% 0px",
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Contact Button with Corner-Expanding Lime Circle Fill */}
          <Link
            href="/#contact"
            onClick={(e) => handleLinkClick(e, "/#contact")}
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
            className="relative flex items-center justify-center h-9 px-6 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-semibold tracking-wide transition-all shadow-md ml-1 overflow-hidden select-none cursor-pointer group"
          >
            {/* Expanding Circle Fill from Bottom-Left Corner */}
            <motion.div
              initial={false}
              animate={{
                scale: contactHovered ? 9 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              style={{
                originX: 0,
                originY: 1,
              }}
              className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-[#c6ff00] pointer-events-none z-0"
            />
            <span className="relative z-10 font-semibold text-white dark:text-black group-hover:text-black transition-colors">
              Contact
            </span>
          </Link>
        </motion.nav>

        {/* ================= MOBILE NAVBAR PILL ================= */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`flex lg:hidden items-center justify-between gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border transition-all duration-300 shadow-2xl backdrop-blur-xl max-w-[95vw] ${
            scrolled
              ? "bg-white/95 dark:bg-[#141517]/95 border-black/15 dark:border-white/15 shadow-black/10 dark:shadow-black/80 text-zinc-900 dark:text-white"
              : "bg-white/90 dark:bg-[#161719]/90 border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          }`}
        >
          <Link
            href="/"
            onClick={(e) => handleLinkClick(e, "/")}
            className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-sm text-zinc-900 dark:text-white shrink-0"
          >
            J
          </Link>

          <Link
            href="/#contact"
            onClick={(e) => handleLinkClick(e, "/#contact")}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[11px] sm:text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c6ff00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c6ff00]" />
            </span>
            <span className="truncate">Available for projects</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="w-8 h-8 rounded-full bg-[#c6ff00] text-black flex flex-col items-center justify-center gap-1 cursor-pointer shrink-0"
          >
            {isOpen ? (
              <span className="font-bold text-sm leading-none">✕</span>
            ) : (
              <div className="flex flex-col gap-1 items-center justify-center">
                <span className="block w-3.5 h-[2px] bg-black rounded-full" />
                <span className="block w-3.5 h-[2px] bg-black rounded-full" />
              </div>
            )}
          </button>
        </motion.div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full mt-2 w-64 sm:w-72 bg-white/95 dark:bg-[#131416]/95 backdrop-blur-xl border border-black/10 dark:border-white/15 rounded-3xl p-3.5 shadow-2xl overflow-hidden z-50 text-zinc-900 dark:text-white"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-2xl text-left text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-black hover:bg-[#c6ff00] transition-all"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-40" />
                  </Link>
                ))}
                <Link
                  href="/#contact"
                  onClick={(e) => handleLinkClick(e, "/#contact")}
                  className="mt-2 w-full text-center py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
