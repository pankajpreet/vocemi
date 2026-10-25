import { CallDemoButton, TrialButton } from "@/components/offer/CtaButtons";
import HeroCallCard from "./HeroCallCard";
import ProofStrip from "./ProofStrip";

const heroStats = [
  { value: "7 days", label: "to go live" },
  { value: "14 days", label: "free to try" },
  { value: "$0", label: "setup" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft brand glow behind the call card. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] w-[620px] h-[620px] rounded-full animate-floatSlow"
        style={{
          background: "radial-gradient(circle, rgba(59,84,244,0.14), transparent 65%)",
        }}
      />
      <div className="relative max-w-[1180px] mx-auto px-6 md:px-8 pt-8 pb-14 md:pt-16 md:pb-20 grid lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-14 items-center">
        <div className="animate-fadeUp">
          <div className="inline-flex items-center gap-2 bg-brand-tint text-brand px-3.5 py-[7px] rounded-full text-[13px] font-semibold mb-4 md:mb-[22px]">
            <span className="w-[7px] h-[7px] rounded-full bg-brand animate-pulseDot" />
            AI receptionist for insurance, med spas, HVAC &amp; vet clinics
          </div>
          <h1 className="font-display text-[40px] md:text-[58px] leading-[1.04] tracking-[-0.025em] font-extrabold text-ink m-0 mb-4 md:mb-5">
            Stop sending your callers to{" "}
            <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
              voicemail
            </span>
            .
          </h1>
          <p className="text-[17px] md:text-lg leading-[1.6] text-ink/65 max-w-[560px] m-0 mb-6 md:mb-7">
            Vocemi sets up and runs an AI receptionist built for your industry.
            It answers the calls you miss, books appointments into your
            calendar, and tells callers it&apos;s an AI. Live in 7 days. Free
            for the first 14.
          </p>
          <div className="flex flex-wrap gap-3 mb-7">
            <CallDemoButton
              placement="homepage_hero_primary"
              label="Call our AI now"
              variant="primary"
            />
            <TrialButton
              placement="homepage_hero"
              label="Start my free trial"
              variant="primary"
              className="[a+&]:bg-ink [a+&]:hover:bg-brand"
            />
          </div>
          <div className="grid grid-cols-3 gap-x-3 sm:flex sm:gap-9 text-[13.5px] text-ink/65">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <span className="font-display font-extrabold text-xl md:text-2xl text-ink">
                  {stat.value}
                </span>
                <br />
                {stat.label}
              </div>
            ))}
          </div>
        </div>
        <div className="relative lg:pl-4 animate-fadeUp [animation-delay:150ms]">
          <HeroCallCard />
        </div>
      </div>
      <ProofStrip />
    </section>
  );
}
