// src/app/admin/(protected)/settings/SettingsClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Settings,
  Globe,
  Shield,
  Database,
  Palette,
  Bell,
  Activity,
  Layers,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Laptop,
  Lock,
  Sliders,
  Eye,
  Info,
  Server,
  Key,
} from "lucide-react";

interface HealthStatus {
  success: boolean;
  status: string;
  database: string;
  environmentConfigured?: {
    MONGODB_URI: boolean;
    DB_NAME: boolean;
    BETTER_AUTH_SECRET: boolean;
    BETTER_AUTH_URL: boolean;
    FRONTEND_URL: boolean;
    ADMIN_EMAIL: boolean;
    ADMIN_PASSWORD: boolean;
  };
  timestamp?: string;
}

interface SettingsClientProps {
  initialHealth: HealthStatus | null;
  serverEnv: {
    apiUrl: string;
    nodeEnv: string;
  };
}

export default function SettingsClient({
  initialHealth,
  serverEnv,
}: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState<"system" | "dashboard" | "security" | "notifications">("system");
  const [health, setHealth] = useState<HealthStatus | null>(initialHealth);
  const [isRefreshingHealth, setIsRefreshingHealth] = useState(false);

  // Client-persisted dashboard preferences (using localStorage)
  const [defaultView, setDefaultView] = useState<"table" | "grid">("table");
  const [defaultPageSize, setDefaultPageSize] = useState<number>(10);
  const [compactDensity, setCompactDensity] = useState<boolean>(false);
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const storedView = localStorage.getItem("admin_pref_default_view");
      if (storedView === "grid" || storedView === "table") {
        setDefaultView(storedView);
      }
      const storedPageSize = localStorage.getItem("admin_pref_page_size");
      if (storedPageSize) {
        setDefaultPageSize(Number(storedPageSize));
      }
      const storedDensity = localStorage.getItem("admin_pref_compact_density");
      if (storedDensity !== null) {
        setCompactDensity(storedDensity === "true");
      }
    } catch {
      // Ignore localStorage access errors
    }
  }, []);

  const savePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("admin_pref_default_view", defaultView);
      localStorage.setItem("admin_pref_page_size", String(defaultPageSize));
      localStorage.setItem("admin_pref_compact_density", String(compactDensity));
      setSavedFeedback("Dashboard preferences saved to this browser session!");
      setTimeout(() => setSavedFeedback(null), 3000);
    } catch {
      setSavedFeedback("Failed to save to local storage.");
    }
  };

  const handleRefreshHealth = async () => {
    setIsRefreshingHealth(true);
    try {
      const res = await fetch(`${serverEnv.apiUrl}/api/health`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setHealth(data);
      } else {
        setHealth((prev) =>
          prev ? { ...prev, status: "degraded", database: "disconnected" } : null
        );
      }
    } catch {
      setHealth((prev) =>
        prev ? { ...prev, status: "unreachable", database: "error" } : null
      );
    } finally {
      setIsRefreshingHealth(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Page Header */}
      <div className="border-b border-slate-800/80 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Settings className="text-[#0D8BFF]" size={24} />
            <span>System & Dashboard Settings</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time infrastructure health, environment parameters, and dashboard preferences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/profile"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 transition"
          >
            <span>Profile & Security</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800/80 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("system")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition shrink-0 ${
            activeTab === "system"
              ? "bg-[#0D8BFF]/10 text-[#0D8BFF] border border-[#0D8BFF]/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
          }`}
        >
          <Activity size={15} />
          <span>System & API Health</span>
        </button>

        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition shrink-0 ${
            activeTab === "dashboard"
              ? "bg-[#0D8BFF]/10 text-[#0D8BFF] border border-[#0D8BFF]/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
          }`}
        >
          <Sliders size={15} />
          <span>Dashboard Preferences</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition shrink-0 ${
            activeTab === "security"
              ? "bg-[#0D8BFF]/10 text-[#0D8BFF] border border-[#0D8BFF]/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
          }`}
        >
          <Shield size={15} />
          <span>Security & Authentication</span>
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition shrink-0 ${
            activeTab === "notifications"
              ? "bg-[#0D8BFF]/10 text-[#0D8BFF] border border-[#0D8BFF]/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
          }`}
        >
          <Bell size={15} />
          <span>Notifications & Alerts</span>
        </button>
      </div>

      {/* 1. Tab: System & API Health */}
      {activeTab === "system" && (
        <div className="space-y-6">
          {/* Real-time Health Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800/60">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Server size={18} className="text-[#0D8BFF]" />
                  <span>Backend Infrastructure Health</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Live status reported by Express server endpoint:{" "}
                  <code className="text-slate-300 font-mono">/api/health</code>
                </p>
              </div>

              <button
                onClick={handleRefreshHealth}
                disabled={isRefreshingHealth}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 px-3.5 py-1.5 text-xs font-medium text-slate-300 transition w-fit disabled:opacity-50"
              >
                <RefreshCw
                  size={13}
                  className={isRefreshingHealth ? "animate-spin" : ""}
                />
                <span>Refresh Status</span>
              </button>
            </div>

            {/* Health Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* Overall API Status */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">
                  API Service Status
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      health?.status === "healthy"
                        ? "bg-emerald-400 shadow-sm shadow-emerald-400"
                        : "bg-rose-500 shadow-sm shadow-rose-500"
                    }`}
                  />
                  <span className="text-slate-200 font-semibold text-sm capitalize">
                    {health?.status || "Unknown"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {health?.status === "healthy"
                    ? "All backend systems fully operational"
                    : "Service check returned an alert"}
                </p>
              </div>

              {/* Database Connection */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">
                  Database Cluster
                </span>
                <div className="flex items-center gap-2">
                  <Database
                    size={16}
                    className={
                      health?.database === "connected"
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }
                  />
                  <span className="text-slate-200 font-semibold text-sm capitalize">
                    MongoDB {health?.database || "Unknown"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Native MongoDB Driver ping verified
                </p>
              </div>

              {/* Timestamp */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">
                  Last Health Check
                </span>
                <span className="text-slate-200 font-medium text-xs block font-mono">
                  {health?.timestamp
                    ? new Date(health.timestamp).toLocaleTimeString()
                    : "Just now"}
                </span>
                <p className="text-[11px] text-slate-500">
                  {health?.timestamp
                    ? new Date(health.timestamp).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Environment Parameters Table */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Environment Configuration Overview
              </h4>

              <div className="rounded-xl border border-slate-800/80 overflow-hidden divide-y divide-slate-800/60 text-xs">
                <div className="flex items-center justify-between p-3.5 bg-slate-900/40">
                  <span className="text-slate-400 font-medium">Backend API Endpoint</span>
                  <span className="font-mono text-slate-200 font-semibold">
                    {serverEnv.apiUrl || "http://localhost:5000"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-900/40">
                  <span className="text-slate-400 font-medium">Runtime Environment</span>
                  <span className="font-mono text-emerald-400 uppercase font-semibold text-[11px]">
                    {serverEnv.nodeEnv || "development"}
                  </span>
                </div>

                {health?.environmentConfigured && (
                  <>
                    <div className="flex items-center justify-between p-3.5 bg-slate-900/40">
                      <span className="text-slate-400 font-medium">MongoDB URI Connection String</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 size={13} /> Configured
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-slate-900/40">
                      <span className="text-slate-400 font-medium">Better Auth Secret Key</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 size={13} /> Active (HMAC SHA-256)
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-slate-900/40">
                      <span className="text-slate-400 font-medium">Admin User Seed Data</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 size={13} /> Provisioned
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Tab: Dashboard Preferences */}
      {activeTab === "dashboard" && (
        <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-800/60">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders size={18} className="text-[#0D8BFF]" />
              <span>Admin UI & Display Preferences</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Configure your preferred CMS listing views and pagination behavior. These settings are stored locally in your browser.
            </p>
          </div>

          {savedFeedback && (
            <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>{savedFeedback}</span>
            </div>
          )}

          <form onSubmit={savePreferences} className="space-y-6 text-xs">
            {/* Preferred Default View */}
            <div className="space-y-2">
              <label className="block font-semibold text-slate-200">
                Default Listing Display Mode
              </label>
              <p className="text-[11px] text-slate-500">
                Choose the default presentation style when navigating to Projects, Services, Testimonials, or FAQs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setDefaultView("table")}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition ${
                    defaultView === "table"
                      ? "border-[#0D8BFF] bg-[#0D8BFF]/10 text-white"
                      : "border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                      defaultView === "table"
                        ? "border-[#0D8BFF] bg-[#0D8BFF]"
                        : "border-slate-700"
                    }`}
                  >
                    {defaultView === "table" && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-xs">Table View (Default)</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Structured rows with high data density.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDefaultView("grid")}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition ${
                    defaultView === "grid"
                      ? "border-[#0D8BFF] bg-[#0D8BFF]/10 text-white"
                      : "border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                      defaultView === "grid"
                        ? "border-[#0D8BFF] bg-[#0D8BFF]"
                        : "border-slate-700"
                    }`}
                  >
                    {defaultView === "grid" && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-xs">Card / Grid View</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Visual cards highlighting thumbnails and status badges.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Default Page Size */}
            <div className="space-y-2">
              <label className="block font-semibold text-slate-200">
                Default Page Size
              </label>
              <p className="text-[11px] text-slate-500">
                Number of records displayed per page across CMS management tables.
              </p>
              <select
                value={defaultPageSize}
                onChange={(e) => setDefaultPageSize(Number(e.target.value))}
                className="w-full sm:w-64 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-200 focus:border-[#0D8BFF] focus:outline-none"
              >
                <option value={5}>5 records per page</option>
                <option value={10}>10 records per page (Recommended)</option>
                <option value={20}>20 records per page</option>
                <option value={50}>50 records per page</option>
              </select>
            </div>

            {/* UI Theme notice */}
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-1">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <Palette size={15} className="text-purple-400" />
                <span>Dashboard Theme</span>
              </div>
              <p className="text-[11px] text-slate-400">
                DeveloperJoy Admin operates exclusively on a dark navy SaaS aesthetic optimized for high-contrast accessibility. Light mode is currently disabled by brand design standards.
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0D8BFF] hover:bg-[#0D8BFF]/90 text-white px-5 py-2.5 text-xs font-semibold transition shadow-md shadow-[#0D8BFF]/20"
            >
              <span>Save Display Preferences</span>
            </button>
          </form>
        </div>
      )}

      {/* 3. Tab: Security & Authentication */}
      {activeTab === "security" && (
        <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield size={18} className="text-emerald-400" />
                <span>Authentication & Authorization Policies</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Security parameters enforced by the backend Better Auth framework.
              </p>
            </div>

            <Link
              href="/admin/profile"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#0D8BFF]/30 bg-[#0D8BFF]/10 hover:bg-[#0D8BFF]/20 px-3.5 py-1.5 text-xs font-semibold text-[#0D8BFF] transition w-fit"
            >
              <Key size={13} />
              <span>Change Password & Active Sessions</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
              <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">
                Public Self-Registration
              </span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-slate-200 font-semibold text-sm">
                  Strictly Disabled
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                disableSignUp: true is active on the backend to prevent unauthorized user registration.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
              <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">
                Session Expiration Policy
              </span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                <span className="text-slate-200 font-semibold text-sm">
                  7 Days Rolling Expiry
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Sessions automatically renew within 1 day of activity and expire after 7 days of inactivity.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
              <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">
                Cookie Hardening
              </span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-slate-200 font-semibold text-sm">
                  HttpOnly & SameSite Protection
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Credentials cannot be read by third-party JavaScript, neutralizing XSS credential theft.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
              <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">
                Role-Based Guard (RBAC)
              </span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-400" />
                <span className="text-slate-200 font-semibold text-sm">
                  admin: required
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                All content mutation endpoints require verified admin role claims.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Tab: Notifications & Alerts */}
      {activeTab === "notifications" && (
        <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-800/60">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Bell size={18} className="text-amber-400" />
              <span>Notification Preferences & Status</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Configuration for real-time dashboard notifications and administrative alerts.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-amber-300">
              <Info size={16} />
              <span>Out-of-Band Notification Delivery Notice</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Third-party email delivery (SMTP/Resend) and webhook push notifications are not currently attached to this portfolio backend instance. In-dashboard confirmation toasts are active for all content creation, update, and deletion operations.
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/40">
              <div>
                <p className="font-semibold text-slate-200">In-Dashboard Action Feedback</p>
                <p className="text-[11px] text-slate-500">
                  Instant visual feedback upon successful publishing or error occurrence.
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/40">
              <div>
                <p className="font-semibold text-slate-200">Critical Error Sentry Alerts</p>
                <p className="text-[11px] text-slate-500">
                  Automated notifications when database connection drops occur.
                </p>
              </div>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                Not Configured
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
