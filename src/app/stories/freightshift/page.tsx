"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function FreightShiftStory() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="grain" />
      <Header />

      <main className="pt-28 sm:pt-36 pb-24 sm:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-900 transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" /> Back to stories
            </Link>

            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">
              Logistics
            </p>

            <h1 className="font-serif text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-[1.08] mb-8">
              Moving freight across continents requires more than transportation.
            </h1>

            <div className="flex items-center gap-4 text-sm text-neutral-400 font-light mb-12 pb-10 border-b border-neutral-100">
              <span>FreightShift International Logistics</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span>May 2026</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative aspect-[16/9] rounded-xl overflow-hidden bg-neutral-100 mb-14"
          >
            <Image
              src="/images/stories/logistics.png"
              alt="Warehouse worker in safety vest packaging shipments at FreightShift"
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="prose prose-neutral prose-lg max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-h2:text-2xl sm:prose-h2:text-[1.75rem] prose-h2:mt-16 prose-h2:mb-6 prose-p:leading-[1.75] prose-p:text-neutral-700 prose-li:text-neutral-700 prose-li:leading-relaxed prose-strong:text-neutral-900 prose-blockquote:border-l-neutral-900 prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:text-neutral-800 prose-blockquote:leading-snug"
          >
            <p className="not-prose text-xl sm:text-[1.375rem] font-light leading-relaxed text-neutral-900 border-l-2 border-neutral-900 pl-5 sm:pl-6 mb-14">
              For FreightShift International Logistics, moving cargo between China and South Africa is the visible part of the business. The harder part is the coordination behind it. Olyxee is partnering with FreightShift to build the operational infrastructure that makes that coordination scale.
            </p>

            <p>
              FreightShift International Logistics (Pty) Ltd manages cargo movement between China and South Africa while handling customs clearance, domestic transportation, warehousing, and distribution for businesses across multiple industries.
            </p>
            <p>
              As operations expanded, so did the complexity behind them. Shipments generated constant streams of documents, customer communications, customs updates, delivery coordination, and operational decisions. Most of that work still moved through fragmented systems.
            </p>
            <p>
              Information lived across emails, spreadsheets, WhatsApp conversations, supplier documents, and tracking portals. Teams often spent more time coordinating operations than executing them.
            </p>
            <p>
              FreightShift did not have a transportation problem. It had an operational visibility problem. That is where Olyxee entered the conversation.
            </p>

            <h2>Building operational infrastructure</h2>
            <p>
              Olyxee began working with FreightShift around a simple question: what would logistics operations look like if information moved as efficiently as cargo?
            </p>
            <p>
              The goal was not to replace existing workflows overnight. Instead, the focus was on building operational infrastructure capable of supporting growth without increasing operational friction.
            </p>
            <p>
              That infrastructure centers on <strong>Order Loop</strong>, Olyxee&apos;s logistics coordination system. Built on Orgni, Order Loop gives the operation a single place where shipments, documents, customs updates, and customer communication stay connected as cargo moves from origin to delivery.
            </p>
            <p>Together, the companies are exploring systems for:</p>
            <ul>
              <li>centralized shipment visibility,</li>
              <li>workflow coordination,</li>
              <li>operational tracking,</li>
              <li>internal execution flows,</li>
              <li>and customer communication.</li>
            </ul>

            <h2>Reducing coordination overhead</h2>
            <p>
              In logistics, delays are not always caused by transportation. Many delays happen because teams are waiting for approvals, missing documents, shipment confirmations, customer updates, or internal coordination.
            </p>
            <p>
              FreightShift already had strong logistics expertise. What Olyxee introduced was infrastructure thinking. With Order Loop coordinating the moving parts, the partnership focused on reducing the amount of manual coordination required for day-to-day operations.
            </p>
            <p>This included exploring systems capable of:</p>
            <ul>
              <li>organizing operational data,</li>
              <li>tracking shipment states,</li>
              <li>routing tasks internally,</li>
              <li>and improving communication visibility across workflows.</li>
            </ul>
            <p>
              The result was not fewer people. It was fewer operational bottlenecks.
            </p>

            <h2>Visibility as a competitive advantage</h2>
            <p>
              FreightShift places strong emphasis on transparency and reliability. For customers, that means knowing where shipments are, understanding delays early, and receiving accurate communication throughout the logistics process.
            </p>
            <p>
              Olyxee approached this as a systems problem. The companies explored ways to create more structured operational records, clearer shipment tracking, faster communication cycles, and better coordination between logistics activities.
            </p>
            <p>
              In practice, this meant building toward operations that become easier to manage as the company grows, not harder.
            </p>

            <h2>Logistics infrastructure for a growing trade corridor</h2>
            <p>
              Trade between China and South Africa continues to grow in complexity and scale. FreightShift operates directly inside that environment, helping businesses move goods across international and domestic supply chains efficiently and reliably.
            </p>
            <p>
              Olyxee saw an opportunity to support that growth through operational intelligence and automation infrastructure. Not as a replacement for logistics expertise, but as a layer that strengthens it.
            </p>

            <h2>Looking ahead</h2>
            <p>
              Modern logistics companies are increasingly defined by how well they manage information, coordination, and operational execution. FreightShift International Logistics represents a new generation of logistics businesses focused not only on transportation, but on operational excellence.
            </p>
            <p>
              At Olyxee, we are proud to support companies building the future of logistics infrastructure across Africa and international markets.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 pt-10 border-t border-neutral-100"
          >
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.28em] mb-5">
              About the customer
            </p>
            <a
              href="https://www.freightshiftlogistics.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/60 transition-colors p-5 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
                <div className="relative w-full sm:w-44 aspect-[16/10] rounded-lg overflow-hidden bg-neutral-100 ring-1 ring-neutral-900/10 flex-shrink-0">
                  <Image
                    src="/images/stories/logistics.png"
                    alt="FreightShift website preview"
                    fill
                    sizes="(min-width: 640px) 176px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-xl sm:text-2xl text-neutral-900 tracking-tight leading-snug mb-1">
                    FreightShift International Logistics
                  </p>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed mb-3">
                    Door-to-door freight from China to South Africa, with live tracking and a no-surprises promise.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900">
                    freightshiftlogistics.co.za
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </a>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-12 pt-10 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="text-sm font-semibold text-neutral-900 mb-1">Want this for your logistics operations?</p>
              <p className="text-sm text-neutral-500 font-light">Talk to us about bringing Order Loop to your freight corridors.</p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-black transition-colors whitespace-nowrap"
            >
              Start a conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
