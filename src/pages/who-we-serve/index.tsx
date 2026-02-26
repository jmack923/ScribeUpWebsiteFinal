import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouteLink } from "react-router-dom";
import { useDemoModal } from "../../components/demo-modal-context";
import { SEGMENTS, SEGMENT_SLUGS, type SegmentSlug } from "./segment-data";
import { motion, useReducedMotion } from "framer-motion";

const SEGMENT_PATHS: Record<SegmentSlug, string> = {
  banks: "/who-we-serve/banks",
  "credit-unions": "/who-we-serve/credit-unions",
  fintechs: "/who-we-serve/fintechs",
};

export default function WhoWeServe() {
  const { openDemoModal } = useDemoModal();
  const reducedMotion = useReducedMotion();

  return (
    <div className="w-full page-shell">
      <section className="relative border-b border-slate-200/70 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-white" />
        </div>
        <div className="container-page page-hero-pad relative text-center lg:text-left">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 10, scale: 0.997 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              className="wayfinder w-fit mx-auto lg:mx-0"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              Who we serve
            </motion.p>
            <motion.h1
              className="mt-8 page-title max-w-4xl leading-[1.05]"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              Who ScribeUp is for: <span className="elite-em">banks</span>, credit unions, and fintechs
            </motion.h1>
            <motion.p
              className="mt-5 copy-hero max-w-2xl mx-auto lg:mx-0"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              If you serve consumers, recurring bills matter. Choose a segment to see how ScribeUp drives retention,
              engagement, and primacy outcomes with an embedded recurring bill experience.
            </motion.p>
            <motion.div
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm text-slate-600"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-[11px] sm:text-[12px] text-slate-600 bg-white shadow-sm border-slate-200/60 break-words">PCI & SOC 2 compliant</span>
              <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-[11px] sm:text-[12px] text-slate-600 bg-white shadow-sm border-slate-200/60 break-words">
                Pre-integrated: Q2, Alkami, Lumin, Banno, Candescent
              </span>
            </motion.div>
          </motion.div>
        </div>
        <div className="container-page">
          <div aria-hidden="true" className="hero-sep" />
        </div>
      </section>

      <section data-reveal="section" className="relative section-pad bg-[#F8FAFC] overflow-hidden border-t border-slate-200/60">
        <div className="container-page">
          <div className="rounded-[28px] bg-[#E2E8F0] p-px overflow-hidden">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E2E8F0]">
              {SEGMENT_SLUGS.map((slug) => {
                const segment = SEGMENTS[slug];
                const to = SEGMENT_PATHS[slug];
                return (
                  <RouteLink
                    key={slug}
                    to={to}
                    className="group relative bg-white p-6 sm:p-8 md:p-9 flex flex-col items-start transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-slate-50/60"
                  >
                    <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-[#2563EB]/18" />
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-[16px] border border-slate-200/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] text-blue-700/85">
                      <Icon icon={segment.icon} width={20} height={20} style={{ strokeWidth: 1.5 }} />
                    </div>
                    <h3 className="mt-5 text-[16px] font-semibold tracking-[-0.03em] text-[var(--ink)]">{segment.title}</h3>
                    <p className="mt-2 text-[13px] text-slate-600 leading-[1.65] flex-1">
                      See how ScribeUp drives retention, primacy, and conversion for {segment.title.toLowerCase()}.
                    </p>
                    {segment.badge ? (
                      <span className="mt-4 inline-flex items-center rounded-full border border-blue-600/15 bg-[#EFF6FF] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.70)]">
                        {segment.badge}
                      </span>
                    ) : null}
                    <span className="mt-auto pt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-blue-700 transition-[transform,gap] duration-300 group-hover:gap-2.5">
                      View segment
                      <Icon icon="lucide:arrow-right" width={14} height={14} style={{ strokeWidth: 1.5 }} />
                    </span>
                  </RouteLink>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="bg-white py-8 md:py-10">
        <div className="soft-divider" />
      </div>
      <section data-reveal="section" className="relative section-pad bg-white overflow-hidden pb-20 md:pb-[140px] lg:pb-[180px]">
        <div className="container-page relative z-10">
          <div className="w-full max-w-[1100px] mx-auto">
            <div className="rounded-[28px] bg-[#E2E8F0] p-px overflow-hidden">
              <div className="relative bg-white p-6 sm:p-10 md:p-14 overflow-hidden">
                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-[#2563EB]/18" />
                <div className="flex flex-col md:flex-row items-start justify-between gap-10">
                  <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
                    <p className="wayfinder w-fit mx-auto md:mx-0">Next steps</p>
                    <h3 className="mt-8 section-title leading-[1.08] mx-auto md:mx-0">
                      See your segment&apos;s flow inside the app.
                    </h3>
                    <p className="mt-6 copy-lede mx-auto md:mx-0">
                      We&apos;ll walk through the embedded experience and the deployment path inside your stack.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
                    <Button
                      as={RouteLink as any}
                      to="/solution"
                      variant="flat"
                      color="default"
                      className="nav-btn-base btn-s-tier btn-arrow-lead !w-full sm:!w-auto !h-[40px] !px-7 text-[13px] font-semibold border border-slate-200/70 bg-white hover:bg-slate-50"
                      endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                    >
                      Learn more
                    </Button>
                    <Button
                      color="primary"
                      className="nav-btn-base btn-s-tier btn-s-tier-primary btn-arrow-lead !w-full sm:!w-auto !h-[40px] !px-7 text-[13px] font-semibold"
                      startContent={<Icon icon="lucide:calendar" width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                      endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                      onClick={openDemoModal}
                    >
                      Book a demo
                    </Button>
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
