// src/app/admin/(protected)/projects/ProjectsTable.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { Project } from "@/types/project";
import { PaginationMeta } from "@/types/cms";
import { deleteAdminProject, getAdminProjects } from "@/lib/api";
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
  Star,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
  RefreshCw,
  LayoutGrid,
  List,
  Eye,
  Tag,
  Globe,
  Calendar,
} from "lucide-react";

interface ProjectsTableProps {
  initialProjects: Project[];
  initialPagination?: PaginationMeta;
}

export default function ProjectsTable({
  initialProjects,
  initialPagination,
}: ProjectsTableProps) {
  const router = useRouter();

  // State
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  // Modal & feedback state
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Dismiss toast after 3.5s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Extract all distinct categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(q)));

      const matchesStatus =
        statusFilter === "all" || p.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [projects, search, statusFilter, categoryFilter]);

  // Paginated slice
  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProjects = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, safeCurrentPage, itemsPerPage]);

  // Reset page when search or filters change
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (val: "all" | "published" | "draft") => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (val: string) => {
    setCategoryFilter(val);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setCurrentPage(1);
  };

  // Delete handler
  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAdminProject(projectToDelete._id);
      setProjects((prev) => prev.filter((p) => p._id !== projectToDelete._id));
      setToast({
        type: "success",
        message: `Project "${projectToDelete.title}" deleted successfully.`,
      });
      setProjectToDelete(null);
      router.refresh();
    } catch (err: any) {
      console.error("Delete failed:", err);
      setToast({
        type: "error",
        message: err?.message || "Failed to delete project. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Refresh data from API
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await getAdminProjects({ limit: 100 });
      if (res && res.data) {
        setProjects(res.data);
        setToast({ type: "success", message: "Project list updated." });
      }
    } catch {
      setToast({ type: "error", message: "Failed to reload projects from server." });
    } finally {
      setLoading(false);
    }
  };

  const isFiltered = search !== "" || statusFilter !== "all" || categoryFilter !== "all";

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            toast.type === "success"
              ? "border-emerald-500/40 bg-emerald-950/80 text-emerald-200"
              : "border-rose-500/40 bg-rose-950/80 text-rose-200"
          }`}
          role="status"
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle size={18} className="text-rose-400 shrink-0" />
          )}
          <span className="text-xs font-medium">{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="rounded-lg p-1 hover:bg-white/10 transition-colors"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Control Bar: Search, Filters, Refresh & View Mode */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={15} />
          </div>
          <input
            type="text"
            placeholder="Search projects by title, category, tech…"
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-9 pr-8 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0D8BFF] transition-colors"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {search && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-200"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Right: Filters & Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status filter */}
          <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/80 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => handleStatusFilterChange("all")}
              className={`rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                statusFilter === "all"
                  ? "bg-[#0D8BFF] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => handleStatusFilterChange("published")}
              className={`rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                statusFilter === "published"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Published ({projects.filter((p) => p.status === "published").length})
            </button>
            <button
              type="button"
              onClick={() => handleStatusFilterChange("draft")}
              className={`rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                statusFilter === "draft"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Drafts ({projects.filter((p) => p.status === "draft").length})
            </button>
          </div>

          {/* Category Dropdown (if multiple exist) */}
          {categories.length > 0 && (
            <select
              className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-300 focus:border-[#0D8BFF] focus:outline-none cursor-pointer"
              value={categoryFilter}
              onChange={(e) => handleCategoryFilterChange(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          {/* Clear Filters Button */}
          {isFiltered && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-slate-800 bg-slate-900/60 px-2.5 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              Reset
            </button>
          )}

          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50"
            title="Refresh list"
            aria-label="Refresh list"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center rounded-xl border border-slate-800 bg-slate-900/80 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`rounded-lg p-1.5 transition-colors ${
                viewMode === "table"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Table view"
              aria-label="Table view"
            >
              <List size={14} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`rounded-lg p-1.5 transition-colors ${
                viewMode === "grid"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Grid cards view"
              aria-label="Grid view"
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Table or Grid */}
      {paginatedProjects.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 py-16 px-4 text-center shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 mb-3.5">
            <Briefcase size={26} />
          </div>
          <h3 className="text-base font-bold text-slate-100">
            {isFiltered ? "No matching projects found" : "No projects in database"}
          </h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm">
            {isFiltered
              ? "We couldn't find any projects matching your search or active filters. Try clearing your search parameters."
              : "Get started by creating your first portfolio project to showcase on DeveloperJoy."}
          </p>
          <div className="mt-5 flex items-center gap-3">
            {isFiltered ? (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
              >
                Clear Filters
              </button>
            ) : null}
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0D8BFF] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#0D8BFF]/25 hover:bg-[#0D8BFF]/90 transition-colors"
            >
              <Plus size={14} />
              <span>Create New Project</span>
            </Link>
          </div>
        </div>
      ) : viewMode === "table" ? (
        /* Table View */
        <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-900/60 uppercase tracking-wider text-slate-400 font-semibold">
                <tr>
                  <th className="px-5 py-3.5 w-16">Preview</th>
                  <th className="px-5 py-3.5">Project Info</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-center">Featured</th>
                  <th className="px-5 py-3.5">Created</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {paginatedProjects.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-slate-900/40 transition-colors group"
                  >
                    {/* Thumbnail */}
                    <td className="px-5 py-3.5">
                      <div className="h-12 w-12 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden flex items-center justify-center text-slate-400 font-bold shrink-0">
                        {p.thumbnail ? (
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300"
                            onError={(e) => {
                              // Fallback on image load error
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <span className="text-sm text-slate-500">
                            {p.title.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Title & Slug & Tech tags */}
                    <td className="px-5 py-3.5 max-w-xs sm:max-w-md">
                      <Link
                        href={`/admin/projects/${p._id}`}
                        className="font-semibold text-slate-100 hover:text-[#0D8BFF] transition-colors line-clamp-1 block"
                      >
                        {p.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 font-mono">
                        <span>/{p.slug || p._id}</span>
                      </div>
                      {/* Technologies pills */}
                      {p.technologies && p.technologies.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 mt-1.5">
                          {p.technologies.slice(0, 3).map((t, idx) => (
                            <span
                              key={idx}
                              className="rounded-md bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-300 border border-slate-700/40"
                            >
                              {t}
                            </span>
                          ))}
                          {p.technologies.length > 3 && (
                            <span className="text-[10px] text-slate-500">
                              +{p.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300 border border-slate-700/50">
                        <Tag size={10} className="text-slate-500" />
                        <span>{p.category || "General"}</span>
                      </span>
                    </td>

                    {/* Status */}
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

                    {/* Featured */}
                    <td className="px-5 py-3.5 text-center">
                      {p.featured ? (
                        <div className="inline-flex items-center justify-center h-6 w-6 rounded-lg bg-amber-500/10 text-amber-400" title="Featured project">
                          <Star size={13} fill="currentColor" />
                        </div>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>

                    {/* Created Date */}
                    <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-slate-500" />
                        <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                            title="Visit live project URL"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}

                        <Link
                          href={`/admin/projects/${p._id}`}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-[#0D8BFF] transition-colors"
                          title="Edit project"
                        >
                          <Edit size={14} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setProjectToDelete(p)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid / Card View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedProjects.map((p) => (
            <div
              key={p._id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 overflow-hidden shadow-sm hover:border-slate-700/80 transition-all group"
            >
              {/* Card Image */}
              <div className="relative h-44 w-full bg-slate-900 border-b border-slate-800/80 overflow-hidden flex items-center justify-center">
                {p.thumbnail ? (
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <Briefcase size={32} />
                    <span className="text-xs mt-1">No preview</span>
                  </div>
                )}

                {/* Status Badges overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md ${
                      p.status === "published"
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                        : "bg-amber-950/80 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        p.status === "published" ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    <span className="capitalize">{p.status}</span>
                  </span>
                </div>

                {p.featured && (
                  <div className="absolute top-3 right-3 rounded-full bg-black/60 p-1.5 text-amber-400 backdrop-blur-md border border-amber-500/30" title="Featured project">
                    <Star size={13} fill="currentColor" />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-medium text-[#0D8BFF]">{p.category}</span>
                    <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-bold text-slate-100 text-sm group-hover:text-[#0D8BFF] transition-colors line-clamp-1">
                    {p.title}
                  </h4>
                  {p.shortDescription && (
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {p.shortDescription}
                    </p>
                  )}
                </div>

                {/* Tech Pills */}
                {p.technologies && p.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.technologies.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-300 border border-slate-700/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Card Footer Actions */}
                <div className="border-t border-slate-800/60 pt-3 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    /{p.slug}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                        title="Live Preview"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <Link
                      href={`/admin/projects/${p._id}`}
                      className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300 hover:border-[#0D8BFF]/40 hover:bg-[#0D8BFF]/10 hover:text-[#0D8BFF] transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => setProjectToDelete(p)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Footer */}
      {totalItems > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 px-4 py-3 shadow-sm text-xs text-slate-400">
          <div>
            Showing{" "}
            <span className="font-semibold text-slate-200">
              {(safeCurrentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-200">
              {Math.min(safeCurrentPage * itemsPerPage, totalItems)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-200">{totalItems}</span>{" "}
            projects
          </div>

          <div className="flex items-center gap-3">
            {/* Items per page selector */}
            <div className="flex items-center gap-1.5">
              <span>Per page:</span>
              <select
                className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-200 focus:border-[#0D8BFF] focus:outline-none cursor-pointer"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage <= 1}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>

              <span className="px-2 text-xs font-medium text-slate-300">
                {safeCurrentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage >= totalPages}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#0F172A] p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <AlertTriangle size={22} />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-white">
                  Delete Project
                </h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-slate-200">
                    "{projectToDelete.title}"
                  </span>
                  ? This will permanently remove the record from MongoDB and unpublish it from your public portfolio.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-4 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setProjectToDelete(null)}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-rose-600/25 hover:bg-rose-500 transition-colors disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Deleting…</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={13} />
                    <span>Delete Permanently</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
