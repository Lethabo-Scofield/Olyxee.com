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
    label: "Link to relevant work",
    placeholder: "https://...",
    type: "url",
    required: true,
    inputMode: "url",
    hint: "Share a GitHub profile, portfolio, campaign or project.",
  },
  {
    id: "research_link",
    label: "Google Scholar, arXiv, or publications profile",
    placeholder: "https://scholar.google.com/citations?user=...",
    type: "url",
    required: false,
    inputMode: "url",
    hint: "Share publications if relevant to this role. This is optional.",
  },
  {
    id: "certifications",
    label: "Relevant certifications",
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
    label: "A project you led",
    placeholder: "What was the problem, what did you do, and what changed?",
    type: "textarea",
    required: true,
    hint: "A short, specific example is enough.",
  },
  {
    id: "essay_why",
    label: "Why this role at Olyxee?",
    placeholder: "What interests you? What would you focus on in your first six months?",
    type: "textarea",
    required: true,
  },
  {
    id: "essay_hard",
    label: "A difficult problem you solved",
    placeholder: "Share an example from the past year, the trade-offs and how you chose an approach.",
    type: "textarea",
    required: true,
  },
  {
    id: "references",
    label: "Two professional references",
    placeholder: "Names, how you worked together, and email addresses.",
    type: "textarea",
    required: true,
    hint: "We will ask for your permission before contacting them.",
  },
  {
    id: "salary",
    label: "Expected annual salary",
    placeholder: "e.g. ZAR 850,000 / USD 95,000",
    type: "text",
    required: true,
  },
  {
    id: "start_date",
    label: "When can you start?",
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
    detail: "Submit your application. We review it and contact you by email about next steps.",
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
    slug: "account-manager-executive",
    title: "Account Manager Executive",
    team: "Sales",
    location: REMOTE,
    type: "paid",
    description:
      "Own Olyxee's customer relationships from first conversation to long-term partnership. Win new accounts, grow existing ones, and bring what customers need back to the product and research teams.",
    level: "Senior · 5+ years in B2B technology sales or account management",
    compensation: "Top-of-band salary, significant equity, performance bonus, learning budget.",
    responsibilities: [
      "Own the full sales cycle for new accounts, from prospecting and qualification to proposal and close",
      "Manage and grow existing customer relationships, renewals, and expansion",
      "Run technical discovery and demos alongside the engineering team",
      "Build and maintain a clear, accurate pipeline and forecast",
      "Bring customer feedback to product and engineering, and help shape how Olyxee takes technology to market",
    ],
    requirements: [
      "5+ years selling or managing accounts for technical or B2B products, including at an early-stage company",
      "A record of closing and growing enterprise accounts, with results you can defend in numbers",
      "Comfortable explaining complex technology, including AI, to senior business and technical buyers",
      "Experience managing a pipeline end to end in a CRM, with honest forecasting",
      "Calm operator who can run several accounts and conversations at once without dropping balls",
    ],
    questions: PAID_QUESTIONS,
    process: PAID_PROCESS,
  },

  // ─── INTERNSHIPS (all unpaid) ─────────────────────────────────────────
  {
    slug: "applied-ai-research-intern",
    title: "Applied AI Research Intern",
    team: "Research",
    location: REMOTE,
    type: "internship",
    description:
      "Work alongside our researchers on intelligent systems, from reasoning and autonomy to evaluation, and learn how applied AI research moves from question to prototype.",
    responsibilities: [
      "Review literature and summarise what matters for a live research question",
      "Help design and run experiments on reasoning, autonomy, and agent behaviour",
      "Build small prototypes and evaluation setups to test ideas",
      "Write up methods and findings as clear research notes and internal reports",
    ],
    requirements: [
      "Strong Python and curiosity about machine learning, agents, or evaluation",
      "Some prior research or ML project experience (coursework, lab, or personal)",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "research-engineering-intern",
    title: "Research Engineering Intern",
    team: "Research",
    location: REMOTE,
    type: "internship",
    description:
      "Turn research ideas into working experiments. You will build the code, benchmarks, and tooling that make our research reproducible.",
    responsibilities: [
      "Implement experiments and prototypes from research ideas and papers",
      "Build benchmarks and evaluation harnesses for models and systems",
      "Write clean, reproducible research code with tracked configs and results",
      "Help automate experiment runs and compare results across model versions",
    ],
    requirements: [
      "Strong Python and software engineering fundamentals",
      "Some hands-on ML experience, such as training, fine-tuning, or evaluating models",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "applied-ai-engineering-intern",
    title: "Applied AI Engineering Intern",
    team: "Engineering & AI",
    location: REMOTE,
    type: "internship",
    description:
      "Build AI features that reach real users. Work on agents, model integrations, and retrieval systems, and learn what it takes to ship them reliably.",
    responsibilities: [
      "Help build AI applications, agents, and workflows on top of modern models",
      "Integrate models, tools, and data sources, including retrieval and context systems",
      "Contribute to evaluation pipelines that show whether a feature behaves correctly",
      "Support the path from prototype to production AI features",
    ],
    requirements: [
      "Strong Python or TypeScript and solid software fundamentals",
      "Some project experience with LLMs, agents, or retrieval (coursework, research, or personal)",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "product-engineering-intern",
    title: "Product Engineering Intern",
    team: "Engineering & AI",
    location: REMOTE,
    type: "internship",
    description:
      "Build customer-facing software across the stack, working with senior engineers on the products people use every day.",
    responsibilities: [
      "Ship features across frontend, backend, APIs, and databases",
      "Help build integrations and the infrastructure behind our products",
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
    slug: "data-intelligence-engineering-intern",
    title: "Data & Intelligence Engineering Intern",
    team: "Data & Intelligence",
    location: REMOTE,
    type: "internship",
    description:
      "Build the data foundations that intelligent systems depend on, from pipelines and datasets to structured knowledge and analytics.",
    responsibilities: [
      "Help design and operate data pipelines on real product data",
      "Build and maintain datasets and structured knowledge for AI systems",
      "Model data for analytics, model evaluation, and product features",
      "Contribute to data quality, lineage, and observability work",
    ],
    requirements: [
      "Strong SQL and Python",
      "Some exposure to modern data tooling (dbt, Airflow, Snowflake, BigQuery, or similar)",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "ai-evaluation-reliability-intern",
    title: "AI Evaluation & Reliability Intern",
    team: "Quality & Reliability",
    location: REMOTE,
    type: "internship",
    description:
      "Measure how well our AI systems and products actually work. You will design tests that catch regressions, hallucinations, and workflow failures before customers do.",
    responsibilities: [
      "Design evaluation suites for model behaviour, reasoning quality, and hallucinations",
      "Measure regressions and reliability across model, prompt, and product changes",
      "Build automated tests for APIs, services, and end-to-end workflows",
      "Report failures clearly and work with engineers to prevent them recurring",
    ],
    requirements: [
      "Strong analytical mindset, attention to detail, and some Python or scripting",
      "Familiarity with test automation or an interest in evaluating AI systems",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "ai-security-engineering-intern",
    title: "AI Security Engineering Intern",
    team: "Security",
    location: REMOTE,
    type: "internship",
    description:
      "Help secure Olyxee's products, infrastructure, and AI systems. Work with engineers on application security, access control, and authorised security testing.",
    responsibilities: [
      "Review code and features for security issues before they ship",
      "Contribute to vulnerability assessment, dependency audits, and remediation",
      "Help secure AI systems, including prompt injection and data exposure risks",
      "Support access control, secrets handling, monitoring, and secure development practice",
    ],
    requirements: [
      "Solid fundamentals in web security (OWASP Top 10, authentication, encryption)",
      "Some hands-on experience (CTFs, labs, coursework, bug bounties, or personal projects)",
      "Familiarity with at least one language such as Python, TypeScript, or Go",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "forward-deployed-ai-engineering-intern",
    title: "Forward Deployed AI Engineering Intern",
    team: "Engineering & AI",
    location: REMOTE,
    type: "internship",
    description:
      "Work close to customers and engineers to connect Olyxee technology to real customer environments, from technical discovery to deployment.",
    responsibilities: [
      "Help understand customer problems and turn them into technical requirements",
      "Support configuration, integrations, and enterprise deployments of Olyxee systems",
      "Troubleshoot implementation issues and document what you learn",
      "Pass clear technical feedback from customers back to the product and engineering teams",
    ],
    requirements: [
      "Solid programming fundamentals and comfort with APIs and integrations",
      "Strong communication and a curiosity about how customers use software",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "account-executive-intern",
    title: "Account Executive Intern",
    team: "Sales",
    location: REMOTE,
    type: "internship",
    description:
      "Learn how modern B2B technology companies win and manage customers. You will work across the sales cycle with the team that owns it.",
    responsibilities: [
      "Support prospecting and qualification of new customers",
      "Help prepare for customer conversations, demos, and proposals",
      "Maintain pipeline and customer records in the CRM",
      "Research target markets, accounts, and commercial opportunities",
    ],
    requirements: [
      "Strong writing, communication, and structured thinking",
      "Interest in enterprise software, AI, and how B2B deals are won",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "growth-gtm-intern",
    title: "Growth & GTM Intern",
    team: "Marketing",
    location: REMOTE,
    type: "internship",
    description:
      "Help take Olyxee's products to market. Work on positioning, campaigns, and growth experiments that bring in the right customers.",
    responsibilities: [
      "Support customer acquisition and demand generation campaigns",
      "Help sharpen positioning and messaging for products and launches",
      "Run small growth experiments and report what the results show",
      "Contribute market research, content, and go-to-market execution",
    ],
    requirements: [
      "Strong writing and communication skills",
      "Some experience with content, campaigns, or growth work (personal or professional)",
      "Interest in AI, technology, and B2B go-to-market",
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
