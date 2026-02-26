import * as React from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import { EASE_OUT } from "../../lib/motion";
import { PhoneFrame } from "./PhoneFrame";
import { TapIndicator } from "./TapIndicator";
import { useDemoTimeline, type DemoTargetKey } from "./useDemoTimeline";
import { DashboardScreen } from "./screens/DashboardScreen";
import { CalendarScreen } from "./screens/CalendarScreen";
import { BillDetailSheet } from "./screens/BillDetailSheet";

type Screen = "dashboard" | "calendar";

function prefersReducedMotion() {
  try {
    return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  } catch {
    return false;
  }
}

export const PhoneDemo = React.memo(function PhoneDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { margin: "-2% 0px -12% 0px", once: false });
  const [containerRect, setContainerRect] = React.useState<DOMRect | null>(null);

  const [screen, setScreen] = React.useState<Screen>("dashboard");
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [monthIdx, setMonthIdx] = React.useState<0 | 1>(0);
  const [autoScrollY, setAutoScrollY] = React.useState(0);

  const refs = React.useRef<Record<DemoTargetKey, HTMLElement | null>>({
    tabCalendar: null,
    btnNextMonth: null,
    rowNetflix: null,
  });

  const register = React.useMemo(
    () => ({
      tabCalendar: (el: HTMLButtonElement | null) => (refs.current.tabCalendar = el),
      btnNextMonth: (el: HTMLButtonElement | null) => (refs.current.btnNextMonth = el),
      rowNetflix: (el: HTMLButtonElement | null) => (refs.current.rowNetflix = el),
    }),
    []
  );

  const getTargetRect = React.useCallback((k: DemoTargetKey) => {
    const el = refs.current[k];
    if (!el) return null;
    return el.getBoundingClientRect();
  }, []);

  const onTimelineStep = React.useCallback(async (s: Parameters<NonNullable<Parameters<typeof useDemoTimeline>[0]["onStep"]>>[0]) => {
      if (s === "tapCalendar") {
        setScreen("calendar");
        setSheetOpen(false);
        setAutoScrollY(0);
        return;
      }
      if (s === "tapNextMonth") {
        setMonthIdx((v) => (v === 0 ? 1 : 0));
        return;
      }
      if (s === "scrollUpcoming") {
        // “autoplay scroll” inside masked viewport
        setAutoScrollY(-66);
        window.setTimeout(() => setAutoScrollY(0), 950);
        return;
      }
      if (s === "tapNetflix") {
        setSheetOpen(true);
        return;
      }
      if (s === "sheetClose") {
        setSheetOpen(false);
        return;
      }
      if (s === "reset") {
        setScreen("dashboard");
        setSheetOpen(false);
        setMonthIdx(0);
        setAutoScrollY(0);
      }
  }, []);

  const { autoplay, pause, phase, targetRect } = useDemoTimeline({
    enabled: inView,
    getTargetRect,
    onStep: onTimelineStep,
  });

  // Keep containerRect up-to-date (for indicator positioning).
  React.useEffect(() => {
    if (!inView) return;
    if (!autoplay) return;
    let rafId: number | null = null;
    const update = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (containerRef.current) {
          setContainerRect(containerRef.current.getBoundingClientRect());
        }
        rafId = null;
      });
    };
    
    update();
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [inView, autoplay]);

  const onUserInteract = React.useCallback(() => {
    pause();
  }, [pause]);

  const rm = prefersReducedMotion();

  return (
    <div
      ref={containerRef}
      onPointerDown={onUserInteract}
      onKeyDown={onUserInteract as any}
      className={className}
    >
      <PhoneFrame>
        {/* indicator (autoplay only) */}
        <TapIndicator enabled={autoplay && !rm} phase={phase} targetRect={targetRect} containerRect={containerRect} />

        {/* status bar */}
        <div className="px-5 pt-3.5">
          <div className="flex items-center justify-between text-[10.5px] text-slate-600">
            <span className="font-semibold tracking-[-0.01em]">9:41</span>
            <span className="inline-flex items-center gap-2 text-slate-500">
              <Icon icon="lucide:wifi" width={13} height={13} />
              <Icon icon="lucide:signal" width={13} height={13} />
              <span className="h-[10px] w-[20px] rounded-[3px] border border-slate-300/70 bg-white/50" />
            </span>
          </div>
        </div>

        {/* app header */}
        <div className="px-5 pt-3">
          <div className="rounded-[18px] border border-slate-200/68 bg-[#f9fbff]/92 px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">In‑app</div>
                <div className="mt-0.5 text-[15px] font-semibold tracking-[-0.02em] text-[var(--ink)]">
                  Recurring bills
                </div>
              </div>
              <span className="rounded-full border border-slate-200/80 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
                  Live
                </span>
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Icon icon="lucide:clock-3" width={11} height={11} />
                Last updated 2m ago
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon icon="lucide:shield-check" width={11} height={11} />
                Secure connection
              </span>
            </div>
          </div>
        </div>

        {/* tabs */}
        <div className="px-5 pt-2.5">
          <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-slate-600">
            <Tab active={screen === "dashboard"} onClick={() => setScreen("dashboard")}>
              Dashboard
            </Tab>
            <Tab active={screen === "calendar"} onClick={() => setScreen("calendar")} refCb={register.tabCalendar}>
              Calendar
            </Tab>
            <Tab active={screen === "dashboard" && sheetOpen} onClick={() => setSheetOpen(true)}>
              Actions
            </Tab>
          </div>
          <div className="mt-1.5 elite-hairline opacity-[0.75]" />
          <div className="relative mt-1 h-[2px] w-full overflow-hidden rounded-full bg-slate-200/65">
            <motion.span
              key={`${screen}-${sheetOpen ? "sheet" : "base"}-${autoplay ? "play" : "pause"}`}
              className="absolute inset-y-0 left-0 origin-left rounded-full bg-[linear-gradient(90deg,rgba(37,99,235,0.52),rgba(30,162,255,0.58))]"
              initial={{ scaleX: 0, opacity: 0.75 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: autoplay ? 3.5 : 0.2, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </div>

        {/* screens */}
        <motion.div
          className="relative h-[calc(100%-145px)] w-full"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: EASE_OUT }}
        >
          <AnimatePresence mode="wait">
            {screen === "dashboard" ? (
              <motion.div
                key="dash"
                className="absolute inset-0"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: EASE_OUT }}
              >
                <DashboardScreen
                  autoplayScrollY={autoScrollY}
                  register={{ rowNetflix: register.rowNetflix }}
                  onOpenNetflix={() => setSheetOpen(true)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="cal"
                className="absolute inset-0"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: EASE_OUT }}
              >
                <CalendarScreen
                  monthIdx={monthIdx}
                  autoplayScrollY={autoScrollY}
                  register={{ btnNextMonth: register.btnNextMonth, rowNetflix: register.rowNetflix }}
                  onOpenNetflix={() => setSheetOpen(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <BillDetailSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
        </motion.div>
      </PhoneFrame>
    </div>
  );
});

function Tab({
  children,
  active,
  onClick,
  refCb,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  refCb?: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={refCb}
      type="button"
      onClick={onClick}
      className={[
        "relative h-7 border-b text-[11px] transition-colors",
        active ? "border-slate-300/70 text-[var(--ink)]" : "border-transparent text-slate-500 hover:text-slate-700",
      ].join(" ")}
    >
      <span className="inline-flex h-full items-center">{children}</span>
      {active ? (
        <motion.span
          layoutId="phone-demo-active-tab"
          className="pointer-events-none absolute inset-x-1 -bottom-px h-[2px] rounded-full bg-slate-700/85"
          transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
        />
      ) : null}
    </button>
  );
}


