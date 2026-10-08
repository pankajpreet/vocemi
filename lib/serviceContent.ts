/** Card labels for the footer, /services, and industry related links. */
export interface ServiceGuide {
  slug: string;
  name: string;
  description: string;
}

export const serviceGuides: ServiceGuide[] = [
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    description:
      "Answers routine calls from information you approve, collects caller details, offers appointment times within your booking rules, and routes urgent or unusual calls to a person.",
  },
  {
    slug: "lead-reactivation",
    name: "Lead Reactivation",
    description:
      "Works through a contact list you approve, uses the campaign message you provide, offers an approved next step, and routes anything outside that script to your team.",
  },
];
