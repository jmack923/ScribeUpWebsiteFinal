import * as React from "react";

export type DemoTargetKey = "tabCalendar" | "btnNextMonth" | "rowNetflix";
export type DemoPhase = "move" | "hover" | "tap";
export type DemoStep =
  | "idle"
  | "hintCalendar"
  | "tapCalendar"
  | "calendarShown"
  | "hintNextMonth"
  | "tapNextMonth"
  | "scrollUpcoming"
  | "hintNetflix"
  | "tapNetflix"
  | "sheetOpen"
  | "sheetClose"
  | "reset";

function prefersReducedMotion() {
  try {
    return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  } catch {
    return false;
  }
}

function sleep(ms: number) {
  return new Promise<void>((r) => window.setTimeout(r, ms));
}

export function useDemoTimeline({
  enabled = true,
  getTargetRect,
  onStep,
}: {
  enabled?: boolean;
  getTargetRect: (key: DemoTargetKey) => DOMRect | null;
  onStep: (step: DemoStep) => void | Promise<void>;
}) {
  const [autoplay, setAutoplay] = React.useState(() => enabled && !prefersReducedMotion());
  const [phase, setPhase] = React.useState<DemoPhase>("move");
  const [step, setStep] = React.useState<DemoStep>("idle");
  const [targetKey, setTargetKey] = React.useState<DemoTargetKey | null>(null);
  const [targetRect, setTargetRect] = React.useState<DOMRect | null>(null);

  const resumeTimerRef = React.useRef<number | null>(null);
  const runIdRef = React.useRef(0);

  // If autoplay was initialized while out-of-view, re-enable when the demo becomes visible.
  React.useEffect(() => {
    if (!enabled) {
      setAutoplay(false);
      return;
    }
    if (prefersReducedMotion()) {
      setAutoplay(false);
      return;
    }
    setAutoplay(true);
  }, [enabled]);

  const pause = React.useCallback(() => {
    if (!enabled) return;
    setAutoplay(false);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    // Resume quickly enough so the motion system still feels alive after interaction.
    resumeTimerRef.current = window.setTimeout(() => {
      if (!enabled) return;
      if (prefersReducedMotion()) return;
      setAutoplay(true);
    }, 3600);
  }, [enabled]);

  const setTarget = React.useCallback(
    (k: DemoTargetKey | null) => {
      setTargetKey(k);
      setTargetRect(k ? getTargetRect(k) : null);
    },
    [getTargetRect]
  );

  // Keep target position updated (scroll/resize).
  React.useEffect(() => {
    if (!enabled) return;
    if (!targetKey) return;
    
    let rafId: number | null = null;
    const update = () => {
      // Throttle updates via RAF to avoid layout thrashing
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setTargetRect(getTargetRect(targetKey));
        rafId = null;
      });
    };
    
    // Initial position check
    update();
    
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled, targetKey, getTargetRect]);

  React.useEffect(() => {
    if (!enabled) return;
    if (prefersReducedMotion()) return;
    if (!autoplay) return;

    const runId = ++runIdRef.current;
    (async () => {
      const safe = () => runIdRef.current === runId;

      while (safe()) {
        setPhase("move");
        setStep("idle");
        setTarget(null);
        await sleep(380);
        if (!safe()) return;

        setStep("hintCalendar");
        setPhase("hover");
        setTarget("tabCalendar");
        await sleep(550);
        if (!safe()) return;

        setStep("tapCalendar");
        setPhase("tap");
        await sleep(190);
        if (!safe()) return;
        await onStep("tapCalendar");
        if (!safe()) return;

        setStep("calendarShown");
        setPhase("move");
        setTarget(null);
        await sleep(480);
        if (!safe()) return;

        setStep("hintNextMonth");
        setPhase("hover");
        setTarget("btnNextMonth");
        await sleep(530);
        if (!safe()) return;

        setStep("tapNextMonth");
        setPhase("tap");
        await sleep(190);
        if (!safe()) return;
        await onStep("tapNextMonth");
        if (!safe()) return;

        setStep("scrollUpcoming");
        setPhase("move");
        setTarget(null);
        await sleep(610);
        if (!safe()) return;
        await onStep("scrollUpcoming");
        if (!safe()) return;

        setStep("hintNetflix");
        setPhase("hover");
        setTarget("rowNetflix");
        await sleep(550);
        if (!safe()) return;

        setStep("tapNetflix");
        setPhase("tap");
        await sleep(200);
        if (!safe()) return;
        await onStep("tapNetflix");
        if (!safe()) return;

        setStep("sheetOpen");
        setPhase("move");
        setTarget(null);
        await sleep(700);
        if (!safe()) return;
        await onStep("sheetClose");
        if (!safe()) return;

        setStep("reset");
        await sleep(440);
        if (!safe()) return;
        await onStep("reset");

        // Brief pause between loops so the sequence feels intentional.
        await sleep(440);
      }
    })();

    return () => {
      // invalidate
      runIdRef.current++;
    };
  }, [autoplay, enabled, onStep, setTarget]);

  React.useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  return {
    autoplay,
    pause,
    phase,
    step,
    targetRect,
  };
}


