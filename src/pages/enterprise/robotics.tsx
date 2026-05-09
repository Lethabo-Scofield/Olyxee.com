import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Cog, Radar, ShieldCheck } from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";

const CAPABILITIES = [
  {
    icon: Cpu,
    title: "On-device intelligence",
    desc: "Optimized perception, planning, and control models running on edge silicon — no cloud round-trip.",
  },
  {
    icon: Cog,
    title: "Hardware integration",
    desc: "Reference designs and SDKs for arms, mobile bases, and humanoid platforms across industrial and field settings.",
  },
  {
    icon: Radar,
    title: "Fleet orchestration",
    desc: "Deploy, monitor, and update thousands of robots in production with rollback-safe model delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Verified behavior",
    desc: "Every policy is tested against safety constraints with Ordo before it reaches a physical system.",
  },
];

const Robotics: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Olyxee Robotics · Enterprise Hardware"
        description="Olyxee Robotics builds verified embodied AI systems for industrial, logistics, and field operations. On-device intelligence, hardware integration, and fleet orchestration."
        path="/enterprise/robotics"
      />
      <div className="grain" />
      <Header />

      {/* HERO */}
      <section className="relative pt-32 sm:pt-44 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(59,130,246,0.10), transparent 60%)",
          }}
        />
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center mb-8"
          >
            <Image
              src="/Logo/Olyxee_Robotics_Logo.png"
              alt="Olyxee Robotics"
              width={88}
              height={88}
              className="rounded-2xl"
              priority
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[11px] font-semibold text-blue-600 uppercase tracking-[0.22em] mb-5"
          >
            Enterprise Hardware
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight text-neutral-900 leading-[1.05]"
          >
            Olyxee <em className="text-blue-500">Robotics</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-6 sm:mt-8 text-base sm:text-xl text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Verified embodied AI for industrial, logistics, and field operations. We bring reliability-first infrastructure to the physical world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/contact?subject=Olyxee%20Robotics%20inquiry"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide"
            >
              Talk to robotics team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
            </Link>
            <Link
              href="/enterprise"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-neutral-100 text-neutral-900 rounded-full font-medium hover:bg-neutral-200 transition-all text-sm tracking-wide"
            >
              Enterprise Software
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="px-4 sm:px-8 lg:px-12 py-20 sm:py-28 border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-14 sm:mb-20">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 leading-[1.1]">
              Reliability for systems that <em className="text-blue-500">move, sense, and act</em>.
            </h2>
            <p className="mt-6 text-base sm:text-xl text-neutral-500 font-light leading-relaxed">
              Robotics fails differently from software. We build the verification, deployment, and monitoring layer purpose-built for hardware in the loop.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="rounded-3xl bg-neutral-50 hover:bg-neutral-100/80 transition-colors p-7 sm:p-10"
                >
                  <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-neutral-600" aria-hidden />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-neutral-500 font-light leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-950 text-white py-24 sm:py-32 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(59,130,246,0.25), transparent 60%)",
            filter: "blur(80px) saturate(1.5)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
            Building in the <em className="text-blue-400">physical world</em>?
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/50 font-light max-w-xl mx-auto leading-relaxed">
            We partner on embodied AI, perception stacks, and hardware-integrated deployments — from pilot to fleet.
          </p>
          <div className="mt-10">
            <Link
              href="/contact?subject=Olyxee%20Robotics%20partnership"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide"
            >
              Get in touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Robotics;
