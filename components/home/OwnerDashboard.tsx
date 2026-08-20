import { dashboardPoints, reportStats } from "@/lib/homeContent";
import Reveal from "./Reveal";

export default function OwnerDashboard() {
  return (
    <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-[110px] grid lg:grid-cols-2 gap-12 lg:gap-[60px] items-center">
      <Reveal>
        <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
          Owner visibility
        </div>
        <h2 className="font-display text-3xl md:text-[42px] font-extrabold tracking-[-0.025em] leading-[1.1] text-ink m-0 mb-[18px]">
          See exactly what your AI employee did today.
        </h2>
        <p className="text-[16.5px] leading-[1.65] text-ink/60 m-0 mb-[26px]">
          Every call, booking, and edge case rolls up into one daily report.
          Anything outside your rules waits for your sign-off &mdash; nothing
          happens without an approved path.
        </p>
        <div className="flex flex-col gap-4">
          {dashboardPoints.map((point) => (
            <div key={point.title} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full bg-brand-tint flex-shrink-0 mt-0.5 flex items-center justify-center">
                <span className="w-[7px] h-[7px] rounded-full bg-brand" />
              </span>
              <div>
                <div className="font-semibold text-[15px] text-ink mb-0.5">
                  {point.title}
                </div>
                <div className="text-sm text-ink/55 leading-[1.5]">
                  {point.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="bg-white border border-ink/10 rounded-[18px] shadow-[0_24px_50px_-20px_rgba(22,24,28,0.18)] overflow-hidden">
          <div className="bg-ink px-[22px] py-4 flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <span className="w-[9px] h-[9px] rounded-full bg-white/25" />
              <span className="w-[9px] h-[9px] rounded-full bg-white/25" />
              <span className="w-[9px] h-[9px] rounded-full bg-white/25" />
            </div>
            <span className="text-white/60 text-[12.5px] ml-2">
              Daily Owner Report &middot; Today
            </span>
          </div>
          <div className="p-[26px]">
            <div className="grid grid-cols-2 gap-4 mb-[22px]">
              {reportStats.map((stat) => (
                <div key={stat.label} className="bg-sand rounded-xl p-4">
                  <div
                    key={stat.value}
                    className="font-display text-[26px] font-extrabold text-ink animate-popIn"
                  >
                    {stat.value}
                  </div>
                  <div className="text-[12.5px] text-ink/55 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="border border-[#F0D9A8] bg-[#FDF6E8] rounded-xl px-[18px] py-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C97A12]" />
                <span className="text-[13px] font-bold text-[#8A5A0C]">
                  Waiting for your approval
                </span>
              </div>
              <div className="text-sm text-[#5C4210] leading-[1.5]">
                Quoted price falls outside your standard range for a re-roof
                job. Vocemi is holding the reply until you confirm.
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
