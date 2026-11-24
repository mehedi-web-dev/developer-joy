// src/app/admin/(protected)/testimonials/new/loading.tsx
export default function NewTestimonialLoading() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="space-y-2">
          <div className="h-4 w-28 bg-slate-800/50 rounded" />
          <div className="h-7 w-52 bg-slate-800/80 rounded-xl" />
        </div>
        <div className="h-10 w-32 bg-slate-800/80 rounded-xl" />
      </div>

      {/* Form grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-96 rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90" />
          <div className="h-48 rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90" />
        </div>
        <div className="space-y-6">
          <div className="h-64 rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90" />
          <div className="h-48 rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90" />
        </div>
      </div>
    </div>
  );
}
