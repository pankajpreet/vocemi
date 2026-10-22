import type { Metadata } from "next";
import Link from "next/link";
import CallDemoLink from "@/components/site/CallDemoLink";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";
import { btnPrimary, btnSecondary, sectionWrap } from "@/components/site/styles";

export const metadata: Metadata = pageMetadata({
  title: "Results | Vocemi",
  absoluteTitle: true,
  description:
    "In April 2026, the AI intake agent answered 776 calls for an insurance brokerage. 3D Lifestyle, Calgary NE, answers after-hours calls and brings lapsed clients back.",
  path: "/results",
});

export default function ResultsPage() {
  return (
    <article className={`${sectionWrap} pt-12 pb-16 md:pt-16 max-w-[800px]`}>
      <h1 className="font-display text-[34px] sm:text-[48px] leading-[1.08] tracking-[-0.03em] font-extrabold text-ink m-0 mb-10">
        Results
      </h1>

      <section className="mb-10">
        <h2 className="font-display text-[26px] font-bold text-ink m-0 mb-3">
          Insurance brokerage
        </h2>
        <p className="text-[16.5px] leading-[1.65] text-ink/80 m-0 mb-3">
          In April 2026, the AI intake agent answered 776 calls, averaging 3 min
          16 s each.
        </p>
        <p className="text-[16.5px] leading-[1.65] text-ink/80 m-0 mb-3">
          What it did: took new-quote details and routed callers to the right
          broker.
        </p>
        <p className="text-[16.5px] leading-[1.65] text-ink/80 m-0">
          What we fixed along the way: moved to a stronger AI model after early
          intake errors; fixed calls ending without a proper goodbye; built a
          broker-assignment dashboard to stop duplicate assignments.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-[26px] font-bold text-ink m-0 mb-3">
          3D Lifestyle, Calgary NE
        </h2>
        <p className="text-[16.5px] leading-[1.65] text-ink/80 m-0">
          Answers after-hours calls and brings lapsed clients back.
        </p>
      </section>

      {siteConfig.showJagdeepReference ? (
        <section className="mb-10">
          <p className="text-[16.5px] leading-[1.65] text-ink/80 m-0">
            Talk to Jagdeep Duggal, an ISmart insurance broker using Vocemi today.
          </p>
        </section>
      ) : null}

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Link href="/free-trial" className={btnPrimary}>
          Start free trial
        </Link>
        <CallDemoLink placement="results" label="hear" className={btnSecondary} />
      </div>
    </article>
  );
}
