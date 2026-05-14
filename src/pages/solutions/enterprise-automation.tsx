import { FC } from "react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Workflow, Bot, FileCheck, Zap, Network, Lock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const capabilities = [
  { icon: Workflow, title: "Process orchestration", description: "Automate multi-step workflows across systems with verified, auditable AI agents." },
  { icon: Bot, title: "Operational agents", description: "Deploy purpose-built agents for finance, ops, and customer workflows." },
  { icon: FileCheck, title: "Document intelligence", description: "Extract, classify, and validate documents with traceable accuracy." },
  { icon: Zap, title: "Real-time triggers", description: "Event-driven automation that reacts the moment something changes." },
  { icon: Network, title: "Native integrations", description: "Connect to ERPs, CRMs, ledgers, and internal APIs without rip-and-replace." },
  { icon: Lock, title: "Enterprise controls", description: "SSO, RBAC, audit trails, and customer-managed keys, on by default." },
];

const EnterpriseAutomation: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Enterprise Automation" description="AI agents and verified workflows for enterprise operations, finance, and back-office automation." path="/solutions/enterprise-automation" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-24 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Solutions, Enterprise Automation</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-4xl sm:text-6xl lg:text-[5rem] tracking-tight leading-[1.05] mb-8">
            Automation your auditors
            <br />
            <em className="text-orange-400">can sign off on</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            Replace brittle scripts and manual handoffs with verified AI agents. Olyxee gives enterprises
            an automation layer that is observable, controllable, and provably correct, end to end.
          </motion.p>
        </div>
      </section>

      <section className="py-24 sm:py-32 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100 rounded-3xl overflow-hidden">
            {capabilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="bg-white p-8 sm:p-10">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-neutral-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/3 bg-orange-500/20 rounded-full blur-[120px]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight mb-6">Bring automation under control.</h2>
          <p className="text-neutral-400 text-lg font-light mb-10">We work with enterprise teams to design, deploy, and verify agents on real workflows.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-200 transition-colors">
            Talk to our team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EnterpriseAutomation;
