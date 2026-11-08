"use client";

import ScrollReveal from "../ScrollReveal";


const testimonials = [
  {
    id: "01",
    name: "Thomas Vogel",
    role: "CEO, LumenCRM",
    initials: "TV",
    rating: 5,
    review:
      "Our landing page went from good to exceptional. Joy is meticulous, thoughtful and genuinely invested in the outcome.",
  },
  {
    id: "02",
    name: "Amelia Carter",
    role: "Marketing Director, Meridian",
    initials: "AC",
    rating: 5,
    review:
      "Joy transformed our outdated site into a high-converting platform. Communication was flawless and delivery was ahead of schedule.",
  },
  {
    id: "03",
    name: "David Novak",
    role: "Founder, Coalfire Agency",
    initials: "DN",
    rating: 5,
    review:
      "The most reliable WordPress developer we've worked with. Our Elementor builds are faster, cleaner and easier for our team to maintain.",
  },
  {
    id: "04",
    name: "Sofia Rahman",
    role: "Owner, Nova Apparel",
    initials: "SR",
    rating: 5,
    review:
      "Our WooCommerce store finally feels premium. Conversion is up 42% since relaunch and support has been outstanding.",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-default-300 text-default-300"
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2.5 15 8.8l7 .9-5.1 4.9 1.2 7-6.1-3.3-6.1 3.3 1.2-7L2 9.7l7-.9L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
};

const QuoteIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-primary/20"
  >
    <path d="M11 5H5a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h3l-2 5h3l4-8V8a3 3 0 0 0-2-3Zm10 0h-6a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h3l-2 5h3l4-8V8a3 3 0 0 0-2-3Z" />
  </svg>
);

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
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
              Client Testimonials
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              What Clients{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Say About Me
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-default-500 sm:text-lg">
              Building great websites is important, but building strong client
              relationships matters just as much.
            </p>
          </div>
        </ScrollReveal>

        {/* Review Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal
              key={testimonial.id}
              delay={index * 0.15}
              direction="up"
              className="h-full"
            >
              <article className="group relative flex h-full flex-col rounded-2xl border border-divider bg-default-50/50 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-8">
                {/* Top */}
                <div className="flex items-center justify-between">
                  <QuoteIcon />

                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Review */}
                <p className="mt-7 flex-1 text-sm leading-8 text-default-500">
                  &ldquo;{testimonial.review}&rdquo;
                </p>

                {/* Divider */}
                <div className="my-7 h-px w-full bg-divider" />

                {/* Client Information */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                    {testimonial.initials}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground">
                      {testimonial.name}
                    </h3>

                    <p className="mt-1 text-xs text-default-500">
                      {testimonial.role}
                    </p>
                  </div>

                  <div className="ml-auto text-xs font-bold text-default-400">
                    {testimonial.id}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Highlight */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 rounded-3xl border border-divider bg-default-100/50 p-8 text-center sm:p-12">
            <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
              Your Project Could Be Next
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-default-500 sm:text-base">
              Looking for a reliable WordPress developer? Let&apos;s discuss
              your project and create something exceptional together.
            </p>

            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/40"
            >
              Work With Me
              <span>↗</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
