import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

const title = "Meet Your AI Employee | Vocemi";
const description =
  "Vocemi sets up and runs an AI receptionist built for your industry. It answers the calls you miss, books appointments into your calendar, and tells callers it's an AI. Live in 7 days.";

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
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: "en_CA",
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
