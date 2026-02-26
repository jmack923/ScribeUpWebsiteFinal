import * as React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { EASE_OUT } from "../../../lib/motion";

export function DashboardScreen({
  register,
  onOpenNetflix,
  autoplayScrollY,
}: {
  register: {
    rowNetflix: (el: HTMLButtonElement | null) => void;
  };
  onOpenNetflix: () => void;
  autoplayScrollY: number;
}) {
  return (
    <div className="h-full px-4 pt-3 pb-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Overview</div>
          <div className="mt-0.5 text-[13px] font-semibold tracking-[-0.02em] text-[var(--ink)]">
            Upcoming bills
          </div>
        </div>
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]" />
          Sync on
        </span>
      </div>

      <div className="mt-3 rounded-[18px] border border-slate-200/68 bg-[#f9fbff]/92 overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]">
        <div className="px-4 py-3 border-b border-slate-200/60 flex items-center justify-between">
          <div className="text-[12px] font-semibold text-[var(--ink)]">Calendar</div>
          <span className="rounded-full bg-slate-900/5 border border-slate-200/70 px-2 py-1 text-[10.5px] font-semibold text-slate-700">
            Feb
          </span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-slate-500">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d} className="opacity-70">{d}</div>
            ))}
          </div>
          <div className="mt-2.5 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 21 }).map((_, i) => {
              const day = i + 7;
              const hot = day === 12 || day === 16 || day === 20;
              return (
                <div
                  key={day}
                className={`relative h-7 rounded-full border text-center text-[10px] leading-7 ${
                    hot ? "border-blue-600/18 bg-blue-600/8 text-slate-700 font-semibold" : "border-slate-200/70 bg-white/70 text-slate-500"
                  }`}
                >
                  {day}
                  {hot ? (
                    <span className="absolute right-[5px] top-[8px] h-[5px] w-[5px] rounded-full bg-sky-500/70 shadow-[0_0_0_2px_rgba(255,255,255,0.82)]" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* masked “scrollable” region (autoplay uses translateY; user stays static) */}
      <div className="mt-3 rounded-[18px] border border-slate-200/68 bg-[#f9fbff]/92 overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]">
        <div className="px-4 py-3 border-b border-slate-200/60 flex items-center justify-between">
          <div className="text-[12px] font-semibold text-[var(--ink)]">Bills</div>
          <span className="text-[11px] font-semibold text-slate-600">Next 14 days</span>
        </div>
        <div className="relative h-[156px] overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0))] z-10" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-[linear-gradient(0deg,rgba(255,255,255,0.92),rgba(255,255,255,0))] z-10" />
          <motion.div
            className="px-3 py-2 divide-y divide-slate-200/65"
            animate={{ y: autoplayScrollY }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <BillRow name="Spotify" meta="Renews in 3 days" price="$9.99" icon="simple-icons:spotify" tone="text-emerald-600" />
            <BillRow name="AT&T" meta="Renews in 4 days" price="$85.00" icon="simple-icons:atandt" tone="text-sky-600" />
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
                  <div className="text-[10.5px] text-slate-600 truncate">Renews Feb 20</div>
                </div>
              </div>
              <span className="text-[10.5px] font-semibold text-slate-700 font-mono">
                $19.99
              </span>
            </button>
            <BillRow name="Utilities" meta="Renews in 9 days" price="$62.00" icon="lucide:zap" tone="text-slate-700" />
            <BillRow name="Insurance" meta="Renews in 12 days" price="$41.00" icon="lucide:shield" tone="text-slate-700" />
          </motion.div>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[10.5px] text-slate-600">
        <span className="inline-flex items-center gap-2">
          <Icon icon="lucide:lock" width={14} height={14} className="text-slate-400" />
          Embedded inside your app
        </span>
        <span className="font-mono text-[9.5px] tracking-[0.10em] text-slate-500">CAL_SYNC</span>
      </div>
    </div>
  );
}

function BillRow({
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


