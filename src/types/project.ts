// Types for project data coming from the backend
export interface Project {
  _id: string; // MongoDB ObjectId string
  title: string;
  slug: string;
  shortDescription?: string;
  description: string;
  thumbnail: string; // URL to thumbnail image
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  category: string;
  featured: boolean;
  status: 'draft' | 'published';
  createdAt: string; // ISO date string
  updatedAt: string;
}

// Wrapper for list responses
export interface ProjectsResponse {
  success: boolean;
  count: number;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  data: Project[];
}

// Wrapper for single project response
export interface ProjectResponse {
  success: boolean;
  data: Project;
}
