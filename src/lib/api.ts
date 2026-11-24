// src/lib/api.ts
import { Project, ProjectsResponse, ProjectResponse } from '../types/project';
import {
  Service,
  ServicesResponse,
  ServiceResponse,
  Testimonial,
  TestimonialsResponse,
  TestimonialResponse,
} from '../types/cms';


// Base URL from env
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';



export async function getPublicProjects(params?: {
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

  const res = await fetch(`${BASE_URL}/api/projects${query.toString() ? `?${query}` : ''}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch public projects: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ProjectsResponse;
}

export async function getPublicProjectById(idOrSlug: string): Promise<ProjectResponse> {
  const res = await fetch(`${BASE_URL}/api/projects/${encodeURIComponent(idOrSlug)}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch project ${idOrSlug}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ProjectResponse;
}

// Admin endpoints – forward cookies manually (server side)
export async function getAdminProjects(params?: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  featured?: boolean;
  search?: string;
}): Promise<ProjectsResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.status) query.append('status', params.status);
  if (params?.category) query.append('category', params.category);
  if (params?.featured !== undefined) query.append('featured', String(params.featured));
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`${BASE_URL}/api/admin/projects${query.toString() ? `?${query}` : ''}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch admin projects: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ProjectsResponse;
}

export async function createAdminProject(payload: Partial<Project>): Promise<ProjectResponse> {
  const res = await fetch(`${BASE_URL}/api/admin/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to create project: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ProjectResponse;
}

export async function updateAdminProject(id: string, payload: Partial<Project>): Promise<ProjectResponse> {
  const res = await fetch(`${BASE_URL}/api/admin/projects/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to update project ${id}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ProjectResponse;
}

export async function deleteAdminProject(id: string): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(`${BASE_URL}/api/admin/projects/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to delete project ${id}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as { success: boolean; message?: string };
}

export async function getPublicServices(params?: {
  page?: number;
  limit?: number;
  featured?: boolean;
  search?: string;
}): Promise<ServicesResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.featured !== undefined) query.append('featured', String(params.featured));
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`${BASE_URL}/api/services${query.toString() ? `?${query}` : ''}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch services: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ServicesResponse;
}

export async function getPublicServiceById(idOrSlug: string): Promise<ServiceResponse> {
  const res = await fetch(`${BASE_URL}/api/services/${encodeURIComponent(idOrSlug)}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch service ${idOrSlug}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ServiceResponse;
}

export async function getAdminServices(params?: {
  page?: number;
  limit?: number;
  status?: string;
  featured?: boolean;
  search?: string;
}): Promise<ServicesResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.status) query.append('status', params.status);
  if (params?.featured !== undefined) query.append('featured', String(params.featured));
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`${BASE_URL}/api/admin/services${query.toString() ? `?${query}` : ''}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch admin services: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ServicesResponse;
}

export async function createAdminService(payload: Partial<Service>): Promise<ServiceResponse> {
  const res = await fetch(`${BASE_URL}/api/admin/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to create service: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ServiceResponse;
}

export async function updateAdminService(id: string, payload: Partial<Service>): Promise<ServiceResponse> {
  const res = await fetch(`${BASE_URL}/api/admin/services/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to update service ${id}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as ServiceResponse;
}

export async function deleteAdminService(id: string): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(`${BASE_URL}/api/admin/services/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to delete service ${id}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as { success: boolean; message?: string };
}

export async function getPublicTestimonials(params?: {
  page?: number;
  limit?: number;
  featured?: boolean;
  search?: string;
}): Promise<TestimonialsResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.featured !== undefined) query.append('featured', String(params.featured));
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`${BASE_URL}/api/testimonials${query.toString() ? `?${query}` : ''}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch testimonials: ${res.status}`, res.status, err);
  }
  return (await res.json()) as TestimonialsResponse;
}

export async function getPublicTestimonialById(id: string): Promise<TestimonialResponse> {
  const res = await fetch(`${BASE_URL}/api/testimonials/${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch testimonial ${id}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as TestimonialResponse;
}

export async function getAdminTestimonials(params?: {
  page?: number;
  limit?: number;
  status?: string;
  featured?: boolean;
  search?: string;
}): Promise<TestimonialsResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.status) query.append('status', params.status);
  if (params?.featured !== undefined) query.append('featured', String(params.featured));
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`${BASE_URL}/api/admin/testimonials${query.toString() ? `?${query}` : ''}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch admin testimonials: ${res.status}`, res.status, err);
  }
  return (await res.json()) as TestimonialsResponse;
}

export async function createAdminTestimonial(payload: Partial<Testimonial>): Promise<TestimonialResponse> {
  const res = await fetch(`${BASE_URL}/api/admin/testimonials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to create testimonial: ${res.status}`, res.status, err);
  }
  return (await res.json()) as TestimonialResponse;
}

export async function updateAdminTestimonial(id: string, payload: Partial<Testimonial>): Promise<TestimonialResponse> {
  const res = await fetch(`${BASE_URL}/api/admin/testimonials/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to update testimonial ${id}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as TestimonialResponse;
}

export async function deleteAdminTestimonial(id: string): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(`${BASE_URL}/api/admin/testimonials/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to delete testimonial ${id}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as { success: boolean; message?: string };
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
