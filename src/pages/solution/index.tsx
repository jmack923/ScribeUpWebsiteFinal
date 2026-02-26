import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouteLink } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useDemoModal } from "../../components/demo-modal-context";
import { Magnetic } from "../../components/magnetic";
import { CountUp } from "../../components/count-up";

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const basePath = base === "/" ? "" : base.replace(/\/$/, "");
  // Important: videos live in `public/` and some filenames include spaces/commas.
  // `encodeURI` keeps the URL valid while matching the on-disk filename.
  return `${basePath}/${encodeURI(path.replace(/^\//, ""))}`;
}

const AVAILABLE_FEATURES = [
  {
    title: "End-to-end subscription management",
    tag: "SDK or i-frame",
    icon: "lucide:layout",
    video: {
      mp4: "/video/scribeup-demo-bank.mp4",
    },
  },
  {
    title: "1-click cancellation",
    tag: "API or in-product",
    icon: "lucide:ban",
    video: {
      mp4: "Our Solution , Available Features, Videos/1-click cancellation.mp4",
      mov: "Our Solution , Available Features, Videos/1-click cancellation.mov",
    },
  },
  {
    title: "1-click payment updater",
    tag: "API or in-product",
    icon: "lucide:refresh-cw",
    video: {
      mp4: "Our Solution , Available Features, Videos/1-click payment updater .mp4",
      mov: "Our Solution , Available Features, Videos/1-click payment updater .mov",
    },
  },
  {
    title: "Personalized cross-sell",
    tag: "API or in-product",
    icon: "lucide:sparkles",
    video: {
      mp4: "Our Solution , Available Features, Videos/personalized cross-sell .mp4",
      mov: "Our Solution , Available Features, Videos/personalized cross-sell .mov",
    },
  },
  {
    title: "Alerts & nudges",
    tag: "API or in-product",
    icon: "lucide:bell-ring",
    video: {
      mp4: "Our Solution , Available Features, Videos/Alerts & nudges  copy.mp4",
      mov: "Our Solution , Available Features, Videos/Alerts & nudges  copy.mov",
    },
  },
  {
    title: "Transaction enrichment & recurrence detection",
    tag: "API or in-product",
    icon: "lucide:repeat-2",
  },
] as const;

function TerminalMetric({
  value,
  label,
  reducedMotion,
}: {
  value: string;
  label: string;
  reducedMotion: boolean;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });

  const parsed = React.useMemo(() => {
    const m = value.trim().match(/^([+])?(\d+)([%+])?$/);
    if (!m) return { prefix: "", digits: value, suffix: "" };
    return { prefix: m[1] ?? "", digits: m[2] ?? value, suffix: m[3] ?? "" };
  }, [value]);

  const numeric = React.useMemo(() => {
    const n = Number(parsed.digits);
    return Number.isFinite(n) ? n : null;
  }, [parsed.digits]);

  const animate = inView && !reducedMotion && numeric != null;

  return (
    <div ref={ref} className="py-1 flex flex-col items-center text-center">
      <div
        className="flex items-start justify-center text-[#0F172A] leading-[0.9] tabular-nums"
        style={{ filter: "drop-shadow(0 0 10px #FFFFFF)" }}
      >
        {parsed.prefix ? (
          <span className="align-top text-[26px] md:text-[28px] font-light tracking-[-0.03em] mt-[6px]">
            {parsed.prefix}
          </span>
        ) : null}
        {animate ? (
          <CountUp
            from={0}
            to={numeric as number}
            duration={980}
            easing="expo"
            className="text-[36px] sm:text-[44px] md:text-[54px] font-light tracking-[-0.06em]"
          />
        ) : (
          <span className="text-[36px] sm:text-[44px] md:text-[54px] font-light tracking-[-0.06em]">
            {parsed.digits}
          </span>
        )}
        {parsed.suffix ? (
          <span className="align-top text-[26px] md:text-[28px] font-light tracking-[-0.03em] mt-[6px]">
            {parsed.suffix}
          </span>
        ) : null}
      </div>
      <div className="mt-3 text-[10px] uppercase tracking-[0.18em] font-medium text-slate-500">{label}</div>
    </div>
  );
}

export default function Solution() {
  const { openDemoModal } = useDemoModal();
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);
  const [selectedFeatureIndex, setSelectedFeatureIndex] = React.useState(0);
  const selectedFeature = AVAILABLE_FEATURES[selectedFeatureIndex];
  const [featureVideoFailed, setFeatureVideoFailed] = React.useState(false);
  const featureVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const selectedVideo = (selectedFeature as any).video as { mp4: string; mov?: string } | undefined;
  const currentVideoSrcRef = React.useRef<string | null>(null);
  const [featureVideoNeedsTap, setFeatureVideoNeedsTap] = React.useState(false);
  const bladeRef = React.useRef<HTMLElement | null>(null);
  const capRef = React.useRef<HTMLElement | null>(null);
  const capInView = useInView(capRef, { once: false, amount: 0.08, margin: "240px 0px -240px 0px" });
  const [activeCapIdx, setActiveCapIdx] = React.useState(0);
  const capRafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(!!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  React.useEffect(() => {
    setFeatureVideoFailed(false);
    setFeatureVideoNeedsTap(false);
  }, [selectedFeatureIndex]);

  React.useEffect(() => {
    currentVideoSrcRef.current = selectedVideo?.mp4 ?? null;
  }, [selectedVideo?.mp4]);

  React.useEffect(() => {
    if (!capInView) return;
    try {
      const scope = capRef.current ?? document;
      const nodes = Array.from(scope.querySelectorAll<HTMLElement>("[data-cap-item]"));
      if (!nodes.length) return;

      const indexByEl = new Map<Element, number>();
      nodes.forEach((n, idx) => indexByEl.set(n, idx));

      // Track “active” without scroll listeners (mobile perf): observe a narrow band in the viewport.
      // Throttle updates to rAF to prevent jank during fast scroll.
      const io = new IntersectionObserver(
        (entries) => {
          const hits = entries.filter((e) => e.isIntersecting);
          if (!hits.length) return;

          const vh = window.innerHeight || 0;
          const targetY = vh * 0.4;
          let bestIdx = 0;
          let best = Number.POSITIVE_INFINITY;

          hits.forEach((e) => {
            const idx = indexByEl.get(e.target);
            if (idx == null) return;
            const d = Math.abs((e as IntersectionObserverEntry).boundingClientRect.top - targetY);
            if (d < best) {
              best = d;
              bestIdx = idx;
            }
          });

          if (capRafRef.current != null) cancelAnimationFrame(capRafRef.current);
          capRafRef.current = requestAnimationFrame(() => {
            setActiveCapIdx((prev) => (prev === bestIdx ? prev : bestIdx));
          });
        },
        {
          root: null,
          // 10% band around 40% viewport height
          rootMargin: "-35% 0px -55% 0px",
          threshold: [0, 0.01, 0.1],
        }
      );

      nodes.forEach((n) => io.observe(n));
      return () => {
        if (capRafRef.current != null) cancelAnimationFrame(capRafRef.current);
        capRafRef.current = null;
        io.disconnect();
      };
    } catch {
      return;
    }
  }, [capInView]);

  const capGridVariants = React.useMemo(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: 0.06 } },
    }),
    []
  );

  const capCardVariants = React.useMemo(
    () => ({
      hidden: { opacity: 0, y: isMobile ? 0 : 12 },
      show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
    }),
    [isMobile]
  );

  return (
    <div className="w-full page-shell">
      <section className="relative border-b border-slate-200/70 overflow-visible elite-unclip">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-[0.08]" />
          <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_12%_14%,rgba(71,98,255,0.08),transparent_70%),radial-gradient(40%_30%_at_88%_18%,rgba(44,138,255,0.06),transparent_72%)]" />
          <div className="absolute inset-0 blueprint-grid" />
          <div className="absolute inset-0 distance-grid opacity-[0.03] [mask-image:radial-gradient(55%_60%_at_50%_18%,black,transparent_72%)]" />
        </div>
        <div className="container-page relative pt-[36px] sm:pt-[56px] md:pt-[80px] pb-[48px]">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-4xl">
              <div>
                <motion.p
                  className="wayfinder w-fit mx-auto lg:mx-0"
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  Our solution
                </motion.p>
                <motion.h1
                  className="mt-6 page-title leading-[1.05]"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  Comprehensive Subscription Management. Your Way.
                </motion.h1>
                <motion.p
                  className="mt-5 copy-hero max-w-2xl mx-auto lg:mx-0"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  Every feature. One platform. Embedded seamlessly via SDK, iFrame, or API to match your architecture.
                </motion.p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3.5 sm:gap-3 items-stretch sm:items-center justify-center lg:justify-start w-full max-w-[360px] sm:max-w-none mx-auto lg:mx-0 px-0 sm:px-0">
                  <Magnetic strength={8} radius={40} hitSlop={18}>
                    <Button
                      variant="flat"
                      color="default"
                      className="nav-btn-base btn-arrow-lead !w-full sm:!w-auto !h-[52px] sm:!h-[40px] !px-5 text-[12.5px] font-semibold !rounded-[12px] bg-[#EFF6FF] text-[#2563EB] border border-[rgba(37,99,235,0.12)] hover:bg-[#DBEAFE] hover:border-[rgba(37,99,235,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                      startContent={<Icon icon="lucide:calendar" width={16} height={16} style={{ strokeWidth: 1.5 }} />}
                      endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={16} height={16} style={{ strokeWidth: 1.5 }} />}
                      onClick={openDemoModal}
                    >
                      Book a demo
                    </Button>
                  </Magnetic>
                  <Magnetic strength={8} radius={40} hitSlop={18}>
                    <Button
                      as={RouteLink as any}
                      to="/developer"
                      variant="flat"
                      color="default"
                      className="nav-btn-base btn-arrow-lead !w-full sm:!w-auto !h-[52px] sm:!h-[40px] !px-5 text-[12.5px] font-semibold bg-white text-slate-700 border border-slate-200/70 hover:bg-slate-50 hover:border-slate-300/70 transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                      startContent={<Icon icon="lucide:key" width={17} height={17} style={{ strokeWidth: 1.5 }} />}
                      endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={17} height={17} style={{ strokeWidth: 1.5 }} />}
                    >
                      Request API access
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-page">
          <div className="mx-auto w-full max-w-[1200px]">
            <div aria-hidden="true" className="hairline-swiss" />
          </div>
        </div>
      </section>

      {/* Why ScribeUp is Best-in-Class */}
      <section data-reveal="section" className="relative pt-[36px] pb-6 sm:pb-10 md:pb-14 lg:pb-[72px] bg-white overflow-visible elite-unclip">
        <div className="container-page">
          <div className="mx-auto w-full max-w-[1200px]">
            <motion.h2
              className="text-[26px] md:text-[30px] font-semibold tracking-[-0.03em] text-[var(--ink)] max-w-2xl mb-6 md:mb-8 mx-auto text-center leading-[1.12]"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Why ScribeUp is Best-in-Class
            </motion.h2>
            <div className="rounded-[20px] bg-[#E2E8F0] p-px overflow-hidden">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E2E8F0] focus-dim">
                {[
                  {
                    icon: "lucide:target",
                    title: "Pure-Play Focus",
                    desc: "We are 100% dedicated to subscription management. No competing priorities. Just best-in-class tooling.",
                  },
                {
                  icon: "lucide:layers-3",
                  title: "Most Comprehensive Toolset",
                  desc: "From infrastructure to user experience, we provide the deepest and most complete subscription management capabilities available in one platform.",
                },
                {
                  icon: "lucide:plug-zap",
                  title: "Flexible Integration",
                  desc: "SDK, iFrame or API-based features. White-labeled or customized. We fit into your architecture, not the other way around.",
                },
                {
                  icon: "lucide:shield-check",
                  title: "Enterprise-Grade Reliability",
                  desc: "Built for scale, compliance, and operational resilience from day one.",
                },
                ].map(({ icon, title, desc }) => {
                  const isPurePlay = title === "Pure-Play Focus";
                  return (
                <motion.div
                  key={title}
                  className="focus-dim-item group relative bg-white border border-slate-200/70 p-5 md:p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-slate-300/70 hover:shadow-[0_0_0_4px_#F8FAFC,0_18px_44px_-22px_rgba(2,6,23,0.11)]"
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-[#2563EB]/18 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-start gap-4">
                    <div
                      className={`relative h-10 w-10 shrink-0 rounded-[12px] grid place-items-center transition-all duration-300 ${
                        isPurePlay
                          ? "bg-white border border-blue-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
                          : "bg-[#EFF6FF] border border-blue-200/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] group-hover:bg-white group-hover:shadow-[0_8px_20px_-14px_rgba(2,6,23,0.16)]"
                      }`}
                    >
                      <Icon
                        icon={icon}
                        width={18}
                        height={18}
                        className="text-[#2563EB]"
                        style={{ strokeWidth: isPurePlay ? 1.5 : 1.5 }}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-semibold tracking-[-0.02em] text-[var(--ink)] leading-[1.15]">{title}</h3>
                      <p className="mt-1.5 text-[12.5px] text-slate-600 leading-[1.6]">{desc}</p>
                    </div>
                  </div>
                </motion.div>
                  );
                })}
            </div>
          </div>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="soft-divider" />

      <section
        ref={bladeRef}
        data-reveal="section"
        className="relative py-14 md:py-16 bg-white overflow-visible elite-unclip"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.03] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_12%,rgba(37,99,235,0.022),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(30,162,255,0.02),transparent_70%)]" />
        <div className="container-page relative z-10">
          <div className="mx-auto w-full max-w-[1200px]">
          <motion.div
            data-reveal-item
            className="mb-10 mx-auto w-full max-w-[1100px] text-center"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="section-title max-w-2xl mx-auto">
              Explore features by integration path
            </h2>
          </motion.div>

          <div data-reveal-item className="mx-auto w-full max-w-[1200px] rounded-[24px] border border-slate-200/70 bg-white overflow-hidden shadow-sm">
            <div className="grid lg:grid-cols-[4fr_5fr] gap-8 lg:gap-16 items-center tablet-stack-2col">
              {/* Left: list (clean, elite selection) */}
              <div className="p-4 sm:p-5 lg:p-7 flex flex-col gap-2 sm:gap-1.5 lg:h-[520px] justify-center bg-white relative z-10">
                {AVAILABLE_FEATURES.map((feature, idx) => {
                  const isActive = idx === selectedFeatureIndex;
                  const iconName = (feature as any).icon ?? "lucide:layers";

                  return (
                    <motion.button
                      key={feature.title}
                      type="button"
                      onClick={() => setSelectedFeatureIndex(idx)}
                      className={`group relative w-full text-left px-4 py-2.5 md:px-3.5 md:py-3 rounded-[14px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? "bg-slate-50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] ring-1 ring-slate-200/80"
                          : "bg-transparent hover:bg-slate-50/60"
                      }`}
                      initial={reducedMotion ? false : { opacity: 0 }}
                      whileInView={reducedMotion ? undefined : { opacity: 1 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: idx * 0.03 }}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`h-8 w-8 shrink-0 rounded-[10px] grid place-items-center transition-colors ${
                          isActive ? "bg-white shadow-sm ring-1 ring-slate-200 text-blue-600" : "bg-slate-100/50 text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-100"
                        }`}>
                          <Icon icon={iconName} width={15} height={15} style={{ strokeWidth: 1.5 }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div
                            className={`text-[13.5px] font-semibold tracking-[-0.01em] transition-colors ${
                              isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-800"
                            }`}
                          >
                            {feature.title}
                          </div>
                          <div className={`mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors ${
                            isActive ? "text-blue-600" : "text-slate-400"
                          }`}>
                            {feature.tag}
                          </div>
                        </div>
                        {isActive ? (
                          <motion.div
                            className="text-blue-600"
                            initial={reducedMotion ? false : { opacity: 0, x: -4 }}
                            animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <Icon icon="lucide:chevron-right" width={18} height={18} />
                          </motion.div>
                        ) : null}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Right: phone stage — fixed aspect + beefed-up device */}
              <motion.div
                className="relative border-t lg:border-t-0 lg:border-l border-slate-100 bg-slate-50/30 p-4 sm:p-6 lg:p-10 flex justify-center items-center overflow-hidden min-w-0"
                initial={reducedMotion ? false : { opacity: 0 }}
                whileInView={reducedMotion ? undefined : { opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Elite background: distance grid + subtle gradient mesh */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 distance-grid opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.03),transparent_70%),radial-gradient(circle_at_80%_80%,rgba(30,162,255,0.04),transparent_60%)]" />
                </div>

                <div className="relative w-full flex items-center justify-center">
                  <div className="safari-clip relative w-auto max-w-[260px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-none h-[360px] sm:h-[420px] md:h-[460px] lg:h-[520px] aspect-[1/2.16] rounded-[32px] border-[6px] border-[#0F172A] bg-white shadow-[0_20px_44px_-14px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden">
                    <AnimatePresence initial={false} mode="sync">
                      {selectedVideo?.mp4 && !featureVideoFailed ? (
                        <motion.video
                          key={selectedVideo.mp4}
                          ref={featureVideoRef}
                          className="absolute inset-0 w-full h-full object-cover [will-change:opacity]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            transform: "translateZ(0)",
                            backfaceVisibility: "hidden",
                          }}
                          muted
                          playsInline
                          loop
                          preload="metadata"
                          autoPlay
                          disablePictureInPicture
                          controls={false}
                          controlsList="nodownload noremoteplayback"
                          onError={() => {
                            // Avoid stale errors from an exiting video flipping the new one into fallback.
                            if (currentVideoSrcRef.current === selectedVideo.mp4) setFeatureVideoFailed(true);
                          }}
                          onLoadedMetadata={(e) => {
                            const v = e.currentTarget;
                            try {
                              if (selectedVideo?.mp4?.includes("scribeup-demo-bank.mp4") && v.currentTime < 0.15) {
                                v.currentTime = 0.15;
                              }
                            } catch {}
                          }}
                          onCanPlay={(e) => {
                            const v = e.currentTarget;
                            requestAnimationFrame(() => {
                              if (!v || !v.isConnected) return;
                              v.play()
                                .then(() => setFeatureVideoNeedsTap(false))
                                .catch(() => setFeatureVideoNeedsTap(true));
                            });
                          }}
                        >
                          <source src={withBase(selectedVideo.mp4)} type="video/mp4" />
                          {selectedVideo.mov ? <source src={withBase(selectedVideo.mov)} type="video/quicktime" /> : null}
                        </motion.video>
                      ) : (
                        <motion.div
                          key="staged-fallback"
                          className="absolute inset-0 bg-slate-100 flex items-center justify-center [will-change:opacity]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-400">Staged</div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {featureVideoNeedsTap && !featureVideoFailed ? (
                      <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.22),rgba(15,23,42,0.08)_55%,rgba(15,23,42,0.0)_72%)]" />
                        <button
                          type="button"
                          onClick={() => {
                            const v = featureVideoRef.current;
                            if (!v) return;
                            v.play()
                              .then(() => setFeatureVideoNeedsTap(false))
                              .catch(() => {});
                          }}
                          className="relative z-10 inline-flex items-center gap-2 h-[40px] px-5 rounded-full bg-white/90 border border-slate-200 text-slate-900 text-[13px] font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                        >
                          <Icon icon="lucide:play" width={16} height={16} style={{ strokeWidth: 1.8 }} />
                          Tap to play
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="soft-divider" />
      <section ref={capRef} data-reveal="section" className="relative pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-12 md:pb-16 lg:pb-[80px] bg-white overflow-visible elite-unclip">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 distance-grid opacity-[0.03] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_74%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_55%_at_18%_14%,rgba(37,99,235,0.018),transparent_66%),radial-gradient(55%_55%_at_86%_22%,rgba(30,162,255,0.015),transparent_70%)]" />
        <div className="container-page relative z-10">
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 sm:gap-8 lg:gap-x-14 items-start">
              {/* pinned header */}
              <motion.div
                data-reveal-item
                className="max-w-[360px] mx-auto lg:mx-0 lg:sticky lg:top-28 text-center lg:text-left"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.h2
                  className="section-title"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  Find. Track. Manage. Monetize.
                </motion.h2>
                <motion.p
                  className="mt-5 copy-lede"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  An end‑to‑end recurring bill platform designed for regulated environments and measurable outcomes.
                </motion.p>
              </motion.div>

              {/* shared-wall bento grid */}
              <div className="relative">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 [grid-auto-rows:1fr]"
                  initial={reducedMotion ? false : "hidden"}
                  whileInView={reducedMotion ? undefined : "show"}
                  viewport={{ once: true, amount: 0.25 }}
                  variants={capGridVariants}
                >
                    {[
                {
                  icon: "lucide:search-check",
                  title: "Find",
                  points: [
                    "Automatically identify and track recurring bills paid on your cards and accounts",
                    "Give customers visibility into recurring bills from external bank accounts",
                    "Uncover hidden subscriptions and recurring charges across institutions",
                  ],
                },
                {
                  icon: "lucide:radar",
                  title: "Track",
                  points: [
                    "Alert your users before bills are due",
                    "Sync bill dates onto their personal calendars",
                    "Deliver price hikes, personalized insights and savings opportunities when it matters most",
                  ],
                },
                {
                  icon: "lucide:settings-2",
                  title: "Manage",
                  points: [
                    "1-click Payment Updater — migrate recurring bills with one click. Supports card and ACH for 100s of merchants",
                    "1-click Cancellation — instantly cancel unwanted subscriptions for 100s of merchants",
                    "Guided cancellation flows available for 1,000s of merchants",
                  ],
                },
                {
                  icon: "lucide:banknote",
                  title: "Monetize",
                  points: [
                    "Cross-sell on personalized opportunities",
                    "Refinancing and insurance opportunities",
                    "Promote core banking products and premium plans",
                  ],
                },
                    ].map((it, idx) => (
                      <motion.div
                        key={it.title}
                        data-cap-item
                        className="group relative min-w-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-5 sm:p-6 md:p-7 border border-slate-200/80 flex flex-col rounded-[24px] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-slate-300/70 hover:shadow-[0_0_0_4px_#F8FAFC,0_18px_44px_-24px_rgba(2,6,23,0.12)]"
                        variants={capCardVariants}
                      >
                        <div
                          aria-hidden="true"
                          className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500 ${
                            activeCapIdx === idx ? "bg-[#2563EB]/22 opacity-100" : "bg-[#2563EB]/18 opacity-35"
                          }`}
                        />
                        <div className="text-center">
                          <div className="mx-auto w-fit recessed-well recessed-well--inset p-2.5 rounded-[16px] transition-all duration-300 group-hover:bg-white group-hover:shadow-[0_8px_20px_-14px_rgba(2,6,23,0.14)] group-hover:border-slate-200/80">
                            <Icon icon={it.icon} width={17} height={17} className="text-blue-700/75" style={{ strokeWidth: 1.5 }} />
                          </div>
                          <div className="mt-3 text-[15px] font-semibold tracking-[-0.03em] text-[var(--ink)] leading-[1.15]">
                            {it.title}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-200/70 flex-1">
                          <ul className="space-y-1.5 text-slate-600 text-left">
                            {it.points.map((p) => (
                              <li key={p} className="flex items-start gap-2.5">
                                <Icon icon="lucide:check" width={14} height={14} className="text-blue-700/70 mt-[2px]" style={{ strokeWidth: 1.5 }} />
                                <span className="text-[12px] leading-[1.5]">{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="soft-divider" />
      <section data-reveal="section" className="relative pt-10 sm:pt-14 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-[80px] bg-white overflow-visible elite-unclip">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.03] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_76%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_16%,rgba(30,162,255,0.015),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(37,99,235,0.018),transparent_70%)]" />
        <div className="container-page relative z-10">
          <div className="mx-auto w-full max-w-[1200px]">
          <div className="max-w-[980px] mx-auto">
            <motion.div
              className="bg-transparent"
              initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 0 : 16, scale: 0.995 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-transparent p-0">
                <motion.div
                  className="text-center max-w-3xl mx-auto"
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.h3
                    className="section-title text-[var(--ink)] leading-[1.08]"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Measurable, activation‑tied ROI
                  </motion.h3>
                  <motion.p
                    className="mt-5 text-[14px] md:text-[15px] text-slate-700 leading-[1.65] max-w-[66ch] mx-auto"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Not a “nice-to-have” UX: activation drives primacy, retention lift, and conversion.
                  </motion.p>
                </motion.div>

                <div className="mt-12">
                  <div className="grid md:grid-cols-3">
                    {[
                      { value: "+5%", label: "Retention lift" },
                      { value: "6+", label: "Card swipes / mo" },
                      { value: "11%", label: "Offer conversion" },
                    ].map((m, idx) => (
                      <motion.div
                        key={m.label}
                        className={`group relative py-4 md:py-5 ${
                          idx < 2 ? "md:border-r border-slate-200" : ""
                        }`}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.06 }}
                      >
                        <TerminalMetric value={m.value} label={m.label} reducedMotion={!!reducedMotion} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <div className="text-center max-w-3xl mx-auto">
                    <motion.h3
                      className="section-title mx-auto max-w-[30ch]"
                      initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 0 : 10 }}
                      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.55 }}
                      transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Built to ship fast &mdash; and prove value quickly.
                    </motion.h3>
                    <motion.p
                      className="mt-6 copy-lede"
                      initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 0 : 10 }}
                      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.55 }}
                      transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Deploy in weeks with a clean <span className="text-primary font-semibold">activation &rarr; outcomes</span> loop.
                    </motion.p>
                  </div>
                <motion.div
                  className="mt-10 flex flex-col items-center sm:flex-row sm:items-center gap-4 justify-center"
                  initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 0 : 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.52, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Magnetic disabled strength={8} radius={40}>
                      <Button
                        variant="flat"
                        color="default"
                      className="nav-btn-base btn-arrow-lead !w-full max-w-[320px] sm:max-w-none sm:!w-auto mx-auto sm:mx-0 !h-[52px] sm:!h-[42px] !px-7 text-[13px] font-semibold !rounded-[12px] sm:!rounded-[10px] bg-[#EFF6FF] text-[#2563EB] border border-[rgba(37,99,235,0.12)] hover:bg-[#DBEAFE] hover:border-[rgba(37,99,235,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                        startContent={<Icon icon="lucide:calendar" width={16} height={16} style={{ strokeWidth: 1.5 }} />}
                        endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={16} height={16} style={{ strokeWidth: 1.5 }} />}
                        onClick={openDemoModal}
                      >
                        Book a demo
                      </Button>
                    </Magnetic>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}