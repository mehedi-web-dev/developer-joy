// src/app/admin/(protected)/settings/page.tsx
import React from "react";
import { Settings, Globe, Shield, Database } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-slate-800/80 pb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Settings className="text-[#0D8BFF]" size={24} />
          <span>System Settings</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          CMS configuration, environment endpoints, and portfolio parameters.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D8BFF]/10 text-[#0D8BFF]">
                <Globe size={18} />
              </div>
              <div>
                <p className="font-semibold text-slate-200">Backend API URL</p>
                <p className="text-slate-500 font-mono text-[11px]">
                  {process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Database size={18} />
              </div>
              <div>
                <p className="font-semibold text-slate-200">Database Engine</p>
                <p className="text-slate-500 text-[11px]">
                  MongoDB Database (Connected via Express server)
                </p>
              </div>
            </div>
            <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300">
              MongoDB
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Shield size={18} />
              </div>
              <div>
                <p className="font-semibold text-slate-200">Authentication Framework</p>
                <p className="text-slate-500 text-[11px]">
                  Better Auth with Role-Based Access Control (Admin RBAC)
                </p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
              Protected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
