/**
 * Published plan ladder. CAD amounts are fixed prices, not a conversion of USD.
 * Homepage, /pricing and industry pages all read this file.
 * Custom "from $1,500" is the quoted starting price, not a setup fee.
 */

export type Currency = "USD" | "CAD";

export const SCALE_DASHBOARD_FEATURE =
  "A live dashboard of every call, booking and urgent alert";

type StandardPlan = {
  id: "starter" | "growth" | "scale";
  name: string;
  usd: number;
  cad: number;
  minutes: number;
  approxCalls: number;
  badge?: string;
  tagline: string;
  features: string[];
  overageUsd: number;
  overageCad: number;
  terms: string;
  cta: "Start free trial";
  quoted?: false;
};

type CustomPlan = {
  id: "custom";
  name: "Custom";
  fromUsd: number;
  fromCad: number;
  quoted: true;
  tagline: string;
  features: string[];
  cta: "Book a free audit";
};

export type Plan = StandardPlan | CustomPlan;

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    usd: 197,
    cad: 279,
    minutes: 300,
    approxCalls: 90,
    tagline: "For small teams that miss a few calls a day.",
    features: [
      "Answers the calls you don't pick up, day or night",
      "Books appointments into your calendar",
      "Texts the caller a confirmation",
      "Emails you a summary of every call",
      "Texts you instantly about urgent calls",
      "Changes made within 2 business days",
      "1 phone number",
    ],
    overageUsd: 0.5,
    overageCad: 0.7,
    terms: "Month-to-month",
    cta: "Start free trial",
  },
  {
    id: "growth",
    name: "Growth",
    usd: 297,
    cad: 419,
    minutes: 750,
    approxCalls: 230,
    badge: "Most popular",
    tagline: "For busy offices that need help all day.",
    features: [
      "Everything in Starter, plus:",
      "A daily digest of all calls",
      "A monthly tuning call with us to improve answers and booking rules",
      "1 phone number",
    ],
    overageUsd: 0.4,
    overageCad: 0.55,
    terms:
      "3-month minimum after your free trial, then month-to-month",
    cta: "Start free trial",
  },
  {
    id: "scale",
    name: "Scale",
    usd: 997,
    cad: 1399,
    minutes: 3000,
    approxCalls: 900,
    tagline: "For high-volume lines that need the AI answering first.",
    features: [
      "Everything in Growth, plus:",
      "The AI answers every call first, 24/7",
      "Up to 3 phone numbers or locations",
      SCALE_DASHBOARD_FEATURE,
      "A weekly review with us",
    ],
    overageUsd: 0.3,
    overageCad: 0.42,
    terms:
      "3-month minimum after your free trial, then month-to-month",
    cta: "Start free trial",
  },
  {
    id: "custom",
    name: "Custom",
    fromUsd: 1500,
    fromCad: 2100,
    quoted: true,
    tagline:
      "For businesses that need the AI connected to their own software.",
    features: [
      "Updates your CRM, agency management system (e.g. Applied Epic), ServiceTitan or Jobber",
      "Several workflows or departments",
      "Priced after a free audit, because the work depends on what your software allows",
    ],
    cta: "Book a free audit",
  },
];

export function isStandardPlan(
  plan: Plan
): plan is StandardPlan {
  return plan.id !== "custom";
}

export function getPlan(id: Plan["id"]) {
  const plan = plans.find((item) => item.id === id);
  if (!plan) throw new Error(`Unknown plan ${id}`);
  return plan;
}

export function planAmount(plan: Plan, currency: Currency) {
  if (plan.id === "custom") {
    return currency === "CAD" ? plan.fromCad : plan.fromUsd;
  }
  return currency === "CAD" ? plan.cad : plan.usd;
}

export function formatMoney(amount: number, currency: Currency) {
  const value = Number.isInteger(amount)
    ? amount.toLocaleString("en-US")
    : amount.toFixed(2);
  return currency === "CAD" ? `C$${value}` : `$${value}`;
}

export function formatOverage(amount: number, currency: Currency) {
  const value = amount.toFixed(2);
  const money = currency === "CAD" ? `C$${value}` : `$${value}`;
  return `Extra minutes: ${money}`;
}

export function visiblePlanFeatures(plan: Plan, showScaleDashboard: boolean) {
  if (showScaleDashboard) return plan.features;
  return plan.features.filter((feature) => feature !== SCALE_DASHBOARD_FEATURE);
}
