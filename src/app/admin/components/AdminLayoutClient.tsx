"use client";

import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  adminEmail?: string;
  adminName?: string;
}

export default function AdminLayoutClient({
  children,
  adminEmail,
  adminName,
}: AdminLayoutClientProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 flex antialiased">
      {/* Sidebar (Desktop sticky & Mobile drawer) */}
      <AdminSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        adminEmail={adminEmail}
      />

      {/* Main Content Viewport */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Topbar */}
        <AdminTopbar
          onToggleMobile={() => setMobileOpen((prev) => !prev)}
          adminEmail={adminEmail}
          adminName={adminName}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
