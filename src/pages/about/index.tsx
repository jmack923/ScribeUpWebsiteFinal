import React from "react";
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
    <div className="flex flex-col items-center text-center">
      <div
        className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-[28px] overflow-hidden bg-slate-100 flex items-center justify-center text-2xl font-semibold text-slate-600 shrink-0 ring-1 ring-slate-200/60 shadow-[0_28px_72px_-28px_rgba(2,6,23,0.18)]"
      >
        {showImage ? (
          <img
            src={src}
            alt={person.name}
            width={240}
            height={240}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          person.initial
        )}
      </div>
      <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Founding team</div>
      <h3 className="mt-2 text-[17px] md:text-[19px] font-semibold tracking-[-0.03em] text-[var(--ink)]">{person.name}</h3>
      <p className="mt-1 text-[13.5px] text-slate-500 font-medium leading-relaxed">{person.role}</p>
    </div>
  );
}

const FEATURED = [
  { alt: "TechCrunch", src: "assets/about/techcrunch.png" },
  { alt: "Wall Street Journal", src: "assets/about/wsj.png" },
  { alt: "Fox Business", src: "assets/about/fox-business.png" },
];

export default function About() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="w-full page-shell bg-white">
      {/* Hero - Our Story */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-[0.03] [mask-image:radial-gradient(60%_65%_at_50%_0%,black,transparent_70%)]" />
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-[0.05]" />
        </div>
        <div className="container-page page-hero-pad relative pt-[48px] md:pt-[72px] pb-[72px] md:pb-[96px]">
          <div className="mx-auto w-full max-w-[680px]">
            <motion.h1
              className="text-[28px] sm:text-[34px] md:text-[40px] font-semibold tracking-[-0.05em] leading-[1.1] text-[var(--ink)]"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Our story
            </motion.h1>

            <motion.div
              className="mt-12 space-y-6"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[15px] md:text-[16px] text-slate-700 leading-[1.75]">
                ScribeUp was born from a simple frustration: the hassle of managing unwanted subscription charges. As MIT students, we experienced firsthand how easy it was to lose track of recurring payments—streaming, software, memberships. That pain point became a mission to empower people with a smarter way to manage their digital services.
              </p>
              <p className="text-[15px] md:text-[16px] text-slate-700 leading-[1.75]">
                Today we give financial institutions an embeddable solution so their customers can track, optimize, and save on subscriptions and bills. Banks and fintechs use ScribeUp to boost engagement, drive loyalty, and unlock new revenue—with a seamless, intuitive experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="team" className="relative py-20 md:py-28 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_16%,rgba(30,162,255,0.025),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(37,99,235,0.02),transparent_70%)]"
        />
        <div className="container-page relative z-10">
          <motion.h2
            className="text-left text-[22px] md:text-[26px] font-semibold tracking-[-0.04em] text-[var(--ink)]"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Who We Are
          </motion.h2>
          <motion.div
            className="mt-16 mx-auto w-full max-w-[960px]"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-10 lg:gap-14">
              {TEAM.map((person, idx) => (
                <motion.div
                  key={person.name}
                  className="flex flex-col items-center"
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                >
                  <TeamCard person={person} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credibility: Started out of • Backed by • Featured in */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(248,250,252,0.9),transparent_70%)]" />
        <div className="container-page relative z-10">
          <div className="mx-auto max-w-[1100px]">
            <div className="rounded-[28px] border border-slate-200/80 bg-white shadow-[0_0_0_4px_#F8FAFC,0_18px_54px_-24px_rgba(2,6,23,0.08)] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/70">
                {/* Started out of MIT */}
                <motion.div
                  className="p-8 sm:p-10 md:p-12 flex flex-col items-center justify-start md:min-h-[220px] min-h-[180px]"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 w-full text-center">Started out of</p>
                  <div className="mt-6 flex items-center justify-center min-h-[56px] md:min-h-[64px]">
                    <img
                      src={withBase("assets/about/mit.png")}
                      alt="MIT - Massachusetts Institute of Technology"
                      className="h-[48px] sm:h-[56px] md:h-[64px] w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </motion.div>

                {/* Backed by */}
                <motion.div
                  id="backed"
                  className="p-8 sm:p-10 md:p-12 flex flex-col items-center justify-start md:min-h-[220px] min-h-[160px]"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 w-full text-center">Backed by</p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 gap-y-6">
                    <img
                      src={withBase("assets/about/mucker-capital.png")}
                      alt="Mucker Capital"
                      className="h-[32px] sm:h-[40px] md:h-[44px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    <img
                      src={withBase("assets/about/service-ventures.png")}
                      alt="Service Ventures"
                      className="h-[32px] sm:h-[40px] md:h-[44px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  </div>
                </motion.div>

                {/* Featured in */}
                <motion.div
                  id="featured"
                  className="p-8 sm:p-10 md:p-12 flex flex-col items-center justify-start bg-slate-50/40 md:min-h-[220px] min-h-[160px]"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 w-full text-center">Featured in</p>
                  <div className="mt-6 flex-1 flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 gap-y-6">
                    {FEATURED.map((p) => (
                      <div key={p.alt} className="flex items-center justify-center">
                        <img
                          src={withBase(p.src)}
                          alt={p.alt}
                          className="h-[28px] sm:h-[34px] md:h-[40px] w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
