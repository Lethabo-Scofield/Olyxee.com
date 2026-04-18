export type RoleType = "internship" | "paid";

export interface Role {
  title: string;
  team: string;
  location: string;
  type: RoleType;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const roles: Role[] = [
  {
    title: "AI Researcher",
    team: "AI Research & Development",
    location: "Remote",
    type: "paid",
    description: "Lead original research on AI verification, evaluation, and reliability. Your work will set the technical direction for how the industry trusts AI systems.",
    responsibilities: [
      "Define and lead a research agenda on model verification, evaluation, and reliability",
      "Design and run rigorous experiments, then turn results into shipped product capabilities",
      "Publish findings, influence the broader research community, and represent Olyxee externally",
      "Mentor engineers and interns and raise the technical bar across the team",
    ],
    requirements: [
      "Master's degree in computer science, machine learning, statistics, or a closely related field. PhD strongly preferred.",
      "3+ years of applied or academic research experience in ML, NLP, or AI systems.",
      "Track record of peer-reviewed publications at venues such as NeurIPS, ICML, ICLR, ACL, or EMNLP. Share links to your publications.",
      "Strong programming skills in Python and deep familiarity with modern ML frameworks (PyTorch, JAX, or similar).",
      "Experience taking research from idea to working prototype, not just paper.",
      "Share your CV, Google Scholar or publications page, and GitHub in your application.",
    ],
  },
  {
    title: "AI Engineering Intern",
    team: "AI Research & Development",
    location: "Remote",
    type: "internship",
    description: "Turn cutting-edge research into production systems. You'll bridge the gap between what's possible in a lab and what works at scale.",
    responsibilities: [
      "Build and deploy AI models that power real verification workflows",
      "Design data pipelines that handle production-scale AI evaluation",
      "Work directly with researchers to bring new ideas to life in code",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Full Stack Developer Intern",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "internship",
    description: "Build the platform that teams rely on to trust their AI. You'll own entire features from idea to deployment, across every layer of the stack.",
    responsibilities: [
      "Architect and build features across frontend, backend, and data layers",
      "Design systems that handle the complexity of real-time AI monitoring",
      "Own what you build. Ship it, measure it, improve it.",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "ML Engineering Intern",
    team: "AI Research & Development",
    location: "Remote",
    type: "internship",
    description: "Make AI systems faster, more accurate, and production-ready. Your work directly impacts how reliable AI is for thousands of teams.",
    responsibilities: [
      "Build training and evaluation pipelines that set the standard for quality",
      "Optimize models for real-world performance, not just benchmarks",
      "Design testing frameworks that catch problems before users do",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Backend Engineering Intern",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "internship",
    description: "Build the APIs and services that power AI verification at scale. The systems you create will handle millions of evaluation requests.",
    responsibilities: [
      "Design and build APIs that are fast, reliable, and well-documented",
      "Architect backend services that scale with growing demand",
      "Shape the database and service layer that everything else depends on",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Frontend Engineering Intern",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "internship",
    description: "Design and build the interfaces that make complex AI data simple and actionable. Your work defines how teams experience Olyxee.",
    responsibilities: [
      "Build dashboards and visualizations that turn raw AI data into clear insights",
      "Create developer tools that engineers actually enjoy using",
      "Craft interfaces that make complex verification workflows feel effortless",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Cloud Engineering Intern",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "internship",
    description: "Build and operate the cloud foundation Olyxee runs on. You'll work on the systems that keep our platform fast, secure, and always on.",
    responsibilities: [
      "Provision and manage cloud infrastructure across compute, storage, and networking",
      "Automate deployments, scaling, and observability with infrastructure-as-code",
      "Harden security, cost, and reliability of services running in production",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Product Design Intern",
    team: "Product & Design",
    location: "Remote",
    type: "internship",
    description: "Shape how the world's best engineering teams interact with AI infrastructure. Your designs will define what trust looks like in software.",
    responsibilities: [
      "Design end-to-end experiences for complex technical workflows",
      "Create prototypes that influence product direction, not just visuals",
      "Talk to real users and turn their pain points into elegant solutions",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "QA / Testing Intern",
    team: "QA & Testing",
    location: "Remote",
    type: "internship",
    description: "Be the last line of defense before our tools reach production. You'll ensure that the platform teams trust to verify AI is itself bulletproof.",
    responsibilities: [
      "Design and execute test strategies that catch what others miss",
      "Build automated test suites that scale with the platform",
      "Set the quality bar for a product where reliability is the entire promise",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Project Management Intern",
    team: "Operations & Strategy",
    location: "Remote",
    type: "internship",
    description: "Keep the engine running. You'll coordinate roadmaps, unblock teams, and turn ambitious goals into shipped product across research, engineering, and design.",
    responsibilities: [
      "Run sprint planning, stand-ups, and retros across cross-functional pods",
      "Track milestones, dependencies, and risks so teams stay focused on building",
      "Translate strategy into clear briefs, timelines, and accountable owners",
    ],
    requirements: [
      "Link to portfolio, notion docs, or past projects you have shipped",
    ],
  },
  {
    title: "Marketing Lead",
    team: "Marketing & Growth",
    location: "Remote",
    type: "paid",
    description: "Own how the world hears about Olyxee. You'll set the strategy, lead the channels, and turn a technical product into a story engineers, founders, and enterprises actually trust.",
    responsibilities: [
      "Set and execute the company-wide marketing strategy across positioning, content, and growth",
      "Lead campaigns across social, email, SEO, and developer communities end to end",
      "Own product launches, narrative, and brand voice in every customer-facing surface",
      "Run experiments, define KPIs, and report on pipeline impact to leadership",
    ],
    requirements: [
      "Bachelor's degree in marketing, communications, business, or a related field. Master's a plus.",
      "5+ years of marketing experience, with at least 2 years in a lead or senior role.",
      "Proven experience marketing technical, B2B, or developer-focused products.",
      "Strong portfolio of campaigns, launches, or content with measurable outcomes.",
      "Excellent written English and confident communicating with both engineers and executives.",
      "Share your CV or LinkedIn and links to past work in your application.",
    ],
  },
  {
    title: "Accountant (Grysics)",
    team: "Finance & Accounting",
    location: "Remote",
    type: "paid",
    description: "Own the financial heartbeat of Grysics. You'll keep books accurate, reporting clean, and help leadership make sharper decisions with real numbers.",
    responsibilities: [
      "Own end-to-end bookkeeping, reconciliations, and monthly and annual close for Grysics",
      "Prepare invoices, expense reports, payroll inputs, and cash-flow statements for leadership",
      "Lead budgeting, forecasting, and financial analysis to inform product and hiring decisions",
      "Ensure compliance with tax, audit, and reporting requirements across jurisdictions",
    ],
    requirements: [
      "Bachelor's degree in accounting, finance, or a related field. CPA, ACCA, or equivalent strongly preferred.",
      "4+ years of professional accounting experience, ideally in tech or SaaS.",
      "Hands-on experience with full-cycle accounting and modern accounting software (e.g. QuickBooks, Xero, NetSuite).",
      "Strong working knowledge of GAAP or IFRS and standard tax compliance.",
      "High attention to detail, comfortable owning numbers leadership will act on.",
      "Share your CV or LinkedIn in your application.",
    ],
  },
];

export const teams = Array.from(new Set(roles.map((r) => r.team)));

export function findRoleByTitle(title: string): Role | undefined {
  const t = title.trim();
  return roles.find((r) => r.title === t);
}
