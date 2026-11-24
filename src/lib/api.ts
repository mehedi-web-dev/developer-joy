// src/lib/api.ts
import { Project, ProjectsResponse, ProjectResponse } from '../types/project';


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
