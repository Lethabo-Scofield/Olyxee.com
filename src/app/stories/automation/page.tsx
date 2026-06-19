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
              Supplier onboarding fully automated, end to end.
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
              Onboarding a supplier is mostly waiting - for documents, for signatures, for IT access. We built it on Orgni Workflows to do the chasing, so people only show up to make decisions.
            </p>

            <h2>The challenge</h2>
            <p>
              Every new supplier started the same way: a procurement manager chasing forms, a compliance team waiting on documents, an IT team waiting on both before provisioning access.
            </p>
            <p>
              Average onboarding took three to four weeks - not because anything was complicated, but because every handoff was manual and every team had its own queue. With dozens of onboardings running in parallel, the procurement team was spending more time <strong>coordinating</strong> than buying.
            </p>

            <h2>What we built</h2>
            <p>
              We built the onboarding process on <strong>Orgni Workflows</strong>, our system for orchestrating multi-step operations end to end. Because it runs on <strong>Orgni</strong>, our core infrastructure for AI operations, the workflow carries full context - who the supplier is, what has already been collected, and what each team needs next - so nothing falls through the gaps between handoffs. When a new supplier enters the pipeline, Orgni Workflows runs the playbook from intake to activation.
            </p>
            <ul>
              <li><strong>Intake automation.</strong> The questionnaire goes out automatically and collects required compliance documents.</li>
              <li><strong>Verification checks.</strong> Documents are run through the verification checklist and flagged where review is needed.</li>
              <li><strong>Approval routing.</strong> The right stakeholder is pulled in at the right step through a simple review interface.</li>
              <li><strong>IT provisioning.</strong> Once approved, the agent triggers access provisioning and sends credentials and onboarding guide to the supplier.</li>
            </ul>
            <p>
              Every step is logged, every handoff is timestamped, and the procurement manager has a live view of where each supplier stands.
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

            <h2>What changed</h2>
            <p>
              Onboardings finish in days, not weeks. Compliance sign-off rates improved too, because documents are collected and reviewed systematically rather than chased over email.
            </p>
            <p>
              The same Orgni Workflows playbook has since been adapted for contractor onboarding - a parallel process with similar friction and similar results.
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
