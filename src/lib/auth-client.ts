// src/lib/auth-client.ts
import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

/**
 * Returns the authentication baseURL.
 * In the browser, it strictly targets the current frontend origin so that
 * all authentication requests pass through the first-party /api/auth proxy,
 * guaranteeing first-party session cookies and eliminating cross-domain blocking.
 */
function getClientAuthBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || '';
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
