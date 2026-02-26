import * as React from "react";
import { useVisibility } from "./performance/VisibilityManager";
import { useInView } from "framer-motion";
import { PhoneFrame } from "./phone-demo/PhoneFrame";

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const basePath = base === "/" ? "" : base.replace(/\/$/, "");
  return `${basePath}/${path.replace(/^\//, "")}`;
}

export const APP_DEMO_VIDEO_SRC = "/video/scribeup-demo-bank.mp4";
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
    // Spec media query (not supported everywhere) + Chrome/Android saveData
    const mq = window.matchMedia?.("(prefers-reduced-data: reduce)")?.matches;
    const saveData = (navigator as any)?.connection?.saveData === true;
    return Boolean(mq || saveData);
  } catch {
    return false;
  }
}

export function AppDemoPhoneVideo({
  src = APP_DEMO_VIDEO_SRC,
  startAt = 0,
  className,
  frameClassName,
  showBottomFade = false,
}: {
  src?: string;
  startAt?: number;
  className?: string;
  frameClassName?: string;
  showBottomFade?: boolean;
}) {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = React.useState(false);
  const inView = useInView(wrapRef, { margin: "-8% 0px -12% 0px", once: false });
  const isVisible = useVisibility("hero-demo-video");
  const rm = prefersReducedMotion();
  const rd = prefersReducedData();
  const [isMobile, setIsMobile] = React.useState(false);
  const promotedPreloadRef = React.useRef(false);

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
    const v = videoRef.current;
    if (!v) return;
    let retryTimer: number | null = null;
    let rafId: number | null = null;

    // Some mobile browsers can be finicky about the auxiliary visibility observer.
    // In-view is sufficient for autoplay gating; isVisible is a perf optimization.
    const shouldPlay = () => document.visibilityState === "visible" && !rm && !rd && (inView || isVisible);
    const shouldWarm = () => !rm && !rd && (inView || isVisible);

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

    // Handle visibility changes to pause when tab is hidden (save resources)
    const onVisChange = () => {
      if (document.visibilityState === "hidden") {
        pause();
      } else if (shouldPlay()) {
        safePlay();
      }
    };

    document.addEventListener("visibilitychange", onVisChange);

    // Initial play attempt (viewport-aware).
    if (shouldPlay()) {
      safePlay();
    } else {
      pause();
    }

    // Promote preload only when we’re close/visible.
    // On mobile, avoid aggressive buffering on first paint.
    if (shouldWarm() && !promotedPreloadRef.current) {
      promotedPreloadRef.current = true;
      window.setTimeout(() => {
        try {
          // Only “auto” buffer once we’re actually meant to play.
          if (shouldPlay()) v.preload = "auto";
          else v.preload = "metadata";
          v.load();
        } catch {}
      }, isMobile ? 220 : 0);
    }

    // Ensure we're roughly at the intended segment before we play.
    const seek = () => {
      if (!Number.isFinite(startAt) || startAt <= 0) return;
      try {
        if (v.currentTime < startAt) {
          v.currentTime = startAt;
        }
      } catch {}
    };
    if (v.readyState >= 1) seek();
    const onMeta = () => seek();
    v.addEventListener("loadedmetadata", onMeta);

    const onCanPlay = () => {
      if (shouldPlay()) {
        safePlay();
      }
    };
    v.addEventListener("canplay", onCanPlay);
    const onWaiting = () => {
      if (!shouldPlay()) return;
      if (retryTimer) window.clearTimeout(retryTimer);
      retryTimer = window.setTimeout(() => safePlay(), 150);
    };
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("stalled", onWaiting);
    
    return () => {
      document.removeEventListener("visibilitychange", onVisChange);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("stalled", onWaiting);
      if (retryTimer) window.clearTimeout(retryTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [startAt, inView, isVisible, rm, rd, isMobile]);

  return (
    <div ref={wrapRef} className={className} data-vis-id="hero-demo-video">
      <PhoneFrame className={frameClassName} showBottomFade={showBottomFade}>
        {videoError || rd ? (
          <div
            className="h-full w-full min-h-[280px] flex items-center justify-center bg-gray-100 text-gray-500 text-sm"
            aria-hidden="true"
          >
            Demo preview
          </div>
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover bg-slate-50"
            src={withBase(src)}
            poster={VIDEO_POSTER_DATA_URI}
            muted
            playsInline
            autoPlay
            loop
            preload={rd ? "none" : isMobile ? (inView || isVisible ? "metadata" : "none") : inView || isVisible ? "auto" : "metadata"}
            disablePictureInPicture
            controls={false}
            controlsList="nodownload noremoteplayback"
            // @ts-ignore - fetchpriority is valid in modern browsers
            fetchpriority={isMobile ? "low" : "high"}
            onError={() => setVideoError(true)}
            onLoadedData={(e) => {
              // Force play once data is loaded (resilience against browser autoplay policies/quirks)
              if (document.visibilityState === "visible" && !rm && !rd && (inView || isVisible)) {
                const v = e.currentTarget;
                requestAnimationFrame(() => {
                  if (!v.isConnected) return;
                  v.play().catch(() => {});
                });
              }
            }}
            style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden", willChange: "transform" }}
          />
        )}
      </PhoneFrame>
    </div>
  );
}

export function AppDemoVideoStill({
  src = APP_DEMO_VIDEO_SRC,
  time = 0,
  className,
  roundedClassName = "rounded-2xl",
}: {
  src?: string;
  /** time offset (seconds) to freeze on */
  time?: number;
  className?: string;
  roundedClassName?: string;
}) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = React.useState(false);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const apply = () => {
      try {
        if (Number.isFinite(time) && time > 0) v.currentTime = time;
      } catch {}
      // Freeze — this is “a screenshot from the video”, without needing a separate image pipeline.
      v.pause();
    };

    if (v.readyState >= 1) apply();
    v.addEventListener("loadedmetadata", apply);
    v.addEventListener("seeked", apply);
    return () => {
      v.removeEventListener("loadedmetadata", apply);
      v.removeEventListener("seeked", apply);
    };
  }, [time]);

  if (videoError) {
    return (
      <div
        className={`w-full h-full min-h-[120px] flex items-center justify-center bg-gray-100 text-gray-500 text-sm ${roundedClassName} ${className ?? ""}`}
        aria-hidden="true"
      >
        Video
      </div>
    );
  }
  return (
    <video
      ref={videoRef}
      className={`w-full h-full object-cover ${roundedClassName} ${className ?? ""}`}
      src={withBase(src)}
      poster={VIDEO_POSTER_DATA_URI}
      muted
      playsInline
      autoPlay
      loop
      preload="metadata"
      onError={() => setVideoError(true)}
    />
  );
}
