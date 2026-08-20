import { clientLogos } from "@/lib/homeContent";
import Reveal from "./Reveal";

/**
 * Where Vocemi is running today.
 *
 * Framed as the work each AI employee handles rather than as headline
 * metrics: the only figure any client has given us is the ~10 minutes per
 * quote at iSmart, and a row of invented numbers beside it would undo the
 * credibility the real one buys.
 */
export default function CaseStudies() {
  return (
    <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-[110px]">
      <Reveal className="max-w-[640px] mx-auto mb-12 md:mb-14 text-center">
        <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
          Results
        </div>
        <h2 className="font-display text-3xl md:text-[46px] font-extrabold tracking-[-0.025em] text-ink m-0 mb-3.5">
          Already working for these businesses
        </h2>
        <p className="text-[16.5px] text-ink/60 leading-[1.6] m-0">
          Three businesses, three very different workflows &mdash; each one
          started with the calls nobody had time to answer.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-[22px]">
        {clientLogos.map((client, i) => (
          <Reveal key={client.name + client.sub} delay={i * 0.1}>
            <div className="bg-white border border-ink/10 rounded-2xl p-[26px] h-full flex flex-col transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-14px_rgba(22,24,28,0.18)]">
              <div className="flex items-center gap-3.5 mb-5">
                <div
                  className="w-12 h-12 rounded-[13px] flex items-center justify-center font-display font-extrabold text-[16px] flex-shrink-0"
                  style={{ background: client.tint, color: client.ink }}
                >
                  {client.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-display text-[16.5px] font-bold text-ink leading-tight">
                    {client.name}
                  </div>
                  <div className="text-[13px] text-ink/45 mt-0.5">
                    {client.industry} &middot; {client.sub}
                  </div>
                </div>
              </div>

              <ul className="m-0 p-0 list-none flex flex-col gap-3.5">
                {client.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0"
                      style={{ background: client.ink }}
                    />
                    <span className="text-[14.5px] leading-[1.6] text-ink/65">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
