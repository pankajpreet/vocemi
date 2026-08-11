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

export const heroStats = [
  { value: "24/7", label: "always answering" },
  { value: "2–4 wks", label: "to first launch" },
  { value: "100%", label: "calls logged" },
];

export const capabilities: Capability[] = [
  {
    icon: "phone",
    tint: "#EEF0FE",
    title: "Answers every call",
    desc: "First ring, every time — after hours, weekends, and while you're already on a job.",
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
    title: "Follows up on leads",
    desc: "Texts and calls the people who didn't book yet, so quotes stop going cold.",
  },
  {
    icon: "automate",
    tint: "#F3ECFB",
    title: "Handles the busywork",
    desc: "Sends confirmations, updates your CRM, and emails you one summary each morning.",
  },
];

export const industries = [
  "Home Services",
  "HVAC & Plumbing",
  "Roofing",
  "Insurance",
  "Med Spas",
  "Dental",
  "Automotive",
  "Professional Services",
];

/** Shown inside the live-demo card so the visitor knows what to try. */
export const demoPrompts = [
  "Ask about pricing",
  "Try to book an appointment",
  "Ask a question it shouldn't know",
];
