"use client";

import * as React from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

export interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = React.useState(from);

  React.useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1] as const,
      onUpdate: (latest) => {
        setValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, from, to, duration, shouldReduceMotion]);

  const displayValue = shouldReduceMotion ? to : value;

  return (
    <span ref={ref} className={className ?? "tabular-nums"}>
      {displayValue}
      {suffix}
    </span>
  );
}
