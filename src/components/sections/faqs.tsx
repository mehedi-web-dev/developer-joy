"use client";

import * as React from "react";
import { AccordionItem } from "@/components/ui/accordion-item";
import { getPublicFaqs } from "@/lib/api";
import type { Faq } from "@/types/cms";

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const FALLBACK_FAQS: FaqItem[] = [
  {
    id: "1",
    q: "How fast will my new website or store be completed?",
    a: "Your complete website or webshop is guaranteed to go live within 7 to 10 business days, assuming all initial content, design assets, and feedback are provided promptly.",
  },
  {
    id: "2",
    q: "Are there any hidden costs or unexpected charges?",
    a: "No, absolutely not. I work strictly with transparent, upfront fixed project quotes. You will know the exact investment, deliverables, and timeline before we write a single line of code.",
  },
  {
    id: "3",
    q: "Do you provide support and maintenance after launch?",
    a: "Yes! Every project includes a 30-day post-launch warranty. In addition, I offer flexible monthly care plans covering regular updates, cloud backups, security scans, and ongoing content assistance.",
  },
  {
    id: "4",
    q: "What technologies and platforms do you specialize in?",
    a: "My core expertise lies in custom WordPress development, Elementor Pro, Crocoblock, WooCommerce, as well as modern frontend web stacks using React, Next.js, TypeScript, and Tailwind CSS.",
  },
  {
    id: "5",
    q: "How do we communicate and collaborate during the project?",
    a: "I communicate actively via WhatsApp, Slack, email, and scheduled Google Meet / Zoom calls. You will receive interactive staging previews and regular milestone updates throughout the development lifecycle.",
  },
  {
    id: "6",
    q: "What type of clients do you typically partner with?",
    a: "I work with ambitious small-to-medium businesses, SaaS startups, digital marketing agencies, creative studios, and entrepreneurs seeking a high-converting, professional web presence.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number>(-1);
  const [faqs, setFaqs] = React.useState<FaqItem[]>(FALLBACK_FAQS);

  React.useEffect(() => {
    let isMounted = true;
    getPublicFaqs({ limit: 50 })
      .then((res) => {
        if (isMounted && res?.data && Array.isArray(res.data) && res.data.length > 0) {
          const published = res.data.filter((f: Faq) => f.status === "published" || !f.status);
          if (published.length > 0) {
            const mapped: FaqItem[] = published.map((f: Faq) => ({
              id: f._id,
              q: f.question,
              a: f.answer,
            }));
            setFaqs(mapped);
          }
        }
      })
      .catch((err) => {
        console.warn("Backend FAQs API unavailable, using fallback FAQs:", err?.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="faqs" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-black/10 dark:border-white/10">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-[#65a30d] dark:text-[#c6ff00] font-mono font-semibold block mb-2">
          Questions &amp; Answers
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="border-t border-black/10 dark:border-white/10 divide-y divide-black/10 dark:divide-white/10">
        {faqs.map((faq, idx) => (
          <AccordionItem
            key={faq.id || idx}
            number={`0${idx + 1}.`}
            title={faq.q}
            subtitle={faq.a}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
          />
        ))}
      </div>
    </section>
  );
}
