// src/app/admin/(protected)/services/[id]/EditForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateAdminService, deleteAdminService } from "@/lib/api";
import { Service } from "@/types/cms";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Star,
  RefreshCw,
  X,
  FileText,
  Layers,
  Check,
  Hash,
  Globe,
  Code,
  ShieldCheck,
  Zap,
  Smartphone,
  Palette,
  Search,
  Server,
  Database,
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

// Popular icon presets
const commonIcons = [
  { label: "Globe", value: "Globe" },
  { label: "Code", value: "Code" },
  { label: "Shield", value: "ShieldCheck" },
  { label: "Zap", value: "Zap" },
  { label: "Mobile", value: "Smartphone" },
  { label: "Design", value: "Palette" },
  { label: "Layers", value: "Layers" },
  { label: "SEO", value: "Search" },
  { label: "Server", value: "Server" },
  { label: "Database", value: "Database" },
];

// Common deliverable suggestions
const suggestedDeliverables = [
  "Custom Design System",
  "Responsive Mobile Layout",
  "SEO Optimization & Metadata",
  "Speed & Core Web Vitals Optimization",
  "Content Management Setup",
  "Security Hardening & SSL",
  "Cross-Browser Compatibility",
  "Analytics & Tracking Integration",
];

interface EditFormProps {
  service: Service;
}

export default function EditForm({ service }: EditFormProps) {
  const router = useRouter();

  // Form state pre-populated with existing data
  const [title, setTitle] = useState(service.title || "");
  const [slug, setSlug] = useState(service.slug || "");
  const [autoSlug, setAutoSlug] = useState(false);
  const [shortDescription, setShortDescription] = useState(service.shortDescription || "");
  const [description, setDescription] = useState(service.description || "");
  const [icon, setIcon] = useState(service.icon || "");
  const [image, setImage] = useState(service.image || "");
  const [deliverables, setDeliverables] = useState<string[]>(service.deliverables || []);
  const [deliverableInput, setDeliverableInput] = useState("");
  const [featured, setFeatured] = useState<boolean>(Boolean(service.featured));
  const [displayOrder, setDisplayOrder] = useState<number>(service.displayOrder ?? 0);
  const [status, setStatus] = useState<"draft" | "published">(
    service.status === "published" ? "published" : "draft"
  );

  // UI state
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Title change with optional auto-slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

  // Deliverables management
  const addDeliverable = (item: string) => {
    const trimmed = item.trim();
    if (trimmed && !deliverables.includes(trimmed)) {
      setDeliverables((prev) => [...prev, trimmed]);
    }
  };

  const removeDeliverable = (itemToRemove: string) => {
    setDeliverables((prev) => prev.filter((d) => d !== itemToRemove));
  };

  const handleDeliverableKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addDeliverable(deliverableInput);
      setDeliverableInput("");
    }
  };

  // Validation
  const validate = () => {
    const errs: Record<string, string> = {};

    if (!title.trim()) {
      errs.title = "Service title is required.";
    } else if (title.trim().length < 2) {
      errs.title = "Title must be at least 2 characters long.";
    } else if (title.trim().length > 150) {
      errs.title = "Title must not exceed 150 characters.";
    }

    if (!shortDescription.trim()) {
      errs.shortDescription = "Short description is required.";
    } else if (shortDescription.trim().length < 5) {
      errs.shortDescription = "Short description must be at least 5 characters long.";
    } else if (shortDescription.trim().length > 300) {
      errs.shortDescription = "Short description must not exceed 300 characters.";
    }

    if (!description.trim()) {
      errs.description = "Full description is required.";
    }

    if (image.trim() && !isValidUrl(image)) {
      errs.image = "Image must be a valid HTTP or HTTPS URL.";
    }

    if (displayOrder < 0 || !Number.isInteger(Number(displayOrder))) {
      errs.displayOrder = "Display order must be a non-negative integer.";
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
      const payload: Partial<Service> = {
        title: title.trim(),
        slug: slug.trim() || slugify(title),
        shortDescription: shortDescription.trim(),
        description: description.trim(),
        icon: icon.trim() || "",
        image: image.trim() || "",
        deliverables,
        featured,
        displayOrder: Number(displayOrder) || 0,
        status,
      };

      const res = await updateAdminService(service._id, payload);
      if (res && res.success) {
        setSuccess("Service updated successfully!");
        router.refresh();
      } else {
        setGeneralError("Failed to update service. Please verify your input.");
      }
    } catch (err: any) {
      console.error(err);
      setGeneralError(err?.message || "An unexpected error occurred while saving the service.");
    } finally {
      setLoading(false);
    }
  };

  // Delete service handler
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAdminService(service._id);
      router.push("/admin/services");
      router.refresh();
    } catch (err: any) {
      console.error("Delete failed:", err);
      setGeneralError(err?.message || "Failed to delete service.");
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors mb-2"
          >
            <ArrowLeft size={14} />
            <span>Back to Services</span>
          </Link>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Layers className="text-[#0D8BFF]" size={24} />
            <span>Edit Service</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Updating: <strong className="text-slate-200">{service.title}</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="rounded-xl border border-rose-900/40 bg-rose-950/20 px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-900/30 transition-colors cursor-pointer"
          >
            <Trash2 size={14} className="inline mr-1.5" />
            <span>Delete</span>
          </button>

          <Link
            href="/admin/services"
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0D8BFF] px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-[#0D8BFF]/25 hover:bg-[#0D8BFF]/90 disabled:opacity-50 transition-all cursor-pointer"
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

      {/* Global Alerts */}
      {generalError && (
        <div className="flex items-center gap-3 rounded-2xl border border-rose-500/40 bg-rose-950/40 p-4 text-xs text-rose-200">
          <AlertTriangle size={18} className="text-rose-400 shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-xs text-emerald-200">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Primary Content (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText size={16} className="text-[#0D8BFF]" />
              <span>Service Information</span>
            </h3>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Service Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Full Stack Web Application Development"
                className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
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

            {/* Slug with Auto/Manual toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Slug (URL Path)
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-[11px] text-[#0D8BFF] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles size={11} />
                  <span>{autoSlug ? "Keep current slug" : "Auto-update slug from title"}</span>
                </button>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-slate-500 font-mono">
                  /services/
                </span>
                <input
                  type="text"
                  placeholder="web-application-development"
                  disabled={autoSlug}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-24 pr-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 font-mono focus:border-[#0D8BFF] focus:outline-none disabled:opacity-60"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Created: {new Date(service.createdAt).toLocaleDateString()} · Last updated: {new Date(service.updatedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Short Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Short Description (Summary) <span className="text-rose-400">*</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  {shortDescription.length}/300
                </span>
              </div>
              <textarea
                rows={2}
                placeholder="A concise 1-2 sentence overview of what this service delivers…"
                className={`w-full rounded-xl border bg-slate-900/80 p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                  errors.shortDescription
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-800 focus:border-[#0D8BFF]"
                }`}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
              {errors.shortDescription && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.shortDescription}</p>
              )}
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Detailed Service Description <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={6}
                placeholder="Comprehensive description covering your process, technologies, guarantees, and value proposition…"
                className={`w-full rounded-xl border bg-slate-900/80 p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
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

          {/* Deliverables Manager Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 space-y-4 shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#0D8BFF]" />
                <span>Deliverables & Key Inclusions</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Modify or add outcomes, components, or guarantees included with this service.
              </p>
            </div>

            {/* Input to add deliverable */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g., Full Source Code & GitHub Repository"
                className="flex-1 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
                value={deliverableInput}
                onChange={(e) => setDeliverableInput(e.target.value)}
                onKeyDown={handleDeliverableKeyDown}
              />
              <button
                type="button"
                onClick={() => {
                  addDeliverable(deliverableInput);
                  setDeliverableInput("");
                }}
                className="rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>

            {/* Active deliverables chips */}
            {deliverables.length > 0 ? (
              <div className="space-y-2 pt-1">
                {deliverables.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-2 text-xs text-slate-200"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-[#0D8BFF]/10 text-[#0D8BFF] text-[10px] font-bold">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDeliverable(item)}
                      className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                      aria-label={`Remove ${item}`}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-1">
                No deliverables added yet. Use the field above or click any suggestion below.
              </p>
            )}

            {/* Suggestions */}
            <div>
              <span className="text-[11px] text-slate-500 block mb-1.5 font-medium">
                Quick Deliverable Suggestions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedDeliverables.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => addDeliverable(sug)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/60 px-2 py-1 text-[11px] text-slate-400 hover:border-[#0D8BFF]/40 hover:bg-[#0D8BFF]/10 hover:text-[#0D8BFF] transition-colors cursor-pointer"
                  >
                    <Plus size={10} />
                    <span>{sug}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Thumbnail, Status & Display (1 col) */}
        <div className="space-y-6">
          {/* Status & Visibility Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-[#0D8BFF]" />
              <span>Publication & State</span>
            </h3>

            {/* Status radio cards */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label
                  className={`flex flex-col rounded-xl border p-3 cursor-pointer transition-all ${
                    status === "draft"
                      ? "border-amber-500/50 bg-amber-950/20 text-amber-200"
                      : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={status === "draft"}
                    onChange={() => setStatus("draft")}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-1.5 font-semibold text-xs">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span>Draft</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1">Hidden from public</span>
                </label>

                <label
                  className={`flex flex-col rounded-xl border p-3 cursor-pointer transition-all ${
                    status === "published"
                      ? "border-emerald-500/50 bg-emerald-950/20 text-emerald-200"
                      : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={status === "published"}
                    onChange={() => setStatus("published")}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-1.5 font-semibold text-xs">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Published</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1">Visible on site</span>
                </label>
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Featured Service</span>
                <span className="text-[11px] text-slate-500 block">Highlight on home & portfolio</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D8BFF]" />
              </label>
            </div>

            {/* Display Order */}
            <div className="pt-2 border-t border-slate-800/80">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Display Order
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Hash size={13} />
                </span>
                <input
                  type="number"
                  min={0}
                  step={1}
                  placeholder="0"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-8 pr-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
                />
              </div>
              {errors.displayOrder && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.displayOrder}</p>
              )}
              <span className="text-[11px] text-slate-500 mt-1 block">
                Lower numbers appear first in public listings.
              </span>
            </div>
          </div>

          {/* Image & Preview Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ImageIcon size={16} className="text-[#0D8BFF]" />
              <span>Service Banner / Image</span>
            </h3>

            {/* Live Image Preview */}
            <div className="relative h-44 w-full rounded-xl border border-slate-800 bg-slate-900 overflow-hidden flex items-center justify-center">
              {image && isValidUrl(image) ? (
                <img
                  src={image}
                  alt="Service preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500 text-center p-4">
                  <Layers size={36} className="text-slate-600 mb-1" />
                  <span className="text-xs font-medium">Image Preview</span>
                  <span className="text-[10px] text-slate-600">Enter a valid URL below</span>
                </div>
              )}
            </div>

            {/* Image URL Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Image URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.image
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-800 focus:border-[#0D8BFF]"
                }`}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              {errors.image && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.image}</p>
              )}
            </div>
          </div>

          {/* Icon Selector Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-[#0D8BFF]" />
              <span>Service Icon Identifier</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Icon Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Globe, Code, ShieldCheck"
                className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
            </div>

            {/* Icon Presets */}
            <div>
              <span className="text-[11px] text-slate-500 block mb-1.5 font-medium">
                Popular Icon Presets:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {commonIcons.map((ic) => (
                  <button
                    key={ic.value}
                    type="button"
                    onClick={() => setIcon(ic.value)}
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-colors cursor-pointer text-left ${
                      icon === ic.value
                        ? "border-[#0D8BFF] bg-[#0D8BFF]/10 text-[#0D8BFF]"
                        : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-[11px] font-mono">{ic.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
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
                  Delete Service
                </h3>
                <p className="text-xs text-slate-400">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-300">
              Are you sure you want to permanently delete{" "}
              <strong className="text-white font-semibold">&ldquo;{service.title}&rdquo;</strong>{" "}
              (slug: <code className="text-[#0D8BFF] font-mono">/{service.slug}</code>)?
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
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
