import type { Metadata } from "next";
import NotFoundView from "./component/NotFoundView";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Developer Joy",
  description:
    "The page you're looking for doesn't exist or may have been moved. Return to the DeveloperJoy homepage or explore the portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundView />;
}
