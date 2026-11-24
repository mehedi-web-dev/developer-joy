// src/app/component/Home/FaqSection.tsx
"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "../ScrollReveal";
import { getPublicFaqs } from "@/lib/api";
import { Faq } from "@/types/cms";

interface FaqSectionProps {
  initialFaqs?: Faq[];
}

const FaqSection = ({ initialFaqs }: FaqSectionProps) => {
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs || []);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [loading, setLoading] = useState<boolean>(!initialFaqs);
  const [hasFetched, setHasFetched] = useState<boolean>(Boolean(initialFaqs));

  useEffect(() => {
    // If initialFaqs was provided from a server component, no need to re-fetch on client
    if (initialFaqs && initialFaqs.length > 0) {
      setFaqs(initialFaqs);
      setLoading(false);
      setHasFetched(true);
      return;
    }

    let isMounted = true;

    async function loadFaqs() {
      try {
        const res = await getPublicFaqs({ limit: 100 });
        if (isMounted) {
          if (res?.data && Array.isArray(res.data)) {
            // Strictly filter published FAQs and sort by displayOrder ascending, then createdAt descending
            const published = res.data
              .filter((f) => f.status === "published" && f.question && f.answer)
              .sort((a, b) => {
                const orderA = a.displayOrder ?? 0;
                const orderB = b.displayOrder ?? 0;
                if (orderA !== orderB) return orderA - orderB;
                return (
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
              });
            setFaqs(published);
          } else {
            setFaqs([]);
          }
        }
      } catch (err) {
        console.error("Failed to load FAQs for homepage:", err);
        if (isMounted) {
          setFaqs([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasFetched(true);
        }
      }
    }

    loadFaqs();

    return () => {
      isMounted = false;
    };
  }, [initialFaqs]);

  // If loading and we don't have items yet, show a clean skeleton matching the FAQ cards layout
  if (loading && faqs.length === 0) {
    return (
      <section
        id="faq"
        className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
      >
        <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center animate-pulse">
            <div className="mx-auto h-7 w-20 rounded-full bg-primary/10" />
            <div className="mx-auto mt-6 h-10 w-64 rounded-xl bg-default-100" />
            <div className="mx-auto mt-4 h-5 w-80 rounded-lg bg-default-100/60" />
          </div>

          <div className="mx-auto max-w-3xl space-y-4 animate-pulse">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="h-20 rounded-2xl border border-divider bg-default-50/50"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If fetch has completed and there are no published FAQs, render an empty state notice
  if (hasFetched && faqs.length === 0) {
    return (
      <section
        id="faq"
        className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
      >
        <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                FAQ
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Questions,{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Answered
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-default-500 sm:text-lg">
                A few of the things clients most often ask before we begin.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-divider bg-default-50/30 px-6 py-12 text-center">
              <p className="text-sm font-medium text-default-400">
                Frequently asked questions are currently being updated. Please check back shortly or contact us directly.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              FAQ
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Questions,{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Answered
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-default-500 sm:text-lg">
              A few of the things clients most often ask before we begin.
            </p>
          </div>
        </ScrollReveal>

        {/* FAQ List */}
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <ScrollReveal key={faq._id || faq.question} delay={index * 0.08}>
                <div className="overflow-hidden rounded-2xl border border-divider bg-default-50/50 transition-colors duration-300 hover:border-primary/40">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-7"
                  >
                    <span className="text-base font-bold text-foreground sm:text-lg">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-divider bg-background text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      className="px-6 pb-6 sm:px-7"
                    >
                      <p className="text-sm leading-7 text-default-500 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
