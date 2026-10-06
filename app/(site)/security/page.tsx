import type { Metadata } from "next";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Security & Data Handling",
  description:
    "A plain-language overview of how the Vocemi website handles analytics, voice demo, booking, and contact information.",
  path: "/security",
  socialDescription:
    "See which providers support the Vocemi website and when information is shared with them.",
});

const websiteSystems = [
  {
    name: "Website analytics",
    provider: "Vercel Analytics",
    trigger: "When a page loads or a measured website action occurs",
    purpose:
      "Counts visits and selected actions so we can understand which pages and calls to action are useful.",
  },
  {
    name: "Live voice demo",
    provider: "Retell AI and Google reCAPTCHA",
    trigger: "Only after you choose to start the demo",
    purpose:
      "Processes microphone audio so the demonstration agent can reply and checks that the request is not automated.",
  },
  {
    name: "Call booking",
    provider: "Cal.com",
    trigger: "When you open a booking link and submit information there",
    purpose:
      "Collects the booking details needed to arrange a consultation.",
  },
  {
    name: "Contact form",
    provider: "Resend",
    trigger: "When you submit the contact form",
    purpose:
      "Delivers the name, email, company, and message you provide to the Vocemi business inbox.",
  },
];

export default function SecurityPage() {
  return (
    <div>
      <section className="max-w-[900px] mx-auto px-6 md:px-8 pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-4">
          Security &amp; data handling
        </div>
        <h1 className="font-display text-[40px] md:text-[56px] leading-[1.06] tracking-[-0.025em] font-extrabold text-ink m-0 mb-6">
          Clear facts about what this website uses
        </h1>
        <p className="text-lg leading-[1.7] text-ink/60 max-w-[720px] m-0">
          This page describes the systems used by vocemi.com. A client Voice AI
          project can involve different tools and data, so its exact recording,
          access, retention, and deletion rules are documented before launch.
        </p>
        <TrackedLink
          href={siteConfig.bookCallUrl}
          event="book_call_clicked"
          properties={{ placement: "security_hero" }}
          external
          className="inline-flex items-center justify-center mt-8 bg-brand text-white px-[26px] py-4 rounded-[9px] text-[15.5px] font-semibold text-center hover:bg-brand-dark transition-colors"
        >
          Book a free call
        </TrackedLink>
      </section>

      <section className="bg-sand py-14 md:py-20">
        <div className="max-w-[1000px] mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-5">
          {websiteSystems.map((system) => (
            <article
              key={system.name}
              className="bg-white border border-ink/10 rounded-2xl p-7"
            >
              <div className="text-[12px] font-bold uppercase tracking-[0.07em] text-brand mb-2">
                {system.provider}
              </div>
              <h2 className="font-display text-xl font-bold text-ink m-0 mb-4">
                {system.name}
              </h2>
              <dl className="m-0 flex flex-col gap-4">
                <div>
                  <dt className="font-semibold text-sm text-ink mb-1">When</dt>
                  <dd className="text-[14.5px] leading-[1.6] text-ink/60 m-0">
                    {system.trigger}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm text-ink mb-1">Why</dt>
                  <dd className="text-[14.5px] leading-[1.6] text-ink/60 m-0">
                    {system.purpose}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-[900px] mx-auto px-6 md:px-8 py-14 md:py-20">
        <h2 className="font-display text-3xl md:text-[40px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink m-0 mb-5">
          What is confirmed for each client project
        </h2>
        <ul className="m-0 p-0 list-none grid sm:grid-cols-2 gap-4">
          {[
            "What gets recorded or stored",
            "Which providers process it",
            "Who can access it",
            "How exceptions reach a person",
            "How long information is retained",
            "How correction or deletion requests are handled",
          ].map((item) => (
            <li
              key={item}
              className="border border-ink/10 rounded-xl px-5 py-4 text-[15px] text-ink/65"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 bg-ink rounded-2xl p-7 md:p-9 text-white">
          <h2 className="font-display text-2xl font-bold m-0 mb-3">
            Ask a data-handling question
          </h2>
          <p className="text-white/60 leading-[1.65] m-0 mb-5">
            Email us to ask what this website holds about you or to discuss the
            data flow for a proposed project.
          </p>
          <TrackedLink
            href={`mailto:${siteConfig.contact.email}`}
            event="email_clicked"
            properties={{ placement: "security_page" }}
            className="inline-flex bg-brand text-white px-5 py-3 rounded-[9px] font-semibold hover:bg-[#5A70FF] transition-colors"
          >
            {siteConfig.contact.email}
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
