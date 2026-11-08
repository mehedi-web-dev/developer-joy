import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Code2,
  Gauge,
  Globe,
  LayoutTemplate,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "../component/ScrollReveal";
import StatsSection from "../component/Home/StatsSection";

export const metadata: Metadata = {
  title: "About Developer Joy | WordPress Developer",
  description:
    "Meet Developer Joy, a professional WordPress developer with 6+ years of experience building high-performance, secure, and conversion-focused websites for clients worldwide.",
};

const principles = [
  {
    icon: Sparkles,
    title: "Craft over shortcuts",
    description:
      "Clean, maintainable code and careful attention to the details that make a website feel polished.",
  },
  {
    icon: Gauge,
    title: "Performance by default",
    description:
      "Fast-loading pages designed to meet modern Core Web Vitals and keep visitors engaged.",
  },
  {
    icon: ShieldCheck,
    title: "Security from day one",
    description:
      "Hardened WordPress builds, proactive protection, and sensible maintenance from launch onward.",
  },
  {
    icon: Globe,
    title: "Clear communication",
    description:
      "Straight answers, realistic timelines, and regular updates throughout every project.",
  },
];

const expertise = [
  {
    icon: Code2,
    title: "WordPress Development",
    description:
      "Custom, scalable WordPress websites built for speed, security, and easy content management.",
  },
  {
    icon: LayoutTemplate,
    title: "Elementor Pro",
    description:
      "Pixel-perfect Elementor builds that are fast, responsive, and simple for your team to edit.",
  },
  {
    icon: ShoppingCart,
    title: "WooCommerce",
    description:
      "Conversion-focused online stores with reliable checkout, product management, and integrations.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Malware Removal",
    description:
      "Clean infected sites, harden WordPress, and protect your business from future attacks.",
  },
  {
    icon: Gauge,
    title: "Speed Optimization",
    description:
      "Performance audits, caching, image optimization, and Core Web Vitals improvements.",
  },
  {
    icon: RefreshCw,
    title: "Migration & Maintenance",
    description:
      "Zero-downtime migrations, updates, backups, and ongoing support that keeps your site healthy.",
  },
];

export default function AboutPage() {
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
                  About Me
                </span>

                <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Developer Joy
                  </span>
                  .
                </h1>

                <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-default-500 sm:text-lg lg:mx-0">
                  I&apos;m a professional WordPress developer with more than six
                  years of experience helping startups, agencies, and eCommerce
                  brands turn their ideas into fast, secure, and
                  conversion-focused websites.
                </p>

                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-default-500 lg:mx-0">
                  My work combines clean development, thoughtful design, and a
                  deep understanding of what makes a website perform — from the
                  first plan to launch and long-term support.
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                  <Link
                    href="/contact"
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-accent-hover hover:shadow-primary/40 sm:w-auto"
                  >
                    Let&apos;s Work Together
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>

                  <Link
                    href="/portfolio"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-divider bg-default-100/50 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-default-100 sm:w-auto"
                  >
                    View My Work
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-default-500 sm:text-sm lg:justify-start">
                  <span className="inline-flex items-center gap-2">
                    <Globe size={16} className="text-primary" />
                    Clients worldwide
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck size={16} className="text-primary" />
                    250+ projects delivered
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.15}>
              <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
                <div className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-gradient-to-tr from-primary/30 via-blue-500/20 to-purple-500/30 blur-3xl" />

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

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

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

                <div className="absolute -bottom-5 left-3 rounded-2xl border border-divider bg-background/80 px-4 py-3 shadow-xl backdrop-blur-md sm:-left-5">
                  <p className="text-xs font-medium text-default-500">
                    Experience
                  </p>
                  <p className="text-lg font-bold text-foreground">6+ Years</p>
                </div>

                <div className="absolute -right-2 top-8 flex items-center gap-2 rounded-full border border-divider bg-background/80 px-3 py-2 shadow-lg backdrop-blur-md sm:-right-4">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    Available for projects
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="relative w-full overflow-hidden bg-transparent py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <ScrollReveal direction="right">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  My Story
                </span>

                <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  WordPress development with a focus on quality, performance,
                  and long-term results.
                </h2>

                <div className="mt-7 space-y-5 text-base leading-8 text-default-500">
                  <p>
                    I began building WordPress websites in 2019, starting with
                    agency work before moving into full-time freelance
                    development in 2021. Since then, I&apos;ve delivered 250+
                    projects across a wide range of industries — from corporate
                    websites and law firms to WooCommerce stores and SaaS
                    launches.
                  </p>

                  <p>
                    That experience taught me that a successful website is more
                    than a good-looking page. It has to load quickly, stay
                    secure, be easy to manage, and guide visitors toward a clear
                    action.
                  </p>

                  <p>
                    Today, I work with clients across the US, Europe, and Asia.
                    Whether I&apos;m building a new site, rescuing a broken
                    WordPress installation, or improving an existing store, my
                    goal is always the same: deliver work that is reliable,
                    maintainable, and built to grow.
                  </p>
                </div>

                <blockquote className="mt-9 rounded-2xl border-l-4 border-primary bg-primary/5 p-6 text-base font-medium italic leading-8 text-foreground">
                  &ldquo;Your website should feel expensive, load instantly, and
                  be editable by a marketer without breaking.&rdquo;
                  <footer className="mt-3 text-sm font-semibold not-italic text-primary">
                    — Developer Joy
                  </footer>
                </blockquote>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.15}>
              <div className="rounded-3xl border border-divider bg-default-50/50 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                  How I Work
                </span>

                <h3 className="mt-3 text-2xl font-bold text-foreground">
                  A simple set of principles
                </h3>

                <div className="mt-7 space-y-4">
                  {principles.map((principle, index) => {
                    const Icon = principle.icon;

                    return (
                      <ScrollReveal
                        key={principle.title}
                        delay={index * 0.08}
                        direction="up"
                      >
                        <div className="flex gap-4 rounded-2xl border border-divider bg-background p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Icon size={20} />
                          </span>

                          <div className="min-w-0">
                            <h4 className="font-semibold text-foreground">
                              {principle.title}
                            </h4>
                            <p className="mt-1 text-sm leading-6 text-default-500">
                              {principle.description}
                            </p>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Expertise */}
      <section className="relative w-full overflow-hidden bg-transparent py-20 sm:py-28">
        <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Expertise
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                What I Bring to{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Every Project
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-default-500 sm:text-lg">
                From a brand-new website to a complex WooCommerce build, every
                project gets the same focus on performance, security, and
                maintainability.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item, index) => {
              const Icon = item.icon;

              return (
                <ScrollReveal
                  key={item.title}
                  delay={index * 0.08}
                  direction="up"
                  className="h-full"
                >
                  <article className="group h-full rounded-2xl border border-divider bg-default-50/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon size={24} />
                    </span>

                    <h3 className="mt-5 text-lg font-bold text-foreground">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-default-500">
                      {item.description}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full overflow-hidden bg-transparent py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-default-50/50 to-secondary/10 p-8 text-center shadow-2xl sm:p-14">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Let&apos;s Work Together
                </span>

                <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Ready to build a WordPress website that performs?
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-default-500 sm:text-base">
                  Whether you need a new website, a redesign, or help fixing an
                  existing WordPress site, I&apos;d be happy to hear about your
                  project.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
                    href="/portfolio"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-divider bg-default-100/50 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-default-100 sm:w-auto"
                  >
                    See My Work
                  </Link>
                </div>

                <p className="mt-6 text-xs text-default-400">
                  Free consultation · Reply within 24 hours · No obligation
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
