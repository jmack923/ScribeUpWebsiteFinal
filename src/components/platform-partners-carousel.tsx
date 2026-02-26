import React from "react";
import { motion, useInView } from "framer-motion";
import { useVisibility } from "../components/performance/VisibilityManager";

type PartnerLogo = {
  name: string;
  src: string;
  fallback: string;
  /** Optical normalization so marks feel equal weight in a rail */
  scale?: number;
};

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  return `${base}${path.replace(/^\//, "")}`;
}

const partners: PartnerLogo[] = [
  { name: "Q2", src: withBase("assets/partners/q2.svg"), fallback: "Q2", scale: 0.92 },
  { name: "Alkami", src: withBase("assets/partners/alkami.svg"), fallback: "Alkami", scale: 0.92 },
  { name: "Lumin", src: withBase("assets/partners/lumin.svg"), fallback: "Lumin", scale: 0.94 },
  { name: "Banno", src: withBase("assets/partners/banno.svg"), fallback: "Banno", scale: 0.92 },
  { name: "Candescent", src: withBase("assets/partners/candescent.svg"), fallback: "Candescent", scale: 0.92 },
];

function PartnerLogoItem({ item }: { item: PartnerLogo }) {
  const [failed, setFailed] = React.useState(false);

  return (
    <div
      className="group relative inline-flex h-[32px] md:h-[38px] min-w-[120px] md:min-w-[140px] items-center justify-center px-3.5 md:px-5 opacity-95 transition-all duration-300 shrink-0"
      aria-label={item.name}
      title={item.name}
    >
      {failed ? (
        <span className="absolute inset-0 grid place-items-center text-[12px] md:text-[13px] font-semibold tracking-[-0.02em] text-slate-600 whitespace-nowrap">
          {item.fallback}
        </span>
      ) : (
        <img
          src={item.src}
          alt={item.name}
          width={180}
          height={48}
          className="absolute inset-0 m-auto h-5 md:h-6 w-[90%] object-contain object-center transition-all duration-300 opacity-100"
          style={{
            transform: `scale(${item.scale ?? 0.92})`,
          }}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export function PlatformPartnersCarousel() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", once: true });
  const isVisible = useVisibility("partners-carousel");
  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setStart(true), 380);
    return () => window.clearTimeout(t);
  }, [inView]);

  const rm = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const items = start && !rm ? [...partners, ...partners, ...partners] : partners;

  return (
    <motion.div
      ref={ref}
      className="relative w-full py-2.5 md:py-3.5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }}
      data-vis-id="partners-carousel"
    >
      <div className="mask-fade-x-wide flex justify-center">
        <div 
          className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-10 md:gap-y-8 lg:gap-x-14 will-change-transform`} 
        >
          {partners.map((item, idx) => (
            <motion.div
              key={`${item.name}-${idx}`}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <PartnerLogoItem item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


