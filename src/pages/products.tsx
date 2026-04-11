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

      <section className="pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee" width={24} height={24} className="opacity-40" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Products</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 leading-[1.08] mb-6"
          >
            Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base sm:text-xl text-neutral-500 leading-relaxed max-w-2xl font-light"
          >
            Systems built from Olyxee research for real-world AI operation.
          </motion.p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-16 sm:mb-20 max-w-3xl"
          >
            <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light">
              Olyxee builds foundational systems that enable AI to operate reliably across environments, tools, and domains.
            </p>
            <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light mt-4">
              These systems demonstrate how AI moves from capability to execution.
            </p>
          </motion.div>

          <div className="space-y-0 divide-y divide-neutral-100">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
              className="group py-10 sm:py-14"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-16">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Image src="/images/grysics-logo.png" alt="Grysics" width={28} height={28} className="rounded-md" style={{ width: 28, height: 28 }} />
                    <h3 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900">Grysics</h3>
                  </div>
                  <p className="text-xs font-semibold text-blue-500 uppercase tracking-[0.2em] mb-6">AI Execution System</p>
                  <div className="space-y-4 text-[15px] sm:text-base text-neutral-500 leading-relaxed font-light max-w-2xl">
                    <p>
                      Grysics is an AI system that converts high-level goals into completed operational workflows across tools and data sources.
                    </p>
                    <p>
                      It coordinates multi-step execution, handles exceptions, and produces structured outcomes rather than standalone outputs.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 lg:pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                  <Link
                    href="https://grysics.olyxee.com"
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    View system <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
              className="group py-10 sm:py-14"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-16">
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900 mb-4">AI Systems Infrastructure Layer</h3>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-6">Runtime Infrastructure</p>
                  <p className="text-[15px] sm:text-base text-neutral-500 leading-relaxed font-light max-w-2xl">
                    A runtime system for executing AI workflows across distributed tools and environments with stateful coordination.
                  </p>
                </div>
                <div className="lg:pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Research
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={2}
              variants={fadeUp}
              className="group py-10 sm:py-14"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-16">
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900 mb-4">Composability Framework</h3>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-6">System Architecture</p>
                  <p className="text-[15px] sm:text-base text-neutral-500 leading-relaxed font-light max-w-2xl">
                    A system for connecting models, tools, and workflows into unified AI execution pipelines.
                  </p>
                </div>
                <div className="lg:pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Research
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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

      <section className="py-16 sm:py-24 border-t border-neutral-100 bg-neutral-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
          >
            <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed">
              Olyxee products are not applications.
            </p>
            <p className="text-base sm:text-lg text-neutral-900 font-medium mt-2">
              They are systems for operational AI.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
