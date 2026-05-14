import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Framework alignment",
    body: "Olyxee aligns its security and privacy program with industry-recognized frameworks including SOC 2, ISO 27001, and the NIST Cybersecurity Framework. Formal attestations are pursued as we scale and are made available under NDA.",
  },
  {
    title: "Data protection",
    body: "We process personal data in accordance with applicable laws, including the EU GDPR and UK GDPR, and CCPA where applicable. Standard Contractual Clauses are used for cross-border transfers.",
  },
  {
    title: "AI governance",
    body: "Olyxee maintains internal policies aligned with emerging AI regulation, including risk classification, model documentation, evaluation requirements, and incident response for AI systems.",
  },
  {
    title: "Subprocessors",
    body: "We use a limited set of vetted subprocessors for hosting, analytics, and communications. A current list is available on request via compliance@olyxee.com.",
  },
  {
    title: "Vendor due diligence",
    body: "Enterprise customers can request our security questionnaire responses, architecture overview, and DPA under NDA.",
  },
  {
    title: "Contact",
    body: "For compliance inquiries, including DPAs, security reviews, and audit support, contact compliance@olyxee.com.",
  },
];

const Compliance: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Compliance" description="Olyxee's compliance posture: frameworks, data protection, and AI governance." path="/compliance" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Compliance</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-serif text-4xl sm:text-5xl tracking-tight leading-[1.08] mb-4">
            Compliance
          </motion.h1>
          <p className="text-neutral-400 text-sm">Last updated: May 2026</p>
        </div>
      </section>

      <section className="pb-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-semibold text-neutral-900 mb-3">{s.title}</h2>
              <p className="text-[15px] text-neutral-500 leading-relaxed font-light">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Compliance;
