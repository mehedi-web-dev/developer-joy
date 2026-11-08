"use client";

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

        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--heroui-default-200))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--heroui-default-200))_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 flex justify-center"
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
            className="text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              DeveloperJoy
            </span>
            <br />
            <span className="mt-3 inline-block">WordPress Developer</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-8 text-default-500 sm:text-lg"
          >
            I build modern, responsive and high-performing WordPress websites
            that help businesses grow. From custom website development to
            redesign and optimization, I turn ideas into reality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/40 sm:w-auto"
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
            className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-4 sm:gap-8"
          >
            {/* Experience */}
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-divider bg-default-100/50 p-5 shadow-sm backdrop-blur-md transition-colors hover:border-primary/40 sm:p-7"
            >
              <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                5+
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
                500+
              </h2>

              <p className="mt-2 text-xs font-medium text-default-500 sm:text-sm">
                Completed Projects
              </p>
            </motion.div>
          </motion.div>

          {/* Bottom Expertise */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-default-500 sm:text-sm"
          >
            <span>WordPress</span>
            <span className="text-primary">✦</span>
            <span>Elementor</span>
            <span className="text-primary">✦</span>
            <span>WooCommerce</span>
            <span className="text-primary">✦</span>
            <span>Website Development</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
