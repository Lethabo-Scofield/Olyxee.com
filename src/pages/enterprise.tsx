import { FC, useState } from "react";
import Image from "next/image";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import TalkToEnterprise from "../components/EnterpriseContactModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Code2, Copy } from "lucide-react";

const SCREENS = [
  { 
    src: "/images/enterprise/desktops/teamsync.png", 
    logo: "/partner-logos/anthropic.svg",
    alt: "Team Sync", 
    rotate: -8, y: 30, z: 10 
  },
  { 
    src: "/images/enterprise/desktops/dashboard.png", 
    logo: "/partner-logos/google.svg",
    alt: "Dashboard", 
    rotate: -3, y: 0, z: 20 
  },
  { 
    src: "/images/enterprise/desktops/meeting.png", 
    logo: "/partner-logos/meta.svg",
    alt: "Meeting", 
    rotate: 3, y: 0, z: 30 
  },
  { 
    src: "/images/enterprise/desktops/absentify.png", 
    logo: "/partner-logos/nvidia.svg",
    alt: "Absentify", 
    rotate: 8, y: 30, z: 40 
  },
];

const LOGOS = [
  { src: "/partner-logos/anthropic-word.png", alt: "Anthropic", w: 110, h: 30 },
  { src: "/partner-logos/freightshift.png", alt: "FreightShift International Logistics", w: 160, h: 30 },
  { src: "/partner-logos/techxm.png", alt: "TechXM", w: 90, h: 45 },
  { src: "/partner-logos/monster-energy.png", alt: "Monster Energy", w: 60, h: 60 },
  { src: "/partner-logos/discovery.png", alt: "Discovery", w: 130, h: 45 },
];

const PLATFORM_TABS = [
  {
    id: "orgni",
    label: "Orgni",
    desc: "Your organization's operating layer — context, systems, and decisions connected in one place.",
    image: "/images/enterprise/orgni-ontology.png",
    alt: "Orgni ontology map for Olyxee",
  },
  {
    id: "order-loop",
    label: "Order Loop",
    desc: "Logistics and order coordination that keeps planning, execution, and fulfillment in sync.",
    image: "/images/enterprise/order-loop-tracking.png",
    alt: "Order Loop delivery tracking",
  },
  {
    id: "api",
    label: "API",
    desc: "Build on Olyxee infrastructure with a reliability-first API for your own products and workflows.",
    image: null,
    alt: "Olyxee API",
  },
] as const;

const API_PRODUCTS = ["Orgni", "Order Loop"] as const;
const API_STACKS = ["Terminal", "Python", "JavaScript"] as const;

const API_SNIPPETS: Record<
  (typeof API_PRODUCTS)[number],
  Record<(typeof API_STACKS)[number], { file: string; code: string }>
> = {
  Orgni: {
    Terminal: {
      file: "terminal",
      code: `curl https://api.olyxee.com/v1/orgni/workflows/execute \\
  -H "Authorization: Bearer $OLYXEE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "workflow": "reconcile-invoices",
    "context": { "period": "2026-Q3" }
  }'`,
    },
    Python: {
      file: "orgni_workflow.py",
      code: `import olyxee

client = olyxee.Client(api_key="OLYXEE_API_KEY")

run = client.orgni.workflows.execute(
    workflow="reconcile-invoices",
    context={"period": "2026-Q3"},
)

print(run.status)  # 'completed'`,
    },
    JavaScript: {
      file: "orgniWorkflow.js",
      code: `import Olyxee from "olyxee";

const client = new Olyxee({ apiKey: process.env.OLYXEE_API_KEY });

const run = await client.orgni.workflows.execute({
  workflow: "reconcile-invoices",
  context: { period: "2026-Q3" },
});

console.log(run.status); // 'completed'`,
    },
  },
  "Order Loop": {
    Terminal: {
      file: "terminal",
      code: `curl https://api.olyxee.com/v1/order-loop/orders/XX38169715GB/track \\
  -H "Authorization: Bearer $OLYXEE_API_KEY"`,
    },
    Python: {
      file: "track_order.py",
      code: `import olyxee

client = olyxee.Client(api_key="OLYXEE_API_KEY")

order = client.order_loop.orders.track("XX38169715GB")

print(order.status)     # 'in_transit'
print(order.eta)        # '2026-07-20'`,
    },
    JavaScript: {
      file: "trackOrder.js",
      code: `import Olyxee from "olyxee";

const client = new Olyxee({ apiKey: process.env.OLYXEE_API_KEY });

const order = await client.orderLoop.orders.track("XX38169715GB");

console.log(order.status); // 'in_transit'
console.log(order.eta);    // '2026-07-20'`,
    },
  },
};

const Enterprise: FC = () => {
  const [activeTab, setActiveTab] = useState<(typeof PLATFORM_TABS)[number]["id"]>("orgni");
  const currentTab = PLATFORM_TABS.find((t) => t.id === activeTab)!;
  const [apiProduct, setApiProduct] = useState<(typeof API_PRODUCTS)[number]>("Orgni");
  const [apiStack, setApiStack] = useState<(typeof API_STACKS)[number]>("Terminal");
  const [copied, setCopied] = useState(false);
  const apiSnippet = API_SNIPPETS[apiProduct][apiStack];

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(apiSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; do nothing
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111] font-sans selection:bg-neutral-200 selection:text-neutral-900 relative">
      <SEO
        title="Enterprise Systems"
        description="Olyxee designs enterprise AI systems for workflow execution, operational intelligence, financial integrity, logistics coordination, and persistent organizational cognition."
        path="/enterprise"
        keywords={[
          "Olyxee Enterprise",
          "Enterprise AI systems",
          "Operational intelligence",
          "Workflow automation",
          "Reconciliation",
          "Logistics coordination",
          "Organizational cognition",
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Olyxee Enterprise Systems",
          provider: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
          },
          description:
            "Enterprise AI systems for workflow execution, financial integrity, logistics coordination, and organizational cognition.",
          areaServed: "Global",
          url: "https://olyxee.com/enterprise",
        }}
      />
      <Header />

      {/* === HERO === */}
      <section className="relative pt-40 sm:pt-48 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden flex flex-col items-center text-center bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#e5e5e5]/40 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="flex flex-col items-center justify-center text-[2.75rem] sm:text-[4rem] lg:text-[5.5rem] font-medium tracking-tighter leading-[1.05]">
              <span className="inline-block px-5 py-2 sm:px-8 sm:py-3 mb-4 rounded-[2rem] border-[3px] border-[#e5e5e5] text-[#111111] bg-[#f5f5f5] lg:whitespace-nowrap">
                Operational intelligence
              </span>
              <span className="text-[#111]">
                everywhere you work.
              </span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-6 items-center justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#111] text-white rounded-full font-medium hover:bg-black transition-colors text-[15px] tracking-wide w-full sm:w-auto"
            >
              Get started
            </Link>
            <TalkToEnterprise
              label="Contact sales"
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-[#111] font-medium hover:text-[#111111] transition-colors text-[15px] w-full sm:w-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* === FANNED CARDS === */}
      <section className="relative w-full overflow-hidden pb-16 sm:pb-32 pt-12 sm:pt-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center items-center w-full max-w-[1400px] mx-auto px-4 sm:px-12 -space-x-[15%] sm:-space-x-[8%] lg:-space-x-[6%]"
        >
          {SCREENS.map((screen, i) => (
            <div
              key={i}
              className="relative shrink-0 w-[45%] sm:w-[28%] lg:w-[24%] aspect-[16/11] rounded-xl sm:rounded-2xl bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] ring-[4px] sm:ring-[8px] ring-white overflow-hidden group"
              style={{
                transform: `rotate(${screen.rotate}deg) translateY(${screen.y}px)`,
                zIndex: screen.z,
              }}
            >
              <Image
                src={screen.src}
                alt={screen.alt}
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* === TRUST LOGOS === */}
      <section className="py-12 border-y border-black/5 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-80 grayscale mix-blend-multiply">
          {LOGOS.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={logo.w}
              height={logo.h}
              className="h-10 sm:h-14 w-auto max-w-[200px] object-contain"
            />
          ))}
        </div>
      </section>

      {/* === SPOTLIGHT === */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-[#111111] font-medium text-[15px] mb-4">Introducing Orgni</p>
            <h2 className="text-[2.5rem] sm:text-[3.5rem] font-medium tracking-tighter text-[#111] mb-6 leading-[1.1]">
              Your context, systems, and decisions, running as one.
            </h2>
            <p className="text-[1.125rem] text-[#4a5568] mb-8 leading-relaxed">
              Orgni connects financial operations, operational workflows, and business memory so intelligent systems can act with full context across your enterprise.
            </p>
            <ul className="space-y-5 mb-10">
              {[
                "Connects financial operations and workflows",
                "Live business context layer for multi-agent systems",
                "Persistent organizational cognition and audit trails",
              ].map((item) => (
                <li key={item} className="flex items-start gap-4 text-[1.05rem] text-[#111]">
                  <Check className="w-5 h-5 mt-0.5 text-[#111111] shrink-0" strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/solutions"
              className="inline-flex items-center text-[#111111] font-medium hover:underline underline-offset-4 text-[15px]"
            >
              Learn more about Orgni <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] ring-1 ring-black/5 bg-white">
            <video
              src="/videos/research-areas.mp4"
              className="w-full h-full object-cover block"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </section>

      {/* === TEAMS GRID === */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[2.5rem] sm:text-[3.5rem] font-medium tracking-tighter text-[#111] mb-16 text-center leading-[1.1]">
            Intelligence for every team.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Finance", desc: "Reconcile transactions, audit trails, and ensure financial integrity across platforms." },
              { title: "Operations", desc: "Automate approvals, logistics, and supply chain tracking securely." },
              { title: "Engineering", desc: "Custom AI infrastructure and internal tool integration." },
              { title: "Support", desc: "Resolve issues faster with full organizational memory and customer context." },
            ].map((team) => (
              <div
                key={team.title}
                className="bg-[#fafafa] rounded-[1.5rem] p-8 transition-transform hover:-translate-y-1"
              >
                <h3 className="text-[1.25rem] font-medium text-[#111] mb-3">{team.title}</h3>
                <p className="text-[1rem] text-[#4a5568] leading-relaxed mb-8">{team.desc}</p>
                <Link
                  href="/solutions"
                  className="inline-flex items-center text-[#111111] font-medium hover:underline underline-offset-4 text-[15px]"
                >
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === COMPLETE PLATFORM === */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 max-w-6xl mx-auto text-center overflow-hidden">
        <h2 className="text-[2.5rem] sm:text-[4rem] font-medium tracking-tighter text-[#111] mb-6 leading-[1.1]">
          A complete AI platform for your business.
        </h2>
        <p className="text-[1.125rem] sm:text-[1.25rem] text-[#4a5568] mb-8 max-w-3xl mx-auto leading-relaxed">
          Deploy Olyxee infrastructure securely across your organization with advanced monitoring, custom integrations, and dedicated operational tools.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center text-[#111111] font-medium hover:underline underline-offset-4 text-[1.125rem] mb-12"
        >
          Explore detailed pricing <ArrowRight className="ml-1.5 w-4 h-4" />
        </Link>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-6" role="tablist" aria-label="Platform products">
          {PLATFORM_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-[15px] font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[#111] text-white"
                  : "bg-white text-[#4a5568] ring-1 ring-black/10 hover:text-[#111]"
              }`}
            >
              {tab.id === "orgni" ? (
                <Image
                  src="/Logo/orgni-mark.png"
                  alt=""
                  width={18}
                  height={18}
                  className={`w-[18px] h-[18px] object-contain ${activeTab === tab.id ? "" : "grayscale"}`}
                />
              ) : tab.id === "order-loop" ? (
                <Image
                  src="/Logo/order-loop-mark.png"
                  alt=""
                  width={18}
                  height={18}
                  className={`w-[18px] h-[18px] object-contain ${activeTab === tab.id ? "" : "grayscale"}`}
                />
              ) : (
                <Code2 className="w-[18px] h-[18px]" />
              )}
              {tab.label}
            </button>
          ))}
        </div>
        <p className="text-[1.05rem] text-[#4a5568] max-w-2xl mx-auto leading-relaxed mb-12">
          {currentTab.desc}
        </p>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-5xl mx-auto rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.1)] ${
            currentTab.image ? "" : "ring-[6px] sm:ring-[10px] ring-white bg-[#0d1117]"
          }`}
        >
          {currentTab.image ? (
            <Image
              src={currentTab.image}
              alt={currentTab.alt}
              width={1600}
              height={900}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="w-full h-auto"
            />
          ) : (
            <div className="flex flex-col text-left min-h-[420px]">
              <div className="flex flex-wrap items-center gap-3 px-4 sm:px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
                  {API_PRODUCTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setApiProduct(p)}
                      className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                        apiProduct === p ? "bg-white text-[#111]" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
                  {API_STACKS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setApiStack(s)}
                      className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                        apiStack === s ? "bg-white text-[#111]" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  onClick={copySnippet}
                  className="ml-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 border-b border-white/10">
                <span className="w-3 h-3 rounded-full bg-white/20" />
                <span className="w-3 h-3 rounded-full bg-white/20" />
                <span className="w-3 h-3 rounded-full bg-white/20" />
                <span className="ml-4 text-[13px] text-white/40 font-mono">{apiSnippet.file}</span>
              </div>
              <pre className="flex-1 overflow-x-auto px-6 sm:px-10 py-6 sm:py-8 font-mono text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed text-[#e6edf3] whitespace-pre">
                {apiSnippet.code}
              </pre>
            </div>
          )}
        </motion.div>
      </section>

      {/* === EXPLORE MORE === */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 max-w-7xl mx-auto border-t border-black/5">
        <h2 className="text-[2rem] font-medium tracking-tighter text-[#111] mb-10">
          Explore more
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { title: "Solutions", desc: "Custom deployments for complex organizations.", link: "/solutions" },
            { title: "Research", desc: "Discover our frontier models and AI capabilities.", link: "/research" },
            { title: "Developers", desc: "Build on top of Olyxee infrastructure.", link: "/developers" },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.link}
              className="block bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-black/5 rounded-[1.5rem] p-8 sm:p-10 hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all group"
            >
              <h3 className="text-[1.5rem] font-medium text-[#111] mb-3">{card.title}</h3>
              <p className="text-[1.05rem] text-[#4a5568] leading-relaxed mb-12">{card.desc}</p>
              <span className="inline-flex items-center text-[#111] font-medium group-hover:text-[#111111] transition-colors">
                Explore {card.title.toLowerCase()} <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 text-center max-w-4xl mx-auto border-t border-black/5">
        <h2 className="text-[2.5rem] sm:text-[4rem] font-medium tracking-tighter text-[#111] mb-10 leading-[1.05]">
          Interested in seeing how Olyxee works for your business?
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#111] text-white rounded-full font-medium hover:bg-black transition-colors text-[15px] tracking-wide w-full sm:w-auto"
          >
            Get started
          </Link>
          <TalkToEnterprise
            label="Contact sales"
            className="text-[#111] font-medium hover:text-[#111111] transition-colors text-[15px] w-full sm:w-auto"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enterprise;
