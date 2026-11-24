// src/lib/api-config.ts
/**
 * Centralized API URL resolver for DeveloperJoy.
 *
 * Guarantees:
 * 1. In production (NODE_ENV === 'production'):
 *    - Uses NEXT_PUBLIC_API_URL if valid, non-empty, and non-localhost.
 *    - Strictly defaults to the production backend: https://developer-joy-server.vercel.app.
 *    - Never silently falls back to localhost/127.0.0.1 in production.
 * 2. In local development (NODE_ENV !== 'production'):
 *    - Uses NEXT_PUBLIC_API_URL if set, or defaults to http://localhost:5000.
 */

const PRODUCTION_API_URL = "https://developer-joy-server.vercel.app";
const LOCAL_API_URL = "http://localhost:5000";

export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (process.env.NODE_ENV === "production") {
    if (
      envUrl &&
      !envUrl.includes("localhost") &&
      !envUrl.includes("127.0.0.1")
    ) {
      return envUrl.replace(/\/+$/, "");
    }
    return PRODUCTION_API_URL;
  }

  // Development / Local environment
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }
  return LOCAL_API_URL;
}

/**
 * Returns the public frontend application URL.
 */
export function getAppUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (appUrl) {
    return appUrl.replace(/\/+$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return "https://developer-joy.vercel.app";
  }
  return "http://localhost:3000";
}
