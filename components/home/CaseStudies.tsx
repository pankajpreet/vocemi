import { caseStudySlots } from "@/lib/homeContent";
import Reveal from "./Reveal";

export default function CaseStudies() {
  return (
    <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-[110px]">
      <Reveal className="max-w-[640px] mx-auto mb-12 md:mb-14 text-center">
        <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
          Results
        </div>
        <h2 className="font-display text-3xl md:text-[46px] font-extrabold tracking-[-0.025em] text-ink m-0 mb-3.5">
          Case studies, coming as we launch
        </h2>
        <p className="text-[16.5px] text-ink/60 leading-[1.6] m-0">
          Drop in real client logos and results as they come in &mdash; these
          slots are ready to go.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-[22px]">
        {caseStudySlots.map((slot, i) => (
          <Reveal key={slot.id} delay={i * 0.1}>
            <div className="bg-white border border-ink/10 rounded-2xl p-[26px] h-full">
              <div className="w-full h-[120px] mb-[18px] border-2 border-dashed border-ink/15 rounded-[10px] flex items-center justify-center text-[11px] font-medium text-ink/35 text-center px-3">
                Client logo or result screenshot
              </div>
              <div className="text-sm text-ink/55 leading-[1.55]">
                {slot.placeholder}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
