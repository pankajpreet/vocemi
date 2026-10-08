const retellPublicKey = process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY || "";
const retellVoiceAgentId =
  process.env.NEXT_PUBLIC_RETELL_VOICE_AGENT_ID || "";

const bookCallBaseUrl = process.env.NEXT_PUBLIC_BOOK_CALL_URL || "/contact";

/**
 * Booking URL for one button. Cal.com links get UTMs so a completed booking
 * can be tied to the control that opened it. `placement` is the same string
 * already sent with `book_call_clicked`. Other hosts, and the /contact
 * fallback, are returned unchanged.
 */
export function bookCallHref(placement: string): string {
  if (!/^https?:\/\//.test(bookCallBaseUrl)) return bookCallBaseUrl;

  let url: URL;
  try {
    url = new URL(bookCallBaseUrl);
  } catch {
    return bookCallBaseUrl;
  }

  const host = url.hostname.toLowerCase();
  if (host !== "cal.com" && !host.endsWith(".cal.com")) return bookCallBaseUrl;

  url.searchParams.set("utm_source", "vocemi.com");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", "book_call");
  url.searchParams.set("utm_content", placement);
  return url.toString();
}

export const siteConfig = {
  name: "Vocemi",
  tagline: "Voice AI Receptionist & Business Automation",
  description:
    "Vocemi builds voice AI employees that answer calls, qualify enquiries, book appointments, and report what needs your attention.",
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
    // TODO(owner): confirm whether (437) 332-5220 should also turn on the
    // tap-to-call and tap-to-text buttons on /start. SMS was not confirmed,
    // so this stays empty unless NEXT_PUBLIC_PHONE is set.
    phone: process.env.NEXT_PUBLIC_PHONE || "",
  },
  // Service-area line for visible NAP. No street address is published.
  serviceArea: "Calgary, Alberta, Canada",
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

