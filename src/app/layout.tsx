import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Oswald } from "next/font/google";
import { AppProviders } from "@/providers";
import { PublicLayoutShell } from "@/components/layout";
import { CustomCursor } from "@/components/ui";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Developer Joy | WordPress & Full-Stack Developer",
    template: "%s | Developer Joy",
  },
  description:
    "Developer Joy is a professional WordPress and Full-Stack developer specializing in custom themes, WooCommerce stores, speed optimization, and modern React & Next.js applications.",
  authors: [{ name: "Developer Joy" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Developer Joy — Portfolio",
    title: "Developer Joy | WordPress & Full-Stack Developer",
    description:
      "Explore high-performance WordPress, WooCommerce, React, and Next.js web applications by Developer Joy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Joy | WordPress & Full-Stack Developer",
    description:
      "Explore high-performance WordPress, WooCommerce, React, and Next.js web applications by Developer Joy.",
  },
  icons: {
    icon: [{ url: "/joy.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[#c6ff00] selection:text-black">
        <CustomCursor />
        <AppProviders>
          <PublicLayoutShell>{children}</PublicLayoutShell>
        </AppProviders>
      </body>
    </html>
  );
}
