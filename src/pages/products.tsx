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
  { src: "/images/product-knowledge-graph.png", label: "Concept Knowledge Graph" },
  { src: "/images/product-vision-inventory.png", label: "Vision Inventory Tracking" },
  { src: "/images/product-digital-twin.png", label: "Digital Twin Operations" },
  { src: "/images/product-supply-network.png", label: "Supply Network Routing" },
];

function GrysicsArchitecture() {
  const tools = [
    { y: 60, label: "API" },
    { y: 130, label: "DB" },
    { y: 200, label: "Email" },
    { y: 270, label: "Docs" },
    { y: 340, label: "Code" },
  ];

  const dots = [
    { id: "p-goal", dur: "2.6s", color: "#fb923c", begin: "0s" },
    { id: "p-plan", dur: "2.2s", color: "#3b82f6", begin: "0.4s" },
    { id: "p-mem", dur: "2.4s", color: "#a855f7", begin: "0.8s" },
    ...tools.map((_, i) => ({
      id: `p-t${i}`,
      dur: `${2 + i * 0.25}s`,
      color: "#10b981",
      begin: `${0.2 * i}s`,
    })),
  ];

  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50/80 p-4 sm:p-6 overflow-hidden shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono text-neutral-500 uppercase tracking-widest">Live system architecture</span>
        </div>
        <span className="hidden sm:inline text-[11px] font-mono text-neutral-400">grysics.olyxee.com</span>
      </div>

      <svg viewBox="0 0 620 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <path id="p-goal" d="M 80 200 C 160 200, 220 200, 270 200" fill="none" stroke="#e5e5e5" strokeWidth="1.5" strokeDasharray="3 3" />
        <path id="p-plan" d="M 320 160 C 320 120, 280 90, 220 70" fill="none" stroke="#e5e5e5" strokeWidth="1.5" strokeDasharray="3 3" />
        <path id="p-mem" d="M 320 240 C 320 280, 280 320, 220 350" fill="none" stroke="#e5e5e5" strokeWidth="1.5" strokeDasharray="3 3" />
        {tools.map((t, i) => (
          <path
            key={i}
            id={`p-t${i}`}
            d={`M 370 200 C 450 200, 480 ${t.y}, 510 ${t.y}`}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        ))}

        {dots.map((d, i) => (
          <circle key={i} r="4" fill={d.color}>
            <animateMotion dur={d.dur} begin={d.begin} repeatCount="indefinite">
              <mpath href={`#${d.id}`} />
            </animateMotion>
          </circle>
        ))}

        <g>
          <circle cx="50" cy="200" r="26" fill="#ffffff" stroke="#d4d4d4" />
          <text x="50" y="204" textAnchor="middle" fontSize="10" fill="#525252" fontFamily="ui-monospace, monospace">GOAL</text>
        </g>

        <g>
          <rect x="270" y="160" width="100" height="80" rx="14" fill="#0a0a0a" />
          <text x="320" y="195" textAnchor="middle" fontSize="13" fill="#ffffff" fontWeight="600">Grysics</text>
          <text x="320" y="215" textAnchor="middle" fontSize="10" fill="#a3a3a3" fontFamily="ui-monospace, monospace">core</text>
        </g>

        <g>
          <rect x="160" y="46" width="120" height="48" rx="10" fill="#dbeafe" stroke="#bfdbfe" />
          <text x="220" y="74" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="500">Planner</text>
        </g>

        <g>
          <rect x="160" y="326" width="120" height="48" rx="10" fill="#f3e8ff" stroke="#e9d5ff" />
          <text x="220" y="354" textAnchor="middle" fontSize="11" fill="#6b21a8" fontWeight="500">Memory</text>
        </g>

        {tools.map((t, i) => (
          <g key={i}>
            <rect x={510 - 32} y={t.y - 16} width="64" height="32" rx="8" fill="#ecfdf5" stroke="#bbf7d0" />
            <text x={510} y={t.y + 4} textAnchor="middle" fontSize="11" fill="#065f46" fontWeight="500">{t.label}</text>
          </g>
        ))}
      </svg>

      <div className="flex items-center justify-between mt-3 sm:mt-4 text-[10px] sm:text-[11px] font-mono text-neutral-400">
        <span>↻ goal → plan → execute → verify</span>
        <span>uptime · stateful</span>
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
              src="/images/products-intro-banner.png"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 sm:mt-16 mb-16 sm:mb-24">
            <motion.a
              href="https://grysics.olyxee.com/"
              target="_blank"
              rel="noopener noreferrer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
              className="rounded-2xl border-2 border-orange-300 bg-neutral-50/60 p-6 sm:p-8 flex flex-col cursor-pointer hover:border-orange-400 hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <Image src="/images/grysics-logo.png" alt="Grysics" width={28} height={28} className="rounded-lg" style={{ width: 28, height: 28 }} />
                <h3 className="text-lg sm:text-xl font-serif tracking-tight text-neutral-900">Grysics</h3>
              </div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">AI Execution System</p>
              <p className="text-sm text-neutral-500 font-light leading-relaxed mt-auto">Converts goals into completed workflows across tools and data sources.</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-500 mt-4">
                Visit Grysics <ArrowRight className="w-3 h-3" />
              </span>
            </motion.a>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
              className="rounded-2xl border border-neutral-200 bg-neutral-50/40 p-6 sm:p-8 flex flex-col opacity-60"
            >
              <h3 className="text-lg sm:text-xl font-serif tracking-tight text-neutral-500 mb-3">AI Systems Infrastructure Layer</h3>
              <p className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Runtime Infrastructure</p>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mt-auto">Executing AI workflows across distributed tools with stateful coordination.</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={2}
              variants={fadeUp}
              className="rounded-2xl border border-neutral-200 bg-neutral-50/40 p-6 sm:p-8 flex flex-col opacity-60"
            >
              <h3 className="text-lg sm:text-xl font-serif tracking-tight text-neutral-500 mb-3">Composability Framework</h3>
              <p className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">System Architecture</p>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mt-auto">Connecting models, tools, and workflows into unified execution pipelines.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <ProductGallery />

      <section className="py-20 sm:py-32 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-12 sm:mb-16"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.25em] mb-4">Research Direction</p>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-900 mb-6">
              Olyxee products are built around core research areas
            </h2>
          </motion.div>

          <div className="space-y-0 divide-y divide-neutral-100">
            {[
              "AI execution architectures",
              "Multi-step system coordination",
              "Stateful AI systems",
              "Tool and environment integration",
              "Reliability in autonomous workflows",
            ].map((area, idx) => (
              <motion.div
                key={area}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="group py-6 sm:py-8 flex items-center gap-6"
              >
                <span className="text-xs font-mono text-neutral-300 shrink-0">0{idx + 1}</span>
                <p className="text-base sm:text-lg text-neutral-700 group-hover:text-blue-500 transition-colors duration-300 font-light">{area}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 mb-6 leading-snug">
              Intelligence alone is not enough.<br />
              <em className="text-blue-400">Execution is the missing layer.</em>
            </h2>
          </motion.div>
        </div>
      </section>

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
