export interface BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type ContentStatus = 'draft' | 'published';

export interface Service extends BaseEntity {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon?: string;
  image?: string;
  features?: string[];
  technologies?: string[];
  displayOrder?: number;
  featured: boolean;
  status: ContentStatus;
}

export interface Testimonial extends BaseEntity {
  clientName: string;
  designation?: string;
  company?: string;
  photo?: string;
  clientUrl?: string;
  content: string;
  rating: number;
  featured: boolean;
  displayOrder?: number;
  status: ContentStatus;
}

export interface Faq extends BaseEntity {
  question: string;
  answer: string;
  category: string;
  featured: boolean;
  displayOrder?: number;
  status: ContentStatus;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  pagination?: PaginationMeta;
  data: T;
  message?: string;
}

export type ServicesResponse = ApiResponse<Service[]>;
export type ServiceResponse = ApiResponse<Service>;

export type TestimonialsResponse = ApiResponse<Testimonial[]>;
export type TestimonialResponse = ApiResponse<Testimonial>;

export type FaqsResponse = ApiResponse<Faq[]>;
export type FaqResponse = ApiResponse<Faq>;

export interface DashboardStats {
  projects: {
    total: number;
    published: number;
    draft: number;
    categories: string[];
  };
  services: {
    total: number;
    published: number;
    draft: number;
  };
  testimonials: {
    total: number;
    published: number;
    draft: number;
  };
  faqs: {
    total: number;
    published: number;
    draft: number;
    categories: string[];
  };
}

export interface AdminUser {
  id: string;
  name?: string;
  email: string;
  role?: string;
  image?: string;
}
