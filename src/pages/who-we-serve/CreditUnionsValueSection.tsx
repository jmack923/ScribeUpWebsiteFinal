import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useVisibility } from "../../components/performance/VisibilityManager";
import { Magnetic } from "../../components/magnetic";
import type { SegmentMetric } from "./segment-data";

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const basePath = base === "/" ? "" : base.replace(/\/$/, "");
  return `${basePath}/${path.replace(/^\//, "")}`;
}

const VALUE_DEMO_VIDEOS = [
  "/assets/complete-control/find.mp4",
  "/assets/complete-control/track.mp4",
  "/assets/complete-control/control.mp4",
] as const;
const VIDEO_POSTER_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 1900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23eef2ff'/%3E%3Cstop offset='100%25' stop-color='%23f8fafc'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='1900' fill='url(%23g)'/%3E%3C/svg%3E";
// Metric order: Primacy, Retention, Refinancing → show control, track, find (Credit Unions)
const DEFAULT_VIDEO_INDEX_FOR_METRIC: [number, number, number] = [2, 1, 0];

export function CreditUnionsValueSection({
  variant,
  metrics,
  openDemoModal,
  videoIndexForMetric,
  compact = false,
}: {
  variant?: "credit-unions" | "banks";
  metrics: SegmentMetric[];
  openDemoModal?: () => void;
  /** Optional map from metric index to video index; used for Banks (Refinancing, Retention, Primacy). */
  videoIndexForMetric?: [number, number, number];
  compact?: boolean;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const videoRefs = React.useRef<Array<HTMLVideoElement | null>>([]);
  const reactId = React.useId();
  const visId = React.useMemo(() => `value-demo-video-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`, [reactId]);
  const isVisible = useVisibility(visId);
  const [hasBeenVisible, setHasBeenVisible] = React.useState(false);
  const [loadedIdx, setLoadedIdx] = React.useState<Set<number>>(() => new Set());

  const map = videoIndexForMetric ?? DEFAULT_VIDEO_INDEX_FOR_METRIC;
  const items = metrics.slice(0, 3);
  const videoIndex = map[activeIndex] ?? 0;
  const isCU = variant === "credit-unions";
  const isBank = variant === "banks";

  React.useEffect(() => {
    if (isVisible) setHasBeenVisible(true);
  }, [isVisible]);

  // For Banks, we force shouldLoad to be true immediately to avoid blank iPhone
  const shouldLoad = isBank || hasBeenVisible;

  React.useEffect(() => {
    if (!shouldLoad) return;
    setLoadedIdx((prev) => {
      if (prev.has(videoIndex)) return prev;
      const next = new Set(prev);
      next.add(videoIndex);
      return next;
    });
  }, [shouldLoad, videoIndex]);

  // Play the active video when selection changes
  React.useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRefs.current[videoIndex];
    if (video) {
      requestAnimationFrame(() => {
        if (!video.isConnected) return;
        video.play().catch(() => {});
      });
    }

    // Keep only the active video running (prevents flicker/jank on heavy pages like Banking).
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx !== videoIndex) v.pause();
    });
  }, [shouldLoad, videoIndex]);

  React.useEffect(() => {
    if (isVisible || isBank) return; // For banks, keep playing
    videoRefs.current.forEach((v) => v?.pause());
  }, [isVisible, isBank]);

  // Both Banks & Credit Unions now use the elite "God Mode" open grid layout.
  // This layout is cleaner, more aligned, and avoids the clipping issues of the old bento.
  return (
    <motion.div
      data-vis-id={visId}
      className={`mx-auto w-full ${compact ? "max-w-[1100px]" : "max-w-[1100px]"}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`grid lg:grid-cols-2 items-center tablet-stack-2col ${compact ? "gap-8 lg:gap-16" : "gap-12 lg:gap-20"}`}>
        {/* Left: Stepper */}
        <div
          className={`stepper-column flex flex-col ${
            compact ? "gap-3 max-w-[400px]" : "gap-4 max-w-[460px]"
          } w-full mx-auto lg:mx-0 lg:ml-auto lg:justify-self-end lg:pr-0`}
        >
          {items.map((m, idx) => {
            const active = idx === activeIndex;
            return (
              <motion.div
                key={m.label}
                role="button"
                tabIndex={0}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`${
                  compact ? "px-5 py-4 rounded-[16px]" : "px-7 py-6 rounded-[20px]"
                } group cursor-pointer transition-all duration-500 text-center md:text-left border border-l-[3px] border-l-transparent relative overflow-hidden ${
                  active
                    ? "bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] border-slate-200/80 border-l-[#2563EB] rounded-l-[6px] shadow-[0_0_0_4px_#FBFCFE,0_18px_44px_-22px_rgba(2,6,23,0.14)] opacity-100"
                    : "bg-white/45 border-transparent opacity-55 hover:opacity-100 hover:bg-white/72"
                }`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${
                    active ? "opacity-100 bg-[#2563EB]/14" : "opacity-0 bg-[#2563EB]/10 group-hover:opacity-100"
                  }`}
                />
                <div className="relative z-10 flex flex-col items-center md:items-start">
                  <div
                    className={`${
                      compact ? "text-[30px]" : "text-[26px] md:text-[28px]"
                    } font-bold text-[#0F172A] leading-none mb-1.5 tabular-nums tracking-[-0.04em]`}
                  >
                    {m.value}
                  </div>
                  <div
                    className={`${
                      compact ? "text-[15px]" : "text-[14px]"
                    } font-semibold text-[#0F172A] mb-1.5 tracking-tight`}
                  >
                    {m.label}
                  </div>
                  <p className={`${compact ? "text-[13.5px]" : "text-[13.5px]"} text-[#64748B] leading-[1.55]`}>
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
          
          {openDemoModal && (
            <div className="mt-4 pl-0 flex justify-center lg:justify-start">
              <Magnetic strength={8} radius={40}>
                <Button
                  variant="flat"
                  color="default"
                  className="nav-btn-base btn-arrow-lead mx-auto lg:mx-0 !h-[40px] !px-6 text-[13px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[rgba(37,99,235,0.14)] hover:bg-[#DBEAFE] hover:border-[rgba(37,99,235,0.20)] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                  onClick={openDemoModal}
                >
                  Book a demo
                </Button>
              </Magnetic>
            </div>
          )}
        </div>

        {/* Right: iPhone */}
        <div className="relative w-full flex justify-center lg:justify-start lg:justify-self-start lg:pl-3 xl:pl-4">
           <div className="safari-clip relative w-full max-w-[216px] sm:max-w-[234px] lg:max-w-[243px] aspect-[1/2.16] rounded-[34px] border-[6px] border-[#1A1A1A] bg-[#0B1020] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="relative h-full w-full bg-[#0B1020]">
                {VALUE_DEMO_VIDEOS.map((src, idx) => {
                  const isActive = videoIndex === idx;
                  const shouldRender = shouldLoad && (isActive || loadedIdx.has(idx));
                  if (!shouldRender) return null;

                  return (
                    <video
                      key={src}
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                        if (el && isActive) {
                           el.play().catch(() => {});
                        }
                      }}
                      className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                      style={{
                        objectFit: "cover",
                        transform: "translateZ(0)",
                        transformOrigin: "center",
                        backfaceVisibility: "hidden",
                        willChange: "transform, opacity",
                      }}
                      src={withBase(src)}
                      poster={VIDEO_POSTER_DATA_URI}
                      muted
                      playsInline
                      autoPlay
                      preload="metadata"
                      loop
                      disablePictureInPicture
                      controls={false}
                      controlsList="nodownload noremoteplayback"
                    />
                  );
                })}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
