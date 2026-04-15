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
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const About: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="About" description="Olyxee builds AI execution infrastructure. We help teams turn business goals into completed work across their tools and systems." path="/about" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-20 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee" width={24} height={24} className="opacity-40" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">About</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.08] mb-6"
          >
            AI that does the work,<br /><em className="text-orange-500">not just the thinking</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base sm:text-xl text-neutral-500 leading-relaxed max-w-2xl font-light"
          >
            Olyxee builds infrastructure that turns business goals into completed work — across your tools, systems, and teams.
          </motion.p>
        </div>
      </section>

      <section className="pb-20 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { stat: "1", label: "Goal in, work out", description: "Describe what needs to happen. Grysics plans and executes it." },
              { stat: "40+", label: "System integrations", description: "ERP, databases, spreadsheets, email — connected out of the box." },
              { stat: "100%", label: "Auditable", description: "Every action logged. Full trail. SOC 2 compliant." },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={idx}
                variants={fadeUp}
                className="bg-neutral-50 rounded-2xl p-8 sm:p-10 border border-neutral-100"
              >
                <div className="text-3xl sm:text-4xl font-serif text-neutral-900 mb-2">{item.stat}</div>
                <p className="text-sm font-semibold text-neutral-700 mb-2">{item.label}</p>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
              How we think
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg font-light max-w-xl">
              Three principles behind everything we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Execution over advice", description: "AI should do the work, not just suggest what to do." },
              { num: "02", title: "Trust through transparency", description: "Every decision is logged and auditable. No black boxes." },
              { num: "03", title: "Built for real operations", description: "Finance, compliance, HR — we solve for the messy, regulated parts of business." },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={idx}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 sm:p-10 border border-neutral-100"
              >
                <span className="text-xs font-mono text-neutral-300 tracking-wider mb-4 block">{value.num}</span>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{value.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
            >
              <div className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-semibold uppercase tracking-widest rounded-full mb-5">From the Founder</div>
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-900 leading-snug mb-6 tracking-tight">
                &ldquo;Every company has AI that thinks. Almost none have AI that actually does the work.&rdquo;
              </blockquote>
              <p className="text-base text-neutral-500 leading-relaxed font-light mb-8">
                I started Olyxee because I saw teams drowning in manual workflows that AI should have handled years ago. The models were smart enough — what was missing was the execution layer. That&apos;s what we&apos;re building.
              </p>
              <div className="pt-6 border-t border-neutral-100">
                <a
                  href="https://www.linkedin.com/in/lethabo-scofield-17b37a257/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/images/lethabo-scofield.png"
                    alt="Lethabo Scofield"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">Lethabo Scofield</p>
                    <p className="text-xs text-neutral-400">Founder &amp; CEO</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
              className="text-center bg-neutral-50 rounded-2xl p-10 sm:p-14 border border-neutral-100"
            >
              <Image
                src="/Logo/Olyxee_Logo.png"
                alt="Olyxee"
                width={48}
                height={48}
                loading="lazy"
                className="mx-auto opacity-30 mb-8"
              />
              <h3 className="font-serif text-2xl sm:text-3xl tracking-tight mb-4 text-neutral-900">
                Build with us
              </h3>
              <p className="text-sm text-neutral-500 mb-8 max-w-sm mx-auto leading-relaxed font-light">
                We&apos;re hiring people who want to make AI do real work.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/careers" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide">
                  View Open Roles <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide">
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
