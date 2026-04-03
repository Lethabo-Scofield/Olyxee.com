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
      <SEO title="About" description="Olyxee builds the infrastructure to make AI applications more reliable, accurate, and observable in production." path="/about" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">About Olyxee</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.08] mb-6"
          >
            We make AI applications <em className="text-blue-500">work as intended</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base sm:text-xl text-neutral-500 leading-relaxed max-w-2xl font-light"
          >
            Olyxee builds verification, evaluation, and monitoring infrastructure so teams can ship AI with confidence.
          </motion.p>
        </div>
      </section>

      <section className="pb-20 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-6 leading-tight">The problem we solve</h2>
              <div className="space-y-4 text-[15px] sm:text-base text-neutral-500 leading-relaxed font-light">
                <p>AI models are getting better every month. But the applications built on top of them still break in unpredictable ways — hallucinations, inconsistent outputs, silent quality degradation.</p>
                <p>The gap between a working demo and a reliable product is enormous. Most teams have no way to systematically verify, evaluate, or monitor their AI in production.</p>
                <p>That's what Olyxee is here to fix.</p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <div className="bg-neutral-50 rounded-2xl p-8 sm:p-10 border border-neutral-100">
                <div className="space-y-8">
                  {[
                    { stat: "50%", label: "of AI projects fail to reach production" },
                    { stat: "62%", label: "hallucination reduction with verification" },
                    { stat: "3x", label: "faster issue detection with monitoring" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="text-3xl sm:text-4xl font-serif text-neutral-900 mb-1">{item.stat}</div>
                      <p className="text-sm text-neutral-500 font-light">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-14 sm:mb-20"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.25em] mb-4">What We Build</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              Infrastructure for reliable AI
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Verification", description: "Test AI outputs for accuracy, consistency, and hallucinations before they reach users.", bg: "/images/gradient-blue.png" },
              { title: "Evaluation", description: "Continuous scoring and benchmarking so you always know how your AI is performing.", bg: "/images/gradient-orange-pink.png" },
              { title: "Monitoring", description: "Real-time observability for production AI. Catch drift, failures, and quality issues early.", bg: "/images/gradient-purple.png" },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={idx}
                variants={fadeUp}
                className="relative rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0">
                  <Image src={item.bg} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-white/80 group-hover:bg-white/75 transition-colors duration-300" />
                </div>
                <div className="relative p-8 sm:p-10">
                  <div className="text-xs font-mono text-neutral-400 mb-6">0{idx + 1}</div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-14 sm:mb-20"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.25em] mb-4">Our Principles</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              What drives us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-neutral-200 rounded-2xl overflow-hidden">
            {[
              { num: "01", title: "Reliability over novelty", description: "We prioritize building things that work consistently over chasing the latest trend. Our tools are designed for production, not demos." },
              { num: "02", title: "Measure everything", description: "If you can't measure it, you can't improve it. Every system we build is grounded in data, tested thoroughly, and validated before shipping." },
              { num: "03", title: "We don't build models", description: "We make the models you already use work better. We're not competing with model providers — we're giving them the infrastructure to succeed." },
              { num: "04", title: "Transparency", description: "We publish our research, share our findings, and build in the open. Trust is earned through visibility." },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={idx}
                variants={fadeUp}
                className="bg-white p-8 sm:p-10 lg:p-12"
              >
                <span className="text-xs font-mono text-neutral-300 tracking-wider mb-4 block">{value.num}</span>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{value.title}</h3>
                <p className="text-[15px] text-neutral-500 leading-relaxed font-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
            >
              <div className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-semibold uppercase tracking-widest rounded-full mb-5">Founder&apos;s Note</div>
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-900 leading-snug mb-8 tracking-tight">
                &ldquo;We're not here to build another model. We're here to make sure the ones you use actually work.&rdquo;
              </blockquote>
              <div className="space-y-4">
                <p className="text-base text-neutral-500 leading-relaxed font-light">
                  AI is only as valuable as its reliability. At Olyxee, we build the infrastructure that closes the gap between what AI promises and what it delivers.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-neutral-100">
                <a
                  href="https://www.linkedin.com/in/lethabo-scofield-17b37a257/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/images/lethabo-scofield.png"
                    alt="Lethabo Scofield"
                    width={40}
                    height={40}
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
                Join us in building<br /><em className="text-blue-500">trustworthy AI</em>
              </h3>
              <p className="text-sm text-neutral-500 mb-8 max-w-sm mx-auto leading-relaxed font-light">
                We're looking for people who care about making AI work reliably in the real world.
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
