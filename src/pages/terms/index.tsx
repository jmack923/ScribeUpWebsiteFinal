import React from "react";
import { motion } from "framer-motion";
import { Link as RouteLink } from "react-router-dom";
import { Button } from "@heroui/react";
import { useDemoModal } from "../../components/demo-modal-context";

export default function Terms() {
  const { openDemoModal } = useDemoModal();

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
              <p className="wayfinder">Legal</p>
              <h1 className="mt-8 page-title tracking-[-0.06em] leading-[1.05]">Terms of Service</h1>
              <p className="mt-6 copy-lede max-w-[72ch]">
                ScribeUp’s terms are provided as part of institutional onboarding and partner agreements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 rounded-[28px] border border-slate-200/70 bg-white p-7 md:p-8"
            >
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">Request</div>
              <div className="mt-3 text-[15px] leading-[1.7] text-slate-700 max-w-[78ch]">
                If you need the latest Terms of Service, we’ll send the correct version for your environment (fintech,
                credit union, or bank) along with the trust and implementation packet.
              </div>

              <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Button
                  variant="flat"
                  color="default"
                  className="nav-btn-base nav-btn-primary btn-sheen btn-arrow-lead !h-[40px] !px-6 text-[12.5px] font-semibold whitespace-nowrap !rounded-[8px]"
                  onClick={openDemoModal}
                >
                  Request terms packet
                </Button>
                <Button
                  as={RouteLink as any}
                  to="/privacy"
                  variant="flat"
                  color="default"
                  className="nav-btn-base btn-s-tier btn-arrow-lead !h-[40px] !px-6 text-[12.5px] font-semibold whitespace-nowrap !rounded-[8px] border border-slate-200/70 bg-white hover:bg-slate-50"
                >
                  View Privacy Policy
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

