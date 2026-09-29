import { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Voice AI FAQs: Setup, Privacy & Business Use",
  description:
    "Answers about how Voice AI works, implementation timelines, technical requirements, privacy, and suitable business use cases.",
  path: "/faq",
  socialDescription:
    "Clear answers about Voice AI implementation, technical requirements, privacy, and business use cases.",
});

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // FAQPage markup lives on the homepage, which renders the same questions;
  // repeating it here would only duplicate it.
  return <>{children}</>;
}

