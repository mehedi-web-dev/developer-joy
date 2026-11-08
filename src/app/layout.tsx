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
  title: "DeveloperJoy | WordPress Developer",
  description: "Professional WordPress Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-screen bg-gray-50 dark:bg-[#09090b]">
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
