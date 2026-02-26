import React from "react";
import { useReducedMotion } from "framer-motion";

export function Magnetic({
  children,
  disabled,
  strength = 10,
  radius = 60,
  hitSlop = 20,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  strength?: number;
  radius?: number;
  hitSlop?: number;
}) {
  const reducedMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);

  const apply = React.useCallback((x: number, y: number) => {
    if (!ref.current) return;
    ref.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
  }, []);

  return (
    <div
      className="inline-block"
      style={{
        padding: hitSlop,
        margin: -hitSlop,
      }}
      onPointerMove={(e) => {
        if (disabled || reducedMotion) return;
        if (e.pointerType === "touch") return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > radius) {
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(() => apply(0, 0));
          return;
        }
        const pull = 1 - dist / radius;
        const tx = (dx / radius) * strength * pull;
        const ty = (dy / radius) * strength * pull;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => apply(tx, ty));
      }}
      onPointerLeave={() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => apply(0, 0));
      }}
    >
      <div
        ref={ref}
        className="inline-block will-change-transform"
        style={{
          transform: "translate3d(0,0,0)",
          transition: reducedMotion ? undefined : "transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

