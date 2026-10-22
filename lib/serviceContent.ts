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
    name: "Comeback Sprint",
    description:
      "The AI reaches out to past customers who've agreed to hear from you and books them back in. Up to 300 contacts per sprint. $497 each (C$699). The first sprint is free when you move to a paid plan.",
  },
];
