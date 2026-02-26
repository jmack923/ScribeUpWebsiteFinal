import React from "react";
import { Icon } from "@iconify/react";

type PlatformPillar = {
  title: "Find" | "Track" | "Manage";
  points: string[];
  icon: string;
};

function toneFor(kind: PlatformPillar["title"]) {
  // Calmer, bank-grade accents (avoid loud “template blue” washes).
  if (kind === "Track") return { glow: "from-sky-500/10 via-blue-600/6 to-transparent", border: "border-slate-200/70", chip: "bg-sky-500/8 border-sky-600/14 text-slate-700" };
  if (kind === "Manage") return { glow: "from-slate-900/6 via-blue-600/5 to-transparent", border: "border-slate-200/70", chip: "bg-slate-900/5 border-slate-200/70 text-slate-700" };
  // Find (remove indigo/purple; keep it engineered + neutral)
  return { glow: "from-sky-500/8 via-slate-900/4 to-transparent", border: "border-slate-200/70", chip: "bg-sky-500/6 border-sky-600/12 text-slate-700" };
}

function MiniGraphic({ kind }: { kind: PlatformPillar["title"] }) {
  if (kind === "Find") {
    return (
      <div className="relative w-full h-full rounded-2xl bg-white/70 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(30,162,255,0.10),transparent_60%)] opacity-60" />
        <div className="relative px-2.5 py-2">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Detected</div>
            <div className="font-mono text-[10px] tracking-[0.10em] text-slate-500">RECURRENCE</div>
          </div>
          <div className="mt-1.5 divide-y divide-slate-200/65">
            {[
              ["simple-icons:spotify", "Spotify", "$9.99", "monthly"],
              ["simple-icons:netflix", "Netflix", "$19.99", "monthly"],
            ].map(([ic, name, amt, freq]) => (
              <div key={name} className="h-12 flex items-center justify-between gap-2 px-1.5">
                <span className="inline-flex items-center gap-2 min-w-0">
                  <span className="h-7 w-7 rounded-[10px] bg-white/86 border border-slate-200/70 grid place-items-center">
                    <Icon icon={String(ic)} width={12} height={12} className="text-slate-700/90" />
                  </span>
                  <span className="text-[11.5px] font-semibold text-[var(--ink)] truncate">{name}</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">
                  <span className="font-mono text-[var(--ink)]">{amt}</span>{" "}
                  <span className="text-slate-500 font-medium">{freq}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "Track") {
    return (
      <div className="relative w-full h-full rounded-2xl bg-white/72 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_0%,rgba(37,99,235,0.10),transparent_60%)] opacity-65" />
        <div className="relative px-2.5 py-2">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Calendar</div>
            <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
              Sync on
            </div>
          </div>
          <div className="mt-1.5 relative">
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d} className="opacity-65">{d}</div>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {Array.from({ length: 14 }).map((_, i) => {
                const day = i + 11;
                const hot = day === 12 || day === 16 || day === 22;
                return (
                  <div
                    key={day}
                    className={`relative h-5 w-5 rounded-full text-center text-[10px] leading-5 ${
                      hot ? "bg-blue-600/12 text-slate-700 font-semibold shadow-[inset_0_0_0_1px_rgba(59,130,246,0.32)]" : "text-slate-500"
                    }`}
                  >
                    {day}
                    {hot ? (
                      <span className="absolute left-1/2 top-[86%] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-sky-500/75 shadow-[0_0_0_2px_rgba(255,255,255,0.82)]" />
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* Keep Track graphic calendar-centric (no floating brand chip hanging outside the card). */}
          </div>
        </div>
      </div>
    );
  }

  // Manage
  return (
    <div className="relative w-full h-full rounded-2xl bg-white/72 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(15,25,45,0.06),transparent_60%)] opacity-70" />
      <div className="relative px-2.5 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Updater</div>
          <span className="font-mono text-[10px] tracking-[0.10em] text-slate-500">PAYMENT_ON_FILE</span>
        </div>
        <div className="mt-1.5 grid grid-cols-2 gap-1.5">
          {[
            ["simple-icons:visa", "Primary"],
            ["simple-icons:mastercard", "Backup"],
          ].map(([ic, label]) => (
            <div key={label} className="rounded-xl border border-slate-200/70 bg-white/82 px-2 py-1.5 flex items-center gap-2 shadow-[0_1px_2px_rgba(2,6,23,0.04),inset_0_1px_0_rgba(255,255,255,0.74)]">
              <span className="h-6 w-6 rounded-xl bg-white/82 border border-slate-200/70 grid place-items-center">
                <Icon icon={String(ic)} width={12} height={12} className="text-slate-800" />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-[var(--ink)] leading-tight">{label}</div>
                <div className="text-[10px] text-slate-600 font-mono truncate">•••• 3812</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-1.5 inline-flex items-center gap-2 rounded-full border border-blue-600/18 bg-blue-600/8 px-2.5 py-1 text-[10.5px] font-semibold text-slate-700">
          <Icon icon="lucide:mouse-pointer-click" width={13} height={13} />
          Run update
        </div>
      </div>
    </div>
  );
}

export function PlatformStack({
  pillars,
  variant = "grid",
}: {
  pillars: PlatformPillar[];
  variant?: "grid" | "stack";
}) {
  const spec = ["SOC 2", "PCI-ready", "SDK + API"];
  const chipsFor = (_t: PlatformPillar["title"]) => [] as string[];

  const metaFor = (t: PlatformPillar["title"]) => {
    if (t === "Find") {
      return {
        kicker: "Platform capability · Discovery",
        endpoint: "POST /recurrence/detect",
      };
    }
    if (t === "Track") {
      return {
        kicker: "Platform capability · Proactive",
        endpoint: "POST /alerts/schedule",
      };
    }
    return {
      kicker: "Platform capability · Control",
      endpoint: "POST /actions/cancel",
    };
  };

  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  if (variant === "stack") {
    return (
      <div data-reveal-item className="relative">
        <div className="flex flex-wrap gap-2 mb-3">
          {spec.map((s) => (
            <span key={s} className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">
              {s}
            </span>
          ))}
        </div>

        <div className={`capability-stack ${hoveredIdx != null ? "is-hovering" : ""}`}>
          {pillars.slice(0, 3).map((p, idx) => {
            const meta = metaFor(p.title);
            const tone = toneFor(p.title);
            const isActive = p.title === "Track";
            return (
              <div
                key={p.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={[
                  "capability-card relative overflow-hidden rounded-2xl border",
                  "border-[rgba(15,25,45,0.08)] backdrop-blur-[4px]",
                  idx === 1
                    ? "bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F9FC_100%)]"
                    : idx === 0
                      ? "bg-[linear-gradient(180deg,#FFFFFF_0%,#F9FAFB_100%)]"
                      : "bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F7FA_100%)]",
                  isActive
                    ? "shadow-[0_20px_60px_-20px_rgba(15,23,42,.25),0_60px_120px_-40px_rgba(15,23,42,.25)]"
                    : "shadow-[0_10px_30px_-15px_rgba(15,23,42,.15)]",
                  hoveredIdx === idx ? "is-active" : "",
                  hoveredIdx != null && hoveredIdx !== idx ? "is-dim" : "",
                ].join(" ")}
              >
                {/* Calmer accent wash */}
                <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.glow} opacity-30 z-0`} />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.04] [mask-image:radial-gradient(55%_60%_at_50%_10%,black,transparent_78%)] z-0" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/55 z-[1]" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-4 top-4 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)] opacity-70 z-[1]"
                />

                {/* Keep background clean; brand marks live in the header + mini-graphic */}

                <div className="relative z-[2] flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`h-9 w-9 rounded-xl grid place-items-center text-slate-800 shrink-0 border ${tone.border} bg-white/70`}>
                      <Icon icon={p.icon} width={16} height={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500/70">
                        {meta.kicker}
                      </div>
                      <div className={`mt-1 text-[14px] font-semibold tracking-[-0.01em] text-[var(--ink)] ${isActive ? "" : ""}`}>
                        {p.title}
                      </div>
                    </div>
                  </div>
                  <span className="spec-chip !px-2 !py-0.5 !text-[10px] normal-case tracking-[0.02em] font-semibold text-slate-600">
                    {p.title === "Find" ? "Discovery" : p.title === "Track" ? "Proactive" : "Control"}
                  </span>
                </div>

                <div className="relative z-[2] mt-3.5">
                  <div className={`rounded-2xl border ${tone.border} bg-white/76 p-2 shadow-[0_1px_2px_rgba(15,25,45,0.035)]`}>
                    <div className="h-[78px] w-full">
                      <MiniGraphic kind={p.title} />
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon icon="lucide:badge-check" width={13} height={13} className="text-slate-500" />
                        In‑app UI
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.10em] text-slate-500">
                        {p.title === "Find" ? "DETECT" : p.title === "Track" ? "SCHEDULE" : "UPDATE"}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="/solution"
                  className="relative z-[2] mt-3.5 inline-flex items-center gap-2 text-[12.5px] font-extrabold text-slate-800/90 hover:text-[var(--ink)] transition-colors"
                >
                  Explore {p.title} <span aria-hidden>→</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div data-reveal-item className="relative">
      <div className="flex flex-wrap gap-2 mb-3">
        {spec.map((s) => (
          <span key={s} className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">
            {s}
          </span>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
        {pillars.map((p) => {
          const meta = metaFor(p.title);
          const tone = toneFor(p.title);
          return (
            <div
              key={p.title}
              className="group elite-card rounded-2xl p-5 elite-interactive hover:elite-interactive-hover min-h-[286px] relative overflow-hidden"
            >
              <div aria-hidden="true" className={`pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(37,99,235,0.15),transparent_62%)] blur-[16px] opacity-70`} />
              <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.glow} opacity-70`} />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`h-10 w-10 rounded-[14px] grid place-items-center text-slate-800 shrink-0 border ${tone.border} bg-white/65`}>
                    <Icon icon={p.icon} width={17} height={17} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 truncate">
                      {meta.kicker}
                    </div>
                      <div className="mt-1 text-[15px] font-extrabold tracking-[-0.02em] text-[var(--ink)]">
                      {p.title}
                    </div>
                  </div>
                </div>
                {/* Removed “Enrichment/Nudges/Actions” pills (felt like overlays). */}
              </div>

              <div className="mt-4 grid grid-cols-[1fr_132px] gap-4 items-start">
                <div>
                  <div className="rounded-[14px] bg-slate-900/5 border border-slate-200/70 px-4 py-3 font-mono text-[12px] text-slate-700">
                    <span className="inline-flex mr-2 rounded-full bg-blue-600/10 border border-blue-600/20 px-2 py-0.5 text-[11px] font-extrabold text-slate-700">
                      POST
                    </span>
                    {meta.endpoint.replace("POST ", "")}
                  </div>

                  <ul className="mt-4 space-y-2 text-slate-700/85 list-disc pl-5 text-sm">
                    {p.points.slice(0, 2).map((pt) => (
                      <li key={pt} className="leading-relaxed">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`rounded-2xl border ${tone.border} bg-white/72 p-2 shadow-[0_1px_2px_rgba(2,6,23,0.04)] self-start`}>
                  <div className="h-[56px] w-full">
                    <MiniGraphic kind={p.title} />
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-slate-500 text-center">
                    UI preview
                  </div>
                </div>
              </div>

              <a
                href="/solution"
                className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-slate-800 hover:text-[var(--ink)] transition-colors"
              >
                Explore {p.title} <span aria-hidden>→</span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}


