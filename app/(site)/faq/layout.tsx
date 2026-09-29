import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voice AI FAQs: Setup, Privacy & Business Use",
  description:
    "Answers about how Voice AI works, implementation timelines, technical requirements, privacy, and suitable business use cases.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Voice AI FAQs: Setup, Privacy & Business Use | Vocemi",
    description:
      "Clear answers about Voice AI implementation, technical requirements, privacy, and business use cases.",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // FAQPage markup lives on the homepage, which renders the same questions;
  // repeating it here would only duplicate it.
  return <>{children}</>;
}

