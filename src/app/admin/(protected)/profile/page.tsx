// src/app/admin/(protected)/profile/page.tsx
import React from "react";
import { getServerSession } from "@/lib/server-api";
import { User, ShieldCheck, Mail, Key } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-slate-800/80 pb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <User className="text-[#0D8BFF]" size={24} />
          <span>Admin Profile</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Your administrator account details and security status.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#0D8BFF] to-[#8B5CF6] text-xl font-bold text-white shadow-lg shadow-[#0D8BFF]/20">
            {user?.email?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {user?.name || "Administrator"}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Mail size={13} />
              <span>{user?.email}</span>
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
              <ShieldCheck size={13} />
              <span>Role: {user?.role || "admin"}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">
              Authentication Provider
            </span>
            <span className="text-slate-200 font-medium text-sm mt-1 block">
              Better Auth (Credentials)
            </span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">
              Session Cookie Storage
            </span>
            <span className="text-emerald-400 font-medium text-sm mt-1 block flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              HttpOnly Secure Cookie
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
