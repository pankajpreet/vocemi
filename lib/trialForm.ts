export const trialIndustries = [
  "Insurance",
  "Med spa",
  "HVAC & plumbing",
  "Vet clinic",
  "Other",
] as const;

export const missedCallOptions = ["0–5", "5–15", "15+", "Not sure"] as const;

export type TrialIndustry = (typeof trialIndustries)[number];
export type MissedCalls = (typeof missedCallOptions)[number];

export type TrialFields = {
  name: string;
  businessName: string;
  website: string;
  industry: string;
  mobile: string;
  email: string;
  missedCalls: string;
  consent: boolean;
  sourcePage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
};

export type TrialFieldErrors = Partial<Record<keyof TrialFields | "form", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Canada and US numbers: 10 digits, or 11 with a leading country code 1. */
export function isCanadaOrUsPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const national =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(national);
}

export function isOptionalWebsite(value: string) {
  if (!value) return true;
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    const url = new URL(withProtocol);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

export function trialLengthForIndustry(industry: string) {
  return industry === "HVAC & plumbing" ? 30 : 14;
}

function clean(value: string, max: number) {
  return value.trim().slice(0, max);
}

export function validateTrial(input: {
  name?: string;
  businessName?: string;
  website?: string;
  industry?: string;
  mobile?: string;
  email?: string;
  missedCalls?: string;
  consent?: boolean;
  sourcePage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}): { errors: TrialFieldErrors; value: TrialFields | null } {
  const value: TrialFields = {
    name: clean(input.name ?? "", 120),
    businessName: clean(input.businessName ?? "", 160),
    website: clean(input.website ?? "", 200),
    industry: clean(input.industry ?? "", 40),
    mobile: clean(input.mobile ?? "", 30),
    email: clean(input.email ?? "", 160),
    missedCalls: clean(input.missedCalls ?? "", 20),
    consent: input.consent === true,
    sourcePage: clean(input.sourcePage ?? "", 200),
    utmSource: clean(input.utmSource ?? "", 120),
    utmMedium: clean(input.utmMedium ?? "", 120),
    utmCampaign: clean(input.utmCampaign ?? "", 120),
    utmContent: clean(input.utmContent ?? "", 120),
    utmTerm: clean(input.utmTerm ?? "", 120),
  };

  const errors: TrialFieldErrors = {};
  if (!value.name) errors.name = "Enter your name.";
  if (!value.businessName) errors.businessName = "Enter your business name.";
  if (!isOptionalWebsite(value.website)) {
    errors.website = "Enter a valid website URL, or leave it blank.";
  }
  if (!trialIndustries.includes(value.industry as TrialIndustry)) {
    errors.industry = "Choose an industry.";
  }
  if (!isCanadaOrUsPhone(value.mobile)) {
    errors.mobile = "Enter a Canada or US mobile number.";
  }
  if (!emailPattern.test(value.email)) errors.email = "Enter a valid email.";
  if (!missedCallOptions.includes(value.missedCalls as MissedCalls)) {
    errors.missedCalls = "Choose how many calls you miss.";
  }
  if (!value.consent) {
    errors.consent =
      "Agree to be contacted about your trial by phone, text and email.";
  }
  if (value.sourcePage && !value.sourcePage.startsWith("/")) {
    errors.sourcePage = "Source page must be a path on this site.";
  }

  return { errors, value: Object.keys(errors).length ? null : value };
}
