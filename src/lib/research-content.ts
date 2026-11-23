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
  links?: ArticleLink[];
  /** Renders the paragraph as a larger pull statement. */
  emphasis?: boolean;
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
  /** Shorter heading shown on the article page; the full title is still used for the list and SEO. */
  headline?: string;
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
      "A practical look at freight operations and the work of bringing shipment events, responsibilities, service rules and customer commitments into one view with Orgni.",
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
      "Olyxee joins Anthropic’s Claude Partner Network, supporting its research into Organizational Intelligence and its work on Orgni and Freightics.",
    coverImage: "/images/research/claude-partner-network/olyxee-claude-partner-network.png",
    deck:
      "What the network means for our research direction and for the organizations we work with.",
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
          "The announcement matters to us because it supports work already underway. Olyxee is researching Organizational Intelligence: how systems might understand organizational activity, coordinate people and machines, and adapt over time.",
          "Through the network, we gain access to Anthropic’s partner ecosystem, technical enablement, training and certification pathways, and a structured path for building and registering Claude-powered customer deployments.",
          "The value is practical. It strengthens our engineering capability and gives us a clearer route for taking these systems into real organisations.",
        ],
      },
      {
        heading: "Building around real operations",
        paragraphs: [
          "Access to a capable model is only one part of building useful enterprise AI. The difficult work sits around it: business context, data, permissions, integrations, security and the workflows in which decisions are actually made.",
          "A model can reason well and still be of limited use without context about the organization in which it is used. We are exploring how systems could take organizational context into account while remaining part of the environments where people already work.",
          {
            text: "Orgni is an intelligence layer for everyday organizational work, and an applied environment for our broader research.",
            links: [{ text: "Orgni", href: "https://orgni.olyxee.com/" }],
          },
          "Organizational knowledge and activity can be spread across documents, messages, business systems and the knowledge held by employees. Orgni connects organizational knowledge, systems and people so employees and AI agents can access information with more context.",
          {
            text: "We are applying the same thinking through Freightics.",
            links: [{ text: "Freightics", href: "https://freightics.olyxee.com/" }],
          },
          "Logistics makes coordination across complex operations easy to see. One shipment can involve customers, suppliers, warehouses, invoices, payments, tracking updates and several hand-offs. Freightics is a practical freight operations platform and gives us experience building software for this real-world environment.",
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
          "Orgni is intended to make organizational knowledge and systems more accessible in the context of everyday work; it is not a claim that Olyxee has solved organizational intelligence.",
          "Our research asks how systems might coordinate with people and take organizational context into account while respecting human objectives and governance.",
          "We are exploring how these ideas could support work across organizations. The benefits will depend on the needs, systems and practices of each environment.",
          "The network also gives our engineers access to technical guidance and training as we continue this work. We will evaluate where Claude is useful and how it might be introduced responsibly in a particular setting.",
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
          "The next steps are straightforward. We will deepen our technical capability around Claude, pursue Anthropic certifications across the team, continue building Orgni and expand Freightics.",
          "We will use what we learn from real customer deployments to improve the infrastructure underneath both products. Where it makes sense, we will register Claude-powered deployments through the network and build a track record based on systems working in production.",
          "That evidence matters more to us than demos or AI for its own sake. We want to build infrastructure that becomes part of how work gets done.",
          "Our mission is to develop the foundations of Organizational Intelligence. Joining Anthropic’s Claude Partner Network gives us another resource as we pursue that long-term research direction.",
        ],
        image: {
          src: "/images/tag-orgni-celebrate.webp",
          alt: "A smiling team member celebrating at her laptop, with the words Tag @Orgni in",
          caption: "Tag @Orgni in Microsoft Teams.",
        },
      },
    ],
  },
  {
    category: "News",
    source: "Olyxee",
    title: "Olyxee wins Best AI Research and Innovation at the South African AI Awards 2026",
    authors: "Olyxee",
    venue: "Olyxee",
    month: "Nov",
    year: "2026",
    date: "2026-11-14",
    url: "/research/news/olyxee-wins-best-ai-research-and-innovation-2026",
    description:
      "Olyxee has been named winner of Best AI Research and Innovation at the South African AI Awards 2026, recognising its work towards the foundations of intelligent computing.",
    coverImage: "/images/research/south-african-ai-awards/olyxee-best-ai-research-innovation-2026.webp",
    headline: "Olyxee wins Best AI Research and Innovation",
    articleSections: [
      {
        paragraphs: [
          "Olyxee has been named the winner of Best AI Research and Innovation at the South African AI Awards 2026, held on 13 November at The Galleria in Sandton.",
          "The recognition marks a significant milestone for the South African artificial intelligence research and technology company as it pursues an ambitious goal: building the foundations for the next generation of intelligent computing.",
          "While much of the AI industry focuses on developing increasingly capable models and assistants, Olyxee is investigating a deeper challenge: how intelligence can become a reliable, adaptive and continuously evolving capability within the systems organisations depend on.",
        ],
      },
      {
        heading: "Beyond Artificial Intelligence Assistants",
        paragraphs: [
          "Today's AI systems can generate text, analyse information and solve complex problems. However, organisations operate within environments governed by financial rules, operational processes, business policies and accountability requirements.",
          "Making AI useful in these environments requires more than generating convincing answers. Intelligent systems must be able to understand constraints, perform reliable computations, maintain organisational knowledge and adapt without compromising control.",
          "This challenge is central to Olyxee's research into Neuro-Symbolic Autonomous Systems, combining neural learning with explicit reasoning, formal rules and verifiable computation.",
          "Our ambition is to move beyond AI that simply responds to instructions towards computing infrastructure that enables organisations to understand, reason, make decisions and improve their operations over time.",
        ],
      },
      {
        heading: "Turning Research into Technology",
        paragraphs: [
          "Olyxee's work extends beyond theoretical exploration. Through research releases, experimental systems and software development, our multidisciplinary team is investigating how these principles can be translated into practical computing technologies.",
          {
            text: "One example is FinIR, our open-source financial intermediate representation and execution runtime.",
            links: [{ text: "FinIR", href: "/research/finir" }],
          },
          "FinIR addresses a critical challenge in AI-powered financial computing: ensuring that calculations remain deterministic, traceable and consistent rather than relying entirely on AI-generated code.",
          "By introducing finance-aware types, dependency tracking and incremental computation, FinIR provides a computational foundation for more reliable financial reasoning.",
          "In a published reproducible synthetic experiment, FinIR reduced recomputations from 6,000 to 3,600, demonstrating a 40% reduction in repeated calculations under the tested conditions.",
          {
            text: "Beyond research, Olyxee is developing Orgni as a practical entry point for intelligent computing in the workplace, exploring how organisational information, knowledge and operational context can support more useful and accountable AI systems.",
            links: [{ text: "Orgni", href: "https://orgni.olyxee.com/" }],
          },
          "Together, these efforts represent an emerging research-to-technology pathway: moving scientific ideas into software that can be tested, evaluated and progressively improved.",
        ],
      },
      {
        heading: "Why This Recognition Matters",
        paragraphs: [
          "The Best AI Research and Innovation category recognises technical originality, contributions to AI research, practical applicability, knowledge sharing and responsible research.",
          "For Olyxee, winning this award recognises the importance of pursuing foundational technological questions while working towards real-world applications.",
          "Our work begins in the financial sector, where accuracy, traceability and governance are essential. However, the long-term ambition extends across industries.",
          "We envision a future in which intelligence is not simply a service organisations access, but a computing capability they can develop, retain and continuously advance.",
          "This is the future of intelligent computing that Olyxee is working to make possible.",
        ],
      },
      {
        heading: "Built by a Team, Driven by Research",
        paragraphs: [
          "This milestone reflects the dedication of Olyxee's multidisciplinary research and engineering team spanning South Africa and South Asia.",
          "Their work brings together machine learning, software engineering, mathematical reasoning and systems research, with a shared commitment to advancing what intelligent computing can achieve.",
          "The award represents both recognition of the work undertaken and a responsibility to continue strengthening its scientific foundations.",
        ],
      },
      {
        heading: "The Work Continues",
        paragraphs: [
          "Winning Best AI Research and Innovation is an important achievement, but Olyxee's long-term mission remains unchanged.",
          "We will continue investing in foundational research, developing experimental technologies and exploring new computing architectures that bring learning, reasoning, autonomy and reliability together.",
          "“The greatest breakthroughs in AI computing are still ahead of us, and we intend to contribute to the science that makes them possible.”",
          "Olyxee | Advancing the Foundations of Intelligent Computing",
        ],
      },
    ],
  },
  {
    category: "News",
    source: "Olyxee",
    title: "Olyxee and Blackroid Unite Research and Enterprise Expertise to Advance Intelligent Computing",
    authors: "Olyxee",
    venue: "Olyxee",
    month: "Nov",
    year: "2026",
    date: "2026-11-23",
    url: "/research/news/olyxee-and-blackroid-advance-intelligent-computing",
    description:
      "Olyxee and Blackroid announce a strategic alignment connecting artificial intelligence research with enterprise service delivery, to advance intelligent computing and translate progress into measurable business impact.",
    coverImage: "/images/research/blackroid/olyxee-blackroid-alignment.webp",
    deck:
      "A strategic alignment connecting scientific research with real-world execution.",
    articleSections: [
      {
        paragraphs: [
          "Today, we are announcing a strategic alignment between Olyxee and Blackroid, bringing together our artificial intelligence research capabilities and enterprise service delivery experience under a shared vision: advancing intelligent computing and translating technological progress into measurable business impact.",
          "This marks an important step in how we intend to connect scientific discovery, advanced engineering, and commercial execution.",
        ],
      },
      {
        heading: "Bringing Together Two Complementary Strengths",
        paragraphs: [
          "At Olyxee, we have built a multidisciplinary team of researchers and engineers spanning South Africa and South Asia, united by an ambition to investigate some of the most fundamental unsolved problems in machine intelligence.",
          "Our work focuses on advancing the mathematical principles and computational architectures that could enable machines to autonomously form knowledge, discover previously unknown principles, and develop generalisable understanding.",
          "Alongside this research, Blackroid has been working with enterprise clients, gaining practical experience in understanding organisational challenges, engineering business solutions, and delivering technology within real operational environments.",
          "Through these experiences, we recognised an important opportunity.",
          { text: "Organisations do not necessarily need more technology to manage. They need complex problems solved, operations executed reliably, and measurable results delivered.", emphasis: true },
          "At the same time, advances in artificial intelligence create opportunities to fundamentally rethink how business services are delivered.",
          "Bringing Olyxee and Blackroid together strategically allows us to approach this challenge from both directions: scientific research and real-world execution.",
        ],
      },
      {
        heading: "From Research to Real-World Impact",
        paragraphs: [
          "Under this direction, Olyxee will continue concentrating on the scientific foundations of intelligent computing, including mathematical reasoning, autonomous knowledge formation, adaptive intelligence, and new computational architectures.",
          "Blackroid will focus on translating technological capabilities into commercial value through AI-native business services and enterprise transformation.",
          "By combining intelligent software infrastructure with specialist expertise, Blackroid is building a model in which organisations can outsource complex operations and receive completed services rather than simply acquiring software to operate themselves.",
          "Our initial commercial exploration includes financial services, insurance, healthcare, and enterprise technology, with opportunities extending beyond individual industries and geographical markets.",
          "As Olyxee's research advances, applicable discoveries may become part of the computational infrastructure supporting Blackroid's services.",
          "This creates a pathway for scientific progress to inform commercial applications, while the challenges encountered in real business environments can help shape new research questions.",
        ],
      },
      {
        heading: "One Vision, Distinct Responsibilities",
        paragraphs: [
          "This strategic alignment does not change Olyxee's fundamental purpose.",
          "We remain committed to advancing intelligent computing as a scientific discipline, investigating capabilities beyond conventional software, existing AI applications, and today's dominant computational architectures.",
          "Blackroid brings a complementary commercial focus, combining technology, specialist expertise, and operational accountability to deliver services that organisations can rely on.",
          "Together, we aim to establish a stronger connection between the creation of new computing capabilities and their application to meaningful economic and organisational challenges.",
        ],
      },
      {
        heading: "Looking Ahead",
        paragraphs: [
          "We believe the next significant advances in artificial intelligence will require more than increasingly capable models. They will require new approaches to how computational systems acquire knowledge, reason, adapt, and operate.",
          "Our researchers and engineers are pursuing these questions at Olyxee.",
          "Through Blackroid, we are establishing a commercial pathway for bringing applicable advances into business operations, informed by enterprise delivery experience and real customer needs.",
          { text: "This is the direction we are building toward: advancing the science of intelligent computing while creating the infrastructure and expertise to turn its progress into real-world value.", emphasis: true },
        ],
      },
      {
        heading: "About Olyxee and Blackroid",
        paragraphs: [
          "Olyxee is an artificial intelligence research company with a multidisciplinary team spanning South Africa and South Asia. Its research focuses on advancing the foundations of intelligent computing through new mathematical principles, computational architectures, and autonomous knowledge formation.",
          "Blackroid is an AI-native business services company combining artificial intelligence, software infrastructure, and specialist expertise to solve complex operational challenges and deliver measurable business outcomes.",
          {
            text: "Learn more: Olyxee | Blackroid",
            links: [
              { text: "Olyxee", href: "https://olyxee.com" },
              { text: "Blackroid", href: "https://blackroid.com" },
            ],
          },
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