// src/app/admin/page.tsx
import { redirect } from 'next/navigation';

export default async function AdminRoot() {
  // Redirect to the dashboard when accessing /admin
  redirect('/admin/dashboard');
}
