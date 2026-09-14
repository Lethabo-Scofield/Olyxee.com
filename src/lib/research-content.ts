export type ResearchCategory = "Release" | "Publication" | "News";

export type ResearchLink = {
  label: string;
  href: string;
  logo: string;
};

export type ArticleLink = {
  text: string;
  href: string;
};

export type ArticleParagraph = string | {
  text: string;
  links: ArticleLink[];
};

export type ArticleSection = {
  heading?: string;
  paragraphs: ArticleParagraph[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  quote?: {
    text: string;
    person: string;
    role: string;
    href: string;
  };
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
  deck?: string;
  articleSections?: ArticleSection[];
};

export const researchEntries = ([
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
    title: "Olyxee joins Anthropic’s Claude Partner Network",
    authors: "Olyxee",
    venue: "Olyxee",
    month: "Sep",
    year: "2026",
    date: "2026-09-14",
    url: "/research/news/olyxee-joins-claude-partner-network",
    description:
      "Olyxee joins Anthropic’s Claude Partner Network, strengthening its work on Orgni, Olyxee Logistics and infrastructure for operational intelligence.",
    coverImage: "/images/research/claude-partner-network/olyxee-claude-partner-network.png",
    deck:
      "What the network means for the systems we are building, and for the organisations we are building them with.",
    articleSections: [
      {
        paragraphs: [
          {
            text: "Olyxee is now part of Anthropic’s Claude Partner Network.",
            links: [
              {
                text: "Claude Partner Network",
                href: "https://www.anthropic.com/news/claude-partner-network",
              },
            ],
          },
          "The announcement matters to us because it supports work already underway. Olyxee is building research and infrastructure for operational intelligence: systems that understand how an organisation works, connect to its knowledge and workflows, and help people move work forward.",
          "Through the network, we gain access to Anthropic’s partner ecosystem, technical enablement, training and certification pathways, and a structured path for building and registering Claude-powered customer deployments.",
          "The value is practical. It strengthens our engineering capability and gives us a clearer route for taking these systems into real organisations.",
        ],
      },
      {
        heading: "Building around real operations",
        paragraphs: [
          "Access to a capable model is only one part of building useful enterprise AI. The difficult work sits around it: business context, data, permissions, integrations, security and the workflows in which decisions are actually made.",
          "A model can reason well and still be of limited use if it does not understand the organisation in which it is operating. Our view is that enterprise AI will be defined less by standalone assistants and more by infrastructure embedded in the way organisations already work.",
          {
            text: "That direction is taking shape through Orgni, our intelligence layer for teams and business operations.",
            links: [{ text: "Orgni", href: "https://orgni.olyxee.com/" }],
          },
          "Important context inside a business is usually spread across documents, messages, databases, business systems and the knowledge held by individual employees. Orgni is being built to connect that context and make it useful in the environments where people already work.",
          {
            text: "We are applying the same thinking through Olyxee Logistics.",
            links: [{ text: "Olyxee Logistics", href: "https://logistics.olyxee.com/" }],
          },
          "Logistics makes operational friction easy to see. One shipment can involve customers, suppliers, warehouses, invoices, payments, tracking updates and several hand-offs. When that context is fragmented, people spend their time following up and reconciling information. Olyxee Logistics gives us a real operating environment in which to build and test a more connected approach.",
        ],
        quote: {
          text: "The models will keep getting better. The real opportunity is building the infrastructure around them: context, workflows, data and execution, so intelligence becomes part of how an organisation actually operates.",
          person: "Lethabo Scofield",
          role: "Founder & AI Research Engineer, Olyxee",
          href: "https://za.linkedin.com/in/lethabo-scofield-17b37a257",
        },
      },
      {
        heading: "What this means for clients",
        paragraphs: [
          "For Olyxee clients, the benefit is not access to another chatbot. It is a stronger path from a capable model to a system that understands the work around it.",
          "That includes connecting intelligence to the tools teams already use, carrying the right business context across those interactions, and respecting the permissions and policies of the organisation.",
          "In practice, this can mean less time spent searching across systems, faster handling of routine operational work, clearer hand-offs between teams and better support for decisions that depend on current business context.",
          "The network also gives our engineers better access to technical guidance and training as we design these systems. Clients benefit from a team that can evaluate where Claude is useful, where it is not, and how it should be introduced responsibly into an existing operation.",
        ],
        image: {
          src: "/images/research/claude-partner-network/orgni-operational-layer.png",
          alt: "Orgni operational layer connecting workplace interfaces with business context, models and enterprise systems",
          caption: "Orgni connects the interfaces teams already use with business context, permissions, models and operational systems.",
        },
      },
      {
        heading: "What membership changes",
        paragraphs: [
          "Joining the network does not change our product direction. It improves the foundation beneath it.",
          "We want Olyxee to develop deeper technical capability around deploying advanced AI systems in production. That means better training, stronger architecture and more experience with the realities of customer environments.",
          "Our goal is not simply to use Claude. It is to understand how models like Claude can become dependable parts of operational systems, with the right context, controls and infrastructure around them.",
          "The relationship is still at an early stage, and we do not want to overstate it. Membership gives us access to resources and a partner ecosystem that can help us do this work more deliberately.",
        ],
        quote: {
          text: "When you build AI for real organisations, the model is only one part of the system. Reliability, structure and context are what turn intelligence into something teams can actually depend on.",
          person: "Alisha Fatima",
          role: "AI Infrastructure Engineer, Olyxee",
          href: "https://pk.linkedin.com/in/thealisha-fatima",
        },
      },
      {
        heading: "What comes next",
        paragraphs: [
          "The next steps are straightforward. We will deepen our technical capability around Claude, pursue Anthropic certifications across the team, continue building Orgni and expand Olyxee Logistics.",
          "We will use what we learn from real customer deployments to improve the infrastructure underneath both products. Where it makes sense, we will register Claude-powered deployments through the network and build a track record based on systems working in production.",
          "That evidence matters more to us than demos or AI for its own sake. We want to build infrastructure that becomes part of how work gets done.",
          "Our mission remains research and infrastructure for operational intelligence. Joining Anthropic’s Claude Partner Network gives us another foundation on which to build it.",
        ],
      },
    ],
  },
] satisfies ResearchEntry[]).sort((a, b) => b.date.localeCompare(a.date));

export const researchFilters = ["All entries", "Release", "Publication", "News"] as const;
export type ResearchFilter = (typeof researchFilters)[number];

function paragraphText(paragraph: ArticleParagraph) {
  return typeof paragraph === "string" ? paragraph : paragraph.text;
}

export function getReadingTime(entry: Pick<ResearchEntry, "deck" | "articleSections">) {
  const text = [
    entry.deck ?? "",
    ...(entry.articleSections ?? []).flatMap((section) => [
      section.heading ?? "",
      ...section.paragraphs.map(paragraphText),
      section.quote?.text ?? "",
      section.quote?.person ?? "",
      section.quote?.role ?? "",
    ]),
  ].join(" ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function getEntrySlug(url: string) {
  return url.split("/").filter(Boolean).pop() ?? "";
}