import { FC } from "react";
import { ArrowRight } from "lucide-react";

const Guides: FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">Deployment Guide</h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Step-by-step guide to deploying your first AI model with Olyxee.
        </p>
      </div>

      <div className="space-y-10 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Prerequisites</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Python 3.8 or later</li>
            <li>A trained model in PyTorch, TensorFlow, or ONNX format</li>
            <li>A supported edge device (or use the simulator for testing)</li>
            <li>The Olyxee SDK installed (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">pip install olyxee</code>)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Step 1: Prepare your model</h2>
          <p>
            Start by loading your trained model into the Olyxee SDK. The platform automatically detects the framework and model architecture.
          </p>
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-950 my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
              <span className="text-xs text-gray-400 font-mono">python</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
              <code className="text-gray-300 font-mono whitespace-pre">{`import olyxee

# Load your trained model
model = olyxee.load("path/to/model.onnx")

# Inspect model properties
print(model.summary())
# Framework: ONNX
# Parameters: 2.4M
# Input shape: (1, 3, 224, 224)
# Output shape: (1, 1000)`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Step 2: Choose a target</h2>
          <p>
            Select the hardware target for your deployment. You can list available targets using the SDK:
          </p>
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-950 my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
              <span className="text-xs text-gray-400 font-mono">python</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
              <code className="text-gray-300 font-mono whitespace-pre">{`# List available hardware targets
targets = olyxee.list_targets()
for t in targets:
    print(f"{t.name} - {t.status}")

# jetson-nano - supported
# jetson-xavier - supported
# raspberry-pi-4 - supported
# raspberry-pi-5 - supported
# arduino-nano-ble - beta
# esp32 - experimental`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Step 3: Verify</h2>
          <p>
            Run the verification pipeline to ensure your model meets hardware constraints:
          </p>
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-950 my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
              <span className="text-xs text-gray-400 font-mono">python</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
              <code className="text-gray-300 font-mono whitespace-pre">{`results = model.verify(target="jetson-nano")

print(results.summary())
# ✓ Accuracy: 97.8% (tolerance: 2%)
# ✓ Latency: 18ms (target: <50ms)
# ✓ Memory: 312MB (limit: 512MB)
# ✓ Stability: 10000/10000 runs passed`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Step 4: Deploy</h2>
          <p>
            Once verification passes, deploy to your target device:
          </p>
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-950 my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
              <span className="text-xs text-gray-400 font-mono">python</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
              <code className="text-gray-300 font-mono whitespace-pre">{`deployment = model.deploy(
    target="jetson-nano",
    name="image-classifier-v1",
    device_ip="192.168.1.100"
)

print(f"Status: {deployment.status}")
print(f"Endpoint: {deployment.url}")
# Status: running
# Endpoint: http://192.168.1.100:8080/predict`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Next steps</h2>
          <div className="space-y-3">
            {[
              { title: "Set up monitoring", description: "Configure real-time monitoring and drift detection for your deployment." },
              { title: "Optimize for performance", description: "Use quantization and pruning to reduce model size and improve latency." },
              { title: "Deploy to multiple devices", description: "Learn about fleet deployment and staged rollouts." },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 items-start group cursor-pointer">
                <ArrowRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0 group-hover:text-gray-900 transition-colors" />
                <div>
                  <span className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">{item.title}</span>
                  <span className="text-gray-600"> — {item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guides;
