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
              Making the financial close understandable before automating it.
            </h1>

            <div className="flex items-center gap-4 text-sm text-neutral-400 font-normal mb-12 pb-10 border-b border-neutral-100">
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
              alt="Finance team reviewing an operations dashboard together"
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
              The close process depended on spreadsheets, financial systems, approvals, recurring exceptions and knowledge held by experienced employees. Before automating anything, Orgni made that whole operation understandable.
            </p>

            <h2>A fragmented operation</h2>
            <p>
              Every month, this mid-market finance team spent five gruelling days on close. The mechanics lived in spreadsheets and ledgers; the understanding lived in people. Which exceptions recur, who approves what, which corrections are routine and which are warnings - all of it was trapped in experienced employees&apos; heads and reconstructed from scratch each month.
            </p>
            <p>
              The team was capable. The problem was that the close, as an operation, was not understandable to anyone or anything outside the people who ran it. Automation attempted on top of that fragmentation would have been brittle.
            </p>

            <h2>Building the organisational model</h2>
            <p>
              We turned on <strong>financial operations</strong> in <strong>Orgni</strong>, plugged into the firm&apos;s ERP and banking data feeds. But the first step was not automation. It was representation: Orgni modelled the close as a live picture of responsibilities, dependencies, controls, deadlines and historical decisions.
            </p>
            <ul>
              <li><strong>Responsibilities.</strong> Who owns each reconciliation, review and sign-off.</li>
              <li><strong>Dependencies.</strong> Which inputs each step waits on, across ledgers, feeds and teams.</li>
              <li><strong>Controls and rules.</strong> The thresholds, approvals and policies that govern the close.</li>
              <li><strong>Decision history.</strong> How previous exceptions were investigated and resolved.</li>
            </ul>

            <h2>What became possible</h2>
            <p>
              Once the operation was understandable, reliable automation followed. Transactions are matched across ledgers and bank feeds automatically. Discrepancies are flagged with context: what changed, why it likely changed, and how similar cases were resolved before. Missing inputs and bottlenecks are identified before they stall the close.
            </p>
            <p>
              The team reviews, approves and signs off - instead of rebuilding the close from scratch each month.
            </p>

            <h2>The numbers</h2>
            <div className="not-prose my-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 border-y border-neutral-200 py-10">
              <div>
                <p className="font-serif text-4xl sm:text-[2.5rem] text-neutral-900 leading-none mb-3 tracking-tight">5 days → 1 night</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Month-end close</p>
              </div>
              <div>
                <p className="font-serif text-4xl sm:text-[2.5rem] text-neutral-900 leading-none mb-3 tracking-tight">~80%</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Manual time eliminated</p>
              </div>
              <div>
                <p className="font-serif text-4xl sm:text-[2.5rem] text-neutral-900 leading-none mb-3 tracking-tight">Day 1</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Report ready each month</p>
              </div>
            </div>

            <h2>Understanding that compounds</h2>
            <p>
              Month-end close now completes overnight, and accuracy has improved, because exceptions are caught systematically rather than by whoever happens to notice. But the close was not solved once: every resolved exception and decision feeds back into the model, so each close makes the next one more understandable.
            </p>
            <p>
              The outcome was not another isolated automation. It was reusable organisational understanding that could support future teams, systems and agents.
            </p>

            <blockquote>
              "We used to dread the last week of every month. Now close just happens. The team is working on things that actually require their expertise."
              <cite>- CFO, financial services firm</cite>
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
              <p className="text-sm text-neutral-500 font-normal">Let&apos;s scope a financial operations pilot on Orgni for your team.</p>
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
