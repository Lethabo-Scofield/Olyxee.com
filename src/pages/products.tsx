import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const galleryImages = [
  { src: "/images/products-fintech-agents.png", label: "Fintech Agents" },
  { src: "/images/products-multi-agent.png", label: "Multi-Agent Systems" },
  { src: "/images/products-financial-ops.png", label: "Financial Operations" },
  { src: "/images/product-clustering.png", label: "Visual Embeddings" },
  { src: "/images/product-classifier.png", label: "Classifier Alignment" },
  { src: "/images/product-pipeline.png", label: "Pipeline Architecture" },
  { src: "/images/product-vision-inventory.png", label: "Vision Inventory Tracking" },
  { src: "/images/product-digital-twin.png", label: "Digital Twin Operations" },
  { src: "/images/product-supply-network.png", label: "Supply Network Routing" },
];

function OrdoArchitecture() {
  // What Ordo combines internally (reasoning models + workflow runner + tool connectors)
  const stack = [
    { y: 150, label: "Reasoning",    sub: "GPT-4 · Claude · DeepSeek",   color: "#1d4ed8", bg: "#dbeafe" },
    { y: 200, label: "Orchestration",sub: "Plan · coordinate · verify",   color: "#1e3a8a", bg: "#e0e7ff" },
    { y: 250, label: "Tool runtime", sub: "n8n-style, stateful",          color: "#0369a1", bg: "#e0f2fe" },
  ];

  // Connected tools Ordo can read/act on
  const tools = [
    { y: 50,  label: "Gmail",      icon: "https://www.google.com/s2/favicons?domain=gmail.com&sz=128" },
    { y: 100, label: "Stripe",     icon: "https://www.google.com/s2/favicons?domain=stripe.com&sz=128" },
    { y: 150, label: "QuickBooks", icon: "https://www.google.com/s2/favicons?domain=quickbooks.intuit.com&sz=128" },
    { y: 200, label: "Salesforce", icon: "https://www.google.com/s2/favicons?domain=salesforce.com&sz=128" },
    { y: 250, label: "Notion",     icon: "https://www.google.com/s2/favicons?domain=notion.so&sz=128" },
    { y: 300, label: "Slack",      icon: "https://www.google.com/s2/favicons?domain=slack.com&sz=128" },
  ];

  // Completed business deliverables
  const outputs = [
    { y: 90,  label: "Reconciled report", sub: "PDF · Sheets",       color: "#0e7490", bg: "#ecfeff", border: "#a5f3fc" },
    { y: 200, label: "Tasks completed",   sub: "Updates pushed",     color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
    { y: 310, label: "Audit trail",       sub: "Every step logged",  color: "#3730a3", bg: "#eef2ff", border: "#c7d2fe" },
  ];

  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50/80 p-4 sm:p-6 overflow-hidden shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">Live · Ordo runtime</span>
        </div>
        <span className="hidden sm:inline text-[11px] font-mono text-neutral-400">ordo.olyxee.com</span>
      </div>

      <div className="-mx-4 sm:mx-0 overflow-x-auto sm:overflow-visible px-4 sm:px-0">
      <svg viewBox="0 0 820 420" className="w-full h-auto min-w-[680px] sm:min-w-0" xmlns="http://www.w3.org/2000/svg">
        {/* column labels */}
        <g fontFamily="ui-monospace, monospace" fontSize="9" fill="#a3a3a3">
          <text x="100" y="22" textAnchor="middle">PLAIN-ENGLISH GOAL</text>
          <text x="380" y="22" textAnchor="middle">ORDO</text>
          <text x="600" y="22" textAnchor="middle">YOUR TOOLS</text>
          <text x="760" y="22" textAnchor="middle">DELIVERED</text>
        </g>

        {/* goal → ordo path */}
        <path id="p-goal-in" d="M 200 210 C 250 210, 280 200, 300 200" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* ordo → tools paths */}
        {tools.map((t, i) => (
          <path
            key={`pt${i}`}
            id={`p-tool-${i}`}
            d={`M 470 200 C 520 200, 540 ${t.y}, 575 ${t.y}`}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth="1.25"
            strokeDasharray="3 3"
          />
        ))}

        {/* ordo → deliverables paths */}
        {outputs.map((o, i) => (
          <path
            key={`po${i}`}
            id={`p-out-${i}`}
            d={`M 470 200 C 600 200, 680 ${o.y}, 720 ${o.y}`}
            fill="none"
            stroke={o.border}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        ))}

        {/* animated flowing dots */}
        <circle r="4" fill="#3b82f6">
          <animateMotion dur="2.4s" repeatCount="indefinite">
            <mpath href="#p-goal-in" />
          </animateMotion>
        </circle>
        {tools.map((_, i) => (
          <circle key={`dt${i}`} r="3.5" fill="#10b981">
            <animateMotion dur={`${2.4 + i * 0.2}s`} begin={`${i * 0.18}s`} repeatCount="indefinite">
              <mpath href={`#p-tool-${i}`} />
            </animateMotion>
          </circle>
        ))}
        {outputs.map((o, i) => (
          <circle key={`do${i}`} r="4" fill={o.color}>
            <animateMotion dur={`${2.6 + i * 0.25}s`} begin={`${i * 0.3 + 0.4}s`} repeatCount="indefinite">
              <mpath href={`#p-out-${i}`} />
            </animateMotion>
          </circle>
        ))}

        {/* GOAL — speech bubble with example */}
        <g>
          <rect x="20" y="170" width="180" height="80" rx="14" fill="#ffffff" stroke="#e5e5e5" />
          <text x="32" y="190" fontSize="9" fill="#a3a3a3" fontFamily="ui-monospace, monospace">YOU SAY</text>
          <text x="32" y="208" fontSize="11" fill="#0a0a0a" fontWeight="600">"Reconcile Q1</text>
          <text x="32" y="223" fontSize="11" fill="#0a0a0a" fontWeight="600">finances and email</text>
          <text x="32" y="238" fontSize="11" fill="#0a0a0a" fontWeight="600">leadership."</text>
          {/* tail */}
          <path d="M 200 210 L 212 215 L 200 222 Z" fill="#ffffff" stroke="#e5e5e5" />
        </g>

        {/* ORDO — internal stack visible */}
        <g>
          <rect x="300" y="100" width="170" height="220" rx="18" fill="#0a0a0a" />
          <image href="/images/ordo-logo.png" x="316" y="116" width="22" height="22" />
          <text x="346" y="132" fontSize="13" fill="#ffffff" fontWeight="600">Ordo</text>
          <text x="316" y="146" fontSize="8" fill="#a3a3a3" fontFamily="ui-monospace, monospace">execution engine</text>

          {stack.map((s) => (
            <g key={s.label}>
              <rect x="316" y={s.y - 18} width="138" height="38" rx="8" fill={s.bg} />
              <text x="324" y={s.y - 4} fontSize="11" fill={s.color} fontWeight="700">{s.label}</text>
              <text x="324" y={s.y + 10} fontSize="8.5" fill={s.color} opacity="0.8" fontFamily="ui-monospace, monospace">{s.sub}</text>
            </g>
          ))}
        </g>

        {/* TOOLS — connected systems */}
        {tools.map((t) => (
          <g key={`tool-${t.label}`}>
            <rect x={575} y={t.y - 14} width="90" height="28" rx="8" fill="#ffffff" stroke="#e5e5e5" />
            <image href={t.icon} x={583} y={t.y - 9} width="18" height="18" />
            <text x={608} y={t.y + 4} fontSize="10" fill="#404040" fontWeight="500">{t.label}</text>
          </g>
        ))}

        {/* DELIVERABLES — completed work */}
        {outputs.map((o) => (
          <g key={`out-${o.label}`}>
            <rect x={720} y={o.y - 22} width="92" height="44" rx="10" fill={o.bg} stroke={o.border} strokeWidth="1.5" />
            <text x={766} y={o.y - 4} textAnchor="middle" fontSize="10" fill={o.color} fontWeight="700">{o.label}</text>
            <text x={766} y={o.y + 11} textAnchor="middle" fontSize="8.5" fill={o.color} opacity="0.75" fontFamily="ui-monospace, monospace">{o.sub}</text>
          </g>
        ))}
      </svg>
      </div>

      <div className="flex items-center justify-between mt-3 sm:mt-4 text-[10px] sm:text-[11px] font-mono text-neutral-400">
        <span>goal → plan → tools → done</span>
        <span>stateful · auditable</span>
      </div>
    </div>
  );
}

function OrdoSpotlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-14 sm:mt-20"
    >
      <div className="lg:col-span-5 space-y-5">
        <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-[0.2em]">Featured · Live</p>
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-blue-100/60 blur-xl" aria-hidden />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center overflow-hidden">
              <Image
                src="/images/ordo-logo.png"
                alt="Ordo"
                width={96}
                height={96}
                className="w-[88%] h-[88%] object-contain"
              />
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900 leading-none">Ordo</h2>
            <p className="text-sm text-neutral-500 mt-2 font-mono">ordo.olyxee.com</p>
          </div>
        </div>
        <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
          An AI execution system that turns a single goal into a coordinated chain of tool calls, data lookups, and verifications, running across your stack with stateful memory.
        </p>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li className="flex gap-2"><span className="text-blue-500">•</span> Goal-to-workflow planning across distributed tools</li>
          <li className="flex gap-2"><span className="text-blue-500">•</span> Stateful memory that persists across runs</li>
          <li className="flex gap-2"><span className="text-blue-500">•</span> Verifiable, audit-friendly execution traces</li>
        </ul>
        <a
          href="https://ordo.olyxee.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Visit Ordo <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
      <div className="lg:col-span-7">
        <OrdoArchitecture />
      </div>
    </motion.div>
  );
}

function ResearchRoadmap() {
  const stations = [
    { x: 80, y: 320, title: "Execution Architectures", code: "R-01", note: "How AI systems run, not just think", labelPos: "below" as const },
    { x: 240, y: 180, title: "Multi-step Coordination", code: "R-02", note: "Sequencing decisions across tools", labelPos: "above" as const },
    { x: 410, y: 300, title: "Stateful Systems", code: "R-03", note: "Memory that survives across runs", labelPos: "below" as const },
    { x: 600, y: 160, title: "Tool & Environment Integration", code: "R-04", note: "Wiring AI into real software", labelPos: "above" as const },
    { x: 800, y: 280, title: "Reliability in Autonomy", code: "R-05", note: "Verifiable, auditable execution", labelPos: "below" as const },
  ] as const;

  const pathD = "M 80 320 C 150 320, 180 180, 240 180 S 350 380, 410 300 S 540 80, 600 160 S 740 360, 800 280";

  return (
    <section className="py-20 sm:py-32 border-t border-neutral-100 bg-gradient-to-b from-white to-neutral-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0}
          variants={fadeUp}
          className="mb-10 sm:mb-14 max-w-2xl"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.25em] mb-4">Research Roadmap</p>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-900 mb-4">
            The route from <em className="text-blue-500">intelligence</em> to <em className="text-blue-700">execution</em>
          </h2>
          <p className="text-base text-neutral-500 font-light leading-relaxed">
            Each station marks a research area we are actively shipping into Olyxee products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-neutral-200 bg-white p-4 sm:p-8 overflow-hidden shadow-[0_30px_80px_-40px_rgba(0,0,0,0.3)]"
        >
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
            backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest z-10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
            </span>
            you are here
          </div>

          <div className="-mx-3 sm:mx-0 overflow-x-auto sm:overflow-visible px-3 sm:px-0">
          <svg viewBox="0 0 880 420" className="w-full h-auto relative min-w-[700px] sm:min-w-0">
            <defs>
              <linearGradient id="route-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
              <filter id="soft-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g opacity="0.5" stroke="#d4d4d4" strokeWidth="0.5" fill="none">
              <path d="M 0 60 Q 220 100 440 70 T 880 90" />
              <path d="M 0 380 Q 240 360 480 390 T 880 370" />
            </g>

            <g opacity="0.35" fill="#a3a3a3" fontFamily="ui-monospace, monospace" fontSize="8">
              <text x="20" y="30">N</text>
              <text x="20" y="42">↑</text>
            </g>

            <path id="research-route" d={pathD} fill="none" stroke="#e5e5e5" strokeWidth="6" strokeLinecap="round" />
            <path d={pathD} fill="none" stroke="url(#route-grad)" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" filter="url(#soft-glow)" />

            <circle r="7" fill="#1e3a8a" filter="url(#soft-glow)">
              <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
                <mpath href="#research-route" />
              </animateMotion>
            </circle>
            <circle r="3" fill="#ffffff">
              <animateMotion dur="14s" repeatCount="indefinite">
                <mpath href="#research-route" />
              </animateMotion>
            </circle>

            {stations.map((s, i) => {
              const above = s.labelPos === "above";
              const blockY = above ? s.y - 78 : s.y + 24;
              const tickY1 = above ? s.y - 14 : s.y + 14;
              const tickY2 = above ? s.y - 24 : s.y + 24;
              return (
                <g key={s.code}>
                  <line x1={s.x} y1={tickY1} x2={s.x} y2={tickY2} stroke="#d4d4d4" strokeWidth="1" strokeDasharray="2 2" />

                  <g transform={`translate(${s.x - 90}, ${blockY})`}>
                    <rect width="180" height="54" rx="10" fill="#ffffff" stroke={i === 2 ? "#3b82f6" : "#e5e5e5"} strokeWidth={i === 2 ? 1.5 : 1} />
                    <text x="10" y="18" fontSize="9" fontFamily="ui-monospace, monospace" fill="#a3a3a3">{s.code}{i === 2 ? "  ·  ACTIVE" : ""}</text>
                    <text x="10" y="33" fontSize="11" fontWeight="600" fill="#0a0a0a">{s.title}</text>
                    <text x="10" y="47" fontSize="9" fill="#737373">{s.note}</text>
                  </g>

                  <circle cx={s.x} cy={s.y} r="14" fill="#ffffff" stroke="#e5e5e5" strokeWidth="1.5" />
                  <circle cx={s.x} cy={s.y} r="6" fill={i === 2 ? "#3b82f6" : "#0a0a0a"} />
                  {i === 2 && (
                    <circle cx={s.x} cy={s.y} r="14" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6">
                      <animate attributeName="r" from="14" to="26" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.6" to="0" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductGallery() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16 max-w-2xl"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Inside the system</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 leading-[1.1]">
            How the pieces fit together
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {galleryImages.map((img, idx) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: Math.min(idx * 0.06, 0.3) }}
              className="group rounded-2xl overflow-hidden border border-neutral-100 bg-neutral-50 hover:border-neutral-200 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                />
              </div>
              <figcaption className="px-5 py-4 flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">{img.label}</span>
                <span className="text-xs font-mono text-neutral-300">0{idx + 1}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const ProductsPage: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Products"
        description="Systems built from Olyxee research for real-world AI operation. Ordo is an AI execution system that converts goals into completed workflows."
        path="/products"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Ordo",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Cloud",
          description: "AI execution system that converts high-level goals into completed operational workflows across tools and data sources.",
          creator: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
          },
        }}
      />
      <div className="grain" />
      <Header />

      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.25em] mb-5">Products</p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight text-neutral-900 leading-[1.05] mb-6">
              Research, shipped as <em className="text-blue-600">working systems</em>.
            </h1>
            <p className="text-lg sm:text-xl text-neutral-500 leading-relaxed font-light max-w-2xl">
              Olyxee turns research into products you can actually run. Today that means <span className="text-neutral-800 font-normal">Ordo</span> - an AI execution system for real business operations.
            </p>
          </motion.div>

          <OrdoSpotlight />
        </div>
      </section>

      <ProductGallery />

      <ResearchRoadmap />


      <section className="relative py-24 sm:py-36 px-4 sm:px-6 border-t border-neutral-100 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
          >
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.25em] mb-5">What comes next</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 mb-6 leading-[1.1]">
              AI needs <em className="text-blue-600">better foundations</em>.
            </h2>
            <p className="text-base sm:text-xl text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              We are building those foundations. Join us on the journey.
            </p>
            <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 px-6 py-3 rounded-full transition-colors duration-200">
              View open roles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
