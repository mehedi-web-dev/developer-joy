"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Link2,
  X,
  User,
} from "lucide-react";
import { uploadAdminImage } from "@/lib/api";

export interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  helperText?: string;
  aspectRatio?: "video" | "square" | "avatar";
  className?: string;
  disabled?: boolean;
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  required = false,
  error,
  placeholder = "https://images.unsplash.com/...",
  helperText,
  aspectRatio = "video",
  className = "",
  disabled = false,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setUploadError(null);
      setUploadSuccess(null);

      // 1. Validate file type
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setUploadError(
          `Invalid file format (${file.type || "unknown"}). Only JPEG, PNG, and WEBP images are supported.`
        );
        return;
      }

      // 2. Validate file size (5MB max)
      if (file.size > MAX_FILE_SIZE_BYTES) {
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
        setUploadError(`File size exceeds 5 MB limit (selected file is ${sizeMb} MB).`);
        return;
      }

      // 3. Perform upload via backend ImgBB API
      setUploading(true);
      try {
        const response = await uploadAdminImage(file);
        if (response.success && response.data?.url) {
          onChange(response.data.url);
          setImageLoadError(false);
          setUploadSuccess("Image uploaded successfully to ImgBB!");
          setTimeout(() => {
            setUploadSuccess(null);
          }, 4000);
        } else {
          setUploadError(response.message || "Upload completed without an image URL.");
        }
      } catch (err: any) {
        console.error("[ImageUpload] Upload error:", err);
        setUploadError(err?.message || "Failed to upload image. Please try again.");
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [onChange]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !uploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || uploading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange("");
    setImageLoadError(false);
    setUploadError(null);
    setUploadSuccess(null);
  };

  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  const hasImage = Boolean(value && value.trim());
  const effectiveError = uploadError || error;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileInputChange}
        disabled={disabled || uploading}
        className="hidden"
        aria-label={`Select ${label} file`}
      />

      {/* Header with Label and Manual URL Toggle */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowManualUrl((prev) => !prev)}
          className="inline-flex items-center gap-1 text-[11px] text-[#0D8BFF] hover:text-[#0D8BFF]/80 transition-colors"
        >
          <Link2 size={12} />
          <span>{showManualUrl ? "Hide URL Input" : "Manual URL"}</span>
        </button>
      </div>

      {/* Upload & Preview Zone */}
      {hasImage ? (
        /* Image Preview State */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-3 shadow-inner">
          <div
            className={`relative w-full overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950 flex items-center justify-center group ${
              aspectRatio === "avatar"
                ? "h-36 w-36 mx-auto rounded-full"
                : aspectRatio === "square"
                ? "aspect-square"
                : "aspect-video"
            }`}
          >
            {imageLoadError ? (
              <div className="flex flex-col items-center justify-center text-center p-4 text-slate-500">
                <AlertTriangle size={24} className="text-amber-400 mb-1" />
                <span className="text-xs font-semibold text-slate-400">Failed to render image</span>
                <span className="text-[10px] text-slate-600 mt-0.5 max-w-[200px] truncate">
                  {value}
                </span>
              </div>
            ) : (
              <img
                src={value.trim()}
                alt={label}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageLoadError(true)}
              />
            )}

            {/* Uploading Overlay */}
            {uploading && (
              <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-white z-20">
                <RefreshCw size={24} className="animate-spin text-[#0D8BFF]" />
                <span className="text-xs font-medium text-slate-200">Uploading to ImgBB…</span>
              </div>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || uploading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition disabled:opacity-50 cursor-pointer"
              >
                <UploadCloud size={13} />
                <span>Replace</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                disabled={disabled || uploading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition disabled:opacity-50 cursor-pointer"
              >
                <Trash2 size={13} />
                <span>Remove</span>
              </button>
            </div>

            {isValidUrl(value) && (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-[#0D8BFF] transition-colors truncate max-w-[200px]"
                title="Open image in new tab"
              >
                <span className="truncate">{value}</span>
                <ExternalLink size={11} className="shrink-0" />
              </a>
            )}
          </div>
        </div>
      ) : (
        /* Empty / Drag & Drop Zone */
        <div
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !uploading && !disabled && fileInputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
            isDragging
              ? "border-[#0D8BFF] bg-[#0D8BFF]/10 scale-[1.01]"
              : "border-slate-700/80 bg-slate-900/50 hover:border-[#0D8BFF]/60 hover:bg-slate-900/80"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-4 text-slate-300">
              <RefreshCw size={28} className="animate-spin text-[#0D8BFF]" />
              <span className="text-xs font-medium">Uploading image to ImgBB…</span>
              <span className="text-[11px] text-slate-500">Please wait while the file is processed</span>
            </div>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0D8BFF]/20 to-purple-500/20 text-[#0D8BFF] mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud size={24} />
              </div>
              <p className="text-xs font-semibold text-slate-200">
                <span className="text-[#0D8BFF]">Click to browse</span> or drag and drop image here
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                JPEG, PNG, or WEBP (Maximum size 5 MB)
              </p>
            </>
          )}
        </div>
      )}

      {/* Manual URL Input (Always available or toggled) */}
      {(showManualUrl || !hasImage) && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">
              Or specify image URL directly:
            </span>
          </div>
          <div className="relative">
            <input
              type="url"
              placeholder={placeholder}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setImageLoadError(false);
              }}
              disabled={disabled || uploading}
              className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                effectiveError
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-slate-800 focus:border-[#0D8BFF]"
              } disabled:opacity-50`}
            />
            {value && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute right-2.5 top-2 text-slate-500 hover:text-slate-300 p-0.5"
                title="Clear URL"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Helper Text */}
      {helperText && !effectiveError && (
        <p className="text-[10px] text-slate-500">{helperText}</p>
      )}

      {/* Upload Error Banner */}
      {effectiveError && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-2.5 text-xs text-rose-300">
          <AlertTriangle size={15} className="text-rose-400 shrink-0 mt-0.5" />
          <span className="flex-1">{effectiveError}</span>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-rose-400 hover:text-rose-200"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Upload Success Banner */}
      {uploadSuccess && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs text-emerald-300">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1">{uploadSuccess}</span>
        </div>
      )}
    </div>
  );
}
