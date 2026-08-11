import Reveal from "@/components/home/Reveal";
import { workflowSteps } from "@/lib/homeContent";

/**
 * A vertical read of the homepage's four-step rail.
 *
 * The homepage version is a 1180px auto-cycling client component, which fights
 * this page's narrower left-aligned rhythm and costs JS for decoration. Same
 * data, stacked and static.
 */
export default function HowItWorksCompact() {
  return (
    <section className="max-w-[860px] mx-auto px-6 py-14 md:py-20">
      <h2 className="font-display text-[28px] md:text-4xl font-extrabold tracking-[-0.025em] text-ink m-0 mb-3">
        How it works
      </h2>
      <p className="text-[16px] text-ink/60 leading-[1.6] m-0 mb-9 max-w-[520px]">
        One workflow, handled end to end.
      </p>

      <div className="relative">
        <div className="absolute left-[21px] top-3 bottom-3 w-px bg-ink/10" />
        <div className="flex flex-col gap-7">
          {workflowSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="relative flex gap-5">
                <div className="w-[43px] h-[43px] flex-shrink-0 rounded-[13px] bg-ink text-white font-display font-extrabold text-[15px] flex items-center justify-center shadow-[0_10px_20px_-8px_rgba(22,24,28,0.4)]">
                  {step.num}
                </div>
                <div className="pt-1">
                  <h3 className="font-display text-[17px] font-bold text-ink m-0 mb-1.5 tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.6] text-ink/60 m-0">
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
