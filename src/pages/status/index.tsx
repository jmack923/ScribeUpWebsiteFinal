import React from "react";
import { motion } from "framer-motion";
import { Link as RouteLink } from "react-router-dom";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function Status() {
  return (
    <div className="w-full page-shell bg-white">
      <section className="relative border-b border-slate-200/70 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-[0.05]" />
          <div className="absolute inset-0 distance-grid opacity-[0.02]" />
        </div>

        <div className="container-page page-hero-pad relative z-10">
          <div className="mx-auto w-full max-w-[980px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="wayfinder">Security</p>
              <h1 className="mt-8 page-title tracking-[-0.06em] leading-[1.05]">System status</h1>
              <p className="mt-6 copy-lede max-w-[72ch]">
                If you’re seeing an incident, we’ll surface it here. For onboarding, trust, or evidence requests, use the Trust Center.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 rounded-[28px] border border-slate-200/70 bg-white p-7 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-[16px] border border-slate-200/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                  <Icon icon="lucide:activity" width={18} height={18} className="text-emerald-700/75" style={{ strokeWidth: 1.5 }} />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">Current</div>
                  <div className="mt-2 text-[16px] font-semibold tracking-[-0.03em] text-[var(--ink)]">
                    No active incidents
                  </div>
                  <div className="mt-2 text-[13.5px] leading-[1.65] text-slate-600 max-w-[78ch]">
                    If you believe you’re experiencing an issue, contact support via your institutional channel or request a packet through the Trust Center.
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Button
                  as={RouteLink as any}
                  to="/trust-center"
                  variant="flat"
                  color="default"
                  className="nav-btn-base btn-s-tier btn-arrow-lead !h-[40px] !px-6 text-[12.5px] font-semibold whitespace-nowrap !rounded-[8px] border border-slate-200/70 bg-white hover:bg-slate-50"
                >
                  Trust Center
                </Button>
                <Button
                  as={RouteLink as any}
                  to="/security"
                  variant="flat"
                  color="default"
                  className="nav-btn-base btn-s-tier btn-arrow-lead !h-[40px] !px-6 text-[12.5px] font-semibold whitespace-nowrap !rounded-[8px] border border-slate-200/70 bg-white hover:bg-slate-50"
                >
                  Security overview
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container-page">
          <div aria-hidden="true" className="hero-sep" />
        </div>
      </section>
    </div>
  );
}

