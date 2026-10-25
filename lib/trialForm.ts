/** Free-trial signup: shared by the form (instant feedback) and the API route. */

export const trialIndustries = [
  { value: "insurance", label: "Insurance" },
  { value: "med-spa", label: "Med spa" },
  { value: "hvac-plumbing", label: "HVAC & plumbing" },
  { value: "vet-clinic", label: "Vet clinic" },
  { value: "other", label: "Other" },
] as const;

export const missedCallOptions = [
  { value: "0-5", label: "0–5" },
  { value: "5-15", label: "5–15" },
  { value: "15+", label: "15+" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const consentText =
  "I agree to be contacted by Vocemi about my trial by phone, text and email.";

export interface TrialFormData {
  name: string;
  business: string;
  website: string;
  industry: string;
  mobile: string;
  email: string;
  missedCalls: string;
  consent: boolean;
}

export type TrialField = keyof TrialFormData;
export type TrialFieldErrors = Partial<Record<TrialField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Canada and the US share the North American Numbering Plan: 10 digits,
 * optionally prefixed with 1. Area code and exchange can't start with 0 or 1.
 * Returns +1XXXXXXXXXX, or null.
 */
export function normalizeNanpPhone(value: string): string | null {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (digits.length !== 10) return null;
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return null;
  return `+1${digits}`;
}

/** Accepts "example.com" as well as full URLs. Returns a normalized URL, "" or null. */
export function normalizeWebsite(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function validateTrialForm(form: TrialFormData): TrialFieldErrors {
  const errors: TrialFieldErrors = {};
  const name = form.name.trim();
  const business = form.business.trim();
  const email = form.email.trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "Name must be 100 characters or fewer.";

  if (business.length < 2) errors.business = "Please enter your business name.";
  else if (business.length > 120) errors.business = "Business name must be 120 characters or fewer.";

  if (form.website.trim().length > 200 || normalizeWebsite(form.website) === null) {
    errors.website = "Enter a website like example.com, or leave it blank.";
  }

  if (!trialIndustries.some((option) => option.value === form.industry)) {
    errors.industry = "Please choose your industry.";
  }

  if (!normalizeNanpPhone(form.mobile)) {
    errors.mobile = "Enter a 10-digit Canada or US mobile number.";
  }

  if (!email) errors.email = "Please enter your email address.";
  else if (!emailPattern.test(email) || email.length > 200) {
    errors.email = "Enter an email address like name@example.com.";
  }

  if (!missedCallOptions.some((option) => option.value === form.missedCalls)) {
    errors.missedCalls = "Please choose an option.";
  }

  if (form.consent !== true) {
    errors.consent = "Please agree so we can contact you about your trial.";
  }

  return errors;
}

export function industryLabel(value: string) {
  return trialIndustries.find((option) => option.value === value)?.label ?? value;
}
