"use client";

import ScrollReveal from "../ScrollReveal";



const skillGroups = [
  {
    number: "01",
    title: "WordPress Development",
    description: "My primary area of expertise",
    skills: [
      "WordPress",
      "Elementor",
      "Elementor Pro",
      "WooCommerce",
      "Crocoblock",
      "JetEngine",
      "ACF",
      "WordPress Security",
    ],
  },
  {
    number: "02",
    title: "Frontend Development",
    description: "Modern and responsive user interfaces",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "HeroUI",
    ],
  },
  {
    number: "03",
    title: "Backend & Database",
    description: "Server-side development technologies",
    skills: ["Node.js", "Express.js", "MongoDB", "REST API"],
  },
  {
    number: "04",
    title: "Tools & Other Expertise",
    description: "Development and website management tools",
    skills: [
      "Git",
      "GitHub",
      "Figma",
      "cPanel",
      "Plesk",
      "Website Migration",
      "Malware Removal",
      "Speed Optimization",
    ],
  },
];

const SkillsSection = () => {
  return (
    <section
      id="skills"
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
              My Expertise
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Skills &{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Technologies
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-default-500 sm:text-lg">
              A combination of professional WordPress expertise and modern web
              development technologies to build powerful digital experiences.
            </p>
          </div>
        </ScrollReveal>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <ScrollReveal
              key={group.number}
              delay={(index % 2) * 0.15}
              direction={index % 2 === 0 ? "right" : "left"}
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-divider bg-default-50/50 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-9">
                {/* Decorative Glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Category Header */}
                <div className="relative flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold tracking-[0.2em] text-primary">
                      / {group.number}
                    </span>

                    <h3 className="mt-4 text-xl font-bold text-foreground sm:text-2xl">
                      {group.title}
                    </h3>

                    <p className="mt-2 text-sm text-default-500">
                      {group.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-divider bg-default-100 text-primary transition-all duration-300 group-hover:rotate-45 group-hover:border-primary/40 group-hover:bg-primary group-hover:text-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-7 h-px w-full bg-divider" />

                {/* Skills Tags */}
                <div className="relative flex flex-wrap gap-2.5">
                  {group.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      style={{
                        animationDelay: `${skillIndex * 70}ms`,
                      }}
                      className="animate-in fade-in slide-in-from-bottom-2 rounded-lg border border-divider bg-background px-3.5 py-2 text-sm font-medium text-default-600 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Highlight */}
        <ScrollReveal delay={0.2}>
          <div className="mt-14 rounded-3xl border border-primary/20 bg-primary/5 px-6 py-10 text-center sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
                <path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" />
              </svg>
            </div>

            <h3 className="mt-5 text-2xl font-bold text-foreground sm:text-3xl">
              Always Learning, Always Improving
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-default-500 sm:text-base">
              Technology keeps evolving, and so do I. I continuously explore new
              tools and technologies to deliver better solutions and digital
              experiences.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SkillsSection;
