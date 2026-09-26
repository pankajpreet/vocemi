import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import LogoStrip from "@/components/home/LogoStrip";
import HowItWorks from "@/components/home/HowItWorks";
import Services from "@/components/home/Services";
import OwnerDashboard from "@/components/home/OwnerDashboard";
import Benefits from "@/components/home/Benefits";
import RoiCalculator from "@/components/home/RoiCalculator";
import Comparison from "@/components/home/Comparison";
import Pricing from "@/components/home/Pricing";
import CaseStudies from "@/components/home/CaseStudies";
import HomeFaq from "@/components/home/HomeFaq";
import CtaSection from "@/components/home/CtaSection";
import { homeFaqs } from "@/lib/homeContent";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Built from the same array HomeFaq renders, so the markup always matches
// the questions a visitor can actually see on this page.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <LogoStrip />
      <HowItWorks />
      <Services />
      <OwnerDashboard />
      <Benefits />
      <RoiCalculator />
      <Comparison />
      <Pricing />
      <CaseStudies />
      <HomeFaq />
      <CtaSection />
    </>
  );
}
