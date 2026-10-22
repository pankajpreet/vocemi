import type { Metadata } from "next";
import Link from "next/link";
import AuditLink from "@/components/site/AuditLink";
import CallDemoLink from "@/components/site/CallDemoLink";
import PlanCards, { CurrencyToggle } from "@/components/site/PlanCards";
import FaqList from "@/components/site/FaqList";
import {
  CallEstimateNote,
  ComebackBlocks,
  PlanIncludes,
  Promises,
} from "@/components/site/MarketingSections";
import {
  FaqStructuredData,
  PricingStructuredData,
} from "@/components/StructuredData";
import { auditBookingUrl } from "@/lib/bookingUrls";
import { pageMetadata } from "@/lib/metadata";
import { pricingFaqs, pricingIntro } from "@/lib/pricingFaq";
import { btnPrimary, btnSecondary, h2, sectionWrap } from "@/components/site/styles";

export const metadata: Metadata = pageMetadata({
  title: "AI Receptionist Pricing: $0 Setup, Free 14-Day Trial | Vocemi",
  absoluteTitle: true,
  description: pricingIntro,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PricingStructuredData />
      <FaqStructuredData faqs={pricingFaqs} />
      <section className={`${sectionWrap} pt-12 pb-8 md:pt-16`}>
        <h1 className="font-display text-[34px] sm:text-[46px] md:text-[56px] leading-[1.05] tracking-[-0.03em] font-extrabold text-ink m-0 mb-5">
          Simple pricing. No setup fee. Try it free.
        </h1>
        <p className="text-[17px] leading-[1.6] text-ink/75 max-w-[720px] m-0 mb-6">
          {pricingIntro}
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
          <CallDemoLink placement="pricing_hero" label="now" className={btnPrimary} />
          <Link href="/free-trial" className={btnPrimary}>
            Start my free trial
          </Link>
        </div>
        <CurrencyToggle />
        <div className="mt-8">
          <PlanCards
            auditHref={auditBookingUrl("pricing_custom")}
            auditPlacement="pricing_custom"
            titleAs="h2"
          />
          <CallEstimateNote />
        </div>
      </section>
      <PlanIncludes />
      <ComebackBlocks />
      <Promises />
      <section className={`${sectionWrap} pb-8`}>
        <h2 className={`${h2} mb-6`}>Pricing FAQ</h2>
        <FaqList faqs={pricingFaqs} idPrefix="pricing-faq" />
      </section>
      <section className={`${sectionWrap} py-14 md:py-16`}>
        <h2 className={`${h2} mb-6`}>Hear it before you decide.</h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <CallDemoLink placement="pricing_bottom" label="hear" className={btnSecondary} />
          <AuditLink placement="pricing_bottom" className={btnPrimary}>
            Get a free missed-call audit
          </AuditLink>
        </div>
      </section>
    </>
  );
}
