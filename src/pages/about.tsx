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
      <SEO title="About" description="Learn about Olyxee's mission to build reliable AI infrastructure. Our team is dedicated to AI safety, verification, and making deployment trustworthy." path="/about" />
      <div className="grain" />
      <Header />

      <section className="relative pt-28 sm:pt-44 pb-16 sm:pb-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.1] mb-8">
              We are building the trust layer
              <br />
              <em className="text-blue-400">for artificial intelligence.</em>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-neutral-500 leading-relaxed max-w-2xl font-light"
          >
            AI systems are growing more powerful, but not more trustworthy. Olyxee exists to change that.
          </motion.p>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center mb-20 sm:mb-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-3"
            >
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">The Problem</p>
              <h2 className="font-serif text-2xl sm:text-3xl tracking-tight mb-5">AI works in the lab. Production is different.</h2>
              <div className="space-y-4 text-[15px] text-neutral-500 leading-relaxed font-light">
                <p>AI hallucinates, drifts, and fails unpredictably in production. There is no standard way to verify AI before deployment or catch failures after.</p>
                <p>That gap is where most AI projects stall.</p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
              className="lg:col-span-2"
            >
              <Image
                src="/images/ai-failure-rate.png"
                alt="The failure rate of AI projects is 50 percent"
                width={500}
                height={300}
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-2 order-2 lg:order-1"
            >
              <Image
                src="/images/ai-fixing.png"
                alt="Engineers fixing and improving AI systems"
                width={500}
                height={300}
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
              className="lg:col-span-3 order-1 lg:order-2"
            >
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Answer</p>
              <h2 className="font-serif text-2xl sm:text-3xl tracking-tight mb-5">Verification-first infrastructure.</h2>
              <div className="space-y-4 text-[15px] text-neutral-500 leading-relaxed font-light">
                <p>Test before deployment, monitor after. We focus on hallucination detection, behavioral consistency, and automated evaluation.</p>
                <p>Rigorous enough for safety-critical applications. Simple enough for any team to adopt.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32 border-y border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-12 sm:mb-16"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">What We Build</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              Verification-first <em className="text-blue-400">AI infrastructure</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-100">
            {[
              { title: "Pre-deployment Testing", description: "Test AI outputs for accuracy, consistency, and safety before production." },
              { title: "Hallucination Detection", description: "Identify when models fabricate information, with confidence scoring." },
              { title: "Behavioral Evaluation", description: "Measure AI consistency across rephrasings and edge cases." },
              { title: "Production Monitoring", description: "Detect quality degradation, drift, and failure patterns in real time." },
              { title: "Compliance & Audit", description: "Audit trails for regulated industries. Every decision tracked." },
              { title: "Open Research", description: "We publish findings and open-source tools. Safety is a shared foundation." },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={idx}
                variants={fadeUp}
                className="bg-white p-6 sm:p-8"
              >
                <div className="text-3xl font-serif text-neutral-200 mb-4">{String(idx + 1).padStart(2, '0')}</div>
                <h3 className="text-base font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-2"
            >
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Position</p>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-900 mb-5">
                Where we fit in the AI stack
              </h2>
              <p className="text-neutral-500 text-[15px] leading-relaxed font-light mb-8">
                Others build bigger models. We make sure those models actually work when they reach real users.
              </p>
              <Link href="/research" className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
                Read our research <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
              <div className="rounded-2xl overflow-hidden border border-neutral-200/80">
                <Image
                  src="/images/ai-deployment-scale.png"
                  alt="Only 22% of large organizations have deployed AI at scale"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32 border-y border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-12 sm:mb-16"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Principles</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              What drives us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              { num: "01", title: "Reliability over novelty", description: "Better AI comes from making models more reliable, not just bigger." },
              { num: "02", title: "Transparency by default", description: "Every deployment explainable. Every failure traceable." },
              { num: "03", title: "Safety is not optional", description: "We design for the most demanding use cases first." },
              { num: "04", title: "Open foundations", description: "We publish research and open-source our tools. Safety is a shared foundation." },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={idx}
                variants={fadeUp}
              >
                <div className="text-3xl font-serif text-neutral-200 mb-4">{value.num}</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{value.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl overflow-hidden border border-neutral-200/80">
                <Image
                  src="/images/ai-debugging.png"
                  alt="Person debugging AI application alongside a robot"
                  width={800}
                  height={500}
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
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Founder's Note</p>
              <blockquote className="font-serif text-xl sm:text-2xl text-neutral-900 leading-snug mb-6 italic">
                "The companies that win in AI will be the ones whose systems actually work."
              </blockquote>
              <p className="text-[15px] text-neutral-500 leading-relaxed font-light mb-4">
                We are not building another model. We are building the foundation every model needs.
              </p>
              <p className="text-[15px] text-neutral-500 leading-relaxed font-light">
                Rigorous enough for safety-critical applications. Simple enough for any team to adopt.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-36 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-5 sm:mb-6 text-neutral-900">
              Join us in building
              <br />
              <em className="text-blue-400">trustworthy AI</em>
            </h2>
            <p className="text-base sm:text-lg text-neutral-500 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Researchers and engineers solving hard problems in AI safety and verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers" className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide">
                View Open Roles <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide">
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
