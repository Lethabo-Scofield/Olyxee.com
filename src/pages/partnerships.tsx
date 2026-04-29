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

const PARTNER_TYPES = [
  {
    num: "01",
    label: "Accounting firms",
    title: "Distribute and test Addup.",
    text: "Bring Addup into client engagements to accelerate reconciliation and clearly explain mismatches across ledgers and source systems.",
  },
  {
    num: "02",
    label: "Consulting firms",
    title: "Implement Ordo for clients.",
    text: "Lead Ordo deployments inside client organizations, designing the workflows that move from manual operation to AI execution.",
  },
  {
    num: "03",
    label: "Software vendors",
    title: "Integrate with Olyxee systems.",
    text: "Expose your platform to Ordo as a tool or data source, so customer workflows can read, write, and act through your product.",
  },
  {
    num: "04",
    label: "Cloud and infrastructure partners",
    title: "Support secure deployment and scaling.",
    text: "Provide the underlying compute, networking, and security primitives that Olyxee deployments run on inside regulated environments.",
  },
];

const Partnerships: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Partnerships"
        description="Build and deploy AI systems with Olyxee. We work with accounting firms, consultants, software vendors, and infrastructure partners to bring practical AI execution systems into real business environments."
        path="/partnerships"
        keywords={[
          "Olyxee Partnerships",
          "AI partner program",
          "Ordo integration partners",
          "Addup accounting partners",
          "AI infrastructure partners",
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Olyxee Partnerships",
          url: "https://olyxee.com/partnerships",
          description:
            "Partner with Olyxee to build, distribute, and deploy AI execution systems across accounting, consulting, software, and infrastructure.",
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
            Partnerships
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05] mb-8"
          >
            Build and deploy AI systems <em className="text-neutral-500 not-italic">with Olyxee</em>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg sm:text-xl text-neutral-500 leading-relaxed font-light max-w-2xl mx-auto"
          >
            We work with accounting firms, consultants, software vendors, and infrastructure partners to bring practical AI execution systems into real business environments.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href="mailto:hello@olyxee.com?subject=Partnership%20inquiry"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide"
            >
              Contact partnerships <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
              <p className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] lg:pt-2 mb-2">Who we work with</p>
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
                Practitioners, builders, and operators of real systems.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                Our partners help take Ordo and Addup into client engagements, integrate them with the tools businesses already use, and run them on infrastructure that meets enterprise requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-200 rounded-2xl overflow-hidden">
            {PARTNER_TYPES.map((item, idx) => {
              const lastIdx = PARTNER_TYPES.length - 1;
              const isRightCol = idx % 2 === 1;
              const isLastRow = idx >= PARTNER_TYPES.length - 2;
              return (
                <motion.div
                  key={item.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={idx}
                  variants={fadeUp}
                  className={`p-8 sm:p-10 border-neutral-200 ${!isRightCol ? "md:border-r" : ""} ${idx !== lastIdx ? "border-b" : ""} ${isLastRow ? "md:border-b-0" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-mono text-neutral-300 tracking-wider">{item.num}</span>
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.25em]">{item.label}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 leading-snug tracking-tight mb-4">{item.title}</h3>
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
            <p className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">What partners build on</p>
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
                  The core AI execution system.
                </h3>
                <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-light">
                  Consulting and software partners build, integrate, and deploy Ordo across the workflows their clients run every day.
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
                  The first focused application.
                </h3>
                <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-light">
                  Accounting partners pilot Addup on real reconciliation work, starting with mismatch detection and clear, defensible explanations.
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
              Let&apos;s build together.
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light max-w-2xl mx-auto mb-10">
              Tell us about your firm, your platform, or your infrastructure. We&apos;ll respond with how a partnership with Olyxee could work and where to start.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:hello@olyxee.com?subject=Partnership%20inquiry"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide"
              >
                Contact partnerships <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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

export default Partnerships;
