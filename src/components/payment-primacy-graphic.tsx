import React from "react";
import { Icon } from "@iconify/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function prefersReducedMotion() {
  try {
    return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  } catch {
    return false;
  }
}

export type PaymentOverlayMode = "brands" | "signals";

type OverlayMark = {
  name: string;
  tone: string;
  icon?: string;
  emoji?: string;
  placeholder?: boolean;
};

const BRAND_MARKS: ReadonlyArray<OverlayMark> = [
  { name: "Netflix", icon: "simple-icons:netflix", tone: "text-red-500" },
  { name: "Geico", icon: "lucide:shield", tone: "text-emerald-600" },
  { name: "Calendar", icon: "lucide:calendar", tone: "text-sky-600" },
];

function MarkIcon({ mark }: { mark: OverlayMark }) {
  if (mark.placeholder) return null;
  if (mark.icon) {
    return <Icon icon={mark.icon} width={16} height={16} />;
  }
  return null;
}

function MarksRow() {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className="relative inline-flex items-center justify-center gap-2.5"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="inline-flex h-8 items-center gap-1 rounded-full border border-blue-200/60 bg-white/92 px-2.5 shadow-[0_8px_20px_-12px_rgba(37,99,235,0.45),inset_0_1px_0_rgba(255,255,255,0.9)]"
          whileHover={{ y: -1, scale: 1.02 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <Icon icon="lucide:sparkles" width={10} height={10} className="text-blue-600" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-700">ScribeUp</span>
        </motion.div>
        {BRAND_MARKS.map((b) => (
          <motion.div
            key={`mark-${b.name}`}
            className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200/70 bg-white/92 backdrop-blur-[8px] shadow-[0_10px_24px_-12px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,0.85)]"
            whileHover={{ y: -1.5, scale: 1.05 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`shrink-0 ${b.tone}`}>
              <MarkIcon mark={b} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function CardBase({
  className = "",
  variant = "before",
}: {
  className?: string;
  variant?: "before" | "after";
}) {
  const rm = prefersReducedMotion();
  return (
    <div
      className={`relative overflow-hidden rounded-[16px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] ${className}`}
      style={{ aspectRatio: "1.586 / 1", width: "100%" }}
    >
      {/* specular top edge */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-white/15 z-20" />
      {/* metal surface */}
      <div
        className={`absolute inset-0 ${
          variant === "after"
            ? "bg-[linear-gradient(135deg,#0B1020_0%,#13233D_34%,#1B2A3F_58%,#0B1020_100%)]"
            : "bg-[linear-gradient(135deg,#0B1220_0%,#111C33_38%,#0B1220_100%)]"
        }`}
      />
      
      {/* brushed texture for 'after' card */}
      {variant === "after" && (
        <div 
          aria-hidden="true" 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      )}

      {/* subtle diagonal grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.55) 0px, rgba(255,255,255,0.55) 1px, transparent 1px, transparent 6px)",
        }}
      />
      {/* bottom clamp: prevent white glare banding on some GPUs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-[linear-gradient(to_top,rgba(11,16,32,0.55),transparent_80%)] opacity-35" />
      {/* specular highlight sweep (premium metal feel) */}
      <motion.div
        aria-hidden="true"
        className={`absolute -inset-6 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,${variant === "after" ? "0.20" : "0.12"})_50%,transparent_62%)] opacity-80`}
        animate={
          rm || variant !== "after"
            ? { x: 0 }
            : { x: ["-55%", "55%"] }
        }
        transition={
          rm || variant !== "after"
            ? { duration: 0.2 }
            : { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
      />
      {/* top strip */}
      <div aria-hidden="true" className={`absolute top-0 left-0 right-0 h-10 ${variant === "after" ? "bg-black/40" : "bg-black/30"}`} />
      {/* chip (premium on AFTER, muted on BEFORE) */}
      <div
        className={`absolute top-6 left-4 w-8 h-6 rounded-[5px] ${
          variant === "after"
            ? "bg-[linear-gradient(135deg,#c9a227,#e8d48b_50%,#b8921f)]"
            : "bg-[linear-gradient(135deg,rgba(148,163,184,0.55),rgba(226,232,240,0.35),rgba(148,163,184,0.22))]"
        } shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_4px_rgba(0,0,0,0.18)]`}
      />
      <div className="absolute top-5 right-4 font-mono text-[13px] font-medium text-white/95 tracking-[0.18em] drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
        4521
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 pt-6">
        <div className={`text-[9px] uppercase tracking-[0.12em] ${variant === "after" ? "text-white/70 font-bold" : "text-white/50"}`}>Debit</div>
        <div className="text-[10px] text-white/60 mt-0.5 tracking-[0.12em]">•••• •••• ••••</div>
      </div>
      {/* inner edge + emboss */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,${variant === "after" ? "0.4" : "0.25"}),inset_0_-28px_60px_rgba(0,0,0,${variant === "after" ? "0.32" : "0.24"})]`}
      />
    </div>
  );
}

export function PaymentPrimacyGraphic({
  onOverlayModeChange,
}: {
  onOverlayModeChange?: (mode: PaymentOverlayMode) => void;
} = {}) {
  const rm = prefersReducedMotion();
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const lastPt = React.useRef<{ x: number; y: number } | null>(null);

  // Mouse-parallax (no React rerenders)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxSpring = useSpring(mx, { stiffness: 140, damping: 26, mass: 0.5 });
  const mySpring = useSpring(my, { stiffness: 140, damping: 26, mass: 0.5 });
  const tiltX = useTransform(mySpring, (v) => v * -6); // invert for natural tilt
  const tiltY = useTransform(mxSpring, (v) => v * 8);
  const driftX = useTransform(mxSpring, (v) => v * 10);
  const driftY = useTransform(mySpring, (v) => v * 6);
  // For the “after” card, mirror the parallax so the pair feels balanced.
  const afterTiltY = useTransform(tiltY, (v) => v * -1);
  const afterDriftX = useTransform(driftX, (v) => v * -1);

  const applyMove = React.useCallback(() => {
    rafRef.current = null;
    const el = wrapRef.current;
    const pt = lastPt.current;
    if (!el || !pt) return;
    const r = el.getBoundingClientRect();
    const px = r.width ? (pt.x - r.left) / r.width : 0.5;
    const py = r.height ? (pt.y - r.top) / r.height : 0.5;
    const nx = (px - 0.5) * 2; // -1..1
    const ny = (py - 0.5) * 2; // -1..1
    mx.set(nx);
    my.set(ny);
  }, [mx, my]);

  const onMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rm) return;
      lastPt.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(applyMove);
    },
    [applyMove, rm]
  );

  const onLeave = React.useCallback(() => {
    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <div
      ref={wrapRef}
      className="relative isolate w-full max-w-none mx-auto flex justify-center items-center px-0 py-2 [transform:translateZ(0)]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* ambient lighting (stabilized): remove heavy blurs that can band/glitch under captions */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10 overflow-hidden">
        <div className="absolute -left-10 top-10 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_at_center,rgba(239,246,255,0.46),transparent_72%)] opacity-60" />
        <div className="absolute -right-8 bottom-6 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle_at_center,rgba(239,246,255,0.42),transparent_74%)] opacity-60" />
      </div>

      {/* Mobile: stacked. Desktop: side-by-side; keep sizes locked so overlayMode never “resizes” cards. */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
        {/* OLD: Card not made for bills */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Before</span>
          <motion.div
            className="relative w-[160px] sm:w-[180px] lg:w-[194px]"
            style={{ perspective: 1200 }}
            initial={{ opacity: 0, y: 10, rotateX: 6, rotateY: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 6, rotateY: -8 }}
            whileHover={{ rotateX: 4, rotateY: -10, y: -2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="relative"
              style={
                rm
                  ? undefined
                  : {
                      rotateX: tiltX,
                      rotateY: tiltY,
                      x: driftX,
                      y: driftY,
                    }
              }
              animate={rm ? { y: 0 } : { y: [0, -3, 0] }}
              transition={rm ? { duration: 0.2 } : { duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <CardBase variant="before" className="opacity-[0.92] grayscale-[0.14]" />
            </motion.div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
              <div className="h-3 w-px border-l border-dashed border-slate-400/50" />
              <span className="text-[8px] text-slate-400 italic">Not built for bills</span>
            </div>
          </motion.div>
          <div className="mt-4 max-w-[170px]">
            <div className="rounded-full border border-slate-200/70 bg-[#F8FAFC] px-3 py-1.5 text-center shadow-[0_0_0_4px_#F8FAFC]">
              <p className="text-[10px] text-slate-600 font-semibold leading-relaxed tracking-[-0.01em]">
                Just a card—no link to bill visibility
              </p>
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex flex-col items-center justify-center text-slate-400">
          <div className="relative flex items-center justify-center">
            <div className="relative h-14 w-[2px] md:h-[2px] md:w-16">
              <div aria-hidden="true" className="absolute inset-0 md:border-b-2 md:border-dashed md:border-slate-300 border-l-2 border-dashed border-slate-300" />
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.04)_0%,transparent_72%)] pointer-events-none" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-2.5 w-2.5">
                <span className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.20),transparent_70%)] blur-[6px]" />
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[linear-gradient(135deg,rgba(37,99,235,1),rgba(30,162,255,0.78))] shadow-[0_0_15px_rgba(37,99,235,0.60),0_0_0_4px_rgba(37,99,235,0.14)]"></span>
              </span>
            </div>
          </div>
          <div className="hidden md:block mt-3 text-[9px] font-bold tracking-[0.15em] uppercase text-slate-600">Transformation</div>
        </div>

        {/* NEW: Card made for on-file */}
        <div className="flex flex-col items-center">
          <div className="mb-3 flex items-center justify-center w-[160px] sm:w-[180px] lg:w-[194px]">
            <MarksRow />
          </div>
          <motion.div
            className="relative w-[160px] sm:w-[180px] lg:w-[194px]"
            style={{ perspective: 1200 }}
            initial={{ opacity: 0, y: 12, rotateX: 7, rotateY: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 7, rotateY: 10 }}
            whileHover={{ rotateX: 4, rotateY: 14, y: -3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* high-contrast “after” glow */}
            <div aria-hidden="true" className="pointer-events-none absolute -inset-6 -z-10 opacity-70">
              <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(closest-side,rgba(30,162,255,0.10),transparent_64%)] blur-[20px]" />
              <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(closest-side,rgba(37,99,235,0.06),transparent_68%)] blur-[26px]" />
            </div>

            <motion.div
              className="relative"
              style={
                rm
                  ? undefined
                  : {
                      rotateX: tiltX,
                      rotateY: afterTiltY,
                      x: afterDriftX,
                      y: driftY,
                    }
              }
            >
              <CardBase variant="after" />
              {/* frosted sheen panel */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_40%,rgba(255,255,255,0.0))] opacity-90" />
              {/* On file badge */}
              <motion.div
                className="absolute bottom-4 right-4 z-50 scale-[0.75] sm:scale-[0.8]"
                animate={rm ? { scale: 0.78 } : { scale: [0.75, 0.8, 0.75] }}
                transition={rm ? { duration: 0.2 } : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border border-white/35 bg-[linear-gradient(180deg,rgba(37,99,235,0.26),rgba(37,99,235,0.14))] shadow-[inset_0_1px_0_rgba(255,255,255,0.34),inset_0_0_0_1px_rgba(255,255,255,0.18),0_12px_28px_rgba(2,6,23,0.30),0_0_18px_rgba(37,99,235,0.18)] backdrop-blur-[10px] ring-1 ring-blue-400/16">
                  <Icon icon="lucide:file-check" width={10} height={10} className="text-blue-50 drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]" style={{ strokeWidth: 1.5 }} />
                  <span className="text-[7px] font-bold tracking-[0.12em] uppercase text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.4)] whitespace-nowrap">
                    On file
                  </span>
                </div>
              </motion.div>
            </motion.div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="h-2 w-px bg-blue-400/45" />
              <span className="text-[8px] text-blue-700 font-semibold">Made for bills</span>
            </div>
            <div className="mt-4 max-w-[200px]">
              <div className="rounded-full border border-slate-200/70 bg-[#F8FAFC] px-3 py-1.5 text-center shadow-[0_0_0_4px_#F8FAFC]">
                <p className="text-[10px] text-slate-700 font-semibold leading-relaxed tracking-[-0.01em]">
                  Payment form on file = tracked in your app
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
