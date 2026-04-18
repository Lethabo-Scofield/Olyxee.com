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

function GrysicsArchitecture() {
  const sources = [
    { y: 40, label: "Gmail", icon: "https://www.google.com/s2/favicons?domain=gmail.com&sz=128" },
    { y: 100, label: "Stripe", icon: "https://www.google.com/s2/favicons?domain=stripe.com&sz=128" },
    { y: 160, label: "QuickBooks", icon: "https://www.google.com/s2/favicons?domain=quickbooks.intuit.com&sz=128" },
    { y: 220, label: "Xero", icon: "https://www.google.com/s2/favicons?domain=xero.com&sz=128" },
    { y: 280, label: "Slack", icon: "https://www.google.com/s2/favicons?domain=slack.com&sz=128" },
  ];

  const outputs = [
    { y: 70, label: "Finance Reports", sub: "PDF · Sheets", color: "#0e7490", bg: "#ecfeff", border: "#a5f3fc" },
    { y: 200, label: "Notifications", sub: "Email · Slack", color: "#9a3412", bg: "#fff7ed", border: "#fed7aa" },
    { y: 330, label: "Audit Trail", sub: "Tamper-proof log", color: "#3730a3", bg: "#eef2ff", border: "#c7d2fe" },
  ];

  const sourceDots = sources.map((_, i) => ({
    id: `p-s${i}`,
    dur: `${2 + i * 0.25}s`,
    color: "#10b981",
    begin: `${0.2 * i}s`,
  }));

  const outputDots = outputs.map((_, i) => ({
    id: `p-o${i}`,
    dur: `${2.2 + i * 0.3}s`,
    color: outputs[i].color,
    begin: `${0.3 * i + 0.1}s`,
  }));

  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50/80 p-4 sm:p-6 overflow-hidden shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>
        <span className="hidden sm:inline text-[11px] font-mono text-neutral-400">grysics.olyxee.com</span>
      </div>

      <div className="-mx-4 sm:mx-0 overflow-x-auto sm:overflow-visible px-4 sm:px-0">
      <svg viewBox="0 0 800 420" className="w-full h-auto min-w-[640px] sm:min-w-0" xmlns="http://www.w3.org/2000/svg">
        <g fontFamily="ui-monospace, monospace">
          <text x="450" y="14" fontSize="9" fill="#a3a3a3" textAnchor="middle">SOURCES</text>
          <text x="680" y="14" fontSize="9" fill="#a3a3a3" textAnchor="middle">DELIVERABLES</text>
        </g>

        <path id="p-goal" d="M 80 210 C 160 210, 200 210, 240 210" fill="none" stroke="#e5e5e5" strokeWidth="1.5" strokeDasharray="3 3" />
        <path id="p-plan" d="M 300 170 C 300 130, 260 90, 200 70" fill="none" stroke="#e5e5e5" strokeWidth="1.5" strokeDasharray="3 3" />
        <path id="p-mem" d="M 300 250 C 300 290, 260 330, 200 350" fill="none" stroke="#e5e5e5" strokeWidth="1.5" strokeDasharray="3 3" />

        {sources.map((t, i) => (
          <path
            key={`s${i}`}
            id={`p-s${i}`}
            d={`M 360 210 C 410 210, 420 ${t.y}, 450 ${t.y}`}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        ))}

        {outputs.map((o, i) => (
          <path
            key={`o${i}`}
            id={`p-o${i}`}
            d={`M 360 210 C 500 210, 580 ${o.y}, 640 ${o.y}`}
            fill="none"
            stroke={o.border}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        ))}

        {[...sourceDots, ...outputDots, { id: "p-goal", dur: "2.6s", color: "#fb923c", begin: "0s" }, { id: "p-plan", dur: "2.2s", color: "#3b82f6", begin: "0.4s" }, { id: "p-mem", dur: "2.4s", color: "#a855f7", begin: "0.8s" }].map((d, i) => (
          <circle key={i} r="4" fill={d.color}>
            <animateMotion dur={d.dur} begin={d.begin} repeatCount="indefinite">
              <mpath href={`#${d.id}`} />
            </animateMotion>
          </circle>
        ))}

        <g>
          <circle cx="40" cy="210" r="32" fill="#ffffff" stroke="#d4d4d4" />
          <text x="40" y="206" textAnchor="middle" fontSize="9" fill="#737373" fontFamily="ui-monospace, monospace">FINANCE</text>
          <text x="40" y="220" textAnchor="middle" fontSize="9" fill="#737373" fontFamily="ui-monospace, monospace">GOAL</text>
        </g>

        <g>
          <rect x="240" y="168" width="120" height="84" rx="16" fill="#0a0a0a" />
          <image href="/images/grysics-logo.png" x="270" y="180" width="28" height="28" />
          <text x="308" y="200" fontSize="13" fill="#ffffff" fontWeight="600">Grysics</text>
          <text x="300" y="232" textAnchor="middle" fontSize="9" fill="#a3a3a3" fontFamily="ui-monospace, monospace">execution core</text>
        </g>

        <g>
          <rect x="140" y="46" width="120" height="48" rx="10" fill="#dbeafe" stroke="#bfdbfe" />
          <text x="200" y="68" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600">Planner</text>
          <text x="200" y="84" textAnchor="middle" fontSize="9" fill="#3b82f6" fontFamily="ui-monospace, monospace">decompose goal</text>
        </g>

        <g>
          <rect x="140" y="326" width="120" height="48" rx="10" fill="#f3e8ff" stroke="#e9d5ff" />
          <text x="200" y="348" textAnchor="middle" fontSize="11" fill="#6b21a8" fontWeight="600">Memory</text>
          <text x="200" y="364" textAnchor="middle" fontSize="9" fill="#a855f7" fontFamily="ui-monospace, monospace">ledger context</text>
        </g>

        {sources.map((t, i) => (
          <g key={`src-${i}`}>
            <rect x={450 - 50} y={t.y - 16} width="100" height="32" rx="10" fill="#ffffff" stroke="#e5e5e5" />
            <image href={t.icon} x={450 - 42} y={t.y - 10} width="20" height="20" />
            <text x={450 + 6} y={t.y + 4} textAnchor="middle" fontSize="10" fill="#404040" fontWeight="500">{t.label}</text>
          </g>
        ))}

        {outputs.map((o, i) => (
          <g key={`out-${i}`}>
            <rect x={640 - 60} y={o.y - 22} width="120" height="44" rx="10" fill={o.bg} stroke={o.border} strokeWidth="1.5" />
            <text x={640} y={o.y - 4} textAnchor="middle" fontSize="11" fill={o.color} fontWeight="600">{o.label}</text>
            <text x={640} y={o.y + 12} textAnchor="middle" fontSize="9" fill={o.color} opacity="0.7" fontFamily="ui-monospace, monospace">{o.sub}</text>
          </g>
        ))}
      </svg>
      </div>

      <div className="flex items-center justify-between mt-3 sm:mt-4 text-[10px] sm:text-[11px] font-mono text-neutral-400">
        <span>↻ read sources → reconcile → deliver</span>
        <span>finance · stateful</span>
      </div>
    </div>
  );
}

function GrysicsSpotlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-14 sm:mt-20"
    >
      <div className="lg:col-span-5 space-y-5">
        <div className="flex items-center gap-3">
          <Image src="/images/grysics-logo.png" alt="Grysics" width={36} height={36} className="rounded-lg" style={{ width: 36, height: 36 }} />
          <div>
            <p className="text-[11px] font-semibold text-orange-500 uppercase tracking-[0.2em]">Featured · Live</p>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-900 mt-1">Grysics</h2>
          </div>
        </div>
        <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
          An AI execution system that turns a single goal into a coordinated chain of tool calls, data lookups, and verifications, running across your stack with stateful memory.
        </p>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li className="flex gap-2"><span className="text-orange-400">•</span> Goal-to-workflow planning across distributed tools</li>
          <li className="flex gap-2"><span className="text-orange-400">•</span> Stateful memory that persists across runs</li>
          <li className="flex gap-2"><span className="text-orange-400">•</span> Verifiable, audit-friendly execution traces</li>
        </ul>
        <a
          href="https://grysics.olyxee.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
        >
          Visit Grysics <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
      <div className="lg:col-span-7">
        <GrysicsArchitecture />
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
  ];

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
            The route from <em className="text-blue-500">intelligence</em> to <em className="text-orange-500">execution</em>
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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500" />
            </span>
            you are here
          </div>

          <div className="-mx-3 sm:mx-0 overflow-x-auto sm:overflow-visible px-3 sm:px-0">
          <svg viewBox="0 0 880 420" className="w-full h-auto relative min-w-[700px] sm:min-w-0">
            <defs>
              <linearGradient id="route-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#fb923c" />
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

            <circle r="7" fill="#fb923c" filter="url(#soft-glow)">
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
                    <rect width="180" height="54" rx="10" fill="#ffffff" stroke={i === 2 ? "#fb923c" : "#e5e5e5"} strokeWidth={i === 2 ? 1.5 : 1} />
                    <text x="10" y="18" fontSize="9" fontFamily="ui-monospace, monospace" fill="#a3a3a3">{s.code}{i === 2 ? "  ·  ACTIVE" : ""}</text>
                    <text x="10" y="33" fontSize="11" fontWeight="600" fill="#0a0a0a">{s.title}</text>
                    <text x="10" y="47" fontSize="9" fill="#737373">{s.note}</text>
                  </g>

                  <circle cx={s.x} cy={s.y} r="14" fill="#ffffff" stroke="#e5e5e5" strokeWidth="1.5" />
                  <circle cx={s.x} cy={s.y} r="6" fill={i === 2 ? "#fb923c" : "#0a0a0a"} />
                  {i === 2 && (
                    <circle cx={s.x} cy={s.y} r="14" fill="none" stroke="#fb923c" strokeWidth="1.5" opacity="0.6">
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
        description="Systems built from Olyxee research for real-world AI operation. Grysics is an AI execution system that converts goals into completed workflows."
        path="/products"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Grysics",
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

      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/10"
          >
            <Image
              src="/images/products-hero-bg-v2.jpeg"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            <div className="relative px-6 sm:px-12 lg:px-16 py-20 sm:py-28 lg:py-36 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="flex items-center gap-3 mb-6"
              >
                <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee" width={24} height={24} className="opacity-80 invert" />
                <span className="text-sm font-medium text-white/70 uppercase tracking-widest">Products</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
              >
                Products
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-base sm:text-xl text-white/80 leading-relaxed max-w-xl font-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]"
              >
                Systems built from Olyxee research for real-world AI operation.
              </motion.p>
            </div>
          </motion.div>

          <GrysicsSpotlight />
        </div>
      </section>

      <ProductGallery />

      <ResearchRoadmap />


      <section className="relative pt-24 sm:pt-36 pb-32 sm:pb-44 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #f5f5f5 12%, #e5e5e5 25%, #a3a3a3 42%, #525252 58%, #262626 72%, #171717 85%, #0a0a0a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
          >
            <p className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.25em] mb-6">What comes next</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-800 mb-6 leading-snug">
              AI needs better foundations.
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
