"use client";

import * as React from "react";

export interface HeroSectionProps {
  hideDesktopCard?: boolean;
}

export function HeroSection({
  hideDesktopCard = false,
}: HeroSectionProps = {}) {
  const profileImage = "/joy.png";

  return (
    <section
      id="hero"
      className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 flex flex-col justify-center min-h-[85vh] overflow-x-hidden"
    >
      {/* 3-Column Desktop Horizontal Lockup matching Framer Reference */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-4 lg:gap-6 xl:gap-8">
        {/* ================= LEFT COLUMN: DEVELOPER JOY + DIGITAL ================= */}
        <div className="flex flex-col items-center lg:items-end text-center lg:text-right select-none z-10 min-w-0">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-zinc-700 dark:text-white/90 uppercase mb-2 block whitespace-nowrap">
            DEVELOPER JOY
          </span>
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(3rem,4.5vw,4.8rem)] font-display font-extrabold tracking-tighter text-zinc-900 dark:text-white uppercase leading-[0.88] whitespace-nowrap">
            DIGITAL
          </h1>
        </div>

        {/* ================= CENTER COLUMN: PORTRAIT CARD ================= */}
        <div className="flex justify-center items-center relative z-20 my-4 lg:my-0 shrink-0">
          {hideDesktopCard ? (
            <>
              {/* Desktop: Slot reserved for the 3D Sticky Flipping Card */}
              <div className="hidden lg:block w-[300px] sm:w-[320px] xl:w-[340px] h-[420px] sm:h-[450px] xl:h-[480px]" />
              {/* Mobile: In-flow Portrait Card with Lime Waving Badge */}
              <div className="lg:hidden relative w-[260px] xs:w-[280px] sm:w-[310px] h-[360px] xs:h-[400px] sm:h-[430px] rounded-[28px] overflow-hidden border-2 border-black/10 dark:border-white/10 shadow-2xl bg-[#16171a]">
                <img
                  src={profileImage}
                  alt="Developer Joy"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute -bottom-2 -left-2 w-14 h-14 rounded-full bg-[#c6ff00] text-black flex items-center justify-center text-2xl shadow-xl border-2 border-white dark:border-[#0c0d0e]">
                  👋
                </div>
              </div>
            </>
          ) : (
            <div className="relative w-[280px] sm:w-[310px] xl:w-[340px] h-[380px] sm:h-[440px] xl:h-[480px] rounded-[28px] overflow-hidden border-2 border-black/10 dark:border-white/10 shadow-2xl bg-[#16171a]">
              <img
                src={profileImage}
                alt="Developer Joy"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute -bottom-2 -left-2 w-14 h-14 rounded-full bg-[#c6ff00] text-black flex items-center justify-center text-2xl shadow-xl border-2 border-white dark:border-[#0c0d0e]">
                👋
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN: DEVELOPER + SUBTITLE ================= */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left select-none z-10 min-w-0">
          <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(3rem,4.5vw,4.8rem)] font-display font-extrabold tracking-tighter text-zinc-900 dark:text-white uppercase leading-[0.88] whitespace-nowrap">
            DEVELOPER
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-xs mt-3 sm:mt-4">
            WordPress / WooCommerce / React &amp; Next.js development specialist
          </p>
        </div>
      </div>
    </section>
  );
}
