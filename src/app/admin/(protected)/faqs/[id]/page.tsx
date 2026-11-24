// src/app/admin/(protected)/faqs/[id]/page.tsx
import { notFound } from "next/navigation";
import { getAdminFaqs } from "@/lib/server-api";
import { getPublicFaqById } from "@/lib/api";
import { Faq } from "@/types/cms";
import EditForm from "./EditForm";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let faq: Faq | null = null;

  try {
    const adminRes = await getAdminFaqs({ limit: 1000 });
    const found = adminRes.data.find((f) => f._id === id);
    if (found) {
      faq = found;
    }
  } catch {
    // fallback
  }

  if (!faq) {
    try {
      const res = await getPublicFaqById(id);
      faq = res.data;
    } catch {
      notFound();
    }
  }

  if (!faq) {
    notFound();
  }

  return <EditForm faq={faq} />;
}
