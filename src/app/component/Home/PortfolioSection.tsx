"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";



type Project = {
  title: string;
  category: string;
  description: string;
  url: string;
  tags: string[];
  number: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Bulkon",
    category: "Business Website",
    description:
      "A professional business website built to establish a strong digital presence.",
    url: "https://bulkon.eu/",
    tags: ["WordPress", "Elementor"],
  },
  {
    number: "02",
    title: "BWM Betonwerken",
    category: "Business Website",
    description:
      "A modern business website for a concrete and construction company.",
    url: "https://bwmbetonwerken.nl/",
    tags: ["WordPress", "Elementor"],
  },
  {
    number: "03",
    title: "Sentriq",
    category: "Business Website",
    description:
      "A professional digital presence with a modern and structured website design.",
    url: "https://sentriq.nl/",
    tags: ["WordPress", "Elementor"],
  },
  {
    number: "04",
    title: "RMS Facility Service",
    category: "Business Website",
    description:
      "A business website designed to present facility services professionally.",
    url: "https://rms-facilityservice.nl/",
    tags: ["WordPress", "Elementor"],
  },
  {
    number: "05",
    title: "Nulmetingen Nederland",
    category: "Business Website",
    description:
      "A professional website created to showcase business services and information.",
    url: "https://nulmetingennederland.nl/",
    tags: ["WordPress", "Elementor"],
  },
];

const categories = ["All Projects", "Business Website"];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="relative w-full overflow-hidden bg-background py-24 sm:py-32"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              My Portfolio
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Selected{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-default-500 sm:text-lg">
              A collection of projects showcasing my experience in WordPress
              development, website design and digital solutions.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                    : "border-divider bg-default-100/50 text-default-500 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.number} delay={(index % 3) * 0.1}>
              <article className="group h-full overflow-hidden rounded-2xl border border-divider bg-default-50/50 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5">
                {/* Project Preview */}
                <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-default-200 via-default-100 to-primary/10 p-5 sm:p-6">
                  {/* Browser Window */}
                  <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-divider bg-background shadow-xl transition-transform duration-700 group-hover:scale-[1.03]">
                    {/* Browser Header */}
                    <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-divider bg-default-100 px-3">
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      <span className="h-2 w-2 rounded-full bg-yellow-400" />
                      <span className="h-2 w-2 rounded-full bg-green-400" />

                      <div className="ml-3 h-4 flex-1 rounded-md bg-default-200" />
                    </div>

                    {/* Website Preview Placeholder */}
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 text-center">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        {project.category}
                      </span>

                      <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                        {project.title}
                      </h3>

                      <div className="h-1 w-12 rounded-full bg-primary" />

                      <span className="text-xs text-default-400">
                        Website Project
                      </span>
                    </div>
                  </div>

                  {/* Project Number */}
                  <div className="absolute right-8 top-8 rounded-lg border border-white/20 bg-background/80 px-3 py-1.5 text-xs font-bold text-foreground shadow-lg backdrop-blur-md">
                    {project.number}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.title} website`}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-transform duration-500 group-hover:scale-100 scale-75"
                    >
                      <svg
                        width="22"
                        height="22"
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
                </div>

                {/* Project Details */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        {project.category}
                      </span>

                      <h3 className="mt-2 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                        {project.title}
                      </h3>
                    </div>

                    <span className="text-sm font-bold text-default-400">
                      {project.number}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-default-500">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-divider bg-default-100 px-3 py-1.5 text-xs font-medium text-default-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Live Website */}
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 flex items-center justify-between border-t border-divider pt-5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    View Live Website
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 rounded-3xl border border-divider bg-default-100/50 px-6 py-12 text-center sm:px-12">
            <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
              Have a Similar Project?
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-default-500 sm:text-base">
              Let&apos;s work together to create a professional website that
              makes your business stand out.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/40"
            >
              Start Your Project
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
      </div>
    </section>
  );
};

export default PortfolioSection;
