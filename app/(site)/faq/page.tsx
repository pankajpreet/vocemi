"use client";

import { motion } from "framer-motion";
import FAQAccordion from "@/components/FAQAccordion";
import { CallDemoButton, TrialButton } from "@/components/offer/CtaButtons";
import { pageFaqs } from "@/lib/faqContent";

export default function FAQPage() {
  const faqs = pageFaqs;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Pricing, the free trial, and what the AI will and won&apos;t do
          </motion.p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <TrialButton placement="faq_hero" label="Start my free trial" variant="dark" className="py-4" />
            <CallDemoButton placement="faq_hero" variant="ghostDark" className="py-4" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={faqs} />
          <p className="mt-8 text-[15px] leading-relaxed text-gray-300 m-0">
            <a
              className="text-primary-accent-on-dark underline hover:text-primary-accent-on-dark-hover focus:text-primary-accent-on-dark-hover focus-visible:text-primary-accent-on-dark-hover transition-colors"
              href="/services/ai-receptionist"
            >
              AI receptionist
            </a>
            {" · "}
            <a
              className="text-primary-accent-on-dark underline hover:text-primary-accent-on-dark-hover focus:text-primary-accent-on-dark-hover focus-visible:text-primary-accent-on-dark-hover transition-colors"
              href="/services/lead-reactivation"
            >
              Lead reactivation and calling rules
            </a>
            {" · "}
            <a
              className="text-primary-accent-on-dark underline hover:text-primary-accent-on-dark-hover focus:text-primary-accent-on-dark-hover focus-visible:text-primary-accent-on-dark-hover transition-colors"
              href="/pricing"
            >
              Pricing
            </a>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Still have questions?</h2>
            <p className="text-lg text-gray-300 mb-8">
              We&apos;re here to help! Get in touch and we&apos;ll answer any questions you
              may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TrialButton placement="faq_final_cta" label="Start my free trial" variant="dark" />
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base bg-transparent border-2 border-primary-accent-on-dark text-primary-accent-on-dark hover:border-primary-accent hover:bg-primary-accent hover:text-white transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

