import { CallDemoButton, TrialButton } from "@/components/offer/CtaButtons";
import Reveal from "./Reveal";

const waveBars = Array.from({ length: 40 }, (_, i) => ({
  dur: 0.8 + (i % 6) * 0.14,
  delay: (i % 9) * 0.07,
}));

export default function CtaSection({ placement = "homepage_final_cta" }: { placement?: string }) {
  return (
    <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-16 md:py-[100px]">
      <Reveal>
        <div className="bg-ink rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div
            className="absolute -top-[60px] -right-[60px] w-[220px] h-[220px] rounded-full animate-floatSlow"
            style={{
              background:
                "radial-gradient(circle, rgba(59,84,244,0.35), transparent 70%)",
            }}
          />
          {/* Faint waveform along the bottom edge. */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-16 flex items-end justify-center gap-1.5 opacity-25 px-6">
            {waveBars.map((bar, i) => (
              <span
                key={i}
                className="w-[5px] rounded-t-[3px] bg-gradient-to-t from-brand to-brand-light h-full origin-bottom animate-wave"
                style={{ animationDuration: `${bar.dur}s`, animationDelay: `${bar.delay}s` }}
              />
            ))}
          </div>
          <h2 className="font-display text-3xl md:text-[42px] font-extrabold tracking-[-0.025em] leading-[1.1] text-white m-0 mb-3.5 relative">
            Hear it before you decide.
          </h2>
          <p className="text-[16.5px] text-white/65 m-0 mb-[30px] relative max-w-[520px] mx-auto">
            Call our AI and try to trip it up, or start your free trial. No card,
            no login, and it&apos;s live in 7 days.
          </p>
          <div className="relative flex flex-col sm:flex-row gap-3 justify-center pb-6">
            <CallDemoButton placement={placement} variant="dark" size="lg" />
            <TrialButton
              placement={placement}
              label="Start my free trial"
              variant="dark"
              size="lg"
              className="[a+&]:bg-transparent [a+&]:border [a+&]:border-white/25 [a+&]:hover:bg-transparent [a+&]:hover:border-white/50"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
