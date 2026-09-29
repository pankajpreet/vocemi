import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { industryGuides } from "@/lib/industryContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "AI Receptionist by Industry: Clinics, Trades & Insurance",
  description:
    "How Vocemi AI receptionists handle calls for med spas, dental practices, HVAC and plumbing companies, and insurance brokerages, with the human handoffs each one needs.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <div className="max-w-[1080px] mx-auto px-6 md:px-8 pt-14 pb-20 md:pt-20 md:pb-28">
      <Breadcrumbs items={[{ name: "Industries", path: "/industries" }]} />

      <div className="max-w-[720px] mb-12 md:mb-16">
        <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-4">
          Industries
        </div>
        <h1 className="font-display text-[40px] md:text-[56px] leading-[1.06] tracking-[-0.025em] font-extrabold text-ink m-0 mb-5">
          Built for businesses where every call is a customer
        </h1>
        <p className="text-lg leading-[1.65] text-ink/60 m-0">
          The calls are different in a dental office, a med spa, a plumbing
          company and a brokerage, and so are the rules about what should stay
          with a person. Each guide covers the calls worth automating first and
          where the handoffs belong.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {industryGuides.map((industry) => (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className="group flex flex-col bg-white border border-ink/10 rounded-2xl p-7 md:p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-14px_rgba(22,24,28,0.18)]"
          >
            <h2 className="font-display text-[22px] font-bold text-ink m-0 mb-3">
              {industry.name}
            </h2>
            <p className="text-[15px] leading-[1.6] text-ink/60 m-0 mb-6">
              {industry.description}
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand">
              See how it works for {industry.name.toLowerCase()}
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ))}
      </div>

      <p className="text-[15px] leading-[1.65] text-ink/55 mt-12 max-w-[640px]">
        Don&apos;t see your industry? The same approach works for most
        businesses that live on the phone, including accounting firms, roofing
        companies and auto shops.{" "}
        <Link href="/contact" className="text-brand font-semibold hover:text-brand-dark">
          Tell us about your calls
        </Link>
        .
      </p>
    </div>
  );
}
