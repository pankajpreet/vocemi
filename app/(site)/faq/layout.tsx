import { Metadata } from "next";
import { FaqStructuredData } from "@/components/StructuredData";
import { pageFaqs } from "@/lib/faqContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Voice AI FAQs: Setup, Privacy & Business Use",
  description:
    "Answers on Vocemi pricing, AI receptionist and lead reactivation workflows, Canadian calling rules, and how to get in touch.",
  path: "/faq",
  socialDescription:
    "Pricing, receptionist and lead reactivation workflows, Canadian calling rules, and how to reach Vocemi.",
});

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FaqStructuredData faqs={pageFaqs} />
      {children}
    </>
  );
}

