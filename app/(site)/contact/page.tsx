"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookCallButton from "@/components/BookCallButton";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import { Mail, Calendar } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    const form = e.currentTarget;
    const website = new FormData(form).get("website");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(
          result.error || "We could not send your message. Please try again."
        );
      }

      trackEvent("contact_form_submitted", { page: "/contact" });
      setStatus("success");
      setStatusMessage(
        "Your message was delivered. We’ll reply as soon as we can."
      );
      setFormData({ name: "", email: "", company: "", message: "" });
      form.reset();
    } catch (error) {
      trackEvent("contact_form_failed", { page: "/contact" });
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : `The form is temporarily unavailable. Please email ${siteConfig.contact.email}.`
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Have questions? We&apos;d love to hear from you. Send us a message and
            we&apos;ll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary-secondary/50 backdrop-blur-sm border border-primary-accent/20 p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Send us a message</h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                aria-describedby="contact-form-status"
              >
                <div
                  aria-hidden="true"
                  hidden
                  className="absolute -left-[10000px] h-px w-px overflow-hidden"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-primary-dark/50 border border-primary-accent/30 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-primary-dark/50 border border-primary-accent/30 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-dark/50 border border-primary-accent/30 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-primary-dark/50 border border-primary-accent/30 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-gradient-to-r from-primary-accent to-primary-accent-alt text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-accent/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-wait disabled:hover:translate-y-0"
                >
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </button>
                <div
                  id="contact-form-status"
                  role="status"
                  aria-live="polite"
                  className={`min-h-6 text-sm leading-relaxed ${
                    status === "success"
                      ? "text-green-300"
                      : status === "error"
                        ? "text-red-300"
                        : "text-transparent"
                  }`}
                >
                  {statusMessage || "\u00A0"}
                </div>
              </form>
            </motion.div>

            {/* Contact Info & Booking */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <div className="bg-primary-secondary/50 backdrop-blur-sm border border-primary-accent/20 p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-white">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="text-primary-accent mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <TrackedLink
                        href={`mailto:${siteConfig.contact.email}`}
                        event="email_clicked"
                        properties={{ placement: "contact_page" }}
                        className="text-primary-accent hover:text-primary-accent-cyan transition-colors"
                      >
                        {siteConfig.contact.email}
                      </TrackedLink>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book a Call */}
              <div className="bg-primary-secondary/50 backdrop-blur-sm border border-primary-accent/20 p-8 rounded-2xl shadow-lg">
                <Calendar className="mb-4 text-primary-accent" size={32} />
                <h2 className="text-3xl font-bold mb-4 text-white">Book a Call</h2>
                <p className="mb-6 text-gray-300">
                  Schedule a free consultation to discuss how Voice AI can
                  transform your business.
                </p>
                <BookCallButton
                  variant="primary"
                  className="w-full"
                  placement="contact_page"
                >
                  Book a free call
                </BookCallButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

