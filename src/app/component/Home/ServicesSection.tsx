"use client";

import Link from "next/link";
import ScrollReveal from "../ScrollReveal";


const services = [
  {
    number: "01",
    title: "WordPress Development",
    description:
      "Custom WordPress websites built with clean code, responsive layouts, and user-friendly functionality to help your business grow.",
    tags: ["WordPress", "Custom Development"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m3.5 9 4.5 12M14 3l-2 6 3 3-3 8M8 7l2-3m7 1 3 4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Elementor Website Design",
    description:
      "Beautiful, modern, and conversion-focused websites designed using Elementor and Elementor Pro with pixel-perfect layouts.",
    tags: ["Elementor", "Elementor Pro"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 7v10m0-10h8M8 12h6" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "WooCommerce Development",
    description:
      "Build powerful online stores with WooCommerce, product management, payment integration, and seamless shopping experiences.",
    tags: ["WooCommerce", "E-commerce"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3h2l2.5 12h11l2-8H6" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Website Redesign",
    description:
      "Transform outdated websites into modern, responsive, and professional digital experiences with improved usability and design.",
    tags: ["UI/UX", "Redesign"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Malware Removal & Security",
    description:
      "Identify and remove malicious code, hidden backdoors, suspicious files, and security vulnerabilities from compromised WordPress websites.",
    tags: ["Malware Removal", "Security"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Speed Optimization",
    description:
      "Improve website loading speed, optimize performance, configure caching, and enhance the overall user experience.",
    tags: ["Performance", "Optimization"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2 3 14h8l-1 8 11-13h-8l1-7Z" />
      </svg>
    ),
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-background py-24 sm:py-32"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              What I Do
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Services That Help Your
              <span className="mt-2 block bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Business Grow
              </span>
            </h2>

            <p className="mt-6 text-base leading-8 text-default-500 sm:text-lg">
              From custom WordPress development to website optimization, I
              provide reliable digital solutions tailored to your business
              needs.
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.number} delay={(index % 3) * 0.12}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-divider bg-default-50/50 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-8">
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Number & Icon */}
                <div className="relative flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-default-400">
                    / {service.number}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-white">
                    <div className="h-7 w-7">{service.icon}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative mt-8 flex-1">
                  <h3 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-default-500">
                    {service.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="relative mt-7 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-divider bg-default-100 px-3 py-1.5 text-xs font-medium text-default-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Link */}
                <Link
                  href="/contact"
                  className="relative mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-4"
                >
                  Discuss Your Project
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
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 rounded-3xl border border-divider bg-default-100/50 p-8 text-center backdrop-blur-xl sm:p-12">
            <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
              Have a Project in Mind?
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-default-500 sm:text-base">
              Let&apos;s discuss your ideas and build something exceptional
              together.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/40"
            >
              Start a Project
              <ArrowIcon />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const ArrowIcon = () => (
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
);

export default ServicesSection;
