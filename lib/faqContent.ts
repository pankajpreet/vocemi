/**
 * /faq questions. Pricing answers are the same list shown on /pricing.
 * Every question here is visible on the page and is included in FAQPage JSON-LD.
 */

import { comebackConsent, pricingFaqs } from "@/lib/pricingFaq";

const otherFaqs: { question: string; answer: string }[] = [
  {
    question: "What does Vocemi leave to a person?",
    answer:
      "It tells callers it's an AI. It doesn't give insurance quotes, coverage advice, medical or veterinary advice, or prices you haven't approved. It hands those to your team.",
  },
  {
    question: "What can the AI receptionist workflow handle?",
    answer:
      "It answers the calls you miss, books appointments into your calendar, and texts you a summary. Pricing is on /pricing.",
  },
  {
    question: "What do you approve before an AI receptionist goes live?",
    answer:
      "You approve the call flow, the answers it may give, and the booking rules before launch. It's live in 7 days.",
  },
  {
    question: "How is a Comeback Sprint limited?",
    answer: `${comebackConsent} Up to 300 contacts per sprint. The first sprint is free when you move from the free trial to any paid plan. More Comeback Sprints are $497 each (C$699). The guide is at /services/lead-reactivation.`,
  },
  {
    question: "What does the site say about outbound AI calls in Canada?",
    answer:
      "The guide on AI voice calls and Canada's telemarketing rules says outbound calls in Canada fall under the CRTC's Unsolicited Telecommunications Rules, which cover telemarketing, the National Do Not Call List, and automated calls. It says the safe assumption is that an AI voice agent placing calls falls under the rules for automatic dialing-announcing devices, that sales or marketing calls made that way need the person's express consent, and that follow-up texts and emails fall under Canada's anti-spam law (CASL), not the telemarketing rules. The guide is a plain-language overview, not legal advice, and it says to check with a lawyer before running an outbound calling program. It is published at /blog/ai-voice-calls-canada-crtc-rules.",
  },
  {
    question: "Which industries have a published Vocemi guide?",
    answer:
      "Insurance, med spas, HVAC & plumbing, and vet clinics. Each page covers what the AI handles, what it won't do, and the handoff to your team.",
  },
  {
    question: "Can an AI receptionist book into a calendar?",
    answer:
      "Yes. Booking into Google Calendar, Outlook or Cal.com, within your rules.",
  },
  {
    question: "What does the owner receive after calls?",
    answer:
      "Emails you a summary of every call. Growth and Scale include a daily digest of all calls. Urgent calls are flagged to you right away.",
  },
  {
    question: "What is written down before a client Voice AI project goes live?",
    answer:
      "We give you a written note covering what's recorded, where it's stored and how long it's kept.",
  },
  {
    question: "Which providers does the vocemi.com website use?",
    answer:
      "The security page names the website systems. Vercel Analytics counts visits and selected actions. The live voice demo runs only after you start it, with Google reCAPTCHA. Booking links open Cal.com. The contact form is delivered with Resend. The privacy page says Vocemi does not sell the information you submit, and does not share it except with those providers.",
  },
  {
    question: "How do I contact Vocemi?",
    answer:
      "Email business@vocemi.com, use the form on /contact, or book a call. Booking links open Cal.com, which collects the details needed to arrange the consultation. Vocemi is in Calgary, Alberta, Canada, and the published phone number is (437) 332-5220.",
  },
  {
    question: "Who founded Vocemi, and where is the business based?",
    answer:
      "Pankajpreet Singh is the founder. Vocemi is based in Calgary and serves Canada and the US. He is a Senior Developer at Arctic Wolf and holds a B.Tech in Computer Science and Engineering from Punjab Technical University.",
  },
  {
    question: "Does Vocemi work with businesses outside Calgary?",
    answer:
      "Yes. We're based in Calgary, and we serve Canada and the US. No street address is published.",
  },
  {
    question: "Does Vocemi publish a list of languages the voice agent speaks?",
    answer:
      "The receptionist is built for English. It can support more than one language, and no language other than English is named as production-ready. The multilingual guide is about how to test a language with real callers, not a list of extra languages Vocemi offers.",
  },
  {
    question: "What call-recording notice do callers hear?",
    answer:
      "The greeting, including any recording notice, is written for that client. It tells callers it's an AI.",
  },
  {
    question: "What kinds of calls are handed to a licensed or on-call person?",
    answer:
      "Insurance: quote prices, binding policies, and coverage advice stay with a licensed broker. Med spas: medical or treatment advice stays with your team. HVAC and plumbing: emergencies go to your on-call tech, and prices stay inside your approved price list. Vet clinics: it does not diagnose, recommend doses, or give veterinary advice. Urgent pet calls go to your emergency partner.",
  },
];

export const pageFaqs = [...pricingFaqs, ...otherFaqs];
