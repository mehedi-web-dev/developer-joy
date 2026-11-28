"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export interface AboutSectionProps {
  hideDesktopSlot?: boolean;
}

export function AboutSection({
  hideDesktopSlot = false,
}: AboutSectionProps = {}) {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto border-t border-black/10 dark:border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Bio & Counters */}
        <div className="lg:col-span-7">
          <span className="text-xs uppercase tracking-widest text-[#65a30d] dark:text-[#c6ff00] font-mono font-semibold block mb-2">
            About Me
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight mb-5">
            Bridging Creative Vision with Engineering Precision
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-4">
            Over the past 6+ years, I have worked as a Senior WordPress Developer—delivering more than 250 successful projects for international businesses, creative agencies, and founders.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8">
            Whether building bespoke Elementor Pro layouts, high-converting WooCommerce stores, or lightning-fast web applications with Next.js, React, and TypeScript, my goal is always the same: clean, scalable code and designs that convert.
          </p>

          {/* Animated Counters Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 py-6 border-y border-black/10 dark:border-white/10 mb-8">
            <div>
              <div className="text-3xl sm:text-5xl font-display font-extrabold text-[#65a30d] dark:text-[#c6ff00]">
                <AnimatedCounter from={0} to={6} suffix="+" />
              </div>
              <p className="text-[11px] sm:text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                Years Experience
              </p>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-display font-extrabold text-[#65a30d] dark:text-[#c6ff00]">
                <AnimatedCounter from={0} to={250} suffix="+" />
              </div>
              <p className="text-[11px] sm:text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                Projects Delivered
              </p>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-display font-extrabold text-[#65a30d] dark:text-[#c6ff00]">
                <AnimatedCounter from={0} to={100} suffix="%" />
              </div>
              <p className="text-[11px] sm:text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                Client Satisfaction
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              onClick={(e) => {
                if (typeof window !== "undefined" && window.location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  window.history.replaceState(null, "", "/#contact");
                }
              }}
              className="px-6 py-3 rounded-full bg-[#c6ff00] hover:bg-[#d4ff33] text-black font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Let&apos;s Connect</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:joykhanfiverr@gmail.com"
              className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors break-all"
            >
              joykhanfiverr@gmail.com
            </a>
          </div>
        </div>

        {/* Right Column: Slot reserved on Desktop for the 3D Sticky Flipping Card. Hidden on responsive/mobile */}
        <div className="hidden lg:flex lg:col-span-5 justify-center">
          <div className="w-[320px] xl:w-[350px] h-[450px] xl:h-[490px]" />
        </div>
      </div>
    </section>
  );
}
