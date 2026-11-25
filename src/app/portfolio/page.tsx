import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  LockKeyhole,
  MonitorSmartphone,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import ScrollReveal from "../component/ScrollReveal";
import { getPublicProjects } from "@/lib/server-api";
import { Project } from "@/types/project";

export type PortfolioProject = Project & {
  displayOrder?: number;
  gallery?: string[];
};

export const metadata: Metadata = {
  title: "Portfolio | Developer Joy",
  description:
    "View selected WordPress and Elementor projects by Developer Joy, including live business websites built for performance, clarity, and growth.",
};

const standards = [
  {
    icon: MonitorSmartphone,
    title: "Responsive by default",
    description:
      "Every project is built mobile-first and tested across modern devices and screen sizes.",
  },
  {
    icon: Zap,
    title: "Performance focused",
    description:
      "Fast load times, clean structure, and a smooth experience for every visitor.",
  },
  {
    icon: ShieldCheck,
    title: "Secure foundations",
    description:
      "Best-practice WordPress security and stable, maintainable builds from launch onward.",
  },
  {
    icon: SearchCheck,
    title: "SEO-ready structure",
    description:
      "Semantic markup, clean heading structure, and on-page fundamentals built into every page.",
  },
];

const getDomain = (url?: string) => {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

interface PortfolioPageProps {
  searchParams?: Promise<{ category?: string }>;
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const selectedCategory = resolvedParams?.category || "All Projects";

  let allProjects: PortfolioProject[] = [];

  try {
    const res = await getPublicProjects({ limit: 100 });
    if (res?.data && Array.isArray(res.data)) {
      const published = res.data.filter(
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

      const featured = published
        .filter((p) => Boolean(p.featured))
        .sort(sortProjects);

      const nonFeatured = published
        .filter((p) => !p.featured)
        .sort(sortProjects);

      const combined: PortfolioProject[] = [...featured];
      for (const item of nonFeatured) {
        if (!combined.some((p) => p._id === item._id)) {
          combined.push(item);
        }
      }

      allProjects = combined;
    }
  } catch (err) {
    console.error("Failed to load projects on /portfolio page:", err);
    allProjects = [];
  }

  // Dynamic categories
  const uniqueCategories = Array.from(
    new Set(allProjects.map((p) => p.category).filter(Boolean))
  );
  const categories = ["All Projects", ...uniqueCategories];

  const displayedProjects =
    selectedCategory === "All Projects"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  return (
    <main>
      {/* Intro */}
      <section className="relative w-full overflow-hidden bg-transparent py-16 sm:py-24">
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <ScrollReveal direction="right">
              <div className="text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <Sparkles size={14} />
                  Portfolio
                </span>

                <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Selected projects,{" "}
                  <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    built to perform.
                  </span>
                </h1>

                <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-default-500 sm:text-lg lg:mx-0">
                  A collection of live business websites showcasing my
                  experience in WordPress development, Elementor design, and
                  digital solutions.
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                  <Link
                    href="/contact"
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-accent-hover hover:shadow-primary/40 sm:w-auto"
                  >
                    Start a Project
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-divider bg-default-100/50 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-default-100 sm:w-auto"
                  >
                    Explore Services
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-default-500 sm:text-sm lg:justify-start">
                  <span className="inline-flex items-center gap-2">
                    <Globe size={16} className="text-primary" />
                    {allProjects.length} live websites
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    250+ projects delivered
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    6+ years of experience
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.15}>
              <div className="relative rounded-3xl border border-divider bg-default-50/50 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Live project index
                  </span>
                  <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                    {allProjects.length} websites
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                  A selection of recent work.
                </h2>

                <div className="mt-6 space-y-3">
                  {allProjects.length > 0 ? (
                    allProjects.slice(0, 6).map((project, index) => {
                      const itemNumber = String(index + 1).padStart(2, "0");
                      const targetUrl = project.slug
                        ? `/portfolio/${project.slug}`
                        : project.liveUrl || "#projects";
                      const isExternal = !project.slug && Boolean(project.liveUrl);

                      return (
                        <Link
                          key={project._id || index}
                          href={targetUrl}
                          {...(isExternal
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="group flex items-center justify-between gap-4 rounded-2xl border border-divider bg-background p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                              {itemNumber}
                            </span>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                                {project.title}
                              </p>
                              <p className="mt-0.5 text-xs text-default-500">
                                {project.category}
                              </p>
                            </div>
                          </div>

                          <ArrowRight
                            size={18}
                            className="shrink-0 text-default-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary"
                          />
                        </Link>
                      );
                    })
                  ) : (
                    <div className="rounded-2xl border border-dashed border-divider bg-background/50 p-6 text-center text-xs text-default-400">
                      No live projects currently listed.
                    </div>
                  )}
                </div>

                <p className="mt-4 text-xs text-default-400">
                  All links open the live website in a new tab.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="relative w-full overflow-hidden bg-transparent py-20 sm:py-28"
      >
        <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Selected Work
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Live websites,{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  real businesses.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-default-500 sm:text-lg">
                Every project below is live. Visit each website to see the
                design, structure, and experience in context.
              </p>
            </div>
          </ScrollReveal>

          {/* Dynamic Category Filter */}
          {categories.length > 1 && (
            <ScrollReveal delay={0.1}>
              <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  const href =
                    category === "All Projects"
                      ? "/portfolio#projects"
                      : `/portfolio?category=${encodeURIComponent(category)}#projects`;

                  return (
                    <Link
                      key={category}
                      href={href}
                      scroll={false}
                      className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                          : "border-divider bg-default-100/50 text-default-500 hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      {category}
                    </Link>
                  );
                })}
              </div>
            </ScrollReveal>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.length > 0 ? (
              displayedProjects.map((project, index) => {
                const itemNumber = String(index + 1).padStart(2, "0");
                const domain = getDomain(project.liveUrl);
                const description = project.shortDescription || project.description;
                const tags = Array.isArray(project.technologies) ? project.technologies : [];

                return (
                  <ScrollReveal
                    key={project._id || index}
                    delay={(index % 3) * 0.1}
                    direction="up"
                    className="h-full"
                  >
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-divider bg-default-50/50 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5">
                      {/* Project Preview */}
                      <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-default-200 via-default-100 to-primary/10 p-5 sm:p-6">
                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="relative flex h-full flex-col overflow-hidden rounded-xl border border-divider bg-background shadow-xl transition-transform duration-700 group-hover:scale-[1.03] block"
                          aria-label={`View ${project.title} case study`}
                        >
                          {/* Browser Header */}
                          <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-divider bg-default-100 px-3">
                            <span className="h-2 w-2 rounded-full bg-red-400" />
                            <span className="h-2 w-2 rounded-full bg-yellow-400" />
                            <span className="h-2 w-2 rounded-full bg-green-400" />

                            <div className="ml-3 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-default-200 px-2 py-1">
                              <LockKeyhole
                                size={10}
                                className="shrink-0 text-success"
                              />
                              <span className="truncate text-[10px] font-medium text-default-500">
                                {domain || project.slug || "website"}
                              </span>
                            </div>
                          </div>

                          {/* Website Preview */}
                          {project.thumbnail ? (
                            <div className="relative flex-1 overflow-hidden bg-default-100">
                              <img
                                src={project.thumbnail}
                                alt={project.title}
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
                                Live Website
                              </span>
                            </div>
                          )}
                        </Link>

                        {/* Project Number */}
                        <div className="absolute right-8 top-8 rounded-lg border border-white/20 bg-background/80 px-3 py-1.5 text-xs font-bold text-foreground shadow-lg backdrop-blur-md">
                          {itemNumber}
                        </div>

                        {/* Hover Overlay */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
                          <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-transform duration-500 group-hover:scale-100">
                            <ArrowRight size={22} />
                          </span>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="flex flex-1 flex-col p-6 sm:p-7">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                              {project.category}
                            </span>

                            <h3 className="mt-2 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                              <Link href={`/portfolio/${project.slug}`}>
                                {project.title}
                              </Link>
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

                        <div className="mt-auto flex items-center justify-between border-t border-divider pt-5 text-sm font-semibold">
                          <Link
                            href={`/portfolio/${project.slug}`}
                            className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                          >
                            <span>View Case Study</span>
                            <ArrowRight
                              size={16}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </Link>

                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-default-400 hover:text-primary transition-colors"
                              title="Visit live site in new tab"
                            >
                              <span>Live Site</span>
                              <ArrowUpRight size={14} />
                            </a>
                          ) : (
                            <span className="text-xs text-default-400">In Production</span>
                          )}
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-divider bg-default-50/30 p-12 text-center">
                <p className="text-sm font-medium text-default-400">
                  No published projects found
                  {selectedCategory !== "All Projects"
                    ? ` in "${selectedCategory}"`
                    : ""}
                  . Check back soon or contact us directly.
                </p>
              </div>
            )}

            {/* CTA Card */}
            <ScrollReveal delay={0.2} direction="up" className="h-full">
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-default-50/50 to-secondary/10 p-8 text-center shadow-xl sm:p-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles size={26} />
                </span>

                <h3 className="mt-6 text-2xl font-bold text-foreground">
                  Your project could be next.
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-7 text-default-500">
                  Let&apos;s build a website that makes your business stand out
                  and performs for years to come.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-accent-hover hover:shadow-primary/40"
                >
                  Start a Project
                  <ArrowUpRight size={17} />
                </Link>

                <p className="mt-4 text-xs text-default-400">
                  Free consultation · Reply within 24 hours
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="relative w-full overflow-hidden bg-transparent py-20 sm:py-28">
        <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Built With Care
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Every project shares the{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  same standards.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-default-500 sm:text-lg">
                The work above reflects the same approach I bring to every
                build: thoughtful design, clean development, and a focus on
                long-term reliability.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {standards.map((standard, index) => {
              const Icon = standard.icon;

              return (
                <ScrollReveal
                  key={standard.title}
                  delay={index * 0.08}
                  direction="up"
                  className="h-full"
                >
                  <div className="group h-full rounded-2xl border border-divider bg-default-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon size={23} />
                    </span>

                    <h3 className="mt-5 text-base font-bold text-foreground">
                      {standard.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-default-500">
                      {standard.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
