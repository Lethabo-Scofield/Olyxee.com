import { FC, useEffect, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

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

const CODE_SAMPLES = [
  {
    label: "1. Send a document for verification",
    lang: "bash",
    code: `curl https://api.olyxee.com/v1/documents/verify \\
  -H "Authorization: Bearer $OLYXEE_API_KEY" \\
  -F "file=@invoice.pdf" \\
  -F 'schema={"invoice_number":"string","total":"number","vendor":"string"}'`,
  },
  {
    label: "2. Get back structured data and an integrity score",
    lang: "json",
    code: `{
  "id": "doc_8f2c1a",
  "status": "verified",
  "integrity_score": 0.98,
  "fields": {
    "invoice_number": "INV-4471",
    "total": 1840.00,
    "vendor": "Acme Logistics"
  },
  "flags": []
}`,
  },
  {
    label: "3. Gate your pipeline on the result",
    lang: "javascript",
    code: `const result = await olyxee.documents.verify({
  file,
  schema: { invoice_number: "string", total: "number" },
});

if (result.integrity_score < 0.9 || result.flags.length) {
  await routeToHumanReview(result);
} else {
  await pipeline.ingest(result.fields);
}`,
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
            className="text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.05] text-neutral-900 mt-4 font-semibold"
          >
            We&apos;ll be back <em className="not-italic text-neutral-400">shortly</em>
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
                  className="text-2xl sm:text-4xl tracking-tight tabular-nums text-neutral-900 font-semibold"
                >
                  {ready ? s.value : "--"}
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
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-neutral-900 text-sm font-medium hover:bg-neutral-100 transition-colors"
              >
                Contact us
              </Link>
            </div>
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
                <h3 className="text-xl text-neutral-900 mb-2 font-semibold tracking-tight">A faster pipeline</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  Verification runs and document checks return results noticeably quicker once we&apos;re back online.
                </p>
              </div>
              <div>
                <h3 className="text-xl text-neutral-900 mb-2 font-semibold tracking-tight">A cleaner audit ledger</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  Improved indexing makes it easier to trace, filter, and export the history of every document you&apos;ve verified.
                </p>
              </div>
              <div>
                <h3 className="text-xl text-neutral-900 mb-2 font-semibold tracking-tight">Your data is safe</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  All historic records remain untouched. No action is required from you, just sign back in when we&apos;re live.
                </p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 text-center mt-10">
              Need help in the meantime?{" "}
              <Link href="/contact" className="text-neutral-900 hover:text-neutral-600 underline underline-offset-4">
                Get in touch
              </Link>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-[-0.02em] text-neutral-900 leading-[1.05] font-semibold">
              What is <em className="not-italic text-neutral-400">Olyxee Document Integrity?</em>
            </h2>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-3xl">
              Olyxee Document Integrity is a verification layer for the documents your business runs on. It extracts structured information from files like invoices, contracts, claims, statements, and identity documents, validates them against your rules and trusted sources, flags inconsistencies and tampering, and records every check in an auditable ledger.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-14"
          >
            <h3 className="text-2xl sm:text-3xl text-neutral-900 mb-3 font-semibold tracking-tight">
              How you integrate it
            </h3>
            <p className="text-base text-neutral-600 leading-relaxed max-w-3xl mb-8">
              One REST endpoint sits in front of your pipeline. Send a file, get back structured fields plus an integrity score, and gate your workflow on the result. SDKs for Python and JavaScript wrap the same API.
            </p>
            <div className="space-y-5">
              {CODE_SAMPLES.map((c) => (
                <CodeBlock key={c.label} {...c} />
              ))}
            </div>
            <p className="mt-8 text-base text-neutral-600 font-light leading-relaxed max-w-3xl">
              Full schema validation, batch processing, tamper detection, and the auditable verification ledger are available to early access partners.{" "}
              <Link href="/contact" className="text-neutral-900 hover:text-neutral-600 underline underline-offset-4">
                Contact us
              </Link>{" "}
              to get an API key and the complete reference.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DocumentIntegrity;
