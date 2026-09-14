export type ResearchCategory = "Release" | "Publication" | "News";

export type ResearchLink = {
  label: string;
  href: string;
  logo: string;
};

export type ResearchEntry = {
  category: ResearchCategory;
  source: string;
  title: string;
  authors: string;
  venue: string;
  month: string;
  year: string;
  date: string;
  url: string;
  description: string;
  featured?: boolean;
  links?: ResearchLink[];
  coverImage?: string;
  body?: string[];
};

export const researchEntries: ResearchEntry[] = [
  {
    category: "Release",
    source: "Olyxee",
    title: "FinIR: A financial intermediate representation for AI-native computation",
    authors: "Lethabo Scofield and Alisha Fatima",
    venue: "Olyxee Research",
    month: "Sep",
    year: "2026",
    date: "2026-09-04",
    url: "/research/finir",
    description:
      "A finance-typed compiler and incremental execution runtime that turns structured financial intent into deterministic, auditable financial computation.",
    featured: true,
    links: [
      { label: "GitHub", href: "https://github.com/Olyxee/finir", logo: "/logos/collaborators/github.svg" },
      { label: "PyPI", href: "https://pypi.org/project/finir/", logo: "/research/logos/pypi.svg" },
      { label: "FinIR-Intent model", href: "https://huggingface.co/Olyxee/FinIR-Intent", logo: "/partner-logos/huggingface.svg" },
      { label: "IntentBench dataset", href: "https://huggingface.co/datasets/Olyxee/FinIR-IntentBench", logo: "/partner-logos/huggingface.svg" },
    ],
  },
  {
    category: "Publication",
    source: "Research we follow",
    title: "LLMs Corrupt Your Documents When You Delegate",
    authors: "P. Laban, T. Schnabel, J. Neville",
    venue: "arXiv",
    month: "Apr",
    year: "2026",
    date: "2026-04-01",
    url: "https://arxiv.org/abs/2604.15597",
    description:
      "A paper we are following as we think about dependable document-handling workflows and the boundaries of delegated AI work.",
  },
  {
    category: "News",
    source: "Olyxee",
    title: "One operational view across a fragmented freight network",
    authors: "Olyxee",
    venue: "Olyxee Stories",
    month: "May",
    year: "2026",
    date: "2026-05-01",
    url: "/stories/freightshift",
    description:
      "How Olyxee and FreightShift are connecting shipment events, responsibilities, service rules and customer commitments into one operational view through Orgni.",
    coverImage: "/images/stories/logistics.png",
  },
  {
    category: "News",
    source: "Olyxee",
    title: "Olyxee joins the Claude Partner Network",
    authors: "Olyxee",
    venue: "Olyxee",
    month: "Sep",
    year: "2026",
    date: "2026-09-14",
    url: "/research/news/olyxee-joins-claude-partner-network",
    description:
      "Olyxee joins Anthropic’s Claude Partner Network, strengthening its work on Orgni and its mission to build research and infrastructure for operational intelligence.",
    coverImage: "/research/anthropic.png",
    body: [
      "Olyxee is now part of Anthropic’s Claude Partner Network.",
      "For us, this is not simply a partnership announcement. It strengthens the work we are already doing to build research and infrastructure for operational intelligence.",
      "At Olyxee, our focus is on helping organisations become more intelligent in how they operate, make decisions, access context and move work forward. That direction is taking shape through Orgni, our intelligence layer for teams and business operations.",
      "Working within the Claude Partner Network gives us access to Anthropic’s partner ecosystem, technical enablement, training and certification pathways, while creating a clearer route for us to build and deploy Claude-powered systems with customers.",
      "It has already helped us think more deliberately about how we design enterprise AI systems: not as isolated assistants, but as systems connected to business knowledge, workflows, people and operational context.",
      "That is especially important in the South African market, where businesses increasingly care less about AI as a novelty and more about whether it improves productivity, reduces operational friction and creates measurable value.",
      "The relationship is still developing, but it gives Olyxee a stronger foundation as we continue building Orgni and deploying operational AI systems for real organisations.",
      "Our mission remains unchanged:",
      "Build the research and infrastructure for operational intelligence.",
      "The Claude Partner Network is another step toward that mission.",
    ],
  },
];

export const researchFilters = ["All entries", "Release", "Publication", "News"] as const;
export type ResearchFilter = (typeof researchFilters)[number];

export function getReadingTime(body: string[] = []) {
  const wordCount = body.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function getEntrySlug(url: string) {
  return url.split("/").filter(Boolean).pop() ?? "";
}