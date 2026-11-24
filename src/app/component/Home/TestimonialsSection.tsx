// src/app/component/Home/TestimonialsSection.tsx
"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "../ScrollReveal";
import { getPublicTestimonials } from "@/lib/api";
import { Testimonial } from "@/types/cms";

interface TestimonialsSectionProps {
  initialTestimonials?: Testimonial[];
}

const StarRating = ({ rating }: { rating: number }) => {
  // Clamp rating between 1 and 5
  const clampedRating = Math.max(1, Math.min(5, Math.round(rating || 5)));

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${clampedRating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className={`h-4 w-4 ${
            index < clampedRating
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

const getInitials = (name?: string) => {
  if (!name || !name.trim()) return "CL";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
};

const TestimonialsSection = ({ initialTestimonials }: TestimonialsSectionProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    initialTestimonials || []
  );
  const [loading, setLoading] = useState<boolean>(!initialTestimonials);
  const [hasFetched, setHasFetched] = useState<boolean>(Boolean(initialTestimonials));
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialTestimonials && initialTestimonials.length > 0) {
      setTestimonials(initialTestimonials);
      setLoading(false);
      setHasFetched(true);
      return;
    }

    let isMounted = true;

    async function loadTestimonials() {
      try {
        const res = await getPublicTestimonials({ limit: 50 });
        if (isMounted) {
          if (res?.data && Array.isArray(res.data)) {
            // Strictly filter published testimonials with non-empty clientName and content
            const published = res.data
              .filter(
                (t) => t.status === "published" && t.clientName && t.content
              )
              .sort((a, b) => {
                const orderA = a.displayOrder ?? 0;
                const orderB = b.displayOrder ?? 0;
                if (orderA !== orderB) return orderA - orderB;
                return (
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
              });
            setTestimonials(published);
          } else {
            setTestimonials([]);
          }
        }
      } catch (err) {
        console.error("Failed to load testimonials for homepage:", err);
        if (isMounted) {
          setTestimonials([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasFetched(true);
        }
      }
    }

    loadTestimonials();

    return () => {
      isMounted = false;
    };
  }, [initialTestimonials]);

  const handleImageError = (id: string) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  // Loading skeleton state
  if (loading && testimonials.length === 0) {
    return (
      <section
        id="testimonials"
        className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
      >
        <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center animate-pulse">
            <div className="mx-auto h-7 w-32 rounded-full bg-primary/10" />
            <div className="mx-auto mt-6 h-10 w-80 rounded-xl bg-default-100" />
            <div className="mx-auto mt-4 h-5 w-96 rounded-lg bg-default-100/60" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 animate-pulse">
            {[1, 2].map((idx) => (
              <div
                key={idx}
                className="h-64 rounded-2xl border border-divider bg-default-50/50 p-8"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Graceful empty state when no published testimonials exist
  if (hasFetched && testimonials.length === 0) {
    return (
      <section
        id="testimonials"
        className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
      >
        <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-10 max-w-3xl text-center">
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

          <ScrollReveal delay={0.1}>
            <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-divider bg-default-50/30 px-6 py-12 text-center">
              <p className="text-sm font-medium text-default-400">
                Client testimonials and case reviews are currently being curated. Check back soon or contact us to share your project feedback.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

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
          {testimonials.map((testimonial, index) => {
            const hasPhoto = Boolean(testimonial.photo) && !brokenImages[testimonial._id];
            const roleText = [testimonial.designation, testimonial.company]
              .filter(Boolean)
              .join(", ");
            const itemNumber = (index + 1).toString().padStart(2, "0");

            return (
              <ScrollReveal
                key={testimonial._id || index}
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
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Divider */}
                  <div className="my-7 h-px w-full bg-divider" />

                  {/* Client Information */}
                  <div className="flex items-center gap-4">
                    {hasPhoto ? (
                      <img
                        src={testimonial.photo}
                        alt={testimonial.clientName}
                        onError={() => handleImageError(testimonial._id)}
                        className="h-12 w-12 shrink-0 rounded-full object-cover border border-primary/20 transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                        {getInitials(testimonial.clientName)}
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground truncate">
                        {testimonial.clientName}
                      </h3>

                      {roleText && (
                        <p className="mt-1 text-xs text-default-500 truncate">
                          {roleText}
                        </p>
                      )}
                    </div>

                    <div className="ml-auto text-xs font-bold text-default-400">
                      {itemNumber}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
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
