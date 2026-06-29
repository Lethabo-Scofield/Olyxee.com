import { useState, useEffect, FC, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import SEO from "../components/SEO";
import DocsLayout from "../layouts/DocsLayout";
import Header from '../components/header';
import { ArrowLeft, ChevronRight, ExternalLink } from "lucide-react";

const TABS: { id: string; label: string }[] = [];

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

const ORDO_SIDE_NAV = [
  {
    heading: "Overview",
    items: [
      { id: "ordo-overview", title: "What is Orgni Workflows" },
    ],
  },
  {
    heading: "By application",
    items: [
      { id: "ordo-chatbots", title: "Chatbots" },
      { id: "ordo-rag", title: "RAG Pipelines" },
      { id: "ordo-agents", title: "Agents" },
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
  ordo: "ordo-overview",
  guides: "supported-platforms",
};

const SIDE_NAVS: Record<string, typeof API_SIDE_NAV> = {
  api: API_SIDE_NAV,
  ordo: ORDO_SIDE_NAV,
  guides: GUIDES_SIDE_NAV,
};

const Docs: FC = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [activePage, setActivePage] = useState("api-overview");
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { tab, page } = router.query;
    if (typeof tab === "string") {
      setActiveTab(tab);
      if (typeof page === "string") setActivePage(page);
      else if (TAB_DEFAULTS[tab]) setActivePage(TAB_DEFAULTS[tab]);
    }
  }, [router.isReady, router.query]);

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
      <SEO title="Documentation" description="Developer documentation for the Olyxee platform: API reference, SDKs, quickstarts, and guides for Orgni Workflows verification, deployment, and monitoring." path="/docs" keywords={["Olyxee documentation", "Olyxee API", "Orgni Workflows docs", "AI verification API", "SDK", "developer guides"]} />
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


type ProductRow = {
  name: string;
  description: string;
  status: "available" | "private" | "early-access";
  bg: string;
  action:
    | { kind: "external"; href: string; label: string }
    | { kind: "internal"; href: string; label: string }
    | { kind: "internal-tab"; tab: string; page: string; label: string };
};

function DocsHome({ onNavigate }: { onNavigate: (tab: string, page: string) => void }) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  const products: ProductRow[] = [
    {
      name: "Orgni Workflows",
      description: "Orgni Workflows is Olyxee's workflow execution system for business operations. It connects AI reasoning with business systems, APIs, databases, approvals, rules, and process state.",
      status: "early-access",
      bg: "/images/gradient-blue-pink.webp",
      action: { kind: "external", href: "https://workflow.olyxee.com", label: "Visit Orgni Workflows" },
    },
    {
      name: "Orgni Finance",
      description: "Orgni Finance is Olyxee's financial reconciliation and data integrity engine. It helps finance teams compare, validate, and reconcile bank statements, ledgers, and accounting records with traceable evidence.",
      status: "available",
      bg: "/images/gradient-pastel.webp",
      action: { kind: "external", href: "https://finance.olyxee.com", label: "Visit Orgni Finance" },
    },
    {
      name: "Togent",
      description: "Togent is Olyxee's context optimization and control layer for AI agents. It helps teams track, store, compress, and reuse context across tools such as Cursor, Claude, Codex, and internal copilots.",
      status: "private",
      bg: "/images/gradient-abstract-blue.webp",
      action: { kind: "internal", href: "/enterprise", label: "Learn about Togent" },
    },
  ];

  const solutions: ProductRow[] = [
    {
      name: "Order Loop",
      description: "Order Loop is a customer communication and tracking solution. It helps teams send order, delivery, collection, and shipment updates through SMS, web pages, and system integrations.",
      status: "available",
      bg: "/images/gradient-yellow-green.webp",
      action: { kind: "external", href: "https://logistics.olyxee.com/", label: "Visit Order Loop" },
    },
    {
      name: "Olyxee Document Integrity",
      description: "Olyxee Document Integrity helps organizations extract structured information, validate documents, detect inconsistencies, and support trusted decisions from business documents.",
      status: "private",
      bg: "/images/gradient-orange-purple.webp",
      action: { kind: "internal", href: "/document-integrity", label: "View status" },
    },
    {
      name: "Enterprise Automation",
      description: "Enterprise Automation helps organizations automate workflows, approvals, business rules, data movement, and process execution across systems.",
      status: "private",
      bg: "/images/gradient-blue.webp",
      action: { kind: "internal", href: "/enterprise", label: "Learn more" },
    },
  ];

  const resources = [
    { label: "API Reference", tab: "api", page: "api-reference" },
    { label: "Python SDK", tab: "api", page: "python-sdk" },
    { label: "CLI Reference", tab: "api", page: "cli" },
    { label: "Supported Platforms", tab: "guides", page: "supported-platforms" },
    { label: "Testing Strategies", tab: "guides", page: "testing-strategies" },
    { label: "Changelog", tab: "api", page: "changelog" },
  ];

  const statusLabel: Record<ProductRow["status"], string> = {
    available: "Available",
    "early-access": "Early access",
    private: "Private",
  };

  const renderRow = (product: ProductRow) => {
    const isExternal = product.action.kind === "external";
    const inner = (
      <div className="flex items-start gap-5 py-6 group">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden ring-1 ring-neutral-200 shrink-0">
          <Image
            src={product.bg}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
            aria-hidden
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-1.5">
            <h3 className="text-[15px] font-medium text-neutral-900 tracking-tight">
              {product.name}
            </h3>
            <span className="text-[11px] text-neutral-400">
              {statusLabel[product.status]}
            </span>
          </div>
          <p className="text-[14px] text-neutral-500 leading-relaxed max-w-2xl">
            {product.description}
          </p>
        </div>
        <div className="shrink-0 inline-flex items-center gap-1 text-[13px] text-neutral-500 group-hover:text-neutral-900 transition-colors pt-1">
          <span className="hidden sm:inline">{product.action.label}</span>
          {isExternal ? (
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
          ) : (
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          )}
        </div>
      </div>
    );

    if (product.action.kind === "external") {
      return (
        <a key={product.name} href={product.action.href} target="_blank" rel="noopener noreferrer" className="block border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/60 -mx-4 px-4 transition-colors">
          {inner}
        </a>
      );
    }
    if (product.action.kind === "internal") {
      return (
        <Link key={product.name} href={product.action.href} className="block border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/60 -mx-4 px-4 transition-colors">
          {inner}
        </Link>
      );
    }
    const tab = product.action.tab;
    const page = product.action.page;
    return (
      <button key={product.name} type="button" onClick={() => onNavigate(tab, page)} className="block w-full text-left border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/60 -mx-4 px-4 transition-colors">
        {inner}
      </button>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Back button */}
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-1.5 text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors mb-12"
      >
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
        Back
      </button>

      {/* Header */}
      <div className="mb-14">
        <h1 className="text-[34px] sm:text-[40px] font-semibold text-neutral-900 tracking-[-0.02em] leading-[1.1] mb-4">
          Olyxee documentation
        </h1>
        <p className="text-neutral-600 text-[17px] leading-[1.55]">
          Olyxee provides AI research and infrastructure for organizations that need reliable execution across documents, workflows, finance, logistics, and business systems. Our products create the context, control, and execution layer around AI models, while our solutions package that infrastructure around specific operational problems.
        </p>
      </div>

      {/* Access notice */}
      <p className="mb-14 text-[14px] text-neutral-500 leading-relaxed">
        Some API documentation is private or limited to approved enterprise partners.{" "}
        <a href="/contact" className="text-neutral-900 underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-900">
          Contact us
        </a>{" "}
        to request access.
      </p>

      {/* Products */}
      <section className="mb-16">
        <h2 className="text-[13px] font-semibold text-neutral-900 uppercase tracking-wider mb-3">
          Products
        </h2>
        <div className="border-t border-neutral-100">
          {products.map(renderRow)}
        </div>
      </section>

      {/* Solutions */}
      <section className="mb-16">
        <h2 className="text-[13px] font-semibold text-neutral-900 uppercase tracking-wider mb-3">
          Solutions
        </h2>
        <div className="border-t border-neutral-100">
          {solutions.map(renderRow)}
        </div>
      </section>

      {/* Resources */}
      <section className="mb-16">
        <h2 className="text-[13px] font-semibold text-neutral-900 uppercase tracking-wider mb-3">
          Technical resources
        </h2>
        <ul className="border-t border-neutral-100">
          {resources.map((link) => (
            <li key={link.page} className="border-b border-neutral-100 last:border-b-0">
              <button
                type="button"
                onClick={() => onNavigate(link.tab, link.page)}
                className="w-full flex items-center justify-between py-3.5 -mx-4 px-4 text-[14px] text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50/60 transition-colors group"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 group-hover:translate-x-0.5 transition-all" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer note */}
      <div className="border-t border-neutral-100 pt-8">
        <p className="text-[12px] text-neutral-400 leading-relaxed">
          Olyxee, Research and Infrastructure for Artificial Intelligence. Documentation, schemas, and APIs are continuously evolving; some surfaces are intentionally gated while they stabilize for production use.
        </p>
      </div>
    </div>
  );
}


function EarlyAccessGate() {
  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
      <h2 className="text-[28px] sm:text-[32px] font-semibold text-neutral-900 tracking-[-0.02em] mb-4">
        Sign in for early access
      </h2>
      <p className="text-[16px] text-neutral-600 leading-relaxed mb-8 max-w-lg">
        Full documentation is available to early access members. Sign in or request access to explore the API, the Orgni Workflows execution engine, and guides.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mb-14">
        <a
          href="/signup"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-neutral-900 text-white rounded-full text-[14px] font-medium hover:bg-black transition-colors"
        >
          Request early access
        </a>
        <a
          href="/signup"
          className="inline-flex items-center justify-center px-5 py-2.5 text-neutral-900 border border-neutral-200 rounded-full text-[14px] font-medium hover:bg-neutral-50 transition-colors"
        >
          Sign in
        </a>
      </div>
      <div className="border-t border-neutral-100 pt-8">
        <h3 className="text-[13px] font-semibold text-neutral-900 uppercase tracking-wider mb-4">
          What you get
        </h3>
        <ul className="space-y-5">
          {[
            { title: "API Reference", desc: "REST API, Python SDK, and CLI documentation." },
            { title: "Orgni Workflows Engine", desc: "AI execution engine for finance, compliance, and operations." },
            { title: "Guides & Tutorials", desc: "Testing strategies, configuration, and best practices." },
          ].map(item => (
            <li key={item.title}>
              <h4 className="text-[14px] font-medium text-neutral-900 mb-0.5">{item.title}</h4>
              <p className="text-[14px] text-neutral-500 leading-relaxed">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


function APIOverview() {
  return (
    <DocPage title="API Overview" subtitle="Integrate Orgni Workflows into your operational workflows with our Python SDK, REST API, and CLI tools.">
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
            { title: "Goals", desc: "Define business goals that Orgni Workflows will plan and execute. Each goal gets its own execution history and audit trail.", bg: "/images/gradient-blue-pink.webp" },
            { title: "Execution runs", desc: "Orgni Workflows breaks goals into steps and executes them across your connected systems including ERP, databases, spreadsheets, and more.", bg: "/images/gradient-pastel.webp" },
            { title: "Monitoring", desc: "Full visibility into every action taken. Approval workflows let you set human checkpoints at any stage.", bg: "/images/gradient-yellow-green.webp" },
            { title: "API Keys", desc: "Create scoped keys for different environments (dev, staging, production) with configurable permissions and expiration.", bg: "/images/gradient-orange-purple.webp" },
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
            { title: "Python SDK", desc: "Full-featured SDK for defining goals, triggering execution, and retrieving results.", bg: "/images/gradient-abstract-blue.webp" },
            { title: "REST API", desc: "HTTP API for programmatic access from any language or platform.", bg: "/images/gradient-orange-pink.webp" },
            { title: "CLI", desc: "Command-line tools for quick goal execution and workflow management.", bg: "/images/gradient-purple.webp" },
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
    <DocPage title="Quickstart" subtitle="Get up and running with Orgni Workflows in under five minutes.">
      <DocSection title="1. Install the SDK">
        <p>Install the Orgni Workflows Python SDK:</p>
        <CodeBlock language="bash" code="pip install ordo" />
      </DocSection>

      <DocSection title="2. Initialize a project">
        <CodeBlock language="bash" code={`ordo init my-project\ncd my-project`} />
      </DocSection>

      <DocSection title="3. Define your goal">
        <p>Describe the business outcome you need:</p>
        <CodeBlock language="python" code={`import ordo\n\ngoal = ordo.goal(\n    description="Reconcile Q1 financial transactions",\n    systems=["erp", "bank"]  # connected data sources\n)`} />
      </DocSection>

      <DocSection title="4. Execute">
        <p>Run the goal and get results:</p>
        <CodeBlock language="python" code={`result = goal.execute()\n\nprint(result.summary())\n# ✓ Records processed: 847\n# ✓ Discrepancies found: 3 (2 resolved automatically)\n# ✓ Variance identified: $12.4K\n# ✓ Execution time: 2m 14s`} />
      </DocSection>

      <DocSection title="5. Review audit trail">
        <p>Every action is logged and traceable:</p>
        <CodeBlock language="python" code={`result.audit_trail(\n    format="detailed",\n    include=["inputs", "outputs", "timestamps"]\n)\n\nprint("Audit trail exported")`} />
      </DocSection>

      <DocCallout type="info">
        For detailed execution options, see the <strong>Use Cases</strong> section under Orgni Workflows.
      </DocCallout>
    </DocPage>
  );
}


function APIKeys() {
  return (
    <DocPage title="API Keys" subtitle="Create and manage API keys for authenticating with the Orgni Workflows platform.">
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
            "Copy the key. It will only be shown once",
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-xs font-mono font-bold text-gray-900 bg-gray-100 border border-gray-200 rounded px-2 py-0.5 flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-gray-600">{step}</p>
            </div>
          ))}
        </div>
        <DocCallout type="warning">
          API keys are shown only once at creation. Store them securely. You cannot retrieve the full key later.
        </DocCallout>
      </DocSection>

      <DocSection title="Generate a key via API">
        <CodeBlock language="bash" code={`curl -X POST https://api.olyxee.com/v1/api-keys \\\n  -H "Authorization: Bearer oly_sk_..." \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "name": "CI Pipeline Key",\n    "type": "restricted",\n    "permissions": ["apps:read", "verify:write"],\n    "expires_in": "90d"\n  }'`} />
        <p>Response:</p>
        <CodeBlock language="json" code={`{\n  "object": "api_key",\n  "id": "key_abc123",\n  "name": "CI Pipeline Key",\n  "key": "oly_rk_live_abc123...xyz",\n  "type": "restricted",\n  "permissions": ["apps:read", "verify:write"],\n  "created_at": "2025-01-15T10:30:00Z",\n  "expires_at": "2025-04-15T10:30:00Z"\n}`} />
      </DocSection>

      <DocSection title="Generate a key via SDK">
        <CodeBlock language="python" code={`import ordo\n\nkey = ordo.api_keys.create(\n    name="Production Monitor",\n    type="restricted",\n    permissions=["apps:read", "monitor:write", "metrics:read"],\n    expires_in="180d"\n)\n\nprint(f"Key: {key.secret}")  # Only available at creation\nprint(f"ID: {key.id}")\nprint(f"Expires: {key.expires_at}")`} />
      </DocSection>

      <DocSection title="List keys">
        <CodeBlock language="bash" code={`curl https://api.olyxee.com/v1/api-keys \\\n  -H "Authorization: Bearer oly_sk_..."`} />
        <CodeBlock language="json" code={`{\n  "object": "list",\n  "data": [\n    {\n      "id": "key_abc123",\n      "name": "CI Pipeline Key",\n      "type": "restricted",\n      "last_four": "xyz0",\n      "last_used_at": "2025-01-15T09:12:00Z",\n      "expires_at": "2025-04-15T10:30:00Z",\n      "status": "active"\n    }\n  ]\n}`} />
      </DocSection>

      <DocSection title="Revoke a key">
        <CodeBlock language="bash" code={`curl -X DELETE https://api.olyxee.com/v1/api-keys/key_abc123 \\\n  -H "Authorization: Bearer oly_sk_..."`} />
        <p>Or via the SDK:</p>
        <CodeBlock language="python" code={`ordo.api_keys.revoke("key_abc123")`} />
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
            "Set expiration dates on all keys. Rotate regularly",
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
    <DocPage title="Supported Platforms" subtitle="Systems and tools compatible with Orgni Workflows.">
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
        <p>Orgni Workflows works with finance, compliance, HR, and enterprise reporting workflows. Any system with an API or data export can be connected.</p>
        <DocCallout type="tip">
          For financial workflows, Orgni Workflows can execute the full pipeline: data extraction, reconciliation, report generation, and delivery, not just individual steps.
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


function OrdoOverview({ onNavigate }: { onNavigate?: (tab: string, page: string) => void }) {
  return (
    <DocPage title="What is Orgni Workflows" subtitle="The AI execution engine for business operations.">
      <DocSection title="Overview">
        <p><strong>Orgni Workflows</strong> is an AI execution engine that turns business goals into completed work. Describe what needs to be done, and Orgni Workflows plans, coordinates, and executes across your tools and systems.</p>
        <p>Instead of building complex automations or manual workflows, Orgni Workflows handles the full goal-to-delivery pipeline for finance, compliance, HR, and enterprise operations.</p>
      </DocSection>

      <DocSection title="Choose your use case">
        <p>Orgni Workflows handles different operational workflows. Pick your use case to see relevant capabilities and setup instructions.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {[
            {
              id: "ordo-chatbots",
              title: "Finance",
              desc: "Reconciliation, reporting, expense management",
              checks: ["Reconciliation", "Reporting", "Audit"],
              bg: "/images/gradient-blue-pink.webp",
            },
            {
              id: "ordo-rag",
              title: "Compliance",
              desc: "Audit-ready reports, regulatory reporting, data validation",
              checks: ["Validation", "Traceability", "Reports"],
              bg: "/images/gradient-yellow-green.webp",
            },
            {
              id: "ordo-agents",
              title: "Operations",
              desc: "HR workflows, cross-system reporting, data aggregation",
              checks: ["Execution", "Integration", "Delivery"],
              bg: "/images/gradient-orange-purple.webp",
            },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate?.("ordo", item.id)}
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
            { step: "1", title: "Describe", desc: "Define your business goal in plain language. Orgni Workflows interprets it and identifies the required systems and data.", bg: "/images/gradient-blue-pink.webp" },
            { step: "2", title: "Execute", desc: "Orgni Workflows plans and executes across your connected systems including ERP, databases, spreadsheets, and more.", bg: "/images/gradient-pastel.webp" },
            { step: "3", title: "Deliver", desc: "Results are delivered as reports, notifications, or audit trails. Every action is logged and traceable.", bg: "/images/gradient-yellow-green.webp" },
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

      <DocSection title="What Orgni Workflows checks">
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
        Orgni Workflows is not another chatbot or model. It is infrastructure for AI reliability: a verification engine that works with any AI application.
      </DocCallout>
    </DocPage>
  );
}


function Verification() {
  return (
    <DocPage title="Testing & Verification" subtitle="Deep dive into how Orgni Workflows tests AI applications.">
      <DocSection title="What Orgni Workflows tests">
        <p>Every AI application goes through structured verification:</p>
        <ul className="list-none pl-0 mt-3 space-y-2 text-gray-600">
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">Accuracy</strong>: responses are correct against known-answer test cases</span></li>
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">Consistency</strong>: same question asked multiple times produces stable answers</span></li>
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">Robustness</strong>: system handles edge cases, unusual queries, and adversarial inputs</span></li>
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">Hallucination detection</strong>: flags confident but incorrect or fabricated responses</span></li>
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


function OrdoChatbots() {
  return (
    <DocPage title="Chatbots" subtitle="Verify customer support bots, Q&A assistants, and conversational AI.">
      <DocSection title="What Orgni Workflows checks for chatbots">
        <div className="space-y-3 mt-2">
          {[
            { title: "Accuracy", desc: "Does the bot answer correctly? Responses are tested against known-good answers for your most common questions.", bg: "/images/gradient-pastel.webp" },
            { title: "Consistency", desc: "Does the bot give the same answer when the same question is asked differently? \"How do I return an item?\" should match \"What's your return policy?\"", bg: "/images/gradient-abstract-blue.webp" },
            { title: "Hallucination", desc: "Does the bot make things up? Orgni Workflows detects when the bot invents policies, prices, or procedures that don't exist.", bg: "/images/gradient-orange-pink.webp" },
            { title: "Tone & safety", desc: "Does the bot respond appropriately? Catches rude, biased, or off-brand responses.", bg: "/images/gradient-purple.webp" },
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
        <CodeBlock language="python" code={`import ordo\n\n# Connect to your chatbot\nbot = ordo.connect(\n    endpoint="http://localhost:8000/chat",\n    type="chatbot"\n)\n\n# Run verification\nresults = bot.verify(\n    checks=["accuracy", "consistency", "hallucination", "tone"]\n)\n\nprint(results.summary())\n# ✓ Accuracy: 95.2% (38/40 correct)\n# ✓ Consistency: 97.8% (stable across variations)\n# ✓ Hallucination: 0.8% (below 2% threshold)\n# ✓ Tone: passed (no policy violations)`} />
      </DocSection>

      <DocSection title="Example test cases">
        <CodeBlock language="yaml" code={`# chatbot_tests.yaml\ntests:\n  - query: "What are your business hours?"\n    expected: "contains: 9am to 5pm"\n    checks: [accuracy]\n\n  - query: "I want to cancel my subscription"\n    expected_behavior: "provides cancellation steps"\n    checks: [accuracy, tone]\n    variations:\n      - "Cancel my account"\n      - "How do I stop my subscription?"\n      - "I don't want to pay anymore"\n\n  - query: "Can you give me a 90% discount?"\n    expected_behavior: "politely declines, offers actual promotions"\n    checks: [hallucination, tone]`} />
      </DocSection>

      <DocSection title="Common issues Orgni Workflows catches">
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


function OrdoRAG() {
  return (
    <DocPage title="RAG Pipelines" subtitle="Evaluate retrieval quality, context usage, and answer faithfulness.">
      <DocSection title="What Orgni Workflows checks for RAG">
        <div className="space-y-3 mt-2">
          {[
            { title: "Retrieval relevance", desc: "Did the system retrieve the right documents? Are the most relevant chunks ranked highest?", bg: "/images/gradient-blue-pink.webp" },
            { title: "Context utilization", desc: "Is the retrieved context actually used in the answer? Measures whether the model leverages what it retrieves.", bg: "/images/gradient-yellow-green.webp" },
            { title: "Answer faithfulness", desc: "Is the answer supported by the retrieved context? Catches hallucinations where the model goes beyond the source data.", bg: "/images/gradient-pastel.webp" },
            { title: "Completeness", desc: "Does the answer cover all relevant information from the retrieved documents? Detects missing key details.", bg: "/images/gradient-orange-purple.webp" },
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
        <CodeBlock language="python" code={`import ordo\n\n# Connect to your RAG pipeline\nrag = ordo.connect(\n    endpoint="http://localhost:8000/query",\n    type="rag"\n)\n\n# Run RAG-specific evaluation\nresults = rag.evaluate(\n    checks=[\n        "retrieval_relevance",\n        "context_utilization",\n        "answer_accuracy",\n        "hallucination"\n    ]\n)\n\nprint(results.summary())\n# ✓ Retrieval relevance: 91.8%\n# ✓ Context utilization: 87.3%\n# ✓ Answer accuracy: 94.1%\n# ✓ Hallucination rate: 2.1%`} />
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
        <CodeBlock language="yaml" code={`# ordo.yaml\napp:\n  type: rag\n  endpoint: http://localhost:8000/query\n\nevaluation:\n  retrieval_relevance_threshold: 0.85\n  accuracy_threshold: 0.90\n  hallucination_limit: 0.05\n  runs_per_case: 3\n\nmonitoring:\n  enabled: true\n  interval: 300\n  alert_on:\n    - hallucination_spike\n    - accuracy_drop\n    - retrieval_degradation`} />
      </DocSection>
    </DocPage>
  );
}


function OrdoAgents() {
  return (
    <DocPage title="Agents" subtitle="Verify tool-using agents, multi-step workflows, and autonomous systems.">
      <DocSection title="What Orgni Workflows checks for agents">
        <div className="space-y-3 mt-2">
          {[
            { title: "Tool selection", desc: "Does the agent pick the right tool for each task? Catches cases where the agent calls the wrong API or uses incorrect parameters.", bg: "/images/gradient-abstract-blue.webp" },
            { title: "Planning accuracy", desc: "Does the agent break complex tasks into correct steps? Verifies that multi-step plans are logical and complete.", bg: "/images/gradient-orange-pink.webp" },
            { title: "Parameter correctness", desc: "Are tool calls made with valid parameters? Detects type mismatches, missing required fields, and out-of-range values.", bg: "/images/gradient-blue-pink.webp" },
            { title: "Safety guardrails", desc: "Does the agent respect boundaries? Ensures it doesn't take destructive actions, access unauthorized data, or exceed scope.", bg: "/images/gradient-purple.webp" },
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
        <CodeBlock language="python" code={`import ordo\n\n# Connect to your agent\nagent = ordo.connect(\n    endpoint="http://localhost:8000/agent",\n    type="agent"\n)\n\n# Run agent-specific verification\nresults = agent.verify(\n    checks=[\n        "tool_selection",\n        "parameter_accuracy",\n        "planning",\n        "safety"\n    ]\n)\n\nprint(results.summary())\n# ✓ Tool selection: 96.4% (correct tool chosen)\n# ✓ Parameter accuracy: 98.1% (valid parameters)\n# ✓ Planning: 91.2% (logical step ordering)\n# ✓ Safety: passed (no boundary violations)`} />
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
        <p>Once an AI application is deployed, Orgni Workflows provides continuous monitoring that tracks response quality, consistency, and drift. When anomalies are detected, the system flags degradation and can trigger alerts before users are impacted.</p>
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
    <DocPage title="REST API" subtitle="Integrate Orgni Workflows into your AI application pipeline with the REST API.">
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
    <DocPage title="Python SDK" subtitle="Complete reference for the ordo Python package.">
      <DocSection title="Installation">
        <CodeBlock language="bash" code="pip install ordo" />
        <p>Requires Python 3.9+.</p>
      </DocSection>

      <DocSection title="ordo.connect()">
        <p>Connect to an AI application endpoint.</p>
        <CodeBlock language="python" code={`app = ordo.connect(\n    endpoint="http://localhost:8000/chat",\n    type="rag",\n    api_key="your-app-api-key"\n)`} />
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
        <p>Run Orgni Workflows verification against your AI application.</p>
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
    <DocPage title="CLI Reference" subtitle="Command-line tools for managing Orgni Workflows projects.">
      <DocSection title="Installation">
        <p>The CLI is included with the Python SDK:</p>
        <CodeBlock language="bash" code="pip install ordo" />
      </DocSection>

      <DocSection title="Commands">
        <CodeBlock language="bash" code={`ordo init <project>       # Initialize a new project\nordo connect <endpoint>   # Connect to an AI application\nordo verify               # Run verification tests\nordo evaluate             # Run RAG evaluation\nordo monitor start        # Enable continuous monitoring\nordo monitor status       # Check monitoring health\nordo metrics              # View latest metrics\nordo alerts               # List triggered alerts`} />
      </DocSection>

      <DocSection title="Examples">
        <CodeBlock language="bash" code={`# Connect to a chatbot and run verification\nordo connect http://localhost:8000/chat --type chatbot\nordo verify --checks accuracy,consistency,hallucination\n\n# Evaluate a RAG pipeline\nordo connect http://localhost:8000/query --type rag\nordo evaluate --checks retrieval,accuracy\n\n# Start monitoring with alerts\nordo monitor start --interval 300 --webhook https://hooks.slack.com/...`} />
      </DocSection>

      <DocSection title="Configuration">
        <p>The CLI reads from <InlineCode>ordo.yaml</InlineCode> in the project root. Command-line flags override file settings.</p>
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
    <DocPage title="Supported Platforms" subtitle="AI frameworks and platforms that Orgni Workflows integrates with.">
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
        <CodeBlock language="python" code={`import ordo\n\n# Connect to an OpenAI-powered chatbot\napp = ordo.connect(\n    endpoint="http://localhost:8000/chat",\n    type="chatbot"\n)\n\n# Connect to a LangChain RAG pipeline\napp = ordo.connect(\n    endpoint="http://localhost:8000/query",\n    type="rag",\n    framework="langchain"\n)`} />
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
      <DocSection title="ordo.yaml">
        <p>The project configuration file controls default settings:</p>
        <CodeBlock language="yaml" code={`project:\n  name: my-ai-project\n  version: 1.0.0\n\napplication:\n  endpoint: http://localhost:8000/chat\n  type: rag\n  framework: langchain\n\nverification:\n  checks:\n    - accuracy\n    - consistency\n    - hallucination\n  runs_per_case: 5\n  test_cases: ./tests/\n\nmonitoring:\n  enabled: true\n  interval: 300\n  alert_on:\n    - hallucination\n    - drift\n    - latency\n  webhook: https://your-api.com/alerts`} />
      </DocSection>

      <DocSection title="Environment variables">
        <DocTable
          headers={["Variable", "Description", "Required"]}
          rows={[
            ["ORDO_API_KEY", "API authentication key", "Yes"],
            ["ORDO_ORG_ID", "Organization identifier", "For teams"],
            ["ORDO_LOG_LEVEL", "Logging verbosity (debug, info, warn)", "No"],
            ["ORDO_CACHE_DIR", "Local cache directory", "No"],
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
            "General availability of Orgni Workflows verification engine",
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
        <DocSection key={release.version} title={`v${release.version} | ${release.date}`}>
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
        <CodeBlock language="python" code={`import time\nimport ordo\n\ndef verify_with_retry(app, max_retries=3):\n    for attempt in range(max_retries):\n        try:\n            return app.verify(\n                checks=["accuracy", "hallucination"]\n            )\n        except ordo.RateLimitError as e:\n            wait = 2 ** attempt\n            print(f"Rate limited. Retrying in {wait}s...")\n            time.sleep(wait)\n    raise Exception("Max retries exceeded")`} />
      </DocSection>
    </DocPage>
  );
}


const EARLY_ACCESS_ROLE_LABELS: Record<string, string> = {
  engineer: "ML / AI Engineer",
  devops: "DevOps / MLOps",
  manager: "Engineering Manager",
  founder: "Founder / CTO",
  researcher: "Researcher",
  other: "Other",
};

function EarlyAccessDoc() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim()) return setError("Please enter your work email.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return setError("Please enter a valid email address.");
    if (!company.trim()) return setError("Please enter your company name.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "api",
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          message: role ? `Role: ${EARLY_ACCESS_ROLE_LABELS[role] || role}` : undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error("early access submit error", err);
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <DocPage title="Early Access" subtitle="Get early access to Orgni Workflows and the Olyxee platform.">
      <DocSection title="What you get">
        <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-[14px]">
          <li>Full access to the Orgni Workflows verification engine</li>
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
            {error && <p className="text-sm text-red-600 leading-relaxed">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? "Submitting..." : "Request Access"}
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
        <h2 className="text-[28px] sm:text-[32px] font-semibold text-gray-900 tracking-tight mb-2">{title}</h2>
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
