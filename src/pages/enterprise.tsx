import { FC, useState } from "react";
import Image from "next/image";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import TalkToEnterprise from "../components/EnterpriseContactModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Code2, Copy, TerminalSquare } from "lucide-react";

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
            <h1 className="flex flex-col items-center justify-center text-[2rem] min-[420px]:text-[2.5rem] sm:text-[4rem] lg:text-[5.5rem] font-medium tracking-tighter leading-[1.05]">
              <span className="inline-block px-4 py-2 sm:px-8 sm:py-3 mb-4 rounded-[1.25rem] sm:rounded-[2rem] border-[3px] border-[#e5e5e5] text-[#111111] bg-[#f5f5f5] lg:whitespace-nowrap">
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
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 sm:gap-20 opacity-80 grayscale mix-blend-multiply">
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
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6" role="tablist" aria-label="Platform products">
          {PLATFORM_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 sm:px-7 py-2 sm:py-2.5 rounded-full text-[14px] sm:text-[15px] font-medium transition-colors ${
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
            <div className="flex flex-col text-left min-h-[460px] font-mono">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 bg-white/[0.04] border-b border-white/10">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="flex-1 text-center text-[13px] text-white/40 truncate hidden min-[480px]:block">
                  olyxee@enterprise — {apiSnippet.file}
                </span>
                <span className="flex-1 min-[480px]:hidden" />
                <button
                  onClick={copySnippet}
                  aria-label="Copy code"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Product + stack pickers, terminal-styled */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 sm:px-8 py-4 border-b border-white/10 text-[13px]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-white/40">product:</span>
                  {API_PRODUCTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setApiProduct(p)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-colors ${
                        apiProduct === p
                          ? "border-white/60 bg-white/10 text-white"
                          : "border-white/15 text-white/50 hover:text-white hover:border-white/40"
                      }`}
                    >
                      <Image
                        src={p === "Orgni" ? "/Logo/orgni-mark.png" : "/Logo/order-loop-mark.png"}
                        alt=""
                        width={14}
                        height={14}
                        className={`w-3.5 h-3.5 object-contain ${apiProduct === p ? "" : "grayscale opacity-60"}`}
                      />
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-white/40">run with:</span>
                  {API_STACKS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setApiStack(s)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-colors ${
                        apiStack === s
                          ? "border-white/60 bg-white/10 text-white"
                          : "border-white/15 text-white/50 hover:text-white hover:border-white/40"
                      }`}
                    >
                      {s === "Terminal" ? (
                        <TerminalSquare className="w-3.5 h-3.5" />
                      ) : s === "Python" ? (
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                          <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                        </svg>
                      )}
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal body */}
              <pre className="flex-1 overflow-x-auto px-5 sm:px-8 py-6 sm:py-8 text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed text-[#e6edf3] whitespace-pre">
                <span className="text-[#28c840]">➜</span>
                <span className="text-white/40">{" ~ "}</span>
                {apiStack !== "Terminal" && (
                  <span className="text-white/40">{`cat ${apiSnippet.file}\n`}</span>
                )}
                {apiSnippet.code}
                {"\n\n"}
                <span className="text-[#28c840]">➜</span>
                <span className="text-white/40">{" ~ "}</span>
                <span className="inline-block w-2 h-4 align-middle bg-white/70 animate-pulse" />
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Solutions", desc: "Custom deployments for complex organizations.", link: "/solutions", image: "/images/enterprise/explore-solutions.png" },
            { title: "Research", desc: "Discover our frontier models and AI capabilities.", link: "/research", image: "/images/enterprise/explore-research.png" },
            { title: "Developers", desc: "Build on top of Olyxee infrastructure.", link: "/developers", image: "/images/enterprise/explore-developers.png" },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.link}
              className="block bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-black/5 rounded-[1.5rem] overflow-hidden hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all group"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={`${card.title} illustration`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-8 sm:p-10 pt-6 sm:pt-8">
              <h3 className="text-[1.5rem] font-medium text-[#111] mb-3">{card.title}</h3>
              <p className="text-[1.05rem] text-[#4a5568] leading-relaxed mb-12">{card.desc}</p>
              <span className="inline-flex items-center text-[#111] font-medium group-hover:text-[#111111] transition-colors">
                Explore {card.title.toLowerCase()} <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              </div>
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
