import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Factory, Bot, Wifi, Car, Stethoscope, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const UseCases: FC = () => {
  const cases = [
    { icon: Factory, title: "Smart Manufacturing", description: "Deploy quality control and predictive maintenance models on factory floor edge devices with verified reliability.", industries: ["Automotive", "Electronics", "Pharmaceuticals", "Food & Beverage"], image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=600&h=400" },
    { icon: Stethoscope, title: "Healthcare & Medical Devices", description: "Privacy-first AI for patient monitoring, diagnostic imaging, and wearable health devices with regulatory compliance.", industries: ["Wearables", "Diagnostic Imaging", "Remote Monitoring", "Emergency Care"], image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&h=400" },
    { icon: Bot, title: "Robotics & Automation", description: "Deploy perception, planning, and control models on robotic systems with formal verification guarantees.", industries: ["Warehouse Automation", "Agricultural Robotics", "Service Robots", "Industrial Arms"], image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&h=400" },
    { icon: Car, title: "Autonomous Systems", description: "Safety-critical AI deployment for autonomous vehicles, drones, and navigation with continuous monitoring.", industries: ["Self-Driving", "Drone Operations", "Maritime Navigation", "Rail Systems"], image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0abb?auto=format&fit=crop&w=600&h=400" },
    { icon: Wifi, title: "IoT & Edge Networks", description: "Run optimized AI models across distributed sensor networks with automatic hardware abstraction.", industries: ["Smart Cities", "Environmental Monitoring", "Energy Management", "Retail Analytics"], image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&h=400" },
    { icon: Building2, title: "Enterprise AI", description: "Deploy and monitor AI across enterprise infrastructure with full observability, compliance, and governance.", industries: ["Financial Services", "Insurance", "Telecommunications", "Government"], image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400" },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Use Cases</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.05] mb-8">
            Reliable AI across
            <br />
            <em className="text-neutral-400">every industry</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            From factory floors to hospital rooms, Olyxee powers AI systems where failure is not an option.
          </motion.p>
        </div>
      </section>

      <section className="py-28 sm:py-36 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          {cases.map((useCase, idx) => {
            const Icon = useCase.icon;
            return (
              <motion.div key={useCase.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="rounded-2xl border border-neutral-200 overflow-hidden hover:border-neutral-300 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  <div className="lg:col-span-3 p-8 sm:p-10 flex flex-col justify-center">
                    <Icon className="w-6 h-6 text-neutral-500 mb-4" />
                    <h2 className="text-2xl font-semibold text-neutral-900 mb-4">{useCase.title}</h2>
                    <p className="text-neutral-500 leading-relaxed mb-6">{useCase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {useCase.industries.map((ind) => (
                        <span key={ind} className="text-xs font-medium text-neutral-400 bg-neutral-100 px-3 py-1.5 rounded-full">{ind}</span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2 relative min-h-[200px] lg:min-h-0">
                    <Image src={useCase.image} alt={useCase.title} fill className="object-cover" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight mb-6">
              Have a different
              <br />
              <em className="text-neutral-500">use case?</em>
            </h2>
            <p className="text-neutral-400 text-lg max-w-lg mx-auto mb-10 font-light leading-relaxed">
              We work with teams across industries. Let's discuss how Olyxee can help.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default UseCases;
