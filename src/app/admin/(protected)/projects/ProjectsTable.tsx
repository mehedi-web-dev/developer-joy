// src/app/admin/(protected)/projects/ProjectsTable.tsx
"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import { deleteAdminProject } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  Plus,
  Briefcase,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface ProjectsTableProps {
  initialProjects: Project[];
}

export default function ProjectsTable({ initialProjects }: ProjectsTableProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this project?")) return;
    setDeletingId(id);
    try {
      await deleteAdminProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Failed to delete project. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search size={15} />
            </div>
            <input
              type="text"
              placeholder="Search by title or category…"
              className="w-full rounded-xl border border-slate-800 bg-[#0B0F19] pl-9 pr-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none focus:ring-1 focus:ring-[#0D8BFF] transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              className="rounded-xl border border-slate-800 bg-[#0B0F19] px-3.5 py-2 text-xs text-slate-300 focus:border-[#0D8BFF] focus:outline-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="draft">Drafts Only</option>
              <option value="published">Published Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900/60 uppercase tracking-wider text-slate-400 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Thumbnail</th>
                <th className="px-5 py-3.5">Title</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-center">Featured</th>
                <th className="px-5 py-3.5">Created</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Briefcase size={28} className="text-slate-600 mb-2" />
                      <p className="font-semibold text-slate-300">No projects match criteria</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Try adjusting your search query or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="h-11 w-11 rounded-lg border border-slate-800 bg-slate-800/80 overflow-hidden flex items-center justify-center text-slate-400 font-bold">
                        {p.thumbnail ? (
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          p.title.charAt(0).toUpperCase()
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-slate-100 hover:text-[#0D8BFF] transition-colors block">
                        {p.title}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        /{p.slug || p._id}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300">
                      <span className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300 border border-slate-700/50">
                        {p.category || "General"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          p.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            p.status === "published"
                              ? "bg-emerald-400"
                              : "bg-amber-400"
                          }`}
                        />
                        <span className="capitalize">{p.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {p.featured ? (
                        <span className="text-amber-400 font-bold text-xs">★</span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/${p._id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300 hover:border-[#0D8BFF]/40 hover:bg-[#0D8BFF]/10 hover:text-[#0D8BFF] transition-colors"
                        >
                          <Edit size={12} />
                          <span>Edit</span>
                        </Link>
                        <button
                          type="button"
                          disabled={deletingId === p._id}
                          onClick={() => handleDelete(p._id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-rose-900/30 bg-rose-950/20 px-2.5 py-1 text-rose-400 hover:bg-rose-900/40 hover:text-rose-300 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
