import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Vocemi handles information collected through vocemi.com, including analytics and the AI voice demo.",
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <section className="max-w-[720px] mx-auto px-6 py-16 md:py-24">
      <h1 className="font-display text-[34px] md:text-[46px] font-extrabold tracking-[-0.025em] text-ink m-0 mb-4">
        Privacy Policy
      </h1>
      <p className="text-[15px] text-ink/45 m-0 mb-10">
        Last updated {new Date().getFullYear()}
      </p>

      <div className="flex flex-col gap-9">
        <div>
          <h2 className="font-display text-[20px] font-bold text-ink m-0 mb-2.5">
            What we collect
          </h2>
          <p className="text-[15.5px] leading-[1.7] text-ink/65 m-0">
            We collect the information you choose to give us &mdash; your name,
            email, phone number, and anything you tell us about your business
            when you book a call, email us, or fill in one of our forms. We
            don&apos;t ask for and don&apos;t want payment details or any
            government identification through this website.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-bold text-ink m-0 mb-2.5">
            Analytics
          </h2>
          <p className="text-[15.5px] leading-[1.7] text-ink/65 m-0">
            We use Vercel Analytics to count page visits and see which buttons
            get used. It does not use cookies and does not build a profile of
            you or follow you to other websites. We use it to answer one
            question: which parts of this site are working.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-bold text-ink m-0 mb-2.5">
            The AI voice demo
          </h2>
          <p className="text-[15.5px] leading-[1.7] text-ink/65 m-0">
            The live demo is powered by ElevenLabs. When you start it, your
            browser asks your permission to use the microphone, and your speech
            is processed by ElevenLabs so the agent can reply. The demo is a
            demonstration, not a real appointment line &mdash; please don&apos;t
            share anything sensitive with it. ElevenLabs handles that audio
            under their own privacy policy.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-bold text-ink m-0 mb-2.5">
            Booking a call
          </h2>
          <p className="text-[15.5px] leading-[1.7] text-ink/65 m-0">
            Our booking links open Google Calendar&apos;s appointment
            scheduling, which collects your name, email, and whatever you add to
            the booking. That happens on Google&apos;s systems under their
            privacy policy.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-bold text-ink m-0 mb-2.5">
            What we do with it
          </h2>
          <p className="text-[15.5px] leading-[1.7] text-ink/65 m-0">
            We use your details to reply to you and to run the work you asked us
            about. We don&apos;t sell your information, and we don&apos;t share
            it with anyone except the service providers named above who help us
            run the site.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-bold text-ink m-0 mb-2.5">
            Your choices
          </h2>
          <p className="text-[15.5px] leading-[1.7] text-ink/65 m-0">
            Email us at{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-brand hover:text-brand-dark transition-colors"
            >
              {siteConfig.contact.email}
            </a>{" "}
            and we&apos;ll tell you what we hold about you, correct it, or
            delete it. No forms, no process &mdash; just ask.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-bold text-ink m-0 mb-2.5">
            Contact
          </h2>
          <p className="text-[15.5px] leading-[1.7] text-ink/65 m-0">
            Vocemi &middot; {siteConfig.location} &middot;{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-brand hover:text-brand-dark transition-colors"
            >
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
