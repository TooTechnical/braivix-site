# BrAIvix public website

Next.js App Router, TypeScript, React and Tailwind CSS v4. Uses the existing BrAIvix design tokens, DM Sans font and lightweight CSS animations. Motion respects prefers-reduced-motion.

## Run locally

Requires Node.js 20.9+ (Node.js 22 LTS recommended).

```bash
npm ci
cp .env.example .env.local
npm run dev
# http://localhost:3000
```

Open /, /solutions, /security, /company, /contact, /cookies, /terms and /privacy.

## Contact forms and delivery

The home page "Run Offline Test" form and the /contact form both POST to the server-only /api/lead route.

**Email delivery is NOT active until configured.** The server requires RESEND_API_KEY and LEAD_FROM_EMAIL. Use a verified sending domain in Resend (e.g. braivix.com) with SPF/DKIM configured as requested by the provider. Both forms send a **single message to both**:
- m.smirnova@braivix.com
- d.malone@braivix.com

The sender should be a verified address (e.g. BrAIvix <leads@braivix.com>), while the visitor's address is set as Reply-To. Do not add a user-provided address as the From address.

For Vercel, add the two environment variables in Project Settings > Environment Variables, separately for Preview and Production where applicable. Redeploy after changing secrets. Do not commit .env.local.

The route returns 503 if email credentials are absent, 422 on validation errors and 502 if the provider does not accept the message. It never displays success merely because demo mode is enabled. Provider acceptance is not the same as final inbox delivery: verify real delivery to **both** inboxes, check spam, test replies and monitor bounce events.

LEAD_WEBHOOK_URL and LEAD_WEBHOOK_TOKEN are optional; when present they forward the validated lead to your CRM/backend after email acceptance. Make any backend handler storage-only to avoid duplicate emails.

Basic honeypot and input limits are included. Before launching publicly, add infrastructure-level rate limiting and bot protection (e.g. Turnstile) and monitor email abuse and delivery. Never submit actual customer financial records using the public enquiry form.

## Build and smoke test

```bash
npm run build
npm run dev
# in a second terminal while running:
npm run smoke
```

A smoke test checks that all eight page routes return HTTP 200 and malformed form data is rejected. It does not send real mail.

## Launch checks

- Have Mariia approve content, product claims and company details.
- Obtain legal review of privacy, cookies and terms drafts; confirm processor list, retention and transfer arrangements.
- Audit cookies and third-party scripts on the **deployed** domain. Only add a consent banner if actual non-essential technologies are present; then block them before consent and provide withdrawal.
- Check accessibility, keyboard navigation, mobile layout and reduced-motion behavior.
- Configure email sender authentication, verify messages arrive at both recipients, and check provider acceptance and bounce status.
- Add independent spam/rate-limit controls and verify no personal data enters logs.
- Run npm run build and manual end-to-end tests on a Vercel preview before production deployment.

No SOC 2 or ISO 27001 certification is claimed by this website.
