import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Shield, Cpu, Zap, GitBranch, BarChart3 } from "lucide-react";

const Technology: FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Technology</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
            How Olyxee works.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            The Olyxee platform is built on WAVE — our core architecture for verified AI deployment.
            It handles the entire lifecycle from model verification to production monitoring.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">WAVE Architecture</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl">
            WAVE (Workload Adaptive Verification Engine) is the infrastructure layer that powers
            all Olyxee products. It provides three core capabilities:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Verification Pipeline",
                description: "Automated testing that validates model correctness across target hardware configurations before deployment. Catches failures before they reach production.",
              },
              {
                icon: Layers,
                title: "Hardware Abstraction",
                description: "A unified deployment interface that abstracts away device-specific complexity. Write once, deploy to any supported hardware target.",
              },
              {
                icon: BarChart3,
                title: "Runtime Monitoring",
                description: "Continuous observability for deployed models — tracking accuracy drift, latency, and resource usage with automated alerting.",
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">The Deployment Pipeline</h2>
          <div className="space-y-8">
            {[
              { step: "01", title: "Model Ingestion", description: "Import your model from any framework — PyTorch, TensorFlow, ONNX. WAVE automatically analyzes architecture and dependencies.", icon: GitBranch },
              { step: "02", title: "Verification", description: "Run comprehensive tests against target hardware profiles. Identify accuracy degradation, latency bottlenecks, and edge cases before deployment.", icon: Shield },
              { step: "03", title: "Optimization", description: "Automatic quantization and runtime optimization tuned for your target hardware. Maintains accuracy guarantees while minimizing resource usage.", icon: Cpu },
              { step: "04", title: "Deployment", description: "One-click deployment to any supported device. WAVE handles containerization, driver compatibility, and configuration management.", icon: Zap },
              { step: "05", title: "Monitoring", description: "Real-time observability dashboard with drift detection, anomaly alerts, and automated rollback capabilities.", icon: BarChart3 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-gray-400">{item.step}</span>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Supported Hardware</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl">
            WAVE supports a growing ecosystem of edge and cloud hardware targets.
          </p>
          <div className="flex flex-wrap justify-start gap-8 sm:gap-12">
            {[
              { src: "/hardware-logos/NVIDIA-logo-BL_thmb.jpg", alt: "NVIDIA Jetson" },
              { src: "/hardware-logos/arduino-logo.png", alt: "Arduino" },
              { src: "/hardware-logos/raspberrypi.png", alt: "Raspberry Pi" },
              { src: "/hardware-logos/intel.jpg", alt: "Intel" },
              { src: "/hardware-logos/ESP32.png", alt: "ESP32" },
            ].map((logo, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-20 h-14 flex items-center justify-center">
                  <Image src={logo.src} alt={logo.alt} width={80} height={56} unoptimized className="object-contain w-auto h-auto" />
                </div>
                <span className="text-xs text-gray-500">{logo.alt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Start building with WAVE</h2>
          <p className="text-gray-600 mb-10 max-w-lg mx-auto text-lg">
            Access our developer tools and deploy your first model in minutes.
          </p>
          <Link href="/developers" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-black transition-all">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Technology;
