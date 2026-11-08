"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUp,
} from "lucide-react";

type SocialIconProps = {
  size?: number;
};

const GitHubIcon = ({ size = 18 }: SocialIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
  </svg>
);

const LinkedInIcon = ({ size = 18 }: SocialIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.119 20.452H3.555V9h3.564v11.452Z" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: SocialIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.5-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.9h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  </svg>
);

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "WordPress Website Development",
  "Elementor Website Design",
  "WooCommerce Development",
  "Website Redesign",
  "Malware Removal & Security",
  "Website Speed Optimization",
];

const socialLinks = [
  {
    icon: GitHubIcon,
    href: "https://github.com/",
    label: "GitHub",
  },
  {
    icon: LinkedInIcon,
    href: "https://linkedin.com/",
    label: "LinkedIn",
  },
  {
    icon: FacebookIcon,
    href: "https://facebook.com/",
    label: "Facebook",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-divider bg-transparent">
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Main Footer */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block">
              <span className="text-3xl font-extrabold tracking-tight text-foreground">
                Developer
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Joy
                </span>
                <span className="text-blue-500">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs leading-7 text-default-500">
              WordPress Developer specializing in Elementor, WooCommerce, and
              high-performing websites.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -5, scale: 1.08 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-colors hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-white/10 dark:text-gray-300"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="mb-6 text-lg font-bold text-foreground">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-default-500 transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={15}
                      className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-6 text-lg font-bold text-foreground">
              My Services
            </h3>

            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service} className="text-default-500">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="mb-6 text-lg font-bold text-foreground">
              Let&apos;s Connect
            </h3>

            <p className="mb-6 leading-7 text-default-500">
              Have a project or an idea? Let&apos;s discuss how we can work
              together.
            </p>

            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:joykhanfiverr@gmail.com"
                  className="group flex items-center gap-3 text-default-500 transition-colors hover:text-primary"
                >
                  <Mail
                    size={19}
                    className="shrink-0 text-blue-500 dark:text-blue-400"
                  />
                  <span className="break-all">joykhanfiverr@gmail.com</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+8801610186886"
                  className="group flex items-center gap-3 text-default-500 transition-colors hover:text-primary"
                >
                  <Phone
                    size={19}
                    className="shrink-0 text-blue-500 dark:text-blue-400"
                  />
                  <span>+8801610186886</span>
                </a>
              </li>

              <li className="flex items-center gap-3 text-default-500">
                <MapPin
                  size={19}
                  className="shrink-0 text-blue-500 dark:text-blue-400"
                />
                <span>Noakhali-3890, Bangladesh</span>
              </li>
            </ul>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-blue-500/40"
              >
                Hire Me
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-divider py-7 md:flex-row">
          <p className="text-center text-sm text-default-400">
            © {currentYear} DeveloperJoy. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-sm text-default-400">
            Made with <Heart size={14} className="fill-red-500 text-red-500" />{" "}
            by{" "}
            <span className="font-semibold text-foreground">
              DeveloperJoy
            </span>
          </p>

          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-divider text-default-500 transition-colors hover:border-primary hover:bg-primary hover:text-white"
          >
            <ArrowUp size={19} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
