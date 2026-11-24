// src/app/admin/(protected)/projects/page.tsx
import { getAdminProjects } from '@/lib/server-api';
import ProjectsTable from './ProjectsTable';
import Link from 'next/link';
import { Briefcase, Plus } from 'lucide-react';

export const dynamic = 'force-dynamic'; // always fetch fresh data

export default async function AdminProjectsPage() {
  const { data: projects = [] } = await getAdminProjects({ limit: 1000 }).catch(() => ({ data: [] }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Briefcase className="text-[#0D8BFF]" size={24} />
            <span>Project Management</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create, update, publish, draft, or delete portfolio projects.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0D8BFF] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#0D8BFF]/25 hover:bg-[#0D8BFF]/90 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>New Project</span>
        </Link>
      </div>
      <ProjectsTable initialProjects={projects} />
    </div>
  );
}
