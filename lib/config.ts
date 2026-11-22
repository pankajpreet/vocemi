const retellPublicKey = process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY || "";
const retellVoiceAgentId =
  process.env.NEXT_PUBLIC_RETELL_VOICE_AGENT_ID || "";

const bookCallBaseUrl = process.env.NEXT_PUBLIC_BOOK_CALL_URL || "/contact";

/** Shown until the owner supplies the real demo line. */
export const DEMO_NUMBER_PLACEHOLDER = "[DEMO NUMBER]";
const demoNumber =
  process.env.NEXT_PUBLIC_DEMO_NUMBER?.trim() || DEMO_NUMBER_PLACEHOLDER;
const demoDigits = demoNumber.replace(/[^\d+]/g, "");
// Hide every "Call our AI" button rather than render a broken tel: link.
const demoCallAvailable =
  demoNumber !== DEMO_NUMBER_PLACEHOLDER && demoDigits.replace(/\D/g, "").length >= 10;

function envFlag(value: string | undefined, fallback: boolean) {
  if (value === undefined || value.trim() === "") return fallback;
  return value.trim().toLowerCase() === "true";
}

export type BookCallUtm = {
  source?: string;
  medium?: string;
  campaign?: string;
};

/**
 * Booking URL for one button. Cal.com links get UTMs so a completed booking
 * can be tied to the control that opened it. `placement` is the same string
 * already sent with `book_call_clicked` and is always `utm_content`.
 * Defaults are vocemi.com / website / book_call. A page may override
 * source, medium, and campaign. Other hosts, and the /contact fallback,
 * are returned unchanged.
 */
export function bookCallHref(placement: string, utm?: BookCallUtm): string {
  return withCalUtm(bookCallBaseUrl, placement, utm);
}

function withCalUtm(baseUrl: string, placement: string, utm?: BookCallUtm) {
  if (!/^https?:\/\//.test(baseUrl)) return baseUrl;

  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    return baseUrl;
  }

  const host = url.hostname.toLowerCase();
  if (host !== "cal.com" && !host.endsWith(".cal.com")) return baseUrl;

  url.searchParams.set("utm_source", utm?.source ?? "vocemi.com");
  url.searchParams.set("utm_medium", utm?.medium ?? "website");
  url.searchParams.set("utm_campaign", utm?.campaign ?? "book_call");
  url.searchParams.set("utm_content", placement);
  return url.toString();
}

const auditBookingBaseUrl = process.env.NEXT_PUBLIC_AUDIT_BOOKING_URL || "";

/**
 * "Book a free audit" / "Get a free missed-call audit". Falls back to the
 * general booking link until a dedicated audit scheduler is configured.
 */
export function auditBookingHref(placement: string): string {
  if (!auditBookingBaseUrl) return bookCallHref(placement, { campaign: "free_audit" });
  return withCalUtm(auditBookingBaseUrl, placement, { campaign: "free_audit" });
}

export const siteConfig = {
  name: "Vocemi",
  tagline: "AI Receptionist for Insurance, Med Spas, HVAC & Vet Clinics",
  description:
    "Vocemi sets up and runs an AI receptionist built for your industry. It answers the calls you miss, books appointments into your calendar, and tells callers it's an AI. Live in 7 days, free for the first 14.",
  // The live site redirects the bare domain to www, so canonicals, the
  // sitemap, and OG URLs must use www or they all point at a redirect.
  url: "https://www.vocemi.com",
  location: "Calgary, Alberta",
  // Structured-data location. City only: there is no storefront address to
  // publish. Where Vocemi works is `areaServed` in StructuredData.
  address: {
    locality: "Calgary",
    region: "AB",
    country: "CA",
  },
  founder: {
    name: "Pankajpreet Singh",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/pankajpreet-singh-76038113/",
    image: "/founder-pankajpreet-singh.png",
  },
  contact: {
    email: "business@vocemi.com",
    // Google Business Profile number. Display, tel, and schema forms differ
    // on purpose: visible NAP, a dialable href, and the schema telephone.
    phoneDisplay: "(437) 332-5220",
    phoneTel: "+14373325220",
    phoneSchema: "+1-437-332-5220",
    // Owner decision: do not add tel: or sms: links for (437) 332-5220 on /start.
    phone: "",
  },
  // Service-area line for visible NAP. No street address is published.
  serviceArea: "Calgary, Alberta, Canada",
  servingLine: "Based in Calgary · Serving Canada & the US",

  // --- New offer (Oct 2026 spec) ----------------------------------------
  // The "Call our AI" line. Every call button renders from these and hides
  // itself while the number is still the placeholder.
  demoNumber,
  demoNumberTel: demoDigits.startsWith("+") ? demoDigits : `+1${demoDigits.replace(/^1(?=\d{10}$)/, "")}`,
  demoCallAvailable,
  // Shown on the free-trial thank-you state. Button hides when empty.
  kickoffBookingUrl: process.env.NEXT_PUBLIC_KICKOFF_BOOKING_URL || "",
  auditBookingUrl: auditBookingHref,
  flags: {
    // Named broker reference on /results and the insurance page.
    showJagdeepReference: envFlag(process.env.NEXT_PUBLIC_SHOW_JAGDEEP_REFERENCE, true),
    // "Live dashboard" line on the Scale plan.
    showScaleDashboard: envFlag(process.env.NEXT_PUBLIC_SHOW_SCALE_DASHBOARD, true),
  },
  // Keep booking CTAs useful in preview deployments that do not have the
  // scheduler URL configured yet. Pass the button placement.
  bookCallUrl: bookCallHref,

  // --- /start landing page ---------------------------------------------
  // Retell AI powers the live voice demo. Both values are required before
  // the demo section renders, and the hero CTA adapts when it's absent.
  // The public key is designed for browser use, so it's safe in client code
  // -- but it is still account-scoped, so keep it in env rather than here.
  retellPublicKey,
  retellVoiceAgentId,
  voiceDemoAvailable: Boolean(retellPublicKey && retellVoiceAgentId),
  // reCAPTCHA v3 site key. Required whenever reCAPTCHA is switched on for the
  // agent in Retell -- v2 keys are not supported by their widget.
  retellRecaptchaKey: process.env.NEXT_PUBLIC_RETELL_RECAPTCHA_KEY || "",
  // White-label token from the voice provider. When set, the widget drops its
  // own attribution line. Optional.
  voiceWidgetWhiteLabel: process.env.NEXT_PUBLIC_VOICE_WIDGET_WHITE_LABEL || "",
  // Google Form for visitors who aren't ready to book. Link hides when empty.
  leadFormUrl: process.env.NEXT_PUBLIC_LEAD_FORM_URL || "",
  // Confirmed public profiles. sameAs on the Organization schema is this list.
  // googleBusiness is the Maps URL from the Google Business Profile.
  social: {
    linkedin: "https://www.linkedin.com/company/vocemi/",
    facebook: "https://www.facebook.com/profile.php?id=61587388533987",
    youtube: "https://www.youtube.com/@pankajpreet_singh",
    googleBusiness: "https://maps.app.goo.gl/1hpHh5E6bX7EFHHEA",
  },
  services: [
    {
      title: "Voice Bot Development",
      description:
        "Create intelligent conversational voice bots for customer support, lead qualification, and automated assistance.",
      icon: "🎤",
    },
    {
      title: "AI Receptionist",
      description:
        "24/7 virtual receptionist that answers calls, schedules appointments, routes callers, and handles inquiries automatically.",
      icon: "📞",
    },
    {
      title: "Appointment Management & Reminders",
      description:
        "Automated scheduling, confirmation calls, and intelligent reminders to reduce no-shows and streamline bookings.",
      icon: "📅",
    },
    {
      title: "Qualification and Lead Generation",
      description:
        "Intelligent voice systems that qualify leads, capture customer information, and route high-value prospects to your sales team.",
      icon: "🎯",
    },
    {
      title: "Voice Analytics & Insights",
      description:
        "Turn voice interactions into actionable data with sentiment analysis, transcription, and performance metrics.",
      icon: "📊",
    },
  ],
  benefits: [
    {
      title: "Increased Productivity",
      description:
        "Automate routine tasks and free your team to focus on high-value work.",
      icon: "⚡",
    },
    {
      title: "Better Customer Experience",
      description:
        "24/7 personalized interactions that improve satisfaction and engagement.",
      icon: "😊",
    },
    {
      title: "Always Available",
      description:
        "Round-the-clock support and automated workflows without downtime.",
      icon: "🌐",
    },
    {
      title: "Cost Reduction",
      description:
        "Minimize manual work and optimize resource allocation for better profitability.",
      icon: "💰",
    },
    {
      title: "Data-Driven Insights",
      description:
        "Leverage AI to analyze interactions and make smarter business decisions.",
      icon: "📈",
    },
    {
      title: "Scalable Growth",
      description:
        "Scale efficiently without proportional increases in workload or costs.",
      icon: "🚀",
    },
  ],
};

