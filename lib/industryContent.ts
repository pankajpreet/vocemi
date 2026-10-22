/**
 * Industry pages. Copy is the owner's industry template. Prices are not stored
 * here; pages read them from lib/plans.ts.
 */

export interface IndustryGuide {
  slug: string;
  name: string;
  navLabel: string;
  metaTitle: string;
  description: string;
  h1: string;
  sub: string;
  handles: string[];
  wont: string;
  proof: string;
  recommendation: string;
  planIds: ("growth" | "scale")[];
  trialDays: 14 | 30;
  faqs: { question: string; answer: string }[];
}

export const industryGuides: IndustryGuide[] = [
  {
    slug: "insurance",
    name: "Insurance",
    navLabel: "Insurance",
    metaTitle: "The Broker-Ready Intake Desk | Vocemi",
    description:
      "New-quote calls captured and handed to a licensed broker, after hours and when your team is busy. Live in 7 days.",
    h1: "The Broker-Ready Intake Desk",
    sub: "New-quote calls captured and handed to a licensed broker, after hours and when your team is busy. Live in 7 days.",
    handles: [
      "New-quote intake (contact details, what they want covered, current insurer, renewal date)",
      "Policy-service requests routed to the right broker",
      "Urgent claim callbacks flagged to you right away",
      "Broker callbacks booked into your calendar",
    ],
    wont: "Quote prices, bind policies, or give coverage advice. Those always go to a licensed broker.",
    proof: "776 calls answered in April 2026 for an insurance brokerage",
    recommendation:
      "Recommended: Growth; Scale for brokerages taking 30+ calls a day. 14-day free trial.",
    planIds: ["growth", "scale"],
    trialDays: 14,
    faqs: [
      {
        question: "Is this E&O safe?",
        answer:
          "It only does intake and routing. Advice and quotes stay with your licensed brokers.",
      },
      {
        question: "Clients want a person.",
        answer:
          "It says it's an AI and hands callers to your team when they ask.",
      },
      {
        question: "Where's the data?",
        answer: "We give you a written data-handling note.",
      },
    ],
  },
  {
    slug: "med-spas",
    name: "Med Spas",
    navLabel: "Med Spas",
    metaTitle: "The Consult Comeback System | Vocemi",
    description:
      "After-hours enquiries answered and consults booked, and lapsed clients invited back.",
    h1: "The Consult Comeback System",
    sub: "After-hours enquiries answered and consults booked, and lapsed clients invited back.",
    handles: [
      "Consult and appointment booking",
      "After-hours enquiries",
      "Prices and FAQs from your approved list",
      "Comeback Sprints to lapsed clients who've agreed to hear from you",
    ],
    wont: "Give medical or treatment advice.",
    proof: "3D Lifestyle, Calgary NE",
    recommendation:
      "Recommended: Growth + your free first Comeback Sprint. 14-day free trial.",
    planIds: ["growth"],
    trialDays: 14,
    faqs: [
      {
        question: "Will it sound pushy?",
        answer: "It follows your script and your tone.",
      },
      {
        question: "Can it quote prices?",
        answer: "Only prices you've approved.",
      },
    ],
  },
  {
    slug: "hvac-plumbing",
    name: "HVAC & Plumbing",
    navLabel: "HVAC & Plumbing",
    metaTitle: "The No-Heat Night Desk | Vocemi",
    description:
      "No-heat and leak calls triaged, your on-call tech alerted, routine jobs booked. Live in 7 days.",
    h1: "The No-Heat Night Desk",
    sub: "No-heat and leak calls triaged, your on-call tech alerted, routine jobs booked. Live in 7 days.",
    handles: [
      "Emergency vs. routine triage by your rules",
      "Your safety script on gas-smell calls",
      "Alerting the on-call tech",
      "Booking routine work into your calendar",
      "Texting the caller a link to send photos",
    ],
    wont: "Promise new jobs, or quote prices outside your approved price list.",
    proof: "Be our first HVAC & plumbing trial.",
    recommendation: "Recommended: Growth. 30-day free trial.",
    planIds: ["growth"],
    trialDays: 30,
    faqs: [
      {
        question: "Customers want a human.",
        answer:
          "At 11 p.m. the real alternative is voicemail; emergencies go straight to your on-call tech.",
      },
      {
        question: "Is this lead gen?",
        answer: "No. It answers the calls you already get.",
      },
      {
        question: "Jobber has a $29 add-on.",
        answer:
          "If you only need basic answering, that may suit you. We set it up around your own triage rules and tune it monthly.",
      },
    ],
  },
  {
    slug: "vet-clinics",
    name: "Vet Clinics",
    navLabel: "Vet Clinics",
    metaTitle: "The Red-Flag Night Line | Vocemi",
    description:
      "Urgent pet calls sent to your emergency partner, appointments booked, refill requests waiting for you in the morning.",
    h1: "The Red-Flag Night Line",
    sub: "Urgent pet calls sent to your emergency partner, appointments booked, refill requests waiting for you in the morning.",
    handles: [
      "Appointment booking",
      "Red-flag symptom calls routed to your chosen emergency hospital",
      "Refill and records requests queued for staff",
      "After-hours enquiries",
    ],
    wont: "Diagnose, recommend doses, or give veterinary advice.",
    proof: "Be our first vet clinic trial.",
    recommendation: "Recommended: Growth. 14-day free trial.",
    planIds: ["growth"],
    trialDays: 14,
    faqs: [
      {
        question: "What about emergencies?",
        answer:
          "It never gives advice. It routes urgent calls to your emergency partner and alerts you.",
      },
      {
        question: "Will staff lose their jobs?",
        answer: "It covers the calls your team can't get to.",
      },
    ],
  },
];

export function getIndustryGuide(slug: string) {
  return industryGuides.find((industry) => industry.slug === slug);
}
