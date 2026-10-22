"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { industryGuides } from "@/lib/industryContent";
import CallDemoLink from "@/components/site/CallDemoLink";
import { btnPrimary, btnSecondary } from "@/components/site/styles";

const links = [
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-[10px] border-b border-ink/10">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3.5">
          <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
            <LogoMark />
          </Link>

          <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-ink/75">
            <div
              className="relative"
              onMouseEnter={() => setIndustriesOpen(true)}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <button
                type="button"
                aria-expanded={industriesOpen}
                aria-haspopup="true"
                className="inline-flex items-center gap-1 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                onClick={() => setIndustriesOpen((open) => !open)}
              >
                Industries
                <ChevronDown size={14} aria-hidden="true" />
              </button>
              {industriesOpen ? (
                <div className="absolute left-0 top-full pt-2">
                  <div className="min-w-[220px] rounded-xl border border-ink/10 bg-white p-2 shadow-lg">
                    {industryGuides.map((industry) => (
                      <Link
                        key={industry.slug}
                        href={`/industries/${industry.slug}`}
                        className="block rounded-lg px-3 py-2 text-ink/80 hover:bg-sand hover:text-brand"
                        onClick={() => setIndustriesOpen(false)}
                      >
                        {industry.navLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <CallDemoLink
              placement="navbar_desktop"
              label="hear"
              className={btnSecondary}
            />
            <Link href="/free-trial" className={btnPrimary}>
              Start free trial
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="lg:hidden text-ink/70 hover:text-ink p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="lg:hidden bg-cream border-t border-ink/10">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <p className="px-3 pt-2 text-[12px] font-bold uppercase tracking-wider text-ink/55 m-0">
              Industries
            </p>
            {industryGuides.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 text-ink/75 hover:text-brand font-medium"
              >
                {industry.navLabel}
              </Link>
            ))}
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 text-ink/75 hover:text-brand font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
