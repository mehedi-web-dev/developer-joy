"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import { getPublicProjects } from "@/lib/api";
import { Project } from "@/types/project";

export type PortfolioProject = Project & {
  displayOrder?: number;
  gallery?: string[];
};

interface PortfolioSectionProps {
  initialProjects?: PortfolioProject[];
}

const getDomain = (url?: string) => {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

const PortfolioSection = ({ initialProjects }: PortfolioSectionProps) => {
  // Helper to prioritize featured projects, sort by displayOrder asc, createdAt desc, and limit to 3
  const processHomepageProjects = (rawList: PortfolioProject[]): PortfolioProject[] => {
    const published = rawList.filter(
      (p) => p.status === "published" && p.title
    );

    const sortProjects = (a: PortfolioProject, b: PortfolioProject) => {
      const orderA = a.displayOrder ?? 0;
      const orderB = b.displayOrder ?? 0;
      if (orderA !== orderB) return orderA - orderB;
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    };

    const featuredProjects = published
      .filter((p) => Boolean(p.featured))
      .sort(sortProjects);

    const nonFeaturedProjects = published
      .filter((p) => !p.featured)
      .sort(sortProjects);

    const combined: PortfolioProject[] = [...featuredProjects];
    for (const nonFeatured of nonFeaturedProjects) {
      if (combined.length >= 3) break;
      if (!combined.some((p) => p._id === nonFeatured._id)) {
        combined.push(nonFeatured);
      }
    }

    return combined.slice(0, 3);
  };

  const [projects, setProjects] = useState<PortfolioProject[]>(() =>
    initialProjects ? processHomepageProjects(initialProjects) : []
  );
  const [loading, setLoading] = useState<boolean>(!initialProjects);
  const [hasFetched, setHasFetched] = useState<boolean>(Boolean(initialProjects));
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialProjects && initialProjects.length > 0) {
      setProjects(processHomepageProjects(initialProjects));
      setLoading(false);
      setHasFetched(true);
      return;
    }

    let isMounted = true;

    async function loadProjects() {
      try {
        const res = await getPublicProjects({ limit: 50 });
        if (isMounted) {
          if (res?.data && Array.isArray(res.data)) {
            setProjects(processHomepageProjects(res.data));
          } else {
            setProjects([]);
          }
        }
      } catch (err) {
        console.error("Failed to load projects for homepage:", err);
        if (isMounted) {
          setProjects([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasFetched(true);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, [initialProjects]);

  // Dynamic categories derived from the displayed projects
  const uniqueCategories = Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean))
  );
  const categories = ["All Projects", ...uniqueCategories];

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Loading skeleton state
  if (loading && projects.length === 0) {
    return (
      <section
        id="portfolio"
        className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
      >
        <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="inline-block h-6 w-32 animate-pulse rounded-full bg-default-200" />
            <div className="mx-auto mt-6 h-10 w-64 animate-pulse rounded-xl bg-default-200" />
            <div className="mx-auto mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-default-100" />
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[460px] animate-pulse rounded-2xl border border-divider bg-default-50/50 p-6"
              >
                <div className="h-44 w-full rounded-xl bg-default-200/70" />
                <div className="mt-6 h-4 w-24 rounded bg-default-200" />
                <div className="mt-3 h-6 w-48 rounded bg-default-200" />
                <div className="mt-4 h-4 w-full rounded bg-default-100" />
                <div className="mt-2 h-4 w-3/4 rounded bg-default-100" />
                <div className="mt-6 flex gap-2">
                  <div className="h-6 w-16 rounded-lg bg-default-200" />
                  <div className="h-6 w-20 rounded-lg bg-default-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Empty state if no projects are published
  if (hasFetched && projects.length === 0) {
    return (
      <section
        id="portfolio"
        className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
      >
        <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

          <ScrollReveal delay={0.1}>
            <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-divider bg-default-50/30 px-6 py-12 text-center">
              <p className="text-sm font-medium text-default-400">
                Portfolio case studies and live websites are currently being curated. Check back soon or visit our services page.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-divider bg-default-100/50 px-6 py-2.5 text-xs font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-default-100"
                >
                  Explore Services
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-accent-hover"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section
      id="portfolio"
      className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
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

        {/* Category Filter (rendered when more than one category exists) */}
        {categories.length > 1 && (
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
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => {
            const itemNumber = String(index + 1).padStart(2, "0");
            const domain = getDomain(project.liveUrl);
            const hasThumbnail = Boolean(project.thumbnail && !imageErrors[project._id]);
            const description = project.shortDescription || project.description;
            const tags = Array.isArray(project.technologies) ? project.technologies : [];

            return (
              <ScrollReveal key={project._id || index} delay={(index % 3) * 0.1}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-divider bg-default-50/50 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5">
                  {/* Project Preview */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-default-200 via-default-100 to-primary/10 p-5 sm:p-6">
                    {/* Browser Window */}
                    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-divider bg-background shadow-xl transition-transform duration-700 group-hover:scale-[1.03]">
                      {/* Browser Header */}
                      <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-divider bg-default-100 px-3">
                        <span className="h-2 w-2 rounded-full bg-red-400" />
                        <span className="h-2 w-2 rounded-full bg-yellow-400" />
                        <span className="h-2 w-2 rounded-full bg-green-400" />

                        <div className="ml-3 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-default-200 px-2 py-1">
                          <span className="truncate text-[10px] font-medium text-default-500">
                            {domain || project.slug || "website"}
                          </span>
                        </div>
                      </div>

                      {/* Website Preview Area */}
                      {hasThumbnail ? (
                        <div className="relative flex-1 overflow-hidden bg-default-100">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            onError={() =>
                              setImageErrors((prev) => ({
                                ...prev,
                                [project._id]: true,
                              }))
                            }
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 text-center">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            {project.category}
                          </span>

                          <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl line-clamp-2 px-2">
                            {project.title}
                          </h3>

                          <div className="h-1 w-12 rounded-full bg-primary" />

                          <span className="text-xs text-default-400">
                            Website Project
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Number */}
                    <div className="absolute right-8 top-8 rounded-lg border border-white/20 bg-background/80 px-3 py-1.5 text-xs font-bold text-foreground shadow-lg backdrop-blur-md">
                      {itemNumber}
                    </div>

                    {/* Hover Overlay */}
                    {project.liveUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.title} website`}
                          className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-transform duration-500 group-hover:scale-100"
                        >
                          <ArrowUpRight size={22} />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
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
                        {itemNumber}
                      </span>
                    </div>

                    {description && (
                      <p className="mt-4 text-sm leading-7 text-default-500 line-clamp-3">
                        {description}
                      </p>
                    )}

                    {/* Technologies */}
                    {tags.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-divider bg-default-100 px-3 py-1.5 text-xs font-medium text-default-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Live Website Link */}
                    {project.liveUrl ? (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto flex items-center justify-between border-t border-divider pt-5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                      >
                        View Live Website
                        <ArrowUpRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </Link>
                    ) : (
                      <div className="mt-auto flex items-center justify-between border-t border-divider pt-5 text-sm font-semibold text-default-400">
                        <span>Website In Production</span>
                        <span className="text-xs font-normal">Coming Soon</span>
                      </div>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
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

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-accent-hover hover:shadow-primary/40"
              >
                Start Your Project
                <ArrowUpRight size={18} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-divider bg-default-100/50 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-default-100"
              >
                View All Portfolio
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PortfolioSection;
