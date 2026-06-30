export type RoleType = "internship" | "paid";

export type QuestionType = "text" | "textarea" | "url" | "select";

export interface Question {
  id: string;
  label: string;
  placeholder?: string;
  type: QuestionType;
  required?: boolean;
  options?: string[];
  inputMode?: "text" | "email" | "url" | "numeric" | "tel";
  autoComplete?: string;
  hint?: string;
}

export interface Role {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: RoleType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  questions?: Question[];
  compensation?: string;
  level?: string;
  process?: { title: string; detail: string }[];
}

const REMOTE = "Remote";
const HYBRID = "Hybrid · Johannesburg";

const PAID_QUESTIONS: Question[] = [
  {
    id: "phone",
    label: "Phone number",
    placeholder: "+27 ...",
    type: "text",
    required: true,
    inputMode: "tel",
    autoComplete: "tel",
  },
  {
    id: "location",
    label: "Where are you based?",
    placeholder: "City, country",
    type: "text",
    required: true,
    autoComplete: "address-level2",
  },
  {
    id: "linkedin_link",
    label: "LinkedIn profile",
    placeholder: "https://linkedin.com/in/...",
    type: "url",
    required: true,
    inputMode: "url",
  },
  {
    id: "portfolio_link",
    label: "GitHub, portfolio, or other relevant work",
    placeholder: "https://...",
    type: "url",
    required: true,
    inputMode: "url",
  },
  {
    id: "research_link",
    label: "Google Scholar, arXiv, or publications profile",
    placeholder: "https://scholar.google.com/citations?user=...",
    type: "url",
    required: false,
    inputMode: "url",
    hint: "Required for research, ML, and data science roles. Leave blank if it does not apply.",
  },
  {
    id: "certifications",
    label: "Relevant certifications or credentials",
    placeholder: "e.g. AWS Professional, CKA, OSCP, CISSP, CFA",
    type: "textarea",
    required: false,
    hint: "List any professional certifications relevant to this role.",
  },
  {
    id: "cv_link",
    label: "Link to your CV",
    placeholder: "Google Drive, Dropbox, or personal site (shared, view access)",
    type: "url",
    required: true,
    inputMode: "url",
    hint: "Make sure the link is publicly viewable.",
  },
  {
    id: "current_role",
    label: "Current role and company",
    placeholder: "e.g. Senior Engineer, Acme Corp",
    type: "text",
    required: true,
  },
  {
    id: "years_experience",
    label: "Years of relevant experience",
    placeholder: "e.g. 6",
    type: "text",
    required: true,
    inputMode: "numeric",
  },
  {
    id: "essay_impact",
    label: "Describe a project you led end to end that you are most proud of",
    placeholder: "What was the problem, what did you do, what was the measurable outcome, and what would you do differently? Aim for 300 to 500 words.",
    type: "textarea",
    required: true,
    hint: "Be specific. Vague answers are the most common reason we say no.",
  },
  {
    id: "essay_why",
    label: "Why this role and why Olyxee?",
    placeholder: "What draws you to this exact role, and what would you want to own here in your first 6 months? 200 to 400 words.",
    type: "textarea",
    required: true,
  },
  {
    id: "essay_hard",
    label: "Describe the hardest technical or strategic problem you have solved in the last 12 months",
    placeholder: "Walk us through the trade-offs, what you tried, and how you decided. 200 to 400 words.",
    type: "textarea",
    required: true,
  },
  {
    id: "references",
    label: "Two professional references (name, relationship, email)",
    placeholder: "We will not contact them without your permission.",
    type: "textarea",
    required: true,
  },
  {
    id: "salary",
    label: "Salary expectation (annual, in your local currency)",
    placeholder: "e.g. ZAR 850,000 / USD 95,000",
    type: "text",
    required: true,
  },
  {
    id: "start_date",
    label: "Earliest start date",
    placeholder: "e.g. 1 August 2026, or 4 weeks notice",
    type: "text",
    required: true,
  },
  {
    id: "work_auth",
    label: "Work authorization",
    type: "select",
    required: true,
    options: [
      "I have the right to work in South Africa",
      "I will need visa sponsorship",
      "I will work remotely from another country",
    ],
  },
];

const PAID_PROCESS: { title: string; detail: string }[] = [
  {
    title: "Written application",
    detail: "Submit the full application below. We read every word. Expect a response within 14 days, even if it is a no.",
  },
  {
    title: "Founder screen",
    detail: "A 30 minute conversation with the founder. We talk about your trajectory, your work, and how you think.",
  },
  {
    title: "Take-home exercise",
    detail: "A paid, role-specific exercise that takes 6 to 10 hours over a week. We pay market rate for your time on this.",
  },
  {
    title: "Technical deep dive",
    detail: "Two hours with two people from the team. We go deep on your exercise, your past work, and a live problem in your domain.",
  },
  {
    title: "Final interviews",
    detail: "Three to four conversations with people you would work with most closely. We make sure both sides have everything they need.",
  },
  {
    title: "References and offer",
    detail: "We contact your references, then move quickly to a written offer with compensation, equity, and start details spelled out.",
  },
];

export const roles: Role[] = [
  // ─── PAID ROLES ──────────────────────────────────────────────────────
  {
    slug: "research-scientist-ai",
    title: "Research Scientist, AI",
    team: "Research",
    location: HYBRID,
    type: "paid",
    description:
      "Lead the research agenda behind Olyxee Document Integrity: verification, evaluation, and reliability for AI systems that take action in production.",
    level: "Staff · 8+ years of applied research",
    compensation: "Top-of-band salary, significant equity, performance bonus, conference and learning budget.",
    responsibilities: [
      "Set and own the multi-year research agenda on model reasoning, verification, and reliability",
      "Design experiments, build evaluation harnesses, and publish work the field builds on",
      "Translate research into product capabilities the engineering team can ship",
      "Represent Olyxee in the research community through papers, talks, and collaborations",
      "Mentor researchers and engineers and raise the technical bar across the company",
    ],
    requirements: [
      "PhD in CS, ML, or a closely related field, plus 8+ years of research beyond your doctorate",
      "Sustained first-author record at top venues (NeurIPS, ICML, ICLR, ACL) with a public Google Scholar profile",
      "Demonstrable citation impact, with work others build on and cite",
      "Expert-level Python and modern ML frameworks (PyTorch, JAX); you write research- and production-grade code",
      "Experience setting and owning a research agenda end to end, not just executing one",
      "Patents, widely used open-source, or shipped research that reached real users",
      "Exceptional written communication; you can make complex ideas land for any audience",
    ],
    questions: PAID_QUESTIONS,
    process: PAID_PROCESS,
  },
  {
    slug: "senior-software-engineer",
    title: "Senior Software Engineer",
    team: "Engineering",
    location: REMOTE,
    type: "paid",
    description:
      "Design, build, and own the product surfaces and backend services across Orgni, the operational intelligence platform that powers financial operations, operational workflows, and document integrity. Set the engineering bar.",
    level: "Staff · 8+ years of production engineering",
    compensation: "Top-of-band salary, significant equity, performance bonus, learning budget.",
    responsibilities: [
      "Own end to end design and delivery of major product surfaces or services",
      "Set the engineering standard for quality, performance, and observability",
      "Mentor other engineers and raise the bar through code review and architecture",
      "Collaborate closely with research, product, and design to ship work that matters",
    ],
    requirements: [
      "8+ years shipping and owning production systems at scale (TypeScript, Python, Go, or Rust)",
      "Deep systems expertise: distributed systems, data-intensive services, performance, and reliability",
      "Track record of architecting systems that served real production traffic and survived it",
      "Professional cloud or systems certifications are a strong plus (AWS/GCP Professional, CKA)",
      "A public body of work we can review: significant open-source, technical writing, or conference talks",
      "High writing standard; you can ship a design doc that ends a meeting",
      "Comfortable in early-stage ambiguity and small, senior teams",
    ],
    questions: PAID_QUESTIONS,
    process: PAID_PROCESS,
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    team: "Marketing",
    location: REMOTE,
    type: "paid",
    description:
      "Own how the world understands Olyxee. Set positioning, run launches, and build the channels that grow our audience and pipeline.",
    level: "Senior · 7+ years in B2B or technical marketing",
    compensation: "Top-of-band salary, significant equity, performance bonus, learning budget.",
    responsibilities: [
      "Own positioning, messaging, and narrative across product and brand surfaces",
      "Plan and ship launches for new products, features, and research releases",
      "Run content, social, email, and paid programs that grow the right audience",
      "Build the marketing function from first principles, hire and lead over time",
    ],
    requirements: [
      "7+ years marketing technical or B2B products, including at an early-stage company",
      "A portfolio of launches and campaigns you owned end to end with measurable pipeline impact",
      "Proven ownership of both brand and demand, with outcomes you can defend in numbers",
      "Experience building and leading a marketing team, not just executing as an individual",
      "Comfortable being measured on pipeline and brand outcomes, not vanity metrics",
      "Calm operator who can run multiple workstreams without dropping balls",
    ],
    questions: PAID_QUESTIONS,
    process: PAID_PROCESS,
  },
  {
    slug: "staff-machine-learning-engineer",
    title: "Staff Machine Learning Engineer",
    team: "Engineering & AI",
    location: REMOTE,
    type: "paid",
    description:
      "Own the models behind Orgni and its operational workflows, financial operations, and document integrity capabilities end to end: training, evaluation, and reliable serving at production scale.",
    level: "Staff · 8+ years building ML systems in production",
    compensation: "Top-of-band salary, significant equity, performance bonus, compute and learning budget.",
    responsibilities: [
      "Own the full lifecycle of production models: data, training, evaluation, and serving",
      "Push the reliability, latency, and cost of model inference at scale",
      "Set the standard for how the team evaluates and monitors model behavior",
      "Partner with research to move new methods into shipped product",
      "Mentor engineers and raise the ML engineering bar across the company",
    ],
    requirements: [
      "8+ years building and operating ML systems in production, with 3+ at a senior or staff level",
      "First-author publications or a public Google Scholar / arXiv profile we can review",
      "Expert Python and deep experience with PyTorch or JAX on real training and serving workloads",
      "Proven track record deploying large models with strict latency, cost, and reliability targets",
      "Relevant certifications are a plus (AWS/GCP ML specialty, NVIDIA DLI, or equivalent)",
      "Strong systems fundamentals; you can own the path from notebook to production service",
      "Exceptional written communication and a body of public work (open-source, papers, or talks)",
    ],
    questions: PAID_QUESTIONS,
    process: PAID_PROCESS,
  },

  // ─── INTERNSHIPS (all unpaid) ─────────────────────────────────────────
  {
    slug: "software-engineering-intern",
    title: "Software Engineering Intern",
    team: "Engineering & AI",
    location: REMOTE,
    type: "internship",
    description:
      "Build product surfaces and backend services across Orgni and its operational workflows, financial operations, and document integrity capabilities alongside senior engineers.",
    responsibilities: [
      "Ship features end to end across frontend, backend, and APIs",
      "Write tests, review code, and help raise the engineering bar",
      "Pair with senior engineers on real production systems",
    ],
    requirements: [
      "Comfortable in a modern stack (TypeScript, React, Node, Python, or Go)",
      "Some prior project experience (coursework, open source, or personal)",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "ai-engineering-intern",
    title: "AI Engineering Intern",
    team: "Engineering & AI",
    location: REMOTE,
    type: "internship",
    description:
      "Build AI features end to end across Orgni and its operational workflows, financial operations, and document integrity capabilities, from prompt and model integration through reliable product surfaces.",
    responsibilities: [
      "Help build AI-powered features that reach real users",
      "Integrate models, tools, and data into reliable workflows",
      "Contribute to evaluation and monitoring so features behave correctly",
    ],
    requirements: [
      "Strong Python and software fundamentals, plus curiosity about applied AI",
      "Some prior project experience with LLMs, agents, or ML (coursework, research, or personal)",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "research-analyst-intern",
    title: "Research Analyst Intern",
    team: "Research",
    location: REMOTE,
    type: "internship",
    description:
      "Work alongside our researchers on verification, evaluation, and reliability for AI systems behind Olyxee Document Integrity.",
    responsibilities: [
      "Help design experiments and build evaluation harnesses on real research questions",
      "Read, reproduce, and extend recent work with the team",
      "Help turn findings into clear write-ups, notebooks, and internal reports",
    ],
    requirements: [
      "Strong Python and curiosity about ML, evaluation, or reliability research",
      "Some prior research or ML project experience (coursework, lab, or personal)",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "data-engineering-intern",
    title: "Data Engineering Intern",
    team: "Data & Intelligence",
    location: REMOTE,
    type: "internship",
    description:
      "Help build the data pipelines that feed Orgni's financial operations, document integrity, and our evaluation systems.",
    responsibilities: [
      "Help design and operate ETL/ELT pipelines on real product data",
      "Model data for analytics, ML training, and product features",
      "Contribute to data quality, lineage, and observability work",
    ],
    requirements: [
      "Strong SQL and Python",
      "Some exposure to modern data tooling (dbt, Airflow, Snowflake, BigQuery, or similar)",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "qa-engineering-intern",
    title: "QA Engineering Intern",
    team: "Quality & Reliability",
    location: REMOTE,
    type: "internship",
    description:
      "Help own the quality bar across Olyxee's products with automated testing.",
    responsibilities: [
      "Help build and maintain automated test suites across services and UI",
      "Contribute to regression, integration, and release testing",
      "Pair with engineers to prevent issues, not just catch them",
    ],
    requirements: [
      "Familiarity with modern test automation frameworks",
      "Strong analytical mindset and attention to detail",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "product-management-intern",
    title: "Product Management Intern",
    team: "Product & Design",
    location: REMOTE,
    type: "internship",
    description:
      "Support a product surface across Orgni's operational workflows, financial operations, and document integrity capabilities, or Order Loop.",
    responsibilities: [
      "Help translate customer problems into clear specs and shipped product",
      "Coordinate with engineering, research, and design on delivery",
      "Help with customer discovery and competitive research",
    ],
    requirements: [
      "Strong writing and structured thinking",
      "Some exposure to technical or enterprise products",
      "Currently studying or recently graduated",
    ],
  },
];

export const teams = Array.from(new Set(roles.map((r) => r.team)));

export function findRoleByTitle(title: string): Role | undefined {
  const t = title.trim();
  return roles.find((r) => r.title === t);
}

export function findRoleBySlug(slug: string): Role | undefined {
  const s = slug.trim().toLowerCase();
  return roles.find((r) => r.slug === s);
}

export const paidRoles = roles.filter((r) => r.type === "paid");
export const internshipRoles = roles.filter((r) => r.type === "internship");

const SYNONYMS: Record<string, string[]> = {
  frontend: ["frontend", "front-end", "ui", "ux", "interface", "react", "next", "nextjs", "typescript", "javascript", "css", "tailwind", "design", "interaction", "figma", "product design", "web"],
  backend: ["backend", "back-end", "server", "api", "service", "services", "node", "python", "go", "golang", "rust", "java", "distributed", "systems", "microservices", "database", "postgres", "sql"],
  fullstack: ["fullstack", "full-stack", "frontend", "backend", "engineer", "software", "typescript", "node", "react", "api"],
  mobile: ["mobile", "ios", "android", "swift", "kotlin", "react native", "flutter", "app"],
  design: ["design", "designer", "ui", "ux", "figma", "prototype", "interaction", "visual", "product design", "design system", "brand"],
  product: ["product", "pm", "product manager", "specs", "roadmap", "discovery", "customer", "feature"],
  ml: ["ml", "machine learning", "ai", "model", "models", "pytorch", "jax", "tensorflow", "training", "fine-tune", "fine tune", "deep learning", "neural", "llm", "transformer"],
  ai: ["ai", "ml", "machine learning", "llm", "agent", "agentic", "rag", "model", "models", "research", "evaluation", "cortex"],
  research: ["research", "scientist", "phd", "publication", "paper", "experiment", "neurips", "icml", "iclr"],
  data: ["data", "analytics", "analyst", "sql", "etl", "elt", "pipeline", "dbt", "airflow", "snowflake", "bigquery", "warehouse", "dashboard", "metrics"],
  devops: ["devops", "platform", "infrastructure", "infra", "cloud", "docker", "kubernetes", "k8s", "terraform", "ci", "cd", "ci/cd", "aws", "gcp", "azure", "sre", "reliability", "observability"],
  cloud: ["cloud", "aws", "gcp", "azure", "infrastructure", "infra", "terraform", "kubernetes", "devops"],
  security: ["security", "infosec", "appsec", "vulnerability", "penetration", "compliance", "auth", "encryption"],
  qa: ["qa", "quality", "test", "testing", "automation", "regression", "integration", "reliability"],
  marketing: ["marketing", "brand", "growth", "content", "social", "launch", "positioning", "messaging", "campaign", "seo"],
  sales: ["sales", "account", "revenue", "pipeline", "enterprise", "customer", "discovery", "b2b"],
  bd: ["bd", "business development", "partnerships", "alliances", "partner", "go-to-market", "gtm"],
  operations: ["operations", "ops", "delivery", "project", "program", "coordination", "logistics", "vendor", "scheduling", "admin"],
  hr: ["hr", "people", "recruiting", "talent", "hiring", "onboarding", "culture"],
  finance: ["finance", "accounting", "reconciliation", "addup", "financial", "audit", "ledger"],
  solutions: ["solutions", "se", "sales engineer", "implementation", "deploy", "integration", "onboarding", "enterprise"],
  support: ["support", "customer success", "cs", "help", "service"],
  intern: ["intern", "internship", "student", "graduate"],
  senior: ["senior", "staff", "lead", "principal"],
  remote: ["remote", "anywhere"],
};

function expandTokens(tokens: string[]): Set<string> {
  const out = new Set<string>();
  for (const t of tokens) {
    if (!t) continue;
    out.add(t);
    if (SYNONYMS[t]) for (const s of SYNONYMS[t]) out.add(s);
    for (const [key, list] of Object.entries(SYNONYMS)) {
      if (list.includes(t)) {
        out.add(key);
        for (const s of list) out.add(s);
      }
    }
  }
  return out;
}

function roleHaystack(r: Role) {
  return {
    title: r.title.toLowerCase(),
    team: r.team.toLowerCase(),
    body: [
      r.description,
      r.location,
      r.level ?? "",
      ...(r.responsibilities ?? []),
      ...(r.requirements ?? []),
    ].join(" ").toLowerCase(),
  };
}

export function searchRoles(query: string, source: Role[] = roles): Role[] {
  const q = query.trim().toLowerCase();
  if (!q) return source;
  const rawTokens = q.split(/[^a-z0-9+#]+/).filter(Boolean);
  if (rawTokens.length === 0) return source;
  const expanded = expandTokens(rawTokens);

  const scored = source.map((r) => {
    const h = roleHaystack(r);
    let score = 0;
    if (h.title.includes(q)) score += 50;
    if (h.team.includes(q)) score += 30;
    if (h.body.includes(q)) score += 20;
    for (const tok of rawTokens) {
      if (h.title.includes(tok)) score += 12;
      if (h.team.includes(tok)) score += 8;
      if (h.body.includes(tok)) score += 5;
    }
    for (const tok of expanded) {
      if (rawTokens.includes(tok)) continue;
      if (h.title.includes(tok)) score += 6;
      if (h.team.includes(tok)) score += 4;
      if (h.body.includes(tok)) score += 2;
    }
    return { r, score };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.r);
}
