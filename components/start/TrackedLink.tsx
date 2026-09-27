"use client";

import {
  trackEvent,
  type AnalyticsEvent,
  type AnalyticsProperties,
} from "@/lib/analytics";

interface TrackedLinkProps
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "onClick" | "target" | "rel"
  > {
  href: string;
  event: AnalyticsEvent;
  properties?: AnalyticsProperties;
  external?: boolean;
}

/**
 * An anchor that reports the click before the browser leaves.
 *
 * Every booking CTA on /start points at our scheduling page, so the navigation
 * itself is invisible to us — without this the conversion can't be measured.
 */
export default function TrackedLink({
  href,
  event,
  properties,
  external = false,
  ...anchorProps
}: TrackedLinkProps) {
  return (
    <a
      {...anchorProps}
      href={href}
      onClick={() =>
        trackEvent(event, {
          page: window.location.pathname,
          ...properties,
        })
      }
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    />
  );
}
