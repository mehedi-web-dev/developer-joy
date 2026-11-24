"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminProject } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    description: "",
    shortDescription: "",
    thumbnail: "",
    liveUrl: "",
    githubUrl: "",
    technologies: "",
    featured: false,
    status: "draft",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const value =
      type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = {
        ...form,
        technologies: form.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      } as any;
      await createAdminProject(payload);
      router.push("/admin/projects");
      router.refresh();
    } catch (e: any) {
      console.error(e);
      setError(e.message ?? "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors mb-2"
          >
            <ArrowLeft size={13} />
            <span>Back to Projects</span>
          </Link>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>Create New Project</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Fill in the details below to add a project to your CMS.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
          <span className="font-semibold text-rose-400">Error:</span> {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-8 space-y-5 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Project Title *
            </label>
            <input
              name="title"
              required
              placeholder="e.g. Modern WooCommerce Store"
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              URL Slug *
            </label>
            <input
              name="slug"
              required
              placeholder="e.g. modern-woocommerce-store"
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none font-mono"
              value={form.slug}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Category *
            </label>
            <input
              name="category"
              required
              placeholder="e.g. eCommerce / Elementor"
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Thumbnail Image URL
            </label>
            <input
              name="thumbnail"
              placeholder="https://example.com/thumb.jpg"
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
              value={form.thumbnail}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            rows={2}
            placeholder="Brief project highlight shown on portfolio cards…"
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none resize-none"
            value={form.shortDescription}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Full Description *
          </label>
          <textarea
            name="description"
            rows={4}
            required
            placeholder="Detailed description of features, workflow, and tech stack…"
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Live Preview URL
            </label>
            <input
              name="liveUrl"
              placeholder="https://client-site.com"
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
              value={form.liveUrl}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              GitHub Repository URL
            </label>
            <input
              name="githubUrl"
              placeholder="https://github.com/..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
              value={form.githubUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Technologies (comma-separated)
          </label>
          <input
            name="technologies"
            placeholder="WordPress, WooCommerce, Elementor Pro, Tailwind CSS"
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0D8BFF] focus:outline-none"
            value={form.technologies}
            onChange={handleChange}
          />
        </div>

        {/* Options */}
        <div className="border-t border-slate-800/80 pt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-200">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-800 bg-slate-900 text-[#0D8BFF] focus:ring-[#0D8BFF]"
              />
              <span className="font-medium">Mark as Featured</span>
            </label>

            <div className="flex items-center gap-4 text-xs">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Status:</span>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={form.status === "draft"}
                  onChange={handleChange}
                  className="text-[#0D8BFF] focus:ring-[#0D8BFF]"
                />
                <span>Draft</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-emerald-400 font-medium">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={form.status === "published"}
                  onChange={handleChange}
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <span>Published</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0D8BFF] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#0D8BFF]/25 hover:bg-[#0D8BFF]/90 disabled:opacity-50 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>{loading ? "Creating…" : "Save Project"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
