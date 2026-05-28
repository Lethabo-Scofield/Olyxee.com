# Olyxee

Company website for **Olyxee**, a reliability-first AI infrastructure company. Marketing site presenting vision, research, products (Ordo, Addup, ODI, Cortex, Courier Loop), and the careers / internship verification system.

## Stack

- **Framework**: Next.js 15 (App Router + Pages Router)
- **Styling**: Tailwind CSS v4 (via `@theme` in `src/app/globals.css`)
- **UI**: Radix UI + shadcn/ui primitives
- **Animation**: Framer Motion, Three.js / React Three Fiber
- **Database**: Replit-managed PostgreSQL (`pg`) for the internship verification system
- **Email**: Resend (waitlist) + Nodemailer (contact)
- **Payments**: Stripe
- **Math rendering**: KaTeX

## Local development

```bash
npm install
npm run dev
```

The dev server runs on **port 5000** (bound to `0.0.0.0`) with Turbopack. Open the preview pane (or http://localhost:5000) to view.

The Replit workflow `Start application` runs `npm run dev` for you automatically.

## Required environment variables

| Variable          | Purpose                                                     |
| ----------------- | ----------------------------------------------------------- |
| `DATABASE_URL`    | PostgreSQL connection string (internship verification DB)   |
| `RESEND_API_KEY`  | Waitlist signups via Resend                                 |
| `STRIPE_*`        | Stripe API keys (only if exercising payment flows)          |

Secrets are managed through the Replit Secrets pane, not committed to the repo.

## Scripts

```bash
npm run dev     # Start dev server on port 5000
npm run build   # Production build
npm run start   # Run production build
npm run lint    # ESLint
```

## Project layout

```
src/
├── app/                # App Router routes (/, /products/ordo, /products/nrn, /api/*)
├── pages/              # Pages Router routes (/about, /products, /careers, /docs, ...)
├── components/         # Shared React components (header.tsx, footer.tsx, SEO.tsx, ...)
│   └── ui/             # shadcn/ui primitives
├── lib/                # Utilities (db.ts, admin-auth.ts, careers-roles.ts, hooks/, ...)
└── visual-edits/       # Replit visual-edit overlay tooling
public/
├── images/             # Site imagery and gradient backgrounds
├── Logo/               # Brand marks
├── Products/           # Product screenshots
├── hardware-logos/     # Hardware partner logos
├── videos/             # Hero videos
├── robots.txt, sitemap.xml, llms.txt
```

## Internship verification system

- **Public lookup**: `/verify` — enter a code, see intern details or "Invalid Code"
- **Admin gate**: typing `admin@olyxee--hard` on `/verify` calls `POST /api/admin/auth`, which sets an httpOnly cookie (`olyxee_admin`) and redirects to `/admin`
- **Admin dashboard**: `/admin` — create new interns and view records
- **API** (App Router, `src/app/api/`):
  - `GET /api/verify?code=...` — public
  - `GET/POST /api/interns` — admin-only (cookie-gated)
  - `POST/DELETE /api/admin/auth` — set / clear admin cookie
- DB pool reused across HMR via `src/lib/db.ts`

## Design system

- **Display font**: Instrument Serif (italic) — *highlights only* (hero headings, section titles)
- **Body font**: Inter — body text, UI, most headings
- Section spacing: `py-20 sm:py-32 lg:py-40`
- Container padding: `px-4 sm:px-8 lg:px-12`
- Card radius: `rounded-3xl` on all major content cards
- Frosted glass: header pill navbar, cookie banner
- No fake stats, testimonials, or partner logos
- No em dashes anywhere on the site

Full design conventions live in [`replit.md`](./replit.md).

## Deployment

The site is designed to deploy via Replit Deployments. See the deployment skill / Replit deployment docs for region / scaling configuration.
