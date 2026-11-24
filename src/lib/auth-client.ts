// src/lib/auth-client.ts
import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

/**
 * Returns the authentication baseURL.
 * - In the browser: strictly targets the current window origin so that all
 *   authentication requests pass through the first-party /api/auth proxy,
 *   guaranteeing first-party session cookies and eliminating cross-domain blocking.
 * - During SSR/prerender/module evaluation: falls back to NEXT_PUBLIC_APP_URL,
 *   NEXT_PUBLIC_SITE_URL, or the production URL https://developer-joy.vercel.app
 *   (or http://localhost:3000 in local development), ensuring Better Auth never
 *   encounters an empty baseURL.
 */
function getClientAuthBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  return 'https://developer-joy.vercel.app';
}

export const authClient = createAuthClient({
  baseURL: getClientAuthBaseUrl(),
  fetchOptions: { credentials: 'include' },
  plugins: [
    // The backend exposes a custom `role` field on the user record.
    inferAdditionalFields({
      user: {
        role: { type: 'string' },
      },
    }),
  ],
});
