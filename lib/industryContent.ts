/**
 * Industry pages at /industries/[slug].
 *
 * Example calls are illustrations of how a workflow would run, not transcripts
 * of real calls, and the page labels them that way. Keep specific prices,
 * results and client names out of this file unless they are real and approved.
 */

export interface IndustryGuide {
  slug: string;
  name: string;
  metaTitle: string;
  title: string;
  description: string;
  intro: string[];
  calls: { title: string; desc: string }[];
  exampleCall: {
    setup: string;
    lines: { speaker: "Caller" | "Agent"; text: string }[];
    outcome: string;
  };
  staysWithTeam: string[];
  considerations: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
  relatedPosts: string[];
  /** One in-body sentence. Each phrase is linked once. */
  inBody?: { sentence: string; marks: { phrase: string; href: string }[] };
}

export const industryGuides: IndustryGuide[] = [
  {
    slug: "med-spas",
    name: "Med Spas",
    metaTitle: "AI Receptionist for Med Spas | Vocemi",
    title: "An AI receptionist for med spas that books consultations while your team is with clients",
    description:
      "How a Vocemi AI receptionist can answer med spa calls, share approved treatment information, book consultations and route clinical questions to your team.",
    intro: [
      "Med spa phones ring hardest when the front desk is busiest: clients checking in, paying, and booking their next visit. Enquiries from ads and social posts arrive in the evening, when nobody is there to answer.",
      "An AI receptionist picks up those calls, answers from the treatment information and prices you approve, and books consultations inside your rules. Clinical questions go to your licensed staff.",
    ],
    calls: [
      {
        title: "Treatment and price questions",
        desc: "Answers from your approved treatment menu and pricing, and offers to text the current menu.",
      },
      {
        title: "Consultation booking",
        desc: "Collects name, contact details and the treatment of interest, then offers open consultation times.",
      },
      {
        title: "Rescheduling and cancellations",
        desc: "Moves appointments inside your cancellation policy and fills the gap from your calendar.",
      },
      {
        title: "Before-and-after care",
        desc: "Reads your approved preparation and aftercare instructions, word for word.",
      },
      {
        title: "Packages and memberships",
        desc: "Explains what's included in each package or membership using your approved descriptions.",
      },
      {
        title: "After-hours enquiries",
        desc: "Answers evening and weekend calls from ads and social media while interest is high.",
      },
    ],
    exampleCall: {
      setup: "A caller rings at 8:40 p.m. after seeing an Instagram post about lip filler.",
      lines: [
        { speaker: "Agent", text: "Thanks for calling. I'm the clinic's automated assistant. How can I help?" },
        { speaker: "Caller", text: "Hi, how much is lip filler, and do I need a consult first?" },
        { speaker: "Agent", text: "New clients start with a consultation with one of our nurse injectors. Pricing depends on the amount of product, so I can text you our current treatment menu. Would you like to book a consultation?" },
        { speaker: "Caller", text: "Sure, but only weekends. Oh, and is it safe if I'm breastfeeding?" },
        { speaker: "Agent", text: "That's a question for our clinical team, so I'll note it and have a nurse call you before your appointment. For weekends, I have Saturday at 11 or 2. Which works?" },
      ],
      outcome:
        "Consultation booked for Saturday, the menu is texted, and the clinical question is flagged for a nurse callback with a written summary.",
    },
    staysWithTeam: [
      "Whether a treatment is suitable for a particular client",
      "Reactions, complications or anything that sounds urgent",
      "Price exceptions, discounts and refunds",
      "Complaints and unhappy clients",
    ],
    considerations: [
      {
        title: "Clinical advice stays clinical",
        desc: "Injectables and many aesthetic treatments are medical procedures. The agent shares only approved, general information and routes suitability, medication and side-effect questions to licensed staff.",
      },
      {
        title: "Collect only what the booking needs",
        desc: "A consultation booking needs contact details and the treatment of interest, not a medical history. Keep health details for the in-person consultation.",
      },
      {
        title: "Follow your advertising rules",
        desc: "Anything the agent says about treatments and results should meet the same standards as your website and ads, including your regulatory college's rules.",
      },
    ],
    faqs: [
      {
        question: "Can an AI receptionist quote med spa prices?",
        answer:
          "It can share the prices and price ranges you approve, exactly as written. It shouldn't negotiate or give custom quotes; those go to your team.",
      },
      {
        question: "What happens if a client calls about a reaction after treatment?",
        answer:
          "That call is routed to your clinical team immediately, following the escalation path you define. The agent does not give medical advice.",
      },
      {
        question: "Does it work with my booking software?",
        answer:
          "Booking works through your calendar or practice software where an integration is available. We confirm which tools can connect during scoping, before anything is built.",
      },
    ],
    relatedServices: ["ai-receptionist", "lead-reactivation"],
    relatedPosts: ["full-duplex-voice-ai-business-calls", "ai-receptionist-vs-answering-service"],
    inBody: {
      sentence:
        "See how the AI receptionist books consultations while the front desk is with a client, and how lead reactivation works through past clients at 3D Lifestyle.",
      marks: [
        { phrase: "AI receptionist", href: "/services/ai-receptionist" },
        { phrase: "lead reactivation", href: "/services/lead-reactivation" },
      ],
    },
  },
  {
    slug: "dental",
    name: "Dental Practices",
    metaTitle: "AI Receptionist for Dental Offices | Vocemi",
    title: "An AI receptionist for dental offices that books new patients and handles routine calls",
    description:
      "How a Vocemi AI receptionist can answer dental office calls, book new patients, handle rescheduling, answer insurance and CDCP questions from approved information, and route clinical calls.",
    intro: [
      "Dental front desks do several jobs at once: checking patients in, processing payments and insurance, and answering the phone. When the phone loses, it's often a new patient who calls the next office on their list.",
      "An AI receptionist answers routine calls every time: new patient bookings, rescheduling, hours and insurance questions. Your team can then focus on the patients in the chair and the calls that need their judgment.",
    ],
    calls: [
      {
        title: "New patient bookings",
        desc: "Collects the details your office needs and offers open times for a first visit.",
      },
      {
        title: "Rescheduling and cancellations",
        desc: "Moves appointments within your rules and offers freed-up slots to other patients.",
      },
      {
        title: "Insurance and CDCP questions",
        desc: "Answers \"Do you direct bill?\" and \"Do you accept the Canadian Dental Care Plan?\" from your approved answers.",
      },
      {
        title: "Hours, location and parking",
        desc: "The simple questions that make up a large share of calls, answered instantly.",
      },
      {
        title: "Urgent calls by your rules",
        desc: "Asks the questions you define to separate urgent from routine, and escalates when needed.",
      },
      {
        title: "Recall and reminder calls",
        desc: "Reminder calls for booked appointments and recalls, following Canada's rules for automated calls.",
      },
    ],
    exampleCall: {
      setup: "A new patient calls during the lunch rush, when both front-desk staff are with patients.",
      lines: [
        { speaker: "Agent", text: "Thanks for calling. I'm the office's automated assistant. How can I help?" },
        { speaker: "Caller", text: "I'm new to the area and need a cleaning. Do you take the Canadian Dental Care Plan?" },
        { speaker: "Agent", text: "Yes, we see patients covered by the Canadian Dental Care Plan. Please bring your member card to your visit. I can book a new patient exam and cleaning. Do mornings or afternoons suit you better?" },
        { speaker: "Caller", text: "Afternoons. Actually, one of my teeth has been really sore for a few days." },
        { speaker: "Agent", text: "I'm sorry to hear that. Is there any swelling in your face or jaw?" },
        { speaker: "Caller", text: "No, just sore." },
        { speaker: "Agent", text: "Okay. I'll note the sore tooth so the team can look at it. The first afternoon new-patient opening is Wednesday at 3:30. Shall I book that?" },
      ],
      outcome:
        "New patient booked, the sore tooth is noted, and the office's triage question was asked. A yes on swelling would have gone straight to staff.",
    },
    staysWithTeam: [
      "Clinical advice and diagnosis",
      "Treatment cost estimates for a specific patient",
      "Anything your office defines as an emergency",
      "Billing disputes and insurance problems",
    ],
    considerations: [
      {
        title: "Health information rules",
        desc: "In Alberta, health information handled by dental professionals may fall under the Health Information Act rather than general private-sector privacy law. Confirm with your privacy officer what the agent may collect and where call records are stored.",
      },
      {
        title: "Approved answers for insurance",
        desc: "Coverage questions are easy to get wrong. The agent should give only your office's approved answers, such as whether you direct bill or see CDCP patients, and never estimate what a plan will pay.",
      },
      {
        title: "Reminder calls have rules too",
        desc: "Automated reminder calls must identify your office and give a callback number. Adding a promotion turns a reminder into a sales call with stricter consent rules.",
      },
    ],
    faqs: [
      {
        question: "Can an AI receptionist book new dental patients?",
        answer:
          "Yes. It can collect the details your office needs and book into open new-patient slots, following the rules you set, such as appointment length and which providers see new patients.",
      },
      {
        question: "How does it handle dental emergencies?",
        answer:
          "It asks the triage questions your office defines, and anything that meets your emergency criteria goes straight to your team or your after-hours instructions. It never gives clinical advice.",
      },
      {
        question: "Can it answer insurance and CDCP questions?",
        answer:
          "It can answer general questions using your approved wording, like whether you direct bill or accept the Canadian Dental Care Plan. Plan-specific coverage questions go to your team.",
      },
    ],
    relatedServices: ["ai-receptionist"],
    relatedPosts: ["missed-call-statistics", "ai-voice-calls-canada-crtc-rules"],
    inBody: {
      sentence:
        "See how the AI receptionist books new patients when the desk is already with someone in the chair.",
      marks: [{ phrase: "AI receptionist", href: "/services/ai-receptionist" }],
    },
  },
  {
    slug: "hvac-plumbing",
    name: "HVAC & Plumbing",
    metaTitle: "AI Answering for HVAC & Plumbing Companies | Vocemi",
    title: "AI call answering for HVAC and plumbing companies that never lets an emergency go to voicemail",
    description:
      "How a Vocemi AI receptionist can answer HVAC and plumbing calls 24/7, triage emergencies by your rules, book service visits and capture quote details while your techs are on jobs.",
    intro: [
      "In HVAC and plumbing, the phone rings when things go wrong: no heat during a cold snap, water through a ceiling, no hot water before work. The person who could answer is usually on a ladder, under a sink or driving to the next job.",
      "An AI receptionist answers every call, separates emergencies from routine work using your rules, books service visits and captures the details your team needs to quote. Emergencies reach your on-call tech right away.",
    ],
    calls: [
      {
        title: "Emergency triage",
        desc: "Asks your triage questions (no heat, active leak, no water) and escalates to on-call staff by your rules.",
      },
      {
        title: "Service and repair booking",
        desc: "Captures the problem, address and access details, and books into available windows.",
      },
      {
        title: "Maintenance and tune-ups",
        desc: "Books seasonal furnace and AC maintenance without tying up the office.",
      },
      {
        title: "Quote requests",
        desc: "Collects the job details and texts a link for photos so your estimator starts with what they need.",
      },
      {
        title: "\"When is the tech arriving?\"",
        desc: "Answers status calls from your schedule where your software allows, or passes a message to dispatch.",
      },
      {
        title: "After-hours calls",
        desc: "Night and weekend calls get answered, and routine work is booked for the next business day.",
      },
    ],
    exampleCall: {
      setup: "It's 10:15 p.m. in January and a homeowner's furnace has stopped.",
      lines: [
        { speaker: "Agent", text: "Thanks for calling. I'm the company's automated assistant. What's going on?" },
        { speaker: "Caller", text: "Our furnace just quit and it's freezing. We have a baby in the house." },
        { speaker: "Agent", text: "I'm sorry, let's get you help. First, do you smell gas anywhere in the house?" },
        { speaker: "Caller", text: "No, no gas smell. It's just blowing cold air." },
        { speaker: "Agent", text: "Okay. With no heat and an infant at home, this counts as an emergency call. What's the address?" },
        { speaker: "Caller", text: "It's in Evanston. Sorry, the street is Evanston Drive, northwest." },
        { speaker: "Agent", text: "Got it, Evanston Drive Northwest. I'm alerting the on-call technician now, and they'll call you within fifteen minutes to confirm an arrival time." },
      ],
      outcome:
        "The gas-safety question was asked first, the call was classed as an emergency under the company's rules, and the on-call tech was paged with the address and a summary.",
    },
    staysWithTeam: [
      "Diagnosis and repair recommendations",
      "Pricing for non-standard jobs",
      "Suspected gas leaks, after the safety instructions",
      "Warranty disputes and complaints",
    ],
    considerations: [
      {
        title: "Safety scripts come first",
        desc: "Some calls need safety instructions before anything else. For example: if someone smells gas, they should leave the building and call 911 or their gas utility's emergency line from outside. These scripts are written and approved before launch.",
      },
      {
        title: "Your definition of \"emergency\"",
        desc: "Emergency rules differ by company and season. You decide what triggers an after-hours dispatch, and the agent follows that definition every time.",
      },
      {
        title: "Fit with your field-service software",
        desc: "Booking and dispatch work best when connected to the scheduling tool you already use. We confirm which integrations are possible during scoping.",
      },
    ],
    faqs: [
      {
        question: "Can an AI receptionist dispatch emergency HVAC or plumbing calls?",
        answer:
          "It can triage calls using your rules and alert your on-call technician with the details. Dispatch decisions follow the escalation path you set.",
      },
      {
        question: "Will it give customers prices?",
        answer:
          "Only prices you approve, such as a service-call fee or a maintenance package. Custom job pricing is captured as a quote request for your estimator.",
      },
      {
        question: "What about calls while my techs are on jobs?",
        answer:
          "That's where it helps most: every call is answered, and your team gets bookings and summaries instead of voicemails to return.",
      },
    ],
    relatedServices: ["ai-receptionist", "lead-reactivation"],
    relatedPosts: ["full-duplex-voice-ai-business-calls", "missed-call-statistics"],
    inBody: {
      sentence: "See how the AI receptionist answers while techs are on jobs.",
      marks: [{ phrase: "AI receptionist", href: "/services/ai-receptionist" }],
    },
  },
  {
    slug: "insurance",
    name: "Insurance Brokerages",
    metaTitle: "AI Receptionist for Insurance Brokerages | Vocemi",
    title: "An AI receptionist for insurance brokerages that handles intake so brokers can advise",
    description:
      "How a Vocemi AI receptionist can answer insurance brokerage calls, gather quote and claim details, answer routine policy-service questions, and route advice to licensed brokers.",
    intro: [
      "Brokerage phones carry a mix of work. Some calls need a licensed broker's advice. Many are routine: renewal dates, document requests, office hours, and the first details of a new quote or claim.",
      "An AI receptionist handles the routine part and the intake, and passes everything that needs advice to a licensed broker with a written summary. Your brokers spend their time advising, not collecting details.",
    ],
    calls: [
      {
        title: "Quote intake",
        desc: "Collects the details a broker needs to start a home, auto or business quote, and books a callback.",
      },
      {
        title: "First notice of loss",
        desc: "Records what happened, when and where, gives the approved next steps, and routes the claim.",
      },
      {
        title: "Policy service questions",
        desc: "Renewal dates, payment options and document requests, answered from approved information or passed to staff.",
      },
      {
        title: "Proof-of-insurance requests",
        desc: "Captures the request and details so staff can issue documents quickly.",
      },
      {
        title: "Office hours and contact routing",
        desc: "Gets callers to the right broker or department without a phone tree.",
      },
      {
        title: "Renewal reminders",
        desc: "Automated reminder calls that follow Canada's rules for automated calls, with no sales pitch attached.",
      },
    ],
    exampleCall: {
      setup: "A client calls on Saturday after a fender-bender in a parking lot.",
      lines: [
        { speaker: "Agent", text: "Thanks for calling. I'm the brokerage's automated assistant. How can I help?" },
        { speaker: "Caller", text: "Someone backed into my car at the mall. Am I covered for this?" },
        { speaker: "Agent", text: "I'm sorry that happened. Is anyone hurt?" },
        { speaker: "Caller", text: "No, everyone's fine." },
        { speaker: "Agent", text: "Good. A broker will go over your coverage with you. I can take the details now so they have everything. When and where did it happen, and did you exchange information with the other driver?" },
        { speaker: "Caller", text: "About an hour ago in the Chinook Centre parkade. And yes, I got their plate and insurance info." },
        { speaker: "Agent", text: "Thank you. I have today, about an hour ago, in the Chinook Centre parkade, with the other driver's details. A broker will call you Monday morning, and I'll text you the steps to take in the meantime." },
      ],
      outcome:
        "Loss details are captured, the coverage question goes to a licensed broker, and the client gets the brokerage's approved next steps by text.",
    },
    staysWithTeam: [
      "Coverage advice and product recommendations",
      "Binding, cancelling or changing coverage",
      "Claim decisions and disputes",
      "Complaints and complex situations",
    ],
    considerations: [
      {
        title: "Advice needs a licence",
        desc: "In Alberta, insurance advice is given by licensed agents and brokers. The agent collects information and answers administrative questions. It doesn't recommend coverage or say whether something is covered.",
      },
      {
        title: "Minimal personal information",
        desc: "Quote and claim intake involves personal details. Collect only what the next step needs, tell callers if calls are recorded, and agree where records are stored.",
      },
      {
        title: "Reminders vs. cross-selling",
        desc: "A renewal reminder is a service call. Adding an offer for another product makes it a sales call, which has stricter consent rules for automated calls.",
      },
    ],
    faqs: [
      {
        question: "Can an AI receptionist tell a client whether they're covered?",
        answer:
          "No. Coverage questions go to a licensed broker. The agent gathers the details so the broker can answer quickly, and gives only your approved general next steps.",
      },
      {
        question: "Can it take first notice of loss after hours?",
        answer:
          "Yes. It can record the details of a loss at any hour, give your approved instructions, and route the file so your team starts the next business day with everything they need.",
      },
      {
        question: "Can it make renewal reminder calls?",
        answer:
          "Yes, as service calls that identify your brokerage and provide a callback number. Adding sales offers to those calls brings stricter consent rules, which we cover in our guide to CRTC rules.",
      },
    ],
    relatedServices: ["ai-receptionist", "lead-reactivation"],
    relatedPosts: ["ai-voice-calls-canada-crtc-rules", "multilingual-voice-ai-calgary"],
    inBody: {
      sentence:
        "See how the AI receptionist handles intake, and how lead reactivation can work through quotes that were not booked.",
      marks: [
        { phrase: "AI receptionist", href: "/services/ai-receptionist" },
        { phrase: "lead reactivation", href: "/services/lead-reactivation" },
      ],
    },
  },
];

export function getIndustryGuide(slug: string) {
  return industryGuides.find((industry) => industry.slug === slug);
}
