import { FC, useState, FormEvent } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

function EarlyAccessForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-50 border border-green-200"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-green-100">
          <Check className="w-4 h-4 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-green-900">You're on the list!</p>
          <p className="text-xs text-green-600">We'll notify you when Grysics launches.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-5 py-3.5 rounded-full text-sm focus:outline-none transition-all placeholder:text-neutral-400 border border-neutral-200 bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-7 py-3.5 rounded-full font-medium text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2 flex-shrink-0 bg-neutral-900 text-white hover:bg-black"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 rounded-full animate-spin border-white/30 border-t-white" />
        ) : (
          <>Get Early Access <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}

const ProductsPage: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Products"
        description="AI verification and monitoring tools from Olyxee. Grysics: test, evaluate, and monitor AI applications before and after deployment."
        path="/products"
      />
      <div className="grain" />
      <Header />

      <section className="pt-28 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 leading-[1.08] mb-6"
          >
            Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base sm:text-xl text-neutral-500 leading-relaxed max-w-2xl font-light"
          >
            Verification, evaluation, and monitoring infrastructure so AI behaves as intended.
          </motion.p>
        </div>
      </section>

      <section className="pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/products/grysics" className="group block">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl sm:rounded-3xl border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-white transition-all duration-500 overflow-hidden hover:shadow-xl hover:shadow-neutral-100/80"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-sm font-semibold tracking-tight text-neutral-900">Grysics</span>
                    <span className="text-[10px] font-medium text-neutral-400 bg-neutral-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Coming soon</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight text-neutral-900 mb-4 leading-snug">
                    Verify your AI before it breaks
                  </h2>
                  <p className="text-neutral-500 text-[15px] sm:text-base font-light leading-relaxed mb-8 max-w-md">
                    One command to test accuracy, latency, and reliability across every target. Catch failures before your users do.
                  </p>
                  <div className="space-y-3 mb-10">
                    {[
                      "Hallucination detection",
                      "Consistency testing across paraphrases",
                      "Real-time production monitoring",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-neutral-400 flex-shrink-0" />
                        <span className="text-sm text-neutral-600 font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-neutral-900 group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10 flex items-center">
                  <div className="w-full rounded-xl bg-[#0d1117] border border-neutral-800 overflow-hidden shadow-lg">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      <span className="text-[10px] text-neutral-600 ml-2 font-mono">grysics verify</span>
                    </div>
                    <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-[12px] leading-[1.9] space-y-0.5 overflow-x-auto">
                      <div className="text-neutral-500">$ grysics verify --suite chatbot-v2</div>
                      <div className="text-neutral-500 mt-2">Running 847 test cases...</div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-green-400">✓</span> <span className="text-neutral-400">Accuracy: all assertions passed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span> <span className="text-neutral-400">Consistency: 98.2%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400">!</span> <span className="text-neutral-400">Hallucination: 3 flagged</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span> <span className="text-neutral-400">RAG relevance: above threshold</span>
                      </div>
                      <div className="text-neutral-700 mt-2">───────────────────────</div>
                      <div className="text-white mt-0.5">
                        <span className="text-green-400">844 passed</span> · <span className="text-amber-400">3 warnings</span> · <span className="text-red-400">0 failed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      <section className="pb-24 sm:pb-36 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="rounded-2xl sm:rounded-3xl border border-neutral-100 bg-neutral-50/50 p-8 sm:p-12 lg:p-14"
          >
            <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-neutral-900 mb-3">
              Get early access
            </h3>
            <p className="text-neutral-500 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-lg">
              Grysics is currently in limited beta. Leave your email and we'll notify you when it's ready.
            </p>
            <EarlyAccessForm />
            <p className="text-xs text-neutral-400 mt-4">Free during beta · No credit card required</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
