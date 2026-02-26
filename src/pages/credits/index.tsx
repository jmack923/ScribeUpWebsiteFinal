import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouteLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useDemoModal } from "../../components/demo-modal-context";

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const basePath = base === "/" ? "" : base.replace(/\/$/, "");
  return `${basePath}/${path.replace(/^\//, "")}`;
}

function Odigit({
  n,
  h,
  w,
}: {
  n: number;
  h: number;
  w: number;
}) {
  const H = h;
  return (
    <span className="inline-block overflow-hidden" style={{ height: H, width: w }}>
      <motion.span
        className="block font-mono font-semibold tracking-[-0.06em] text-current"
        initial={{ y: 0 }}
        animate={{ y: -n * H }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ lineHeight: `${H}px` }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="block" style={{ height: H }}>
            {i}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function Odometer({
  value,
  digitHeight = 20,
  digitWidth = 12,
}: {
  value: number;
  digitHeight?: number;
  digitWidth?: number;
}) {
  const str = String(value);
  return (
    <div className="inline-flex items-center gap-0.5 tabular-nums">
      {str.split("").map((ch, idx) => (
        <span key={`${ch}-${idx}`}>
          {ch === "," ? (
            <span
              className="inline-block text-center font-mono font-semibold text-current"
              style={{ width: Math.max(8, Math.round(digitWidth * 0.45)) }}
            >
              ,
            </span>
          ) : (
            <Odigit n={Number(ch)} h={digitHeight} w={digitWidth} />
          )}
        </span>
      ))}
    </div>
  );
}

function LiveLedger({ variant = "light" }: { variant?: "light" | "dark" }) {
  const rows = [
    "+500 CREDITS // API_CALL_099",
    "-12 CREDITS // SUB_CANCEL_012",
    "+140 CREDITS // EVENT_WEBHOOK",
    "-60 CREDITS // PAY_UPDATER",
    "+310 CREDITS // MERCHANT_SCAN",
    "+48 CREDITS // ALERT_NUDGE",
  ];
  const doubled = [...rows, ...rows];
  const isDark = variant === "dark";
  return (
    <div
      className={`credits-ledger rounded-[14px] overflow-hidden ${
        isDark
          ? "border border-white/10 bg-white/5 backdrop-blur-[12px] shadow-[0_18px_54px_rgba(0,0,0,0.18)] text-slate-300/85"
          : "border border-slate-200/70 bg-white/80 backdrop-blur-[12px] shadow-[0_14px_40px_rgba(2,6,23,0.06)]"
      }`}
    >
      <div
        className={`px-3 py-2 flex items-center justify-between gap-3 ${
          isDark
            ? "border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]"
            : "border-b border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.75))]"
        }`}
      >
        <span className={isDark ? "text-slate-300/75" : "text-slate-500"}>LIVE_LEDGER</span>
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400/80 shadow-[0_0_0_4px_rgba(37,99,235,0.14)]" />
          <span className={isDark ? "text-slate-300/65" : "text-slate-400"}>STREAM</span>
        </span>
      </div>
      <div className="h-[78px] px-3 py-2">
        <div className="credits-ledger-track">
          {doubled.map((t, i) => (
            <div key={i} className="py-1 whitespace-nowrap">
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Credits() {
  const { openDemoModal } = useDemoModal();
  return (
    <div className="w-full page-shell credits-bg">
      {/* Hero */}
      <section className="relative border-b border-slate-200/70 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-[0.06]" />
          <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_12%_14%,rgba(239,246,255,0.52),transparent_70%),radial-gradient(40%_30%_at_88%_18%,rgba(239,246,255,0.42),transparent_72%)] opacity-[0.55]" />
        </div>
        <div className="container-page relative pt-[40px] md:pt-[60px] pb-[88px] md:pb-[92px]">
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="w-full">
              <h1 className="page-title tracking-[-0.04em] leading-[1.05]">
                A ledger-backed unit of value for embedded infrastructure.
              </h1>
              <p className="mt-5 text-slate-700 max-w-[70ch] text-[16px] md:text-[17.5px] leading-relaxed">
                Credits make usage predictable, auditable, and enterprise-ready across SDK, iFrame, and API surfaces.
              </p>

              <div className="mt-10 space-y-8">
                {/* Available balance: ledger header bar */}
                <div className="min-h-[112px] sm:h-[120px] rounded-[24px] border border-white/10 bg-[#020617]/80 backdrop-blur-[20px] shadow-[0_24px_80px_rgba(2,6,23,0.22)] px-5 sm:px-8 py-5 sm:py-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-200/80">
                        AVAILABLE_BALANCE
                      </div>
                      <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-blue-200/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400/90 shadow-[0_0_0_5px_rgba(37,99,235,0.18)] animate-pulse" />
                        LIVE_SYNC
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="text-white text-[42px] md:text-[46px] leading-none font-semibold tracking-[-0.04em]">
                        <Odometer value={5000} digitHeight={48} digitWidth={28} />
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.20em] text-slate-300/75">
                        <span>CREDITS</span>
                        <span className="h-1 w-1 rounded-full bg-slate-500/60" />
                        <span className="text-slate-400/75">CURRENCY_UNIT</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block w-[360px] shrink-0">
                    <LiveLedger variant="dark" />
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div className="credits-minted p-7 md:p-8">
                    <div className="flex items-start justify-between gap-6">
                      <div className="credits-pill">CREDITS_ENGINE</div>
                      <div className="hidden md:block">
                        <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-slate-500">
                          [ LEDGER_MODE: ENABLED ]
                        </div>
                      </div>
                    </div>

                    <div className="mt-7 grid sm:grid-cols-3 gap-6">
                    {[
                      { ic: "lucide:shield-check", t: "Auditable", d: "Ledger-friendly metadata and predictable accounting." },
                      { ic: "lucide:activity", t: "Live", d: "Usage reads like a system health signal, not a bill shock." },
                      { ic: "lucide:sliders", t: "Configurable", d: "Align spend with integration surfaces and outcomes." },
                    ].map((c) => (
                      <div key={c.t} className="flex items-start gap-4">
                        <div className="credits-icon-well shrink-0 grid place-items-center !h-[56px] !w-[56px] !rounded-[18px]">
                          <Icon icon={c.ic} width={20} height={20} className="text-blue-700/85" style={{ strokeWidth: 1.5 }} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[15px] font-bold tracking-[-0.02em] text-[var(--ink)]">{c.t}</div>
                          <p className="mt-1 text-[13px] leading-[1.75] text-slate-600">{c.d}</p>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>

                  <div className="credits-minted p-7 md:p-8">
                    <div className="credits-pill">PRICING_LOGIC</div>
                    <div className="mt-5 text-[11px] font-mono uppercase tracking-[0.14em] text-slate-500">
                      COMPLIANCE_ID: CREDITS_LEDGER_v1.0
                    </div>
                    <p className="mt-4 text-[15px] leading-[1.75] text-slate-700">
                      Credits attach to real product actions (scan, update, cancel, enrich). One unit system across integration paths.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button
                        color="primary"
                        className="nav-btn-base btn-s-tier btn-s-tier-primary btn-arrow-lead !h-[44px] !px-6 text-[13.5px] font-semibold"
                        endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                        onClick={openDemoModal}
                      >
                        Book a demo
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="md:hidden">
                  <LiveLedger variant="light" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition */}
      <section className="relative py-[80px] md:py-[120px]">
        <div className="credits-hairline" />
      </section>

      {/* Who We Serve */}
      <section className="relative pb-[var(--section-padding)]">
        <div className="container-page">
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="w-full max-w-[70ch]">
              <div className="text-[11px] font-bold uppercase tracking-[0.20em] text-slate-500">
                Who we serve
              </div>
              <h2 className="mt-6 section-title tracking-[-0.04em] text-[var(--ink)] leading-[1.05]">
                Same credits engine. Different environments.
              </h2>
              <p className="mt-4 text-slate-700 max-w-2xl text-[16px] leading-[1.75]">
                Fintech, Credit Unions, and Banks each get a tailored surface — but the ledger logic stays consistent.
              </p>
            </div>

            {/* Open-air ledger grid (vertical keylines) */}
            <div className="mt-12 credits-minted credits-ledger-grid overflow-hidden">
              <div className="grid md:grid-cols-[1fr_1px_1fr_1px_1fr]">
                {[
                  {
                    key: "fintech",
                    pill: "Fintech",
                    ic: "lucide:cpu",
                    title: "Agile product velocity",
                    credits: "10,000",
                    meta: "API_RATE_LIMIT: HIGH",
                    specs: [
                      ["Pilot access", "Instant"],
                      ["Event stream", "Real‑time"],
                      ["Integrations", "SDK / API"],
                    ],
                    cta: { label: "Explore fintechs", to: "/who-we-serve/fintechs" },
                    cls: "credits-tier credits-tier-fintech",
                  },
                  {
                    key: "cu",
                    pill: "Credit Unions",
                    ic: "lucide:landmark",
                    title: "Member-first stability",
                    credits: "25,000",
                    meta: "LEDGER_SYNC: REAL_TIME",
                    specs: [
                      ["Member UX", "Embedded"],
                      ["Rollout", "30–45 days"],
                      ["Controls", "Audit-ready"],
                    ],
                    cta: { label: "See CU rollout", to: "/who-we-serve/credit-unions" },
                    cls: "credits-tier credits-tier-cu",
                  },
                  {
                    key: "banks",
                    pill: "Banks",
                    ic: "lucide:shield",
                    title: "Institutional scale",
                    credits: "50,000",
                    meta: "ENTITY_TYPE: TIER_1",
                    specs: [
                      ["Governance", "Tier‑1"],
                      ["Compliance", "SOC2 / PCI / ISO"],
                      ["Deployment", "Platform-ready"],
                    ],
                    cta: { label: "Explore banks", to: "/who-we-serve/banks" },
                    cls: "credits-tier credits-tier-bank",
                  },
                ].flatMap((c, idx, arr) => {
                  const col = (
                    <div key={c.key} className={`${c.cls} p-6 md:p-7 flex flex-col min-h-[280px]`}>
                      <div className="flex items-start justify-between gap-6">
                        <div className="credits-pill">{c.pill}</div>
                        <div className="credits-icon-well grid place-items-center shrink-0 !h-[56px] !w-[56px] !rounded-[18px]">
                          <Icon icon={c.ic} width={20} height={20} className="text-blue-700/85" style={{ strokeWidth: 1.5 }} />
                        </div>
                      </div>

                      <div className="mt-6 min-h-[44px]">
                        <h3 className="text-[16px] font-bold tracking-[-0.03em] text-[var(--ink)] leading-[1.15]">
                          {c.title}
                        </h3>
                      </div>

                      <div className="mt-5">
                        <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-500">[ CREDITS ]</div>
                        <div className="mt-1 text-[32px] md:text-[38px] leading-none font-semibold text-[#0F172A] credits-value">
                          {c.credits}
                        </div>
                        <div className="mt-3 text-[10px] font-mono uppercase tracking-[0.14em] text-blue-700/65">
                          {c.meta}
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {c.specs.map(([k, v]) => (
                          <span
                            key={k}
                            className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/70 px-2.5 py-1 text-[9.5px] font-mono uppercase tracking-[0.14em] text-slate-600"
                          >
                            [ {k.replace(/\s+/g, "_").toUpperCase()}: {String(v).replace(/\s+/g, "_").toUpperCase()} ]
                          </span>
                        ))}
                      </div>

                      <div className="mt-7 text-[10px] font-mono uppercase tracking-[0.14em] text-slate-500">
                        COMPLIANCE_ID: CREDITS_ENGINE_v1
                      </div>

                      <div className="mt-auto pt-6">
                        <Button
                          as={RouteLink as any}
                          to={c.cta.to}
                          color="primary"
                          className="nav-btn-base btn-s-tier btn-s-tier-primary btn-arrow-lead !h-[42px] !px-6 text-[12.5px] font-semibold w-full sm:w-fit"
                          endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={17} height={17} style={{ strokeWidth: 1.5 }} />}
                        >
                          {c.cta.label}
                        </Button>
                      </div>
                    </div>
                  );
                  const divider =
                    idx < arr.length - 1 ? <div key={`${c.key}-div`} className="hidden md:block credits-keyline w-px" /> : null;
                  return divider ? [col, divider] : [col];
                })}
              </div>
            </div>

            {/* Perspective mockup */}
            <div className="mt-14 credits-minted p-7 md:p-8">
              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-[0.20em] text-slate-500">
                    Perspective
                  </div>
                  <h3 className="mt-6 text-[20px] md:text-[22px] font-bold tracking-[-0.04em] text-[var(--ink)] leading-[1.05]">
                    Fintech view ↔ Institutional view
                  </h3>
                  <p className="mt-3 text-sm text-slate-700 leading-relaxed max-w-[70ch]">
                    The same credits ledger bridges high-velocity product teams and regulated operational governance.
                  </p>
                </div>
                <div className="justify-self-start lg:justify-self-end w-full max-w-[360px]">
                  <LiveLedger variant="light" />
                </div>
              </div>

              <div className="mt-8 relative">
                <div className="grid lg:grid-cols-2 gap-6 items-stretch">
                  <div className="rounded-[18px] border border-slate-200/70 bg-[#0B1020] text-slate-100 overflow-hidden shadow-[0_18px_54px_rgba(2,6,23,0.16)] min-h-[220px] flex flex-col">
                    <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4">
                    <div className="text-[10px] font-mono tracking-[0.14em] text-slate-300/80">FINTECH_VIEW</div>
                    </div>
                    <div className="p-5 flex-1">
                      <pre className="text-[11px] leading-[1.65] font-mono text-slate-200/90 whitespace-pre-wrap">{`+500 CREDITS  // API_CALL_099
-12  CREDITS  // SUB_CANCEL_012
+140 CREDITS  // EVENT_WEBHOOK
-60  CREDITS  // PAY_UPDATER`}</pre>
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-slate-200/70 bg-white/90 overflow-hidden shadow-[0_18px_54px_rgba(2,6,23,0.10)] min-h-[220px] flex flex-col">
                    <div className="h-10 border-b border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,250,252,0.8))] flex items-center px-4">
                    <div className="text-[10px] font-mono tracking-[0.14em] text-slate-500">INSTITUTIONAL_VIEW</div>
                    </div>
                    <div className="p-5 flex-1">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          ["SOC 2", "Ready"],
                          ["PCI", "Validated"],
                          ["ISO", "Aligned"],
                          ["Audit", "Enabled"],
                        ].map(([k, v]) => (
                          <div key={k} className="rounded-[14px] border border-slate-200/70 bg-white p-3">
                            <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-500">{k}</div>
                            <div className="mt-1 text-[13px] font-semibold tracking-[-0.02em] text-slate-800">{v}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.14em] text-slate-500">
                        COMPLIANCE_ID: BANK_GRADE_v4.2
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="h-12 w-12 rounded-full border border-blue-600/25 bg-blue-600/10 grid place-items-center shadow-[0_18px_54px_rgba(37,99,235,0.18)]">
                    <Icon icon="lucide:activity" width={20} height={20} className="text-blue-700/90" style={{ strokeWidth: 1.5 }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Button
                as={RouteLink as any}
                to="/who-we-serve/banks"
                variant="flat"
                className="nav-btn-base btn-s-tier btn-s-tier-ghost btn-arrow-lead !h-[46px] !px-8 text-[13.5px] font-semibold border border-blue-600/20 bg-white/70 text-slate-900"
                endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} style={{ strokeWidth: 1.5 }} />}
              >
                Explore Who We Serve
              </Button>
            </div>

            <div className="mt-12 credits-rate-tag">[ RATE_TABLE_STABLE_v2.01 ]</div>
          </div>
        </div>
      </section>

      {/* Footer bridge */}
      <div aria-hidden="true" className="credits-footer-bridge" />
    </div>
  );
}

