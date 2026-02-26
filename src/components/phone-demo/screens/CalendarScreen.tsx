import * as React from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT } from "../../../lib/motion";

const months = [
  { label: "Feb", days: 28 },
  { label: "Mar", days: 31 },
] as const;

export function CalendarScreen({
  monthIdx,
  register,
  autoplayScrollY,
  onOpenNetflix,
}: {
  monthIdx: 0 | 1;
  register: {
    btnNextMonth: (el: HTMLButtonElement | null) => void;
    rowNetflix: (el: HTMLButtonElement | null) => void;
  };
  autoplayScrollY: number;
  onOpenNetflix: () => void;
}) {
  const m = months[monthIdx];
  const hot = new Set<number>(monthIdx === 0 ? [12, 16, 20, 22] : [6, 14, 23, 27]);
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);

  React.useEffect(() => {
    const first = Array.from(hot)[0];
    setSelectedDay(first ?? null);
  }, [monthIdx]);

  const detailByDay = React.useMemo(
    () =>
      ({
        6: { name: "Verizon", price: "$85.00", meta: "Due in 2 days" },
        12: { name: "Netflix", price: "$19.99", meta: "Due in 4 days" },
        14: { name: "Spotify", price: "$9.99", meta: "Due in 5 days" },
        16: { name: "Spotify", price: "$9.99", meta: "Due in 3 days" },
        20: { name: "AT&T", price: "$74.00", meta: "Due in 5 days" },
        22: { name: "Utilities", price: "$62.00", meta: "Due in 7 days" },
        23: { name: "Spotify", price: "$9.99", meta: "Due in 6 days" },
        27: { name: "Insurance", price: "$41.00", meta: "Due in 9 days" },
      } as Record<number, { name: string; price: string; meta: string }>),
    []
  );

  return (
    <div className="h-full px-4 pt-3 pb-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Calendar</div>
          <div className="mt-0.5 text-[13px] font-semibold tracking-[-0.02em] text-[var(--ink)]">
            Due dates + nudges
          </div>
        </div>
        <button
          ref={register.btnNextMonth}
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/78 px-2.5 py-1 text-[10.5px] font-semibold text-slate-700 hover:border-slate-300/70 transition-colors"
        >
          {m.label}
          <Icon icon="lucide:chevron-right" width={14} height={14} className="text-slate-500" />
        </button>
      </div>

      <div className="mt-3 rounded-[18px] border border-slate-200/68 bg-[#f9fbff]/92 overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]">
        <div className="px-4 py-3 border-b border-slate-200/60 flex items-center justify-between">
          <div className="text-[12px] font-semibold text-[var(--ink)]">Upcoming</div>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]" />
            Live
          </span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-slate-500">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d} className="opacity-70">{d}</div>
            ))}
          </div>
          <motion.div
            className="mt-2.5 grid grid-cols-7 gap-1.5"
            key={m.label}
            initial={{ opacity: 0.6, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {Array.from({ length: 28 }).map((_, i) => {
              const day = i + 1;
              const isHot = hot.has(day);
              const isSelected = selectedDay === day;
              return (
                <motion.button
                  type="button"
                  key={day}
                  onClick={() => setSelectedDay(isHot ? day : null)}
                  whileHover={isHot ? { scale: 1.04 } : undefined}
                  animate={isSelected ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`relative h-8 w-8 rounded-full text-center text-[10.5px] leading-8 transition-colors ${
                    isSelected
                      ? "bg-blue-600/12 text-slate-800 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.35),0_0_0_5px_rgba(59,130,246,0.08)] font-semibold"
                      : isHot
                        ? "bg-blue-600/[0.06] text-slate-700"
                        : "text-slate-500 hover:bg-slate-900/[0.03]"
                  }`}
                >
                  {day}
                  {isHot ? (
                    <span className="absolute left-1/2 top-[82%] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-sky-500/75 shadow-[0_0_0_2px_rgba(255,255,255,0.85)]" />
                  ) : null}
                </motion.button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            {selectedDay && detailByDay[selectedDay] ? (
              <motion.div
                key={`${m.label}-${selectedDay}`}
                className="mt-2.5 rounded-[12px] border border-slate-200/70 bg-white px-3 py-2"
                initial={{ opacity: 0, y: -8, height: 0, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, height: "auto", scale: 1 }}
                exit={{ opacity: 0, y: -8, height: 0, scale: 0.99 }}
                transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-[var(--ink)] truncate">{detailByDay[selectedDay].name}</div>
                    <div className="text-[10.5px] text-slate-600 truncate">{detailByDay[selectedDay].meta}</div>
                  </div>
                  <div className="text-[11px] font-semibold font-mono text-slate-700">{detailByDay[selectedDay].price}</div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 rounded-[18px] border border-slate-200/68 bg-[#f9fbff]/92 overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]">
        <div className="px-4 py-3 border-b border-slate-200/60 flex items-center justify-between">
          <div className="text-[12px] font-semibold text-[var(--ink)]">Upcoming bills</div>
          <span className="text-[11px] font-semibold text-slate-600">Tap to act</span>
        </div>
        <div className="relative h-[198px] overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0))] z-10" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-[linear-gradient(0deg,rgba(255,255,255,0.92),rgba(255,255,255,0))] z-10" />
          <motion.div className="px-3 py-2 divide-y divide-slate-200/65" animate={{ y: autoplayScrollY }} transition={{ duration: 0.8, ease: EASE_OUT }}>
            <Row name="Spotify" meta="Due in 3 days" price="$9.99" icon="simple-icons:spotify" tone="text-emerald-600" />
            <Row name="Verizon" meta="Due in 5 days" price="$85.00" icon="simple-icons:verizon" tone="text-red-600" />
            <button
              ref={register.rowNetflix}
              type="button"
              onClick={onOpenNetflix}
              className="w-full text-left px-2 py-2 flex items-center justify-between gap-3 hover:bg-slate-900/[0.03] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="h-7 w-7 rounded-[9px] grid place-items-center border border-slate-200/70 bg-white/80">
                  <Icon icon="simple-icons:netflix" width={14} height={14} className="text-red-600" />
                </span>
                <div className="min-w-0">
                  <div className="text-[11.5px] font-semibold text-[var(--ink)] truncate">Netflix</div>
                  <div className="text-[10.5px] text-slate-600 truncate">Due in 6 days</div>
                </div>
              </div>
              <span className="text-[10.5px] font-semibold text-slate-700 font-mono">
                $19.99
              </span>
            </button>
            <Row name="Utilities" meta="Due in 9 days" price="$62.00" icon="lucide:zap" tone="text-slate-700" />
            <Row name="Insurance" meta="Due in 12 days" price="$41.00" icon="lucide:shield" tone="text-slate-700" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Row({
  name,
  meta,
  price,
  icon,
  tone,
}: {
  name: string;
  meta: string;
  price: string;
  icon: string;
  tone: string;
}) {
  return (
    <div className="px-2 py-2 flex items-center justify-between gap-3 hover:bg-slate-900/[0.03] transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <span className="h-7 w-7 rounded-[9px] grid place-items-center border border-slate-200/70 bg-white/80">
          <Icon icon={icon} width={14} height={14} className={tone} />
        </span>
        <div className="min-w-0">
          <div className="text-[11.5px] font-semibold text-[var(--ink)] truncate">{name}</div>
          <div className="text-[10.5px] text-slate-600 truncate">{meta}</div>
        </div>
      </div>
      <span className="text-[10.5px] font-semibold text-slate-700 font-mono whitespace-nowrap">
        {price}
      </span>
    </div>
  );
}


