import { NextResponse } from "next/server";
import { kickoffBookingUrl } from "@/lib/bookingUrls";
import { siteConfig } from "@/lib/config";
import { rateLimit } from "@/lib/rateLimit";
import { trialLengthForIndustry, validateTrial } from "@/lib/trialForm";

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  if (!rateLimit(`trial:${clientKey(request)}`)) {
    return NextResponse.json(
      {
        error:
          "Too many trial requests from this network. Please wait a few minutes and try again.",
      },
      { status: 429 }
    );
  }

  // Hidden from people. A filled value is treated as success so a bot does
  // not learn the check, and nothing is sent to the webhook.
  if (text(body.fax).trim()) {
    return NextResponse.json({
      ok: true,
      kickoffUrl: kickoffBookingUrl("trial_thank_you"),
    });
  }

  const { errors, value } = validateTrial({
    name: text(body.name),
    businessName: text(body.business_name),
    website: text(body.website),
    industry: text(body.industry),
    mobile: text(body.mobile),
    email: text(body.email),
    missedCalls: text(body.missed_calls),
    consent: body.consent === true,
    sourcePage: text(body.source_page),
    utmSource: text(body.utm_source),
    utmMedium: text(body.utm_medium),
    utmCampaign: text(body.utm_campaign),
    utmContent: text(body.utm_content),
    utmTerm: text(body.utm_term),
  });

  if (!value) {
    return NextResponse.json(
      {
        error: "Please fix the highlighted fields and try again.",
        fieldErrors: errors,
      },
      { status: 400 }
    );
  }

  const webhook = process.env.N8N_TRIAL_WEBHOOK_URL?.trim();
  if (!webhook) {
    return NextResponse.json(
      {
        error:
          "Trial signup is unavailable because N8N_TRIAL_WEBHOOK_URL is not set.",
      },
      { status: 503 }
    );
  }

  const trialLength = trialLengthForIndustry(value.industry);
  const payload: Record<string, string | number | boolean | null> = {
    name: value.name,
    business_name: value.businessName,
    website: value.website || null,
    industry: value.industry,
    mobile: value.mobile,
    email: value.email,
    missed_calls: value.missedCalls,
    consent: true,
    source_page: value.sourcePage || "/free-trial",
    timestamp: new Date().toISOString(),
    trial_length: trialLength,
  };

  const utm: [string, string][] = [
    ["utm_source", value.utmSource],
    ["utm_medium", value.utmMedium],
    ["utm_campaign", value.utmCampaign],
    ["utm_content", value.utmContent],
    ["utm_term", value.utmTerm],
  ];
  for (const [key, utmValue] of utm) {
    if (utmValue) payload[key] = utmValue;
  }

  let delivery: Response;
  try {
    delivery = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Trial webhook request failed", error);
    return NextResponse.json(
      {
        error: `We could not submit your trial request. Please email ${siteConfig.contact.email}.`,
      },
      { status: 502 }
    );
  }

  if (!delivery.ok) {
    console.error("Trial webhook failed with status", delivery.status);
    return NextResponse.json(
      {
        error: `We could not submit your trial request. Please email ${siteConfig.contact.email}.`,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    kickoffUrl: kickoffBookingUrl("trial_thank_you"),
    trialLength,
  });
}
