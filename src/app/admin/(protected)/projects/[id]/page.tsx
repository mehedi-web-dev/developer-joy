// src/app/admin/(protected)/projects/[id]/page.tsx
import { notFound } from "next/navigation";
import { getAdminProjects } from "@/lib/server-api";
import { getPublicProjectById } from "@/lib/api";
import { Project } from "@/types/project";
import EditForm from "./EditForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let project: Project | null = null;

  try {
    const adminRes = await getAdminProjects({ limit: 1000 });
    const found = adminRes.data.find((p) => p._id === id || p.slug === id);
    if (found) {
      project = found;
    }
  } catch {
    // fallback
  }

  if (!project) {
    try {
      const res = await getPublicProjectById(id);
      project = res.data;
    } catch {
      notFound();
    }
  }

  if (!project) {
    notFound();
  }

  return <EditForm project={project} />;
}
