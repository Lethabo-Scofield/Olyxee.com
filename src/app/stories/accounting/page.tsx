"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AccountingStory() {
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
              Accounting
            </p>

            <h1 className="font-serif text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-[1.08] mb-8">
              Month-end close dropped from five days to overnight.
            </h1>

            <div className="flex items-center gap-4 text-sm text-neutral-400 font-light mb-12 pb-10 border-b border-neutral-100">
              <span>Mid-market financial services firm</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span>April 2026</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative aspect-[16/9] rounded-xl overflow-hidden bg-neutral-100 mb-14"
          >
            <Image
              src="/images/stories/accounting.png"
              alt="AI-powered financial operations dashboard"
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
            className="prose prose-neutral prose-lg max-w-none"
          >
            <h2>The challenge</h2>
            <p>
              Every month, the finance team at this mid-market firm spent five gruelling days on close. Reconciling accounts across multiple ledgers, chasing down anomalies, and assembling reports that leadership needed to make decisions — all of it manual, all of it deadline-driven.
            </p>
            <p>
              The team was capable. The bottleneck was the work itself: repetitive, data-heavy tasks that required precision but not judgement. Every month the same patterns, the same corrections, the same late nights.
            </p>

            <h2>What Olyxee built</h2>
            <p>
              We deployed an AI accounting agent that plugs into their ERP and banking data feeds. Each month, the agent runs the reconciliation automatically — matching transactions, flagging discrepancies above a configurable threshold, and preparing a close-ready report with every exception documented and explained.
            </p>
            <p>
              Anomalies that previously required a senior analyst to investigate are surfaced with context: what changed, why it might have changed, and what the likely resolution is. The team reviews, approves, and signs off — rather than rebuilding from scratch.
            </p>

            <h2>The result</h2>
            <p>
              Month-end close now completes overnight. The finance team arrives on the first day of each new month to a report that is ready for review, not ready to be built. What took five days now takes hours — and the accuracy has improved because exceptions are caught systematically, not by whoever happened to notice.
            </p>

            <blockquote>
              "We used to dread the last week of every month. Now close just happens. The team is working on things that actually require their expertise."
              <cite>— CFO, financial services firm</cite>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-16 pt-10 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="text-sm font-semibold text-neutral-900 mb-1">Ready to transform your close process?</p>
              <p className="text-sm text-neutral-500 font-light">Let's scope an AI accounting pilot for your team.</p>
            </div>
            <a
              href="mailto:scofield@olyxee.com?subject=Accounting%20AI%20Pilot%20Inquiry"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-black transition-colors whitespace-nowrap"
            >
              Start a conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
