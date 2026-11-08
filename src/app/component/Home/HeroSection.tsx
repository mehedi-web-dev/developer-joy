"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-64px)] w-full items-center overflow-hidden bg-transparent">
      {/* Hero Background Effects */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Blue Glow */}
        <motion.div
          className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Purple Glow */}
        <motion.div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[130px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Text Column */}
          <div className="text-center lg:text-left">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-divider bg-default-100/70 px-4 py-2 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                </span>

                <span className="text-xs font-medium text-default-600 sm:text-sm">
                  Available for New Projects
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl"
            >
              Crafting{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                WordPress experiences
              </span>
              <br />
              <span className="mt-3 inline-block">that convert.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mx-auto mt-7 max-w-2xl text-base leading-8 text-default-500 sm:text-lg lg:mx-0"
            >
              I build high-performance, secure, and conversion-focused WordPress
              websites for startups, agencies, and eCommerce brands.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-accent-hover hover:shadow-primary/40 sm:w-auto"
              >
                Hire Me
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </Link>

              <Link
                href="/portfolio"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-divider bg-default-100/50 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-default-100 sm:w-auto"
              >
                View Portfolio
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </Link>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto mt-14 grid max-w-lg grid-cols-2 gap-4 sm:gap-6 lg:mx-0"
            >
              {/* Experience */}
              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-divider bg-default-100/50 p-5 shadow-sm backdrop-blur-md transition-colors hover:border-primary/40 sm:p-7"
              >
                <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                  6+
                </h2>

                <p className="mt-2 text-xs font-medium text-default-500 sm:text-sm">
                  Years Experience
                </p>
              </motion.div>

              {/* Projects */}
              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-divider bg-default-100/50 p-5 shadow-sm backdrop-blur-md transition-colors hover:border-primary/40 sm:p-7"
              >
                <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                  250+
                </h2>

                <p className="mt-2 text-xs font-medium text-default-500 sm:text-sm">
                  Projects Delivered
                </p>
              </motion.div>
            </motion.div>

            {/* Bottom Expertise */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-default-500 sm:text-sm lg:justify-start"
            >
              <span>WordPress</span>
              <span className="text-primary">✦</span>
              <span>Elementor Pro</span>
              <span className="text-primary">✦</span>
              <span>WooCommerce</span>
              <span className="text-primary">✦</span>
              <span>Custom Development</span>
            </motion.div>
          </div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-gradient-to-tr from-primary/30 via-blue-500/20 to-purple-500/30 blur-3xl" />

            {/* Framed portrait */}
            <div className="relative rounded-[2rem] bg-gradient-to-br from-primary/50 via-blue-500/20 to-purple-500/50 p-[2px] shadow-2xl shadow-primary/10">
              <div className="overflow-hidden rounded-[calc(2rem-2px)] bg-background p-2">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/joy.png"
                    alt="Developer Joy — WordPress developer at DeveloperJoy"
                    fill
                    priority
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 45vw"
                    className="object-cover object-top"
                  />

                  {/* Image overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

                  {/* Name plate */}
                  <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4">
                    <p className="text-sm font-semibold text-white">
                      Developer Joy
                    </p>
                    <p className="text-xs text-white/80">
                      WordPress Developer &amp; Elementor Expert
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating experience card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-5 left-3 rounded-2xl border border-divider bg-background/80 px-4 py-3 shadow-xl backdrop-blur-md sm:-left-5"
            >
              <p className="text-xs font-medium text-default-500">
                Experience
              </p>
              <p className="text-lg font-bold text-foreground">6+ Years</p>
            </motion.div>

            {/* Floating availability dot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -right-2 top-8 flex items-center gap-2 rounded-full border border-divider bg-background/80 px-3 py-2 shadow-lg backdrop-blur-md sm:-right-4"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="text-xs font-semibold text-foreground">
                Open to work
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
