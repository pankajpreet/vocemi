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
        text: "It calls people already in your records, such as past customers, enquiries that never booked, and quotes that were not booked, with one message and one next step you approved. That next step is usually booking back in.",
      },
    ],
  },
  {
    question: "Is it legal to have an AI call my past customers?",
    pieces: [
      {
        text: "Only when that country's rules are met, and this is not legal advice. See the ",
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
        text: "Usually yes for a sales call. In Canada the existing-customer exemption covers the Do Not Call List, not automated-voice consent. In the US, TCPA consent applies to AI voices. In the UK, consent must name automated calls.",
      },
    ],
  },
  {
    question: "What do you need from me to start?",
    pieces: [
      {
        text: "A contact export, the consent basis for each person, your internal do-not-call list, the offer, and who handles escalations. Contacts without the consent a call needs are left out.",
      },
    ],
  },
  {
    question: "How many times will the AI call each person, and when?",
    pieces: [
      {
        text: "The client defines the cadence. An example only, not a Vocemi guarantee, is 3–5 attempts over 7–14 days. Calling stays inside the recipient's legal hours and stops after a booking, an opt-out, a wrong number, or the client's maximum.",
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
        text: "No typical rate is quoted. You review the report before the next batch. ",
      },
      { text: "Estimate it with your own numbers", href: "/#calculator" },
      { text: "." },
    ],
  },
  {
    question: "Can it send texts as well as call?",
    pieces: [
      {
        text: "Yes. Leads can be reached by SMS, WhatsApp, and calls. Follow-up can be SMS or WhatsApp, and the client defines the cadence. A text still needs the consent that channel requires.",
      },
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
        "Consent-first AI voice campaigns that call past customers and unconverted enquiries from an approved list, by SMS, WhatsApp, and phone, offer an approved next step such as booking, honour opt-outs, and report results in a client dashboard.",
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
            Vocemi calls people already in your records, such as past customers,
            unconverted enquiries, and quotes that were not booked, and offers
            one approved next step, usually booking back in. Before anyone is
            called, the list and the consent basis for each contact are checked.
            AI-voice sales calls need prior express consent in Canada and the US,
            and specific consent in the UK. The agent stays inside your script,
            honours opt-outs, and you get a report of who was reached, who
            booked, and who opted out.
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
              One outbound offer to people who already know the business.
              Database reactivation is another name for that job. Incoming calls
              are a different service:{" "}
              <Link href="/services/ai-receptionist" className={ext}>
                AI receptionist for incoming calls
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              Step 1: Clean the list before anyone is called
            </h2>
            <ul className="m-0 pl-5 flex flex-col gap-2 text-[16px] leading-[1.65] text-white/85">
              <li>Source: an export from your CRM, booking software, or a spreadsheet. You approve the final list.</li>
              <li>Remove duplicates, bad numbers, and your internal do-not-call list. Where a National DNCL, National DNC Registry, or TPS/CTPS registration applies, that registration is the client&apos;s responsibility.</li>
              <li>Leave out anyone without the consent that call needs.</li>
            </ul>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0 mt-3">
              If a list doesn&apos;t meet the rules, we&apos;ll say so before
              launch. Leads are reached by SMS, WhatsApp, and calls.
            </p>
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
              assumption is that an AI voice placing calls is covered. A sales
              call needs express consent (written, recorded oral, or electronic,
              with a record). Being a customer does
              not replace it: the exemption covers the National DNCL, not ADAD
              consent (
              <a className={ext} href="https://crtc.gc.ca/eng/archive/2014/2014-155.htm" target="_blank" rel="noopener noreferrer">
                CRTC 2014-155
              </a>
              ;{" "}
              <Link href="/blog/ai-voice-calls-canada-crtc-rules" className={ext}>
                our CRTC guide
              </Link>
              ). Calls identify the caller and the reason, give an email or
              postal address and a local or toll-free number, and stay within
              9:00 a.m.–9:30 p.m. weekdays and 10:00 a.m.–6:00 p.m. weekends,
              recipient&apos;s time (UTRs Part IV).{" "}
              <a className={ext} href="https://www.crtc.gc.ca/eng/archive/2026/2026-132.htm" target="_blank" rel="noopener noreferrer">
                Notice 2026-132
              </a>{" "}
              asks whether ADAD should name AI voices and whether the caller
              must say it is not a live person. Comments closed 27 July 2026,
              replies 11 August 2026, and there is no decision as of October
              2026. Follow-up texts and emails fall under CASL.
            </p>

            <h3 className="font-display text-lg font-bold m-0 mb-2">
              United States
            </h3>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0 mb-4">
              In February 2024 the FCC treated AI-generated voices as an
              artificial or prerecorded voice under the TCPA: prior express
              consent, and prior express written consent for telemarketing (
              <a className={ext} href="https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf" target="_blank" rel="noopener noreferrer">
                FCC 24-17
              </a>
              ,{" "}
              <a className={ext} href="https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200" target="_blank" rel="noopener noreferrer">
                47 CFR 64.1200
              </a>
              ). Calls identify the caller and offer an opt-out. The federal
              window is 8 a.m.–9 p.m. local. Florida and Oklahoma are stricter.
              Opt-outs are honoured on the call.
            </p>

            <h3 className="font-display text-lg font-bold m-0 mb-2">
              United Kingdom
            </h3>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0 mb-4">
              PECR regulation 19 requires specific prior consent to automated
              calls. General marketing consent, or consent to live calls, is
              not enough. A service message is not marketing until an offer is
              added. Calls must name
              the business and give a contact number (
              <a className={ext} href="https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/telephone-marketing/" target="_blank" rel="noopener noreferrer">
                ICO: telephone marketing
              </a>
              ). The ICO describes a live call as a live person speaking, so
              the cautious reading is that an AI voice is not a live call.
              Penalties are significant.
            </p>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0">
              The greeting is written for that client. It is not a fixed default,
              and this is not a self-serve platform.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              Step 3: The script: what the AI says, and what it won&apos;t
            </h2>
            <ol className="m-0 pl-5 flex flex-col gap-2 text-[16px] leading-[1.65] text-white/85">
              <li>Name the business, say it is an automated assistant, and state why you are calling.</li>
              <li>Give one approved offer and one next step: book, request a callback, or send information.</li>
              <li>Honour an opt-out on that call. Send complaints and pricing exceptions to your team.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              Step 4: Follow-up cadence
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0">
              The client defines how many attempts, the spacing, and the hours,
              inside the recipient&apos;s legal window. An example only, not a
              Vocemi guarantee, is 3–5 attempts over 7–14 days. Follow-up can
              be SMS or WhatsApp, and that message still
              needs the consent CASL, TCPA, or PECR requires for the channel.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              Step 5: Tracking and results reporting
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0">
              Each contact is marked called, reached, voicemail, interested,
              booked, callback, opted out, wrong number, or escalated. Outcomes
              are reviewed before the next batch. The client dashboard is
              available anytime.{" "}
              <Link href="/#calculator" className={ext}>
                Estimate it with your own numbers
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              How a reactivation campaign launches
            </h2>
            <ol className="m-0 pl-5 flex flex-col gap-2 text-[16px] leading-[1.65] text-white/85">
              <li>Agree the audience, such as past clients who should book a visit.</li>
              <li>Approve the list, the consent basis, the script, and the offer.</li>
              <li>Run a first batch, review the outcomes, then adjust.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              What it costs
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0">
              Reactivation pricing is customized. There is no public price.
              The quote is prepared for that list and that campaign.
            </p>
          </section>

          <section>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0">
              Guides:{" "}
              <Link href="/industries/med-spas" className={ext}>
                med spas
              </Link>
              ,{" "}
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
          </section>
        </div>

        <section className="border-t border-white/20">
          <div className="max-w-[820px] mx-auto px-6 py-12">
            <h2 className="font-display text-2xl font-extrabold m-0 mb-3">
              Have a list of past customers? Let&apos;s check it first
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/85 m-0 mb-5">
              Book a free 30-minute call. We will look at the list, the consent
              you have, and the one campaign worth running first.
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
