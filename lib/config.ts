const retellPublicKey = process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY || "";
const retellVoiceAgentId =
  process.env.NEXT_PUBLIC_RETELL_VOICE_AGENT_ID || "";

export const siteConfig = {
  name: "Vocemi",
  tagline: "Empowering Businesses through Voice AI",
  description:
    "Transform your customer interactions with intelligent voice-powered solutions that understand, respond, and elevate your business.",
  // The live site redirects the bare domain to www, so canonicals, the
  // sitemap, and OG URLs must use www or they all point at a redirect.
  url: "https://www.vocemi.com",
  location: "Calgary, Alberta",
  founder: {
    name: "Pankajpreet Singh",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/pankajpreet-singh-76038113/",
    image: "/founder-pankajpreet-singh.png",
  },
  contact: {
    email: "business@vocemi.com",
    // Leave unset until there is a number we're happy to publish. The
    // tap-to-call / tap-to-text block on /start hides itself when empty.
    phone: process.env.NEXT_PUBLIC_PHONE || "",
  },
  // Keep booking CTAs useful in preview deployments that do not have the
  // scheduler URL configured yet.
  bookCallUrl: process.env.NEXT_PUBLIC_BOOK_CALL_URL || "/contact",

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
  // Social media links (add your actual links)
  social: {
    twitter: "", // e.g., "https://twitter.com/vocemi"
    linkedin: "", // e.g., "https://linkedin.com/company/vocemi"
    facebook: "", // e.g., "https://facebook.com/vocemi"
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

