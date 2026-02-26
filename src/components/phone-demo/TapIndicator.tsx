import * as React from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "../../lib/motion";
import type { DemoPhase } from "./useDemoTimeline";

function prefersReducedMotion() {
  try {
    return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  } catch {
    return false;
  }
}

export function TapIndicator({
  enabled,
  phase,
  targetRect,
  containerRect,
}: {
  enabled: boolean;
  phase: DemoPhase;
  targetRect: DOMRect | null;
  containerRect: DOMRect | null;
}) {
  if (!enabled) return null;
  if (!targetRect || !containerRect) return null;

  const rm = prefersReducedMotion();
  const x = targetRect.left - containerRect.left + targetRect.width / 2;
  const y = targetRect.top - containerRect.top + targetRect.height / 2;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-40"
      animate={{ x, y }}
      transition={rm ? { duration: 0 } : { duration: 0.55, ease: EASE_OUT }}
      style={{ transform: "translate(-50%,-50%)" }}
    >
      {/* pulsing halo */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/18"
        animate={rm ? { opacity: 0 } : { scale: [1, 1.85], opacity: [0.34, 0] }}
        transition={rm ? { duration: 0 } : { duration: 1.18, repeat: Infinity, ease: "easeOut" }}
      />
      {/* ring */}
      <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-500/30" />
      {/* dot */}
      <motion.div
        className="h-2.5 w-2.5 rounded-full bg-sky-600 shadow-[0_10px_26px_rgba(30,162,255,0.35)]"
        animate={phase === "tap" ? { scale: [1, 0.88, 1] } : { scale: 1 }}
        transition={rm ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}


