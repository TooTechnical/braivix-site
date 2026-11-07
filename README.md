# BrAIvix public website

Next.js 16 App Router, TypeScript, React and Tailwind CSS v4. Uses existing BrAIvix dark teal design tokens and reduced-motion-aware CSS effects.

## Local setup

1. Open the branch `feat/site-pages-and-lead-email` (or review draft PR #1).
2. In VS Code Terminal (from the repo root):

```bash
npm ci
test -f .env.local || cp .env.example .env.local
```

3. Edit `.env.local`. Set `HOSTINGER_SMTP_USER` to one **existing Hostinger mailbox**, such as `d.malone@braivix.com`, and `HOSTINGER_SMTP_PASS` to **that mailbox's password**. The password must stay in `.env.local` or Vercel Environment Variables—never commit it, print it, or share it in chat.
4. Start the site: `npm run dev`. Open http://localhost:3000.

Page routes: /, /solutions, /security, /company, /contact, /cookies, /terms, /privacy.

## Hostinger SMTP delivery

Both public forms use POST /api/lead and Nodemailer with Hostinger's official SMTP settings:

- Host: `smtp.hostinger.com`
- Port: `465`
- Security: `SSL/TLS` from connection start (no insecure fallback)
- SMTP login: full email address from `HOSTINGER_SMTP_USER`
- SMTP password: `HOSTINGER_SMTP_PASS`
- From: authenticated mailbox (e.g. BrAIvix Website <d.malone@braivix.com>)
- To: **both** m.smirnova@braivix.com and d.malone@braivix.com
- Reply-To: the visitor's validated email

This **does not alter either Hostinger mailbox**. Do not change the domain's MX records. If necessary Hostinger documents STARTTLS on port 587 as a fallback, but the application intentionally uses the standard SSL/TLS 465 setting.

SMTP acceptance is not proof of final inbox delivery. The application confirms that Hostinger accepted **both** recipients, but you must verify both inboxes, spam folders, replies, and sending restrictions.

## Test locally

```bash
npm run typecheck
npm run build
npm run dev
```

In a **second** terminal, test page routing and invalid-form rejection (no real email is sent):

```bash
npm run smoke
```

To test authentication **without sending** (from the repo root, Node 22 or later):

```bash
npm run smtp:verify
```

Then use the Contact page and the homepage's Offline Test form with safe, fabricated test details. Check **both recipients** and the Reply-To value. Confirm that removing the password makes forms show an error, not false success. Run tests on a Vercel Preview deployment as well, since production egress and TLS may differ from your Mac.

## Vercel setup

Open the BrAIvix site's Vercel project → Settings → Environment Variables. Add **server-only** `HOSTINGER_SMTP_USER` and `HOSTINGER_SMTP_PASS`. Set these for Preview, and for Production only when approved. Redeploy to apply changes. Do not add the `NEXT_PUBLIC_` prefix or put secrets in the GitHub repository.

Vercel supports outbound SMTP except port 25. A serverless function must await `sendMail`; the API route does. SMTP may be slower and Hostinger mailbox sending limits still apply.

## Reliability and safety

- Both forms require essential business information, reject invalid data and limit input lengths and body size.
- SMTP errors return HTTP 502; missing credentials return HTTP 503. Fake success demo mode was removed.
- One short-lived TLS connection per message, fixed internal recipients, fixed sender from SMTP login, visitor as Reply-To. No sensitive request bodies or SMTP passwords in application logs.
- Existing optional `LEAD_WEBHOOK_URL` can forward a lead to a **storage-only** backend after Hostinger accepts email. Disable any duplicate notifications at that backend.
- A basic honeypot exists, but **add durable rate limiting and CAPTCHA/Turnstile before public launch** (in-memory counters are not reliable for serverless functions). Configure alerts/monitoring for failed requests, plus mailbox quotas and anti-spam policies.
- Be aware that a timeout or partial SMTP acceptance can result in duplicate or missing notifications on retry. For bank-grade reliability, use a persistent lead store / retry queue before accepting production leads.
- The legal pages are drafts and need review against actual company policies, processors, retention periods, international transfers and live cookies.
- Do not submit confidential bank customer data using the public contact form. BrAIvix must verify all security/product claims before launch.

Do not merge the draft PR or deploy the website to production until tests, email delivery and content/legal review are complete.
