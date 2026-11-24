// src/app/admin/(protected)/faqs/FaqsTable.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { Faq, PaginationMeta } from "@/types/cms";
import { deleteAdminFaq, getAdminFaqs } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  X,
  RefreshCw,
  LayoutGrid,
  List,
  Calendar,
  HelpCircle,
  Tag,
  Hash,
} from "lucide-react";

interface FaqsTableProps {
  initialFaqs: Faq[];
  initialPagination?: PaginationMeta;
}

export default function FaqsTable({ initialFaqs }: FaqsTableProps) {
  const router = useRouter();

  // State
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "list">("table");

  // Expandable answers state (set of expanded FAQ IDs)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  // Modal & feedback state
  const [faqToDelete, setFaqToDelete] = useState<Faq | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Dismiss toast after 3.5s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Extract distinct categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    faqs.forEach((f) => {
      if (f.category) cats.add(f.category);
    });
    return Array.from(cats);
  }, [faqs]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        (f.category && f.category.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "all" || f.status === statusFilter;

      const matchesFeatured =
        featuredFilter === "all" || f.featured === true;

      const matchesCategory =
        categoryFilter === "all" || f.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesFeatured && matchesCategory;
    });
  }, [faqs, search, statusFilter, featuredFilter, categoryFilter]);

  // Paginated slice
  const totalItems = filteredFaqs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedFaqs = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredFaqs.slice(start, start + itemsPerPage);
  }, [filteredFaqs, safeCurrentPage, itemsPerPage]);

  // Toggle answer expansion
  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

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

  const handleCategoryFilterChange = (val: string) => {
    setCategoryFilter(val);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setFeaturedFilter("all");
    setCategoryFilter("all");
    setCurrentPage(1);
  };

  // Delete handler
  const confirmDelete = async () => {
    if (!faqToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAdminFaq(faqToDelete._id);
      setFaqs((prev) => prev.filter((f) => f._id !== faqToDelete._id));
      setToast({
        type: "success",
        message: `FAQ deleted successfully.`,
      });
      setFaqToDelete(null);
      router.refresh();
    } catch (err: any) {
      console.error("Delete failed:", err);
      setToast({
        type: "error",
        message: err?.message || "Failed to delete FAQ. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Refresh data from API
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await getAdminFaqs({ limit: 100 });
      if (res && res.data) {
        setFaqs(res.data);
        setToast({ type: "success", message: "FAQ list updated." });
      }
    } catch {
      setToast({ type: "error", message: "Failed to reload FAQs from server." });
    } finally {
      setLoading(false);
    }
  };

  const isFiltered =
    search !== "" ||
    statusFilter !== "all" ||
    featuredFilter !== "all" ||
    categoryFilter !== "all";

  // Status counts
  const publishedCount = faqs.filter((f) => f.status === "published").length;
  const draftCount = faqs.filter((f) => f.status === "draft").length;
  const featuredCount = faqs.filter((f) => f.featured).length;

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
            placeholder="Search FAQs by question, answer, category…"
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
              All ({faqs.length})
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

          {/* Category Filter Dropdown */}
          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => handleCategoryFilterChange(e.target.value)}
              className="rounded-xl border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-300 focus:border-[#0D8BFF] focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}

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
              onClick={() => setViewMode("list")}
              className={`rounded-lg p-1.5 transition-colors ${
                viewMode === "list"
                  ? "bg-[#0D8BFF] text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Accordion card view"
              aria-label="Accordion card view"
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {paginatedFaqs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 py-16 px-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/60 text-slate-400 mb-4 border border-slate-700/50">
            <HelpCircle size={28} />
          </div>
          {isFiltered ? (
            <>
              <h3 className="text-sm font-semibold text-slate-200">No matching FAQs found</h3>
              <p className="mt-1 text-xs text-slate-400 max-w-sm">
                No FAQs matched your current search query or active filters. Try clearing your filters or searching for something else.
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
              <h3 className="text-sm font-semibold text-slate-200">No FAQs yet</h3>
              <p className="mt-1 text-xs text-slate-400 max-w-sm">
                You haven&apos;t created any frequently asked questions yet. Help prospective clients learn more about your services.
              </p>
              <Link
                href="/admin/faqs/new"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0D8BFF] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#0D8BFF]/25 hover:bg-[#0D8BFF]/90 transition-all"
              >
                <Plus size={15} />
                <span>Create First FAQ</span>
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
                  <th className="px-5 py-3.5 w-10"></th>
                  <th className="px-5 py-3.5">Question & Answer Preview</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5 text-center">Featured</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-center">Order</th>
                  <th className="px-5 py-3.5">Created</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {paginatedFaqs.map((faq) => {
                  const isExpanded = expandedIds.has(faq._id);
                  return (
                    <tr
                      key={faq._id}
                      className="hover:bg-slate-900/40 transition-colors group"
                    >
                      {/* Expand / Collapse toggle button */}
                      <td className="pl-4 pr-1 py-3.5 align-top">
                        <button
                          type="button"
                          onClick={() => toggleExpand(faq._id)}
                          className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                          title={isExpanded ? "Collapse answer" : "Expand full answer"}
                          aria-label={isExpanded ? "Collapse answer" : "Expand full answer"}
                        >
                          {isExpanded ? (
                            <ChevronUp size={14} className="text-[#0D8BFF]" />
                          ) : (
                            <ChevronDown size={14} />
                          )}
                        </button>
                      </td>

                      {/* Question & Answer */}
                      <td className="px-5 py-3.5 max-w-md">
                        <Link
                          href={`/admin/faqs/${faq._id}`}
                          className="font-semibold text-slate-100 hover:text-[#0D8BFF] transition-colors block text-sm"
                        >
                          {faq.question}
                        </Link>
                        <p
                          className={`mt-1 text-xs text-slate-400 leading-relaxed ${
                            isExpanded ? "" : "line-clamp-2"
                          }`}
                        >
                          {faq.answer}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-3.5 whitespace-nowrap align-top">
                        <span className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-slate-900/70 px-2 py-0.5 text-[11px] text-slate-300">
                          <Tag size={10} className="text-[#0D8BFF]" />
                          <span>{faq.category || "General"}</span>
                        </span>
                      </td>

                      {/* Featured */}
                      <td className="px-5 py-3.5 text-center whitespace-nowrap align-top">
                        {faq.featured ? (
                          <span
                            className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            title="Featured on homepage"
                          >
                            <Star size={13} fill="currentColor" />
                          </span>
                        ) : (
                          <span className="text-slate-600 text-xs">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5 whitespace-nowrap align-top">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                            faq.status === "published"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              faq.status === "published" ? "bg-emerald-400" : "bg-amber-400"
                            }`}
                          />
                          <span className="capitalize">{faq.status}</span>
                        </span>
                      </td>

                      {/* Display Order */}
                      <td className="px-5 py-3.5 text-center whitespace-nowrap font-mono text-slate-400 align-top">
                        {faq.displayOrder ?? 0}
                      </td>

                      {/* Created Date */}
                      <td className="px-5 py-3.5 whitespace-nowrap text-slate-400 align-top">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <Calendar size={12} className="text-slate-500" />
                          <span>{new Date(faq.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right whitespace-nowrap align-top">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/faqs/${faq._id}`}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-[#0D8BFF] transition-colors"
                            title="Edit FAQ"
                            aria-label={`Edit ${faq.question}`}
                          >
                            <Edit size={14} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setFaqToDelete(faq)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-950/40 hover:text-rose-400 transition-colors"
                            title="Delete FAQ"
                            aria-label={`Delete ${faq.question}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Accordion Card / List View */
        <div className="space-y-3">
          {paginatedFaqs.map((faq) => {
            const isExpanded = expandedIds.has(faq._id);
            return (
              <div
                key={faq._id}
                className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 overflow-hidden shadow-sm transition-all"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleExpand(faq._id)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-900/40 transition-colors select-none"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#0D8BFF]/10 text-[#0D8BFF] text-xs font-bold shrink-0">
                      Q
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                          <Tag size={9} className="text-[#0D8BFF]" />
                          <span>{faq.category || "General"}</span>
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          #{faq.displayOrder ?? 0}
                        </span>
                        {faq.featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-400">
                            <Star size={10} fill="currentColor" />
                            <span>Featured</span>
                          </span>
                        )}
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.2 text-[10px] font-semibold ${
                            faq.status === "published"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${
                              faq.status === "published" ? "bg-emerald-400" : "bg-amber-400"
                            }`}
                          />
                          <span className="capitalize">{faq.status}</span>
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-100 text-sm hover:text-[#0D8BFF] transition-colors truncate">
                        {faq.question}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/admin/faqs/${faq._id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300 hover:border-[#0D8BFF]/40 hover:bg-[#0D8BFF]/10 hover:text-[#0D8BFF] transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFaqToDelete(faq);
                      }}
                      className="rounded-lg border border-slate-800 bg-slate-900 p-1.5 text-slate-400 hover:border-rose-900 hover:bg-rose-950/40 hover:text-rose-400 transition-colors"
                      title="Delete FAQ"
                      aria-label="Delete FAQ"
                    >
                      <Trash2 size={13} />
                    </button>
                    <div className="p-1 text-slate-400">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/60 bg-slate-900/30 text-xs text-slate-300 leading-relaxed">
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                        A
                      </span>
                      <p className="whitespace-pre-line">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
      {filteredFaqs.length > 0 && (
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
              of <strong className="text-slate-200">{totalItems}</strong> FAQs
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
      {faqToDelete && (
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
                  Delete FAQ
                </h3>
                <p className="text-xs text-slate-400">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-300">
              Are you sure you want to permanently delete this FAQ:
              <blockquote className="mt-2 text-white font-medium italic border-l-2 border-[#0D8BFF] pl-2.5">
                &ldquo;{faqToDelete.question}&rdquo;
              </blockquote>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setFaqToDelete(null)}
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
