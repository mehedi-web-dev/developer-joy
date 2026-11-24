"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Sparkles, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const { data: signInData, error: signInError } = await authClient.signIn.email({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message ?? "Invalid email or password");
        setLoading(false);
        return;
      }

      // 1. Direct role check from the authenticated sign-in response
      const userRole = (signInData as any)?.user?.role;
      if (userRole === "admin") {
        router.push("/admin/dashboard");
        router.refresh();
        return;
      }

      // 2. Verification via getSession
      const { data: session } = await authClient.getSession();
      if (session?.user?.role === "admin") {
        router.push("/admin/dashboard");
        router.refresh();
        return;
      }

      // If user is authenticated but explicitly has a non-admin role
      if (userRole && userRole !== "admin") {
        setError("Access denied: You do not have administrator permissions.");
        await authClient.signOut();
      } else if (session?.user && session.user.role !== "admin") {
        setError("Access denied: You do not have administrator permissions.");
        await authClient.signOut();
      } else {
        // Server-side authoritative verification via ProtectedAdminLayout
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message ?? "An unexpected authentication error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-[#070A11] px-4 py-12 text-slate-100 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#0D8BFF]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-600/10 blur-[130px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F19]/90 p-8 shadow-2xl shadow-black/80 backdrop-blur-xl">
          {/* Logo & Heading */}
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0D8BFF] to-[#8B5CF6] text-white shadow-lg shadow-[#0D8BFF]/25 mb-4">
              <Sparkles size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              DeveloperJoy CMS
            </h1>
            <p className="mt-1.5 text-xs text-slate-400">
              Sign in with your administrator credentials
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
              <span className="font-semibold text-rose-400">Error:</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Admin Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@developerjoy.com"
                  className="block w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-[#0D8BFF] focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0D8BFF]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-[#0D8BFF] focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0D8BFF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D8BFF] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0D8BFF]/25 hover:bg-[#0D8BFF]/90 focus:outline-none focus:ring-2 focus:ring-[#0D8BFF] focus:ring-offset-2 focus:ring-offset-[#0B0F19] disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <span>Authenticating…</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer inside Card */}
          <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-[#0D8BFF] transition-colors"
            >
              ← Back to public website
            </Link>
          </div>
        </div>

        {/* Security badge note */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Protected by Better Auth · HttpOnly Session</span>
        </div>
      </div>
    </section>
  );
}
