import { FC, useState, FormEvent } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
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
        description="Olyxee products for AI verification, evaluation, and monitoring. Grysics tests accuracy, consistency, and hallucinations across your AI application before your users find them."
        path="/products"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Grysics",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Cloud",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/PreOrder",
          },
          description: "AI verification and evaluation platform that tests accuracy, consistency, and hallucinations across AI applications before deployment.",
          creator: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
          },
        }}
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
                    <Image src="/images/grysics-logo.png" alt="Grysics" width={28} height={28} className="rounded-md" style={{ width: 28, height: 28 }} />
                    <span className="text-sm font-semibold tracking-tight text-neutral-900">Grysics</span>
                    <span className="text-[10px] font-medium text-neutral-400 bg-neutral-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Coming soon</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight text-neutral-900 mb-4 leading-snug">
                    Verify your AI before it breaks
                  </h2>
                  <p className="text-neutral-500 text-[15px] sm:text-base font-light leading-relaxed mb-8 max-w-md">
                    Automatically test accuracy, consistency, and reliability across your AI application. Catch failures before your users do.
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
                  <div className="w-full rounded-xl bg-white border border-neutral-200 overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
                      <span className="text-sm font-semibold text-neutral-900">Verification Results</span>
                      <span className="text-[10px] font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Passed</span>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500">Accuracy</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 sm:w-24 h-2 rounded-full bg-neutral-100 overflow-hidden">
                            <div className="w-full h-full rounded-full bg-green-500" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-neutral-900">100%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500">Consistency</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 sm:w-24 h-2 rounded-full bg-neutral-100 overflow-hidden">
                            <div className="w-[98%] h-full rounded-full bg-green-500" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-neutral-900">98.2%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500">Hallucinations</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 sm:w-24 h-2 rounded-full bg-neutral-100 overflow-hidden">
                            <div className="w-[3%] h-full rounded-full bg-amber-400" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-amber-600">3 flagged</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500">RAG Relevance</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 sm:w-24 h-2 rounded-full bg-neutral-100 overflow-hidden">
                            <div className="w-[95%] h-full rounded-full bg-green-500" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-neutral-900">95.4%</span>
                        </div>
                      </div>
                      <div className="pt-3 mt-1 border-t border-neutral-100 flex items-center justify-between">
                        <span className="text-xs text-neutral-400">847 test cases completed</span>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-green-600 font-medium">844 passed</span>
                          <span className="text-amber-600 font-medium">3 warnings</span>
                        </div>
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
