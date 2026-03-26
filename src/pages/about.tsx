import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Globe, Cpu, Target } from "lucide-react";

const About: FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">About Olyxee</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
            Making AI systems reliable enough to trust.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Olyxee is an AI infrastructure company focused on the hardest problem in modern AI:
            ensuring systems work reliably in the real world — not just in the lab.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">The Problem</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              AI models achieve remarkable results in controlled environments. But when deployed
              to real hardware — edge devices, IoT sensors, production servers — they fail in
              unpredictable ways. Models drift. Hardware constraints break assumptions. Latency
              spikes cause cascading failures.
            </p>
            <p>
              The gap between "works in the notebook" and "works in production" is where most
              AI projects die. There's no standard infrastructure for verification, no reliable
              way to test across heterogeneous hardware, and no systematic approach to ensuring
              AI systems remain correct after deployment.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">Our Approach</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            We build verification-first infrastructure. Every component in the Olyxee stack is
            designed around a core principle: AI systems should be proven correct before they're
            deployed, and continuously monitored after.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { icon: Shield, title: "Verification Before Deployment", description: "Rigorous pre-deployment testing across target hardware configurations." },
              { icon: Globe, title: "Hardware Agnostic", description: "One pipeline for every device — from $5 microcontrollers to GPU clusters." },
              { icon: Cpu, title: "Edge-Native", description: "Built for resource-constrained environments where reliability matters most." },
              { icon: Target, title: "Continuous Monitoring", description: "Runtime observability that detects drift and degradation in real-time." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                  <Icon className="w-8 h-8 text-gray-700 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">Philosophy</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              We believe the most important advances in AI won't come from making models bigger —
              they'll come from making models more reliable. The companies that win in AI will be
              the ones whose systems work consistently, fail gracefully, and can be understood by
              the engineers who deploy them.
            </p>
            <p>
              Olyxee exists to build the infrastructure layer that makes this possible. We're not
              building another model. We're building the foundation that every model needs to work
              in the real world.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Join us</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
            We're looking for engineers who want to solve hard problems in AI reliability,
            distributed systems, and edge deployment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/careers" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-black transition-all">
              View Careers <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
