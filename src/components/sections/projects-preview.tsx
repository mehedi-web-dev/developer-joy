"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getPublicProjects } from "@/lib/api";

export interface ProjectCardData {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  image: string;
  slug: string;
  technologies: string[];
  liveUrl?: string;
}

const FALLBACK_JOY_PROJECTS: ProjectCardData[] = [
  {
    id: "1",
    title: "Apex Logistics & Supply Chain",
    badge: "WordPress & Enterprise Design",
    subtitle:
      "Enterprise corporate portal with interactive freight calculators, multilingual WPML support, and dynamic fleet tracking modules.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    slug: "apex-logistics",
    technologies: ["WordPress", "Elementor Pro", "ACF Pro", "WPML", "PHP"],
    liveUrl: "https://example.com/apex-logistics",
  },
  {
    id: "2",
    title: "Lumina Home & Architectural Decor",
    badge: "WooCommerce & E-Commerce",
    subtitle:
      "High-converting lifestyle e-commerce store with custom Ajax instant search, product swatch configurator, and Stripe 1-click checkout.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    slug: "lumina-home",
    technologies: ["WooCommerce", "WordPress", "Stripe API", "jQuery", "Tailwind CSS"],
    liveUrl: "https://example.com/lumina-home",
  },
  {
    id: "3",
    title: "Salondor Luxury Salon & Booking",
    badge: "Full-Stack Web App",
    subtitle:
      "Modern salon booking platform featuring real-time stylist schedule sync, automated SMS reminders, and client dashboard.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
    slug: "salondor-booking",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    liveUrl: "https://example.com/salondor",
  },
  {
    id: "4",
    title: "EcoPulse Clean Energy SaaS",
    badge: "Next.js & Frontend Engineering",
    subtitle:
      "Renewable energy analytics dashboard with live energy consumption metrics, solar yield estimations, and smooth Framer Motion data charts.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop",
    slug: "ecopulse-saas",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Chart.js"],
    liveUrl: "https://example.com/ecopulse",
  },
];

/**
 * Single Stacking Card with Scroll-linked Stacking
 */
function StackingProjectCard({
  project,
  index,
  total,
}: {
  project: ProjectCardData;
  index: number;
  total: number;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Calculate top sticky offset so all cards stack cleanly with staggered header exposure
  const topOffset = 100 + index * 16;

  return (
    <div
      ref={cardRef}
      className="sticky w-full mb-12 sm:mb-16 last:mb-0"
      style={{
        top: `${topOffset}px`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group relative w-full bg-white dark:bg-[#141517] rounded-[28px] sm:rounded-[36px] border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl hover:border-[#c6ff00]/60 transition-all duration-300"
      >
        <Link href={`/portfolio/${project.slug}`} className="block">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch overflow-hidden">
            {/* Project Media (Left 50%) */}
            <div className="relative w-full h-[260px] sm:h-[340px] lg:h-full min-h-[260px] lg:min-h-[420px] overflow-hidden bg-zinc-900 min-w-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-5 left-5 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#c6ff00] font-mono">
                  {project.badge}
                </span>
              </div>
            </div>

            {/* Project Details (Right 50%) */}
            <div className="relative z-10 min-w-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-zinc-50 to-white dark:from-[#141517] dark:to-[#111214]">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Project 0{index + 1} of 0{total}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-black group-hover:bg-[#c6ff00] transition-colors">
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-zinc-900 dark:text-white mb-4 group-hover:text-[#65a30d] dark:group-hover:text-[#c6ff00] transition-colors leading-tight">
                  {project.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                  {project.subtitle}
                </p>
              </div>

              {/* Technologies Pills */}
              <div className="pt-6 border-t border-black/10 dark:border-white/10">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className="px-2 py-1 rounded-lg bg-black/5 dark:bg-white/[0.04] text-[10px] font-mono text-zinc-500">
                      +{project.technologies.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export function ProjectsPreviewSection() {
  const [projects, setProjects] = React.useState<ProjectCardData[]>(FALLBACK_JOY_PROJECTS);

  React.useEffect(() => {
    getPublicProjects({ limit: 10 })
      .then((res) => {
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          const mapped: ProjectCardData[] = res.data.map((p) => ({
            id: p._id,
            title: p.title,
            badge: p.category || "WordPress & Full-Stack",
            subtitle: p.shortDescription || p.description || "",
            image: p.thumbnail || FALLBACK_JOY_PROJECTS[0].image,
            slug: p.slug,
            technologies: Array.isArray(p.technologies) ? p.technologies : [],
            liveUrl: p.liveUrl,
          }));
          setProjects(mapped);
        }
      })
      .catch(() => {
        // keep fallback projects on network/API failure
      });
  }, []);

  return (
    <section id="portfolio-preview" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-black/10 dark:border-white/10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#65a30d] dark:text-[#c6ff00] font-mono font-semibold block mb-2">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            Featured Projects ({projects.length})
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            These selected projects reflect my passion for combining strategy and creativity — delivering production-grade web applications, custom WordPress implementations, and e-commerce platforms.
          </p>
        </div>
        <Link
          href="/#contact"
          onClick={(e) => {
            if (typeof window !== "undefined" && window.location.pathname === "/") {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              window.history.replaceState(null, "", "/#contact");
            }
          }}
          className="px-7 py-3 rounded-full bg-[#c6ff00] hover:bg-[#d4ff33] text-black font-semibold text-xs uppercase tracking-wider transition-all self-start sm:self-auto shadow-lg shadow-[#c6ff00]/20 whitespace-nowrap cursor-pointer"
        >
          Start a Project
        </Link>
      </div>

      {/* Sticky Stacking Cards Container: Renders ALL projects with 50/50 balance */}
      <div className="relative w-full">
        {projects.map((project, idx) => (
          <StackingProjectCard
            key={project.id}
            project={project}
            index={idx}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
