import type { Metadata } from "next";
import Link from "next/link";
import CallDemoLink from "@/components/site/CallDemoLink";
import { HowItWorks, Promises } from "@/components/site/MarketingSections";
import { pageMetadata } from "@/lib/metadata";
import { btnPrimary, btnSecondary, sectionWrap } from "@/components/site/styles";

export const metadata: Metadata = pageMetadata({
  title: "How it works | Vocemi",
  absoluteTitle: true,
  description:
    "Free missed-call audit (optional). We build it in 7 days. Free 14-day trial. Keep it or walk away.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <section className={`${sectionWrap} pt-12 md:pt-16`}>
        <h1 className="font-display text-[34px] sm:text-[48px] leading-[1.08] tracking-[-0.03em] font-extrabold text-ink m-0">
          How it works
        </h1>
      </section>
      <HowItWorks />
      <Promises />
      <section className={`${sectionWrap} pb-16 flex flex-col sm:flex-row flex-wrap gap-3`}>
        <Link href="/free-trial" className={btnPrimary}>
          Start free trial
        </Link>
        <CallDemoLink placement="how_it_works" label="hear" className={btnSecondary} />
      </section>
    </>
  );
}
