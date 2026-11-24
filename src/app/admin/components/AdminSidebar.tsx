"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  MessageSquareQuote,
  HelpCircle,
  User,
  Settings,
  ExternalLink,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  adminEmail?: string;
}

const mainNavItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Services", href: "/admin/services", icon: Layers },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
];

const secondaryNavItems = [
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  adminEmail,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin" || pathname === "/admin/dashboard";
    }
    return pathname.startsWith(href);
  };

  const renderNavLinks = (items: typeof mainNavItems) => {
    return (
      <ul className="space-y-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={onCloseMobile}
                title={collapsed ? item.name : undefined}
                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#0D8BFF]/15 text-[#0D8BFF] shadow-sm shadow-[#0D8BFF]/10 font-semibold"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#0D8BFF]" />
                )}
                <Icon
                  size={19}
                  className={`shrink-0 transition-colors ${
                    active ? "text-[#0D8BFF]" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                {!collapsed && (
                  <span className="truncate tracking-wide">{item.name}</span>
                )}
                {collapsed && (
                  <span className="sr-only">{item.name}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-slate-800/80 bg-[#0B0F19] text-slate-100 transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:z-30 ${
          collapsed ? "lg:w-[74px]" : "lg:w-[260px]"
        } ${
          mobileOpen
            ? "translate-x-0 w-[270px] shadow-2xl"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800/80 px-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2.5 overflow-hidden"
            onClick={onCloseMobile}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0D8BFF] to-[#8B5CF6] text-white shadow-md shadow-[#0D8BFF]/20">
              <Sparkles size={18} />
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="truncate text-sm font-bold tracking-tight text-white">
                  DeveloperJoy
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-[#0D8BFF] uppercase">
                  Portfolio CMS
                </span>
              </div>
            )}
          </Link>

          {/* Close Button on Mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Main Section */}
          <div className="mb-6">
            {!collapsed && (
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Core CMS
              </p>
            )}
            {renderNavLinks(mainNavItems)}
          </div>

          {/* Settings Section */}
          <div>
            {!collapsed && (
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Administration
              </p>
            )}
            {renderNavLinks(secondaryNavItems)}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800/80 p-3 space-y-1.5 bg-[#090D15]/60">
          {/* View Website */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? "View Website" : undefined}
            className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-slate-100 transition-colors"
          >
            <ExternalLink size={18} className="shrink-0 text-slate-400 group-hover:text-[#0D8BFF]" />
            {!collapsed && <span className="truncate">View Website</span>}
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-rose-400/90 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left"
          >
            <LogOut size={18} className="shrink-0 text-rose-400/90 group-hover:text-rose-300" />
            {!collapsed && <span className="truncate">Logout</span>}
          </button>

          {/* Desktop Collapse Toggle */}
          <div className="hidden pt-2 border-t border-slate-800/50 lg:block">
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="flex w-full items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-medium text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 transition-colors"
            >
              {collapsed ? (
                <ChevronRight size={16} />
              ) : (
                <>
                  <ChevronLeft size={16} />
                  <span>Collapse Sidebar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
