// src/app/admin/(protected)/dashboard/page.tsx
import React from "react";
import Link from "next/link";
import { getDashboardOverview } from "@/lib/server-api";
import {
  Briefcase,
  Layers,
  MessageSquareQuote,
  HelpCircle,
  Plus,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Globe,
  FileEdit,
  FolderGit2,
  Calendar,
  Sparkles,
  Activity,
  Tag,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { stats, recentProjects } = await getDashboardOverview();

  const totalContentCount =
    stats.projects.total +
    stats.services.total +
    stats.testimonials.total +
    stats.faqs.total;

  const totalPublishedCount =
    stats.projects.published +
    stats.services.published +
    stats.testimonials.published +
    stats.faqs.published;

  const overallPublishRate =
    totalContentCount > 0
      ? Math.round((totalPublishedCount / totalContentCount) * 100)
      : 0;

  return (
    <div className="space-y-8">
      {/* Dashboard Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#0D8BFF] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-[#0D8BFF] uppercase">
              Portfolio Content Management
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            CMS Overview & Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time content metrics, publication status, and portfolio operations.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0D8BFF] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#0D8BFF]/25 hover:bg-[#0D8BFF]/90 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>New Project</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Globe size={15} className="text-slate-400" />
            <span className="hidden sm:inline">Live Site</span>
          </Link>
        </div>
      </div>

      {/* 6 Key Statistics Cards */}
      <section aria-label="Content Statistics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Total Projects */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 shadow-sm hover:border-slate-700/80 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Projects
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D8BFF]/10 text-[#0D8BFF] group-hover:scale-105 transition-transform">
                <Briefcase size={20} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">
                {stats.projects.total}
              </span>
              <span className="text-xs text-slate-400">items in database</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs">
              <span className="text-emerald-400 font-medium">
                {stats.projects.published} published
              </span>
              <span className="text-amber-400 font-medium">
                {stats.projects.draft} drafts
              </span>
            </div>
          </div>

          {/* Card 2: Published Projects */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 shadow-sm hover:border-slate-700/80 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Published Projects
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-400">
                {stats.projects.published}
              </span>
              <span className="text-xs text-slate-400">live on public site</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs text-slate-400">
              <span>Categories:</span>
              <span className="font-semibold text-slate-200">
                {stats.projects.categories.length} distinct
              </span>
            </div>
          </div>

          {/* Card 3: Draft Projects */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 shadow-sm hover:border-slate-700/80 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Draft Projects
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform">
                <FileEdit size={20} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-400">
                {stats.projects.draft}
              </span>
              <span className="text-xs text-slate-400">hidden from public</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs text-slate-400">
              <span>Status:</span>
              <span className="font-medium text-amber-400/90">Pending publication</span>
            </div>
          </div>

          {/* Card 4: Total Services */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 shadow-sm hover:border-slate-700/80 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Services
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
                <Layers size={20} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">
                {stats.services.total}
              </span>
              <span className="text-xs text-slate-400">service offerings</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs">
              <span className="text-emerald-400 font-medium">
                {stats.services.published} published
              </span>
              <span className="text-slate-400">
                {stats.services.draft} drafts
              </span>
            </div>
          </div>

          {/* Card 5: Total Testimonials */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 shadow-sm hover:border-slate-700/80 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Testimonials
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-105 transition-transform">
                <MessageSquareQuote size={20} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">
                {stats.testimonials.total}
              </span>
              <span className="text-xs text-slate-400">client reviews</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs">
              <span className="text-emerald-400 font-medium">
                {stats.testimonials.published} published
              </span>
              <span className="text-slate-400">
                {stats.testimonials.draft} drafts
              </span>
            </div>
          </div>

          {/* Card 6: Total FAQs */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-5 shadow-sm hover:border-slate-700/80 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total FAQs
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform">
                <HelpCircle size={20} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">
                {stats.faqs.total}
              </span>
              <span className="text-xs text-slate-400">questions answered</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs">
              <span className="text-emerald-400 font-medium">
                {stats.faqs.published} published
              </span>
              <span className="text-slate-400">
                {stats.faqs.categories.length} categories
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Recent Projects (Left 2 cols) & Quick Actions + Content Overview (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <FolderGit2 size={18} className="text-[#0D8BFF]" />
                  <span>Recent Projects</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Latest portfolio entries retrieved directly from MongoDB
                </p>
              </div>
              <Link
                href="/admin/projects"
                className="text-xs font-semibold text-[#0D8BFF] hover:text-[#0D8BFF]/80 flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Projects List or Empty State */}
            <div className="mt-4">
              {recentProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 mb-3">
                    <Briefcase size={24} />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    No projects found
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">
                    Your portfolio currently has no projects. Create your first project to showcase on DeveloperJoy.
                  </p>
                  <Link
                    href="/admin/projects/new"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#0D8BFF] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0D8BFF]/90 transition-colors"
                  >
                    <Plus size={14} />
                    <span>Create First Project</span>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-800/60">
                  {recentProjects.map((project) => (
                    <div
                      key={project._id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 first:pt-1 last:pb-1 group hover:bg-slate-900/30 px-2 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Thumbnail icon or preview */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 text-[#0D8BFF] font-semibold text-xs overflow-hidden">
                          {project.thumbnail ? (
                            <img
                              src={project.thumbnail}
                              alt={project.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            project.title.charAt(0).toUpperCase()
                          )}
                        </div>

                        {/* Title and Category */}
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-slate-100 truncate group-hover:text-[#0D8BFF] transition-colors">
                            {project.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                            <span className="inline-flex items-center gap-1">
                              <Tag size={11} className="text-slate-500" />
                              {project.category || "Uncategorized"}
                            </span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar size={11} className="text-slate-500" />
                              {new Date(project.createdAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                            project.status === "published"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              project.status === "published"
                                ? "bg-emerald-400"
                                : "bg-amber-400"
                            }`}
                          />
                          <span className="capitalize">{project.status}</span>
                        </span>

                        <Link
                          href={`/admin/projects/${project._id}`}
                          className="rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-all"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Real Recent Activity Section */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 shadow-sm">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity size={17} className="text-emerald-400" />
              <span>Recent Activity</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 mb-4">
              Real recorded content events from backend entities
            </p>

            {recentProjects.length === 0 ? (
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/30 p-4 text-center text-xs text-slate-500">
                No recent activity recorded yet.
              </div>
            ) : (
              <ul className="space-y-3">
                {recentProjects.slice(0, 3).map((p) => (
                  <li
                    key={p._id}
                    className="flex items-start gap-3 text-xs text-slate-300"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#0D8BFF] shrink-0" />
                    <div>
                      <p className="font-medium text-slate-200">
                        Project record updated:{" "}
                        <span className="text-[#0D8BFF]">{p.title}</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Status: <span className="capitalize">{p.status}</span> ·{" "}
                        {new Date(p.updatedAt || p.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column: Quick Actions & Content Overview */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 shadow-sm">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles size={17} className="text-[#0D8BFF]" />
              <span>Quick Actions</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 mb-4">
              Frequent CMS management shortcuts
            </p>

            <div className="space-y-2">
              <Link
                href="/admin/projects/new"
                className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:border-[#0D8BFF]/50 hover:bg-[#0D8BFF]/10 hover:text-[#0D8BFF] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0D8BFF]/10 text-[#0D8BFF]">
                    <Plus size={15} />
                  </div>
                  <span>Add New Project</span>
                </div>
                <ArrowRight size={13} className="text-slate-500 group-hover:text-[#0D8BFF] transition-colors" />
              </Link>

              <Link
                href="/admin/projects"
                className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:border-slate-700 hover:bg-slate-800/80 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                    <Briefcase size={15} />
                  </div>
                  <span>Manage Projects</span>
                </div>
                <ArrowRight size={13} className="text-slate-500 group-hover:text-slate-200 transition-colors" />
              </Link>

              <Link
                href="/admin/services"
                className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:border-slate-700 hover:bg-slate-800/80 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-purple-400">
                    <Layers size={15} />
                  </div>
                  <span>Manage Services</span>
                </div>
                <ArrowRight size={13} className="text-slate-500 group-hover:text-slate-200 transition-colors" />
              </Link>

              <Link
                href="/admin/testimonials"
                className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:border-slate-700 hover:bg-slate-800/80 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-sky-400">
                    <MessageSquareQuote size={15} />
                  </div>
                  <span>Manage Testimonials</span>
                </div>
                <ArrowRight size={13} className="text-slate-500 group-hover:text-slate-200 transition-colors" />
              </Link>

              <Link
                href="/admin/faqs"
                className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:border-slate-700 hover:bg-slate-800/80 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-indigo-400">
                    <HelpCircle size={15} />
                  </div>
                  <span>Manage FAQs</span>
                </div>
                <ArrowRight size={13} className="text-slate-500 group-hover:text-slate-200 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Content Overview & Health Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 shadow-sm">
            <h3 className="text-base font-bold text-white flex items-center justify-between">
              <span>Content Overview</span>
              <span className="text-xs font-bold text-[#0D8BFF]">
                {overallPublishRate}% Published
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 mb-4">
              Publication ratio across all CMS content collections
            </p>

            {/* Overall Progress Bar */}
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0D8BFF] to-[#8B5CF6] transition-all duration-500"
                style={{ width: `${overallPublishRate}%` }}
              />
            </div>

            {/* Collection breakdown list */}
            <div className="mt-5 space-y-3">
              {/* Projects */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#0D8BFF]" />
                  Projects
                </span>
                <span className="font-semibold text-slate-200">
                  {stats.projects.published} / {stats.projects.total}
                </span>
              </div>

              {/* Services */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  Services
                </span>
                <span className="font-semibold text-slate-200">
                  {stats.services.published} / {stats.services.total}
                </span>
              </div>

              {/* Testimonials */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  Testimonials
                </span>
                <span className="font-semibold text-slate-200">
                  {stats.testimonials.published} / {stats.testimonials.total}
                </span>
              </div>

              {/* FAQs */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  FAQs
                </span>
                <span className="font-semibold text-slate-200">
                  {stats.faqs.published} / {stats.faqs.total}
                </span>
              </div>
            </div>

            {/* Public Portfolio Status Banner */}
            <div className="mt-6 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-slate-300">
                  Backend API Online
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                Port 5000
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
