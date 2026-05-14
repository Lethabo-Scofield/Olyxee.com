import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, KeyRound, Server, FileWarning } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const pillars = [
  { icon: ShieldCheck, title: "Defense in depth", description: "Multiple layers of protection across infrastructure, application, and data planes." },
  { icon: Lock, title: "Encryption everywhere", description: "TLS 1.3 in transit and AES-256 at rest, with customer-managed key options." },
  { icon: KeyRound, title: "Identity & access", description: "SSO, SCIM, RBAC, and short-lived credentials by default for every workload." },
  { icon: Eye, title: "Continuous monitoring", description: "24/7 detection across logs, network, and runtime, with on-call response." },
  { icon: Server, title: "Secure infrastructure", description: "Isolated workloads, hardened images, automated patching, and least-privilege networking." },
  { icon: FileWarning, title: "Responsible disclosure", description: "We work with security researchers. Report issues to security@olyxee.com." },
];

const Security: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Security" description="How Olyxee secures your data, models, and infrastructure." path="/security" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Security</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-4xl sm:text-6xl tracking-tight leading-[1.05] mb-6">
            Security is a <em className="text-blue-500">first-class</em> primitive
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            Olyxee is built for teams that cannot afford to compromise. Our security program covers
            infrastructure, application, data, and the AI lifecycle itself.
          </motion.p>
        </div>
      </section>

      <section className="pb-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100 rounded-3xl overflow-hidden">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="bg-white p-8 sm:p-10">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-neutral-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{p.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Security;
