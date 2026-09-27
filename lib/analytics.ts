import { track } from "@vercel/analytics";

export type AnalyticsProperties = Record<
  string,
  string | number | boolean | null
>;

/**
 * A short, stable funnel shared by the marketing site and /start.
 *
 * Clicks and starts show intent. Completed bookings and accepted contact
 * messages are the actual conversions; only emit those after the receiving
 * system confirms success.
 */
export type AnalyticsEvent =
  | "demo_cta_clicked"
  | "voice_demo_started"
  | "voice_demo_ready"
  | "book_call_clicked"
  | "booking_completed"
  | "contact_form_submitted"
  | "contact_form_failed"
  | "email_clicked"
  | "tap_to_call"
  | "tap_to_text"
  | "lead_form_opened";

export function trackEvent(
  event: AnalyticsEvent,
  properties?: AnalyticsProperties
) {
  track(event, properties);
}
