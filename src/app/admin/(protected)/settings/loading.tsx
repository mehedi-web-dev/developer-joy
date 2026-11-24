// src/app/admin/(protected)/settings/loading.tsx
import React from "react";

export default function SettingsLoading() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-pulse">
      {/* Page Header Skeleton */}
      <div className="border-b border-slate-800/80 pb-6 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-52 bg-slate-800/80 rounded-lg" />
          <div className="h-4 w-80 bg-slate-800/50 rounded-md" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-2 border-b border-slate-800/80 pb-3">
        <div className="h-9 w-28 bg-slate-800/80 rounded-xl" />
        <div className="h-9 w-32 bg-slate-800/60 rounded-xl" />
        <div className="h-9 w-36 bg-slate-800/60 rounded-xl" />
        <div className="h-9 w-28 bg-slate-800/60 rounded-xl" />
      </div>

      {/* Content Skeleton Card */}
      <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <div className="h-6 w-44 bg-slate-800/80 rounded" />
          <div className="h-4 w-72 bg-slate-800/50 rounded" />
        </div>

        <div className="space-y-4 pt-2">
          <div className="h-16 rounded-xl bg-slate-900/60 border border-slate-800/60" />
          <div className="h-16 rounded-xl bg-slate-900/60 border border-slate-800/60" />
          <div className="h-16 rounded-xl bg-slate-900/60 border border-slate-800/60" />
        </div>
      </div>
    </div>
  );
}
