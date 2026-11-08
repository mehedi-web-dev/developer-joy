"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Theme = "light" | "dark";

const THEME_EVENT = "developerjoy-theme-change";

const subscribeTheme = (callback: () => void) => {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

const getThemeSnapshot = (): Theme => {
  const savedTheme = localStorage.getItem("theme");

  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
};

const getServerThemeSnapshot = (): Theme => "dark";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

// Sun Icon
const SunIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
  </svg>
);

// Moon Icon
const MoonIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6.5 6.5 0 0 0 8.268 8.268c.344-.215.825-.003.803.401" />
  </svg>
);

// Arrow Icon
const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

const Navbar = () => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Theme State
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const isDark = theme === "dark";

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = theme;
  }, [theme, isDark]);

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme: Theme = isDark ? "light" : "dark";

    localStorage.setItem("theme", newTheme);

    window.dispatchEvent(new Event(THEME_EVENT));
  };

  // Active Route
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Close Menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Outside Click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Escape Key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-divider bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-1 text-2xl font-bold tracking-tight"
        >
          <span className="text-primary">Developer</span>
          <span className="text-foreground">Joy</span>
          <span className="ml-0.5 h-2 w-2 rounded-full bg-primary" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`relative py-2 text-sm font-medium transition-colors duration-300 ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-default-500 hover:text-foreground"
              }`}
            >
              {link.name}

              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Light theme" : "Dark theme"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-all duration-300 hover:bg-default-100 hover:rotate-12"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Desktop Hire Me */}
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30 sm:flex"
          >
            Hire Me
            <ArrowIcon />
          </Link>

          {/* Mobile Menu */}
          <div ref={menuRef} className="relative lg:hidden">
            {/* Hamburger / Cross */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-default-100"
            >
              {isMenuOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
              <nav
                id="mobile-navigation"
                className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-divider bg-background p-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-default-600 hover:bg-default-100 hover:text-foreground"
                      }`}
                    >
                      <span className="text-xs text-default-400">
                        0{index + 1}
                      </span>
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-4 border-t border-divider pt-4">
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                  >
                    Let&apos;s Work Together
                    <ArrowIcon />
                  </Link>
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
