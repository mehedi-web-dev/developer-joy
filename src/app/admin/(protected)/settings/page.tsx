// src/app/admin/(protected)/settings/page.tsx
import React from "react";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

interface HealthData {
  success: boolean;
  status: string;
  database: string;
  environmentConfigured?: {
    MONGODB_URI: boolean;
    DB_NAME: boolean;
    BETTER_AUTH_SECRET: boolean;
    BETTER_AUTH_URL: boolean;
    FRONTEND_URL: boolean;
    ADMIN_EMAIL: boolean;
    ADMIN_PASSWORD: boolean;
  };
  timestamp?: string;
}

export default async function AdminSettingsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  let health: HealthData | null = null;

  try {
    const res = await fetch(`${apiUrl}/api/health`, {
      cache: "no-store",
    });
    if (res.ok) {
      health = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch backend health status:", err);
  }

  const serverEnv = {
    apiUrl,
    nodeEnv: process.env.NODE_ENV || "development",
  };

  return <SettingsClient initialHealth={health} serverEnv={serverEnv} />;
}
