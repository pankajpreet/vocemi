import { Metadata } from "next";
import { ServiceStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Voice AI Receptionist & Automation Services",
  description:
    "Explore Vocemi services for AI call answering, appointment management, lead qualification, follow-up, and voice analytics.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Voice AI Receptionist & Automation Services | Vocemi",
    description:
      "AI call answering, appointment management, lead qualification, follow-up, and voice analytics built around your workflow.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceStructuredData />
      {children}
    </>
  );
}

