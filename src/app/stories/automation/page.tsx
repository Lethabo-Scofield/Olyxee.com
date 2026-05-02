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
              alt="Automated operations and scheduling workflow"
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
              Every new supplier relationship at this company started the same way: a procurement manager chasing forms, a compliance team waiting on documents, an IT team waiting on both before provisioning system access. The average onboarding took three to four weeks — not because anything was complicated, but because every handoff was manual and every team had its own queue.
            </p>
            <p>
              By the time a new supplier was fully activated, the relationship had already started on the wrong foot. And with dozens of onboardings running in parallel at any given time, the procurement team spent more time coordinating than buying.
            </p>

            <h2>What Olyxee built</h2>
            <p>
              We built a supplier onboarding workflow agent that orchestrates the entire process from intake to activation. When a new supplier is added to the pipeline, the agent sends the intake questionnaire, collects the required compliance documents, runs them through the verification checklist, and routes the approval request to the relevant stakeholder — all without manual intervention.
            </p>
            <p>
              Approvals happen through a simple review interface. Once signed off, the agent triggers IT provisioning and sends the supplier their access credentials and onboarding guide. Every step is logged, every handoff is timestamped, and the procurement manager has a live view of where each supplier stands.
            </p>

            <h2>The result</h2>
            <p>
              Average onboarding time dropped from three to four weeks to under three days. Zero manual handoffs between teams. The procurement team's coordination overhead was cut by more than half, and compliance sign-off rates improved because documents were collected and reviewed systematically rather than chased over email.
            </p>
            <p>
              The same workflow agent has since been adapted for contractor onboarding — a parallel process with similar friction and similar results.
            </p>

            <blockquote>
              "It used to feel like herding cats. Now the whole thing just moves on its own. People approve when they need to approve, and everything else happens automatically."
              <cite>— Head of Procurement, operations company</cite>
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
            <a
              href="mailto:scofield@olyxee.com?subject=Workflow%20Automation%20Pilot%20Inquiry"
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
