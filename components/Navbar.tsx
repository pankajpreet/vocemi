"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { industryGuides } from "@/lib/industryContent";
import IndustryIcon from "@/components/offer/IndustryIcon";
import { CallDemoButton, TrialButton } from "@/components/offer/CtaButtons";

// Rooted at "/" so they also work from inner pages; on the homepage itself
// handleNavClick smooth-scrolls instead.
const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Results", href: "/results" },
  { label: "FAQ", href: "/faq" },
];

function LogoMark() {
  return (
    <span className="flex items-center gap-2.5 font-display font-extrabold text-xl tracking-tight text-ink">
      <span className="w-7 h-7 rounded-lg bg-brand inline-flex items-center justify-center flex-shrink-0">
        <span className="w-[9px] h-[9px] rounded-full bg-white" />
      </span>
      Vocemi
    </span>
  );
}

function IndustriesMenu() {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={wrapper}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onBlur={(e) => {
        if (!wrapper.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="nav-industries"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 whitespace-nowrap hover:text-brand transition-colors"
      >
        Industries
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-industries"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[340px]"
          >
            <div className="bg-white border border-ink/10 rounded-2xl p-2 shadow-[0_24px_48px_-16px_rgba(22,24,28,0.25)]">
              {industryGuides.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-sand transition-colors"
                >
                  <span
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: industry.tint, color: industry.ink }}
                  >
                    <IndustryIcon icon={industry.icon} size={17} strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14.5px] font-semibold text-ink">
                      {industry.name}
                    </span>
                    <span className="block text-[12.5px] text-ink/60 leading-snug">
                      {industry.offerName}
                    </span>
                  </span>
                </Link>
              ))}
              <Link
                href="/industries"
                onClick={() => setOpen(false)}
                className="block text-center text-[13px] font-semibold text-brand py-2 mt-1 border-t border-ink/10 hover:text-brand-dark"
              >
                All industries
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setIsOpen(false);
    if (!href.startsWith("/#") || window.location.pathname !== "/") return;
    const element = document.querySelector(href.slice(1));
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-cream/85 backdrop-blur-[10px] border-b border-ink/10">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <LogoMark />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-[22px] text-sm font-medium text-ink/70">
            <IndustriesMenu />
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="whitespace-nowrap hover:text-brand transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            <CallDemoButton placement="navbar_desktop" size="sm" />
            <TrialButton placement="navbar_desktop" size="sm" />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <TrialButton
              placement="navbar_mobile_bar"
              size="sm"
              className="hidden sm:inline-flex"
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ink/70 hover:text-ink transition-colors p-1"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden bg-cream border-t border-ink/10 overflow-hidden"
          >
            <div className="px-6 pt-3 pb-5">
              <div className="text-[12px] font-bold uppercase tracking-wider text-ink/60 px-3 mb-1">
                Industries
              </div>
              <div className="grid grid-cols-2 gap-1 mb-2">
                {industryGuides.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-md text-ink/75 hover:bg-sand font-medium text-[14.5px]"
                  >
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: industry.tint, color: industry.ink }}
                    >
                      <IndustryIcon icon={industry.icon} size={14} strokeWidth={2.2} />
                    </span>
                    {industry.name}
                  </Link>
                ))}
              </div>
              <div className="border-t border-ink/10 pt-2 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block px-3 py-2.5 text-ink/70 hover:text-brand hover:bg-sand rounded-md transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="pt-3 flex flex-col gap-2">
                <CallDemoButton placement="navbar_mobile" className="w-full" />
                <TrialButton placement="navbar_mobile" className="w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
