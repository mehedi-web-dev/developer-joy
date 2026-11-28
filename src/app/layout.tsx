import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "Developer Joy | Senior WordPress Developer",
    template: "%s | Developer Joy",
  },
  description:
    "Developer Joy is a Senior WordPress Developer specializing in custom themes, WooCommerce stores, speed optimization, Elementor Pro, and modern web applications.",
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
    title: "Developer Joy | Senior WordPress Developer",
    description:
      "Explore high-performance WordPress, WooCommerce, and modern web applications by Developer Joy, Senior WordPress Developer.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Joy | Senior WordPress Developer",
    description:
      "Explore high-performance WordPress, WooCommerce, and modern web applications by Developer Joy, Senior WordPress Developer.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[#c6ff00] selection:text-black">
        <CustomCursor />
        <AppProviders>
          <PublicLayoutShell>{children}</PublicLayoutShell>
        </AppProviders>
      </body>
    </html>
  );
}
