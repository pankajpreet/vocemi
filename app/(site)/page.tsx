import type { Metadata } from "next";
import FaqList from "@/components/site/FaqList";
import {
  HeroSection,
  HowItWorks,
  IndustryPicker,
  PricingPreviewNote,
  Promises,
  ProofStrip,
  WontDo,
} from "@/components/site/MarketingSections";
import PlanCards from "@/components/site/PlanCards";
import CallDemoLink from "@/components/site/CallDemoLink";
import { FaqStructuredData } from "@/components/StructuredData";
import { auditBookingUrl } from "@/lib/bookingUrls";
import { pageMetadata } from "@/lib/metadata";
import { homeFaqs } from "@/lib/pricingFaq";
import { btnPrimary, h2, sectionWrap } from "@/components/site/styles";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "Stop sending your callers to voicemail | Vocemi",
  absoluteTitle: true,
  description:
    "Vocemi sets up and runs an AI receptionist built for your industry. It answers the calls you miss, books appointments into your calendar, and tells callers it's an AI. Live in 7 days. Free for the first 14.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <FaqStructuredData faqs={homeFaqs} />
      <HeroSection />
      <ProofStrip />
      <IndustryPicker />
      <HowItWorks heading="How it works" />
      <section className={`${sectionWrap} py-16 md:py-20`}>
        <h2 className={`${h2} mb-8`}>Pricing</h2>
        <PlanCards
          ids={["starter", "growth", "scale"]}
          auditHref={auditBookingUrl("home_pricing")}
          auditPlacement="home_pricing"
        />
        <PricingPreviewNote />
      </section>
      <Promises />
      <WontDo />
      <section className={`${sectionWrap} py-16 md:py-20`}>
        <h2 className={`${h2} mb-6`}>FAQ</h2>
        <FaqList faqs={homeFaqs} idPrefix="home-faq" />
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
          <CallDemoLink placement="home_final" label="hear" className={btnPrimary} />
          <Link href="/free-trial" className={btnPrimary}>
            Start free trial
          </Link>
        </div>
      </section>
    </>
  );
}
