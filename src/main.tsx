import React from "react";
import ReactDOM from "react-dom/client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { VisibilityProvider } from "./components/performance/VisibilityManager";
import { DemoModalProvider } from "./components/demo-modal-context";
import "./lib/iconify";

// Safari paint performance guardrails (keeps first paint crisp on older devices).
try {
  const ua = navigator.userAgent || "";
  const isSafari = /Safari/i.test(ua) && !/(Chrome|Chromium|Edg|OPR|Brave)/i.test(ua);
  if (isSafari) document.documentElement.classList.add("is-safari");
} catch {}

// Pre-paint scroll stabilization:
// Prevent browsers from restoring scroll to the footer on refresh/back-forward cache.
try {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  window.addEventListener("pageshow", (e) => {
    // BFCache restore can re-apply the old scroll position.
    if ((e as any)?.persisted) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  });
} catch {}

function cacheBustReload(storageKey: string) {
  try {
    const already = window.sessionStorage.getItem(storageKey);
    const now = Date.now();
    const last = already ? Number(already) : 0;
    // Prevent loops: allow at most once per 15 seconds.
    if (last && Number.isFinite(last) && now - last < 15_000) return;
    window.sessionStorage.setItem(storageKey, String(now));
    const url = new URL(window.location.href);
    url.searchParams.set("__r", String(now));
    window.location.replace(url.toString());
  } catch {
    window.location.reload();
  }
}

function isChunkLikeFailure(message: string) {
  return /Loading chunk|ChunkLoadError|Importing a module script failed|Failed to fetch dynamically imported module|Failed to load module script|net::ERR_/i.test(
    message
  );
}

// Production-grade self-heal: if a cached/lazy chunk fails after a deploy, reload with cache-bust.
try {
  // Vite (dev + sometimes preview): preload failure event.
  window.addEventListener("vite:preloadError", (event: any) => {
    event?.preventDefault?.();
    cacheBustReload("scribeup:preload-retry");
  });

  // Generic: unhandled promise rejections (dynamic import failures).
  window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    const reason: any = (event as any).reason;
    const msg = String(reason?.message ?? reason ?? "");
    if (!isChunkLikeFailure(msg)) return;
    cacheBustReload("scribeup:chunk-retry");
  });

  // Generic: resource/script errors and runtime errors.
  window.addEventListener(
    "error",
    (event: Event) => {
      const anyEv: any = event as any;
      const msg = String(anyEv?.message ?? "");

      // Resource load errors (e.g. <script src="..."> 404) often have no message.
      const target = anyEv?.target as any;
      const src = String(target?.src ?? target?.href ?? "");
      const resourceLooksLikeChunk = /\/assets\/.*\.(js|css)$/i.test(src);

      if (resourceLooksLikeChunk || isChunkLikeFailure(msg)) {
        cacheBustReload("scribeup:chunk-retry");
      }
    },
    true
  );
} catch {}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeroUIProvider disableRipple reducedMotion="user" spinnerVariant="simple">
      <ToastProvider />
      <VisibilityProvider>
        <DemoModalProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
          </BrowserRouter>
        </DemoModalProvider>
      </VisibilityProvider>
    </HeroUIProvider>
  </React.StrictMode>
);
