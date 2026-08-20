import { track } from "@vercel/analytics";

/**
 * Events fired from the /start landing page.
 *
 * The list is deliberately short. /start exists to answer one question —
 * are the business cards worth printing more of? — and the headline number
 * is book_call_clicked per 100 pageviews.
 *
 * book_call_clicked matters most: every booking CTA is an outbound link to our
 * scheduling page, so without an explicit click event the conversion is
 * invisible to us.
 */
export type StartEvent =
  | "voice_demo_started"
  | "book_call_clicked"
  | "tap_to_call"
  | "tap_to_text"
  | "lead_form_opened";

export function trackEvent(
  event: StartEvent,
  properties?: Record<string, string | number | boolean | null>
) {
  track(event, properties);
}
