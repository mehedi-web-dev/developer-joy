// src/lib/api.ts
import { Project, ProjectsResponse, ProjectResponse } from '../types/project';
import {
  Service,
  ServicesResponse,
  ServiceResponse,
  Testimonial,
  TestimonialsResponse,
  TestimonialResponse,
  Faq,
  FaqsResponse,
  FaqResponse,
} from '../types/cms';


import { getApiBaseUrl } from './api-config';

// Centralized base URL
const BASE_URL = getApiBaseUrl();



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

export async function getPublicFaqs(params?: {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  search?: string;
}): Promise<FaqsResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.category) query.append('category', params.category);
  if (params?.featured !== undefined) query.append('featured', String(params.featured));
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`${BASE_URL}/api/faqs${query.toString() ? `?${query}` : ''}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch FAQs: ${res.status}`, res.status, err);
  }
  return (await res.json()) as FaqsResponse;
}

export async function getPublicFaqById(id: string): Promise<FaqResponse> {
  const res = await fetch(`${BASE_URL}/api/faqs/${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch FAQ ${id}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as FaqResponse;
}

export async function getAdminFaqs(params?: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  featured?: boolean;
  search?: string;
}): Promise<FaqsResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.status) query.append('status', params.status);
  if (params?.category) query.append('category', params.category);
  if (params?.featured !== undefined) query.append('featured', String(params.featured));
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`${BASE_URL}/api/admin/faqs${query.toString() ? `?${query}` : ''}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to fetch admin FAQs: ${res.status}`, res.status, err);
  }
  return (await res.json()) as FaqsResponse;
}

export async function createAdminFaq(payload: Partial<Faq>): Promise<FaqResponse> {
  const res = await fetch(`${BASE_URL}/api/admin/faqs`, {
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
    throw new ApiError(`Failed to create FAQ: ${res.status}`, res.status, err);
  }
  return (await res.json()) as FaqResponse;
}

export async function updateAdminFaq(id: string, payload: Partial<Faq>): Promise<FaqResponse> {
  const res = await fetch(`${BASE_URL}/api/admin/faqs/${encodeURIComponent(id)}`, {
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
    throw new ApiError(`Failed to update FAQ ${id}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as FaqResponse;
}

export async function deleteAdminFaq(id: string): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(`${BASE_URL}/api/admin/faqs/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new ApiError(`Failed to delete FAQ ${id}: ${res.status}`, res.status, err);
  }
  return (await res.json()) as { success: boolean; message?: string };
}

export interface UploadImageData {
  id?: string;
  url: string;
  displayUrl?: string;
  deleteUrl?: string;
  width?: number;
  height?: number;
  size?: number;
  mimeType?: string;
  extension?: string;
  thumb?: { url: string } | null;
  medium?: { url: string } | null;
}

export interface UploadImageResponse {
  success: boolean;
  message: string;
  data: UploadImageData;
  error?: string;
}

/**
 * Upload an image file to ImgBB via the backend admin upload endpoint.
 * POST /api/admin/uploads/images
 *
 * Requirements:
 * - Content-Type: multipart/form-data (browser auto-sets boundary)
 * - Field name: "image"
 * - Credentials included for admin session authentication
 * - Handles 400, 401, 403, 502 and network failures cleanly
 *
 * @param file The image file (JPEG, PNG, WEBP, max 5MB)
 * @returns Promise<UploadImageResponse>
 */
export async function uploadAdminImage(file: File): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append('image', file);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/api/admin/uploads/images`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
      credentials: 'include',
    });
  } catch (netErr: any) {
    throw new ApiError(
      'Network error: Unable to connect to upload server. Please verify your connection.',
      0,
      netErr?.message
    );
  }

  let body: any;
  try {
    body = await res.json();
  } catch {
    const rawText = await res.text().catch(() => '');
    throw new ApiError(
      res.status === 502
        ? 'Image storage provider is unreachable. Please try again later.'
        : `Upload failed with HTTP ${res.status}`,
      res.status,
      rawText
    );
  }

  if (!res.ok || !body?.success) {
    let errorMessage = body?.message || `Upload failed with status ${res.status}`;
    if (res.status === 401) {
      errorMessage = 'Session expired or unauthenticated. Please log in again.';
    } else if (res.status === 403) {
      errorMessage = 'Access denied: You do not have administrator permissions.';
    } else if (res.status === 400 && body?.message) {
      errorMessage = body.message;
    } else if (res.status === 502) {
      errorMessage = body?.message || 'Storage provider communication error. Please try again.';
    }
    throw new ApiError(errorMessage, res.status, body?.error || JSON.stringify(body));
  }

  return body as UploadImageResponse;
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
