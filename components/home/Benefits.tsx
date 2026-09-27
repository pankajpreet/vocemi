import {
  BarChart3,
  Clock,
  PiggyBank,
  Smile,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { homeBenefits, type BenefitIcon } from "@/lib/homeContent";
import { siteConfig } from "@/lib/config";
import TrackedLink from "@/components/start/TrackedLink";
import Reveal from "./Reveal";

const icons: Record<BenefitIcon, LucideIcon> = {
  productivity: Zap,
  experience: Smile,
  available: Clock,
  cost: PiggyBank,
  insights: BarChart3,
  growth: TrendingUp,
};

/**
 * Split layout on purpose: Services directly above is already a grid of six
 * white cards, so a second one would read as the same section twice.
 */
export default function Benefits() {
  const demoHref = siteConfig.voiceDemoAvailable ? "/start#talk" : "/start";

  return (
    <section className="max-w-[1180px] mx-auto px-6 md:px-8 pt-5 pb-16 md:pb-[110px]">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
        <Reveal className="lg:self-center">
          <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
            Why Vocemi
          </div>
          <h2 className="font-display text-3xl md:text-[42px] font-extrabold tracking-[-0.025em] leading-[1.1] text-ink m-0 mb-7">
            Built for growth, not just uptime
          </h2>
          <TrackedLink
            href={demoHref}
            event="demo_cta_clicked"
            properties={{ placement: "homepage_benefits" }}
            className="inline-flex items-center gap-2 bg-ink text-white px-[22px] py-3 rounded-[9px] text-[14.5px] font-semibold hover:bg-brand transition-colors"
          >
            {siteConfig.voiceDemoAvailable
              ? "Hear it for yourself →"
              : "See how it works →"}
          </TrackedLink>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-x-8 border-t border-ink/10">
          {homeBenefits.map((benefit, i) => {
            const Icon = icons[benefit.icon];
            return (
              <Reveal key={benefit.title} delay={(i % 2) * 0.08}>
                <div className="flex gap-4 py-7 border-b border-ink/10 h-full">
                  <span className="w-11 h-11 rounded-[11px] bg-brand-tint text-brand flex items-center justify-center flex-shrink-0">
                    <Icon size={20} strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="font-display text-[17px] font-bold text-ink m-0 mb-1.5">
                      {benefit.title}
                    </h3>
                    <p className="text-[14.5px] leading-[1.6] text-ink/60 m-0">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
