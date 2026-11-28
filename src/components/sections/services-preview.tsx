"use client";

import * as React from "react";
import { AccordionItem } from "@/components/ui/accordion-item";

export function ServicesPreviewSection() {
  const [openIndex, setOpenIndex] = React.useState<number>(-1);

  const services = [
    {
      title: "Custom WordPress & Elementor Pro",
      subtitle:
        "Pixel-perfect, fully responsive WordPress websites built with custom post types, dynamic listings (Crocoblock), and intuitive theme options.",
      items: [
        "Figma/XD to pixel-perfect WordPress conversion",
        "Custom Elementor Pro widgets and reusable design systems",
        "Clean, bloated-plugin-free architecture for maximum speed",
      ],
    },
    {
      title: "Modern Full-Stack & Frontend Apps (React & Next.js)",
      subtitle:
        "High-performance, dynamic web applications utilizing the modern React ecosystem, server-side rendering, and responsive Tailwind UI.",
      items: [
        "Next.js App Router with server components and edge rendering",
        "TypeScript for bulletproof stability and type safety",
        "Fluid micro-interactions and animations powered by Framer Motion",
      ],
    },
    {
      title: "E-Commerce & High-Converting WooCommerce Stores",
      subtitle:
        "Robust WooCommerce platforms optimized for smooth checkout flows, secure payment gateways, and effortless inventory management.",
      items: [
        "Custom cart and multi-step checkout optimization",
        "Stripe, PayPal, and international payment integrations",
        "Conversion rate optimization (CRO) and product filters",
      ],
    },
    {
      title: "Speed Optimization, SEO & Security Hardening",
      subtitle:
        "Comprehensive technical audits, Core Web Vitals optimization, on-page SEO structuring, and ironclad malware protection.",
      items: [
        "90+ Google PageSpeed and GTmetrix optimization scores",
        "Schema markup, semantic HTML, and search indexing",
        "Security hardening, firewall configuration, and malware cleanup",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Column */}
        <div className="md:col-span-5">
          <span className="text-xs uppercase tracking-widest text-[#65a30d] dark:text-[#c6ff00] font-mono font-semibold block mb-2">
            Services &amp; Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight mb-4">
            Smart Web Solutions for Digital Growth
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
            A beautiful website is just the beginning. With performance engineering, conversion-focused design, and modern web architecture, we turn passive visitors into loyal clients.
          </p>
        </div>

        {/* Right Column Accordions */}
        <div className="md:col-span-7 border-t border-black/10 dark:border-white/10 divide-y divide-black/10 dark:divide-white/10">
          {services.map((item, idx) => (
            <AccordionItem
              key={idx}
              number={`0${idx + 1}.`}
              title={item.title}
              subtitle={item.subtitle}
              items={item.items}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
