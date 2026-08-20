import StartHeader from "@/components/start/StartHeader";
import StartHero from "@/components/start/StartHero";
import ClientStrip from "@/components/start/ClientStrip";
import Capabilities from "@/components/start/Capabilities";
import VoiceDemo from "@/components/start/VoiceDemo";
import HowItWorksCompact from "@/components/start/HowItWorksCompact";
import Industries from "@/components/start/Industries";
import StartCta from "@/components/start/StartCta";
import StartFooter from "@/components/start/StartFooter";
import StickyCta from "@/components/start/StickyCta";

export default function StartPage() {
  return (
    <>
      <StartHeader />
      <main>
        <StartHero />
        <ClientStrip />
        <Capabilities />
        <VoiceDemo />
        <HowItWorksCompact />
        <Industries />
        <StartCta />
      </main>
      <StartFooter />
      <StickyCta />
    </>
  );
}
