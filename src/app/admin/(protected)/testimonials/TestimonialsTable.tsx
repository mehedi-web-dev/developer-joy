// src/app/admin/(protected)/testimonials/TestimonialsTable.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { Testimonial, PaginationMeta } from "@/types/cms";
import { deleteAdminTestimonial, getAdminTestimonials } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle2,
  Star,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
  RefreshCw,
  LayoutGrid,
  List,
  Calendar,
  MessageSquareQuote,
  User,
  Building,
  Hash,
} from "lucide-react";

interface TestimonialsTableProps {
  initialTestimonials: Testimonial[];
  initialPagination?: PaginationMeta;
}

export default function TestimonialsTable({
  initialTestimonials,
}: TestimonialsTableProps) {
  const router = useRouter();

  // State
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured">("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  // Modal & feedback state
  const [itemToDelete, setItemToDelete] = useState<Testimonial | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Dismiss toast after 3.5s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.clientName.toLowerCase().includes(q) ||
        (t.company && t.company.toLowerCase().includes(q)) ||
        (t.designation && t.designation.toLowerCase().includes(q)) ||
        t.content.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" || t.status === statusFilter;

      const matchesFeatured =
        featuredFilter === "all" || t.featured === true;

      const matchesRating =
        ratingFilter === "all" || t.rating === Number(ratingFilter);

      return matchesSearch && matchesStatus && matchesFeatured && matchesRating;
    });
  }, [testimonials, search, statusFilter, featuredFilter, ratingFilter]);

  // Paginated slice
  const totalItems = filteredTestimonials.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredTestimonials.slice(start, start + itemsPerPage);
  }, [filteredTestimonials, safeCurrentPage, itemsPerPage]);

  // Reset page when search or filters change
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (val: "all" | "published" | "draft") => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const handleFeaturedFilterChange = (val: "all" | "featured") => {
    setFeaturedFilter(val);
    setCurrentPage(1);
  };

  const handleRatingFilterChange = (val: string) => {
    setRatingFilter(val);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setFeaturedFilter("all");
    setRatingFilter("all");
    setCurrentPage(1);
  };

  // Delete handler
  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAdminTestimonial(itemToDelete._id);
      setTestimonials((prev) => prev.filter((t) => t._id !== itemToDelete._id));
      setToast({
        type: "success",
        message: `Testimonial from "${itemToDelete.clientName}" deleted successfully.`,
      });
      setItemToDelete(null);
      router.refresh();
    } catch (err: any) {
      console.error("Delete failed:", err);
      setToast({
        type: "error",
        message: err?.message || "Failed to delete testimonial. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Refresh data from API
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await getAdminTestimonials({ limit: 100 });
      if (res && res.data) {
        setTestimonials(res.data);
        setToast({ type: "success", message: "Testimonial list updated." });
      }
    } catch {
      setToast({ type: "error", message: "Failed to reload testimonials from server." });
    } finally {
      setLoading(false);
    }
  };

  const isFiltered =
    search !== "" ||
    statusFilter !== "all" ||
    featuredFilter !== "all" ||
    ratingFilter !== "all";

  // Status counts
  const publishedCount = testimonials.filter((t) => t.status === "published").length;
  const draftCount = testimonials.filter((t) => t.status === "draft").length;
  const featuredCount = testimonials.filter((t) => t.featured).length;

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
            placeholder="Search by client, company, content…"
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
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tabs */}
          <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/80 p-1">
            <button
              type="button"
              onClick={() => handleStatusFilterChange("all")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                statusFilter === "all"
                  ? "bg-[#0D8BFF] text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All ({testimonials.length})
            </button>
            <button
              type="button"
              onClick={() => handleStatusFilterChange("published")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                statusFilter === "published"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Published ({publishedCount})
            </button>
            <button
              type="button"
              onClick={() => handleStatusFilterChange("draft")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                statusFilter === "draft"
                  ? "bg-amber-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Draft ({draftCount})
            </button>
          </div>

          {/* Rating Dropdown */}
          <select
            value={ratingFilter}
            onChange={(e) => handleRatingFilterChange(e.target.value)}
            className="rounded-xl border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-300 focus:border-[#0D8BFF] focus:outline-none"
          >
            <option value="all">All Ratings</option>
            <option value="5">★ 5 Stars</option>
            <option value="4">★ 4 Stars</option>
            <option value="3">★ 3 Stars</option>
            <option value="2">★ 2 Stars</option>
            <option value="1">★ 1 Star</option>
          </select>

          {/* Featured Filter Toggle */}
          <button
            type="button"
            onClick={() => handleFeaturedFilterChange(featuredFilter === "all" ? "featured" : "all")}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors ${
              featuredFilter === "featured"
                ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                : "border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Star size={13} fill={featuredFilter === "featured" ? "currentColor" : "none"} className={featuredFilter === "featured" ? "text-amber-400" : ""} />
            <span>Featured ({featuredCount})</span>
          </button>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="rounded-xl border border-slate-800 bg-slate-900/80 p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors disabled:opacity-50"
            title="Refresh from server"
            aria-label="Refresh from server"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-[#0D8BFF]" : ""} />
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/80 p-1">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`rounded-lg p-1.5 transition-colors ${
                viewMode === "table"
                  ? "bg-[#0D8BFF] text-white"
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
                  ? "bg-[#0D8BFF] text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Grid card view"
              aria-label="Grid card view"
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {paginatedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 py-16 px-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/60 text-slate-400 mb-4 border border-slate-700/50">
            <MessageSquareQuote size={28} />
          </div>
          {isFiltered ? (
            <>
              <h3 className="text-sm font-semibold text-slate-200">No matching testimonials found</h3>
              <p className="mt-1 text-xs text-slate-400 max-w-sm">
                No testimonials matched your current search query or active filters. Try clearing your filters or searching for something else.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <X size={13} />
                <span>Reset Filters</span>
              </button>
            </>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-slate-200">No testimonials yet</h3>
              <p className="mt-1 text-xs text-slate-400 max-w-sm">
                You haven&apos;t added any client testimonials yet. Collect and showcase feedback from your satisfied clients.
              </p>
              <Link
                href="/admin/testimonials/new"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0D8BFF] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#0D8BFF]/25 hover:bg-[#0D8BFF]/90 transition-all"
              >
                <Plus size={15} />
                <span>Add First Testimonial</span>
              </Link>
            </>
          )}
        </div>
      ) : viewMode === "table" ? (
        /* Table View */
        <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-900/60 uppercase tracking-wider text-slate-400 font-semibold">
                <tr>
                  <th className="px-5 py-3.5 w-14">Photo</th>
                  <th className="px-5 py-3.5">Client & Company</th>
                  <th className="px-5 py-3.5">Rating</th>
                  <th className="px-5 py-3.5">Testimonial Content</th>
                  <th className="px-5 py-3.5 text-center">Featured</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-center">Order</th>
                  <th className="px-5 py-3.5">Created</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {paginatedItems.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-900/40 transition-colors group"
                  >
                    {/* Photo / Avatar */}
                    <td className="px-5 py-3.5">
                      <div className="h-10 w-10 rounded-full border border-slate-800 bg-slate-900 overflow-hidden flex items-center justify-center text-slate-400 font-bold shrink-0">
                        {item.photo ? (
                          <img
                            src={item.photo}
                            alt={item.clientName}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <span className="text-xs text-slate-400 font-bold">
                            {item.clientName.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Client & Role */}
                    <td className="px-5 py-3.5 max-w-xs whitespace-nowrap">
                      <Link
                        href={`/admin/testimonials/${item._id}`}
                        className="font-semibold text-slate-100 hover:text-[#0D8BFF] transition-colors block text-sm"
                      >
                        {item.clientName}
                      </Link>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                        {item.designation && <span>{item.designation}</span>}
                        {item.designation && item.company && <span>·</span>}
                        {item.company && <span>{item.company}</span>}
                      </div>
                      {item.clientUrl && (
                        <a
                          href={item.clientUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-[#0D8BFF] hover:underline mt-0.5"
                        >
                          <ExternalLink size={10} />
                          <span>Website</span>
                        </a>
                      )}
                    </td>

                    {/* Rating */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < (item.rating || 5) ? "currentColor" : "none"}
                            className={i < (item.rating || 5) ? "text-amber-400" : "text-slate-700"}
                          />
                        ))}
                        <span className="ml-1 text-[11px] font-mono text-slate-400">
                          {item.rating}/5
                        </span>
                      </div>
                    </td>

                    {/* Testimonial Content preview */}
                    <td className="px-5 py-3.5 max-w-md">
                      <p className="text-xs text-slate-300 line-clamp-2 italic">
                        &ldquo;{item.content}&rdquo;
                      </p>
                    </td>

                    {/* Featured */}
                    <td className="px-5 py-3.5 text-center whitespace-nowrap">
                      {item.featured ? (
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20" title="Featured testimonial">
                          <Star size={13} fill="currentColor" />
                        </span>
                      ) : (
                        <span className="text-slate-600 text-xs">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          item.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.status === "published" ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                        />
                        <span className="capitalize">{item.status}</span>
                      </span>
                    </td>

                    {/* Display Order */}
                    <td className="px-5 py-3.5 text-center whitespace-nowrap font-mono text-slate-400">
                      {item.displayOrder ?? 0}
                    </td>

                    {/* Created Date */}
                    <td className="px-5 py-3.5 whitespace-nowrap text-slate-400">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <Calendar size={12} className="text-slate-500" />
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/testimonials/${item._id}`}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-[#0D8BFF] transition-colors"
                          title="Edit testimonial"
                          aria-label={`Edit testimonial from ${item.clientName}`}
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setItemToDelete(item)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-950/40 hover:text-rose-400 transition-colors"
                          title="Delete testimonial"
                          aria-label={`Delete testimonial from ${item.clientName}`}
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
          {paginatedItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 shadow-sm hover:border-slate-700/80 transition-all group relative"
            >
              <div>
                {/* Header: Photo, Client Name, Role & Badges */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full border border-slate-800 bg-slate-900 overflow-hidden flex items-center justify-center text-slate-400 font-bold shrink-0">
                      {item.photo ? (
                        <img
                          src={item.photo}
                          alt={item.clientName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold text-slate-400">
                          {item.clientName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm group-hover:text-[#0D8BFF] transition-colors line-clamp-1">
                        {item.clientName}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {item.designation || item.company || "Client"}
                        {item.designation && item.company && ` · ${item.company}`}
                      </p>
                    </div>
                  </div>

                  {item.featured && (
                    <div className="rounded-full bg-amber-500/10 p-1 text-amber-400 border border-amber-500/20 shrink-0" title="Featured testimonial">
                      <Star size={13} fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < (item.rating || 5) ? "currentColor" : "none"}
                      className={i < (item.rating || 5) ? "text-amber-400" : "text-slate-700"}
                    />
                  ))}
                  <span className="ml-1 text-[11px] font-mono text-slate-400">
                    ({item.rating}/5)
                  </span>
                </div>

                {/* Content Quote */}
                <p className="text-xs text-slate-300 italic line-clamp-4 leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      item.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        item.status === "published" ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    <span className="capitalize">{item.status}</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    #{item.displayOrder ?? 0}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/admin/testimonials/${item._id}`}
                    className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300 hover:border-[#0D8BFF]/40 hover:bg-[#0D8BFF]/10 hover:text-[#0D8BFF] transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => setItemToDelete(item)}
                    className="rounded-lg border border-slate-800 bg-slate-900 p-1.5 text-slate-400 hover:border-rose-900 hover:bg-rose-950/40 hover:text-rose-400 transition-colors"
                    title="Delete testimonial"
                    aria-label="Delete testimonial"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {filteredTestimonials.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 px-4 py-3 shadow-sm text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              Showing{" "}
              <strong className="text-slate-200">
                {(safeCurrentPage - 1) * itemsPerPage + 1}
              </strong>{" "}
              to{" "}
              <strong className="text-slate-200">
                {Math.min(safeCurrentPage * itemsPerPage, totalItems)}
              </strong>{" "}
              of <strong className="text-slate-200">{totalItems}</strong> testimonials
            </span>

            {/* Items Per Page Selector */}
            <div className="flex items-center gap-1.5 ml-3">
              <span className="text-slate-500">Per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-200 focus:border-[#0D8BFF] focus:outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              type="button"
              disabled={safeCurrentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:hover:bg-slate-900 disabled:hover:text-slate-300 transition-colors"
            >
              <ChevronLeft size={14} />
              <span>Prev</span>
            </button>

            <span className="px-2 text-xs font-medium text-slate-300">
              Page {safeCurrentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={safeCurrentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:hover:bg-slate-900 disabled:hover:text-slate-300 transition-colors"
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-rose-900/40 bg-[#0F1422] p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-950/60 text-rose-400 border border-rose-800/50 shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 id="delete-dialog-title" className="text-sm font-bold text-white">
                  Delete Testimonial
                </h3>
                <p className="text-xs text-slate-400">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-300">
              Are you sure you want to delete the testimonial from{" "}
              <strong className="text-white font-semibold">
                &ldquo;{itemToDelete.clientName}&rdquo;
              </strong>
              {itemToDelete.company && (
                <span> ({itemToDelete.company})</span>
              )}?
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-rose-600/25 hover:bg-rose-500 disabled:opacity-50 transition-all cursor-pointer"
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
