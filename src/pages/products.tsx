import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Zap, BarChart3 } from "lucide-react";

const ProductsPage: FC = () => {
  return (
    <>
      <SEO
        title="Products"
        description="AI verification and monitoring tools from Olyxee. Grysics: test, evaluate, and monitor AI applications before and after deployment."
        path="/products"
      />
      <Header />

      <section className="pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Products</p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight text-neutral-900 mb-6">
              Tools for <em className="text-blue-400">trustworthy AI</em>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-500 font-light leading-relaxed max-w-2xl">
              Verification, evaluation, and monitoring infrastructure so AI behaves as intended.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950" />
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-500/8 via-purple-500/4 to-transparent blur-3xl" />
        </div>
        <div className="relative py-20 sm:py-32 lg:py-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-4">Verification Engine</p>
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-5 sm:mb-6">
                  <Link href="/products/grysics" className="hover:text-neutral-300 transition-colors">Grysics</Link> <em className="text-orange-400/60">/ coming soon</em>
                </h2>
                <p className="text-neutral-400 text-[15px] sm:text-base font-light leading-relaxed mb-8">
                  A verification engine for AI applications. Test, evaluate, and monitor chatbots, RAG pipelines, and agent workflows.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    { label: "Hallucination detection", desc: "Find fabricated facts and confident-sounding nonsense automatically" },
                    { label: "Consistency testing", desc: "Verify your AI gives the same quality answer regardless of phrasing" },
                    { label: "Production monitoring", desc: "Real-time alerts when behavior drifts or quality degrades" },
                  ].map((tool) => (
                    <div key={tool.label} className="flex gap-3 items-start">
                      <Zap className="w-4 h-4 text-neutral-500 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-white">{tool.label}</span>
                        <span className="text-sm text-neutral-500 ml-2">{tool.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm"
                  >
                    Get Early Access <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/products/grysics"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-neutral-400 border border-white/15 rounded-full font-medium hover:bg-white/5 hover:text-white transition-all text-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-4"
              >
                <div className="rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    <span className="text-[11px] text-neutral-600 ml-2 font-mono">grysics verify</span>
                  </div>
                  <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-[13px] leading-[1.8] space-y-1 overflow-x-auto">
                    <div className="text-neutral-500">$ grysics verify --suite chatbot-v2</div>
                    <div className="text-neutral-400 mt-3">Running 847 test cases...</div>
                    <div className="text-neutral-400 mt-1 flex items-center gap-2">
                      <span className="text-green-400">{"✓"}</span> Accuracy: all assertions passed
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">{"✓"}</span> <span className="text-neutral-400">Consistency: 98.2% across paraphrases</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400">{"!"}</span> <span className="text-neutral-400">Hallucination: 3 cases flagged</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">{"✓"}</span> <span className="text-neutral-400">RAG retrieval: relevance above threshold</span>
                    </div>
                    <div className="text-neutral-400 mt-3">
                      <span className="text-neutral-600">{"───────────────────────────────"}</span>
                    </div>
                    <div className="text-white mt-1">
                      Results: <span className="text-green-400">844 passed</span>, <span className="text-amber-400">3 warnings</span>, <span className="text-red-400">0 failed</span>
                    </div>
                    <div className="text-neutral-600 mt-1">Report saved to ./reports/chatbot-v2.html</div>
                    <div className="mt-3 text-neutral-500 animate-pulse">{"▊"}</div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5" role="img" aria-label="Verification score trend from January to December">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="w-4 h-4 text-neutral-500" />
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Verification Score</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16" aria-hidden="true">
                    {[85, 92, 78, 95, 88, 91, 97, 83, 96, 94, 90, 98].map((val, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.04 }}
                        className={`flex-1 rounded-sm ${val >= 90 ? 'bg-emerald-500/40' : val >= 80 ? 'bg-amber-500/40' : 'bg-red-500/40'}`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2" aria-hidden="true">
                    <span className="text-[10px] text-neutral-600">Jan</span>
                    <span className="text-[10px] text-neutral-600">Dec</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductsPage;
