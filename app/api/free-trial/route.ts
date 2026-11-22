import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { trialDays } from "@/lib/plans";
import {
  consentText,
  industryLabel,
  normalizeNanpPhone,
  normalizeWebsite,
  validateTrialForm,
  type TrialFormData,
} from "@/lib/trialForm";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Per-instance memory: a basic brake on bursts from one address, not a
// guarantee across serverless instances. The honeypot does most of the work.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    hits.forEach((times, key) => {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    });
  }
  return recent.length > RATE_LIMIT;
}

function text(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  // Honeypot: hidden from people, filled by bots. Look like a success.
  if (text(body.company_url)) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many signups from this connection. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const form: TrialFormData = {
    name: text(body.name, 200),
    business: text(body.business, 200),
    website: text(body.website, 300),
    industry: text(body.industry, 40),
    mobile: text(body.mobile, 40),
    email: text(body.email, 300),
    missedCalls: text(body.missedCalls, 20),
    consent: body.consent === true,
  };

  const fieldErrors = validateTrialForm(form);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "Please fix the highlighted fields and try again.", fieldErrors },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.N8N_TRIAL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("Free-trial delivery is not configured. Set N8N_TRIAL_WEBHOOK_URL.");
    return NextResponse.json(
      { error: `Signups are temporarily unavailable. Please email ${siteConfig.contact.email}.` },
      { status: 503 }
    );
  }

  const utm: Record<string, string> = {};
  const rawUtm = (body.utm ?? {}) as Record<string, unknown>;
  for (const key of utmKeys) {
    const value = text(rawUtm[key], 200);
    if (value) utm[key] = value;
  }

  const days = trialDays(form.industry);
  const payload = {
    name: form.name,
    business_name: form.business,
    website: normalizeWebsite(form.website) || "",
    industry: form.industry,
    industry_label: industryLabel(form.industry),
    mobile: normalizeNanpPhone(form.mobile),
    email: form.email,
    missed_calls_per_day: form.missedCalls,
    consent: true,
    consent_text: consentText,
    trial_days: days,
    source_page: text(body.source_page, 500) || "/free-trial",
    ...utm,
    utm,
    kickoff_booking_url: siteConfig.kickoffBookingUrl,
    timestamp: new Date().toISOString(),
  };

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.N8N_TRIAL_WEBHOOK_SECRET) {
    headers["X-Vocemi-Secret"] = process.env.N8N_TRIAL_WEBHOOK_SECRET;
  }

  let delivery: Response;
  try {
    delivery = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
  } catch (err) {
    console.error("Free-trial delivery failed:", err);
    return NextResponse.json(
      { error: `We could not send your signup. Please email ${siteConfig.contact.email}.` },
      { status: 502 }
    );
  }

  if (!delivery.ok) {
    console.error("Free-trial delivery failed with status", delivery.status);
    return NextResponse.json(
      { error: `We could not send your signup. Please email ${siteConfig.contact.email}.` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, trialDays: days });
}
