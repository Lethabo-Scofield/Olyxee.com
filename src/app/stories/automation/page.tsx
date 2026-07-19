"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AutomationStory() {
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
              Automation
            </p>

            <h1 className="font-serif text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-[1.08] mb-8">
              A supplier process that understands its own rules.
            </h1>

            <div className="flex items-center gap-4 text-sm text-neutral-400 font-light mb-12 pb-10 border-b border-neutral-100">
              <span>Multi-entity operations company</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span>March 2026</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative aspect-[16/9] rounded-xl overflow-hidden bg-neutral-100 mb-14"
          >
            <Image
              src="/images/stories/automation.png"
              alt="Distributed team celebrating a launch together at the desk"
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
              Supplier onboarding required coordination across procurement, finance, compliance, legal and operational systems, with rules that changed by supplier type, risk and contract conditions. Orgni made the organisation behind the workflow understandable, and that is what made the automation reliable.
            </p>

            <h2>A fragmented operation</h2>
            <p>
              Every new supplier started the same way: a procurement manager chasing forms, a compliance team waiting on documents, an IT team waiting on both before provisioning access. The rules were real but scattered - some in policy documents, some in legal&apos;s inbox, many in the heads of whoever had onboarded a similar supplier before.
            </p>
            <p>
              Average onboarding took three to four weeks - not because anything was complicated, but because every handoff was manual, every team had its own queue, and no system understood why a given step was required for a given supplier.
            </p>

            <h2>Building the organisational model</h2>
            <p>
              We built the onboarding process on <strong>Orgni</strong>, but the starting point was not a workflow diagram. It was connecting the organisation behind the workflow into one operational model:
            </p>
            <ul>
              <li><strong>Roles.</strong> Who in procurement, finance, compliance, legal and IT is responsible at each step.</li>
              <li><strong>Policies and rules.</strong> Which requirements apply by supplier type, risk level and contract conditions.</li>
              <li><strong>Evidence and approvals.</strong> Which documents count, who signs off, and what has already been collected.</li>
              <li><strong>System states and exceptions.</strong> Where each supplier stands, and how unusual cases were handled before.</li>
            </ul>

            <h2>What became possible</h2>
            <p>
              Because the process understands its own rules, intelligent systems can determine what is required for each supplier, explain why it is required, and route unusual cases to the correct people. Intake, verification checks, approval routing and IT provisioning run end to end, with every step logged and every handoff timestamped.
            </p>
            <p>
              People only show up to make decisions - and when they do, the context for the decision is already assembled.
            </p>

            <h2>The numbers</h2>
            <div className="not-prose my-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 border-y border-neutral-200 py-10">
              <div>
                <p className="font-serif text-4xl sm:text-[2.5rem] text-neutral-900 leading-none mb-3 tracking-tight">3 wks → 3 days</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Average onboarding time</p>
              </div>
              <div>
                <p className="font-serif text-4xl sm:text-[2.5rem] text-neutral-900 leading-none mb-3 tracking-tight">0</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Manual handoffs between teams</p>
              </div>
              <div>
                <p className="font-serif text-4xl sm:text-[2.5rem] text-neutral-900 leading-none mb-3 tracking-tight">50%+</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Coordination overhead removed</p>
              </div>
            </div>

            <h2>Understanding that compounds</h2>
            <p>
              Onboardings finish in days, not weeks. Compliance sign-off rates improved too, because documents are collected and reviewed systematically rather than chased over email. And every unusual case that gets routed and resolved teaches the model something new about how the organisation actually works.
            </p>
            <p>
              The same organisational understanding has since been reused for contractor onboarding - a parallel process with similar friction and similar results. The outcome was not another isolated automation. It was reusable organisational understanding that could support future teams, systems and agents.
            </p>

            <blockquote>
              "It used to feel like herding cats. Now the whole thing just moves on its own. People approve when they need to approve, and everything else happens automatically."
              <cite>- Head of Procurement, operations company</cite>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-16 pt-10 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="text-sm font-semibold text-neutral-900 mb-1">Have a workflow that needs automating?</p>
              <p className="text-sm text-neutral-500 font-light">Let's map it out and scope a pilot together.</p>
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
