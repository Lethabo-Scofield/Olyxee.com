import { FC, useEffect, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const MAINTENANCE_END = new Date("2026-07-15T18:00:00Z");

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return { days: 0, hours: 0, minutes: 0, seconds: 0, ready: false };
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, ready: true };
}

const pad = (n: number) => n.toString().padStart(2, "0");

const GUIDE_STEPS = [
  {
    title: "Connect your sources",
    body: "Send documents to Document Integrity from your app, storage, or data pipeline through a single API, in batches or in real time.",
  },
  {
    title: "Define what valid means",
    body: "Set the fields you need extracted and the rules and reference sources each document should be checked against.",
  },
  {
    title: "Extract and validate",
    body: "Document Integrity returns clean structured data, a per-document integrity score, and a clear list of any inconsistencies it finds.",
  },
  {
    title: "Gate your workflow",
    body: "Pass verified documents straight through to your AI or automation, and route anything flagged to a person for review.",
  },
  {
    title: "Audit and monitor",
    body: "Every check is written to an exportable ledger, so you can trace, filter, and prove the history of every document you have verified.",
  },
];

const DocumentIntegrity: FC = () => {
  const { days, hours, minutes, seconds, ready } = useCountdown(MAINTENANCE_END);

  const segments = [
    { label: "Days", value: pad(days) },
    { label: "Hours", value: pad(hours) },
    { label: "Minutes", value: pad(minutes) },
    { label: "Seconds", value: pad(seconds) },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <SEO
        title="Olyxee Document Integrity, Scheduled Maintenance"
        description="Olyxee Document Integrity is currently undergoing scheduled maintenance."
        path="/document-integrity"
      />
      <Header />

      <section className="flex-1 flex items-center justify-center px-6 pt-28 pb-20">
        <div className="max-w-3xl w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-neutral-900 mt-4"
          >
            We&apos;ll be back <em className="text-orange-500">shortly</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base sm:text-lg text-neutral-500 font-light mt-5 max-w-lg mx-auto"
          >
            Olyxee Document Integrity is undergoing scheduled maintenance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex items-center justify-center gap-3 xs:gap-5 sm:gap-10"
          >
            {segments.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  suppressHydrationWarning
                  className="font-serif text-2xl sm:text-4xl tracking-tight tabular-nums text-neutral-900"
                >
                  {ready ? s.value : "—"}
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </motion.div>

          {/* What to expect */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-20 sm:mt-24 max-w-2xl mx-auto text-left"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 text-center mb-6">
              What to expect
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
              <div>
                <h3 className="font-serif text-xl text-neutral-900 mb-2">A faster pipeline</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  Verification runs and document checks return results noticeably quicker once we&apos;re back online.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-neutral-900 mb-2">A cleaner audit ledger</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  Improved indexing makes it easier to trace, filter, and export the history of every document you&apos;ve verified.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-neutral-900 mb-2">Your data is safe</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  All historic records remain untouched. No action is required from you, just sign back in when we&apos;re live.
                </p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 text-center mt-10 font-light">
              Need help in the meantime? Reach us at{" "}
              <a href="mailto:support@olyxee.com" className="text-neutral-700 hover:text-neutral-900 underline underline-offset-4">
                support@olyxee.com
              </a>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* === USAGE GUIDE === */}
      <section className="border-t border-neutral-100 bg-neutral-50/60 px-6 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 mb-4">
              A quick guide
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 leading-[1.05]">
              What is <em className="text-orange-500">Document Integrity?</em>
            </h2>
            <p className="mt-6 text-lg text-neutral-600 font-light leading-relaxed max-w-3xl">
              Document Integrity is a verification layer for the documents your business runs on. It extracts structured information from files like invoices, contracts, claims, statements, and identity documents, validates them against your rules and trusted sources, flags inconsistencies and tampering, and records every check in an auditable ledger.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-14"
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 mb-4">
              For any team building AI products
            </h3>
            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-3xl">
              Any AI product that reads documents inherits whatever errors or fraud those documents contain, and a model is only as trustworthy as its inputs. Document Integrity sits in front of your pipelines as a gate, so your retrieval systems, agents, and automations act on validated, structured, trustworthy data instead of raw, unverified files.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-14"
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 mb-8">
              How you&apos;ll use it
            </h3>
            <ol className="space-y-6">
              {GUIDE_STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-neutral-900 text-white text-sm font-medium flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-lg font-medium text-neutral-900">{s.title}</h4>
                    <p className="mt-1 text-sm sm:text-base text-neutral-500 font-light leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DocumentIntegrity;
