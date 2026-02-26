import React from "react";
import { useInView } from "framer-motion";
import { useVisibility } from "../components/performance/VisibilityManager";

type PressLogo = {
  name: string;
  src: string;
  widthClass: string;
  fallback: string;
};

function withBase(path: string) {
  // BASE_URL includes trailing slash (e.g. "/" or "/scribe2026/")
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  return `${base}${path.replace(/^\//, "")}`;
}

const press: PressLogo[] = [
  // Use mostly consistent slots so the marquee feels “typeset” (no random jumps).
  { name: "Fox Business", src: withBase("assets/press/fox-business.svg"), widthClass: "w-[150px] md:w-[170px]", fallback: "FOX BUSINESS" },
  { name: "TechCrunch", src: withBase("assets/press/techcrunch.svg"), widthClass: "w-[150px] md:w-[170px]", fallback: "TECHCRUNCH" },
  { name: "The Wall Street Journal", src: withBase("assets/press/wsj.svg"), widthClass: "w-[86px] md:w-[98px]", fallback: "WSJ" },
  { name: "ALM / CU Times", src: withBase("assets/press/alm-cu-times.svg"), widthClass: "w-[150px] md:w-[170px]", fallback: "ALM · CU TIMES" },
  { name: "American Banker", src: withBase("assets/press/american-banker.svg"), widthClass: "w-[150px] md:w-[170px]", fallback: "AMERICAN BANKER" },
  { name: "Finextra", src: withBase("assets/press/finextra.svg"), widthClass: "w-[150px] md:w-[170px]", fallback: "FINEXTRA" },
  { name: "PYMNTS", src: withBase("assets/press/pymnts.svg"), widthClass: "w-[150px] md:w-[170px]", fallback: "PYMNTS" },
  { name: "Payments Dive", src: withBase("assets/press/payments-dive.svg"), widthClass: "w-[150px] md:w-[170px]", fallback: "PAYMENTS DIVE" },
];

function SeparatorDot() {
  return (
    <span
      aria-hidden="true"
      className="mx-2.5 inline-flex h-[3px] w-[3px] rounded-full bg-slate-400/55 self-center"
    />
  );
}

function PressLogoItem({ item, idx, popIn }: { item: PressLogo; idx: number; popIn: boolean }) {
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const delay = Math.min(idx, 12) * 55;

  return (
    <div
      className={`relative inline-flex ${item.widthClass} h-10 md:h-11 items-center justify-center opacity-90 hover:opacity-100 transition-[opacity,transform] duration-300 hover:-translate-y-[1px] ${
        popIn ? "press-pop" : ""
      }`}
      aria-label={item.name}
      title={item.name}
      style={popIn ? ({ animationDelay: `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {/* Always-visible fallback text (so this can never look empty) */}
      <span
        className={`absolute inset-0 grid place-items-center text-[12px] md:text-[13px] font-semibold tracking-[0.08em] text-slate-500/85 whitespace-nowrap transition-opacity duration-300 ${
          loaded && !failed ? "opacity-0" : "opacity-100"
        }`}
      >
        {item.fallback}
      </span>
      <img
        src={item.src}
        alt={item.name}
        width={180}
        height={44}
        className={`absolute inset-0 m-auto h-7 md:h-8 w-[86%] object-contain grayscale-[1] contrast-100 brightness-90 hover:grayscale-0 hover:brightness-100 ${
          loaded && !failed ? "opacity-100" : "opacity-0"
        } ${loaded && !failed ? "translate-y-0" : "translate-y-[2px]"} transition-[opacity,transform,filter] duration-500`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function LogoMarquee() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px", once: true });
  const isVisible = useVisibility("press-marquee");
  const [start, setStart] = React.useState(false);
  React.useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setStart(true), 860);
    return () => window.clearTimeout(t);
  }, [inView]);
  const popIn = inView && !start;
  const items = start ? [...press, ...press] : press;
  return (
    <div ref={ref} className="relative overflow-hidden" data-vis-id="press-marquee">
      <div className="mask-fade-x">
        <div 
          className={`flex items-center whitespace-nowrap ${start ? "animate-marquee" : ""} will-change-transform`}
          style={{ animationPlayState: isVisible ? "running" : "paused" }}
        >
          {items.map((item, idx) => (
            <div key={`${item.name}-${idx}`} className="inline-flex items-center shrink-0">
              <PressLogoItem item={item} idx={idx} popIn={popIn} />
              {idx % press.length === press.length - 1 ? null : <SeparatorDot />}
            </div>
          ))}
        </div>
      </div>
      {/* Fallback if animation fails */}
      <div className="flex md:hidden items-center justify-center gap-4 py-2 text-xs text-slate-600">
        <span>Fox Business</span>
        <span>•</span>
        <span>TechCrunch</span>
        <span>•</span>
        <span>WSJ</span>
        <span>•</span>
        <span>American Banker</span>
      </div>
    </div>
  );
}