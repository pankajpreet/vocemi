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
    name: "Comeback Sprints",
    description:
      "The AI reaches out to past customers who've agreed to hear from you, books them back in, and routes anything outside the script to your team. Up to 300 contacts per sprint.",
  },
];
