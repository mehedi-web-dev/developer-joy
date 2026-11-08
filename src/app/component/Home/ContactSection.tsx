"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  MessageCircle,
  Send,
  // Github,
  // Linkedin,
  // Facebook,
  ArrowUpRight,
} from "lucide-react";
import ScrollReveal from "../ScrollReveal";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "your.email@example.com",
    href: "mailto:your.email@example.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangladesh",
    href: "#",
  },
  {
    icon: MessageCircle,
    label: "Availability",
    value: "Available for Projects",
    href: "#",
  },
];

// const socialLinks = [
//   { icon: Github, label: "GitHub", href: "https://github.com/" },
//   { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/" },
//   { icon: Facebook, label: "Facebook", href: "https://facebook.com/" },
// ];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );

    window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-transparent py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              GET IN TOUCH
            </span>

            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Let&apos;s Work{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Together
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-default-500">
              Have a project in mind? Let&apos;s discuss how I can help you
              build a professional, high-performing website.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <ScrollReveal direction="left">
            <div className="h-full rounded-3xl border border-divider bg-default-50/50 p-8 shadow-sm backdrop-blur-md md:p-10">
              <h3 className="text-2xl font-bold text-foreground">
                Let&apos;s Talk About Your Project
              </h3>

              <p className="mt-4 leading-7 text-default-500">
                Whether you need a new WordPress website, a redesign, or help
                fixing a technical issue, I&apos;m ready to help.
              </p>

              <div className="mt-10 space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.2 }}
                      className="group flex items-center gap-4"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <Icon size={22} />
                      </div>

                      <div>
                        <p className="text-sm text-default-400">
                          {item.label}
                        </p>
                        <p className="font-semibold text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-12 border-t border-divider pt-8">
                <p className="mb-5 font-semibold text-foreground">
                  Follow Me
                </p>

                {/* <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;

                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        whileHover={{ y: -5, scale: 1.05 }}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-colors hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-white/10 dark:text-gray-300"
                      >
                        <Icon size={19} />
                      </motion.a>
                    );
                  })}
                </div> */}
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-divider bg-default-50/50 p-8 shadow-sm backdrop-blur-md md:p-10"
            >
              <h3 className="mb-8 text-2xl font-bold text-foreground">
                Send Me a Message
              </h3>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-default-600"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-divider bg-default-100/50 px-4 py-3 text-foreground outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-default-600"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-divider bg-default-100/50 px-4 py-3 text-foreground outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-medium text-default-600"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="What is your project about?"
                    className="w-full rounded-xl border border-divider bg-default-100/50 px-4 py-3 text-foreground outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium text-default-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project..."
                    className="w-full resize-none rounded-xl border border-divider bg-default-100/50 px-4 py-3 text-foreground outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-blue-500/40"
                >
                  Send Message
                  <Send size={18} />
                </motion.button>
              </div>

              <p className="mt-5 text-center text-xs text-default-400">
                This form opens your default email application.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
