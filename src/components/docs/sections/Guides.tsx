import { FC } from "react";
import { ArrowRight } from "lucide-react";

const Guides: FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">Getting Started</h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Step-by-step guide to verifying your first AI application with Grysics.
        </p>
      </div>

      <div className="space-y-10 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Prerequisites</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Python 3.9 or later</li>
            <li>A running AI application (chatbot, RAG pipeline, or agent)</li>
            <li>An accessible endpoint for your application</li>
            <li>The Grysics SDK installed (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">pip install grysics</code>)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Step 1: Connect your application</h2>
          <p>
            Start by connecting Grysics to your AI application endpoint. The SDK automatically detects the application type.
          </p>
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-950 my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
              <span className="text-xs text-gray-400 font-mono">python</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
              <code className="text-gray-300 font-mono whitespace-pre">{`import grysics

# Connect to your AI application
app = grysics.connect(
    endpoint="http://localhost:8000/chat",
    type="rag"
)

# Inspect connection
print(app.status)
# Connected
# Type: rag
# Endpoint: http://localhost:8000/chat`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Step 2: Define test cases</h2>
          <p>
            Create test cases that cover your application's expected behavior:
          </p>
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-950 my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
              <span className="text-xs text-gray-400 font-mono">yaml</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
              <code className="text-gray-300 font-mono whitespace-pre">{`# tests/test_suite.yaml
test_cases:
  - input: "What is your return policy?"
    expected: "30-day money-back guarantee"
    checks: [accuracy, hallucination]

  - input: "How do I contact support?"
    expected_contains: ["email", "support"]
    checks: [accuracy, consistency]`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Step 3: Run verification</h2>
          <p>
            Run the verification suite to check your application's behavior:
          </p>
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-950 my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
              <span className="text-xs text-gray-400 font-mono">python</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
              <code className="text-gray-300 font-mono whitespace-pre">{`results = app.verify(
    test_cases="./tests/test_suite.yaml",
    checks=["accuracy", "consistency", "hallucination"]
)

print(results.summary())
# ✓ Accuracy: 94.3% (12/13 cases passed)
# ✓ Consistency: 97.1% (stable across variations)
# ✓ Hallucination: 1.2% (below 2% threshold)
# Overall: PASSED`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Step 4: Enable monitoring</h2>
          <p>
            Once verification passes, enable continuous monitoring for production:
          </p>
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-950 my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
              <span className="text-xs text-gray-400 font-mono">python</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
              <code className="text-gray-300 font-mono whitespace-pre">{`app.monitor(
    check_interval=300,
    alert_on=["hallucination", "drift", "latency"],
    webhook="https://your-api.com/alerts"
)

print(f"Monitoring: {app.monitor_status}")
# Monitoring: active
# Interval: every 5 minutes
# Alerts: hallucination, drift, latency`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Next steps</h2>
          <div className="space-y-3">
            {[
              { title: "Add RAG evaluation", description: "Test retrieval relevance and context utilization for RAG pipelines." },
              { title: "Write more test cases", description: "Cover edge cases, multi-turn conversations, and adversarial inputs." },
              { title: "Set up CI integration", description: "Run Grysics verification automatically on every deployment." },
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
