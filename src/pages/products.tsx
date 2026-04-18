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
  { src: "/images/products-grysics.png", label: "System Integrations" },
  { src: "/images/products-fintech-agents.png", label: "Fintech Agents" },
  { src: "/images/products-multi-agent.png", label: "Multi-Agent Systems" },
  { src: "/images/products-financial-ops.png", label: "Financial Operations" },
  { src: "/images/product-clustering.png", label: "Visual Embeddings" },
  { src: "/images/product-classifier.png", label: "Classifier Alignment" },
  { src: "/images/product-pipeline.png", label: "Pipeline Architecture" },
];

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
