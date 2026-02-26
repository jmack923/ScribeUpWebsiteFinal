import React from "react";
import { Icon } from "@iconify/react";
import { motion, useInView } from "framer-motion";

type Variant = "whyNow" | "deployment";

export function LayeredSignalStack({ variant }: { variant: Variant }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20% 0px -15% 0px" });
  const reduceMotion = React.useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false,
    [],
  );

  const isWhyNow = variant === "whyNow";
  const isDeployment = variant === "deployment";
  // Intentionally NO auto-shuffle/cycle: these are “faint, in-the-distance” overlays.

  const ease = [0.16, 1, 0.3, 1] as const;

  const [mode, setMode] = React.useState<"alert" | "action">("alert");
  React.useEffect(() => {
    if (!isWhyNow) return;
    if (reduceMotion) return;
    if (!inView) return;
    const id = window.setInterval(
      () => setMode((m) => (m === "alert" ? "action" : "alert")),
      3600,
    );
    return () => window.clearInterval(id);
  }, [isWhyNow, reduceMotion, inView]);

  // WhyNow should feel like the hero calendar: faint, precise, mostly-out chips.
  if (isWhyNow) {
    return (
      <motion.div
        ref={ref}
        className="relative w-[min(360px,100%)] opacity-[0.56]"
        initial={{ opacity: 0, y: 14, scale: 0.995 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.995 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease }}
      >
        <div className="rounded-2xl bg-[linear-gradient(180deg,#ffffff,#f9fbfd)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_16px_40px_rgba(15,25,45,0.06)] overflow-visible">
          <div className="rounded-2xl overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-slate-200/70 flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
                {mode === "alert" ? "Alert queue" : "Action ready"}
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]" />
                Live
              </span>
            </div>
            <div className="p-3.5 relative">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.06] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_78%)]" />
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
                className="relative"
              >
                {mode === "alert" ? (
                  <div className="divide-y divide-slate-200/65">
                    {[
                      ["simple-icons:spotify", "Spotify", "Due Tue · $9.99"],
                      ["simple-icons:netflix", "Netflix", "Due Fri · $19.99"],
                      ["simple-icons:verizon", "Verizon", "Due Sun · $85.00"],
                    ].map(([ic, name, meta]) => (
                      <motion.div key={name} whileHover={{ x: 2 }} className="h-[52px] px-2.5 py-2 flex items-center gap-2.5 hover:bg-white/55 transition-colors">
                        <span className="h-[30px] w-[30px] rounded-xl bg-white/84 border border-slate-200/70 grid place-items-center">
                          <Icon icon={String(ic)} width={13} height={13} className="text-slate-700/90" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-[12px] font-semibold text-[var(--ink)] leading-tight">{name}</div>
                          <div className="text-[11px] text-slate-600 truncate font-mono">{meta}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200/70 bg-white/72 px-3 py-3">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Action</div>
                    <div className="mt-1 text-[12.5px] font-semibold tracking-[-0.01em] text-[var(--ink)]">Move payment‑on‑file</div>
                    <div className="mt-0.5 text-[11.5px] text-slate-600">1‑click updater · card + ACH</div>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/10 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                      <Icon icon="lucide:mouse-pointer-click" width={14} height={14} />
                      Run update
                      <Icon icon="lucide:arrow-right" width={14} height={14} className="text-slate-500" />
                    </div>
                  </div>
                )}
              </motion.div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600 relative z-10">
                <span className="inline-flex items-center gap-1.5">
                  <Icon icon="lucide:activity" width={14} height={14} className="text-slate-500" />
                  {mode === "alert" ? "Queue updated" : "Action staged"}
                </span>
                <span className="font-mono text-[10px] tracking-[0.10em] text-slate-500">{mode === "alert" ? "ALERT_Q" : "ACTION_RDY"}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Deployment: make it quieter, smaller, and more “system panel” than stacked cards.
  if (isDeployment) {
    const events = [
      { k: "payment.updated", d: "Webhook delivered · audit logged", tone: "bg-emerald-500/75", live: true },
      { k: "alert.scheduled", d: "Due‑date nudge · in‑app", tone: "bg-blue-600/70" },
    ] as const;
    const fit = [
      ["SDK", "Mobile"],
      ["Webhooks", "Real‑time"],
      ["Audit", "Trails"],
      ["Auth", "Bank‑grade"],
    ] as const;

    return (
      <motion.div
        ref={ref}
        className="relative w-[min(380px,100%)] opacity-[0.46]"
        initial={{ opacity: 0, y: 18, scale: 0.995 }}
        animate={inView ? { opacity: 1, y: 2, scale: 1 } : { opacity: 0, y: 18, scale: 0.995 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease }}
      >
        <div className="rounded-2xl bg-[linear-gradient(180deg,#ffffff,#f8fafc)] shadow-[0_1px_2px_rgba(15,25,45,0.03),0_16px_44px_rgba(15,25,45,0.07)] overflow-hidden">
          <div className="px-3.5 py-2.5 border-b border-slate-200/70 flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Deployment signals</div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
              <Icon icon="lucide:shield-check" width={14} height={14} className="text-slate-600" />
              Regulated‑ready
            </span>
          </div>
          <div className="p-3.5 grid grid-cols-2 gap-2.5">
            <div className="rounded-2xl bg-white/72 px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Events</div>
              <div className="mt-2 space-y-1.5">
                {events.map((e) => (
                  <div key={e.k} className="rounded-xl border border-slate-200/55 bg-white/74 px-2.5 py-2">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${e.tone} shadow-[0_0_0_4px_rgba(30,162,255,0.08)] ${e.k === "payment.updated" ? "animate-[pulse_2s_ease-in-out_infinite]" : ""}`} />
                      <div className="font-mono text-[11px] font-semibold text-[var(--ink)] truncate">{e.k}</div>
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-slate-600 truncate">{e.d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white/72 px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Stack fit</div>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {fit.map(([a, b]) => (
                  <div key={a} className="rounded-xl border border-slate-200/55 bg-white/74 px-2.5 py-2">
                    <div className="text-[10.5px] font-semibold tracking-[-0.01em] text-[var(--ink)]">{a}</div>
                    <div className="mt-0.5 text-[10px] text-slate-600">{b}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 rounded-xl border border-slate-200/70 bg-white/72 px-2.5 py-2 text-[10.5px] text-slate-600">
                <span className="font-semibold text-slate-700">Note:</span> deterministic delivery + audit trails.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const cards = isWhyNow
    ? ([
        {
          k: "Calendar",
          t: "Due in 2 days",
          d: "Mobile plan · $28.00",
          icon: "lucide:calendar-check",
          chips: [
            { icon: "simple-icons:atandt", label: "AT&T" },
            { icon: "simple-icons:netflix", label: "Netflix" },
          ],
        },
        {
          k: "Insight",
          t: "Recurring spend detected",
          d: "Next 14 days · $152.12",
          icon: "lucide:scan-search",
          chips: [
            { icon: "simple-icons:spotify", label: "Spotify" },
            { icon: "simple-icons:hulu", label: "Hulu" },
            { icon: "simple-icons:verizon", label: "Verizon" },
          ],
        },
        {
          k: "Action",
          t: "Move payment‑on‑file",
          d: "1‑click updater · card + ACH",
          icon: "lucide:zap",
          chips: [{ icon: "lucide:mouse-pointer-click", label: "1‑click" }],
        },
      ] as const)
    : ([
        {
          k: "Proof",
          t: "Measured uplift",
          d: "+5% retention · +11% conversion",
          icon: "lucide:trending-up",
          chips: [
            { icon: "lucide:shield-check", label: "Regulated-ready" },
            { icon: "lucide:timer", label: "30–45 days" },
          ],
        },
        {
          k: "Stack fit",
          t: "Embedded + API‑first",
          d: "SDK · webhooks · audit trails",
          icon: "lucide:layers-3",
          chips: [
            { icon: "lucide:smartphone", label: "Mobile" },
            { icon: "lucide:webhook", label: "Webhooks" },
            { icon: "lucide:lock", label: "Auth" },
          ],
        },
        {
          k: "Event",
          t: "payment.updated",
          d: "Delivered to bank systems in real time",
          icon: "lucide:terminal",
          chips: [{ icon: "lucide:check", label: "Delivered" }],
        },
      ] as const);

  const baseDelay = isWhyNow ? 0.06 : 0.04;
  const slot = [0, 1, 2] as const;

  // Layout: WhyNow = diagonal stack, Deployment = top/bottom stack (distinct).
  const pos = {
    back: "absolute left-0 top-0 w-[90%]",
    mid: "absolute right-0 top-[62px] w-[92%]",
    front: "relative mt-[124px] w-[90%]",
    minH: "min-h-[240px]",
  };

  return (
    <div ref={ref} className={`relative w-[min(420px,100%)] ${isWhyNow ? "" : "opacity-[0.84]"}`}>
      {/* connector lines (quiet luxury: thin, precise, minimal) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-4 -inset-y-6"
        viewBox="0 0 440 220"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`lsStroke-${variant}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={isWhyNow ? "rgba(30,162,255,0.22)" : "rgba(30,162,255,0.16)"} />
            <stop offset="45%" stopColor={isWhyNow ? "rgba(15,25,45,0.12)" : "rgba(15,25,45,0.10)"} />
            <stop offset="100%" stopColor={isWhyNow ? "rgba(30,162,255,0.12)" : "rgba(30,162,255,0.10)"} />
          </linearGradient>
        </defs>
        <motion.path
          d={
            "M72 72 C 138 62, 180 58, 252 78 C 310 94, 342 104, 384 116"
          }
          fill="none"
          stroke={`url(#lsStroke-${variant})`}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView && !reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d={
            "M54 152 C 120 134, 178 128, 250 146 C 310 160, 346 170, 396 184"
          }
          fill="none"
          stroke={`url(#lsStroke-${variant})`}
          strokeWidth="1.05"
          strokeLinecap="round"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView && !reduceMotion ? { pathLength: 1, opacity: 0.85 } : { pathLength: 1, opacity: 0.28 }}
          transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      <div className={`relative ${pos.minH}`}>
        {/* back card */}
        <motion.div
          key={`back-${cards[slot[0]].k}`}
          className={`${pos.back} rounded-2xl border border-slate-200/60 bg-[linear-gradient(180deg,rgba(246,250,255,0.52),rgba(255,255,255,0.36))] backdrop-blur-lg shadow-[0_1px_2px_rgba(15,25,45,0.03),0_12px_36px_rgba(15,25,45,0.06)] opacity-[0.58]`}
          initial={{ opacity: 0, y: 16, rotate: -0.6, scale: 0.992 }}
          animate={
            inView
              ? { opacity: 1, y: 0, rotate: -0.15, scale: 1 }
              : { opacity: 0, y: 16, rotate: -0.6, scale: 0.992 }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: [0.16, 1, 0.3, 1],
            delay: baseDelay,
          }}
        >
          <CardInner {...cards[slot[0]]} tint="from-blue-600/6 via-sky-500/5 to-transparent" />
        </motion.div>

        {/* middle card */}
        <motion.div
          key={`mid-${cards[slot[1]].k}`}
          className={`${pos.mid} rounded-2xl border border-slate-200/60 bg-[linear-gradient(180deg,rgba(250,252,255,0.64),rgba(255,255,255,0.44))] backdrop-blur-lg shadow-[0_1px_2px_rgba(15,25,45,0.03),0_14px_40px_rgba(15,25,45,0.07)] opacity-[0.66]`}
          initial={{ opacity: 0, y: 16, rotate: 0.6, scale: 0.992 }}
          animate={
            inView
              ? { opacity: 1, y: 0, rotate: 0.15, scale: 1 }
              : { opacity: 0, y: 16, rotate: 0.6, scale: 0.992 }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: baseDelay + 0.08,
          }}
        >
          <CardInner {...cards[slot[1]]} tint="from-sky-500/8 via-blue-600/5 to-transparent" />
        </motion.div>

        {/* front card */}
        <motion.div
          key={`front-${cards[slot[2]].k}`}
          className={`${pos.front} rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-lg shadow-[0_1px_2px_rgba(15,25,45,0.04),0_16px_44px_rgba(15,25,45,0.08)]`}
          initial={{ opacity: 0, y: 18, scale: 0.992 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.992 }}
          transition={{
            duration: reduceMotion ? 0 : 0.62,
            ease: [0.16, 1, 0.3, 1],
            delay: baseDelay + 0.16,
          }}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -3,
                  boxShadow: "0 1px 2px rgba(2,6,23,0.05), 0 32px 88px rgba(2,6,23,0.14)",
                }
          }
        >
          <CardInner {...cards[slot[2]]} tint="from-blue-600/8 via-sky-500/6 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}

function CardInner({
  k,
  t,
  d,
  icon,
  chips,
  tint,
}: {
  k: string;
  t: string;
  d: string;
  icon: string;
  chips: ReadonlyArray<{ icon: string; label: string }>;
  tint: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-3.5">
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tint} opacity-80`} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.07] [mask-image:radial-gradient(55%_55%_at_50%_0%,black,transparent_72%)]" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{k}</div>
          <div className="mt-1 text-[13px] font-semibold tracking-[-0.02em] text-[var(--ink)] truncate">
            {t}
          </div>
          <div className="mt-0.5 text-[12px] text-slate-600">{d}</div>
        </div>
        <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 border border-slate-200/70 text-slate-700 shadow-[0_1px_0_rgba(255,255,255,0.60)_inset]">
          <Icon icon={icon} width={16} height={16} />
        </span>
      </div>
      <div className="relative mt-3 flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/70 bg-white/70 px-2 py-1 text-[11px] font-semibold text-slate-700 shadow-[0_1px_0_rgba(255,255,255,0.65)_inset]"
          >
            <Icon icon={c.icon} width={13} height={13} className="text-slate-600" />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}


