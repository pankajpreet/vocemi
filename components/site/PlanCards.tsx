"use client";

import Link from "next/link";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";
import {
  formatMoney,
  formatOverage,
  isStandardPlan,
  planAmount,
  plans,
  visiblePlanFeatures,
  type Plan,
} from "@/lib/plans";
import { useCurrency } from "./CurrencyProvider";

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      className="inline-flex rounded-[9px] border border-ink/15 bg-white p-1"
      role="group"
      aria-label="Currency"
    >
      {(["USD", "CAD"] as const).map((option) => {
        const selected = currency === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => {
              if (!selected) setCurrency(option);
            }}
            className={`px-4 py-2 rounded-[7px] text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
              selected ? "bg-ink text-white" : "text-ink/70 hover:text-ink"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default function PlanCards({
  ids,
  auditHref,
  auditPlacement,
  titleAs = "h3",
}: {
  ids?: Plan["id"][];
  auditHref: string;
  auditPlacement: string;
  titleAs?: "h2" | "h3";
}) {
  const { currency } = useCurrency();
  const visible = ids ? plans.filter((plan) => ids.includes(plan.id)) : plans;

  return (
    <div
      className={`grid gap-4 items-stretch ${
        visible.length >= 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"
      }`}
    >
      {visible.map((plan) => {
        const amount = planAmount(plan, currency);
        const price = formatMoney(amount, currency);
        const featured = plan.id === "growth";
        return (
          <article
            key={plan.id}
            className={`relative flex flex-col bg-white rounded-[18px] p-6 md:p-7 h-full ${
              featured ? "border-[1.5px] border-brand" : "border border-ink/10"
            }`}
          >
            {isStandardPlan(plan) && plan.badge ? (
              <div className="absolute -top-3 left-6 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full">
                {plan.badge}
              </div>
            ) : null}
            {titleAs === "h2" ? (
              <h2 className="font-display text-[18px] font-bold text-ink m-0 mb-1">
                {plan.name}
              </h2>
            ) : (
              <h3 className="font-display text-[18px] font-bold text-ink m-0 mb-1">
                {plan.name}
              </h3>
            )}
            <p className="text-[14px] leading-[1.5] text-ink/70 m-0 mb-4 min-h-[42px]">
              {plan.tagline}
            </p>
            <p className="font-display text-[32px] font-extrabold text-ink m-0 mb-1">
              {plan.id === "custom" ? `from ${price}` : price}
            </p>
            {isStandardPlan(plan) ? (
              <>
                <p className="text-[14px] leading-[1.45] text-ink/75 m-0">
                  {plan.minutes.toLocaleString("en-US")} minutes a month (about{" "}
                  {plan.approxCalls.toLocaleString("en-US")} calls)
                </p>
                <p className="text-[14px] text-ink/75 m-0 mt-1">
                  {formatOverage(
                    currency === "CAD" ? plan.overageCad : plan.overageUsd,
                    currency
                  )}
                </p>
              </>
            ) : null}
            <ul className="m-0 mt-5 p-0 list-none flex flex-col gap-2.5 flex-1">
              {visiblePlanFeatures(plan, siteConfig.showScaleDashboard).map(
                (feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 text-[14px] leading-[1.45] text-ink/80"
                  >
                    <span className="text-brand" aria-hidden="true">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                )
              )}
            </ul>
            {isStandardPlan(plan) ? (
              <p className="text-[13px] leading-[1.45] text-ink/65 m-0 mt-4 mb-4">
                {plan.terms}
              </p>
            ) : (
              <div className="mt-4 mb-4" />
            )}
            {plan.cta === "Start free trial" ? (
              <Link
                href="/free-trial"
                className={`text-center py-3 rounded-[9px] font-semibold text-[14.5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  featured
                    ? "bg-brand text-white hover:bg-brand-dark"
                    : "border border-ink/15 text-ink hover:border-ink/40"
                }`}
              >
                {plan.cta}
              </Link>
            ) : (
              <TrackedLink
                href={auditHref}
                event="audit_click"
                properties={{ placement: auditPlacement, plan: plan.id }}
                external
                className="text-center py-3 rounded-[9px] font-semibold text-[14.5px] border border-ink/15 text-ink hover:border-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {plan.cta}
              </TrackedLink>
            )}
          </article>
        );
      })}
    </div>
  );
}
