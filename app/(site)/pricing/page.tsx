import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/home/Reveal";
import BonusBlock from "@/components/offer/BonusBlock";
import { AuditButton, CallDemoButton, TrialButton } from "@/components/offer/CtaButtons";
import { CurrencyToggle } from "@/components/offer/Currency";
import FaqList from "@/components/offer/FaqList";
import { PlanGrid } from "@/components/offer/PlanCard";
import { AddOnBlock, IncludesList } from "@/components/offer/PricingExtras";
import Promises from "@/components/offer/Promises";
import SectionIntro from "@/components/offer/SectionIntro";
import {
  FaqStructuredData,
  PricingStructuredData,
} from "@/components/StructuredData";
import { pageMetadata } from "@/lib/metadata";
import { plans, pricingFaqs, pricingNote } from "@/lib/plans";

export const metadata: Metadata = pageMetadata({
  title: "AI Receptionist Pricing: $0 Setup, Free 14-Day Trial | Vocemi",
  absoluteTitle: true,
  description:
    "Starter $197, Growth $297, Scale $997 a month. $0 setup, live in 7 days, free for 14 (30 for HVAC & plumbing). No card for the trial. Prices in USD or CAD.",
  path: "/pricing",
});

const waveBars = Array.from({ length: 56 }, (_, i) => ({
  dur: 0.9 + (i % 6) * 0.16,
  delay: (i % 11) * 0.07,
}));

export default function PricingPage() {
  return (
    <>
      <PricingStructuredData plans={plans} />
      <FaqStructuredData faqs={pricingFaqs} />

      <section className="relative overflow-hidden">
        {/* Waveform wash behind the headline. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 flex items-end justify-center gap-[7px] opacity-[0.12] px-4"
        >
          {waveBars.map((bar, i) => (
            <span
              key={i}
              className="w-[6px] rounded-t-[3px] bg-gradient-to-t from-brand to-brand-light h-full origin-bottom animate-wave"
              style={{ animationDuration: `${bar.dur}s`, animationDelay: `${bar.delay}s` }}
            />
          ))}
        </div>
        <div className="relative max-w-[900px] mx-auto px-6 md:px-8 pt-10 pb-20 md:pt-14 md:pb-28 text-center">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ name: "Pricing", path: "/pricing" }]} />
          </div>
          <div className="animate-fadeUp">
            <div className="inline-flex items-center gap-2 bg-brand-tint text-brand px-3.5 py-[7px] rounded-full text-[13px] font-semibold mb-5">
              <span className="w-[7px] h-[7px] rounded-full bg-brand animate-pulseDot" />
              $0 setup · No card for the trial
            </div>
            <h1 className="font-display text-[40px] md:text-[60px] leading-[1.04] tracking-[-0.025em] font-extrabold text-ink m-0 mb-5">
              Simple pricing. No setup fee.{" "}
              <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                Try it free.
              </span>
            </h1>
            <p className="text-[17px] md:text-lg leading-[1.65] text-ink/65 m-0 mb-8 max-w-[680px] mx-auto">
              We build, launch and run an AI receptionist for your business. It
              answers the calls you miss, books appointments into your calendar,
              and texts you a summary. It&apos;s live in 7 days, and the first 14
              days are free.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <CallDemoButton placement="pricing_hero" label="Call our AI now" variant="primary" />
              <TrialButton
                placement="pricing_hero"
                label="Start my free trial"
                className="[a+&]:bg-ink [a+&]:hover:bg-brand"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 md:py-24 scroll-mt-16" id="plans">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8">
          <h2 className="sr-only">Plans</h2>
          <Reveal className="flex flex-col items-center gap-3 mb-10">
            <span className="text-[13px] font-semibold text-ink/65">Show prices in</span>
            <CurrencyToggle placement="pricing_page" />
          </Reveal>
          <PlanGrid plans={plans} placement="pricing_page" />
          <p className="text-center text-[13.5px] leading-[1.6] text-ink/70 italic max-w-[720px] mx-auto m-0 mt-8">
            {pricingNote}
          </p>
        </div>
      </section>

      <section className="max-w-[1080px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <SectionIntro eyebrow="Every plan includes" title="No add-ons to get started" />
        <IncludesList />
      </section>

      <section className="max-w-[1080px] mx-auto px-6 md:px-8 pb-16 md:pb-24 grid lg:grid-cols-2 gap-6 items-stretch">
        <Reveal className="h-full">
          <BonusBlock />
        </Reveal>
        <Reveal delay={0.12} className="h-full">
          <AddOnBlock />
        </Reveal>
      </section>

      <section className="bg-sand py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <SectionIntro eyebrow="Our promises" title="Four things you can hold us to" />
          <Promises />
        </div>
      </section>

      <section id="faq" className="max-w-[800px] mx-auto px-6 md:px-8 py-16 md:py-24 scroll-mt-16">
        <SectionIntro eyebrow="Pricing FAQ" title="Questions about plans and minutes" />
        <FaqList faqs={pricingFaqs} />
      </section>

      <section className="max-w-[1180px] mx-auto px-6 md:px-8 pb-16 md:pb-[100px]">
        <Reveal>
          <div className="bg-ink rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-[60px] -right-[60px] w-[220px] h-[220px] rounded-full animate-floatSlow"
              style={{ background: "radial-gradient(circle, rgba(59,84,244,0.35), transparent 70%)" }}
            />
            <h2 className="relative font-display text-3xl md:text-[42px] font-extrabold tracking-[-0.025em] leading-[1.1] text-white m-0 mb-3.5">
              Hear it before you decide.
            </h2>
            <p className="relative text-[16.5px] text-white/65 m-0 mb-[30px] max-w-[520px] mx-auto">
              Call the AI yourself, or let us show you which calls you&apos;re
              missing today.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
              <CallDemoButton placement="pricing_final_cta" variant="dark" size="lg" />
              <AuditButton
                placement="pricing_final_cta"
                label="Get a free missed-call audit"
                variant="ghostDark"
                size="lg"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
