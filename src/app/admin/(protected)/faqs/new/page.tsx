// src/app/admin/(protected)/faqs/new/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminFaq } from "@/lib/api";
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
  HelpCircle,
  Tag,
  Hash,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";

const suggestedCategories = [
  "General",
  "Development",
  "Design",
  "Pricing & Payment",
  "Support & Maintenance",
  "Security & Hosting",
];

export default function NewFaqPage() {
  const router = useRouter();

  // Form state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<"draft" | "published">("draft");

  // Accordion preview state
  const [previewOpen, setPreviewOpen] = useState(true);

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Validation
  const validate = () => {
    const errs: Record<string, string> = {};

    if (!question.trim()) {
      errs.question = "Question is required.";
    } else if (question.trim().length < 5) {
      errs.question = "Question must be at least 5 characters long.";
    } else if (question.trim().length > 300) {
      errs.question = "Question must not exceed 300 characters.";
    }

    if (!answer.trim()) {
      errs.answer = "Answer is required.";
    } else if (answer.trim().length < 5) {
      errs.answer = "Answer must be at least 5 characters long.";
    } else if (answer.trim().length > 5000) {
      errs.answer = "Answer must not exceed 5000 characters.";
    }

    if (category.trim() && category.trim().length > 50) {
      errs.category = "Category must not exceed 50 characters.";
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
        question: question.trim(),
        answer: answer.trim(),
        category: category.trim() || "General",
        featured,
        displayOrder: Number(displayOrder) || 0,
        status,
      };

      const res = await createAdminFaq(payload);
      if (res && res.success) {
        setSuccess("FAQ created successfully! Redirecting…");
        setTimeout(() => {
          router.push("/admin/faqs");
          router.refresh();
        }, 1000);
      } else {
        setGeneralError("Failed to create FAQ. Please review your input.");
      }
    } catch (err: any) {
      console.error(err);
      setGeneralError(err?.message || "An unexpected error occurred while saving the FAQ.");
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
            href="/admin/faqs"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors mb-2"
          >
            <ArrowLeft size={14} />
            <span>Back to FAQs</span>
          </Link>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <HelpCircle className="text-[#0D8BFF]" size={24} />
            <span>Create New FAQ</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Add a clear question and answer for prospective clients.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/faqs"
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
                <span>Publish FAQ</span>
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
          {/* Main FAQ Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle size={16} className="text-[#0D8BFF]" />
              <span>FAQ Details</span>
            </h3>

            {/* Question */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Question <span className="text-rose-400">*</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  {question.length}/300
                </span>
              </div>
              <input
                type="text"
                placeholder="e.g., What technologies do you use for full stack development?"
                className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.question
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-800 focus:border-[#0D8BFF]"
                }`}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              {errors.question && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.question}</p>
              )}
            </div>

            {/* Category with Suggestions */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Tag size={13} />
                </span>
                <input
                  type="text"
                  placeholder="e.g., General, Development, Pricing"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-8 pr-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              {errors.category && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.category}</p>
              )}

              {/* Category suggestion chips */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[11px] text-slate-500 mr-1">Suggestions:</span>
                {suggestedCategories.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setCategory(sug)}
                    className={`rounded-lg border px-2 py-0.5 text-[11px] transition-colors cursor-pointer ${
                      category === sug
                        ? "border-[#0D8BFF] bg-[#0D8BFF]/10 text-[#0D8BFF]"
                        : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Answer */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Answer <span className="text-rose-400">*</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  {answer.length}/5000
                </span>
              </div>
              <textarea
                rows={6}
                placeholder="Provide a thorough, informative, and engaging answer…"
                className={`w-full rounded-xl border bg-slate-900/80 p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors leading-relaxed ${
                  errors.answer
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-800 focus:border-[#0D8BFF]"
                }`}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {errors.answer && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.answer}</p>
              )}
            </div>
          </div>

          {/* Live Accordion Preview Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Eye size={16} className="text-[#0D8BFF]" />
                <span>Live Accordion Preview</span>
              </h3>
              <span className="text-[11px] text-slate-500">
                Interactive preview on client site
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
              <div
                onClick={() => setPreviewOpen(!previewOpen)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/40 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#0D8BFF]/10 text-[#0D8BFF] text-xs font-bold">
                    Q
                  </span>
                  <span className="text-xs font-semibold text-slate-100">
                    {question.trim() || "Your question will appear here…"}
                  </span>
                </div>
                <div className="text-slate-400">
                  {previewOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {previewOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/60 bg-slate-950/40 text-xs text-slate-300 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                      A
                    </span>
                    <p className="whitespace-pre-line text-slate-300">
                      {answer.trim() || "Your detailed answer will appear here once typed…"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Status & Visibility (1 col) */}
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
                <span className="text-xs font-semibold text-slate-200 block">Featured FAQ</span>
                <span className="text-[11px] text-slate-500 block">Highlight on home portfolio</span>
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
                Lower numbers appear first in the FAQ list.
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
