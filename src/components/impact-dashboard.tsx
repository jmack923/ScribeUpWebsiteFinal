import React from "react";
import { motion, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import { CountUp } from "./count-up";

function useReduceMotion() {
  return React.useMemo(() => {
    try {
      return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  }, []);
}

export function ImpactDashboard() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px -18% 0px" });
  const reduceMotion = useReduceMotion();
  const [view, setView] = React.useState<"business" | "system">("business");

  const workflow = [
    {
      label: "Detect",
      title: "Recurring bills found",
      detail: "Normalize signals across cards and accounts",
      icon: "lucide:scan-search",
      delta: 14
    },
    {
      label: "Nudge",
      title: "Due-date alert sent",
      detail: "Prompt in-app action before charges hit",
      icon: "lucide:bell-ring",
      delta: 9
    },
    {
      label: "Action",
      title: "1-click updater executed",
      detail: "Move payment-on-file across card and ACH",
      icon: "lucide:zap",
      delta: 12
    },
  ] as const;

  const net = workflow.reduce((a, s) => a + s.delta, 0);

  const outcomes = [
    { label: "Retention lift", value: 5, suffix: "%", note: "Increase in retention of banking users", icon: "lucide:shield-check" },
    { label: "Card primacy", value: 6, suffix: "+ / mo", note: "Additional card swipes after activating ScribeUp", icon: "lucide:credit-card" },
    { label: "Offer conversion", value: 11, suffix: "%", note: "Conversion into premium plans, lending, insurance, banking products", icon: "lucide:badge-percent" },
  ] as const;

  const ease = [0.2, 0.8, 0.2, 1] as const;

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Measured uplift</div>
          <div className="mt-1 text-[18px] font-semibold tracking-[-0.03em] text-[var(--ink)]">
            Post-activation outcomes
          </div>
        </div>
        <div className="inline-flex items-center gap-4 text-[12px]">
          {[
            { k: "business" as const, label: "Business" },
            { k: "system" as const, label: "System" },
          ].map((t) => (
            <button
              key={t.k}
              type="button"
              onClick={() => setView(t.k)}
              aria-pressed={view === t.k}
              className={`relative h-7 border-b text-[12px] font-semibold transition-colors ${
                view === t.k ? "border-slate-300 text-[var(--ink)]" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="inline-flex h-full items-center">{t.label}</span>
              {view === t.k ? (
                <motion.span
                  layoutId="impact-dashboard-tab"
                  className="pointer-events-none absolute inset-x-1 -bottom-px h-[2px] rounded-full bg-slate-700/85"
                  transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <motion.div className="mt-3.5">
        <motion.div
          className="rounded-[18px] border border-slate-200/70 bg-white relative overflow-hidden shadow-[0_1px_2px_rgba(2,6,23,0.04),0_12px_30px_rgba(2,6,23,0.06)]"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.04] [mask-image:radial-gradient(55%_55%_at_50%_0%,black,transparent_74%)]" />

          <motion.div
            key={view}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease }}
            className="relative p-4 md:p-5"
          >
            {view === "business" ? (
              <>
                <div className="grid md:grid-cols-3 gap-2.5">
                  {outcomes.map((k, i) => (
                    <motion.div
                      key={k.label}
                      className="rounded-[14px] border border-slate-200/70 bg-white px-3.5 py-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.03 + i * 0.05, ease }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500/80">{k.label}</div>
                          <div className="mt-1 text-[18px] font-semibold tracking-[-0.04em] text-[var(--ink)] font-mono">
                            {reduceMotion || !inView ? `${k.value}${k.suffix}` : <CountUp to={k.value} suffix={k.suffix} duration={560} />}
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-600">{k.note}</div>
                        </div>
                        <span className="mt-0.5 inline-flex h-[30px] w-[30px] items-center justify-center rounded-xl border border-slate-200/70 bg-white text-slate-700">
                          <Icon icon={k.icon} width={14} height={14} />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-3.5 rounded-[14px] border border-slate-200/70 bg-slate-50/70">
                  <div className="px-3.5 py-2.5 border-b border-slate-200/70 flex items-center justify-between gap-3">
                    <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Activation rail</div>
                    <div className="text-[11px] font-mono text-slate-600">
                      {reduceMotion || !inView ? (
                        `NET +${net}`
                      ) : (
                        <CountUp to={net} prefix="NET +" duration={640} />
                      )}
                    </div>
                  </div>
                  <div className="p-2.5 space-y-1.5">
                    {workflow.map((s, i) => (
                      <motion.div
                        key={s.label}
                        className="rounded-xl border border-slate-200/70 bg-white px-3 py-2 flex items-center justify-between gap-3"
                        initial={{ opacity: 0, y: 6 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                        transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.12 + i * 0.05, ease }}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200/70 bg-white text-slate-700">
                            <Icon icon={s.icon} width={13} height={13} />
                          </span>
                          <div className="min-w-0">
                            <div className="text-[11px] font-semibold text-[var(--ink)] truncate">{s.title}</div>
                            <div className="text-[10.5px] text-slate-600 truncate">{s.detail}</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono font-semibold text-slate-700 whitespace-nowrap">+{s.delta}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid md:grid-cols-[0.92fr_1.08fr] gap-3">
                  <div className="rounded-[14px] border border-slate-200/70 bg-white p-3.5">
                    <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">System pipeline</div>
                    <div className="mt-2 space-y-2">
                      {workflow.map((s) => (
                        <div key={s.label} className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200/70 bg-white text-slate-700">
                              <Icon icon={s.icon} width={13} height={13} />
                            </span>
                            <div className="min-w-0">
                              <div className="text-[11px] font-semibold text-[var(--ink)]">{s.title}</div>
                              <div className="text-[10.5px] text-slate-600">{s.detail}</div>
                            </div>
                          </div>
                          <div className="text-[10.5px] font-mono text-slate-700">+{s.delta}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[14px] border border-slate-200/70 bg-slate-950 text-slate-100 p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-slate-300/70">Event stream</div>
                      <div className="text-[10px] font-mono text-slate-300/70">
                        {reduceMotion || !inView ? `DELTA +${net}` : <CountUp to={net} prefix="DELTA +" duration={640} />}
                      </div>
                    </div>
                    <div className="mt-2.5 space-y-1.5">
                      {[
                        "bill_detected • merchant=verizon • amount=85.00",
                        "alert_scheduled • channel=in_app • due_in=2d",
                        "action_executed • move_payment_on_file • status=ok",
                      ].map((line, i) => (
                        <motion.div
                          key={line}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2 text-[10.5px] font-mono text-slate-200/82"
                          initial={{ opacity: 0, y: 6 }}
                          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                          transition={reduceMotion ? { duration: 0 } : { duration: 0.38, delay: 0.05 + i * 0.06, ease }}
                        >
                          {line}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}


