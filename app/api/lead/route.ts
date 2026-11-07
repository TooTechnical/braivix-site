import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECIPIENTS = ["m.smirnova@braivix.com", "d.malone@braivix.com"] as const;

const clean = (value: unknown) =>
  typeof value === "string" ? value.trim().replace(/[\r\n]+/g, " ") : "";
const fail = (error: string, status: number) =>
  NextResponse.json(
    { ok: false, error },
    { status, headers: { "Cache-Control": "no-store" } },
  );

type Lead = {
  source: "contact" | "offline-test";
  name: string;
  bank: string;
  role: string;
  email: string;
  message: string;
  page: string;
  submitted_at: string;
};

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 6000) return fail("payload_too_large", 413);

  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 6000) return fail("payload_too_large", 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return fail("invalid_json", 400);
    }
    data = parsed as Record<string, unknown>;
  } catch {
    return fail("invalid_json", 400);
  }

  // Standard honeypot: do not notify the team about obvious bot submissions.
  if (clean(data.website)) {
    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const source: Lead["source"] = data.source === "contact" ? "contact" : "offline-test";
  const lead: Lead = {
    source,
    name: clean(data.name),
    bank: clean(data.bank),
    role: clean(data.role),
    email: clean(data.email).toLowerCase(),
    message: clean(data.message),
    page: source === "contact" ? "/contact" : "/",
    submitted_at: new Date().toISOString(),
  };

  if (
    lead.name.length < 1 || lead.name.length > 120 ||
    lead.bank.length < 1 || lead.bank.length > 150 ||
    lead.email.length > 254 || !EMAIL_RE.test(lead.email) ||
    (source === "offline-test" && (lead.role.length < 1 || lead.role.length > 120)) ||
    (source === "contact" && (lead.message.length < 1 || lead.message.length > 2000))
  ) {
    return fail("validation", 422);
  }

  // Keep the SMTP mailbox password on the server, never in the frontend.
  const user = process.env.HOSTINGER_SMTP_USER?.trim();
  const password = process.env.HOSTINGER_SMTP_PASS;
  if (!user || !EMAIL_RE.test(user) || !password) {
    console.error("[lead] Hostinger SMTP credentials are not configured");
    return fail("not_configured", 503);
  }

  // Hostinger Email: SSL/TLS on 465. Each request uses a short-lived connection
  // instead of leaving a pooled SMTP connection open in a serverless function.
  const transport = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: { user, pass: password },
    connectionTimeout: 10000,
    greetingTimeout: 7000,
    socketTimeout: 12000,
    disableFileAccess: true,
    disableUrlAccess: true,
    maxRecipients: 2,
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
  });

  const kind = source === "contact" ? "General contact" : "Offline test request";
  const lines = [
    "New BrAIvix website enquiry",
    "Type: " + kind,
    "Name: " + lead.name,
    "Organisation: " + lead.bank,
    ...(source === "offline-test" ? ["Position: " + lead.role] : []),
    "Work email: " + lead.email,
    ...(source === "contact" ? ["", "Message:", lead.message] : []),
    "",
    "Submitted at: " + lead.submitted_at,
    "Page: " + lead.page,
  ];

  try {
    // IMPORTANT: await the SMTP send before returning from a Vercel function.
    const result = await transport.sendMail({
      from: { name: "BrAIvix Website", address: user },
      to: [...RECIPIENTS],
      replyTo: { name: lead.name, address: lead.email },
      subject: "BrAIvix website: " + kind,
      text: lines.join("\n"),
    });

    // SMTP acknowledgement indicates the provider accepted responsibility for
    // these recipients. It cannot guarantee final mailbox delivery.
    const accepted = new Set(result.accepted.map((email) => email.toLowerCase()));
    if (!RECIPIENTS.every((recipient) => accepted.has(recipient))) {
      console.error("[lead] SMTP server did not accept both recipients");
      return fail("partial_delivery", 502);
    }

    // Optional CRM/backend lead storage. Disable duplicate mail sending there.
    if (process.env.LEAD_WEBHOOK_URL) {
      try {
        const webhook = await fetch(process.env.LEAD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.LEAD_WEBHOOK_TOKEN
              ? { "X-Lead-Token": process.env.LEAD_WEBHOOK_TOKEN }
              : {}),
          },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(5000),
          cache: "no-store",
        });
        if (!webhook.ok) {
          console.error("[lead] Optional CRM webhook rejected request, HTTP", webhook.status);
        }
      } catch {
        console.error("[lead] Optional CRM webhook unavailable");
      }
    }

    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    // Do not log the password, customer's information, or full SMTP exception.
    console.error("[lead] SMTP sending failed; verify Hostinger login and connectivity");
    return fail("delivery_failed", 502);
  } finally {
    transport.close();
  }
}
