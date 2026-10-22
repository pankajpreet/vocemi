import Link from "next/link";
import AuditLink from "@/components/site/AuditLink";
import CallDemoLink from "@/components/site/CallDemoLink";
import { industryGuides } from "@/lib/industryContent";
import {
  callEstimateNote,
  comebackAddon,
  comebackBonus,
  howItWorksSteps,
  planIncludes,
  promises,
  trialPreviewNote,
  wontDo,
} from "@/lib/pricingFaq";
import { btnPrimary, btnSecondary, eyebrow, h2, sectionWrap } from "./styles";

export function HeroSection() {
  return (
    <section className={`${sectionWrap} pt-10 pb-8 md:pt-16 md:pb-10`}>
      <div className="max-w-[760px]">
        <h1 className="font-display text-[34px] sm:text-[46px] md:text-[58px] leading-[1.05] tracking-[-0.03em] font-extrabold text-ink m-0 mb-5">
          Stop sending your callers to voicemail.
        </h1>
        <p className="text-[17px] md:text-lg leading-[1.6] text-ink/75 m-0 mb-7 max-w-[640px]">
          Vocemi sets up and runs an AI receptionist built for your industry. It
          answers the calls you miss, books appointments into your calendar, and
          tells callers it&apos;s an AI. Live in 7 days. Free for the first 14.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <CallDemoLink
            placement="home_hero"
            label="now"
            className={btnPrimary}
          />
          <Link href="/free-trial" className={btnPrimary}>
            Start my free trial
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProofStrip() {
  const items = [
    "776 calls answered in one month for an insurance brokerage (April 2026)",
    "Answering after-hours calls for 3D Lifestyle, Calgary NE",
  ];
  return (
    <section className="border-y border-ink/10 bg-sand">
      <div className={`${sectionWrap} py-5 grid md:grid-cols-2 gap-3`}>
        {items.map((item) => (
          <p key={item} className="text-[15px] leading-[1.5] text-ink m-0 font-medium">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}

export function IndustryPicker() {
  return (
    <section className={`${sectionWrap} py-16 md:py-20`}>
      <h2 className={`${h2} mb-8`}>Pick your industry</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {industryGuides.map((industry) => (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className="block bg-white border border-ink/10 rounded-2xl p-6 hover:border-brand/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <h3 className="font-display text-[20px] font-bold text-ink m-0 mb-2">
              {industry.navLabel}
            </h3>
            <p className="text-[15px] leading-[1.55] text-ink/70 m-0">{industry.sub}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks({ heading }: { heading?: string }) {
  return (
    <section id="how-it-works" className="bg-sand py-16 md:py-20 scroll-mt-20">
      <div className={sectionWrap}>
        {heading ? <h2 className={`${h2} mb-8`}>{heading}</h2> : null}
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 m-0 p-0 list-none">
          {howItWorksSteps.map((step, index) => (
            <li key={step} className="bg-white border border-ink/10 rounded-2xl p-5">
              <div className="font-display text-brand font-extrabold text-xl mb-2">
                {index + 1}
              </div>
              <p className="text-[16px] leading-[1.45] font-semibold text-ink m-0">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Promises() {
  return (
    <section className={`${sectionWrap} py-16 md:py-20`}>
      <h2 className={`${h2} mb-8`}>Our promises</h2>
      <ol className="grid sm:grid-cols-2 gap-4 m-0 p-0 list-none">
        {promises.map((promise, index) => (
          <li key={promise} className="bg-white border border-ink/10 rounded-2xl p-5">
            <span className="font-display font-extrabold text-brand">{index + 1}</span>
            <p className="text-[16px] leading-[1.5] text-ink m-0 mt-2">{promise}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function WontDo() {
  return (
    <section className="bg-ink text-white">
      <div className={`${sectionWrap} py-14 md:py-16`}>
        <h2 className="font-display text-3xl font-extrabold m-0 mb-4">What it won&apos;t do</h2>
        <p className="text-[17px] leading-[1.6] text-white/85 m-0 max-w-[760px]">{wontDo}</p>
      </div>
    </section>
  );
}

export function FinalCta({
  title = "Hear it before you decide.",
  auditPlacement = "bottom_cta",
  callPlacement = "bottom_cta",
  auditLabel = "Get a free missed-call audit",
}: {
  title?: string;
  auditPlacement?: string;
  callPlacement?: string;
  auditLabel?: string;
}) {
  return (
    <section className={`${sectionWrap} py-16 md:py-20`}>
      <h2 className={`${h2} mb-6`}>{title}</h2>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <CallDemoLink placement={callPlacement} label="hear" className={btnSecondary} />
        <Link href="/free-trial" className={btnPrimary}>
          Start free trial
        </Link>
        <AuditLink placement={auditPlacement} className={btnSecondary}>
          {auditLabel}
        </AuditLink>
      </div>
    </section>
  );
}

export function PricingPreviewNote() {
  return (
    <p className="text-[15px] text-ink/75 m-0 mt-5">
      {trialPreviewNote}{" "}
      <Link href="/pricing" className="text-brand font-semibold">
        See pricing
      </Link>
    </p>
  );
}

export function PlanIncludes() {
  return (
    <section className={`${sectionWrap} py-4 md:py-6`}>
      <h2 className={`${h2} mb-6`}>Every plan includes</h2>
      <ul className="m-0 p-0 list-none grid md:grid-cols-2 gap-3">
        {planIncludes.map((item) => (
          <li key={item} className="flex gap-2 text-[15.5px] leading-[1.5] text-ink/80">
            <span className="text-brand" aria-hidden="true">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ComebackBlocks() {
  return (
    <div className={`${sectionWrap} grid lg:grid-cols-2 gap-4 py-8`}>
      <section className="bg-brand-tint rounded-2xl p-6">
        <h2 className="font-display text-[22px] font-bold text-ink m-0 mb-3">
          {comebackBonus.title}
        </h2>
        <p className="text-[15.5px] leading-[1.6] text-ink/80 m-0">{comebackBonus.body}</p>
      </section>
      <section className="bg-white border border-ink/10 rounded-2xl p-6">
        <h2 className="font-display text-[22px] font-bold text-ink m-0 mb-3">
          {comebackAddon.title}
        </h2>
        <p className="text-[15.5px] leading-[1.6] text-ink/80 m-0">{comebackAddon.body}</p>
      </section>
    </div>
  );
}

export function CallEstimateNote() {
  return (
    <p className="text-[14.5px] leading-[1.55] text-ink/70 m-0 mt-5">{callEstimateNote}</p>
  );
}

export function SectionIntro({
  eyebrowText,
  title,
  children,
}: {
  eyebrowText?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-[760px] mb-8">
      {eyebrowText ? <div className={eyebrow}>{eyebrowText}</div> : null}
      <h2 className={h2}>{title}</h2>
      {children}
    </div>
  );
}
