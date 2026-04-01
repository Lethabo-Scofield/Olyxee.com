import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Shield, Brain, Eye, Activity, Lock, Sparkles } from "lucide-react";

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
      <SEO title="About" description="Learn about Olyxee's mission to build reliable AI infrastructure. Our team is dedicated to AI safety, verification, and making deployment trustworthy." path="/about" />
      <div className="grain" />
      <Header />

      <section className="relative pt-32 sm:pt-44 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/gradient-pastel.png" alt="" fill sizes="100vw" aria-hidden="true" priority className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-white/80" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-14"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 text-neutral-500 rounded-full text-xs font-medium mb-6 uppercase tracking-widest"
            >
              About Olyxee
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.1]"
            >
              We are building the trust layer
              <br />
              <em className="text-neutral-400">for artificial intelligence.</em>
            </motion.h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg sm:text-xl text-neutral-500 leading-relaxed max-w-3xl font-light"
          >
            AI is transforming every industry. But as systems grow more powerful, the question is no longer
            "can AI do this?" but "can we trust that it will do it correctly?" Olyxee exists to answer that question.
          </motion.p>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0">
                <Image src="/images/gradient-blue-pink.png" alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" aria-hidden="true" className="object-cover" />
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
              </div>
              <div className="relative p-10 sm:p-12">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center mb-6">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-6">The Problem</h2>
                <div className="space-y-5 text-[15px] text-neutral-600 leading-relaxed font-light">
                  <p>
                    AI models achieve remarkable results in controlled environments. But in production, they hallucinate,
                    drift, and fail in ways that are difficult to predict or detect.
                  </p>
                  <p>
                    There is no standard way to verify that an AI system will behave correctly before it reaches users,
                    and no systematic approach to catching failures after deployment. The gap between a promising demo
                    and a trustworthy product is where most AI projects stall.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
              className="rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0">
                <Image src="/images/gradient-yellow-green.png" alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" aria-hidden="true" className="object-cover" />
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
              </div>
              <div className="relative p-10 sm:p-12">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center mb-6">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-6">Our Answer</h2>
                <div className="space-y-5 text-[15px] text-neutral-600 leading-relaxed font-light">
                  <p>
                    We build verification-first infrastructure. Every component in the Olyxee stack is designed around a
                    simple principle: AI systems should be tested and evaluated before they reach users, and continuously
                    monitored after.
                  </p>
                  <p>
                    Our research focuses on hallucination detection, behavioral consistency, and automated evaluation,
                    the building blocks of AI you can actually rely on.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-16 sm:mb-20"
          >
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-4">What We Build</p>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-white">
              Verification-first
              <br />
              <em className="text-neutral-500">AI infrastructure</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: "Pre-deployment Testing", description: "Automated evaluation suites that test AI outputs for accuracy, consistency, and safety before reaching production." },
              { icon: Eye, title: "Hallucination Detection", description: "Research-backed methods to identify when AI models fabricate information, with confidence scoring and source attribution." },
              { icon: Brain, title: "Behavioral Evaluation", description: "Frameworks to evaluate whether AI systems respond consistently, measuring stability across rephrasings and edge cases." },
              { icon: Activity, title: "Production Monitoring", description: "Real-time observability for AI in production. Detect quality degradation, output drift, and emerging failure patterns." },
              { icon: Lock, title: "Compliance & Audit", description: "Systematic audit trails for regulated industries. Track every evaluation, every decision, and every outcome." },
              { icon: Sparkles, title: "Open Research", description: "We publish our findings and contribute tools to the ecosystem. AI safety infrastructure should be a shared foundation." },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={idx}
                  variants={fadeUp}
                  className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-neutral-500 mb-5" />
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-2"
            >
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Position</p>
              <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900 mb-6">
                Where we fit in the <em className="text-neutral-400">AI stack</em>
              </h2>
              <p className="text-neutral-500 text-[15px] leading-relaxed font-light mb-8">
                We sit between AI development and deployment. While others focus on training bigger models, we focus on
                making sure those models actually work as expected when they reach real users.
              </p>
              <Link href="/research" className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
                Read our research <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl overflow-hidden border border-neutral-200/80 shadow-lg shadow-neutral-200/30">
                <Image
                  src="/images/Olyxee_Position.png"
                  alt="Diagram showing Olyxee's position in the AI infrastructure stack, sitting between model development and production deployment"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Principles</p>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              What drives <em className="text-neutral-400">us</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Reliability over novelty", description: "The most important advances in AI will not come from making models bigger. They will come from making models more reliable.", icon: Shield },
              { title: "Transparency by default", description: "Every deployment should be explainable. Every failure should be traceable. Engineers should understand exactly what happened and why.", icon: Eye },
              { title: "Safety is not optional", description: "AI systems in healthcare, finance, and legal environments demand higher standards. We design for the most demanding use cases first.", icon: Lock },
              { title: "Open foundations", description: "Critical infrastructure should be open. We publish our research, open-source our tools, and contribute to the ecosystem that makes AI trustworthy.", icon: Sparkles },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={idx}
                  variants={fadeUp}
                  className="rounded-2xl bg-white border border-neutral-200/80 p-8 sm:p-10 hover:shadow-lg hover:shadow-neutral-200/40 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center mb-5">
                    <Icon className="w-4.5 h-4.5 text-neutral-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl overflow-hidden border border-neutral-200/80 shadow-lg shadow-neutral-200/30">
                <Image
                  src="/images/workflow.png"
                  alt="Olyxee verification workflow showing the pipeline from AI testing to production monitoring"
                  width={800}
                  height={450}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
              className="lg:col-span-2"
            >
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Founder's Note</p>
              <blockquote className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-snug mb-8 italic">
                "The companies that win in AI will be the ones whose systems work consistently
                and can be understood by the engineers who deploy them."
              </blockquote>
              <p className="text-[15px] text-neutral-500 leading-relaxed font-light mb-5">
                Olyxee exists to build the infrastructure layer that makes this possible. We are not
                building another model. We are building the foundation that every model needs.
              </p>
              <p className="text-[15px] text-neutral-500 leading-relaxed font-light">
                This means investing in verification research, building evaluation tooling, and
                creating systems rigorous enough for safety-critical applications, while
                remaining simple enough for any team to adopt.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-indigo-500/10 to-transparent blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="text-center"
          >
            <Image
              src="/Logo/Olyxee_Logo.png"
              alt="Olyxee"
              width={40}
              height={40}
              className="mx-auto mb-8 opacity-30 invert"
            />
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Join us in building
              <br />
              <em className="text-neutral-500">trustworthy AI</em>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              We are looking for researchers and engineers who want to solve hard problems in AI safety,
              verification, and evaluation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers" className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide">
                View Open Roles <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
