import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

type FeatureItemProps = {
  icon: string;
  title: string;
  points: string[];
  microHeader?: string;
  ctaLabel?: string;
  active?: boolean;
  revealDelayMs?: number;
  moduleId?: string;
};

export function FeatureItem({
  icon,
  title,
  points,
  microHeader,
  ctaLabel,
  active = false,
  revealDelayMs = 0,
  moduleId,
}: FeatureItemProps) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        delay: revealDelayMs / 1000,
        when: "beforeChildren" as const,
        staggerChildren: 0.10,
      },
    },
  };
  const child = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
  };
  const iconPop = {
    hidden: { opacity: 0, scale: 0.70 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 18, mass: 0.7 } },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <Card
        shadow="none"
        radius="lg"
        className="group elite-card h-full relative transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_8px_18px_rgba(2,6,23,0.05)]"
      >
        <CardBody className="p-6 md:p-7 flex flex-col gap-3">
          {microHeader ? (
            <motion.div variants={child} className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-500">
              {microHeader}
            </motion.div>
          ) : null}
          <div className="flex items-center gap-4">
            <motion.div variants={iconPop} className="relative">
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -inset-6 rounded-[22px] blur-2xl transition-opacity duration-300 ${
                  active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                }`}
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.32), transparent 70%)" }}
              />
              <div className="relative h-10 w-10 rounded-[14px] bg-blue-600/[0.05] border border-blue-600/[0.10] grid place-items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] transition-transform duration-300 group-hover:scale-[1.03]">
                <Icon icon={icon} width={20} height={20} className={active ? "text-blue-800" : "text-blue-700/80"} style={{ strokeWidth: 1.5 }} />
              </div>
            </motion.div>
            <motion.h3 variants={child} className="text-[15px] font-semibold tracking-[-0.03em] leading-[1.12] text-[var(--ink)]">
              {title}
            </motion.h3>
          </div>
          <div className="recessed-well recessed-well--inset p-5 mt-1">
            <motion.ul variants={child} className="space-y-2.5 text-slate-600">
              {points.slice(0, 2).map((p) => (
                <motion.li key={p} variants={child} className="flex items-start gap-2.5">
                  <Icon icon="lucide:check" width={16} height={16} className="text-blue-700/70 mt-[2px]" style={{ strokeWidth: 1.5 }} />
                  <span className="text-[12.5px] leading-[1.55]">{p}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          {ctaLabel ? (
            <motion.button variants={child} type="button" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              {ctaLabel}
              <Icon icon="lucide:arrow-right" width={16} height={16} />
            </motion.button>
          ) : null}
        </CardBody>
      </Card>
    </motion.div>
  );
}