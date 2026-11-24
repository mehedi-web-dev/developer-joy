// src/app/admin/(protected)/testimonials/page.tsx
import { getAdminTestimonials } from "@/lib/server-api";
import TestimonialsTable from "./TestimonialsTable";
import Link from "next/link";
import { MessageSquareQuote, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const { data: testimonials = [] } = await getAdminTestimonials({ limit: 1000 }).catch(() => ({ data: [] }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <MessageSquareQuote className="text-[#0D8BFF]" size={24} />
            <span>Testimonial Management</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage client testimonials, star ratings, and featured reviews.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0D8BFF] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#0D8BFF]/25 hover:bg-[#0D8BFF]/90 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>New Testimonial</span>
        </Link>
      </div>

      <TestimonialsTable initialTestimonials={testimonials} />
    </div>
  );
}
