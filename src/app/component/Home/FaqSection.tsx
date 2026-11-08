"use client";

import { useState } from "react";
import ScrollReveal from "../ScrollReveal";

const faqs = [
  {
    question: "How long does a WordPress project take?",
    answer:
      "Most projects run 3–6 weeks depending on scope. Landing pages and single-page sites are typically 1–2 weeks, while larger WooCommerce or multi-page builds require 4–8 weeks.",
  },
  {
    question: "Do you work with Elementor or custom code?",
    answer:
      "Both. I match the tool to the goal — Elementor Pro for editable, marketing-driven sites, and custom PHP or blocks when performance or unique functionality demand it.",
  },
  {
    question: "Will my website be mobile responsive?",
    answer:
      "Absolutely. Every project is designed mobile-first and tested across real devices to ensure a flawless experience on every screen.",
  },
  {
    question: "Can you optimize my existing WordPress site?",
    answer:
      "Yes. Speed optimization, security hardening, and full technical audits are among my most requested services for existing sites.",
  },
  {
    question: "Do you provide hosting recommendations?",
    answer:
      "I recommend performance hosts such as Cloudways, Kinsta, and SiteGround based on your budget, traffic, and technical needs.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
              <ScrollReveal key={faq.question} delay={index * 0.08}>
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
