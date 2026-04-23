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
  // Apps Ordo can use on your behalf
  const tools = [
    { y: 70,  label: "Gmail",      icon: "https://www.google.com/s2/favicons?domain=gmail.com&sz=128" },
    { y: 130, label: "Stripe",     icon: "https://www.google.com/s2/favicons?domain=stripe.com&sz=128" },
    { y: 190, label: "QuickBooks", icon: "https://www.google.com/s2/favicons?domain=quickbooks.intuit.com&sz=128" },
    { y: 250, label: "Salesforce", icon: "https://www.google.com/s2/favicons?domain=salesforce.com&sz=128" },
    { y: 310, label: "Notion",     icon: "https://www.google.com/s2/favicons?domain=notion.so&sz=128" },
    { y: 370, label: "Slack",      icon: "https://www.google.com/s2/favicons?domain=slack.com&sz=128" },
  ];

  // What you get back at the end
  const outputs = [
    { y: 110, label: "Finished report",  color: "#0e7490", bg: "#ecfeff", border: "#a5f3fc" },
    { y: 220, label: "Updates sent",     color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
    { y: 330, label: "Full audit trail", color: "#3730a3", bg: "#eef2ff", border: "#c7d2fe" },
  ];

  // Step badge helper
  const StepBadge = ({ x, n }: { x: number; n: number }) => (
    <g>
      <circle cx={x} cy={28} r="13" fill="#0a0a0a" />
      <text x={x} y={33} textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">{n}</text>
    </g>
  );

  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50/80 p-4 sm:p-6 overflow-hidden shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">How Ordo works</span>
        </div>
        <span className="hidden sm:inline text-[11px] font-mono text-neutral-400">ordo.olyxee.com</span>
      </div>

      <div className="w-full">
      <svg viewBox="0 0 860 460" className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
        {/* Step badges */}
        <StepBadge x={110} n={1} />
        <StepBadge x={400} n={2} />
        <StepBadge x={605} n={3} />
        <StepBadge x={780} n={4} />

        {/* Plain-English step titles */}
        <g fontFamily="ui-sans-serif, system-ui" fontSize="13" fontWeight="700" fill="#0a0a0a">
          <text x="135" y="33">You ask</text>
          <text x="425" y="33">Ordo thinks</text>
          <text x="630" y="33">Uses your apps</text>
          <text x="805" y="33">Done</text>
        </g>

        {/* Connecting paths */}
        <path id="p-goal-in" d="M 215 230 C 280 230, 310 220, 335 220" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" />
        {tools.map((t, i) => (
          <path
            key={`pt${i}`}
            id={`p-tool-${i}`}
            d={`M 470 220 C 520 220, 540 ${t.y}, 575 ${t.y}`}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
        ))}
        {outputs.map((o, i) => (
          <path
            key={`po${i}`}
            id={`p-out-${i}`}
            d={`M 698 ${o.y} C 720 ${o.y}, 730 ${o.y}, 752 ${o.y}`}
            fill="none"
            stroke={o.border}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        ))}

        {/* Animated flow dots */}
        <circle r="5" fill="#3b82f6">
          <animateMotion dur="2.4s" repeatCount="indefinite">
            <mpath href="#p-goal-in" />
          </animateMotion>
        </circle>
        {tools.map((_, i) => (
          <circle key={`dt${i}`} r="4" fill="#10b981">
            <animateMotion dur={`${2.6 + i * 0.2}s`} begin={`${i * 0.18}s`} repeatCount="indefinite">
              <mpath href={`#p-tool-${i}`} />
            </animateMotion>
          </circle>
        ))}
        {outputs.map((o, i) => (
          <circle key={`do${i}`} r="5" fill={o.color}>
            <animateMotion dur={`${2.4 + i * 0.2}s`} begin={`${i * 0.3 + 0.4}s`} repeatCount="indefinite">
              <mpath href={`#p-out-${i}`} />
            </animateMotion>
          </circle>
        ))}

        {/* STEP 1 — Speech bubble with plain example */}
        <g>
          <rect x="20" y="170" width="195" height="120" rx="14" fill="#ffffff" stroke="#e5e5e5" strokeWidth="1.5" />
          <text x="34" y="195" fontSize="10" fill="#94a3b8" fontFamily="ui-monospace, monospace">YOU SAY:</text>
          <text x="34" y="220" fontSize="14" fill="#0a0a0a" fontWeight="600">“Reconcile our</text>
          <text x="34" y="240" fontSize="14" fill="#0a0a0a" fontWeight="600">Q1 finances and</text>
          <text x="34" y="260" fontSize="14" fill="#0a0a0a" fontWeight="600">email leadership</text>
          <text x="34" y="280" fontSize="14" fill="#0a0a0a" fontWeight="600">the summary.”</text>
          <path d="M 215 225 L 230 232 L 215 240 Z" fill="#ffffff" stroke="#e5e5e5" strokeWidth="1.5" />
        </g>

        {/* STEP 2 — Ordo black box, simplified (no jargon stack) */}
        <g>
          <rect x="335" y="115" width="135" height="210" rx="18" fill="#0a0a0a" />
          <image href="/images/ordo-logo.png" x="385" y="140" width="36" height="36" />
          <text x="402" y="200" textAnchor="middle" fontSize="18" fill="#ffffff" fontWeight="700" fontFamily="ui-serif, Georgia">Ordo</text>

          {/* 3 simple plain-English actions */}
          <g fontFamily="ui-sans-serif, system-ui" fontSize="11" fill="#ffffff">
            <g>
              <circle cx="352" cy="232" r="3" fill="#60a5fa" />
              <text x="362" y="236" fontWeight="500">Plans the steps</text>
            </g>
            <g>
              <circle cx="352" cy="262" r="3" fill="#60a5fa" />
              <text x="362" y="266" fontWeight="500">Picks the right tools</text>
            </g>
            <g>
              <circle cx="352" cy="292" r="3" fill="#60a5fa" />
              <text x="362" y="296" fontWeight="500">Checks its work</text>
            </g>
          </g>
        </g>

        {/* STEP 3 — Tool icons */}
        {tools.map((t) => (
          <g key={`tool-${t.label}`}>
            <rect x={575} y={t.y - 16} width="123" height="32" rx="9" fill="#ffffff" stroke="#e5e5e5" strokeWidth="1.25" />
            <image href={t.icon} x={585} y={t.y - 10} width="20" height="20" />
            <text x={613} y={t.y + 5} fontSize="12" fill="#262626" fontWeight="500">{t.label}</text>
          </g>
        ))}

        {/* STEP 4 — Deliverables */}
        {outputs.map((o) => (
          <g key={`out-${o.label}`}>
            <rect x={752} y={o.y - 22} width="96" height="44" rx="10" fill={o.bg} stroke={o.border} strokeWidth="1.75" />
            <text x={800} y={o.y + 4} textAnchor="middle" fontSize="11" fill={o.color} fontWeight="700">{o.label}</text>
          </g>
        ))}
      </svg>
      </div>

      <div className="flex items-center justify-between mt-3 sm:mt-4 text-[11px] sm:text-[12px] text-neutral-500">
        <span className="font-medium">Tell it your goal → it does the work for you</span>
        <span className="hidden sm:inline font-mono text-neutral-400">remembers · auditable</span>
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

          <div className="w-full">
          <svg viewBox="0 0 880 420" className="w-full h-auto block relative">
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

            <div className="relative px-6 sm:px-12 lg:px-16 py-20 sm:py-28 lg:py-36 max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-xs font-semibold text-blue-300 uppercase tracking-[0.25em] mb-5"
              >
                Products
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
              >
                Research, shipped as <em className="text-blue-300">working systems</em>.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-base sm:text-xl text-white/80 leading-relaxed max-w-xl font-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]"
              >
                Olyxee turns research into products you can actually run. Today that means <span className="text-white font-normal">Ordo</span> — an AI execution system for real business operations.
              </motion.p>
            </div>
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
