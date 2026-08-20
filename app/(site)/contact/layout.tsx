import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Vocemi - Have questions? We'd love to hear from you.",
  openGraph: {
    title: "Contact | Vocemi",
    description: "Get in touch with Vocemi - Have questions? We'd love to hear from you.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

