import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Globe,
  Layers,
  LockKeyhole,
  MonitorSmartphone,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";
import ScrollReveal from "@/app/component/ScrollReveal";
import {
  getPublicProjects,
  getPublicProjectByIdOrSlug,
} from "@/lib/server-api";
import { Project } from "@/types/project";

export const revalidate = 60;
export const dynamicParams = true;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export type ExtendedProject = Project & {
  displayOrder?: number;
  gallery?: string[];
};

const getDomain = (url?: string) => {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

/**
 * Generate static params for ISR prerendering of published projects.
 */
export async function generateStaticParams() {
  try {
    const res = await getPublicProjects({ limit: 100 });
    if (res?.data && Array.isArray(res.data)) {
      return res.data
        .filter((p) => p.status === "published" && p.slug)
        .map((p) => ({ slug: p.slug }));
    }
  } catch {
    // If backend is unavailable during build, dynamic rendering handles it
  }
  return [];
}

/**
 * Generate dynamic metadata for SEO and social sharing.
 */
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await getPublicProjectByIdOrSlug(slug);
    if (!res?.data || res.data.status !== "published") {
      return {
        title: "Project Not Found | Developer Joy",
        description: "The requested project case study could not be found.",
      };
    }

    const project = res.data;
    const title = `${project.title} | Portfolio Case Study | Developer Joy`;
    const description =
      project.shortDescription ||
      (project.description
        ? project.description.replace(/\s+/g, " ").slice(0, 160).trim()
        : "View this live WordPress and web development case study by Developer Joy.");

    const ogImages = project.thumbnail
      ? [
          {
            url: project.thumbnail,
            width: 1200,
            height: 630,
            alt: `${project.title} Preview`,
          },
        ]
      : [];

    return {
      title,
      description,
      alternates: {
        canonical: `/portfolio/${project.slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://developer-joy.vercel.app/portfolio/${project.slug}`,
        siteName: "Developer Joy",
        type: "article",
        images: ogImages,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: project.thumbnail ? [project.thumbnail] : [],
      },
    };
  } catch {
    return {
      title: "Project Not Found | Developer Joy",
      description: "The requested project case study could not be found.",
    };
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  let project: ExtendedProject | null = null;
  let allPublished: ExtendedProject[] = [];

  try {
    const [singleRes, allRes] = await Promise.all([
      getPublicProjectByIdOrSlug(slug),
      getPublicProjects({ limit: 100 }),
    ]);

    if (singleRes?.data && singleRes.data.status === "published") {
      project = singleRes.data;
    }

    if (allRes?.data && Array.isArray(allRes.data)) {
      const published = allRes.data.filter(
        (p) => p.status === "published" && p.title
      );

      // Sort by displayOrder asc, then createdAt desc
      published.sort((a, b) => {
        const orderA = (a as ExtendedProject).displayOrder ?? 0;
        const orderB = (b as ExtendedProject).displayOrder ?? 0;
        if (orderA !== orderB) return orderA - orderB;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      allPublished = published;
    }
  } catch (err: unknown) {
    console.error("Error fetching project details:", err instanceof Error ? err.message : String(err));
  }

  // Strictly enforce 404 if project is missing or not published
  if (!project) {
    notFound();
  }

  // Calculate Previous and Next published projects
  const currentIndex = allPublished.findIndex(
    (p) => p.slug === project?.slug || p._id === project?._id
  );

  const prevProject =
    currentIndex > 0 ? allPublished[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < allPublished.length - 1
      ? allPublished[currentIndex + 1]
      : null;

  // Calculate Related Projects (prioritizing same category, excluding current)
  const otherProjects = allPublished.filter(
    (p) => p.slug !== project?.slug && p._id !== project?._id
  );

  const sameCategory = otherProjects.filter(
    (p) => p.category.toLowerCase() === project?.category.toLowerCase()
  );
  const differentCategory = otherProjects.filter(
    (p) => p.category.toLowerCase() !== project?.category.toLowerCase()
  );

  const relatedProjects = [...sameCategory, ...differentCategory].slice(0, 3);

  const domain = getDomain(project.liveUrl);
  const formattedDate = formatDate(project.createdAt);
  const galleryImages =
    Array.isArray(project.gallery) && project.gallery.length > 0
      ? project.gallery
      : [project.thumbnail].filter(Boolean);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background py-12 sm:py-16 lg:py-20 text-foreground">
      {/* Background Glow Orbs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 top-96 h-96 w-96 rounded-full bg-purple-600/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back Link */}
        <ScrollReveal>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-divider pb-5">
            <nav className="flex items-center gap-2 text-xs font-medium text-default-400">
              <Link
                href="/"
                className="hover:text-primary transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/portfolio"
                className="hover:text-primary transition-colors"
              >
                Portfolio
              </Link>
              <span>/</span>
              <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs">
                {project.title}
              </span>
            </nav>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 rounded-lg border border-divider bg-default-100/50 px-3.5 py-1.5 text-xs font-medium text-default-500 hover:border-primary/40 hover:text-primary transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to All Projects</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* SECTION A: Project Hero */}
        <section className="mb-14 lg:mb-20">
          <ScrollReveal delay={0.05}>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  {project.category}
                </span>

                {project.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                    <Sparkles size={12} />
                    Featured Project
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                {project.title}
              </h1>

              {project.shortDescription && (
                <p className="max-w-3xl text-base sm:text-xl leading-relaxed text-default-500">
                  {project.shortDescription}
                </p>
              )}

              {/* Action Buttons & Tech Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    <Globe size={16} />
                    <span>Visit Live Website</span>
                    <ArrowUpRight size={16} />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-divider bg-default-100/60 px-5 py-3 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    <Code2 size={16} />
                    <span>View Repository</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Browser Frame Showcase */}
          <ScrollReveal delay={0.15} className="mt-10 lg:mt-14">
            <div className="relative overflow-hidden rounded-2xl border border-divider bg-default-100/40 p-3 sm:p-5 shadow-2xl backdrop-blur-sm">
              <div className="flex h-10 items-center justify-between border-b border-divider bg-default-100 px-4 rounded-t-xl">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>

                <div className="flex max-w-sm sm:max-w-md flex-1 items-center justify-center mx-4">
                  <div className="flex w-full items-center justify-center gap-1.5 rounded-md bg-default-200/70 px-3 py-1 text-center">
                    <LockKeyhole size={11} className="text-emerald-400 shrink-0" />
                    <span className="truncate text-xs font-mono text-default-500">
                      {domain ? `https://${domain}` : `developerjoy.dev/portfolio/${project.slug}`}
                    </span>
                  </div>
                </div>

                <div className="w-10 text-right">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-default-400 hover:text-primary transition-colors"
                      title="Open in new tab"
                    >
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </div>

              {/* Main Image Showcase */}
              <div className="relative aspect-video w-full overflow-hidden rounded-b-xl bg-default-950/40 flex items-center justify-center">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} Full Showcase`}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center text-default-400">
                    <Layers size={48} className="text-default-600 mb-3" />
                    <span className="text-base font-semibold text-foreground">
                      {project.title}
                    </span>
                    <span className="text-xs text-default-500 mt-1">
                      Live website showcase in production
                    </span>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION B & D: Project Overview + Specification Sidebar */}
        <section className="mb-16 lg:mb-24 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Full Narrative / Overview (2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            <ScrollReveal delay={0.1}>
              <div className="rounded-3xl border border-divider bg-default-50/40 p-6 sm:p-10 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5 pb-4 border-b border-divider">
                  <Layers className="text-primary" size={22} />
                  <span>Project Overview & Scope</span>
                </h2>

                <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-default-500 whitespace-pre-line">
                  {project.description}
                </div>
              </div>
            </ScrollReveal>

            {/* Architecture Standards */}
            <ScrollReveal delay={0.15}>
              <div className="rounded-3xl border border-divider bg-default-50/40 p-6 sm:p-10 shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2.5 mb-6">
                  <CheckCircle2 className="text-primary" size={20} />
                  <span>Core Implementation Standards</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 rounded-2xl border border-divider bg-default-100/50 p-4">
                    <MonitorSmartphone size={20} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        Responsive Architecture
                      </h4>
                      <p className="text-xs text-default-400 mt-1">
                        Fluid typography, adaptive navigation, and tested across mobile, tablet, and widescreen.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-divider bg-default-100/50 p-4">
                    <Zap size={20} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        Speed & Optimization
                      </h4>
                      <p className="text-xs text-default-400 mt-1">
                        Clean asset bundling, modern image formats, and minimal server overhead.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-divider bg-default-100/50 p-4">
                    <ShieldCheck size={20} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        Security Foundations
                      </h4>
                      <p className="text-xs text-default-400 mt-1">
                        Best-practice CMS security, sanitized inputs, and hardened headers.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-divider bg-default-100/50 p-4">
                    <SearchCheck size={20} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        SEO Fundamentals
                      </h4>
                      <p className="text-xs text-default-400 mt-1">
                        Structured schema markup, semantic HTML tags, and search engine friendly URLs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Project Information Card (1 col) */}
          <div className="space-y-6">
            <ScrollReveal delay={0.2}>
              <div className="sticky top-24 rounded-3xl border border-divider bg-default-50/60 p-6 sm:p-7 shadow-lg space-y-6 backdrop-blur-md">
                <h3 className="text-base font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <Tag size={16} className="text-primary" />
                  <span>Project Details</span>
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Category */}
                  <div className="flex items-center justify-between border-b border-divider pb-3">
                    <span className="text-default-400">Category</span>
                    <span className="font-semibold text-foreground">{project.category}</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between border-b border-divider pb-3">
                    <span className="text-default-400">Status</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                      Live & Operational
                    </span>
                  </div>

                  {/* Date */}
                  {formattedDate && (
                    <div className="flex items-center justify-between border-b border-divider pb-3">
                      <span className="text-default-400">Published</span>
                      <span className="font-semibold text-foreground">{formattedDate}</span>
                    </div>
                  )}

                  {/* Live Domain */}
                  {domain && (
                    <div className="flex items-center justify-between border-b border-divider pb-3">
                      <span className="text-default-400">Live URL</span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:underline truncate max-w-[160px] text-right"
                      >
                        {domain}
                      </a>
                    </div>
                  )}

                  {/* Technologies Stack */}
                  <div className="pt-2">
                    <span className="block text-default-400 text-xs font-medium uppercase tracking-wider mb-2.5">
                      Technologies & Tools
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies && project.technologies.length > 0 ? (
                        project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                          >
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-default-400">WordPress, Custom Code</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Live Link Button in Sidebar */}
                {project.liveUrl && (
                  <div className="pt-4 border-t border-divider">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer"
                    >
                      <Globe size={14} />
                      <span>Launch Live Website</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* SECTION C: Project Gallery (if multi-image or showcase grid) */}
        {galleryImages.length > 1 && (
          <section className="mb-16 lg:mb-24">
            <ScrollReveal>
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Visual Showcase
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Project Gallery
                </h3>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryImages.map((imgUrl, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <div className="group relative aspect-video overflow-hidden rounded-2xl border border-divider bg-default-100 shadow-md">
                    <img
                      src={imgUrl}
                      alt={`${project.title} Screenshot ${idx + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* SECTION F: Previous / Next Project Navigation Bar */}
        <section className="mb-16 lg:mb-24 border-y border-divider py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Previous */}
            <div>
              {prevProject ? (
                <Link
                  href={`/portfolio/${prevProject.slug}`}
                  className="group flex items-center gap-4 text-left transition-all"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-divider bg-default-100 group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors">
                    <ArrowLeft size={18} className="text-default-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-default-400">
                      Previous Project
                    </span>
                    <span className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {prevProject.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="text-xs text-default-400 italic">
                  Beginning of portfolio projects
                </div>
              )}
            </div>

            {/* Next */}
            <div className="sm:text-right">
              {nextProject ? (
                <Link
                  href={`/portfolio/${nextProject.slug}`}
                  className="group flex sm:flex-row-reverse items-center gap-4 text-left sm:text-right transition-all"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-divider bg-default-100 group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors">
                    <ArrowRight size={18} className="text-default-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-default-400">
                      Next Project
                    </span>
                    <span className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {nextProject.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="text-xs text-default-400 italic sm:text-right">
                  End of portfolio projects
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION E: Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mb-16 lg:mb-24">
            <ScrollReveal>
              <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    More Case Studies
                  </span>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Related Projects
                  </h3>
                </div>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <span>View All Projects</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {relatedProjects.map((rel, index) => {
                const relDomain = getDomain(rel.liveUrl);
                return (
                  <ScrollReveal key={rel._id || rel.slug} delay={index * 0.1}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-divider bg-default-50/50 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5">
                      <Link
                        href={`/portfolio/${rel.slug}`}
                        className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-default-200 via-default-100 to-primary/10 p-5 block"
                      >
                        <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-divider bg-background shadow-xl transition-transform duration-700 group-hover:scale-[1.03]">
                          <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-divider bg-default-100 px-3">
                            <span className="h-2 w-2 rounded-full bg-red-400" />
                            <span className="h-2 w-2 rounded-full bg-yellow-400" />
                            <span className="h-2 w-2 rounded-full bg-green-400" />
                            <div className="ml-2 flex min-w-0 flex-1 items-center gap-1 rounded bg-default-200 px-2 py-0.5">
                              <LockKeyhole size={9} className="text-emerald-400 shrink-0" />
                              <span className="truncate text-[9px] text-default-500">
                                {relDomain || rel.slug}
                              </span>
                            </div>
                          </div>

                          <div className="relative flex-1 overflow-hidden bg-default-100">
                            {rel.thumbnail ? (
                              <img
                                src={rel.thumbnail}
                                alt={rel.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-default-400 font-semibold p-4 text-center">
                                {rel.title}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>

                      <div className="flex flex-1 flex-col p-6">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                          {rel.category}
                        </span>

                        <h4 className="mt-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          <Link href={`/portfolio/${rel.slug}`}>{rel.title}</Link>
                        </h4>

                        <p className="mt-2 text-xs leading-relaxed text-default-500 line-clamp-2">
                          {rel.shortDescription || rel.description}
                        </p>

                        <div className="mt-auto pt-4 border-t border-divider flex items-center justify-between">
                          <Link
                            href={`/portfolio/${rel.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                          >
                            <span>Read Case Study</span>
                            <ArrowRight size={13} />
                          </Link>

                          {rel.liveUrl && (
                            <a
                              href={rel.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-default-400 hover:text-primary transition-colors p-1"
                              title="Visit live site"
                            >
                              <ArrowUpRight size={15} />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION G: Bottom Call To Action */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-3xl border border-divider bg-gradient-to-br from-default-100/80 via-default-50/60 to-primary/10 p-8 sm:p-14 text-center shadow-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles size={14} />
              Start Your Project
            </span>

            <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to create something remarkable?
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-default-500 sm:text-base">
              Whether you need a high-converting WooCommerce shop, a custom WordPress platform, or a modern redesign, let&apos;s build it together.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
              >
                <span>Book a Consultation</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-divider bg-default-100/60 px-6 py-3.5 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                <span>View All Work</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
