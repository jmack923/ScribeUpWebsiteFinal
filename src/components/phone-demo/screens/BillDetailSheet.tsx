import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { EASE_OUT } from "../../../lib/motion";

export function BillDetailSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 z-40 bg-[rgba(2,6,23,0.18)] backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            onClick={onClose}
          />
          <motion.div
            className="absolute left-0 right-0 bottom-0 z-50 px-4 pb-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-[18px] border border-slate-200/70 bg-white/88 backdrop-blur-lg shadow-[0_8px_24px_rgba(2,6,23,0.14)] overflow-hidden">
              <div className="px-3.5 py-2.5 border-b border-slate-200/60 flex items-center justify-between">
                <div className="text-[12px] font-semibold tracking-[-0.01em] text-[var(--ink)]">Netflix</div>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-[30px] w-[30px] rounded-full border border-slate-200/70 bg-white/70 grid place-items-center text-slate-700"
                >
                  <Icon icon="lucide:x" width={16} height={16} />
                </button>
              </div>
              <div className="p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Next charge</div>
                    <div className="mt-1 text-[16px] font-semibold tracking-[-0.04em] text-[var(--ink)] font-mono">
                      $19.99
                    </div>
                    <div className="mt-1 text-[12px] text-slate-600">Renews Feb 20</div>
                  </div>
                  <span className="rounded-full bg-slate-900/5 border border-slate-200/70 px-3 py-1 text-[11px] font-semibold text-slate-700">
                    Embedded
                  </span>
                </div>

                <div className="mt-3.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="rounded-[12px] border border-slate-200/80 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-800"
                  >
                    Move payment method
                  </button>
                  <button
                    type="button"
                    className="rounded-[12px] border border-slate-200/70 bg-white/70 px-3 py-1.5 text-[11px] font-semibold text-slate-700"
                  >
                    Cancel subscription
                  </button>
                </div>

                <div className="mt-3.5 rounded-[12px] border border-slate-200/70 bg-white/70 px-3 py-2 text-[11px] text-slate-600 leading-relaxed">
                  Actions run inside your banking app—no redirects. Instrumented for retention and primacy uplift.
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}


