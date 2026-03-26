# Olyxee - AI Infrastructure Company Website

## Overview
Company-level website for Olyxee, a reliability-first AI infrastructure company. Positioned like OpenAI/DeepMind/Anthropic — presenting vision, research, products, and credibility as a foundational AI company.

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

## Design System
- **Display font**: `Instrument Serif` (italic) for all major headings — creates a distinctive, editorial feel
- **Body font**: `Inter` for body text and UI elements
- **Grain texture**: `.grain` CSS class — fixed noise overlay at z-9999, opacity 0.03, applied to page wrappers
- **Accent utilities**: `.accent-line` (48px × 2px black block), `.accent-dot` (6px black circle) — used as section markers
- **Color palette**: neutral-950 for dark sections, neutral-400/500 for muted text, neutral-100/200 for borders. No bright accent colors.
- **Section pattern**: Alternating white/neutral-50/neutral-950 sections separated by thin border-neutral-100 borders
- **Typography pattern**: Large serif italic headings with `<em>` in muted color for emphasis contrast
- **Heading/paragraph colors**: Use `color: inherit` globally — each section explicitly controls text color via Tailwind classes

## Site Structure & Navigation
Navigation: About | Products (dropdown) | Research | Docs | Community
Desktop CTA: "Get Started" → /developers
Products dropdown: Grysics, Neural Reality Network, WAVE Platform

## Routing
- **App Router** (`src/app/`): `/`, `/products/grysics`, `/products/nrn`
- **Pages Router** (`src/pages/`): `/about`, `/research`, `/technology`, `/developers`, `/safety`, `/use-cases`, `/careers`, `/blog`, `/contact`, `/docs`, `/community`, `/support`
- Global CSS is imported via `src/pages/_app.tsx` for Pages Router routes
- KaTeX CSS is imported in `src/app/layout.tsx` for App Router routes

## Important: Case-Sensitive Paths
- Product images are in `public/Products/` (capital P)
- Hardware logos are in `public/hardware-logos/`
- Logo files are in `public/Logo/`

## Key Pages
- **Homepage** (`src/app/page.tsx`): Vision hero, What We Do (4 pillars), Products (3 cards), Research (3 papers), Trust stats, Use Cases, CTA, Footer
- **About** (`src/pages/about.tsx`): Mission, problem statement, approach, philosophy
- **Products**: Grysics (verification engine), NRN (interpretable AI), WAVE (core platform)
- **Research** (`src/pages/research.tsx`): Papers on AI reliability, interpretability, optimization
- **Technology** (`src/pages/technology.tsx`): WAVE architecture, deployment pipeline, supported hardware
- **Developers** (`src/pages/developers.tsx`): SDK/CLI/API overview, getting started guide
- **Safety** (`src/pages/safety.tsx`): Reliability principles, verification approach
- **Use Cases** (`src/pages/use-cases.tsx`): Manufacturing, healthcare, robotics, autonomous, IoT, enterprise
- **Careers** (`src/pages/careers.tsx`): Open positions, company culture
- **Blog** (`src/pages/blog.tsx`): Technical articles and insights
- **Contact** (`src/pages/contact.tsx`): Contact form with inquiry types

## Key Directories
- `src/app/` — Next.js App Router pages and layouts
- `src/pages/` — Next.js Pages Router pages
- `src/components/` — Shared React components (header.tsx is primary nav)
- `src/visual-edits/` — Visual editing overlay system (VisualEditsMessenger)
- `src/lib/` — Utilities and shared logic
- `public/` — Static assets
