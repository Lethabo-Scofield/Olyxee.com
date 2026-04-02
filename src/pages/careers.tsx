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
  type: "internship" | "full-time";
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const roles: Role[] = [
  {
    title: "AI Research Intern",
    team: "Research",
    location: "Remote",
    type: "internship",
    description: "Contribute to research on AI verification, model reliability, and edge deployment.",
    responsibilities: [
      "Conduct experiments on model verification techniques",
      "Help publish papers and build research prototypes",
      "Collaborate with senior researchers on open problems",
    ],
    requirements: [
      "Pursuing a degree in CS, ML, or related field",
      "Familiarity with PyTorch or TensorFlow",
      "Strong analytical and problem-solving skills",
    ],
  },
  {
    title: "ML Engineering Intern",
    team: "Platform",
    location: "Remote",
    type: "internship",
    description: "Work on model optimization pipelines, quantization, and hardware-aware inference.",
    responsibilities: [
      "Build and improve optimization pipelines",
      "Implement quantization and pruning techniques",
      "Benchmark models across different hardware targets",
    ],
    requirements: [
      "Experience with Python and ML frameworks",
      "Understanding of model compression techniques",
      "Interest in edge computing and embedded systems",
    ],
  },
  {
    title: "Systems Engineering Intern",
    team: "Infrastructure",
    location: "Remote",
    type: "internship",
    description: "Help build distributed deployment infrastructure, runtime monitoring, and hardware abstraction.",
    responsibilities: [
      "Design and implement deployment automation",
      "Build monitoring and alerting systems",
      "Contribute to device management tooling",
    ],
    requirements: [
      "Experience with Linux systems and networking",
      "Familiarity with Docker, Kubernetes, or similar",
      "Strong programming skills in Python or Go",
    ],
  },
  {
    title: "Frontend Engineering Intern",
    team: "Developer Tools",
    location: "Remote",
    type: "internship",
    description: "Build dashboards, developer tools, and data visualization for the Olyxee platform.",
    responsibilities: [
      "Develop interactive dashboards for model metrics",
      "Improve developer-facing documentation and tools",
      "Create intuitive UIs for complex workflows",
    ],
    requirements: [
      "Experience with React, TypeScript, or Next.js",
      "Eye for clean, functional design",
      "Interest in developer experience and tooling",
    ],
  },
  {
    title: "Product Design Intern",
    team: "Design",
    location: "Remote",
    type: "internship",
    description: "Design interfaces for AI infrastructure tools. Shape how developers interact with Olyxee.",
    responsibilities: [
      "Create wireframes and high-fidelity mockups",
      "Design end-to-end user flows for technical products",
      "Conduct user research with developer audiences",
    ],
    requirements: [
      "Portfolio demonstrating UI/UX work",
      "Proficiency in Figma or similar design tools",
      "Interest in designing for technical users",
    ],
  },
  {
    title: "Technical Writing Intern",
    team: "Content",
    location: "Remote",
    type: "internship",
    description: "Write documentation, tutorials, and educational content about AI deployment.",
    responsibilities: [
      "Write and maintain API and SDK documentation",
      "Create tutorials and getting-started guides",
      "Produce blog posts on AI infrastructure topics",
    ],
    requirements: [
      "Strong technical writing skills",
      "Ability to explain complex topics simply",
      "Familiarity with developer documentation",
    ],
  },
  {
    title: "DevOps Engineering Intern",
    team: "Infrastructure",
    location: "Remote",
    type: "internship",
    description: "Automate CI/CD pipelines, manage cloud infrastructure, and improve deployment reliability.",
    responsibilities: [
      "Build and maintain CI/CD pipelines",
      "Automate infrastructure provisioning",
      "Monitor and improve system reliability",
    ],
    requirements: [
      "Familiarity with CI/CD tools (GitHub Actions, etc.)",
      "Basic cloud platform experience (AWS, GCP, or Azure)",
      "Scripting skills in Bash or Python",
    ],
  },
  {
    title: "Community & Partnerships Intern",
    team: "Growth",
    location: "Remote",
    type: "internship",
    description: "Grow the Olyxee developer community, manage partnerships, and organize events.",
    responsibilities: [
      "Engage with the developer community on Discord and forums",
      "Help plan and execute virtual events and workshops",
      "Identify and support partnership opportunities",
    ],
    requirements: [
      "Excellent communication skills",
      "Interest in developer communities and open source",
      "Self-motivated and organized",
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/15 backdrop-blur-md text-white rounded-full text-xs font-medium mb-6 border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Now hiring across all teams
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight mb-6 sm:mb-8"
            >
              Do the best work of your life.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed font-light mb-8 sm:mb-10"
            >
              Join a small team solving hard problems in AI reliability and verification.
              Start with an internship. Grow into something bigger.
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
      title: "Ship real work",
      desc: "Your contributions go to production from week one. No busywork, no fake projects.",
    },
    {
      num: "02",
      title: "Learn from the best",
      desc: "Work alongside experienced engineers and researchers who've built systems at scale.",
    },
    {
      num: "03",
      title: "Work from anywhere",
      desc: "Fully remote with flexible hours. We care about what you build, not when you build it.",
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
            We built the kind of company we'd want to work at.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="text-3xl font-serif text-neutral-200 mb-4">{v.num}</div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">{v.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">{v.desc}</p>
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
    window.location.href = `mailto:scofieldx911@gmail.com?subject=${subject}&body=${body}`;
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
              {roles.length} positions across {teams.length} teams. All remote.
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
                      <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        role.type === 'internship'
                          ? 'bg-blue-50 text-blue-500'
                          : 'bg-green-50 text-green-500'
                      }`}>
                        {role.type === 'internship' ? 'Intern' : 'Full-time'}
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
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">What we're looking for</h4>
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
                        placeholder="Portfolio or LinkedIn (optional)"
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
    { num: "01", title: "Apply", desc: "Pick a role and tell us about yourself. No cover letter — just the basics." },
    { num: "02", title: "Chat", desc: "A short conversation about your interests and what excites you about AI." },
    { num: "03", title: "Build", desc: "A small, relevant project to see how you think. Nothing unreasonable." },
    { num: "04", title: "Join", desc: "Start with the team. Get onboarded, meet your mentor, and ship code." },
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
            We're always open to meeting exceptional people.
            Tell us what you'd like to work on.
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
      <SEO title="Careers" description="Join Olyxee and work on AI infrastructure that matters. Open internship positions in research, engineering, design, and more." path="/careers" />
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
