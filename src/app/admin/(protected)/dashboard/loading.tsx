// src/app/admin/(protected)/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-52 bg-slate-800/80 rounded-xl" />
          <div className="h-4 w-72 bg-slate-800/50 rounded-lg" />
        </div>
        <div className="h-10 w-36 bg-slate-800/80 rounded-xl" />
      </div>

      {/* Stats Cards Skeleton (6 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/80 p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 bg-slate-800 rounded" />
              <div className="h-9 w-9 bg-slate-800 rounded-xl" />
            </div>
            <div className="h-8 w-16 bg-slate-800 rounded-lg" />
            <div className="h-3 w-36 bg-slate-800/50 rounded" />
          </div>
        ))}
      </div>

      {/* Grid skeleton for content overview & recent projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-800/80 bg-[#0B0F19]/80 p-6 space-y-4">
          <div className="h-6 w-40 bg-slate-800 rounded" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-800/40 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/80 p-6 space-y-4">
          <div className="h-6 w-32 bg-slate-800 rounded" />
          <div className="space-y-2.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-800/40 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
