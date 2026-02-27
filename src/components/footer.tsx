import React from "react";
import { Link, Button } from "@heroui/react";
import { Link as RouteLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import logoHorizontal from "../../Logo/horizontal-white-text.svg";
import logoMark from "../../Logo/LOGOjustlogosquare-color.svg";
import { useDemoModal } from "./demo-modal-context";

export function SiteFooter() {
  const { pathname } = useLocation();
  const { openDemoModal } = useDemoModal();
  const footerTopMarginClass = pathname.startsWith("/who-we-serve/") ? "mt-0" : "mt-[120px]";

  const handshake = {
    kicker: "",
    title: "Explore what bill management could look like in your app",
    sub: "Minimal lift. Maximum user value. Clear ROI.",
    ctaLabel: "Schedule a Demo",
    ctaKind: "demo" as const,
  };

  return (
    <footer className={`${footerTopMarginClass} relative overflow-hidden bg-[#0A101C] border-t border-white/12`}>
      {/* subtle bevel at top edge (kept extremely quiet) */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-white/12" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.50] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.075),transparent_70%)]"
      />

      {/* watermark (icon mark) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-28 w-[560px] h-[560px] opacity-[0.018] bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${logoMark})` }}
      />

      {/* Pre-footer (static bridge; never overlaps content) */}
      <div className="relative border-b border-white/10">
        <div className="container-page">
          <div className="mx-auto w-full max-w-[1200px] px-0 md:px-10 py-10 md:py-16">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] px-6 md:px-8 py-7 md:py-9 relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.55] bg-[radial-gradient(70%_60%_at_50%_0%,rgba(255,255,255,0.08),transparent_62%)]"
              />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="min-w-0 w-full text-center md:text-left">
                {handshake.kicker ? (
                  <div className="text-[10px] font-mono uppercase tracking-[0.20em] text-slate-300/85 font-semibold">
                    {handshake.kicker}
                  </div>
                ) : null}
                <h3 className="text-[20px] md:text-[22px] font-semibold tracking-[-0.04em] text-slate-50 leading-[1.12]">
                  {handshake.title}
                </h3>
                <div className="mt-3 text-[14px] text-slate-200/85 leading-[1.65] max-w-[66ch]">
                  {handshake.sub}
                </div>
                </div>

                <div className="shrink-0 relative w-full md:w-auto md:self-auto">
                <Button
                  variant="flat"
                  color="default"
                  className="nav-btn-base nav-btn-primary btn-sheen btn-arrow-lead !w-full md:!w-auto !h-[52px] md:!h-[40px] !px-6 text-[12.5px] font-semibold whitespace-nowrap !rounded-[12px]"
                  endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                  onClick={openDemoModal}
                >
                  {handshake.ctaLabel}
                </Button>
                </div>
            </div>
          </div>
            </div>
        </div>
      </div>

      <div className="container-page relative pb-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Footer link grid */}
          <div className="pt-12 md:pt-16 px-0 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-[1.15fr_1.0fr_1.0fr_1.0fr] gap-6 md:gap-x-16 md:gap-y-12 items-start text-left">
              <div className="col-span-2 md:col-span-1">
                <RouteLink to="/" aria-label="Go to homepage" className="inline-flex">
                  <img
                    src={logoHorizontal}
                    alt="ScribeUp"
                    width={160}
                    height={32}
                    className="w-[84px] md:w-[96px] h-auto object-contain opacity-90"
                    loading="lazy"
                    decoding="async"
                  />
                </RouteLink>
                <p className="mt-5 text-[14px] text-slate-200/80 max-w-xs leading-[1.8]">
                  Embedded recurring bill management solutions for modern financial institutions.
                </p>
              </div>

              <div>
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.20em] text-slate-50">Company</h4>
                <ul className="mt-5 space-y-3 md:space-y-4 text-[14px] leading-[1.8] text-slate-300/80">
                  <li>
                    <Link as={RouteLink} to="/" className="footer-link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link as={RouteLink} to="/solution" className="footer-link">
                      Solution
                    </Link>
                  </li>
                  <li>
                    <Link as={RouteLink} to="/about" className="footer-link">
                      About
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.20em] text-slate-50">Who We Serve</h4>
                <ul className="mt-5 space-y-3 md:space-y-4 text-[14px] leading-[1.8] text-slate-300/80">
                  <li>
                    <Link as={RouteLink} to="/who-we-serve/fintechs" className="footer-link">
                      Fintechs
                    </Link>
                  </li>
                  <li>
                    <Link as={RouteLink} to="/who-we-serve/banks" className="footer-link">
                      Banks
                    </Link>
                  </li>
                  <li>
                    <Link as={RouteLink} to="/who-we-serve/credit-unions" className="footer-link">
                      Credit Unions
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.20em] text-slate-50">Security</h4>
                <ul className="mt-5 space-y-3 md:space-y-4 text-[14px] leading-[1.8] text-slate-300/80">
                  <li>
                    <Link
                      href="https://app.vanta.com/scribeup.io/trust/mxpqv43sqxcjv3o3pqze4t"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      Trust Center
                    </Link>
                  </li>
                  <li>
                    <Link as={RouteLink} to="/privacy" className="footer-link">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link as={RouteLink} to="/terms-of-service" className="footer-link">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

          {/* Bottom bar */}
            <div aria-hidden="true" className="mt-12 h-px w-full bg-white/14" />
            <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* left: copyright + legal */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-300/75">
                <span className="font-mono tracking-[0.12em]">© {new Date().getFullYear()} ScribeUp, Inc.</span>
                <Link as={RouteLink} to="/privacy" className="footer-link">
                  Privacy
                </Link>
                <Link as={RouteLink} to="/terms-of-service" className="footer-link">
                  Terms
                </Link>
              </div>

              {/* right: social rail */}
              <div className="flex items-center gap-3 md:justify-end flex-wrap">
                {(
                  [
                    {
                      label: "LinkedIn",
                      href: "https://www.linkedin.com/company/scribeup/",
                      icon: "lucide:linkedin",
                    },
                    {
                      label: "X (Twitter)",
                      href: "https://x.com/Scribeup_io",
                      icon: "lucide:twitter",
                    },
                    {
                      label: "Instagram",
                      href: "https://www.instagram.com/scribeup.io/",
                      icon: "lucide:instagram",
                    },
                  ] as const
                ).map((s) => (
                  <a
                    key={s.label}
                    aria-label={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 inline-flex items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.06] hover:bg-white/[0.10] hover:border-white/20 text-slate-200/75 hover:text-slate-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A101C]"
                  >
                    <Icon icon={s.icon} width={16} height={16} style={{ strokeWidth: 1.6 }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}