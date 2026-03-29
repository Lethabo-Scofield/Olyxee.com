import { useState, FC } from "react";
import SEO from "../components/SEO";
import DocsLayout from "../layouts/DocsLayout";
import Header from '../components/header';
import { ArrowRight, BookOpen, Terminal, Layers, Cpu, ChevronRight, Play } from "lucide-react";

const TABS = [
  { id: "home", label: "Home" },
  { id: "api", label: "API" },
  { id: "grysics", label: "Grysics" },
  { id: "guides", label: "Guides" },
  { id: "resources", label: "Resources" },
];

const API_SIDE_NAV = [
  {
    heading: "Getting started",
    items: [
      { id: "api-overview", title: "Overview" },
      { id: "quickstart", title: "Quickstart" },
      { id: "api-keys", title: "API Keys" },
      { id: "models", title: "Supported Platforms" },
    ],
  },
  {
    heading: "Reference",
    items: [
      { id: "api-reference", title: "REST API" },
      { id: "python-sdk", title: "Python SDK" },
      { id: "cli", title: "CLI" },
      { id: "errors", title: "Error Handling" },
    ],
  },
];

const GRYSICS_SIDE_NAV = [
  {
    heading: "Overview",
    items: [
      { id: "grysics-overview", title: "What is Grysics" },
      { id: "verification", title: "Testing & Verification" },
    ],
  },
  {
    heading: "Use Cases",
    items: [
      { id: "deployment", title: "RAG Evaluation" },
      { id: "monitoring", title: "Monitoring", badge: "new" },
    ],
  },
  {
    heading: "Access",
    items: [
      { id: "early-access", title: "Early Access", badge: "open" },
    ],
  },
];

const GUIDES_SIDE_NAV = [
  {
    heading: "Topics",
    items: [
      { id: "supported-platforms", title: "Supported Platforms" },
      { id: "testing-strategies", title: "Testing Strategies" },
      { id: "configuration", title: "Configuration" },
    ],
  },
];

const RESOURCES_SIDE_NAV = [
  {
    heading: "Reference",
    items: [
      { id: "changelog", title: "Changelog" },
      { id: "limits", title: "Rate Limits" },
    ],
  },
];

const TAB_DEFAULTS: Record<string, string> = {
  api: "api-overview",
  grysics: "grysics-overview",
  guides: "supported-platforms",
  resources: "changelog",
};

const SIDE_NAVS: Record<string, typeof API_SIDE_NAV> = {
  api: API_SIDE_NAV,
  grysics: GRYSICS_SIDE_NAV,
  guides: GUIDES_SIDE_NAV,
  resources: RESOURCES_SIDE_NAV,
};

const Docs: FC = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [activePage, setActivePage] = useState("api-overview");

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    if (TAB_DEFAULTS[id]) setActivePage(TAB_DEFAULTS[id]);
  };

  const handleNavigate = (tabId: string, pageId: string) => {
    setActiveTab(tabId);
    setActivePage(pageId);
  };

  const renderContent = () => {
    if (activeTab === "home") return <DocsHome onNavigate={handleNavigate} />;

    const pageMap: Record<string, FC<any>> = {
      "api-overview": APIOverview,
      "quickstart": Quickstart,
      "api-keys": APIKeys,
      "models": SupportedModels,
      "api-reference": APIReference,
      "python-sdk": PythonSDK,
      "cli": CLIReference,
      "errors": ErrorHandling,
      "grysics-overview": GrysicsOverview,
      "verification": Verification,
      "deployment": Deployment,
      "monitoring": Monitoring,
      "supported-platforms": SupportedPlatforms,
      "testing-strategies": TestingStrategies,
      "configuration": Configuration,
      "early-access": EarlyAccessDoc,
      "changelog": Changelog,
      "limits": RateLimits,
    };

    const Component = pageMap[activePage];
    return Component ? <Component /> : null;
  };

  return (
    <div>
      <SEO title="Documentation" description="Complete documentation for the Olyxee platform." path="/docs" />
      <Header />
      <DocsLayout
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        sideNav={activeTab !== "home" ? SIDE_NAVS[activeTab] : undefined}
        activePage={activePage}
        onPageChange={setActivePage}
      >
        {renderContent()}
      </DocsLayout>
    </div>
  );
};

export default Docs;


function DocsHome({ onNavigate }: { onNavigate: (tab: string, page: string) => void }) {
  const featuredCards = [
    {
      icon: ArrowRight,
      title: "Quickstart",
      desc: "Verify your first AI application in under five minutes.",
      tab: "api",
      page: "quickstart",
    },
    {
      icon: Layers,
      title: "Grysics Engine",
      desc: "Learn how the verification engine ensures AI application reliability.",
      tab: "grysics",
      page: "grysics-overview",
    },
    {
      icon: Terminal,
      title: "API Reference",
      desc: "Integrate Grysics into your AI pipeline.",
      tab: "api",
      page: "api-reference",
    },
    {
      icon: Cpu,
      title: "Supported Platforms",
      desc: "OpenAI, Anthropic, LangChain, and more.",
      tab: "guides",
      page: "supported-platforms",
    },
  ];

  const videos = [
    {
      title: "Getting started with Olyxee",
      duration: "5:12",
      desc: "Set up your first project and run verification in minutes.",
      thumb: "from-neutral-800 to-neutral-900",
    },
    {
      title: "Grysics deep dive",
      duration: "12:34",
      desc: "Understanding the verification engine and its checks.",
      thumb: "from-neutral-700 to-neutral-900",
    },
    {
      title: "Testing RAG pipelines",
      duration: "8:45",
      desc: "Evaluate retrieval quality, context usage, and response accuracy.",
      thumb: "from-neutral-800 to-neutral-950",
    },
  ];

  const quickLinks = [
    { label: "Python SDK", tab: "api", page: "python-sdk" },
    { label: "CLI Reference", tab: "api", page: "cli" },
    { label: "Monitoring", tab: "grysics", page: "monitoring" },
    { label: "Testing Strategies", tab: "guides", page: "testing-strategies" },
    { label: "Changelog", tab: "resources", page: "changelog" },
    { label: "Rate Limits", tab: "resources", page: "limits" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight mb-3">Documentation</h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">
          Explore the Olyxee platform. Learn how to verify, test, and monitor AI applications with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {featuredCards.map(card => {
          const Icon = card.icon;
          return (
            <button
              key={card.page}
              onClick={() => onNavigate(card.tab, card.page)}
              className="group text-left rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-gray-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="text-[15px] font-semibold text-gray-900">{card.title}</h3>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Featured videos</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {videos.map((video, i) => (
            <div key={i} className="group cursor-pointer">
              <div className={`relative aspect-video rounded-xl bg-gradient-to-br ${video.thumb} mb-3 overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[11px] font-mono px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">{video.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{video.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What is Olyxee?</h2>
        <div className="text-[15px] text-gray-600 leading-relaxed space-y-3 max-w-3xl">
          <p>Olyxee is an AI infrastructure company building tools for reliable AI systems. Our flagship product, <strong className="text-gray-900">Grysics</strong>, is a verification engine that ensures AI applications — chatbots, RAG pipelines, and agent workflows — work correctly and reliably in real-world use.</p>
          <p>Grysics handles testing, evaluation, failure detection, performance monitoring, and continuous verification — giving teams confidence that their AI applications behave as expected before and after deployment.</p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Supported frameworks</h2>
        <p className="text-sm text-gray-500 mb-4">Grysics works with AI applications built on any stack.</p>
        <div className="flex flex-wrap gap-2">
          {["OpenAI", "Anthropic", "LangChain", "LlamaIndex", "Hugging Face", "Custom LLMs"].map(fw => (
            <span key={fw} className="text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">{fw}</span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick links</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {quickLinks.map(link => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.tab, link.page)}
              className="text-left px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-between"
            >
              {link.label}
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


function APIOverview() {
  return (
    <DocPage title="API Overview" subtitle="Integrate Grysics into your AI application pipeline with our Python SDK, REST API, and CLI tools.">
      <DocSection title="Authentication">
        <p>All API requests require an API key. Generate keys from the Olyxee dashboard or via the API, and include it in every request:</p>
        <CodeBlock language="bash" code={`curl https://api.olyxee.com/v1/apps \\\n  -H "Authorization: Bearer oly_sk_..."`} />
        <DocCallout type="warning">
          Never expose your API key in client-side code. Use environment variables or a secrets manager. See the <strong>API Keys</strong> page for key management.
        </DocCallout>
      </DocSection>

      <DocSection title="Key concepts">
        <div className="space-y-3 mt-2">
          {[
            { title: "Applications", desc: "Register your chatbot, RAG pipeline, or agent workflow as an application. Each app gets its own verification history and monitoring dashboard." },
            { title: "Verification runs", desc: "Test your application against predefined checks — accuracy, consistency, hallucination detection, and retrieval relevance." },
            { title: "Monitoring", desc: "Continuous production monitoring with alerts for quality drift, hallucination spikes, and latency degradation." },
            { title: "API Keys", desc: "Create scoped keys for different environments (dev, staging, production) with configurable permissions and expiration." },
          ].map(item => (
            <div key={item.title} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-1 text-[15px]">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="SDKs & tools">
        <div className="space-y-3 mt-2">
          {[
            { title: "Python SDK", desc: "Full-featured SDK for connecting, verifying, evaluating, and monitoring AI applications." },
            { title: "REST API", desc: "HTTP API for programmatic access from any language or platform." },
            { title: "CLI", desc: "Command-line tools for quick application verification and monitoring." },
          ].map(item => (
            <div key={item.title} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-1 text-[15px]">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Base URL">
        <CodeBlock language="bash" code="https://api.olyxee.com/v1" />
      </DocSection>
    </DocPage>
  );
}


function Quickstart() {
  return (
    <DocPage title="Quickstart" subtitle="Get up and running with Grysics in under five minutes.">
      <DocSection title="1. Install the SDK">
        <p>Install the Grysics Python SDK:</p>
        <CodeBlock language="bash" code="pip install grysics" />
      </DocSection>

      <DocSection title="2. Initialize a project">
        <CodeBlock language="bash" code={`grysics init my-project\ncd my-project`} />
      </DocSection>

      <DocSection title="3. Connect your AI application">
        <p>Point Grysics at your chatbot, RAG pipeline, or agent:</p>
        <CodeBlock language="python" code={`import grysics\n\napp = grysics.connect(\n    endpoint="http://localhost:8000/chat",\n    type="rag"  # or "chatbot", "agent"\n)`} />
      </DocSection>

      <DocSection title="4. Run verification">
        <p>Run test cases against your application:</p>
        <CodeBlock language="python" code={`results = app.verify()\n\nprint(results.summary())\n# ✓ Accuracy: 94.3% (above threshold)\n# ✓ Consistency: 97.1% (same input → same output)\n# ✓ Retrieval relevance: 91.8%\n# ✓ Latency p95: 320ms`} />
      </DocSection>

      <DocSection title="5. Monitor in production">
        <p>Enable continuous verification:</p>
        <CodeBlock language="python" code={`app.monitor(\n    check_interval=300,\n    alert_on=["hallucination", "drift", "latency"]\n)\n\nprint("Monitoring active")`} />
      </DocSection>

      <DocCallout type="info">
        For detailed evaluation options, see the <strong>Testing &amp; Verification</strong> section under Grysics.
      </DocCallout>
    </DocPage>
  );
}


function APIKeys() {
  return (
    <DocPage title="API Keys" subtitle="Create and manage API keys for authenticating with the Grysics platform.">
      <DocSection title="Key types">
        <DocTable
          headers={["Type", "Prefix", "Permissions", "Use case"]}
          rows={[
            ["Secret key", "oly_sk_", "Full access", "Server-side applications, CI/CD"],
            ["Restricted key", "oly_rk_", "Scoped access", "Specific apps or read-only access"],
            ["Test key", "oly_tk_", "Sandbox only", "Development and testing"],
          ]}
        />
      </DocSection>

      <DocSection title="Generate a key via dashboard">
        <p>The simplest way to create an API key:</p>
        <div className="space-y-2 mt-2">
          {[
            "Go to dashboard.olyxee.com → Settings → API Keys",
            "Click \"Create new key\"",
            "Choose the key type and set permissions",
            "Optionally set an expiration date",
            "Copy the key — it will only be shown once",
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-xs font-mono font-bold text-gray-900 bg-gray-100 border border-gray-200 rounded px-2 py-0.5 flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-gray-600">{step}</p>
            </div>
          ))}
        </div>
        <DocCallout type="warning">
          API keys are shown only once at creation. Store them securely — you cannot retrieve the full key later.
        </DocCallout>
      </DocSection>

      <DocSection title="Generate a key via API">
        <CodeBlock language="bash" code={`curl -X POST https://api.olyxee.com/v1/api-keys \\\n  -H "Authorization: Bearer oly_sk_..." \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "name": "CI Pipeline Key",\n    "type": "restricted",\n    "permissions": ["apps:read", "verify:write"],\n    "expires_in": "90d"\n  }'`} />
        <p>Response:</p>
        <CodeBlock language="json" code={`{\n  "object": "api_key",\n  "id": "key_abc123",\n  "name": "CI Pipeline Key",\n  "key": "oly_rk_live_abc123...xyz",\n  "type": "restricted",\n  "permissions": ["apps:read", "verify:write"],\n  "created_at": "2025-01-15T10:30:00Z",\n  "expires_at": "2025-04-15T10:30:00Z"\n}`} />
      </DocSection>

      <DocSection title="Generate a key via SDK">
        <CodeBlock language="python" code={`import grysics\n\nkey = grysics.api_keys.create(\n    name="Production Monitor",\n    type="restricted",\n    permissions=["apps:read", "monitor:write", "metrics:read"],\n    expires_in="180d"\n)\n\nprint(f"Key: {key.secret}")  # Only available at creation\nprint(f"ID: {key.id}")\nprint(f"Expires: {key.expires_at}")`} />
      </DocSection>

      <DocSection title="List keys">
        <CodeBlock language="bash" code={`curl https://api.olyxee.com/v1/api-keys \\\n  -H "Authorization: Bearer oly_sk_..."`} />
        <CodeBlock language="json" code={`{\n  "object": "list",\n  "data": [\n    {\n      "id": "key_abc123",\n      "name": "CI Pipeline Key",\n      "type": "restricted",\n      "last_four": "xyz0",\n      "last_used_at": "2025-01-15T09:12:00Z",\n      "expires_at": "2025-04-15T10:30:00Z",\n      "status": "active"\n    }\n  ]\n}`} />
      </DocSection>

      <DocSection title="Revoke a key">
        <CodeBlock language="bash" code={`curl -X DELETE https://api.olyxee.com/v1/api-keys/key_abc123 \\\n  -H "Authorization: Bearer oly_sk_..."`} />
        <p>Or via the SDK:</p>
        <CodeBlock language="python" code={`grysics.api_keys.revoke("key_abc123")`} />
        <DocCallout type="info">
          Revoked keys stop working immediately. Any in-flight requests using the key will fail with a 401 error.
        </DocCallout>
      </DocSection>

      <DocSection title="Available permissions">
        <DocTable
          headers={["Permission", "Description"]}
          rows={[
            ["apps:read", "List and view registered applications"],
            ["apps:write", "Register and update applications"],
            ["verify:write", "Start verification runs"],
            ["verify:read", "View verification results"],
            ["monitor:write", "Enable and configure monitoring"],
            ["metrics:read", "View monitoring metrics and alerts"],
            ["keys:manage", "Create and revoke API keys"],
          ]}
        />
      </DocSection>

      <DocSection title="Best practices">
        <div className="space-y-2 mt-1">
          {[
            "Use restricted keys with minimal permissions for each use case",
            "Set expiration dates on all keys — rotate regularly",
            "Use separate keys for development, staging, and production",
            "Store keys in environment variables, never in source code",
            "Monitor key usage in the dashboard to detect anomalies",
          ].map((tip, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-600">{tip}</p>
            </div>
          ))}
        </div>
      </DocSection>
    </DocPage>
  );
}


function SupportedModels() {
  return (
    <DocPage title="Supported Platforms" subtitle="AI frameworks and application types compatible with Grysics.">
      <DocSection title="LLM Providers">
        <DocTable
          headers={["Provider", "Integration", "Status"]}
          rows={[
            ["OpenAI", "API / SDK", "Supported"],
            ["Anthropic", "API / SDK", "Supported"],
            ["Google (Gemini)", "API / SDK", "Supported"],
            ["Hugging Face", "Transformers / Inference API", "Supported"],
            ["Self-hosted LLMs", "Any HTTP endpoint", "Supported"],
          ]}
        />
      </DocSection>

      <DocSection title="Application types">
        <p>Grysics verification works with chatbots, RAG pipelines, agent workflows, and custom LLM applications. Any system with a queryable endpoint can be tested.</p>
        <DocCallout type="tip">
          For RAG systems, Grysics can evaluate the full pipeline — retrieval quality, context relevance, and final response accuracy — not just the LLM output.
        </DocCallout>
      </DocSection>

      <DocSection title="Plan limits">
        <DocTable
          headers={["Plan", "Test runs / month", "Monitoring"]}
          rows={[
            ["Free", "500", "7-day retention"],
            ["Pro", "10,000", "90-day retention"],
            ["Enterprise", "Unlimited", "Custom retention"],
          ]}
        />
      </DocSection>
    </DocPage>
  );
}


function GrysicsOverview() {
  return (
    <DocPage title="What is Grysics" subtitle="The verification engine for AI applications.">
      <DocSection title="Overview">
        <p><strong>Grysics</strong> is a system for verifying, testing, and monitoring AI applications — especially chatbots, RAG pipelines, and agent-based workflows.</p>
        <p>It ensures that AI systems are not just built, but work correctly, reliably, and consistently in real-world use. Instead of discovering failures in production, Grysics catches hallucinations, retrieval failures, inconsistencies, and performance issues before they reach users.</p>
      </DocSection>

      <DocSection title="The problem">
        <div className="space-y-3 mt-2">
          {[
            { step: "01", title: "Hallucinated outputs", desc: "LLMs generate confident but wrong answers. RAG retrieves irrelevant or incomplete context." },
            { step: "02", title: "Unstable behavior", desc: "Same input produces different outputs. Small prompt changes cause large behavior shifts." },
            { step: "03", title: "Retrieval failures", desc: "Wrong documents retrieved. Missing critical context. Poor ranking of relevant data." },
            { step: "04", title: "Edge case failures", desc: "Works in demos, fails in production. Breaks with unusual queries or real user behavior." },
          ].map(item => (
            <div key={item.step} className="flex gap-4 items-start p-4 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-xs font-mono font-bold text-gray-900 bg-gray-100 border border-gray-200 rounded px-2 py-1 flex-shrink-0">{item.step}</span>
              <div>
                <span className="font-semibold text-gray-900">{item.title}</span>
                <p className="text-gray-500 mt-0.5 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="What Grysics does">
        <DocTable
          headers={["Capability", "What it checks", "When"]}
          rows={[
            ["Testing", "Accuracy, consistency, robustness of responses", "Pre-deployment"],
            ["RAG Evaluation", "Retrieval quality, context relevance, answer accuracy", "Pre & post-deployment"],
            ["Failure Detection", "Hallucinations, missing context, logical inconsistencies", "Continuous"],
            ["Performance", "Response time, pipeline bottlenecks, throughput", "Continuous"],
            ["Drift Monitoring", "Output quality degradation over time", "Post-deployment"],
          ]}
        />
      </DocSection>

      <DocCallout type="info">
        Grysics is not another chatbot or model. It is infrastructure for AI reliability — a verification engine for AI applications.
      </DocCallout>
    </DocPage>
  );
}


function Verification() {
  return (
    <DocPage title="Testing & Verification" subtitle="Deep dive into how Grysics tests AI applications.">
      <DocSection title="What Grysics tests">
        <p>Every AI application goes through structured verification:</p>
        <ul className="list-none pl-0 mt-3 space-y-2 text-gray-600">
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">Accuracy</strong> — responses are correct against known-answer test cases</span></li>
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">Consistency</strong> — same question asked multiple times produces stable answers</span></li>
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">Robustness</strong> — system handles edge cases, unusual queries, and adversarial inputs</span></li>
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">Hallucination detection</strong> — flags confident but incorrect or fabricated responses</span></li>
        </ul>
      </DocSection>

      <DocSection title="Running tests">
        <CodeBlock language="python" code={`results = app.verify(\n    test_cases="./test_suite.yaml",\n    checks=["accuracy", "consistency", "hallucination"],\n    runs_per_case=5\n)\n\nif results.passed:\n    print("All checks passed")\nelse:\n    print(results.failures)`} />
      </DocSection>

      <DocSection title="Verification report">
        <p>After verification completes, you receive a structured report:</p>
        <CodeBlock language="json" code={`{\n  "status": "passed",\n  "app_type": "rag",\n  "checks": {\n    "accuracy": { "passed": true, "score": 0.943, "threshold": 0.90 },\n    "consistency": { "passed": true, "score": 0.971, "threshold": 0.95 },\n    "retrieval_relevance": { "passed": true, "score": 0.918, "threshold": 0.85 },\n    "hallucination_rate": { "passed": true, "value": 0.02, "threshold": 0.05 }\n  },\n  "recommendations": [\n    "Consider adding retrieval re-ranking for improved context relevance"\n  ]\n}`} />
      </DocSection>

      <DocSection title="Test case format">
        <p>Define test cases in YAML:</p>
        <CodeBlock language="yaml" code={`tests:\n  - query: "What is your refund policy?"\n    expected: "contains: 30-day money-back guarantee"\n    tags: [policy, faq]\n\n  - query: "Who founded the company?"\n    expected: "exact: Jane Smith founded Acme in 2019"\n    tags: [factual]\n\n  - query: "asdfghjkl random noise"\n    expected: "graceful_fallback: true"\n    tags: [edge-case]`} />
      </DocSection>

      <DocCallout type="warning">
        Always test with realistic queries that reflect actual user behavior. Demo-optimized test cases often miss real-world failure modes.
      </DocCallout>
    </DocPage>
  );
}


function Deployment() {
  return (
    <DocPage title="RAG Evaluation" subtitle="Evaluate the full retrieval-augmented generation pipeline.">
      <DocSection title="What Grysics evaluates">
        <div className="space-y-3 mt-2">
          {[
            { title: "Retrieval Quality", desc: "Did the system retrieve the right documents? Are the most relevant chunks ranked highest?" },
            { title: "Context Relevance", desc: "Is the retrieved context actually useful for answering the query? Measures signal-to-noise ratio." },
            { title: "Response Accuracy", desc: "Did the model use the retrieved context correctly? Is the final answer faithful to the source data?" },
          ].map(item => (
            <div key={item.title} className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-1.5 text-[15px]">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Evaluate a RAG pipeline">
        <CodeBlock language="python" code={`import grysics\n\nrag = grysics.connect(\n    endpoint="http://localhost:8000/query",\n    type="rag"\n)\n\nresults = rag.evaluate(\n    test_cases="./rag_tests.yaml",\n    checks=[\n        "retrieval_relevance",\n        "context_utilization",\n        "answer_accuracy",\n        "hallucination"\n    ]\n)\n\nprint(results.summary())\n# ✓ Retrieval relevance: 91.8%\n# ✓ Context utilization: 87.3%\n# ✓ Answer accuracy: 94.1%\n# ✓ Hallucination rate: 2.1%`} />
      </DocSection>

      <DocSection title="Configuration">
        <p>RAG evaluation behavior can be customized via <InlineCode>grysics.yaml</InlineCode>:</p>
        <CodeBlock language="yaml" code={`app:\n  type: rag\n  endpoint: http://localhost:8000/query\n\nevaluation:\n  retrieval_relevance_threshold: 0.85\n  accuracy_threshold: 0.90\n  hallucination_limit: 0.05\n  runs_per_case: 3\n\nmonitoring:\n  enabled: true\n  interval: 300\n  alert_on:\n    - hallucination_spike\n    - accuracy_drop\n    - latency_degradation`} />
      </DocSection>
    </DocPage>
  );
}


function Monitoring() {
  return (
    <DocPage title="Monitoring" subtitle="Continuous verification for AI applications in production.">
      <DocSection title="Overview">
        <p>Once an AI application is deployed, Grysics provides continuous monitoring that tracks response quality, consistency, and drift. When anomalies are detected, the system flags degradation and can trigger alerts before users are impacted.</p>
      </DocSection>

      <DocSection title="Metrics tracked">
        <DocTable
          headers={["Metric", "Description", "Alert threshold"]}
          rows={[
            ["Response quality", "Accuracy and relevance of outputs over time", "Configurable (default 5% drop)"],
            ["Hallucination rate", "Frequency of fabricated or unsupported claims", ">5% of responses"],
            ["Consistency", "Variation in answers to repeated queries", "<95% similarity"],
            ["Latency p95", "95th percentile response time", "2x baseline"],
            ["Throughput", "Requests processed per second", "50% below baseline"],
          ]}
        />
      </DocSection>

      <DocSection title="Enable monitoring">
        <CodeBlock language="python" code={`app.monitor(\n    check_interval=300,\n    drift_threshold=0.05,\n    hallucination_limit=0.05,\n    alert_webhook="https://your-api.com/alerts"\n)`} />
      </DocSection>

      <DocSection title="Dashboard">
        <p>View real-time metrics through the Olyxee dashboard or query them programmatically:</p>
        <CodeBlock language="python" code={`metrics = app.metrics(\n    period="24h",\n    resolution="5m"\n)\n\nprint(f"Avg latency: {metrics.latency_avg}ms")\nprint(f"Response quality: {metrics.quality_score}")\nprint(f"Hallucination rate: {metrics.hallucination_rate}")\nprint(f"Total queries: {metrics.query_count}")`} />
      </DocSection>
    </DocPage>
  );
}


function APIReference() {
  return (
    <DocPage title="REST API" subtitle="Integrate Grysics into your AI application pipeline with the REST API.">
      <DocSection title="Base URL">
        <CodeBlock language="bash" code="https://api.olyxee.com/v1" />
      </DocSection>

      <DocSection title="Authentication">
        <p>All API requests require an API key passed in the <InlineCode>Authorization</InlineCode> header:</p>
        <CodeBlock language="bash" code={`curl https://api.olyxee.com/v1/apps \\\n  -H "Authorization: Bearer oly_sk_..."`} />
      </DocSection>

      <DocSection title="Application endpoints">
        <DocTable
          headers={["Method", "Endpoint", "Description"]}
          rows={[
            ["POST", "/apps", "Register an AI application"],
            ["GET", "/apps/:id", "Get application details"],
            ["POST", "/apps/:id/verify", "Start a verification run"],
            ["GET", "/apps/:id/verify/:run_id", "Get verification results"],
            ["POST", "/apps/:id/monitor", "Enable monitoring"],
            ["GET", "/apps/:id/metrics", "Get monitoring metrics"],
            ["GET", "/apps/:id/alerts", "List triggered alerts"],
          ]}
        />
      </DocSection>

      <DocSection title="API key endpoints">
        <DocTable
          headers={["Method", "Endpoint", "Description"]}
          rows={[
            ["POST", "/api-keys", "Create a new API key"],
            ["GET", "/api-keys", "List all API keys"],
            ["GET", "/api-keys/:id", "Get key details"],
            ["DELETE", "/api-keys/:id", "Revoke an API key"],
            ["PATCH", "/api-keys/:id", "Update key name or permissions"],
          ]}
        />
      </DocSection>

      <DocSection title="Register an application">
        <CodeBlock language="bash" code={`curl -X POST https://api.olyxee.com/v1/apps \\\n  -H "Authorization: Bearer oly_sk_..." \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "name": "my-chatbot",\n    "type": "rag",\n    "endpoint": "https://my-app.com/api/chat"\n  }'`} />
      </DocSection>

      <DocSection title="Start verification">
        <CodeBlock language="bash" code={`curl -X POST https://api.olyxee.com/v1/apps/app_abc123/verify \\\n  -H "Authorization: Bearer oly_sk_..." \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "checks": ["accuracy", "consistency", "hallucination"],\n    "test_cases": "default",\n    "runs_per_case": 3\n  }'`} />
      </DocSection>

      <DocSection title="Response format">
        <p>All responses follow a consistent envelope:</p>
        <CodeBlock language="json" code={`{\n  "object": "app",\n  "id": "app_abc123",\n  "name": "my-chatbot",\n  "type": "rag",\n  "status": "verified",\n  "last_run": "2025-01-15T10:30:00Z",\n  "quality_score": 0.943\n}`} />
      </DocSection>
    </DocPage>
  );
}


function PythonSDK() {
  return (
    <DocPage title="Python SDK" subtitle="Complete reference for the grysics Python package.">
      <DocSection title="Installation">
        <CodeBlock language="bash" code="pip install grysics" />
        <p>Requires Python 3.9+.</p>
      </DocSection>

      <DocSection title="grysics.connect()">
        <p>Connect to an AI application endpoint.</p>
        <CodeBlock language="python" code={`app = grysics.connect(\n    endpoint="http://localhost:8000/chat",\n    type="rag",\n    api_key="your-app-api-key"\n)`} />
        <DocTable
          headers={["Parameter", "Type", "Description"]}
          rows={[
            ["endpoint", "str", "URL of your AI application"],
            ["type", "str", "Application type (chatbot, rag, agent)"],
            ["api_key", "str", "Optional API key for your application"],
          ]}
        />
      </DocSection>

      <DocSection title="app.verify()">
        <p>Run Grysics verification against your AI application.</p>
        <CodeBlock language="python" code={`results = app.verify(\n    test_cases="./test_suite.yaml",\n    checks=["accuracy", "consistency", "hallucination"],\n    runs_per_case=5\n)`} />
      </DocSection>

      <DocSection title="app.evaluate()">
        <p>Run RAG-specific evaluation on retrieval and response quality.</p>
        <CodeBlock language="python" code={`results = app.evaluate(\n    checks=["retrieval_relevance", "context_utilization", "answer_accuracy"],\n    test_cases="./rag_tests.yaml"\n)`} />
      </DocSection>

      <DocSection title="app.monitor()">
        <p>Enable continuous monitoring for a deployed application.</p>
        <CodeBlock language="python" code={`app.monitor(\n    check_interval=300,\n    alert_on=["hallucination", "drift", "latency"],\n    webhook="https://your-api.com/alerts"\n)`} />
      </DocSection>
    </DocPage>
  );
}


function CLIReference() {
  return (
    <DocPage title="CLI Reference" subtitle="Command-line tools for managing Grysics projects.">
      <DocSection title="Installation">
        <p>The CLI is included with the Python SDK:</p>
        <CodeBlock language="bash" code="pip install grysics" />
      </DocSection>

      <DocSection title="Commands">
        <CodeBlock language="bash" code={`grysics init <project>       # Initialize a new project\ngrysics connect <endpoint>   # Connect to an AI application\ngrysics verify               # Run verification tests\ngrysics evaluate             # Run RAG evaluation\ngrysics monitor start        # Enable continuous monitoring\ngrysics monitor status       # Check monitoring health\ngrysics metrics              # View latest metrics\ngrysics alerts               # List triggered alerts`} />
      </DocSection>

      <DocSection title="Examples">
        <CodeBlock language="bash" code={`# Connect to a chatbot and run verification\ngrysics connect http://localhost:8000/chat --type chatbot\ngrysics verify --checks accuracy,consistency,hallucination\n\n# Evaluate a RAG pipeline\ngrysics connect http://localhost:8000/query --type rag\ngrysics evaluate --checks retrieval,accuracy\n\n# Start monitoring with alerts\ngrysics monitor start --interval 300 --webhook https://hooks.slack.com/...`} />
      </DocSection>

      <DocSection title="Configuration">
        <p>The CLI reads from <InlineCode>grysics.yaml</InlineCode> in the project root. Command-line flags override file settings.</p>
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
        <CodeBlock language="json" code={`{\n  "error": {\n    "type": "invalid_request",\n    "message": "Check type 'unknown-check' is not supported",\n    "code": "unsupported_check",\n    "param": "checks"\n  }\n}`} />
      </DocSection>

      <DocSection title="Verification errors">
        <DocTable
          headers={["Error", "Cause", "Solution"]}
          rows={[
            ["accuracy_below_threshold", "Response accuracy dropped below threshold", "Review test cases or adjust threshold"],
            ["hallucination_detected", "Response contains fabricated information", "Check retrieval pipeline and prompt engineering"],
            ["consistency_failure", "Inconsistent answers across query variations", "Improve prompt robustness or add guardrails"],
            ["endpoint_unreachable", "Application endpoint not responding", "Check endpoint URL and network connectivity"],
          ]}
        />
      </DocSection>
    </DocPage>
  );
}


function SupportedPlatforms() {
  return (
    <DocPage title="Supported Platforms" subtitle="AI frameworks and platforms that Grysics integrates with.">
      <DocSection title="LLM providers">
        <DocTable
          headers={["Provider", "Status", "Integration", "Notes"]}
          rows={[
            ["OpenAI", "Supported", "API", "GPT-4, GPT-3.5, embeddings"],
            ["Anthropic", "Supported", "API", "Claude 3.5, Claude 3"],
            ["Google Gemini", "Supported", "API", "Gemini Pro, Gemini Flash"],
            ["Cohere", "Supported", "API", "Command, Embed models"],
            ["Local / Self-hosted", "Supported", "HTTP endpoint", "Any OpenAI-compatible API"],
          ]}
        />
      </DocSection>

      <DocSection title="Frameworks">
        <DocTable
          headers={["Framework", "Status", "Notes"]}
          rows={[
            ["LangChain", "Supported", "Chain and agent verification"],
            ["LlamaIndex", "Supported", "RAG pipeline evaluation"],
            ["Haystack", "Beta", "Pipeline testing"],
            ["Custom", "Supported", "Any HTTP endpoint"],
          ]}
        />
      </DocSection>

      <DocSection title="Connecting a platform">
        <CodeBlock language="python" code={`import grysics\n\n# Connect to an OpenAI-powered chatbot\napp = grysics.connect(\n    endpoint="http://localhost:8000/chat",\n    type="chatbot"\n)\n\n# Connect to a LangChain RAG pipeline\napp = grysics.connect(\n    endpoint="http://localhost:8000/query",\n    type="rag",\n    framework="langchain"\n)`} />
      </DocSection>
    </DocPage>
  );
}


function TestingStrategies() {
  return (
    <DocPage title="Testing Strategies" subtitle="Best practices for verifying different types of AI applications.">
      <DocSection title="Test types">
        <DocTable
          headers={["Test", "Best for", "What it checks"]}
          rows={[
            ["Accuracy", "All apps", "Response correctness against ground truth"],
            ["Consistency", "Chatbots", "Same answer across rephrased queries"],
            ["Hallucination", "RAG, Q&A", "Fabricated facts not in source data"],
            ["Retrieval relevance", "RAG pipelines", "Quality of retrieved context"],
            ["Context utilization", "RAG pipelines", "How well responses use retrieved context"],
            ["Tool usage", "Agents", "Correct tool selection and parameter passing"],
          ]}
        />
      </DocSection>

      <DocSection title="Writing test cases">
        <CodeBlock language="yaml" code={`test_cases:\n  - input: "What is your refund policy?"\n    expected: "30-day money-back guarantee"\n    checks: [accuracy, hallucination]\n\n  - input: "How do I reset my password?"\n    expected_contains: ["settings", "reset", "email"]\n    checks: [accuracy, consistency]\n    variations:\n      - "I forgot my password"\n      - "Can you help me change my password?"`} />
      </DocSection>

      <DocCallout type="tip">
        Start with accuracy and hallucination checks. Add consistency testing once your application handles basic queries reliably.
      </DocCallout>
    </DocPage>
  );
}


function Configuration() {
  return (
    <DocPage title="Configuration" subtitle="Project configuration and environment setup.">
      <DocSection title="grysics.yaml">
        <p>The project configuration file controls default settings:</p>
        <CodeBlock language="yaml" code={`project:\n  name: my-ai-project\n  version: 1.0.0\n\napplication:\n  endpoint: http://localhost:8000/chat\n  type: rag\n  framework: langchain\n\nverification:\n  checks:\n    - accuracy\n    - consistency\n    - hallucination\n  runs_per_case: 5\n  test_cases: ./tests/\n\nmonitoring:\n  enabled: true\n  interval: 300\n  alert_on:\n    - hallucination\n    - drift\n    - latency\n  webhook: https://your-api.com/alerts`} />
      </DocSection>

      <DocSection title="Environment variables">
        <DocTable
          headers={["Variable", "Description", "Required"]}
          rows={[
            ["GRYSICS_API_KEY", "API authentication key", "Yes"],
            ["GRYSICS_ORG_ID", "Organization identifier", "For teams"],
            ["GRYSICS_LOG_LEVEL", "Logging verbosity (debug, info, warn)", "No"],
            ["GRYSICS_CACHE_DIR", "Local cache directory", "No"],
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
            "Python SDK v1.0 with full verification and monitoring support",
            "Support for OpenAI, Anthropic, LangChain, and LlamaIndex",
            "REST API v1 with application management endpoints",
            "CLI tools for project initialization, verification, and monitoring",
          ],
        },
        {
          version: "0.9.0",
          date: "November 2024",
          items: [
            "Beta release of production monitoring",
            "Added hallucination detection checks",
            "RAG evaluation with retrieval relevance scoring",
            "Webhook notifications for monitoring alerts",
          ],
        },
        {
          version: "0.8.0",
          date: "September 2024",
          items: [
            "Consistency testing across query variations",
            "Agent workflow verification support",
            "Improved verification report format",
            "Added test case YAML configuration",
          ],
        },
      ].map(release => (
        <DocSection key={release.version} title={`v${release.version} — ${release.date}`}>
          <ul className="list-none pl-0 space-y-2 text-gray-600">
            {release.items.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
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
            ["Registered apps", "5", "50", "Unlimited"],
            ["Verification runs", "20/day", "500/day", "Unlimited"],
            ["API requests", "1,000/min", "10,000/min", "Custom"],
            ["Monitored apps", "3", "25", "Unlimited"],
          ]}
        />
      </DocSection>

      <DocSection title="Rate limit headers">
        <p>Every API response includes rate limit information:</p>
        <CodeBlock language="http" code={`X-RateLimit-Limit: 1000\nX-RateLimit-Remaining: 947\nX-RateLimit-Reset: 1705312800`} />
      </DocSection>

      <DocSection title="Handling rate limits">
        <p>When rate limited, the API returns a <InlineCode>429</InlineCode> status. Implement exponential backoff:</p>
        <CodeBlock language="python" code={`import time\nimport grysics\n\ndef verify_with_retry(app, max_retries=3):\n    for attempt in range(max_retries):\n        try:\n            return app.verify(\n                checks=["accuracy", "hallucination"]\n            )\n        except grysics.RateLimitError as e:\n            wait = 2 ** attempt\n            print(f"Rate limited. Retrying in {wait}s...")\n            time.sleep(wait)\n    raise Exception("Max retries exceeded")`} />
      </DocSection>
    </DocPage>
  );
}


function EarlyAccessDoc() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DocPage title="Early Access" subtitle="Get early access to Grysics and the Olyxee platform.">
      <DocSection title="What you get">
        <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-[14px]">
          <li>Full access to the Grysics verification engine</li>
          <li>Verification and monitoring for chatbots, RAG, and agents</li>
          <li>Direct support channel with the engineering team</li>
          <li>Priority access to new features and API updates</li>
        </ul>
      </DocSection>

      {submitted ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center mx-auto mb-4 text-lg font-semibold">&#10003;</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">You&apos;re on the list</h3>
          <p className="text-gray-500 text-sm">We&apos;ll reach out when your spot is ready.</p>
        </div>
      ) : (
        <DocSection title="Request access">
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder-gray-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder-gray-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder-gray-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-colors text-gray-900 appearance-none">
                <option value="">Select your role</option>
                <option value="engineer">ML / AI Engineer</option>
                <option value="devops">DevOps / MLOps</option>
                <option value="manager">Engineering Manager</option>
                <option value="founder">Founder / CTO</option>
                <option value="researcher">Researcher</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button type="submit" className="w-full px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors text-sm mt-2">
              Request Access
            </button>
            <p className="text-xs text-gray-400 text-center">No credit card required.</p>
          </form>
        </DocSection>
      )}
    </DocPage>
  );
}

function DocPage({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-10 py-10 sm:py-14">
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
    info: "border-l-gray-400 bg-gray-50/60",
    warning: "border-l-gray-600 bg-gray-50/60",
    tip: "border-l-gray-300 bg-gray-50/60",
  };
  const labels = { info: "Note", warning: "Warning", tip: "Tip" };

  return (
    <div className={`rounded-lg border border-gray-200 border-l-4 p-4 text-sm leading-relaxed ${styles[type]}`}>
      <span className="font-semibold text-gray-900">{labels[type]}</span>{" "}
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
                  {cell === "Supported" ? <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-900 text-white">{cell}</span>
                    : cell === "Beta" ? <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">{cell}</span>
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
