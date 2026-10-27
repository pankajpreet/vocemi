/**
 * Industry pages at /industries/[slug], all on one template.
 *
 * Example calls are illustrations of how a workflow would run, not transcripts
 * of real calls, and the page labels them that way. Proof lines are only what
 * the owner has approved: the unnamed brokerage figure, the named 3D Lifestyle
 * client, or an honest "be our first" for industries with no client yet.
 */
import type { PlanId } from "@/lib/plans";

export type IndustryIcon = "insurance" | "medspa" | "hvac" | "vet";

export interface IndustryGuide {
  slug: string;
  /** Nav and tile label. */
  name: string;
  /** Lowercase noun for "For {audience}". */
  audience: string;
  /** Value of the free-trial form's industry select. */
  trialIndustry: string;
  icon: IndustryIcon;
  tint: string;
  ink: string;
  metaTitle: string;
  description: string;
  /** The offer name, used as the H1. */
  offerName: string;
  sub: string;
  /** One line for the industry tiles. */
  tileLine: string;
  handles: { title: string; desc: string }[];
  wontDo: string;
  proof:
    | { kind: "stat"; value: number; label: string; detail: string; brokerReference?: boolean }
    | { kind: "client"; name: string; detail: string }
    | { kind: "first"; text: string; detail: string };
  recommended: { planId: PlanId; note: string };
  trialDays: number;
  /** Free first lead reactivation campaign called out with the plan. */
  bonus?: boolean;
  exampleCall: {
    setup: string;
    lines: { speaker: "Caller" | "Agent"; text: string }[];
    outcome: string;
  };
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
  relatedPosts: string[];
}

export const industryGuides: IndustryGuide[] = [
  {
    slug: "insurance",
    name: "Insurance",
    audience: "insurance brokerages",
    trialIndustry: "insurance",
    icon: "insurance",
    tint: "#EAF3FB",
    ink: "#2C6FB0",
    metaTitle: "AI Receptionist for Insurance Brokerages: Free 14-Day Trial | Vocemi",
    description:
      "The Broker-Ready Intake Desk: new-quote calls captured and handed to a licensed broker, after hours and when your team is busy. $0 setup, live in 7 days, free for 14.",
    offerName: "The Broker-Ready Intake Desk",
    sub: "New-quote calls captured and handed to a licensed broker, after hours and when your team is busy. Live in 7 days.",
    tileLine: "New-quote intake and routing, handed to a licensed broker.",
    handles: [
      {
        title: "New-quote intake",
        desc: "Contact details, what they want covered, current insurer and renewal date.",
      },
      {
        title: "Policy-service requests",
        desc: "Routed to the right broker, with a written summary.",
      },
      {
        title: "Urgent claim callbacks",
        desc: "Flagged to you right away.",
      },
      {
        title: "Broker callbacks",
        desc: "Booked into your calendar, inside your rules.",
      },
    ],
    wontDo:
      "Quote prices, bind policies, or give coverage advice. Those always go to a licensed broker.",
    proof: {
      kind: "stat",
      value: 776,
      label: "calls answered in April 2026 for an insurance brokerage",
      detail: "New-quote intake and routing to the right broker, averaging 3 min 16 s a call.",
      brokerReference: true,
    },
    recommended: {
      planId: "growth",
      note: "Growth for most brokerages. Scale for brokerages taking 30+ calls a day.",
    },
    trialDays: 14,
    exampleCall: {
      setup: "A caller rings at 7:40 p.m. wanting a home insurance quote before their renewal.",
      lines: [
        { speaker: "Agent", text: "Thanks for calling. I'm the brokerage's AI assistant. How can I help?" },
        { speaker: "Caller", text: "My home insurance renews next month and I want a better price." },
        { speaker: "Agent", text: "I can get a broker started on that. Who's your current insurer, and what's the renewal date?" },
        { speaker: "Caller", text: "It's with my bank, renews on the 14th. Can you tell me what you'd charge?" },
        { speaker: "Agent", text: "A licensed broker will go over pricing with you. I've noted your details, and I can book their callback for tomorrow at 10 or 2." },
      ],
      outcome:
        "Quote details captured, the pricing question left with a licensed broker, and a callback booked with a written summary.",
    },
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
    relatedServices: ["ai-receptionist", "lead-reactivation"],
    relatedPosts: ["ai-voice-calls-canada-crtc-rules", "multilingual-voice-ai-calgary"],
  },
  {
    slug: "med-spas",
    name: "Med Spas",
    audience: "med spas",
    trialIndustry: "med-spa",
    icon: "medspa",
    tint: "#FBEAF0",
    ink: "#C0326F",
    metaTitle: "AI Receptionist for Med Spas: Free 14-Day Trial | Vocemi",
    description:
      "The Consult Comeback System: after-hours enquiries answered, consults booked, and lapsed clients invited back. $0 setup, live in 7 days, free for 14.",
    offerName: "The Consult Comeback System",
    sub: "After-hours enquiries answered and consults booked, and lapsed clients invited back.",
    tileLine: "Consults booked after hours, lapsed clients invited back.",
    handles: [
      {
        title: "Consult and appointment booking",
        desc: "Offers real times from your calendar and texts a confirmation.",
      },
      {
        title: "After-hours enquiries",
        desc: "Evening and weekend calls from ads and social posts, answered while interest is high.",
      },
      {
        title: "Prices and FAQs",
        desc: "Answered from your approved list, word for word.",
      },
      {
        title: "Lead reactivation",
        desc: "Reaches lapsed clients who've agreed to hear from you and books them back in.",
      },
    ],
    wontDo: "Give medical or treatment advice. Those questions go to your licensed staff.",
    proof: {
      kind: "client",
      name: "3D Lifestyle, Calgary NE",
      detail:
        "Answering after-hours calls for this Calgary NE med spa, and bringing lapsed clients back.",
    },
    recommended: {
      planId: "growth",
      note: "Growth, plus a free lead reactivation campaign to bring past clients back when you move to a paid plan.",
    },
    trialDays: 14,
    bonus: true,
    exampleCall: {
      setup: "A caller rings at 8:40 p.m. after seeing an Instagram post about lip filler.",
      lines: [
        { speaker: "Agent", text: "Thanks for calling. I'm the clinic's AI assistant. How can I help?" },
        { speaker: "Caller", text: "How much is lip filler, and do I need a consult first?" },
        { speaker: "Agent", text: "New clients start with a consultation. I can text you our approved treatment menu with prices. Would you like to book a consult?" },
        { speaker: "Caller", text: "Sure, weekends only. Is it safe if I'm breastfeeding?" },
        { speaker: "Agent", text: "That's one for our clinical team, so I'll have a nurse call you. For weekends I have Saturday at 11 or 2. Which works?" },
      ],
      outcome:
        "Consult booked for Saturday, the menu texted, and the clinical question flagged for a nurse callback.",
    },
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
    relatedServices: ["ai-receptionist", "lead-reactivation"],
    relatedPosts: ["full-duplex-voice-ai-business-calls", "ai-receptionist-vs-answering-service"],
  },
  {
    slug: "hvac-plumbing",
    name: "HVAC & Plumbing",
    audience: "HVAC and plumbing companies",
    trialIndustry: "hvac-plumbing",
    icon: "hvac",
    tint: "#FDF6E8",
    // Darker than the #C97A12 glyph colour used elsewhere so text on the
    // tint and on white clears WCAG AA.
    ink: "#9A5B07",
    metaTitle: "AI Answering for HVAC & Plumbing: Free 30-Day Trial | Vocemi",
    description:
      "The No-Heat Night Desk: no-heat and leak calls triaged, your on-call tech alerted, routine jobs booked. $0 setup, live in 7 days, free for 30.",
    offerName: "The No-Heat Night Desk",
    sub: "No-heat and leak calls triaged, your on-call tech alerted, routine jobs booked. Live in 7 days.",
    tileLine: "No-heat and leak calls triaged, on-call tech alerted.",
    handles: [
      {
        title: "Emergency vs. routine triage",
        desc: "Sorted by your rules, every time.",
      },
      {
        title: "Your gas-smell safety script",
        desc: "Read first on any gas-smell call, exactly as you approved it.",
      },
      {
        title: "On-call tech alerts",
        desc: "The address and a summary, sent to your on-call tech right away.",
      },
      {
        title: "Routine work booked",
        desc: "Tune-ups and repairs booked into your calendar.",
      },
      {
        title: "Photo links by text",
        desc: "Texts the caller a link to send photos of the problem.",
      },
    ],
    wontDo: "Promise new jobs, or quote prices outside your approved price list.",
    proof: {
      kind: "first",
      text: "Be our first HVAC & plumbing trial.",
      detail:
        "We're onboarding our first HVAC and plumbing companies now, with a 30-day free trial instead of 14.",
    },
    recommended: {
      planId: "growth",
      note: "Growth, with a 30-day free trial.",
    },
    trialDays: 30,
    exampleCall: {
      setup: "It's 10:15 p.m. in January and a homeowner's furnace has stopped.",
      lines: [
        { speaker: "Agent", text: "Thanks for calling. I'm the company's AI assistant. What's going on?" },
        { speaker: "Caller", text: "Our furnace just quit and it's freezing. We have a baby at home." },
        { speaker: "Agent", text: "Let's get you help. First, do you smell gas anywhere in the house?" },
        { speaker: "Caller", text: "No gas smell. It's just blowing cold air." },
        { speaker: "Agent", text: "With no heat and an infant at home, that's an emergency under our rules. I'm alerting the on-call technician now, and they'll call you within fifteen minutes." },
      ],
      outcome:
        "The gas-safety question asked first, the call classed as an emergency by the company's rules, and the on-call tech alerted with the address.",
    },
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
    relatedServices: ["ai-receptionist", "lead-reactivation"],
    relatedPosts: ["full-duplex-voice-ai-business-calls", "missed-call-statistics"],
  },
  {
    slug: "vet-clinics",
    name: "Vet Clinics",
    audience: "vet clinics",
    trialIndustry: "vet-clinic",
    icon: "vet",
    tint: "#EAF6EE",
    ink: "#1B7C52",
    metaTitle: "AI Receptionist for Vet Clinics: Free 14-Day Trial | Vocemi",
    description:
      "The Red-Flag Night Line: urgent pet calls sent to your emergency partner, appointments booked, refill requests waiting for you in the morning. $0 setup, live in 7 days.",
    offerName: "The Red-Flag Night Line",
    sub: "Urgent pet calls sent to your emergency partner, appointments booked, refill requests waiting for you in the morning.",
    tileLine: "Urgent pet calls routed, appointments booked overnight.",
    handles: [
      {
        title: "Appointment booking",
        desc: "Wellness visits and sick-pet appointments, inside your rules.",
      },
      {
        title: "Red-flag symptom calls",
        desc: "Routed to the emergency hospital you choose, and you're alerted.",
      },
      {
        title: "Refill and records requests",
        desc: "Queued for your staff, waiting in the morning.",
      },
      {
        title: "After-hours enquiries",
        desc: "Hours, services and directions, answered from your approved list.",
      },
    ],
    wontDo: "Diagnose, recommend doses, or give veterinary advice.",
    proof: {
      kind: "first",
      text: "Be our first vet clinic trial.",
      detail: "We're onboarding our first vet clinics now, with the same 14-day free trial.",
    },
    recommended: {
      planId: "growth",
      note: "Growth, with a 14-day free trial.",
    },
    trialDays: 14,
    exampleCall: {
      setup: "A pet owner calls at 11:30 p.m. after their dog ate something from the counter.",
      lines: [
        { speaker: "Agent", text: "Thanks for calling. I'm the clinic's AI assistant. The clinic is closed. What's happening with your pet?" },
        { speaker: "Caller", text: "My dog just ate a bunch of chocolate. Is that dangerous?" },
        { speaker: "Agent", text: "I can't give medical advice, but the clinic treats this as urgent. Please call the emergency hospital the clinic works with. I'm texting you their number and address now." },
        { speaker: "Caller", text: "Okay, thank you. Can you let my vet know?" },
        { speaker: "Agent", text: "Yes. I've noted it for the team, and they'll see it first thing in the morning." },
      ],
      outcome:
        "No advice given, the owner sent to the clinic's emergency partner by text, and the team alerted with a summary.",
    },
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
    relatedServices: ["ai-receptionist", "lead-reactivation"],
    relatedPosts: ["missed-call-statistics", "ai-receptionist-vs-answering-service"],
  },
];

export function getIndustryGuide(slug: string) {
  return industryGuides.find((industry) => industry.slug === slug);
}
