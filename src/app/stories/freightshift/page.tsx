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
              One operational view across a fragmented freight network.
            </h1>

            <div className="flex items-center gap-4 text-sm text-neutral-400 font-normal mb-12 pb-10 border-b border-neutral-100">
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
            <p className="not-prose text-xl sm:text-[1.375rem] font-normal leading-relaxed text-neutral-900 border-l-2 border-neutral-900 pl-5 sm:pl-6 mb-14">
              FreightShift International Logistics depends on carriers, warehouses, customs agents and customer teams operating across regions, each holding only part of the context. Olyxee is partnering with FreightShift to make that whole operation understandable through Orgni.
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
              FreightShift did not have a transportation problem. It had a fragmented operation: no one participant could see the whole picture, and the knowledge of how exceptions were resolved lived in people&apos;s heads and inboxes. That is where Olyxee entered the conversation.
            </p>

            <h2>A fragmented operation</h2>
            <p>
              Each participant in the freight network held only part of the context. Carriers knew where cargo was. Warehouses knew what had arrived. Customer teams knew what had been promised. Nobody held the connected view of shipment events, responsibilities, service rules and customer commitments at the same time.
            </p>
            <p>
              Responsibilities were unclear at handoffs, exceptions were handled manually, and any tool introduced to help worked without shared context. The operation was hard to improve because it was hard to understand.
            </p>

            <h2>Building the organisational model</h2>
            <p>
              Olyxee began working with FreightShift around a simple question: what would logistics operations look like if the organisation behind the cargo were as visible as the cargo itself?
            </p>
            <p>
              With <strong>Orgni</strong>, the partnership is connecting the pieces into one living operational model:
            </p>
            <ul>
              <li>shipment events and system states,</li>
              <li>the people and roles responsible at each stage,</li>
              <li>service rules and customer commitments,</li>
              <li>exceptions and how previous ones were resolved,</li>
              <li>and the dependencies between all of them.</li>
            </ul>
            <p>
              <strong>Order Loop</strong>, Olyxee&apos;s logistics coordination system built on Orgni, is where that model meets daily work: shipments, documents, customs updates and customer communication stay connected as cargo moves from origin to delivery.
            </p>

            <h2>What became possible</h2>
            <p>
              Once the operation was understandable, people and intelligent systems could act with shared context. A delayed shipment is no longer just a status. The system can see why it is delayed, who owns the next action, and which customer commitment is at risk.
            </p>
            <p>
              That shared understanding shows up as fewer operational bottlenecks: less waiting on approvals, missing documents and internal coordination, and earlier, more accurate communication to customers. The result was not fewer people. It was an operation that explains itself.
            </p>

            <h2>Understanding that compounds</h2>
            <p>
              Every resolved exception, routing decision and customer interaction updates the model, so the organisation gets easier to operate as it grows, not harder. As trade between China and South Africa grows in complexity, that compounding understanding is FreightShift&apos;s infrastructure for scale.
            </p>
            <p>
              The outcome was not another isolated automation. It was reusable organisational understanding that could support future teams, systems and agents.
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
                  <p className="text-sm text-neutral-500 font-normal leading-relaxed mb-3">
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
              <p className="text-sm text-neutral-500 font-normal">Talk to us about bringing Order Loop to your freight corridors.</p>
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
