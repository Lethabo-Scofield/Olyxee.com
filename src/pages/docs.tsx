import { useState, FC } from "react";
import Overview from "../components/docs/sections/Overview";
import Concepts from "../components/docs/sections/Concepts";
import Guides from "../components/docs/sections/Guides";
import Resources from "../components/docs/sections/Resources";
import API from "../components/docs/sections/API";
import DocsLayout from "../layouts/DocsLayout";
import Header from '../components/header';

interface Section {
  id: string;
  title: string;
  component: FC;
  family: string;
}

const sections: Section[] = [
  { id: "overview", title: "Overview", component: Overview, family: "Getting Started" },
  { id: "quickstart", title: "Quickstart", component: Quickstart, family: "Getting Started" },
  { id: "concepts", title: "Key Concepts", component: Concepts, family: "Core Concepts" },
  { id: "wave", title: "WAVE Architecture", component: WaveArchitecture, family: "Core Concepts" },
  { id: "verification", title: "Verification", component: Verification, family: "Core Concepts" },
  { id: "guides", title: "Deployment Guide", component: Guides, family: "Guides" },
  { id: "edge-deployment", title: "Edge Deployment", component: EdgeDeployment, family: "Guides" },
  { id: "optimization", title: "Optimization", component: Optimization, family: "Guides" },
  { id: "api-reference", title: "API Reference", component: API, family: "API" },
  { id: "sdk", title: "Python SDK", component: PythonSDK, family: "API" },
  { id: "cli", title: "CLI Reference", component: CLIReference, family: "API" },
  { id: "resources", title: "Resources", component: Resources, family: "Resources" },
];

const Docs: FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const ActiveComponent = sections.find(sec => sec.id === activeSection)?.component;

  const families = Array.from(
    sections.reduce((map, sec) => {
      if (!map.has(sec.family)) map.set(sec.family, []);
      map.get(sec.family)!.push({ id: sec.id, title: sec.title });
      return map;
    }, new Map<string, { id: string; title: string }[]>())
  ).map(([family, items]) => ({ family, items, defaultOpen: true }));

  const renderContent = () => {
    if (activeSection === "overview") {
      return <Overview onNavigate={setActiveSection} />;
    }
    if (ActiveComponent) {
      return <ActiveComponent />;
    }
    return null;
  };

  return (
    <div>
      <Header />
      <DocsLayout families={families} active={activeSection} onSelect={setActiveSection}>
        {renderContent()}
      </DocsLayout>
    </div>
  );
};

export default Docs;

function Quickstart() {
  return (
    <DocPage
      title="Quickstart"
      subtitle="Get up and running with Olyxee in under 5 minutes."
    >
      <DocSection title="Install the SDK">
        <p>Install the Olyxee Python SDK using pip:</p>
        <CodeBlock language="bash" code="pip install olyxee" />
      </DocSection>

      <DocSection title="Initialize a project">
        <p>Create a new Olyxee project in your working directory:</p>
        <CodeBlock language="bash" code={`olyxee init my-project\ncd my-project`} />
      </DocSection>

      <DocSection title="Import your model">
        <p>Load a trained model from any supported framework:</p>
        <CodeBlock language="python" code={`import olyxee\n\n# Load a PyTorch model\nmodel = olyxee.load("model.pt")\n\n# Or load from ONNX\nmodel = olyxee.load("model.onnx")`} />
      </DocSection>

      <DocSection title="Run verification">
        <p>Verify your model against target hardware profiles before deploying:</p>
        <CodeBlock language="python" code={`# Run verification against Jetson Nano profile\nresults = model.verify(target="jetson-nano")\n\nprint(results.summary())\n# ✓ Accuracy: 98.2% (within tolerance)\n# ✓ Latency: 12ms (target: <50ms)\n# ✓ Memory: 245MB (target: <512MB)`} />
      </DocSection>

      <DocSection title="Deploy">
        <p>Deploy your verified model to the target device:</p>
        <CodeBlock language="python" code={`# Deploy to connected device\ndeployment = model.deploy(\n    target="jetson-nano",\n    name="my-first-model"\n)\n\nprint(f"Deployed: {deployment.url}")`} />
      </DocSection>

      <DocCallout type="info">
        For a more detailed walkthrough, navigate to the Deployment Guide in the sidebar.
      </DocCallout>
    </DocPage>
  );
}

function WaveArchitecture() {
  return (
    <DocPage
      title="WAVE Architecture"
      subtitle="Understanding the Workload Adaptive Verification Engine that powers all Olyxee products."
    >
      <DocSection title="Overview">
        <p>WAVE (Workload Adaptive Verification Engine) is the core infrastructure layer that handles model verification, optimization, and deployment across heterogeneous hardware targets.</p>
        <p className="mt-3">It provides three primary capabilities:</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Verification Pipeline</strong> — Automated testing that validates model correctness across target hardware configurations</li>
          <li><strong>Hardware Abstraction</strong> — A unified deployment interface that works across all supported devices</li>
          <li><strong>Runtime Monitoring</strong> — Continuous observability for deployed models</li>
        </ul>
      </DocSection>

      <DocSection title="Architecture layers">
        <p>WAVE operates in three distinct layers:</p>
        <div className="mt-4 space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-1">Application Layer</h4>
            <p className="text-sm text-gray-600">SDKs, CLI tools, and APIs that developers interact with directly. Handles model ingestion, configuration, and deployment commands.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-1">Orchestration Layer</h4>
            <p className="text-sm text-gray-600">Manages the verification pipeline, optimization passes, and deployment scheduling. Routes workloads to appropriate hardware targets.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-1">Runtime Layer</h4>
            <p className="text-sm text-gray-600">Executes on target devices. Handles model loading, inference, monitoring, and automated rollback when issues are detected.</p>
          </div>
        </div>
      </DocSection>

      <DocSection title="Hardware targets">
        <p>WAVE currently supports the following hardware families:</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">Device</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["NVIDIA Jetson (Nano, Xavier, Orin)", "Supported", "Full GPU acceleration"],
                ["Raspberry Pi (3B+, 4, 5)", "Supported", "CPU inference"],
                ["Arduino (Nano 33 BLE)", "Beta", "TinyML models only"],
                ["Intel NCS2", "Supported", "OpenVINO backend"],
                ["ESP32", "Experimental", "Microcontroller models"],
              ].map(([device, status, notes], i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 text-gray-900">{device}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status === 'Supported' ? 'bg-green-50 text-green-700' : status === 'Beta' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{status}</span></td>
                  <td className="px-4 py-3 text-gray-600">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>
    </DocPage>
  );
}

function Verification() {
  return (
    <DocPage
      title="Verification"
      subtitle="How Olyxee ensures your AI models work correctly before and after deployment."
    >
      <DocSection title="Pre-deployment verification">
        <p>Every model goes through automated verification before it reaches a target device. The verification pipeline tests for:</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Accuracy</strong> — Model outputs match expected results within configurable tolerance</li>
          <li><strong>Latency</strong> — Inference time meets target hardware constraints</li>
          <li><strong>Memory</strong> — Peak memory usage stays within device limits</li>
          <li><strong>Stability</strong> — No crashes or numerical issues over extended runs</li>
        </ul>
      </DocSection>

      <DocSection title="Running verification">
        <CodeBlock language="python" code={`results = model.verify(\n    target="jetson-nano",\n    test_data="./test_set.csv",\n    tolerance=0.02,       # 2% accuracy tolerance\n    latency_target=50,    # milliseconds\n    memory_limit=512      # MB\n)\n\nif results.passed:\n    print("All checks passed")\n    model.deploy(target="jetson-nano")\nelse:\n    print(results.failures)`} />
      </DocSection>

      <DocSection title="Post-deployment monitoring">
        <p>After deployment, WAVE continuously monitors model performance and can automatically roll back to a known-good state if issues are detected.</p>
        <CodeBlock language="python" code={`# Enable monitoring on a deployed model\ndeployment.monitor(\n    check_interval=60,      # seconds\n    drift_threshold=0.05,   # 5% accuracy drift\n    auto_rollback=True\n)`} />
      </DocSection>

      <DocCallout type="warning">
        Verification results are hardware-specific. A model that passes verification for Jetson Nano may not pass for Raspberry Pi due to different resource constraints.
      </DocCallout>
    </DocPage>
  );
}

function EdgeDeployment() {
  return (
    <DocPage
      title="Edge Deployment"
      subtitle="Deploy AI models to edge devices with hardware-aware optimization."
    >
      <DocSection title="Supported deployment modes">
        <p>Olyxee supports multiple deployment strategies depending on your use case:</p>
        <div className="mt-4 space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-1">Direct Deploy</h4>
            <p className="text-sm text-gray-600">Push a model directly to a connected device over USB, SSH, or local network. Best for development and testing.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-1">Fleet Deploy</h4>
            <p className="text-sm text-gray-600">Deploy to multiple devices simultaneously using device groups. Includes staged rollout and automatic rollback.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-1">Container Deploy</h4>
            <p className="text-sm text-gray-600">Package your model into an OCI-compatible container with all dependencies. Deploy to any container runtime.</p>
          </div>
        </div>
      </DocSection>

      <DocSection title="Example: Deploy to Jetson">
        <CodeBlock language="python" code={`import olyxee\n\nmodel = olyxee.load("model.onnx")\n\n# Optimize for target hardware\noptimized = model.optimize(\n    target="jetson-nano",\n    quantization="int8",\n    batch_size=1\n)\n\n# Verify before deploying\nresults = optimized.verify(target="jetson-nano")\nassert results.passed\n\n# Deploy\ndeployment = optimized.deploy(\n    target="jetson-nano",\n    name="perception-model-v2",\n    device_ip="192.168.1.100"\n)\n\nprint(f"Status: {deployment.status}")\nprint(f"Endpoint: {deployment.url}")`} />
      </DocSection>

      <DocSection title="Configuration">
        <p>Deployment behavior can be customized via <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">olyxee.yaml</code>:</p>
        <CodeBlock language="yaml" code={`target:\n  device: jetson-nano\n  connection: ssh\n  host: 192.168.1.100\n\noptimization:\n  quantization: int8\n  pruning: false\n  batch_size: 1\n\nverification:\n  tolerance: 0.02\n  latency_target: 50\n  memory_limit: 512\n\nmonitoring:\n  enabled: true\n  interval: 60\n  auto_rollback: true`} />
      </DocSection>
    </DocPage>
  );
}

function Optimization() {
  return (
    <DocPage
      title="Optimization"
      subtitle="Automatic model optimization for resource-constrained hardware."
    >
      <DocSection title="Quantization">
        <p>Olyxee supports multiple quantization strategies to reduce model size and improve inference speed:</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">Strategy</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">Size Reduction</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">Accuracy Impact</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["FP16 (Half Precision)", "~50%", "Minimal (<0.1%)"],
                ["INT8 (Dynamic)", "~75%", "Low (<1%)"],
                ["INT8 (Static)", "~75%", "Very Low (<0.5%)"],
                ["INT4", "~87%", "Moderate (1-3%)"],
              ].map(([strategy, size, accuracy], i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 text-gray-900 font-medium">{strategy}</td>
                  <td className="px-4 py-3 text-gray-600">{size}</td>
                  <td className="px-4 py-3 text-gray-600">{accuracy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock language="python" code={`# Automatic optimization\noptimized = model.optimize(\n    target="raspberry-pi-4",\n    quantization="int8",\n    calibration_data="./calibration_set.csv"\n)\n\n# Compare before and after\nprint(f"Original size: {model.size_mb}MB")\nprint(f"Optimized size: {optimized.size_mb}MB")\nprint(f"Speedup: {optimized.speedup}x")`} />
      </DocSection>
    </DocPage>
  );
}

function PythonSDK() {
  return (
    <DocPage
      title="Python SDK"
      subtitle="Complete reference for the olyxee Python package."
    >
      <DocSection title="Installation">
        <CodeBlock language="bash" code="pip install olyxee" />
      </DocSection>

      <DocSection title="olyxee.load()">
        <p>Load a model from a file path. Supports PyTorch (.pt, .pth), TensorFlow (.h5, .pb), ONNX (.onnx), and TFLite (.tflite).</p>
        <CodeBlock language="python" code={`model = olyxee.load(\n    path: str,\n    framework: str = "auto",  # auto-detect framework\n    device: str = "cpu"\n) -> OlyxeeModel`} />
        <h4 className="font-semibold text-gray-900 mt-4 mb-2">Parameters</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-gray-900 border-b border-gray-200">Parameter</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-900 border-b border-gray-200">Type</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-900 border-b border-gray-200">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100"><td className="px-4 py-2 font-mono text-sm">path</td><td className="px-4 py-2 text-gray-600">str</td><td className="px-4 py-2 text-gray-600">Path to the model file</td></tr>
              <tr className="border-b border-gray-100"><td className="px-4 py-2 font-mono text-sm">framework</td><td className="px-4 py-2 text-gray-600">str</td><td className="px-4 py-2 text-gray-600">Framework override (pytorch, tensorflow, onnx)</td></tr>
              <tr><td className="px-4 py-2 font-mono text-sm">device</td><td className="px-4 py-2 text-gray-600">str</td><td className="px-4 py-2 text-gray-600">Device for local operations (cpu, cuda)</td></tr>
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="model.verify()">
        <p>Run verification against a target hardware profile.</p>
        <CodeBlock language="python" code={`results = model.verify(\n    target: str,\n    test_data: str = None,\n    tolerance: float = 0.02,\n    latency_target: int = None,  # ms\n    memory_limit: int = None     # MB\n) -> VerificationResults`} />
      </DocSection>

      <DocSection title="model.optimize()">
        <p>Optimize the model for a target hardware platform.</p>
        <CodeBlock language="python" code={`optimized = model.optimize(\n    target: str,\n    quantization: str = "int8",\n    calibration_data: str = None,\n    batch_size: int = 1\n) -> OlyxeeModel`} />
      </DocSection>

      <DocSection title="model.deploy()">
        <p>Deploy the model to a target device.</p>
        <CodeBlock language="python" code={`deployment = model.deploy(\n    target: str,\n    name: str,\n    device_ip: str = None,\n    replicas: int = 1\n) -> Deployment`} />
      </DocSection>
    </DocPage>
  );
}

function CLIReference() {
  return (
    <DocPage
      title="CLI Reference"
      subtitle="Command-line tools for managing Olyxee deployments."
    >
      <DocSection title="Installation">
        <p>The CLI is included with the Python SDK:</p>
        <CodeBlock language="bash" code="pip install olyxee" />
      </DocSection>

      <DocSection title="Commands">
        <CodeBlock language="bash" code={`# Initialize a new project\nolyxee init <project-name>\n\n# Load and verify a model\nolyxee verify model.onnx --target jetson-nano\n\n# Optimize a model\nolyxee optimize model.onnx --target raspberry-pi-4 --quantization int8\n\n# Deploy a model\nolyxee deploy model.onnx --target jetson-nano --name my-model\n\n# List deployments\nolyxee deployments list\n\n# Check deployment status\nolyxee deployments status my-model\n\n# Monitor a deployment\nolyxee monitor my-model --interval 60\n\n# Rollback a deployment\nolyxee rollback my-model --version 2`} />
      </DocSection>

      <DocSection title="Configuration file">
        <p>The CLI reads configuration from <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">olyxee.yaml</code> in the project root. Command-line flags override file settings.</p>
      </DocSection>
    </DocPage>
  );
}

function DocPage({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">{title}</h1>
        <p className="text-gray-500 text-lg leading-relaxed">{subtitle}</p>
      </div>
      <div className="space-y-10 text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-950 my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <span className="text-xs text-gray-400 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-gray-300 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

function DocCallout({ type, children }: { type: "info" | "warning" | "tip"; children: React.ReactNode }) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    tip: "bg-green-50 border-green-200 text-green-800",
  };
  const labels = { info: "Note", warning: "Warning", tip: "Tip" };

  return (
    <div className={`rounded-xl border p-4 text-sm ${styles[type]}`}>
      <span className="font-semibold">{labels[type]}:</span>{" "}
      {children}
    </div>
  );
}
