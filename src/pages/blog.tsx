import { FC, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Clock, Calendar, Tag, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const grysicsArticle = {
  title: "Introducing Grysics: Verification-First AI Deployment",
  category: "Product",
  date: "March 2026",
  readTime: "6 min read",
  excerpt: "Today we're publicly unveiling Grysics — a verification engine that tests, validates, and monitors AI models before and after they reach production. Here's why we built it and what it means for the industry.",
  heroImage: null,
  sections: [
    {
      heading: "The problem we set out to solve",
      body: `Every AI team hits the same wall. The model works beautifully in a notebook — high accuracy, clean outputs, fast inference. Then it ships to production, and things start breaking. Not catastrophically at first — subtle drift, edge cases the test set didn't cover, hardware constraints nobody accounted for.\n\nWe spent months talking to engineering teams across industries. The stories were remarkably consistent: weeks of debugging deployment failures, models silently degrading in production, no clear way to know if a model would actually work on target hardware before committing to a rollout.\n\nThe tooling gap was obvious. There were great tools for training models, great tools for serving them — but almost nothing for the critical step in between: verifying that a model is actually ready for the real world.`,
    },
    {
      heading: "What Grysics does",
      body: `Grysics is a verification engine. It sits between your training pipeline and your deployment target, and it answers one question: will this model work correctly in production?\n\nIt does this through three layers of verification:\n\n**Pre-deployment testing** — Grysics runs your model against hardware-specific profiles, testing inference speed, memory footprint, numerical precision, and edge-case behavior on the exact configuration you're deploying to. If your model will fail on a Jetson Nano, you'll know before it ships.\n\n**Continuous validation** — Once deployed, Grysics monitors model behavior in real-time. It tracks output distributions, latency patterns, and resource usage, comparing them against baseline profiles established during verification.\n\n**Drift detection** — When model performance degrades — whether from data drift, hardware issues, or environmental changes — Grysics detects it and surfaces it immediately, before it becomes a customer-facing problem.`,
    },
    {
      heading: "Why verification-first matters",
      body: `The AI industry has largely treated deployment as an afterthought. Train the model, optimize it a bit, push it to production, and hope for the best. When things go wrong, debug reactively.\n\nWe think this is backwards. Verification should be a first-class step in the pipeline — not something you do when things break, but something that prevents breakage in the first place.\n\nThis is the same shift that happened in software engineering with CI/CD and automated testing. Nobody ships code without tests anymore. We believe the same should be true for AI models — no model should ship without verification against its production environment.`,
    },
    {
      heading: "What's next",
      body: `Grysics v1.0 is available today through our developer portal. We're starting with support for PyTorch and TensorFlow models targeting edge devices (NVIDIA Jetson, Raspberry Pi, Intel NCS) and cloud endpoints.\n\nOver the coming months, we'll be expanding hardware support, adding team collaboration features, and deepening our monitoring capabilities. If you're shipping AI to production and want to stop guessing whether it'll work — we built Grysics for you.`,
    },
  ],
};

const Blog: FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Blog" description="Technical articles, insights, and updates from the Olyxee team on AI infrastructure, verification, and deployment." path="/blog" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Blog</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.05] mb-8">
            Insights &
            <br />
            <em className="text-neutral-400">updates</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            Technical writing on AI deployment, reliability engineering, and the future of edge AI.
          </motion.p>
        </div>
      </section>

      <section className="pb-28 sm:pb-36 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                Recent
              </span>
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">{grysicsArticle.category}</span>
            </div>
          </motion.div>

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.1] mb-6">
              {grysicsArticle.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-neutral-400 mb-10">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {grysicsArticle.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {grysicsArticle.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                Grysics
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-neutral-200 mb-12 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 relative h-48 sm:h-64 flex items-center justify-center">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-xs text-neutral-400 uppercase tracking-widest font-medium">Olyxee Blog</span>
              </div>
              <div className="relative text-center">
                <span className="font-serif text-4xl sm:text-6xl text-white tracking-tight">Grysics</span>
                <p className="text-neutral-400 text-sm mt-2">Verification-first AI deployment</p>
              </div>
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            </div>

            <div className="prose-custom">
              <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed mb-10 font-light">
                {grysicsArticle.excerpt}
              </p>

              <div className="accent-line mb-10" />

              {grysicsArticle.sections.slice(0, 1).map((section) => (
                <div key={section.heading} className="mb-12">
                  <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 mb-6 tracking-tight">{section.heading}</h3>
                  {section.body.split("\n\n").map((para, i) => (
                    <p key={i} className="text-neutral-600 leading-[1.85] mb-5 text-[15px] sm:text-base" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-800 font-semibold">$1</strong>') }} />
                  ))}
                </div>
              ))}

              <AnimatePresence>
                {!expanded && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative"
                  >
                    <div className="absolute inset-x-0 bottom-12 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                    <button
                      onClick={() => setExpanded(true)}
                      className="relative flex items-center gap-2 mx-auto px-6 py-3 rounded-full border border-neutral-200 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 transition-all group bg-white shadow-sm"
                    >
                      Continue reading
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {grysicsArticle.sections.slice(1).map((section) => (
                      <div key={section.heading} className="mb-12">
                        <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 mb-6 tracking-tight">{section.heading}</h3>
                        {section.body.split("\n\n").map((para, i) => (
                          <p key={i} className="text-neutral-600 leading-[1.85] mb-5 text-[15px] sm:text-base" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-800 font-semibold">$1</strong>') }} />
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-neutral-100 pt-10 mt-16">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-neutral-400 mb-1">Want to try Grysics?</p>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Get started with the developer portal and verify your first model.
                  </p>
                </div>
                <Link
                  href="/products/grysics"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Learn more about Grysics
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.article>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
