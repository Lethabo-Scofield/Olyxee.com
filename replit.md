# Olyxee - Next.js App on Replit

## Overview
A Next.js 15 application migrated from Vercel/Firebase Hosting to Replit. AI deployment platform website.

## Architecture
- **Framework**: Next.js 15 (App Router + Pages Router mixed)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion, Three.js, React Three Fiber
- **Auth**: better-auth
- **Database**: LibSQL / Drizzle ORM
- **Payments**: Stripe
- **Math rendering**: KaTeX (CSS imported in root layout)

## Running the App
- **Dev server**: `npm run dev` — starts on port 5000 with Turbopack, bound to 0.0.0.0
- **Workflow**: "Start application" — runs `npm run dev`

## Routing
- **App Router** (`src/app/`): `/`, `/products/grysics`, `/products/nrn`
- **Pages Router** (`src/pages/`): `/docs`, `/community`, `/support`
- Global CSS is imported via `src/pages/_app.tsx` for Pages Router routes
- KaTeX CSS is imported in `src/app/layout.tsx` for App Router routes

## Important: Case-Sensitive Paths
- Product images are in `public/Products/` (capital P)
- Hardware logos are in `public/hardware-logos/`
- Logo files are in `public/Logo/`

## Replit Migration Notes
- Removed `output: 'export'` (static export) from `next.config.ts`
- Removed turbopack custom loader config (component-tagger-loader)
- Removed `outputFileTracingRoot` pointing to monorepo parent
- Dev and start scripts updated to use `--turbopack -p 5000 -H 0.0.0.0`
- Added `src/pages/_app.tsx` for proper global CSS in Pages Router
- Created `/support` page (was a dead navigation link)
- Fixed case-sensitive image paths in NRN product page
- Replaced broken external images (Unsplash, Wikipedia) with working alternatives
- Fixed hydration errors from BlockMath inside p tags on NRN page
- Replaced Flutter logo with Olyxee logo in Grysics footer

## Responsive Design Pass
- Header: CTA buttons hidden on small screens (available in mobile hamburger menu)
- Homepage: Carousel height scales across breakpoints, font sizes responsive, image aspect ratios fixed
- Grysics page: All section headings, hero image, stats, CTA padding responsive
- NRN page: Changed from font-mono to font-sans for readability, math block overflow handled
- Docs layout: Sidebar has mobile toggle with backdrop overlay and scroll support
- Community page: Section padding, headings, event grid all scale for mobile
- Support page: Already responsive (no changes needed)

## Key Directories
- `src/app/` — Next.js App Router pages and layouts
- `src/pages/` — Next.js Pages Router pages (docs, community, support)
- `src/components/` — Shared React components
- `src/visual-edits/` — Visual editing overlay system (VisualEditsMessenger)
- `src/lib/` — Utilities and shared logic
- `public/` — Static assets
