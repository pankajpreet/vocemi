import type { Metadata } from "next";
import Link from "next/link";
import { industryGuides } from "@/lib/industryContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "AI receptionist by industry | Vocemi",
  absoluteTitle: true,
  description:
    "Insurance, med spas, HVAC & plumbing, and vet clinics. Live in 7 days. Free for the first 14 (30 days for HVAC & plumbing).",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <div className="max-w-[1080px] mx-auto px-6 md:px-8 pt-12 pb-16 md:pt-16">
      <h1 className="font-display text-[34px] sm:text-[48px] leading-[1.08] tracking-[-0.03em] font-extrabold text-ink m-0 mb-8">
        Pick your industry
      </h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {industryGuides.map((industry) => (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className="block bg-white border border-ink/10 rounded-2xl p-6 hover:border-brand/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <h2 className="font-display text-[22px] font-bold text-ink m-0 mb-2">
              {industry.h1}
            </h2>
            <p className="text-[15px] leading-[1.55] text-ink/70 m-0 mb-3">
              {industry.navLabel}
            </p>
            <p className="text-[15px] leading-[1.55] text-ink/75 m-0">{industry.sub}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
