import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import { industryGuides } from "@/lib/industryContent";
import IndustryIcon from "./IndustryIcon";

/** The four industry tiles: homepage "Pick your industry" and /industries. */
export default function IndustryTiles({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {industryGuides.map((industry, i) => (
        <Reveal key={industry.slug} delay={i * 0.08} className="h-full">
          <Link
            href={`/industries/${industry.slug}`}
            className="group relative flex flex-col h-full bg-white border border-ink/10 rounded-2xl p-6 md:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_24px_48px_-18px_rgba(22,24,28,0.22)]"
          >
            {/* Tint wash that rises on hover. */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full transition-[height] duration-500 ease-out opacity-60"
              style={{ background: `linear-gradient(to top, ${industry.tint}, transparent)` }}
            />
            <span
              className="relative w-12 h-12 rounded-[13px] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
              style={{ background: industry.tint, color: industry.ink }}
            >
              <IndustryIcon icon={industry.icon} size={22} strokeWidth={2.2} />
            </span>
            <Heading className="relative font-display text-[19px] font-bold text-ink m-0 mb-1">
              {industry.name}
            </Heading>
            <div className="relative text-[13px] font-semibold mb-3" style={{ color: industry.ink }}>
              {industry.offerName}
            </div>
            <p className="relative text-[14.5px] leading-[1.6] text-ink/65 m-0 mb-5">
              {industry.tileLine}
            </p>
            <span className="relative mt-auto inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand">
              See how it works
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
