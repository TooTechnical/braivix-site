# Deploy Hostinger SMTP safely to the existing BrAIvix homepage

This patch fixes the `/api/lead` email delivery on the current `main` homepage without prematurely publishing the separately developed security/legal pages.

## Before the production deployment

1. Vercel → **tootechnicals-projects** → **braivix-site** → Settings → Environment Variables.
2. Add the two **server-only** variables to **Production** (and Preview if testing preview builds):
   - `HOSTINGER_SMTP_USER`: the authenticated Hostinger mailbox (e.g. `d.malone@braivix.com`).
   - `HOSTINGER_SMTP_PASS`: **that mailbox's real password**, entered directly into Vercel. Never put this secret in GitHub, a chat, or `NEXT_PUBLIC_*`.
3. Keep `LEAD_WEBHOOK_URL` unset unless it points to a storage-only backend, because the website sends emails directly and duplicate mail would be undesirable.
4. On the source branch, run `npm ci && npm run typecheck && npm run build`. Then test the offline form in a Vercel Preview with synthetic customer details; verify both recipients, including spam and Reply-To.
5. Merge this targeted PR to `main` only when the build and Vercel SMTP variables are ready, so the newly deployed code can use the credentials. Verify the production deployment commit and test an enquiry at https://braivix.com.

## Delivery behavior

The Next.js API uses `smtp.hostinger.com:465` over SSL/TLS and sends one email addressed to `m.smirnova@braivix.com` and `d.malone@braivix.com`. It requires both recipient addresses to be accepted by the mail server before responding with success. A success status is not a guarantee that inboxes received it.

A honeypot and field length checks exist, but durable rate limiting, abuse monitoring and persistent lead storage / retry are still required for production-grade lead reliability. Do not submit real customer financial or confidential data through this public website form.
