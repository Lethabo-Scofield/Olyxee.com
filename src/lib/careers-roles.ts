export type RoleType = "internship" | "paid";

export type QuestionType = "text" | "textarea" | "url" | "select";

export interface Question {
  id: string;
  label: string;
  placeholder?: string;
  type: QuestionType;
  required?: boolean;
  options?: string[];
  inputMode?: "text" | "email" | "url" | "numeric";
  autoComplete?: string;
}

export interface Role {
  title: string;
  team: string;
  location: string;
  type: RoleType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  questions?: Question[];
}

const REMOTE = "Remote";
const HYBRID = "Hybrid · Johannesburg";

const STANDARD_QUESTIONS: Question[] = [
  {
    id: "linkedin_link",
    label: "LinkedIn profile",
    placeholder: "https://linkedin.com/in/...",
    type: "url",
    required: true,
    inputMode: "url",
    autoComplete: "url",
  },
  {
    id: "portfolio_link",
    label: "Portfolio, GitHub, or relevant work (optional)",
    placeholder: "https://...",
    type: "url",
    required: false,
    inputMode: "url",
  },
  {
    id: "why_olyxee",
    label: "Why Olyxee, and what would you want to work on?",
    placeholder: "A few sentences is enough.",
    type: "textarea",
    required: true,
  },
];

export const roles: Role[] = [
  // ─── 1. Engineering & AI ─────────────────────────────────────────────
  {
    title: "AI/ML Engineer",
    team: "Engineering & AI",
    location: REMOTE,
    type: "internship",
    description:
      "Build and ship the models that power Ordo, Addup, and Olyxee Cortex across production workflows.",
    responsibilities: [
      "Train, fine-tune, and evaluate models for execution, reconciliation, and reasoning tasks",
      "Move research prototypes into reliable, monitored production services",
      "Partner with research and platform teams to close the loop between models and real workflows",
    ],
    requirements: [
      "Strong Python and modern ML frameworks (PyTorch, JAX, or similar)",
      "Experience shipping ML systems to production, not just notebooks",
      "Share your CV, GitHub, and any models or papers you've worked on",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "AI Researcher",
    team: "Engineering & AI",
    location: HYBRID,
    type: "paid",
    description:
      "Push the research agenda behind Olyxee Cortex: verification, evaluation, and reliability for AI that acts.",
    responsibilities: [
      "Design and run experiments on model reasoning, verification, and reliability",
      "Translate findings into product capabilities the engineering team can ship",
      "Publish technical reports and represent Olyxee in the research community",
    ],
    requirements: [
      "MSc or PhD in CS, ML, or related field, or equivalent research track record",
      "First-author publications or strong applied research portfolio",
      "Share your CV, Google Scholar or publications page, and GitHub",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "Senior Software Engineer",
    team: "Engineering & AI",
    location: REMOTE,
    type: "paid",
    description:
      "Build the product surfaces and backend services across Ordo, Addup, and Document Integrity.",
    responsibilities: [
      "Ship APIs, services, and UI features that customers use every day",
      "Own quality, performance, and observability of the systems you build",
      "Work across the stack to move features from spec to production",
    ],
    requirements: [
      "Strong engineering fundamentals in a modern stack (TypeScript, Python, Go, or similar)",
      "Track record of shipping reliable software in a team",
      "Share your CV and GitHub or portfolio",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "Platform Engineer",
    team: "Engineering & AI",
    location: REMOTE,
    type: "internship",
    description:
      "Own the internal platform engineers build on: deployment, observability, and developer experience across all Olyxee products.",
    responsibilities: [
      "Design and operate CI/CD, service templates, and shared infrastructure",
      "Improve developer velocity, reliability, and security across teams",
      "Set standards for how services are built, deployed, and monitored",
    ],
    requirements: [
      "Experience with Kubernetes, Terraform, and modern cloud-native tooling",
      "Strong sense for reliability, security, and developer experience",
      "Share your CV and examples of platform work you've owned",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "Cloud Infrastructure Engineer",
    team: "Engineering & AI",
    location: REMOTE,
    type: "internship",
    description:
      "Run the cloud foundation Olyxee operates on: compute, networking, storage, and cost across multiple environments.",
    responsibilities: [
      "Provision and manage cloud infrastructure with infrastructure-as-code",
      "Optimize cost, performance, and reliability of production services",
      "Harden security and compliance posture across environments",
    ],
    requirements: [
      "Deep experience with AWS, GCP, or Azure in production",
      "Strong Terraform or equivalent IaC fluency",
      "Share your CV and infrastructure work you've owned",
    ],
    questions: STANDARD_QUESTIONS,
  },

  // ─── 2. Data & Intelligence ──────────────────────────────────────────
  {
    title: "Data Engineer",
    team: "Data & Intelligence",
    location: REMOTE,
    type: "internship",
    description:
      "Build the data pipelines that feed Addup, Cortex, and our evaluation systems with clean, trustworthy data.",
    responsibilities: [
      "Design and operate ETL/ELT pipelines across product and customer data sources",
      "Model data for analytics, ML training, and downstream product features",
      "Own data quality, lineage, and observability end to end",
    ],
    requirements: [
      "Strong SQL and Python; experience with modern data stacks (dbt, Airflow, Snowflake/BigQuery, or similar)",
      "Track record of shipping production data pipelines",
      "Share your CV and GitHub or portfolio",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "AI Systems Engineer",
    team: "Data & Intelligence",
    location: REMOTE,
    type: "internship",
    description:
      "Build the systems that connect models, tools, and data into reliable, end-to-end AI workflows across Ordo and Cortex.",
    responsibilities: [
      "Design orchestration, retrieval, and tool-use pipelines for production AI",
      "Integrate models with external systems, APIs, and enterprise data",
      "Instrument workflows so behavior is observable, testable, and debuggable",
    ],
    requirements: [
      "Experience building agentic, RAG, or workflow-based AI systems in production",
      "Strong software engineering background alongside applied ML familiarity",
      "Share your CV, GitHub, and systems you've built",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "Operational Intelligence Analyst",
    team: "Data & Intelligence",
    location: REMOTE,
    type: "internship",
    description:
      "Turn product, customer, and operational data into the insights that guide Olyxee's product and go-to-market decisions.",
    responsibilities: [
      "Build dashboards, models, and analyses across product, finance, and operations",
      "Partner with leadership to size opportunities and measure outcomes",
      "Define metrics that teams actually run the business on",
    ],
    requirements: [
      "Strong SQL and analytical thinking; comfortable with BI and modeling tools",
      "Experience translating ambiguous questions into clear analysis",
      "Share your CV and example analyses or dashboards",
    ],
    questions: STANDARD_QUESTIONS,
  },

  // ─── 3. Quality & Reliability ────────────────────────────────────────
  {
    title: "QA/Test Engineer",
    team: "Quality & Reliability",
    location: REMOTE,
    type: "internship",
    description:
      "Own the quality bar across Olyxee's products. Design the testing strategy that keeps customer-facing systems dependable.",
    responsibilities: [
      "Design and maintain automated test suites across services and UI",
      "Drive regression, integration, and release testing as a discipline",
      "Partner with engineering to prevent issues, not just catch them",
    ],
    requirements: [
      "Experience with modern test automation frameworks and CI integration",
      "Strong analytical mindset and attention to detail",
      "Share your CV and test or automation work you've owned",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "AI Evaluation & Reliability Engineer",
    team: "Quality & Reliability",
    location: REMOTE,
    type: "internship",
    description:
      "Build the evaluation harnesses, benchmarks, and monitors that prove our AI systems behave correctly in production.",
    responsibilities: [
      "Design evaluation suites and golden datasets across Ordo, Addup, and Cortex",
      "Build monitoring and alerting for model behavior, drift, and regressions",
      "Run failure analysis and partner with research to close gaps",
    ],
    requirements: [
      "Strong Python and experience evaluating ML or LLM systems",
      "Comfort building tooling, not just running scripts",
      "Share your CV, GitHub, and any evaluation work you've shipped",
    ],
    questions: STANDARD_QUESTIONS,
  },

  // ─── 4. Product & Design ─────────────────────────────────────────────
  {
    title: "Product Manager",
    team: "Product & Design",
    location: REMOTE,
    type: "internship",
    description:
      "Own a product surface across Ordo, Addup, Document Integrity, or Courier Loop. Set the direction, ship the work, measure the outcome.",
    responsibilities: [
      "Translate customer problems into clear roadmaps and shipped product",
      "Coordinate engineering, research, and design to deliver outcomes",
      "Talk to customers, run discovery, and shape go-to-market alongside leadership",
    ],
    requirements: [
      "Experience owning a technical or enterprise product end to end",
      "Strong writing, prioritisation, and customer judgment",
      "Share your CV, LinkedIn, and examples of products you've shipped",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "Product Designer",
    team: "Product & Design",
    location: REMOTE,
    type: "internship",
    description:
      "Design the interfaces operators trust to run AI on real work, calm, clear, and accountable.",
    responsibilities: [
      "Own end-to-end design for product surfaces across multiple Olyxee products",
      "Run research, prototype quickly, and ship with engineering",
      "Raise the design bar and contribute to our shared design system",
    ],
    requirements: [
      "Strong portfolio of shipped product design work, ideally B2B or technical",
      "Fluency in modern design tooling (Figma) and interaction patterns",
      "Share your CV and portfolio",
    ],
    questions: STANDARD_QUESTIONS,
  },

  // ─── 5. Operations & Delivery ────────────────────────────────────────
  {
    title: "Project Operations",
    team: "Operations & Delivery",
    location: REMOTE,
    type: "internship",
    description:
      "Keep our internal and customer-facing projects on track. Bring structure to a fast-moving team building real systems.",
    responsibilities: [
      "Plan, coordinate, and track delivery across teams and customer engagements",
      "Run rituals, dependencies, and status with clear written communication",
      "Identify risks early and unblock work before it slows down",
    ],
    requirements: [
      "Experience running technical projects or programs end to end",
      "Strong written communication and operational instincts",
      "Share your CV and examples of projects you've owned",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "Operations & Strategy",
    team: "Operations & Delivery",
    location: HYBRID,
    type: "internship",
    description:
      "Work alongside leadership on the highest-leverage problems: planning, hiring, finance, and how the company runs.",
    responsibilities: [
      "Run cross-functional initiatives across operations, finance, and people",
      "Build the planning, reporting, and decision-making rhythms of the company",
      "Lead special projects from market analysis to internal infrastructure",
    ],
    requirements: [
      "Experience in operations, strategy, consulting, or chief-of-staff roles",
      "Strong analytical skills and excellent written communication",
      "Share your CV and examples of work you've owned",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "Enterprise Solutions Associate",
    team: "Operations & Delivery",
    location: REMOTE,
    type: "internship",
    description:
      "Work directly with enterprise customers to deploy Ordo, Addup, and Cortex into their operations.",
    responsibilities: [
      "Lead onboarding, integration, and adoption for enterprise accounts",
      "Translate customer requirements into clear product feedback and configuration",
      "Be the trusted operator who makes sure customers actually realize value",
    ],
    requirements: [
      "Experience in solutions engineering, implementation, or customer success at a B2B company",
      "Comfort with technical conversations and enterprise stakeholders",
      "Share your CV and LinkedIn",
    ],
    questions: STANDARD_QUESTIONS,
  },

  // ─── 6. Growth & Business ────────────────────────────────────────────
  {
    title: "Marketing",
    team: "Growth & Business",
    location: REMOTE,
    type: "paid",
    description:
      "Help the world understand what Olyxee is building. Own content, campaigns, and the channels that grow our audience.",
    responsibilities: [
      "Plan and execute content, social, email, and launch campaigns",
      "Run experiments and report on what is moving the right metrics",
      "Sharpen positioning and messaging across product and brand surfaces",
    ],
    requirements: [
      "Experience marketing technical or B2B products",
      "Strong writing and a portfolio of campaigns or launches you've owned",
      "Share your CV, LinkedIn, and links to past work",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "Partnerships & Business Development",
    team: "Growth & Business",
    location: HYBRID,
    type: "internship",
    description:
      "Build the partnerships that expand Olyxee's reach: integrators, platforms, and the ecosystems our products plug into.",
    responsibilities: [
      "Identify, develop, and close strategic partnerships",
      "Own joint go-to-market with partners across regions and verticals",
      "Work with product on integrations and shared roadmaps",
    ],
    requirements: [
      "Experience in BD, partnerships, or alliances at a technical company",
      "Strong commercial judgment and written communication",
      "Share your CV and LinkedIn",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "Sales & Client Solutions",
    team: "Growth & Business",
    location: HYBRID,
    type: "internship",
    description:
      "Own the customer relationship from first conversation through contract. Sell Olyxee the way it deserves to be sold: honestly and technically.",
    responsibilities: [
      "Run the full sales cycle for enterprise and mid-market accounts",
      "Build trusted relationships with technical and executive buyers",
      "Partner with product and solutions to deliver on what you promise",
    ],
    requirements: [
      "Track record selling technical, B2B, or enterprise software",
      "Strong discovery, written, and presentation skills",
      "Share your CV and LinkedIn",
    ],
    questions: STANDARD_QUESTIONS,
  },

  // ─── 7. People & Administration ──────────────────────────────────────
  {
    title: "HR & Talent Operations",
    team: "People & Administration",
    location: HYBRID,
    type: "internship",
    description:
      "Build the people function: hiring, onboarding, and the operating rhythm that lets a small team punch far above its weight.",
    responsibilities: [
      "Run recruiting end to end across engineering, research, and business roles",
      "Own onboarding, performance, and people operations",
      "Help shape Olyxee's culture as we grow",
    ],
    requirements: [
      "Experience in talent or people operations at a high-growth company",
      "Strong written communication and operational instincts",
      "Share your CV and LinkedIn",
    ],
    questions: STANDARD_QUESTIONS,
  },
  {
    title: "Administrative Operations",
    team: "People & Administration",
    location: HYBRID,
    type: "internship",
    description:
      "Keep the company running day to day: scheduling, vendors, office, finance support, and the operational glue leadership relies on.",
    responsibilities: [
      "Own scheduling, travel, and executive support across leadership",
      "Coordinate vendors, contracts, and office operations",
      "Support finance and people teams on day-to-day administration",
    ],
    requirements: [
      "Experience in executive assistance, office management, or operations support",
      "Highly organised, calm under pressure, and an excellent written communicator",
      "Share your CV and LinkedIn",
    ],
    questions: STANDARD_QUESTIONS,
  },
];

export const teams = Array.from(new Set(roles.map((r) => r.team)));

export function findRoleByTitle(title: string): Role | undefined {
  const t = title.trim();
  return roles.find((r) => r.title === t);
}
