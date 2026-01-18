export const siteConfig = {
  name: "Vocemi",
  tagline: "Empowering Businesses through Voice AI",
  description:
    "Transform your customer interactions with intelligent voice-powered solutions that understand, respond, and elevate your business.",
  url: "https://vocemi.com",
  contact: {
    email: "business@vocemi.com",
  },
  bookCallUrl: process.env.NEXT_PUBLIC_BOOK_CALL_URL || "#",
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
  faqs: [
    {
      question: "What is Voice AI and how can it help my business?",
      answer:
        "Voice AI uses natural language processing and speech recognition to enable computers to understand and respond to human speech. It can automate customer service, provide 24/7 support, handle routine inquiries, and improve operational efficiency.",
    },
    {
      question: "How long does it take to implement a voice AI solution?",
      answer:
        "Implementation time varies based on complexity. Simple voice bots typically take 2-4 weeks, while comprehensive custom solutions may take 6-12 weeks. We'll provide a detailed timeline during the discovery phase.",
    },
    {
      question: "Do I need technical expertise to use Voice AI solutions?",
      answer:
        "No technical expertise required. We handle all development, integration, and provide user-friendly dashboards for monitoring and management. Training and documentation are included.",
    },
    {
      question: "How do you ensure data privacy and security?",
      answer:
        "We implement enterprise-grade security with encryption, anonymization, and compliance with GDPR, CCPA, and other regulations. You retain full ownership of your data.",
    },
    {
      question: "What industries can benefit from Voice AI?",
      answer:
        "Voice AI is valuable across industries including healthcare, retail, finance, hospitality, real estate, and customer service. Any business with customer interactions can benefit.",
    },
  ],
  testimonials: [
    {
      name: "James Carter",
      role: "CEO",
      company: "TechFlow Solutions",
      quote:
        "Voice AI automation transformed our operations by eliminating repetitive tasks and improving efficiency. Scaling our workflow has never been easier!",
    },
    {
      name: "Sophia Martinez",
      role: "Operations Manager",
      company: "NexaCorp",
      quote:
        "With Voice AI, we cut manual work and improved accuracy. Our team now focuses on high-impact tasks while automation handles the rest!",
    },
    {
      name: "David Reynolds",
      role: "Head of Sales",
      company: "GrowthPeak",
      quote:
        "AI-driven insights doubled our sales efficiency. We now engage leads at the right time with smarter, data-backed decisions!",
    },
  ],
};

