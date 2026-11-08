"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  // Github,
  // Linkedin,
  // Facebook,
  Mail,
  Heart,
  ArrowUp,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "WordPress Development",
  "Elementor Website Design",
  "WooCommerce Development",
  "Website Redesign",
  "Malware Removal & Security",
  "Speed Optimization",
];

const socialLinks = [
  {
    // icon: Github,
    href: "https://github.com/",
    label: "GitHub",
  },
  {
    // icon: Linkedin,
    href: "https://linkedin.com/",
    label: "LinkedIn",
  },
  {
    // icon: Facebook,
    href: "https://facebook.com/",
    label: "Facebook",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-white dark:border-white/10 dark:bg-[#09090b]">
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
              <span className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Developer
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Joy
                </span>
                <span className="text-blue-500">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs leading-7 text-gray-600 dark:text-gray-400">
              WordPress Developer specializing in Elementor, WooCommerce, and
              high-performing websites.
            </p>

            {/* <div className="mt-6 flex gap-3">
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
            </div> */}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
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
            <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
              My Services
            </h3>

            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service} className="text-gray-600 dark:text-gray-400">
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
            <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
              Let&apos;s Connect
            </h3>

            <p className="mb-6 leading-7 text-gray-600 dark:text-gray-400">
              Have a project or an idea? Let&apos;s discuss how we can work
              together.
            </p>

            <a
              href="mailto:your.email@example.com"
              className="group inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400"
            >
              <Mail size={18} />
              Email Me
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

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
        <div className="flex flex-col items-center justify-between gap-5 border-t border-gray-200 py-7 dark:border-white/10 md:flex-row">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} DeveloperJoy. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            Made with <Heart size={14} className="fill-red-500 text-red-500" />{" "}
            by{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              DeveloperJoy
            </span>
          </p>

          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition-colors hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-white/10 dark:text-gray-300"
          >
            <ArrowUp size={19} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
