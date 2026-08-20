import { pricingTiers } from "@/lib/homeContent";
import { siteConfig } from "@/lib/config";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-sand py-20 md:py-[110px] scroll-mt-16">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <Reveal className="max-w-[640px] mx-auto mb-12 md:mb-14 text-center">
          <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
            Pricing
          </div>
          <h2 className="font-display text-3xl md:text-[46px] font-extrabold tracking-[-0.025em] text-ink m-0 mb-3.5">
            Start small, prove it, then expand
          </h2>
          <p className="text-[16.5px] text-ink/60 leading-[1.6] m-0 mx-auto max-w-[520px]">
            Illustrative pricing &mdash; every engagement is scoped to your
            actual call volume and tools on a free call.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-[22px] items-stretch pt-3">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.12} className="h-full">
              <div
                className={`bg-white rounded-[18px] p-8 flex flex-col relative h-full transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_rgba(22,24,28,0.15)] ${
                  tier.featured ? "border-[1.5px] border-brand" : "border border-ink/10"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-[13px] left-8 bg-brand text-white text-xs font-bold px-3 py-[5px] rounded-full animate-badgePulse">
                    Most common start
                  </div>
                )}
                <h3 className="font-display text-[17px] font-bold text-ink m-0 mb-1.5">
                  {tier.name}
                </h3>
                <p className="text-[13.5px] text-ink/55 m-0 mb-5 min-h-9">
                  {tier.tagline}
                </p>
                <div className="font-display text-[32px] font-extrabold text-ink mb-0.5">
                  {tier.price}
                </div>
                <div className="text-[13px] text-ink/50 mb-6">
                  {tier.priceSub}
                </div>
                <div className="flex flex-col gap-[11px] mb-7 flex-1">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex gap-[9px] text-sm text-ink/75">
                      <span className="text-brand">&#10003;</span>
                      {feature}
                    </div>
                  ))}
                </div>
                <a
                  href={siteConfig.bookCallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-center py-[13px] rounded-[9px] font-semibold text-[14.5px] transition-colors ${
                    tier.featured
                      ? "bg-brand text-white hover:bg-brand-dark"
                      : "border border-ink/15 text-ink hover:border-ink/35"
                  }`}
                >
                  {tier.ctaLabel}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
