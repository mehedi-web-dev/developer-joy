// src/lib/auth-client.ts
import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '',
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
