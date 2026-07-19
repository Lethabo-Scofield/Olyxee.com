import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import { motion } from "framer-motion";

const services = [
  { name: "Orgni API", status: "Operational" },
  { name: "Orgni · Document integrity", status: "Operational" },
  { name: "Orgni · Financial operations", status: "Operational" },
  { name: "Dashboard", status: "Operational" },
  { name: "Documentation", status: "Operational" },
  { name: "Auth & Identity", status: "Operational" },
];

const Status: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="System Status" description="Current operational status of Olyxee services." path="/status" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">All Systems Operational</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-serif text-4xl sm:text-5xl tracking-tight leading-[1.08] mb-4">
            System Status
          </motion.h1>
          <p className="text-neutral-500 font-normal">Live status of Olyxee services. Updated continuously.</p>
        </div>
      </section>

      <section className="pb-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto rounded-3xl border border-neutral-200 overflow-hidden">
          {services.map((s, idx) => (
            <div key={s.name} className={`flex items-center justify-between px-6 py-5 ${idx !== services.length - 1 ? "border-b border-neutral-100" : ""}`}>
              <span className="text-neutral-900 font-medium">{s.name}</span>
              <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Status;
