// src/app/admin/(protected)/projects/[id]/EditForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateAdminProject, deleteAdminProject } from "@/lib/api";
import { Project } from "@/types/project";
import Link from "next/link";
import ImageUpload from "@/app/admin/components/ImageUpload";
import {
  ArrowLeft,
  Save,
  Trash2,
  ExternalLink,
  Sparkles,
  Image as ImageIcon,
  Code2,
  Globe,
  Tag,
  CheckCircle2,
  AlertTriangle,
  Star,
  RefreshCw,
  X,
  FileText,
  Info,
  Calendar,
} from "lucide-react";

// Helper to slugify string
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// URL validator
function isValidUrl(string: string) {
  if (!string || !string.trim()) return false;
  try {
    const url = new URL(string.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const commonCategories = [
  "WordPress Website",
  "Elementor Design",
  "WooCommerce Store",
  "Custom Development",
  "Malware Removal",
  "Speed Optimization",
];

const commonTechStack = [
  "WordPress",
  "Elementor Pro",
  "WooCommerce",
  "Tailwind CSS",
  "PHP",
  "JavaScript",
  "HTML5 / CSS3",
  "ACF Pro",
];

export default function EditForm({ project }: { project: Project }) {
  const router = useRouter();

  // Form state initialized with existing project data
  const [title, setTitle] = useState(project.title || "");
  const [slug, setSlug] = useState(project.slug || "");
  const [category, setCategory] = useState(project.category || "");
  const [shortDescription, setShortDescription] = useState(project.shortDescription || "");
  const [description, setDescription] = useState(project.description || "");
  const [thumbnail, setThumbnail] = useState(project.thumbnail || "");
  const [liveUrl, setLiveUrl] = useState(project.liveUrl || "");
  const [githubUrl, setGithubUrl] = useState(project.githubUrl || "");
  const [technologies, setTechnologies] = useState<string[]>(project.technologies || []);
  const [techInput, setTechInput] = useState("");
  const [featured, setFeatured] = useState<boolean>(Boolean(project.featured));
  const [status, setStatus] = useState<"draft" | "published">(project.status || "draft");

  // UI state
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Technologies tag management
  const addTechTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      setTechnologies((prev) => [...prev, trimmed]);
    }
  };

  const removeTechTag = (tagToRemove: string) => {
    setTechnologies((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTechTag(techInput);
      setTechInput("");
    }
  };

  // Validation
  const validate = () => {
    const errs: Record<string, string> = {};

    if (!title.trim()) {
      errs.title = "Project title is required.";
    } else if (title.trim().length < 2) {
      errs.title = "Title must be at least 2 characters.";
    } else if (title.trim().length > 200) {
      errs.title = "Title must not exceed 200 characters.";
    }

    if (!category.trim()) {
      errs.category = "Category is required.";
    }

    if (!description.trim()) {
      errs.description = "Full description is required.";
    }

    if (!thumbnail.trim()) {
      errs.thumbnail = "Thumbnail URL is required.";
    } else if (!isValidUrl(thumbnail)) {
      errs.thumbnail = "Thumbnail must be a valid HTTP or HTTPS URL.";
    }

    if (liveUrl.trim() && !isValidUrl(liveUrl)) {
      errs.liveUrl = "Live URL must be a valid HTTP or HTTPS URL.";
    }

    if (githubUrl.trim() && !isValidUrl(githubUrl)) {
      errs.githubUrl = "GitHub URL must be a valid HTTP or HTTPS URL.";
    }

    if (shortDescription.trim().length > 500) {
      errs.shortDescription = "Short description must not exceed 500 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setSuccess(null);

    if (!validate()) {
      setGeneralError("Please resolve the validation errors highlighted below.");
      return;
    }

    setLoading(true);
    try {
      const payload: Partial<Project> = {
        title: title.trim(),
        slug: slug.trim() || slugify(title),
        category: category.trim(),
        description: description.trim(),
        shortDescription: shortDescription.trim(),
        thumbnail: thumbnail.trim(),
        liveUrl: liveUrl.trim(),
        githubUrl: githubUrl.trim(),
        technologies,
        featured,
        status,
      };

      const res = await updateAdminProject(project._id, payload);
      if (res && res.success) {
        setSuccess("Project updated successfully!");
        router.refresh();
      } else {
        setGeneralError("Failed to update project. Please verify inputs.");
      }
    } catch (err: any) {
      console.error(err);
      setGeneralError(err?.message || "An error occurred while saving the project.");
    } finally {
      setLoading(false);
    }
  };

  // Delete project handler
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAdminProject(project._id);
      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      console.error("Delete failed:", err);
      setGeneralError(err?.message || "Failed to delete project.");
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors mb-2"
          >
            <ArrowLeft size={13} />
            <span>Back to Projects</span>
          </Link>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Edit Project
            </h2>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                status === "published"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  status === "published" ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
              <span className="capitalize">{status}</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <span>ID: <code className="text-slate-300 font-mono text-[11px]">{project._id}</code></span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-slate-500" />
              <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Globe size={14} className="text-[#0D8BFF]" />
              <span>Live Site</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="rounded-xl border border-rose-900/40 bg-rose-950/20 px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-900/30 transition-colors"
          >
            <Trash2 size={14} />
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0D8BFF] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#0D8BFF]/25 hover:bg-[#0D8BFF]/90 disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Saving…</span>
              </>
            ) : (
              <>
                <Save size={15} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Alerts */}
      {generalError && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300 animate-in fade-in">
          <AlertTriangle size={18} className="text-rose-400 shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300 animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Main Grid: Form Left & Sidebar Right */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Core Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-7 shadow-sm space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0D8BFF] flex items-center gap-2">
              <FileText size={16} />
              <span>Project Details</span>
            </h3>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Project Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Modern WooCommerce Fashion Store"
                className={`w-full rounded-xl border bg-slate-900/80 px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.title
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-800 focus:border-[#0D8BFF]"
                }`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.title}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                URL Slug
              </label>
              <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs text-slate-400 font-mono">
                <span className="text-slate-500 select-none">portfolio/</span>
                <input
                  type="text"
                  placeholder="modern-woocommerce-fashion-store"
                  className="w-full bg-transparent pl-1 text-slate-200 placeholder-slate-600 focus:outline-none"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. WordPress Website, WooCommerce, Custom Design…"
                className={`w-full rounded-xl border bg-slate-900/80 px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.category
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-800 focus:border-[#0D8BFF]"
                }`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {errors.category && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.category}</p>
              )}

              {/* Category Quick Presets */}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-500">Suggestions:</span>
                {commonCategories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] text-slate-300 hover:border-[#0D8BFF]/40 hover:text-[#0D8BFF] transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Short Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Short Description
                </label>
                <span className="text-[11px] text-slate-500">
                  {shortDescription.length}/500
                </span>
              </div>
              <textarea
                rows={2}
                placeholder="A concise 1-2 sentence summary displayed on portfolio grid cards…"
                className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none resize-none"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                maxLength={500}
              />
              {errors.shortDescription && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.shortDescription}</p>
              )}
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Detailed Project Description <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={6}
                placeholder="Comprehensive breakdown of client goals, WordPress architecture, speed optimization, and delivered results…"
                className={`w-full rounded-xl border bg-slate-900/80 px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.description
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-800 focus:border-[#0D8BFF]"
                }`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Technologies & Stack Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-7 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <Tag size={16} />
              <span>Technologies & Tools</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Add Technology Tag (Press Enter or Comma)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Next.js, Elementor, WooCommerce…"
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleTechKeyDown}
                />
                <button
                  type="button"
                  onClick={() => {
                    addTechTag(techInput);
                    setTechInput("");
                  }}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Tag Chips */}
              {technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {technologies.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#0D8BFF]/30 bg-[#0D8BFF]/10 px-2.5 py-1 text-xs font-medium text-[#0D8BFF]"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => removeTechTag(t)}
                        className="rounded hover:bg-[#0D8BFF]/20 text-[#0D8BFF]"
                        aria-label={`Remove ${t}`}
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Quick Tech Suggestions */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-500">Quick add:</span>
                {commonTechStack.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => addTechTag(tech)}
                    disabled={technologies.includes(tech)}
                    className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors disabled:opacity-40"
                  >
                    + {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Media, Settings, Links */}
        <div className="space-y-6">
          {/* Thumbnail & Image Preview Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 sm:p-6 shadow-sm">
            <ImageUpload
              label="Project Thumbnail"
              value={thumbnail}
              onChange={(url) => {
                setThumbnail(url);
                if (errors.thumbnail) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.thumbnail;
                    return next;
                  });
                }
              }}
              required
              error={errors.thumbnail}
              placeholder="https://images.unsplash.com/..."
              helperText="Upload a JPEG, PNG, or WEBP image (max 5 MB) or enter a direct image URL."
              aspectRatio="video"
            />
          </div>

          {/* Publication Status & Visibility Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Publication Status
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Draft Option */}
              <button
                type="button"
                onClick={() => setStatus("draft")}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                  status === "draft"
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-300"
                    : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold text-xs mb-1">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span>Draft</span>
                </div>
                <span className="text-[10px] text-slate-400 leading-tight">
                  Hidden from public site
                </span>
              </button>

              {/* Published Option */}
              <button
                type="button"
                onClick={() => setStatus("published")}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                  status === "published"
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                    : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold text-xs mb-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Published</span>
                </div>
                <span className="text-[10px] text-slate-400 leading-tight">
                  Live on public portfolio
                </span>
              </button>
            </div>

            {/* Featured Project Switch */}
            <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Star size={14} className={featured ? "text-amber-400 fill-amber-400" : "text-slate-500"} />
                  <span>Featured Project</span>
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Promote on homepage showcase
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D8BFF]" />
              </label>
            </div>
          </div>

          {/* External Links Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Globe size={16} className="text-[#0D8BFF]" />
              <span>Project URLs</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Live Website URL
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <ExternalLink size={14} />
                </div>
                <input
                  type="url"
                  placeholder="https://client-project.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-9 pr-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                />
              </div>
              {errors.liveUrl && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.liveUrl}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                GitHub Repository URL
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Code2 size={14} />
                </div>
                <input
                  type="url"
                  placeholder="https://github.com/developerjoy/..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-9 pr-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>
              {errors.githubUrl && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.githubUrl}</p>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
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
                  Delete Project Permanently?
                </h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-slate-200">
                    "{project.title}"
                  </span>
                  ? This action cannot be undone and will permanently remove this project from your database and portfolio.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-4 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowDeleteModal(false)}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
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
