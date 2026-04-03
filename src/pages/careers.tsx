import { FC, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, X, CheckCircle, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Role {
  title: string;
  team: string;
  location: string;
  type: "internship";
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const roles: Role[] = [
  {
    title: "AI Research Intern",
    team: "AI Research & Development",
    location: "Remote",
    type: "internship",
    description: "Push the boundaries of what's possible in AI verification and evaluation. Work on research that shapes how the industry thinks about AI reliability.",
    responsibilities: [
      "Design and run experiments on model verification and evaluation methods",
      "Build research prototypes that turn into real products",
      "Tackle open problems in AI reliability that no one else is solving",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "AI Engineering Intern",
    team: "AI Research & Development",
    location: "Remote",
    type: "internship",
    description: "Turn cutting-edge research into production systems. You'll bridge the gap between what's possible in a lab and what works at scale.",
    responsibilities: [
      "Build and deploy AI models that power real verification workflows",
      "Design data pipelines that handle production-scale AI evaluation",
      "Work directly with researchers to bring new ideas to life in code",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Full Stack Developer Intern",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "internship",
    description: "Build the platform that teams rely on to trust their AI. You'll own entire features from idea to deployment, across every layer of the stack.",
    responsibilities: [
      "Architect and build features across frontend, backend, and data layers",
      "Design systems that handle the complexity of real-time AI monitoring",
      "Own what you build. Ship it, measure it, improve it.",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "ML Engineering Intern",
    team: "AI Research & Development",
    location: "Remote",
    type: "internship",
    description: "Make AI systems faster, more accurate, and production-ready. Your work directly impacts how reliable AI is for thousands of teams.",
    responsibilities: [
      "Build training and evaluation pipelines that set the standard for quality",
      "Optimize models for real-world performance, not just benchmarks",
      "Design testing frameworks that catch problems before users do",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Backend Engineering Intern",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "internship",
    description: "Build the APIs and services that power AI verification at scale. The systems you create will handle millions of evaluation requests.",
    responsibilities: [
      "Design and build APIs that are fast, reliable, and well-documented",
      "Architect backend services that scale with growing demand",
      "Shape the database and service layer that everything else depends on",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Frontend Engineering Intern",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "internship",
    description: "Design and build the interfaces that make complex AI data simple and actionable. Your work defines how teams experience Olyxee.",
    responsibilities: [
      "Build dashboards and visualizations that turn raw AI data into clear insights",
      "Create developer tools that engineers actually enjoy using",
      "Craft interfaces that make complex verification workflows feel effortless",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "DevOps / MLOps Intern",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "internship",
    description: "Build the infrastructure that keeps Olyxee running at scale. You'll design systems where uptime and reliability aren't negotiable.",
    responsibilities: [
      "Design CI/CD pipelines that make deployments fast and fearless",
      "Build infrastructure automation that scales with the platform",
      "Create monitoring and alerting systems that catch issues before they matter",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Product Design Intern",
    team: "Product & Design",
    location: "Remote",
    type: "internship",
    description: "Shape how the world's best engineering teams interact with AI infrastructure. Your designs will define what trust looks like in software.",
    responsibilities: [
      "Design end-to-end experiences for complex technical workflows",
      "Create prototypes that influence product direction, not just visuals",
      "Talk to real users and turn their pain points into elegant solutions",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "QA / Testing Intern",
    team: "QA & Testing",
    location: "Remote",
    type: "internship",
    description: "Be the last line of defense before our tools reach production. You'll ensure that the platform teams trust to verify AI is itself bulletproof.",
    responsibilities: [
      "Design and execute test strategies that catch what others miss",
      "Build automated test suites that scale with the platform",
      "Set the quality bar for a product where reliability is the entire promise",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Technical Writing Intern",
    team: "Business & Operations",
    location: "Remote",
    type: "internship",
    description: "Make complex AI infrastructure accessible to every developer. Your writing will be the first experience many teams have with Olyxee.",
    responsibilities: [
      "Write documentation that developers actually want to read",
      "Create tutorials and guides that turn beginners into power users",
      "Translate deep technical concepts into clear, compelling content",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
];

const teams = Array.from(new Set(roles.map(r => r.team)));

function HeroSection() {
  return (
    <section className="relative pt-20 sm:pt-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-6xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden min-h-[480px] sm:min-h-[540px] lg:min-h-[600px]">
          <Image
            src="/images/careers-hero.png"
            alt="Team collaborating on code"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight mb-6 sm:mb-8"
            >
              The people who make AI actually work.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed font-light mb-8 sm:mb-10"
            >
              Everyone is building AI. We're building the infrastructure that makes it trustworthy. If you want to work on problems that the entire industry depends on, this is the place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#roles"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm"
              >
                View open roles <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white border border-white/25 rounded-full font-medium hover:bg-white/10 transition-all text-sm"
              >
                Learn about Olyxee
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    {
      num: "01",
      title: "Your work ships to production",
      desc: "No sandbox projects. No busywork. From your first week, you're building features that real teams depend on to run AI in production.",
      gradient: "/images/gradient-orange-pink.png",
    },
    {
      num: "02",
      title: "Grow faster than anywhere else",
      desc: "Small team, big problems. You'll take on responsibilities most companies wouldn't hand to someone for years. That's how we like it.",
      gradient: "/images/gradient-blue-pink.png",
    },
    {
      num: "03",
      title: "Remote, flexible, outcome-driven",
      desc: "Work from anywhere in the world. We don't track hours. We track impact. Show up, do great work, and own your schedule.",
      gradient: "/images/gradient-yellow-green.png",
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Why Olyxee</p>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
            Built for people who want to do work that matters.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-7 sm:p-8 min-h-[220px] flex flex-col justify-end group"
            >
              <div className="absolute inset-0">
                <Image src={v.gradient} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-white/80 group-hover:bg-white/70 transition-all duration-500" />
              <div className="relative">
                <div className="text-3xl font-serif text-neutral-300 mb-4">{v.num}</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RolesSection() {
  const [filterTeam, setFilterTeam] = useState<string>("All");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", portfolio: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const filteredRoles = filterTeam === "All" ? roles : roles.filter(r => r.team === filterTeam);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    const subject = encodeURIComponent(`Application: ${selectedRole.title}`);
    const body = encodeURIComponent(
      `Role: ${selectedRole.title}\nTeam: ${selectedRole.team}\n\nName: ${formData.name}\nEmail: ${formData.email}\nPortfolio/LinkedIn: ${formData.portfolio}\n\n${formData.message}`
    );
    window.location.href = `mailto:scofield@olyxee.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedRole(null);
      setFormData({ name: "", email: "", portfolio: "", message: "" });
    }, 3000);
  };

  return (
    <>
      <section id="roles" className="py-32 sm:py-44 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-4">
              Open roles
            </h2>
            <p className="text-neutral-500 text-lg font-light">
              {roles.length} internships across {teams.length} teams. All remote.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {["All", ...teams].map(team => (
              <button
                key={team}
                onClick={() => setFilterTeam(team)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filterTeam === team
                    ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-900/20'
                    : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700'
                }`}
              >
                {team}
              </button>
            ))}
          </motion.div>

          <div className="space-y-0 divide-y divide-neutral-100">
            <AnimatePresence mode="popLayout">
              {filteredRoles.map((role, idx) => (
                <motion.button
                  key={role.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  onClick={() => setSelectedRole(role)}
                  className="w-full text-left py-7 sm:py-8 group flex items-center justify-between gap-6 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg sm:text-xl tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors">{role.title}</h3>
                      <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                        Internship
                      </span>
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">{role.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{role.team}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{role.location}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {filteredRoles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-neutral-400 text-sm">No open positions on this team right now.</p>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => { setSelectedRole(null); setSubmitted(false); }} />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-neutral-100 px-6 sm:px-8 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">{selectedRole.title}</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">{selectedRole.team} · {selectedRole.location}</p>
                </div>
                <button
                  onClick={() => { setSelectedRole(null); setSubmitted(false); }}
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-500" />
                </button>
              </div>

              <div className="px-6 sm:px-8 py-6">
                <p className="text-[15px] text-neutral-600 leading-relaxed mb-8">{selectedRole.description}</p>

                <div className="mb-8">
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">What you'll do</h4>
                  <div className="space-y-3">
                    {selectedRole.responsibilities.map((r, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-semibold text-neutral-500">{i + 1}</span>
                        </div>
                        <p className="text-sm text-neutral-600 leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">To apply</h4>
                  <div className="space-y-3">
                    {selectedRole.requirements.map((r, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-2 flex-shrink-0" />
                        <p className="text-sm text-neutral-600 leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-6">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle className="w-7 h-7 text-green-500" />
                      </div>
                      <h4 className="text-lg text-neutral-900 mb-1">Application sent</h4>
                      <p className="text-sm text-neutral-500">Your email client should have opened. We'll be in touch.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleApply} className="space-y-4">
                      <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">Apply now</h4>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-sm text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Full name"
                      />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-sm text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Email address"
                      />
                      <input
                        type="text"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-sm text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Link to portfolio, GitHub, or project"
                        required
                      />
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-sm text-neutral-900 placeholder:text-neutral-400 resize-none"
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-neutral-900 text-white rounded-xl font-medium text-sm hover:bg-black transition-colors"
                      >
                        Submit Application
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProcessSection() {
  const steps = [
    { num: "01", title: "Apply", desc: "Send us your work. No cover letter needed. Just show us what you've built and what excites you." },
    { num: "02", title: "Chat", desc: "A casual conversation about what drives you, how you think, and where you want to go." },
    { num: "03", title: "Build", desc: "A short, relevant challenge. We want to see how you approach real problems, not trick questions." },
    { num: "04", title: "Join", desc: "Get onboarded, meet your team, and start shipping. You'll have real ownership from day one." },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Process</p>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
            Four steps to joining
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="text-3xl font-serif text-neutral-200 mb-4">{step.num}</div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 sm:mb-6">
            Don't see your role?
          </h2>
          <p className="text-neutral-500 text-lg max-w-lg mx-auto mb-10 font-light leading-relaxed">
            We hire for talent, not just titles. If you're exceptional at what you do and excited about making AI more reliable, reach out. We'll find a place for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide"
            >
              Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#roles"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
            >
              Browse roles
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const Careers: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Careers" description="Join Olyxee and work on AI infrastructure that matters. Open positions in research, engineering, design, and more." path="/careers" />
      <Header />

      <main>
        <HeroSection />
        <ValuesSection />
        <RolesSection />
        <ProcessSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
