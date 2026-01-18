import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive Voice AI solutions including Voice Bot Development and Voice Analytics & Insights",
  openGraph: {
    title: "Services | Vocemi",
    description: "Comprehensive Voice AI solutions tailored to your business needs",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

