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
  { alt: "TechCrunch", src: "assets/about/techcrunch-latest.png" },
  { alt: "Wall Street Journal", src: "assets/about/wsj-latest.png" },
  { alt: "Fox Business", src: "assets/about/fox-business.png" },
];

export default function About() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="w-full page-shell bg-white">
      {/* Hero - Our Story */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-[0.03] [mask-image:radial-gradient(60%_65%_at_50%_0%,black,transparent_70%)]" />
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-[0.05]" />
        </div>
        <div className="container-page relative z-10">
          <div className="w-full max-w-[960px]">
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
              <p className="text-[15px] md:text-[16px] text-slate-700 leading-[1.75] max-w-[72ch]">
                Subscriptions were supposed to make life easier. And they have. But at the user level, they also became fragmented, hard to track, and surprisingly expensive. Free trials convert. Intro pricing expires. Charges hide in statements and inboxes.
              </p>
              <p className="text-[15px] md:text-[16px] text-slate-700 leading-[1.75] max-w-[72ch]">
                The real problem is not the services. It is the lack of visibility and control from our financial tools.
              </p>
              <p className="text-[15px] md:text-[16px] text-slate-700 leading-[1.75] max-w-[72ch]">
                Modern life runs on recurring payments, yet our payment forms were not built for a world of payment-on-file and autopay.
              </p>
              <p className="text-[15px] md:text-[16px] text-slate-700 leading-[1.75] max-w-[72ch]">
                We started ScribeUp to fix that.
              </p>
              <p className="text-[15px] md:text-[16px] text-slate-700 leading-[1.75] max-w-[72ch]">
                ScribeUp brings clarity to recurring spending, makes control effortless, and helps people avoid overpaying, delivered directly through the financial partners you already trust.
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
            className="text-left text-[28px] sm:text-[34px] md:text-[40px] font-semibold tracking-[-0.05em] leading-[1.1] text-[var(--ink)]"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Who We Are
          </motion.h2>
          <motion.div
            className="mt-12 mx-auto w-full max-w-[960px]"
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
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(248,250,252,0.9),transparent_70%)]" />
        <div className="container-page relative z-10">
          <div className="mx-auto max-w-[1100px]">
            <div className="rounded-[28px] border border-slate-200/80 bg-white shadow-[0_0_0_4px_#F8FAFC,0_18px_54px_-24px_rgba(2,6,23,0.08)] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/70">
                {/* Started out of MIT */}
                <motion.div
                  className="p-6 sm:p-8 md:p-9 grid grid-rows-[auto_1fr] items-stretch md:min-h-[190px] min-h-[165px]"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 w-full text-center min-h-[16px]">Started out of</p>
                  <div className="mt-5 flex items-center justify-center min-h-[88px]">
                    <div className="w-full max-w-[250px] h-[78px] rounded-[14px] bg-[#F8FAFC] border border-slate-200/70 px-4 flex items-center justify-center">
                      <img
                        src={withBase("assets/about/mit.png")}
                        alt="MIT - Massachusetts Institute of Technology"
                        className="h-[44px] sm:h-[50px] md:h-[56px] w-auto max-w-full object-contain object-center"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Backed by */}
                <motion.div
                  id="backed"
                  className="p-6 sm:p-8 md:p-9 grid grid-rows-[auto_1fr] items-stretch md:min-h-[190px] min-h-[165px]"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 w-full text-center min-h-[16px]">Backed by</p>
                  <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:gap-3.5 min-h-[88px] w-full">
                    <div className="w-full max-w-[236px] h-[60px] rounded-[12px] bg-[#F8FAFC] border border-slate-200/70 px-3.5 flex items-center justify-center">
                      <img
                        src={withBase("assets/about/mucker-capital.png")}
                        alt="Mucker Capital"
                        className="h-[29px] sm:h-[32px] md:h-[36px] w-auto max-w-full object-contain object-center opacity-95"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-full max-w-[236px] h-[60px] rounded-[12px] bg-[#F8FAFC] border border-slate-200/70 px-3.5 flex items-center justify-center">
                      <img
                        src={withBase("assets/about/service-ventures.png")}
                        alt="Service Ventures"
                        className="h-[29px] sm:h-[32px] md:h-[36px] w-auto max-w-full object-contain object-center opacity-95"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Featured in */}
                <motion.div
                  id="featured"
                  className="p-6 sm:p-8 md:p-9 grid grid-rows-[auto_1fr] items-stretch bg-slate-50/40 md:min-h-[190px] min-h-[165px]"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 w-full text-center min-h-[16px]">Featured in</p>
                  <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:gap-3.5 min-h-[88px] w-full">
                    {FEATURED.map((p) => (
                      <div key={p.alt} className="w-full max-w-[236px] h-[60px] rounded-[12px] bg-[#F8FAFC] border border-slate-200/70 px-2.5 flex items-center justify-center">
                        <img
                          src={withBase(p.src)}
                          alt={p.alt}
                          className={`w-auto object-contain object-center opacity-95 ${
                            p.alt === "TechCrunch"
                              ? "h-[42px] sm:h-[44px]"
                              : p.alt === "Wall Street Journal"
                                ? "h-[36px] sm:h-[38px]"
                                : "h-[38px] sm:h-[40px]"
                          }`}
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
