"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  ChevronRight,
  LogOut,
  User,
  ShieldCheck,
  ChevronDown,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface AdminTopbarProps {
  onToggleMobile: () => void;
  adminEmail?: string;
  adminName?: string;
}

export default function AdminTopbar({
  onToggleMobile,
  adminEmail = "admin@developerjoy.com",
  adminName = "Administrator",
}: AdminTopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  // Derive breadcrumbs and page title from pathname
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== "admin");

  const pageTitle =
    segments.length === 0 || segments[0] === "dashboard"
      ? "CMS Dashboard"
      : segments[0].charAt(0).toUpperCase() + segments[0].slice(1);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-[#0B0F19]/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Left side: Mobile Toggle & Breadcrumbs & Title */}
      <div className="flex items-center gap-3.5">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onToggleMobile}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        {/* Title and Breadcrumbs */}
        <div className="flex flex-col justify-center">
          <div className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
            <Link
              href="/admin/dashboard"
              className="hover:text-slate-200 transition-colors"
            >
              Admin
            </Link>
            <ChevronRight size={13} className="text-slate-600" />
            <span className="font-medium text-slate-300">
              {segments.length === 0 ? "Dashboard" : segments.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" / ")}
            </span>
          </div>
          <h1 className="text-base font-bold text-slate-100 sm:text-lg tracking-tight">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right side: Quick Status & Admin Profile Dropdown */}
      <div className="flex items-center gap-3">
        {/* Admin Badge */}
        <div className="hidden md:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Admin Verified</span>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-1.5 sm:px-3 sm:py-1.5 text-left hover:border-slate-700 hover:bg-slate-800/80 transition-all"
            aria-expanded={dropdownOpen}
          >
            {/* Avatar Circle */}
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#0D8BFF] to-[#8B5CF6] text-xs font-bold text-white shadow-sm shadow-[#0D8BFF]/20">
              {adminEmail ? adminEmail.charAt(0).toUpperCase() : "A"}
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-[#0B0F19] bg-emerald-500" />
            </div>

            {/* Email info */}
            <div className="hidden flex-col text-left sm:flex">
              <span className="text-xs font-semibold text-slate-200 leading-tight">
                {adminName || "Admin"}
              </span>
              <span className="text-[11px] text-slate-400 max-w-[140px] truncate leading-tight">
                {adminEmail}
              </span>
            </div>

            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform duration-200 hidden sm:block ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-slate-800 bg-[#0F172A] p-1.5 text-slate-200 shadow-xl shadow-black/50 ring-1 ring-black/5 focus:outline-none animate-in fade-in-50 zoom-in-95 duration-100">
              {/* Header inside dropdown */}
              <div className="border-b border-slate-800/80 px-3 py-2.5">
                <p className="text-xs font-medium text-slate-400">Signed in as</p>
                <p className="truncate text-xs font-semibold text-slate-100 mt-0.5">
                  {adminEmail}
                </p>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-[#0D8BFF]">
                  <ShieldCheck size={13} />
                  <span>Super Administrator</span>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <Link
                  href="/admin/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-colors"
                >
                  <User size={15} className="text-slate-400" />
                  <span>Admin Profile</span>
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-colors"
                >
                  <ExternalLink size={15} className="text-slate-400" />
                  <span>View Public Site</span>
                </Link>
              </div>

              {/* Logout button */}
              <div className="border-t border-slate-800/80 pt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
                >
                  <LogOut size={15} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
