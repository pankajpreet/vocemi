"use client";

import TrackedLink from "@/components/start/TrackedLink";
import { demoTelHref, isDemoNumberLive, siteConfig } from "@/lib/config";

export default function CallDemoLink({
  placement,
  className,
  label = "short",
}: {
  placement: string;
  className?: string;
  label?: "now" | "short" | "hear";
}) {
  if (!isDemoNumberLive(siteConfig.demoNumber)) return null;

  const number = siteConfig.demoNumber;
  const text =
    label === "now"
      ? `Call our AI now: ${number}`
      : label === "hear"
        ? `Call our AI: ${number}`
        : `Call our AI: ${number}`;

  return (
    <TrackedLink
      href={demoTelHref(number)}
      event="call_demo_click"
      properties={{ placement }}
      className={className}
    >
      {text}
    </TrackedLink>
  );
}
