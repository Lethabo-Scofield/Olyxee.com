import { FC } from "react";

const API: FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">API Reference</h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Complete reference for the Olyxee REST API, SDKs, and integration endpoints.
        </p>
      </div>

      <div className="space-y-10 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Base URL</h2>
          <div className="bg-gray-950 rounded-xl p-4 border border-gray-200">
            <code className="text-gray-300 font-mono text-sm">https://api.olyxee.com/v1</code>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Authentication</h2>
          <p>All API requests require an API key passed in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">Authorization</code> header:</p>
          <div className="bg-gray-950 rounded-xl p-4 border border-gray-200 my-4">
            <code className="text-gray-300 font-mono text-sm">Authorization: Bearer OLYXEE_API_KEY</code>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Endpoints</h2>
          <div className="space-y-4">
            {[
              { method: "POST", path: "/models", description: "Upload a new model" },
              { method: "GET", path: "/models", description: "List all models" },
              { method: "GET", path: "/models/:id", description: "Get model details" },
              { method: "POST", path: "/models/:id/verify", description: "Run verification" },
              { method: "POST", path: "/models/:id/optimize", description: "Optimize model" },
              { method: "POST", path: "/models/:id/deploy", description: "Deploy model" },
              { method: "GET", path: "/deployments", description: "List deployments" },
              { method: "GET", path: "/deployments/:id", description: "Get deployment status" },
              { method: "POST", path: "/deployments/:id/rollback", description: "Rollback deployment" },
              { method: "GET", path: "/devices", description: "List connected devices" },
            ].map((endpoint, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors cursor-pointer group">
                <span className={`text-xs font-bold px-2 py-1 rounded font-mono flex-shrink-0 ${
                  endpoint.method === "GET" ? "bg-green-100 text-green-700" :
                  endpoint.method === "POST" ? "bg-blue-100 text-blue-700" :
                  "bg-gray-100 text-gray-700"
                }`}>
                  {endpoint.method}
                </span>
                <div className="min-w-0">
                  <code className="text-sm font-mono text-gray-900">{endpoint.path}</code>
                  <p className="text-xs text-gray-500 mt-0.5">{endpoint.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">SDKs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Python", install: "pip install olyxee", status: "Stable" },
              { name: "C++", install: "#include <olyxee.h>", status: "Beta" },
              { name: "JavaScript", install: "npm install olyxee", status: "Coming Soon" },
            ].map((sdk) => (
              <div key={sdk.name} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{sdk.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    sdk.status === "Stable" ? "bg-green-50 text-green-700" :
                    sdk.status === "Beta" ? "bg-yellow-50 text-yellow-700" :
                    "bg-gray-100 text-gray-500"
                  }`}>{sdk.status}</span>
                </div>
                <code className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded block">{sdk.install}</code>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default API;
