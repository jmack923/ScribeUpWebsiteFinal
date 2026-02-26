import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useDemoModal } from "../../components/demo-modal-context";
import { motion, useReducedMotion } from "framer-motion";

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  return `${base}${path.replace(/^\//, "")}`;
}

const TEAM = [
  { name: "Jordan Mackler", role: "Co-Founder & CEO", initial: "J", image: "assets/team/jordan-mackler.png" },
  { name: "Yohei Oka", role: "Co-Founder & CTO", initial: "Y", image: "assets/team/yohei-oka.png" },
  { name: "Erica Chiang", role: "Founding Team, CCO", initial: "E", image: "assets/team/erica-chiang.png" },
];

function TeamCard({ person }: { person: (typeof TEAM)[number] }) {
  const [imgFailed, setImgFailed] = React.useState(false);
  const src = withBase(person.image);
  const showImage = !imgFailed;

  return (
    <div className="h-full w-full flex flex-col items-center text-center">
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-60 bg-[radial-gradient(60%_55%_at_50%_45%,rgba(37,99,235,0.16),transparent_70%)]"
        />
        <div className="recessed-well p-2 rounded-[34px] overflow-hidden">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-[26px] overflow-hidden bg-white flex items-center justify-center text-2xl font-semibold text-slate-700 shrink-0 relative shadow-[0_22px_70px_-45px_rgba(2,6,23,0.55)] transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
          {showImage ? (
            <img
              src={src}
              alt={person.name}
              width={144}
              height={144}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onError={() => setImgFailed(true)}
            />
          ) : (
            person.initial
          )}
          </div>
        </div>
      </div>
      <div className="mt-6 text-[9.5px] font-mono uppercase tracking-[0.18em] text-blue-600/70">Core team</div>
      <h3 className="mt-2 text-[16.5px] md:text-[17.5px] font-semibold tracking-[-0.03em] text-[var(--ink)]">{person.name}</h3>
      <p className="mt-1 text-[13px] text-slate-500 font-medium leading-relaxed">{person.role}</p>
    </div>
  );
}

export default function About() {
  const { openDemoModal } = useDemoModal();
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);
  const storyRefs = React.useRef<Array<HTMLElement | null>>([]);
  const [activeStoryIdx, setActiveStoryIdx] = React.useState(0);

  const FEATURED = React.useMemo(
    () => [
      // Keep this list strictly to verified press outlets with real wordmarks.
      { alt: "TechCrunch", src: withBase("assets/press/techcrunch.svg") },
      { alt: "Wall Street Journal", src: withBase("assets/press/wsj.svg") },
      { alt: "Fox Business", src: withBase("assets/press/fox-business.svg") },
    ],
    []
  );

  React.useEffect(() => {
    const nodes = storyRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (!visible.length) return;
        const idx = Number((visible[0].target as HTMLElement).dataset.storyIdx ?? 0);
        setActiveStoryIdx((prev) => (prev === idx ? prev : idx));
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-40% 0px -45% 0px",
      }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(!!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  return (
    <div className="w-full page-shell bg-white">
      {/* Hero */}
      <section className="relative border-b border-slate-200/70 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-[0.03] [mask-image:radial-gradient(60%_65%_at_50%_0%,black,transparent_70%)]" />
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-[0.06]" />
          <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_12%_14%,rgba(239,246,255,0.52),transparent_70%),radial-gradient(40%_30%_at_88%_18%,rgba(239,246,255,0.42),transparent_72%)] opacity-[0.55]" />
        </div>
        <div className="container-page relative pt-[40px] md:pt-[60px] pb-[110px]">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-[920px] mx-auto text-center">
                <motion.h1
                  className="mt-8 text-[40px] md:text-[56px] font-medium tracking-[-0.06em] leading-[1.05] text-balance"
                  initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 0 : 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  Our story
                </motion.h1>

                {/* Spine + marginalia */}
                <div className="relative mt-12">
                  {/* vertical spine */}
                  <div aria-hidden="true" className="hidden md:block absolute top-0 bottom-0 left-2 w-px bg-blue-600/20" />

                  {[
                    {
                      stamp: "EST_2023",
                      lead: "ScribeUp was born from a simple frustration: the hassle of managing unwanted subscription charges.",
                      rest:
                        " As MIT students, we experienced firsthand how easy it was to lose track of recurring payments—streaming, software, memberships. That pain point became a mission to empower people with a smarter way to manage their digital services.",
                    },
                    {
                      stamp: "CURRENT",
                      lead:
                        "Today we give financial institutions an embeddable solution so their customers can track, optimize, and save on subscriptions and bills.",
                      rest:
                        " Banks and fintechs use ScribeUp to boost engagement, drive loyalty, and unlock new revenue—with a seamless, intuitive experience.",
                    },
                  ].map((p, idx) => (
                    <div key={p.stamp} className={`relative pl-0 md:pl-10 ${idx === 0 ? "" : "mt-12 md:mt-14"}`}>
                      {/* node */}
                      <div
                        aria-hidden="true"
                        className="hidden md:block absolute left-2 top-[12px] h-[8px] w-[8px] -translate-x-1/2 border border-blue-600/55 bg-transparent rounded-[2px] shadow-[1px_1px_0_rgba(37,99,235,0.35)]"
                      />

                      <div
                        ref={(el) => {
                          storyRefs.current[idx] = el;
                        }}
                        data-story-idx={idx}
                        className={`flex flex-col gap-4 ${
                          activeStoryIdx === idx ? "opacity-100" : "opacity-100 md:opacity-40"
                        } transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeStoryIdx === idx ? "translate-x-0" : "translate-x-0 md:translate-x-[-2px]"}`}
                      >
                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                          <p
                            className="text-slate-700 text-[15px] md:text-[16px] leading-[1.6] font-normal"
                            style={{ textWrap: "balance" as any }}
                          >
                            <span className="text-[16px] md:text-[17px] font-normal tracking-[-0.01em] text-slate-800">
                              {p.lead}
                            </span>
                            {p.rest}
                          </p>
                        </div>

                        {/* scan-line reveal accent */}
                        <div
                          aria-hidden="true"
                          className={`h-px bg-blue-600/25 origin-left transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            activeStoryIdx === idx ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <Button
                    color="primary"
                    className="nav-btn-base btn-s-tier btn-s-tier-primary btn-arrow-lead !h-[36px] !px-8 text-[13px] font-semibold"
                    endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                    startContent={<Icon icon="lucide:calendar" width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                    onClick={openDemoModal}
                  >
                    Book a demo
                  </Button>
                </div>
            </div>
          </div>
        </div>
        <div className="container-page">
          <div aria-hidden="true" className="mt-3 md:mt-4 hero-sep" />
        </div>
      </section>

      {/* Our Team */}
      <section id="team" className="relative pt-[var(--section-padding)] pb-[60px] bg-white overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_16%,rgba(30,162,255,0.03),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(37,99,235,0.028),transparent_70%)]"
        />
        <div className="container-page relative z-10">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[640px] text-center"
          >
            <h2 className="mt-0 section-title mx-auto">
              The Team Behind ScribeUp
            </h2>
            <motion.div
              aria-hidden="true"
              className="mt-7 h-px w-full max-w-[520px] mx-auto bg-slate-200/80 origin-center"
              initial={reducedMotion ? false : { opacity: 0, scaleX: 0.94 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.58, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
          <motion.div
            className="mt-6 mx-auto w-full max-w-[980px]"
            initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.995 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-[28px] bg-[#E2E8F0] p-px overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E2E8F0]">
                {TEAM.map((person, idx) => (
                  <motion.div
                    key={person.name}
                    className="group relative bg-white p-7 md:p-8 min-h-[300px] flex items-center justify-center transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-slate-50"
                    initial={reducedMotion ? false : { opacity: 0, y: 14, x: idx % 2 === 0 ? -8 : 8 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.04 }}
                  >
                    <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/40 opacity-55 group-hover:opacity-90 transition-opacity duration-300" />
                    <TeamCard person={person} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Backed by */}
      <section id="partners" className="relative pt-[60px] pb-[var(--section-padding)] bg-white overflow-hidden border-t border-slate-200/60">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_16%,rgba(37,99,235,0.028),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(30,162,255,0.02),transparent_70%)]"
        />
        <div className="container-page relative z-10">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[640px] text-center"
          >
            <h2 className="mt-0 section-title mx-auto">
              Backed by
            </h2>
            <motion.div
              aria-hidden="true"
              className="mt-7 h-px w-full max-w-[520px] mx-auto bg-slate-200/80 origin-center"
              initial={reducedMotion ? false : { opacity: 0, scaleX: 0.94 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.58, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
          <motion.div
            className="mt-16 mx-auto w-full max-w-[980px]"
            initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.995 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-[28px] bg-[#E2E8F0] p-px overflow-hidden">
              <div className="grid gap-px bg-[#E2E8F0]">
                {/* Backers */}
                <div className="relative bg-white px-6 md:px-8 py-6">
                  <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/45" />
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-[12px] uppercase tracking-[0.15em] font-medium text-slate-500">Backed by</div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      {["MIT", "Mucker", "MassChallenge"].map((name) => (
                        <motion.span
                          key={name}
                          className="inline-flex items-center h-9 px-4 rounded-full border border-slate-200/70 bg-white text-[11px] font-medium uppercase tracking-[0.15em] text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Platform partners */}
                <div className="bg-white px-6 md:px-8 py-7">
                  <p className="wayfinder inline-flex">Platform partners</p>

                  <div className="mt-6 rounded-[24px] bg-slate-200/70 p-px overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-slate-200/70">
                      {[
                        { name: "Q2", src: withBase("assets/partners/q2.svg") },
                        { name: "Alkami", src: withBase("assets/partners/alkami.svg") },
                        { name: "Lumin", src: withBase("assets/partners/lumin.svg") },
                        { name: "Banno", src: withBase("assets/partners/banno.svg") },
                        { name: "Candescent", src: withBase("assets/partners/candescent.svg") },
                      ].map((p, idx) => {
                        const active = idx === 0;
                        return (
                          <motion.div
                            key={p.name}
                            className={`group relative bg-white px-5 py-4.5 md:py-5 flex items-center justify-center transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              active ? "bg-slate-50/80" : "hover:bg-slate-50/60"
                            }`}
                            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.65 }}
                            transition={reducedMotion ? undefined : { duration: 0.45, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div aria-hidden="true" className={`absolute top-0 left-0 right-0 h-[2px] ${active ? "bg-[#2563EB]/22" : "bg-transparent"}`} />
                            <img
                              src={p.src}
                              alt={p.name}
                              width={180}
                              height={40}
                              className={`relative z-10 h-[16px] md:h-[18px] w-auto max-w-[112px] object-contain object-center transition-[opacity,filter] duration-300 ${
                                active ? "opacity-90 grayscale-0" : "opacity-70 grayscale group-hover:opacity-90 group-hover:grayscale-0"
                              }`}
                              loading="lazy"
                              decoding="async"
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Featured in (consolidated directly under partners) */}
                <div className="bg-white px-6 md:px-8 py-7 border-t border-[#F0F0F0]">
                  <div className="text-[12px] uppercase tracking-[0.15em] font-medium text-slate-500">Featured in</div>
                  <div className="mt-6 rounded-[24px] bg-slate-200/70 p-px overflow-hidden">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-slate-200/70">
                      {FEATURED.map((p, idx) => {
                        const active = idx === 0;
                        return (
                          <motion.div
                            key={p.alt}
                            className={`group relative bg-white px-6 py-6 md:px-8 md:py-7 flex items-center justify-center transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              active ? "bg-slate-50/80" : "hover:bg-slate-50/60"
                            }`}
                            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.65 }}
                            transition={reducedMotion ? undefined : { duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div
                              aria-hidden="true"
                              className={`absolute top-0 left-0 right-0 h-[2px] ${active ? "bg-[#2563EB]/22" : "bg-transparent"}`}
                            />
                            <img
                              src={p.src}
                              alt={p.alt}
                              width={220}
                              height={48}
                              className={`relative z-10 h-[14px] md:h-[16px] w-auto ${
                                p.alt === "Wall Street Journal" ? "max-w-[92px] md:max-w-[104px]" : "max-w-[112px] md:max-w-[128px]"
                              } object-contain object-center transition-opacity duration-300 ${
                                active ? "opacity-90" : "opacity-80 group-hover:opacity-90"
                              }`}
                              loading="lazy"
                              decoding="async"
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
