import type { Metadata } from "next";
import Hero, { HeroCallDemo } from "@/components/home/Hero";
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
import {
  FaqStructuredData,
  ServiceStructuredData,
} from "@/components/StructuredData";
import { homeFaqs } from "@/lib/homeContent";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import VoiceDemo from "@/components/start/VoiceDemo";

export const metadata: Metadata = pageMetadata({
  title: "Voice AI Receptionist & Business Automation | Vocemi",
  absoluteTitle: true,
  description:
    "Vocemi builds voice AI employees that answer calls, qualify enquiries, book appointments, and report what needs your attention.",
  path: "/",
});

export default function Home() {
  const structuredFaqs = homeFaqs.map((faq) => ({
    question: faq.q,
    answer: faq.a,
  }));

  return (
    <>
      <ServiceStructuredData />
      <FaqStructuredData faqs={structuredFaqs} />
      <Hero />
      {siteConfig.voiceDemoAvailable ? (
        <VoiceDemo page="/" />
      ) : (
        <HeroCallDemo />
      )}
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
