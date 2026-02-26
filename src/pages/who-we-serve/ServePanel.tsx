import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import type { SegmentData, SegmentMetric } from "./segment-data";

export function ServePanel({
  segment,
  openDemoModal,
}: {
  segment: SegmentData;
  openDemoModal: () => void;
}) {
  const { metrics } = segment;
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);
  const isFintech = segment.slug === "fintechs";

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(!!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[980px] px-0 bg-transparent">
        <motion.div
          className="text-center"
          initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 6 : 12 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2
            className="mt-0 section-title !text-[24px] md:!text-[28px] max-w-[42ch] mx-auto text-balance"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.65 }}
            transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            Proven results from embedded bill management solutions
          </motion.h2>
          <motion.p
            className="mt-3 text-[14px] md:text-[15px] text-slate-600 leading-[1.65] max-w-[56ch] mx-auto"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Drive retention, premium upgrades, and cross-sell at key inflection points—without another funnel.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 rounded-[28px] bg-slate-200/70 p-px overflow-hidden shadow-[0_0_0_4px_#FBFCFE,0_18px_60px_rgba(2,6,23,0.08)]"
          initial={reducedMotion ? false : "hidden"}
          whileInView={reducedMotion ? undefined : "show"}
          viewport={{ once: false, amount: 0.35 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <div className="grid md:grid-cols-3 gap-px bg-slate-200/70">
            {metrics.map((m: SegmentMetric) => (
              <motion.div
                key={m.label}
                className="group relative bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] border border-slate-200/70 p-6 md:p-7 min-h-[180px] flex flex-col text-center transition-[box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-slate-300/70 hover:shadow-[0_18px_52px_-16px_rgba(2,6,23,0.12)]"
                variants={{
                  hidden: { opacity: 0, y: isMobile ? 6 : 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-[#2563EB]/14 opacity-60" />

                <div className="flex flex-col items-center justify-center flex-1">
                  <div className="text-[32px] md:text-[36px] leading-none font-semibold tracking-[-0.05em] text-blue-700/90 tabular-nums">
                    {m.value}
                  </div>
                  <div className="mt-2.5 text-[14px] font-medium text-slate-900 leading-tight tracking-[-0.02em]">
                    {m.label}
                  </div>
                  <p className="mt-2 text-[12.5px] text-slate-600 leading-relaxed max-w-[36ch] mx-auto">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {isFintech ? (
          <>
            <div aria-hidden="true" className="mt-14 md:mt-16">
              <div className="soft-divider" />
            </div>

            <motion.div
              className="relative mt-12 md:mt-16 mb-12 md:mb-14"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-center">
                <h3 className="mt-0 text-[24px] md:text-[28px] leading-[1.12] font-semibold tracking-[-0.05em] text-[var(--ink)] mx-auto max-w-[44ch] text-balance">
                  Premium upsell. Strategic cross‑sell.
                </h3>
                <p className="mt-3 text-[14px] md:text-[15px] text-slate-600 leading-[1.6] max-w-[52ch] mx-auto">
                  Use bill moments to surface the right product—personal loans, EWA, insurance—at the right time.
                </p>
              </div>

              <motion.div
                className="mt-8 w-full flex justify-center"
                initial={reducedMotion ? false : "hidden"}
                whileInView={reducedMotion ? undefined : "show"}
                viewport={{ once: false, amount: 0.35 }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              >
                <div className="w-full max-w-[920px] rounded-[20px] bg-white border border-slate-200/80 overflow-hidden shadow-[0_0_0_4px_#F8FAFC,0_14px_36px_-20px_rgba(2,6,23,0.10)]">
                  <div className="bg-transparent">
                    <div className="px-6 md:px-8 py-4 md:py-5 border-b border-slate-200/70 bg-white text-center">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Monetization levers
                      </div>
                      <div className="mt-1 text-[12.5px] md:text-[13px] leading-[1.55] text-slate-600 max-w-[62ch] mx-auto">
                        Surface the right upgrade or product at the right moment.
                      </div>
                    </div>

                    <div className="flex flex-col bg-slate-50/45">
                      {[
                        {
                          icon: "lucide:crown",
                          title: "Premium upsell",
                          desc: "Bill and spending insights that nudge upgrades.",
                          tag: "Upsell",
                        },
                        {
                          icon: "lucide:banknote",
                          title: "Personal loans",
                          desc: "Loan and refinancing nudges from payment patterns.",
                          tag: "Lending",
                        },
                        {
                          icon: "lucide:wallet",
                          title: "EWA & savings",
                          desc: "Product nudges when and how users pay bills.",
                          tag: "Savings",
                        },
                      ].map((card, idx) => (
                        <motion.div
                          key={card.title}
                          className="group relative border-b border-slate-200/75 last:border-b-0 px-3 py-2.5"
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            show: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.03 },
                            },
                          }}
                        >
                          <div className="cursor-pointer rounded-[14px] px-4 md:px-5 py-3.5 md:py-4 bg-white transition-[background-color,border-color,box-shadow] duration-220 border border-transparent group-hover:border-slate-200/80 group-hover:shadow-[0_8px_20px_-14px_rgba(2,6,23,0.12)]">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3.5 md:gap-4 min-w-0">
                                <div className="h-9 w-9 rounded-[10px] bg-[#EFF6FF] border border-slate-200/70 flex items-center justify-center shrink-0 text-[#2563EB] transition-all duration-200 group-hover:bg-white group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] group-hover:border-slate-200/90">
                                  <Icon icon={card.icon} width={16} height={16} className="text-[#2563EB]" style={{ strokeWidth: 1.5 }} />
                                </div>
                                <div className="min-w-0 flex-1 text-left">
                                  <div className="text-[13.5px] font-semibold tracking-[-0.02em] text-slate-900 leading-[1.2]">
                                    {card.title}
                                  </div>
                                  <p className="mt-1 text-[12px] md:text-[12.5px] leading-[1.5] text-slate-600 max-w-[56ch]">
                                    {card.desc}
                                  </p>
                                </div>
                              </div>
                              <div className="shrink-0 hidden sm:flex items-center gap-2">
                                <span className="inline-flex h-6 items-center px-2.5 rounded-full border border-slate-200/80 bg-slate-50 text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-500">
                                  {card.tag}
                                </span>
                                <Icon icon="lucide:chevron-right" width={14} height={14} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </div>
    </div>
  );
}
