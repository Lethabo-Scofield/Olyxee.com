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
      "Lead the research agenda behind Olyxee Cortex: verification, evaluation, and reliability for AI systems that take action in production.",
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
      "Design, build, and own the product surfaces and backend services across Ordo, Addup, and Document Integrity. Set the engineering bar.",
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
      "Own the models behind Ordo, Addup, and Olyxee Cortex end to end: training, evaluation, and reliable serving at production scale.",
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
  {
    slug: "principal-infrastructure-engineer",
    title: "Principal Infrastructure Engineer",
    team: "Engineering & AI",
    location: REMOTE,
    type: "paid",
    description:
      "Own the cloud, compute, and platform foundation Olyxee runs on: reliability, security, cost, and developer velocity at scale.",
    level: "Principal · 10+ years in infrastructure and platform engineering",
    compensation: "Top-of-band salary, significant equity, performance bonus, learning budget.",
    responsibilities: [
      "Own the architecture of our cloud, compute, and platform across all environments",
      "Set and enforce the bar for reliability, security, and cost across production",
      "Build the platform and tooling that lets every team ship quickly and safely",
      "Lead incident response and drive the systems and culture that prevent repeats",
      "Mentor engineers and set the technical direction for infrastructure",
    ],
    requirements: [
      "10+ years in infrastructure, platform, or SRE roles, with significant scale ownership",
      "Deep expertise in cloud-native systems (Kubernetes, Terraform, AWS or GCP at scale)",
      "Professional certifications expected (CKA/CKAD, AWS/GCP Professional, or equivalent)",
      "Track record owning reliability and security for systems with real production traffic",
      "Strong programming in Go, Python, or Rust; you build platforms, not just configure them",
      "A public body of work we can review: open-source, technical writing, or conference talks",
      "Calm, decisive incident leadership under pressure",
    ],
    questions: PAID_QUESTIONS,
    process: PAID_PROCESS,
  },
  {
    slug: "senior-data-scientist",
    title: "Senior Data Scientist",
    team: "Data & Intelligence",
    location: REMOTE,
    type: "paid",
    description:
      "Turn product, model, and operational data into the rigorous analysis and methods that guide how Olyxee builds and measures reliability.",
    level: "Senior · 7+ years in applied data science",
    compensation: "Top-of-band salary, significant equity, performance bonus, learning budget.",
    responsibilities: [
      "Design and run rigorous experiments, causal analysis, and statistical modeling",
      "Build the metrics and methods teams use to measure reliability and impact",
      "Partner with research and engineering to turn analysis into shipped capability",
      "Set the standard for statistical rigor and reproducibility across the company",
      "Mentor analysts and raise the analytical bar",
    ],
    requirements: [
      "PhD or Master's in a quantitative field, plus 7+ years of applied data science",
      "Publications or a public Google Scholar / arXiv profile we can review",
      "Expert Python and SQL, with deep statistics, experimentation, and causal inference",
      "Track record turning ambiguous questions into rigorous, decision-grade analysis",
      "Relevant certifications are a plus (cloud data, ML specialty, or equivalent)",
      "Exceptional written communication; you make complex findings clear and actionable",
    ],
    questions: PAID_QUESTIONS,
    process: PAID_PROCESS,
  },
  {
    slug: "senior-security-engineer",
    title: "Senior Security Engineer",
    team: "Quality & Reliability",
    location: REMOTE,
    type: "paid",
    description:
      "Own security across Olyxee's products and infrastructure: threat modeling, application security, and the controls enterprise customers depend on.",
    level: "Senior · 8+ years in security engineering",
    compensation: "Top-of-band salary, significant equity, performance bonus, learning budget.",
    responsibilities: [
      "Own application, cloud, and product security across the company",
      "Run threat modeling, security reviews, and incident response end to end",
      "Build the controls and tooling that make security the default, not an afterthought",
      "Lead the work behind enterprise compliance (SOC 2, ISO 27001) and customer trust",
      "Mentor engineers and raise the security bar across every team",
    ],
    requirements: [
      "8+ years in security engineering, with deep application and cloud security expertise",
      "Industry certifications expected (OSCP, CISSP, GIAC, or equivalent)",
      "Hands-on track record in threat modeling, secure design, and incident response",
      "Strong programming in Python, Go, or similar; you build tooling, not just policy",
      "Experience taking an organization through SOC 2 or ISO 27001",
      "Published security research, CVEs, or conference talks are a strong plus",
      "Exceptional written communication and calm judgment under pressure",
    ],
    questions: PAID_QUESTIONS,
    process: PAID_PROCESS,
  },
  {
    slug: "staff-product-designer",
    title: "Staff Product Designer",
    team: "Product & Design",
    location: REMOTE,
    type: "paid",
    description:
      "Own the design of the interfaces operators trust to run AI on real work across Ordo, Addup, Document Integrity, and Courier Loop.",
    level: "Staff · 8+ years designing complex software products",
    compensation: "Top-of-band salary, significant equity, performance bonus, learning budget.",
    responsibilities: [
      "Own end to end design for major product surfaces, from concept to shipped detail",
      "Set the design standard and evolve our shared design system",
      "Partner with research, product, and engineering to ship work that feels inevitable",
      "Lead design for complex, data-dense, high-trust enterprise interfaces",
      "Mentor designers and raise the craft bar across the company",
    ],
    requirements: [
      "8+ years designing complex software, with a portfolio of shipped, high-craft work",
      "Mastery of interaction, information design, and modern prototyping (Figma and beyond)",
      "Track record owning design for technical or enterprise products end to end",
      "Strong systems thinking; you build and maintain design systems others rely on",
      "Comfortable collaborating closely with engineers in code-adjacent workflows",
      "Exceptional written communication; you can argue a design decision in writing",
    ],
    questions: PAID_QUESTIONS,
    process: PAID_PROCESS,
  },
  {
    slug: "senior-product-manager",
    title: "Senior Product Manager",
    team: "Product & Design",
    location: REMOTE,
    type: "paid",
    description:
      "Own a product surface across Ordo, Addup, Document Integrity, or Courier Loop, from strategy through shipped, measurable outcomes.",
    level: "Senior · 7+ years in product management",
    compensation: "Top-of-band salary, significant equity, performance bonus, learning budget.",
    responsibilities: [
      "Own strategy, roadmap, and delivery for a major product surface",
      "Translate customer problems into clear specs and shipped product",
      "Set the metrics that define success and own the outcomes against them",
      "Drive discovery, pricing, and positioning with research, design, and go-to-market",
      "Raise the product bar and mentor across the team",
    ],
    requirements: [
      "7+ years in product management, including technical or enterprise products",
      "Track record shipping products that moved real business and customer outcomes",
      "Strong technical fluency; you can go deep with engineers and research",
      "Excellent written communication; your specs and strategy docs end debates",
      "Relevant certifications are a plus (e.g. Pragmatic, SAFe, or equivalent)",
      "Proven judgment on what to build, what to cut, and when to ship",
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
      "Build product surfaces and backend services across Ordo, Addup, and Document Integrity alongside senior engineers.",
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
    slug: "marketing-intern",
    title: "Marketing Intern",
    team: "Marketing",
    location: REMOTE,
    type: "internship",
    description:
      "Help shape how the world hears about Olyxee: content, launches, social, and growth experiments.",
    responsibilities: [
      "Help plan and ship launches, content, and campaigns",
      "Run social, email, and community experiments end to end",
      "Help with positioning, messaging, and competitive research",
    ],
    requirements: [
      "Strong writer with a portfolio of work, school projects, or shipped content",
      "Curious about technical and B2B products",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "research-intern",
    title: "Research Intern",
    team: "Research",
    location: REMOTE,
    type: "internship",
    description:
      "Work alongside our researchers on verification, evaluation, and reliability for AI systems behind Olyxee Cortex.",
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
    slug: "machine-learning-engineer-intern",
    title: "Machine Learning Engineer Intern",
    team: "Engineering & AI",
    location: REMOTE,
    type: "internship",
    description:
      "Work alongside our team on the models that power Ordo, Addup, and Olyxee Cortex.",
    responsibilities: [
      "Help train, fine-tune, and evaluate models on real product tasks",
      "Move research prototypes into reliable services with the team",
      "Contribute to internal tooling for evaluation and monitoring",
    ],
    requirements: [
      "Strong Python and at least one modern ML framework (PyTorch, JAX, or similar)",
      "Some prior ML project experience (coursework, research, or personal)",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "platform-engineer-intern",
    title: "Platform Engineer Intern",
    team: "Engineering & AI",
    location: REMOTE,
    type: "internship",
    description:
      "Help build the internal platform engineers ship on: CI/CD, observability, and developer experience.",
    responsibilities: [
      "Improve CI/CD pipelines, service templates, and shared tooling",
      "Help raise reliability, security, and developer velocity across teams",
      "Pair with senior engineers on real platform work",
    ],
    requirements: [
      "Comfortable in a modern cloud-native stack (Docker, Kubernetes, Terraform, or similar)",
      "Strong scripting in a language like Python, Go, or TypeScript",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "cloud-infrastructure-intern",
    title: "Cloud Infrastructure Intern",
    team: "Engineering & AI",
    location: REMOTE,
    type: "internship",
    description:
      "Help run the cloud foundation Olyxee operates on: compute, networking, storage, and cost.",
    responsibilities: [
      "Help provision and manage cloud infrastructure with infrastructure-as-code",
      "Work on cost, performance, and reliability of production services",
      "Help harden the security posture across environments",
    ],
    requirements: [
      "Familiarity with AWS, GCP, or Azure",
      "Some Terraform or equivalent IaC experience",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "data-engineer-intern",
    title: "Data Engineer Intern",
    team: "Data & Intelligence",
    location: REMOTE,
    type: "internship",
    description:
      "Help build the data pipelines that feed Addup, Cortex, and our evaluation systems.",
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
    slug: "ai-systems-engineer-intern",
    title: "AI Systems Engineer Intern",
    team: "Data & Intelligence",
    location: REMOTE,
    type: "internship",
    description:
      "Help build the systems that connect models, tools, and data into reliable AI workflows.",
    responsibilities: [
      "Work on orchestration, retrieval, and tool-use pipelines for production AI",
      "Help integrate models with external systems, APIs, and enterprise data",
      "Contribute to instrumentation that makes AI workflows observable and debuggable",
    ],
    requirements: [
      "Strong software fundamentals and some applied ML familiarity",
      "Experience or curiosity in agentic, RAG, or workflow-based AI systems",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "data-analyst-intern",
    title: "Data Analyst Intern",
    team: "Data & Intelligence",
    location: REMOTE,
    type: "internship",
    description:
      "Turn product, customer, and operational data into the insights that guide our decisions.",
    responsibilities: [
      "Build dashboards, models, and analyses across product, finance, and operations",
      "Help size opportunities and measure outcomes with leadership",
      "Help define the metrics teams actually run the business on",
    ],
    requirements: [
      "Strong SQL and analytical thinking",
      "Comfortable turning ambiguous questions into clear analysis",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "data-scientist-intern",
    title: "Data Scientist Intern",
    team: "Data & Intelligence",
    location: REMOTE,
    type: "internship",
    description:
      "Help turn product, model, and operational data into the experiments and analysis that guide our decisions.",
    responsibilities: [
      "Help design experiments and run statistical analysis on real product data",
      "Build models and metrics that measure reliability and impact",
      "Help turn ambiguous questions into clear, decision-grade analysis",
    ],
    requirements: [
      "Strong Python and SQL, with curiosity about statistics and experimentation",
      "Some prior data or ML project experience (coursework, research, or personal)",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "security-engineer-intern",
    title: "Security Engineer Intern",
    team: "Quality & Reliability",
    location: REMOTE,
    type: "internship",
    description:
      "Help keep Olyxee's products and infrastructure secure: threat modeling, application security, and tooling.",
    responsibilities: [
      "Help with security reviews, threat modeling, and basic incident response",
      "Build small tools that make security checks easier and more automatic",
      "Pair with engineers to fix issues, not just find them",
    ],
    requirements: [
      "Curiosity about application or cloud security and how systems break",
      "Some scripting in Python, Go, or similar, plus prior project experience",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "qa-engineer-intern",
    title: "QA Engineer Intern",
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
    slug: "ai-evaluation-engineer-intern",
    title: "AI Evaluation Engineer Intern",
    team: "Quality & Reliability",
    location: REMOTE,
    type: "internship",
    description:
      "Help build the evaluation harnesses and monitors that prove our AI behaves correctly.",
    responsibilities: [
      "Help build evaluation suites and golden datasets across Ordo, Addup, and Cortex",
      "Contribute to monitoring and alerting for model behavior and drift",
      "Help with failure analysis and partner with research to close gaps",
    ],
    requirements: [
      "Strong Python and curiosity about evaluating ML or LLM systems",
      "Comfortable building small tools, not just running scripts",
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
      "Support a product surface across Ordo, Addup, Document Integrity, or Courier Loop.",
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
  {
    slug: "product-design-intern",
    title: "Product Design Intern",
    team: "Product & Design",
    location: REMOTE,
    type: "internship",
    description:
      "Help design the interfaces operators trust to run AI on real work.",
    responsibilities: [
      "Contribute to end to end design for product surfaces",
      "Prototype quickly and pair with engineers to ship",
      "Contribute to our shared design system",
    ],
    requirements: [
      "Portfolio of design work, school projects, or shipped product",
      "Fluency in Figma and modern interaction patterns",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "project-management-intern",
    title: "Project Management Intern",
    team: "Operations & Delivery",
    location: REMOTE,
    type: "internship",
    description:
      "Help keep our internal and customer-facing projects on track.",
    responsibilities: [
      "Help plan, coordinate, and track delivery across teams and engagements",
      "Run rituals, dependencies, and status with clear written communication",
      "Help identify risks early and unblock work before it slows down",
    ],
    requirements: [
      "Strong written communication and operational instincts",
      "Comfortable in a fast-moving environment",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "business-operations-intern",
    title: "Business Operations Intern",
    team: "Operations & Delivery",
    location: HYBRID,
    type: "internship",
    description:
      "Work alongside leadership on planning, hiring, finance, and how the company runs.",
    responsibilities: [
      "Support cross-functional initiatives across operations, finance, and people",
      "Help build the planning and reporting rhythms of the company",
      "Run analysis and prep for leadership decisions",
    ],
    requirements: [
      "Strong analytical skills and excellent written communication",
      "Interest in how early-stage companies are built",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "solutions-engineering-intern",
    title: "Solutions Engineering Intern",
    team: "Operations & Delivery",
    location: REMOTE,
    type: "internship",
    description:
      "Work with enterprise customers to help deploy Ordo, Addup, and Cortex into their operations.",
    responsibilities: [
      "Support onboarding, integration, and adoption for enterprise accounts",
      "Help translate customer requirements into product feedback and configuration",
      "Pair with senior operators to make sure customers realize value",
    ],
    requirements: [
      "Comfort with technical conversations and enterprise stakeholders",
      "Strong written communication",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "business-development-intern",
    title: "Business Development Intern",
    team: "Growth & Business",
    location: HYBRID,
    type: "internship",
    description:
      "Help build the partnerships that expand Olyxee's reach.",
    responsibilities: [
      "Help identify and develop strategic partnerships",
      "Support joint go-to-market work with partners across regions and verticals",
      "Pair with product on integrations and shared roadmaps",
    ],
    requirements: [
      "Strong commercial judgment and written communication",
      "Interest in BD, partnerships, or alliances",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "sales-intern",
    title: "Sales Intern",
    team: "Growth & Business",
    location: HYBRID,
    type: "internship",
    description:
      "Help own the customer relationship from first conversation through contract.",
    responsibilities: [
      "Support the full sales cycle for enterprise and mid-market accounts",
      "Help build relationships with technical and executive buyers",
      "Pair with product and solutions to deliver on what we promise",
    ],
    requirements: [
      "Strong discovery, written, and presentation skills",
      "Interest in B2B or enterprise software",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "people-operations-intern",
    title: "People Operations Intern",
    team: "People & Administration",
    location: HYBRID,
    type: "internship",
    description:
      "Help build the people function: hiring, onboarding, and operating rhythm.",
    responsibilities: [
      "Support recruiting end to end across engineering, research, and business roles",
      "Help with onboarding, performance, and people operations",
      "Help shape Olyxee's culture as we grow",
    ],
    requirements: [
      "Strong written communication and operational instincts",
      "Interest in people, talent, or operations",
      "Currently studying or recently graduated",
    ],
  },
  {
    slug: "operations-intern",
    title: "Operations Intern",
    team: "People & Administration",
    location: HYBRID,
    type: "internship",
    description:
      "Help keep the company running day to day: scheduling, vendors, office, and finance support.",
    responsibilities: [
      "Help with scheduling, travel, and executive support",
      "Coordinate vendors, contracts, and office operations",
      "Support finance and people teams on day to day administration",
    ],
    requirements: [
      "Highly organised, calm under pressure, and an excellent written communicator",
      "Comfortable with shifting priorities",
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
