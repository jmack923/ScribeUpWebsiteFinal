import React from "react";
import { motion, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import { CountUp } from "./count-up";

type Metric = {
  label: string;
  value: string;
  note: string;
  icon: string;
  spark: number[];
  accent: string;
};

function MiniSpark({ points, accent = "rgba(37,99,235,0.85)" }: { points: number[]; accent?: string }) {
  const w = 104;
  const h = 28;
  const pad = 2;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const norm = (v: number) => {
    if (max === min) return h / 2;
    const t = (v - min) / (max - min);
    return h - pad - t * (h - pad * 2);
  };
  const step = (w - pad * 2) / (points.length - 1);
  const d = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${pad + i * step} ${norm(v).toFixed(2)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[26px] w-[104px]" aria-hidden="true" preserveAspectRatio="none">
      <path
        d={d}
        fill="none"
        stroke={accent}
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 8px rgba(37, 99, 235, 0.3))" }}
      />
    </svg>
  );
}

function SubtleShimmer({ active }: { active: boolean }) {
  // ultra-subtle sheen (Stripe-like): only visible when active, no “glow show”
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.10]"
      initial={{ opacity: 0, x: "-40%" }}
      animate={active ? { opacity: 0.10, x: "40%" } : { opacity: 0, x: "-40%" }}
      transition={{ duration: 6.0, ease: [0.2, 0.8, 0.2, 1], repeat: active ? Infinity : 0 }}
      style={{
        background:
          "linear-gradient(120deg, transparent 44%, rgba(255,255,255,0.55) 50%, transparent 56%)",
      }}
    />
  );
}

// NOTE: sparklines use value-series (up/right), not chart Y-coordinates.
const metrics: Metric[] = [
  {
    label: "Retention lift",
    value: "+5%",
    note: "Customer‑reported activation impact",
    icon: "lucide:shield-check",
    spark: [0.6, 0.9, 1.15, 1.7, 2.4, 3.0, 3.55, 4.1, 4.6, 5.0],
    accent: "rgba(37,99,235,0.85)",
  },
  {
    label: "Card primacy",
    value: "6+ / mo",
    note: "Additional swipes after activation",
    icon: "lucide:credit-card",
    spark: [1.0, 1.4, 2.0, 2.8, 3.6, 4.1, 4.8, 5.3, 5.8, 6.2],
    accent: "rgba(53,125,255,0.82)",
  },
  {
    label: "Offer conversion",
    value: "11%",
    note: "Across personalized offers",
    icon: "lucide:badge-percent",
    spark: [1.8, 2.3, 3.0, 4.2, 5.4, 6.6, 7.4, 8.9, 10.2, 11.0],
    accent: "rgba(30,162,255,0.78)",
  },
];

export function ImpactGraph() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-16% 0px -12% 0px" });
  const reduceMotion = React.useMemo(() => {
    try {
      return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  }, []);

  // Bank-grade contribution waterfall (no circles / no “cartoon line”).
  const steps = [
    { k: "Detect", d: "Recurring spend", v: 14, icon: "lucide:scan-search" },
    { k: "Nudge", d: "Due-date alerts", v: 9, icon: "lucide:bell-ring" },
    { k: "Action", d: "Payment updater", v: 12, icon: "lucide:zap" },
  ] as const;
  const total = steps.reduce((a, s) => a + s.v, 0);
  const maxV = Math.max(...steps.map((s) => s.v));

  return (
    <div ref={ref} className="w-full">
      <div className="elite-card rounded-3xl p-3 md:p-3.5 bg-white/78 relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.06] [mask-image:radial-gradient(55%_55%_at_50%_0%,black,transparent_70%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_14%_0%,rgba(30,162,255,0.05),transparent_64%)]" />

        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Measured uplift</div>
            <div className="mt-2 text-[20px] md:text-[22px] font-semibold tracking-[-0.04em] text-[var(--ink)]">
              After activation
            </div>
            <p className="mt-1.5 text-[12.5px] text-slate-600 max-w-[74ch] leading-relaxed">
              Workflow: detect → nudge → one‑click action. Reported uplift tied to retention, primacy, and conversion.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">+5% retention</span>
            <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">6+ swipes / mo</span>
            <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">11% conversion</span>
          </div>
        </div>

        <div className="relative mt-3 rounded-2xl border border-slate-200/60 bg-[rgba(255,255,255,0.66)] backdrop-blur-md p-2.5 md:p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_14px_40px_rgba(15,25,45,0.06)]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_220px_at_30%_62%,rgba(30,162,255,0.05),transparent_72%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.08] [mask-image:radial-gradient(55%_60%_at_50%_10%,black,transparent_74%)]" />

          <div className="relative flex items-center justify-between gap-4">
            <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Activation uplift</div>
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] text-slate-500">Net uplift</span>
              <span className="spec-chip !px-2 !py-1 !text-[10px] normal-case tracking-[0.02em] font-semibold text-slate-700">
                {reduceMotion || !inView ? (
                  `Δ +${total}`
                ) : (
                  <CountUp to={total} prefix="Δ +" duration={780} />
                )}
              </span>
            </div>
          </div>

          {/* Clean contribution bars (no floating numbers, no shapes) */}
          <div className="relative mt-3 grid gap-2">
            {steps.map((s, i) => {
              const pct = Math.max(0.18, s.v / maxV);
              return (
                <motion.div
                  key={s.k}
                  className="relative overflow-hidden rounded-xl border border-slate-200/60 bg-white/66 px-3 py-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.55, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }
                  }
                >
                  <SubtleShimmer active={Boolean(inView && !reduceMotion)} />
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{s.k}</span>
                        <span className="text-[12px] font-semibold text-slate-700">{s.d}</span>
                      </div>
                    </div>
                    <div className="shrink-0 inline-flex items-center gap-2 text-[12px] font-semibold text-slate-700">
                      <Icon icon={s.icon} width={14} height={14} className="text-slate-500" />
                      {reduceMotion || !inView ? (
                        `+${s.v}`
                      ) : (
                        <CountUp to={s.v} prefix="+" duration={720} />
                      )}
                    </div>
                  </div>
                  <div className="mt-2 h-[5px] rounded-full bg-slate-900/5 border border-slate-200/60 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-[linear-gradient(90deg,rgba(37,99,235,0.44),rgba(30,162,255,0.38))]"
                      initial={{ width: 0, opacity: 0.0 }}
                      animate={inView ? { width: `${Math.round(pct * 100)}%`, opacity: 1 } : { width: 0, opacity: 0 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.85, delay: 0.08 + i * 0.08, ease: [0.16, 1, 0.3, 1] }
                      }
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-3 grid md:grid-cols-3 gap-2">
          {metrics.map((m) => (
            <div
              key={m.label}
                className="group rounded-2xl border border-slate-200/60 bg-white/68 backdrop-blur-md px-3 py-2.5 shadow-[0_1px_2px_rgba(15,25,45,0.04)] hover:shadow-[0_1px_2px_rgba(15,25,45,0.05),0_14px_44px_rgba(15,25,45,0.07)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[1px]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[10.5px] uppercase tracking-[0.14em] text-slate-500">{m.label}</div>
                  <div className="mt-1.5 text-[20px] font-semibold tracking-[-0.04em] text-[var(--ink)]">{m.value}</div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{m.note}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="h-8 w-8 rounded-2xl grid place-items-center bg-white/78 border border-slate-200/70 text-slate-800 shadow-[0_1px_0_rgba(255,255,255,0.75)_inset,0_10px_30px_rgba(15,25,45,0.06)]">
                    <Icon icon={m.icon} width={16} height={16} className="text-slate-700" />
                  </div>
                  <div className="opacity-90">
                    <MiniSpark points={m.spark} accent={m.accent} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


