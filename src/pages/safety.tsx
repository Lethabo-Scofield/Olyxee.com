import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, Shield, AlertTriangle, Eye, RotateCcw, CheckCircle, Lock } from "lucide-react";

const Safety: FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Safety & Reliability</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
            AI systems must be reliable before they can be useful.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Olyxee's approach to safety is grounded in engineering rigor — not aspirational principles.
            We build systems that detect, prevent, and recover from AI failures.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">Our Reliability Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
                title: "Pre-Deployment Verification",
                description: "Every model goes through rigorous automated testing against target hardware before it touches production. We test for accuracy, latency, resource consumption, and edge cases.",
              },
              {
                icon: AlertTriangle,
                title: "Failure Detection",
                description: "Real-time monitoring that identifies model drift, anomalous predictions, and performance degradation before they become critical failures.",
              },
              {
                icon: Eye,
                title: "Explainability",
                description: "Our Neural Reality Network architecture provides interpretable pathways into AI decision-making, making it possible to understand why a model made a specific prediction.",
              },
              {
                icon: RotateCcw,
                title: "Automated Recovery",
                description: "When issues are detected, the system can automatically roll back to a known-good state, notify operators, and provide diagnostic information for investigation.",
              },
              {
                icon: CheckCircle,
                title: "Deployment Guarantees",
                description: "Formal accuracy and latency guarantees for deployed models, with continuous verification that these guarantees are maintained over time.",
              },
              {
                icon: Lock,
                title: "Secure by Default",
                description: "Model encryption, secure deployment channels, and access control are built into every layer of the platform — not added as afterthoughts.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-200">
                  <Icon className="w-8 h-8 text-gray-700 mb-5" />
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">Why this matters</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              AI systems are being deployed in safety-critical applications — from medical devices
              to autonomous vehicles to industrial control systems. In these environments, "good enough"
              accuracy isn't good enough. A model that works 99% of the time will fail thousands of
              times at scale.
            </p>
            <p>
              Traditional software engineering has decades of established practices for reliability —
              testing, monitoring, rollback, formal verification. AI systems need the same rigor,
              adapted for the unique challenges of machine learning: non-deterministic behavior,
              data distribution shift, and hardware-dependent performance.
            </p>
            <p>
              Olyxee builds this missing infrastructure layer. We don't claim to solve alignment or
              AGI safety — we focus on the immediate, practical challenge of making today's AI systems
              reliable enough to deploy with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Learn more about our approach</h2>
          <p className="text-gray-600 mb-10 max-w-lg mx-auto text-lg">
            Read our research on AI reliability and verification methods.
          </p>
          <Link href="/research" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-black transition-all">
            View Research <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Safety;
