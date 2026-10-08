"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import { ServiceStructuredData } from "@/components/StructuredData";
import BookCallButton from "@/components/BookCallButton";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";
import { serviceGuides } from "@/lib/serviceContent";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function ServicesPage() {
  const serviceFeatures = [
    {
      title: "Voice Bot Development",
      features: [
        "Natural language understanding and processing",
        "Multi-turn conversation handling",
        "Integration with existing systems",
        "Custom voice persona development",
        "Multi-language support",
        "24/7 automated customer support",
      ],
    },
    {
      title: "AI Receptionist",
      features: [
        "24/7 automated call answering",
        "Intelligent call routing to departments",
        "Appointment scheduling and booking",
        "Voicemail management and transcription",
        "Caller information collection",
        "Custom greeting and brand voice",
      ],
    },
    {
      title: "Appointment Management & Reminders",
      features: [
        "Automated appointment scheduling",
        "Smart reminder calls and confirmations",
        "Rescheduling and cancellation handling",
        "Calendar integration and sync",
        "Reduced no-show rates",
        "Multi-channel notifications",
      ],
    },
    {
      title: "Qualification and Lead Generation",
      features: [
        "Automated lead qualification questions",
        "Customer information capture",
        "Lead scoring and prioritization",
        "Intelligent routing to sales teams",
        "Integration with CRM systems",
        "Real-time lead alerts and notifications",
      ],
    },
    {
      title: "Voice Analytics & Insights",
      features: [
        "Real-time sentiment analysis",
        "Call transcription and recording",
        "Performance metrics and KPIs",
        "Customer satisfaction tracking",
        "Automated reporting dashboards",
        "Data-driven decision insights",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <ServiceStructuredData />
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            AI receptionist, voice AI and lead reactivation services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Comprehensive Voice AI solutions designed to transform your business
            operations and customer interactions
          </motion.p>
          <TrackedLink
            href={siteConfig.bookCallUrl("services_hero")}
            event="book_call_clicked"
            properties={{ placement: "services_hero" }}
            external
            className="inline-flex items-center justify-center mt-8 bg-brand text-white px-[26px] py-4 rounded-[9px] text-[15.5px] font-semibold text-center hover:bg-brand-dark transition-colors"
          >
            Book a free call
          </TrackedLink>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">What we offer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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

      {/* Indexable service guides */}
      <section className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Explore common Voice AI workflows
            </h2>
            <p className="text-xl text-gray-300">
              See what each workflow handles, where people stay in control, and
              how a launch is scoped.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {serviceGuides.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-primary-secondary/50 backdrop-blur-sm border border-primary-accent/20 p-7 rounded-2xl hover:border-primary-accent/60 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-5">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 font-semibold text-primary-accent group-hover:text-white transition-colors">
                  Read the service guide
                  <ArrowRight size={17} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">What&apos;s Included</h2>
            <p className="text-xl text-gray-300">
              Comprehensive features for each service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceFeatures.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-primary-secondary/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-primary-accent/20"
              >
                <h3 className="text-2xl font-bold mb-6 text-white">
                  {service.title}
                </h3>
                <ul className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="text-primary-accent mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration scoping */}
      <section className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Integration scope is confirmed before launch
            </h2>
            <p className="text-xl text-gray-300">
              We document what the workflow needs to read, update, and hand to
              a person before promising a connection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Information it reads",
                body: "The approved service details, questions, availability, and rules the agent needs.",
              },
              {
                title: "Information it updates",
                body: "The caller details and outcomes your chosen workflow requires.",
              },
              {
                title: "Where people take over",
                body: "The exceptions, urgent requests, and decisions that must reach your team.",
              },
            ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-primary-secondary/50 backdrop-blur-sm border border-primary-accent/20 p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed m-0">
                    {item.body}
                  </p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-accent to-primary-accent-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Let&apos;s discuss how our Voice AI services can transform your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookCallButton
                variant="secondary"
                className="bg-white text-primary-accent hover:bg-gray-100 border-0"
              >
                Book a free call
              </BookCallButton>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-accent transition-all duration-300"
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

