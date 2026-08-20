import { homeBenefits } from "@/lib/homeContent";
import Reveal from "./Reveal";

export default function Benefits() {
  return (
    <section className="max-w-[1180px] mx-auto px-6 md:px-8 pt-5 pb-16 md:pb-[110px]">
      <Reveal className="max-w-[620px] mx-auto mb-12 md:mb-14 text-center">
        <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
          Why Vocemi
        </div>
        <h2 className="font-display text-3xl md:text-[46px] font-extrabold tracking-[-0.025em] text-ink m-0">
          Built for growth, not just uptime
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[22px] gap-y-8">
        {homeBenefits.map((benefit, i) => (
          <Reveal key={benefit.num} delay={i * 0.1}>
            <div className="py-[26px] px-1">
              <div className="font-display text-[15px] font-extrabold text-brand mb-3.5">
                {benefit.num}
              </div>
              <h3 className="font-display text-[17px] font-bold text-ink m-0 mb-2">
                {benefit.title}
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-ink/60 m-0">
                {benefit.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
