"use client";

import Link from "next/link";
import ScrollReveal from "../ScrollReveal";


const highlights = [
  {
    number: "6+",
    title: "Years Experience",
    description: "Professional WordPress development",
  },
  {
    number: "250+",
    title: "Completed Projects",
    description: "Successfully delivered projects",
  },
  {
    number: "180+",
    title: "Happy Clients",
    description: "International client experience",
  },
];

const expertise = [
  "WordPress Development",
  "Elementor & Elementor Pro",
  "WooCommerce",
  "Custom WordPress Development",
  "Malware Removal & Security",
  "Performance Optimization",
  "Website Redesign & Migration",
  "International Client Support",
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            About Me
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Turning Ideas Into{" "}
            <span className="text-primary">Digital Reality</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-default-500">
            Passionate about building modern WordPress websites that deliver
            real value to businesses worldwide.
          </p>
        </ScrollReveal>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <ScrollReveal direction="right">
            <div className="space-y-7">
              <div>
                <span className="text-sm font-semibold text-primary">
                  WHO I AM
                </span>

                <h3 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                  A WordPress Developer Focused on Quality & Performance.
                </h3>
              </div>

              <p className="leading-8 text-default-500">
                I&apos;m Developer Joy, a professional WordPress developer with
                6+ years of experience and 250+ completed projects. I build
                responsive, secure, and high-performance websites for startups,
                agencies, and eCommerce brands.
              </p>

              <p className="leading-8 text-default-500">
                My expertise covers Elementor Pro and WooCommerce development,
                custom WordPress builds, malware removal and website security,
                and performance optimization. I have worked with clients across
                the US, Europe, and Asia, focusing on reliable delivery and
                long-term results.
              </p>

              {/* Expertise */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {expertise.map((item, index) => (
                  <ScrollReveal key={item} delay={index * 0.08}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        ✓
                      </span>

                      <span className="text-sm font-medium text-default-600">
                        {item}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/40"
                >
                  Let&apos;s Work Together
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Content */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="relative">
              {/* Decorative Background */}
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-2xl" />

              <div className="relative rounded-3xl border border-divider bg-default-50/50 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
                <div className="mb-8">
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                    My Journey
                  </span>

                  <h3 className="mt-3 text-2xl font-bold text-foreground">
                    Experience & Achievements
                  </h3>
                </div>

                {/* Statistics */}
                <div className="space-y-4">
                  {highlights.map((item, index) => (
                    <ScrollReveal
                      key={item.title}
                      delay={index * 0.12}
                      direction="up"
                    >
                      <div className="group flex items-center gap-5 rounded-2xl border border-divider bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-extrabold text-primary transition-transform duration-300 group-hover:scale-110">
                          {item.number}
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-bold text-foreground">
                            {item.title}
                          </h4>

                          <p className="mt-1 text-sm text-default-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Bottom Badge */}
                <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <p className="text-sm font-medium text-primary">
                    My Philosophy
                  </p>

                  <p className="mt-2 text-sm leading-7 text-default-500">
                    Every website should be fast, functional, visually appealing
                    and built with the user experience in mind.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
