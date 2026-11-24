// src/app/component/Home/ServicesSection.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import { getPublicServices } from "@/lib/api";
import { Service } from "@/types/cms";
import { getServiceIcon } from "@/lib/service-icons";

interface ServicesSectionProps {
  initialServices?: Service[];
}

const ServicesSection = ({ initialServices }: ServicesSectionProps) => {
  // Helper to prioritize featured services and limit to 3 maximum
  const processHomepageServices = (rawList: Service[]): Service[] => {
    const published = rawList.filter(
      (s) => s.status === "published" && s.title
    );

    const sortServices = (a: Service, b: Service) => {
      const orderA = a.displayOrder ?? 0;
      const orderB = b.displayOrder ?? 0;
      if (orderA !== orderB) return orderA - orderB;
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    };

    const featuredServices = published
      .filter((s) => Boolean(s.featured))
      .sort(sortServices);

    const nonFeaturedServices = published
      .filter((s) => !s.featured)
      .sort(sortServices);

    const combined: Service[] = [...featuredServices];
    for (const nonFeatured of nonFeaturedServices) {
      if (combined.length >= 3) break;
      if (!combined.some((s) => s._id === nonFeatured._id)) {
        combined.push(nonFeatured);
      }
    }

    return combined.slice(0, 3);
  };

  const [services, setServices] = useState<Service[]>(() =>
    initialServices ? processHomepageServices(initialServices) : []
  );
  const [loading, setLoading] = useState<boolean>(!initialServices);
  const [hasFetched, setHasFetched] = useState<boolean>(Boolean(initialServices));

  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      setServices(processHomepageServices(initialServices));
      setLoading(false);
      setHasFetched(true);
      return;
    }

    let isMounted = true;

    async function loadServices() {
      try {
        const res = await getPublicServices({ limit: 50 });
        if (isMounted) {
          if (res?.data && Array.isArray(res.data)) {
            setServices(processHomepageServices(res.data));
          } else {
            setServices([]);
          }
        }
      } catch (err) {
        console.error("Failed to load services for homepage:", err);
        if (isMounted) {
          setServices([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasFetched(true);
        }
      }
    }

    loadServices();

    return () => {
      isMounted = false;
    };
  }, [initialServices]);

  // Loading skeleton state
  if (loading && services.length === 0) {
    return (
      <section
        id="services"
        className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
      >
        <div className="pointer-events-none absolute -right-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center animate-pulse">
            <div className="mx-auto h-7 w-28 rounded-full bg-primary/10" />
            <div className="mx-auto mt-6 h-10 w-80 rounded-xl bg-default-100" />
            <div className="mx-auto mt-4 h-5 w-96 rounded-lg bg-default-100/60" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="h-72 rounded-2xl border border-divider bg-default-50/50 p-8"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Graceful empty state when no published services exist
  if (hasFetched && services.length === 0) {
    return (
      <section
        id="services"
        className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
      >
        <div className="pointer-events-none absolute -right-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                What I Do
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Services That Help Your
                <span className="mt-2 block bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Business Grow
                </span>
              </h2>

              <p className="mt-6 text-base leading-8 text-default-500 sm:text-lg">
                From custom WordPress development to website optimization, I
                provide reliable digital solutions tailored to your business
                needs.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-divider bg-default-50/30 px-6 py-12 text-center">
              <p className="text-sm font-medium text-default-400">
                Services are currently being updated. Please visit our dedicated services page or get in touch for custom inquiries.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition"
              >
                View Services Overview
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-40 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              What I Do
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Services That Help Your
              <span className="mt-2 block bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Business Grow
              </span>
            </h2>

            <p className="mt-6 text-base leading-8 text-default-500 sm:text-lg">
              From custom WordPress development to website optimization, I
              provide reliable digital solutions tailored to your business
              needs.
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service.icon);
            const itemNumber = (index + 1).toString().padStart(2, "0");
            const tags =
              service.technologies && service.technologies.length > 0
                ? service.technologies
                : service.features && service.features.length > 0
                ? service.features
                : [];

            return (
              <ScrollReveal key={service._id || index} delay={(index % 3) * 0.12}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-divider bg-default-50/50 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-8">
                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Number & Icon */}
                  <div className="relative flex items-center justify-between">
                    <span className="text-sm font-bold tracking-widest text-default-400">
                      / {itemNumber}
                    </span>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-white">
                      <Icon size={26} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative mt-8 flex-1">
                    <h3 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-default-500">
                      {service.shortDescription || service.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="relative mt-7 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-divider bg-default-100 px-3 py-1.5 text-xs font-medium text-default-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bottom Link */}
                  <Link
                    href="/contact"
                    className="relative mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-4"
                  >
                    Discuss Your Project
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
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 rounded-3xl border border-divider bg-default-100/50 p-8 text-center backdrop-blur-xl sm:p-12">
            <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
              Have a Project in Mind?
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-default-500 sm:text-base">
              Let&apos;s discuss your ideas and build something exceptional
              together.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/40"
            >
              Start a Project
              <ArrowIcon />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const ArrowIcon = () => (
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
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export default ServicesSection;
