import { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Voice AI Receptionist & Automation Services",
  description:
    "Explore Vocemi services for AI call answering, appointment management, lead qualification, follow-up, and voice analytics.",
  path: "/services",
  socialDescription:
    "AI call answering, appointment management, lead qualification, follow-up, and voice analytics built around your workflow.",
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

