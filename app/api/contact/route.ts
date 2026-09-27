import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

interface ContactRequest {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  // Honeypot fields are hidden from people but commonly filled by form bots.
  // Return a normal success response so a bot does not learn how to bypass it.
  if (text(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(body.name);
  const email = text(body.email);
  const company = text(body.company);
  const message = text(body.message);

  if (
    name.length < 2 ||
    name.length > 100 ||
    !emailPattern.test(email) ||
    email.length > 200 ||
    company.length > 120 ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Please complete every required field with valid information." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;

  if (!apiKey || !from) {
    console.error(
      "Contact delivery is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL."
    );
    return NextResponse.json(
      {
        error: `The form is temporarily unavailable. Please email ${siteConfig.contact.email}.`,
      },
      { status: 503 }
    );
  }

  const delivery = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Website enquiry from ${name}${company ? ` at ${company}` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    }),
    cache: "no-store",
  });

  if (!delivery.ok) {
    console.error("Contact delivery failed with status", delivery.status);
    return NextResponse.json(
      {
        error: `We could not send your message. Please email ${siteConfig.contact.email}.`,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
