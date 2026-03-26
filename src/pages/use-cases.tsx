import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Factory, Bot, Wifi, Car, Stethoscope, Building2 } from "lucide-react";

const UseCases: FC = () => {
  const cases = [
    {
      icon: Factory,
      title: "Smart Manufacturing",
      description: "Deploy quality control and predictive maintenance models on factory floor edge devices. Olyxee ensures models perform reliably under varying environmental conditions — temperature, vibration, and power fluctuations.",
      industries: ["Automotive", "Electronics", "Pharmaceuticals", "Food & Beverage"],
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=600&h=400",
    },
    {
      icon: Stethoscope,
      title: "Healthcare & Medical Devices",
      description: "Privacy-first AI deployment for patient monitoring, diagnostic imaging, and wearable health devices. Verification-first infrastructure ensures regulatory compliance and patient safety.",
      industries: ["Wearables", "Diagnostic Imaging", "Remote Monitoring", "Emergency Care"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&h=400",
    },
    {
      icon: Bot,
      title: "Robotics & Automation",
      description: "Deploy perception, planning, and control models on robotic systems with formal verification guarantees. Ensure safe operation in human-collaborative environments.",
      industries: ["Warehouse Automation", "Agricultural Robotics", "Service Robots", "Industrial Arms"],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&h=400",
    },
    {
      icon: Car,
      title: "Autonomous Systems",
      description: "Safety-critical AI deployment for autonomous vehicles, drones, and navigation systems. Continuous monitoring and automated failover protect against real-world edge cases.",
      industries: ["Self-Driving", "Drone Operations", "Maritime Navigation", "Rail Systems"],
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0abb?auto=format&fit=crop&w=600&h=400",
    },
    {
      icon: Wifi,
      title: "IoT & Edge Networks",
      description: "Run optimized AI models across distributed sensor networks and IoT devices. WAVE's hardware abstraction handles device heterogeneity automatically.",
      industries: ["Smart Cities", "Environmental Monitoring", "Energy Management", "Retail Analytics"],
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&h=400",
    },
    {
      icon: Building2,
      title: "Enterprise AI",
      description: "Deploy and monitor AI models across enterprise infrastructure with full observability, compliance, and governance. Scale from prototype to production with confidence.",
      industries: ["Financial Services", "Insurance", "Telecommunications", "Government"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Use Cases</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
            Reliable AI across every industry.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            From factory floors to hospital rooms, Olyxee powers AI systems where failure is not an option.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {cases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <div key={useCase.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  <div className="lg:col-span-3 p-8 sm:p-10 flex flex-col justify-center">
                    <Icon className="w-8 h-8 text-gray-700 mb-4" />
                    <h2 className="text-2xl font-bold mb-4">{useCase.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{useCase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {useCase.industries.map((ind) => (
                        <span key={ind} className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">{ind}</span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2 relative min-h-[200px] lg:min-h-0">
                    <Image src={useCase.image} alt={useCase.title} fill className="object-cover" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Have a different use case?</h2>
          <p className="text-gray-600 mb-10 max-w-lg mx-auto text-lg">
            We work with teams across industries. Let's discuss how Olyxee can help.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-black transition-all">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default UseCases;
