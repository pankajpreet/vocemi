import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Quote, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContentCta from "@/components/ContentCta";
import Reveal from "@/components/home/Reveal";
import {
  FaqStructuredData,
  IndustryStructuredData,
} from "@/components/StructuredData";
import BonusBlock from "@/components/offer/BonusBlock";
import CountUp from "@/components/offer/CountUp";
import { CallDemoButton, TrialButton } from "@/components/offer/CtaButtons";
import ExampleCall from "@/components/offer/ExampleCall";
import FaqList from "@/components/offer/FaqList";
import IndustryIcon from "@/components/offer/IndustryIcon";
import { PlanCard } from "@/components/offer/PlanCard";
import { CurrencyToggle } from "@/components/offer/Currency";
import WontDo from "@/components/offer/WontDo";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { getIndustryGuide, industryGuides } from "@/lib/industryContent";
import { pageMetadata } from "@/lib/metadata";
import { getPlan } from "@/lib/plans";
import { serviceGuides } from "@/lib/serviceContent";

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

const eyebrow = "text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3";
const sectionTitle =
  "font-display text-3xl md:text-[40px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink m-0";

export default function IndustryPage({ params }: IndustryPageProps) {
  const industry = getIndustryGuide(params.slug);
  if (!industry) notFound();

  const path = `/industries/${industry.slug}`;
  const plan = getPlan(industry.recommended.planId);
  const proof = industry.proof;
  const services = serviceGuides.filter((service) =>
    industry.relatedServices.includes(service.slug)
  );
  const posts = getAllPosts().filter((post) =>
    industry.relatedPosts.includes(post.slug)
  );

  return (
    <>
      <IndustryStructuredData
        name={industry.audience}
        description={industry.description}
        path={path}
      />
      <FaqStructuredData faqs={industry.faqs} />

      {/* 1–2. Offer + call button */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full animate-floatSlow"
          style={{ background: `radial-gradient(circle, ${industry.tint}, transparent 65%)` }}
        />
        <div className="relative max-w-[1180px] mx-auto px-6 md:px-8 pt-10 pb-16 md:pt-14 md:pb-24">
          <Breadcrumbs
            items={[
              { name: "Industries", path: "/industries" },
              { name: industry.name, path },
            ]}
          />
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">
            <div className="animate-fadeUp">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-[7px] rounded-full text-[13px] font-semibold mb-5"
                style={{ background: industry.tint, color: industry.ink }}
              >
                <IndustryIcon icon={industry.icon} size={15} strokeWidth={2.4} />
                For {industry.audience}
              </div>
              <h1 className="font-display text-[38px] md:text-[56px] leading-[1.05] tracking-[-0.025em] font-extrabold text-ink m-0 mb-5">
                {industry.offerName}
              </h1>
              <p className="text-lg leading-[1.65] text-ink/65 m-0 mb-8 max-w-[560px]">
                {industry.sub}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <CallDemoButton placement={`industry_hero_${industry.slug}`} label="Call our AI now" variant="primary" />
                <TrialButton
                  placement={`industry_hero_${industry.slug}`}
                  industry={industry.trialIndustry}
                  label={`Start my free ${industry.trialDays}-day trial`}
                  className="[a+&]:bg-ink [a+&]:hover:bg-brand"
                />
              </div>
              <p className="text-[13.5px] text-ink/60 m-0">
                $0 setup · Live in 7 days · No card for the trial
              </p>
            </div>
            <div className="animate-fadeUp [animation-delay:150ms]">
              <ExampleCall
                lines={industry.exampleCall.lines}
                outcome={industry.exampleCall.outcome}
              />
              <p className="text-[12.5px] leading-[1.6] text-ink/60 m-0 mt-3">
                {industry.exampleCall.setup} Illustrative scenario, not a recording.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What it handles */}
      <section className="bg-sand py-16 md:py-24">
        <div className="max-w-[1080px] mx-auto px-6 md:px-8">
          <Reveal className="max-w-[640px] mb-10">
            <div className={eyebrow}>What it handles</div>
            <h2 className={sectionTitle}>The calls it takes off your plate</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {industry.handles.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group bg-white border border-ink/10 rounded-2xl p-6 h-full flex gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(22,24,28,0.18)]">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: industry.tint, color: industry.ink }}
                  >
                    <CheckCircle2 size={19} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-[17px] font-bold text-ink m-0 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[14.5px] leading-[1.6] text-ink/65 m-0">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What it won't do */}
      <section className="max-w-[1080px] mx-auto px-6 md:px-8 py-16 md:py-24 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center">
        <Reveal>
          <div className={eyebrow}>What it won&apos;t do</div>
          <h2 className={`${sectionTitle} mb-4`}>It knows where its job ends</h2>
          <p className="text-[16px] leading-[1.65] text-ink/65 m-0">
            It tells callers it&apos;s an AI, and passes them to your team when
            they need a person.
          </p>
        </Reveal>
        <WontDo items={[industry.wontDo]} note="Every one of these is handed to your team, with a summary of the call." />
      </section>

      {/* 5. Proof */}
      <section className="bg-coal text-white py-16 md:py-24 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full animate-floatSlow"
          style={{ background: "radial-gradient(circle, rgba(59,84,244,0.28), transparent 70%)" }}
        />
        <div className="relative max-w-[1080px] mx-auto px-6 md:px-8">
          <div className="text-[13px] font-bold uppercase tracking-[0.06em] mb-3 text-brand-light">
            Proof
          </div>
          {proof.kind === "stat" && (
            <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-end">
              <Reveal>
                <div className="font-display font-extrabold text-[72px] md:text-[104px] leading-none tracking-[-0.04em] bg-gradient-to-r from-white to-brand-light bg-clip-text text-transparent">
                  <CountUp to={proof.value} />
                </div>
                <p className="text-[19px] md:text-[22px] font-display font-bold text-white m-0 mt-3">
                  {proof.label}
                </p>
                <p className="text-[15px] leading-[1.65] text-white/65 m-0 mt-3 max-w-[460px]">
                  {proof.detail}{" "}
                  <Link href="/results" className="text-brand-light underline underline-offset-2 hover:text-white">
                    See the full result
                  </Link>
                </p>
              </Reveal>
              {proof.brokerReference && siteConfig.flags.showJagdeepReference && (
                <Reveal delay={0.15}>
                  <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 md:p-7">
                    <Quote size={22} className="text-brand-light mb-3" aria-hidden />
                    <p className="text-[17px] leading-[1.6] text-white m-0">
                      Talk to Jagdeep Duggal, an insurance broker using Vocemi today.
                    </p>
                    <p className="text-[13px] text-white/55 m-0 mt-3">
                      Reference available on request after your audit or trial kickoff.
                    </p>
                  </div>
                </Reveal>
              )}
            </div>
          )}
          {proof.kind === "client" && (
            <Reveal className="max-w-[720px]">
              <h2 className="font-display text-3xl md:text-[44px] leading-[1.1] font-extrabold tracking-[-0.025em] m-0 mb-4">
                {proof.name}
              </h2>
              <p className="text-[17px] leading-[1.65] text-white/70 m-0">{proof.detail}</p>
            </Reveal>
          )}
          {proof.kind === "first" && (
            <Reveal className="max-w-[720px]">
              <h2 className="font-display text-3xl md:text-[44px] leading-[1.1] font-extrabold tracking-[-0.025em] m-0 mb-4 flex items-center gap-3">
                <Sparkles className="text-brand-light flex-shrink-0" size={32} aria-hidden />
                {proof.text}
              </h2>
              <p className="text-[17px] leading-[1.65] text-white/70 m-0">{proof.detail}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* 6. Recommended plan + free trial + bonus */}
      <section className="max-w-[1080px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
          <Reveal>
            <div className={eyebrow}>Recommended plan</div>
            <h2 className={`${sectionTitle} mb-4`}>{plan.name}, free for {industry.trialDays} days</h2>
            <p className="text-[16px] leading-[1.65] text-ink/65 m-0 mb-6">
              {industry.recommended.note} Keep it after the trial, or walk away and
              owe nothing.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <CurrencyToggle placement={`industry_${industry.slug}`} />
              <Link href="/pricing" className="text-[14.5px] font-semibold text-brand hover:text-brand-dark">
                Compare all plans
              </Link>
            </div>
            {industry.bonus && <BonusBlock compact />}
          </Reveal>
          <Reveal delay={0.12}>
            <PlanCard
              plan={plan}
              placement={`industry_${industry.slug}`}
              recommended
              industry={industry.trialIndustry}
            />
          </Reveal>
        </div>
      </section>

      {/* 7. Objection FAQ */}
      <section className="bg-sand py-16 md:py-24">
        <div className="max-w-[800px] mx-auto px-6 md:px-8">
          <div className={eyebrow}>FAQ</div>
          <h2 className={`${sectionTitle} mb-8`}>What {industry.audience} ask us</h2>
          <FaqList faqs={industry.faqs} numbered={false} />
        </div>
      </section>

      {/* 8. CTA */}
      <section className="max-w-[1080px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <ContentCta
          title={`Try ${industry.offerName} free for ${industry.trialDays} days`}
          text="We build it for you and it's live in 7 days. No card and no login. Keep it, or walk away and owe nothing."
          placement={`industry_${industry.slug}_final`}
          industry={industry.trialIndustry}
        />

        {(services.length > 0 || posts.length > 0) && (
          <div className="grid md:grid-cols-2 gap-5 mt-14">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white border border-ink/10 rounded-2xl p-6 hover:border-brand/40 transition-colors"
              >
                <div className="text-[12.5px] text-ink/65 mb-2">Service</div>
                <div className="font-display text-[18px] font-bold text-ink mb-2">
                  {service.name}
                </div>
                <p className="text-[14.5px] leading-[1.6] text-ink/60 m-0">
                  {service.description}
                </p>
              </Link>
            ))}
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-ink/10 rounded-2xl p-6 hover:border-brand/40 transition-colors"
              >
                <div className="text-[12.5px] text-ink/65 mb-2">{post.category}</div>
                <div className="font-display text-[18px] leading-[1.35] font-bold text-ink mb-2">
                  {post.title}
                </div>
                <p className="text-[14.5px] leading-[1.6] text-ink/60 m-0">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
