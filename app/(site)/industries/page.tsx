import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContentCta from "@/components/ContentCta";
import IndustryTiles from "@/components/offer/IndustryTiles";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "AI Receptionist by Industry: Insurance, Med Spas, HVAC & Vet Clinics",
  description:
    "AI receptionists built for insurance brokerages, med spas, HVAC and plumbing companies, and vet clinics, each with its own rules for what goes to your team. Free trial, $0 setup.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <div className="max-w-[1180px] mx-auto px-6 md:px-8 pt-14 pb-20 md:pt-20 md:pb-28">
      <Breadcrumbs items={[{ name: "Industries", path: "/industries" }]} />

      <div className="max-w-[720px] mb-12 md:mb-16 animate-fadeUp">
        <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-4">
          Industries
        </div>
        <h1 className="font-display text-[40px] md:text-[56px] leading-[1.06] tracking-[-0.025em] font-extrabold text-ink m-0 mb-5">
          Built for businesses where every caller is a customer
        </h1>
        <p className="text-lg leading-[1.65] text-ink/60 m-0">
          The calls are different at a brokerage, a med spa, a plumbing company
          and a vet clinic, and so are the rules about what should stay with a
          person. Each one is set up for its own calls and its own handoffs.
        </p>
      </div>

      <IndustryTiles headingLevel="h2" />

      <p className="text-[15px] leading-[1.65] text-ink/65 mt-12 mb-16 max-w-[640px]">
        Need the AI connected to your own software, or working across several
        departments? That&apos;s our{" "}
        <Link href="/pricing#custom" className="text-brand font-semibold hover:text-brand-dark">
          Custom plan
        </Link>
        , priced after a free audit.
      </p>

      <ContentCta
        title="Try it free for 14 days"
        text="30 days for HVAC & plumbing. We build it for you and it's live in 7 days. No card, no login."
        placement="industries_index"
      />
    </div>
  );
}
