import React from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import { APP_DEMO_VIDEO_SRC } from "./app-demo-media";
import { useVisibility } from "./performance/VisibilityManager";

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const basePath = base === "/" ? "" : base.replace(/\/$/, "");
  return `${basePath}/${path.replace(/^\//, "")}`;
}

export type PhoneShowcaseMode = "App usage" | "Monthly savings" | "Card primacy" | "Discover" | "Alerts" | "Actions";

type PhoneShowcaseProps = {
  /** Which owned device render to use */
  device?: "phone" | "empower";
  /** Presentation style: show device chrome or render screen-only */
  presentation?: "device" | "screen";
  /** Which overlay state to show */
  mode?: PhoneShowcaseMode;
  /** Which overlay style to render */
  overlays?: "product" | "kpis" | "none";
  /** Visual size presets */
  size?: "hero" | "section" | "compact";
  /** Fine control for hero KPI toast overlays (avoid “sticker” feel) */
  heroKpiToasts?: "both" | "attOnly" | "none";
  className?: string;
};

const DEVICE_SRC: Record<NonNullable<PhoneShowcaseProps["device"]>, string> = {
  phone: APP_DEMO_VIDEO_SRC,
  empower: "/assets/empower-phone.svg",
};

const NOTIF_1 = "/assets/notification-1.svg";
const NOTIF_2 = "/assets/notification-2.svg";
const NOTIF_3 = "/assets/notification-3.svg";
const NOTIF_2_NEW = "/assets/notification-2-1.svg";
const NOTIF_3_NEW = "/assets/notification-3-1.svg";
const BRAND_ATT_FALLBACK = "/assets/brands/att.svg";
const BRAND_SPOTIFY_FALLBACK = "/assets/brands/spotify.svg";
// Prefer official assets if present (drop files into public/assets/brands/)
const BRAND_ATT_OFFICIAL = "/assets/brands/att-official.svg";
const BRAND_SPOTIFY_OFFICIAL = "/assets/brands/spotify-official.png";
const VIDEO_POSTER_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 1900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23eef2ff'/%3E%3Cstop offset='100%25' stop-color='%23f8fafc'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='1900' fill='url(%23g)'/%3E%3C/svg%3E";

function prefersReducedMotion() {
  try {
    return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  } catch {
    return false;
  }
}

function prefersReducedData() {
  try {
    const mq = window.matchMedia?.("(prefers-reduced-data: reduce)")?.matches;
    const saveData = (navigator as any)?.connection?.saveData === true;
    return Boolean(mq || saveData);
  } catch {
    return false;
  }
}

function BrandLogo({
  primarySrc,
  fallbackSrc,
  alt,
  className,
}: {
  primarySrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
}) {
  const [src, setSrc] = React.useState(primarySrc);
  const triedFallbackRef = React.useRef(false);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={120}
      height={40}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (triedFallbackRef.current) return;
        triedFallbackRef.current = true;
        setSrc(fallbackSrc);
      }}
    />
  );
}

function Toast({
  brand,
  brandLogo,
  title,
  time,
  body,
  tone = "slate",
}: {
  brand: { label: string; abbr: string; bgClass: string };
  brandLogo?: React.ReactNode;
  title: string;
  time: string;
  body: string;
  tone?: "slate" | "blue";
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200/85 backdrop-blur-lg shadow-[0_1px_2px_rgba(2,6,23,0.05),0_16px_52px_rgba(2,6,23,0.13)] px-[13px] py-[11px] ${
        tone === "blue"
          ? "bg-[linear-gradient(180deg,rgba(242,247,255,0.96),rgba(255,255,255,0.92))] ring-1 ring-blue-500/6"
          : "bg-[linear-gradient(180deg,rgba(248,251,255,0.94),rgba(255,255,255,0.90))]"
      }`}
    >
      {/* top highlight + subtle “glass” edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[0_1px_0_rgba(255,255,255,0.70)_inset]"
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          tone === "blue"
            ? "bg-[radial-gradient(60%_60%_at_12%_0%,rgba(37,99,235,0.10),transparent_62%),radial-gradient(55%_55%_at_88%_30%,rgba(30,162,255,0.08),transparent_66%)]"
            : "bg-[radial-gradient(60%_60%_at_12%_0%,rgba(37,99,235,0.085),transparent_62%),radial-gradient(55%_55%_at_88%_30%,rgba(30,162,255,0.06),transparent_66%)]"
        } opacity-100`}
      />
      <div className="flex items-start gap-3">
        <div
          className={`h-10 w-10 rounded-[16px] grid place-items-center border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.72))] shadow-[0_1px_0_rgba(255,255,255,0.75)_inset,0_14px_40px_rgba(2,6,23,0.10)] ${
            brand.bgClass ?? ""
          }`}
        >
          {brandLogo ? (
            brandLogo
          ) : (
            <span className="text-[12px] font-extrabold tracking-[-0.02em] text-white">{brand.abbr}</span>
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[12.5px] font-semibold text-[var(--ink)] leading-tight tracking-[-0.01em] truncate">{title}</div>
            <div className="text-[10px] text-slate-500/90 whitespace-nowrap">{time}</div>
          </div>
          <div className="mt-1 text-[11.5px] text-slate-600 leading-snug">
            {body}
          </div>
          <div className="mt-2 inline-flex items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/70 bg-white/70 px-2 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600/60" />
              1‑click
            </span>
            <span className="inline-flex items-center gap-1 text-[10.5px] text-slate-500/90">
              <Icon icon="lucide:lock" width={13} height={13} className="text-slate-400" />
              Embedded
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatChip({ label, value, icon, scale = "md" }: { label: string; value: string; icon: string; scale?: "md" | "lg" }) {
  const isLg = scale === "lg";
  return (
    <div
      className={`rounded-[12px] bg-white/90 backdrop-blur-lg border border-slate-200/80 shadow-[0_1px_2px_rgba(2,6,23,0.04),0_18px_54px_rgba(2,6,23,0.12)] ${isLg ? "px-4 py-3" : "px-3.5 py-2.5"}`}
    >
      <div className="flex items-center gap-2">
        <div className={`${isLg ? "h-9 w-9" : "h-8 w-8"} rounded-[10px] bg-slate-900/5 border border-slate-200/80 grid place-items-center text-slate-700`}>
          <Icon icon={icon} width={isLg ? 17 : 16} height={isLg ? 17 : 16} />
        </div>
        <div className="min-w-0">
          <div className={`${isLg ? "text-[11px]" : "text-[10.5px]"} uppercase tracking-[0.08em] text-slate-500 leading-none`}>{label}</div>
          <div className={`${isLg ? "text-[15px]" : "text-sm"} mt-1 font-semibold text-[var(--ink)] leading-none`}>{value}</div>
        </div>
      </div>
    </div>
  );
}

export function PhoneShowcase({
  device = "phone",
  presentation = "device",
  mode = "App usage",
  overlays = "product",
  size = "hero",
  heroKpiToasts = "both",
  className,
}: PhoneShowcaseProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-10% 0px -10% 0px", once: false });
  const mediaRef = React.useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = React.useState(false);
  const [videoReady, setVideoReady] = React.useState(false);
  const isVisible = useVisibility("phone-showcase-video");
  const rm = prefersReducedMotion();
  const rd = prefersReducedData();
  const [isMobile, setIsMobile] = React.useState(false);
  const base = DEVICE_SRC[device];
  const isScreen = presentation === "screen";
  const isVideo = base.endsWith(".mp4") || base.endsWith(".webm") || base.endsWith(".mov");
  const showVideo = isVideo && !videoError;

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    // Treat iPad (often 768px wide) as desktop for video loading policy.
    // Phones are the main case where we want ultra-conservative preloading.
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsMobile(!!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  React.useEffect(() => {
    const v = mediaRef.current;
    if (!v) return;
    let rafId: number | null = null;
    
    // In-view is sufficient for autoplay gating; isVisible is a perf optimization.
    const shouldPlay = () => (inView || isVisible) && !rm && !rd && document.visibilityState === "visible";

    const safePlay = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // iOS Safari quirks: ensure attributes are set before attempting autoplay.
        try {
          v.muted = true;
          v.playsInline = true;
          v.setAttribute("muted", "");
          v.setAttribute("playsinline", "");
          v.setAttribute("webkit-playsinline", "");
        } catch {}
        if (v.paused) v.play().catch(() => {});
        rafId = null;
      });
    };

    const pause = () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (!v.paused) v.pause();
      rafId = null;
    };

    // Simple visibility check - pause if tab is hidden to save resources
    const onVisChange = () => {
      if (document.visibilityState === "hidden") {
        pause();
      } else if (shouldPlay()) {
        safePlay();
      }
    };

    document.addEventListener("visibilitychange", onVisChange);
    
    // Initial check
    if (shouldPlay()) {
      safePlay();
    } else {
      pause();
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisChange);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [inView, isVisible, rm, rd]);

  const container = size === "hero"
    ? `relative mx-auto w-full ${isScreen ? "max-w-[320px]" : "max-w-[340px]"}`
    : size === "section"
      ? "relative mx-auto w-full max-w-[460px]"
      : "relative mx-auto w-full max-w-[380px]";

  const deviceShadow = size === "hero"
    ? isScreen
      ? "drop-shadow-[0_16px_40px_rgba(2,6,23,0.09)]"
      : "drop-shadow-[0_26px_56px_rgba(2,6,23,0.12)]"
    : "drop-shadow-[0_22px_52px_rgba(2,6,23,0.12)]";
  const chipScale = size === "hero" ? "lg" : "md";
  const notifWidth =
    size === "hero"
      ? "w-[17rem] md:w-[21rem]"
      : size === "section"
        ? "w-[13rem] md:w-[15.5rem]"
        : "w-[11rem] md:w-[13rem]";
  const notifRightPos =
    size === "hero"
      ? "left-full ml-4 md:ml-6 top-10"
      : size === "section"
        ? "left-full ml-3 md:ml-5 top-4"
        : "left-full ml-3 top-3";
  const notifLeftPos =
    size === "hero"
      ? "right-full mr-4 md:mr-6 top-14"
      : size === "section"
        ? "right-full mr-3 md:mr-5 top-8"
        : "right-full mr-3 top-6";
  const chipPosRight =
    size === "hero"
      ? "left-full ml-4 md:ml-6 top-9"
      : size === "section"
        ? "left-full ml-3 md:ml-5 top-3"
        : "left-full ml-3 top-2";
  const chipPosLeft =
    size === "hero"
      ? "right-full mr-4 md:mr-6 top-10"
      : size === "section"
        ? "right-full mr-3 md:mr-5 top-4"
        : "right-full mr-3 top-3";
  const productNotifSrc =
    mode === "Discover" || mode === "Monthly savings"
      ? NOTIF_3_NEW
      : mode === "Alerts"
        ? NOTIF_2_NEW
        : NOTIF_1;

  return (
    <div ref={wrapRef} className={`${container} overflow-visible ${className ?? ""}`}>
      {/* ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_62%)] blur-xl md:blur-2xl" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.045),transparent_64%)] blur-xl md:blur-2xl" />
      </div>

      <motion.div
        className="relative overflow-visible"
        animate={inView && !rm ? { y: [0, -3, 0] } : { y: 0 }}
        transition={inView && !rm ? { duration: 12, ease: [0.16, 1, 0.3, 1], repeat: Infinity } : { duration: 0.25 }}
      >
        <motion.div
          whileHover={
            rm
              ? undefined
              :
            isScreen
              ? { y: -1, scale: 1.006 }
              : size === "hero"
                ? { y: -1, scale: 1.006 }
                : { y: -4, scale: 1.02 }
          }
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Presentation */}
          <div
            className={`relative ${deviceShadow} ${
              isScreen ? "rounded-[24px]" : "rounded-[44px]"
            } overflow-hidden`}
            data-vis-id="phone-showcase-video"
          >
            {showVideo && !rd ? (
              <div className="relative w-full">
                {/* Handshake substrate: avoids any black-frame perception. */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    videoReady ? "opacity-0" : "opacity-100"
                  } bg-[radial-gradient(60%_55%_at_50%_20%,rgba(239,246,255,0.85),rgba(255,255,255,0.55),rgba(255,255,255,1))]`}
                />
                <video
                  ref={mediaRef}
                  src={withBase(base)}
                  poster={VIDEO_POSTER_DATA_URI}
                  muted
                  playsInline
                  loop
                  preload={rd ? "none" : size === "hero" && inView && !isMobile ? "auto" : "metadata"}
                  autoPlay
                  disablePictureInPicture
                  controls={false}
                  controlsList="nodownload noremoteplayback"
                  aria-label="ScribeUp embedded experience in a banking app"
                  className={`w-full transition-opacity duration-300 ${videoReady ? "opacity-100" : "opacity-0"} ${
                    isScreen
                      ? size === "hero"
                        ? "aspect-[9/19] scale-[1.15] translate-y-[-0.5%]"
                        : "aspect-[9/19] scale-[1.10]"
                      : size === "hero"
                        ? "aspect-[9/19] scale-[1.06]"
                        : "aspect-[9/19] scale-[1.04]"
                  } object-cover origin-center bg-gray-50`}
                  onError={() => setVideoError(true)}
                  onCanPlay={(e) => {
                    setVideoReady(true);
                    if (document.visibilityState === "visible" && inView && isVisible && !rm && !rd) {
                      const v = e.currentTarget;
                      requestAnimationFrame(() => {
                        if (!v.isConnected) return;
                        v.play().catch(() => {});
                      });
                    }
                  }}
                  onLoadedData={(e) => {
                    if (document.visibilityState === "visible" && inView && isVisible && !rm && !rd) {
                      const v = e.currentTarget;
                      requestAnimationFrame(() => {
                        if (!v.isConnected) return;
                        v.play().catch(() => {});
                      });
                    }
                  }}
                  style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform" }}
                />
              </div>
            ) : isVideo && videoError ? (
              <div
                className={`w-full aspect-[9/19] flex items-center justify-center bg-gray-100 text-gray-500 text-sm object-cover origin-center ${
                  isScreen
                    ? size === "hero"
                      ? "scale-[1.15] translate-y-[-0.5%]"
                      : "scale-[1.10]"
                    : size === "hero"
                      ? "scale-[1.06]"
                      : "scale-[1.04]"
                }`}
                aria-hidden="true"
              />
            ) : (
              <img
                src={base}
                alt="ScribeUp embedded experience in a banking app"
                width={900}
                height={1900}
                className={`w-full h-auto ${
                  isScreen
                    ? size === "hero"
                      ? "scale-[1.15] translate-y-[-0.5%]"
                      : "scale-[1.10]"
                    : size === "hero"
                      ? "scale-[1.06]"
                      : "scale-[1.04]"
                } origin-center`}
                draggable={false}
              />
            )}
            {/* calm, precise edge + top highlight */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 ${
                isScreen ? "rounded-[24px]" : "rounded-[44px]"
              } ring-1 ring-[rgba(120,140,180,0.18)]`}
            />
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 ${
                isScreen ? "rounded-[24px]" : "rounded-[44px]"
              } bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.0)_46%)] opacity-65`}
            />
            {/* screen-only subtle “glass” edge (keeps it obviously a screen) */}
            {isScreen ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 shadow-[0_1px_0_rgba(255,255,255,0.52)_inset] ring-1 ring-[rgba(15,23,42,0.05)]"
              />
            ) : null}
            {/* device-mode: add a thin “hardware” substrate so it feels Atomic-clean vs. a flat SVG */}
            {!isScreen ? (
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${
                  "rounded-[44px]"
                } shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-22px_44px_rgba(2,6,23,0.12)]`}
              />
            ) : null}
          </div>
        </motion.div>

        {/* overlays */}
        {overlays === "none" ? null : overlays === "kpis" ? (
          <div className="pointer-events-none">
            {/* mobile-safe KPI row */}
            <div className="sm:hidden mt-4 flex gap-2 justify-center">
              <StatChip label="Retention lift" value="+5%" icon="lucide:trending-up" />
              <StatChip label="Card primacy" value="6+ / mo" icon="lucide:credit-card" />
            </div>
            {size === "hero" ? (
              <>
                {heroKpiToasts !== "none" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 18, x: 12, scale: 0.985 }}
                    animate={
                      inView
                        ? { opacity: [0, 1, 1, 0, 0], y: [18, 0, -4, -8, -8], x: [12, 0, 0, 0, 0], scale: [0.985, 1, 1, 0.99, 0.99] }
                        : { opacity: 0, y: 0, x: 0, scale: 1 }
                    }
                    transition={
                      inView
                        ? { duration: 8.6, times: [0, 0.12, 0.58, 0.78, 1], repeat: Infinity, repeatDelay: 0.9, ease: [0.16, 1, 0.3, 1] }
                        : { duration: 0.25 }
                    }
                    className="hidden lg:block absolute left-full ml-6 top-40 md:top-44 w-[14.25rem] md:w-[17.5rem] scale-[0.92]"
                  >
                    <Toast
                      brand={{ label: "AT&T", abbr: "AT", bgClass: "bg-white" }}
                      brandLogo={
                        <BrandLogo
                          primarySrc={BRAND_ATT_OFFICIAL}
                          fallbackSrc={BRAND_ATT_FALLBACK}
                          alt="AT&T"
                          className="h-[26px] w-9 object-contain"
                        />
                      }
                      title="AT&T is renewing soon"
                      time="1 day ago"
                      body="Your AT&T bill renews in 2 days. Cancel now with 1‑click to avoid a monthly charge."
                      tone="blue"
                    />
                  </motion.div>
                ) : null}

                {heroKpiToasts === "both" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16, x: -12, scale: 0.985 }}
                    animate={
                      inView
                        ? { opacity: [0, 1, 1, 0, 0], y: [16, 0, 4, -6, -6], x: [-12, 0, 0, 0, 0], scale: [0.985, 1, 1, 0.99, 0.99] }
                        : { opacity: 0, y: 0, x: 0, scale: 1 }
                    }
                    transition={
                      inView
                        ? { duration: 9.2, delay: 0.25, times: [0, 0.12, 0.6, 0.8, 1], repeat: Infinity, repeatDelay: 0.9, ease: [0.16, 1, 0.3, 1] }
                        : { duration: 0.25 }
                    }
                    className="hidden lg:block absolute right-full mr-6 top-[60%] w-[14.25rem] md:w-[17.5rem] scale-[0.92]"
                  >
                    <Toast
                      brand={{ label: "Spotify", abbr: "S", bgClass: "bg-white" }}
                      brandLogo={
                        <BrandLogo
                          primarySrc={BRAND_SPOTIFY_OFFICIAL}
                          fallbackSrc={BRAND_SPOTIFY_FALLBACK}
                          alt="Spotify"
                          className="h-[30px] w-[30px] object-contain"
                        />
                      }
                      title="Cancel Spotify with a click"
                      time="2 hr ago"
                      body="Save time by cancelling subscriptions in seconds — right inside your banking app."
                    />
                  </motion.div>
                ) : null}
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.994 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden sm:block absolute left-4 md:-left-4 top-16"
                >
                  <StatChip label="Retention lift" value="+5%" icon="lucide:trending-up" scale={chipScale} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.994 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden sm:block absolute right-4 md:-right-5 top-28"
                >
                  <StatChip label="Card primacy" value="6+ swipes / mo" icon="lucide:credit-card" scale={chipScale} />
                </motion.div>
              </>
            )}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10, scale: 0.994 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.996 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none"
            >
              {/* One notification overlay max to keep composition clean */}
              <motion.img
                src={size === "hero" ? productNotifSrc : mode === "Discover" || mode === "Monthly savings" ? NOTIF_3 : NOTIF_2}
                alt=""
                aria-hidden="true"
                width={380}
                height={180}
                className={`hidden sm:block absolute ${mode === "Alerts" ? notifLeftPos : notifRightPos} ${notifWidth} opacity-95 drop-shadow-[0_22px_55px_rgba(2,6,23,0.16)]`}
                initial={{ opacity: 0, y: 12, scale: 0.996 }}
                animate={inView ? { opacity: 1, y: [0, mode === "Alerts" ? 4 : -4, 0], scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.996 }}
                transition={
                  inView
                    ? { duration: size === "hero" ? 0.62 : 0.5, y: { duration: mode === "Alerts" ? 8.2 : 7.5, repeat: Infinity, ease: "easeInOut" }, ease: [0.16, 1, 0.3, 1] }
                    : { duration: 0.25 }
                }
              />

              {/* stat chips (swap by mode) */}
              <motion.div
                className={`absolute ${mode === "Alerts" ? chipPosRight : chipPosLeft}`}
                animate={inView ? { x: [0, 2, 0] } : { x: 0 }}
                transition={inView ? { duration: 6.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.25 }}
              >
                {mode === "Monthly savings" ? (
                  <StatChip label="Avg savings" value="$126 / user" icon="lucide:piggy-bank" scale={chipScale} />
                ) : mode === "Card primacy" ? (
                  <StatChip label="Card primacy" value="+6 swipes / mo" icon="lucide:credit-card" scale={chipScale} />
                ) : mode === "Alerts" ? (
                  <StatChip label="Due-date alerts" value="Proactive reminders" icon="lucide:bell-ring" scale={chipScale} />
                ) : mode === "Actions" ? (
                  <StatChip label="1‑click actions" value="Update & cancel" icon="lucide:mouse-pointer-click" scale={chipScale} />
                ) : (
                  <StatChip label="App usage" value="92% MAU" icon="lucide:activity" scale={chipScale} />
                )}
              </motion.div>

              {/* keep only one supporting chip in product mode (avoid “pasted” clutter) */}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}
