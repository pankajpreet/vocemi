import FaqList from "@/components/offer/FaqList";
import SectionIntro from "@/components/offer/SectionIntro";
import { homePricingFaqs } from "@/lib/plans";

export default function HomeFaq() {
  return (
    <section id="faq" className="bg-sand py-20 md:py-[110px] scroll-mt-16">
      <div className="max-w-[800px] mx-auto px-6 md:px-8">
        <SectionIntro
          eyebrow="FAQ"
          title="Questions before you try it"
          sub={
            <>
              More answers on the{" "}
              <a href="/pricing#faq" className="text-brand font-semibold hover:text-brand-dark">
                pricing page
              </a>
              .
            </>
          }
        />
        <FaqList faqs={homePricingFaqs} />
      </div>
    </section>
  );
}
