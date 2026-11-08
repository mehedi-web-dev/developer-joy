import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import AnimatedBackground from "./component/AnimatedBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeveloperJoy — WordPress Developer",
  description:
    "DeveloperJoy is a professional WordPress developer specializing in Elementor Pro, WooCommerce, custom WordPress development, security, and speed optimization.",
};

// Runs before the first paint so the saved theme is applied without a flash.
const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme !== "light" && theme !== "dark") theme = "dark";
    var root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      data-theme="dark"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative min-h-screen bg-gray-50 text-foreground transition-colors duration-300 dark:bg-[#09090b]">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Website Content */}
        <div className="relative z-10">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
