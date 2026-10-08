/**
 * /faq questions. None of these strings are the homepage FAQ.
 * Owner questions without an answer are rendered as visible TODO boxes on
 * the page and are not included here, so they stay out of FAQPage JSON-LD.
 */

export const pageFaqs: { question: string; answer: string }[] = [
  {
    question: "What does the AI Employee Audit include, and what does it cost?",
    answer:
      "The AI Employee Audit is $250, one-time, and credited toward setup. It maps the workflow and channels, defines the approval rules, sets a clear finish line, and ends with a build recommendation. Pricing on the site is labelled illustrative, and every engagement is scoped to your actual call volume and tools on a free call.",
  },
  {
    question:
      "What does the One-Workflow AI Employee include, and what does it cost?",
    answer:
      "The One-Workflow AI Employee is $1,500 one-time setup, plus from $300/mo. It covers one AI employee role on phone, inbox, or forms, with approval gates and a daily owner report. The pricing section marks this tier as the most common start.",
  },
  {
    question:
      "What does the Managed AI Employee include, and what does it cost?",
    answer:
      "The Managed AI Employee is $3,000 setup plus $1,500/mo. It covers phone, inbox, calendar, and CRM, plus booking and follow-up, escalation rules, and a monthly improvement review.",
  },
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
    question: "How is a lead reactivation campaign limited?",
    answer:
      "You choose the contacts, the message, the offer, the booking rules, and the situations that require a person. The agent stays inside the approved message and offer. Unusual questions wait for your team, and outcomes can be reviewed before the next run. The guide on Canada's calling rules says these workflows start with the contact list, the consent basis, and the script before anyone is called. The lead reactivation page, including whether those calls are legal, is at /services/lead-reactivation.",
  },
  {
    question: "What does the site say about outbound AI calls in Canada?",
    answer:
      "The guide on AI voice calls and Canada's telemarketing rules says outbound calls in Canada fall under the CRTC's Unsolicited Telecommunications Rules, which cover telemarketing, the National Do Not Call List, and automated calls. It says the safe assumption is that an AI voice agent placing calls falls under the rules for automatic dialing-announcing devices, that sales or marketing calls made that way need the person's express consent, and that follow-up texts and emails fall under Canada's anti-spam law (CASL), not the telemarketing rules. The guide is a plain-language overview, not legal advice, and it says to check with a lawyer before running an outbound calling program. It is published at /blog/ai-voice-calls-canada-crtc-rules.",
  },
  {
    question: "Which industries have a published Vocemi guide?",
    answer:
      "There are guides for med spas, dental practices, HVAC and plumbing companies, and insurance brokerages. Each one covers the calls worth automating first and where the handoff to a person belongs. The /start page also lists accounting, home services, roofing, automotive, and professional services.",
  },
  {
    question: "Can an AI receptionist book into a calendar?",
    answer:
      "The /start page says the agent checks your calendar, offers real times, and puts the job on the books during the call. Industry guides say booking works through your calendar, practice software, or field-service scheduling tool where an integration is available, and that which tools can connect is confirmed during scoping, before anything is built.",
  },
  {
    question: "What does the owner receive after calls?",
    answer:
      "The homepage workflow says tools update automatically and a daily summary lands in your inbox. The owner dashboard says every call is transcribed, logged, and searchable. The AI receptionist guide says calls and outcomes can be included in an owner report.",
  },
  {
    question: "What is written down before a client Voice AI project goes live?",
    answer:
      "The security page says a client project can use different tools and data from this website, so the exact recording, access, retention, and deletion rules are documented before launch. That write-up covers what gets recorded or stored, which providers process it, who can access it, how exceptions reach a person, how long information is retained, and how correction or deletion requests are handled.",
  },
  {
    question: "Which providers does the vocemi.com website use?",
    answer:
      "The security page names four. Vercel Analytics counts visits and selected actions. The live voice demo uses Retell AI and Google reCAPTCHA, and only after you start it. Booking links open Cal.com. The contact form is delivered with Resend. The privacy page says Vocemi does not sell the information you submit, and does not share it except with those providers.",
  },
  {
    question: "How do I contact Vocemi?",
    answer:
      "Email business@vocemi.com, use the form on /contact, or book a call. Booking links open Cal.com, which collects the details needed to arrange the consultation. Vocemi is in Calgary, Alberta, Canada, and the published phone number is (437) 332-5220.",
  },
  {
    question: "Who founded Vocemi, and where is the business based?",
    answer:
      "Pankajpreet Singh is the founder. The about page describes Vocemi as a Calgary-based Voice AI business focused on answering, qualification, booking, follow-up, and clear reporting. He is a Senior Developer at Arctic Wolf and holds a B.Tech in Computer Science and Engineering from Punjab Technical University.",
  },
  {
    question:
      "How does the site compare an AI employee with hiring a person for the phones?",
    answer:
      "The homepage comparison says a person can take months to hire and train, works scheduled hours, handles one queue, can be out sick, and updates tools by hand. It says an AI employee can be live in 2–4 weeks, answers 24/7, answers several calls at once, does not call in sick, and updates your tools automatically.",
  },
  {
    question: "Does Vocemi work with businesses outside Calgary?",
    answer:
      "The AI receptionist and lead reactivation pages describe Vocemi as Calgary-based and serving Canada, the United States, and the United Kingdom. No street address is published.",
  },
  {
    question: "Does Vocemi publish a list of languages the voice agent speaks?",
    answer:
      "No fixed list is published. Voice Bot Development includes multi-language support. The guide on multilingual voice AI says to start from the languages your callers actually use, test names, addresses, and numbers with native speakers, and review approved answers in each language before relying on it.",
  },
  {
    question: "What kinds of calls are handed to a licensed or on-call person?",
    answer:
      "Med spa guides say clinical questions, including suitability and side effects, go to licensed staff and the agent does not give medical advice. Dental guides say the agent never gives clinical advice, and anything the office defines as an emergency goes to the team. Insurance guides say coverage questions go to a licensed broker, and the agent does not say whether something is covered. HVAC and plumbing guides say emergencies are triaged with your rules and the on-call technician is alerted, and that a gas-smell script (leave the building and call 911 or the gas utility from outside) is approved before launch.",
  },
]
