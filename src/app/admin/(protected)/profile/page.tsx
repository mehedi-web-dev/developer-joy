// src/app/admin/(protected)/profile/page.tsx
import React from "react";
import { getServerSession } from "@/lib/server-api";
import { cookies } from "next/headers";
import ProfileClient from "./ProfileClient";
import { SafeSessionMetadata } from "./actions";

export const dynamic = "force-dynamic";

interface BackendSessionRecord {
  id: string;
  token: string;
  createdAt: string;
  expiresAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
}

export default async function AdminProfilePage() {
  const sessionData = await getServerSession();
  const user = sessionData?.user;
  const currentSessionId = sessionData?.session?.id;

  // Retrieve incoming cookie header for server-side Better Auth session listing
  let sanitizedSessions: SafeSessionMetadata[] = [];

  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (cookieHeader) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/list-sessions`,
        {
          headers: {
            Cookie: cookieHeader,
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );
      if (res.ok) {
        const rawList: BackendSessionRecord[] = await res.json();
        if (Array.isArray(rawList)) {
          // Strictly sanitize metadata: omit raw session tokens completely
          sanitizedSessions = rawList
            .filter((sess) => sess.userId === user?.id)
            .map((sess) => ({
              id: sess.id,
              createdAt: sess.createdAt,
              expiresAt: sess.expiresAt,
              ipAddress: sess.ipAddress || null,
              userAgent: sess.userAgent || null,
              isCurrent: Boolean(currentSessionId && sess.id === currentSessionId),
            }));
        }
      }
    }
  } catch (err) {
    console.error("Failed to load admin sessions on server:", err);
  }

  const initialUser = {
    id: user?.id || "",
    name: user?.name || "DeveloperJoy Admin",
    email: user?.email || "admin@developerjoy.dev",
    role: user?.role || "admin",
    image: user?.image || undefined,
    createdAt: (user as unknown as { createdAt?: string })?.createdAt,
    updatedAt: (user as unknown as { updatedAt?: string })?.updatedAt,
  };

  return (
    <ProfileClient
      initialUser={initialUser}
      initialSessions={sanitizedSessions}
    />
  );
}
