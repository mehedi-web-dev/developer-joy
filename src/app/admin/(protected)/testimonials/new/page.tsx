// src/app/admin/(protected)/testimonials/new/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminTestimonial } from "@/lib/api";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Sparkles,
  Star,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  X,
  MessageSquareQuote,
  User,
  Building,
  Globe,
  Image as ImageIcon,
  Hash,
} from "lucide-react";

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

export default function NewTestimonialPage() {
  const router = useRouter();

  // Form state
  const [clientName, setClientName] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [photo, setPhoto] = useState("");
  const [clientUrl, setClientUrl] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<"draft" | "published">("draft");

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Validation
  const validate = () => {
    const errs: Record<string, string> = {};

    if (!clientName.trim()) {
      errs.clientName = "Client name is required.";
    } else if (clientName.trim().length < 2) {
      errs.clientName = "Client name must be at least 2 characters long.";
    } else if (clientName.trim().length > 100) {
      errs.clientName = "Client name must not exceed 100 characters.";
    }

    if (designation.trim() && designation.trim().length > 100) {
      errs.designation = "Designation must not exceed 100 characters.";
    }

    if (company.trim() && company.trim().length > 100) {
      errs.company = "Company must not exceed 100 characters.";
    }

    if (!content.trim()) {
      errs.content = "Testimonial content is required.";
    } else if (content.trim().length < 10) {
      errs.content = "Content must be at least 10 characters long.";
    } else if (content.trim().length > 2000) {
      errs.content = "Content must not exceed 2000 characters.";
    }

    if (photo.trim() && !isValidUrl(photo)) {
      errs.photo = "Photo must be a valid HTTP or HTTPS URL.";
    }

    if (clientUrl.trim() && !isValidUrl(clientUrl)) {
      errs.clientUrl = "Client website must be a valid HTTP or HTTPS URL.";
    }

    if (!rating || rating < 1 || rating > 5) {
      errs.rating = "Rating must be an integer between 1 and 5.";
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
      const payload = {
        clientName: clientName.trim(),
        designation: designation.trim() || undefined,
        company: company.trim() || undefined,
        photo: photo.trim() || undefined,
        clientUrl: clientUrl.trim() || undefined,
        content: content.trim(),
        rating: Number(rating) || 5,
        featured,
        displayOrder: Number(displayOrder) || 0,
        status,
      };

      const res = await createAdminTestimonial(payload);
      if (res && res.success) {
        setSuccess("Testimonial added successfully! Redirecting…");
        setTimeout(() => {
          router.push("/admin/testimonials");
          router.refresh();
        }, 1000);
      } else {
        setGeneralError("Failed to create testimonial. Please verify your input.");
      }
    } catch (err: any) {
      console.error(err);
      setGeneralError(err?.message || "An unexpected error occurred while saving the testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <Link
            href="/admin/testimonials"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors mb-2"
          >
            <ArrowLeft size={14} />
            <span>Back to Testimonials</span>
          </Link>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <MessageSquareQuote className="text-[#0D8BFF]" size={24} />
            <span>Add New Testimonial</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Publish or draft client feedback, star ratings, and company details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/testimonials"
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
                <Plus size={15} />
                <span>Save Testimonial</span>
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
          {/* Client Details Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <User size={16} className="text-[#0D8BFF]" />
              <span>Client Details</span>
            </h3>

            {/* Client Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Client Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Sarah Jenkins"
                className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.clientName
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-800 focus:border-[#0D8BFF]"
                }`}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              {errors.clientName && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.clientName}</p>
              )}
            </div>

            {/* Designation & Company (2 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Designation / Role
                </label>
                <input
                  type="text"
                  placeholder="e.g., Head of Product"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
                {errors.designation && (
                  <p className="mt-1 text-[11px] text-rose-400">{errors.designation}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g., NovaTech Global"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                {errors.company && (
                  <p className="mt-1 text-[11px] text-rose-400">{errors.company}</p>
                )}
              </div>
            </div>

            {/* Client Website URL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Client / Company Website (Optional)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Globe size={13} />
                </span>
                <input
                  type="url"
                  placeholder="https://company.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-8 pr-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
                  value={clientUrl}
                  onChange={(e) => setClientUrl(e.target.value)}
                />
              </div>
              {errors.clientUrl && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.clientUrl}</p>
              )}
            </div>
          </div>

          {/* Testimonial Content Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquareQuote size={16} className="text-[#0D8BFF]" />
                <span>Testimonial Quote</span>
              </h3>
              <span className="text-[11px] text-slate-500">
                {content.length}/2000
              </span>
            </div>

            <div>
              <textarea
                rows={6}
                placeholder="Paste or write the client's direct review or feedback here…"
                className={`w-full rounded-xl border bg-slate-900/80 p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors leading-relaxed ${
                  errors.content
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-800 focus:border-[#0D8BFF]"
                }`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.content}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Rating, Photo & Status (1 col) */}
        <div className="space-y-6">
          {/* Star Rating Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Star size={16} className="text-amber-400" />
              <span>Star Rating</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Select Client Rating (1 to 5)
              </label>
              <div className="flex items-center gap-2 p-3 rounded-xl border border-slate-800 bg-slate-900/80 justify-center">
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const isFilled = starVal <= (hoverRating ?? rating);
                  return (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1.5 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                      title={`${starVal} Star${starVal > 1 ? "s" : ""}`}
                    >
                      <Star
                        size={24}
                        fill={isFilled ? "currentColor" : "none"}
                        className={isFilled ? "text-amber-400" : "text-slate-700"}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-center text-xs font-medium text-slate-300 mt-2">
                {rating} / 5 Stars
              </p>
              {errors.rating && (
                <p className="mt-1 text-[11px] text-rose-400 text-center">{errors.rating}</p>
              )}
            </div>
          </div>

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
                <span className="text-xs font-semibold text-slate-200 block">Featured Testimonial</span>
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
                Lower numbers appear first in public testimonials.
              </span>
            </div>
          </div>

          {/* Photo & Preview Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ImageIcon size={16} className="text-[#0D8BFF]" />
              <span>Client Photo</span>
            </h3>

            {/* Live Photo Preview */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-800 bg-slate-900/80">
              <div className="h-20 w-20 rounded-full border-2 border-slate-800 bg-slate-800/80 overflow-hidden flex items-center justify-center text-slate-400 font-bold shrink-0 mb-2">
                {photo && isValidUrl(photo) ? (
                  <img
                    src={photo}
                    alt="Client preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-xl font-bold text-slate-400">
                    {clientName ? clientName.charAt(0).toUpperCase() : <User size={28} />}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">
                {clientName || "Client Name"}
              </span>
            </div>

            {/* Photo URL Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Photo URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.photo
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-800 focus:border-[#0D8BFF]"
                }`}
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
              {errors.photo && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.photo}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
