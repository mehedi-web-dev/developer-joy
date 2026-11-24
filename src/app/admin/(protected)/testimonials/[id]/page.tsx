// src/app/admin/(protected)/testimonials/[id]/page.tsx
import { notFound } from "next/navigation";
import { getAdminTestimonials } from "@/lib/server-api";
import { getPublicTestimonialById } from "@/lib/api";
import { Testimonial } from "@/types/cms";
import EditForm from "./EditForm";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let testimonial: Testimonial | null = null;

  try {
    const adminRes = await getAdminTestimonials({ limit: 1000 });
    const found = adminRes.data.find((t) => t._id === id);
    if (found) {
      testimonial = found;
    }
  } catch {
    // fallback
  }

  if (!testimonial) {
    try {
      const res = await getPublicTestimonialById(id);
      testimonial = res.data;
    } catch {
      notFound();
    }
  }

  if (!testimonial) {
    notFound();
  }

  return <EditForm testimonial={testimonial} />;
}
