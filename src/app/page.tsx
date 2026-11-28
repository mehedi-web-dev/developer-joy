import type { Metadata } from "next";
import {
  ScrollStoryWrapper,
  ServicesPreviewSection,
  ProjectsPreviewSection,
  ReviewsSection,
  FAQSection,
  ContactSection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "Developer Joy | WordPress Developer",
  description:
    "WordPress Developer specializing in custom websites, bug fixing, malware removal, WooCommerce, and website security.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Developer Joy | WordPress Developer",
    description:
      "WordPress Developer specializing in custom websites, bug fixing, malware removal, WooCommerce, and website security.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Joy | WordPress Developer",
    description:
      "WordPress Developer specializing in custom websites, bug fixing, malware removal, WooCommerce, and website security.",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col bg-transparent text-[var(--foreground)] selection:bg-[#c6ff00] selection:text-black">
      {/* Unified 3D Scroll Story: Hero + Expectations + About with Sticky 3D Flipping Card */}
      <ScrollStoryWrapper />

      {/* Services & Automation Section */}
      <ServicesPreviewSection />

      {/* Featured Projects Section with 50/50 balanced layout */}
      <ProjectsPreviewSection />

      {/* Testimonials & Proof Section */}
      <ReviewsSection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Contact Form & WhatsApp */}
      <ContactSection />
    </div>
  );
}
