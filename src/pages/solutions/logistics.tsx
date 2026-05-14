import { FC } from "react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Route, Boxes, Gauge, ShieldCheck, BarChart3 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const capabilities = [
  { icon: Route, title: "Route intelligence", description: "Adaptive routing that responds to live traffic, weather, and delivery windows." },
  { icon: Truck, title: "Fleet orchestration", description: "Coordinate vehicles, drivers, and dispatch across regional and last-mile networks." },
  { icon: Boxes, title: "Warehouse coordination", description: "AI-assisted slotting, picking, and inventory accuracy at scale." },
  { icon: Gauge, title: "Operational telemetry", description: "Real-time KPI monitoring across fulfilment, transit, and exception handling." },
  { icon: ShieldCheck, title: "Verified decisions", description: "Every routing and allocation decision is verified by Ordo before execution." },
  { icon: BarChart3, title: "Forecasting", description: "Demand and capacity forecasts that improve as your operation runs." },
];

const Logistics: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Logistics" description="AI infrastructure for modern logistics operations: routing, fleet orchestration, and verified decisions." path="/solutions/logistics" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-24 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Solutions, Logistics</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-4xl sm:text-6xl lg:text-[5rem] tracking-tight leading-[1.05] mb-8">
            Logistics that runs on
            <br />
            <em className="text-blue-500">verified intelligence</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            From dispatch to delivery, Olyxee gives logistics operators an AI substrate they can trust:
            routes that adapt in real time, fleet decisions that are verified before they ship, and forecasts
            that actually hold up against the road.
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

      <section className="relative py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl bg-neutral-100 border border-neutral-200/70 px-6 sm:px-12 lg:px-20 py-14 sm:py-20 lg:py-24 overflow-hidden"
          >
            <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-100/50 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-neutral-200/60 blur-3xl" />

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 leading-[1.05]">
                Ready to put logistics on autopilot?
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-9 max-w-lg mx-auto">
                Talk to our team about a pilot tailored to your network.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/10"
                >
                  Get in touch <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Logistics;
