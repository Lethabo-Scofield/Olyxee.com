import { useState, FC } from "react";
import SEO from "../components/SEO";
import DocsLayout from "../layouts/DocsLayout";
import Header from '../components/header';
import { ArrowRight, BookOpen, Code2, Cpu, Rocket, Shield, Terminal, Zap, Layers, GitBranch, Box, BarChart3, Settings, FileCode, Wrench, ChevronRight, Sparkles } from "lucide-react";

interface Section {
  id: string;
  title: string;
  component: FC<any>;
  family: string;
  badge?: string;
}

const sections: Section[] = [
  { id: "overview", title: "Overview", component: Overview, family: "Get started" },
  { id: "quickstart", title: "Quickstart", component: Quickstart, family: "Get started" },
  { id: "models", title: "Supported Models", component: SupportedModels, family: "Get started" },
  { id: "grysics-overview", title: "What is Grysics", component: GrysicsOverview, family: "Grysics" },
  { id: "verification", title: "Verification Engine", component: Verification, family: "Grysics" },
  { id: "deployment", title: "Deployment", component: Deployment, family: "Grysics" },
  { id: "monitoring", title: "Monitoring", component: Monitoring, family: "Grysics", badge: "new" },
  { id: "api-reference", title: "API Reference", component: APIReference, family: "API" },
  { id: "python-sdk", title: "Python SDK", component: PythonSDK, family: "API" },
  { id: "cli", title: "CLI Reference", component: CLIReference, family: "API" },
  { id: "errors", title: "Error Handling", component: ErrorHandling, family: "API" },
  { id: "edge-devices", title: "Edge Devices", component: EdgeDevices, family: "Guides" },
  { id: "optimization", title: "Optimization", component: Optimization, family: "Guides" },
  { id: "configuration", title: "Configuration", component: Configuration, family: "Guides" },
  { id: "changelog", title: "Changelog", component: Changelog, family: "Resources" },
  { id: "limits", title: "Rate Limits", component: RateLimits, family: "Resources" },
];

const Docs: FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const ActiveComponent = sections.find(sec => sec.id === activeSection)?.component;

  const families = Array.from(
    sections.reduce((map, sec) => {
      if (!map.has(sec.family)) map.set(sec.family, []);
      map.get(sec.family)!.push({ id: sec.id, title: sec.title, badge: sec.badge });
      return map;
    }, new Map<string, { id: string; title: string; badge?: string }[]>())
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
      <SEO title="Documentation" description="Complete documentation for the Olyxee platform. Learn about Grysics verification, the Python SDK, CLI tools, and API reference." path="/docs" />
      <Header />
      <DocsLayout families={families} active={activeSection} onSelect={setActiveSection}>
        {renderContent()}
      </DocsLayout>
    </div>
  );
};

export default Docs;


function Overview({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const cards = [
    {
      icon: Rocket,
      title: "Quickstart",
      desc: "Verify your first model in under five minutes with the Olyxee SDK.",
      id: "quickstart",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: Shield,
      title: "Grysics Engine",
      desc: "Learn how the verification engine ensures AI reliability.",
      id: "grysics-overview",
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      icon: Code2,
      title: "API Reference",
      desc: "Integrate Olyxee into your ML pipeline with the REST API.",
      id: "api-reference",
      gradient: "from-violet-400 to-purple-500",
    },
    {
      icon: Cpu,
      title: "Edge Devices",
      desc: "Deploy to Jetson, Raspberry Pi, and more hardware targets.",
      id: "edge-devices",
      gradient: "from-orange-400 to-red-500",
    },
  ];

  return (
    <DocPage title="Documentation" subtitle="Explore the Olyxee platform, Grysics verification engine, and deployment tools.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => onNavigate?.(card.id)}
              className="group text-left rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all"
            >
              <div className={`h-24 bg-gradient-to-br ${card.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/5" />
                <Icon className="absolute bottom-3 right-4 w-10 h-10 text-white/30" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-[15px] font-semibold text-gray-900">{card.title}</h3>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <DocSection title="What is Olyxee?">
        <p>Olyxee is an AI infrastructure company building tools for reliable AI deployment. Our flagship product, <strong>Grysics</strong>, is a verification engine that ensures AI models work correctly before and after they reach production hardware.</p>
        <p>The platform handles model ingestion, automated verification against target hardware profiles, optimization, deployment, and continuous monitoring — giving teams confidence that their models will behave as expected in the real world.</p>
      </DocSection>

      <DocSection title="Grysics">
        <p><strong>Grysics</strong> is Olyxee's verification engine. It tests model accuracy, latency, and memory against target hardware before deployment — catching failures before they reach production. The Python SDK and CLI tools let you integrate verification into your existing ML pipeline.</p>
      </DocSection>

      <DocSection title="Supported frameworks">
        <p>Olyxee works with models from all major ML frameworks:</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {["PyTorch", "TensorFlow", "ONNX", "TFLite"].map(fw => (
            <span key={fw} className="text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">{fw}</span>
          ))}
        </div>
      </DocSection>
    </DocPage>
  );
}


function Quickstart() {
  return (
    <DocPage title="Quickstart" subtitle="Get up and running with Olyxee in under five minutes.">
      <DocSection title="1. Install the SDK">
        <p>Install the Olyxee Python SDK:</p>
        <CodeBlock language="bash" code="pip install olyxee" />
      </DocSection>

      <DocSection title="2. Initialize a project">
        <CodeBlock language="bash" code={`olyxee init my-project\ncd my-project`} />
      </DocSection>

      <DocSection title="3. Import your model">
        <p>Load a trained model from any supported framework:</p>
        <CodeBlock language="python" code={`import olyxee\n\nmodel = olyxee.load("model.pt")\n\n# Or from ONNX\nmodel = olyxee.load("model.onnx")`} />
      </DocSection>

      <DocSection title="4. Run verification with Grysics">
        <p>Verify your model against a target hardware profile:</p>
        <CodeBlock language="python" code={`results = model.verify(target="jetson-nano")\n\nprint(results.summary())\n# ✓ Accuracy: 98.2% (within tolerance)\n# ✓ Latency: 12ms (target: <50ms)\n# ✓ Memory: 245MB (target: <512MB)`} />
      </DocSection>

      <DocSection title="5. Deploy">
        <p>Deploy your verified model:</p>
        <CodeBlock language="python" code={`deployment = model.deploy(\n    target="jetson-nano",\n    name="my-first-model"\n)\n\nprint(f"Deployed: {deployment.url}")`} />
      </DocSection>

      <DocCallout type="info">
        For detailed deployment options, see the <strong>Deployment</strong> section under Grysics.
      </DocCallout>
    </DocPage>
  );
}


function SupportedModels() {
  return (
    <DocPage title="Supported Models" subtitle="Model formats and frameworks compatible with the Olyxee platform.">
      <DocSection title="Frameworks">
        <DocTable
          headers={["Framework", "File formats", "Status"]}
          rows={[
            ["PyTorch", ".pt, .pth", "Supported"],
            ["TensorFlow", ".h5, .pb, SavedModel", "Supported"],
            ["ONNX", ".onnx", "Supported"],
            ["TFLite", ".tflite", "Supported"],
            ["JAX", "Exported via ONNX", "Beta"],
          ]}
        />
      </DocSection>

      <DocSection title="Model types">
        <p>Grysics verification works with classification, detection, segmentation, and generative models. Custom architectures are supported as long as they export to a compatible format.</p>
        <DocCallout type="tip">
          For best results, export your model to ONNX. It provides the widest hardware compatibility and most reliable verification results.
        </DocCallout>
      </DocSection>

      <DocSection title="Size limits">
        <DocTable
          headers={["Plan", "Max model size", "Max verification time"]}
          rows={[
            ["Free", "500 MB", "10 minutes"],
            ["Pro", "5 GB", "60 minutes"],
            ["Enterprise", "Unlimited", "Custom"],
          ]}
        />
      </DocSection>
    </DocPage>
  );
}


function GrysicsOverview() {
  return (
    <DocPage title="What is Grysics" subtitle="The verification engine at the core of the Olyxee platform.">
      <DocSection title="Overview">
        <p><strong>Grysics</strong> is Olyxee's verification engine for AI systems. It automatically tests whether a trained model will work correctly on target hardware — before you deploy it.</p>
        <p>Instead of discovering failures in production, Grysics catches accuracy degradation, latency violations, memory overflows, and numerical instability during a pre-deployment verification pass.</p>
      </DocSection>

      <DocSection title="How it works">
        <div className="space-y-3 mt-2">
          {[
            { step: "01", title: "Ingest", desc: "Load your trained model from any supported framework. Grysics analyzes the architecture, parameter count, and computational graph." },
            { step: "02", title: "Profile", desc: "Grysics creates a hardware-specific execution profile for your target device, mapping operations to available compute resources." },
            { step: "03", title: "Verify", desc: "Run automated tests that validate accuracy, latency, memory usage, and stability against configurable thresholds." },
            { step: "04", title: "Report", desc: "Receive a detailed verification report with pass/fail status, performance metrics, and optimization recommendations." },
          ].map(item => (
            <div key={item.step} className="flex gap-4 items-start p-4 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-xs font-mono font-bold text-green-600 bg-green-50 border border-green-200 rounded px-2 py-1 flex-shrink-0">{item.step}</span>
              <div>
                <span className="font-semibold text-gray-900">{item.title}</span>
                <p className="text-gray-500 mt-0.5 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Verification checks">
        <DocTable
          headers={["Check", "What it tests", "Default threshold"]}
          rows={[
            ["Accuracy", "Output correctness vs reference data", "±2% tolerance"],
            ["Latency", "Inference time per sample", "<50ms (configurable)"],
            ["Memory", "Peak memory during inference", "Device limit"],
            ["Stability", "Numerical consistency over 1000 runs", "0 NaN/Inf values"],
            ["Throughput", "Samples processed per second", "Informational"],
          ]}
        />
      </DocSection>

      <DocCallout type="info">
        Verification results are hardware-specific. A model that passes for Jetson Nano may not pass for Raspberry Pi due to different resource constraints.
      </DocCallout>
    </DocPage>
  );
}


function Verification() {
  return (
    <DocPage title="Verification Engine" subtitle="Deep dive into the Grysics verification pipeline.">
      <DocSection title="Pre-deployment verification">
        <p>Every model goes through automated verification before it reaches a target device:</p>
        <ul className="list-none pl-0 mt-3 space-y-2 text-gray-600">
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">Accuracy</strong> — outputs match expected results within configurable tolerance</span></li>
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">Latency</strong> — inference time meets target hardware constraints</span></li>
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">Memory</strong> — peak memory usage stays within device limits</span></li>
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">Stability</strong> — no crashes or numerical issues over extended runs</span></li>
        </ul>
      </DocSection>

      <DocSection title="Running verification">
        <CodeBlock language="python" code={`results = model.verify(\n    target="jetson-nano",\n    test_data="./test_set.csv",\n    tolerance=0.02,\n    latency_target=50,\n    memory_limit=512\n)\n\nif results.passed:\n    print("All checks passed")\n    model.deploy(target="jetson-nano")\nelse:\n    print(results.failures)`} />
      </DocSection>

      <DocSection title="Verification report">
        <p>After verification completes, you receive a structured report:</p>
        <CodeBlock language="json" code={`{\n  "status": "passed",\n  "target": "jetson-nano",\n  "checks": {\n    "accuracy": { "passed": true, "value": 0.982, "threshold": 0.96 },\n    "latency_ms": { "passed": true, "value": 12, "threshold": 50 },\n    "memory_mb": { "passed": true, "value": 245, "threshold": 512 },\n    "stability": { "passed": true, "nan_count": 0, "inf_count": 0 }\n  },\n  "recommendations": [\n    "Consider INT8 quantization for 3x latency improvement"\n  ]\n}`} />
      </DocSection>

      <DocSection title="Post-deployment monitoring">
        <p>After deployment, Grysics continuously monitors model performance and can automatically roll back if issues are detected:</p>
        <CodeBlock language="python" code={`deployment.monitor(\n    check_interval=60,\n    drift_threshold=0.05,\n    auto_rollback=True\n)`} />
      </DocSection>

      <DocCallout type="warning">
        Always run verification against the exact hardware profile you plan to deploy to. Emulated profiles may not catch device-specific issues.
      </DocCallout>
    </DocPage>
  );
}


function Deployment() {
  return (
    <DocPage title="Deployment" subtitle="Deploy verified models to edge devices and cloud endpoints.">
      <DocSection title="Deployment modes">
        <div className="space-y-3 mt-2">
          {[
            { title: "Direct Deploy", desc: "Push to a connected device over USB, SSH, or local network. Best for development and testing." },
            { title: "Fleet Deploy", desc: "Deploy to multiple devices simultaneously using device groups. Includes staged rollout and automatic rollback." },
            { title: "Container Deploy", desc: "Package into an OCI-compatible container with all dependencies. Deploy to any container runtime." },
          ].map(item => (
            <div key={item.title} className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-1.5 text-[15px]">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Deploy to Jetson">
        <CodeBlock language="python" code={`import olyxee\n\nmodel = olyxee.load("model.onnx")\n\noptimized = model.optimize(\n    target="jetson-nano",\n    quantization="int8",\n    batch_size=1\n)\n\nresults = optimized.verify(target="jetson-nano")\nassert results.passed\n\ndeployment = optimized.deploy(\n    target="jetson-nano",\n    name="perception-model-v2",\n    device_ip="192.168.1.100"\n)\n\nprint(f"Status: {deployment.status}")\nprint(f"Endpoint: {deployment.url}")`} />
      </DocSection>

      <DocSection title="Configuration file">
        <p>Deployment behavior can be customized via <InlineCode>olyxee.yaml</InlineCode>:</p>
        <CodeBlock language="yaml" code={`target:\n  device: jetson-nano\n  connection: ssh\n  host: 192.168.1.100\n\noptimization:\n  quantization: int8\n  pruning: false\n  batch_size: 1\n\nverification:\n  tolerance: 0.02\n  latency_target: 50\n  memory_limit: 512\n\nmonitoring:\n  enabled: true\n  interval: 60\n  auto_rollback: true`} />
      </DocSection>
    </DocPage>
  );
}


function Monitoring() {
  return (
    <DocPage title="Monitoring" subtitle="Real-time observability for deployed AI models.">
      <DocSection title="Overview">
        <p>Once a model is deployed, Grysics provides continuous monitoring that tracks inference quality, resource usage, and model drift. When anomalies are detected, the system can automatically roll back to a known-good state.</p>
      </DocSection>

      <DocSection title="Metrics tracked">
        <DocTable
          headers={["Metric", "Description", "Alert threshold"]}
          rows={[
            ["Accuracy drift", "Change in output quality over time", "Configurable (default 5%)"],
            ["Latency p99", "99th percentile inference time", "2x baseline"],
            ["Memory usage", "Runtime memory consumption", "90% device limit"],
            ["Error rate", "Failed inference requests", ">1% of requests"],
            ["Throughput", "Requests processed per second", "50% below baseline"],
          ]}
        />
      </DocSection>

      <DocSection title="Enable monitoring">
        <CodeBlock language="python" code={`deployment.monitor(\n    check_interval=60,\n    drift_threshold=0.05,\n    latency_alert=100,\n    auto_rollback=True,\n    webhook="https://your-api.com/alerts"\n)`} />
      </DocSection>

      <DocSection title="Dashboard">
        <p>View real-time metrics through the Olyxee dashboard or query them programmatically:</p>
        <CodeBlock language="python" code={`metrics = deployment.metrics(\n    period="24h",\n    resolution="5m"\n)\n\nprint(f"Avg latency: {metrics.latency_avg}ms")\nprint(f"Accuracy: {metrics.accuracy}")\nprint(f"Total requests: {metrics.request_count}")`} />
      </DocSection>
    </DocPage>
  );
}


function APIReference() {
  return (
    <DocPage title="API Reference" subtitle="Integrate Olyxee into your pipeline with the REST API.">
      <DocSection title="Base URL">
        <CodeBlock language="bash" code="https://api.olyxee.com/v1" />
      </DocSection>

      <DocSection title="Authentication">
        <p>All API requests require an API key passed in the <InlineCode>Authorization</InlineCode> header:</p>
        <CodeBlock language="bash" code={`curl https://api.olyxee.com/v1/models \\\n  -H "Authorization: Bearer oly_sk_..."`} />
        <DocCallout type="warning">
          Never expose your API key in client-side code. Use environment variables or a secrets manager.
        </DocCallout>
      </DocSection>

      <DocSection title="Endpoints">
        <DocTable
          headers={["Method", "Endpoint", "Description"]}
          rows={[
            ["POST", "/models", "Upload a model for verification"],
            ["GET", "/models/:id", "Get model details and status"],
            ["POST", "/models/:id/verify", "Start a verification run"],
            ["GET", "/models/:id/verify/:run_id", "Get verification results"],
            ["POST", "/models/:id/deploy", "Deploy a verified model"],
            ["GET", "/deployments", "List all deployments"],
            ["GET", "/deployments/:id/metrics", "Get deployment metrics"],
            ["POST", "/deployments/:id/rollback", "Rollback a deployment"],
          ]}
        />
      </DocSection>

      <DocSection title="Upload a model">
        <CodeBlock language="bash" code={`curl -X POST https://api.olyxee.com/v1/models \\\n  -H "Authorization: Bearer oly_sk_..." \\\n  -H "Content-Type: multipart/form-data" \\\n  -F "file=@model.onnx" \\\n  -F "name=my-model" \\\n  -F "framework=onnx"`} />
      </DocSection>

      <DocSection title="Start verification">
        <CodeBlock language="bash" code={`curl -X POST https://api.olyxee.com/v1/models/mdl_abc123/verify \\\n  -H "Authorization: Bearer oly_sk_..." \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "target": "jetson-nano",\n    "tolerance": 0.02,\n    "latency_target": 50\n  }'`} />
      </DocSection>

      <DocSection title="Response format">
        <p>All responses follow a consistent envelope:</p>
        <CodeBlock language="json" code={`{\n  "object": "model",\n  "id": "mdl_abc123",\n  "name": "my-model",\n  "framework": "onnx",\n  "size_bytes": 52428800,\n  "status": "verified",\n  "created_at": "2025-01-15T10:30:00Z"\n}`} />
      </DocSection>
    </DocPage>
  );
}


function PythonSDK() {
  return (
    <DocPage title="Python SDK" subtitle="Complete reference for the olyxee Python package.">
      <DocSection title="Installation">
        <CodeBlock language="bash" code="pip install olyxee" />
        <p>Requires Python 3.9+.</p>
      </DocSection>

      <DocSection title="olyxee.load()">
        <p>Load a model from a file path or URL.</p>
        <CodeBlock language="python" code={`model = olyxee.load(\n    path="model.onnx",\n    framework="auto",\n    device="cpu"\n)`} />
        <DocTable
          headers={["Parameter", "Type", "Description"]}
          rows={[
            ["path", "str", "Path to model file or URL"],
            ["framework", "str", "Framework override (auto, pytorch, tensorflow, onnx)"],
            ["device", "str", "Device for local operations (cpu, cuda)"],
          ]}
        />
      </DocSection>

      <DocSection title="model.verify()">
        <p>Run Grysics verification against a target hardware profile.</p>
        <CodeBlock language="python" code={`results = model.verify(\n    target="jetson-nano",\n    test_data="./test_set.csv",\n    tolerance=0.02,\n    latency_target=50,\n    memory_limit=512\n)`} />
      </DocSection>

      <DocSection title="model.optimize()">
        <p>Optimize the model for target hardware.</p>
        <CodeBlock language="python" code={`optimized = model.optimize(\n    target="raspberry-pi-4",\n    quantization="int8",\n    calibration_data="./calibration.csv"\n)`} />
      </DocSection>

      <DocSection title="model.deploy()">
        <p>Deploy the model to a target device.</p>
        <CodeBlock language="python" code={`deployment = model.deploy(\n    target="jetson-nano",\n    name="my-model",\n    device_ip="192.168.1.100",\n    replicas=1\n)`} />
      </DocSection>
    </DocPage>
  );
}


function CLIReference() {
  return (
    <DocPage title="CLI Reference" subtitle="Command-line tools for managing Olyxee projects.">
      <DocSection title="Installation">
        <p>The CLI is included with the Python SDK:</p>
        <CodeBlock language="bash" code="pip install olyxee" />
      </DocSection>

      <DocSection title="Commands">
        <CodeBlock language="bash" code={`olyxee init <project>       # Initialize a new project\nolyxee verify <model>       # Run Grysics verification\nolyxee optimize <model>     # Optimize for target hardware\nolyxee deploy <model>       # Deploy to a device\nolyxee deployments list     # List active deployments\nolyxee deployments status   # Check deployment health\nolyxee monitor <name>       # Start monitoring\nolyxee rollback <name>      # Rollback deployment`} />
      </DocSection>

      <DocSection title="Examples">
        <CodeBlock language="bash" code={`# Verify a model for Jetson Nano\nolyxee verify model.onnx --target jetson-nano\n\n# Optimize with INT8 quantization\nolyxee optimize model.onnx --target raspberry-pi-4 --quantization int8\n\n# Deploy with monitoring enabled\nolyxee deploy model.onnx --target jetson-nano --name my-model --monitor`} />
      </DocSection>

      <DocSection title="Configuration">
        <p>The CLI reads from <InlineCode>olyxee.yaml</InlineCode> in the project root. Command-line flags override file settings.</p>
      </DocSection>
    </DocPage>
  );
}


function ErrorHandling() {
  return (
    <DocPage title="Error Handling" subtitle="Error codes, status codes, and troubleshooting.">
      <DocSection title="HTTP status codes">
        <DocTable
          headers={["Code", "Meaning", "Description"]}
          rows={[
            ["200", "OK", "Request succeeded"],
            ["201", "Created", "Resource created successfully"],
            ["400", "Bad Request", "Invalid parameters or malformed request"],
            ["401", "Unauthorized", "Missing or invalid API key"],
            ["404", "Not Found", "Resource does not exist"],
            ["422", "Unprocessable", "Valid request but cannot be processed"],
            ["429", "Rate Limited", "Too many requests"],
            ["500", "Server Error", "Internal server error"],
          ]}
        />
      </DocSection>

      <DocSection title="Error response format">
        <CodeBlock language="json" code={`{\n  "error": {\n    "type": "invalid_request",\n    "message": "Target 'unknown-device' is not supported",\n    "code": "unsupported_target",\n    "param": "target"\n  }\n}`} />
      </DocSection>

      <DocSection title="Verification errors">
        <DocTable
          headers={["Error", "Cause", "Solution"]}
          rows={[
            ["accuracy_below_threshold", "Model accuracy dropped below tolerance", "Adjust tolerance or retrain model"],
            ["latency_exceeded", "Inference time exceeded target", "Try quantization or a more powerful device"],
            ["memory_overflow", "Model exceeds device memory", "Use a smaller model or optimize with pruning"],
            ["numerical_instability", "NaN or Inf values detected", "Check model for numerical issues"],
          ]}
        />
      </DocSection>
    </DocPage>
  );
}


function EdgeDevices() {
  return (
    <DocPage title="Edge Devices" subtitle="Supported hardware targets and device-specific guidance.">
      <DocSection title="Supported devices">
        <DocTable
          headers={["Device", "Status", "Acceleration", "Notes"]}
          rows={[
            ["NVIDIA Jetson Nano", "Supported", "GPU (CUDA)", "Full TensorRT support"],
            ["NVIDIA Jetson Xavier", "Supported", "GPU (CUDA)", "DLA acceleration available"],
            ["NVIDIA Jetson Orin", "Supported", "GPU (CUDA)", "Highest edge performance"],
            ["Raspberry Pi 4", "Supported", "CPU", "ARM NEON optimizations"],
            ["Raspberry Pi 5", "Supported", "CPU", "Improved throughput"],
            ["Intel NCS2", "Supported", "VPU", "OpenVINO backend"],
            ["Arduino Nano 33 BLE", "Beta", "MCU", "TinyML models only"],
            ["ESP32", "Experimental", "MCU", "Microcontroller models"],
          ]}
        />
      </DocSection>

      <DocSection title="Adding a device">
        <CodeBlock language="python" code={`import olyxee\n\n# Register a new device\nolyxee.devices.register(\n    name="my-jetson",\n    type="jetson-nano",\n    host="192.168.1.100",\n    connection="ssh",\n    credentials="~/.ssh/id_rsa"\n)\n\n# List registered devices\ndevices = olyxee.devices.list()\nfor d in devices:\n    print(f"{d.name}: {d.status}")`} />
      </DocSection>

      <DocSection title="Device profiles">
        <p>Each device has a hardware profile that Grysics uses during verification. Profiles include CPU architecture, available memory, accelerator capabilities, and supported operations.</p>
        <CodeBlock language="python" code={`profile = olyxee.devices.profile("jetson-nano")\n\nprint(f"CPU: {profile.cpu}")\nprint(f"GPU: {profile.gpu}")\nprint(f"Memory: {profile.memory_mb}MB")\nprint(f"Supported ops: {profile.supported_ops}")`} />
      </DocSection>
    </DocPage>
  );
}


function Optimization() {
  return (
    <DocPage title="Optimization" subtitle="Automatic model optimization for resource-constrained hardware.">
      <DocSection title="Quantization strategies">
        <DocTable
          headers={["Strategy", "Size reduction", "Accuracy impact"]}
          rows={[
            ["FP16 (Half Precision)", "~50%", "Minimal (<0.1%)"],
            ["INT8 (Dynamic)", "~75%", "Low (<1%)"],
            ["INT8 (Static)", "~75%", "Very Low (<0.5%)"],
            ["INT4", "~87%", "Moderate (1-3%)"],
          ]}
        />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock language="python" code={`optimized = model.optimize(\n    target="raspberry-pi-4",\n    quantization="int8",\n    calibration_data="./calibration_set.csv"\n)\n\nprint(f"Original: {model.size_mb}MB")\nprint(f"Optimized: {optimized.size_mb}MB")\nprint(f"Speedup: {optimized.speedup}x")`} />
      </DocSection>

      <DocCallout type="tip">
        Always run verification after optimization. Quantization can occasionally affect model accuracy in unexpected ways.
      </DocCallout>
    </DocPage>
  );
}


function Configuration() {
  return (
    <DocPage title="Configuration" subtitle="Project configuration and environment setup.">
      <DocSection title="olyxee.yaml">
        <p>The project configuration file controls default settings for verification, optimization, and deployment:</p>
        <CodeBlock language="yaml" code={`project:\n  name: my-ai-project\n  version: 1.0.0\n\ntarget:\n  device: jetson-nano\n  connection: ssh\n  host: 192.168.1.100\n\nverification:\n  tolerance: 0.02\n  latency_target: 50\n  memory_limit: 512\n  stability_runs: 1000\n\noptimization:\n  quantization: int8\n  pruning: false\n  calibration_data: ./calibration/\n\nmonitoring:\n  enabled: true\n  interval: 60\n  drift_threshold: 0.05\n  auto_rollback: true\n  webhook: https://your-api.com/alerts`} />
      </DocSection>

      <DocSection title="Environment variables">
        <DocTable
          headers={["Variable", "Description", "Required"]}
          rows={[
            ["OLYXEE_API_KEY", "API authentication key", "Yes"],
            ["OLYXEE_ORG_ID", "Organization identifier", "For teams"],
            ["OLYXEE_LOG_LEVEL", "Logging verbosity (debug, info, warn)", "No"],
            ["OLYXEE_CACHE_DIR", "Local cache directory for models", "No"],
          ]}
        />
      </DocSection>
    </DocPage>
  );
}


function Changelog() {
  return (
    <DocPage title="Changelog" subtitle="Recent updates and improvements to the Olyxee platform.">
      {[
        {
          version: "1.0.0",
          date: "January 2025",
          items: [
            "General availability of Grysics verification engine",
            "Python SDK v1.0 with full verification and deployment support",
            "Support for NVIDIA Jetson, Raspberry Pi, and Intel NCS2",
            "REST API v1 with model management endpoints",
            "CLI tools for project initialization, verification, and deployment",
          ],
        },
        {
          version: "0.9.0",
          date: "November 2024",
          items: [
            "Beta release of post-deployment monitoring",
            "Added INT4 quantization support",
            "Fleet deployment with staged rollout",
            "Webhook notifications for monitoring alerts",
          ],
        },
        {
          version: "0.8.0",
          date: "September 2024",
          items: [
            "Arduino Nano 33 BLE support (beta)",
            "Container deployment mode",
            "Improved verification report format",
            "Added calibration data support for static quantization",
          ],
        },
      ].map(release => (
        <DocSection key={release.version} title={`v${release.version} — ${release.date}`}>
          <ul className="list-none pl-0 space-y-2 text-gray-600">
            {release.items.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </DocSection>
      ))}
    </DocPage>
  );
}


function RateLimits() {
  return (
    <DocPage title="Rate Limits" subtitle="API usage limits and quotas.">
      <DocSection title="Default limits">
        <DocTable
          headers={["Endpoint", "Free", "Pro", "Enterprise"]}
          rows={[
            ["Model uploads", "10/day", "100/day", "Unlimited"],
            ["Verification runs", "20/day", "500/day", "Unlimited"],
            ["API requests", "1,000/min", "10,000/min", "Custom"],
            ["Concurrent deployments", "3", "25", "Unlimited"],
          ]}
        />
      </DocSection>

      <DocSection title="Rate limit headers">
        <p>Every API response includes rate limit information:</p>
        <CodeBlock language="http" code={`X-RateLimit-Limit: 1000\nX-RateLimit-Remaining: 947\nX-RateLimit-Reset: 1705312800`} />
      </DocSection>

      <DocSection title="Handling rate limits">
        <p>When rate limited, the API returns a <InlineCode>429</InlineCode> status. Implement exponential backoff:</p>
        <CodeBlock language="python" code={`import time\nimport olyxee\n\ndef verify_with_retry(model, target, max_retries=3):\n    for attempt in range(max_retries):\n        try:\n            return model.verify(target=target)\n        except olyxee.RateLimitError as e:\n            wait = 2 ** attempt\n            print(f"Rate limited. Retrying in {wait}s...")\n            time.sleep(wait)\n    raise Exception("Max retries exceeded")`} />
      </DocSection>
    </DocPage>
  );
}


function DocPage({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 sm:px-10 py-10 sm:py-14">
      <div className="mb-10 pb-6 border-b border-gray-100">
        <h1 className="text-[28px] sm:text-[32px] font-semibold text-gray-900 tracking-tight mb-2">{title}</h1>
        <p className="text-gray-500 text-[15px] leading-relaxed max-w-xl">{subtitle}</p>
      </div>
      <div className="space-y-10 text-[15px] text-gray-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="text-[13px] font-mono text-gray-800 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5">{children}</code>;
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-[#0d0d0d] my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161616] border-b border-gray-800">
        <span className="text-[11px] text-gray-500 font-mono">{language}</span>
        <button onClick={handleCopy} className="text-[11px] text-gray-500 hover:text-white transition-colors px-2 py-0.5 rounded hover:bg-white/10">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed">
        <code className="text-gray-300 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

function DocCallout({ type, children }: { type: "info" | "warning" | "tip"; children: React.ReactNode }) {
  const styles = {
    info: "border-l-green-500 bg-green-50/50",
    warning: "border-l-amber-500 bg-amber-50/50",
    tip: "border-l-blue-500 bg-blue-50/50",
  };
  const labels = { info: "Note", warning: "Warning", tip: "Tip" };
  const labelColors = {
    info: "text-green-700",
    warning: "text-amber-700",
    tip: "text-blue-700",
  };

  return (
    <div className={`rounded-lg border border-gray-200 border-l-4 p-4 text-sm leading-relaxed ${styles[type]}`}>
      <span className={`font-semibold ${labelColors[type]}`}>{labels[type]}</span>{" "}
      <span className="text-gray-600">{children}</span>
    </div>
  );
}

function DocTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-2.5 font-semibold text-gray-700 text-[13px]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-2.5 ${j === 0 ? 'text-gray-900 font-medium' : 'text-gray-500'} text-[13px]`}>
                  {cell === "Supported" ? <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">{cell}</span>
                    : cell === "Beta" ? <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{cell}</span>
                    : cell === "Experimental" ? <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{cell}</span>
                    : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
