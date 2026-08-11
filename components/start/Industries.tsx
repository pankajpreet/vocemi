import Reveal from "@/components/home/Reveal";
import { industries } from "@/lib/startContent";

export default function Industries() {
  return (
    <section className="bg-sand border-y border-ink/10">
      <div className="max-w-[860px] mx-auto px-6 py-14 md:py-20">
        <Reveal>
          <h2 className="font-display text-[28px] md:text-4xl font-extrabold tracking-[-0.025em] text-ink m-0 mb-3">
            Built for businesses where every call is a customer
          </h2>
          <p className="text-[16px] text-ink/60 leading-[1.6] m-0 mb-7 max-w-[520px]">
            If a missed call means a lost job, this is for you.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {industries.map((industry) => (
              <span
                key={industry}
                className="bg-white border border-ink/10 text-ink/75 text-[14px] font-medium px-4 py-2.5 rounded-full"
              >
                {industry}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
