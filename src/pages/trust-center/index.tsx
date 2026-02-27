import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { useDemoModal } from "../../components/demo-modal-context";

export default function TrustCenter() {
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
              <p className="wayfinder">Security</p>
              <h1 className="mt-8 page-title tracking-[-0.06em] leading-[1.05]">Trust Center</h1>
              <p className="mt-6 copy-lede max-w-[72ch]">
                Controls, certifications, and operating practices — designed for regulated environments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <Button
                variant="flat"
                color="default"
                className="nav-btn-base nav-btn-primary btn-sheen btn-arrow-lead !h-[40px] !px-6 text-[12.5px] font-semibold whitespace-nowrap !rounded-[8px]"
                onClick={openDemoModal}
              >
                Request trust packet
              </Button>
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

