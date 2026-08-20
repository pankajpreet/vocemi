import { siteConfig } from "@/lib/config";

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
  return (
    <section className="max-w-[1180px] mx-auto px-6 md:px-8 pt-16 pb-20 md:pt-[88px] md:pb-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">
      <div className="animate-fadeUp">
        <div className="inline-flex items-center gap-2 bg-brand-tint text-brand px-3.5 py-[7px] rounded-full text-[13px] font-semibold mb-[22px]">
          <span className="w-[7px] h-[7px] rounded-full bg-brand animate-pulseDot" />
          Voice AI for growing businesses
        </div>
        <h1 className="font-display text-[42px] md:text-[60px] leading-[1.03] tracking-[-0.025em] font-extrabold text-ink m-0 mb-[22px]">
          Never miss another{" "}
          <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
            call, lead, or booking
          </span>
          .
        </h1>
        <p className="text-lg leading-[1.6] text-ink/65 max-w-[520px] m-0 mb-8">
          Vocemi builds voice AI employees that answer, qualify, and book &mdash;
          then hand you a clear daily report. You keep the judgment calls; the AI
          handles the repeatable ones.
        </p>
        <div className="flex flex-wrap gap-3.5 mb-9">
          <a
            href={siteConfig.bookCallUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand text-white px-[26px] py-3.5 rounded-[9px] text-[15.5px] font-semibold hover:bg-brand-dark transition-colors"
          >
            Book a Call
          </a>
          <a
            href="#how-it-works"
            className="border border-ink/15 text-ink px-[26px] py-3.5 rounded-[9px] text-[15.5px] font-semibold hover:border-ink/35 transition-colors"
          >
            See how it works
          </a>
        </div>
        <div className="flex gap-8 text-[13.5px] text-ink/50">
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

      <div
        className="bg-coal rounded-[20px] p-6 md:p-7 relative animate-fadeUp shadow-[0_40px_80px_-24px_rgba(20,22,27,0.55)]"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5 text-white text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#37D67A] animate-pulseDot" />
            Live call &mdash; incoming
          </div>
          <span className="text-white/40 text-[12.5px] font-display">00:14</span>
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
          <div className="text-white/40 text-[11.5px] font-semibold uppercase tracking-[0.04em] mb-1.5">
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
      </div>
    </section>
  );
}
