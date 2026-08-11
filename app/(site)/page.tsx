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

export default function Home() {
  return (
    <>
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
