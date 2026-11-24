// src/app/admin/(protected)/services/loading.tsx
export default function ServicesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="space-y-2">
          <div className="h-7 w-52 bg-slate-800/80 rounded-xl" />
          <div className="h-4 w-72 bg-slate-800/50 rounded-lg" />
        </div>
        <div className="h-10 w-32 bg-slate-800/80 rounded-xl" />
      </div>

      {/* Control bar skeleton */}
      <div className="h-14 rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90" />

      {/* Table skeleton */}
      <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 space-y-4">
        <div className="h-6 w-full bg-slate-800/60 rounded" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-12 w-full bg-slate-800/30 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
