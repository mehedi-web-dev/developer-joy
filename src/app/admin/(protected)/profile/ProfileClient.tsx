// src/app/admin/(protected)/profile/ProfileClient.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  User,
  ShieldCheck,
  Mail,
  Key,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  LogOut,
  Laptop,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  ShieldAlert,
  Info,
  Clock,
  Trash2,
  Check,
} from "lucide-react";
import {
  SafeSessionMetadata,
  getAdminSessions,
  revokeAdminSession,
} from "./actions";

interface ProfileUser {
  id: string;
  name?: string;
  email: string;
  role?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProfileClientProps {
  initialUser: ProfileUser;
  initialSessions: SafeSessionMetadata[];
}

export default function ProfileClient({
  initialUser,
  initialSessions,
}: ProfileClientProps) {
  const router = useRouter();

  // User details state
  const [user, setUser] = useState<ProfileUser>(initialUser);
  const [sessions, setSessions] = useState<SafeSessionMetadata[]>(initialSessions);

  // Profile Form state
  const [name, setName] = useState(initialUser.name || "");
  const [image, setImage] = useState(initialUser.image || "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Change Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [revokeOthers, setRevokeOthers] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Sessions state
  const [isRefreshingSessions, setIsRefreshingSessions] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [revokingAllOthers, setRevokingAllOthers] = useState(false);
  const [sessionSuccess, setSessionSuccess] = useState<string | null>(null);
  const [sessionError, setSessionError] = useState<string | null>(null);

  // Sign out state
  const [signingOut, setSigningOut] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const passwordScore = getPasswordStrength(newPassword);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const strengthColors = [
    "bg-rose-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-emerald-500",
    "bg-teal-400",
  ];

  // Refresh active sessions list via Server Action (secure, token-less)
  const refreshSessions = async () => {
    setIsRefreshingSessions(true);
    try {
      const res = await getAdminSessions();
      if (res.success && res.sessions) {
        setSessions(res.sessions);
      } else if (res.error) {
        setSessionError(res.error);
      }
    } catch (err) {
      console.error("Failed to refresh sessions:", err);
    } finally {
      setIsRefreshingSessions(false);
    }
  };

  // Update profile details
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setProfileError("Admin display name cannot be blank.");
      return;
    }

    if (image.trim()) {
      try {
        new URL(image.trim());
      } catch {
        setProfileError("Please enter a valid URL for your profile photo or leave it empty.");
        return;
      }
    }

    setProfileSaving(true);
    try {
      const res = await authClient.updateUser({
        name: trimmedName,
        image: image.trim() || undefined,
      });

      if (res?.error) {
        setProfileError(res.error.message || "Failed to update profile.");
      } else {
        setUser((prev) => ({
          ...prev,
          name: trimmedName,
          image: image.trim() || undefined,
        }));
        setProfileSuccess("Admin profile details updated successfully!");
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setProfileError(msg);
    } finally {
      setProfileSaving(false);
    }
  };

  // Change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation password do not match.");
      return;
    }

    if (newPassword === currentPassword) {
      setPasswordError("New password cannot be the same as your current password.");
      return;
    }

    setPasswordSaving(true);
    try {
      const res = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: revokeOthers,
      });

      if (res?.error) {
        setPasswordError(res.error.message || "Failed to change password. Please check your current password.");
      } else {
        setPasswordSuccess(
          revokeOthers
            ? "Password changed successfully! Other active sessions have been terminated."
            : "Password changed successfully!"
        );
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        await refreshSessions();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setPasswordError(msg);
    } finally {
      setPasswordSaving(false);
    }
  };

  // Revoke a single session securely via Server Action using opaque session ID
  const handleRevokeSession = async (sessionId: string) => {
    setSessionError(null);
    setSessionSuccess(null);
    setRevokingId(sessionId);

    try {
      const res = await revokeAdminSession(sessionId);
      if (!res.success) {
        setSessionError(res.error || "Failed to revoke session.");
      } else {
        setSessionSuccess("Session revoked successfully.");
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to revoke session.";
      setSessionError(msg);
    } finally {
      setRevokingId(null);
    }
  };

  // Revoke all other sessions via Better Auth
  const handleRevokeAllOtherSessions = async () => {
    setSessionError(null);
    setSessionSuccess(null);
    setRevokingAllOthers(true);

    try {
      const res = await authClient.revokeOtherSessions();
      if (res?.error) {
        setSessionError(res.error.message || "Failed to revoke other sessions.");
      } else {
        setSessionSuccess("All other active sessions have been terminated.");
        await refreshSessions();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to revoke other sessions.";
      setSessionError(msg);
    } finally {
      setRevokingAllOthers(false);
    }
  };

  // Global sign out
  const handleSignOut = async () => {
    if (!window.confirm("Are you sure you want to sign out from the Admin Dashboard?")) {
      return;
    }
    setSigningOut(true);
    try {
      await authClient.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    } finally {
      setSigningOut(false);
    }
  };

  // Helpers
  const formatDate = (dateVal?: string | Date) => {
    if (!dateVal) return "N/A";
    try {
      return new Date(dateVal).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return String(dateVal);
    }
  };

  const getInitials = (fullName?: string, mail?: string) => {
    if (fullName && fullName.trim()) {
      const parts = fullName.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (mail || "AD").slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Page Header */}
      <div className="border-b border-slate-800/80 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <User className="text-[#0D8BFF]" size={24} />
            <span>Admin Profile</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your personal administrator identity, account credentials, and active sessions.
          </p>
        </div>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition shadow-sm w-fit disabled:opacity-50"
        >
          {signingOut ? (
            <RefreshCw size={14} className="animate-spin" />
          ) : (
            <LogOut size={14} />
          )}
          <span>Sign Out</span>
        </button>
      </div>

      {/* Identity Summary Card */}
      <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Avatar / Photo with Initials Fallback */}
          <div className="relative group">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "Admin"}
                className="h-20 w-20 rounded-2xl object-cover border-2 border-[#0D8BFF]/40 shadow-lg shadow-[#0D8BFF]/20"
                onError={() => setUser((prev) => ({ ...prev, image: undefined }))}
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#0D8BFF] to-[#8B5CF6] text-2xl font-bold text-white shadow-lg shadow-[#0D8BFF]/20 border border-white/10">
                {getInitials(user.name, user.email)}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-[#0B0F19]" title="Active Administrator" />
          </div>

          {/* Core Info */}
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {user.name || "Administrator"}
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400 capitalize">
                <ShieldCheck size={13} />
                <span>{user.role || "Admin"}</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <Mail size={13} className="text-slate-500" />
              <span>{user.email}</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
              {user.createdAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-slate-500" />
                  Account created {formatDate(user.createdAt)}
                </span>
              )}
              {user.updatedAt && (
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="text-slate-500" />
                  Last updated {formatDate(user.updatedAt)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Security & System Metadata Badges */}
        <div className="border-t border-slate-800/60 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
            <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">
              Authentication Provider
            </span>
            <span className="text-slate-200 font-medium text-sm mt-1 block">
              Better Auth (Credentials)
            </span>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
            <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">
              Session Cookie Storage
            </span>
            <span className="text-emerald-400 font-medium text-sm mt-1 block flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
              HttpOnly Secure Cookie
            </span>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
            <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">
              Access Control Scope
            </span>
            <span className="text-purple-400 font-medium text-sm mt-1 block">
              Full Administrator (RBAC)
            </span>
          </div>
        </div>
      </div>

      {/* Main Action Forms: Profile Info & Password Security */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Edit Profile Form */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-7 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800/60">
              <User className="text-[#0D8BFF]" size={18} />
              <h4 className="font-semibold text-white text-base">Profile Information</h4>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Update your administrator display name and custom avatar image URL.
            </p>

            {/* Profile Alerts */}
            {profileSuccess && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{profileSuccess}</span>
              </div>
            )}
            {profileError && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                <AlertTriangle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                <span>{profileError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="mt-5 space-y-4">
              {/* Display Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Display Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. DeveloperJoy Admin"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:border-[#0D8BFF] focus:outline-none focus:ring-1 focus:ring-[#0D8BFF] transition"
                  required
                />
              </div>

              {/* Email Address (Read-only note) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Email Address</span>
                  <span className="text-[10px] text-slate-500 font-normal">Primary Admin Email</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full rounded-xl border border-slate-800/80 bg-slate-950/60 px-3.5 py-2.5 text-xs text-slate-400 cursor-not-allowed font-mono opacity-80"
                  />
                  <div className="absolute right-3 top-2.5">
                    <Lock size={14} className="text-slate-600" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <Info size={11} />
                  <span>Email modifications are disabled by system security policy.</span>
                </p>
              </div>

              {/* Avatar URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Avatar Image URL</span>
                  <span className="text-[10px] text-slate-500 font-normal">Optional</span>
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:border-[#0D8BFF] focus:outline-none focus:ring-1 focus:ring-[#0D8BFF] transition"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Direct link to a public image (PNG, JPG, WebP). Leave blank to use your initial monogram.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0D8BFF] hover:bg-[#0D8BFF]/90 text-white px-5 py-2.5 text-xs font-semibold transition shadow-md shadow-[#0D8BFF]/20 disabled:opacity-50"
                >
                  {profileSaving ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  <span>{profileSaving ? "Saving..." : "Save Profile"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 2. Change Password Form */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-7 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800/60">
              <Key className="text-amber-400" size={18} />
              <h4 className="font-semibold text-white text-base">Change Password</h4>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Ensure your account uses a secure, unique password with at least 8 characters.
            </p>

            {/* Password Alerts */}
            {passwordSuccess && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{passwordSuccess}</span>
              </div>
            )}
            {passwordError && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                <AlertTriangle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="mt-5 space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 pr-10 text-xs text-slate-200 placeholder-slate-600 focus:border-[#0D8BFF] focus:outline-none focus:ring-1 focus:ring-[#0D8BFF] transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                    tabIndex={-1}
                  >
                    {showCurrentPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  New Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 pr-10 text-xs text-slate-200 placeholder-slate-600 focus:border-[#0D8BFF] focus:outline-none focus:ring-1 focus:ring-[#0D8BFF] transition"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {newPassword.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Strength:</span>
                      <span className="font-semibold text-slate-200">
                        {strengthLabels[passwordScore - 1] || "Too Weak"}
                      </span>
                    </div>
                    <div className="flex gap-1 h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`flex-1 transition-all duration-300 ${
                            lvl <= passwordScore
                              ? strengthColors[passwordScore - 1] || "bg-rose-500"
                              : "bg-transparent"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirm New Password <span className="text-rose-400">*</span>
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:border-[#0D8BFF] focus:outline-none focus:ring-1 focus:ring-[#0D8BFF] transition"
                  required
                />
              </div>

              {/* Revoke Other Sessions Checkbox */}
              <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={revokeOthers}
                  onChange={(e) => setRevokeOthers(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-[#0D8BFF] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-xs text-slate-300">
                  Log out of all other devices and active sessions
                </span>
              </label>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 text-xs font-semibold transition shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  {passwordSaving ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <Key size={14} />
                  )}
                  <span>{passwordSaving ? "Updating Password..." : "Update Password"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Active Sessions Management */}
      <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2.5">
              <Laptop className="text-teal-400" size={18} />
              <h4 className="font-semibold text-white text-base">Active Login Sessions</h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Devices and browsers currently authenticated to this administrator account.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={refreshSessions}
              disabled={isRefreshingSessions}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition disabled:opacity-50"
              title="Refresh sessions list"
            >
              <RefreshCw
                size={13}
                className={isRefreshingSessions ? "animate-spin" : ""}
              />
              <span>Refresh</span>
            </button>

            {sessions.length > 1 && (
              <button
                onClick={handleRevokeAllOtherSessions}
                disabled={revokingAllOthers}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 px-3.5 py-1.5 text-xs font-semibold text-amber-300 transition disabled:opacity-50"
              >
                {revokingAllOthers ? (
                  <RefreshCw size={13} className="animate-spin" />
                ) : (
                  <ShieldAlert size={13} />
                )}
                <span>Terminate All Other Sessions</span>
              </button>
            )}
          </div>
        </div>

        {/* Sessions feedback */}
        {sessionSuccess && (
          <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>{sessionSuccess}</span>
          </div>
        )}
        {sessionError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
            <AlertTriangle size={16} className="text-rose-400 shrink-0 mt-0.5" />
            <span>{sessionError}</span>
          </div>
        )}

        {/* Session cards */}
        <div className="space-y-3 pt-1">
          {sessions.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl">
              <Laptop size={28} className="mx-auto text-slate-600 mb-2" />
              <p className="text-xs text-slate-400">No session information found.</p>
            </div>
          ) : (
            sessions.map((sess) => {
              const isCurrent = sess.isCurrent;
              const isRevoking = revokingId === sess.id;

              return (
                <div
                  key={sess.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition ${
                    isCurrent
                      ? "border-emerald-500/40 bg-emerald-500/[0.04]"
                      : "border-slate-800 bg-slate-900/40 hover:bg-slate-900/70"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${
                        isCurrent
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      <Laptop size={18} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-200">
                          {sess.userAgent || "Desktop Browser"}
                        </span>
                        {isCurrent && (
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                            Current Session
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                        {sess.ipAddress && (
                          <span>IP: {sess.ipAddress}</span>
                        )}
                        <span>Active since: {formatDate(sess.createdAt)}</span>
                        <span>Expires: {formatDate(sess.expiresAt)}</span>
                      </div>
                    </div>
                  </div>

                  {!isCurrent && (
                    <div className="mt-3 sm:mt-0 flex items-center justify-end">
                      <button
                        onClick={() => handleRevokeSession(sess.id)}
                        disabled={isRevoking}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 hover:bg-rose-500/20 hover:border-rose-500/30 px-3 py-1.5 text-xs text-slate-300 hover:text-rose-400 transition disabled:opacity-50"
                        title="Revoke this session"
                      >
                        {isRevoking ? (
                          <RefreshCw size={13} className="animate-spin" />
                        ) : (
                          <Trash2 size={13} />
                        )}
                        <span>Revoke</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
