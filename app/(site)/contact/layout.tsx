import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Vocemi About Voice AI",
  description:
    "Send Vocemi a question about Voice AI workflows or book a free consultation with the Calgary-based team.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Vocemi About Voice AI | Vocemi",
    description:
      "Ask about a Voice AI workflow or book a free consultation with Vocemi.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

