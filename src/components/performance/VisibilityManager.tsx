import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type VisibilityContextType = {
  register: (id: string, callback: (isVisible: boolean) => void) => void;
  unregister: (id: string) => void;
};

const VisibilityContext = createContext<VisibilityContextType | null>(null);

export function VisibilityProvider({ children }: { children: React.ReactNode }) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const callbacksRef = useRef<Map<string, (v: boolean) => void>>(new Map());

  useEffect(() => {
    // Elite standard: "Pop in early, leave late" to avoid flicker at edges,
    // but strict enough to save GPU when truly gone.
    // Use a small debounce/throttle on visibility entries to prevent scroll jitter.
    let timeoutId: number | null = null;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (timeoutId) window.clearTimeout(timeoutId);
        
        timeoutId = window.setTimeout(() => {
          entries.forEach((entry) => {
            const id = entry.target.getAttribute("data-vis-id");
            if (id && callbacksRef.current.has(id)) {
              callbacksRef.current.get(id)?.(entry.isIntersecting);
            }
          });
        }, 32); // Increased to ~2 frames for better scroll stability
      },
      {
        root: null,
        rootMargin: "20% 0px 20% 0px", // Pre-warm when close
        threshold: 0,
      }
    );

    return () => {
      observerRef.current?.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const register = (id: string, callback: (v: boolean) => void) => {
    callbacksRef.current.set(id, callback);
    
    // More robust registration: check immediately, then retry if not found
    let tries = 0;
    const findAndObserve = () => {
      const el = document.querySelector(`[data-vis-id="${id}"]`);
      if (el) {
        observerRef.current?.observe(el);
      } else if (tries < 5) {
        tries++;
        requestAnimationFrame(findAndObserve);
      }
    };
    findAndObserve();
  };

  const unregister = (id: string) => {
    callbacksRef.current.delete(id);
    const el = document.querySelector(`[data-vis-id="${id}"]`);
    if (el) observerRef.current?.unobserve(el);
  };

  return (
    <VisibilityContext.Provider value={{ register, unregister }}>
      {children}
    </VisibilityContext.Provider>
  );
}

export function useVisibility(id: string) {
  const [isVisible, setIsVisible] = useState(false);
  const ctx = useContext(VisibilityContext);

  useEffect(() => {
    if (!ctx) return;
    ctx.register(id, setIsVisible);
    return () => ctx.unregister(id);
  }, [id, ctx]);

  return isVisible;
}

