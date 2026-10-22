import { unstable_noStore as noStore } from "next/cache";
import { bookCallHref, withBookingUtms, type BookCallUtm } from "@/lib/config";

function bookingUrlFromEnv(
  envValue: string | undefined,
  placement: string,
  utm?: BookCallUtm
) {
  // Read on each request. A static build would otherwise freeze the fallback
  // before the owner sets the URL.
  noStore();
  const raw = envValue?.trim();
  if (raw) return withBookingUtms(raw, placement, utm);
  return bookCallHref(placement, utm);
}

/** 15-minute kickoff call. Falls back to the site booking link when unset. */
export function kickoffBookingUrl(placement: string, utm?: BookCallUtm) {
  return bookingUrlFromEnv(process.env.KICKOFF_BOOKING_URL, placement, utm);
}

/** Free missed-call audit. Falls back to the site booking link when unset. */
export function auditBookingUrl(placement: string, utm?: BookCallUtm) {
  return bookingUrlFromEnv(process.env.AUDIT_BOOKING_URL, placement, utm);
}
