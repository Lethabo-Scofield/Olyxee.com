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
  list?: string[];
  image?: {
    src: string;
    alt: string;
    caption: string;
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
    coverImage: "/images/logos/anthropic.png",
    deck:
      "Olyxee has joined Anthropic’s Claude Partner Network, strengthening our ability to build and deploy intelligent systems around real business operations.",
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
          "For us, this is not simply another partnership announcement.",
          "It strengthens the direction Olyxee has been building toward from the beginning: creating the research and infrastructure that helps organisations operate with more context, speed and intelligence.",
          "Our focus is operational intelligence.",
          "That means building systems that do more than answer questions. Systems that understand how an organisation works, connect to its knowledge and workflows, identify what needs attention and help people move work forward.",
          "The Claude Partner Network gives Olyxee a stronger foundation to continue building that layer.",
          "Through the network, we gain access to Anthropic’s partner ecosystem, technical enablement, training and certification pathways, and a structured path for building and registering Claude-powered customer deployments.",
          "For us, the value is practical.",
          "It strengthens the engineering capability behind the systems we are already building and gives us a clearer path to take those systems deeper into real organisations.",
        ],
      },
      {
        heading: "From AI tools to operational intelligence",
        paragraphs: [
          "AI models are becoming more capable very quickly.",
          "But access to a capable model is only one part of building useful enterprise AI.",
          "The harder problems increasingly sit around the model.",
        ],
        list: ["Business context", "Data", "Permissions", "Workflows", "Integrations", "Security", "Governance", "Execution"],
      },
      {
        paragraphs: [
          "An AI system can reason extremely well and still be of limited value if it does not understand the organisation it is operating inside.",
          "That is where Olyxee is focused.",
          "We believe the next generation of enterprise AI will be defined less by standalone assistants and more by intelligent infrastructure embedded into the way organisations already operate.",
          "Systems that understand what is happening, why it is happening and what should happen next.",
          "That is the infrastructure layer we are building.",
        ],
      },
      {
        heading: "Orgni: intelligence for the organisation itself",
        paragraphs: [
          {
            text: "A major part of that direction is taking shape through Orgni.",
            links: [{ text: "Orgni", href: "https://orgni.olyxee.com/" }],
          },
          "Orgni is Olyxee’s intelligence layer for teams and business operations.",
          "Inside most organisations, important context is fragmented across documents, emails, messages, databases, business systems and the knowledge held by individual employees.",
          "That fragmentation creates operational friction.",
          "Someone waits for a manager to answer a question. A team searches across multiple systems for information. Important context gets lost between departments. Employees repeat work because they cannot easily see what has already happened.",
          "AI tools may be available, but without organisational context they still behave like generic assistants.",
          "Orgni is being built to close that gap.",
          "The goal is to give AI systems a deeper understanding of the organisation they are operating inside, while making that intelligence available directly in the environments where employees already work.",
          "That means connecting organisational knowledge, facts, relationships, workflows and operational context into a system that people and AI agents can use.",
          "The Claude Partner Network strengthens our ability to continue building that capability with Claude as one of the intelligence layers available within the broader system.",
        ],
        image: {
          src: "/images/orgni-product.png",
          alt: "Orgni showing organisational context for an employee role transfer",
          caption: "Orgni is being built as an intelligence layer for teams and business operations.",
        },
      },
      {
        heading: "Olyxee Logistics: operational intelligence in practice",
        paragraphs: [
          {
            text: "The same thinking is already being applied through Olyxee Logistics.",
            links: [{ text: "Olyxee Logistics", href: "https://logistics.olyxee.com/" }],
          },
          "Logistics is an environment where operational friction becomes visible very quickly.",
          "A single shipment can involve customers, suppliers, warehouses, invoices, payments, tracking numbers, shipment updates, internal teams and multiple hand-offs.",
          "When those processes are fragmented, people spend significant time following up, checking statuses, reconciling information and moving data between systems.",
          "Olyxee Logistics brings those operational workflows into one platform.",
          "The platform handles areas such as order management, invoicing, shipment tracking, customer communication, payment workflows and operational updates.",
          "For Olyxee, this is more than a standalone logistics product.",
          "It gives us a real operational environment in which to apply the broader thesis behind operational intelligence.",
          "The next step is not simply recording what happened.",
          "It is building systems that increasingly understand what requires attention, identify operational risks, automate repetitive work and support better decisions.",
          "That is where models like Claude become especially useful when combined with business context, workflow infrastructure and operational data.",
        ],
        image: {
          src: "/images/logistics/orders-dashboard.png",
          alt: "Olyxee Logistics order management dashboard",
          caption: "Olyxee Logistics applies the same operational intelligence thesis to real logistics workflows.",
        },
      },
      {
        heading: "Why this matters now",
        paragraphs: [
          "The conversation around AI is moving quickly from experimentation to execution.",
          "Businesses across markets are no longer asking only whether AI is useful. They are asking where it creates measurable operational value.",
        ],
        list: [
          "Can it reduce the amount of time employees spend searching for information?",
          "Can it remove blockers between teams?",
          "Can it improve customer response times?",
          "Can it automate repetitive operational work?",
          "Can it help people make better decisions?",
          "Can it operate securely within the context of a specific organisation?",
          "Can it connect to the systems and workflows the business already depends on?",
        ],
      },
      {
        paragraphs: [
          "These are the questions Olyxee is focused on.",
          "Our view is that the next phase of enterprise AI will not be defined simply by who has access to the most capable models.",
          "It will be defined by who can turn those models into reliable infrastructure for real organisations.",
          "That requires solving the harder problems around context, data, integrations, workflows, security, governance and execution.",
          "This is the layer Olyxee is building across Orgni, Olyxee Logistics and the infrastructure underneath them.",
        ],
      },
      {
        heading: "Building capability, not just consuming models",
        paragraphs: [
          "Joining the Claude Partner Network also matters internally.",
          "As Olyxee grows, we want the company to develop deeper technical capability around deploying advanced AI systems in production environments.",
          "That means training, certification, better architecture, better deployment practices, more experience with real customer environments and a stronger understanding of how advanced models behave when they are connected to real operational systems.",
          "Our goal is not simply to use Claude.",
          "Our goal is to build the capability required to turn models like Claude into dependable operational infrastructure.",
          "Models will continue to improve.",
          "The surrounding infrastructure will become increasingly important.",
          "That is where we intend to build.",
        ],
      },
      {
        heading: "What comes next",
        paragraphs: [
          "Our work within the Claude Partner Network is still at an early stage.",
          "The next steps are practical.",
        ],
        list: [
          "Deepen our technical capability around Claude",
          "Pursue Anthropic certifications across the team",
          "Continue building Orgni",
          "Continue expanding Olyxee Logistics",
          "Use real customer deployments to improve the infrastructure underneath both products",
          "Where appropriate, register Claude-powered deployments through the partner network as we build a stronger track record of production systems",
        ],
      },
      {
        paragraphs: [
          "Over time, we want the evidence behind Olyxee to come from real organisations using our systems to operate better.",
          "Not demos. Not AI for the sake of AI.",
          "Infrastructure that becomes part of how work gets done.",
          "Our mission remains unchanged:",
          "Research and infrastructure for operational intelligence.",
          "Joining Anthropic’s Claude Partner Network gives us another foundation on which to build it.",
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
      ...(section.list ?? []),
    ]),
  ].join(" ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function getEntrySlug(url: string) {
  return url.split("/").filter(Boolean).pop() ?? "";
}