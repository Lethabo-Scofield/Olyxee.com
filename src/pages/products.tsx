import "../app/globals.css";
import { FC, useState, useEffect, useRef } from "react";
import { ArrowRight, Cpu, Globe, ShieldCheck, Sparkles, Play, Check, X, ChevronRight } from "lucide-react";
import { Head } from "react-day-picker";

const ProductPage: FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({ devices: 0, deployments: 0, uptime: 0 });
  const statsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "Universal Edge Deployment",
      description:
        "Deploy AI models on any edge device—Jetson, Raspberry Pi, Arduino, and more—without changing a single line of code.",
      icon: Globe,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
      benefits: ["Zero configuration", "Cross-platform support", "One-click deployment"],
    },
    {
      title: "Automated Optimization",
      description:
        "Olyxee containerizes, quantizes, and verifies your model automatically, ensuring top performance on target hardware.",
      icon: Cpu,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=800&fit=crop",
      benefits: ["Automatic quantization", "Hardware-specific tuning", "Performance verification"],
    },
    {
      title: "Full Observability",
      description:
        "Monitor models in real-time with automatic performance checks, alerts, and dashboards, all built-in.",
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      benefits: ["Real-time monitoring", "Automated alerts", "Performance analytics"],
    },
  ];

  const stats = [
    { label: "Supported Devices", value: 50, suffix: "+" },
    { label: "Deployments", value: 10000, suffix: "+" },
    { label: "Uptime", value: 99.9, suffix: "%" },
  ];

  const devices = [
    { name: "NVIDIA Jetson", category: "GPU" },
    { name: "Raspberry Pi", category: "CPU" },
    { name: "Arduino", category: "MCU" },
    { name: "Coral Edge TPU", category: "TPU" },
    { name: "Intel NUC", category: "CPU" },
    { name: "AWS Panorama", category: "Cloud Edge" },
  ];

  const comparison = [
    { feature: "Universal Deployment", edgeImpulse: false, aws: false, olyxee: true },
    { feature: "Auto Optimization", edgeImpulse: false, aws: false, olyxee: true },
    { feature: "Built-in Verification", edgeImpulse: false, aws: false, olyxee: true },
    { feature: "Real-time Monitoring", edgeImpulse: false, aws: true, olyxee: true },
    { feature: "Device Agnostic", edgeImpulse: false, aws: false, olyxee: true },
    { feature: "One-click Deploy", edgeImpulse: false, aws: false, olyxee: true },
  ];

  const testimonials = [
    { quote: "Reduced our deployment time from weeks to hours", author: "Engineering Lead at TechCorp" },
    { quote: "Finally, edge AI that just works", author: "CTO at StartupXYZ" },
  ];

  const codeExample = `# Deploy any model in 3 lines
from olyxee import deploy

model = deploy.load("my_model.onnx")
model.deploy(target="jetson-nano")`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let current = 0;
            const timer1 = setInterval(() => {
              current += 1;
              if (current >= 50) { current = 50; clearInterval(timer1); }
              setAnimatedStats(prev => ({ ...prev, devices: current }));
            }, 20);

            let deploys = 0;
            const timer2 = setInterval(() => {
              deploys += 200;
              if (deploys >= 10000) { deploys = 10000; clearInterval(timer2); }
              setAnimatedStats(prev => ({ ...prev, deployments: deploys }));
            }, 20);

            let uptime = 0;
            const timer3 = setInterval(() => {
              uptime += 2;
              if (uptime >= 99.9) { uptime = 99.9; clearInterval(timer3); }
              setAnimatedStats(prev => ({ ...prev, uptime }));
            }, 30);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
        <div className="relative container mx-auto px-6 text-center z-10 py-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium mb-8 border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span>Deploy AI in Minutes, Not Months</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight max-w-5xl mx-auto">
            Deploy AI Anywhere, Instantly
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Run any AI model on any edge device with automatic optimization and verification. No expertise required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-gray-900 font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </a>
          </div>
          <div className="relative max-w-6xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=800&fit=crop"
                alt="Olyxee Dashboard"
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-24 px-6 bg-white" ref={statsRef}>
        <div className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-6xl font-bold text-gray-900 mb-3">{animatedStats.devices}+</div>
            <div className="text-xl text-gray-600">Supported Devices</div>
          </div>
          <div>
            <div className="text-6xl font-bold text-gray-900 mb-3">{animatedStats.deployments.toLocaleString()}+</div>
            <div className="text-xl text-gray-600">Deployments</div>
          </div>
          <div>
            <div className="text-6xl font-bold text-gray-900 mb-3">{animatedStats.uptime}%</div>
            <div className="text-xl text-gray-600">Uptime</div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl text-center mb-16">
          <h2 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">Why Edge AI is Hard</h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Fragmented frameworks, device-specific tweaks, and unreliable performance make deploying AI to edge devices painful and slow.
          </p>
        </div>
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Traditional Approach</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3"><X className="w-5 h-5 text-red-500 mt-1" /> Manual optimization for each device</li>
              <li className="flex items-start gap-3"><X className="w-5 h-5 text-red-500 mt-1" /> Weeks of testing and debugging</li>
              <li className="flex items-start gap-3"><X className="w-5 h-5 text-red-500 mt-1" /> No visibility into production performance</li>
              <li className="flex items-start gap-3"><X className="w-5 h-5 text-red-500 mt-1" /> Device-specific code maintenance</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Olyxee Way</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-600 mt-1" /> Automatic optimization for all devices</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-600 mt-1" /> Deploy in minutes with verification</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-600 mt-1" /> Real-time monitoring and alerts</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-600 mt-1" /> Write once, deploy anywhere</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-5xl text-center mb-16">
          <h2 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">Simple as Three Lines</h2>
          <p className="text-xl text-gray-600">Deploy your model to any edge device with minimal code</p>
        </div>
        <div className="container mx-auto max-w-5xl bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-400 text-sm">deploy.py</span>
          </div>
          <pre className="text-green-400 font-mono text-sm md:text-base leading-relaxed overflow-x-auto">{codeExample}</pre>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Supports ONNX, PyTorch, TensorFlow, and more</p>
            <a href="#docs" className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all">
              <span>View Documentation</span>
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl text-center mb-16">
          <h2 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">Everything You Need</h2>
          <p className="text-xl text-gray-600">Built-in tools for the complete deployment lifecycle</p>
        </div>
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {features.map((feature, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFeature(idx)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${activeFeature === idx ? "bg-gray-900 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              {feature.title}
            </button>
          ))}
        </div>
        <div className="container mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block p-4 bg-white rounded-2xl shadow-sm">
              {(() => {
                const IconComponent = features[activeFeature].icon;
                return <IconComponent className="w-10 h-10 text-gray-900" />;
              })()}
            </div>
            <h3 className="text-4xl font-semibold text-gray-900">{features[activeFeature].title}</h3>
            <p className="text-xl text-gray-600 leading-relaxed">{features[activeFeature].description}</p>
            <ul className="space-y-3">
              {features[activeFeature].benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src={features[activeFeature].image} alt={features[activeFeature].title} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Devices Section */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl text-center mb-16">
          <h2 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">Works On Every Device</h2>
          <p className="text-xl text-gray-600">From tiny microcontrollers to powerful edge GPUs</p>
        </div>
        <div className="container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-3 gap-6">
          {devices.map((device, idx) => (
            <div key={idx} className="bg-gray-50/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{device.name}</h4>
              <p className="text-gray-600">{device.category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl text-center mb-16">
          <h2 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">Why Olyxee</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Compare with other platforms</p>
        </div>
        <div className="container mx-auto max-w-7xl overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200 text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 border border-gray-300">Feature</th>
                <th className="px-6 py-3 border border-gray-300">EdgeImpulse</th>
                <th className="px-6 py-3 border border-gray-300">AWS</th>
                <th className="px-6 py-3 border border-gray-300">Olyxee</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((item, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  <td className="px-6 py-3 border border-gray-300">{item.feature}</td>
                  <td className="px-6 py-3 border border-gray-300 text-center">{item.edgeImpulse ? <Check className="mx-auto w-5 h-5 text-green-600" /> : <X className="mx-auto w-5 h-5 text-red-500" />}</td>
                  <td className="px-6 py-3 border border-gray-300 text-center">{item.aws ? <Check className="mx-auto w-5 h-5 text-green-600" /> : <X className="mx-auto w-5 h-5 text-red-500" />}</td>
                  <td className="px-6 py-3 border border-gray-300 text-center">{item.olyxee ? <Check className="mx-auto w-5 h-5 text-green-600" /> : <X className="mx-auto w-5 h-5 text-red-500" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-5xl text-center mb-16">
          <h2 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">What Our Users Say</h2>
        </div>
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-12">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-50/50 rounded-3xl p-8 shadow-sm">
              <p className="text-gray-900 italic text-lg mb-4">"{t.quote}"</p>
              <p className="text-gray-600 font-semibold">{t.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gray-900 text-white text-center">
        <h2 className="text-5xl font-semibold mb-6 tracking-tight">Ready to Deploy AI Instantly?</h2>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">Join hundreds of developers deploying models on every edge device today.</p>
        <a
          href="#get-started"
          className="inline-flex items-center gap-3 px-10 py-4 bg-white text-gray-900 font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </a>
      </section>
    </div>
  );
};

export default ProductPage;
