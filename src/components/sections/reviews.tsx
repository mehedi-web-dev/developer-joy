"use client";

import * as React from "react";
import { Star, ShieldCheck } from "lucide-react";

export function ReviewsSection() {
  const testimonials = [
    {
      author: "David R.",
      role: "Founder, SaaS Platform",
      text: "Developer Joy delivered our Next.js web application ahead of schedule. The animations are buttery smooth and our conversion rate jumped by 40% in month one.",
    },
    {
      author: "Sarah Jenkins",
      role: "Creative Director",
      text: "Flawless communication, quick updates on WhatsApp, and a custom WordPress theme that perfectly matches our Figma designs. A true professional.",
    },
    {
      author: "Michael Van Dijk",
      role: "E-Commerce Owner",
      text: "Our WooCommerce store was sluggish and losing checkouts. Joy redesigned the checkout flow and optimized our speed to 98 on mobile. Outstanding result!",
    },
    {
      author: "Lisa Thorne",
      role: "Marketing Agency Lead",
      text: "Completely transparent with pricing, zero hidden surprises, and incredible attention to detail. Joy is now our go-to developer for all client projects.",
    },
  ];

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-black/10 dark:border-white/10">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest text-[#65a30d] dark:text-[#c6ff00] font-mono font-semibold block mb-2">
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
          What My Clients Say
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
          Real feedback from entrepreneurs, agency founders, and business owners worldwide.
        </p>
      </div>

      {/* Highlights Banner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-white text-black shadow-xl border border-black/10 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-[#0c0d0e] mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-[#65a30d] dark:text-[#0c0d0e]" />
              ))}
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-black">
              Over 250+ 5-Star Reviews Worldwide
            </h3>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-black/60 mt-6">
            100% Satisfaction Rate
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#c6ff00] text-black shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-black">
              200% Dedication to Every Project
            </h3>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-black/70 mt-6">
            100% Commitment &amp; Guarantee
          </p>
        </div>
      </div>

      {/* 4 Testimonial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((rev, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white dark:bg-[#141517] border border-black/10 dark:border-white/10 shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-[#65a30d] dark:text-[#c6ff00] mb-3">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic mb-4">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              <p className="text-xs font-bold text-zinc-900 dark:text-white">{rev.author}</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{rev.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
