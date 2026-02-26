import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, useInView } from "framer-motion";

type DeviceMockProps = {
  title?: string;
  bullets?: string[];
  compact?: boolean;
};

export function DeviceMock({ title = "Embedded Bill Control", bullets = [], compact = false }: DeviceMockProps) {
  const [active, setActive] = React.useState(0); // Auto-cycle highlight
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-20% 0px -20% 0px", once: false });
  React.useEffect(() => {
    if (!bullets.length) return;
    if (!inView) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % bullets.length), 2400);
    return () => window.clearInterval(id);
  }, [bullets.length, inView]);

  return (
    <div ref={wrapRef} className={`relative mx-auto w-full ${compact ? "max-w-[352px]" : "max-w-[392px]"}`}>
      <div className="absolute inset-0 -z-10 rounded-[2.8rem] blur-3xl opacity-52 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.26),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(4,173,255,0.20),transparent_60%)] animate-pulse-glow" />
      <Card
        shadow="none"
        radius="none"
        className={`w-full mx-auto ${compact ? "rounded-[2.3rem] p-[5px]" : "rounded-[2.45rem] p-[6px]"} bg-[linear-gradient(150deg,#141722,#2a3040)] animate-floaty will-change-transform transform-gpu md:[transform:perspective(1400px)_rotateY(-6deg)_rotateZ(-2deg)] hover:[transform:perspective(1400px)_rotateY(-3deg)_rotateZ(-1deg)] transition-transform duration-300 ease-out shadow-[0_40px_60px_rgba(0,0,0,0.35)]`}
      >
        <CardBody className={`p-0 ${compact ? "rounded-[2rem]" : "rounded-[2.1rem]"} overflow-hidden bg-[linear-gradient(180deg,#f9fbff,#eef3ff)]`}>
          <div className={`relative ${compact ? "px-4 pt-2.5 pb-2" : "px-5 pt-2.5 pb-2"}`}>
            <div className={`mx-auto ${compact ? "h-5 w-24" : "h-[22px] w-[104px]"} rounded-full bg-black/88`} />
            <div className="mt-2 flex items-center justify-between text-[10px] text-default-500">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <Icon icon="lucide:wifi" width={11} height={11} />
                <Icon icon="lucide:signal" width={11} height={11} />
                <Icon icon="lucide:battery-charging" width={11} height={11} />
              </div>
            </div>
          </div>

          <div className={`px-4 ${compact ? "pb-3.5" : "pb-4"}`}>
            <div className="elite-card rounded-2xl p-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-[30px] w-[30px] rounded-xl grid place-items-center bg-primary text-white">
                    <Icon icon="lucide:wallet-cards" width={14} height={14} />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.08em] text-default-500">ScribeUp inside your app</div>
                    <span className="font-semibold text-[13px] leading-tight">{title}</span>
                  </div>
                </div>
                <Chip size="sm" variant="flat" color="primary">
                  Live
                </Chip>
              </div>
            </div>

            <div className="mt-3 space-y-2.5">
              {bullets.map((b, i) => (
                <div
                  key={b}
                  className={`flex items-center justify-between rounded-xl border p-3 transition-all duration-300 ease-out ${
                    i === active
                      ? "border-primary/40 bg-primary-100/60 shadow-[0_10px_30px_rgba(37,99,235,0.12)]"
                      : "border-default-200/70 bg-white/70"
                  }`}
                  aria-current={i === active ? "true" : "false"}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-xl border text-primary grid place-items-center ${i === active ? "bg-primary text-white border-primary" : "bg-primary-50 border-primary-100"}`}>
                      <Icon icon="lucide:credit-card" width={14} height={14} />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-default-800">{b}</div>
                      <div className="text-[11px] text-default-500">Recurring bill • Detected automatically</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-[10px] font-semibold px-2.5 py-1.5 rounded-lg border border-default-200 bg-white hover:bg-default-100 transition-all duration-200 ease-out"
                  >
                    Manage
                  </button>
                </div>
              ))}
              <div className="sr-only" aria-live="polite">{bullets[active]}</div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-default-200/80 bg-white/80 p-2.5">
                <div className="text-[10px] text-default-500">Detected</div>
                <div className="text-[13px] font-semibold">24 bills</div>
              </div>
              <div className="rounded-xl border border-default-200/80 bg-white/80 p-2.5">
                <div className="text-[10px] text-default-500">Saved</div>
                <div className="text-[13px] font-semibold">$318</div>
              </div>
              <div className="rounded-xl border border-default-200/80 bg-white/80 p-2.5">
                <div className="text-[10px] text-default-500">One-click</div>
                <div className="text-[13px] font-semibold">Ready</div>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-default-500 text-center">
              No redirects. No new app. Native in your banking UX.
            </div>
          </div>
        </CardBody>
      </Card>

      <motion.div
        initial={{ opacity: 0, x: -12, y: 8 }}
        animate={inView ? { opacity: 1, x: 0, y: [0, -4, 0] } : { opacity: 1, x: 0, y: 0 }}
        transition={
          inView
            ? { duration: 1.1, delay: 0.18, ease: [0.16, 1, 0.3, 1], y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }
            : { duration: 0.25 }
        }
        className="pointer-events-none absolute -bottom-4 -left-4 rounded-2xl border border-primary/20 bg-white/70 backdrop-blur px-3 py-1.5 shadow-lg"
      >
        <div className="text-[10px] uppercase tracking-[0.08em] text-default-500">Card primacy lift</div>
        <div className="text-[13px] font-semibold text-default-800">+6 monthly swipes</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 12, y: -8 }}
        animate={inView ? { opacity: 1, x: 0, y: [0, -4, 0] } : { opacity: 1, x: 0, y: 0 }}
        transition={
          inView
            ? { duration: 1.1, delay: 0.32, ease: [0.16, 1, 0.3, 1], y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" } }
            : { duration: 0.25 }
        }
        className="pointer-events-none absolute -top-3 -right-3 rounded-2xl border border-primary/20 bg-white/75 backdrop-blur px-3 py-1.5 shadow-lg"
      >
        <div className="text-[10px] uppercase tracking-[0.08em] text-default-500">Retention impact</div>
        <div className="text-[13px] font-semibold text-default-800">+5% lift</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: [0, -3, 0] } : { opacity: 1, y: 0 }}
        transition={
          inView
            ? { duration: 0.9, delay: 0.44, ease: [0.16, 1, 0.3, 1], y: { duration: 4.6, repeat: Infinity, ease: "easeInOut" } }
            : { duration: 0.25 }
        }
        className="pointer-events-none absolute top-[40%] -right-8 rounded-2xl border border-primary/20 bg-white/70 backdrop-blur px-3 py-1.5 shadow-lg"
      >
        <div className="text-[10px] uppercase tracking-[0.08em] text-default-500">User savings</div>
        <div className="text-[13px] font-semibold text-default-800">$126 avg/mo</div>
      </motion.div>
    </div>
  );
}