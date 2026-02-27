import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouteLink } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useDemoModal } from "../../components/demo-modal-context";
import { Magnetic } from "../../components/magnetic";
import { PlatformPartnersCarousel } from "../../components/platform-partners-carousel";
import { CreditUnionsValueSection } from "./CreditUnionsValueSection";
import { ServePanel } from "./ServePanel";
import { getSegmentBySlug, type SegmentSlug } from "./segment-data";

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const basePath = base === "/" ? "" : base.replace(/\/$/, "");
  return `${basePath}/${path.replace(/^\//, "")}`;
}

function CategoryPageShell({ slug }: { slug: SegmentSlug }) {
  const { openDemoModal } = useDemoModal();
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  const segment = getSegmentBySlug(slug);

  const isFintech = slug === "fintechs";
  const isCreditUnions = slug === "credit-unions";
  const isBanks = slug === "banks";
  const bankActivationCards = [
    {
      icon: "lucide:scan-search",
      title: "Embedded tracking",
      desc: "Track recurring bills across cards and accounts from external institutions.",
    },
    {
      icon: "lucide:sparkles",
      title: "Auto-detect subscriptions",
      desc: "Surface hidden subscriptions and recurring charges with no manual setup.",
    },
    {
      icon: "lucide:bell-ring",
      title: "Proactive due-date alerts",
      desc: "Keep users ahead of upcoming bills and reduce avoidable payment stress.",
    },
    {
      icon: "lucide:mouse-pointer-click",
      title: "One-click management",
      desc: "Enable embedded update and cancellation flows directly in digital banking.",
    },
  ] as const;
  const cuActivationCards = [
    {
      icon: "lucide:layout-template",
      title: "Embedded tracking & management",
      desc: "Subscription management added seamlessly into digital banking—members can track bills and manage subscriptions.",
    },
    {
      icon: "lucide:scan-search",
      title: "Auto-detect bills",
      desc: "Connect via digital banking to detect and track recurring bills your member is spending with your credit union.",
    },
    {
      icon: "lucide:search-check",
      title: "Find bills on external accounts",
      desc: "Members can scan in external financial relationships to find and migrate bills to your credit union.",
    },
    {
      icon: "lucide:bell-ring",
      title: "Personalized alerts & nudges",
      desc: "Members receive bill alerts, calendar sync, and personalized nudges including refinancing opportunities.",
    },
  ] as const;
  const bankPlatformLogos = [
    { name: "Alkami", src: withBase("/assets/partners/alkami.svg") },
    { name: "Lumin", src: withBase("/assets/partners/lumin.svg") },
    { name: "Banno", src: withBase("/assets/partners/banno.svg") },
    { name: "Candescent", src: withBase("/assets/partners/candescent.svg") },
    { name: "Q2", src: withBase("/assets/partners/q2.svg") },
  ] as const;

  const fintechPad = "py-20";
  const cuPad = "py-[var(--section-padding)]";

  // Keep hook order stable even if a bad slug ever sneaks in.
  if (!segment) return null;

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(!!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  return (
    <div className={`w-full page-shell ${isBanks ? "bg-white" : isCreditUnions ? "bg-white" : isFintech ? "bg-white" : "bg-white"}`}>
      {/* Hero */}
      <section
        className={`relative border-b overflow-hidden ${
          isBanks ? "border-slate-200/70 bg-white" : isCreditUnions ? "border-slate-200/70 bg-white" : "border-slate-200/70 bg-white"
        }`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-white" />
        </div>
        
        <div
          className={`container-page relative ${
            isCreditUnions || isBanks
              ? "pt-20 sm:pt-24 md:pt-[80px]"
              : isFintech
                ? "pt-12 sm:pt-14 md:pt-[56px]"
              : "pt-24 sm:pt-32 md:pt-40"
          } ${
            isBanks || isFintech || isCreditUnions
                ? isBanks || isCreditUnions
                  ? "pb-7 md:pb-8"
                  : "pb-7 md:pb-8"
              : "pb-16 sm:pb-20 md:pb-24 lg:pb-28"
          }`}
        >
          <div className="mx-auto w-full max-w-[1200px] flex flex-col items-center text-center">
            <motion.div
              className={`w-full ${
                isBanks || isCreditUnions || isFintech ? "max-w-[800px]" : "max-w-4xl"
              } flex flex-col items-center text-center ${isFintech ? "-translate-y-1" : ""}`}
              initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.995 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className={`wayfinder ${
                  isCreditUnions ? "wayfinder--hex" : "wayfinder--diamond"
                } -mt-1 mb-3 text-[9.5px] md:text-[10px] leading-none`}
              >
                {segment.heroKicker}
              </p>
              <h1
                className={`mt-0 page-title text-center ${
                  isCreditUnions || isBanks
                    ? "!text-[34px] sm:!text-[38px] md:!text-[46px] !leading-[1.06] !tracking-[-0.02em] mb-4 max-w-[760px] mx-auto"
                    : isFintech
                      ? "!text-[30px] sm:!text-[34px] md:!text-[40px] lg:!text-[42px] !leading-[1.06] !tracking-[-0.02em] mb-2.5 max-w-[900px] mx-auto text-balance"
                    : "tracking-[-0.04em] leading-[1.1]"
                }`}
              >
                {segment.heroHeadline}
              </h1>
              <p
                className={`copy-hero max-w-[54ch] text-center ${
                  isFintech ? "mt-2.5 mb-3.5" : isCreditUnions || isBanks ? "mt-3" : "mt-4"
                }`}
              >
                {segment.heroSubline}
              </p>

              <div
                className={`flex flex-wrap items-center justify-center gap-3 ${
                  isFintech || isCreditUnions || isBanks
                    ? isFintech
                      ? "mt-0"
                      : isCreditUnions || isBanks
                        ? "mt-4"
                        : "mt-6"
                    : "mt-8"
                }`}
              >
                <span
                  className={`spec-chip inline-flex items-center ${
                    isFintech ? "h-9 px-4 rounded-[12px] text-[11.5px]" : "h-10 px-5 rounded-[14px] text-[12px]"
                  } normal-case tracking-[0.02em] font-semibold bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]`}
                >
                  PCI &amp; SOC 2 compliant
                </span>
                {!segment.showPlatforms && (
                  <>
                    <span
                      className={`spec-chip inline-flex items-center ${
                        isFintech ? "h-9 px-4 rounded-[12px] text-[11.5px]" : "h-10 px-5 rounded-[14px] text-[12px]"
                      } normal-case tracking-[0.02em] font-semibold bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]`}
                    >
                      SDK • iFrame • API options
                    </span>
                    {!isFintech ? (
                      <Button
                        as={RouteLink as any}
                        to="/solution"
                        className="nav-btn-base btn-s-tier btn-arrow-lead !h-[40px] !px-6 text-[12.5px] font-semibold inline-flex items-center no-underline bg-white/80 text-slate-600 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:text-slate-900 transition-colors shadow-sm"
                      >
                        Explore our features
                      </Button>
                    ) : null}
                  </>
                )}
                {!segment.showPlatforms && isFintech ? (
                  <Magnetic disabled={!isFintech} strength={8} radius={40} hitSlop={18}>
                    <Button
                      variant="flat"
                      color="default"
                      className="nav-btn-base btn-s-tier btn-arrow-lead !h-9 !min-h-9 !px-4 text-[11.5px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[rgba(37,99,235,0.14)] !rounded-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-200 ease-out hover:bg-[#DBEAFE] hover:-translate-y-[1px]"
                      startContent={<Icon icon="lucide:calendar" width={14} height={14} style={{ strokeWidth: 1.5 }} />}
                      endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={14} height={14} style={{ strokeWidth: 1.5 }} />}
                      onClick={openDemoModal}
                    >
                      Book a demo
                    </Button>
                  </Magnetic>
                ) : null}
              </div>

              {!segment.showPlatforms && !isFintech ? (
                <div className="mt-6">
                  <Magnetic disabled={!isFintech} strength={8} radius={40} hitSlop={18}>
                    <Button
                      color="primary"
                      className="nav-btn-base btn-s-tier btn-arrow-lead !h-[42px] !px-8 text-[13px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[rgba(37,99,235,0.1)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-[#DBEAFE] transition-colors"
                      startContent={<Icon icon="lucide:calendar" width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                      endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                      onClick={openDemoModal}
                    >
                      Book a demo
                    </Button>
                  </Magnetic>
                </div>
              ) : null}
            </motion.div>
          </div>
        </div>

        <div className="container-page">
          {!isBanks && !isFintech && (
            <div aria-hidden="true" className={`${isCreditUnions ? "mt-1.5 md:mt-2 opacity-60" : "mt-3 md:mt-4"} hero-sep`} />
          )}
        </div>

        {/* Pre-integrated platforms (Banks & Credit Unions) */}
        {segment.showPlatforms && (
          isBanks || isCreditUnions ? (
             <div className="container-page pt-0 md:pt-0 pb-0">
              <div className="mx-auto w-full max-w-[1200px]">
                <div aria-hidden="true" className="hairline-swiss" />
                <motion.div
                  className="mt-10 mb-4 max-w-[760px] mx-auto text-center"
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.45 }}
                  transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#64748B]">
                    Pre‑integrated into leading digital banking solutions
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="relative w-full max-w-[980px] mx-auto mb-10"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="marquee-container mask-fade-x-wide">
                  <div className="marquee-track animate-marquee-30">
                    {[...bankPlatformLogos, ...bankPlatformLogos].map((logo, idx) => (
                      <img
                        key={`${logo.name}-${idx}`}
                        src={logo.src}
                        alt={logo.name}
                        width={180}
                        height={40}
                        style={{ height: "24px", width: "auto" }}
                        className="object-contain grayscale opacity-50 hover:opacity-80 transition-opacity duration-300 ease-out shrink-0"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="container-page pt-10 md:pt-12 pb-20 md:pb-24">
              <div className="mx-auto w-full max-w-[1200px]">
                <div aria-hidden="true" className="hairline-swiss" />
                <motion.div
                  className="mt-12 max-w-[760px] mx-auto text-center"
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.45 }}
                  transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.p
                    className={`wayfinder ${isCreditUnions ? "wayfinder--hex" : "wayfinder--diamond"} w-fit mx-auto`}
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.7 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Digital banking platforms
                  </motion.p>
                  <motion.h2
                    className="mt-8 section-title !text-[24px] md:!text-[28px] max-w-[28ch] mx-auto text-balance"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.65 }}
                    transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Pre‑integrated into leading digital banking solutions
                  </motion.h2>
                  <motion.p
                    className="mt-6 text-[14px] md:text-[15px] leading-[1.65] text-slate-600 mx-auto"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Typical implementation in just 30 to 45 days
                  </motion.p>
                </motion.div>
              </div>

              <motion.div
                className="relative mt-12 w-full max-w-[1000px] mx-auto"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              >
                <PlatformPartnersCarousel />
              </motion.div>
            </div>
          )
        )}
      </section>

      {/* Credit Unions: Testimonials (Pinwheel-style) */}
      {isCreditUnions && (
        <section data-reveal="section" className="relative mt-0 pt-12 md:pt-16 pb-12 md:pb-16 overflow-hidden border-t border-b border-slate-200/60 bg-[#F8FAFC]">
          <div className="container-page relative z-10">
            <div className="mx-auto w-full max-w-[1200px] text-center">
              <motion.h2
                className="text-[26px] sm:text-[28px] md:text-[28px] leading-[1.15] font-semibold tracking-[-0.05em] text-[var(--ink)] mx-auto max-w-2xl text-center mb-6"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                A word from our partners
              </motion.h2>

              <motion.div
                className="w-full"
                initial={reducedMotion ? false : "hidden"}
                whileInView={reducedMotion ? undefined : "show"}
                viewport={{ once: false, amount: 0.35 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1 } },
                }}
              >
                <div className="grid md:grid-cols-3 gap-6 w-full max-w-[1100px] mx-auto text-left">
                  {[
                    {
                      name: "Service Credit Union",
                      quote:
                        "By proactively addressing the challenge of subscription fatigue, we strengthen our position as a trusted financial partner and demonstrate our commitment to member financial well-being.",
                      attribution: "David Araujo, President and CEO",
                    },
                    {
                      name: "Advia Credit Union",
                      quote:
                        "By partnering with ScribeUp, we're giving our members a simple, secure way to see, manage, and stop recurring charges directly inside their Digital Banking experience. This partnership reflects our commitment to offer members intuitive tech that provides real financial advantages.",
                      attribution: "Joli Hensley, VP of DX & Innovation",
                    },
                    {
                      name: "Chartway Credit Union",
                      quote:
                        "The integration through Q2 Innovation Studio was incredibly smooth. Within 4 weeks, we had recurring bill management live in our digital banking experience. And, the member response has been overwhelmingly positive! The fact that we're offering this tool at no cost to them has been a real game changer.",
                      attribution: "Esteban Guerra, Digital Manager",
                    },
                  ].map(({ name, quote, attribution }) => (
                    <motion.div
                      key={name}
                      className="group relative bg-white border border-slate-200/70 rounded-[20px] px-6 py-8 shadow-[0_0_0_4px_#F8FAFC,0_12px_40px_-14px_rgba(2,6,23,0.08)] transition-[box-shadow,border-color] duration-300 ease-out hover:shadow-[0_0_0_4px_#F8FAFC,0_18px_52px_-18px_rgba(2,6,23,0.11)] flex flex-col min-h-[180px] overflow-hidden"
                      variants={{
                        hidden: { opacity: 0, y: isMobile ? 0 : 14 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                      }}
                    >
                      {/* Subtle top accent */}
                      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-[#2563EB]/18 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <p className="text-slate-700 text-[16px] leading-[1.6] font-normal relative z-10 mb-6">
                        &ldquo;{quote}&rdquo;
                      </p>
                      <div className="mt-auto pt-0 relative z-10">
                        <p className="text-[14px] font-semibold text-slate-900">{attribution}</p>
                        <p className="text-[13px] font-medium text-slate-500 mt-0.5">{name}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Credit Unions: Activation cards (between quotes and outcomes) */}
      {isCreditUnions ? (
        <section data-reveal="section" className="relative bg-[#F8FAFC] overflow-hidden border-b border-slate-200/60 py-12 md:py-16">
          <div className="container-page">
            <div className="mx-auto w-full max-w-[1200px]">
              <motion.div
                className="mx-auto max-w-[760px] text-center"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.55 }}
                transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="wayfinder wayfinder--hex w-fit mx-auto">Member experience</div>
                <h2 className="mt-4 text-[24px] md:text-[27px] leading-[1.12] font-semibold tracking-[-0.05em] text-[var(--ink)] text-balance">
                  Turn ScribeUp on in your digital banking. We do the rest.
                </h2>
                <p className="mt-3 text-[14px] md:text-[15px] leading-[1.65] text-slate-600 max-w-[62ch] mx-auto">
                  We connect to your digital platform to populate our experience and connect to members&apos; transactions.
                </p>
              </motion.div>

              <motion.div
                className="mt-8 rounded-[28px] bg-[#E2E8F0] p-px overflow-hidden isolate [transform:translateZ(0)] [-webkit-transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)] [backface-visibility:hidden] shadow-[0_0_0_4px_#F8FAFC,0_18px_60px_rgba(2,6,23,0.08)]"
                initial={reducedMotion ? false : "hidden"}
                whileInView={reducedMotion ? undefined : "show"}
                viewport={{ once: false, amount: 0.3 }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E2E8F0]">
                  {cuActivationCards.map((card) => (
                      <motion.div
                        key={card.title}
                        className="group relative bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] border border-slate-200/70 p-5 text-left transition-[box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-slate-300/70 hover:shadow-[0_18px_44px_-14px_rgba(2,6,23,0.11)] isolate [-webkit-mask-image:-webkit-radial-gradient(white,black)] [will-change:transform,opacity] [transform:translateZ(0)] [-webkit-transform:translateZ(0)] [backface-visibility:hidden]"
                        variants={{
                          hidden: { opacity: 0, y: isMobile ? 0 : 12 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                        }}
                      >
                        {/* Subtle top accent */}
                        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-[#2563EB]/18 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="recessed-well recessed-well--inset p-2.5 rounded-[16px] w-fit mb-4 transition-all duration-300 group-hover:bg-white group-hover:shadow-sm group-hover:border-slate-200/80">
                          <Icon icon={card.icon} width={18} height={18} className="text-blue-700/75" style={{ strokeWidth: 1.5 }} />
                        </div>
                        <h3 className="text-[14px] font-bold tracking-[-0.02em] text-slate-900 leading-tight">
                          {card.title}
                        </h3>
                        <p className="mt-2 text-[12.75px] leading-[1.55] text-slate-600">
                          {card.desc}
                        </p>
                      </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Fintechs: Integration (right after testimonials) */}
      {isFintech && (
        <section data-reveal="section" className="relative py-12 md:py-16 bg-[#FBFCFE] overflow-hidden border-b border-slate-200/60">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_16%_0%,rgba(37,99,235,0.032),transparent_62%),radial-gradient(55%_55%_at_86%_18%,rgba(30,162,255,0.03),transparent_66%)]" />
          <div className="container-page">
            <div className="mx-auto w-full max-w-[1200px] text-center">
              <motion.div
                className="max-w-2xl mx-auto"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.55 }}
                transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.h2
                  className="mt-0 section-title !text-[24px] md:!text-[28px] max-w-2xl text-balance mx-auto"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.65 }}
                  transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  Ship the experience that fits your stack
                </motion.h2>
                <motion.p
                  className="mt-4 text-slate-600 max-w-lg text-[14.5px] md:text-[16px] leading-[1.65] mx-auto"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  SDK, iFrame, or API. Ready-made UI or build your own.
                </motion.p>
              </motion.div>
            </div>
            <motion.div
              className="mt-8 max-w-[1200px] mx-auto"
              initial={reducedMotion ? false : "hidden"}
              whileInView={reducedMotion ? undefined : "show"}
              viewport={{ once: false, amount: 0.35 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4 md:gap-5">
                {[
                  {
                    icon: "lucide:code",
                    title: "SDK",
                    desc: "Integrate natively into your app—indistinguishable from your broader experience.",
                    chips: ["White-Label", "Drop-In UI", "React + Native"],
                  },
                  {
                    icon: "lucide:layout",
                    title: "iFrame",
                    desc: "Add subscription management UI with a few lines of code.",
                    chips: ["White-Label", "Drop-in UI", "Hosted Flow"],
                  },
                  {
                    icon: "lucide:plug",
                    title: "API",
                    desc: "Build functionality into your broader app or build your own UI. Full control.",
                    chips: ["Own the UX", "Rest + Events"],
                  },
                ].map(({ icon, title, desc, chips }) => (
                  <motion.div
                    key={title}
                    className="group relative bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-6 flex flex-col min-h-[190px] rounded-[18px] border border-slate-200/80 shadow-[0_0_0_4px_#FBFCFE,0_10px_28px_-20px_rgba(2,6,23,0.12)] transition-[box-shadow,border-color] duration-200 hover:border-slate-300/70 hover:shadow-[0_0_0_4px_#FBFCFE,0_18px_44px_-24px_rgba(2,6,23,0.16)]"
                    variants={{
                      hidden: { opacity: 0, y: isMobile ? 6 : 14 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >
                    <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-[#2563EB]/18 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-start gap-4 min-h-[108px] md:min-h-[100px]">
                      <div className="h-10 w-10 shrink-0 rounded-[12px] bg-[#EFF6FF] border border-slate-200/70 grid place-items-center text-[#2563EB] transition-all duration-200 group-hover:bg-white group-hover:shadow-[0_6px_18px_rgba(2,6,23,0.06)] group-hover:border-slate-200/90">
                        <Icon icon={icon} width={20} height={20} className="text-[#2563EB]" style={{ strokeWidth: 1.5 }} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="mt-0.5 text-[14px] font-semibold tracking-[-0.02em] text-[var(--ink)]">{title}</h3>
                        <p className="mt-1.5 text-[12.5px] text-slate-600 leading-[1.55]">{desc}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-200/60 flex flex-wrap lg:flex-nowrap items-center gap-1.5">
                      {chips.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center whitespace-nowrap text-[10px] font-semibold tracking-normal bg-white/70 border border-slate-200/70 text-slate-600 px-2 py-0.5 rounded-[999px]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="mt-7 flex justify-center"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.45 }}
              transition={{ duration: 0.48, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button
                as={RouteLink as any}
                to="/solution"
                className="nav-btn-base btn-s-tier btn-arrow-lead !h-[40px] !px-6 text-[12.5px] font-semibold inline-flex items-center no-underline bg-white/80 text-slate-600 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:text-slate-900 transition-colors shadow-sm"
              >
                Explore our features
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Fintech: subtle break before proven results (avoid 3x 3-card repetition) */}
      {isFintech ? (
        <div aria-hidden="true" className="bg-[#FBFCFE] py-4 md:py-6">
          <div className="soft-divider" />
        </div>
      ) : null}

      {/* Main content: Credit Unions = value toggle + live demo; others = ServePanel */}
      <section
        data-reveal="section"
        className={`relative ${
          isCreditUnions
            ? "py-10 md:py-12"
            : isBanks
              ? "py-16 md:py-24"
            : isFintech
              ? "pt-10 md:pt-14 pb-16 md:pb-24"
              : "pt-[80px] pb-[80px]"
        } ${isCreditUnions || isBanks || isFintech ? "bg-[#FBFCFE]" : "bg-white"} overflow-hidden`}
      >
        {/* Clean, consistent backdrop (no muddy washes). */}
        <div className="container-page relative z-10">
          {isCreditUnions ? (
            <div className="mx-auto w-full max-w-[1100px]">
              <div className="text-center">
                <motion.div
                  className="mx-auto max-w-[800px] mt-0 mb-8 md:mb-10 text-center"
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.55 }}
                  transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="text-[24px] md:text-[26px] leading-[1.1] font-semibold tracking-[-0.05em] text-[var(--ink)] text-center mx-auto text-balance">
                    Subscription management that drives outcomes for credit unions
                  </h2>
                  <p className="mt-2.5 text-[14px] md:text-[15px] leading-[1.6] text-slate-600 max-w-[62ch] mx-auto">
                    Toggle each outcome to see the member experience that drives it—card primacy, member retention, and refinancing leads—inside your digital banking app.
                  </p>
                </motion.div>
                <div className="mt-0">
                  <CreditUnionsValueSection variant="credit-unions" compact metrics={segment.metrics} openDemoModal={openDemoModal} />
                </div>
              </div>
            </div>
          ) : isBanks ? (
            <div className="mx-auto w-full max-w-[1100px] text-center">
                <div className="text-center">
                  <motion.div
                    className="mx-auto max-w-[960px] mt-0 mb-2 text-center px-4"
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h2 className="section-title !text-[24px] md:!text-[28px] leading-[1.1] mx-auto tracking-[-0.03em] text-center">
                      Turn ScribeUp on in your digital banking. We do the rest.
                    </h2>
                    <p className="mt-3 copy-lede mx-auto text-center max-w-[60ch]">
                      Launch quickly with embedded subscription visibility, controls, and proactive engagement.
                    </p>
                  </motion.div>

                  <motion.div
                    className="mt-8 mb-10 md:mb-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 isolate [transform:translateZ(0)] [-webkit-transform:translateZ(0)] [backface-visibility:hidden]"
                    initial={reducedMotion ? false : "hidden"}
                    whileInView={reducedMotion ? undefined : "show"}
                    viewport={{ once: false, amount: 0.3 }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                  >
                    {bankActivationCards.map((card) => (
                      <motion.div
                        key={card.title}
                        className="group relative bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] border border-slate-200 rounded-[16px] p-6 text-left shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-[box-shadow,border-color] duration-500 ease-out hover:shadow-[0_18px_44px_-14px_rgba(2,6,23,0.11)] hover:border-slate-300/70 overflow-hidden isolate [-webkit-mask-image:-webkit-radial-gradient(white,black)] [will-change:transform,opacity] [transform:translateZ(0)] [-webkit-transform:translateZ(0)] [backface-visibility:hidden]"
                        variants={{
                          hidden: { opacity: 0, y: isMobile ? 0 : 12 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                        }}
                      >
                        {/* Subtle top accent */}
                        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-[#2563EB]/18 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative z-10 flex flex-col h-full">
                          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-slate-200/70 bg-[#EFF6FF] text-[#2563EB] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] group-hover:scale-105 group-hover:bg-white group-hover:border-slate-200/90 transition-all duration-300">
                            <Icon icon={card.icon} width={20} height={20} style={{ strokeWidth: 1.5 }} />
                          </div>
                          <h3 className="text-[14px] font-bold tracking-[-0.02em] text-slate-900 leading-tight">
                            {card.title}
                          </h3>
                          <p className="mt-2 text-[12.75px] leading-[1.55] text-slate-600">
                            {card.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div aria-hidden="true" className="py-10 md:py-12">
                    <div className="soft-divider" />
                  </div>

                  <motion.div
                    className="mx-auto max-w-[920px] mt-0 mb-2 text-center px-4"
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.55 }}
                    transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h2 className="section-title !text-[24px] md:!text-[28px] leading-[1.1] mx-auto tracking-[-0.03em] text-center">
                      Subscription management that drives revenue
                    </h2>
                    <p className="mt-3 copy-lede mx-auto text-center max-w-[60ch]">
                      Toggle each outcome to see the user experience that drives it—card primacy, retention, and refinancing leads—inside your digital banking app.
                    </p>
                  </motion.div>

                  <div className="mt-4">
                    <CreditUnionsValueSection variant="banks" compact metrics={segment.metrics} openDemoModal={openDemoModal} />
                  </div>
                </div>
            </div>
          ) : isFintech ? (
            <div className="mx-auto w-full max-w-[1100px] text-center">
              <div className="mx-auto max-w-[1100px]">
                <ServePanel segment={segment} openDemoModal={openDemoModal} />
              </div>
            </div>
          ) : (
            <>
              <div className="mx-auto max-w-[1100px]">
                <ServePanel segment={segment} openDemoModal={openDemoModal} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA — category-specific, adoption-focused */}
      <div
        aria-hidden="true"
        className={`${
          isFintech ? "py-5 md:py-7" : "py-12 md:py-16"
        } ${isCreditUnions || isBanks ? "bg-[#F8FAFC]" : "bg-white"}`}
      >
        <div className="soft-divider" />
      </div>
      <section
        data-reveal="section"
        className={`relative overflow-hidden ${
          isCreditUnions
            ? "pt-14 md:pt-16 pb-10 md:pb-14 border-t border-slate-200/60 bg-[#F9FAFB]"
            : isBanks
              ? "pt-14 md:pt-16 pb-10 md:pb-14 border-t border-slate-200/70 bg-[#F8FAFC]"
              : isFintech
                ? "pt-8 md:pt-10 pb-10 md:pb-14 border-t border-slate-200/60 bg-white"
              : "section-pad bg-white pb-0 border-t border-slate-200/60"
        }`}
      >
        {isCreditUnions ? (
          <>
            <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-slate-200/70" />
          </>
        ) : isBanks ? (
          <>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.03] [mask-image:radial-gradient(65%_65%_at_50%_15%,black,transparent_72%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.22),transparent)]" />
          </>
        ) : isFintech ? (
          <>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.045] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_78%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.16),transparent)]" />
          </>
        ) : !isCreditUnions ? (
          <>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.08] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_76%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_16%,rgba(30,162,255,0.03),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(37,99,235,0.035),transparent_70%)]" />
          </>
        ) : null}
        <div className="container-page relative z-10">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`relative mx-auto w-full max-w-[940px] rounded-[24px] border border-slate-200/80 bg-gradient-to-b from-white to-[#F8FAFC] px-6 py-7 md:px-9 md:py-8 text-center shadow-[0_0_0_4px_#F8FAFC,0_18px_44px_-14px_rgba(2,6,23,0.10)] ${
              isFintech ? "mb-20 md:mb-24" : "mb-24 md:mb-28"
            }`}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.22),transparent)]" />
            <div className="mx-auto max-w-[720px]">
              <h3 className="text-[22px] sm:text-[24px] md:text-[28px] font-semibold leading-[1.18] tracking-[-0.05em] text-[#0F172A]">
                {segment.ctaHeadline}
              </h3>
              <p className="mt-3 text-[14px] md:text-[15px] leading-[1.65] text-slate-600">
                {segment.ctaSubline}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Magnetic strength={8} radius={40}>
                <Button
                  as={RouteLink as any}
                  to="/solution"
                  variant="light"
                  className="nav-btn-base btn-arrow-lead !h-[42px] !px-6 text-[13.5px] font-medium bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                >
                  Learn more
                </Button>
              </Magnetic>
              <Magnetic strength={8} radius={40}>
                <Button
                  color="primary"
                  className="nav-btn-base btn-arrow-lead !h-[42px] !px-7 text-[13.5px] font-semibold bg-[#0F172A] text-white border border-transparent shadow-[0_4px_12px_rgba(15,23,42,0.15)] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(15,23,42,0.2)]"
                  onClick={openDemoModal}
                >
                  Book a demo
                </Button>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default CategoryPageShell;
