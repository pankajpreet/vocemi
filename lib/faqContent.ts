import { pricingFaqs } from "@/lib/plans";

/**
 * /faq questions. The pricing answers come from lib/plans.ts so they match
 * /pricing word for word. Every question here is included in FAQPage JSON-LD.
 */

const generalFaqs: { question: string; answer: string }[] = [
  {
    question: "What does Vocemi leave to a person?",
    answer:
      "A next step is booked only inside rules you approve. Anything else waits for a human. Pricing exceptions, unusual requests, and judgment calls wait for an approved person, and unusual jobs pause for your sign-off.",
  },
  {
    question: "What can the AI receptionist workflow handle?",
    answer:
      "The AI receptionist page says it answers from information you approve, collects the caller details your team needs, offers appointment times within your booking rules, and routes urgent, unusual, or sensitive calls to a person. The guide is at /services/ai-receptionist.",
  },
  {
    question: "What do you approve before an AI receptionist goes live?",
    answer:
      "You approve the call flow, the answers it may give, and the booking rules before launch. The page's steps are to pick the call type, write those rules, test expected calls and edge cases, then go live and review real calls.",
  },
  {
    question: "How is a Comeback Sprint (lead reactivation) limited?",
    answer:
      "You choose the contacts, the message, the offer, the booking rules, and the situations that require a person. The agent stays inside the approved message and offer. Unusual questions wait for your team, and outcomes can be reviewed before the next run. The guide on Canada's calling rules says these workflows start with the contact list, the consent basis, and the script before anyone is called. The lead reactivation page, including whether those calls are legal, is at /services/lead-reactivation.",
  },
  {
    question: "What does the site say about outbound AI calls in Canada?",
    answer:
      "The guide on AI voice calls and Canada's telemarketing rules says outbound calls in Canada fall under the CRTC's Unsolicited Telecommunications Rules, which cover telemarketing, the National Do Not Call List, and automated calls. It says the safe assumption is that an AI voice agent placing calls falls under the rules for automatic dialing-announcing devices, that sales or marketing calls made that way need the person's express consent, and that follow-up texts and emails fall under Canada's anti-spam law (CASL), not the telemarketing rules. The guide is a plain-language overview, not legal advice, and it says to check with a lawyer before running an outbound calling program. It is published at /blog/ai-voice-calls-canada-crtc-rules.",
  },
  {
    question: "Which industries is Vocemi built for?",
    answer:
      "Vocemi is built for four industries: insurance brokerages, med spas, HVAC and plumbing companies, and vet clinics. Each has its own page covering what the AI handles, what it won't do, and the recommended plan. Businesses that need the AI connected to their own software can use the Custom plan, priced after a free audit.",
  },
  {
    question: "Can an AI receptionist book into a calendar?",
    answer:
      "Yes. Vocemi connects Google Calendar, Outlook, and Cal.com. The agent offers real times inside your booking rules. A booking confirmation goes out by SMS and by email.",
  },
  {
    question: "What does the owner receive after calls?",
    answer:
      "On every plan you get an email summary of every call and an instant text about urgent calls. Growth adds a daily digest of all calls and a monthly tuning call with us. Plan details are on /pricing.",
  },
  {
    question: "What is written down before a client Voice AI project goes live?",
    answer:
      "The security page says a client project can use different tools and data from this website, so the exact recording, access, retention, and deletion rules are documented before launch. That write-up covers what gets recorded or stored, which providers process it, who can access it, how exceptions reach a person, how long information is retained, and how correction or deletion requests are handled.",
  },
  {
    question: "Which providers does the vocemi.com website use?",
    answer:
      "The security page lists them: an analytics service that counts visits and selected actions, the voice provider and bot check behind the live demo (only after you start it), the booking scheduler, and the email service that delivers the contact form. The privacy page says Vocemi does not sell the information you submit, and does not share it except with those providers.",
  },
  {
    question: "How do I contact Vocemi?",
    answer:
      "Email business@vocemi.com, use the form on /contact, start a free trial at /free-trial, or book a free audit. Vocemi is in Calgary, Alberta, Canada, and the published phone number is (437) 332-5220.",
  },
  {
    question: "Who founded Vocemi, and where is the business based?",
    answer:
      "Pankajpreet Singh is the founder. The about page describes Vocemi as a Calgary-based Voice AI business focused on answering, qualification, booking, follow-up, and clear reporting. He is a Senior Developer at Arctic Wolf and holds a B.Tech in Computer Science and Engineering from Punjab Technical University.",
  },
  {
    question: "How long does it take to go live?",
    answer:
      "Live in 7 days. We build it for you, with your greeting, approved answers, booking rules and handoffs, and then your free trial starts: 14 days, or 30 for HVAC and plumbing.",
  },
  {
    question: "Does Vocemi work with businesses outside Calgary?",
    answer:
      "Yes. Vocemi is based in Calgary and serves businesses across Canada and the US. Prices are available in USD and CAD. No street address is published.",
  },
  {
    question: "Does Vocemi publish a list of languages the voice agent speaks?",
    answer:
      "The receptionist is built for English. It can support more than one language, and no language other than English is named as production-ready. The multilingual guide is about how to test a language with real callers, not a list of extra languages Vocemi offers.",
  },
  {
    question: "What call-recording notice do callers hear?",
    answer:
      "The greeting, including any recording notice, is written for that client. Vocemi is not a self-serve platform.",
  },
  {
    question: "What kinds of calls are handed to a licensed or on-call person?",
    answer:
      "At med spas, medical and treatment questions go to licensed staff. At brokerages, quotes, binding and coverage advice always go to a licensed broker. At vet clinics, it never diagnoses or recommends doses, and red-flag symptom calls go to the emergency hospital you choose. For HVAC and plumbing, emergencies are triaged by your rules, the on-call tech is alerted, and your gas-smell safety script is read first.",
  },
]

export const pageFaqs: { question: string; answer: string }[] = [
  ...pricingFaqs,
  ...generalFaqs,
];
