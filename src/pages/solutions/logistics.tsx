import { FC } from "react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Truck,
  Bell,
  PackageCheck,
  MapPin,
  MessageSquare,
  Link2,
  ShieldCheck,
  BarChart3,
  Check,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const capabilities = [
  { icon: Bell, title: "Automatic status updates", description: "Send confirmed, packed, shipped, and delivered notifications to your customers without lifting a finger." },
  { icon: MessageSquare, title: "SMS and email", description: "Reach every customer on the channel they actually read, with branded messages from your shop." },
  { icon: Truck, title: "Built for anyone who sells", description: "From a one-person shop to a full operations team, set up orders and update statuses in seconds." },
  { icon: MapPin, title: "Order tracking links", description: "Give every customer a clean tracking page they can revisit any time, no app required." },
  { icon: ShieldCheck, title: "Verified by Ordo", description: "Every status change is logged and verified, so you always have a clear audit trail." },
  { icon: BarChart3, title: "Order insights", description: "See which orders are on time, delayed, or stuck, and act on them before customers ask." },
];

const Logistics: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Olyxee Logistics, Keep every customer in the loop"
        description="Olyxee Logistics lets anyone who sells send clean order-status updates to their customers, from confirmed to delivered. Try the live system at logistics.olyxee.com."
        path="/solutions/logistics"
        keywords={[
          "Olyxee Logistics",
          "order status updates",
          "customer notifications",
          "order tracking",
          "SMS order updates",
          "ecommerce logistics",
          "seller notifications",
          "shipment tracking",
        ]}
      />
      <div className="grain" />
      <Header />

      {/* === HERO === */}
      <section className="pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">
                  Solutions, Logistics
                </span>
                <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono uppercase tracking-[0.18em]">
                  Live
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-4xl sm:text-6xl lg:text-[5rem] tracking-tight leading-[1.05] mb-8"
              >
                Keep every customer
                <br />
                <em className="text-blue-500">in the loop.</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg sm:text-xl text-neutral-500 leading-relaxed max-w-2xl font-light mb-10"
              >
                Olyxee Logistics lets anyone who sells, from a one-person shop to a full operations team,
                send clean order-status updates to their customers, from confirmed to delivered.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3"
              >
                <a
                  href="https://logistics.olyxee.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-colors text-sm tracking-wide shadow-lg shadow-neutral-900/10"
                >
                  Try Olyxee Logistics
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="https://logistics.olyxee.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-neutral-700 hover:text-neutral-900 transition-colors text-sm tracking-wide"
                >
                  <Link2 className="w-4 h-4" />
                  logistics.olyxee.com
                </a>
                <Link
                  href="/contact?subject=Olyxee%20Logistics%20%E2%80%94%20Inquiry"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-neutral-900 bg-white border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
                >
                  Talk to us
                </Link>
              </motion.div>
            </div>

            {/* Mock order timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div
                aria-hidden
                className="absolute -inset-8 -z-10 bg-gradient-to-br from-emerald-50/60 via-white to-blue-50/40 blur-2xl rounded-[2rem]"
              />
              <div className="relative rounded-3xl bg-white ring-1 ring-neutral-200 shadow-sm p-6 sm:p-7">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">
                      Order #OLX-4827
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400">Updated just now</span>
                </div>

                <ol className="relative space-y-5">
                  {[
                    { Icon: Check, label: "Order confirmed", time: "Mon, 10:24", state: "done" as const },
                    { Icon: PackageCheck, label: "Packed and ready", time: "Mon, 14:02", state: "done" as const },
                    { Icon: Truck, label: "Out for delivery", time: "Tue, 09:11", state: "active" as const },
                    { Icon: MapPin, label: "Delivered to customer", time: "Pending", state: "pending" as const },
                  ].map(({ Icon, label, time, state }) => (
                    <li key={label} className="flex items-start gap-4">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ring-1 ${
                          state === "done"
                            ? "bg-neutral-900 text-white ring-neutral-900"
                            : state === "active"
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                            : "bg-white text-neutral-400 ring-neutral-200"
                        }`}
                      >
                        <Icon className="w-4 h-4" strokeWidth={2} />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <div className="flex items-baseline justify-between gap-3">
                          <span
                            className={`text-sm font-medium ${
                              state === "pending" ? "text-neutral-400" : "text-neutral-900"
                            }`}
                          >
                            {label}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-400">{time}</span>
                        </div>
                        {state === "active" && (
                          <p className="mt-1 text-[12px] text-neutral-500 font-light inline-flex items-center gap-1.5">
                            <Bell className="w-3 h-3 text-emerald-600" />
                            Customer notified by SMS and email
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === CAPABILITIES === */}
      <section className="py-24 sm:py-32 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-3 sm:mb-4">
              What you get
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 leading-[1.05]">
              Everything you need to <em className="text-neutral-500 not-italic">keep customers updated.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100 rounded-3xl overflow-hidden">
            {capabilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  variants={fadeUp}
                  className="bg-white p-8 sm:p-10"
                >
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

      {/* === BOTTOM CTA === */}
      <section className="relative py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl bg-neutral-100 border border-neutral-200/70 px-6 sm:px-12 lg:px-20 py-14 sm:py-20 lg:py-24 overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-100/50 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl"
            />

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 leading-[1.05]">
                Try it on your next order.
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-9 max-w-lg mx-auto">
                Olyxee Logistics is live. Set up your first order in minutes and let your customers know exactly where things stand.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                <a
                  href="https://logistics.olyxee.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/10"
                >
                  Open logistics.olyxee.com
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <Link
                  href="/contact?subject=Olyxee%20Logistics%20%E2%80%94%20Inquiry"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 bg-white border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
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
