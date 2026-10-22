import { Metadata } from "next";
import { FaqStructuredData } from "@/components/StructuredData";
import { pageFaqs } from "@/lib/faqContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "FAQ | Vocemi",
  absoluteTitle: true,
  description:
    "Pricing, the free 14-day trial, minutes, contracts, and what the AI receptionist will not do.",
  path: "/faq",
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

