// src/app/admin/(protected)/faqs/page.tsx
import React from "react";
import { getAdminFaqs } from "@/lib/server-api";
import { HelpCircle, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const { data: faqs = [] } = await getAdminFaqs({ limit: 100 }).catch(() => ({ data: [] }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <HelpCircle className="text-[#0D8BFF]" size={24} />
            <span>FAQ Management</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Frequently Asked Questions displayed on the portfolio homepage.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900/60 uppercase tracking-wider text-slate-400 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Question</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-slate-500">
                    No FAQs found in database.
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq._id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-100 max-w-md">
                      {faq.question}
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                        <Tag size={10} className="text-slate-500" />
                        {faq.category || "General"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          faq.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            faq.status === "published" ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                        />
                        <span className="capitalize">{faq.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {new Date(faq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
