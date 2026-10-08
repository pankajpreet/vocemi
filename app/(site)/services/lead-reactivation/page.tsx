import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "AI Lead Reactivation Calls to Past Customers | Vocemi",
  absoluteTitle: true,
  description:
    "Consent-first AI calls to past customers and dormant leads: clean lists, approved scripts, opt-outs, follow-up and a results report. Canada, US and UK.",
  path: "/services/lead-reactivation",
  socialTitle:
    "Vocemi AI lead reactivation: bring past customers back, the compliant way",
});

const campaignUtm = {
  source: "vocemi",
  medium: "service_page",
  campaign: "lead_reactivation",
} as const;

type Piece = { text: string; href?: string; external?: boolean };

const answeredFaqs: { question: string; pieces: Piece[] }[] = [
  {
    question: "What is a lead reactivation (database reactivation) campaign?",
    pieces: [
      {
        text: "It calls people already in your records, such as past customers, enquiries that never booked, and quotes that went cold, with one message and one next step you approved. That next step is usually booking back in.",
      },
    ],
  },
  {
    question: "Is it legal to have an AI call my past customers?",
    pieces: [
      {
        text: "Only when that country's rules are met, and this is not legal advice. Canada and the US require prior express consent for an AI-voice sales call; US telemarketing needs it in writing. The UK requires specific consent to automated calls. Name the business, give a callback number, and keep legal hours. See the ",
      },
      { text: "calling-rules section", href: "#calling-rules" },
      { text: " and " },
      {
        text: "Canada's telemarketing rules for AI voice calls",
        href: "/blog/ai-voice-calls-canada-crtc-rules",
      },
      { text: "." },
    ],
  },
  {
    question: "They're already my customers. Do I still need their consent?",
    pieces: [
      {
        text: "Usually yes for a sales call. In Canada the existing-customer exemption covers the Do Not Call List, not automated-voice consent. In the US, TCPA consent applies to AI voices anyway. In the UK, consent must name automated calls. A reminder of a booking the customer already made is different, and an added offer makes it marketing.",
      },
    ],
  },
  {
    question: "What do you need from me to start?",
    pieces: [
      {
        text: "A contact export, the consent basis for each person, your internal do-not-call list, the goal, the offer, booking rules, and who handles escalations. Contacts without the consent a call needs are left out.",
      },
    ],
  },
  {
    question: "How many times will the AI call each person, and when?",
    pieces: [
      {
        text: "Attempts, spacing and voicemail are agreed per campaign, inside the recipient's legal hours. Calling stops after a booking, an opt-out, a wrong number, or that maximum.",
      },
    ],
  },
  {
    question: "What happens if someone asks something off-script or wants a person?",
    pieces: [
      {
        text: "It does not improvise. Off-script questions, complaints and pricing exceptions go to your team with a summary. An opt-out is honoured on that call.",
      },
    ],
  },
  {
    question: "What results should I expect?",
    pieces: [
      {
        text: "No typical rate is quoted. It depends on list age, the consent you hold, and the offer. You review the campaign report before the next batch. ",
      },
      { text: "estimate it with your own numbers", href: "/#calculator" },
      { text: "." },
    ],
  },
];

function joined(pieces: Piece[]) {
  return pieces.map((piece) => piece.text).join("");
}

function CampaignLine({ pieces }: { pieces: Piece[] }) {
  return (
    <>
      {pieces.map((piece, index) =>
        piece.href ? (
          <a
            key={index}
            href={piece.href}
            className="underline decoration-white/40 underline-offset-2 hover:decoration-white"
            {...(piece.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {piece.text}
          </a>
        ) : (
          <span key={index}>{piece.text}</span>
        )
      )}
    </>
  );
}

function OpenItem({ children }: { children: string }) {
  return (
    <p className="m-0 mt-3 border border-dashed border-white/50 rounded-sm px-3 py-2 text-[14.5px] leading-snug text-white bg-white/5">
      <span className="font-semibold">TODO (Pankajpreet):</span> {children}
    </p>
  );
}

const ext =
  "underline decoration-white/40 underline-offset-2 hover:decoration-white";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.vocemi.com/services/lead-reactivation#service",
      name: "AI Lead Reactivation",
      serviceType: "Lead reactivation / database reactivation calling campaign",
      description:
        "Consent-first AI voice campaigns that call past customers, unconverted enquiries and cold quotes from an approved list, offer an approved next step such as booking, honour opt-outs and report results per campaign.",
      url: "https://www.vocemi.com/services/lead-reactivation",
      provider: { "@id": "https://www.vocemi.com/#organization" },
      areaServed: [
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Service businesses with past-customer or lead databases",
      },
      isRelatedTo: {
        "@id": "https://www.vocemi.com/services/ai-receptionist#service",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.vocemi.com/services/lead-reactivation#faq",
      mainEntity: answeredFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: joined(faq.pieces) },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.vocemi.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://www.vocemi.com/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Lead Reactivation",
          item: "https://www.vocemi.com/services/lead-reactivation",
        },
      ],
    },
  ],
};

export default function LeadReactivationPage() {
  const demoHref = siteConfig.voiceDemoAvailable ? "/start#talk" : "/start";
  const demoLabel = siteConfig.voiceDemoAvailable
    ? "Try the live demo"
    : "See how it works";
  const book = (placement: string) =>
    siteConfig.bookCallUrl(placement, campaignUtm);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <div className="bg-coal text-white">
        <header className="max-w-[820px] mx-auto px-6 pt-12 pb-10 md:pt-16">
          <nav aria-label="Breadcrumb" className="text-[12px] uppercase tracking-[0.08em] text-white/75 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <span aria-hidden="true"> / </span>
            <span>Lead Reactivation</span>
          </nav>
          <p className="text-[12px] uppercase tracking-[0.14em] text-brand-light m-0 mb-3">
            Lead Reactivation · Outbound campaigns, done for you
          </p>
          <h1 className="font-display text-[1.85rem] md:text-[2.6rem] leading-[1.08] font-extrabold m-0 mb-5">
            AI lead reactivation: consent-first calls to past customers and old leads
          </h1>
          <p className="text-[16.5px] leading-[1.65] text-white/85 m-0 mb-6">
            Vocemi&apos;s AI lead reactivation calls the people already in your
            records, such as past customers, unconverted enquiries and quotes
            that went cold. It offers them an approved next step, like booking
            back in. Before anyone is called, we check who is on the list and
            the consent basis for each contact, because AI-voice sales calls
            need prior express consent in Canada and the US and specific consent
            in the UK. The agent stays inside your approved script, honours
            opt-outs, hands off-script questions to your team, and you get a
            report of who was reached, who booked and who opted out.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <TrackedLink
              href={book("lead_reactivation_hero")}
              event="book_call_clicked"
              properties={{
                placement: "lead_reactivation_hero",
                service: "lead-reactivation",
              }}
              external
              className="inline-flex items-center justify-center bg-white text-coal px-5 py-3 font-semibold hover:bg-sand"
            >
              Book a free call
            </TrackedLink>
            <TrackedLink
              href={demoHref}
              event="demo_cta_clicked"
              properties={{
                placement: "lead_reactivation_hero",
                service: "lead-reactivation",
              }}
              className="inline-flex items-center justify-center border border-white/40 px-5 py-3 font-semibold hover:border-white"
            >
              {demoLabel}
            </TrackedLink>
          </div>
        </header>

        <div className="max-w-[820px] mx-auto px-6 pb-14 flex flex-col gap-10">
          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              What lead reactivation is, and what it isn&apos;t
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0">
              It is one outbound offer to people who already know the business.
              Database reactivation is another name for that job. Incoming calls
              are separate:{" "}
              <Link href="/services/ai-receptionist" className={ext}>
                AI receptionist for incoming calls
              </Link>
              .
            </p>
            <OpenItem>
              confirm the policy on purchased or cold lists before any sentence
              says Vocemi does not run them.
            </OpenItem>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              Step 1: Clean the list before anyone is called
            </h2>
            <ul className="m-0 pl-5 flex flex-col gap-2 text-[16px] leading-[1.65] text-white/85">
              <li>Source: an export from your CRM, booking software, or a spreadsheet. You approve the final list.</li>
              <li>Remove duplicates, bad numbers, your internal do-not-call list, and any number that fails a do-not-call check where one applies (Canada National DNCL, US National DNC Registry, UK TPS/CTPS).</li>
              <li>Record how and when each person agreed to be contacted. Leave out anyone without the consent that call needs.</li>
              <li>Segment by relationship and age so each group gets the right message.</li>
            </ul>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0 mt-3">
              If a list doesn&apos;t meet the rules, we&apos;ll say so before
              launch.
            </p>
            <OpenItem>
              confirm whether Vocemi scrubs lists against DNCL, the National DNC
              Registry and the TPS, or the client supplies an already-scrubbed
              list.
            </OpenItem>
          </section>

          <section id="calling-rules" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              Step 2: Consent and calling rules in Canada, the US and the UK
            </h2>
            <p className="m-0 mb-3 border border-white px-3 py-2 text-[15px] font-semibold">
              Pending legal review
            </p>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0 mb-4">
              This is a plain-language summary as of October 2026, not legal
              advice. Rules change. Check a specific campaign with a lawyer
              before the first sales call.
            </p>

            <h3 className="font-display text-lg font-bold m-0 mb-2">Canada</h3>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0 mb-4">
              Outbound calls fall under the CRTC{" "}
              <a className={ext} href="https://www.crtc.gc.ca/eng/trules-reglest.htm" target="_blank" rel="noopener noreferrer">
                Unsolicited Telecommunications Rules
              </a>
              . ADAD covers pre-recorded or synthesized voice, and the cautious
              assumption is that an AI voice agent placing calls is covered. A sales call needs express
              consent (written, recorded oral, or electronic, with a record).
              Being a customer does not replace it. The exemption covers the
              National DNCL, not ADAD consent (
              <a className={ext} href="https://crtc.gc.ca/eng/archive/2014/2014-155.htm" target="_blank" rel="noopener noreferrer">
                CRTC 2014-155
              </a>
              ;{" "}
              <Link href="/blog/ai-voice-calls-canada-crtc-rules" className={ext}>
                our CRTC guide
              </Link>
              ). Non-sales calls still identify the caller and the reason, give
              an email or postal address and a local or toll-free number, and
              stay within 9:00 a.m.–9:30 p.m. weekdays and 10:00 a.m.–6:00 p.m.
              weekends, recipient&apos;s time (UTRs Part IV). Notice 2026-132
              asks whether ADAD should name AI voices and whether the caller
              must say it is not a live person (
              <a className={ext} href="https://www.crtc.gc.ca/eng/archive/2026/2026-132.htm" target="_blank" rel="noopener noreferrer">
                Notice 2026-132
              </a>
              ; comments closed 27 July 2026, replies 11 August 2026; no
              decision as of October 2026). Follow-up texts and emails fall
              under CASL.
            </p>

            <h3 className="font-display text-lg font-bold m-0 mb-2">
              United States
            </h3>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0 mb-4">
              In February 2024 the FCC treated AI-generated voices as an
              artificial or prerecorded voice under the TCPA: prior express
              consent, and prior express written consent for telemarketing on
              wireless and residential lines (
              <a className={ext} href="https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf" target="_blank" rel="noopener noreferrer">
                FCC 24-17
              </a>
              ,{" "}
              <a className={ext} href="https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200" target="_blank" rel="noopener noreferrer">
                47 CFR 64.1200
              </a>
              ). Calls identify the caller and offer an opt-out. The federal
              solicitation window is 8 a.m.–9 p.m. local. Some states, such as
              Florida and Oklahoma, are stricter. Opt-outs are honoured on the
              call and apply across the campaign.
            </p>

            <h3 className="font-display text-lg font-bold m-0 mb-2">
              United Kingdom
            </h3>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0 mb-4">
              PECR regulation 19 requires specific prior consent to automated
              calls from you. General marketing consent, or consent to live
              calls, is not enough. Calls must name the business, give an
              address or freephone number, and display a number (
              <a className={ext} href="https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/telephone-marketing/" target="_blank" rel="noopener noreferrer">
                ICO: telephone marketing
              </a>
              ). The ICO describes a live call as a live person speaking, so
              the cautious reading is that an AI voice agent is not a live call.
              A service message is not marketing until an offer is added.
              Penalties are significant.
            </p>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0">
              The consent basis is checked before launch. A campaign can be
              limited to contacts with the consent that call requires. Opt-outs
              are honoured on the call and added to your do-not-call list.
            </p>
            <OpenItem>
              confirm that every outbound call opens with that automated-assistant
              disclosure, the business name, the purpose, and a callback number.
            </OpenItem>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              Step 3: The script: what the AI says, and what it won&apos;t
            </h2>
            <ol className="m-0 pl-5 flex flex-col gap-2 text-[16px] leading-[1.65] text-white/85">
              <li>Name the business, say it is an automated assistant, and state why you are calling.</li>
              <li>Confirm the person, or stop.</li>
              <li>Give one approved offer, then one or two interest questions.</li>
              <li>Offer one next step: book, request a callback, or send information.</li>
              <li>Offer an opt-out and honour it. Send complaints, pricing exceptions and sensitive questions to your team.</li>
            </ol>
            <figure className="mt-4 bg-white text-coal px-4 py-3">
              <figcaption className="text-[13px] font-semibold mb-2">
                Illustrative scenario. Not a recording of a real call.
              </figcaption>
              <ol className="m-0 pl-5 text-[15px] leading-[1.55] flex flex-col gap-1">
                <li>Assistant: This is an automated assistant for Northside Clinic. You asked us to stay in touch. Is this Priya?</li>
                <li>Priya: Yes. What is this about?</li>
                <li>Assistant: It has been a while, and next week has openings. Would you like one?</li>
                <li>Priya: I am not sure I need it.</li>
                <li>Assistant: I can ask the team to call you, or stop here.</li>
                <li>Priya: Please don&apos;t call me again.</li>
                <li>Assistant: Understood, I&apos;ve removed you. Goodbye.</li>
              </ol>
            </figure>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              Step 4: Follow-up cadence
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0">
              You approve the attempts, the spacing, the hours (inside the
              recipient&apos;s legal window), and whether a voicemail is left.
              Those numbers are agreed before launch. Calling stops after a
              booking, an opt-out, a wrong number, or the maximum. A later text
              or email needs the consent that channel requires under CASL, TCPA
              or PECR.
            </p>
            <OpenItem>
              confirm whether text or SMS follow-up is offered with reactivation.
            </OpenItem>
            <OpenItem>
              confirm a default cadence (attempts, spacing, and whether a
              voicemail is left) before any number is published.
            </OpenItem>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              Step 5: Tracking and results reporting
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0">
              Each contact is marked called, reached, voicemail, interested,
              booked, callback, opted out, wrong number, or escalated. Outcomes
              are reviewed before the next batch.{" "}
              <Link href="/#calculator" className={ext}>
                Estimate it with your own numbers
              </Link>
              .
            </p>
            <OpenItem>
              confirm the campaign report format and how often it is sent.
            </OpenItem>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              How a reactivation campaign launches
            </h2>
            <ol className="m-0 pl-5 flex flex-col gap-2 text-[16px] leading-[1.65] text-white/85">
              <li>Agree the audience and the goal, for example past clients not seen in 12 months who should book a visit.</li>
              <li>Approve the list, the consent basis, the script, the offer, opt-out handling and escalation rules.</li>
              <li>Test the conversation against common objections.</li>
              <li>Run a controlled first batch, review the outcomes, then scale or adjust.</li>
            </ol>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0 mt-3">
              The $250 AI Employee Audit can scope that first campaign, and it
              is credited toward setup.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              Example: re-engaging past clients at 3D Lifestyle
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0">
              3D Lifestyle, a med spa in Calgary NE, uses a Vocemi lead
              reactivation agent to work through its past clients. When a past
              client is interested, the agent guides them to the clinic&apos;s
              approved booking step.{" "}
              <Link href="/industries/med-spas" className={ext}>
                Lead reactivation for med spas
              </Link>
              .
            </p>
            <p className="text-[13px] text-white/75 m-0 mt-2">
              Use-case description. We publish results only when a client
              supplies and approves them.
            </p>
            <OpenItem>
              confirm written permission, and any quote or result 3D Lifestyle
              will approve, before either is published.
            </OpenItem>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              What it costs
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0">
              Reactivation campaigns are scoped on a free call. Vocemi&apos;s
              plans start with the $250 AI Employee Audit, credited toward
              setup.{" "}
              <Link href="/#pricing" className={ext}>
                Homepage pricing
              </Link>
              .
            </p>
            <OpenItem>
              confirm how reactivation is priced (one-workflow plan, per
              campaign, or by list size) and which currency those amounts use.
            </OpenItem>
          </section>

          <section>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0">
              Common lists look like lapsed policy quotes, overdue maintenance
              customers, and patients overdue for a visit. Guides:{" "}
              <Link href="/industries/insurance" className={ext}>
                insurance brokerages
              </Link>
              ,{" "}
              <Link href="/industries/hvac-plumbing" className={ext}>
                HVAC and plumbing
              </Link>
              ,{" "}
              <Link href="/industries/dental" className={ext}>
                dental practices
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-4">
              Lead reactivation FAQs
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {answeredFaqs.map((faq, index) => (
                <div key={faq.question} className="border border-white/25 p-4">
                  <p className="text-[12px] tracking-wide text-brand-light m-0 mb-1">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-base font-bold m-0 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-white/85 m-0">
                    <CampaignLine pieces={faq.pieces} />
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 border border-white/25 p-4">
              <h3 className="font-display text-base font-bold m-0 mb-2">
                Can it send texts as well as call?
              </h3>
              <OpenItem>
                confirm whether text or SMS is part of reactivation before this
                question has an answer.
              </OpenItem>
            </div>
          </section>
        </div>

        <section className="border-t border-white/20">
          <div className="max-w-[820px] mx-auto px-6 py-12">
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              Have a list of past customers? Let&apos;s check it first
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0 mb-5">
              Book a free 30-minute call. We will look at who is on your list,
              the consent you have, and the one campaign worth running first. If
              the list doesn&apos;t meet the rules, we will tell you before
              anyone is called.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <TrackedLink
                href={book("lead_reactivation_final")}
                event="book_call_clicked"
                properties={{
                  placement: "lead_reactivation_final",
                  service: "lead-reactivation",
                }}
                external
                className="inline-flex items-center justify-center bg-white text-coal px-5 py-3 font-semibold hover:bg-sand"
              >
                Book a free call
              </TrackedLink>
              <TrackedLink
                href={demoHref}
                event="demo_cta_clicked"
                properties={{
                  placement: "lead_reactivation_final",
                  service: "lead-reactivation",
                }}
                className="inline-flex items-center justify-center border border-white/40 px-5 py-3 font-semibold hover:border-white"
              >
                {demoLabel}
              </TrackedLink>
            </div>
            <p className="text-[15px] leading-relaxed text-white/85 m-0">
              <a className={ext} href={`tel:${siteConfig.contact.phoneTel}`}>
                {siteConfig.contact.phoneDisplay}
              </a>
              {" · "}
              <a className={ext} href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              {" · "}
              Based in Calgary. Campaigns run for businesses in Canada, the
              United States and the United Kingdom.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
