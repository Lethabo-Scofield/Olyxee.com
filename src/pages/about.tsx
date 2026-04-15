import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const About: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="About" description="Olyxee is an AI infrastructure company. We build systems that let organizations put AI to work across their operations — reliably, transparently, and at scale." path="/about" />
      <div className="grain" />
      <Header />

      <section className="pt-36 sm:pt-48 pb-20 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-6"
          >
            About Olyxee
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-neutral-900 tracking-tight leading-[1.1] mb-8"
          >
            Building the infrastructure for AI that operates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg sm:text-xl text-neutral-500 leading-relaxed font-light max-w-2xl mx-auto"
          >
            Olyxee is an AI infrastructure company. We build systems that let organizations put AI to work across their operations — reliably, transparently, and at scale.
          </motion.p>
        </div>
      </section>

      <section className="py-20 sm:py-32 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] lg:pt-2"
            >
              Our Mission
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-neutral-900 leading-snug tracking-tight mb-8">
                Most AI today advises. We believe it should execute. Our mission is to close the gap between what AI can understand and what it can actually do inside an organization.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                Teams everywhere are stuck translating AI recommendations into manual work — copying data between systems, running processes by hand, coordinating across tools. We&apos;re building the layer that removes that gap entirely.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] lg:pt-2"
            >
              What We Believe
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
            >
              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">AI should do work, not just generate answers</h3>
                  <p className="text-base text-neutral-500 leading-relaxed font-light max-w-2xl">
                    The most valuable AI doesn&apos;t sit in a chat window. It connects to your systems, understands your goals, and completes tasks end-to-end — without someone manually stitching it all together.
                  </p>
                </div>
                <div className="border-t border-neutral-200 pt-12">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">Trust is built through transparency</h3>
                  <p className="text-base text-neutral-500 leading-relaxed font-light max-w-2xl">
                    When AI takes action in high-stakes environments — finance, compliance, operations — every step must be auditable. We design for organizations that need to verify, not just trust.
                  </p>
                </div>
                <div className="border-t border-neutral-200 pt-12">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">Infrastructure should disappear</h3>
                  <p className="text-base text-neutral-500 leading-relaxed font-light max-w-2xl">
                    The best infrastructure is invisible. Teams should describe outcomes and get results — without worrying about the orchestration, integrations, or coordination underneath.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-6">From the Founder</p>
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-900 leading-snug mb-8 tracking-tight">
                &ldquo;We started Olyxee because the hardest part of AI isn&apos;t intelligence — it&apos;s getting that intelligence to actually do something useful inside an organization.&rdquo;
              </blockquote>
              <p className="text-base text-neutral-500 leading-relaxed font-light mb-8">
                The models are smart enough. What&apos;s missing is the infrastructure that lets them operate — connecting to real systems, executing real workflows, and doing it in a way that teams can trust and verify.
              </p>
              <div className="pt-6 border-t border-neutral-100">
                <a
                  href="https://www.linkedin.com/in/lethabo-scofield-17b37a257/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/images/lethabo-scofield.png"
                    alt="Lethabo Scofield"
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">Lethabo Scofield</p>
                    <p className="text-xs text-neutral-400">Founder &amp; CEO</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
              className="text-center bg-neutral-50 rounded-2xl p-10 sm:p-14 border border-neutral-100"
            >
              <Image
                src="/Logo/Olyxee_Logo.png"
                alt="Olyxee"
                width={48}
                height={48}
                loading="lazy"
                className="mx-auto opacity-30 mb-8"
              />
              <h3 className="font-serif text-2xl sm:text-3xl tracking-tight mb-4 text-neutral-900">
                Join us
              </h3>
              <p className="text-sm text-neutral-500 mb-8 max-w-sm mx-auto leading-relaxed font-light">
                We&apos;re building a team of people who want to make AI work in the real world — not just in demos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/careers" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide">
                  View Open Roles <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide">
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
