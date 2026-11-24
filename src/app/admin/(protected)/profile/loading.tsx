// src/app/admin/(protected)/profile/loading.tsx
import React from "react";
import { User } from "lucide-react";

export default function ProfileLoading() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-pulse">
      {/* Page Header Skeleton */}
      <div className="border-b border-slate-800/80 pb-6 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-800/80 rounded-lg" />
          <div className="h-4 w-72 bg-slate-800/50 rounded-md" />
        </div>
      </div>

      {/* Identity Card Skeleton */}
      <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="h-20 w-20 rounded-2xl bg-slate-800/80" />
          <div className="space-y-2.5 flex-1">
            <div className="h-6 w-40 bg-slate-800/80 rounded" />
            <div className="h-4 w-56 bg-slate-800/50 rounded" />
            <div className="h-6 w-28 bg-slate-800/60 rounded-full" />
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-20 rounded-xl bg-slate-900/60 border border-slate-800/60" />
          <div className="h-20 rounded-xl bg-slate-900/60 border border-slate-800/60" />
          <div className="h-20 rounded-xl bg-slate-900/60 border border-slate-800/60" />
        </div>
      </div>

      {/* Forms Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 space-y-4">
          <div className="h-6 w-36 bg-slate-800/80 rounded" />
          <div className="h-10 bg-slate-900/80 rounded-xl border border-slate-800/60" />
          <div className="h-10 bg-slate-900/80 rounded-xl border border-slate-800/60" />
          <div className="h-10 w-28 bg-slate-800/80 rounded-xl" />
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 space-y-4">
          <div className="h-6 w-44 bg-slate-800/80 rounded" />
          <div className="h-10 bg-slate-900/80 rounded-xl border border-slate-800/60" />
          <div className="h-10 bg-slate-900/80 rounded-xl border border-slate-800/60" />
          <div className="h-10 bg-slate-900/80 rounded-xl border border-slate-800/60" />
          <div className="h-10 w-36 bg-slate-800/80 rounded-xl" />
        </div>
      </div>

      {/* Sessions Card Skeleton */}
      <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 space-y-4">
        <div className="h-6 w-40 bg-slate-800/80 rounded" />
        <div className="h-16 rounded-xl bg-slate-900/60 border border-slate-800/60" />
      </div>
    </div>
  );
}
