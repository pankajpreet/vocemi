"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/config";
import { trialDays } from "@/lib/plans";
import {
  consentText,
  missedCallOptions,
  trialIndustries,
  validateTrialForm,
  type TrialField,
  type TrialFieldErrors,
  type TrialFormData,
} from "@/lib/trialForm";
import TrackedLink from "@/components/start/TrackedLink";
import { buttonClass } from "@/components/offer/CtaButtons";

const emptyForm: TrialFormData = {
  name: "",
  business: "",
  website: "",
  industry: "",
  mobile: "",
  email: "",
  missedCalls: "",
  consent: false,
};

const fieldOrder: TrialField[] = [
  "name",
  "business",
  "website",
  "industry",
  "mobile",
  "email",
  "missedCalls",
  "consent",
];

const inputClass = (invalid: boolean) =>
  `w-full bg-white border rounded-[10px] px-4 py-3 text-[15.5px] text-ink placeholder:text-ink/40 outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand focus:shadow-[0_0_0_4px_rgba(59,84,244,0.14)] ${
    invalid ? "border-[#D92D20]" : "border-ink/15"
  }`;

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-[14px] font-semibold text-ink mb-1.5">
      {children}
      {optional && <span className="font-normal text-ink/65"> (optional)</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-[13px] text-[#B42318] m-0 mt-1.5"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function readUtm(): Record<string, string> {
  const utm: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
      if (key.startsWith("utm_")) utm[key] = value;
    });
  } catch {
    // ignore
  }
  return utm;
}

function sourcePage(): string {
  try {
    if (document.referrer) {
      const ref = new URL(document.referrer);
      if (ref.origin === window.location.origin) return ref.pathname + ref.hash;
      return document.referrer;
    }
  } catch {
    // ignore
  }
  return window.location.pathname;
}

export default function TrialForm({ onIndustryChange }: { onIndustryChange?: (industry: string) => void }) {
  const [form, setForm] = useState<TrialFormData>(emptyForm);
  const [errors, setErrors] = useState<TrialFieldErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedDays, setSubmittedDays] = useState(14);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // Industry pages link here with ?industry=… so the choice is pre-filled.
  useEffect(() => {
    try {
      const preset = new URLSearchParams(window.location.search).get("industry");
      if (preset && trialIndustries.some((o) => o.value === preset)) {
        setForm((f) => ({ ...f, industry: preset }));
        onIndustryChange?.(preset);
      }
    } catch {
      // ignore
    }
  }, [onIndustryChange]);

  useEffect(() => {
    if (status === "done") doneRef.current?.focus();
  }, [status]);

  const update = <K extends TrialField>(key: K, value: TrialFormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (key === "industry") onIndustryChange?.(value as string);
  };

  const describedBy = (key: TrialField) => (errors[key] ? `trial-${key}-error` : undefined);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    const found = validateTrialForm(form);
    setErrors(found);
    const first = fieldOrder.find((key) => found[key]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/free-trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          company_url: honeypot,
          source_page: sourcePage(),
          utm: readUtm(),
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        fieldErrors?: TrialFieldErrors;
        trialDays?: number;
      };
      if (!response.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setServerError(data.error || `Something went wrong. Please email ${siteConfig.contact.email}.`);
        setStatus("error");
        trackEvent("trial_signup_failed", { industry: form.industry, status: response.status });
        return;
      }
      setSubmittedName(form.name.trim().split(/\s+/)[0] || form.name.trim());
      setSubmittedDays(data.trialDays ?? trialDays(form.industry));
      setStatus("done");
      trackEvent("trial_signup", { industry: form.industry });
    } catch {
      setServerError(`We could not reach the server. Please email ${siteConfig.contact.email}.`);
      setStatus("error");
      trackEvent("trial_signup_failed", { industry: form.industry, status: 0 });
    }
  }

  return (
    <div className="bg-white border border-ink/10 rounded-[22px] p-6 md:p-9 shadow-[0_30px_60px_-30px_rgba(22,24,28,0.25)]">
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.div
            key="done"
            ref={doneRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-6 outline-none"
            role="status"
          >
            <svg viewBox="0 0 80 80" className="w-20 h-20 mx-auto mb-6" aria-hidden>
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                fill="#EEF0FE"
                stroke="#3B54F4"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.path
                d="M25 41l10 10 20-22"
                fill="none"
                stroke="#3B54F4"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
              />
            </svg>
            <h2 className="font-display text-[26px] md:text-[30px] font-extrabold tracking-[-0.02em] text-ink m-0 mb-3">
              Thanks, {submittedName}. Book your 15-minute kickoff call so we can
              set up your AI.
            </h2>
            <p className="text-[15.5px] leading-[1.65] text-ink/65 m-0 mb-7 max-w-[460px] mx-auto">
              Your {submittedDays}-day free trial starts when your AI goes live. We&apos;ve
              sent the details to your email too.
            </p>
            {siteConfig.kickoffBookingUrl ? (
              <TrackedLink
                href={siteConfig.kickoffBookingUrl}
                event="book_call_clicked"
                properties={{ placement: "free_trial_kickoff" }}
                external
                className={buttonClass("primary", "lg")}
              >
                <CalendarCheck size={18} aria-hidden />
                Book my kickoff call
              </TrackedLink>
            ) : (
              <p className="text-[14.5px] text-ink/65 m-0">
                We&apos;ll text you a link to book your kickoff call shortly.
              </p>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid sm:grid-cols-2 gap-x-5 gap-y-5"
          >
            <div>
              <Label htmlFor="trial-name">Name</Label>
              <input
                id="trial-name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={describedBy("name")}
                className={inputClass(Boolean(errors.name))}
              />
              <FieldError id="trial-name-error" message={errors.name} />
            </div>
            <div>
              <Label htmlFor="trial-business">Business name</Label>
              <input
                id="trial-business"
                name="business"
                autoComplete="organization"
                value={form.business}
                onChange={(e) => update("business", e.target.value)}
                aria-invalid={Boolean(errors.business)}
                aria-describedby={describedBy("business")}
                className={inputClass(Boolean(errors.business))}
              />
              <FieldError id="trial-business-error" message={errors.business} />
            </div>
            <div>
              <Label htmlFor="trial-website" optional>
                Website
              </Label>
              <input
                id="trial-website"
                name="website"
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder="example.com"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                aria-invalid={Boolean(errors.website)}
                aria-describedby={describedBy("website")}
                className={inputClass(Boolean(errors.website))}
              />
              <FieldError id="trial-website-error" message={errors.website} />
            </div>
            <div>
              <Label htmlFor="trial-industry">Industry</Label>
              <select
                id="trial-industry"
                name="industry"
                value={form.industry}
                onChange={(e) => update("industry", e.target.value)}
                aria-invalid={Boolean(errors.industry)}
                aria-describedby={describedBy("industry")}
                className={`${inputClass(Boolean(errors.industry))} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5l5 5 5-5' stroke='%2316181C' stroke-opacity='.55' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_16px_center] pr-10`}
              >
                <option value="" disabled>
                  Choose one
                </option>
                {trialIndustries.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FieldError id="trial-industry-error" message={errors.industry} />
            </div>
            <div>
              <Label htmlFor="trial-mobile">Mobile number</Label>
              <input
                id="trial-mobile"
                name="mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="(403) 555-0123"
                value={form.mobile}
                onChange={(e) => update("mobile", e.target.value)}
                aria-invalid={Boolean(errors.mobile)}
                aria-describedby={describedBy("mobile")}
                className={inputClass(Boolean(errors.mobile))}
              />
              <FieldError id="trial-mobile-error" message={errors.mobile} />
            </div>
            <div>
              <Label htmlFor="trial-email">Email</Label>
              <input
                id="trial-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy("email")}
                className={inputClass(Boolean(errors.email))}
              />
              <FieldError id="trial-email-error" message={errors.email} />
            </div>

            <fieldset className="sm:col-span-2 border-0 p-0 m-0">
              <legend className="block text-[14px] font-semibold text-ink mb-2">
                About how many calls a day do you miss?
              </legend>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {missedCallOptions.map((option) => {
                  const checked = form.missedCalls === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`relative cursor-pointer rounded-[10px] border px-3 py-3 text-center text-[14.5px] font-semibold transition-colors has-[:focus-visible]:shadow-[0_0_0_4px_rgba(59,84,244,0.18)] ${
                        checked
                          ? "border-brand bg-brand-tint text-brand"
                          : errors.missedCalls
                            ? "border-[#D92D20] text-ink/75"
                            : "border-ink/15 text-ink/75 hover:border-ink/35"
                      }`}
                    >
                      <input
                        type="radio"
                        name="missedCalls"
                        value={option.value}
                        checked={checked}
                        onChange={() => update("missedCalls", option.value)}
                        className="sr-only"
                        aria-describedby={describedBy("missedCalls")}
                      />
                      {checked && (
                        <motion.span
                          layoutId="missed-calls-pill"
                          className="absolute inset-0 rounded-[9px] ring-2 ring-brand/30"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative">{option.label}</span>
                    </label>
                  );
                })}
              </div>
              <FieldError id="trial-missedCalls-error" message={errors.missedCalls} />
            </fieldset>

            <div className="sm:col-span-2">
              <label className="flex gap-3 items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={describedBy("consent")}
                  className="mt-1 w-[18px] h-[18px] accent-brand flex-shrink-0"
                />
                <span className="text-[14.5px] leading-[1.55] text-ink/75">{consentText}</span>
              </label>
              <FieldError id="trial-consent-error" message={errors.consent} />
            </div>

            {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
            <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor="trial-company-url">Company URL</label>
              <input
                id="trial-company-url"
                name="company_url"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <AnimatePresence>
                {serverError && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318] text-[14px] rounded-[10px] px-4 py-3 m-0 mb-4"
                  >
                    {serverError}
                  </motion.p>
                )}
              </AnimatePresence>
              <button
                type="submit"
                disabled={status === "sending"}
                className={buttonClass("primary", "lg", "group w-full disabled:opacity-70")}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  <>
                    Start my free trial
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden />
                  </>
                )}
              </button>
              <p className="text-[12.5px] leading-[1.6] text-ink/65 m-0 mt-3 text-center">
                No card. No login. We&apos;ll never sell your details.{" "}
                <a href="/privacy" className="underline underline-offset-2 hover:text-brand">
                  Privacy
                </a>
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
