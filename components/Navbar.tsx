"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "ROI Calculator", href: "#calculator" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setIsOpen(false);
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

          <div className="hidden lg:block flex-shrink-0">
            <a
              href={siteConfig.bookCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-ink text-white px-[18px] py-2.5 rounded-lg text-sm font-semibold hover:bg-brand transition-colors"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ink/70 hover:text-ink transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-cream border-t border-ink/10">
          <div className="px-6 pt-2 pb-4 space-y-1">
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
            <div className="pt-2">
              <a
                href={siteConfig.bookCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-ink text-white px-[18px] py-2.5 rounded-lg text-sm font-semibold hover:bg-brand transition-colors"
              >
                Book a Call
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
