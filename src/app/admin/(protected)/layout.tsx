// src/app/admin/(protected)/layout.tsx
import { getServerSession } from "@/lib/server-api";
import { redirect } from "next/navigation";
import AdminLayoutClient from "../components/AdminLayoutClient";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // If there is no valid session or the user is not an admin, redirect to admin login
  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <AdminLayoutClient
      adminEmail={session.user.email}
      adminName={session.user.name || "Administrator"}
    >
      {children}
    </AdminLayoutClient>
  );
}
