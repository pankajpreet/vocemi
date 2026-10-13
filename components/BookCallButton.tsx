"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

interface BookCallButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
  placement?: string;
  children?: React.ReactNode;
}

export default function BookCallButton({
  variant = "primary",
  className = "",
  placement = "page_cta",
  children,
}: BookCallButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300";
  const variants = {
    primary:
      "bg-gradient-to-r from-primary-accent to-primary-accent-alt text-white hover:shadow-lg hover:shadow-primary-accent/40 hover:-translate-y-0.5",
    // No hover:text-white here. text-white already covers the hover fill, and a
    // hover-only text color survives when a caller overrides the resting color.
    secondary:
      "bg-transparent border-2 border-primary-accent text-white hover:bg-primary-accent",
  };

  // bookCallUrl falls back to /contact when no scheduler is configured, and
  // that should stay in the current tab. Cal.com links include UTMs.
  const href = siteConfig.bookCallUrl(placement);
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() =>
        trackEvent("book_call_clicked", {
          page: window.location.pathname,
          placement,
        })
      }
      // Stylesheet order, not class-string order, decides Tailwind conflicts.
      // twMerge drops the variant utility when className sets the same property
      // (bg-white vs bg-transparent, text-primary-accent vs text-white).
      className={twMerge(baseStyles, variants[variant], className)}
    >
      {children || "Book a free call"}
    </Link>
  );
}
