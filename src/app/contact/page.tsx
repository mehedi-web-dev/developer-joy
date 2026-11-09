"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const services = [
  "WordPress Website Design",
  "Elementor Development",
  "WooCommerce Development",
  "Website Redesign",
  "WordPress Bug Fixing",
  "Malware Removal & Security",
  "Website Speed Optimization",
  "WordPress Migration",
  "Other",
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message.");
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully!",
      });

      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full min-w-0 rounded-xl border border-divider bg-default-100/60 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-default-400 focus:border-primary focus:bg-default-100 focus:ring-2 focus:ring-primary/20";

  const labelClass = "mb-2 block text-sm font-semibold text-foreground";

  const contactCardClass =
    "group flex min-w-0 items-center gap-4 rounded-2xl border border-divider bg-default-50/60 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-default-100/70";

  return (
    <main className="relative min-h-screen overflow-x-clip px-4 py-16 sm:px-6 lg:py-24">
      {/* Ambient glows over the site-wide animated background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* Contact Form */}
        <section className="relative min-w-0 overflow-hidden rounded-[28px] border border-divider bg-default-50/70 p-5 shadow-2xl shadow-primary/5 backdrop-blur-xl sm:p-8">
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Send Me a Message
            </h1>

            <p className="mt-2 text-sm text-default-500 sm:text-base">
              Fill out the form and I&apos;ll get back to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative space-y-5">
            {/* Name and Email */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="name" className={labelClass}>
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  maxLength={100}
                  autoComplete="name"
                  className={inputClass}
                />
              </div>

              <div className="min-w-0">
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  maxLength={254}
                  autoComplete="email"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className={labelClass}>
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="How can I help you?"
                required
                maxLength={150}
                className={inputClass}
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className={labelClass}>
                What do you need?
              </label>

              <div className="relative">
                <select
                  id="service"
                  name="service"
                  required
                  defaultValue=""
                  className={`${inputClass} appearance-none pr-11`}
                >
                  <option
                    value=""
                    disabled
                    className="bg-background text-foreground"
                  >
                    Select a service
                  </option>

                  {services.map((service) => (
                    <option
                      key={service}
                      value={service}
                      className="bg-background text-foreground"
                    >
                      {service}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-default-400"
                />
              </div>
            </div>

            {/* Project Details */}
            <div>
              <label htmlFor="message" className={labelClass}>
                Project Details
              </label>

              <textarea
                id="message"
                name="message"
                rows={6}
                minLength={10}
                maxLength={5000}
                required
                placeholder="Tell me about your project..."
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Status */}
            {status && (
              <div
                role="status"
                aria-live="polite"
                className={`rounded-xl border p-3 text-sm ${
                  status.type === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                    : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-default-400">
              Your message will be sent directly to my email.
            </p>
          </form>
        </section>

        {/* Contact Information */}
        <aside className="min-w-0 space-y-8 lg:pt-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Get In Touch
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Great Together.
              </span>
            </h2>

            <p className="mt-4 leading-7 text-default-500">
              Have a project in mind or need help with your website? Feel free
              to reach out. I&apos;d love to hear from you.
            </p>
          </div>

          {/* Email */}
          <a href="mailto:mehedihasan958327@gmail.com" className={contactCardClass}>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Mail size={22} />
            </span>

            <span className="min-w-0">
              <span className="block text-sm text-default-500">
                Email Address
              </span>

              <span className="break-all font-semibold text-foreground">
                mehedihasan958327@gmail.com
              </span>
            </span>
          </a>

          {/* Phone */}
          <a href="tel:+8801610186886" className={contactCardClass}>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Phone size={22} />
            </span>

            <span className="min-w-0">
              <span className="block text-sm text-default-500">Phone Number</span>

              <span className="break-words font-semibold text-foreground">
                +8801610186886
              </span>
            </span>
          </a>

          {/* Location */}
          <div className={contactCardClass}>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <MapPin size={22} />
            </span>

            <span className="min-w-0">
              <span className="block text-sm text-default-500">Location</span>

              <span className="break-words font-semibold text-foreground">
                Noakhali-3890, Bangladesh
              </span>
            </span>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3 pt-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>

            <p className="text-sm text-default-500">Available for new projects</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
