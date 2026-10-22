import type { Metadata } from "next";
import TrialForm from "@/components/site/TrialForm";
import { pageMetadata } from "@/lib/metadata";
import { trialIntro } from "@/lib/pricingFaq";
import { sectionWrap } from "@/components/site/styles";

export const metadata: Metadata = pageMetadata({
  title: "Start a free AI receptionist trial | Vocemi",
  absoluteTitle: true,
  description: trialIntro,
  path: "/free-trial",
});

export default function FreeTrialPage() {
  return (
    <section className={`${sectionWrap} pt-12 pb-16 md:pt-16 max-w-[760px]`}>
      <h1 className="font-display text-[34px] sm:text-[46px] leading-[1.08] tracking-[-0.03em] font-extrabold text-ink m-0 mb-4">
        Start my free trial
      </h1>
      <p className="text-[17px] leading-[1.6] text-ink/75 m-0 mb-8">{trialIntro}</p>
      <TrialForm />
    </section>
  );
}
