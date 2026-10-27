/**
 * The one source for every price on the site.
 *
 * The homepage preview, /pricing and each industry page all read these
 * numbers. CAD prices are fixed values set by the owner, not a live
 * conversion, so never derive one from the other.
 */
import { siteConfig } from "@/lib/config";

export type Currency = "usd" | "cad";
export type PlanId = "starter" | "growth" | "scale" | "custom";

interface PlanBase {
  id: PlanId;
  name: string;
  tagline: string;
  features: string[];
  cta: string;
  badge?: string;
}

export interface MonthlyPlan extends PlanBase {
  id: "starter" | "growth" | "scale";
  usd: number;
  cad: number;
  minutes: number;
  approxCalls: number;
  overageUsd: number;
  overageCad: number;
  terms: string;
  quoted?: false;
}

export interface QuotedPlan extends PlanBase {
  id: "custom";
  fromUsd: number;
  fromCad: number;
  quoted: true;
}

export type Plan = MonthlyPlan | QuotedPlan;

/** Left out of the Scale plan entirely when SHOW_SCALE_DASHBOARD is off. */
const SCALE_DASHBOARD_FEATURE =
  "A live dashboard of every call, booking and urgent alert";

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
    terms: "3-month minimum after your free trial, then month-to-month",
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
      ...(siteConfig.flags.showScaleDashboard ? [SCALE_DASHBOARD_FEATURE] : []),
      "A weekly review with us",
    ],
    overageUsd: 0.3,
    overageCad: 0.42,
    terms: "3-month minimum after your free trial, then month-to-month",
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

export const monthlyPlans = plans.filter(
  (plan): plan is MonthlyPlan => !plan.quoted
);

export function getPlan(id: PlanId): Plan {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}


export const currencyLabel: Record<Currency, string> = {
  usd: "USD",
  cad: "CAD",
};

function money(value: number, currency: Currency, cents = false) {
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
  return `${currency === "cad" ? "C$" : "$"}${formatted}`;
}

/** "$197" / "C$279", or the "from" price for Custom. */
export function planPrice(plan: Plan, currency: Currency): string {
  if (plan.quoted) {
    return money(currency === "cad" ? plan.fromCad : plan.fromUsd, currency);
  }
  return money(currency === "cad" ? plan.cad : plan.usd, currency);
}

export function overagePrice(plan: MonthlyPlan, currency: Currency): string {
  return money(currency === "cad" ? plan.overageCad : plan.overageUsd, currency, true);
}

// --- Trial ------------------------------------------------------------

export const TRIAL_DAYS = 14;
export const HVAC_TRIAL_DAYS = 30;

/** 30 days for HVAC & plumbing, 14 for everything else. */
export function trialDays(industry: string | undefined): number {
  const value = (industry ?? "").toLowerCase();
  return value.includes("hvac") ? HVAC_TRIAL_DAYS : TRIAL_DAYS;
}

// --- Shared offer copy ----------------------------------------------

/** A lead reactivation campaign: one round of outreach to past customers. */
export const leadReactivation = {
  name: "Lead reactivation campaign",
  usd: 497,
  cad: 699,
  contacts: 300,
};

export function campaignPrice(currency: Currency) {
  return money(currency === "cad" ? leadReactivation.cad : leadReactivation.usd, currency);
}

export const everyPlanIncludes = [
  "$0 setup. We build it for you; no DIY.",
  "Built for your industry: insurance, med spas, HVAC & plumbing, vet clinics",
  "Live in 7 days",
  "Free 14-day trial (30 days for HVAC & plumbing)",
  "Keep your number. Forward the calls you don't answer to us.",
  "Booking into Google Calendar, Outlook or Cal.com, within your rules",
  "It tells callers it's an AI and hands off to your team when needed",
  "Urgent calls flagged to you right away",
  "Changes made within 2 business days",
];

export const promises = [
  { title: "Free trial.", desc: "Pay nothing unless you keep it." },
  { title: "Live in 7 days.", desc: "We build it, test it and switch it on." },
  { title: "Changes made within 2 business days.", desc: "Tell us what to change and it's done." },
  { title: "Urgent calls flagged to you right away.", desc: "By text, the moment the call ends." },
];

export const pricingNote =
  "Same AI on every plan. Plans differ only by minutes and support. Call estimates assume a ~3-minute average call; shorter calls mean more calls per plan.";

export const pricingFaqs: { question: string; answer: string }[] = [
  {
    question: "What counts as a minute?",
    answer: "The time the AI spends on a call with your caller.",
  },
  {
    question: "What happens if I go over my minutes?",
    answer:
      "We email you at 80% and at 100%. Your calls keep getting answered, and extra minutes are billed at your plan's rate. If you'd rather have a hard stop, the AI can switch to taking messages once you hit your limit. If you go over two months in a row, we'll show you whether the next plan is cheaper.",
  },
  {
    question: "Can I keep my phone number?",
    answer:
      "Yes. You forward unanswered or busy calls to your AI. Nothing changes for your customers.",
  },
  {
    question: "Is there a contract?",
    answer:
      "Starter is month-to-month. Growth and Scale have a 3-month minimum after the free trial, then go month-to-month.",
  },
  {
    question: "What happens after the free trial?",
    answer: "You keep it on the plan you choose, or walk away and owe nothing.",
  },
  {
    question: "Do I need a credit card for the trial?",
    answer: "No. We send a payment link only if you decide to keep it.",
  },
  {
    question: "Does it pretend to be a person?",
    answer:
      "No. It tells callers it's an AI assistant and passes them to your team when they need a person.",
  },
  {
    question: "What won't it do?",
    answer:
      "It won't give insurance quotes or coverage advice, medical or veterinary advice, or prices you haven't approved. Those go to your team.",
  },
  {
    question: "Where is call data stored?",
    answer:
      "We give you a written note covering what's recorded, where it's stored and how long it's kept.",
  },
  {
    question: "Can I pay in Canadian dollars?",
    answer: "Yes. We're based in Calgary, and prices are available in CAD.",
  },
];

/** The five shown on the homepage. */
export const homePricingFaqs = [
  pricingFaqs[5], // credit card
  pricingFaqs[2], // keep my number
  pricingFaqs[6], // pretend to be a person
  pricingFaqs[3], // contract
  pricingFaqs[1], // over my minutes
];

export const wontDoSummary =
  "It tells callers it's an AI. It doesn't give insurance quotes, coverage advice, medical or veterinary advice, or prices you haven't approved. It hands those to your team.";

export const wontDoItems = [
  "Insurance quotes or coverage advice",
  "Medical or veterinary advice",
  "Prices you haven't approved",
  "Callers who ask for a person",
];
