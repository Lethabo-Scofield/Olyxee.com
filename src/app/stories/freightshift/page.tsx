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
              How FreightShift cut shipment exception response time by 70%.
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
              International freight is a chain of handoffs, and every handoff is a chance for something to slip. We rebuilt FreightShift's exception loop so the system catches deviations the moment they happen - not the morning after.
            </p>

            <h2>The challenge</h2>
            <p>
              FreightShift moves thousands of containers each month between China and South Africa. At that volume, exceptions are inevitable: delayed customs clearances, missed handoffs, supplier communication gaps.
            </p>
            <p>
              The real problem wasn't frequency. It was <strong>response time</strong>. By the time an analyst caught an exception in the tracking dashboard, the delay had already compounded.
            </p>
            <p>
              Their operations team was spending upwards of six hours a day reviewing shipment statuses across three freight systems, two supplier portals, and an internal tracking tool - none of which talked to each other. Exceptions surfaced late, escalations were reactive, and customer updates arrived after the fact.
            </p>

            <h2>What we built</h2>
            <p>
              We deployed a logistics monitoring agent that connects directly to FreightShift's freight management system, supplier channels, and customs data feeds. It runs continuously, watching for deviation from expected transit milestones.
            </p>
            <ul>
              <li><strong>Continuous monitoring.</strong> Every active shipment is tracked against its expected milestones in near real time.</li>
              <li><strong>Drafted follow-ups.</strong> When an exception fires, the agent drafts the supplier message and updates the internal status record automatically.</li>
              <li><strong>Smart escalation.</strong> High-priority shipments are routed to the operations lead with a full context summary, not a raw alert.</li>
              <li><strong>Morning briefing.</strong> Each day starts with a ranked queue of active exceptions and the next expected checkpoint for each.</li>
            </ul>
            <p>
              Humans stay in the loop where it matters - at the decision point, not at every data-collection step.
            </p>

            <h2>The numbers</h2>
            <div className="not-prose my-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 border-y border-neutral-200 py-10">
              <div>
                <p className="font-serif text-4xl sm:text-[2.5rem] text-neutral-900 leading-none mb-3 tracking-tight">70%</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Faster exception response</p>
              </div>
              <div>
                <p className="font-serif text-4xl sm:text-[2.5rem] text-neutral-900 leading-none mb-3 tracking-tight">8 wks</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">From kickoff to live</p>
              </div>
              <div>
                <p className="font-serif text-4xl sm:text-[2.5rem] text-neutral-900 leading-none mb-3 tracking-tight">~6h/day</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Manual review reclaimed</p>
              </div>
            </div>

            <h2>What changed</h2>
            <p>
              Within eight weeks, FreightShift's average exception response time dropped by 70%. Analysts who used to spend their mornings combing through dashboards now begin the day with a clear queue.
            </p>
            <p>
              Supplier follow-ups that took hours now happen in minutes, and without manual drafting. The team has since extended the same monitoring and escalation logic to their air freight corridor - a faster-moving, higher-stakes part of the business.
            </p>

            <blockquote>
              "Before, we were always one step behind. Now the system tells us something's off before we've even had our morning coffee. That's a different way of operating."
              <cite>- Operations Lead, FreightShift International Logistics</cite>
            </blockquote>
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
              <p className="text-sm text-neutral-500 font-light">Talk to us about a pilot scoped to your freight corridors.</p>
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
