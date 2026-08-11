"use client";

import { trackEvent, type StartEvent } from "@/lib/analytics";

interface TrackedLinkProps {
  href: string;
  event: StartEvent;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * An anchor that reports the click before the browser leaves.
 *
 * Every booking CTA on /start points at Google Calendar, so the navigation
 * itself is invisible to us — without this the conversion can't be measured.
 */
export default function TrackedLink({
  href,
  event,
  external = false,
  className,
  children,
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      onClick={() => trackEvent(event)}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
