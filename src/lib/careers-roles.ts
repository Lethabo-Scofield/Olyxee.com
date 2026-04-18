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
    title: "AI Research Intern",
    team: "AI Research & Development",
    location: "Remote",
    type: "internship",
    description: "Push the boundaries of what's possible in AI verification and evaluation. Work on research that shapes how the industry thinks about AI reliability.",
    responsibilities: [
      "Design and run experiments on model verification and evaluation methods",
      "Build research prototypes that turn into real products",
      "Tackle open problems in AI reliability that no one else is solving",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
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
    title: "DevOps / MLOps Intern",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "internship",
    description: "Build the infrastructure that keeps Olyxee running at scale. You'll design systems where uptime and reliability aren't negotiable.",
    responsibilities: [
      "Design CI/CD pipelines that make deployments fast and fearless",
      "Build infrastructure automation that scales with the platform",
      "Create monitoring and alerting systems that catch issues before they matter",
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
    description: "Tell the Olyxee story to the people who need to hear it. You'll shape how engineers, founders, and enterprises discover and trust our work.",
    responsibilities: [
      "Plan and execute campaigns across social, email, and developer communities",
      "Write product launches, blog posts, and landing pages that convert",
      "Run experiments on positioning, messaging, and growth channels",
    ],
    requirements: [
      "Link to portfolio, writing samples, or past campaigns you have run",
    ],
  },
  {
    title: "Accountant (Grysics)",
    team: "Finance & Accounting",
    location: "Remote",
    type: "paid",
    description: "Own the financial heartbeat of Grysics. You'll keep books accurate, reporting clean, and help the team make sharper decisions with real numbers.",
    responsibilities: [
      "Maintain bookkeeping, reconciliations, and monthly close for Grysics",
      "Prepare invoices, expense reports, and cash-flow summaries for leadership",
      "Support budgeting, forecasting, and basic financial analysis",
    ],
    requirements: [
      "Background in accounting or finance. Share your CV or LinkedIn.",
    ],
  },
];

export const teams = Array.from(new Set(roles.map((r) => r.team)));

export function findRoleByTitle(title: string): Role | undefined {
  const t = title.trim();
  return roles.find((r) => r.title === t);
}
