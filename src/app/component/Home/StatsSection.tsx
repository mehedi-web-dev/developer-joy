"use client";

import ScrollReveal from "../ScrollReveal";

const statistics = [
  {
    value: "250+",
    label: "Projects",
  },
  {
    value: "180+",
    label: "Happy Clients",
  },
  {
    value: "6+",
    label: "Years Experience",
  },
  {
    value: "24/7",
    label: "Support",
  },
];

const StatsSection = () => {
  return (
    <section
      id="statistics"
      className="relative w-full overflow-hidden bg-transparent py-16 sm:py-24"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              By The Numbers
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              A Track Record You Can{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Trust
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {statistics.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="group relative overflow-hidden rounded-2xl border border-divider bg-default-50/50 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-8">
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <p className="relative text-3xl font-extrabold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                  {stat.value}
                </p>

                <p className="relative mt-3 text-xs font-medium text-default-500 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
