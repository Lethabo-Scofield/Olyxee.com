import { FC, useEffect, useState } from "react";
import Image from "next/image";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, CalendarDays, ShieldCheck } from "lucide-react";

const MAINTENANCE_END = new Date("2026-05-21T18:00:00Z");

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: false, ready: false };
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, done: diff === 0, ready: true };
}

const pad = (n: number) => n.toString().padStart(2, "0");

const DocumentIntegrity: FC = () => {
  const { days, hours, minutes, seconds, ready } = useCountdown(MAINTENANCE_END);

  const startedAt = "May 12, 2026 · 09:00 UTC";
  const expectedBack = MAINTENANCE_END.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });

  const segments = [
    { label: "Days", value: pad(days) },
    { label: "Hours", value: pad(hours) },
    { label: "Minutes", value: pad(minutes) },
    { label: "Seconds", value: pad(seconds) },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative flex flex-col">
      <SEO
        title="Olyxee Document Integrity, Scheduled Maintenance"
        description="Olyxee Document Integrity is currently undergoing scheduled maintenance. Track the countdown and expected return time."
        path="/document-integrity"
      />
      <div className="grain" />
      <Header />

      <section className="flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-12 pt-32 pb-24">
        <div className="max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-3xl bg-neutral-100 border border-neutral-200/70 px-6 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 overflow-hidden"
          >
            <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-orange-100/60 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-neutral-200/60 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
              {/* Left: copy + countdown */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200 mb-6"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                  </span>
                  <span className="text-[11px] font-medium text-neutral-700 uppercase tracking-[0.2em]">
                    Scheduled Maintenance
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-neutral-900 mb-5"
                >
                  We&apos;ll be back <em className="text-orange-500">shortly</em>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light mb-8 max-w-xl"
                >
                  Olyxee Document Integrity is undergoing scheduled maintenance.
                  We&apos;re upgrading the verification pipeline and audit ledger to deliver a faster, more reliable experience.
                </motion.p>

                {/* Countdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="mb-8"
                >
                  <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-[0.22em] mb-3">
                    Estimated time remaining
                  </p>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md">
                    {segments.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl bg-white border border-neutral-200/80 px-2 py-3 sm:py-4 text-center"
                      >
                        <p
                          suppressHydrationWarning
                          className="font-serif text-2xl sm:text-3xl tracking-tight tabular-nums text-neutral-900"
                        >
                          {ready ? s.value : "—"}
                        </p>
                        <p className="mt-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Meta rows */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="space-y-2.5 mb-8 text-sm text-neutral-600 font-light"
                >
                  <div className="flex items-start gap-2.5">
                    <CalendarDays className="w-4 h-4 mt-0.5 text-neutral-500 shrink-0" />
                    <span>
                      <span className="text-neutral-500">Started:</span>{" "}
                      <span className="text-neutral-900 font-normal">{startedAt}</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 mt-0.5 text-neutral-500 shrink-0" />
                    <span suppressHydrationWarning>
                      <span className="text-neutral-500">Expected back:</span>{" "}
                      <span className="text-neutral-900 font-normal">{expectedBack}</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 mt-0.5 text-neutral-500 shrink-0" />
                    <span>
                      <span className="text-neutral-500">Status:</span>{" "}
                      <span className="text-neutral-900 font-normal">All historic data is safe and untouched</span>
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/10"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to home
                  </Link>
                  <Link
                    href="/status"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-neutral-300 text-neutral-900 text-sm font-medium hover:border-neutral-900 transition-colors"
                  >
                    View system status
                  </Link>
                </motion.div>
              </div>

              {/* Right: construction visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative mx-auto w-full max-w-sm"
              >
                <div className="relative rounded-3xl overflow-hidden bg-white border border-neutral-200/80 aspect-square shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)]">
                  <Image
                    src="/images/under-construction.gif"
                    alt="Under construction"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-[0.22em]">
                    Building something better
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DocumentIntegrity;
