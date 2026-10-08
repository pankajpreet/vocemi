"use client";

import { motion } from "framer-motion";
import FAQAccordion from "@/components/FAQAccordion";
import BookCallButton from "@/components/BookCallButton";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";
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
            Quick answers to common Voice AI questions
          </motion.p>
          <TrackedLink
            href={siteConfig.bookCallUrl("faq_hero")}
            event="book_call_clicked"
            properties={{ placement: "faq_hero" }}
            external
            className="inline-flex items-center justify-center mt-8 bg-brand text-white px-[26px] py-4 rounded-[9px] text-[15.5px] font-semibold text-center hover:bg-brand-dark transition-colors"
          >
            Book a free call
          </TrackedLink>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={faqs} />
          <div className="mt-8 flex flex-col gap-3 text-[15px] leading-relaxed">
            <p className="text-gray-300 m-0">
              <a className="text-primary-accent underline" href="/services/ai-receptionist">
                AI receptionist
              </a>
              {" · "}
              <a className="text-primary-accent underline" href="/services/lead-reactivation">
                Lead reactivation and calling rules
              </a>
            </p>
            <p className="m-0 border border-dashed border-white/40 rounded-md px-4 py-3 text-white">
              <span className="font-semibold">TODO (Pankajpreet):</span> confirm
              which calendars, CRMs, or practice systems connect. Pages say that
              is confirmed during scoping and name no products.
            </p>
            <p className="m-0 border border-dashed border-white/40 rounded-md px-4 py-3 text-white">
              <span className="font-semibold">TODO (Pankajpreet):</span> confirm
              whether the $250 audit and the other published prices are CAD or
              USD.
            </p>
            <p className="m-0 border border-dashed border-white/40 rounded-md px-4 py-3 text-white">
              <span className="font-semibold">TODO (Pankajpreet):</span> confirm
              the call-recording notice callers should hear. The insurance guide
              says to tell callers if calls are recorded, and no script is
              published.
            </p>
            <p className="m-0 border border-dashed border-white/40 rounded-md px-4 py-3 text-white">
              <span className="font-semibold">TODO (Pankajpreet):</span> confirm
              which languages are supported in production. Do not name Punjabi,
              Tagalog, Mandarin, or any other language as a Vocemi offering until
              then.
            </p>
          </div>
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
              <BookCallButton variant="primary">
                Book a free call
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

