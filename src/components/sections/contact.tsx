"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, MessageSquare, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";

export function ContactSection() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          {/* Avatar with Waving Hand 👋 Badge */}
          <div className="inline-block relative mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 mx-auto bg-gradient-to-tr from-zinc-800 to-zinc-700 shadow-2xl relative">
              <img
                src="/joy.png"
                alt="Developer Joy"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <motion.div
              animate={{ rotate: [0, 15, -15, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 1 }}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#c6ff00] text-black flex items-center justify-center font-bold text-xs shadow-md border-2 border-[#0c0d0e]"
            >
              👋
            </motion.div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            Let&apos;s build something impactful together — whether it&apos;s your brand, your high-converting website, or your next big digital product.
          </p>

          {/* Direct Quick Contact CTAs: WhatsApp & Email */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href="https://wa.me/8801610186886"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/[0.05] hover:bg-[#25D366]/20 border border-black/10 dark:border-white/10 hover:border-[#25D366]/40 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp: +880 1610-186886</span>
            </a>
            <a
              href="mailto:jewelsweb7@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/[0.05] hover:bg-[#c6ff00]/20 border border-black/10 dark:border-white/10 hover:border-[#c6ff00]/40 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all font-mono"
            >
              <Mail className="w-3.5 h-3.5 text-[#65a30d] dark:text-[#c6ff00]" />
              <span>jewelsweb7@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white dark:bg-[#141517] border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-[#c6ff00]/10 text-[#c6ff00] flex items-center justify-center mx-auto mb-4 border border-[#c6ff00]/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  Thank you for reaching out!
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto text-sm">
                  I have received your inquiry and will respond within 24 hours to discuss details and scheduling.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#c6ff00] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#d4ff33] transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#65a30d] dark:text-[#c6ff00] uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-zinc-50 dark:bg-[#1b1c20] border border-black/15 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#65a30d] dark:focus:border-[#c6ff00] focus:ring-1 focus:ring-[#c6ff00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#65a30d] dark:text-[#c6ff00] uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-zinc-50 dark:bg-[#1b1c20] border border-black/15 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#65a30d] dark:focus:border-[#c6ff00] focus:ring-1 focus:ring-[#c6ff00] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#65a30d] dark:text-[#c6ff00] uppercase tracking-wider mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-zinc-50 dark:bg-[#1b1c20] border border-black/15 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#65a30d] dark:focus:border-[#c6ff00] focus:ring-1 focus:ring-[#c6ff00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#65a30d] dark:text-[#c6ff00] uppercase tracking-wider mb-2">
                      Desired Service *
                    </label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full bg-zinc-50 dark:bg-[#1b1c20] border border-black/15 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-[#65a30d] dark:focus:border-[#c6ff00] focus:ring-1 focus:ring-[#c6ff00] transition-colors"
                    >
                      <option value="" disabled>
                        Select a service...
                      </option>
                      <option value="WordPress Development">
                        WordPress &amp; Elementor Pro
                      </option>
                      <option value="Next.js Web App">
                        React / Next.js Web Application
                      </option>
                      <option value="WooCommerce Store">
                        WooCommerce &amp; E-Commerce
                      </option>
                      <option value="Speed & SEO">
                        Speed Optimization &amp; SEO
                      </option>
                      <option value="Website Redesign">
                        Full Website Redesign
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#65a30d] dark:text-[#c6ff00] uppercase tracking-wider mb-2">
                    How can I help you? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, timeline, and goals..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-zinc-50 dark:bg-[#1b1c20] border border-black/15 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#65a30d] dark:focus:border-[#c6ff00] focus:ring-1 focus:ring-[#c6ff00] transition-colors resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#c6ff00] hover:bg-[#d4ff33] text-black font-display font-extrabold text-base tracking-wide flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#c6ff00]/20 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
