import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const About: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="About" description="Olyxee is an AI infrastructure company. We build systems that let organizations put AI to work across their operations: reliably, transparently, and at scale." path="/about" />
      <div className="grain" />
      <Header />

      <section className="relative pt-36 sm:pt-48 pb-24 sm:pb-36 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gradient-abstract-blue.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-6"
          >
            About Olyxee
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05] mb-8"
          >
            Building the infrastructure<br className="hidden sm:block" /> for AI that <em className="text-neutral-500 not-italic">operates</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg sm:text-xl text-neutral-500 leading-relaxed font-light max-w-2xl mx-auto"
          >
            Olyxee is an AI infrastructure company. We build systems that let organizations put AI to work across their operations: reliably, transparently, and at scale.
          </motion.p>
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] lg:pt-2 mb-2">Our Mission</p>
              <div className="w-12 h-px bg-neutral-200" />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-neutral-900 leading-snug tracking-tight mb-8">
                Most AI today advises. We believe it should execute.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                Our mission is to close the gap between what AI can understand and what it can actually do inside an organization. Teams everywhere are stuck translating AI recommendations into manual work. We&apos;re building the layer that removes that gap entirely.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden aspect-[21/9]"
          >
            <Image
              src="/images/Community.jpg"
              alt="Olyxee team"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <p className="text-white/80 text-sm font-light tracking-wide">Building from Johannesburg, for the world.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">What We Believe</p>
            <div className="w-12 h-px bg-neutral-200" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-200 rounded-2xl overflow-hidden">
            {[
              {
                num: "01",
                title: "AI should do work, not just generate answers",
                text: "The most valuable AI connects to your systems, understands your goals, and completes tasks end-to-end."
              },
              {
                num: "02",
                title: "Trust is built through transparency",
                text: "In high-stakes environments, every step must be auditable. We design for organizations that need to verify."
              },
              {
                num: "03",
                title: "Infrastructure should disappear",
                text: "Teams should describe outcomes and get results, without worrying about orchestration underneath."
              },
            ].map((item, idx) => (
              <motion.div
                key={item.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={idx}
                variants={fadeUp}
                className={`p-8 sm:p-10 ${idx < 2 ? "md:border-r border-b md:border-b-0 border-neutral-200" : ""}`}
              >
                <span className="inline-block text-xs font-mono text-neutral-300 tracking-wider mb-6">{item.num}</span>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3 leading-snug">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-neutral-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-8">From the Founder</p>
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white leading-snug mb-8 tracking-tight">
                &ldquo;We started Olyxee because the hardest part of AI isn&apos;t intelligence. It&apos;s getting that intelligence to actually do something useful.&rdquo;
              </blockquote>
              <p className="text-base text-neutral-400 leading-relaxed font-light mb-10">
                The models are smart enough. What&apos;s missing is the infrastructure that lets them operate. Connecting to real systems, executing real workflows, and doing it in a way teams can trust.
              </p>
              <a
                href="https://www.linkedin.com/in/lethabo-scofield-17b37a257/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/lethabo-scofield.png"
                  alt="Lethabo Scofield"
                  width={48}
                  height={48}
                  className="rounded-full object-cover ring-2 ring-neutral-800"
                />
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-neutral-300 transition-colors">Lethabo Scofield</p>
                  <p className="text-xs text-neutral-500">Founder &amp; CEO</p>
                </div>
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "2024", label: "Founded" },
                { value: "Grysics", label: "Flagship product" },
                { value: "SOC 2", label: "Compliant" },
                { value: "Global", label: "From day one" },
              ].map((stat) => (
                <div key={stat.label} className="bg-neutral-900 rounded-xl p-6 sm:p-8 border border-neutral-800">
                  <p className="font-serif text-2xl sm:text-3xl text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-neutral-500 font-light tracking-wide">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
          >
            <Image
              src="/Logo/Olyxee_Logo.png"
              alt="Olyxee"
              width={40}
              height={40}
              loading="lazy"
              className="mx-auto opacity-20 mb-6"
            />
            <h3 className="font-serif text-3xl sm:text-4xl tracking-tight mb-4 text-neutral-900">
              Join us
            </h3>
            <p className="text-base text-neutral-500 mb-10 max-w-md mx-auto leading-relaxed font-light">
              We&apos;re building a team of people who want to make AI work in the real world, not just in demos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/careers" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide">
                View Open Roles <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
