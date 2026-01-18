"use client";

import { motion } from "framer-motion";
import FAQAccordion from "@/components/FAQAccordion";
import BookCallButton from "@/components/BookCallButton";
import { siteConfig } from "@/lib/config";

export default function FAQPage() {
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
            Quick answers to common Voice AI questions
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={siteConfig.faqs} />
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
              We're here to help! Get in touch and we'll answer any questions you
              may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookCallButton variant="primary">
                Book a Call
              </BookCallButton>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base bg-transparent border-2 border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-white transition-all duration-300"
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

