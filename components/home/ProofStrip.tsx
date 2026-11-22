import { PhoneIncoming, Moon } from "lucide-react";
import CountUp from "@/components/offer/CountUp";
import { clientLogos } from "@/lib/homeContent";

/**
 * Proof under the hero: the brokerage figure (unnamed, past tense on
 * /results), the named med spa, and the client chips.
 */
export default function ProofStrip() {
  return (
    <div className="relative border-t border-ink/10 bg-sand">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-5 md:py-6 grid lg:grid-cols-[1fr_1fr_auto] gap-4 lg:gap-8 items-center">
        <div className="flex items-center gap-3.5">
          <span className="w-10 h-10 rounded-xl bg-white border border-ink/10 text-brand flex items-center justify-center flex-shrink-0">
            <PhoneIncoming size={18} aria-hidden />
          </span>
          <p className="m-0 text-[14.5px] leading-[1.5] text-ink/70">
            <CountUp
              to={776}
              className="font-display font-extrabold text-[20px] text-ink tabular-nums"
            />{" "}
            calls answered in one month for an insurance brokerage{" "}
            <span className="text-ink/65">(April 2026)</span>
          </p>
        </div>
        <div className="flex items-center gap-3.5">
          <span className="w-10 h-10 rounded-xl bg-white border border-ink/10 text-[#C0326F] flex items-center justify-center flex-shrink-0">
            <Moon size={18} aria-hidden />
          </span>
          <p className="m-0 text-[14.5px] leading-[1.5] text-ink/70">
            Answering after-hours calls for{" "}
            <span className="font-semibold text-ink">3D Lifestyle</span>, Calgary NE
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {clientLogos.map((client) => (
            <span
              key={client.name + client.sub}
              title={`${client.name} · ${client.industry}`}
              className="flex items-center gap-2 bg-white border border-ink/10 rounded-full pl-1 pr-3 py-1"
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center font-display font-extrabold text-[11px] flex-shrink-0"
                style={{ background: client.tint, color: client.ink }}
              >
                {client.initials}
              </span>
              <span className="text-[12.5px] font-semibold text-ink leading-tight">
                {client.industry}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
