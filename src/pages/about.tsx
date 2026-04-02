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
      <SEO title="About" description="Olyxee provides research and infrastructure for artificial intelligence. We support experimentation, development, and verification of AI models with scalable tools for production deployment." path="/about" />
      <Header />

      <section className="relative pt-20 sm:pt-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-6xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden">
            <Image
              src="/images/section-header-bg.jpg"
              alt="AI infrastructure collage"
              width={1360}
              height={300}
              priority
              sizes="100vw"
              className="w-full h-auto block"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-xs font-semibold text-white/70 uppercase tracking-[0.25em] mb-3"
              >
                About Olyxee
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white leading-[1.08] tracking-tight"
              >
                Research and infrastructure{" "}
                <em className="text-blue-400">for artificial intelligence.</em>
              </motion.h1>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg text-neutral-500 max-w-xl leading-relaxed font-light mt-8 max-w-6xl mx-auto"
          >
            Olyxee empowers teams to develop, test, and deploy AI systems with robust infrastructure and scientific rigor.
          </motion.p>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 sm:mb-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <div className="inline-block px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold uppercase tracking-widest rounded-full mb-5">The Challenge</div>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-6 leading-tight">AI needs more than models.</h2>
              <div className="space-y-4 text-[15px] sm:text-base text-neutral-500 leading-relaxed font-light">
                <p>Building AI is one thing. Getting it to work reliably in production is another. Teams need scalable infrastructure, deployment pipelines, and verification tools to move from research to real-world impact.</p>
                <p>Most AI projects stall not because of bad models, but because the infrastructure around them is missing.</p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-neutral-200/50">
                <Image
                  src="/images/ai-failure-rate.png"
                  alt="The failure rate of AI projects is 50 percent"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-neutral-200/50">
                <Image
                  src="/images/ai-fixing.png"
                  alt="Engineers fixing and improving AI systems"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
              className="order-1 lg:order-2"
            >
              <div className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold uppercase tracking-widest rounded-full mb-5">Our Approach</div>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-6 leading-tight">Research-driven infrastructure.</h2>
              <div className="space-y-4 text-[15px] sm:text-base text-neutral-500 leading-relaxed font-light">
                <p>We support experimentation across deep learning, NLP, computer vision, and physics-informed AI. Through products like Grysics, we ensure models perform as expected before deployment.</p>
                <p>Scalable backend, deployment pipelines, and tools to integrate AI into production safely and efficiently.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-100 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
              className="mb-12 sm:mb-16"
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.25em] mb-4">What We Build</p>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900">
                AI research and infrastructure
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[
                { title: "AI Research", description: "Experimentation and development across deep learning, NLP, computer vision, and physics-informed AI.", bg: "/images/gradient-blue-pink.png" },
                { title: "Model Verification", description: "Through Grysics, ensure AI models perform as expected before deployment with rigorous testing.", bg: "/images/gradient-orange-purple.png" },
                { title: "Deployment Pipelines", description: "Scalable backend and tools to move AI from research to production safely and efficiently.", bg: "/images/gradient-pastel.png" },
                { title: "Production Monitoring", description: "Detect quality degradation, drift, and failure patterns in real time.", bg: "/images/gradient-purple.png" },
                { title: "Infrastructure at Scale", description: "Backend systems designed to handle AI workloads across training, inference, and evaluation.", bg: "/images/gradient-abstract-blue.png" },
                { title: "Open Research", description: "We publish findings and open-source tools to advance AI development collectively.", bg: "/images/gradient-yellow-green.png" },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={idx}
                  variants={fadeUp}
                  className="group relative rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${item.bg}")` }} />
                  <div className="absolute inset-0 bg-neutral-800/80" />
                  <div className="relative p-7 sm:p-8">
                    <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-neutral-300 leading-relaxed font-light">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-14 sm:mb-20"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.25em] mb-4">Our Principles</p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5">
              What drives us
            </h2>
            <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
              The principles behind every product we ship, every paper we publish, and every system we deploy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-neutral-200 rounded-2xl overflow-hidden">
            {[
              { num: "01", title: "Scientific rigor", description: "Every system we build is grounded in research, tested thoroughly, and validated before deployment. We do not ship what we cannot measure." },
              { num: "02", title: "Infrastructure first", description: "Great AI needs great infrastructure. We invest in the foundation, from scalable backends to deployment pipelines, so teams can focus on their models." },
              { num: "03", title: "Production ready", description: "We design for real-world workloads, not demos. Every tool is built to handle scale, complexity, and the unpredictability of production environments." },
              { num: "04", title: "Open research", description: "We publish our findings and contribute tools back to the broader AI community. Progress in AI infrastructure benefits everyone." },
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

      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
            >
              <div className="rounded-3xl overflow-hidden shadow-xl shadow-neutral-200/50">
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
            >
              <div className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-semibold uppercase tracking-widest rounded-full mb-5">Founder&apos;s Note</div>
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-900 leading-snug mb-8 tracking-tight">
                &ldquo;Great AI does not happen without great infrastructure. We are building the research and tools that make AI work in the real world.&rdquo;
              </blockquote>
              <div className="space-y-4">
                <p className="text-base text-neutral-500 leading-relaxed font-light">
                  We are not building another model. We are building the infrastructure, pipelines, and verification systems every AI team needs.
                </p>
                <p className="text-base text-neutral-500 leading-relaxed font-light">
                  From experimentation to production, Olyxee gives teams the tools to move faster with confidence.
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
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-orange-100/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
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
              width={48}
              height={48}
              className="mx-auto opacity-30 mb-8"
            />
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-5 sm:mb-6 text-neutral-900">
              Join us in building
              <br />
              <em className="text-blue-500">trustworthy AI</em>
            </h2>
            <p className="text-base sm:text-lg text-neutral-500 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Researchers and engineers solving hard problems in AI safety and verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/20">
                View Open Roles <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide">
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
