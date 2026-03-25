# Olyxee - Next.js App on Replit

## Overview
A Next.js 15 application migrated from Vercel/Firebase Hosting to Replit.

## Architecture
- **Framework**: Next.js 15 (App Router + Pages Router mixed)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion, Three.js, React Three Fiber
- **Auth**: better-auth
- **Database**: LibSQL / Drizzle ORM
- **Payments**: Stripe

## Running the App
- **Dev server**: `npm run dev` — starts on port 5000 with Turbopack, bound to 0.0.0.0
- **Workflow**: "Start application" — runs `npm run dev`

## Routing
- **App Router** (`src/app/`): `/`, `/products/grysics`, `/products/nrn`
- **Pages Router** (`src/pages/`): `/docs`, `/community`, `/support`
- Global CSS is imported via `src/pages/_app.tsx` for Pages Router routes

## Replit Migration Notes
- Removed `output: 'export'` (static export) from `next.config.ts` — not compatible with server features
- Removed turbopack custom loader config (component-tagger-loader) — not needed for Replit
- Removed `outputFileTracingRoot` pointing to monorepo parent — not applicable
- Dev and start scripts updated to use `--turbopack -p 5000 -H 0.0.0.0` for Replit proxy compatibility
- Added `src/pages/_app.tsx` to properly handle global CSS imports for Pages Router
- Created `/support` page (was a dead navigation link)

## Key Directories
- `src/app/` — Next.js App Router pages and layouts
- `src/pages/` — Next.js Pages Router pages (docs, community, support)
- `src/components/` — Shared React components
- `src/visual-edits/` — Visual editing overlay system (VisualEditsMessenger)
- `src/lib/` — Utilities and shared logic
- `public/` — Static assets
