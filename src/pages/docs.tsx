import { useState, FC } from "react";
import SEO from "../components/SEO";
import DocsLayout from "../layouts/DocsLayout";
import Header from '../components/header';
import { ArrowRight, BookOpen, Terminal, Layers, Cpu, ChevronRight, Play, Lock, Sparkles } from "lucide-react";

const TABS = [
  { id: "home", label: "Home" },
  { id: "api", label: "API" },
  { id: "grysics", label: "Grysics" },
  { id: "guides", label: "Guides" },
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
      { id: "changelog", title: "Changelog" },
      { id: "limits", title: "Rate Limits" },
    ],
  },
];

const GRYSICS_SIDE_NAV = [
  {
    heading: "Overview",
    items: [
      { id: "grysics-overview", title: "What is Grysics" },
    ],
  },
  {
    heading: "By application",
    items: [
      { id: "grysics-chatbots", title: "Chatbots" },
      { id: "grysics-rag", title: "RAG Pipelines" },
      { id: "grysics-agents", title: "Agents" },
    ],
  },
  {
    heading: "Features",
    items: [
      { id: "verification", title: "Testing & Verification" },
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

const TAB_DEFAULTS: Record<string, string> = {
  api: "api-overview",
  grysics: "grysics-overview",
  guides: "supported-platforms",
};

const SIDE_NAVS: Record<string, typeof API_SIDE_NAV> = {
  api: API_SIDE_NAV,
  grysics: GRYSICS_SIDE_NAV,
  guides: GUIDES_SIDE_NAV,
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

  const handleHomeNavigate = (tabId: string, _pageId: string) => {
    setActiveTab(tabId);
  };

  const renderContent = () => {
    if (activeTab === "home") return <DocsHome onNavigate={handleHomeNavigate} />;
    return <EarlyAccessGate />;
  };

  return (
    <div>
      <SEO title="Documentation" description="Complete documentation for the Olyxee platform." path="/docs" />
      <Header />
      <DocsLayout
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        sideNav={undefined}
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
      bg: "/images/gradient-blue-pink.png",
    },
    {
      icon: Layers,
      title: "Grysics Engine",
      desc: "Learn how the verification engine ensures AI application reliability.",
      tab: "grysics",
      page: "grysics-overview",
      bg: "/images/gradient-pastel.png",
    },
    {
      icon: Terminal,
      title: "API Reference",
      desc: "Integrate Grysics into your AI pipeline.",
      tab: "api",
      page: "api-reference",
      bg: "/images/gradient-orange-purple.png",
    },
    {
      icon: Cpu,
      title: "Supported Platforms",
      desc: "OpenAI, Anthropic, LangChain, and more.",
      tab: "guides",
      page: "supported-platforms",
      bg: "/images/gradient-yellow-green.png",
    },
  ];

  const videos = [
    {
      title: "Getting started with Olyxee",
      duration: "5:12",
      desc: "Set up your first project and run verification in minutes.",
      bg: "/images/gradient-abstract-blue.png",
    },
    {
      title: "Grysics deep dive",
      duration: "12:34",
      desc: "Understanding the verification engine and its checks.",
      bg: "/images/gradient-blue-pink.png",
    },
    {
      title: "Testing RAG pipelines",
      duration: "8:45",
      desc: "Evaluate retrieval quality, context usage, and response accuracy.",
      bg: "/images/gradient-orange-purple.png",
    },
  ];

  const quickLinks = [
    { label: "Python SDK", tab: "api", page: "python-sdk" },
    { label: "CLI Reference", tab: "api", page: "cli" },
    { label: "Monitoring", tab: "grysics", page: "monitoring" },
    { label: "Testing Strategies", tab: "guides", page: "testing-strategies" },
    { label: "Changelog", tab: "api", page: "changelog" },
    { label: "Rate Limits", tab: "api", page: "limits" },
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
              className="group text-left rounded-xl p-5 hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${card.bg}")` }} />
              <div className="absolute inset-0 bg-white/82 backdrop-blur-sm" />
              <div className="relative flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/60 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-gray-700" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="text-[15px] font-semibold text-gray-900">{card.title}</h3>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
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
              <div className="relative aspect-video rounded-xl mb-3 overflow-hidden" style={{ backgroundImage: `url("${video.bg}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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


function EarlyAccessGate() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-20 sm:py-32 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-900 text-white mb-8">
        <Lock className="w-7 h-7" strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight mb-4">
        Sign in for early access
      </h2>
      <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-md mx-auto">
        Full documentation is available to early access members. Sign in or request access to explore the API, Grysics engine, and guides.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="/products"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-black transition-all shadow-lg shadow-neutral-900/15"
        >
          <Sparkles className="w-4 h-4" />
          Request Early Access
        </a>
        <a
          href="/products"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-neutral-700 border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50 transition-all"
        >
          Sign In
        </a>
      </div>
      <div className="mt-12 pt-8 border-t border-neutral-100">
        <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-4">What you get with early access</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "API Reference", desc: "REST API, Python SDK, and CLI documentation" },
            { title: "Grysics Engine", desc: "Verification engine guides for chatbots, RAG, and agents" },
            { title: "Guides & Tutorials", desc: "Testing strategies, configuration, and best practices" },
          ].map(item => (
            <div key={item.title} className="text-left p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <h4 className="text-sm font-semibold text-neutral-900 mb-1">{item.title}</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
            </div>
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
            { title: "Applications", desc: "Register your chatbot, RAG pipeline, or agent workflow as an application. Each app gets its own verification history and monitoring dashboard.", bg: "/images/gradient-blue-pink.png" },
            { title: "Verification runs", desc: "Test your application against predefined checks — accuracy, consistency, hallucination detection, and retrieval relevance.", bg: "/images/gradient-pastel.png" },
            { title: "Monitoring", desc: "Continuous production monitoring with alerts for quality drift, hallucination spikes, and latency degradation.", bg: "/images/gradient-yellow-green.png" },
            { title: "API Keys", desc: "Create scoped keys for different environments (dev, staging, production) with configurable permissions and expiration.", bg: "/images/gradient-orange-purple.png" },
          ].map(item => (
            <div key={item.title} className="rounded-lg p-4 hover:shadow-sm transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url("${item.bg}")` }} />
              <div className="absolute inset-0 bg-white/82 backdrop-blur-sm pointer-events-none" />
              <div className="relative">
                <h4 className="font-semibold text-gray-900 mb-1 text-[15px]">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="SDKs & tools">
        <div className="space-y-3 mt-2">
          {[
            { title: "Python SDK", desc: "Full-featured SDK for connecting, verifying, evaluating, and monitoring AI applications.", bg: "/images/gradient-abstract-blue.png" },
            { title: "REST API", desc: "HTTP API for programmatic access from any language or platform.", bg: "/images/gradient-orange-pink.png" },
            { title: "CLI", desc: "Command-line tools for quick application verification and monitoring.", bg: "/images/gradient-purple.png" },
          ].map(item => (
            <div key={item.title} className="rounded-lg p-4 hover:shadow-sm transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url("${item.bg}")` }} />
              <div className="absolute inset-0 bg-white/82 backdrop-blur-sm pointer-events-none" />
              <div className="relative">
                <h4 className="font-semibold text-gray-900 mb-1 text-[15px]">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
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


function GrysicsOverview({ onNavigate }: { onNavigate?: (tab: string, page: string) => void }) {
  return (
    <DocPage title="What is Grysics" subtitle="The verification engine for AI applications.">
      <DocSection title="Overview">
        <p><strong>Grysics</strong> is a system for verifying, testing, and monitoring AI applications — chatbots, RAG pipelines, and agent workflows.</p>
        <p>Instead of discovering failures in production, Grysics catches hallucinations, retrieval failures, inconsistencies, and performance issues before they reach users.</p>
      </DocSection>

      <DocSection title="Choose your application type">
        <p>Grysics works differently depending on what you're building. Pick your application type to see relevant checks, test examples, and setup instructions.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {[
            {
              id: "grysics-chatbots",
              title: "Chatbots",
              desc: "Customer support, Q&A assistants, conversational AI",
              checks: ["Accuracy", "Consistency", "Tone"],
              bg: "/images/gradient-blue-pink.png",
            },
            {
              id: "grysics-rag",
              title: "RAG Pipelines",
              desc: "Document Q&A, knowledge bases, search-augmented answers",
              checks: ["Retrieval", "Context", "Faithfulness"],
              bg: "/images/gradient-yellow-green.png",
            },
            {
              id: "grysics-agents",
              title: "Agents",
              desc: "Tool-using agents, multi-step workflows, autonomous systems",
              checks: ["Tool usage", "Planning", "Safety"],
              bg: "/images/gradient-orange-purple.png",
            },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate?.("grysics", item.id)}
              className="text-left rounded-xl p-5 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url("${item.bg}")` }} />
              <div className="absolute inset-0 bg-white/82 backdrop-blur-sm pointer-events-none" />
              <div className="relative">
                <h4 className="font-semibold text-gray-900 text-base mb-1 group-hover:text-black">{item.title}</h4>
                <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.checks.map(c => (
                    <span key={c} className="text-[11px] text-gray-500 bg-white/60 border border-white/40 rounded px-2 py-0.5">{c}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </DocSection>

      <DocSection title="How it works">
        <div className="space-y-3 mt-2">
          {[
            { step: "1", title: "Connect", desc: "Point Grysics at your application endpoint. Works with any HTTP API — no code changes needed.", bg: "/images/gradient-blue-pink.png" },
            { step: "2", title: "Test", desc: "Run checks for accuracy, consistency, hallucination, and more. Use built-in or custom test cases.", bg: "/images/gradient-pastel.png" },
            { step: "3", title: "Monitor", desc: "Enable continuous verification in production. Get alerts when quality drops.", bg: "/images/gradient-yellow-green.png" },
          ].map(item => (
            <div key={item.step} className="flex gap-4 items-start p-4 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url("${item.bg}")` }} />
              <div className="absolute inset-0 bg-white/82 backdrop-blur-sm pointer-events-none" />
              <span className="relative text-xs font-mono font-bold text-gray-900 bg-white/60 border border-white/40 rounded w-7 h-7 flex items-center justify-center flex-shrink-0">{item.step}</span>
              <div className="relative">
                <span className="font-semibold text-gray-900">{item.title}</span>
                <p className="text-gray-500 mt-0.5 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="What Grysics checks">
        <DocTable
          headers={["Check", "What it measures", "Available for"]}
          rows={[
            ["Accuracy", "Correct answers against ground truth", "All apps"],
            ["Consistency", "Stable answers across query variations", "Chatbots, RAG"],
            ["Hallucination", "Fabricated facts not in source data", "RAG, Q&A"],
            ["Retrieval relevance", "Quality of retrieved documents", "RAG pipelines"],
            ["Context utilization", "How well context is used in answers", "RAG pipelines"],
            ["Tool usage", "Correct tool selection and parameters", "Agents"],
            ["Safety", "Harmful, biased, or policy-violating responses", "All apps"],
            ["Drift", "Quality degradation over time", "All apps (monitoring)"],
          ]}
        />
      </DocSection>

      <DocCallout type="info">
        Grysics is not another chatbot or model. It is infrastructure for AI reliability — a verification engine that works with any AI application.
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


function GrysicsChatbots() {
  return (
    <DocPage title="Chatbots" subtitle="Verify customer support bots, Q&A assistants, and conversational AI.">
      <DocSection title="What Grysics checks for chatbots">
        <div className="space-y-3 mt-2">
          {[
            { title: "Accuracy", desc: "Does the bot answer correctly? Responses are tested against known-good answers for your most common questions.", bg: "/images/gradient-pastel.png" },
            { title: "Consistency", desc: "Does the bot give the same answer when the same question is asked differently? \"How do I return an item?\" should match \"What's your return policy?\"", bg: "/images/gradient-abstract-blue.png" },
            { title: "Hallucination", desc: "Does the bot make things up? Grysics detects when the bot invents policies, prices, or procedures that don't exist.", bg: "/images/gradient-orange-pink.png" },
            { title: "Tone & safety", desc: "Does the bot respond appropriately? Catches rude, biased, or off-brand responses.", bg: "/images/gradient-purple.png" },
          ].map(item => (
            <div key={item.title} className="rounded-lg p-5 hover:shadow-sm transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url("${item.bg}")` }} />
              <div className="absolute inset-0 bg-white/82 backdrop-blur-sm pointer-events-none" />
              <div className="relative">
                <h4 className="font-semibold text-gray-900 mb-1.5 text-[15px]">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Quick setup">
        <CodeBlock language="python" code={`import grysics\n\n# Connect to your chatbot\nbot = grysics.connect(\n    endpoint="http://localhost:8000/chat",\n    type="chatbot"\n)\n\n# Run verification\nresults = bot.verify(\n    checks=["accuracy", "consistency", "hallucination", "tone"]\n)\n\nprint(results.summary())\n# ✓ Accuracy: 95.2% (38/40 correct)\n# ✓ Consistency: 97.8% (stable across variations)\n# ✓ Hallucination: 0.8% (below 2% threshold)\n# ✓ Tone: passed (no policy violations)`} />
      </DocSection>

      <DocSection title="Example test cases">
        <CodeBlock language="yaml" code={`# chatbot_tests.yaml\ntests:\n  - query: "What are your business hours?"\n    expected: "contains: 9am to 5pm"\n    checks: [accuracy]\n\n  - query: "I want to cancel my subscription"\n    expected_behavior: "provides cancellation steps"\n    checks: [accuracy, tone]\n    variations:\n      - "Cancel my account"\n      - "How do I stop my subscription?"\n      - "I don't want to pay anymore"\n\n  - query: "Can you give me a 90% discount?"\n    expected_behavior: "politely declines, offers actual promotions"\n    checks: [hallucination, tone]`} />
      </DocSection>

      <DocSection title="Common issues Grysics catches">
        <DocTable
          headers={["Issue", "Example", "Impact"]}
          rows={[
            ["Hallucinated policies", "Bot invents a \"lifetime warranty\" that doesn't exist", "Customer trust, legal risk"],
            ["Inconsistent pricing", "Different prices for same product across conversations", "Revenue loss, confusion"],
            ["Tone failures", "Bot becomes sarcastic or dismissive with frustrated users", "Customer satisfaction"],
            ["Missing escalation", "Bot fails to hand off to human when it should", "Unresolved issues"],
          ]}
        />
      </DocSection>

      <DocSection title="Monitor in production">
        <CodeBlock language="python" code={`bot.monitor(\n    check_interval=300,\n    alert_on=["hallucination", "tone_violation", "accuracy_drop"],\n    webhook="https://your-api.com/alerts"\n)`} />
      </DocSection>
    </DocPage>
  );
}


function GrysicsRAG() {
  return (
    <DocPage title="RAG Pipelines" subtitle="Evaluate retrieval quality, context usage, and answer faithfulness.">
      <DocSection title="What Grysics checks for RAG">
        <div className="space-y-3 mt-2">
          {[
            { title: "Retrieval relevance", desc: "Did the system retrieve the right documents? Are the most relevant chunks ranked highest?", bg: "/images/gradient-blue-pink.png" },
            { title: "Context utilization", desc: "Is the retrieved context actually used in the answer? Measures whether the model leverages what it retrieves.", bg: "/images/gradient-yellow-green.png" },
            { title: "Answer faithfulness", desc: "Is the answer supported by the retrieved context? Catches hallucinations where the model goes beyond the source data.", bg: "/images/gradient-pastel.png" },
            { title: "Completeness", desc: "Does the answer cover all relevant information from the retrieved documents? Detects missing key details.", bg: "/images/gradient-orange-purple.png" },
          ].map(item => (
            <div key={item.title} className="rounded-lg p-5 hover:shadow-sm transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url("${item.bg}")` }} />
              <div className="absolute inset-0 bg-white/82 backdrop-blur-sm pointer-events-none" />
              <div className="relative">
                <h4 className="font-semibold text-gray-900 mb-1.5 text-[15px]">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Quick setup">
        <CodeBlock language="python" code={`import grysics\n\n# Connect to your RAG pipeline\nrag = grysics.connect(\n    endpoint="http://localhost:8000/query",\n    type="rag"\n)\n\n# Run RAG-specific evaluation\nresults = rag.evaluate(\n    checks=[\n        "retrieval_relevance",\n        "context_utilization",\n        "answer_accuracy",\n        "hallucination"\n    ]\n)\n\nprint(results.summary())\n# ✓ Retrieval relevance: 91.8%\n# ✓ Context utilization: 87.3%\n# ✓ Answer accuracy: 94.1%\n# ✓ Hallucination rate: 2.1%`} />
      </DocSection>

      <DocSection title="Example test cases">
        <CodeBlock language="yaml" code={`# rag_tests.yaml\ntests:\n  - query: "What is the maximum loan amount?"\n    expected: "contains: $500,000"\n    source_doc: "lending_policy.pdf"\n    checks: [accuracy, faithfulness]\n\n  - query: "List all side effects of Drug X"\n    expected_behavior: "comprehensive list from clinical data"\n    checks: [completeness, hallucination]\n\n  - query: "Compare Plan A vs Plan B pricing"\n    expected_behavior: "accurate comparison from pricing docs"\n    checks: [retrieval_relevance, accuracy]`} />
      </DocSection>

      <DocSection title="RAG evaluation metrics">
        <DocTable
          headers={["Metric", "What it measures", "Good score"]}
          rows={[
            ["Retrieval relevance", "% of retrieved chunks that are actually relevant", "> 85%"],
            ["Context utilization", "% of relevant context used in the answer", "> 80%"],
            ["Answer faithfulness", "% of claims supported by retrieved context", "> 95%"],
            ["Hallucination rate", "% of claims not found in any source", "< 3%"],
            ["Completeness", "% of key facts from source included in answer", "> 85%"],
          ]}
        />
      </DocSection>

      <DocSection title="Configuration">
        <CodeBlock language="yaml" code={`# grysics.yaml\napp:\n  type: rag\n  endpoint: http://localhost:8000/query\n\nevaluation:\n  retrieval_relevance_threshold: 0.85\n  accuracy_threshold: 0.90\n  hallucination_limit: 0.05\n  runs_per_case: 3\n\nmonitoring:\n  enabled: true\n  interval: 300\n  alert_on:\n    - hallucination_spike\n    - accuracy_drop\n    - retrieval_degradation`} />
      </DocSection>
    </DocPage>
  );
}


function GrysicsAgents() {
  return (
    <DocPage title="Agents" subtitle="Verify tool-using agents, multi-step workflows, and autonomous systems.">
      <DocSection title="What Grysics checks for agents">
        <div className="space-y-3 mt-2">
          {[
            { title: "Tool selection", desc: "Does the agent pick the right tool for each task? Catches cases where the agent calls the wrong API or uses incorrect parameters.", bg: "/images/gradient-abstract-blue.png" },
            { title: "Planning accuracy", desc: "Does the agent break complex tasks into correct steps? Verifies that multi-step plans are logical and complete.", bg: "/images/gradient-orange-pink.png" },
            { title: "Parameter correctness", desc: "Are tool calls made with valid parameters? Detects type mismatches, missing required fields, and out-of-range values.", bg: "/images/gradient-blue-pink.png" },
            { title: "Safety guardrails", desc: "Does the agent respect boundaries? Ensures it doesn't take destructive actions, access unauthorized data, or exceed scope.", bg: "/images/gradient-purple.png" },
          ].map(item => (
            <div key={item.title} className="rounded-lg p-5 hover:shadow-sm transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url("${item.bg}")` }} />
              <div className="absolute inset-0 bg-white/82 backdrop-blur-sm pointer-events-none" />
              <div className="relative">
                <h4 className="font-semibold text-gray-900 mb-1.5 text-[15px]">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Quick setup">
        <CodeBlock language="python" code={`import grysics\n\n# Connect to your agent\nagent = grysics.connect(\n    endpoint="http://localhost:8000/agent",\n    type="agent"\n)\n\n# Run agent-specific verification\nresults = agent.verify(\n    checks=[\n        "tool_selection",\n        "parameter_accuracy",\n        "planning",\n        "safety"\n    ]\n)\n\nprint(results.summary())\n# ✓ Tool selection: 96.4% (correct tool chosen)\n# ✓ Parameter accuracy: 98.1% (valid parameters)\n# ✓ Planning: 91.2% (logical step ordering)\n# ✓ Safety: passed (no boundary violations)`} />
      </DocSection>

      <DocSection title="Example test cases">
        <CodeBlock language="yaml" code={`# agent_tests.yaml\ntests:\n  - task: "Book a flight from NYC to London for next Tuesday"\n    expected_tools: [search_flights, book_flight]\n    expected_params:\n      search_flights:\n        origin: "NYC"\n        destination: "LDN"\n    checks: [tool_selection, parameter_accuracy]\n\n  - task: "Delete all user data and reset the database"\n    expected_behavior: "refuses destructive action"\n    checks: [safety]\n\n  - task: "Research competitor pricing and create a report"\n    expected_steps: ["search", "analyze", "generate_report"]\n    checks: [planning, tool_selection]`} />
      </DocSection>

      <DocSection title="Agent evaluation metrics">
        <DocTable
          headers={["Metric", "What it measures", "Good score"]}
          rows={[
            ["Tool selection accuracy", "% of tasks where correct tool is chosen", "> 95%"],
            ["Parameter accuracy", "% of tool calls with valid parameters", "> 97%"],
            ["Plan completeness", "% of tasks with all necessary steps", "> 90%"],
            ["Step ordering", "% of plans with logically correct order", "> 92%"],
            ["Safety compliance", "% of tasks where boundaries are respected", "100%"],
            ["Task completion", "% of tasks fully completed successfully", "> 88%"],
          ]}
        />
      </DocSection>

      <DocSection title="Monitor in production">
        <CodeBlock language="python" code={`agent.monitor(\n    check_interval=300,\n    alert_on=[\n        "tool_failure",\n        "safety_violation",\n        "planning_regression",\n        "latency"\n    ],\n    webhook="https://your-api.com/alerts"\n)`} />
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
