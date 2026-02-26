import React from "react";
import { motion } from "framer-motion";
import { Link as RouteLink } from "react-router-dom";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useDemoModal } from "../../components/demo-modal-context";

const bullets = [
  { icon: "lucide:lock", title: "Encryption", desc: "Encryption in transit and at rest for sensitive data flows." },
  { icon: "lucide:key", title: "Access controls", desc: "Least-privilege access, auditing, and secure key handling." },
  { icon: "lucide:radar", title: "Monitoring", desc: "Continuous monitoring with incident response procedures." },
  { icon: "lucide:shield-check", title: "Compliance posture", desc: "Designed for fintech and regulated environments." },
];

export default function Security() {
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
              <h1 className="mt-8 page-title tracking-[-0.06em] leading-[1.05]">Security overview</h1>
              <p className="mt-6 copy-lede max-w-[72ch]">
                A concise overview of how ScribeUp approaches security for embedded bill management infrastructure.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 rounded-[28px] bg-[#E2E8F0] p-px overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 gap-px bg-[#E2E8F0]">
                {bullets.map((b) => (
                  <div key={b.title} className="bg-white p-7 md:p-8">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-[16px] border border-slate-200/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                      <Icon icon={b.icon} width={18} height={18} className="text-blue-700/75" style={{ strokeWidth: 1.5 }} />
                    </div>
                    <div className="mt-4 text-[16px] font-semibold tracking-[-0.03em] text-[var(--ink)]">{b.title}</div>
                    <div className="mt-2 text-[13.5px] leading-[1.65] text-slate-600 max-w-[60ch]">{b.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <Button
                variant="flat"
                color="default"
                className="nav-btn-base nav-btn-primary btn-sheen btn-arrow-lead !h-[40px] !px-6 text-[12.5px] font-semibold whitespace-nowrap !rounded-[8px]"
                onClick={openDemoModal}
              >
                Request security packet
              </Button>
              <Button
                as={RouteLink as any}
                to="/soc2"
                variant="flat"
                color="default"
                className="nav-btn-base btn-s-tier btn-arrow-lead !h-[40px] !px-6 text-[12.5px] font-semibold whitespace-nowrap !rounded-[8px] border border-slate-200/70 bg-white hover:bg-slate-50"
              >
                SOC 2 details
              </Button>
              <Button
                as={RouteLink as any}
                to="/trust-center"
                variant="light"
                className="group h-[40px] px-6 rounded-[8px] border border-slate-200/70 bg-white/60 hover:bg-white text-[12.5px] font-semibold text-slate-700 transition-all"
                endContent={<Icon icon="lucide:arrow-right" width={16} height={16} className="text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />}
              >
                Trust Center
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

