import { FC } from "react";
import { Rocket, Shield, Cpu, Layers } from "lucide-react";

interface OverviewProps {
  onNavigate?: (id: string) => void;
}

const Overview: FC<OverviewProps> = ({ onNavigate }) => {
  const cards = [
    { icon: Rocket, title: "Quickstart", description: "Get up and running in 5 minutes with a simple deployment.", id: "quickstart" },
    { icon: Shield, title: "Verification", description: "Learn how to test models against target hardware.", id: "verification" },
    { icon: Cpu, title: "Edge Deployment", description: "Deploy models to Jetson, Raspberry Pi, and more.", id: "edge-deployment" },
    { icon: Layers, title: "API Reference", description: "Complete SDK and CLI documentation.", id: "api-reference" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">Documentation</h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Learn how to verify, optimize, and deploy AI models to edge devices using the Olyxee platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => onNavigate?.(card.id)}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group text-left"
            >
              <Icon className="w-6 h-6 text-gray-700 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">{card.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
            </button>
          );
        })}
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">What is Olyxee?</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Olyxee is a verification-first AI deployment platform. It provides the infrastructure to take trained AI models and deploy them reliably to edge devices — from NVIDIA Jetson boards to Raspberry Pi to microcontrollers.
          </p>
          <p>
            The platform handles the entire lifecycle: model ingestion, automated verification against target hardware, optimization (quantization, pruning), deployment, and continuous monitoring.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Key capabilities</h2>
        <div className="space-y-3">
          {[
            { title: "Model Verification", description: "Automatically test model accuracy, latency, and memory usage against target hardware profiles before deployment." },
            { title: "Hardware Abstraction", description: "Write once, deploy anywhere. Grysics abstracts device-specific complexity into a unified interface." },
            { title: "Automatic Optimization", description: "Quantization, pruning, and runtime optimization tuned for your target hardware." },
            { title: "Production Monitoring", description: "Real-time observability with drift detection, anomaly alerts, and automated rollback." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-900">{item.title}</span>
                <span className="text-gray-600"> — {item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Supported frameworks</h2>
        <p className="text-gray-700 mb-4">Olyxee supports models from all major ML frameworks:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["PyTorch", "TensorFlow", "ONNX", "TFLite"].map((fw) => (
            <div key={fw} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-center text-sm font-medium text-gray-700">
              {fw}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Overview;
