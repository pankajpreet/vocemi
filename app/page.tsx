"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Testimonials from "@/components/Testimonials";
import BookCallButton from "@/components/BookCallButton";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Services Overview */}
      <section id="services" className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive Voice AI solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteConfig.services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Why Choose Vocemi
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The key benefits of Voice AI for your business growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteConfig.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-primary-secondary/50 backdrop-blur-sm border border-primary-accent/20 p-8 rounded-2xl text-center shadow-md hover:shadow-xl hover:border-primary-accent/50 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials testimonials={siteConfig.testimonials} />

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Quick answers to common Voice AI questions
            </p>
          </motion.div>
          <div className="space-y-4">
            {siteConfig.faqs.slice(0, 5).map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-primary-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-primary-accent/20"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary-secondary/50 backdrop-blur-sm p-8 rounded-2xl border border-primary-accent/20"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 mb-1">Email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-primary-accent hover:text-primary-accent-cyan transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary-secondary/50 backdrop-blur-sm border border-primary-accent/20 p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Book a Call</h3>
              <p className="text-gray-300 mb-6">
                Schedule a free consultation to discuss how Voice AI can transform your business.
              </p>
              <BookCallButton
                variant="primary"
                className="w-full"
              >
                Schedule Now
              </BookCallButton>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
}

