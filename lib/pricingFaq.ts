/** Pricing FAQ shared by /pricing, the homepage (first five) and /faq. */

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
    answer:
      "You keep it on the plan you choose, or walk away and owe nothing.",
  },
  {
    question: "Do I need a credit card for the trial?",
    answer:
      "No. We send a payment link only if you decide to keep it.",
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
    answer:
      "Yes. We're based in Calgary, and prices are available in CAD.",
  },
];

export const homeFaqs = pricingFaqs.slice(0, 5);

export const planIncludes = [
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
  "Free trial. Pay nothing unless you keep it.",
  "Live in 7 days.",
  "Changes made within 2 business days.",
  "Urgent calls flagged to you right away.",
];

export const howItWorksSteps = [
  "Free missed-call audit (optional)",
  "We build it in 7 days",
  "Free 14-day trial",
  "Keep it or walk away.",
];

export const comebackBonus = {
  title: "Your first Comeback Sprint, free ($497 value).",
  body: "When you move from the free trial to any paid plan, we run your first Comeback Sprint at no charge. The AI reaches out to past customers who've agreed to hear from you and books them back in.",
};

export const comebackAddon = {
  title: "More Comeback Sprints: $497 each (C$699).",
  body: "The AI reaches out to past customers who've agreed to hear from you (old quotes, lapsed clients, overdue tune-ups and check-ups) and books them back in. Up to 300 contacts per sprint. Every message names your business and includes an opt-out.",
};

export const comebackConsent =
  "We only contact people who've bought from you or asked about your services recently enough to allow it. Every message names your business and includes an opt-out.";

export const wontDo =
  "It tells callers it's an AI. It doesn't give insurance quotes, coverage advice, medical or veterinary advice, or prices you haven't approved. It hands those to your team.";

export const trialIntro =
  "14 days free (30 for HVAC & plumbing). No card. No login. We build it for you and it's live in 7 days.";

export const pricingIntro =
  "We build, launch and run an AI receptionist for your business. It answers the calls you miss, books appointments into your calendar, and texts you a summary. It's live in 7 days, and the first 14 days are free.";

export const callEstimateNote =
  "Same AI on every plan. Plans differ only by minutes and support. Call estimates assume a ~3-minute average call; shorter calls mean more calls per plan.";

export const trialPreviewNote = "$0 setup · No login · No card for the trial";
