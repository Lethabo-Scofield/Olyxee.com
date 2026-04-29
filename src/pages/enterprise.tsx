import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ENTERPRISE_BLOCKS = [
  {
    num: "01",
    title: "Custom Ordo deployments",
    text: "Tailored installations of our AI execution system, configured around your data, tools, and operational policies.",
  },
  {
    num: "02",
    title: "Pilot projects for business workflows",
    text: "Scoped engagements that move a single high-value workflow from manual to AI-executed, with measurable outcomes.",
  },
  {
    num: "03",
    title: "Integration with APIs, databases, and internal systems",
    text: "Native connections to the systems your teams already rely on, including ERPs, CRMs, ledgers, and proprietary tools.",
  },
  {
    num: "04",
    title: "Human approval layers and audit logs",
    text: "Configurable checkpoints, role-based controls, and complete audit trails so every action is reviewable and defensible.",
  },
  {
    num: "05",
    title: "Dedicated implementation support",
    text: "A direct line to our engineering team during rollout, integration, and ongoing operation.",
  },
];

const Enterprise: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Enterprise"
        description="Custom AI systems for business execution. Olyxee helps companies deploy AI systems that execute workflows, integrate with internal tools, and support real operational decisions."
        path="/enterprise"
        keywords={[
          "Olyxee Enterprise",
          "Custom AI systems",
          "Ordo enterprise deployment",
          "AI workflow automation",
          "AI for business operations",
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Olyxee Enterprise",
          provider: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
          },
          description:
            "Custom AI execution systems, pilots, integrations, and dedicated implementation support for enterprises.",
          areaServed: "Global",
          url: "https://olyxee.com/enterprise",
        }}
      />
      <div className="grain" />
      <Header />

      <section className="relative pt-36 sm:pt-48 pb-24 sm:pb-32 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gradient-abstract-blue.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-6"
          >
            Enterprise
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05] mb-8"
          >
            Custom AI systems for{" "}
            <em className="text-neutral-500 not-italic">business execution</em>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg sm:text-xl text-neutral-500 leading-relaxed font-light max-w-2xl mx-auto"
          >
            Olyxee helps companies deploy AI systems that execute workflows, integrate with internal tools, and support real operational decisions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href="mailto:hello@olyxee.com?subject=Enterprise%20inquiry"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide"
            >
              Contact enterprise <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
            >
              Explore the products
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] lg:pt-2 mb-2">What we deliver</p>
              <div className="w-12 h-px bg-neutral-200" />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-neutral-900 leading-snug tracking-tight mb-8">
                Built around your systems, your policies, and your teams.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                Enterprise engagements with Olyxee are scoped, measurable, and delivered with the operational guardrails that production environments require.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-200 rounded-2xl overflow-hidden">
            {ENTERPRISE_BLOCKS.map((item, idx) => {
              const isLastOdd = idx === ENTERPRISE_BLOCKS.length - 1 && ENTERPRISE_BLOCKS.length % 2 !== 0;
              const borderRight = idx % 2 === 0 && !isLastOdd ? "md:border-r" : "";
              const borderBottom = idx < ENTERPRISE_BLOCKS.length - 1 ? "border-b md:border-b" : "";
              const lastRowStart = ENTERPRISE_BLOCKS.length - (ENTERPRISE_BLOCKS.length % 2 === 0 ? 2 : 1);
              const noBottomOnLastRow = idx >= lastRowStart ? "md:border-b-0" : "";
              return (
                <motion.div
                  key={item.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={idx}
                  variants={fadeUp}
                  className={`p-8 sm:p-10 border-neutral-200 ${borderRight} ${borderBottom} ${noBottomOnLastRow} ${isLastOdd ? "md:col-span-2" : ""}`}
                >
                  <span className="inline-block text-xs font-mono text-neutral-300 tracking-wider mb-6">{item.num}</span>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3 leading-snug">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-12"
          >
            <p className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Products</p>
            <div className="w-12 h-px bg-neutral-200" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
              className="p-8 sm:p-10 border border-neutral-200 rounded-2xl flex flex-col justify-between gap-10 hover:border-neutral-300 transition-colors"
            >
              <div>
                <p className="text-xs font-mono text-blue-500 tracking-wider mb-4">ORDO</p>
                <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-snug tracking-tight mb-4">
                  Our core AI execution system.
                </h3>
                <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-light">
                  Ordo runs end-to-end business workflows across your existing tools, with approval layers and full audit logs.
                </p>
              </div>
              <Link
                href="/products/ordo"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900"
              >
                Learn about Ordo
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={2}
              variants={fadeUp}
              className="p-8 sm:p-10 border border-neutral-200 rounded-2xl flex flex-col justify-between gap-10 hover:border-neutral-300 transition-colors"
            >
              <div>
                <p className="text-xs font-mono text-emerald-500 tracking-wider mb-4">ADDUP</p>
                <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-snug tracking-tight mb-4">
                  Our first focused application.
                </h3>
                <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-light">
                  Addup applies the Olyxee execution model to accounting, starting with reconciliation and mismatch explanation.
                </p>
              </div>
              <Link
                href="/products/addup"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900"
              >
                Learn about Addup
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
          >
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.25em] mb-6">Get in touch</p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
              Talk to us about your workflows.
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light max-w-2xl mx-auto mb-10">
              Tell us where AI execution would have the highest impact in your business. We&apos;ll outline a pilot, the integration scope, and how success would be measured.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:hello@olyxee.com?subject=Enterprise%20inquiry"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide"
              >
                Contact enterprise <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide"
              >
                All contact options
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enterprise;
