import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightLeft,
  ArrowUpRight,
  Braces,
  Bug,
  CheckCircle2,
  ClipboardList,
  Code2,
  Gauge,
  LayoutTemplate,
  LifeBuoy,
  LockKeyhole,
  MonitorSmartphone,
  Palette,
  RefreshCw,
  Rocket,
  Search,
  SearchCheck,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Wrench,
} from "lucide-react";
import ScrollReveal from "../component/ScrollReveal";

export const metadata: Metadata = {
  title: "WordPress Services | Developer Joy",
  description:
    "Explore WordPress development, Elementor design, WooCommerce, security, speed optimization, migration, bug fixing, and maintenance services from Developer Joy.",
};

const heroItems = [
  {
    icon: LayoutTemplate,
    title: "Design & Development",
    description: "WordPress, Elementor Pro, and custom builds",
  },
  {
    icon: ShoppingCart,
    title: "eCommerce",
    description: "WooCommerce stores built to convert",
  },
  {
    icon: ShieldCheck,
    title: "Security & Performance",
    description: "Hardened, fast, and reliable websites",
  },
  {
    icon: RefreshCw,
    title: "Migration & Support",
    description: "Stress-free moves and ongoing care",
  },
];

const services = [
  {
    number: "01",
    icon: Code2,
    title: "WordPress Website Development",
    description:
      "Custom, scalable WordPress websites built with clean code, responsive layouts, and editor-friendly functionality that helps your business grow.",
    includes: [
      "Custom theme and block development",
      "Responsive, editor-friendly layouts",
      "Launch-ready performance setup",
    ],
    tags: ["WordPress", "Custom Development"],
  },
  {
    number: "02",
    icon: LayoutTemplate,
    title: "Elementor Website Design",
    description:
      "Beautiful, conversion-focused Elementor and Elementor Pro designs with pixel-perfect layouts, advanced interactions, and reusable templates.",
    includes: [
      "Elementor Pro page design",
      "Reusable templates and global styles",
      "Responsive interactions and animations",
    ],
    tags: ["Elementor", "Elementor Pro"],
  },
  {
    number: "03",
    icon: ShoppingCart,
    title: "WooCommerce Development",
    description:
      "High-converting online stores with secure checkout, payment integration, product management, and seamless shopping experiences.",
    includes: [
      "Store setup and product structure",
      "Payment and shipping integrations",
      "Secure, conversion-focused checkout",
    ],
    tags: ["WooCommerce", "eCommerce"],
  },
  {
    number: "04",
    icon: Palette,
    title: "Website Redesign",
    description:
      "Transform an outdated site into a modern, responsive, and professional experience that improves usability, brand perception, and conversions.",
    includes: [
      "UX and content review",
      "Modern visual refresh",
      "Conversion-focused improvements",
    ],
    tags: ["UI/UX", "Redesign"],
  },
  {
    number: "05",
    icon: ArrowRightLeft,
    title: "Website Migration",
    description:
      "Zero-downtime moves between hosts, domains, or platforms with complete database, media, DNS, and email integrity.",
    includes: [
      "Host, domain, or platform moves",
      "Database, media, and email integrity",
      "Zero-downtime deployment",
    ],
    tags: ["Migration", "cPanel"],
  },
  {
    number: "06",
    icon: Bug,
    title: "WordPress Bug Fixing",
    description:
      "Fast, decisive fixes for theme, plugin, PHP, and layout issues, including broken checkouts, white screens, and cross-browser problems.",
    includes: [
      "Theme and plugin conflict fixes",
      "PHP, layout, and checkout issues",
      "Cross-browser testing",
    ],
    tags: ["Bug Fixing", "Troubleshooting"],
  },
  {
    number: "07",
    icon: ShieldCheck,
    title: "Malware Removal & Security",
    description:
      "Remove malicious code, hidden backdoors, and vulnerabilities, then harden your WordPress site with firewalls, backups, and monitoring.",
    includes: [
      "Malware and backdoor cleanup",
      "Firewall, backups, and monitoring",
      "WordPress security hardening",
    ],
    tags: ["Malware Removal", "Security"],
  },
  {
    number: "08",
    icon: Gauge,
    title: "Website Speed Optimization",
    description:
      "Improve Core Web Vitals with caching, image and database cleanup, script optimization, and performance tuning for faster load times.",
    includes: [
      "Core Web Vitals audit",
      "Caching, images, and database cleanup",
      "Script and asset optimization",
    ],
    tags: ["Performance", "Core Web Vitals"],
  },
  {
    number: "09",
    icon: Braces,
    title: "Custom WordPress Development",
    description:
      "Custom themes, plugins, post types, fields, and API integrations built to fit your workflow and scale with your business.",
    includes: [
      "Custom post types and fields",
      "Custom plugins and functionality",
      "API and third-party integrations",
    ],
    tags: ["Custom Code", "API Integration"],
  },
  {
    number: "10",
    icon: LifeBuoy,
    title: "Website Maintenance & Support",
    description:
      "Ongoing care plans covering updates, backups, uptime monitoring, security scans, performance checks, and priority support.",
    includes: [
      "Updates, backups, and uptime monitoring",
      "Security scans and performance checks",
      "Priority support and monthly reports",
    ],
    tags: ["Maintenance", "Support"],
  },
];

const includedFeatures = [
  {
    icon: MonitorSmartphone,
    title: "Responsive by default",
    description:
      "Every layout is built mobile-first and tested across modern devices and screen sizes.",
  },
  {
    icon: SearchCheck,
    title: "SEO-ready structure",
    description:
      "Semantic markup, clean heading structure, and on-page SEO fundamentals baked in.",
  },
  {
    icon: LockKeyhole,
    title: "Secure & optimized",
    description:
      "Best-practice security, fast load times, and a stable foundation from day one.",
  },
  {
    icon: LifeBuoy,
    title: "Post-launch support",
    description:
      "Clear handover, practical training, and ongoing help when you need it.",
  },
];

const processSteps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Goals",
    description:
      "We clarify your business, audience, and project goals before anything is built.",
    deliverable: "Project brief & scope",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Plan & Design",
    description:
      "A clear sitemap, content plan, and visual direction keep the project focused.",
    deliverable: "Sitemap & UI direction",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Build & Test",
    description:
      "Development, responsive testing, performance checks, and security reviews.",
    deliverable: "Tested, staged build",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Support",
    description:
      "Smooth deployment, hands-on training, and ongoing care after your site goes live.",
    deliverable: "Live site & handover",
  },
];

export default function ServicesPage() {
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
                  Services
                </span>

                <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  WordPress services{" "}
                  <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    built to perform.
                  </span>
                </h1>

                <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-default-500 sm:text-lg lg:mx-0">
                  From custom development and Elementor design to WooCommerce,
                  security, and speed optimization — I provide the technical
                  expertise and creative direction to make your website work
                  harder for your business.
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
                    href="/portfolio"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-divider bg-default-100/50 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-default-100 sm:w-auto"
                  >
                    View Portfolio
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-default-500 sm:text-sm lg:justify-start">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    250+ projects delivered
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    6+ years of experience
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    24/7 support
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.15}>
              <div className="relative rounded-3xl border border-divider bg-default-50/50 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                    At a glance
                  </span>
                  <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                    10 services
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                  One partner for your full website lifecycle.
                </h2>

                <div className="mt-7 space-y-3">
                  {heroItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="flex items-start gap-4 rounded-2xl border border-divider bg-background p-4"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon size={20} />
                        </span>

                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-xs leading-5 text-default-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <p className="text-sm font-semibold text-primary">
                    Not sure where to start?
                  </p>
                  <p className="mt-2 text-sm leading-6 text-default-500">
                    Tell me about your goals and I&apos;ll recommend the right
                    service for your project.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3"
                  >
                    Get a recommendation
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services-list"
        className="relative w-full overflow-hidden bg-transparent py-20 sm:py-28"
      >
        <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                What I Offer
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Services for every stage of your{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  WordPress journey.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-default-500 sm:text-lg">
                Whether you are launching a new site, improving an existing one,
                or need urgent help, there is a service designed for the job.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <ScrollReveal
                  key={service.number}
                  delay={(index % 2) * 0.12}
                  direction="up"
                  className="h-full"
                >
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-divider bg-default-50/50 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-8">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative flex items-center justify-between">
                      <span className="text-sm font-bold tracking-widest text-default-400">
                        / {service.number}
                      </span>

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-white">
                        <Icon size={26} />
                      </div>
                    </div>

                    <div className="relative mt-7 flex-1">
                      <h3 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                        {service.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-default-500">
                        {service.description}
                      </p>

                      <ul className="mt-5 space-y-2.5">
                        {service.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-default-500"
                          >
                            <CheckCircle2
                              size={16}
                              className="mt-0.5 shrink-0 text-primary"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative mt-6 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-divider bg-default-100 px-3 py-1.5 text-xs font-medium text-default-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-4"
                    >
                      Discuss this service
                      <ArrowUpRight size={17} />
                    </Link>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="relative w-full overflow-hidden bg-transparent py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Every Project
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Built in from the{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  start.
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {includedFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <ScrollReveal
                  key={feature.title}
                  delay={index * 0.08}
                  direction="up"
                  className="h-full"
                >
                  <div className="group h-full rounded-2xl border border-divider bg-default-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon size={23} />
                    </span>

                    <h3 className="mt-5 text-base font-bold text-foreground">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-default-500">
                      {feature.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        id="process"
        className="relative w-full overflow-hidden bg-transparent py-16 sm:py-24"
      >
        <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                How It Works
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                A clear process from{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  idea to launch.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-default-500 sm:text-lg">
                No guesswork and no surprises — just a structured path to a
                website that is ready to perform.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative mt-14 sm:mt-16">
            {/* Timeline rail — desktop */}
            <div className="pointer-events-none absolute inset-x-0 top-8 hidden lg:block">
              <div className="h-px w-full bg-gradient-to-r from-primary/0 via-primary/40 to-secondary/0" />
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {processSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <ScrollReveal
                    key={step.number}
                    delay={index * 0.12}
                    direction="up"
                    className="h-full"
                  >
                    <div className="group relative flex h-full flex-col">
                      {/* Timeline node */}
                      <div className="relative z-10 mb-6 flex items-center gap-4 lg:justify-center">
                        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-background text-primary shadow-lg shadow-primary/5 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/60 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-primary/20">
                          <Icon size={24} />
                        </span>

                        <span className="lg:hidden">
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-default-400">
                            Step
                          </span>
                          <span className="block text-sm font-bold text-foreground">
                            {step.number}
                          </span>
                        </span>
                      </div>

                      {/* Step card */}
                      <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-divider bg-background/60 p-6 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-primary/10">
                        <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-secondary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -right-2 -top-5 select-none text-7xl font-black leading-none text-foreground/[0.04] transition-colors duration-500 group-hover:text-primary/10"
                        >
                          {step.number}
                        </span>

                        <span className="relative inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Step {step.number}
                        </span>

                        <h3 className="relative mt-3 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                          {step.title}
                        </h3>

                        <p className="relative mt-2.5 flex-1 text-sm leading-7 text-default-500">
                          {step.description}
                        </p>

                        <div className="relative mt-5 flex items-center gap-2 border-t border-divider pt-4">
                          <CheckCircle2
                            size={14}
                            className="shrink-0 text-primary"
                          />
                          <span className="text-xs font-medium text-default-400">
                            {step.deliverable}
                          </span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
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
                  Need a website that performs?
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-default-500 sm:text-base">
                  Tell me about your project and I&apos;ll recommend the right
                  service, timeline, and next step.
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
                    View Portfolio
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
