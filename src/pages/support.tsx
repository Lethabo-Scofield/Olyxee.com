import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Support: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Support" description="Get help with Olyxee. FAQs, troubleshooting, and contact information for technical support." path="/support" />
      <div className="grain" />
      <Header />
      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8 justify-center">
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Support</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-6">
            Coming <em className="text-neutral-400">soon</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto font-light mb-10">
            Our support center is under construction. In the meantime, reach out to us directly.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Support;
