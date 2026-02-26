import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouteLink } from "react-router-dom";
import { useDemoModal } from "../../components/demo-modal-context";
import { motion, useReducedMotion } from "framer-motion";

export default function Company() {
  const { openDemoModal } = useDemoModal();
  const reducedMotion = useReducedMotion();
  return (
    <div className="w-full page-shell">
      <section className="relative border-b border-slate-200/70 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-[0.08]" />
          <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_12%_14%,rgba(71,98,255,0.08),transparent_70%),radial-gradient(40%_30%_at_88%_18%,rgba(44,138,255,0.06),transparent_72%)]" />
          <div className="absolute inset-0 distance-grid opacity-[0.24] [mask-image:radial-gradient(55%_60%_at_50%_18%,black,transparent_72%)]" />
        </div>
        <div className="container-page page-hero-pad relative">
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-4xl"
            initial={reducedMotion ? false : { opacity: 0, y: 10, scale: 0.997 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm text-slate-600"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">About ScribeUp</span>
              <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">Bank‑grade posture</span>
              <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">Outcome‑led</span>
            </motion.div>
            <motion.h1
              className="mt-8 page-title tracking-[-0.06em] leading-[1.05]"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              Building the future of <span className="elite-em">recurring bill</span> control
            </motion.h1>
            <motion.p
              className="mt-5 copy-hero max-w-2xl mx-auto lg:mx-0"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              We help financial institutions turn recurring bills into a high-impact digital product category:
              better consumer outcomes, stronger engagement, and clear business-case ROI.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button
                color="primary"
                className="nav-btn-base btn-s-tier btn-s-tier-primary btn-arrow-lead !w-full sm:!w-auto !h-[40px] !px-7 text-[13px] font-semibold"
                startContent={<Icon icon="lucide:calendar" width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                onClick={openDemoModal}
              >
                Book a demo
              </Button>
              <Button
                as={RouteLink as any}
                to="/solution"
                variant="flat"
                color="default"
                className="nav-btn-base btn-s-tier btn-arrow-lead !w-full sm:!w-auto !h-[40px] !px-7 text-[13px] font-semibold border border-slate-200/70 bg-white hover:bg-slate-50"
                endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} style={{ strokeWidth: 1.5 }} />}
              >
                See the flow
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section data-reveal="section" className="relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-[120px] bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.06] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_12%,rgba(37,99,235,0.022),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(30,162,255,0.02),transparent_70%)]" />
        <div className="container-page relative z-10">
          <div data-reveal-item className="max-w-3xl mb-12">
            <p className="wayfinder">Team</p>
            <h2 className="mt-8 section-title">
              Built for regulated product shipping
            </h2>
            <p className="mt-5 text-slate-700 text-[16px] md:text-[17px] max-w-2xl leading-relaxed">
              We keep this page free of made-up bios. If you want a team section, drop the official names/titles and we’ll render it.
            </p>
          </div>

          <div data-reveal-item className="mt-10 rounded-[28px] bg-[#E2E8F0] p-px overflow-hidden">
            <div className="grid md:grid-cols-3 gap-px bg-[#E2E8F0]">
            {[
              ["lucide:shield-check", "Security posture", "SOC 2-ready approach and enterprise controls"],
              ["lucide:layers", "Embedded product craft", "Native-feeling UI inside existing digital banking experiences"],
              ["lucide:rocket", "Ship velocity", "30–45 day rollout model with clear deployment paths"],
            ].map(([ic, t, d]) => (
              <div key={t} className="relative bg-white p-6 sm:p-8 md:p-9">
                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/55" />
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-[16px] border border-slate-200/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] text-blue-700/85">
                  <Icon icon={ic} width={20} height={20} style={{ strokeWidth: 1.5 }} />
                </div>
                <div className="mt-5 text-[16px] font-semibold tracking-[-0.03em] text-[var(--ink)]">{t}</div>
                <p className="mt-2 text-[13px] text-slate-600 leading-[1.65]">{d}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="bg-white py-8 md:py-10">
        <div className="soft-divider" />
      </div>
      <section data-reveal="section" className="relative section-pad bg-white overflow-hidden pb-20 md:pb-[140px] lg:pb-[180px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.08] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_76%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_16%,rgba(30,162,255,0.03),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(37,99,235,0.035),transparent_70%)]" />
        <div className="container-page relative z-10">
          <div data-reveal-item className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="rounded-[28px] bg-[#E2E8F0] p-px overflow-hidden h-full">
              <div className="relative bg-white p-6 sm:p-8 md:p-10 h-full">
                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/55" />
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-500">Press</div>
                    <h3 className="mt-4 text-[22px] md:text-[24px] font-semibold tracking-[-0.04em] text-[var(--ink)] leading-[1.12]">
                      Signals, coverage, and traction
                    </h3>
                    <p className="mt-3 text-[14px] text-slate-600 leading-[1.65] max-w-[66ch]">
                      We focus on shipping a real embedded category — recurring bills — with measurable activation outcomes.
                    </p>
                  </div>
                  <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">Fintech</span>
                </div>

                <div className="mt-8 rounded-[24px] bg-[#E2E8F0] p-px overflow-hidden">
                  <div className="grid sm:grid-cols-3 gap-px bg-[#E2E8F0]">
                  {[
                    ["lucide:newspaper", "Press", "Featured across fintech + banking"],
                    ["lucide:trophy", "Awards", "Innovation recognition (embedded)"],
                    ["lucide:link", "Partners", "Pre-integrated deployment paths"],
                  ].map(([ic, t, d]) => (
                    <div key={t} className="bg-white p-6">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-slate-200/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] text-blue-700/80">
                        <Icon icon={ic} width={18} height={18} />
                      </div>
                      <div className="mt-4 text-[14px] font-semibold tracking-[-0.02em] text-[var(--ink)]">{t}</div>
                      <p className="mt-2 text-[12.5px] text-slate-600 leading-[1.55]">{d}</p>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-[#E2E8F0] p-px overflow-hidden h-full">
              <div className="relative bg-white p-6 sm:p-8 md:p-10 flex flex-col h-full">
                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/55" />
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-500">Values</div>
                    <h3 className="mt-4 text-[22px] md:text-[24px] font-semibold tracking-[-0.04em] text-[var(--ink)] leading-[1.12]">
                      Trust-first product craft
                    </h3>
                    <p className="mt-3 text-[14px] text-slate-600 leading-[1.65]">
                      Quiet‑luxury UX with enterprise‑grade posture — built to deploy in regulated environments.
                    </p>
                  </div>
                  <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">Regulated</span>
                </div>

                <div className="mt-8 rounded-[24px] bg-[#E2E8F0] p-px overflow-hidden flex-1">
                  <div className="grid gap-px bg-[#E2E8F0]">
                    {[
                      ["lucide:shield-check", "Trust & security", "Encryption posture, auditability, and least-privilege access"],
                      ["lucide:heart-handshake", "Transparency for users", "No dark patterns; clear actions and outcomes"],
                      ["lucide:target", "Outcome-led design", "Activation metrics tied to ROI and retention lift"],
                    ].map(([ic, t, d]) => (
                      <div key={t} className="bg-white px-6 py-6 flex items-start gap-4">
                        <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-slate-200/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] text-blue-700/80">
                          <Icon icon={ic} width={18} height={18} style={{ strokeWidth: 1.5 }} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[14px] font-semibold text-[var(--ink)] leading-[1.25] tracking-[-0.02em]">{t}</div>
                          <p className="mt-2 text-[12.5px] text-slate-600 leading-[1.55]">{d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}