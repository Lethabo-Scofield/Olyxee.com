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
- **Accent utilities**: `.accent-line` (48px × 2px black block), `.accent-dot` (6px blue circle) — used as section markers
- **Color palette**: neutral-950 for dark sections, neutral-400/500 for muted text, neutral-100/200 for borders. Blue (#3b82f6) used sparingly for interactive hover states, active nav items, and clickable highlights.
- **Section pattern**: Alternating white/neutral-50/neutral-950 sections separated by thin border-neutral-100 borders
- **Typography pattern**: Large serif italic headings with `<em>` in muted color for emphasis contrast
- **Heading/paragraph colors**: Use `color: inherit` globally — each section explicitly controls text color via Tailwind classes
- **Interactive blue**: Nav links hover blue, footer links hover blue, "Apply →" on careers is blue, community "Join Now" hovers blue. Blue is never used for static text or backgrounds — only on interaction.

## Header
- Apple-style glass pill navbar: `borderRadius: 50`, `backdropFilter: blur(24px) saturate(180%)`, `border: 1px solid rgba(255,255,255,0.45)`
- Starts fully expanded (maxWidth 1100) at top, shrinks to 820 on scroll down via spring animation
- Hides on scroll down, springs back on scroll up
- Nav items stagger in with spring physics
- Mobile drawer: glass rounded panel (`borderRadius: 28`) pinned right with matching frosted glass

## Site Structure & Navigation
Navigation: About | Grysics | Research | Docs | Community
Desktop CTA: "Get Started" → /developers
- "Research" in nav links to /lab (Olyxee Lab page), not /research
- Olyxee Lab LinkedIn: https://www.linkedin.com/company/olyxeelab/

## Routing
- **App Router** (`src/app/`): `/`, `/products/grysics`, `/products/nrn`
- **Pages Router** (`src/pages/`): `/about`, `/lab`, `/research`, `/technology`, `/developers`, `/safety`, `/use-cases`, `/careers`, `/blog`, `/contact`, `/docs`, `/community`, `/support`
- Global CSS is imported via `src/pages/_app.tsx` for Pages Router routes
- KaTeX CSS is imported in `src/app/layout.tsx` for App Router routes

## Important: Case-Sensitive Paths
- Product images are in `public/Products/` (capital P)
- Hardware logos are in `public/hardware-logos/`
- Logo files are in `public/Logo/`
- Community hero image: `public/images/Community presentation.png`

## Key Pages
- **Homepage** (`src/app/page.tsx`): Vision hero, What We Do (4 pillars), Products (3 cards), Research (3 papers), Trust stats, Use Cases, CTA, Footer
- **About** (`src/pages/about.tsx`): Mission, problem statement, approach, philosophy
- **Olyxee Lab** (`src/pages/lab.tsx`): Research division — 6 research areas, recent publications, approach section, LinkedIn CTA
- **Products**: Grysics (verification engine with animated canvas network), NRN (interpretable AI), WAVE (core platform)
- **Docs** (`src/pages/docs.tsx`): OpenAI-style documentation with sidebar. Sections: Get Started (Overview, Quickstart, Supported Models), Grysics (Overview, Verification Engine, Deployment, Monitoring), API (Reference, Python SDK, CLI, Error Handling), Guides (Edge Devices, Optimization, Configuration), Resources (Changelog, Rate Limits)
- **Careers** (`src/pages/careers.tsx`): Internship listings with clickable apply modal that fires mailto:scofieldx911@gmail.com
- **Community** (`src/pages/community.tsx`): Hero banner image, channel cards with animated stats
- **Research** (`src/pages/research.tsx`): Papers on AI reliability, interpretability, optimization
- **Technology** (`src/pages/technology.tsx`): WAVE architecture, deployment pipeline, supported hardware

## Key Directories
- `src/app/` — Next.js App Router pages and layouts
- `src/pages/` — Next.js Pages Router pages
- `src/components/` — Shared React components (header.tsx is primary nav)
- `src/layouts/DocsLayout.tsx` — Docs sidebar layout (OpenAI-style)
- `src/components/docs/sections/` — Legacy docs section components (Overview, API, Concepts, Guides, Resources, LiveAssistant)
- `src/visual-edits/` — Visual editing overlay system
- `src/lib/` — Utilities and shared logic
- `public/` — Static assets
