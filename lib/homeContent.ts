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
    ink: "#C0326F",
    industry: "Med spa",
    outcomes: [
      "Answers after-hours calls, so an evening enquiry gets a reply instead of voicemail.",
      "A Comeback Sprint works through past clients who've agreed to hear from the spa and books them back in.",
    ],
  },
  {
    name: "Jag Duggal",
    accent: "Jag",
    sub: "Insurance broker",
    initials: "JD",
    tint: "#EAF3FB",
    ink: "#2C6FB0",
    industry: "Insurance",
    outcomes: [
      "Takes new-quote details when the broker can't get to the phone, and hands them over with a summary.",
      "Clients start a quote whenever it suits them, instead of waiting for a call back.",
    ],
  },
  {
    name: "Jag Duggal",
    accent: "Jag",
    sub: "Real Estate Expert",
    initials: "JD",
    tint: "#EAF6EE",
    ink: "#1B7C52",
    // Not "Real estate" — that stutters against the "Real Estate Expert"
    // sub-label, and property management is what the AI actually handles.
    industry: "Property management",
    outcomes: [
      "Handles tenant enquiries and complaints as they come in, day or night.",
      "Takes the routine property management admin off the team.",
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

// `href` points at a service's own guide page where one exists, and at the
// overview otherwise, so every card is a crawlable link.
export const homeServices: {
  title: string;
  desc: string;
  tint: string;
  icon: ServiceIcon;
  href: string;
}[] = [
  {
    title: "Voice Bot Development",
    desc: "Custom conversational voice bots for support, lead qualification, and automated assistance.",
    tint: "#EEF0FE",
    icon: "circle",
    href: "/services",
  },
  {
    title: "AI Receptionist",
    desc: "24/7 virtual receptionist that answers, schedules, routes callers, and handles inquiries.",
    tint: "#EAF6EE",
    icon: "square",
    href: "/services/ai-receptionist",
  },
  {
    title: "Appointment Management",
    desc: "Automated scheduling, confirmations, and reminders that reduce no-shows.",
    tint: "#FDF6E8",
    icon: "diamond",
    href: "/services",
  },
  {
    title: "Qualification & Lead Gen",
    desc: "Voice systems that qualify leads, capture details, and route hot prospects to sales.",
    tint: "#F3ECFB",
    icon: "target",
    href: "/services",
  },
  {
    title: "Lead Reactivation",
    desc: "AI calls dormant leads and past customers to re-engage them and book them back in.",
    tint: "#FBEAF0",
    icon: "refresh",
    href: "/services/lead-reactivation",
  },
  {
    title: "Voice Analytics & Insights",
    desc: "Turn calls into data with sentiment analysis, transcription, and performance metrics.",
    tint: "#EAF3FB",
    icon: "bars",
    href: "/services",
  },
];

export const workflowSteps = [
  {
    num: "01",
    title: "Free missed-call audit",
    desc: "Optional. We look at when calls go unanswered and what they're worth.",
  },
  {
    num: "02",
    title: "We build it in 7 days",
    desc: "Your greeting, answers, booking rules and handoffs, set up for your industry.",
  },
  {
    num: "03",
    title: "Free 14-day trial",
    desc: "Forward the calls you miss and watch it work. 30 days for HVAC & plumbing.",
  },
  {
    num: "04",
    title: "Keep it or walk away",
    desc: "Pick a plan, or owe nothing. No card needed to start.",
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

export type BenefitIcon = "productivity" | "experience" | "available" | "cost" | "insights" | "growth";

export const homeBenefits: { icon: BenefitIcon; title: string; desc: string }[] = [
  { icon: "productivity", title: "Increased Productivity", desc: "Automate routine calls and free your team for higher-value work." },
  { icon: "experience", title: "Better Customer Experience", desc: "24/7 personalized interactions that improve satisfaction." },
  { icon: "available", title: "After-hours coverage", desc: "Evening and weekend calls answered instead of sent to voicemail." },
  { icon: "cost", title: "$0 setup", desc: "We build it for you, and the first 14 days are free." },
  { icon: "insights", title: "Data-Driven Insights", desc: "Every call becomes a data point you can act on." },
  { icon: "growth", title: "Scalable Growth", desc: "Handle more volume without a proportional headcount increase." },
];

export const humanCons = [
  "Months to hire and train",
  "Works scheduled hours only",
  "One person, one queue",
  "Sick days and turnover",
  "Manual tool updates",
];

export const aiPros = [
  "Live in 7 days",
  "Answers after hours and when you're busy",
  "Answers several calls at once",
  "Covers the calls your team can't get to",
  "Updates your tools automatically",
];
