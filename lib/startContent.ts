/**
 * Copy for the /start landing page — the destination of the QR code on the
 * Vocemi business card.
 *
 * The page has exactly three jobs, in this order: let the visitor talk to the
 * AI, let them watch the demo, let them book. Anything that competes with
 * those three for attention doesn't belong here.
 */

export type CapabilityIcon = "phone" | "calendar" | "followup" | "automate";

export interface Capability {
  icon: CapabilityIcon;
  tint: string;
  title: string;
  desc: string;
}

/**
 * Distinct from the homepage H1 ("Stop sending your callers to voicemail.").
 */
export const heroHeadline = {
  lead: "Meet the AI receptionist",
  emphasis: "that picks up the calls you miss",
};

export const heroStats = [
  { value: "7 days", label: "to go live" },
  { value: "14 days", label: "free to try" },
  { value: "$0", label: "setup" },
];

export const capabilities: Capability[] = [
  {
    icon: "phone",
    tint: "#EEF0FE",
    title: "Answers the calls you miss",
    desc: "After hours, weekends, and while you're already on a job. It tells callers it's an AI.",
  },
  {
    icon: "calendar",
    tint: "#EAF6EE",
    title: "Books the appointment",
    desc: "Checks your calendar, offers real times, and puts the job on the books during the call.",
  },
  {
    icon: "followup",
    tint: "#FDF6E8",
    title: "Flags urgent calls",
    desc: "Texts you right away when a call can't wait, and hands it to your team.",
  },
  {
    icon: "automate",
    tint: "#F3ECFB",
    title: "Handles the busywork",
    desc: "Sends confirmations, updates your CRM, and emails you one summary each morning.",
  },
];

/**
 * The four industries Vocemi is built for, in nav order.
 * `slug` links the chip to its /industries page where one exists.
 */
export const industries: { name: string; slug?: string }[] = [
  { name: "Insurance", slug: "insurance" },
  { name: "Med Spas", slug: "med-spas" },
  { name: "HVAC & Plumbing", slug: "hvac-plumbing" },
  { name: "Vet Clinics", slug: "vet-clinics" },
];

/** Shown inside the live-demo card so the visitor knows what to try. */
export const demoPrompts = [
  "Ask about pricing",
  "Try to book an appointment",
  "Ask a question it shouldn't know",
];
