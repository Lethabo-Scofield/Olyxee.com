import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, ArrowLeft } from "lucide-react";

const DocumentIntegrity: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative flex flex-col">
      <SEO title="Olyxee Document Integrity, Scheduled Maintenance" description="Olyxee Document Integrity is currently undergoing scheduled maintenance." path="/document-integrity" />
      <div className="grain" />
      <Header />

      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-32 pb-24">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-8"
          >
            <Wrench className="w-7 h-7 text-neutral-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Scheduled Maintenance</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6"
          >
            We&apos;ll be back <em className="text-orange-400">shortly</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-neutral-500 leading-relaxed font-light mb-10"
          >
            Olyxee Document Integrity is currently undergoing scheduled maintenance.
            We&apos;re making improvements to bring you a better experience. Thanks for your patience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
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
