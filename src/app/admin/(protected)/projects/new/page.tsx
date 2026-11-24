// src/app/admin/(protected)/projects/new/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminProject } from "@/lib/api";
import Link from "next/link";
import ImageUpload from "@/app/admin/components/ImageUpload";
import {
  ArrowLeft,
  Plus,
  Sparkles,
  Image as ImageIcon,
  ExternalLink,
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

export default function NewProjectPage() {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Title change with auto-slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

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
      const payload = {
        title: title.trim(),
        slug: slug.trim() || slugify(title),
        category: category.trim(),
        description: description.trim(),
        shortDescription: shortDescription.trim() || undefined,
        thumbnail: thumbnail.trim(),
        liveUrl: liveUrl.trim() || undefined,
        githubUrl: githubUrl.trim() || undefined,
        technologies,
        featured,
        status,
      };

      const res = await createAdminProject(payload);
      if (res && res.success) {
        setSuccess("Project created successfully! Redirecting…");
        setTimeout(() => {
          router.push("/admin/projects");
          router.refresh();
        }, 800);
      } else {
        setGeneralError("Failed to create project. Please verify inputs.");
      }
    } catch (err: any) {
      console.error(err);
      setGeneralError(err?.message || "An error occurred while creating the project.");
    } finally {
      setLoading(false);
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Sparkles className="text-[#0D8BFF]" size={26} />
            <span>Add New Portfolio Project</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Publish a live client showcase or save a draft to work on later.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Cancel
          </Link>
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
                <Plus size={15} />
                <span>Create Project</span>
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

      {/* Main Grid: Form Left (2 cols) & Sidebar Right (1 col) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Core Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-7 shadow-sm space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0D8BFF] flex items-center gap-2">
              <FileText size={16} />
              <span>Project Information</span>
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
                onChange={handleTitleChange}
              />
              {errors.title && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.title}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  URL Slug
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug((prev) => !prev)}
                  className="text-[11px] text-[#0D8BFF] hover:underline"
                >
                  {autoSlug ? "Manual edit" : "Auto generate"}
                </button>
              </div>
              <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs text-slate-400 font-mono">
                <span className="text-slate-500 select-none">portfolio/</span>
                <input
                  type="text"
                  placeholder="modern-woocommerce-fashion-store"
                  disabled={autoSlug}
                  className="w-full bg-transparent pl-1 text-slate-200 placeholder-slate-600 focus:outline-none disabled:opacity-75"
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
    </div>
  );
}
