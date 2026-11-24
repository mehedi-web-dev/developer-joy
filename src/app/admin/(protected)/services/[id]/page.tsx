// src/app/admin/(protected)/services/[id]/page.tsx
import { notFound } from "next/navigation";
import { getAdminServices } from "@/lib/server-api";
import { getPublicServiceById } from "@/lib/api";
import { Service } from "@/types/cms";
import EditForm from "./EditForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let service: Service | null = null;

  try {
    const adminRes = await getAdminServices({ limit: 1000 });
    const found = adminRes.data.find((s) => s._id === id || s.slug === id);
    if (found) {
      service = found;
    }
  } catch {
    // fallback
  }

  if (!service) {
    try {
      const res = await getPublicServiceById(id);
      service = res.data;
    } catch {
      notFound();
    }
  }

  if (!service) {
    notFound();
  }

  return <EditForm service={service} />;
}
