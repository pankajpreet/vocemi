import { siteConfig } from "@/lib/config";
import { auditCreditNote } from "@/lib/homeContent";
import TrackedLink from "@/components/start/TrackedLink";
import LogoStrip from "./LogoStrip";

const waveBars = Array.from({ length: 24 }, (_, i) => ({
  dur: 0.7 + (i % 5) * 0.15,
  delay: (i % 7) * 0.08,
}));

const heroStats = [
  { value: "24/7", label: "always answering" },
  { value: "2–4 wks", label: "to first launch" },
  { value: "100%", label: "calls logged & reported" },
];

export default function Hero() {
  const demoHref = siteConfig.voiceDemoAvailable ? "/start#talk" : "/start";

  return (
    <section>
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 pt-6 pb-2 md:pt-14 md:pb-6">
        <div className="animate-fadeUp max-w-[680px]">
          <div className="inline-flex items-center gap-2 bg-brand-tint text-brand px-3.5 py-[7px] rounded-full text-[13px] font-semibold mb-3 md:mb-[22px]">
            <span className="w-[7px] h-[7px] rounded-full bg-brand animate-pulseDot" />
            Voice AI for growing businesses
          </div>
          <h1 className="font-display text-[42px] md:text-[60px] leading-[1.03] tracking-[-0.025em] font-extrabold text-ink m-0 mb-3 md:mb-4">
            Never miss another{" "}
            <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
              call, lead, or booking
            </span>
            .
          </h1>
          <h2 className="font-display text-[22px] md:text-[28px] leading-[1.25] font-bold text-ink m-0 mb-4 md:mb-5 max-w-[640px]">
            AI receptionist and voice AI employees for service businesses
          </h2>
          <p className="text-lg leading-[1.6] text-ink/65 max-w-[520px] m-0 mb-4 md:mb-6">
            Vocemi builds voice AI employees that answer, qualify, and book &mdash;
            then hand you a clear daily report. You keep the judgment calls; the AI
            handles the repeatable ones.
          </p>
          <div className="flex flex-wrap gap-3.5 mb-2.5">
            <TrackedLink
              href={demoHref}
              event="demo_cta_clicked"
              properties={{ placement: "homepage_hero_primary" }}
              className="bg-brand text-white px-5 sm:px-[26px] py-3.5 rounded-[9px] text-[15.5px] font-semibold hover:bg-brand-dark transition-colors"
            >
              {siteConfig.voiceDemoAvailable ? "Try the live demo" : "See how it works"}
            </TrackedLink>
            <TrackedLink
              href={siteConfig.bookCallUrl("homepage_hero_secondary")}
              event="book_call_clicked"
              properties={{ placement: "homepage_hero_secondary" }}
              external
              className="border border-ink/15 text-ink px-5 sm:px-[26px] py-3.5 rounded-[9px] text-[15.5px] font-semibold hover:border-ink/35 transition-colors"
            >
              Book a free call
            </TrackedLink>
          </div>
          <p className="text-[13px] leading-snug text-ink/70 m-0 mb-3 md:mb-5">
            {auditCreditNote}
          </p>
          <div className="grid grid-cols-3 gap-x-3 sm:flex sm:gap-8 text-[13.5px] text-ink/65">
            {heroStats.map((stat) => (
              <div key={stat.value}>
                <span className="font-display font-extrabold text-xl text-ink">
                  {stat.value}
                </span>
                <br />
                {stat.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <LogoStrip />
    </section>
  );
}

export function HeroCallDemo() {
  const demoHref = siteConfig.voiceDemoAvailable ? "/start#talk" : "/start";

  return (
    <section className="max-w-[1180px] mx-auto px-6 md:px-8 pt-8 pb-4 md:pt-10 md:pb-6">
      <div className="bg-coal rounded-[20px] p-6 md:p-7 relative max-w-[560px] shadow-[0_40px_80px_-24px_rgba(20,22,27,0.55)]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5 text-white text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#37D67A] animate-pulseDot" />
            Example call &mdash; incoming
          </div>
          <span className="text-white/50 text-[12.5px] font-display">
            Illustrative
          </span>
        </div>
        <div className="flex items-end gap-1 h-14 px-1 mb-[22px]">
          {waveBars.map((bar, i) => (
            <span
              key={i}
              className="w-[5px] rounded-[3px] bg-gradient-to-b from-brand to-brand-light h-full origin-bottom animate-wave"
              style={{
                animationDuration: `${bar.dur}s`,
                animationDelay: `${bar.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="bg-white/[0.06] rounded-xl px-[18px] py-4 mb-3.5">
          <div className="text-white/50 text-[11.5px] font-semibold uppercase tracking-[0.04em] mb-1.5">
            Caller
          </div>
          <div className="text-white text-[14.5px] leading-[1.5]">
            &ldquo;Hi, I&apos;d like to book a Botox consult and ask about your
            laser package pricing.&rdquo;
          </div>
        </div>
        <div className="bg-brand/15 rounded-xl px-[18px] py-4 border border-brand/30">
          <div className="text-brand-light text-[11.5px] font-semibold uppercase tracking-[0.04em] mb-1.5">
            Vocemi AI
          </div>
          <div className="text-white text-[14.5px] leading-[1.5]">
            Happy to help &mdash; I can book your consult for Thursday 2pm or
            Friday 11am, and I&apos;ll send our laser package pricing right
            after. Which time works?
          </div>
        </div>
        {/* The card reads as a live call, so people try to click it. Give
            them somewhere real to go. */}
        <TrackedLink
          href={demoHref}
          event="demo_cta_clicked"
          properties={{ placement: "homepage_example_call" }}
          className="mt-5 inline-flex items-center gap-2 text-brand-light text-[13.5px] font-semibold hover:text-white transition-colors"
        >
          {siteConfig.voiceDemoAvailable
            ? "Talk to it yourself →"
            : "See the AI employee workflow →"}
        </TrackedLink>
      </div>
    </section>
  );
}
