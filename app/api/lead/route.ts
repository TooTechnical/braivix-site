import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECIPIENTS = ["m.smirnova@braivix.com", "d.malone@braivix.com"] as const;
const clean = (value: unknown) => typeof value === "string" ? value.trim().replace(/[\r\n]+/g, " ") : "";
const fail = (error: string, status: number) =>
  NextResponse.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });

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
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fail("invalid_json", 400);
    data = parsed as Record<string, unknown>;
  } catch {
    return fail("invalid_json", 400);
  }

  // Honeypot: do not notify the team about obvious automated submissions.
  if (clean(data.website)) return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });

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
  ) return fail("validation", 422);

  // Do not falsely confirm a submission when no email provider is configured.
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("[lead] Email delivery is not configured");
    return fail("not_configured", 503);
  }

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
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from,
        to: [...RECIPIENTS],
        reply_to: lead.email,
        subject: "BrAIvix website: " + kind,
        text: lines.join("\n"),
      }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("[lead] Email provider rejected submission; HTTP", response.status);
      return fail("delivery_failed", 502);
    }

    // Optional CRM lead forwarding; intentionally non-blocking after email is accepted.
    // Configure the webhook as storage-only to avoid duplicate email notifications.
    if (process.env.LEAD_WEBHOOK_URL) {
      try {
        const result = await fetch(process.env.LEAD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.LEAD_WEBHOOK_TOKEN ? { "X-Lead-Token": process.env.LEAD_WEBHOOK_TOKEN } : {}),
          },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(5000),
          cache: "no-store",
        });
        if (!result.ok) console.error("[lead] Optional CRM webhook failed; HTTP", result.status);
      } catch {
        console.error("[lead] Optional CRM webhook unavailable");
      }
    }

    // The provider accepted the message, but inbox delivery must be verified separately.
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    // Avoid writing personal data, email bodies or API keys into logs.
    console.error("[lead] Email provider unavailable");
    return fail("delivery_failed", 502);
  }
}
