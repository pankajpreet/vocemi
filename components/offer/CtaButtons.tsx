import { Phone } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/lib/config";
import TrackedLink from "@/components/start/TrackedLink";

export type ButtonVariant = "primary" | "secondary" | "dark" | "ghostDark";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "border border-ink/15 text-ink hover:border-ink/35 bg-white/60",
  // On ink/coal backgrounds.
  dark: "bg-brand text-white hover:bg-[#5A70FF]",
  ghostDark: "border border-white/25 text-white hover:border-white/50",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-[16px] py-2.5 rounded-lg text-sm",
  md: "px-5 sm:px-[26px] py-3.5 rounded-[9px] text-[15.5px]",
  lg: "px-[30px] py-[15px] rounded-[9px] text-[15.5px]",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
) {
  return twMerge(
    "inline-flex items-center justify-center gap-2 font-semibold text-center whitespace-nowrap transition-colors",
    variants[variant],
    sizes[size],
    className
  );
}

interface ButtonProps {
  placement: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  label?: string;
  tabIndex?: number;
}

/**
 * "Call our AI: (xxx) xxx-xxxx". Renders nothing while DEMO_NUMBER is still
 * the placeholder, so a visitor never taps a dead tel: link.
 */
export function CallDemoButton({
  placement,
  variant = "secondary",
  size = "md",
  className,
  label = "Call our AI",
  tabIndex,
  showNumber = true,
}: ButtonProps & { showNumber?: boolean }) {
  if (!siteConfig.demoCallAvailable) return null;
  return (
    <TrackedLink
      href={`tel:${siteConfig.demoNumberTel}`}
      event="call_demo_click"
      properties={{ placement }}
      tabIndex={tabIndex}
      className={buttonClass(variant, size, className)}
    >
      <Phone size={size === "sm" ? 14 : 16} aria-hidden />
      {showNumber ? `${label}: ${siteConfig.demoNumber}` : label}
    </TrackedLink>
  );
}

export function TrialButton({
  placement,
  variant = "primary",
  size = "md",
  className,
  label = "Start free trial",
  tabIndex,
  industry,
}: ButtonProps & { industry?: string }) {
  const href = industry ? `/free-trial?industry=${industry}` : "/free-trial";
  return (
    <TrackedLink
      href={href}
      event="trial_cta_clicked"
      properties={{ placement, ...(industry ? { industry } : {}) }}
      tabIndex={tabIndex}
      className={buttonClass(variant, size, className)}
    >
      {label}
    </TrackedLink>
  );
}

export function AuditButton({
  placement,
  variant = "secondary",
  size = "md",
  className,
  label = "Book a free audit",
}: ButtonProps) {
  return (
    <TrackedLink
      href={siteConfig.auditBookingUrl(placement)}
      event="audit_click"
      properties={{ placement }}
      external
      className={buttonClass(variant, size, className)}
    >
      {label}
    </TrackedLink>
  );
}
