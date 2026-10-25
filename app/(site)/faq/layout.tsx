import { Metadata } from "next";
import { FaqStructuredData } from "@/components/StructuredData";
import { pageFaqs } from "@/lib/faqContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "AI Receptionist FAQ: Pricing, Free Trial & Data",
  description:
    "Answers on Vocemi pricing, minutes, contracts, the free 14-day trial, what the AI won't do, where call data is stored, Comeback Sprints and Canadian calling rules.",
  path: "/faq",
  socialDescription:
    "Pricing, minutes, the free trial, what the AI won't do, and how to reach Vocemi.",
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

