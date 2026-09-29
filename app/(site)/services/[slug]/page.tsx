import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { ServiceDetailStructuredData } from "@/components/StructuredData";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";
import {
  getServiceGuide,
  serviceGuides,
  type ServiceGuide,
} from "@/lib/serviceContent";

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return serviceGuides.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceGuide(params.slug);
  if (!service) return {};

  return pageMetadata({
    title: service.metaTitle,
    absoluteTitle: true,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

function DetailList({
  title,
  items,
}: {
  title: string;
  items: ServiceGuide["handles"];
}) {
  return (
    <div className="bg-white border border-ink/10 rounded-2xl p-7">
      <h2 className="font-display text-xl font-bold text-ink m-0 mb-5">
        {title}
      </h2>
      <ul className="m-0 p-0 list-none flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-[1.6] text-ink/65">
            <span className="w-6 h-6 rounded-full bg-brand-tint text-brand inline-flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={14} strokeWidth={2.5} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceGuide(params.slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const demoHref = siteConfig.voiceDemoAvailable ? "/start#talk" : "/start";

  return (
    <>
      <ServiceDetailStructuredData
        name={service.name}
        description={service.description}
        path={path}
      />

      <main>
        <section className="max-w-[960px] mx-auto px-6 md:px-8 pt-14 pb-16 md:pt-20 md:pb-24">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[13px] text-ink/45 mb-8"
          >
            <Link href="/" className="hover:text-brand transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="hover:text-brand transition-colors">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink/70">{service.name}</span>
          </nav>

          <div className="max-w-[760px]">
            <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-4">
              {service.name}
            </div>
            <h1 className="font-display text-[40px] md:text-[58px] leading-[1.06] tracking-[-0.025em] font-extrabold text-ink m-0 mb-6">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl leading-[1.65] text-ink/60 m-0 mb-8">
              {service.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <TrackedLink
                href={demoHref}
                event="demo_cta_clicked"
                properties={{
                  placement: "service_detail_hero",
                  service: service.slug,
                }}
                className="inline-flex items-center justify-center gap-2 bg-brand text-white px-6 py-3.5 rounded-[9px] font-semibold hover:bg-brand-dark transition-colors"
              >
                {siteConfig.voiceDemoAvailable
                  ? "Try the live demo"
                  : "See how it works"}
                <ArrowRight size={17} />
              </TrackedLink>
              <TrackedLink
                href={siteConfig.bookCallUrl}
                event="book_call_clicked"
                properties={{
                  placement: "service_detail_hero",
                  service: service.slug,
                }}
                external
                className="inline-flex items-center justify-center border border-ink/15 text-ink px-6 py-3.5 rounded-[9px] font-semibold hover:border-ink/35 transition-colors"
              >
                Book a free call
              </TrackedLink>
            </div>
          </div>
        </section>

        <section className="bg-sand py-16 md:py-24">
          <div className="max-w-[1080px] mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-6">
            <DetailList title="What this workflow can handle" items={service.handles} />
            <DetailList title="How you stay in control" items={service.controls} />
          </div>
        </section>

        <section className="max-w-[1080px] mx-auto px-6 md:px-8 py-16 md:py-24 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16">
          <div>
            <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
              Launch process
            </div>
            <h2 className="font-display text-3xl md:text-[42px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink m-0">
              One approved workflow at a time
            </h2>
          </div>
          <ol className="m-0 p-0 list-none flex flex-col border-t border-ink/10">
            {service.launchSteps.map((step, index) => (
              <li
                key={step}
                className="grid grid-cols-[44px_1fr] gap-4 py-5 border-b border-ink/10"
              >
                <span className="font-display font-extrabold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[15.5px] leading-[1.6] text-ink/65">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="max-w-[1080px] mx-auto px-6 md:px-8 pb-16 md:pb-24">
          <div className="bg-ink text-white rounded-3xl p-8 md:p-12 grid md:grid-cols-[0.8fr_1.2fr] gap-8">
            <div>
              <div className="text-[12px] font-bold text-brand-light uppercase tracking-[0.08em] mb-3">
                Client workflow example
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold m-0 mb-2">
                {service.example.client}
              </h2>
              <p className="text-white/50 m-0">{service.example.context}</p>
            </div>
            <ul className="m-0 p-0 list-none flex flex-col gap-4">
              {service.example.details.map((detail) => (
                <li
                  key={detail}
                  className="flex gap-3 text-[15px] leading-[1.65] text-white/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-light flex-shrink-0 mt-2.5" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-center text-[12.5px] text-ink/40 mt-4 mb-0">
            Workflow description only; no unverified performance result is
            implied.
          </p>
        </section>
      </main>
    </>
  );
}
