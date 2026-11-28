"use client";

import * as React from "react";

/**
 * Minimal, elegant custom mouse cursor for desktop devices with fine pointer and hover support.
 *
 * Design:
 * - A small solid circular dot in the center.
 * - A thin circular outline with subtle transparent fill surrounding the dot.
 * - Dynamic color adaptation:
 *   - Dark mode: Neon Lime (#c6ff00)
 *   - Light mode: Deep Black (#000000)
 * - Smooth trailing animation using requestAnimationFrame (zero React state overhead).
 * - Enlarge outer ring on interactive/clickable elements.
 * - Automatically fades out and restores native text cursor on inputs and textareas.
 * - Automatically disabled on touch / mobile devices and when prefers-reduced-motion is active.
 */
export function CustomCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Only enable on desktop devices with fine pointer and hover capability
    if (typeof window === "undefined") return;

    const finePointerQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    // Add marker class to body to hide default native cursor
    document.body.classList.add("has-custom-cursor");

    let isVisible = false;
    let isHovered = false;
    let isText = false;
    let isClicking = false;

    let targetX = -100;
    let targetY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let ringScale = 1;
    let opacity = 0;

    let rafId: number | null = null;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dotX = targetX;
        dotY = targetY;
        ringX = targetX;
        ringY = targetY;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Detect text inputs & textareas
      const isTextInput = Boolean(
        target.closest(
          'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]):not([type="file"]), textarea, [contenteditable="true"], [contenteditable=""]'
        )
      );

      if (isTextInput) {
        isText = true;
        isHovered = false;
        return;
      }

      isText = false;

      // Detect clickable / interactive elements
      const isClickable = Boolean(
        target.closest(
          'a, button, [role="button"], [role="tab"], [role="link"], [role="menuitem"], [role="switch"], [role="checkbox"], select, summary, label, .cursor-pointer, [data-slot="trigger"], [data-cursor="hover"]'
        )
      );

      isHovered = isClickable;
    };

    const onPointerDown = () => {
      isClicking = true;
    };

    const onPointerUp = () => {
      isClicking = false;
    };

    const onWindowLeave = () => {
      isVisible = false;
    };

    const onWindowEnter = () => {
      isVisible = true;
    };

    const onWindowBlur = () => {
      isVisible = false;
    };

    const onWindowFocus = () => {
      isVisible = true;
    };

    // Render loop using requestAnimationFrame
    const render = () => {
      const dotEase = 0.85; // snappy center dot
      const ringEase = 0.18; // smooth trailing ring

      dotX += (targetX - dotX) * dotEase;
      dotY += (targetY - dotY) * dotEase;

      ringX += (targetX - ringX) * ringEase;
      ringY += (targetY - ringY) * ringEase;

      // Target scale calculation
      let targetScale = 1;
      if (isClicking) {
        targetScale = isHovered ? 1.2 : 0.85;
      } else if (isHovered) {
        targetScale = 1.45;
      }

      ringScale += (targetScale - ringScale) * 0.2;

      // Target opacity calculation
      const targetOpacity = isVisible && !isText ? 1 : 0;
      opacity += (targetOpacity - opacity) * 0.25;

      const dotEl = dotRef.current;
      const ringEl = ringRef.current;

      if (dotEl) {
        dotEl.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        dotEl.style.opacity = opacity.toFixed(3);
      }

      if (ringEl) {
        ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(3)})`;
        ringEl.style.opacity = opacity.toFixed(3);

        if (isHovered) {
          ringEl.classList.add("is-hovered");
        } else {
          ringEl.classList.remove("is-hovered");
        }
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    document.addEventListener("mouseleave", onWindowLeave);
    document.addEventListener("mouseenter", onWindowEnter);
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("focus", onWindowFocus);

    rafId = requestAnimationFrame(render);

    const onMediaChange = () => {
      if (!finePointerQuery.matches || reducedMotionQuery.matches) {
        document.body.classList.remove("has-custom-cursor");
        if (rafId) cancelAnimationFrame(rafId);
      } else {
        document.body.classList.add("has-custom-cursor");
      }
    };

    finePointerQuery.addEventListener("change", onMediaChange);
    reducedMotionQuery.addEventListener("change", onMediaChange);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("mouseleave", onWindowLeave);
      document.removeEventListener("mouseenter", onWindowEnter);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("focus", onWindowFocus);
      finePointerQuery.removeEventListener("change", onMediaChange);
      reducedMotionQuery.removeEventListener("change", onMediaChange);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none"
    >
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black/40 dark:border-[#c6ff00]/50 bg-black/[0.04] dark:bg-[#c6ff00]/[0.05] pointer-events-none will-change-transform transition-[border-color,background-color] duration-150 [&.is-hovered]:border-black dark:[&.is-hovered]:border-[#c6ff00] [&.is-hovered]:bg-black/[0.1] dark:[&.is-hovered]:bg-[#c6ff00]/[0.15]"
        style={{ opacity: 0 }}
      />
      {/* Small solid center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-black dark:bg-[#c6ff00] pointer-events-none will-change-transform shadow-[0_0_6px_rgba(0,0,0,0.3)] dark:shadow-[0_0_8px_#c6ff00]"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
