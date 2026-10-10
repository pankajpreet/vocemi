import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "AI Receptionist: 24/7 Call Answering & Booking | Vocemi",
  absoluteTitle: true,
  description:
    "A done-for-you AI receptionist that answers calls 24/7, qualifies callers, books inside your rules and sends a daily owner report. See pricing and FAQs.",
  path: "/services/ai-receptionist",
  socialTitle: "Vocemi AI Receptionist: answers, qualifies and books calls 24/7",
});

const serviceUtm = {
  source: "vocemi",
  medium: "service_page",
  campaign: "ai_receptionist",
} as const;

type Piece = { text: string; href?: string; external?: boolean };

const answeredFaqs: { question: string; pieces: Piece[] }[] = [
  {
    question: "How much does an AI receptionist cost?",
    pieces: [
      {
        text: "Prices are USD only. One-Workflow is $1,500 USD setup plus from $300 USD/mo. Managed is $3,000 USD setup plus $1,500 USD/mo. The $250 USD audit is credited toward setup.",
      },
    ],
  },
  {
    question: "Will callers know they're talking to an AI?",
    pieces: [
      {
        text: "The greeting is written for that client. It is not a fixed default, and Vocemi is not a self-serve platform. If the call is recorded, that notice is part of the greeting. See the Office of the Privacy Commissioner of Canada's ",
      },
      {
        text: "guidance on recording customer calls",
        href: "https://www.priv.gc.ca/en/privacy-topics/surveillance/02_05_d_14/",
        external: true,
      },
      { text: "." },
    ],
  },
  {
    question: "What happens when the AI receptionist can't answer a question?",
    pieces: [
      {
        text: "It does not guess. It can transfer the call live to a staff phone and leave a written summary.",
      },
    ],
  },
  {
    question: "Can it book appointments straight into my calendar?",
    pieces: [
      {
        text: "Yes. It books into Google Calendar, Outlook, or Cal.com, inside your rules, and sends an SMS confirmation and an email confirmation.",
      },
    ],
  },
  {
    question: "Does it answer after hours and when several people call at once?",
    pieces: [
      {
        text: "It answers 24/7, every day, and it can answer several calls at once. You set what happens after hours: book, take details, or escalate emergencies.",
      },
    ],
  },
  {
    question: "How long does it take to set up?",
    pieces: [
      {
        text: "Simple workflows usually launch in 2–4 weeks. Comprehensive custom builds take 6–12 weeks. The timeline is confirmed in the audit.",
      },
    ],
  },
  {
    question: "Who can see call recordings and caller data?",
    pieces: [
      {
        text: "Before launch we document what is recorded, where it is stored, who can access it, retention, and deletion. You keep ownership of your data. See the ",
      },
      { text: "security page", href: "/security" },
      { text: "." },
    ],
  },
  {
    question: "Can I keep my current business phone number?",
    pieces: [
      {
        text: "Vocemi provides a new local number. You can forward calls from your own number to it, or publish the new number and use it directly.",
      },
    ],
  },
];

function joined(pieces: Piece[]) {
  return pieces.map((piece) => piece.text).join("");
}

function Prose({ pieces }: { pieces: Piece[] }) {
  return (
    <>
      {pieces.map((piece, index) =>
        piece.href ? (
          piece.external ? (
            <a
              key={index}
              href={piece.href}
              className="text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
              target="_blank"
              rel="noopener noreferrer"
            >
              {piece.text}
            </a>
          ) : (
            <Link
              key={index}
              href={piece.href}
              className="text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
            >
              {piece.text}
            </Link>
          )
        ) : (
          <span key={index}>{piece.text}</span>
        )
      )}
    </>
  );
}

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.vocemi.com/services/ai-receptionist#service",
      name: "AI Receptionist",
      serviceType: "AI receptionist / AI phone answering service",
      description:
        "A done-for-you AI receptionist that answers business calls 24/7, answers questions from approved information, collects caller details, books appointments inside your rules and routes exceptions to your team, with a daily owner report.",
      url: "https://www.vocemi.com/services/ai-receptionist",
      provider: { "@id": "https://www.vocemi.com/#organization" },
      areaServed: [
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "City", name: "Calgary" },
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType:
          "Small and mid-sized service businesses that rely on phone calls",
      },
      isRelatedTo: {
        "@id": "https://www.vocemi.com/services/lead-reactivation#service",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.vocemi.com/services/ai-receptionist#faq",
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
          name: "AI Receptionist",
          item: "https://www.vocemi.com/services/ai-receptionist",
        },
      ],
    },
  ],
};

const linkClass =
  "text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand";

export default function AiReceptionistPage() {
  const demoHref = siteConfig.voiceDemoAvailable ? "/start#talk" : "/start";
  const demoLabel = siteConfig.voiceDemoAvailable
    ? "Try the live demo"
    : "See how it works";
  const book = (placement: string) =>
    siteConfig.bookCallUrl(placement, serviceUtm);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <article className="bg-cream text-ink">
        <header className="max-w-[760px] mx-auto px-6 pt-14 pb-10 md:pt-20">
          <nav aria-label="Breadcrumb" className="text-[13px] text-ink/70 mb-8">
            <Link href="/" className="hover:text-brand">
              Home
            </Link>
            <span aria-hidden="true"> › </span>
            <Link href="/services" className="hover:text-brand">
              Services
            </Link>
            <span aria-hidden="true"> › </span>
            <span>AI Receptionist</span>
          </nav>
          <p className="text-[13px] font-semibold tracking-wide text-brand m-0 mb-3">
            AI Receptionist · Done for you by a Calgary-based team
          </p>
          <h1 className="font-display text-[2rem] md:text-[2.75rem] leading-[1.12] font-extrabold tracking-[-0.02em] m-0 mb-5">
            An AI receptionist that answers, qualifies and books your calls, 24/7
          </h1>
          <p className="text-[17px] leading-[1.65] text-ink/80 m-0 mb-6">
            A Vocemi AI receptionist answers your business calls 24/7, including
            after hours and when several people call at once. It answers from
            information you approve, collects caller details, and books inside
            your rules. Urgent or unusual calls go to your team. Vocemi builds
            and tunes it, usually within 2–4 weeks, and sends a daily report of
            every call.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <TrackedLink
              href={demoHref}
              event="demo_cta_clicked"
              properties={{
                placement: "ai_receptionist_hero",
                service: "ai-receptionist",
              }}
              className="inline-flex items-center justify-center bg-brand text-white px-5 py-3 rounded-md font-semibold hover:bg-brand-dark"
            >
              {demoLabel}
            </TrackedLink>
            <TrackedLink
              href={book("ai_receptionist_hero")}
              event="book_call_clicked"
              properties={{
                placement: "ai_receptionist_hero",
                service: "ai-receptionist",
              }}
              external
              className="inline-flex items-center justify-center border border-ink/20 px-5 py-3 rounded-md font-semibold hover:border-ink/50"
            >
              Book a free call
            </TrackedLink>
          </div>
        </header>

        <div className="max-w-[760px] mx-auto px-6 pb-16 flex flex-col gap-12">
          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              What happens when a customer calls
            </h2>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0 mb-4">
              One inbound call runs in five steps, from the rules you approve
              before launch.
            </p>
            <ol className="m-0 pl-5 flex flex-col gap-2 text-[16.5px] leading-[1.65] text-ink/80">
              <li>It answers on the first ring, in your greeting and brand voice, and says it is an automated assistant.</li>
              <li>It works out why the person is calling.</li>
              <li>It answers from approved information: hours, services, prices or ranges you approved, and policies.</li>
              <li>It collects name, number, reason, and urgency.</li>
              <li>It books or routes: real times inside your booking rules, or a handoff to a person.</li>
            </ol>
            <figure className="mt-5 border-l-4 border-brand bg-white px-4 py-3">
              <figcaption className="text-[13px] font-semibold text-ink mb-2">
                Illustrative scenario showing how an approved workflow runs. Not
                a recording of a real call.
              </figcaption>
              <ol className="m-0 pl-5 text-[15px] leading-[1.6] text-ink/80 flex flex-col gap-1">
                <li>Caller: I would like a first visit Thursday afternoon.</li>
                <li>Assistant: I am the clinic&apos;s automated assistant. Thursday at 2:30 or 4:15 is open. Which should I hold?</li>
                <li>Caller: 2:30. Can you waive the booking fee?</li>
                <li>Assistant: I can book 2:30. A fee exception waits for the team, so I will flag it with your name and number.</li>
              </ol>
            </figure>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              Calls it handles, and calls it passes to your team
            </h2>
            <h3 className="font-display text-lg font-bold m-0 mb-2">
              Handled by the AI receptionist
            </h3>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0 mb-4">
              Common questions, new enquiries, booking, rescheduling and
              cancellation inside your rules, quote or intake details,
              message-taking, and routing to the right person.
            </p>
            <h3 className="font-display text-lg font-bold m-0 mb-2">
              Always passed to a person
            </h3>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              Emergencies, clinical or legal or insurance or financial advice,
              pricing exceptions, discounts, refunds, complaints, and anything
              unsure. Those calls can be transferred live to a staff phone, with
              a written summary.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              After-hours, weekend and busy-hour coverage
            </h2>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              It answers 24/7, every day, including lunch, evenings, and
              weekends, and it answers several calls at once. In a 2016 study of 85 US
              businesses by 411 Locals, 62% of calls were not answered by a
              person (voicemail or no response).{" "}
              <Link href="/blog/missed-call-statistics" className={linkClass}>
                How to measure your own missed-call rate
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              Booking and integrations
            </h2>
            <h3 className="font-display text-lg font-bold m-0 mb-2">
              Books into your calendar
            </h3>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              It offers real open times inside your rules. The caller receives
              an SMS confirmation and an email confirmation.
            </p>
            <h3 className="font-display text-lg font-bold mt-5 mb-2">
              Updates the tools you already use
            </h3>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              Connected tools are Google Calendar, Outlook, and Cal.com. The
              Managed plan also covers phone, inbox, and CRM.
            </p>
            <h3 className="font-display text-lg font-bold mt-5 mb-2">
              Integration scope is confirmed before launch
            </h3>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              Vocemi provides a new local number. You can forward your own
              number to it, or use the new number directly. If a calendar
              connection is not ready, staff confirm the booking request.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              Approvals, transcripts and a daily owner report
            </h2>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              You approve the call flow, the answers, and the booking rules
              before launch. Every call is transcribed, logged, and searchable.
              100% of calls are logged and reported, and a daily summary lands
              in your inbox. The{" "}
              <Link href="/#owner-visibility" className={linkClass}>
                owner visibility
              </Link>{" "}
              sample is labelled sample data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              From first call to live in 2–4 weeks
            </h2>
            <ol className="m-0 pl-5 flex flex-col gap-2 text-[16.5px] leading-[1.65] text-ink/80">
              <li>Pick the call type that is costing you the most, such as after-hours new enquiries. The $250 USD AI Employee Audit can do this mapping, and it is credited toward setup.</li>
              <li>Write the rules: questions, approved answers, booking rules and escalation paths.</li>
              <li>Test expected calls and edge cases, including a question it should not know.</li>
              <li>Go live, review real calls, and improve.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              Client example: 3D Lifestyle, a Calgary med spa
            </h2>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              3D Lifestyle is a med spa in Calgary NE. The receptionist answers
              while the front desk is with a client, so a routine enquiry does
              not pull staff away. iSmart Insurance is a separate published
              example: intake collects quote details without a broker on the
              call, saving roughly 10 minutes per quote, a client-supplied
              figure. No client quote or logo is shown.{" "}
              <Link href="/industries/med-spas" className={linkClass}>
                See how it works for med spas
              </Link>
              .
            </p>
            <p className="text-[13px] text-ink/70 m-0 mt-3">
              Workflow description only; no unverified performance result is
              implied.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              What an AI receptionist costs with Vocemi
            </h2>
            <ul className="m-0 pl-5 flex flex-col gap-2 text-[16.5px] leading-[1.65] text-ink/80">
              <li>AI Employee Audit: $250 USD, one-time, credited toward setup.</li>
              <li>One-Workflow AI Employee: $1,500 USD one-time setup + from $300 USD/mo.</li>
              <li>Managed AI Employee: $3,000 USD setup + $1,500 USD/mo.</li>
            </ul>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0 mt-3">
              Prices are USD only. Scope is confirmed on a free call.{" "}
              <Link href="/#pricing" className={linkClass}>
                Pricing
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              AI receptionist, answering service or voicemail?
            </h2>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              An AI receptionist suits repeatable calls and after-hours volume.
              A live answering service suits calls that need a person every
              time. Read{" "}
              <Link
                href="/blog/ai-receptionist-vs-answering-service"
                className={linkClass}
              >
                AI receptionist vs. answering service vs. voicemail
              </Link>
              , and{" "}
              <Link
                href="/blog/full-duplex-voice-ai-business-calls"
                className={linkClass}
              >
                why newer voice AI handles interruptions better
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              Built for phone-heavy service businesses
            </h2>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              Published guides:{" "}
              <Link href="/industries/med-spas" className={linkClass}>
                med spas
              </Link>
              ,{" "}
              <Link href="/industries/dental" className={linkClass}>
                dental practices
              </Link>
              ,{" "}
              <Link href="/industries/hvac-plumbing" className={linkClass}>
                HVAC and plumbing
              </Link>
              , and{" "}
              <Link href="/industries/insurance" className={linkClass}>
                insurance brokerages
              </Link>
              . Jag Duggal&apos;s published property-management workflow handles
              tenant enquiries day or night. For other languages, read{" "}
              <Link
                href="/blog/multilingual-voice-ai-calgary"
                className={linkClass}
              >
                the multilingual voice AI guide
              </Link>
              . The receptionist is built for English. It can support more than
              one language, and no language other than English is offered as
              production-ready.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              Also calling past customers?
            </h2>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              Want the AI to call past clients and old leads back, rather than
              answer incoming calls? That is a separate, consent-first workflow:{" "}
              <Link href="/services/lead-reactivation" className={linkClass}>
                AI lead reactivation calls
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-4">
              AI receptionist FAQs
            </h2>
            <div className="flex flex-col gap-6">
              {answeredFaqs.map((faq) => (
                <div key={faq.question} className="border-t border-ink/15 pt-4">
                  <h3 className="font-display text-[1.05rem] font-bold m-0 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[16px] leading-[1.65] text-ink/80 m-0">
                    <Prose pieces={faq.pieces} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="bg-sand border-t border-ink/10">
          <div className="max-w-[760px] mx-auto px-6 py-12">
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              Hear it answer before you decide
            </h2>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0 mb-5">
              {siteConfig.voiceDemoAvailable
                ? "Call the live demo and try to book, ask about pricing, or ask something it should not know. Or book a free 30-minute call and we will map the first call workflow worth automating."
                : "Book a free 30-minute call and we will map the first call workflow worth automating."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <TrackedLink
                href={demoHref}
                event="demo_cta_clicked"
                properties={{
                  placement: "ai_receptionist_final",
                  service: "ai-receptionist",
                }}
                className="inline-flex items-center justify-center bg-brand text-white px-5 py-3 rounded-md font-semibold hover:bg-brand-dark"
              >
                {demoLabel}
              </TrackedLink>
              <TrackedLink
                href={book("ai_receptionist_final")}
                event="book_call_clicked"
                properties={{
                  placement: "ai_receptionist_final",
                  service: "ai-receptionist",
                }}
                external
                className="inline-flex items-center justify-center border border-ink/20 bg-white px-5 py-3 rounded-md font-semibold hover:border-ink/50"
              >
                Book a free call
              </TrackedLink>
            </div>
            <p className="text-[15px] leading-relaxed text-ink/80 m-0">
              <a className={linkClass} href={`tel:${siteConfig.contact.phoneTel}`}>
                Call {siteConfig.contact.phoneDisplay}
              </a>
              {" · "}
              <a className={linkClass} href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              {" · "}
              Calgary-based, serving Canada, the US and the UK.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}
