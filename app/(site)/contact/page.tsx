"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookCallButton from "@/components/BookCallButton";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import {
  contactLimits,
  validateContactForm,
  type ContactField,
  type ContactFieldErrors,
  type ContactFormData,
} from "@/lib/contactForm";
import { Mail, Calendar } from "lucide-react";

const unavailableMessage = `We could not send your message. Please email ${siteConfig.contact.email}.`;

const emptyForm: ContactFormData = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState<ContactFormData>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setFieldErrors({});
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
      // A platform error page (e.g. a 502 from the host) is not JSON, so
      // fall back to an empty result instead of surfacing a parse error.
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
        fieldErrors?: ContactFieldErrors;
      };

      if (!response.ok) {
        trackEvent("contact_form_failed", { page: "/contact" });
        setFieldErrors(result.fieldErrors || {});
        setStatus("error");
        setStatusMessage(result.error || unavailableMessage);
        return;
      }

      trackEvent("contact_form_submitted", { page: "/contact" });
      setStatus("success");
      setStatusMessage(
        "Your message was delivered. We’ll reply as soon as we can."
      );
      setFieldErrors({});
      setFormData(emptyForm);
      form.reset();
    } catch {
      // Network failure: the browser's own error text isn't useful to visitors.
      trackEvent("contact_form_failed", { page: "/contact" });
      setStatus("error");
      setStatusMessage(unavailableMessage);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name as ContactField;

    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }

    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setFormData((current) => ({
      ...current,
      [field]: e.target.value,
    }));
  };

  const inputClass = (field: ContactField) =>
    `w-full px-4 py-3 bg-primary-dark/50 border text-white placeholder-gray-400 rounded-lg focus:ring-2 transition-all ${
      fieldErrors[field]
        ? "border-red-400 focus:ring-red-400 focus:border-red-400"
        : "border-primary-accent/30 focus:ring-primary-accent focus:border-primary-accent"
    }`;

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
              <h2 className="text-3xl font-bold mb-2 text-white">
                Send us a message
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Fields marked with * are required.
              </p>
              <form
                onSubmit={handleSubmit}
                noValidate
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
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={contactLimits.name.min}
                    maxLength={contactLimits.name.max}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby="name-help"
                    className={inputClass("name")}
                    placeholder="Your name"
                  />
                  <p
                    id="name-help"
                    className={`text-xs mt-2 ${
                      fieldErrors.name ? "text-red-300" : "text-gray-400"
                    }`}
                  >
                    {fieldErrors.name || "Enter at least 2 characters."}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={contactLimits.email.max}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby="email-help"
                    className={inputClass("email")}
                    placeholder="your@email.com"
                  />
                  <p
                    id="email-help"
                    className={`text-xs mt-2 ${
                      fieldErrors.email ? "text-red-300" : "text-gray-400"
                    }`}
                  >
                    {fieldErrors.email ||
                      "We’ll use this address only to reply to your enquiry."}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Company <span className="font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    maxLength={contactLimits.company.max}
                    aria-invalid={Boolean(fieldErrors.company)}
                    aria-describedby={
                      fieldErrors.company ? "company-help" : undefined
                    }
                    className={inputClass("company")}
                    placeholder="Your company"
                  />
                  {fieldErrors.company && (
                    <p id="company-help" className="text-xs text-red-300 mt-2">
                      {fieldErrors.company}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={contactLimits.message.min}
                    maxLength={contactLimits.message.max}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby="message-help"
                    rows={6}
                    className={`${inputClass("message")} resize-none`}
                    placeholder="Tell us what you would like help with..."
                  />
                  <div className="flex items-start justify-between gap-4 mt-2">
                    <p
                      id="message-help"
                      className={`text-xs m-0 ${
                        fieldErrors.message ? "text-red-300" : "text-gray-400"
                      }`}
                    >
                      {fieldErrors.message ||
                        "Please enter at least 10 characters."}
                    </p>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {formData.message.length.toLocaleString()}/
                      {contactLimits.message.max.toLocaleString()}
                    </span>
                  </div>
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

