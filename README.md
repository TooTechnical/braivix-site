# BrAIvix website — page 1 (Product / Home)

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. No animation libraries: all motion is CSS
plus two small client components (scroll reveal, pipeline progress). Respects `prefers-reduced-motion`.

## Run

```bash
npm install
cp .env.example .env.local   # set LEAD_WEBHOOK_URL (see below)
npm run dev                  # http://localhost:3000
```

Deploys to Vercel as-is (framework preset: Next.js). Set the env vars in the Vercel project.

## Structure

```
app/
  layout.tsx          fonts (DM Sans, self-hosted via @fontsource), metadata, ambient background
  page.tsx            Home = Header + Hero + Pipeline + Control + OfflineTest + Footer
  globals.css         design tokens (from the Figma style sheet) + all visual effects
  api/lead/route.ts   receives the "Run Offline Test" form and forwards it to the backend
components/
  Header.tsx          fixed nav, blur on scroll, mobile menu
  Hero.tsx            H1 + glowing orb with a flare orbiting its rim
  Pipeline.tsx        4 steps on a timeline; a light travels down it with scroll
  Control.tsx         "No Black Boxes" — two intersecting orbs that slide together
  OfflineTest.tsx     horizon + flare, request form (name, bank, position, work email)
  Footer.tsx, Logo.tsx, Reveal.tsx, nav.ts
docs/
  fastapi_lead_endpoint.py   example endpoint for the form (suggestion only)
public/
  logo-mark.png       TEMPORARY raster crop — please replace with the original SVG from Figma
```

## The form

Browser → `POST /api/lead` (Next route handler) → `POST LEAD_WEBHOOK_URL` (FastAPI).
The route validates input, drops bots via a honeypot field, and sends JSON:

```json
{ "name": "", "bank": "", "role": "", "email": "", "source": "offline-test",
  "page": "/", "submitted_at": "ISO-8601", "user_agent": "" }
```

with header `X-Lead-Token: $LEAD_WEBHOOK_TOKEN` if set. If `LEAD_WEBHOOK_URL` is missing the route
returns 503 and the visitor sees an error, so a lead is never silently lost.

## Not done yet

- Pages Solutions, Security, Company (nav links already point to /solutions, /security, /company).
- Policy pages (/cookies, /terms, /privacy) — linked from the footer and the form.
- Logo SVG (see above), favicon set, Open Graph image.
