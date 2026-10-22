import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuditLink from "@/components/site/AuditLink";
import CallDemoLink from "@/components/site/CallDemoLink";
import { ComebackBlocks } from "@/components/site/MarketingSections";
import PlanCards from "@/components/site/PlanCards";
import FaqList from "@/components/site/FaqList";
import {
  FaqStructuredData,
  IndustryStructuredData,
} from "@/components/StructuredData";
import { auditBookingUrl } from "@/lib/bookingUrls";
import { siteConfig } from "@/lib/config";
import { getIndustryGuide, industryGuides } from "@/lib/industryContent";
import { pageMetadata } from "@/lib/metadata";
import { btnPrimary, btnSecondary, h2, sectionWrap } from "@/components/site/styles";

interface IndustryPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return industryGuides.map((industry) => ({ slug: industry.slug }));
}

export function generateMetadata({ params }: IndustryPageProps): Metadata {
  const industry = getIndustryGuide(params.slug);
  if (!industry) return {};
  return pageMetadata({
    title: industry.metaTitle,
    absoluteTitle: true,
    description: industry.description,
    path: `/industries/${industry.slug}`,
  });
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const industry = getIndustryGuide(params.slug);
  if (!industry) notFound();

  const showBroker =
    industry.slug === "insurance" && siteConfig.showJagdeepReference;

  return (
    <>
      <IndustryStructuredData
        name={industry.name}
        description={industry.description}
        path={`/industries/${industry.slug}`}
      />
      <FaqStructuredData faqs={industry.faqs} />

      <section className={`${sectionWrap} pt-12 pb-10 md:pt-16`}>
        <p className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
          {industry.navLabel}
        </p>
        <h1 className="font-display text-[34px] sm:text-[48px] leading-[1.08] tracking-[-0.03em] font-extrabold text-ink m-0 mb-4 max-w-[800px]">
          {industry.h1}
        </h1>
        <p className="text-[17px] leading-[1.6] text-ink/75 max-w-[720px] m-0 mb-6">
          {industry.sub}
        </p>
        <CallDemoLink
          placement={`industry_${industry.slug}`}
          label="hear"
          className={btnPrimary}
        />
      </section>

      <section className="bg-sand py-14 md:py-16">
        <div className={sectionWrap}>
          <h2 className={`${h2} mb-6`}>What it handles</h2>
          <ul className="m-0 p-0 list-none grid md:grid-cols-2 gap-3">
            {industry.handles.map((item) => (
              <li
                key={item}
                className="bg-white border border-ink/10 rounded-2xl p-5 text-[15.5px] leading-[1.5] text-ink/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${sectionWrap} py-14 md:py-16`}>
        <h2 className={`${h2} mb-4`}>What it won&apos;t do</h2>
        <p className="text-[17px] leading-[1.6] text-ink/80 m-0 max-w-[720px]">
          {industry.wont}
        </p>
      </section>

      <section className="bg-sand py-14 md:py-16">
        <div className={sectionWrap}>
          <h2 className={`${h2} mb-4`}>Proof</h2>
          <p className="text-[17px] leading-[1.6] text-ink m-0">{industry.proof}</p>
          {showBroker ? (
            <p className="text-[17px] leading-[1.6] text-ink m-0 mt-3">
              Talk to Jagdeep Duggal, an ISmart insurance broker using Vocemi today.
            </p>
          ) : null}
        </div>
      </section>

      <section className={`${sectionWrap} py-14 md:py-16`}>
        <h2 className={`${h2} mb-4`}>Recommended plan</h2>
        <p className="text-[17px] leading-[1.6] text-ink/80 m-0 mb-6">
          {industry.recommendation}
        </p>
        <PlanCards
          ids={industry.planIds}
          auditHref={auditBookingUrl(`industry_${industry.slug}`)}
          auditPlacement={`industry_${industry.slug}`}
        />
      </section>
      <ComebackBlocks />

      <section className={`${sectionWrap} py-8 md:py-10`}>
        <h2 className={`${h2} mb-6`}>FAQ</h2>
        <FaqList faqs={industry.faqs} idPrefix={`${industry.slug}-faq`} />
      </section>

      <section className={`${sectionWrap} pb-16 flex flex-col sm:flex-row flex-wrap gap-3`}>
        <Link href="/free-trial" className={btnPrimary}>
          Start free trial
        </Link>
        <CallDemoLink
          placement={`industry_${industry.slug}_cta`}
          label="hear"
          className={btnSecondary}
        />
        <AuditLink placement={`industry_${industry.slug}_cta`} className={btnSecondary}>
          Get a free missed-call audit
        </AuditLink>
      </section>
    </>
  );
}
