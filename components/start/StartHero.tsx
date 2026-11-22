import { siteConfig } from "@/lib/config";
import { heroHeadline, heroStats } from "@/lib/startContent";
import TrackedLink from "./TrackedLink";
import { CallDemoButton, TrialButton } from "@/components/offer/CtaButtons";

export default function StartHero() {
  // No credentials means VoiceDemo omits itself, so #talk would be a dead
  // anchor. Promote booking to primary in that case.
  const voiceDemo = Boolean(
    siteConfig.retellPublicKey && siteConfig.retellVoiceAgentId
  );

  return (
    <section className="max-w-[860px] mx-auto px-6 pt-12 pb-14 md:pt-16 md:pb-20">
      <div className="animate-fadeUp">
        <div className="inline-flex items-center gap-2 bg-brand-tint text-brand px-3.5 py-[7px] rounded-full text-[13px] font-semibold mb-5">
          <span className="w-[7px] h-[7px] rounded-full bg-brand animate-pulseDot" />
          AI receptionist · $0 setup
        </div>

        <h1 className="font-display text-[38px] md:text-[54px] leading-[1.06] tracking-[-0.025em] font-extrabold text-ink m-0 mb-5">
          {heroHeadline.lead}{" "}
          <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
            {heroHeadline.emphasis}
          </span>
          .
        </h1>

        <p className="text-[17px] md:text-lg leading-[1.6] text-ink/65 max-w-[560px] m-0 mb-8">
          Vocemi sets up and runs an AI receptionist for your industry. It
          answers the calls you miss, books appointments into your calendar,
          and tells callers it&apos;s an AI. Live in 7 days. Free for the first 14.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-9">
          {voiceDemo && (
            <TrackedLink
              href="#talk"
              event="demo_cta_clicked"
              properties={{ placement: "start_hero" }}
              className="bg-brand text-white px-[26px] py-4 rounded-[9px] text-[15.5px] font-semibold text-center hover:bg-brand-dark transition-colors"
            >
              Talk to an AI employee
            </TrackedLink>
          )}
          <CallDemoButton
            placement="start_hero"
            label="Call our AI"
            variant={voiceDemo ? "secondary" : "primary"}
            className="py-4"
          />
          <TrialButton
            placement="start_hero"
            label="Start my free trial"
            variant={voiceDemo ? "secondary" : "primary"}
            className="py-4"
          />
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 text-[13.5px] text-ink/65">
          {heroStats.map((stat) => (
            <div key={stat.value}>
              <span className="font-display font-extrabold text-xl text-ink">
                {stat.value}
              </span>
              <br />
              {stat.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
