"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedBackground() {
  const reduceMotion = useReducedMotion();

  const floating = (duration: number, delay = 0) => ({
    y: [0, -30, 0, 30, 0],
    x: [0, 20, 0, -20, 0],
    rotate: [0, 90, 180, 270, 360],
    transition: {
      duration: reduceMotion ? 0 : duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Background Base */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-[#09090b]" />

      {/* Blue Glow */}
      <motion.div
        className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-500/20 blur-[130px] dark:bg-blue-500/10"
        animate={reduceMotion ? {} : { x: [0, 100, 0], y: [0, 80, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Purple Glow */}
      <motion.div
        className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-purple-500/20 blur-[140px] dark:bg-purple-500/10"
        animate={reduceMotion ? {} : { x: [0, -100, 0], y: [0, -80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Geometric Shapes */}
      <div className="absolute inset-0">
        {/* 3D Cube */}
        <motion.div
          className="absolute left-[8%] top-[18%]"
          animate={floating(18)}
        >
          <div className="relative h-20 w-20 [perspective:500px]">
            <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(-25deg)_rotateY(35deg)]">
              <div className="absolute inset-0 border-2 border-blue-600/70 bg-blue-500/5 shadow-[0_0_20px_rgba(37,99,235,0.15)] dark:border-blue-400/50 dark:bg-blue-400/5 [transform:translateZ(40px)]" />

              <div className="absolute inset-0 border-2 border-purple-600/70 bg-purple-500/5 shadow-[0_0_20px_rgba(147,51,234,0.15)] dark:border-purple-400/50 dark:bg-purple-400/5 [transform:rotateY(90deg)_translateZ(40px)]" />

              <div className="absolute inset-0 border-2 border-cyan-600/70 bg-cyan-500/5 shadow-[0_0_20px_rgba(8,145,178,0.15)] dark:border-cyan-400/50 dark:bg-cyan-400/5 [transform:rotateX(90deg)_translateZ(40px)]" />
            </div>
          </div>
        </motion.div>

        {/* Purple 3D Ring */}
        <motion.div
          className="absolute right-[12%] top-[20%] h-24 w-24 rounded-full border-[5px] border-purple-600/50 shadow-[0_0_25px_rgba(147,51,234,0.25)] dark:border-purple-400/40"
          animate={reduceMotion ? {} : { rotate: 360, y: [0, -25, 0] }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ transform: "rotateX(65deg) rotateY(25deg)" }}
        />

        {/* Cyan Diamond */}
        <motion.div
          className="absolute bottom-[25%] left-[15%] h-16 w-16 rotate-45 border-2 border-cyan-600/60 bg-cyan-500/10 shadow-[0_0_25px_rgba(8,145,178,0.2)] dark:border-cyan-400/40 dark:bg-cyan-400/5"
          animate={floating(12, 1)}
        />

        {/* Bottom Right Cube */}
        <motion.div
          className="absolute bottom-[18%] right-[15%] h-20 w-20 border-2 border-blue-600/60 bg-blue-500/10 shadow-[0_0_30px_rgba(37,99,235,0.2)] dark:border-blue-400/40 dark:bg-blue-400/5"
          animate={floating(16, 2)}
          style={{
            transform: "rotateX(45deg) rotateY(45deg)",
          }}
        />

        {/* Floating Square */}
        <motion.div
          className="absolute left-[48%] top-[15%] h-8 w-8 rounded-md border-2 border-purple-600/60 bg-purple-500/10 dark:border-purple-400/40 dark:bg-purple-400/5"
          animate={floating(10, 3)}
        />

        {/* Cyan Sphere */}
        <motion.div
          className="absolute bottom-[15%] left-[48%] h-5 w-5 rounded-full bg-cyan-500 shadow-[0_0_30px_10px_rgba(6,182,212,0.35)] dark:bg-cyan-400"
          animate={
            reduceMotion ? {} : { scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Purple Sphere */}
        <motion.div
          className="absolute right-[35%] top-[55%] h-3 w-3 rounded-full bg-purple-600 shadow-[0_0_20px_5px_rgba(147,51,234,0.35)] dark:bg-purple-400"
          animate={reduceMotion ? {} : { y: [0, -40, 0], x: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.12)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)]" />
    </div>
  );
}
