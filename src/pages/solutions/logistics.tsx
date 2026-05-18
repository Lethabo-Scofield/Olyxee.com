import { FC } from "react";
import Image from "next/image";
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
  MapPin,
  MessageSquare,
  Link2,
  ShieldCheck,
  BarChart3,
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

            {/* Orders dashboard preview */}
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
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-neutral-200/80 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
                <Image
                  src="/images/logistics/orders-dashboard.png"
                  alt="Olyxee Logistics orders dashboard showing pickup, delivery, and status across recent orders"
                  width={1600}
                  height={1200}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS (isometric) === */}
      <section className="py-20 sm:py-28 border-t border-neutral-100 bg-neutral-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <Image
                  src="/images/logistics/hero-iso.png"
                  alt="Olyxee Logistics network connecting trucks, packages, tracking, and delivery"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <p className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">
                How it works
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight leading-[1.05] mb-6">
                One loop, from <em className="text-blue-500">pickup to doorstep.</em>
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-8">
                Every order flows through a single, verified loop. You create the order, Olyxee
                Logistics tracks each stage, and your customer gets notified the moment something
                changes, with no back-and-forth required.
              </p>
              <ul className="space-y-4">
                {[
                  { n: "01", t: "Create the order", d: "Add the customer, items, and delivery info in seconds." },
                  { n: "02", t: "Update the status", d: "Mark it confirmed, packed, shipped, or delivered as it moves." },
                  { n: "03", t: "Customer stays in the loop", d: "Branded SMS and email go out automatically at every step." },
                ].map((s) => (
                  <li key={s.n} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-neutral-400 pt-1 w-8 shrink-0">{s.n}</span>
                    <div>
                      <p className="text-neutral-900 font-medium">{s.t}</p>
                      <p className="text-sm text-neutral-500 font-light leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === TRACKING MAP === */}
      <section className="py-20 sm:py-28 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">
                Live tracking
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight leading-[1.05] mb-6">
                A tracking page your <em className="text-orange-500">customers actually open.</em>
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-6">
                Every order comes with a clean, branded tracking page. No app to install, no account
                to create, just a link your customer can revisit any time to see exactly where their
                package is.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
                <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Real-time updates</span>
                <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Shareable links</span>
                <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Mobile friendly</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative rounded-3xl overflow-hidden ring-1 ring-neutral-200/80 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)]"
            >
              <Image
                src="/images/logistics/tracking-map.png"
                alt="Live tracking map showing shipment route and current location"
                width={1600}
                height={1000}
                className="w-full h-auto object-cover"
              />
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

      {/* === BUILT FOR (lifestyle pair) === */}
      <section className="py-20 sm:py-28 border-t border-neutral-100 bg-neutral-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">
              Built for real workflows
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight leading-[1.05]">
              From the back office to the <em className="text-blue-500">front door.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group relative rounded-3xl overflow-hidden bg-neutral-900 aspect-[4/5] sm:aspect-[4/3]"
            >
              <Image
                src="/images/logistics/seller-support.jpg"
                alt="Seller coordinating an order over the phone from a stockroom"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9 text-white">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/60 mb-2">
                  For sellers
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl tracking-tight leading-tight mb-2">
                  Less time on the phone, more time selling.
                </h3>
                <p className="text-sm text-white/75 font-light max-w-md">
                  Stop fielding "where is my order?" calls. Automated updates keep your customers informed so your team can focus on the work that matters.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="group relative rounded-3xl overflow-hidden bg-neutral-900 aspect-[4/5] sm:aspect-[4/3]"
            >
              <Image
                src="/images/logistics/delivery-handoff.jpg"
                alt="Customer accepting a package from a courier at her doorstep"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9 text-white">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/60 mb-2">
                  For customers
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl tracking-tight leading-tight mb-2">
                  No more wondering where it is.
                </h3>
                <p className="text-sm text-white/75 font-light max-w-md">
                  Customers know exactly when their order is confirmed, shipped, and arriving, so the only surprise at the door is the package.
                </p>
              </div>
            </motion.div>
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
