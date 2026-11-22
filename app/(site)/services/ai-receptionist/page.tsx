import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";
import { getPlan, planPrice } from "@/lib/plans";
import { AuditButton, CallDemoButton, TrialButton } from "@/components/offer/CtaButtons";

export const metadata: Metadata = pageMetadata({
  title: "AI Receptionist: $0 Setup, Live in 7 Days, Free Trial | Vocemi",
  absoluteTitle: true,
  description:
    "A done-for-you AI receptionist that answers the calls you miss, books inside your rules, tells callers it's an AI and texts you about urgent calls. $0 setup, live in 7 days, free for 14.",
  path: "/services/ai-receptionist",
  socialTitle: "Vocemi AI Receptionist: answers the calls you miss, live in 7 days",
});

const starter = getPlan("starter");
const startingPrice = planPrice(starter, "usd");
const startingPriceCad = planPrice(starter, "cad");

type Piece = { text: string; href?: string; external?: boolean };

const answeredFaqs: { question: string; pieces: Piece[] }[] = [
  {
    question: "How much does an AI receptionist cost?",
    pieces: [
      {
        text: `Plans start at ${startingPrice} USD a month (${startingPriceCad}) with $0 setup, and the first 14 days are free. Plans differ only by minutes and support. `,
      },
      { text: "See pricing", href: "/pricing" },
      { text: "." },
    ],
  },
  {
    question: "Will callers know they're talking to an AI?",
    pieces: [
      {
        text: "Yes. It tells callers it's an AI assistant and passes them to your team when they need a person. The rest of the greeting is written for each client, and if the call is recorded, that notice is part of it. See the Office of the Privacy Commissioner of Canada's ",
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
        text: "Yes. It answers the calls you forward to it, day or night, and it can answer several calls at once. You set what happens after hours: book, take details, or flag urgent calls to you right away.",
      },
    ],
  },
  {
    question: "How long does it take to set up?",
    pieces: [
      {
        text: "Live in 7 days. We build it for you; there is no DIY setup. Custom plans that connect to your own software are scoped after a free audit.",
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
        "A done-for-you AI receptionist that answers the calls a business misses, answers questions from approved information, collects caller details, books appointments inside your rules and routes exceptions to your team.",
      url: "https://www.vocemi.com/services/ai-receptionist",
      provider: { "@id": "https://www.vocemi.com/#organization" },
      areaServed: [
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "United States" },
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
            An AI receptionist that answers the calls you miss and books them in
          </h1>
          <p className="text-[17px] leading-[1.65] text-ink/80 m-0 mb-6">
            A Vocemi AI receptionist answers the calls you can&apos;t get to,
            including after hours and when several people call at once. It
            tells callers it&apos;s an AI, answers from information you approve,
            collects caller details, and books inside your rules. Urgent or
            unusual calls go to your team. We build it for you, it&apos;s live in
            7 days, and the first 14 days are free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <TrialButton
              placement="ai_receptionist_hero"
              label="Start my free trial"
              className="rounded-md px-5 py-3"
            />
            {siteConfig.demoCallAvailable ? (
              <CallDemoButton placement="ai_receptionist_hero" className="rounded-md px-5 py-3" />
            ) : (
              <TrackedLink
                href={demoHref}
                event="demo_cta_clicked"
                properties={{
                  placement: "ai_receptionist_hero",
                  service: "ai-receptionist",
                }}
                className="inline-flex items-center justify-center border border-ink/20 px-5 py-3 rounded-md font-semibold hover:border-ink/50"
              >
                {demoLabel}
              </TrackedLink>
            )}
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
              <li>It answers in your greeting and brand voice, and says it is an AI assistant.</li>
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
                <li>Assistant: I am the clinic&apos;s AI assistant. Thursday at 2:30 or 4:15 is open. Which should I hold?</li>
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
              It picks up the calls you forward to it, including lunch, evenings
              and weekends, and it answers several calls at once. In a 2016 study of 85 US
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
              Connected tools are Google Calendar, Outlook, and Cal.com. The{" "}
              <Link href="/pricing#custom" className={linkClass}>
                Custom plan
              </Link>{" "}
              also updates your CRM, agency management system, ServiceTitan or
              Jobber.
            </p>
            <h3 className="font-display text-lg font-bold mt-5 mb-2">
              Integration scope is confirmed before launch
            </h3>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              Keep your number. You forward the calls you don&apos;t answer to
              your AI, and nothing changes for your customers. If a calendar
              connection is not ready, staff confirm the booking request.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              Approvals, call summaries and urgent alerts
            </h2>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              You approve the call flow, the answers, and the booking rules
              before launch. You get an email summary of every call and an
              instant text about urgent calls; Growth adds a daily digest. The{" "}
              <Link href="/#owner-visibility" className={linkClass}>
                owner visibility
              </Link>{" "}
              sample is labelled sample data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              From first call to live in 7 days
            </h2>
            <ol className="m-0 pl-5 flex flex-col gap-2 text-[16.5px] leading-[1.65] text-ink/80">
              <li>Optional: a free missed-call audit shows which calls you&apos;re missing and when.</li>
              <li>We build it in 7 days: questions, approved answers, booking rules and escalation paths, tested against edge cases.</li>
              <li>Your free 14-day trial (30 days for HVAC and plumbing): forward the calls you miss and watch it work.</li>
              <li>Keep it on a plan, or walk away and owe nothing.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold m-0 mb-3">
              Client example: 3D Lifestyle, a Calgary med spa
            </h2>
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              3D Lifestyle is a med spa in Calgary NE. The receptionist answers
              while the front desk is with a client, so a routine enquiry does
              not pull staff away, and it answers after-hours calls. Separately,
              an AI intake agent we ran for an insurance brokerage answered 776
              calls in April 2026.{" "}
              <Link href="/results" className={linkClass}>
                See results
              </Link>
              .{" "}
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
            <p className="text-[16.5px] leading-[1.7] text-ink/80 m-0">
              $0 setup, and the first 14 days are free. Plans start at{" "}
              {startingPrice} USD a month ({startingPriceCad}), with the same AI
              on every plan; they differ only by minutes and support.{" "}
              <Link href="/pricing" className={linkClass}>
                See plans and pricing
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
              Built for:{" "}
              <Link href="/industries/med-spas" className={linkClass}>
                med spas
              </Link>
              ,{" "}
              <Link href="/industries/vet-clinics" className={linkClass}>
                vet clinics
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
                Lead reactivation campaigns
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
                ? "Call the live demo and try to book, ask about pricing, or ask something it should not know. Or start your free trial: no card, no login, live in 7 days."
                : "Start your free trial: no card, no login, live in 7 days. Or get a free missed-call audit first."}
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
              <TrialButton
                placement="ai_receptionist_final"
                label="Start my free trial"
                variant="secondary"
                className="rounded-md px-5 py-3 bg-white"
              />
              <AuditButton
                placement="ai_receptionist_final"
                label="Get a free missed-call audit"
                className="rounded-md px-5 py-3 bg-white"
              />
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
              Based in Calgary, serving Canada and the US.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}
