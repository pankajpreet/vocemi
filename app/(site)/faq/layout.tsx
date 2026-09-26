import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Voice AI, implementation, security, and pricing",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Vocemi",
    description: "Quick answers to common Voice AI questions",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

