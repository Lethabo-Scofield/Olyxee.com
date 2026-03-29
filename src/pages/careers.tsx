import { FC, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, MapPin, X, Send, CheckCircle, Briefcase, GraduationCap, Clock, Globe, Users, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

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

const Careers: FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [filterTeam, setFilterTeam] = useState<string>("All");
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
    <div className="min-h-screen bg-white text-neutral-900">
      <SEO title="Careers" description="Join Olyxee and work on AI infrastructure that matters. Open internship positions in research, engineering, design, and more." path="/careers" />
      <Header />

      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 border border-green-200 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">We're hiring</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight leading-[1.1] mb-6">
            Build the future of
            <br />
            AI infrastructure
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-neutral-500 leading-relaxed max-w-2xl mb-10">
            We're looking for talented people who want to solve hard problems in AI reliability,
            verification, and edge deployment. Start with an internship — grow with us.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-6 text-sm text-neutral-500">
            <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-neutral-400" /> 100% Remote</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-neutral-400" /> Flexible hours</span>
            <span className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-neutral-400" /> Internships available</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-neutral-400" /> Mentorship included</span>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Ship real work", desc: "Your contributions go to production. No busywork — you'll solve real challenges in AI systems." },
              { icon: Users, title: "Learn from experts", desc: "Work alongside experienced engineers and researchers. Get mentorship that accelerates your growth." },
              { icon: Globe, title: "Work anywhere", desc: "Fully remote with flexible hours. We value output over hours. Build from wherever you do your best work." },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp}
                  className="p-6 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-neutral-600" />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight mb-2">Open positions</h2>
            <p className="text-sm text-neutral-500">{roles.length} roles across {teams.length} teams</p>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-8">
            {["All", ...teams].map(team => (
              <button
                key={team}
                onClick={() => setFilterTeam(team)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filterTeam === team
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:text-neutral-900'
                }`}
              >
                {team}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredRoles.map((role, idx) => (
              <motion.button
                key={role.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                onClick={() => setSelectedRole(role)}
                className="w-full text-left bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 hover:border-neutral-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-900">{role.title}</h3>
                      <span className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        role.type === 'internship'
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'bg-green-50 text-green-600 border border-green-200'
                      }`}>
                        {role.type === 'internship' ? 'Internship' : 'Full-time'}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 mb-3 leading-relaxed">{role.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{role.team}</span>
                      <span className="text-neutral-200">·</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{role.location}</span>
                      <span className="text-neutral-200">·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Flexible hours</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 hidden sm:flex items-center gap-2 text-sm text-neutral-400 group-hover:text-neutral-900 transition-colors mt-1">
                    <span className="font-medium">Apply</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {filteredRoles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-neutral-400 text-sm">No open positions on this team right now.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight mb-2">How it works</h2>
            <p className="text-sm text-neutral-500">Our internship process is simple and transparent.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Apply", desc: "Pick a role and tell us about yourself. No cover letter needed — just the basics." },
              { step: "02", title: "Chat", desc: "A short conversation about your interests, experience, and what excites you about AI." },
              { step: "03", title: "Trial task", desc: "A small, relevant project to see how you think and work. Nothing unreasonable." },
              { step: "04", title: "Join", desc: "Start working with the team. You'll get onboarded, assigned a mentor, and ship code." },
            ].map((item, idx) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp}>
                <div className="text-2xl font-bold text-neutral-200 mb-3">{item.step}</div>
                <h3 className="text-base font-semibold text-neutral-900 mb-1.5">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              Don't see your role?
            </h2>
            <p className="text-neutral-400 mb-8 max-w-lg mx-auto leading-relaxed">
              We're always open to hearing from exceptional people. Tell us what you'd like to work on and we'll figure it out together.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) { setSelectedRole(null); setSubmitted(false); } }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-neutral-900">{selectedRole.title}</h3>
                      <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        selectedRole.type === 'internship'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-green-50 text-green-600'
                      }`}>
                        {selectedRole.type === 'internship' ? 'Internship' : 'Full-time'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span>{selectedRole.team}</span>
                      <span>·</span>
                      <span>{selectedRole.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedRole(null); setSubmitted(false); }}
                    className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>

                <p className="text-sm text-neutral-600 mb-5 leading-relaxed">{selectedRole.description}</p>

                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2">What you'll do</h4>
                  <ul className="space-y-1.5">
                    {selectedRole.responsibilities.map((r, i) => (
                      <li key={i} className="text-sm text-neutral-500 flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2">What we're looking for</h4>
                  <ul className="space-y-1.5">
                    {selectedRole.requirements.map((r, i) => (
                      <li key={i} className="text-sm text-neutral-500 flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-neutral-300 mt-2 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-neutral-100 pt-6">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="text-base font-semibold text-neutral-900 mb-1">Application sent</h4>
                      <p className="text-sm text-neutral-500">Your email client should have opened. We'll review your application soon.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleApply} className="space-y-3">
                      <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-1">Apply now</h4>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Full name"
                      />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Email address"
                      />
                      <input
                        type="text"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Portfolio / LinkedIn (optional)"
                      />
                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 text-sm resize-none text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Why are you interested in this role?"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 bg-neutral-900 text-white rounded-xl font-medium hover:bg-black active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" /> Submit Application
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;
