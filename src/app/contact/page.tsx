"use client";

import { FormEvent, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

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

  return (
    <main className="relative min-h-screen overflow-x-clip px-4 py-16 text-foreground sm:px-6 lg:py-24">
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Contact Form */}
        <section className="min-w-0 rounded-[28px] border border-divider bg-default-50/50 p-5 shadow-2xl backdrop-blur-md sm:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Send Me a Message
            </h1>
            <p className="mt-2 text-sm text-default-500 sm:text-base">
              Fill out the form and I&apos;ll get back to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name and Email */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="min-w-0">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  maxLength={100}
                  className="w-full min-w-0 rounded-xl border border-divider bg-default-100/50 px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  maxLength={254}
                  className="w-full min-w-0 rounded-xl border border-divider bg-default-100/50 px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="How can I help you?"
                required
                maxLength={150}
                className="w-full rounded-xl border border-divider bg-default-100/50 px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Service */}
            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                What do you need?
              </label>
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className="w-full rounded-xl border border-divider bg-default-100/50 px-3 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                minLength={10}
                maxLength={5000}
                placeholder="Tell me about your project..."
                className="w-full resize-y rounded-xl border border-divider bg-default-100/50 px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Status */}
            {status && (
              <div
                role="status"
                className={`rounded-xl border p-3 text-sm ${
                  status.type === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                    : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>

            <p className="text-center text-xs text-default-400">
              Your message will be sent directly to my email.
            </p>
          </form>
        </section>

        {/* Contact Information */}
        <aside className="min-w-0 space-y-6 lg:pt-10">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Get in Touch
            </p>
            <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Let&apos;s Build Something Great Together.
            </h2>
            <p className="mt-4 leading-7 text-default-500">
              Have a project in mind or need help with your website? Feel free
              to contact me. I&apos;ll be happy to discuss your project.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="mailto:joykhanfiverr@gmail.com"
              className="flex min-w-0 items-center gap-4 rounded-2xl border border-divider bg-default-50/50 p-5 transition hover:border-indigo-500/60"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-sky-400">
                <Mail size={22} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-default-500">Email</span>
                <span className="break-all font-semibold">
                  joykhanfiverr@gmail.com
                </span>
              </span>
            </a>

            <a
              href="tel:+8801610186886"
              className="flex min-w-0 items-center gap-4 rounded-2xl border border-divider bg-default-50/50 p-5 transition hover:border-indigo-500/60"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-sky-400">
                <Phone size={22} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-default-500">Phone</span>
                <span className="break-words font-semibold">
                  +8801610186886
                </span>
              </span>
            </a>

            <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-divider bg-default-50/50 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-sky-400">
                <MapPin size={22} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-default-500">Location</span>
                <span className="break-words font-semibold">
                  Noakhali-3890, Bangladesh
                </span>
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
