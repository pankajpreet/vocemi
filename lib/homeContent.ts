export interface ClientLogo {
  /** The client's name, set as a wordmark. Doubles as alt text when src is set. */
  name: string;
  /** The leading word, picked out in brand blue so each mark reads distinctly. */
  accent?: string;
  /** Location or role, set smaller beneath the name. */
  sub: string;
  /** Monogram used in place of a logo mark. */
  initials: string;
  /** Monogram tile background and letter colour. */
  tint: string;
  ink: string;
  /** Sector label, used on the case-study cards. */
  industry: string;
  /**
   * What the AI employee actually handles for them. Written as work done,
   * not as performance claims — the only number here is the one the client
   * gave us, and nothing else should be invented to sit alongside it.
   */
  outcomes: string[];
  /**
   * Set once a real logo file exists in public/logos and the client has
   * agreed to it being shown. Until then the wordmark is used — better an
   * honest piece of type than an approximation of someone's trademark.
   */
  src?: string;
}

export const clientLogos: ClientLogo[] = [
  {
    name: "3D Lifestyle",
    accent: "3D",
    sub: "Calgary NE",
    initials: "3D",
    tint: "#FBEAF0",
    ink: "#D14F87",
    industry: "Med spa",
    outcomes: [
      "Answers every call, so a client is never missed because the front desk was busy with someone in the room.",
      "A lead reactivation agent works through past clients and brings them back in.",
    ],
  },
  {
    name: "iSmart Insurance",
    accent: "iSmart",
    sub: "Jag Duggal",
    initials: "iS",
    tint: "#EAF3FB",
    ink: "#2C6FB0",
    industry: "Insurance",
    outcomes: [
      "Collects quote details without a broker on the call — roughly 10 minutes saved on every quote.",
      "Clients start a quote request whenever it suits them, instead of waiting for a broker to be free.",
    ],
  },
  {
    name: "Jag Duggal",
    accent: "Jag",
    sub: "Real Estate Expert",
    initials: "JD",
    tint: "#EAF6EE",
    ink: "#1F8F5F",
    // Not "Real estate" — that stutters against the "Real Estate Expert"
    // sub-label, and property management is what the AI actually handles.
    industry: "Property management",
    outcomes: [
      "Handles tenant enquiries and complaints as they come in, day or night.",
      "Takes the routine property management admin off the team, cutting the hours and staffing cost behind it.",
    ],
  },
];

export type ServiceIcon =
  | "circle"
  | "square"
  | "diamond"
  | "target"
  | "bars"
  | "refresh";

export const homeServices: { title: string; desc: string; tint: string; icon: ServiceIcon }[] = [
  {
    title: "Voice Bot Development",
    desc: "Custom conversational voice bots for support, lead qualification, and automated assistance.",
    tint: "#EEF0FE",
    icon: "circle",
  },
  {
    title: "AI Receptionist",
    desc: "24/7 virtual receptionist that answers, schedules, routes callers, and handles inquiries.",
    tint: "#EAF6EE",
    icon: "square",
  },
  {
    title: "Appointment Management",
    desc: "Automated scheduling, confirmations, and reminders that reduce no-shows.",
    tint: "#FDF6E8",
    icon: "diamond",
  },
  {
    title: "Qualification & Lead Gen",
    desc: "Voice systems that qualify leads, capture details, and route hot prospects to sales.",
    tint: "#F3ECFB",
    icon: "target",
  },
  {
    title: "Lead Reactivation",
    desc: "AI calls dormant leads and past customers to re-engage them and book them back in.",
    tint: "#FBEAF0",
    icon: "refresh",
  },
  {
    title: "Voice Analytics & Insights",
    desc: "Turn calls into data with sentiment analysis, transcription, and performance metrics.",
    tint: "#EAF3FB",
    icon: "bars",
  },
];

export const workflowSteps = [
  {
    num: "01",
    title: "Inquiry arrives",
    desc: "Call, text, form, or web chat — Vocemi is listening on every channel.",
  },
  {
    num: "02",
    title: "AI qualifies",
    desc: "Service, urgency, and details are captured in a natural conversation.",
  },
  {
    num: "03",
    title: "Next step is booked",
    desc: "Only inside your approved rules — anything else waits for a human.",
  },
  {
    num: "04",
    title: "You get the report",
    desc: "Tools update automatically and a daily summary lands in your inbox.",
  },
];

export const dashboardPoints = [
  {
    title: "Approval required",
    desc: "Pricing exceptions and unusual jobs pause for your sign-off.",
  },
  {
    title: "Nothing hidden",
    desc: "Every call is transcribed, logged, and searchable.",
  },
  {
    title: "Improves monthly",
    desc: "We tune the workflow based on real calls, not guesses.",
  },
];

export const reportStats = [
  { value: "38", label: "Inquiries answered" },
  { value: "21", label: "Visits booked" },
  { value: "6", label: "Follow-ups open" },
  { value: "3", label: "Needing approval" },
];

export const homeBenefits = [
  { num: "01", title: "Increased Productivity", desc: "Automate routine calls and free your team for higher-value work." },
  { num: "02", title: "Better Customer Experience", desc: "24/7 personalized interactions that improve satisfaction." },
  { num: "03", title: "Always Available", desc: "Round-the-clock coverage without downtime or missed shifts." },
  { num: "04", title: "Cost Reduction", desc: "Cut manual overhead and route budget to growth instead." },
  { num: "05", title: "Data-Driven Insights", desc: "Every call becomes a data point you can act on." },
  { num: "06", title: "Scalable Growth", desc: "Handle more volume without a proportional headcount increase." },
];

export const humanCons = [
  "Months to hire and train",
  "Works scheduled hours only",
  "One person, one queue",
  "Sick days and turnover",
  "Manual tool updates",
];

export const aiPros = [
  "Live in 2–4 weeks",
  "Answers 24/7, every day",
  "Handles unlimited concurrent calls",
  "Never calls in sick",
  "Updates your tools automatically",
];

export interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  priceSub: string;
  featured: boolean;
  ctaLabel: string;
  features: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    name: "AI Employee Audit",
    tagline: "Map the first workflow worth automating.",
    price: "$250",
    priceSub: "one-time, credited toward setup",
    featured: false,
    ctaLabel: "Book the audit",
    features: [
      "Workflow & channel map",
      "Approval rules defined",
      "Clear finish line",
      "Build recommendation",
    ],
  },
  {
    name: "One-Workflow AI Employee",
    tagline: "One defined workflow, fully handled.",
    price: "$1,500",
    priceSub: "setup + $750/mo",
    featured: true,
    ctaLabel: "Book a Call",
    features: [
      "One AI employee role",
      "Phone, inbox, or forms",
      "Approval gates",
      "Daily owner report",
    ],
  },
  {
    name: "Managed AI Employee",
    tagline: "A managed employee across your tools.",
    price: "$3,000",
    priceSub: "setup + $1,500/mo",
    featured: false,
    ctaLabel: "Book a Call",
    features: [
      "Phone, inbox, calendar, CRM",
      "Booking & follow-up",
      "Escalation rules",
      "Monthly improvement review",
    ],
  },
];

export const homeFaqs = [
  {
    q: "What is Voice AI and how can it help my business?",
    a: "Voice AI uses natural language processing and speech recognition to understand and respond to callers. It automates support, provides 24/7 coverage, and handles routine inquiries so your team can focus on judgment calls.",
  },
  {
    q: "How long does it take to implement?",
    a: "Simple voice bots typically launch in 2–4 weeks. Comprehensive custom builds can take 6–12 weeks. We confirm a timeline during your audit.",
  },
  {
    q: "Do I need technical expertise?",
    a: "No. We handle development, integration, and give you a plain-language dashboard. Training and documentation are included.",
  },
  {
    q: "How do you handle data privacy and security?",
    a: "Enterprise-grade encryption, anonymization, and compliance with GDPR, CCPA, and other regulations. You retain full ownership of your data.",
  },
  {
    q: "What industries can benefit?",
    a: "Healthcare, retail, finance, hospitality, real estate, home services, and any business with regular customer calls.",
  },
];
