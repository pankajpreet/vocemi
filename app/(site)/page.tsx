import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Services from "@/components/home/Services";
import OwnerDashboard from "@/components/home/OwnerDashboard";
import RoiCalculator from "@/components/home/RoiCalculator";
import Pricing from "@/components/home/Pricing";
import CaseStudies from "@/components/home/CaseStudies";
import HomeFaq from "@/components/home/HomeFaq";
import CtaSection from "@/components/home/CtaSection";
import IndustryTiles from "@/components/offer/IndustryTiles";
import Promises from "@/components/offer/Promises";
import SectionIntro from "@/components/offer/SectionIntro";
import WontDo from "@/components/offer/WontDo";
import {
  FaqStructuredData,
  ServiceStructuredData,
} from "@/components/StructuredData";
import { homePricingFaqs, wontDoItems, wontDoSummary } from "@/lib/plans";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import VoiceDemo from "@/components/start/VoiceDemo";

export const metadata: Metadata = pageMetadata({
  title: "AI Receptionist: $0 Setup, Free 14-Day Trial | Vocemi",
  absoluteTitle: true,
  description:
    "Stop sending callers to voicemail. Vocemi sets up and runs an AI receptionist for insurance, med spas, HVAC & plumbing and vet clinics. Live in 7 days, free for 14.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <ServiceStructuredData />
      <FaqStructuredData faqs={homePricingFaqs} />

      {/* 1–2. Hero + proof strip */}
      <Hero />
      {siteConfig.voiceDemoAvailable && <VoiceDemo page="/" />}

      {/* 3. Pick your industry */}
      <section id="industries" className="max-w-[1180px] mx-auto px-6 md:px-8 pt-20 md:pt-[100px] scroll-mt-16">
        <SectionIntro
          eyebrow="Pick your industry"
          title="Built for the calls your business actually gets"
          sub="Each one is set up with its own rules: what it answers, what it books, and what always goes to your team."
        />
        <IndustryTiles />
      </section>

      {/* 4. How it works */}
      <HowItWorks />

      <Services />
      <OwnerDashboard />
      <RoiCalculator />

      {/* 5. Pricing preview */}
      <Pricing />

      <CaseStudies />

      {/* 6. Our promises */}
      <section className="bg-sand py-20 md:py-[100px]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <SectionIntro eyebrow="Our promises" title="Four things you can hold us to" />
          <Promises />
        </div>
      </section>

      {/* 7. What it won't do */}
      <section className="max-w-[1080px] mx-auto px-6 md:px-8 py-20 md:py-[100px] grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center">
        <SectionIntro
          align="left"
          eyebrow="What it won't do"
          title="It knows where its job ends"
          sub={wontDoSummary}
          className="!mb-0"
        />
        <WontDo items={wontDoItems} />
      </section>

      {/* 8. FAQ + final CTA */}
      <HomeFaq />
      <CtaSection />
    </>
  );
}
