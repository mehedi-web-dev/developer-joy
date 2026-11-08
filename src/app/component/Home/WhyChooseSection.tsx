"use client";

import ScrollReveal from "../ScrollReveal";

const reasons = [
  {
    number: "01",
    title: "Professional Design",
    description:
      "Every pixel considered — layouts that feel modern, refined, and brand-aligned.",
  },
  {
    number: "02",
    title: "Fast Delivery",
    description:
      "Reliable timelines with structured milestones from kickoff to launch.",
  },
  {
    number: "03",
    title: "SEO Friendly",
    description:
      "Semantic markup, clean structure, and on-page SEO baked into every build.",
  },
  {
    number: "04",
    title: "Mobile Responsive",
    description:
      "A flawless experience on every screen, tested across real devices.",
  },
  {
    number: "05",
    title: "Easy to Manage",
    description:
      "Editor-friendly WordPress dashboards your team can update without a developer.",
  },
  {
    number: "06",
    title: "Secure Website",
    description:
      "Hardened WordPress installs with best-practice security from day one.",
  },
  {
    number: "07",
    title: "Performance Optimized",
    description:
      "Strong Core Web Vitals and fast interactions built into every project.",
  },
  {
    number: "08",
    title: "Long-term Support",
    description:
      "Real support after launch — not a template you are left to maintain alone.",
  },
];

const WhyChooseSection = () => {
  return (
    <section
      id="why-choose"
      className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Why DeveloperJoy
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Reasons Clients Keep{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Coming Back
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-default-500 sm:text-lg">
              A blend of craft, communication, and reliability that turns first
              projects into long-term partnerships.
            </p>
          </div>
        </ScrollReveal>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <ScrollReveal key={reason.number} delay={(index % 4) * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-divider bg-default-50/50 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <span className="relative text-sm font-bold tracking-widest text-default-400">
                  / {reason.number}
                </span>

                <h3 className="relative mt-6 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {reason.title}
                </h3>

                <p className="relative mt-3 text-sm leading-7 text-default-500">
                  {reason.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
