import React from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useVisibility } from "./performance/VisibilityManager";

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const basePath = base === "/" ? "" : base.replace(/\/$/, "");
  return `${basePath}/${path.replace(/^\//, "")}`;
}

const CONTROL_LOOP_VIDEOS = [
  "/assets/complete-control/find.mp4",
  "/assets/complete-control/track.mp4",
  "/assets/complete-control/control.mp4",
] as const;
const VIDEO_POSTER_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 1900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23eef2ff'/%3E%3Cstop offset='100%25' stop-color='%23f8fafc'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='1900' fill='url(%23g)'/%3E%3C/svg%3E";

function prefersReducedMotion() {
  try {
    return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  } catch {
    return false;
  }
}

type StoryStep = {
  title: string;
  detail: string;
  stat: string;
  bullets: string[];
};

const steps: StoryStep[] = [
  {
    title: "Find recurring bills",
    detail: "Identify recurring bills paid on cards and accounts. Surface subscriptions from external institutions.",
    stat: "Uncover hidden subscriptions and recurring charges across institutions",
    bullets: [
      "Spotify • $12.99 • Detected",
      "Cloud Storage • $9.99 • Detected",
      "Streaming Bundle • $24.99 • Detected",
    ],
  },
  {
    title: "Track due dates proactively",
    detail: "Alert users before bills are due. Sync bill dates to calendars and surface savings opportunities.",
    stat: "Calendar sync + smart nudges before charges hit",
    bullets: [
      "Rent Insurance • Due in 2 days",
      "Mobile Plan • Due in 4 days",
      "Utility Bill • Due in 6 days",
    ],
  },
  {
    title: "Manage with one click",
    detail: "Update payment‑on‑file and cancel subscriptions in one click across thousands of merchants.",
    stat: "6+ additional monthly card swipes after activation",
    bullets: [
      "Move Netflix to your card",
      "Cancel Old Fitness App",
      "Move Utilities to your checking",
    ],
  },
];

export function IPhoneStory() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const hoverIndexRef = React.useRef<number | null>(null);
  const hoverSelectTimerRef = React.useRef<number | null>(null);
  const stepRefs = React.useRef<Array<HTMLElement | null>>([]);
  const durationRef = React.useRef<Array<number | undefined>>([]);
  const [durationTick, setDurationTick] = React.useState(0);
  const lastStartedRef = React.useRef<number | null>(null);
  const autoIndexRef = React.useRef<number>(0);
  const lastSetAtRef = React.useRef<number>(0);
  const badgePhrases = React.useMemo(
    () => ["No redirects.", "Fully embedded.", "In your digital experience."] as const,
    []
  );
  const [badgeIdx, setBadgeIdx] = React.useState(0);
  // Slightly earlier gating so preview graphics are warm/loaded by the time you reach the section.
  // Use negative margins (same pattern as other sections) so “in view” is true while the section
  // is actually visible; a positive top margin can keep this false on some viewport sizes.
  const inView = useInView(sectionRef as any, { margin: "-10% 0px -10% 0px", once: false });
  const isVisible = useVisibility("iphone-story-section");
  const rm = prefersReducedMotion();
  const [isLowPerfDevice, setIsLowPerfDevice] = React.useState(false);
  const [failedVideos, setFailedVideos] = React.useState<Set<number>>(new Set());
  const markVideoFailed = React.useCallback((idx: number) => {
    setFailedVideos((prev) => new Set(prev).add(idx));
  }, []);

  React.useEffect(() => {
    if (typeof navigator === "undefined") return;
    const memory = (navigator as any).deviceMemory as number | undefined;
    const cores = navigator.hardwareConcurrency;
    // Stability mode for weaker machines/browsers:
    // reduce simultaneous video decoding and heavy compositing effects.
    if ((typeof memory === "number" && memory <= 4) || (typeof cores === "number" && cores <= 4)) {
      setIsLowPerfDevice(true);
    }
  }, []);

  React.useEffect(() => {
    hoverIndexRef.current = hoverIndex;
  }, [hoverIndex]);

  React.useEffect(() => {
    if (rm) return;
    if (!inView) return;
    const id = window.setInterval(() => setBadgeIdx((v) => (v + 1) % badgePhrases.length), 2200);
    return () => window.clearInterval(id);
  }, [badgePhrases.length, inView, rm]);

  React.useEffect(() => {
    return () => {
      if (hoverSelectTimerRef.current) window.clearTimeout(hoverSelectTimerRef.current);
    };
  }, []);

  // Keep auto-cycle index in sync with manual/scroll selection so it never “jumps”.
  React.useEffect(() => {
    autoIndexRef.current = activeIndex;
  }, [activeIndex]);

  const advance = React.useCallback(() => {
    const now = Date.now();
    // Use a slightly longer debounce for step auto-advancement to prevent "flip jitter" on slower CPUs.
    if (now - (lastSetAtRef.current || 0) < 800) return;
    lastSetAtRef.current = now;
    autoIndexRef.current = (autoIndexRef.current + 1) % steps.length;
    setActiveIndex(autoIndexRef.current);
  }, []);

  // Auto-advance (stable): drive step changes by duration timing, not `ended`.
  // This avoids clips that report `ended` early (common on some devices/codecs) and reduces churn.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!inView) return;
    if (rm) return;
    if (document.visibilityState === "hidden") return;
    if (hoverIndexRef.current != null) return;

    const dur = durationRef.current[activeIndex];
    const minMs = 9000;
    // Prefer ~2 full loops when we know duration, but cap so it never feels stuck.
    const ms = dur ? Math.min(20000, Math.max(minMs, Math.floor(dur * 1000 * 2))) : 11000;

    const id = window.setTimeout(() => {
      if (!inView) return;
      if (rm) return;
      if (document.visibilityState === "hidden") return;
      if (hoverIndexRef.current != null) return;
      advance();
    }, ms);

    return () => window.clearTimeout(id);
  }, [activeIndex, inView, rm, durationTick, advance]);

  // “Focused” drives left-side hover styling only. Right-side preview is driven by activeIndex
  // to prevent “glitchy” hover-induced preview swaps.
  const focusedIndex = hoverIndex ?? activeIndex;
  const current = activeIndex;

  const isDiscover = current === 0;
  const isTrack = current === 1;
  const isManage = current === 2;
  // Stability-first: keep the right-side phone preview in the proven, working form.
  // (The depth stack variant can be reintroduced later once it’s 100% reliable across browsers.)
  const canRenderHeavyStack = false;

  const onSelect = (idx: number) => {
    if (hoverSelectTimerRef.current) {
      window.clearTimeout(hoverSelectTimerRef.current);
      hoverSelectTimerRef.current = null;
    }
    const now = Date.now();
    lastSetAtRef.current = now;
    autoIndexRef.current = idx;
    setHoverIndex(null);
    setActiveIndex(idx);
  };

  const rankFor = (idx: number) => (idx - current + steps.length) % steps.length; // 0=front,1=mid,2=back

  const depthPose = (rank: number) => {
    if (rank === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        zIndex: 30,
      } as const;
    }
    if (rank === 1) {
      return {
        x: 36,
        y: 20,
        scale: 0.9,
        opacity: 0.4,
        zIndex: 20,
      } as const;
    }
    return {
      x: 72,
      y: 38,
      scale: 0.9,
      opacity: 0.4,
      zIndex: 10,
    } as const;
  };

  const activeKeyword = React.useMemo(() => steps[current]?.title.split(" ")[0] ?? "", [current]);
  const [kwPos, setKwPos] = React.useState(activeKeyword.length);
  React.useEffect(() => {
    if (rm) {
      setKwPos(activeKeyword.length);
      return;
    }
    setKwPos(0);
    let t: number | null = null;
    const tick = () => {
      setKwPos((v) => {
        const next = Math.min(activeKeyword.length, v + 1);
        if (next < activeKeyword.length) {
          t = window.setTimeout(tick, 26);
        }
        return next;
      });
    };
    t = window.setTimeout(tick, 26);
    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [activeKeyword, rm]);

  const DepthCardInner = ({
    idx,
    isFront,
    canPlay,
    videoFailed = false,
    onVideoError,
  }: {
    idx: number;
    isFront: boolean;
    canPlay: boolean;
    videoFailed?: boolean;
    onVideoError?: () => void;
  }) => {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);

    React.useEffect(() => {
      const v = videoRef.current;
      if (!v) return;

      let rafId: number | null = null;
      const safePlay = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (v.paused) v.play().catch(() => {});
          rafId = null;
        });
      };

      const pause = () => {
        if (rafId) cancelAnimationFrame(rafId);
        if (!v.paused) v.pause();
        rafId = null;
      };

      if (isFront && canPlay) {
        const t = setTimeout(safePlay, 60);
        return () => {
          clearTimeout(t);
          if (rafId) cancelAnimationFrame(rafId);
        };
      } else {
        pause();
      }

      const onVisChange = () => {
        if (document.visibilityState === "hidden") {
          pause();
        } else if (isFront && canPlay) {
          safePlay();
        }
      };

      document.addEventListener("visibilitychange", onVisChange);
      return () => {
        document.removeEventListener("visibilitychange", onVisChange);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, [isFront, canPlay]);

    return (
      <div className="relative">
        {/* Preview slab (no device chrome; videos remain identical) */}
        <div className="w-[118px] sm:w-[126px] aspect-[3/4] rounded-[20px] bg-[#E2E8F0] p-px overflow-hidden">
          <div className="relative h-full w-full bg-white p-2">
            {videoFailed ? (
              <div className="h-full w-full rounded-[16px] bg-gray-100" aria-hidden="true" />
            ) : (
              <video
                ref={videoRef}
                className="h-full w-full rounded-[16px] object-cover bg-gray-100"
                src={withBase(CONTROL_LOOP_VIDEOS[idx])}
                poster={VIDEO_POSTER_DATA_URI}
                muted
                playsInline
                autoPlay
                loop
                preload="metadata"
                disablePictureInPicture
                controls={false}
                controlsList="nodownload noremoteplayback"
                onError={onVideoError}
                onCanPlay={(e) => {
                  if (isFront) {
                    const v = e.currentTarget;
                    requestAnimationFrame(() => {
                      if (v.paused) v.play().catch(() => {});
                    });
                  }
                }}
                style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
              />
            )}
          </div>
        </div>

        {/* floating detailers (only when in hero position) */}
        {/* <div aria-hidden="true" className="pointer-events-none">
          <motion.div
            className="absolute right-full mr-4 top-[22%] hidden lg:inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/72 backdrop-blur-[12px] px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-[0_16px_44px_rgba(2,6,23,0.14)]"
            initial={false}
            animate={isFront ? { opacity: 1, y: [0, -6, 0], scale: 1 } : { opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="h-6 w-6 rounded-full border border-slate-200/70 bg-white/80 grid place-items-center">
              <Icon icon="simple-icons:netflix" width={12} height={12} className="text-red-600" />
            </span>
            <span>Detected</span>
          </motion.div>
          <motion.div
            className="absolute left-full ml-4 top-[30%] hidden lg:inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/72 backdrop-blur-[12px] px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-[0_16px_44px_rgba(2,6,23,0.14)]"
            initial={false}
            animate={isFront ? { opacity: 1, y: [0, 6, 0], scale: 1 } : { opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.02 }}
          >
            <span className="h-6 w-6 rounded-full border border-slate-200/70 bg-white/80 grid place-items-center">
              <Icon icon="simple-icons:spotify" width={12} height={12} className="text-emerald-600" />
            </span>
            <span>Synced</span>
          </motion.div>
        </div> */}
      </div>
    );
  };

  // Only play the active loop while the section is in view (keeps things clean/perf-friendly).
  // Note: Individual cards now handle their own playback state via isFront prop.
  // This effect just ensures we don't have lingering listeners or state issues.
  React.useEffect(() => {
    // No-op: video playback is now fully managed by DepthCardInner based on isFront prop.
  }, []);

  const mobileVideoRefs = React.useRef<Array<HTMLVideoElement | null>>([]);
  const desktopVideoRefs = React.useRef<Array<HTMLVideoElement | null>>([]);

  // Refactored video playback logic for stability
  React.useEffect(() => {
    let rafId: number | null = null;

    const syncVideos = (refs: React.MutableRefObject<Array<HTMLVideoElement | null>>) => {
      refs.current.forEach((v, idx) => {
        if (!v) return;
        const isCurrent = activeIndex === idx;
        const shouldPlay =
          isCurrent && (inView || isVisible) && !rm && document.visibilityState === "visible";

        if (shouldPlay) {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            // iOS Safari quirks: ensure inline+muted before autoplay.
            try {
              v.muted = true;
              (v as any).playsInline = true;
              v.setAttribute("muted", "");
              v.setAttribute("playsinline", "");
              v.setAttribute("webkit-playsinline", "");
              v.preload = "auto";
              v.load();
            } catch {}
            v.play().catch(() => {});
          });
        } else {
          try {
            v.preload = "metadata";
          } catch {}
          if (!v.paused) v.pause();
        }
      });
    };

    syncVideos(mobileVideoRefs);
    syncVideos(desktopVideoRefs);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [activeIndex, inView, isVisible, rm]);

  // Handle tab visibility change
  React.useEffect(() => {
    const onVisChange = () => {
      const isVisibleTab = document.visibilityState === "visible";
      [mobileVideoRefs, desktopVideoRefs].forEach(refs => {
        refs.current.forEach((v, idx) => {
          if (!v) return;
          const isCurrent = activeIndex === idx;
          if (isVisibleTab && isCurrent && (inView || isVisible) && !rm) {
            try {
              v.muted = true;
              (v as any).playsInline = true;
              v.setAttribute("muted", "");
              v.setAttribute("playsinline", "");
              v.setAttribute("webkit-playsinline", "");
              v.preload = "auto";
              v.load();
            } catch {}
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      });
    };
    document.addEventListener("visibilitychange", onVisChange);
    return () => document.removeEventListener("visibilitychange", onVisChange);
  }, [activeIndex, inView, isVisible, rm]);

  return (
    <section
      ref={sectionRef}
      data-story="section"
      data-reveal="section"
      className="relative section-haze bg-white !pt-[36px] sm:!pt-[40px] !pb-[40px] sm:!pb-[44px]"
      data-vis-id="iphone-story-section"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.04] [mask-image:radial-gradient(55%_55%_at_50%_10%,black,transparent_70%)]" />
      <div className="container-page relative">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center tablet-stack-2col">
          {/* Left column: header + cards as one tight block (prevents empty grid holes) */}
          <div className="left-content-column lg:col-start-1 lg:pl-0">
            <div className="flex flex-col h-full pt-2 lg:pt-1">
              <motion.div
                className="text-center lg:text-left mb-3"
                initial={rm ? false : { opacity: 0, y: 12 }}
                whileInView={rm ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.h2
                  className="section-title max-w-[28ch] text-balance text-[1.65rem] lg:text-[2rem] mb-2 mx-auto lg:mx-0"
                  initial={rm ? false : { opacity: 0, y: 10 }}
                  whileInView={rm ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.65 }}
                  transition={{ duration: 0.52, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  Complete control over recurring bills, inside your app
                </motion.h2>
                <motion.div
                  className="mt-0 mb-2 flex justify-center lg:justify-start text-center lg:text-left"
                  initial={rm ? false : { opacity: 0, y: 10, scale: 0.995 }}
                  whileInView={rm ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.52, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="inline-flex mx-auto lg:mx-0 items-center rounded-full border border-slate-200/70 bg-white/70 backdrop-blur-[10px] px-3 py-1 text-slate-700 text-[11px] md:text-[12px] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.70)]">
                    <span className="mr-2">No new app.</span>
                    {rm ? (
                      <span>No redirects. Fully embedded in your digital experience.</span>
                    ) : (
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={badgePhrases[badgeIdx]}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                          className="inline-block"
                        >
                          {badgePhrases[badgeIdx]}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </span>
                </motion.div>
              </motion.div>

              <div className="relative mt-5 sm:mt-6 lg:mt-7" data-story="cards">
                <div className="flex flex-col gap-3">
                  {steps.map((step, idx) => {
                    const active = idx === activeIndex;
                    const hovered = idx === hoverIndex;
                    return (
                      <article
                        key={step.title}
                        data-story="step"
                        data-step={idx}
                        role="button"
                        tabIndex={0}
                        ref={(el) => {
                          stepRefs.current[idx] = el;
                        }}
                        onMouseEnter={() => setHoverIndex(idx)}
                        onMouseLeave={() => {
                          if (hoverSelectTimerRef.current) {
                            window.clearTimeout(hoverSelectTimerRef.current);
                            hoverSelectTimerRef.current = null;
                          }
                          setHoverIndex(null);
                        }}
                        onPointerEnter={() => {
                          if (typeof window === "undefined") return;
                          const mq = window.matchMedia?.("(min-width: 1024px)");
                          if (!mq?.matches) return;
                          if (hoverSelectTimerRef.current) window.clearTimeout(hoverSelectTimerRef.current);
                          hoverSelectTimerRef.current = window.setTimeout(() => {
                            onSelect(idx);
                            hoverSelectTimerRef.current = null;
                          }, 120);
                        }}
                        onClick={() => {
                          onSelect(idx);
                        }}
                        onFocus={() => {
                          setHoverIndex(idx);
                          onSelect(idx);
                        }}
                        onBlur={() => {
                          if (hoverSelectTimerRef.current) {
                            window.clearTimeout(hoverSelectTimerRef.current);
                            hoverSelectTimerRef.current = null;
                          }
                          setHoverIndex(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSelect(idx);
                          }
                        }}
                        className={`relative isolate p-4 sm:p-5 rounded-[16px] border-l-4 cursor-pointer select-none focus:outline-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          active
                            ? "bg-white border border-slate-200/80 border-l-[#0052FF] rounded-l-[4px] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.10)] opacity-100"
                            : hovered
                              ? "bg-slate-50/50 border border-transparent border-l-transparent opacity-70"
                              : "bg-transparent border border-transparent border-l-transparent opacity-55 sm:opacity-40"
                        }`}
                      >
                        <div className="relative flex flex-col items-start text-left h-full z-10">
                              <div className={`text-[10px] font-semibold tracking-[0.05em] uppercase mb-1.5 transition-colors duration-300 ${
                                active ? "text-slate-600" : "text-slate-500"
                              }`}>
                                {idx === 0 ? "Find" : idx === 1 ? "Track" : "Manage"}
                              </div>
                              <div
                                className={`text-[16px] sm:text-[18px] font-semibold tracking-[-0.02em] mb-1.5 transition-colors duration-300 ${
                                  active ? "text-slate-900" : "text-slate-800"
                                }`}
                              >
                                {step.title}
                              </div>
                              <div
                                className={`max-w-[46ch] text-[12px] sm:text-[12.5px] leading-[1.5] mb-0 transition-colors duration-300 ${
                                  active ? "text-slate-600" : "text-slate-500"
                                }`}
                              >
                                {step.detail}
                              </div>
                              
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
          </div>
          </div>

          {/* Slab row (right) */}
          <motion.div
            data-story="screenWrap"
            className="lg:col-start-2 lg:justify-self-end w-full mx-auto flex justify-center lg:justify-end items-center relative lg:pr-16 xl:pr-12 2xl:pr-6"
            initial={rm ? false : { opacity: 0, y: 14, scale: 0.99 }}
            whileInView={rm ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtle texture behind phone (purely decorative, zero layout impact) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute inset-0 distance-grid opacity-[0.05] [mask-image:radial-gradient(55%_55%_at_50%_35%,black,transparent_72%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_25%,rgba(37,99,235,0.04),transparent_62%)] opacity-70" />
            </div>

            {/* Floating phone (compact, fits in one view) */}
            <div
              className="safari-clip relative w-full max-w-[198px] sm:max-w-[225px] lg:max-w-[234px] aspect-[1/2.16] flex-shrink-0 rounded-[24px] border-[5px] border-[#1A1A1A] bg-white shadow-[0_22px_50px_-16px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.04)] overflow-hidden mx-auto lg:mx-0 lg:-translate-x-[32px] lg:translate-y-1"
            >
              <div className="absolute inset-0 overflow-hidden bg-white">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white z-20" />
                      {CONTROL_LOOP_VIDEOS.map((src, idx) =>
                        failedVideos.has(idx) ? (
                          <div
                            key={`cc-${idx}`}
                            className={`absolute inset-0 h-full w-full bg-white transition-opacity duration-500 ${
                              activeIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                            aria-hidden="true"
                          />
                        ) : (
                          <video
                            key={`cc-${idx}`}
                            ref={(el) => {
                              mobileVideoRefs.current[idx] = el;
                            }}
                            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
                              activeIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                            src={withBase(src)}
                            poster={VIDEO_POSTER_DATA_URI}
                            muted
                            playsInline
                            autoPlay
                            loop
                            preload={activeIndex === idx && (inView || isVisible) && !rm ? "auto" : "metadata"}
                            disablePictureInPicture
                            controls={false}
                            controlsList="nodownload noremoteplayback"
                            onError={() => markVideoFailed(idx)}
                            onCanPlay={(e) => {
                              const v = e.currentTarget;
                              if (activeIndex === idx && document.visibilityState === "visible" && (inView || isVisible) && !rm) {
                                requestAnimationFrame(() => {
                                  if (!v.isConnected) return;
                                  try {
                                    v.muted = true;
                                    (v as any).playsInline = true;
                                    v.setAttribute("muted", "");
                                    v.setAttribute("playsinline", "");
                                    v.setAttribute("webkit-playsinline", "");
                                  } catch {}
                                  v.play().catch(() => {});
                                });
                              }
                            }}
                            onLoadedData={(e) => {
                              const v = e.currentTarget;
                              if (activeIndex === idx && document.visibilityState === "visible" && (inView || isVisible) && !rm) {
                                requestAnimationFrame(() => {
                                  if (!v.isConnected) return;
                                  try {
                                    v.muted = true;
                                    (v as any).playsInline = true;
                                    v.setAttribute("muted", "");
                                    v.setAttribute("playsinline", "");
                                    v.setAttribute("webkit-playsinline", "");
                                  } catch {}
                                  v.play().catch(() => {});
                                });
                              }
                            }}
                            onLoadedMetadata={(e) => {
                              const v = e.currentTarget;
                              if (Number.isFinite(v.duration) && v.duration > 0.2) {
                                durationRef.current[idx] = v.duration;
                                setDurationTick((x) => x + 1);
                              }
                            }}
                            style={{ willChange: "transform", opacity: 1, filter: "none", mixBlendMode: "normal" }}
                          />
                        )
                      )}
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiscoverScreen({ active }: { active: boolean }) {
  const rows: Array<{ name: string; meta: string; price: string; icon: string; iconTone: string; tone: string }> = [
    { name: "Hulu", meta: "Renews Feb 8", price: "$14.99", icon: "simple-icons:hulu", iconTone: "text-emerald-600", tone: "bg-emerald-500/10 border-emerald-500/20" },
    { name: "Spotify", meta: "Renews Feb 9", price: "$9.99", icon: "simple-icons:spotify", iconTone: "text-emerald-600", tone: "bg-emerald-500/10 border-emerald-500/20" },
    { name: "Dropbox", meta: "Renews Feb 9", price: "$16.58", icon: "simple-icons:dropbox", iconTone: "text-blue-600", tone: "bg-blue-600/10 border-blue-600/20" },
    { name: "Verizon", meta: "Renews Feb 19", price: "$25.00", icon: "simple-icons:verizon", iconTone: "text-red-600", tone: "bg-slate-900/5 border-slate-200/70" },
    { name: "Netflix", meta: "Renews Feb 20", price: "$19.99", icon: "simple-icons:netflix", iconTone: "text-red-600", tone: "bg-slate-900/5 border-slate-200/70" },
    { name: "YouTube", meta: "Renews Feb 24", price: "$13.99", icon: "simple-icons:youtube", iconTone: "text-red-600", tone: "bg-slate-900/5 border-slate-200/70" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70">
      <div className="px-4 py-3 border-b border-slate-200/70 flex items-center justify-between">
        <div>
          <div className="text-sm font-extrabold text-[var(--ink)]">My Subscriptions</div>
          <div className="text-[12px] text-slate-600">Upcoming renewals</div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/10 px-3 py-1 text-[12px] text-slate-700 font-semibold">
          Monthly spend <span className="text-[var(--ink)]">$138</span>
        </div>
      </div>

      {/* mini internal “scroll” (adds realism when this screen becomes active) */}
      <div className="p-4">
        <div className="relative h-[156px] overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0))] z-10" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-[linear-gradient(0deg,rgba(255,255,255,0.92),rgba(255,255,255,0))] z-10" />
          <motion.div
            className="space-y-2"
            animate={active ? { y: [0, -22, 0] } : { y: 0 }}
            transition={active ? { duration: 3.6, ease: [0.16, 1, 0.3, 1] } : { duration: 0.25 }}
          >
            {rows.map((r) => (
              <div key={r.name} className="rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`h-9 w-9 rounded-[12px] grid place-items-center border ${r.tone} bg-[linear-gradient(180deg,rgba(255,255,255,0.80),rgba(255,255,255,0.60))] shadow-[0_1px_0_rgba(255,255,255,0.65)_inset]`}>
                    <Icon icon={r.icon} width={16} height={16} className={r.iconTone} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[var(--ink)] truncate">{r.name}</div>
                    <div className="text-[12px] text-slate-600 truncate">{r.meta}</div>
                  </div>
                </div>
                <div className="text-[12px] font-semibold text-slate-700 whitespace-nowrap">
                  {r.price}<span className="text-slate-500 font-medium">/mo</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TrackScreen({ active }: { active: boolean }) {
  const [month, setMonth] = React.useState<"Feb" | "Mar">("Feb");
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!active) return;
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setMonth((m) => (m === "Feb" ? "Mar" : "Feb"));
    }, 2800);
    return () => window.clearInterval(id);
  }, [active]);

  // Keep Track preview focused on calendar + signals (no extra “upcoming” list in this view).

  type CalSignal = {
    day: number;
    name: string;
    price: string;
    icon: string;
    tone: string;
    // optional small nudges (the base placement auto-flips left/right and drops for top row)
    biasX?: number;
    biasY?: number;
    side?: "left" | "right" | "top";
  };

  const signals: CalSignal[] =
    month === "Feb"
      ? [
          // Explicit placement so chips never sit on top of dates (elite legibility).
          { day: 12, name: "Hulu", price: "$14.99", icon: "simple-icons:hulu", tone: "text-emerald-600", side: "right", biasX: 0, biasY: -10 },
          { day: 16, name: "Spotify", price: "$9.99", icon: "simple-icons:spotify", tone: "text-emerald-600", side: "left", biasX: 0, biasY: -12 },
          { day: 22, name: "Dropbox", price: "$16.58", icon: "simple-icons:dropbox", tone: "text-blue-600", side: "right", biasX: 0, biasY: 10 },
        ]
      : [
          // Verizon: up/right and outside the grid (not centered on the date)
          { day: 6, name: "Verizon", price: "$85.00", icon: "simple-icons:verizon", tone: "text-red-600", side: "right", biasX: 0, biasY: -8 },
          { day: 14, name: "Netflix", price: "$19.99", icon: "simple-icons:netflix", tone: "text-red-600", side: "right", biasX: 0, biasY: -6 },
          // Spotify: up a touch + to the right, slightly smaller visual weight
          { day: 23, name: "Spotify", price: "$9.99", icon: "simple-icons:spotify", tone: "text-emerald-600", side: "left", biasX: 0, biasY: -10 },
        ];

  const hotDays = React.useMemo(() => new Set(signals.map((s) => s.day)), [signals]);
  const rm = prefersReducedMotion();

  const CELL = 36; // h-9
  const GAP = 8; // gap-2
  const PAD_X = 28; // matches wrapper px-7 (keeps signal chips inside the card, but outside the calendar grid)

  const signalForDay = React.useMemo(() => {
    const m = new Map<number, CalSignal>();
    signals.forEach((s) => m.set(s.day, s));
    return m;
  }, [signals]);

  const getAnchor = (day: number) => {
    const idx = day - 1;
    const col = idx % 7;
    const row = Math.floor(idx / 7);
    // anchor: slightly top-right of the day-cell so it feels like “attached metadata”
    const ax = PAD_X + col * (CELL + GAP) + CELL * 0.74;
    const ay = row * (CELL + GAP) + CELL * 0.5;
    return { ax, ay, col, row };
  };

  const SignalGeom = (s: CalSignal) => {
    const { ax, ay, col, row } = getAnchor(s.day);
    // Goal: keep chips OUTSIDE the date grid (≈60% out / 40% in),
    // while keeping everything inside the overall card bounds.
    const side: "left" | "right" | "top" = s.side ?? (row === 0 ? "top" : col >= 4 ? "right" : "left");

    const gridW = 7 * CELL + 6 * GAP;
    // Anchor chips OUTSIDE the grid so they never cover date numbers.
    // Keep a small air-gap so it reads intentional.
    // Allow chips to sit “mostly outside” the calendar (≈70% out / 30% in),
    // while keeping connectors clean and the date grid fully legible.
    const OUT = 40; // slightly tighter so chips stay in-frame in the preview
    const rawCx =
      side === "left"
        ? PAD_X - OUT + (s.biasX ?? 0)
        : side === "right"
          ? PAD_X + gridW + OUT + (s.biasX ?? 0)
          : PAD_X + col * (CELL + GAP) + CELL * 0.5 + (s.biasX ?? 0);

    // Clamp within the card so chips don’t render off-screen on narrower viewports.
    // Keeps the “70/30” feel, but prioritizes being in-frame.
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
    const cx = clamp(rawCx, PAD_X - 18, PAD_X + gridW + 18);

    const cy = (side === "top" ? 8 : ay) + (s.biasY ?? 0);

    const chipTransform =
      side === "left"
        ? "translate(-70%,-50%)"
        : side === "right"
          ? "translate(-30%,-50%)"
          : "translate(-50%,-100%)";
    const pad = 16;
    const left = Math.min(ax, cx) - pad;
    const top = Math.min(ay, cy) - pad;
    const w = Math.abs(ax - cx) + pad * 2;
    const h = Math.abs(ay - cy) + pad * 2;
    const sx = ax - left;
    const sy = ay - top;
    const ex = cx - left;
    const ey = cy - top;
    const dx = ex - sx;
    const dy = ey - sy;
    const len = Math.max(1, Math.hypot(dx, dy));
    const nx = (-dy / len) * 9; // squiggle amplitude
    const ny = (dx / len) * 9;
    const c1x = sx + dx * 0.33 + nx;
    const c1y = sy + dy * 0.33 + ny;
    const c2x = sx + dx * 0.66 - nx;
    const c2y = sy + dy * 0.66 - ny;
    const d = `M ${sx.toFixed(2)} ${sy.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(
      2
    )} ${c2y.toFixed(2)}, ${ex.toFixed(2)} ${ey.toFixed(2)}`;

    return { left, top, w, h, d, cx, cy, chipTransform };
  };

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 overflow-visible relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_18%_0%,rgba(37,99,235,0.07),transparent_60%),radial-gradient(45%_55%_at_88%_30%,rgba(30,162,255,0.06),transparent_62%)]" />
      <div className="relative px-4 py-3 border-b border-slate-200/60 flex items-center justify-between">
        <div>
          <div className="text-sm font-extrabold text-[var(--ink)]">Upcoming</div>
          <div className="text-[12px] text-slate-600">Calendar sync + alerts</div>
        </div>
        <motion.span
          key={month}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full bg-white/90 border border-slate-200/60 px-3 py-1 text-[12px] font-semibold text-slate-600 shadow-[0_10px_30px_rgba(2,6,23,0.04)]"
        >
          {month} • Sync on
        </motion.span>
      </div>

      <div className="relative p-4">
        <div className="grid grid-cols-7 gap-2 text-center text-[11px] text-slate-500">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>
        <div className="relative mt-2">
          {/* day grid (padded inset to create a “gutter” for chips) */}
          <div className="px-7">
            <div className="relative z-10 grid grid-cols-7 gap-2 text-center text-[12px]">
              {Array.from({ length: 28 }).map((_, i) => {
                const day = i + 1;
                const hot = hotDays.has(day);
                const hasSig = signalForDay.has(day);
                return (
                  <div
                    key={day}
                    className={`h-9 rounded-xl grid place-items-center border ${
                      hot
                        ? "bg-[linear-gradient(180deg,rgba(37,99,235,0.085),rgba(30,162,255,0.06))] border-blue-600/18 text-[var(--ink)] font-semibold"
                        : "bg-white/78 border-slate-200/70 text-slate-600"
                    }`}
                  >
                    <div className="relative w-full h-full grid place-items-center">
                      {hasSig ? (
                        <span
                          aria-hidden="true"
                          className="absolute right-[8px] top-[9px] h-[7px] w-[7px] rounded-full bg-sky-500/65 shadow-[0_0_0_2px_rgba(255,255,255,0.85),0_10px_22px_rgba(2,6,23,0.12)]"
                        />
                      ) : null}
                      <span className="leading-none">{day}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* connectors UNDER cells */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            {signals.map((s) => {
              const g = SignalGeom(s);
              return (
                <motion.svg
                  key={`c-${month}-${s.day}`}
                  aria-hidden="true"
                  className="pointer-events-none absolute"
                  style={{ left: g.left, top: g.top, width: g.w, height: g.h }}
                  initial={rm ? false : { opacity: 0 }}
                  animate={active ? { opacity: 1 } : { opacity: 0 }}
                  transition={rm ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <defs>
                    <linearGradient id={`sig-${month}-${s.day}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(30,162,255,0.38)" />
                      <stop offset="55%" stopColor="rgba(37,99,235,0.22)" />
                      <stop offset="100%" stopColor="rgba(15,25,45,0.10)" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={g.d}
                    fill="none"
                    stroke={`url(#sig-${month}-${s.day})`}
                    strokeWidth={1.15}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    initial={rm ? false : { pathLength: 0, opacity: 0.0 }}
                    animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={rm ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.svg>
              );
            })}
          </div>

          {/* chips ABOVE cells */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
            {signals.map((s) => {
              const g = SignalGeom(s);
              return (
                <motion.div
                  key={`p-${month}-${s.day}`}
                  className="pointer-events-none absolute"
                  style={{ left: g.cx, top: g.cy, transform: g.chipTransform }}
                  initial={rm ? false : { opacity: 0, y: 6 }}
                  animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={rm ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/70 bg-white/82 backdrop-blur-[8px] px-2 py-1.5 shadow-[0_14px_34px_rgba(2,6,23,0.10)] max-w-[144px]">
                    <span className="h-[22px] w-[22px] rounded-full bg-white/82 border border-slate-200/80 grid place-items-center shadow-[0_1px_0_rgba(255,255,255,0.75)_inset]">
                      <Icon icon={s.icon} width={11.5} height={11.5} className={s.tone} />
                    </span>
                    <span className="text-[10.5px] font-semibold text-slate-700 whitespace-nowrap truncate">{s.name}</span>
                    <span className="text-[10.5px] font-semibold text-[var(--ink)] font-mono whitespace-nowrap">{s.price}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-slate-600">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]" />
            Sync active
          </span>
          <span className="font-mono text-[10px] tracking-[0.10em] text-slate-500">CAL_SYNC</span>
        </div>
      </div>
    </div>
  );
}

function ManageScreen({ active }: { active: boolean }) {
  const actions = [
    { title: "Move payment‑on‑file", desc: "1‑click updater (card + ACH)", icon: "lucide:arrow-left-right" },
    { title: "Cancel subscription", desc: "Instantly cancel across merchants", icon: "lucide:ban" },
    { title: "Set smart rules", desc: "Auto‑alerts and spend guardrails", icon: "lucide:sliders" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_18%_0%,rgba(37,99,235,0.05),transparent_60%),radial-gradient(45%_55%_at_86%_28%,rgba(30,162,255,0.05),transparent_62%)]" />
      <div className="relative px-4 py-3 border-b border-slate-200/60">
        <div className="text-sm font-extrabold text-[var(--ink)]">Actions</div>
        <div className="text-[12px] text-slate-600">Control, clarity, convenience</div>
      </div>

      {/* Full-screen internal scroll: reveals bottom module (feels like real UI) */}
      <div className="relative p-4">
        <div className="relative h-[236px] overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-[linear-gradient(180deg,rgba(246,250,255,0.92),rgba(246,250,255,0))] z-10" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-[linear-gradient(0deg,rgba(246,250,255,0.92),rgba(246,250,255,0))] z-10" />
          <motion.div
            className="space-y-3"
            animate={active ? { y: [0, -84, 0] } : { y: 0 }}
            transition={active ? { duration: 4.2, ease: [0.16, 1, 0.3, 1] } : { duration: 0.25 }}
          >
            <div className="rounded-xl border border-slate-200/70 bg-white/80 p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold text-[var(--ink)]">Risk‑free trials</div>
                <span className="text-[12px] text-slate-600">Track expiry</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  ["simple-icons:doordash", "16", "Days"],
                  ["simple-icons:youtube", "2", "Days"],
                  ["lucide:plus", "", ""],
                ].map(([ic, n, u]) => (
                  <div key={ic} className="rounded-xl border border-slate-200/70 bg-white/85 p-2.5 grid place-items-center">
                    <div className="text-slate-700">
                      <Icon icon={ic} width={18} height={18} />
                    </div>
                    {n ? (
                      <div className="mt-2 text-center">
                        <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Remaining</div>
                        <div className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{n}</div>
                        <div className="text-[11px] text-slate-600">{u}</div>
                      </div>
                    ) : (
                      <div className="mt-3 h-10 w-10 rounded-full border border-blue-600/20 bg-blue-600/10 grid place-items-center">
                        <Icon icon="lucide:plus" width={18} height={18} className="text-slate-700" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {actions.map((a) => (
              <div key={a.title} className="rounded-xl border border-slate-200/70 bg-white/80 px-3 py-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-xl grid place-items-center bg-blue-600/10 border border-blue-600/20">
                    <Icon icon={a.icon} width={16} height={16} className="text-slate-700" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[var(--ink)]">{a.title}</div>
                    <div className="text-[12px] text-slate-600 leading-snug">{a.desc}</div>
                  </div>
                </div>
                <span className="rounded-full bg-blue-600/10 border border-blue-600/20 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                  Run
                </span>
              </div>
            ))}

            <div className="rounded-xl border border-slate-200/70 bg-[linear-gradient(180deg,rgba(236,244,255,0.84),rgba(255,255,255,0.72))] p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Payment‑on‑file</div>
                  <div className="mt-1 text-sm font-semibold text-[var(--ink)]">Updater</div>
                </div>
                <span className="rounded-full bg-white/80 border border-slate-200/70 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                  1‑click
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  ["simple-icons:visa", "Visa •••• 3812", "Primary"],
                  ["simple-icons:mastercard", "MC •••• 9021", "Backup"],
                ].map(([ic, label, meta]) => (
                  <div key={label} className="rounded-xl border border-slate-200/70 bg-white/85 px-3 py-2 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-[12px] grid place-items-center border border-slate-200/70 bg-white/70">
                      <Icon icon={ic} width={16} height={16} className="text-slate-800" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[var(--ink)] truncate">{label}</div>
                      <div className="text-[12px] text-slate-600 truncate">{meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

