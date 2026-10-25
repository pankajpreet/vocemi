"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import {
  overagePrice,
  planPrice,
  type Plan,
} from "@/lib/plans";
import { useCurrency } from "./Currency";
import { AuditButton, TrialButton } from "./CtaButtons";

/** Price that rolls vertically when the currency changes. */
export function AnimatedPrice({ value, className }: { value: string; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden align-bottom ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface PlanCardProps {
  plan: Plan;
  placement: string;
  /** Highlight regardless of the plan's own badge (industry recommendation). */
  recommended?: boolean;
  compact?: boolean;
  industry?: string;
}

export function PlanCard({
  plan,
  placement,
  recommended,
  compact = false,
  industry,
}: PlanCardProps) {
  const { currency } = useCurrency();
  const featured = recommended ?? Boolean(plan.badge);
  const badge = recommended ? "Recommended" : plan.badge;
  const features = plan.features;

  return (
    <div
      id={plan.id}
      className={`scroll-mt-28 bg-white rounded-[18px] p-7 md:p-8 flex flex-col relative h-full transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_rgba(22,24,28,0.15)] ${
        featured
          ? "border-[1.5px] border-brand shadow-[0_24px_50px_-24px_rgba(59,84,244,0.45)]"
          : "border border-ink/10"
      }`}
    >
      {badge && (
        <div className="absolute -top-[13px] left-7 bg-brand text-white text-xs font-bold px-3 py-[5px] rounded-full animate-badgePulse">
          {badge}
        </div>
      )}
      <h3 className="font-display text-[19px] font-bold text-ink m-0 mb-1.5">
        {plan.name}
      </h3>
      <p className="text-[13.5px] text-ink/65 m-0 mb-5 min-h-9">{plan.tagline}</p>

      <div className="flex items-baseline gap-1.5 mb-1">
        {plan.quoted && (
          <span className="text-[14px] font-semibold text-ink/65">from</span>
        )}
        <AnimatedPrice
          value={planPrice(plan, currency)}
          className="font-display text-[36px] leading-[1.15] font-extrabold text-ink"
        />
        {!plan.quoted && <span className="text-[14px] text-ink/65">/mo</span>}
      </div>

      {plan.quoted ? (
        <div className="text-[13px] text-ink/65 mb-6">Quoted after a free audit</div>
      ) : (
        <div className="text-[13px] text-ink/65 mb-6 leading-[1.5]">
          <span className="font-semibold text-ink/80">
            {plan.minutes.toLocaleString("en-US")} minutes a month
          </span>{" "}
          (about {plan.approxCalls} calls)
          <br />
          Extra minutes: <AnimatedPrice value={overagePrice(plan, currency)} />
          /min
        </div>
      )}

      {!compact && (
        <ul className="m-0 p-0 list-none flex flex-col gap-[11px] mb-7 flex-1">
          {features.map((feature) => {
            const lead = feature.endsWith(":");
            return (
              <li
                key={feature}
                className={`flex gap-[9px] text-sm leading-[1.5] ${
                  lead ? "font-semibold text-ink" : "text-ink/75"
                }`}
              >
                {!lead && (
                  <Check size={16} strokeWidth={2.5} className="text-brand flex-shrink-0 mt-[2px]" aria-hidden />
                )}
                {feature}
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-auto">
        {plan.quoted ? (
          <AuditButton
            placement={`${placement}_custom`}
            label={plan.cta}
            variant={featured ? "primary" : "secondary"}
            className="w-full"
          />
        ) : (
          <TrialButton
            placement={`${placement}_${plan.id}`}
            label={plan.cta}
            industry={industry}
            variant={featured ? "primary" : "secondary"}
            className="w-full"
          />
        )}
        <p className="text-[12px] leading-[1.5] text-ink/60 m-0 mt-3 text-center min-h-[36px]">
          {plan.quoted ? "The audit is free, with no obligation." : plan.terms}
        </p>
      </div>
    </div>
  );
}

export function PlanGrid({
  plans,
  placement,
  compact,
}: {
  plans: Plan[];
  placement: string;
  compact?: boolean;
}) {
  const cols =
    plans.length === 4
      ? "md:grid-cols-2 xl:grid-cols-4"
      : "md:grid-cols-3";
  return (
    <div className={`grid ${cols} gap-[22px] items-stretch pt-3`}>
      {plans.map((plan, i) => (
        <Reveal key={plan.id} delay={i * 0.1} className="h-full">
          <PlanCard plan={plan} placement={placement} compact={compact} />
        </Reveal>
      ))}
    </div>
  );
}
