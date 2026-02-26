import React from "react";

type CountUpProps = {
  from?: number;
  to: number;
  /** duration in ms */
  duration?: number;
  /** decimals for number formatting */
  decimals?: number;
  /** suffix appended to number (e.g. '%', '+') */
  suffix?: string;
  /** optional prefix (e.g. '+') */
  prefix?: string;
  /** easing curve name */
  easing?: "cubic" | "expo" | "spring";
  className?: string;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/** 
 * Simple spring-like bounce for elite numbers. 
 * Hits 1.0 around t=0.7, settles at 1.0.
 */
function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export function CountUp({
  from = 0,
  to,
  duration = 900,
  decimals = 0,
  suffix,
  prefix,
  easing = "cubic",
  className,
}: CountUpProps) {
  const [val, setVal] = React.useState(from);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      let e = 0;
      if (easing === "expo") e = easeOutExpo(t);
      else if (easing === "spring") e = easeOutBack(t);
      else e = easeOutCubic(t);
      
      const next = from + (to - from) * e;
      setVal(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, easing, from, to]);

  const formatted = val.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}


