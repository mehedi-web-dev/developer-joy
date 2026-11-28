"use client";

import * as React from "react";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import {
  WhatsAppIcon,
  TelegramIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
} from "@/components/ui/icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      href: "https://wa.me/8801610186886",
      icon: <WhatsAppIcon className="w-4 h-4" />,
    },
    {
      name: "Telegram",
      href: "https://t.me/+8801610186886",
      icon: <TelegramIcon className="w-4 h-4" />,
    },
    {
      name: "Facebook",
      href: "https://web.facebook.com/joy0870",
      icon: <FacebookIcon className="w-4 h-4" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/joykh4n_?bqrl=MTIxeTB1c2hqbjUwNg==",
      icon: <InstagramIcon className="w-4 h-4" />,
    },
    {
      name: "X",
      href: "https://x.com/developer_joy1",
      icon: <XIcon className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="w-full bg-[#c6ff00] text-black pt-12 sm:pt-16 pb-10 sm:pb-12 px-4 sm:px-8 md:px-12 mt-16 sm:mt-20 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-10 border-b border-black/20">
          <div>
            <span className="text-[11px] sm:text-xs uppercase font-extrabold tracking-widest text-black/70 mb-2 block font-mono">
              WORDPRESS &amp; FULL-STACK DEVELOPER
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-none text-black">
              DEVELOPER JOY
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 w-full sm:w-auto">
            <div>
              <span className="text-xs font-bold text-black/60 block mb-1">
                Email :
              </span>
              <a
                href="mailto:jewelsweb7@gmail.com"
                className="text-sm sm:text-base md:text-lg font-semibold hover:underline inline-flex items-center gap-1 text-black break-all sm:break-normal"
              >
                jewelsweb7@gmail.com
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
            </div>

            <div className="sm:border-l sm:border-black/20 sm:pl-6">
              <span className="text-xs font-bold text-black/60 block mb-1">
                Connect :
              </span>
              <div className="flex items-center flex-wrap gap-2.5">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-black/10 hover:bg-black hover:text-[#c6ff00] text-black flex items-center justify-center transition-colors cursor-pointer"
                    aria-label={item.name}
                    title={item.name}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs font-medium text-black/70 text-center sm:text-left">
          <p>© Copyright {currentYear}. All Rights Reserved by Developer Joy</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-black font-semibold underline underline-offset-4 flex items-center gap-1 cursor-pointer"
            >
              Back to top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
