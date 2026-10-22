"use client";

import { FormEvent, useState } from "react";
import TrackedLink from "@/components/start/TrackedLink";
import { trackEvent } from "@/lib/analytics";
import {
  missedCallOptions,
  trialIndustries,
  validateTrial,
} from "@/lib/trialForm";

type FieldErrors = Partial<Record<string, string>>;

const inputClass =
  "w-full min-w-0 rounded-[9px] border border-ink/15 bg-white px-3 py-3 text-[15px] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function TrialForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [thanks, setThanks] = useState<{ name: string; kickoffUrl: string } | null>(
    null
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    const payload = {
      name: String(data.get("name") ?? ""),
      businessName: String(data.get("business_name") ?? ""),
      website: String(data.get("website") ?? ""),
      industry: String(data.get("industry") ?? ""),
      mobile: String(data.get("mobile") ?? ""),
      email: String(data.get("email") ?? ""),
      missedCalls: String(data.get("missed_calls") ?? ""),
      consent: data.get("consent") === "on",
      sourcePage: window.location.pathname,
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      utmContent: params.get("utm_content") ?? "",
      utmTerm: params.get("utm_term") ?? "",
    };

    const { errors: fieldErrors, value } = validateTrial(payload);
    if (!value) {
      setErrors(fieldErrors);
      setFormError("Please fix the highlighted fields and try again.");
      return;
    }
    setErrors({});
    setPending(true);

    try {
      const response = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value.name,
          business_name: value.businessName,
          website: value.website,
          industry: value.industry,
          mobile: value.mobile,
          email: value.email,
          missed_calls: value.missedCalls,
          consent: true,
          source_page: value.sourcePage,
          utm_source: value.utmSource,
          utm_medium: value.utmMedium,
          utm_campaign: value.utmCampaign,
          utm_content: value.utmContent,
          utm_term: value.utmTerm,
          fax: String(data.get("fax") ?? ""),
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
        kickoffUrl?: string;
      };
      if (!response.ok || !result.ok || !result.kickoffUrl) {
        setErrors(result.fieldErrors ?? {});
        setFormError(result.error || "We could not submit your trial request.");
        return;
      }
      trackEvent("trial_signup", { industry: value.industry });
      setThanks({ name: value.name, kickoffUrl: result.kickoffUrl });
    } catch {
      setFormError("We could not submit your trial request. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (thanks) {
    return (
      <div className="bg-white border border-ink/10 rounded-2xl p-6 md:p-8">
        <h2 className="font-display text-[26px] leading-[1.2] font-extrabold text-ink m-0 mb-4">
          Thanks, {thanks.name}. Book your 15-minute kickoff call so we can set
          up your AI.
        </h2>
        <TrackedLink
          href={thanks.kickoffUrl}
          event="book_call_clicked"
          properties={{ placement: "trial_thank_you" }}
          external
          className="inline-flex items-center justify-center bg-brand text-white px-5 py-3.5 rounded-[9px] text-[15px] font-semibold hover:bg-brand-dark"
        >
          Book your 15-minute kickoff call
        </TrackedLink>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="bg-white border border-ink/10 rounded-2xl p-6 md:p-8 flex flex-col gap-4">
      {formError ? (
        <p role="alert" className="text-[14.5px] text-red-800 m-0">
          {formError}
        </p>
      ) : null}

      <Field label="Name" error={errors.name} id="trial-name">
        <input
          id="trial-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "trial-name-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field label="Business name" error={errors.businessName} id="trial-business">
        <input
          id="trial-business"
          name="business_name"
          type="text"
          autoComplete="organization"
          required
          aria-invalid={Boolean(errors.businessName)}
          aria-describedby={errors.businessName ? "trial-business-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field label="Website" error={errors.website} id="trial-website" optional>
        <input
          id="trial-website"
          name="website"
          type="url"
          autoComplete="url"
          aria-invalid={Boolean(errors.website)}
          aria-describedby={errors.website ? "trial-website-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field label="Industry" error={errors.industry} id="trial-industry">
        <select
          id="trial-industry"
          name="industry"
          required
          defaultValue=""
          aria-invalid={Boolean(errors.industry)}
          aria-describedby={errors.industry ? "trial-industry-error" : undefined}
          className={inputClass}
        >
          <option value="" disabled>
            Select
          </option>
          {trialIndustries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Mobile number" error={errors.mobile} id="trial-mobile">
        <input
          id="trial-mobile"
          name="mobile"
          type="tel"
          autoComplete="tel"
          required
          inputMode="tel"
          aria-invalid={Boolean(errors.mobile)}
          aria-describedby={errors.mobile ? "trial-mobile-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field label="Email" error={errors.email} id="trial-email">
        <input
          id="trial-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "trial-email-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field
        label="About how many calls a day do you miss?"
        error={errors.missedCalls}
        id="trial-missed"
      >
        <select
          id="trial-missed"
          name="missed_calls"
          required
          defaultValue=""
          aria-invalid={Boolean(errors.missedCalls)}
          aria-describedby={errors.missedCalls ? "trial-missed-error" : undefined}
          className={inputClass}
        >
          <option value="" disabled>
            Select
          </option>
          {missedCallOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <div>
        <label className="flex items-start gap-3 text-[15px] leading-[1.5] text-ink" htmlFor="trial-consent">
          <input
            id="trial-consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "trial-consent-error" : undefined}
            className="mt-1 h-4 w-4 flex-shrink-0"
          />
          <span>I agree to be contacted by Vocemi about my trial by phone, text and email.</span>
        </label>
        {errors.consent ? (
          <p id="trial-consent-error" className="text-[13.5px] text-red-800 m-0 mt-1">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="trial-fax">Fax</label>
        <input
          id="trial-fax"
          name="fax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center bg-brand text-white px-5 py-3.5 rounded-[9px] text-[15px] font-semibold hover:bg-brand-dark disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {pending ? "Sending…" : "Start my free trial"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-[14px] font-semibold text-ink mb-1.5">
        {label}
        {optional ? <span className="font-normal text-ink/60"> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[13.5px] text-red-800 m-0 mt-1">
          {error}
        </p>
      ) : null}
    </div>
  );
}
