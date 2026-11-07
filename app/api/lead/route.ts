import { NextResponse } from "next/server";

/**
 * Receives "Run Offline Test" requests from the site and forwards them
 * to the backend (LEAD_WEBHOOK_URL, e.g. a FastAPI endpoint that stores
 * the lead in PostgreSQL and emails the team).
 *
 * The backend URL stays server-side, so the browser never sees it and
 * there is no CORS setup needed on the API.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Bots fill the hidden "website" field: answer OK but drop the request.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name),
    bank: clean(body.bank),
    role: clean(body.role),
    email: clean(body.email, 254).toLowerCase(),
    source: clean(body.source, 50) || "offline-test",
    page: clean(body.page, 200),
    submitted_at: new Date().toISOString(),
    user_agent: clean(req.headers.get("user-agent"), 300),
  };

  if (!lead.name || !lead.bank || !lead.role || !EMAIL_RE.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const target = process.env.LEAD_WEBHOOK_URL;
  if (!target) {
    console.error("[lead] LEAD_WEBHOOK_URL is not set — lead NOT delivered:", lead);
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_TOKEN ? { "X-Lead-Token": process.env.LEAD_WEBHOOK_TOKEN } : {}),
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`backend responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] forwarding failed:", err, lead);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
