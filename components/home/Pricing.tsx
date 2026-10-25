import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { CurrencyToggle } from "@/components/offer/Currency";
import { PlanGrid } from "@/components/offer/PlanCard";
import { monthlyPlans } from "@/lib/plans";

const assurances = ["$0 setup", "No login", "No card for the trial"];

/** Homepage pricing preview. Every number comes from lib/plans.ts. */
export default function Pricing() {
  return (
    <section id="pricing" className="bg-sand py-20 md:py-[110px] scroll-mt-16">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <Reveal className="max-w-[640px] mx-auto mb-10 md:mb-12 text-center">
          <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
            Pricing
          </div>
          <h2 className="font-display text-3xl md:text-[46px] font-extrabold tracking-[-0.025em] leading-[1.1] text-ink m-0 mb-3.5">
            Simple pricing. Try it free.
          </h2>
          <p className="text-[16.5px] text-ink/65 leading-[1.6] m-0 mx-auto max-w-[520px] mb-6">
            Same AI on every plan. Plans differ only by minutes and support.
          </p>
          <CurrencyToggle placement="homepage_pricing" />
        </Reveal>

        <PlanGrid plans={monthlyPlans} placement="homepage_pricing" compact />

        <Reveal className="mt-10 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2.5">
            {assurances.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 bg-white border border-ink/10 rounded-full px-4 py-2 text-[13.5px] font-semibold text-ink"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                {item}
              </span>
            ))}
          </div>
          <a
            href="/pricing"
            className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:text-brand-dark"
          >
            See full pricing, features and the Custom plan
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
