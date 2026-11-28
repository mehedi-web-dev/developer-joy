"use client";

import * as React from "react";

/**
 * Authentic Framer Noise & Matte Background directly from depalm.framer.ai.
 * Uses the exact 250px noise GIF texture and color-dodge blend mode on rgb(15, 15, 15).
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[var(--background)] transition-colors duration-300"
    >
      {/* Exact Framer Noise Texture layer matching depalm.framer.ai */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none mix-blend-color-dodge opacity-[0.12] dark:opacity-[0.13] z-0"
        style={{
          backgroundImage: "url(/framer-noise.gif)",
          backgroundRepeat: "repeat",
          backgroundPosition: "left top",
          backgroundSize: "250px auto",
        }}
      />
    </div>
  );
}
