import * as React from "react";

function prefersReducedMotion() {
  try {
    return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  } catch {
    return false;
  }
}

function isSafari() {
  try {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent || "";
    const isWebKitSafari = /Safari/i.test(ua) && !/(Chrome|Chromium|Edg|OPR|Brave)/i.test(ua);
    return isWebKitSafari;
  } catch {
    return false;
  }
}

function refreshReveals() {
  const root = document.documentElement;
  const forceShowAll = () => {
    try {
      root.classList.remove("reveal-ready");
      const all = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-item]"));
      all.forEach((el) => el.classList.add("is-visible"));
    } catch {}
  };

  try {
    if (prefersReducedMotion()) {
      root.classList.remove("reveal-ready");
      return;
    }

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-item]"));
    if (!items.length) {
      // Avoid leaving the document in a "hidden" state if the page doesn't use reveal items.
      root.classList.remove("reveal-ready");
      return;
    }

    // Disconnect any previous observer before creating a new one.
    (window as any).__scribeupRevealObserver?.disconnect?.();
    (window as any).__scribeupRevealObserver = null;

    // Only enable the hide-then-reveal behavior once we know we have reveal items.
    // CRITICAL: Only add 'reveal-ready' if we haven't already hit the failsafe.
    // If the failsafe ran, we want everything visible, so don't re-hide.
    if (!root.hasAttribute("data-reveal-failed")) {
      root.classList.add("reveal-ready");
    }

    // Auto-stagger reveal items within each section unless author explicitly set a delay.
    // This gives a premium “cascade” without having to hand-tune every block.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal='section']"));
    for (const section of sections) {
      const sectionItems = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal-item]"));
      sectionItems.forEach((el, i) => {
        // Respect explicit author delays.
        const hasInline = (el.getAttribute("style") || "").includes("--reveal-delay");
        if (hasInline) return;
        if (el.style.getPropertyValue("--reveal-delay")) return;
        const ms = Math.min(i * 70, 280); // cap so long sections don’t feel sluggish
        el.style.setProperty("--reveal-delay", `${ms}ms`);
      });
    }

    // Mark items already in viewport as visible immediately (prevents “blank on load”).
    const markInViewNow = () => {
      const vh = window.innerHeight || 0;
      for (const el of items) {
        const r = el.getBoundingClientRect();
        const inView = r.top < vh * 0.92 && r.bottom > vh * 0.06;
        if (inView) el.classList.add("is-visible");
      }
    };
    markInViewNow();

    // If IntersectionObserver isn't available for any reason, degrade gracefully:
    // show everything instead of risking a blank page.
    if (typeof (window as any).IntersectionObserver === "undefined") {
      forceShowAll();
      return;
    }

    // Safari can lag a beat on layout/paint (fonts/video/filters). Re-run a couple times to avoid "late graphics".
    if (isSafari()) {
      window.setTimeout(markInViewNow, 180);
      window.setTimeout(markInViewNow, 600);
    }

    // If IntersectionObserver isn't available for any reason, degrade gracefully:
    // show everything instead of risking a blank page.
    if (typeof (window as any).IntersectionObserver === "undefined") {
      forceShowAll();
      return;
    }

    // Fresh observer per refresh keeps it robust across route transitions.
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            el.classList.remove("is-exited");
          }
        }
      },
      {
        root: null,
        threshold: [0.05, 0.2],
        // Trigger slightly earlier so assets have time to paint (especially on Safari / slower CPUs).
        rootMargin: "0px 0px 12% 0px",
      }
    );

    items.forEach((el) => obs.observe(el));
    (window as any).__scribeupRevealObserver = obs;
  } catch (err) {
    console.error("Reveal system error:", err);
    // Never allow a reveal failure to blank the page.
    forceShowAll();
  }
}

export function RevealInit() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let lastRefresh = 0;
    let safetyTimer: number | null = null;
    const onRefresh = () => {
      // Prevent rapid-fire refreshes (throttle to 100ms)
      const now = Date.now();
      if (now - lastRefresh < 100) return;
      lastRefresh = now;

      // Let layout settle first (route transitions + lazy mounts).
      requestAnimationFrame(() => requestAnimationFrame(refreshReveals));

      // Safety net: if anything goes wrong (extensions, browser quirks), don't let sections stay hidden.
      if (safetyTimer) window.clearTimeout(safetyTimer);
      safetyTimer = window.setTimeout(() => {
        try {
          const root = document.documentElement;
          // FAILSAFE: If we're still waiting after 300ms, just show everything.
          // This prevents "white page" issues if the observer fails or Suspense timing is weird.
          root.setAttribute("data-reveal-failed", "true");
          root.classList.remove("reveal-ready");
          const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-item]:not(.is-visible)"));
          items.forEach((el) => el.classList.add("is-visible"));
        } catch {}
      }, 300);
    };

    window.addEventListener("anm:refresh", onRefresh);
    // When navigating to hash anchors (e.g. /#roi), re-run reveal marking so the target
    // section doesn't look blank for a beat.
    window.addEventListener("hashchange", onRefresh);
    onRefresh();

    // Watch for DOM changes that introduce new `[data-reveal-item]` nodes (SPA updates / HMR).
    // Without this, newly added reveal items can stay hidden until the next manual refresh event.
    let mo: MutationObserver | null = null;
    let moTimer: number | null = null;
    const scheduleMoRefresh = () => {
      if (moTimer) window.clearTimeout(moTimer);
      moTimer = window.setTimeout(() => onRefresh(), 150); // Increased from 60ms to 150ms
    };
    if (typeof MutationObserver !== "undefined") {
      mo = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type !== "childList") continue;
          // If any added node (or its subtree) contains a reveal item, refresh.
          for (const n of Array.from(m.addedNodes)) {
            if (!(n instanceof HTMLElement)) continue;
            if (n.matches?.("[data-reveal-item]") || n.querySelector?.("[data-reveal-item]")) {
              scheduleMoRefresh();
              return;
            }
          }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    // Keep in sync if user toggles reduced motion.
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const onMq = () => onRefresh();
    // Safari older versions may not support addEventListener on MediaQueryList
    try {
      mq?.addEventListener?.("change", onMq);
    } catch {
      mq?.addListener?.(onMq as any);
    }

    return () => {
      window.removeEventListener("anm:refresh", onRefresh);
      window.removeEventListener("hashchange", onRefresh);
      if (safetyTimer) window.clearTimeout(safetyTimer);
      if (moTimer) window.clearTimeout(moTimer);
      mo?.disconnect();
      try {
        mq?.removeEventListener?.("change", onMq);
      } catch {
        mq?.removeListener?.(onMq as any);
      }
      (window as any).__scribeupRevealObserver?.disconnect?.();
      (window as any).__scribeupRevealObserver = null;
    };
  }, []);

  return null;
}


