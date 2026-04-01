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

## Design System (Apple-style)
- **Design language**: Apple-inspired — generous spacing, cinematic dark sections, frosted glass elements, smooth spring animations, minimal borders, spatial separation
- **Display font**: `Instrument Serif` (italic) for HIGHLIGHTS ONLY (main hero headings, section titles) — loaded via `next/font/google`. CSS variable: `--font-instrument`. Do NOT apply globally to all headings.
- **Body font**: `Inter` for body text, UI elements, and most headings — loaded via `next/font/google`. CSS variable: `--font-inter`
- **Font loading**: Optimized with `next/font` (self-hosted, `display: swap`)
- **Section spacing**: `py-32 sm:py-44` for all major sections (generous Apple-style whitespace)
- **Card radius**: `rounded-3xl` on all major content cards, offering cards, hardware cards. Consistent across the site.
- **Dark cinematic heroes**: Used on Careers and EdgeAI pages — `bg-neutral-950` with blurred gradient glow overlay (`filter: blur(80px) saturate(1.5)`), radial gradient vignette, parallax scroll via `useScroll`/`useTransform`
- **Dark CTA sections**: `bg-neutral-950` with blurred gradient glow (purple/green), `text-white/40` for muted emphasis
- **Dark footer**: `bg-neutral-950 text-white`, `text-neutral-400` for links, `border-white/10` divider
- **Animations**: Custom easing `[0.25, 0.1, 0.25, 1]`, longer durations (0.7-1.2s), staggered delays. Spring physics on header and interactive elements.
- **Frosted glass**: Cookie banner and header use `backdrop-blur(24px) saturate(180%)` with `rgba(255,255,255,0.75)` background
- **Hover patterns**: Circle arrow buttons (`w-10-12 h-10-12 rounded-full bg-neutral-100 → bg-neutral-900`) on cards and list items. Cards use `group-hover:bg-white/75` overlay transition.
- **Typography pattern**: Large serif italic headings with `<em>` in muted color (`text-neutral-400` light, `text-white/40` dark) for emphasis contrast. Body text uses `font-light`.
- **Grain texture**: `.grain` CSS class — fixed noise overlay at z-9999, opacity 0.03
- **Gradient backgrounds**: Gradient images in `public/images/` used as card-level backgrounds only. Pattern: `bg-cover bg-center` + `bg-white/82 backdrop-blur-sm` overlay.
- **Header dark theme**: `<Header theme="dark" />` on pages with dark heroes. Nav links and mobile menu icon are theme-aware (white on dark, neutral on light).

## Header
- Apple-style glass pill navbar: `borderRadius: 50`, `backdropFilter: blur(24px) saturate(180%)`, `border: 1px solid rgba(255,255,255,0.45)`
- Starts fully expanded (maxWidth 1100) at top, shrinks to 820 on scroll down via spring animation
- Hides on scroll down, springs back on scroll up
- Nav items stagger in with spring physics
- Mobile drawer: glass rounded panel (`borderRadius: 28`) pinned right with matching frosted glass

## Organizational Hierarchy
- **Olyxee** = the company (brain/strategy) — defines vision, conducts research, builds core AI
- **OEB / EdgeAI** = sub-division (hands/execution) — deploys AI to edge devices (IoT, drones, robots, wearables, cameras, medical devices). Handles model deployment, optimization (quantization/pruning), fleet orchestration, monitoring & updates
- **Grysics** = verification engine for AI applications (chatbots, RAG, agents) — ensures reliability before and after deployment. Integrates with OEB for edge verification

## Site Structure & Navigation
Navigation: Products | Docs | Community | About | Contact
Desktop CTA: "Try Grysics"
- Grysics SDK: `pip install grysics`, CLI: `grysics` commands

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
- **Homepage** (`src/app/page.tsx`): Vision hero with video demo, Products (Grysics featured card + "Coming Soon" placeholder), Mission/Why It Matters (dark section with differentiators grid), Audience Pathways (Developer/Enterprise/Research blocks with CTAs), Use Cases (5-card grid: chatbot verification, RAG eval, agent testing, monitoring, compliance), CTA (dark section with Try Grysics/Docs/Sales buttons), Footer. Note: No fake stats, testimonials, or partner logos — Olyxee is a new company. EdgeAI/OEB removed from navbar and products.
- **About** (`src/pages/about.tsx`): Mission, problem statement, approach, philosophy
- **Olyxee Lab** (`src/pages/lab.tsx`): Research division — 6 research areas, recent publications, approach section, LinkedIn CTA
- **Products**: Grysics (verification engine with animated canvas network), NRN (interpretable AI), WAVE (core platform)
- **Docs** (`src/pages/docs.tsx`): OpenAI-style documentation with centered tab navbar. Tabs: Home, API (Overview, Quickstart, API Keys, Supported Platforms, REST API, Python SDK, CLI, Error Handling, Changelog, Rate Limits), Grysics (What is Grysics, Chatbots, RAG Pipelines, Agents, Testing & Verification, Monitoring, Early Access), Guides (Supported Platforms, Testing Strategies, Configuration)
- **Careers** (`src/pages/careers.tsx`): Internship listings with clickable apply modal that fires mailto:scofieldx911@gmail.com
- **Community** (`src/pages/community.tsx`): Hero banner image, channel cards with animated stats
- **Research** (`src/pages/research.tsx`): Papers on AI reliability, interpretability, optimization
- **Technology** (`src/pages/technology.tsx`): WAVE architecture, deployment pipeline, supported hardware

## SEO
- **Layout metadata** (`src/app/layout.tsx`): Full Next.js Metadata export with title template, description, keywords, OG, Twitter cards, robots directives, and icons
- **Pages Router SEO** (`src/components/SEO.tsx`): Reusable component with `<Head>` — title, description, canonical, OG, Twitter. Used on all Pages Router pages.
- **Product metadata**: `src/app/products/grysics/layout.tsx` and `nrn/layout.tsx` export page-specific Metadata
- **JSON-LD**: Organization structured data on homepage (`src/app/page.tsx`)
- **OG Image**: Dynamic edge-rendered OG image at `/api/og` (1200×630)
- **robots.txt**: `public/robots.txt` — allows all crawlers, references sitemap
- **sitemap.xml**: `public/sitemap.xml` — all 16 pages with priorities and change frequencies
- **_document.tsx**: `src/pages/_document.tsx` — favicon, apple-touch-icon, theme-color for Pages Router

## Key Directories
- `src/app/` — Next.js App Router pages and layouts
- `src/pages/` — Next.js Pages Router pages
- `src/components/` — Shared React components (header.tsx is primary nav)
- `src/layouts/DocsLayout.tsx` — Docs sidebar layout (OpenAI-style)
- `src/components/docs/sections/` — Legacy docs section components (Overview, API, Concepts, Guides, Resources, LiveAssistant)
- `src/visual-edits/` — Visual editing overlay system
- `src/lib/` — Utilities and shared logic
- `public/` — Static assets
