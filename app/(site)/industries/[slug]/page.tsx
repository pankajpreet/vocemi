import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContentCta from "@/components/ContentCta";
import {
  FaqStructuredData,
  IndustryStructuredData,
} from "@/components/StructuredData";
import TrackedLink from "@/components/start/TrackedLink";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { getIndustryGuide, industryGuides } from "@/lib/industryContent";
import { pageMetadata } from "@/lib/metadata";
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
  const demoHref = siteConfig.voiceDemoAvailable ? "/start#talk" : "/start";
  const services = serviceGuides.filter((service) =>
    industry.relatedServices.includes(service.slug)
  );
  const posts = getAllPosts().filter((post) =>
    industry.relatedPosts.includes(post.slug)
  );

  return (
    <>
      <IndustryStructuredData
        name={industry.name}
        description={industry.description}
        path={path}
      />
      <FaqStructuredData faqs={industry.faqs} />

      <section className="max-w-[1080px] mx-auto px-6 md:px-8 pt-14 pb-16 md:pt-20 md:pb-24">
        <Breadcrumbs
          items={[
            { name: "Industries", path: "/industries" },
            { name: industry.name, path },
          ]}
        />

        <div className="max-w-[800px]">
          <div className={`${eyebrow} mb-4`}>For {industry.name.toLowerCase()}</div>
          <h1 className="font-display text-[36px] md:text-[54px] leading-[1.07] tracking-[-0.025em] font-extrabold text-ink m-0 mb-6">
            {industry.title}
          </h1>
          {industry.intro.map((paragraph) => (
            <p
              key={paragraph}
              className="text-lg leading-[1.65] text-ink/60 m-0 mb-4 last:mb-8"
            >
              {paragraph}
            </p>
          ))}
          <div className="flex flex-col sm:flex-row gap-3">
            <TrackedLink
              href={demoHref}
              event="demo_cta_clicked"
              properties={{ placement: "industry_hero", industry: industry.slug }}
              className="inline-flex items-center justify-center gap-2 bg-brand text-white px-6 py-3.5 rounded-[9px] font-semibold hover:bg-brand-dark transition-colors"
            >
              {siteConfig.voiceDemoAvailable ? "Try the live demo" : "See how it works"}
              <ArrowRight size={17} />
            </TrackedLink>
            <TrackedLink
              href={siteConfig.bookCallUrl("industry_hero")}
              event="book_call_clicked"
              properties={{ placement: "industry_hero", industry: industry.slug }}
              external
              className="inline-flex items-center justify-center border border-ink/15 text-ink px-6 py-3.5 rounded-[9px] font-semibold hover:border-ink/35 transition-colors"
            >
              Book a free call
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 md:py-24">
        <div className="max-w-[1080px] mx-auto px-6 md:px-8">
          <div className="max-w-[640px] mb-10">
            <div className={eyebrow}>What it handles</div>
            <h2 className={sectionTitle}>The calls worth automating first</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industry.calls.map((call) => (
              <div
                key={call.title}
                className="bg-white border border-ink/10 rounded-2xl p-6"
              >
                <h3 className="font-display text-[17px] font-bold text-ink m-0 mb-2">
                  {call.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-ink/60 m-0">
                  {call.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1080px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-start">
          <div>
            <div className={eyebrow}>Example call</div>
            <h2 className={`${sectionTitle} mb-4`}>How a call could go</h2>
            <p className="text-[16px] leading-[1.65] text-ink/60 m-0 mb-4">
              {industry.exampleCall.setup}
            </p>
            <p className="text-[13px] leading-[1.6] text-ink/65 m-0">
              Illustrative scenario showing how an approved workflow runs. Not
              a recording of a real call.
            </p>
          </div>
          <div className="bg-ink rounded-3xl p-6 md:p-8">
            <ol className="m-0 p-0 list-none flex flex-col gap-3">
              {industry.exampleCall.lines.map((line, index) => (
                <li
                  key={index}
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-[14.5px] leading-[1.55] ${
                    line.speaker === "Agent"
                      ? "bg-white/10 text-white/85 self-start"
                      : "bg-brand text-white self-end"
                  }`}
                >
                  <span className="block text-[11px] font-bold uppercase tracking-[0.08em] opacity-60 mb-1">
                    {line.speaker === "Agent" ? "AI receptionist" : "Caller"}
                  </span>
                  {line.text}
                </li>
              ))}
            </ol>
            <div className="mt-6 pt-5 border-t border-white/10 text-[14px] leading-[1.6] text-white/65">
              <span className="font-semibold text-white">Outcome: </span>
              {industry.exampleCall.outcome}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 md:py-24">
        <div className="max-w-[1080px] mx-auto px-6 md:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14">
          <div>
            <div className={eyebrow}>Human boundaries</div>
            <h2 className={`${sectionTitle} mb-6`}>What stays with your team</h2>
            <ul className="m-0 p-0 list-none flex flex-col gap-3.5">
              {industry.staysWithTeam.map((item) => (
                <li key={item} className="flex gap-3 text-[15.5px] leading-[1.55] text-ink/70">
                  <span className="w-6 h-6 rounded-full bg-brand-tint text-brand inline-flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            {industry.considerations.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-ink/10 rounded-2xl p-6"
              >
                <h3 className="font-display text-[17px] font-bold text-ink m-0 mb-2">
                  {item.title}
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-ink/60 m-0">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[800px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className={eyebrow}>FAQ</div>
        <h2 className={`${sectionTitle} mb-8`}>
          Common questions from {industry.name.toLowerCase()}
        </h2>
        <div className="flex flex-col divide-y divide-ink/10 border-y border-ink/10">
          {industry.faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <h3 className="font-display text-[18px] font-bold text-ink m-0 mb-2">
                {faq.question}
              </h3>
              <p className="text-[15.5px] leading-[1.65] text-ink/60 m-0">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1080px] mx-auto px-6 md:px-8 pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-5 mb-14">
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

        <ContentCta
          title={`Map your first workflow for ${industry.name.toLowerCase()}`}
          text="Bring a week of call patterns and we'll help you pick the one workflow worth automating first, including where it should hand off to your team."
          placement="industry_page"
        />
      </section>
    </>
  );
}
