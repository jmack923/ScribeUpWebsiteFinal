import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Link as RouteLink } from "react-router-dom";
import { ClientLogoCarousel } from "../../components/client-logo-carousel";
import { AppDemoPhoneVideo } from "../../components/app-demo-media";
import { ImpactGraph } from "../../components/impact-graph";
import { IPhoneStory } from "../../components/iphone-story";
import { CountUp } from "../../components/count-up";
import { PaymentPrimacyGraphic, type PaymentOverlayMode } from "../../components/payment-primacy-graphic";
import { PlatformPartnersCarousel } from "../../components/platform-partners-carousel";
import { EASE_OUT } from "../../lib/motion";
import { useDemoModal } from "../../components/demo-modal-context";

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  return `${base}${path.replace(/^\//, "")}`;
}

function LedgerMetricCount({ value, reducedMotion }: { value: string; reducedMotion: boolean }) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-22% 0px -22% 0px" });

  const parsed = React.useMemo(() => {
    const m = value.trim().match(/^(\d+)(.*)$/);
    if (!m) return { n: 0, suffix: "" };
    return { n: Number(m[1] ?? 0), suffix: (m[2] ?? "").trim() };
  }, [value]);

  if (reducedMotion) {
    return (
      <span className="inline-flex items-start">
        <span className="tabular-nums">{parsed.n}</span>
        {parsed.suffix ? <span className="text-[0.55em] leading-none mt-[0.22em]">{parsed.suffix}</span> : null}
      </span>
    );
  }

  return (
    <span ref={ref} className="inline-flex items-start">
      <CountUp to={inView ? parsed.n : 0} duration={820} easing="expo" className="tabular-nums" />
      {parsed.suffix ? <span className="text-[0.55em] leading-none mt-[0.22em]">{parsed.suffix}</span> : null}
    </span>
  );
}

function SegmentedCTA({ className = "" }: { className?: string }) {
  const [active, setActive] = React.useState<"fintechs" | "credit-unions" | "banks">("fintechs");

  const items = [
    { key: "fintechs" as const, label: "Fintechs", to: "/who-we-serve/fintechs", icon: "lucide:cpu" },
    { key: "credit-unions" as const, label: "Credit Unions", to: "/who-we-serve/credit-unions", icon: "lucide:landmark" },
    { key: "banks" as const, label: "Banks", to: "/who-we-serve/banks", icon: "lucide:building-2" },
  ];

  return (
    <div className={`w-full md:w-auto ${className}`}>
      <div className="grid grid-cols-3 md:inline-flex w-full md:w-auto md:min-w-max items-center justify-between md:justify-start gap-1 bg-slate-50 p-1 rounded-[18px] md:rounded-full border border-slate-200/70 relative isolate">
        {items.map((it) => {
          const isActive = active === it.key;
          return (
            <RouteLink
              key={it.key}
              to={it.to}
              onClick={() => setActive(it.key)}
              onFocus={() => setActive(it.key)}
              className={`relative z-10 flex min-w-0 items-center justify-center gap-1.5 px-2.5 md:px-4 py-2 rounded-[14px] md:rounded-full text-[12px] md:text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-200 ease-out ${
                isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="segment-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/5 -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon
                icon={it.icon}
                width={13}
                height={13}
                className={`transition-colors ${isActive ? "text-blue-600" : "text-slate-400"}`}
                style={{ strokeWidth: 2 }}
              />
              <span className="whitespace-nowrap truncate">{it.label}</span>
            </RouteLink>
          );
        })}
      </div>
    </div>
  );
}

function MetricCount({ metric }: { metric: string }) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    if (!inView) return;
    setStarted(true);
  }, [inView]);

  const m = metric.match(/(\d+(?:\.\d+)?)(.*)/);
  const num = m ? Number(m[1]) : 0;
  const suffix = m ? m[2] : "";
  const decimals = m?.[1]?.includes(".") ? m[1].split(".")[1]?.length ?? 0 : 0;

  return (
    <span
      ref={ref}
      className="inline-flex items-baseline tabular-nums"
    >
      {started ? (
        <CountUp to={num} decimals={decimals} suffix={suffix} duration={900} easing="expo" />
      ) : (
        <>
          {"0"}
          {suffix}
        </>
      )}
    </span>
  );
}

export default function Home() {
  const { openDemoModal } = useDemoModal();
  const reducedMotion = useReducedMotion();
  const heroSectionRef = React.useRef<HTMLElement | null>(null);
  const heroInView = useInView(heroSectionRef as any, { once: false, margin: "-18% 0px -18% 0px" });
  const isSmallHero = React.useMemo(() => {
    try {
      return typeof window !== "undefined" && window.matchMedia?.("(max-width: 640px)")?.matches;
    } catch {
      return false;
    }
  }, []);
  const segmentRef = React.useRef<HTMLElement | null>(null);
  const segmentInView = useInView(segmentRef as any, { once: true, margin: "-18% 0px -18% 0px" });
  const segmentScroll = useScroll({ target: segmentRef, offset: ["start end", "end start"] }).scrollYProgress;
  const segmentParallaxY = useTransform(segmentScroll, [0, 1], [isSmallHero ? 4 : 7, isSmallHero ? -4 : -7]);
  const segmentSweepX = useTransform(segmentScroll, [0, 1], ["-35%", "135%"]);
  const [paymentOverlayMode, setPaymentOverlayMode] = React.useState<PaymentOverlayMode>("brands");
  const [heroCursorVisible, setHeroCursorVisible] = React.useState(false);
  const [heroCursorPressed, setHeroCursorPressed] = React.useState(false);
  // Hero headline: typewriter cycle on the key noun (elite “living system” feel).
  const heroWordCycle = React.useMemo(() => ["epicenter", "control hub", "payment-on-file", "cross-sell engine"] as const, []);
  const heroWordWidthCh = React.useMemo(() => Math.max(...heroWordCycle.map((w) => w.length)), [heroWordCycle]);
  const [heroWordIdx, setHeroWordIdx] = React.useState(0);
  const [heroWordPos, setHeroWordPos] = React.useState(heroWordCycle[0].length);
  const [heroWordDel, setHeroWordDel] = React.useState(false);
  const heroWordTimerRef = React.useRef<number | null>(null);
  // Hero “orbit” overlays: staggered icon swaps (different cadences) without positional jitter.
  const [heroOrbitSavedIdx, setHeroOrbitSavedIdx] = React.useState(0);
  const [heroOrbitMoneyIdx, setHeroOrbitMoneyIdx] = React.useState(0);
  const [heroOrbitCalIdx, setHeroOrbitCalIdx] = React.useState(0);
  const [heroOrbitRightIdx, setHeroOrbitRightIdx] = React.useState(0);
  const [heroOrbitMiniIdx, setHeroOrbitMiniIdx] = React.useState(0);
  // Keep "Trusted by" anchored on the left (no center→left shift).
  const heroCursorX = useMotionValue(0);
  const heroCursorY = useMotionValue(0);
  const heroCursorLeft = useTransform(heroCursorX, (v) => v - 30);
  const heroCursorTop = useTransform(heroCursorY, (v) => v - 30);
  const heroElRef = React.useRef<HTMLElement | null>(null);
  const heroMoveRaf = React.useRef<number | null>(null);
  const heroLastPt = React.useRef<{ x: number; y: number } | null>(null);

  const heroMx = useMotionValue(0);
  const heroMy = useMotionValue(0);
  const heroMxSpring = useSpring(heroMx, { stiffness: 110, damping: 24, mass: 0.5 });
  const heroMySpring = useSpring(heroMy, { stiffness: 110, damping: 24, mass: 0.5 });
  const gridParallaxX = useTransform(heroMxSpring, (v) => v * 4);
  const gridParallaxY = useTransform(heroMySpring, (v) => v * 4);
  const phoneParallaxX = useTransform(heroMxSpring, (v) => v * 6);
  const phoneParallaxY = useTransform(heroMySpring, (v) => v * 4);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const rm = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (rm) {
      setHeroWordIdx(0);
      setHeroWordPos(heroWordCycle[0].length);
      setHeroWordDel(false);
      return;
    }
    // Mobile readability: avoid partial typewriter states (looks like truncation).
    if (isSmallHero) {
      setHeroWordPos(heroWordCycle[heroWordIdx].length);
      setHeroWordDel(false);
      return;
    }
    const cur = heroWordCycle[heroWordIdx];
    const doneTyping = !heroWordDel && heroWordPos >= cur.length;
    const doneDeleting = heroWordDel && heroWordPos <= 0;
    const holdMs = doneTyping ? 1600 : doneDeleting ? 280 : 0;
    const speedMs = 24;

    if (heroWordTimerRef.current) window.clearTimeout(heroWordTimerRef.current);
    heroWordTimerRef.current = window.setTimeout(() => {
      if (doneTyping) {
        setHeroWordDel(true);
        return;
      }
      if (doneDeleting) {
        setHeroWordDel(false);
        setHeroWordIdx((v) => (v + 1) % heroWordCycle.length);
        return;
      }
      setHeroWordPos((v) => {
        const next = v + (heroWordDel ? -1 : 1);
        return Math.max(0, Math.min(cur.length, next));
      });
    }, Math.max(0, holdMs || speedMs));

    return () => {
      if (heroWordTimerRef.current) window.clearTimeout(heroWordTimerRef.current);
    };
  }, [heroWordIdx, heroWordPos, heroWordDel, heroWordCycle, isSmallHero]);

  // Mobile: swap full words (no partial) with a clean fade.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isSmallHero) return;
    if (reducedMotion) return;
    if (!heroInView) return;
    const id = window.setInterval(() => {
      setHeroWordIdx((v) => (v + 1) % heroWordCycle.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, [isSmallHero, reducedMotion, heroInView, heroWordCycle.length]);

  const heroOrbitSavedItems = React.useMemo(
    () =>
      [
        { k: "lock", icon: "lucide:lock", tone: "text-blue-700/90" },
        { k: "netflix", icon: "simple-icons:netflix", tone: "text-[#E50914]/90" },
        { k: "spotify", icon: "simple-icons:spotify", tone: "text-[#1DB954]/85" },
      ] as const,
    [],
  );
  const heroOrbitMoneyItems = React.useMemo(
    () =>
      [
        { k: "cal", icon: "lucide:calendar-check", tone: "text-blue-700/90" },
        { k: "youtube", icon: "simple-icons:youtube", tone: "text-[#FF0000]/85" },
        { k: "apple", icon: "simple-icons:apple", tone: "text-slate-900/85" },
      ] as const,
    [],
  );
  const heroOrbitCalItems = React.useMemo(
    () =>
      [
        { k: "sync", icon: "lucide:refresh-cw", tone: "text-blue-700/90" },
        { k: "amazon", icon: "simple-icons:amazon", tone: "text-[#FF9900]/85" },
        { k: "spotify", icon: "simple-icons:spotify", tone: "text-[#1DB954]/85" },
      ] as const,
    [],
  );
  const heroOrbitRightItems = React.useMemo(
    () =>
      [
        { k: "lock", icon: "lucide:lock", tone: "text-blue-700/90" },
        { k: "netflix", icon: "simple-icons:netflix", tone: "text-[#E50914]/90" },
        { k: "spotify", icon: "simple-icons:spotify", tone: "text-[#1DB954]/85" },
      ] as const,
    [],
  );
  // Iconify can lazy-load icon data; preload these so orbit swaps never flash blank.
  const heroOrbitPreloadIcons = React.useMemo(() => {
    const all = [
      ...heroOrbitSavedItems.map((x) => x.icon),
      ...heroOrbitMoneyItems.map((x) => x.icon),
      ...heroOrbitCalItems.map((x) => x.icon),
      ...heroOrbitRightItems.map((x) => x.icon),
    ].filter(Boolean) as string[];
    return Array.from(new Set(all));
  }, [heroOrbitSavedItems, heroOrbitMoneyItems, heroOrbitCalItems, heroOrbitRightItems]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (reducedMotion) return;
    if (!heroInView) return;

    const startDelayMs = 2200;
    let a: number | null = null;
    let b: number | null = null;
    let c: number | null = null;
    let d: number | null = null;
    let e: number | null = null;

    const t = window.setTimeout(() => {
      a = window.setInterval(() => setHeroOrbitSavedIdx((v) => (v + 1) % heroOrbitSavedItems.length), 5200);
      b = window.setInterval(() => setHeroOrbitMoneyIdx((v) => (v + 1) % heroOrbitMoneyItems.length), 6100);
      c = window.setInterval(() => setHeroOrbitCalIdx((v) => (v + 1) % heroOrbitCalItems.length), 5600);
      d = window.setInterval(() => setHeroOrbitRightIdx((v) => (v + 1) % heroOrbitRightItems.length), 4700);
      e = window.setInterval(() => setHeroOrbitMiniIdx((v) => (v + 1) % heroOrbitCalItems.length), 6900);
    }, startDelayMs);

    return () => {
      window.clearTimeout(t);
      if (a) window.clearInterval(a);
      if (b) window.clearInterval(b);
      if (c) window.clearInterval(c);
      if (d) window.clearInterval(d);
      if (e) window.clearInterval(e);
    };
  }, [
    reducedMotion,
    heroInView,
    heroOrbitSavedItems.length,
    heroOrbitMoneyItems.length,
    heroOrbitCalItems.length,
    heroOrbitRightItems.length,
  ]);

  const applyHeroMove = React.useCallback(() => {
    heroMoveRaf.current = null;
    const el = heroElRef.current;
    const pt = heroLastPt.current;
    if (!el || !pt) return;

    const rect = el.getBoundingClientRect();
    const localX = pt.x - rect.left;
    const localY = pt.y - rect.top;

    const px = rect.width ? localX / rect.width : 0.5;
    const py = rect.height ? localY / rect.height : 0.5;
    const nx = (px - 0.5) * 2;
    const ny = (py - 0.5) * 2;

    heroMx.set(nx);
    heroMy.set(ny);
    heroCursorX.set(localX);
    heroCursorY.set(localY);
  }, [heroCursorX, heroCursorY, heroMx, heroMy]);

  const onHeroMouseMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    heroElRef.current = e.currentTarget;
    heroLastPt.current = { x: e.clientX, y: e.clientY };
    if (heroMoveRaf.current != null) return;
    heroMoveRaf.current = window.requestAnimationFrame(applyHeroMove);
  }, [applyHeroMove]);

  const onHeroMouseLeave = React.useCallback(() => {
    if (heroMoveRaf.current != null) {
      window.cancelAnimationFrame(heroMoveRaf.current);
      heroMoveRaf.current = null;
    }
    heroMx.set(0);
    heroMy.set(0);
    setHeroCursorVisible(false);
    setHeroCursorPressed(false);
  }, [heroMx, heroMy]);

  const heroNodeLeft = heroOrbitSavedItems[heroOrbitSavedIdx] ?? heroOrbitSavedItems[0];
  const heroNodeRight = heroOrbitMoneyItems[heroOrbitMoneyIdx] ?? heroOrbitMoneyItems[0];
  const heroNodeMiniA = heroOrbitRightItems[heroOrbitRightIdx] ?? heroOrbitRightItems[0];
  const heroNodeMiniB = heroOrbitMoneyItems[(heroOrbitMoneyIdx + 1) % heroOrbitMoneyItems.length] ?? heroOrbitMoneyItems[0];
  const heroNodeMiniC = heroOrbitCalItems[heroOrbitMiniIdx] ?? heroOrbitCalItems[0];

  return (
    <div className="w-full page-shell">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute opacity-0 w-px h-px overflow-hidden"
        style={{ left: -9999, top: -9999 }}
      >
        {heroOrbitPreloadIcons.map((name) => (
          <Icon key={name} icon={name} width={16} height={16} />
        ))}
      </div>
      {/* HERO */}
      <section
        ref={heroSectionRef as any}
        className="home-hero relative overflow-visible elite-unclip"
        onMouseEnter={() => setHeroCursorVisible(true)}
        onMouseMove={onHeroMouseMove}
        onMouseLeave={onHeroMouseLeave}
        onMouseDown={() => setHeroCursorPressed(true)}
        onMouseUp={() => setHeroCursorPressed(false)}
      >
        {/* background effects */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-5" />
          {/* 1px dot-grid overlay (sovereign blueprint layer) */}
          <div className="absolute inset-0 dot-grid opacity-[0.05] [mask-image:radial-gradient(70%_70%_at_50%_18%,black,transparent_72%)]" />
          <motion.div
            aria-hidden="true"
            animate={reducedMotion || isSmallHero ? { y: 0, x: 0 } : { y: [0, -16, 0], x: [0, 6, 0] }}
            transition={reducedMotion || isSmallHero ? { duration: 0.2 } : { duration: 14, repeat: Infinity, ease: EASE_OUT }}
            className="absolute top-[6%] left-[52%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-400/1 via-sky-400/0 to-transparent opacity-40" 
          />
          <motion.div className="absolute inset-0" style={{ x: gridParallaxX, y: gridParallaxY }}>
            <div className="absolute inset-0 soft-grid opacity-[0.015]" />
          </motion.div>
        </div>
        {/* massive mouse-follow cobalt glow (ultra-faint) */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 hidden lg:block rounded-full blur-[110px]"
          style={{
            left: heroCursorX,
            top: heroCursorY,
            width: 760,
            height: 760,
            transform: "translate(-50%,-50%)",
            // keep it neutral-white (avoid “cheap blue” temperature)
            background: "radial-gradient(circle, rgba(241,245,249,0.10), rgba(255,255,255,0.02) 58%, transparent 72%)",
            opacity: heroCursorVisible ? 0.11 : 0,
          }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-20 hidden lg:block rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18),rgba(37,99,235,0.035)_58%,transparent_74%)] blur-[8px]"
          style={{
            left: heroCursorLeft,
            top: heroCursorTop,
            width: heroCursorPressed ? 74 : 60,
            height: heroCursorPressed ? 74 : 60,
            opacity: heroCursorVisible ? 0.32 : 0,
            scale: heroCursorPressed ? 1.05 : 1,
          }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
        />

        <div className="container-page relative z-10 pt-[clamp(18px,3.2vw,52px)] pb-0 lg:pt-[clamp(22px,3.0vw,56px)] lg:pb-0">
          {/* strict 1200px hero horizon: prevents any “left-smash” */}
          <div className="mx-auto w-full max-w-[1200px] lg:px-8 2xl:px-0">
          <div className="grid lg:grid-cols-[1.1fr_1fr] items-center gap-8 sm:gap-10 lg:gap-16 relative md:-translate-y-4 lg:-translate-y-5 xl:-translate-y-6">
            {/* LEFT COLUMN - Content */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="min-w-0 lg:col-span-1 lg:pt-0 xl:pt-0 lg:self-center flex flex-col items-center xl:items-start text-center xl:text-left"
            >
              {/* Constrained column (Atomic-style): keep the hero copy in a precise stacked lane */}
              <div className="max-w-[600px] mx-auto xl:mx-0">
              <p className="wayfinder w-fit mx-auto xl:mx-0">ScribeUp</p>
              <h1 className="mt-8 mb-6 text-pretty text-[clamp(1.85rem,5vw,3.45rem)] md:text-[clamp(2.2rem,6.0vw,3.45rem)] leading-[1.15] md:leading-[1.08] lg:leading-[1.02] tracking-[-0.05em] font-medium text-[var(--ink)] max-w-full">
                <span className="block">Turn your banking app</span>
                <span className="block">into the</span>
                <span className="block w-full text-center xl:text-left">
                  <span
                    className="relative inline-flex items-baseline justify-center xl:justify-start font-medium text-blue-700 w-fit xl:whitespace-nowrap"
                    style={{ minWidth: `${heroWordWidthCh}ch` }}
                  >
                  {isSmallHero ? (
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={heroWordCycle[heroWordIdx]}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="whitespace-nowrap inline-block text-center"
                        style={{ minWidth: `${heroWordWidthCh}ch` }}
                      >
                        {heroWordCycle[heroWordIdx]}
                      </motion.span>
                    </AnimatePresence>
                  ) : (
                    <span className="relative inline-flex items-baseline whitespace-normal xl:whitespace-nowrap">
                      <span className="whitespace-nowrap">{heroWordCycle[heroWordIdx].slice(0, heroWordPos)}</span>
                      <motion.span
                        aria-hidden="true"
                        className="ml-[2px] inline-block w-[2px] h-[0.85em] translate-y-[0.08em] bg-blue-600/90 rounded-full"
                        animate={reducedMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
                        transition={reducedMotion ? { duration: 0.2 } : { duration: 0.9, repeat: Infinity, ease: "linear" }}
                      />
                    </span>
                  )}
                  </span>
                </span>
                <span className="block">for a user&apos;s bills</span>
              </h1>
              
              <p className="mt-0 mb-8 text-slate-700 text-[15px] md:text-[15px] leading-[1.6] max-w-[48ch] text-balance font-normal tracking-[-0.01em] mx-auto xl:mx-0">
                Embed subscription management directly inside your digital experience. Help customers save money, stay in control, and give them a reason to make your app their financial home.
              </p>

              {/* Mobile CTAs (stacked, full-width, tap-safe) */}
              <div className="mt-6 w-full md:hidden flex flex-col gap-3">
                <Button
                  variant="flat"
                  color="default"
                  className="w-full nav-btn-base btn-s-tier btn-arrow-lead !h-[52px] !min-h-[52px] !px-6 !rounded-[12px] text-[14px] font-semibold border border-slate-200/70 bg-white hover:bg-slate-50 flex justify-center items-center"
                  startContent={<Icon icon="lucide:calendar" width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                  endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                  onClick={openDemoModal}
                >
                  Book a demo
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 items-center justify-center xl:justify-start hidden md:flex">
                <Button
                  variant="flat"
                  color="default"
                  className="nav-btn-base btn-s-tier btn-arrow-lead !h-[44px] !px-6 text-[13px] font-semibold border border-slate-200/70 bg-white hover:bg-slate-50"
                  startContent={<Icon icon="lucide:calendar" width={15} height={15} style={{ strokeWidth: 1.5 }} />}
                  endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={15} height={15} style={{ strokeWidth: 1.5 }} />}
                  onClick={openDemoModal}
                >
                  Book a demo
                </Button>
              </div>

              </div>
            </motion.div>

            {/* RIGHT COLUMN - iPhone */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-0 w-full lg:col-span-1 flex justify-center lg:justify-center lg:pt-0 relative isolate mt-8 sm:mt-10 lg:mt-0 overflow-hidden lg:overflow-visible elite-unclip"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" />

              {/* IMPORTANT: keep this wrapper w-fit so orbit assets position relative to the PHONE,
                  not the full-width column (prevents “pushed way left” overlays). */}
              <motion.div
                style={{
                  x: phoneParallaxX,
                  y: phoneParallaxY,
                }}
                className="hero-phone-uncrop relative z-20 w-fit max-w-full mx-auto origin-top scale-[0.88] sm:scale-[0.94] md:scale-[0.94] lg:scale-[0.92] lg:-translate-x-1 xl:-translate-x-2 -translate-y-4 sm:-translate-y-6 lg:-translate-y-6"
              >
                <div className="relative inline-block">
                  {/* removed: bottom bloom was reading as a “glare card” under the device */}
                  {/* FORCE DOM injection: premium floating nodes */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute z-50 hidden sm:flex items-center justify-center hero-node hero-node-float w-14 h-14"
                    style={{ left: -44, top: "36%" }}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={heroNodeLeft.k}
                        initial={{ opacity: 0, y: 3, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -2, scale: 0.97 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="grid place-items-center"
                      >
                        <Icon icon={heroNodeLeft.icon} width={20} height={20} className={heroNodeLeft.tone} style={{ strokeWidth: 1.5 }} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute z-50 hidden sm:flex items-center justify-center hero-node hero-node-float w-14 h-14"
                    style={{ right: -34, bottom: "34%", animationDelay: "-1.1s" }}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={heroNodeRight.k}
                        initial={{ opacity: 0, y: 3, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -2, scale: 0.97 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="grid place-items-center"
                      >
                        <Icon icon={heroNodeRight.icon} width={20} height={20} className={heroNodeRight.tone} style={{ strokeWidth: 1.5 }} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {/* Rebuilt orbit cluster (anchored to phone bounds) */}
                  <div
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute z-40 hidden sm:flex items-center justify-center h-11 w-11 hero-node right-full mr-6 top-[78%] -mt-6",
                      reducedMotion ? "" : "hero-node-float",
                    ].join(" ")}
                    style={reducedMotion ? undefined : { animationDelay: "-0.9s", animationDuration: "6.2s" }}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={heroNodeMiniA.k}
                        initial={{ opacity: 0, y: 2, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -2, scale: 0.97 }}
                        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                        className="grid place-items-center"
                      >
                        <Icon icon={heroNodeMiniA.icon} width={18} height={18} className={heroNodeMiniA.tone} style={{ strokeWidth: 1.5 }} />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute z-40 hidden sm:flex items-center justify-center h-11 w-11 hero-node left-full ml-6 top-[34%] -mt-6",
                      reducedMotion ? "" : "hero-node-float",
                    ].join(" ")}
                    style={reducedMotion ? undefined : { animationDelay: "-2.1s", animationDuration: "6.8s" }}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={heroNodeMiniB.k}
                        initial={{ opacity: 0, y: 2, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -2, scale: 0.97 }}
                        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                        className="grid place-items-center"
                      >
                        <Icon icon={heroNodeMiniB.icon} width={18} height={18} className={heroNodeMiniB.tone} style={{ strokeWidth: 1.5 }} />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute z-40 hidden sm:flex items-center justify-center h-11 w-11 hero-node right-full mr-12 top-[46%] -mt-6",
                      reducedMotion ? "" : "hero-node-float",
                    ].join(" ")}
                    style={reducedMotion ? undefined : { animationDelay: "-1.6s", animationDuration: "5.9s" }}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={heroNodeMiniC.k}
                        initial={{ opacity: 0, y: 2, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -2, scale: 0.97 }}
                        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                        className="grid place-items-center"
                      >
                        <Icon icon={heroNodeMiniC.icon} width={18} height={18} className={heroNodeMiniC.tone} style={{ strokeWidth: 1.5 }} />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <motion.div
                    // 0° orientation + centered authority (Atomic/Knot benchmark)
                    className="relative z-20 origin-center lg:translate-y-[10px] xl:translate-y-[8px] transform-gpu"
                animate={reducedMotion ? { y: 0 } : { y: [0, -3, 0] }}
                transition={reducedMotion ? { duration: 0.2 } : { duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
              >
                    <div className="relative inline-block isolate translate-y-[24px] lg:translate-y-[32px]">
                      <AppDemoPhoneVideo
                        startAt={0.15}
                        showBottomFade={false}
                        frameClassName="w-auto mx-0 max-w-[240px] sm:max-w-[260px] md:!max-w-[310px] w-full shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          </div>
        </div>

        {/* curve divider */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px left-0 right-0 w-full z-0"
          viewBox="0 0 1440 84"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C240,90 480,90 720,40 C960,-10 1200,-10 1440,40 L1440,84 L0,84 Z" fill="#ffffff" />
        </svg>
      </section>

      {/* Banner: Trusted by + client logo carousel + ICP buttons */}
      <section id="trusted-by" data-reveal="section" className="relative bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.03] [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid opacity-[0.015] [mask-image:radial-gradient(65%_65%_at_50%_30%,black,transparent_70%)]" />
        <div className="container-page pt-10 md:pt-[64px] pb-2 md:pb-3 relative z-10">
          <div className="pb-3 md:pb-4 lg:pb-5">
            <div className="mt-1 md:mt-2 max-w-[1200px] mx-auto">
              <motion.div
                className="flex w-full mb-6 md:mb-8 justify-center md:justify-start"
                initial={reducedMotion ? false : { opacity: 0, y: 10, x: 6 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-[13px] md:text-[12px] font-semibold text-blue-600 uppercase tracking-[0.15em] flex items-center justify-center md:justify-start">
                  Trusted by
                </div>
              </motion.div>
              
              <div className="w-full flex justify-center">
                <ClientLogoCarousel />
              </div>

              <div className="mt-2 md:mt-3 flex items-center justify-center">
                <p className="text-center text-[14px] text-slate-500">
                  and 30+ other financial institutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segment selector — above line break */}
      <section
        ref={segmentRef}
        id="segment-selector"
        data-reveal="section"
        className="relative bg-white overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.012] [mask-image:radial-gradient(65%_65%_at_50%_30%,black,transparent_72%)]" />
        <div className="container-page pt-6 sm:pt-8 md:pt-10 pb-7 sm:pb-14 md:pb-20 relative z-10">
          <motion.div
            className="mx-auto w-full max-w-[1200px] group flex justify-center"
            initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-full flex justify-center"
              style={{ y: reducedMotion || isSmallHero || !segmentInView ? 0 : (segmentParallaxY as any) }}
            >
              <div className="relative isolate flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 bg-transparent md:bg-white border-0 md:border md:border-slate-200/80 rounded-2xl md:rounded-full px-0 md:pl-6 md:pr-2.5 py-0 md:py-2 shadow-none md:shadow-[0_3px_10px_rgba(0,0,0,0.025)] mx-auto w-full md:w-fit overflow-hidden">
                {!reducedMotion && !isSmallHero && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-24 opacity-[0.65] bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.10),transparent)]"
                    style={{ x: segmentSweepX as any }}
                  />
                )}
                <p className="w-full md:w-auto rounded-[18px] md:rounded-none border border-slate-200/80 md:border-0 bg-white md:bg-transparent px-4 py-3 md:px-0 md:py-0 text-[12.5px] md:text-[13.5px] font-semibold tracking-[0.06em] text-slate-700 uppercase whitespace-nowrap text-center md:text-left shadow-[0_3px_10px_rgba(0,0,0,0.02)] md:shadow-none">
                  Learn more for your segment
                </p>
                
                <div aria-hidden="true" className="hidden md:block w-px h-7 bg-slate-200 shrink-0" />

                <div className="w-full md:w-auto rounded-[18px] md:rounded-none border border-slate-200/80 md:border-0 bg-white md:bg-transparent px-2 py-2 md:p-0 shadow-[0_3px_10px_rgba(0,0,0,0.02)] md:shadow-none">
                  <SegmentedCTA className="w-full md:w-auto" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div aria-hidden="true" className="bg-white py-2 md:py-3">
        <div className="soft-divider" />
      </div>

      {/* ROI: performance ledger */}
      <section id="roi" data-reveal="section" className="relative bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.03] [mask-image:radial-gradient(60%_55%_at_50%_18%,black,transparent_72%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid opacity-[0.015] [mask-image:radial-gradient(65%_65%_at_50%_18%,black,transparent_72%)]" />
        <div className="container-page section-pad-tight roi-tight-top relative z-10">
          <motion.div
            className="mx-auto max-w-[1040px] text-center lg:text-left"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="mt-3 md:mt-4 section-title leading-[1.08] text-[var(--ink)] max-w-[32ch] text-balance mx-auto lg:mx-0">
              Customers achieve <span className="text-[#2563EB]">5x ROI</span> with ScribeUp&apos;s bill management solutions.
            </h2>
            <p className="mt-6 copy-lede max-w-[62ch] mx-auto lg:mx-0">
              Drive measurable outcomes that reinforce your product as the primary financial home.
            </p>
          </motion.div>

          <div className="mt-10">
            <div className="mx-auto max-w-[1040px] w-full px-0">
              <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-0 items-center text-center md:text-left">
                {[
                  { metric: "6+", label: "Card Primacy", detail: "Additional monthly card swipes" },
                  { metric: "5%+", label: "Deepen Engagement", detail: "Lift in banking user retention" },
                  { metric: "11%", label: "Personalized Cross‑Sell", detail: "In-app conversion" },
                ].map((m, i) => (
                  <motion.div
                    key={m.label}
                    className={`group px-4 md:px-8 py-3.5 md:py-4 w-full ${i < 2 ? "md:border-r border-slate-200" : ""}`}
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.55 }}
                    transition={{ duration: 0.55, delay: Math.min(i * 0.06, 0.18), ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="text-[12px] uppercase tracking-[0.15em] font-medium text-slate-500">
                      {m.label}
                    </div>
                    <div className="mt-3 text-[40px] md:text-[64px] font-light tracking-[-0.05em] leading-none text-slate-900">
                      <LedgerMetricCount value={m.metric} reducedMotion={reducedMotion} />
                    </div>
                    <div className="mt-2 text-[14px] leading-[1.6] text-slate-600">
                      {m.detail}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="bg-white py-3 md:py-4">
        <div className="soft-divider" />
      </div>

      {/* User expectation - adopt or lose */}
      <section id="user-expectation" data-reveal="section" className="relative section-haze section-pad-tight bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-[-160px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,#F8FAFC,transparent_68%)] blur-3xl opacity-40" />
          <div className="absolute -right-24 top-[10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,#F8FAFC,transparent_70%)] blur-3xl opacity-40" />
          <div className="absolute inset-0 distance-grid opacity-[0.03] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
          {/* Dot-grid (Elite Master Audit): only here, at 5% opacity */}
          <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-[0.03] [mask-image:radial-gradient(65%_65%_at_50%_18%,black,transparent_72%)]" />
        </div>
        <div className="container-page">
          <div className="relative grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start tablet-stack-2col">
            <motion.div
              className="max-w-2xl lg:max-w-none mx-auto lg:mx-0 text-center lg:text-left"
              initial={reducedMotion ? false : { opacity: 0, x: isSmallHero ? 0 : -14, y: 10 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.h2
                className="mt-2 section-title leading-[1.08] max-w-[30ch] mx-auto lg:mx-0"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.65 }}
                transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                Your{" "}
                <span className="text-primary font-semibold">
                  customers expect subscription management
                </span>{" "}
                from their primary financial app
              </motion.h2>
              <motion.p
                className="mt-4 copy-lede max-w-[62ch] mx-auto lg:mx-0"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                If your financial app doesn’t help customers manage their bills, they’ll turn to one that does.
              </motion.p>
            </motion.div>

            {/* Right (55%): shared-wall bento (match Integration card system) */}
            <motion.div
              className="w-full max-w-[460px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[500px] xl:max-w-[520px] mx-auto lg:mx-0 lg:justify-self-end rounded-[32px] bg-[#E2E8F0] p-px overflow-hidden lg:scale-[0.96] origin-top transform-gpu shadow-[0_14px_34px_-14px_rgba(15,23,42,0.12)]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative bg-white">
                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/45" />

                {/* Consumer demand */}
                <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-4 sm:pb-5">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-[10px] bg-[#EFF6FF] border border-blue-200/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] flex items-center justify-center shrink-0">
                        <Icon icon="lucide:trending-up" width={16} height={16} className="text-blue-700/85" />
                      </div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                        Consumer Demand
                      </div>
                    </div>
                  <div className={`h-1.5 w-1.5 rounded-full bg-blue-500 ${isSmallHero ? "opacity-70" : "animate-pulse"}`} />
                  </div>

                  <motion.div
                    className="grid gap-3"
                    initial={reducedMotion ? false : "hidden"}
                    whileInView={reducedMotion ? undefined : "show"}
                    viewport={{ once: true, amount: 0.45 }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                  >
                    <motion.div
                      className="group relative bg-white border border-slate-200/70 rounded-[18px] sm:rounded-[20px] p-3 sm:p-4 transition-[box-shadow,border-color] duration-300 hover:border-slate-300/70 hover:shadow-[0_0_0_4px_#F8FAFC,0_10px_26px_-18px_rgba(2,6,23,0.14)]"
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                      }}
                    >
                      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/14 opacity-70" />
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="min-w-[72px] sm:min-w-[80px] shrink-0 whitespace-nowrap text-[18px] sm:text-[20px] font-bold text-slate-900 leading-none mt-0.5 tracking-tight">
                            <span className="mr-1.5">Top</span>
                            <MetricCount metric="3" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[13.5px] font-bold text-slate-900 tracking-tight">Desired banking feature</div>
                            <div className="mt-1 text-[12px] text-slate-500 leading-relaxed">Amongst US consumers</div>
                          </div>
                        </div>
                        <span className="text-[8.5px] font-bold text-slate-600 bg-[#F8FAFC] border border-slate-200/70 px-1.5 py-px rounded-md uppercase tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] whitespace-nowrap">
                          Consumers
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="group relative bg-white border border-slate-200/70 rounded-[18px] sm:rounded-[20px] p-3 sm:p-4 transition-[box-shadow,border-color] duration-300 hover:border-slate-300/70 hover:shadow-[0_0_0_4px_#F8FAFC,0_10px_26px_-18px_rgba(2,6,23,0.14)]"
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                      }}
                    >
                      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/14 opacity-70" />
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="min-w-[72px] sm:min-w-[80px] shrink-0 whitespace-nowrap text-[18px] sm:text-[20px] font-bold text-slate-900 leading-none mt-0.5 tracking-tight">
                            <MetricCount metric="50%" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[13.5px] font-bold text-slate-900 tracking-tight">Would switch primary financial apps</div>
                            <div className="mt-1 text-[12px] text-slate-500 leading-relaxed">For subscription management</div>
                          </div>
                        </div>
                        <span className="text-[8.5px] font-bold text-slate-600 bg-[#F8FAFC] border border-slate-200/70 px-1.5 py-px rounded-md uppercase tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] whitespace-nowrap">
                          Gen Z + Millennials
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* Outcomes we deliver */}
                <div className="px-4 sm:px-6 py-5 sm:py-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-8 w-8 rounded-[10px] bg-emerald-50 border border-emerald-200/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] flex items-center justify-center shrink-0">
                      <Icon icon="lucide:smile-plus" width={16} height={16} className="text-emerald-700/80" />
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      Outcomes we deliver
                    </div>
                  </div>

                  <motion.div
                    className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-3.5 sm:mb-4"
                    initial={reducedMotion ? false : "hidden"}
                    whileInView={reducedMotion ? undefined : "show"}
                    viewport={{ once: true, amount: 0.45 }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                  >
                    <motion.div
                      className="group relative bg-white border border-slate-200/70 rounded-[16px] sm:rounded-[20px] p-3.5 sm:p-4 transition-[box-shadow,border-color] duration-300 hover:border-slate-300/70 hover:shadow-[0_0_0_4px_#F8FAFC,0_10px_24px_-18px_rgba(2,6,23,0.12)]"
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                      }}
                    >
                      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-500/12 opacity-70" />
                      <div className="text-[24px] font-bold text-slate-900 tabular-nums tracking-tight">
                        <MetricCount metric="60%" />
                      </div>
                      <div className="mt-2 text-[11.5px] text-slate-600 leading-snug">of users discover a bill they didn&apos;t realize they were paying for</div>
                    </motion.div>
                    <motion.div
                      className="group relative bg-white border border-slate-200/70 rounded-[16px] sm:rounded-[20px] p-3.5 sm:p-4 transition-[box-shadow,border-color] duration-300 hover:border-slate-300/70 hover:shadow-[0_0_0_4px_#F8FAFC,0_10px_24px_-18px_rgba(2,6,23,0.12)]"
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                      }}
                    >
                      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-500/12 opacity-70" />
                      <div className="text-[24px] font-bold text-slate-900 tabular-nums tracking-tight">
                        <MetricCount metric="4.5+" />
                      </div>
                      <div className="mt-2 text-[11.5px] text-slate-600 leading-snug">average user rating (out of 5)</div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="rounded-[16px] sm:rounded-[20px] border border-slate-200/70 bg-white p-4 sm:p-5 relative overflow-hidden shadow-[0_0_0_4px_#F8FAFC,0_10px_26px_-18px_rgba(2,6,23,0.14)]"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                      <Icon icon="lucide:quote" width={24} height={24} className="text-slate-700" />
                    </div>
                    <div className="relative z-10">
                      <div className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.15em] mb-3">User anecdote</div>
                      <p className="text-[14px] text-slate-800 font-medium leading-relaxed italic">
                        &ldquo;Caught subscriptions I didn&apos;t even know I had.&rdquo;
                      </p>
                      <p className="mt-2 text-[14px] text-slate-800 font-medium leading-relaxed italic">
                        &ldquo;All my subscriptions in one place. This should be in every banking app.&rdquo;
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clear break before Complete control */}
      <div aria-hidden="true" className="bg-white py-4 md:py-5">
        <div className="soft-divider" />
      </div>

      <IPhoneStory />

      {/* Extra breathing room on mobile: preview → header */}
      <div aria-hidden="true" className="bg-white py-7 md:py-4">
        <div className="soft-divider" />
      </div>

      {/* Empower your payment forms */}
      <section
        id="payment-primacy"
        data-reveal="section"
        className="relative section-haze section-pad-tight bg-white overflow-hidden"
      >
        {/* ultra-soft “elite” backdrop blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-[-140px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,#F8FAFC,transparent_68%)] blur-3xl opacity-80" />
          <div className="absolute -right-24 bottom-[-160px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,#F8FAFC,transparent_70%)] blur-3xl opacity-80" />
          <div className="absolute inset-0 distance-grid opacity-[0.04] [mask-image:radial-gradient(55%_55%_at_50%_18%,black,transparent_74%)]" />
        </div>
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center tablet-stack-2col">
            <motion.div
              className="min-w-0 max-w-[480px] mx-auto lg:mx-0 mt-6 lg:mt-0 text-center lg:text-left"
              initial={reducedMotion ? false : { opacity: 0, x: -12, y: 10 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="mt-0 mb-4 section-title max-w-[24ch] leading-[1.08] mx-auto lg:mx-0">
                Bring your payment forms to the subscription age
              </h2>
              <div className="mt-2 min-h-[80px] flex items-start justify-center lg:justify-start">
                <p className="copy-lede text-center lg:text-left text-balance">
                  Your payment forms unlock bill detection and control, driving users to move external bills onto your
                  accounts
                </p>
              </div>
            </motion.div>
            <motion.div
              className="order-first lg:order-none min-w-0 w-full flex justify-center lg:justify-end overflow-hidden"
              initial={reducedMotion ? false : { opacity: 0, x: 12, y: 10, scale: 0.995 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Important: keep the graphic constrained to the grid column width to prevent overlap */}
              <div className="w-full max-w-none">
                <div className="relative will-change-transform">
                  <PaymentPrimacyGraphic onOverlayModeChange={setPaymentOverlayMode} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* breathing room: prevent Payment → Integration feeling “stacked” */}
      <div aria-hidden="true" className="bg-white py-4 md:py-5">
        <div className="soft-divider" />
      </div>

      {/* Easily integrated into your experiences */}
      <section
        id="integration"
        data-reveal="section"
        className="relative section-haze section-pad-tight bg-white overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.08] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_10%,rgba(30,162,255,0.028),transparent_70%),radial-gradient(55%_55%_at_86%_18%,rgba(15,25,45,0.028),transparent_74%)]" />
        <div className="container-page">
          {/* Atmospheric glow behind the integration cards (engineered layer, not a block) */}
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[110%] h-[520px] atmo-glow-lavender blur-[96px] opacity-[0.38]" />
          {/* Single lane: prevents header-left / module-centered drift */}
          <div className="mx-auto w-full max-w-[1200px]">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="mt-4 section-title mx-auto">
                Easily integrated into your experiences
              </h2>
              <p className="mt-4 copy-lede max-w-[62ch] mx-auto">
                ScribeUp is designed to flexibly integrate directly into your existing infrastructure. Typical implementation in 30 to 45 days.
              </p>
            </motion.div>

            <motion.div
              className="mt-12 relative"
              initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.995 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full max-w-[1040px] mx-auto px-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 mb-4">
                  Choose what fits your stack
                </p>
              </div>
              <div aria-hidden="true" className="hidden md:block h-px w-full bg-[linear-gradient(90deg,transparent,rgba(226,232,240,1),transparent)] opacity-90" />

              <div className="mt-6 md:mt-8 w-full max-w-[1040px] mx-auto">
                <div className="rounded-[28px] bg-[#E2E8F0] p-px overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-px bg-[#E2E8F0]">
                    {[
                    {
                      icon: "lucide:code-2",
                      title: "Embeddable iframe",
                      description: "Add subscription management UI with a few lines of code.",
                      method: "IFRAME",
                    },
                    {
                      icon: "lucide:smartphone",
                      title: "Mobile-native SDK",
                      description: "Integrate natively into your app—indistinguishable from your broader experience.",
                      method: "SDK",
                    },
                    {
                      icon: "lucide:plug-zap",
                      title: "API-based",
                      description: "Nest bill management features like 1-click cancellation, 1-click payment updating, and recurrence detection throughout your app via API.",
                      method: "API",
                    },
                  ].map((tile) => (
                    <div
                      key={tile.title}
                      className="group relative bg-white border border-slate-200 p-5 sm:p-6 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(2,6,23,0.05)]"
                    >
                      <div className="flex items-start justify-between mb-8">
                        <span className="inline-flex items-center h-6 px-2.5 rounded-[10px] border border-blue-600/15 bg-[#EFF6FF] text-blue-700 font-mono text-[10px] uppercase tracking-[0.14em] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                          {tile.method}
                        </span>
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-slate-200/70 bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
                          <Icon icon={tile.icon} width={18} height={18} className="text-blue-700/70" style={{ strokeWidth: 1.5 }} />
                        </div>
                      </div>

                      <h3 className="text-[16px] font-semibold tracking-[-0.03em] text-[var(--ink)]">
                        {tile.title}
                      </h3>
                      <p className="mt-2 text-[13px] text-slate-600 leading-relaxed">
                        {tile.description}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Unified Footer: Partner Dock + CTAs */}
                <div className="bg-white border-t border-[#E2E8F0] px-6 md:px-8 py-6">
                  <p className="text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-4">
                    Pre-integrated into leading digital banking platforms
                  </p>
                  <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-stretch md:items-center w-full">
                    <div className="partner-logo-dock grid grid-cols-6 md:grid-cols-5 justify-items-center md:justify-items-start items-center gap-x-4 gap-y-3 md:gap-x-6 md:gap-y-3 order-2 md:order-1">
                      <img src={withBase("assets/partners/q2.svg")} alt="Q2" width={180} height={40} loading="lazy" decoding="async" className="w-auto transition-all duration-300 col-span-3 md:col-span-1 justify-self-center md:justify-self-auto" />
                      <img src={withBase("assets/partners/alkami.svg")} alt="Alkami" width={180} height={40} loading="lazy" decoding="async" className="w-auto transition-all duration-300 col-span-3 md:col-span-1 justify-self-center md:justify-self-auto" />
                      <img src={withBase("assets/partners/lumin.svg")} alt="Lumin" width={180} height={40} loading="lazy" decoding="async" className="w-auto transition-all duration-300 col-span-2 md:col-span-1 justify-self-center md:justify-self-auto" />
                      <img src={withBase("assets/partners/banno.svg")} alt="Banno" width={180} height={40} loading="lazy" decoding="async" className="w-auto transition-all duration-300 col-span-2 md:col-span-1 justify-self-center md:justify-self-auto" />
                      <img src={withBase("assets/partners/candescent.svg")} alt="Candescent" width={180} height={40} loading="lazy" decoding="async" className="w-auto transition-all duration-300 col-span-2 md:col-span-1 justify-self-center md:justify-self-auto" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2.5 md:gap-3 w-full md:w-auto order-1 md:order-2">
                      <Button
                        as={RouteLink as any}
                        to="/solution"
                        variant="flat"
                        color="default"
                        className="nav-btn-base btn-s-tier btn-arrow-lead w-full md:w-auto !h-[46px] md:!h-[40px] !min-h-[46px] md:!min-h-[40px] !px-5 text-[12.5px] font-semibold !rounded-[10px] border border-slate-200/70 bg-white hover:bg-slate-50 flex justify-center items-center"
                        endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={14} height={14} style={{ strokeWidth: 1.5 }} />}
                      >
                        Learn More
                      </Button>
                      <Button
                        variant="flat"
                        color="default"
                        className="btn-obsidian nav-btn-base btn-arrow-lead w-full md:w-auto !h-[46px] md:!h-[40px] !min-h-[46px] md:!min-h-[40px] !px-5 text-[12.5px] font-semibold !rounded-[10px] flex justify-center items-center"
                        startContent={<Icon icon="lucide:calendar" width={14} height={14} style={{ strokeWidth: 1.5 }} />}
                        endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={14} height={14} style={{ strokeWidth: 1.5 }} />}
                        onClick={openDemoModal}
                      >
                        Book a demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* breathing room: prevent Integration → Trust/Security from visually colliding */}
      <div aria-hidden="true" className="bg-white py-4 md:py-5">
        <div className="soft-divider" />
      </div>

      {/* Bank-grade security & compliance */}
      <section
        id="trust-security"
        data-reveal="section"
        className="relative section-haze section-pad-tight bg-white overflow-hidden pt-16 md:pt-20 pb-8 md:pb-10"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_10%,rgba(30,162,255,0.02),transparent_70%),radial-gradient(55%_55%_at_86%_18%,rgba(15,25,45,0.015),transparent_74%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.04] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_70%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid opacity-[0.02] [mask-image:radial-gradient(70%_70%_at_50%_12%,black,transparent_72%)]" />
        <div className="container-page">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="mt-4 section-title max-w-[24ch] mx-auto">
              Bank‑grade security & compliance
            </h2>
            <p className="mt-4 copy-lede mx-auto">
              ScribeUp meets the strictest standards for financial data handling and system security.
            </p>
          </motion.div>

          <motion.div
            className="mt-7 max-w-6xl mx-auto"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full flex justify-center">
              <div className="inline-grid w-fit grid-cols-1 sm:grid-cols-3 rounded-[24px] border border-slate-200/70 bg-white shadow-[0_0_0_4px_#F8FAFC] overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-slate-200/70">
                {[
                  { label: "SOC 2 Type II", status: "Certified", icon: "lucide:file-badge-2" },
                  { label: "PCI DSS Level 1", status: "Compliant", icon: "lucide:shield-check" },
                  { label: "256-bit Encryption", status: "Standard", icon: "lucide:lock-keyhole" },
                ].map((b, i) => (
                  <div
                    key={b.label}
                    className="group relative bg-white px-7 py-7 md:px-9 md:py-7 transition-all duration-300 hover:bg-slate-50/50 hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.01)]"
                  >
                    <div className="flex items-center justify-center gap-4 min-w-0 text-center">
                      <div className="recessed-well recessed-well--inset p-3 rounded-[18px] shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm group-hover:border-blue-200/50">
                        <Icon icon={b.icon} width={20} height={20} className="text-blue-700/75 transition-colors group-hover:text-blue-600" style={{ strokeWidth: 1.5 }} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[14px] font-semibold tracking-[-0.02em] text-slate-900 leading-[1.2]">
                          {b.label}
                        </div>
                        <div className="mt-2 inline-flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500/45" />
                          <span className="text-[12px] font-medium uppercase tracking-[0.15em] text-slate-500">
                            {b.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-6 flex justify-center"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              as={RouteLink as any}
              to="/about"
              variant="light"
              className="group h-[34px] px-5 rounded-full border border-slate-200 bg-white/50 hover:bg-white hover:border-slate-300 text-[13px] font-semibold text-slate-700 transition-all"
              endContent={<Icon icon="lucide:arrow-right" width={16} height={16} className="text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />}
            >
              Visit Trust Center
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
