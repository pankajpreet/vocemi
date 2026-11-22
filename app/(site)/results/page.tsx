import type { Metadata } from "next";
import { Building2, Clock3, PhoneIncoming, Quote, Route } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContentCta from "@/components/ContentCta";
import Reveal from "@/components/home/Reveal";
import CountUp from "@/components/offer/CountUp";
import FixTimeline from "@/components/offer/FixTimeline";
import { siteConfig } from "@/lib/config";
import { clientLogos } from "@/lib/homeContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Results: 776 Calls Answered in One Month | Vocemi",
  absoluteTitle: true,
  description:
    "What Vocemi's AI receptionist has done for real clients: 776 calls answered in April 2026 for an insurance brokerage, and after-hours answering for 3D Lifestyle in Calgary NE.",
  path: "/results",
});

const fixes = [
  {
    title: "Moved to a stronger AI model",
    desc: "Early intake errors showed up in call reviews, so we switched to a stronger model.",
  },
  {
    title: "Fixed calls ending without a proper goodbye",
    desc: "Some calls cut off abruptly. We fixed how calls end so callers hear a clear close.",
  },
  {
    title: "Built a broker-assignment dashboard",
    desc: "Two brokers sometimes picked up the same lead. A shared assignment dashboard stopped the duplicates.",
  },
];

export default function ResultsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-32 w-[560px] h-[560px] rounded-full animate-floatSlow"
          style={{ background: "radial-gradient(circle, rgba(59,84,244,0.13), transparent 65%)" }}
        />
        <div className="relative max-w-[1080px] mx-auto px-6 md:px-8 pt-10 pb-14 md:pt-14 md:pb-20">
          <Breadcrumbs items={[{ name: "Results", path: "/results" }]} />
          <div className="max-w-[760px] animate-fadeUp">
            <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-4">
              Results
            </div>
            <h1 className="font-display text-[40px] md:text-[56px] leading-[1.06] tracking-[-0.025em] font-extrabold text-ink m-0 mb-5">
              What it has actually done
            </h1>
            <p className="text-lg leading-[1.65] text-ink/65 m-0">
              Real numbers where a client gave them to us, plain descriptions
              where they didn&apos;t, and what we had to fix along the way.
            </p>
          </div>
        </div>
      </section>

      {/* Former client: unnamed, past tense. */}
      <section className="bg-coal text-white py-16 md:py-24 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -bottom-40 -right-20 w-[460px] h-[460px] rounded-full animate-floatSlow"
          style={{ background: "radial-gradient(circle, rgba(59,84,244,0.28), transparent 70%)" }}
        />
        <div className="relative max-w-[1080px] mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
              <Building2 size={20} className="text-brand-light" aria-hidden />
            </span>
            <div>
              <div className="font-display text-[18px] font-bold">An insurance brokerage</div>
              <div className="text-[13px] text-white/55">Former client · AI intake agent</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            <Reveal>
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-7 h-full">
                <PhoneIncoming size={20} className="text-brand-light mb-4" aria-hidden />
                <div className="font-display font-extrabold text-[60px] md:text-[76px] leading-none tracking-[-0.04em] bg-gradient-to-r from-white to-brand-light bg-clip-text text-transparent">
                  <CountUp to={776} />
                </div>
                <p className="text-[16px] text-white/75 m-0 mt-3">calls answered in April 2026</p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-7 h-full">
                <Clock3 size={20} className="text-brand-light mb-4" aria-hidden />
                <div className="font-display font-extrabold text-[44px] md:text-[56px] leading-[1.15] tracking-[-0.03em] bg-gradient-to-r from-white to-brand-light bg-clip-text text-transparent">
                  <CountUp to={196} kind="minsec" />
                </div>
                <p className="text-[16px] text-white/75 m-0 mt-3">average call length</p>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="flex gap-4 items-start max-w-[720px]">
              <Route size={22} className="text-brand-light flex-shrink-0 mt-1" aria-hidden />
              <p className="text-[17px] leading-[1.65] text-white/80 m-0">
                <span className="font-semibold text-white">What it did: </span>
                took new-quote details from callers and routed them to the right
                broker.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-[1080px] mx-auto px-6 md:px-8 py-16 md:py-24 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14">
        <Reveal>
          <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
            What we fixed along the way
          </div>
          <h2 className="font-display text-3xl md:text-[40px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink m-0 mb-4">
            It wasn&apos;t perfect on day one
          </h2>
          <p className="text-[16px] leading-[1.65] text-ink/65 m-0">
            We review real calls and fix what we find. These are the changes we
            made for the brokerage.
          </p>
        </Reveal>
        <FixTimeline items={fixes} />
      </section>

      <section className="bg-sand py-16 md:py-24">
        <div className="max-w-[1080px] mx-auto px-6 md:px-8">
          <Reveal className="max-w-[640px] mb-10">
            <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
              Current clients
            </div>
            <h2 className="font-display text-3xl md:text-[40px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink m-0">
              Working for these businesses today
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {clientLogos.map((client, i) => (
              <Reveal key={client.name + client.sub} delay={i * 0.1} className="h-full">
                <div className="bg-white border border-ink/10 rounded-2xl p-7 h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(22,24,28,0.18)]">
                  <div className="flex items-center gap-3.5 mb-5">
                    <span
                      className="w-12 h-12 rounded-[13px] flex items-center justify-center font-display font-extrabold flex-shrink-0"
                      style={{ background: client.tint, color: client.ink }}
                    >
                      {client.initials}
                    </span>
                    <div className="min-w-0">
                      <div className="font-display text-[18px] font-bold text-ink">{client.name}</div>
                      <div className="text-[13px] text-ink/60">
                        {client.industry} · {client.sub}
                      </div>
                    </div>
                  </div>
                  <ul className="m-0 p-0 list-none flex flex-col gap-3">
                    {client.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-3 text-[15px] leading-[1.6] text-ink/70">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-[9px] flex-shrink-0"
                          style={{ background: client.ink }}
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {siteConfig.flags.showJagdeepReference && (
            <Reveal className="mt-5">
              <div className="bg-white border border-brand/25 rounded-2xl p-7 flex flex-col sm:flex-row gap-4 sm:items-center">
                <span className="w-12 h-12 rounded-[13px] bg-brand-tint text-brand flex items-center justify-center flex-shrink-0">
                  <Quote size={20} aria-hidden />
                </span>
                <div>
                  <div className="text-[12.5px] font-bold uppercase tracking-[0.06em] text-brand mb-1">
                    Broker reference
                  </div>
                  <p className="font-display text-[19px] font-bold text-ink m-0">
                    Talk to Jagdeep Duggal, an insurance broker using Vocemi today.
                  </p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="max-w-[1080px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <ContentCta
          title="Your calls could be next"
          text="Try it free for 14 days (30 for HVAC & plumbing). We build it for you and it's live in 7 days."
          placement="results_page"
        />
      </section>
    </>
  );
}
