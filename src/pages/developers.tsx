import { FC, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, Terminal, Package, BookOpen, Code2, Copy, Check } from "lucide-react";

const Developers: FC = () => {
  const [copied, setCopied] = useState(false);
  const installCmd = "pip install olyxee";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Developers</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
            Start building with Olyxee.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mb-10">
            Everything you need to verify, optimize, and deploy AI models to edge hardware.
            Get started in minutes with our SDK, CLI, and API.
          </p>

          <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400 font-mono">Quick Start</span>
              <button
                onClick={handleCopy}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Copy install command"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <code className="text-green-400 font-mono text-sm sm:text-base">
              <span className="text-gray-500">$</span> {installCmd}
            </code>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Developer Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code2, title: "SDK", description: "Python and C++ libraries for model verification, optimization, and deployment.", status: "Available" },
              { icon: Terminal, title: "CLI", description: "Command-line tools for managing deployments, running tests, and monitoring devices.", status: "Available" },
              { icon: Package, title: "API", description: "RESTful API for programmatic access to the WAVE platform and all Olyxee services.", status: "Beta" },
              { icon: BookOpen, title: "Documentation", description: "Comprehensive guides, tutorials, and API reference for every Olyxee product.", status: "Available" },
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.title} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
                  <Icon className="w-8 h-8 text-gray-700 mb-5" />
                  <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{tool.description}</p>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{tool.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Getting Started</h2>
          <div className="space-y-8 max-w-3xl">
            {[
              { step: "1", title: "Install the SDK", description: "Install the Olyxee Python SDK using pip. C++ support is also available." },
              { step: "2", title: "Import your model", description: "Load your trained model from PyTorch, TensorFlow, ONNX, or any supported framework." },
              { step: "3", title: "Run verification", description: "Use the verification pipeline to test your model against target hardware profiles." },
              { step: "4", title: "Deploy", description: "Deploy to your target devices with a single command. WAVE handles the rest." },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Need help?</h2>
          <p className="text-gray-600 mb-10 max-w-lg mx-auto text-lg">
            Check out our documentation or join the community for support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-black transition-all">
              Read the Docs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/community" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-all">
              Join Community
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Developers;
