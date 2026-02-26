import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export type AutoSwapItem = {
  key: string;
  label: string;
  title: string;
  description: string;
  content: React.ReactNode;
};

function prefersReducedMotion() {
  return !!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}

export function AutoSwap({
  items,
  intervalMs = 5600,
  className,
  onChange,
}: {
  items: AutoSwapItem[];
  intervalMs?: number;
  className?: string;
  onChange?: (item: AutoSwapItem, index: number) => void;
}) {
  const [active, setActive] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    onChange?.(items[active], active);
  }, [active, items, onChange]);

  React.useEffect(() => {
    if (prefersReducedMotion()) return;
    if (hovered) return;
    if (items.length < 2) return;
    const t = window.setInterval(() => {
      setActive((v) => (v + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [items.length, intervalMs, hovered]);

  const current = items[active];

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 border-b border-slate-200/70">
          {items.map((it, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={it.key}
                type="button"
                onClick={() => setActive(idx)}
                className={`relative h-8 text-[12px] font-semibold transition-colors ${
                  isActive
                    ? "text-slate-800"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span className="inline-flex h-full items-center px-1">{it.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="autoswap-active-tab"
                    className="pointer-events-none absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-blue-600/70"
                    transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* progress hint */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
          Auto‑cycles • hover to pause
        </div>
      </div>

      {/* subtle progress bar (feels more “product” than “template”) */}
      {items.length > 1 ? (
        <div className="mt-2 h-[2px] w-full rounded-full bg-slate-200/60 overflow-hidden">
          <div
            key={`${current.key}-${hovered ? "pause" : "run"}`}
            className="h-full w-full origin-left bg-[linear-gradient(90deg,rgba(37,99,235,0.52),rgba(30,162,255,0.42))]"
            style={{
              animation: prefersReducedMotion() || hovered ? "none" : `autoswapProgress ${intervalMs}ms linear`,
            }}
          />
        </div>
      ) : null}

      <div className="mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 8, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.995 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {current.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


