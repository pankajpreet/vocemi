import { siteConfig } from "@/lib/config";
import { heroStats } from "@/lib/startContent";
import TrackedLink from "./TrackedLink";

export default function StartHero() {
  return (
    <section className="max-w-[860px] mx-auto px-6 pt-12 pb-14 md:pt-16 md:pb-20">
      <div className="animate-fadeUp">
        <div className="inline-flex items-center gap-2 bg-brand-tint text-brand px-3.5 py-[7px] rounded-full text-[13px] font-semibold mb-5">
          <span className="w-[7px] h-[7px] rounded-full bg-brand animate-pulseDot" />
          Voice AI for growing businesses
        </div>

        <h1 className="font-display text-[38px] md:text-[54px] leading-[1.06] tracking-[-0.025em] font-extrabold text-ink m-0 mb-5">
          Never miss another{" "}
          <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
            call, lead, or booking
          </span>
          .
        </h1>

        <p className="text-[17px] md:text-lg leading-[1.6] text-ink/65 max-w-[560px] m-0 mb-8">
          Vocemi builds AI employees that answer the phone, qualify the caller,
          and book the job &mdash; 24/7. You keep the judgment calls; the AI
          handles the repeatable ones.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-9">
          <a
            href="#talk"
            className="bg-brand text-white px-[26px] py-4 rounded-[9px] text-[15.5px] font-semibold text-center hover:bg-brand-dark transition-colors"
          >
            Talk to an AI employee
          </a>
          <TrackedLink
            href={siteConfig.bookCallUrl}
            event="book_call_clicked"
            external
            className="border border-ink/15 text-ink px-[26px] py-4 rounded-[9px] text-[15.5px] font-semibold text-center hover:border-ink/35 transition-colors"
          >
            Book a free consultation
          </TrackedLink>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 text-[13.5px] text-ink/50">
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
    </section>
  );
}
