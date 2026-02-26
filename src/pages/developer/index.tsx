import React from "react";
import { Button, Alert } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";
import { useDemoModal } from "../../components/demo-modal-context";
import { Magnetic } from "../../components/magnetic";

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const basePath = base === "/" ? "" : base.replace(/\/$/, "");
  return `${basePath}/${path.replace(/^\//, "")}`;
}

export default function Developer() {
  const { openDemoModal } = useDemoModal();
  const [activeModule, setActiveModule] = React.useState(0);
  const reducedMotion = useReducedMotion();

  const modules = [
    {
      kicker: "Step 01",
      title: "Install + auth",
      detail: "Drop in the SDK and initialize with your client credentials.",
      method: "SDK",
      methodTone: "bg-emerald-500/12 text-emerald-700 border-emerald-600/20",
      icon: "lucide:package",
    },
    {
      kicker: "Step 02",
      title: "Mount the embedded UI",
      detail: "SDK widget or iFrame — ships inside your existing experience.",
      method: "POST",
      methodTone: "bg-blue-600/10 text-blue-700 border-blue-600/20",
      icon: "lucide:layout-template",
    },
    {
      kicker: "Step 03",
      title: "Subscribe to events",
      detail: "Webhooks + events to drive nudges, actions, and analytics safely.",
      method: "EVENTS",
      methodTone: "bg-blue-600/10 text-blue-700 border-blue-600/20",
      icon: "lucide:webhook",
    },
  ] as const;

  return (
    <div className="w-full page-shell bg-[#F8FAFC]">
      <section id="integration" className="relative overflow-hidden border-b border-slate-200/70">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 dev-radar opacity-[0.16] [mask-image:radial-gradient(60%_60%_at_50%_18%,black,transparent_72%)]" />
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-[0.05]" />
          <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_12%,rgba(37,99,235,0.04),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(30,162,255,0.035),transparent_70%)]" />
        </div>

        <div className="container-page pt-32 md:pt-44 pb-16 md:pb-[120px]">
          <div className="mx-auto w-full max-w-[1200px] grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <motion.div
              className="lg:col-span-6 text-center lg:text-left"
              initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.995 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm text-slate-600"
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 !px-3 !py-1.5 !text-[11px]">Built for engineers</span>
                <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 !px-3 !py-1.5 !text-[11px]">30–45 day integration</span>
                <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 !px-3 !py-1.5 !text-[11px]">SDK + iFrame</span>
              </motion.div>

              <motion.h1
                className="mt-8 page-title tracking-[-0.06em] leading-[1.05]"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                Integration &amp; implementation
              </motion.h1>
              <motion.p
                className="mt-5 copy-hero-sm max-w-2xl mx-auto lg:mx-0"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                Clear implementation paths, clean surfaces, and enterprise-ready controls to ship bill management fast while meeting compliance, rollout, and experimentation requirements.
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-3 w-full sm:w-auto justify-center lg:justify-start">
                <Magnetic strength={8} radius={40}>
                  <Button
                    color="primary"
                    className="nav-btn-base btn-s-tier btn-s-tier-primary btn-arrow-lead !w-full sm:!w-auto !h-[38px] sm:!h-[36px] !px-6 sm:!px-8 text-[13px] font-semibold"
                    startContent={<Icon icon="lucide:calendar" width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                    endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                    onClick={openDemoModal}
                  >
                    Book a demo
                  </Button>
                </Magnetic>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-6 lg:justify-self-end w-full max-w-[420px] hidden lg:block lg:mt-10 xl:mt-12"
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative rounded-[28px] border border-slate-200/70 bg-white/70 backdrop-blur-[10px] shadow-[0_18px_60px_rgba(2,6,23,0.08)] overflow-hidden">
                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/55" />
                {reducedMotion ? null : (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-y-8 -left-24 w-44 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.78),rgba(37,99,235,0.12),transparent)] opacity-40"
                    animate={{ x: [0, 220] }}
                    transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatType: "mirror" }}
                  />
                )}
                <div className="px-6 py-5 border-b border-slate-200/70 bg-white/60">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-[11px] font-semibold tracking-[-0.01em] text-slate-700">Integration preview</div>
                    <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">SDK + iFrame</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="rounded-[22px] bg-[#E2E8F0] p-px overflow-hidden">
                    <div className="grid grid-cols-2 gap-px bg-[#E2E8F0]">
                      {[
                        { icon: "lucide:package", label: "SDK" },
                        { icon: "lucide:layout-template", label: "iFrame" },
                        { icon: "lucide:plug", label: "API" },
                        { icon: "lucide:webhook", label: "Events" },
                      ].map((t, idx) => (
                        <motion.div
                          key={t.label}
                          className="bg-white p-4 flex items-center gap-3 transition-colors duration-300 hover:bg-slate-50/70"
                          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.1 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                          whileHover={reducedMotion ? undefined : { y: -1 }}
                        >
                          <span className="h-9 w-9 rounded-[14px] border border-slate-200/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.70)] grid place-items-center">
                            <Icon icon={t.icon} width={16} height={16} className="text-blue-700/75" style={{ strokeWidth: 1.4 }} />
                          </span>
                          <div className="text-[12.5px] font-semibold text-[var(--ink)]">{t.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="container-page">
          <div aria-hidden="true" className="mt-3 md:mt-4 hero-sep" />
        </div>
      </section>

      {/* API Blueprint / shared-wall bento */}
      <section id="implementation" className="relative py-20 sm:py-24 md:py-[120px] overflow-hidden border-b border-slate-200/70">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 dev-radar opacity-[0.08] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_74%)]" />
        <div className="container-page relative z-10">
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="text-center lg:text-left">
              <motion.p
                className="wayfinder w-fit mx-auto lg:mx-0"
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                Implementation
              </motion.p>
              <motion.h2
                className="mt-8 section-title"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                Ship the embedded experience — without rewriting your stack.
              </motion.h2>
              <motion.p
                className="mt-5 copy-lede max-w-2xl mx-auto lg:mx-0"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                A clean surface area: SDK/iFrame UI, endpoints, and events that work in regulated environments.
              </motion.p>
              <motion.div
                aria-hidden="true"
                className="mt-7 h-px w-full max-w-[760px] bg-slate-200/80 origin-center lg:origin-left mx-auto lg:mx-0"
                initial={reducedMotion ? false : { opacity: 0, scaleX: 0.94 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.58, delay: 0.10, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <motion.div
              className="mt-12"
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rounded-[28px] bg-[#E2E8F0] p-px overflow-hidden">
                <div className="grid grid-cols-1 gap-px bg-[#E2E8F0]">
                  {modules.map((m, idx) => {
                    const active = idx === activeModule;
                    return (
                      <motion.button
                        key={m.title}
                        type="button"
                        onClick={() => setActiveModule(idx)}
                        className={`dev-module text-left bg-white p-6 md:p-8 transition-colors ${
                          active ? "dev-module--active bg-[#EFF6FF]" : "hover:bg-slate-50"
                        }`}
                        initial={reducedMotion ? false : { opacity: 0, y: 12, x: idx % 2 === 0 ? -8 : 8 }}
                        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                        whileHover={reducedMotion ? undefined : { y: -2, scale: 1.0015 }}
                      >
                        <span aria-hidden="true" className={`absolute top-0 left-0 right-0 h-[2px] ${active ? "bg-blue-500/55" : "bg-transparent"}`} />
                        <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-blue-700/65">
                          SDK / IFRAME
                        </div>
                        <div className="flex items-start justify-between gap-4 mt-2">
                          <div className="min-w-0">
                            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                              {m.kicker}
                            </div>
                            <div className="mt-2 flex items-center gap-3">
                              <div className="h-9 w-9 rounded-[14px] border border-slate-200/70 bg-white/80 grid place-items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                                <Icon icon={m.icon} width={17} height={17} className="text-blue-700/80" style={{ strokeWidth: 1.5 }} />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-[15px] md:text-[15.5px] font-semibold tracking-[-0.03em] text-[var(--ink)]">
                                    {m.title}
                                  </h3>
                                  <span className={`inline-flex items-center h-6 px-2.5 rounded-full border text-[10px] font-mono uppercase tracking-[0.16em] ${m.methodTone}`}>
                                    {m.method}
                                  </span>
                                </div>
                                <p className="mt-1.5 text-[12.5px] text-slate-600 leading-[1.6]">
                                  {m.detail}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security / compliance + rollout */}
      <section id="security" className="relative py-20 sm:py-24 md:py-[120px] overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 dev-radar opacity-[0.05] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_76%)]" />
        <div className="container-page relative z-10">
          <div className="mx-auto max-w-[1000px]">
              <div className="text-center lg:text-left">
                <motion.p
                  className="wayfinder w-fit mx-auto lg:mx-0"
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  Security &amp; Compliance
                </motion.p>
                <motion.h2
                  className="mt-8 section-title"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  Security &amp; Compliance
                </motion.h2>
              </div>
              <div className="mt-12 rounded-[28px] bg-[#E2E8F0] p-px overflow-hidden">
                <div className="grid md:grid-cols-2 gap-px bg-[#E2E8F0]">
                  <motion.div
                    className="relative bg-white p-7 md:p-10 hover:shadow-[0_0_0_2px_rgba(37,99,235,0.06)] transition-[box-shadow,transform] duration-500"
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={reducedMotion ? undefined : { y: -2 }}
                  >
                    <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/55 opacity-45" />
                    <span
                      aria-hidden="true"
                      className="absolute top-7 right-7 md:top-10 md:right-10 inline-flex h-6 w-6 items-center justify-center rounded-[10px] border border-blue-600/30"
                    >
                      <span className="h-2.5 w-2.5 rotate-45 border border-blue-600/55" />
                    </span>
                    <ul className="space-y-2.5 text-default-700">
                      {[
                        ["lucide:shield-check", "PCI & SOC2 compliant"],
                        ["lucide:lock", "Data encryption at rest and in transit"],
                        ["lucide:list-checks", "Enterprise DPA & vendor security reviews"],
                      ].map(([icon, label], idx) => (
                        <motion.li
                          key={label}
                          className="flex items-start gap-2"
                          initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                          whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.8 }}
                          transition={{ duration: 0.45, delay: 0.04 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Icon icon={icon} className="text-primary mt-1" />
                          {label}
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.75 }}
                      transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Alert
                        className="mt-5"
                        title="Pilot-ready"
                        description="We support pilot launches, A/B testing, and phased rollouts."
                        color="success"
                        variant="flat"
                        isVisible
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="relative bg-white p-7 md:p-10 hover:shadow-[0_0_0_2px_rgba(37,99,235,0.06)] transition-[box-shadow,transform] duration-500"
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                    whileHover={reducedMotion ? undefined : { y: -2 }}
                  >
                    <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/55 opacity-45" />
                    <div className="flex items-start justify-between gap-6">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Launch plan</div>
                      <span aria-hidden="true" className="inline-flex h-6 w-6 items-center justify-center rounded-[10px] border border-blue-600/30">
                        <span className="h-2.5 w-2.5 rotate-45 border border-blue-600/55" />
                      </span>
                    </div>
                    <div className="mt-2 text-[20px] md:text-[22px] font-semibold tracking-[-0.04em] text-[var(--ink)] leading-[1.15]">
                      From kickoff to embedded launch
                    </div>
                    <p className="mt-2 copy-body max-w-[60ch]">
                      30–45 day rollout with pre-integrated paths. Prove value fast with clean activation + outcomes.
                    </p>

                    <div className="mt-6 recessed-well p-6 md:p-7">
                      <div className="mt-1.5 grid grid-cols-3 gap-2">
                        {[
                          ["Plan", "Week 1"],
                          ["Integrate", "Weeks 2–4"],
                          ["Launch", "Weeks 5–6"],
                        ].map(([label, sub], idx) => (
                          <motion.div
                            key={label}
                            className="rounded-[14px] border border-slate-200/70 bg-white/70 p-3 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(2,6,23,0.05)]"
                            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.8 }}
                            transition={{ duration: 0.45, delay: 0.06 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="text-xs font-semibold text-slate-700">{label}</div>
                            <p className="mt-1 copy-subtle">{sub}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Magnetic strength={8} radius={40}>
                        <Button
                          color="primary"
                          className="nav-btn-base btn-s-tier btn-s-tier-primary btn-arrow-lead !h-[36px] !px-8 text-[13px] font-semibold"
                          endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} />}
                          onClick={openDemoModal}
                        >
                          Book a demo
                        </Button>
                      </Magnetic>
                    </div>
                  </motion.div>
                </div>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}
