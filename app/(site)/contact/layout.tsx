import { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact Vocemi About Voice AI",
  description:
    "Send Vocemi a question about Voice AI workflows or book a free consultation with the Calgary-based team.",
  path: "/contact",
  socialDescription:
    "Ask about a Voice AI workflow or book a free consultation with Vocemi.",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

