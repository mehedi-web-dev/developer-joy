"use client";

import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-64px)] w-full items-center overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/10 blur-[130px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--heroui-default-200))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--heroui-default-200))_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Availability Badge */}
          <div className="mb-8 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 rounded-full border border-divider bg-default-100/70 px-4 py-2 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              </span>

              <span className="text-xs font-medium text-default-600 sm:text-sm">
                Available for New Projects
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="animate-in fade-in slide-in-from-bottom-5 duration-700 text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              DeveloperJoy
            </span>
            <br />
            <span className="mt-3 inline-block">WordPress Developer</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl animate-in fade-in slide-in-from-bottom-5 text-base leading-8 text-default-500 duration-1000 sm:text-lg">
            I build modern, responsive and high-performing WordPress websites
            that help businesses grow. From custom website development to
            redesign and optimization, I turn ideas into reality.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex animate-in fade-in slide-in-from-bottom-5 flex-col items-center justify-center gap-4 duration-1000 sm:flex-row">
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-divider bg-default-100/50 px-8 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-default-100 sm:w-auto"
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
          </div>

          {/* Statistics */}
          <div className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-4 sm:gap-8">
            {/* Experience */}
            <div className="rounded-2xl border border-divider bg-default-100/50 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-7">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                5+
              </h2>

              <p className="mt-2 text-xs font-medium text-default-500 sm:text-sm">
                Years Experience
              </p>
            </div>

            {/* Projects */}
            <div className="rounded-2xl border border-divider bg-default-100/50 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-7">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                500+
              </h2>

              <p className="mt-2 text-xs font-medium text-default-500 sm:text-sm">
                Completed Projects
              </p>
            </div>
          </div>

          {/* Bottom Expertise */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-default-500 sm:text-sm">
            <span>WordPress</span>
            <span className="text-primary">✦</span>
            <span>Elementor</span>
            <span className="text-primary">✦</span>
            <span>WooCommerce</span>
            <span className="text-primary">✦</span>
            <span>Website Development</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
