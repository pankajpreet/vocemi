import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

const defaultImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Vocemi - Never miss another call, lead, or booking",
};

interface PageMetadataOptions {
  /** The <title>. Passed through the root "%s | Vocemi" template unless `absoluteTitle` is set. */
  title: string;
  description: string;
  /** Path from the site root, e.g. "/faq". Used for the canonical and og:url. */
  path: string;
  absoluteTitle?: boolean;
  /** Shorter or friendlier copy for link previews; defaults to the page's own. */
  socialTitle?: string;
  socialDescription?: string;
  image?: { url: string; width: number; height: number; alt: string };
}

// Next.js replaces `openGraph` and `twitter` wholesale when a page sets them
// rather than merging with the root layout. A page that set only an og:title
// lost the preview image, and a page that set no `twitter` kept the root's
// card copy. Building both from one place keeps every page's preview whole.
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  socialTitle,
  socialDescription,
  image = defaultImage,
}: PageMetadataOptions): Metadata {
  const previewTitle =
    socialTitle ?? (absoluteTitle ? title : `${title} | ${siteConfig.name}`);
  const previewDescription = socialDescription ?? description;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: previewTitle,
      description: previewDescription,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_CA",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: previewTitle,
      description: previewDescription,
      images: [image.url],
    },
  };
}
