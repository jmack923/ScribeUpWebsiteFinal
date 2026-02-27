import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
  Button,
  Link as HeroLink,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouteLink, useLocation } from "react-router-dom";
import logoHorizontal from "../../Logo/MAINLOGO.hoirzontal-black-text-big.svg";
import logoSquare from "../../Logo/LOGOjustlogosquare-color.svg";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useDemoModal } from "./demo-modal-context";
import { Magnetic } from "./magnetic";

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function SiteNavbar() {
  const { openDemoModal } = useDemoModal();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = React.useState<string | null>(null);
  const [mobileSectionOpen, setMobileSectionOpen] = React.useState<string | null>(null);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const isMobile = useIsMobile();

  type NavItem = {
    label: string;
    to: string;
    dropdown?: { label: string; to: string }[];
    megaMenu?: { title: string; desc?: string; icon: string; to: string }[];
  };

  const navItems: NavItem[] = [
    { label: "Home", to: "/" },
    { label: "Solution", to: "/solution" },
    {
      label: "Who We Serve",
      to: "/who-we-serve/banks",
      megaMenu: [
        {
          title: "Fintechs",
          icon: "lucide:zap",
          to: "/who-we-serve/fintechs",
        },
        {
          title: "Credit Unions",
          icon: "lucide:users",
          to: "/who-we-serve/credit-unions",
        },
        {
          title: "Banks",
          icon: "lucide:landmark",
          to: "/who-we-serve/banks",
        },
      ],
    },
    { label: "About", to: "/about" },
  ];

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 bottom-0 w-[2px] bg-blue-600 origin-top z-[60]"
        style={{ scaleY }}
      />
      <Navbar
        maxWidth="xl"
        className={`${
          scrolled
            ? isMobile
              ? "bg-white/92 border border-slate-200/70 shadow-[0_1px_2px_rgba(2,6,23,0.06)]"
              : "top-float-nav bg-white/60 backdrop-blur-[20px]"
            : isMobile
              ? "bg-white/92 border border-slate-200/70 shadow-[0_1px_2px_rgba(2,6,23,0.04)]"
              : "bg-white/40 backdrop-blur-[14px] border border-transparent border-b border-b-white/10 shadow-none"
        } fixed top-2.5 md:top-5 left-1/2 -translate-x-1/2 z-[100] h-[58px] min-h-[58px] py-0 rounded-[28px] md:rounded-[32px] w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] max-w-[1400px] px-4 md:px-8 transition-[background-color,box-shadow,border-color,backdrop-filter,transform] duration-300`}
      >
        <NavbarContent justify="start" className="flex-1 flex items-center h-full">
          <NavbarBrand className="h-full flex items-center">
            <HeroLink
              as={RouteLink}
              to="/"
              className="flex items-center gap-2 -ml-0.5 h-full"
              aria-label="ScribeUp home"
              onClick={(e) => {
                // If already on home, react-router won't remount; still scroll + re-init effects.
                if (pathname === "/") e.preventDefault();
                window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                requestAnimationFrame(() => window.dispatchEvent(new Event("anm:refresh")));
              }}
            >
              <img
                src={logoHorizontal}
                alt="ScribeUp"
                width={216}
                height={44}
                className="w-[100px] md:w-[108px] h-auto object-contain"
                decoding="async"
              />
            </HeroLink>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop Navigation */}
        <NavbarContent
          justify="center"
          className="desktop-only-nav flex-1 items-center justify-center gap-8 lg:gap-10 h-full"
        >
          {navItems.map((item) => {
            const hasDropdown = "dropdown" in item && Array.isArray(item.dropdown);
            const hasMegaMenu = "megaMenu" in item && Array.isArray(item.megaMenu);
            const hoverOnly = item.label === "Who We Serve";
            const megaOpen = hasMegaMenu && desktopMenuOpen === item.label;
            const active =
              pathname === item.to ||
              (hasDropdown && item.dropdown.some((d) => d.to === pathname)) ||
              (hasMegaMenu && item.megaMenu.some((d) => d.to === pathname));

            return (
              <NavbarItem
                key={item.to}
                className="relative group"
                onMouseEnter={() => {
                  if (hasMegaMenu) setDesktopMenuOpen(item.label);
                }}
                onMouseLeave={() => {
                  if (hasMegaMenu) setDesktopMenuOpen(null);
                }}
                onFocusCapture={() => {
                  if (hasMegaMenu) setDesktopMenuOpen(item.label);
                }}
                onBlurCapture={(e) => {
                  if (!hasMegaMenu) return;
                  const next = e.relatedTarget as Node | null;
                  if (!next || !(e.currentTarget as any)?.contains?.(next)) {
                    setDesktopMenuOpen(null);
                  }
                }}
              >
                {hoverOnly ? (
                  <button
                    type="button"
                    className={`h-[30px] px-2.5 rounded-xl text-[13.5px] font-medium tracking-[-0.01em] leading-none transition-colors inline-flex items-center cursor-default select-none ${
                      active
                        ? "text-[var(--ink)] bg-slate-900/[0.04] font-semibold"
                        : "text-slate-600 hover:text-[var(--ink)] hover:bg-slate-900/[0.04]"
                    }`}
                    aria-haspopup={hasDropdown || hasMegaMenu ? "menu" : undefined}
                    aria-expanded={hasMegaMenu ? megaOpen : undefined}
                    onClick={() => {
                      // Desktop: hover-only nav nodes (no navigation on click).
                      // Users click inside the popout instead.
                      (document.activeElement as HTMLElement | null)?.blur?.();
                    }}
                  >
                    {item.label}
                    {(hasDropdown || hasMegaMenu) && (
                      <Icon
                        icon="lucide:chevron-down"
                        className={`ml-0.5 w-3 h-3 opacity-70 transition-transform duration-200 ${
                          megaOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                ) : (
                  <HeroLink
                    as={RouteLink}
                    to={item.to}
                    className={`h-[30px] px-2.5 rounded-xl text-[13.5px] font-medium tracking-[-0.01em] leading-none transition-colors inline-flex items-center ${
                      active
                        ? "text-[var(--ink)] bg-slate-900/[0.04] font-semibold"
                        : "text-slate-600 hover:text-[var(--ink)] hover:bg-slate-900/[0.04]"
                    }`}
                  >
                    {item.label}
                  </HeroLink>
                )}

                {/* Standard Dropdown */}
                {hasDropdown && item.dropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
                    <div className="nav-pop-enter rounded-[18px] border border-slate-200 bg-white/95 backdrop-blur-[18px] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.10),0_4px_12px_-4px_rgba(0,0,0,0.05)] py-2 min-w-[220px]">
                      {item.dropdown.map((d) => (
                        <HeroLink
                          key={d.to}
                          as={RouteLink}
                          to={d.to}
                          className={`group/dd flex items-center justify-between mx-2 px-4 py-2.5 rounded-[10px] text-[14px] font-medium tracking-[-0.01em] transition-all duration-200 ${
                            pathname === d.to
                              ? "text-slate-900 bg-slate-50"
                              : "text-slate-900 hover:bg-slate-50 hover:text-[#0052FF]"
                          }`}
                        >
                          <span className="min-w-0 truncate">{d.label}</span>
                          <Icon
                            icon="lucide:arrow-right"
                            width={14}
                            height={14}
                            className="ml-3 shrink-0 text-slate-400 transition-all duration-200 group-hover/dd:text-[#0052FF] group-hover/dd:translate-x-1"
                            style={{ strokeWidth: 1.6 }}
                          />
                        </HeroLink>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mega Menu */}
                {hasMegaMenu && item.megaMenu && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 ${
                      item.label === "Developer" || item.label === "Who We Serve" ? "pt-1.5" : "pt-3"
                    } z-50 ${
                      item.label === "Developer" ? "w-[420px]" : "w-[560px]"
                    } ${
                      megaOpen
                        ? "opacity-100 visible pointer-events-auto translate-y-0 scale-100"
                        : "opacity-0 invisible pointer-events-none translate-y-1 scale-[0.99]"
                    } transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]`}
                  >
                    <div
                      className={`nav-pop-enter rounded-[24px] border border-slate-200/80 bg-white/96 backdrop-blur-[22px] shadow-[0_0_0_4px_#F8FAFC,0_18px_48px_-24px_rgba(2,6,23,0.18),0_40px_120px_rgba(2,6,23,0.14)] ${
                        item.label === "Developer" || item.label === "Who We Serve" ? "p-1.5" : "p-2.5"
                      } overflow-hidden`}
                    >
                      <div
                        className={`grid ${
                          item.label === "Developer" || item.label === "Who We Serve" ? "gap-1.5" : "gap-2"
                        } ${
                          item.label === "Developer" ? "grid-cols-2" : "grid-cols-3"
                        }`}
                      >
                        {item.megaMenu.map((d) => {
                          const title = d.title === "Documentation" ? "Docs" : d.title;
                          const showTileDesc = item.label !== "Who We Serve" && item.label !== "Developer";
                          const isCompactMega = !showTileDesc;
                          const tileRowClass = isCompactMega ? "flex items-center gap-3" : "flex items-start gap-3";
                          const tileBase =
                            `group/tile relative min-w-0 rounded-[18px] border border-slate-200/70 bg-white ${
                              isCompactMega ? "px-3 py-2" : "px-3.5 py-3.5"
                            } text-left transition-[background-color,border-color,box-shadow] duration-200 hover:bg-slate-50/70 hover:border-slate-300/70 hover:shadow-[0_0_0_4px_#F8FAFC,0_14px_34px_-22px_rgba(2,6,23,0.16)]`;
                          const tileDisabled =
                            `relative min-w-0 rounded-[18px] border border-slate-200/70 bg-white ${
                              isCompactMega ? "px-3 py-2" : "px-3.5 py-3.5"
                            } text-left opacity-70`;
                          const tileWellClass = isCompactMega
                            ? "recessed-well recessed-well--inset h-8 w-8 shrink-0 grid place-items-center rounded-[14px] border border-slate-200/70 bg-[#F8FAFC] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
                            : "recessed-well recessed-well--inset p-2 rounded-[16px] border border-slate-200/70 bg-[#F8FAFC] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]";
                          const isDevDocsDisabled = item.label === "Developer" && d.title === "Developer docs";

                          if (item.label === "Developer" && d.to === "__demo__") {
                            return (
                              <button
                                key={d.title}
                                type="button"
                                className={tileBase}
                                onClick={() => {
                                  setDesktopMenuOpen(null);
                                  (document.activeElement as HTMLElement | null)?.blur?.();
                                  openDemoModal();
                                }}
                              >
                                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-[#2563EB]/18 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200" />
                                <div className={tileRowClass}>
                                  <div className={tileWellClass}>
                                    <Icon icon={d.icon} width={15} height={15} className="text-blue-700/75" style={{ strokeWidth: 1.6 }} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="text-[13px] font-semibold tracking-[-0.02em] text-slate-900 whitespace-normal">
                                        {title}
                                      </span>
                                      <Icon
                                        icon="lucide:arrow-right"
                                        width={14}
                                        height={14}
                                        className="text-slate-400 transition-transform duration-200 group-hover/tile:translate-x-1"
                                        style={{ strokeWidth: 1.6 }}
                                      />
                                    </div>
                                    {showTileDesc && d.desc ? (
                                      <div className="mt-1 text-[11px] leading-[1.35] text-slate-600 whitespace-normal">
                                        {d.desc}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </button>
                            );
                          }

                          if (isDevDocsDisabled) {
                            return (
                              <div
                                key={d.title}
                                className={tileDisabled}
                                aria-disabled="true"
                              >
                                <div className={tileRowClass}>
                                  <div className={tileWellClass}>
                                    <Icon icon={d.icon} width={15} height={15} className="text-blue-700/75" style={{ strokeWidth: 1.6 }} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="text-[13px] font-semibold tracking-[-0.02em] text-slate-900 whitespace-normal">
                                        {title}
                                      </span>
                                    </div>
                                    {showTileDesc && d.desc ? (
                                      <div className="mt-1 text-[11px] leading-[1.35] text-slate-600 whitespace-normal">
                                        {d.desc}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <HeroLink
                              key={d.to}
                              as={RouteLink}
                              to={d.to}
                              className={tileBase}
                              onClick={() => {
                                setDesktopMenuOpen(null);
                                (document.activeElement as HTMLElement | null)?.blur?.();
                              }}
                            >
                              <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-[#2563EB]/18 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200" />
                              <div className={tileRowClass}>
                                <div className={tileWellClass}>
                                  <Icon icon={d.icon} width={15} height={15} className="text-blue-700/75" style={{ strokeWidth: 1.6 }} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="text-[13px] font-semibold tracking-[-0.02em] text-slate-900 whitespace-normal">
                                      {title}
                                    </span>
                                    <Icon
                                      icon="lucide:arrow-right"
                                      width={14}
                                      height={14}
                                      className="text-slate-400 transition-transform duration-200 group-hover/tile:translate-x-1"
                                      style={{ strokeWidth: 1.6 }}
                                    />
                                  </div>
                                  {showTileDesc && d.desc ? (
                                    <div className="mt-1 text-[11px] leading-[1.35] text-slate-600 whitespace-normal">
                                      {d.desc}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </HeroLink>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <NavbarContent justify="end" className="flex-1 items-center justify-end gap-2 h-full">
          {/* Mobile Menu Toggle */}
          <NavbarItem className="mobile-only-nav">
            <Button
              variant="flat"
              color="default"
              className="h-[40px] w-[40px] min-w-[40px] rounded-[14px] border border-blue-200/70 bg-white text-slate-800 shadow-[0_1px_2px_rgba(2,6,23,0.06),0_10px_30px_rgba(37,99,235,0.10)]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <Icon icon={menuOpen ? "lucide:x" : "lucide:menu"} width={18} height={18} style={{ strokeWidth: 1.9 }} />
            </Button>
          </NavbarItem>

          {/* Desktop CTA */}
          <NavbarItem className="desktop-only-nav">
            <Magnetic hitSlop={20} strength={9} radius={70}>
              <Button
                variant="flat"
                color="default"
                className="btn-obsidian nav-btn-base btn-arrow-lead !h-[34px] !px-3.5 text-[11.5px] font-semibold !rounded-[8px]"
                endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={14} height={14} style={{ strokeWidth: 1.5 }} />}
                onClick={openDemoModal}
              >
                Book a demo
              </Button>
            </Magnetic>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[80] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              aria-label="Close menu backdrop"
              className="absolute inset-0 bg-slate-900/25"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute left-3 right-3 top-[76px] rounded-[22px] border border-slate-200/80 bg-white/95 shadow-[0_26px_80px_rgba(2,6,23,0.20)] overflow-hidden max-h-[calc(100dvh-92px)] overflow-y-auto"
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-5 py-4 border-b border-slate-200/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={logoSquare} alt="" width={28} height={28} className="h-7 w-7 rounded-[10px]" />
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
                    [ NAVIGATION ]
                  </div>
                </div>
                <Button
                  variant="flat"
                  className="h-9 w-9 min-w-[36px] rounded-[14px] border border-slate-200/70 bg-white/70 text-slate-700"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <Icon icon="lucide:x" width={16} height={16} style={{ strokeWidth: 1.6 }} />
                </Button>
              </div>

              <div className="p-3">
                {navItems.map((item) => {
                  const hasDropdown = "dropdown" in item && Array.isArray(item.dropdown);
                  const hasMegaMenu = "megaMenu" in item && Array.isArray(item.megaMenu);
                  const hoverOnly = item.label === "Who We Serve";
                  const active =
                    pathname === item.to ||
                    (hasDropdown && item.dropdown.some((d) => d.to === pathname)) ||
                    (hasMegaMenu && item.megaMenu.some((d) => d.to === pathname));

                  return (
                    <div key={item.to} className="mb-1">
                      {hasMegaMenu ? (
                        <button
                          type="button"
                          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] text-[14px] font-semibold tracking-[-0.01em] ${
                            active ? "bg-slate-900/[0.04] text-[var(--ink)]" : "text-slate-700 hover:bg-slate-900/[0.03]"
                          }`}
                          onClick={() => {
                            setMobileSectionOpen((v) => (v === item.label ? null : item.label));
                          }}
                        >
                          <span>{item.label}</span>
                          <Icon
                            icon="lucide:chevron-down"
                            width={16}
                            height={16}
                            className={`text-slate-400 transition-transform duration-200 ${
                              mobileSectionOpen === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      ) : (
                        <HeroLink
                          as={RouteLink}
                          to={item.to}
                          className={`flex items-center justify-between px-4 py-3.5 rounded-[16px] text-[14px] font-semibold tracking-[-0.01em] ${
                            active ? "bg-slate-900/[0.04] text-[var(--ink)]" : "text-slate-700 hover:bg-slate-900/[0.03]"
                          }`}
                          onClick={() => {
                            setMenuOpen(false);
                            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                          }}
                        >
                          <span>{item.label}</span>
                        </HeroLink>
                      )}
                      
                      {hasDropdown && item.dropdown ? (
                        <div className="mt-1 ml-3 pl-3 border-l border-slate-200/70">
                          {item.dropdown.map((d) => (
                            <HeroLink
                              key={d.to}
                              as={RouteLink}
                              to={d.to}
                              className={`group/subnav flex items-center justify-between px-4 py-2.5 rounded-[14px] text-[13px] font-semibold tracking-[-0.01em] transition-all duration-200 ${
                                pathname === d.to
                                  ? "bg-slate-50 text-slate-900"
                                  : "text-slate-900 hover:bg-slate-50 hover:text-[#0052FF]"
                              }`}
                              onClick={() => {
                                setMenuOpen(false);
                                window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                              }}
                            >
                              <span className="min-w-0 truncate">{d.label}</span>
                              <Icon
                                icon="lucide:arrow-right"
                                width={14}
                                height={14}
                                className="ml-3 shrink-0 text-slate-400 transition-all duration-200 group-hover/subnav:translate-x-1 group-hover/subnav:text-[#0052FF]"
                              />
                            </HeroLink>
                          ))}
                        </div>
                      ) : null}

                      {hasMegaMenu && item.megaMenu ? (
                        <AnimatePresence initial={false}>
                          {mobileSectionOpen === item.label ? (
                            <motion.div
                              className="mt-1 ml-3 pl-3 border-l border-slate-200/70"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            >
                              {item.megaMenu.map((d) => {
                                const isDevDocsDisabled = item.label === "Developer" && d.title === "Developer docs";
                                const isDevDemo = item.label === "Developer" && d.to === "__demo__";

                                if (isDevDocsDisabled) {
                                  return (
                                    <div
                                      key={d.title}
                                      aria-disabled="true"
                                      className="flex items-center justify-between px-4 py-3 rounded-[14px] bg-white opacity-70 text-[13px] font-semibold tracking-[-0.01em] text-slate-900"
                                    >
                                      <span>{d.title}</span>
                                      <Icon icon="lucide:lock" width={14} height={14} className="text-slate-400" />
                                    </div>
                                  );
                                }

                                if (isDevDemo) {
                                  return (
                                    <button
                                      key={d.title}
                                      type="button"
                                      className="w-full flex items-center justify-between px-4 py-3 rounded-[14px] hover:bg-slate-50 text-slate-900 text-[13px] font-semibold tracking-[-0.01em]"
                                      onClick={() => {
                                        setMenuOpen(false);
                                        setMobileSectionOpen(null);
                                        openDemoModal();
                                      }}
                                    >
                                      <span>{d.title}</span>
                                      <Icon icon="lucide:arrow-right" width={14} height={14} className="text-slate-400" />
                                    </button>
                                  );
                                }

                                return (
                                  <HeroLink
                                    key={d.to}
                                    as={RouteLink}
                                    to={d.to}
                                    className={`flex items-center justify-between px-4 py-3 rounded-[14px] ${
                                      pathname === d.to ? "bg-slate-50 text-slate-900" : "hover:bg-slate-50 text-slate-900"
                                    } text-[13px] font-semibold tracking-[-0.01em]`}
                                    onClick={() => {
                                      setMenuOpen(false);
                                      setMobileSectionOpen(null);
                                      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                                    }}
                                  >
                                    <span>{d.title === "Documentation" ? "Docs" : d.title}</span>
                                    <Icon icon="lucide:arrow-right" width={14} height={14} className="text-slate-400" />
                                  </HeroLink>
                                );
                              })}
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      ) : null}
                    </div>
                  );
                })}
                <div className="mt-4 px-4">
                  <Button
                    fullWidth
                    color="primary"
                    className="nav-btn-base btn-s-tier btn-s-tier-primary btn-arrow-lead !h-[46px] text-[14px] font-semibold"
                    endContent={<Icon icon="lucide:arrow-right" data-btn-arrow width={18} height={18} style={{ strokeWidth: 1.5 }} />}
                    onClick={() => {
                      setMenuOpen(false);
                      openDemoModal();
                    }}
                  >
                    Book a demo
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
