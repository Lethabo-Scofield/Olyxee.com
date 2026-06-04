# Olyxee - AI Infrastructure Company Website

## Overview
Company-level website for Olyxee, a reliability-first AI infrastructure company. Positioned like OpenAI/DeepMind/Anthropic — presenting vision, research, products, and credibility as a foundational AI company.

## Architecture
- **Framework**: Next.js 15 (App Router + Pages Router mixed)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion, Three.js, React Three Fiber
- **Database**: Replit-managed PostgreSQL via `pg` for the internship verification system

## Internship Verification System
- **Public verify page**: `/verify` — code input that returns intern details or "Invalid Code"
- **Admin gate**: entering the secret `admin@olyxee--hard` on `/verify` calls `POST /api/admin/auth`, which sets an httpOnly cookie (`olyxee_admin`) and redirects to `/admin`
- **Admin dashboard**: `/admin` — create new interns (auto-generates `OLX-XXXXXXXX` code if blank) and view existing records
- **API routes** (App Router, `src/app/api/`):
  - `GET /api/verify?code=...` — public lookup
  - `GET /api/interns` / `POST /api/interns` — admin-only (cookie-gated via `src/lib/admin-auth.ts`)
  - `POST/DELETE /api/admin/auth` — set/clear the admin cookie
- **DB**: `internships` table on Replit PostgreSQL (`DATABASE_URL`); pool reused across HMR via `src/lib/db.ts`
- **Entry point on site**: "Verify internship" button on the careers page hero
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
- **Section spacing**: `py-20 sm:py-32 lg:py-40` for major sections (mobile-first responsive whitespace)
- **Container padding**: `px-4 sm:px-8 lg:px-12` for all section containers
- **Heading sizes**: `text-3xl sm:text-5xl lg:text-6xl` for h2, `text-base sm:text-xl` for subtitles
- **Grid breakpoints**: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` pattern for card grids
- **Card padding**: `p-6 sm:p-10` or `p-7 sm:p-12` for responsive card interiors
- **Card radius**: `rounded-3xl` on all major content cards, offering cards, hardware cards. Consistent across the site.
- **Dark cinematic heroes**: Used on Careers and EdgeAI pages — `bg-neutral-950` with blurred gradient glow overlay (`filter: blur(80px) saturate(1.5)`), radial gradient vignette, parallax scroll via `useScroll`/`useTransform`
- **Dark CTA sections**: `bg-neutral-950` with blurred gradient glow (purple/green), `text-white/40` for muted emphasis
- **Dark footer**: `bg-neutral-950 text-white`, `text-neutral-400` for links, `border-white/10` divider
- **Animations**: Custom easing `[0.25, 0.1, 0.25, 1]`, longer durations (0.7-1.2s), staggered delays. Spring physics on header and interactive elements.
- **Frosted glass**: Cookie banner and header use `backdrop-blur(24px) saturate(180%)` with `rgba(255,255,255,0.75)` background
- **Hover patterns**: Circle arrow buttons (`w-10-12 h-10-12 rounded-full bg-neutral-100 → bg-neutral-900`) on cards and list items. Cards use `group-hover:bg-white/75` overlay transition.
- **Typography pattern**: Large serif italic headings with `<em>` in blue (`text-blue-400`/`text-blue-500`) or orange (`text-orange-400`) for emphasis contrast. Body text uses `font-light`.
- **Icon style**: Clean monochrome icons (`text-neutral-400` or `text-neutral-600`). Small inline icons, no colored tint boxes. Restraint over decoration.
- **Icon containers (light bg)**: Simple `rounded-xl bg-neutral-100` with `text-neutral-600` icon. No color tints.
- **Icon containers (dark bg)**: Simple `rounded-xl bg-white/[0.06]` with `text-white/40` icon.
- **Card backgrounds (bento grid only)**: Large showcase cards use gradient images from `public/images/gradient-*.png` at moderate opacity. Small info cards use NO gradient backgrounds.
- **Grain texture**: `.grain` CSS class — fixed noise overlay at z-9999, opacity 0.03
- **Gradient images available**: gradient-blue-pink, gradient-orange-pink, gradient-yellow-green, gradient-purple, gradient-pastel, gradient-blue, gradient-orange-purple, gradient-abstract-blue, gradient-painted, gradient-pink-cyan, gradient-yellow-blue
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
- **Ordo** = verification engine for AI applications (chatbots, RAG, agents) — ensures reliability before and after deployment. Integrates with OEB for edge verification

## Site Structure & Navigation
Navigation: Products | Research | Community | About | Contact
Desktop CTA: "Get in Touch"
- "Products" links to `/products` (separate page, not a scroll anchor)
- Ordo is NOT yet released — positioned as "Coming Soon" throughout the site
- No fake stats, testimonials, or partner logos — Olyxee is a new company

## Routing
- **App Router** (`src/app/`): `/`, `/products/ordo`, `/admin`, `/verify`, `/stories/accounting`, `/stories/automation`, `/stories/freightshift`. (Note: there is NO `/products/nrn` route.)
- **Pages Router** (`src/pages/`): `/products`, `/about`, `/lab`, `/research`, `/research/cortex`, `/technology`, `/developers`, `/safety`, `/use-cases`, `/careers`, `/careers/internships`, `/careers/[slug]`, `/blog`, `/contact`, `/docs`, `/community`, `/support`, `/enterprise`, `/enterprise/robotics`, `/solutions/logistics`, `/document-integrity`, `/case-studies`, `/stories`, `/signup`, `/brand`, `/status`, `/security`, `/compliance`, `/privacy`, `/terms`, `/cookie-policy`
- `/verify` has a `src/app/verify/layout.tsx` exporting `metadata` with `robots: { index: false }` (also disallowed in robots.txt)
- Global CSS is imported via `src/pages/_app.tsx` for Pages Router routes
- KaTeX CSS is imported in `src/app/layout.tsx` for App Router routes

## Important: Case-Sensitive Paths
- Product images are in `public/Products/` (capital P)
- Hardware logos are in `public/hardware-logos/`
- Logo files are in `public/Logo/`
- Community hero image: `public/images/Community presentation.png`

## Key Pages
- **Homepage** (`src/app/page.tsx`): Company-focused landing page ("use client"). Cinematic full-viewport hero with parallax scrolling and a "Try Courier Loop" button (links to `https://logistics.olyxee.com/`) overlaid on the demo video. Section order: HeroSection, LogoStrip, ResearchAreas, ImageShowcase, CourierLoopSection (Olyxee Logistics / Courier Loop, order-status updates), TogentSection (cost control / context optimization, "Coming Soon"), StoriesSection, CTASection. `OrdoSection` and `IntegrationSection` components are retained in the file but NOT rendered in the main flow (kept for reuse). No fake stats, testimonials, or partner logos.
- **Products** (`src/pages/products.tsx`): Dedicated products page with hero, Courier Loop / logistics section, Togent section, and Ordo "Coming Soon" section with terminal mockup and verification score chart.
- **About** (`src/pages/about.tsx`): Mission, problem statement, approach, philosophy
- **Olyxee Lab** (`src/pages/lab.tsx`): Research division — 6 research areas, recent publications, approach section, LinkedIn CTA
- **Product lineup**: Addup (addup.olyxee.com), Courier Loop / Olyxee Logistics (logistics.olyxee.com, order-status updates), Togent (cost control & context optimization for AI agents — Cursor/Claude/Codex/copilots, "Coming Soon"), Ordo (verification engine, "Coming Soon"), Cortex (research, `/research/cortex`)
- **Docs** (`src/pages/docs.tsx`): OpenAI-style documentation with centered tab navbar. Tabs: Home, API (Overview, Quickstart, API Keys, Supported Platforms, REST API, Python SDK, CLI, Error Handling, Changelog, Rate Limits), Ordo (What is Ordo, Chatbots, RAG Pipelines, Agents, Testing & Verification, Monitoring, Early Access), Guides (Supported Platforms, Testing Strategies, Configuration)
- **Careers** (`src/pages/careers.tsx`): Internship listings with clickable apply modal that fires mailto:scofieldx911@gmail.com
- **Community** (`src/pages/community.tsx`): Hero banner image, channel cards with animated stats
- **Research** (`src/pages/research.tsx`): Papers on AI reliability, interpretability, optimization
- **Technology** (`src/pages/technology.tsx`): WAVE architecture, deployment pipeline, supported hardware

## SEO & Viewport
- **Viewport**: App Router uses `export const viewport` in `src/app/layout.tsx`; Pages Router uses `<meta name="viewport">` via `_app.tsx` `<Head>`
- **Layout metadata** (`src/app/layout.tsx`): Full Next.js Metadata export with title template ("Olyxee | Research and Infrastructure for AI"), description, 18 keywords, OG, Twitter cards, robots directives, and icons
- **Pages Router SEO** (`src/components/SEO.tsx`): Reusable component with `<Head>` — title, description, canonical, OG (with locale and image alt), Twitter. Supports optional `jsonLd` prop for page-specific structured data. Used on all Pages Router pages.
- **Pages Router defaults** (`src/pages/_app.tsx`): Auto-canonical URLs, robots meta, og:site_name, twitter:card/creator fallbacks
- **Product metadata**: `src/app/products/ordo/layout.tsx` exports page-specific Metadata (Ordo). There is no NRN layout/route.
- **JSON-LD**: Organization + WebSite structured data in layout.tsx; Organization on homepage; SoftwareApplication (Ordo) on products page
- **OG Image**: Dynamic edge-rendered OG image at `/api/og` (1200×630)
- **robots.txt**: `public/robots.txt` — allows all crawlers (including AI/LLM crawlers), disallows /api/, /_next/, /admin, /verify; references sitemap
- **Sitemap**: Generated dynamically by `src/app/sitemap.ts` (served at `/sitemap.xml`). It is the single source of truth — the old static `public/sitemap.xml` was removed to avoid conflicts and ghost pages. Lists only real, indexable routes (no /admin, /verify, no /products/nrn).
- **Heading hierarchy**: Every page has exactly one `<h1>` in its hero section
- **_document.tsx**: `src/pages/_document.tsx` — favicon, apple-touch-icon, theme-color, format-detection for Pages Router
- **Global CSS**: `overflow-x: hidden` on html/body, `-webkit-text-size-adjust: 100%`, tap-highlight transparent
- **Image best practice**: All Next.js Image components with CSS size overrides use explicit `style={{ width, height }}` to prevent aspect ratio warnings

## Mobile Responsiveness
- **Hero text**: `text-[2.25rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]` for readable mobile headings
- **Products gallery**: Uses `aspect-[4/3] sm:aspect-[16/9]` for better mobile viewing; scroll height at `70vh` per slide
- **About banner image**: `aspect-[16/9] sm:aspect-[21/9]` prevents ultra-thin strip on mobile
- **Blog category filters**: Stack vertically on mobile via `flex-col sm:flex-row`
- **Research papers**: Author/link rows stack on mobile via `flex-col sm:flex-row`
- **Signup/Contact forms**: Gap reduced to `gap-12 lg:gap-20` so form is closer to info on mobile
- **Cookie banner**: Tighter padding and smaller offset on mobile (`left-3 right-3 sm:left-6 sm:right-6`)
- **Approach section**: No inner padding on mobile, padding only at `sm:` breakpoint up
- **Technology cards**: `p-6 sm:p-10` for comfortable reading on small screens
- **Em dashes**: All em dashes (`—`) removed sitewide; replaced with commas, colons, or rephrased

## Key Directories
- `src/app/` — Next.js App Router pages and layouts
- `src/pages/` — Next.js Pages Router pages
- `src/components/` — Shared React components (header.tsx is primary nav)
- `src/layouts/DocsLayout.tsx` — Docs sidebar layout (OpenAI-style)
- `src/components/docs/sections/` — Legacy docs section components (Overview, API, Concepts, Guides, Resources, LiveAssistant)
- `src/visual-edits/` — Visual editing overlay system
- `src/lib/` — Utilities and shared logic
- `public/` — Static assets
