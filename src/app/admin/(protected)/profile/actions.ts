// src/app/admin/(protected)/profile/actions.ts
"use server";

import { cookies } from "next/headers";
import { getServerSession } from "@/lib/server-api";

export interface SafeSessionMetadata {
  id: string;
  createdAt: string;
  expiresAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  isCurrent: boolean;
}

interface BackendSessionRecord {
  id: string;
  token: string;
  createdAt: string;
  expiresAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
}

/**
 * Retrieve the Cookie header string from the current incoming request
 */
async function getCookieHeader(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const all = cookieStore.getAll();
    if (!all.length) return undefined;
    return all.map((c) => `${c.name}=${c.value}`).join("; ");
  } catch (err) {
    console.error("Failed to read incoming request cookies:", err);
    return undefined;
  }
}

/**
 * Server Action: Securely fetch sanitized active session metadata for the authenticated admin.
 * Raw session tokens are filtered out entirely on the server.
 */
export async function getAdminSessions(): Promise<{
  success: boolean;
  sessions?: SafeSessionMetadata[];
  error?: string;
}> {
  try {
    // 1. Authenticate the caller using HttpOnly session cookie
    const currentSessionData = await getServerSession();
    if (
      !currentSessionData ||
      !currentSessionData.user ||
      currentSessionData.user.role !== "admin"
    ) {
      return { success: false, error: "Unauthorized access." };
    }

    const currentSessionId = currentSessionData.session?.id;
    const cookieHeader = await getCookieHeader();
    if (!cookieHeader) {
      return { success: false, error: "No session credentials provided." };
    }

    // 2. Query Better Auth list-sessions on backend
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

    if (!res.ok) {
      return { success: false, error: "Failed to retrieve active sessions." };
    }

    const rawSessions: BackendSessionRecord[] = await res.json();
    if (!Array.isArray(rawSessions)) {
      return { success: true, sessions: [] };
    }

    // 3. Transform to sanitized SafeSessionMetadata — token is completely omitted
    const sanitizedSessions: SafeSessionMetadata[] = rawSessions
      .filter((sess) => sess.userId === currentSessionData.user?.id)
      .map((sess) => ({
        id: sess.id,
        createdAt: sess.createdAt,
        expiresAt: sess.expiresAt,
        ipAddress: sess.ipAddress || null,
        userAgent: sess.userAgent || null,
        isCurrent: Boolean(currentSessionId && sess.id === currentSessionId),
      }));

    return { success: true, sessions: sanitizedSessions };
  } catch (err) {
    console.error("Error in getAdminSessions Server Action:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

/**
 * Server Action: Securely revoke an individual session by its opaque session ID.
 * The client NEVER handles or sees the session token.
 * Session ownership is strictly verified against the authenticated administrator.
 */
export async function revokeAdminSession(sessionId: string): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    // 1. Validate opaque input
    if (!sessionId || typeof sessionId !== "string" || !sessionId.trim()) {
      return { success: false, error: "Invalid session identifier." };
    }
    const targetSessionId = sessionId.trim();

    // 2. Authenticate the caller on the server
    const currentSessionData = await getServerSession();
    if (
      !currentSessionData ||
      !currentSessionData.user ||
      currentSessionData.user.role !== "admin"
    ) {
      return { success: false, error: "Unauthorized operation." };
    }

    // 3. Prevent revoking current active session via this endpoint (use sign-out instead)
    if (
      currentSessionData.session?.id &&
      currentSessionData.session.id === targetSessionId
    ) {
      return {
        success: false,
        error: "Cannot revoke the current active session. Use Sign Out instead.",
      };
    }

    const cookieHeader = await getCookieHeader();
    if (!cookieHeader) {
      return { success: false, error: "Authentication credentials missing." };
    }

    // 4. Retrieve administrator's active sessions internally on the server
    const listRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/list-sessions`,
      {
        headers: {
          Cookie: cookieHeader,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!listRes.ok) {
      return { success: false, error: "Failed to verify session list." };
    }

    const rawSessions: BackendSessionRecord[] = await listRes.json();
    if (!Array.isArray(rawSessions)) {
      return { success: false, error: "Session not found." };
    }

    // 5. Locate session and strictly verify ownership
    const targetSession = rawSessions.find((s) => s.id === targetSessionId);
    if (!targetSession) {
      return { success: false, error: "Session not found or already expired." };
    }

    if (targetSession.userId !== currentSessionData.user.id) {
      return { success: false, error: "Access denied. Session belongs to another user." };
    }

    // 6. Call backend Better Auth revoke-session internally using the raw token
    const revokeRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/revoke-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
          Accept: "application/json",
        },
        body: JSON.stringify({ token: targetSession.token }),
      }
    );

    if (!revokeRes.ok) {
      return { success: false, error: "Failed to revoke session on server." };
    }

    return { success: true, message: "Session revoked successfully." };
  } catch (err) {
    console.error("Error in revokeAdminSession Server Action:", err);
    return { success: false, error: "Internal server error occurred." };
  }
}
