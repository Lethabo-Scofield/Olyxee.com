import { FC, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, Terminal, Package, BookOpen, Code2, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Developers: FC = () => {
  const [copied, setCopied] = useState(false);
  const installCmd = "pip install olyxee";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Developers</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.05] mb-8">
            Start building
            <br />
            <em className="text-neutral-400">with Olyxee</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light mb-10">
            Everything you need to verify, optimize, and deploy AI models to edge hardware.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-neutral-950 rounded-2xl p-6 sm:p-8 max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-neutral-500 font-mono">Quick Start</span>
              <button onClick={handleCopy} className="text-neutral-500 hover:text-white transition-colors p-1" aria-label="Copy install command">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <code className="text-green-400 font-mono text-sm sm:text-base">
              <span className="text-neutral-600">$</span> {installCmd}
            </code>
          </motion.div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-16">
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              Developer <em className="text-neutral-400">tools</em>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200">
            {[
              { icon: Code2, title: "SDK", description: "Python and C++ libraries for model verification, optimization, and deployment.", status: "Available" },
              { icon: Terminal, title: "CLI", description: "Command-line tools for managing deployments, running tests, and monitoring.", status: "Available" },
              { icon: Package, title: "API", description: "RESTful API for programmatic access to the WAVE platform.", status: "Beta" },
              { icon: BookOpen, title: "Docs", description: "Comprehensive guides, tutorials, and API reference.", status: "Available" },
            ].map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <motion.div key={tool.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="bg-white p-8 sm:p-10 hover:bg-neutral-50 transition-colors">
                  <Icon className="w-6 h-6 text-neutral-500 mb-5" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{tool.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">{tool.description}</p>
                  <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">{tool.status}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-16">
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              Getting <em className="text-neutral-400">started</em>
            </h2>
          </motion.div>
          <div className="space-y-0 divide-y divide-neutral-200 max-w-3xl">
            {[
              { step: "01", title: "Install the SDK", description: "Install the Olyxee Python SDK using pip. C++ support is also available." },
              { step: "02", title: "Import your model", description: "Load your trained model from PyTorch, TensorFlow, ONNX, or any supported framework." },
              { step: "03", title: "Run verification", description: "Use the verification pipeline to test your model against target hardware profiles." },
              { step: "04", title: "Deploy", description: "Deploy to your target devices with a single command. WAVE handles the rest." },
            ].map((item, idx) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="py-8 grid grid-cols-[auto_1fr] gap-6 items-start">
                <span className="text-xs font-mono text-neutral-400 mt-1">{item.step}</span>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-neutral-500 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight mb-6">
              Need <em className="text-neutral-500">help?</em>
            </h2>
            <p className="text-neutral-400 text-lg max-w-lg mx-auto mb-10 font-light leading-relaxed">
              Check out our documentation or join the community for support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide">
                Read the Docs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/community" className="inline-flex items-center gap-2 px-8 py-3.5 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide">
                Join Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Developers;
