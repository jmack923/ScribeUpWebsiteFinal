import React from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Routes } from "./routes";
import { SiteNavbar } from "./components/navbar";
import { SiteFooter } from "./components/footer";
import { RevealInit } from "./components/reveal-init";
import { DemoModal } from "./components/demo-modal";
import { RouteErrorBoundary } from "./components/route-error-boundary";

function yieldToMain() {
  // Prioritized continuation where supported; fallback yields in all browsers.
  const anyGlobal = globalThis as any;
  if (anyGlobal.scheduler?.yield) return anyGlobal.scheduler.yield();
  return new Promise<void>((resolve) => window.setTimeout(resolve, 0));
}

export default function App() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const forceScrollTop = React.useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    // Some engines restore via different roots depending on timing.
    document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  React.useLayoutEffect(() => {
    // Pre-paint: prevent browser scroll restoration from landing users at the footer,
    // then "jumping" after effects run (common on refresh + Safari).
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {}

    // Pre-paint: always start routes at top (no smooth behavior to avoid scroll-linked conflicts).
    // Hash routes are handled by the router's anchor scroll logic—don't fight it.
    if (!location.hash) forceScrollTop();
  }, [location.pathname, location.hash, forceScrollTop]);

  React.useEffect(() => {
    if (location.hash) return;
    // Hard guard: some browsers can keep restoring old scroll position long after first paint.
    // Hold the page at top briefly on route entry, then release control.
    const ids: number[] = [];
    let userInteracted = false;
    const startedAt = performance.now();
    const HOLD_MS = 2000;

    const markInteracted = () => {
      userInteracted = true;
    };

    const attempts = [0, 40, 120, 240, 420, 700, 1000, 1400, 1800];
    attempts.forEach((ms) => {
      ids.push(window.setTimeout(() => !userInteracted && forceScrollTop(), ms));
    });
    const interval = window.setInterval(() => {
      if (userInteracted) return;
      if (performance.now() - startedAt > HOLD_MS) return;
      if (window.scrollY > 2 || document.documentElement.scrollTop > 2 || (document.body?.scrollTop ?? 0) > 2) {
        forceScrollTop();
      }
    }, 50);

    window.addEventListener("wheel", markInteracted, { passive: true });
    window.addEventListener("touchstart", markInteracted, { passive: true });
    window.addEventListener("pointerdown", markInteracted, { passive: true });
    window.addEventListener("keydown", markInteracted, { passive: true });

    return () => {
      ids.forEach((id) => window.clearTimeout(id));
      window.clearInterval(interval);
      window.removeEventListener("wheel", markInteracted as any);
      window.removeEventListener("touchstart", markInteracted as any);
      window.removeEventListener("pointerdown", markInteracted as any);
      window.removeEventListener("keydown", markInteracted as any);
    };
  }, [location.pathname, forceScrollTop]);

  React.useEffect(() => {
    // Re-init attribute-based reveal animations after route transitions.
    // Yield to keep route entry responsive (web.dev long-task guidance).
    let cancelled = false;
    (async () => {
      await yieldToMain();
      if (cancelled) return;
      window.dispatchEvent(new Event("anm:refresh"));
      await yieldToMain();
      if (cancelled) return;
      window.dispatchEvent(new Event("anm:refresh"));
    })();
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  React.useEffect(() => {
    // Safari Reader mode can be toggled via ⌘⇧R and can look like a "summary card" overlay.
    // We can't control the browser UI, but we can prevent accidental toggles while users are on the site.
    try {
      const root = document.documentElement;
      const isSafari = root.classList.contains("is-safari");
      if (!isSafari) return;

      const onKeyDown = (e: KeyboardEvent) => {
        // Safari: Toggle Reader (⌘⇧R). Prevent so the site doesn't jump into Reader UI.
        if (e.metaKey && e.shiftKey && (e.key === "r" || e.key === "R")) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      window.addEventListener("keydown", onKeyDown, { capture: true });
      return () => window.removeEventListener("keydown", onKeyDown, { capture: true } as any);
    } catch {
      return;
    }
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-transparent text-slate-900">
      <a
        href="#main-content"
        className="skip-link"
        onClick={() => {
          window.setTimeout(() => {
            const el = document.getElementById("main-content");
            if (el instanceof HTMLElement) el.focus();
          }, 0);
        }}
      >
        Skip to main content
      </a>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(45%_35%_at_12%_14%,rgba(239,246,255,0.62),transparent_70%),radial-gradient(40%_30%_at_88%_18%,rgba(239,246,255,0.46),transparent_72%)] opacity-[0.55]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 distance-grid opacity-[0.32] [mask-image:radial-gradient(55%_60%_at_50%_18%,black,transparent_72%)]"
      />
      <RevealInit />
      <SiteNavbar />
      {/* Spacer: navbar is fixed, keep layout consistent */}
      <div aria-hidden="true" className="h-[76px] md:h-[84px]" />
      <DemoModal />
      {/* Build tag removed */}
      <main id="main-content" tabIndex={-1} className="flex-1 relative flex flex-col">
        <motion.div
          key={location.pathname}
          className="flex-1 relative"
          style={{ willChange: "transform, opacity" }}
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                  scale: 0.995,
                }
          }
          animate={
            reducedMotion
              ? { opacity: 1, y: 0 }
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
          }
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            initial={reducedMotion ? false : { opacity: 0.14 }}
            animate={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background:
                "linear-gradient(180deg, rgba(248,250,252,0.92) 0%, rgba(248,250,252,0.55) 35%, rgba(248,250,252,0) 100%)",
            }}
          />
          <RouteErrorBoundary resetKey={location.pathname}>
            <Routes />
          </RouteErrorBoundary>
        </motion.div>
        <SiteFooter />
      </main>
    </div>
  );
}