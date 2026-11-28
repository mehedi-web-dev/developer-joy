"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Check } from "lucide-react";

export interface AccordionItemProps {
  number: string;
  title: string;
  subtitle?: string;
  items?: string[];
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({
  number,
  title,
  subtitle,
  items = [],
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-black/10 dark:border-white/10 last:border-b-0 py-5 group transition-colors">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
      >
        <div className="flex items-center gap-4 sm:gap-6 pr-4">
          <span className="font-mono text-sm font-semibold text-[#65a30d] dark:text-[#c6ff00]">
            {number}
          </span>
          <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-[#65a30d] dark:group-hover:text-[#c6ff00] transition-colors">
            {title}
          </h3>
        </div>
        <div
          className={`w-8 h-8 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center transition-transform duration-300 shrink-0 ${
            isOpen
              ? "bg-[#c6ff00] text-black rotate-180"
              : "text-zinc-500 dark:text-zinc-400 group-hover:border-[#65a30d] dark:group-hover:border-[#c6ff00] group-hover:text-zinc-900 dark:group-hover:text-white"
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4 stroke-[2.5]" />
          ) : (
            <Plus className="w-4 h-4 stroke-[2.5]" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 pl-8 sm:pl-12 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {subtitle && <p className="mb-3 text-zinc-800 dark:text-zinc-300 font-medium">{subtitle}</p>}
              {items && items.length > 0 && (
                <ul className="space-y-2.5 mt-2">
                  {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-[#c6ff00]/20 dark:bg-[#c6ff00]/10 flex items-center justify-center text-[#65a30d] dark:text-[#c6ff00] shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
