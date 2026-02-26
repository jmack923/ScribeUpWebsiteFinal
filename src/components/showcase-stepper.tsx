import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";

export type ShowcaseStep = {
  kicker?: string;
  title: string;
  detail: string;
  icon: string;
  tone?: "blue" | "indigo" | "sky";
};

const toneStyles: Record<NonNullable<ShowcaseStep["tone"]>, { rail: string; dot: string }> = {
  blue: { rail: "from-blue-600 via-sky-500 to-sky-400", dot: "bg-blue-600/80" },
  indigo: { rail: "from-blue-700 via-blue-600 to-sky-400", dot: "bg-blue-700/80" },
  sky: { rail: "from-sky-500 via-blue-600 to-blue-700", dot: "bg-sky-500/80" },
};

function prefersReducedMotion() {
  return !!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}

export function ShowcaseStepper({
  steps,
  renderPreview,
  autoplayMs = 5200,
  className,
}: {
  steps: ShowcaseStep[];
  renderPreview: (step: ShowcaseStep, index: number) => React.ReactNode;
  autoplayMs?: number;
  className?: string;
}) {
  const [active, setActive] = React.useState(0);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const hoverRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    hoverRef.current = hovered;
  }, [hovered]);

  React.useEffect(() => {
    if (prefersReducedMotion()) return;
    if (hoverRef.current !== null) return;
    const t = window.setInterval(() => {
      setActive((v) => (v + 1) % steps.length);
    }, autoplayMs);
    return () => window.clearInterval(t);
  }, [steps.length, autoplayMs]);

  const current = hovered ?? active;
  const stepTone = steps[current]?.tone ?? "blue";
  const ts = toneStyles[stepTone];

  return (
    <div className={`grid lg:grid-cols-[0.9fr_1.1fr] gap-5 lg:gap-8 items-start ${className ?? ""}`}>
      <div className="relative">
        <div aria-hidden="true" className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-200/75" />
        <div
          aria-hidden="true"
          className={`absolute left-[10px] top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b ${ts.rail} opacity-0 transition-opacity duration-300`}
          style={{ opacity: 1 }}
        />

        <div className="space-y-1.5">
          {steps.map((s, idx) => {
            const isActive = idx === current;
            const tone = s.tone ?? "blue";
            const toneDot = toneStyles[tone].dot;
            return (
              <article
                key={`${s.title}-${idx}`}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(idx)}
                onBlur={() => setHovered(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(idx);
                  }
                }}
                className={`relative pl-9 pr-3 py-3.5 rounded-2xl border transition-all cursor-default ${
                  isActive
                    ? "bg-white/88 border-slate-200/80 shadow-[0_1px_2px_rgba(2,6,23,0.04),0_18px_54px_rgba(2,6,23,0.10)]"
                    : "bg-white/55 border-slate-200/60 hover:bg-white/82"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-[6px] top-[22px] h-3 w-3 rounded-full ${isActive ? toneDot : "bg-slate-300/60"}`}
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200/70 bg-slate-900/5 text-slate-700">
                        <Icon icon={s.icon} width={16} height={16} />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 truncate">
                          {s.kicker ?? `Step 0${idx + 1}`}
                        </div>
                        <div className="mt-0.5 text-sm font-semibold text-[var(--ink)] truncate">{s.title}</div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.detail}</p>
                  </div>
                  <Icon icon="lucide:arrow-right" width={16} height={16} className={isActive ? "text-slate-700" : "text-slate-400"} />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="lg:self-start">
        <div className="sticky top-20">
          <div className="relative rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(37,99,235,0.35),rgba(53,125,255,0.14),rgba(30,162,255,0.18))] shadow-[0_18px_54px_rgba(2,6,23,0.10)]">
            <div className="elite-card rounded-2xl p-5 md:p-6 bg-white/90">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Live preview</div>
                <div className="inline-flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
                  Embedded • Native-feeling
                </div>
              </div>

              <div className="mt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 10, scale: 0.994 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.996 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {renderPreview(steps[current], current)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


