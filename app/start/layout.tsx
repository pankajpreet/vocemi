import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

const title = "Meet Your AI Employee | Vocemi";
const description =
  "Vocemi builds AI employees that answer every call, qualify the caller, and book the job — 24/7. Talk to one right now, then book a free consultation.";

export const metadata: Metadata = {
  // Overrides the root template so the tab reads cleanly for a landing page.
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: `${siteConfig.url}/start`,
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/start`,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function StartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
