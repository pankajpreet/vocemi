import Link from "next/link";
import FaqList from "@/components/site/FaqList";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";
import { pageFaqs } from "@/lib/faqContent";
import { btnPrimary, btnSecondary, sectionWrap } from "@/components/site/styles";

export default function FAQPage() {
  return (
    <div className={`${sectionWrap} pt-12 pb-16 md:pt-16`}>
      <div className="max-w-[800px]">
        <h1 className="font-display text-[34px] sm:text-[48px] leading-[1.08] tracking-[-0.03em] font-extrabold text-ink m-0 mb-4">
          Frequently asked questions
        </h1>
        <p className="text-[17px] leading-[1.6] text-ink/75 m-0 mb-8">
          Pricing, the free trial, and what the AI leaves to your team.
        </p>
        <FaqList faqs={pageFaqs} idPrefix="page-faq" />
        <p className="mt-8 text-[15px] leading-relaxed text-ink/75 m-0">
          <Link href="/pricing" className="text-brand font-semibold">
            Pricing
          </Link>
          {" · "}
          <Link href="/services/ai-receptionist" className="text-brand font-semibold">
            AI receptionist
          </Link>
          {" · "}
          <Link href="/services/lead-reactivation" className="text-brand font-semibold">
            Comeback Sprint
          </Link>
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
          <Link href="/free-trial" className={btnPrimary}>
            Start free trial
          </Link>
          <TrackedLink
            href={siteConfig.bookCallUrl("faq_page")}
            event="book_call_clicked"
            properties={{ placement: "faq_page" }}
            external
            className={btnSecondary}
          >
            Book a call
          </TrackedLink>
          <Link href="/contact" className={btnSecondary}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
