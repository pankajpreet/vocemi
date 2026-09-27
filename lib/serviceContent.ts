export interface ServiceGuide {
  slug: string;
  name: string;
  metaTitle: string;
  title: string;
  description: string;
  intro: string;
  handles: string[];
  controls: string[];
  launchSteps: string[];
  example: {
    client: string;
    context: string;
    details: string[];
  };
}

export const serviceGuides: ServiceGuide[] = [
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    metaTitle: "AI Receptionist for Calls & Booking | Vocemi",
    title: "AI receptionist for answering, qualification, and booking",
    description:
      "See how a Vocemi AI receptionist can answer routine calls, collect caller details, offer approved appointment times, and hand exceptions to your team.",
    intro:
      "Start with one repeatable call workflow. Vocemi follows the questions, booking rules, and escalation paths you approve before launch.",
    handles: [
      "Answer common questions using information you approve",
      "Collect the caller details your team needs",
      "Offer appointment times within your booking rules",
      "Route urgent, unusual, or sensitive calls to a person",
    ],
    controls: [
      "You approve the call flow and information the agent can use",
      "Pricing exceptions and unusual requests wait for human approval",
      "Calls and outcomes can be included in an owner report",
      "The workflow is adjusted using real call patterns after launch",
    ],
    launchSteps: [
      "Choose the first call type worth automating",
      "Define questions, booking rules, and escalation boundaries",
      "Test expected calls and edge cases",
      "Launch, review, and improve the approved workflow",
    ],
    example: {
      client: "3D Lifestyle",
      context: "Med spa call coverage",
      details: [
        "The receptionist workflow answers calls while the front desk is helping clients in person.",
        "Routine enquiries can continue without requiring a staff member to leave the client in front of them.",
      ],
    },
  },
  {
    slug: "lead-reactivation",
    name: "Lead Reactivation",
    metaTitle: "AI Lead Reactivation Calls | Vocemi",
    title: "Lead reactivation calls built around an approved workflow",
    description:
      "Use a defined Voice AI workflow to contact an approved list, capture interest, offer an allowed next step, and route exceptions to your team.",
    intro:
      "Lead reactivation works best as a controlled campaign: you choose the contacts, message, offer, booking rules, and situations that require a person.",
    handles: [
      "Work through a contact list approved by your business",
      "Use the campaign message and questions you provide",
      "Capture interest and offer an approved next step",
      "Route questions outside the approved script to your team",
    ],
    controls: [
      "Your business defines who may be contacted and under which rules",
      "The agent stays inside the approved message and offer",
      "Unusual questions or requests wait for your team",
      "Campaign outcomes can be reviewed before the next iteration",
    ],
    launchSteps: [
      "Confirm the audience and campaign objective",
      "Approve the script, offer, opt-out handling, and escalation rules",
      "Test the conversation with common objections",
      "Run a controlled campaign and review the outcomes",
    ],
    example: {
      client: "3D Lifestyle",
      context: "Past-client re-engagement",
      details: [
        "A lead reactivation workflow works through past clients.",
        "Interested clients can be guided toward the next approved booking step.",
      ],
    },
  },
];

export function getServiceGuide(slug: string) {
  return serviceGuides.find((service) => service.slug === slug);
}
