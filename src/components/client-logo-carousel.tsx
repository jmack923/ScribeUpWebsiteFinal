import React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type ClientLogo = {
  name: string;
  src?: string;
  fallback: string;
  /** Optical normalization: scale down tall/heavy marks so they feel equal weight */
  scale?: number;
  /** Vertical nudge in px so the logo content is visually centered (negative = up, positive = down) */
  offsetY?: number;
  /** Horizontal spacing adjustment (margin-left/right in px) to align with other logos */
  spacingX?: number;
  /** Override left margin only (px) to tighten/loosen gap before this logo */
  marginLeft?: number;
};

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  return `${base}${path.replace(/^\//, "")}`;
}

// Logo files in public/assets/clients/ — credit unions first (alphabetical), then others.
// Scales normalized to a tight band (0.88–1.12) so no logo dominates; spacing is uniform.
const clients: ClientLogo[] = [
  { name: "Advia Credit Union", src: withBase("assets/clients/advia.png"), fallback: "Advia Credit Union", scale: 1.02 },
  { name: "Chartway Credit Union", src: withBase("assets/clients/chartway-transparent.png"), fallback: "Chartway Credit Union", scale: 1.06, spacingX: -10 },
  { name: "Service Credit Union", src: withBase("assets/clients/service-cu-transparent.png"), fallback: "Service Credit Union", scale: 1.0, offsetY: -4 },
  { name: "NerdWallet", src: withBase("assets/clients/nerdwallet.svg"), fallback: "NerdWallet", scale: 0.96 },
  { name: "DailyPay", src: withBase("assets/clients/dailypay-transparent.png"), fallback: "DailyPay", scale: 0.82 },
  { name: "Kudos", src: withBase("assets/clients/kudos.png"), fallback: "Kudos", scale: 1.15 },
  { name: "Super.com", src: withBase("assets/clients/super.png"), fallback: "Super.com", scale: 0.86 },
];

function ClientLogoItem({ item }: { item: ClientLogo }) {
  const [failed, setFailed] = React.useState(false);
  const hasImage = !!item.src;

  return (
    <div
      className="group relative inline-flex h-10 md:h-12 min-w-[120px] md:min-w-[136px] flex-shrink-0 items-center justify-center px-2 [align-self:center]"
      style={
        item.spacingX != null || item.marginLeft != null
          ? { marginLeft: item.marginLeft ?? item.spacingX, marginRight: item.spacingX }
          : undefined
      }
      aria-label={item.name}
      title={item.name}
    >
      {hasImage ? (
        <>
          {failed ? (
            <span className="text-[11.5px] font-semibold tracking-[-0.02em] text-slate-500 whitespace-nowrap">
              {item.fallback}
            </span>
          ) : (
            <img
              src={item.src}
              alt={item.name}
              width={200}
              height={28}
              className={[
                "h-[26px] md:h-[36px] w-auto max-w-[240px] object-contain object-center",
                "transition-[filter,opacity,transform] duration-300",
                "opacity-100 group-hover:opacity-100 group-hover:scale-[1.03]",
              ].join(" ")}
              style={{
                transform: (() => {
                  const parts: string[] = [];
                  if (item.scale != null) parts.push(`scale(${item.scale})`);
                  if (item.offsetY != null) parts.push(`translateY(${item.offsetY}px)`);
                  return parts.length ? parts.join(" ") : undefined;
                })(),
                transformOrigin: "center center",
              }}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
            />
          )}
        </>
      ) : (
        <span className="text-[11.5px] font-semibold tracking-[-0.02em] text-slate-600 whitespace-nowrap">
          {item.fallback}
        </span>
      )}
    </div>
  );
}

export function ClientLogoCarousel() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", once: true });
  const rm = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);
  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setStart(true), 400);
    return () => window.clearTimeout(t);
  }, [inView]);

  // Mobile: keep marquee enabled (users expect movement); relies on slow CSS animation.
  const canMarquee = start && !rm;

  return (
    <motion.div
      ref={ref}
      className="relative w-full"
      initial={rm ? false : isMobile ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={rm ? undefined : isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.52, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="client-logo-rail relative mx-auto w-full max-w-[1200px] overflow-x-auto md:overflow-hidden py-2 min-h-[76px] md:min-h-[92px] [contain:paint] scrollbar-hide">
        {/* cheaper than mask-image (smoother on Safari) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(to_right,rgba(255,255,255,1),rgba(255,255,255,0))] z-10" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(to_left,rgba(255,255,255,1),rgba(255,255,255,0))] z-10" />
        <div
          className={[
            "flex flex-nowrap items-center w-max",
            canMarquee ? "animate-client-marquee-slow will-change-transform [transform:translateZ(0)]" : "",
          ].join(" ")}
          aria-label="Trusted by client logos"
        >
          <div className="flex flex-nowrap items-center gap-8 md:gap-14">
            {clients.map((item, idx) => (
              <ClientLogoItem key={`${item.name}-${idx}`} item={item} />
            ))}
          </div>
          <div aria-hidden="true" className="flex flex-nowrap items-center gap-8 md:gap-14 ml-8 md:ml-14">
            {clients.map((item, idx) => (
              <ClientLogoItem key={`${item.name}-dup-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
