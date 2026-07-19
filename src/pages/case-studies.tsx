import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const studies = [
  {
    href: "/stories/freightshift",
    title: "FreightShift",
    summary: "How a regional carrier rebuilt its dispatch loop on Orgni-verified routing agents.",
    tag: "Logistics",
  },
  {
    href: "/stories/automation",
    title: "Enterprise automation pilot",
    summary: "An ops team replaced 14 brittle RPA flows with a verified agent stack in 6 weeks.",
    tag: "Operations",
  },
  {
    href: "/stories/accounting",
    title: "Accounting close, accelerated",
    summary: "A finance org cut close time by 38% with document-integrity agents in the loop.",
    tag: "Finance",
  },
];

const CaseStudies: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Case Studies" description="How teams deploy Olyxee in production: logistics, operations, and finance." path="/case-studies" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Case Studies</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-4xl sm:text-6xl tracking-tight leading-[1.05] mb-6">
            Olyxee in <em className="text-blue-500">production</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-normal">
            Real deployments, measured outcomes. A look at how teams are building reliable AI on Olyxee.
          </motion.p>
        </div>
      </section>

      <section className="pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {studies.map((s, idx) => (
            <motion.div key={s.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.08 }}>
              <Link href={s.href} className="group block h-full p-7 sm:p-10 rounded-3xl border border-neutral-200 hover:border-neutral-300 transition-all bg-white hover:bg-neutral-50">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">{s.tag}</span>
                <h3 className="font-serif text-2xl mt-4 mb-3 text-neutral-900">{s.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-normal mb-8">{s.summary}</p>
                <div className="w-10 h-10 rounded-full bg-neutral-100 group-hover:bg-neutral-900 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
