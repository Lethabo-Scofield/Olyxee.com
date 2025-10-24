'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from "@/components/header";

// Premium icons (replace with Streamline imports if installed locally)
const HeroIcons = {
  Rocket: "https://cdn-icons-png.flaticon.com/512/709/709579.png",
  Play: "https://cdn-icons-png.flaticon.com/512/709/709592.png"
};

const StatsIcons = {
  Timer: "https://cdn-icons-png.flaticon.com/512/2907/2907245.png",
  Dollar: "https://cdn-icons-png.flaticon.com/512/2907/2907239.png",
  Device: "https://cdn-icons-png.flaticon.com/512/2910/2910710.png",
  Shield: "https://cdn-icons-png.flaticon.com/512/2910/2910730.png"
};

const FeatureIcons = {
  Chip: "https://cdn-icons-png.flaticon.com/512/2910/2910764.png",
  Plug: "https://cdn-icons-png.flaticon.com/512/2920/2920567.png",
  Devices: "https://cdn-icons-png.flaticon.com/512/2919/2919141.png",
  Graph: "https://cdn-icons-png.flaticon.com/512/2910/2910762.png"
};

export default function GrysicsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { title: 'Edge AI Simulation', description: 'Run high-fidelity AI simulations directly on edge devices.', icon: FeatureIcons.Chip },
    { title: 'Adaptive Quantization', description: 'Automatically optimize models for target hardware.', icon: FeatureIcons.Plug },
    { title: 'Cross-Hardware Deploy', description: 'Deploy seamlessly across IoT devices.', icon: FeatureIcons.Devices },
    { title: 'Real-Time Analytics', description: 'Monitor performance and detect anomalies in real-time.', icon: FeatureIcons.Graph }
  ];

  const stats = [
    { value: '10x', label: 'Faster Deployment', icon: StatsIcons.Timer },
    { value: '90%', label: 'Cost Reduction', icon: StatsIcons.Dollar },
    { value: '50K+', label: 'Devices Powered', icon: StatsIcons.Device },
    { value: '99.9%', label: 'Uptime SLA', icon: StatsIcons.Shield }
  ];

  const useCases = [
    { title: 'Smart Manufacturing', description: 'Real-time quality control and predictive maintenance.', image: 'https://images.unsplash.com/photo-1581091215361-5e4c74f399c5?auto=format&fit=crop&w=400&h=300', industries: ['Automotive', 'Electronics', 'Pharmaceuticals'] },
    { title: 'Healthcare Devices', description: 'Privacy-first patient monitoring at the edge.', image: 'https://images.unsplash.com/photo-1588776814546-1e5e24a5db47?auto=format&fit=crop&w=400&h=300', industries: ['Wearables', 'Imaging', 'Emergency Care'] },
    { title: 'Smart Cities', description: 'Traffic optimization and public safety systems.', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&h=300', industries: ['Transportation', 'Infrastructure', 'Security'] }
  ];

  const testimonials = [
    { quote: "Grysics reduced our deployment time from weeks to hours.", author: "Dr. Sarah Chen", role: "Head of ML Engineering", company: "RoboTech Industries", image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { quote: "We're running complex vision models on $35 hardware.", author: "Marcus Rodriguez", role: "CTO", company: "EdgeVision AI", image: 'https://randomuser.me/api/portraits/men/36.jpg' }
  ];

  const partners = [
    'https://upload.wikimedia.org/wikipedia/commons/4/44/NVIDIA_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/ARM_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d5/Raspberry_Pi_Logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg'
  ];

  return (
    <main className="w-full min-h-screen bg-white text-black font-sans overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="https://images.unsplash.com/photo-1612831455544-9c1151b9c2f7?auto=format&fit=crop&w=1920&h=1080" alt="" fill className="object-cover opacity-10" aria-hidden="true" />
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ opacity, scale }} className="flex flex-col gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-black rounded-full text-sm font-semibold w-fit border border-gray-200">
              Next-Generation Edge AI Platform
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Deploy AI<br />Anywhere, Instantly
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl text-gray-700 leading-relaxed max-w-xl">
              Run production-grade AI models on any edge device. Grysics makes edge AI deployment 10x faster with zero compromise on accuracy or performance.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-4">
              <button className="group px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center gap-2">
                <Image src={HeroIcons.Rocket} width={20} height={20} alt="Rocket" /> Start Free Trial
              </button>
              <button className="px-8 py-4 bg-white text-black border-2 border-gray-200 rounded-lg font-semibold hover:border-black transition-all flex items-center gap-2">
                <Image src={HeroIcons.Play} width={20} height={20} alt="Play" /> Watch Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Dashboard */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex items-center justify-center gap-8">
            <div className="relative w-full max-w-lg h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <Image src="https://images.unsplash.com/photo-1605902711622-cfb43c44324a?auto=format&fit=crop&w=600&h=400" alt="Grysics Dashboard" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-y border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="text-center flex flex-col items-center gap-2">
              <Image src={stat.icon} width={50} height={50} alt={stat.label} />
              <div className="text-5xl lg:text-6xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-600 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Built for the Edge</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">Everything you need to deploy, monitor, and scale AI at the edge</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="group relative bg-white rounded-2xl p-10 border border-gray-200 hover:shadow-xl transition-all flex flex-col items-center text-center">
              <Image src={feature.icon} width={64} height={64} alt={feature.title} />
              <h3 className="text-2xl font-bold mb-4 mt-4">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section id="usecases" className="max-w-7xl mx-auto px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Proven Across Industries</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">From factories to hospitals, Grysics powers critical edge AI applications</p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-8">
          {useCases.map((useCase, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
              <div className="relative w-full h-64"><Image src={useCase.image} alt={useCase.title} fill className="object-cover" /></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">{useCase.industries.map((ind, i) => <span key={i} className="px-3 py-1.5 bg-gray-100 text-black rounded-lg text-sm font-medium border border-gray-200">{ind}</span>)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24 bg-gray-50 rounded-3xl mx-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Trusted by Engineers</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="bg-white rounded-2xl p-10 border border-gray-200 shadow-lg">
              <p className="text-xl text-gray-800 mb-8 leading-relaxed font-medium">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200"><Image src={t.image} alt={t.author} fill className="object-cover" /></div>
                <div><div className="font-bold text-lg">{t.author}</div><div className="text-gray-600">{t.role}, {t.company}</div></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative bg-black text-white rounded-3xl p-16 lg:p-20 text-center">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Ready to Transform Your Edge AI?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">Join thousands of developers deploying AI at the edge with Grysics</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-all text-lg">Start Free Trial</button>
            <button className="px-10 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-black transition-all text-lg">Schedule Demo</button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-8 h-8"><Image src="https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png" alt="Grysics" fill className="object-contain" /></div>
                <span className="text-xl font-bold">Grysics</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Next-generation edge AI deployment platform</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Use Cases</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">About</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 py-8 border-t border-gray-200">
            {partners.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="relative w-32 h-12">
                <Image src={p} alt="Partner logo" fill className="object-contain" />
              </motion.div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-200 text-center text-gray-600">© 2025 Grysics. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
