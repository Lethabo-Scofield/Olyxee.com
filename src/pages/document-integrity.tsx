import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const MAINTENANCE_LOTTIE_URLS = [
  "https://assets1.lottiefiles.com/private_files/lf30_y9czxcb9.json",
  "https://assets9.lottiefiles.com/packages/lf20_kkflmtur.json",
  "https://assets10.lottiefiles.com/packages/lf20_2cwDXD.json",
];

const MAINTENANCE_END = new Date("2026-05-21T18:00:00Z");

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

const DocumentIntegrity: FC = () => {
  const { days, hours, minutes, seconds, ready } = useCountdown(MAINTENANCE_END);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const url of MAINTENANCE_LOTTIE_URLS) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const json = await res.json();
          if (!cancelled) {
            setAnimationData(json);
            return;
          }
        } catch {
          // try next url
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
          {/* Animation, blends into the white page */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto w-full max-w-md aspect-square"
          >
            {animationData ? (
              <Lottie
                animationData={animationData}
                loop
                autoplay
                className="w-full h-full"
                rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src="/images/under-construction.gif"
                  alt="Under construction"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain"
                />
              </div>
            )}
          </motion.div>

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
            className="mt-10 flex items-center justify-center gap-6 sm:gap-10"
          >
            {segments.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  suppressHydrationWarning
                  className="font-serif text-3xl sm:text-4xl tracking-tight tabular-nums text-neutral-900"
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DocumentIntegrity;
