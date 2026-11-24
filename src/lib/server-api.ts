// src/lib/server-api.ts
// Server‑only helper for admin API calls that need to forward Better Auth HttpOnly cookies.
// This file imports next/headers and must only be used in Server Components.

import { Project, ProjectsResponse, ProjectResponse } from '../types/project';
import {
  Service,
  ServicesResponse,
  Testimonial,
  TestimonialsResponse,
  Faq,
  FaqsResponse,
  DashboardStats,
  AdminUser,
} from '../types/cms';
import { cookies } from 'next/headers';

/** Build a Cookie header from the incoming request cookies */
async function getCookieHeader(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const all = cookieStore.getAll();

    if (!all.length) return undefined;

    return all
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
  } catch (error) {
    console.error("Failed to retrieve request cookies:", error);
    return undefined;
  }
}

export async function getAdminProjects(params?: {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  search?: string;
}): Promise<ProjectsResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.category) query.append('category', params.category);
  if (params?.featured !== undefined) query.append('featured', String(params.featured));
  if (params?.search) query.append('search', params.search);

  const cookieHeader = await getCookieHeader();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/admin/projects${query.toString() ? `?${query}` : ''}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch admin projects: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ProjectsResponse;
}

export async function createAdminProject(payload: Partial<Project>): Promise<ProjectResponse> {
  const cookieHeader = await getCookieHeader();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/admin/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to create project: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ProjectResponse;
}

export async function updateAdminProject(id: string, payload: Partial<Project>): Promise<ProjectResponse> {
  const cookieHeader = await getCookieHeader();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/admin/projects/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to update project ${id}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ProjectResponse;
}

export async function deleteAdminProject(id: string): Promise<{ success: boolean; message?: string }> {
  const cookieHeader = await getCookieHeader();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/admin/projects/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to delete project ${id}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as { success: boolean; message?: string };
}

/** Check server-side session using forwarded Better Auth cookies */
export async function getServerSession(): Promise<{ user?: AdminUser; session?: any } | null> {
  const cookieHeader = await getCookieHeader();
  if (!cookieHeader) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/auth/get-session`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.user ? data : null;
  } catch {
    return null;
  }
}

/** Fetch admin services (including drafts) */
export async function getAdminServices(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}): Promise<ServicesResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.status) query.append('status', params.status);
  if (params?.search) query.append('search', params.search);

  const cookieHeader = await getCookieHeader();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/admin/services${query.toString() ? `?${query}` : ''}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch admin services: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ServicesResponse;
}

/** Fetch admin testimonials (including drafts) */
export async function getAdminTestimonials(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}): Promise<TestimonialsResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.status) query.append('status', params.status);
  if (params?.search) query.append('search', params.search);

  const cookieHeader = await getCookieHeader();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/admin/testimonials${query.toString() ? `?${query}` : ''}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch admin testimonials: ${res.status}`, res.status, err);
  }
  return (await res.json()) as TestimonialsResponse;
}

/** Fetch admin FAQs (including drafts) */
export async function getAdminFaqs(params?: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  search?: string;
}): Promise<FaqsResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.status) query.append('status', params.status);
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);

  const cookieHeader = await getCookieHeader();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/admin/faqs${query.toString() ? `?${query}` : ''}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch admin FAQs: ${res.status}`, res.status, err);
  }
  return (await res.json()) as FaqsResponse;
}

/** Aggregated Dashboard Data using real backend admin APIs */
export async function getDashboardOverview(): Promise<{
  stats: DashboardStats;
  recentProjects: Project[];
}> {
  const [projectsResult, servicesResult, testimonialsResult, faqsResult] = await Promise.allSettled([
    getAdminProjects({ limit: 100 }),
    getAdminServices({ limit: 100 }),
    getAdminTestimonials({ limit: 100 }),
    getAdminFaqs({ limit: 100 }),
  ]);

  const projects = projectsResult.status === 'fulfilled' ? projectsResult.value.data : [];
  const services = servicesResult.status === 'fulfilled' ? servicesResult.value.data : [];
  const testimonials = testimonialsResult.status === 'fulfilled' ? testimonialsResult.value.data : [];
  const faqs = faqsResult.status === 'fulfilled' ? faqsResult.value.data : [];

  const publishedProjects = projects.filter((p) => p.status === 'published').length;
  const projectCategories = Array.from(new Set(projects.map((p) => p.category))).filter(Boolean);

  const publishedServices = services.filter((s) => s.status === 'published').length;
  const publishedTestimonials = testimonials.filter((t) => t.status === 'published').length;
  const publishedFaqs = faqs.filter((f) => f.status === 'published').length;
  const faqCategories = Array.from(new Set(faqs.map((f) => f.category))).filter(Boolean);

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats: DashboardStats = {
    projects: {
      total: projects.length,
      published: publishedProjects,
      draft: projects.length - publishedProjects,
      categories: projectCategories,
    },
    services: {
      total: services.length,
      published: publishedServices,
      draft: services.length - publishedServices,
    },
    testimonials: {
      total: testimonials.length,
      published: publishedTestimonials,
      draft: testimonials.length - publishedTestimonials,
    },
    faqs: {
      total: faqs.length,
      published: publishedFaqs,
      draft: faqs.length - publishedFaqs,
      categories: faqCategories,
    },
  };

  return { stats, recentProjects };
}

export class ApiError extends Error {
  status: number;
  details?: string;
  constructor(message: string, status: number, details?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}
