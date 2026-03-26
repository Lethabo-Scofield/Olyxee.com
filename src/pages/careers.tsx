import { FC, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, MapPin, X, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

interface Internship {
  title: string;
  team: string;
  location: string;
  description: string;
}

const internships: Internship[] = [
  {
    title: "AI Research Intern",
    team: "Research",
    location: "Remote",
    description: "Contribute to research on AI verification, model reliability, and edge deployment. Help publish papers and build prototypes.",
  },
  {
    title: "ML Engineering Intern",
    team: "Platform",
    location: "Remote",
    description: "Work on model optimization pipelines, quantization techniques, and hardware-aware inference for edge devices.",
  },
  {
    title: "Systems Engineering Intern",
    team: "Infrastructure",
    location: "Remote",
    description: "Help build distributed deployment infrastructure, runtime monitoring, and hardware abstraction layers.",
  },
  {
    title: "Developer Experience Intern",
    team: "Developer Tools",
    location: "Remote",
    description: "Improve SDKs, CLI tools, and documentation. Build tutorials and sample projects that help developers adopt Olyxee.",
  },
  {
    title: "Product Design Intern",
    team: "Design",
    location: "Remote",
    description: "Design interfaces for AI infrastructure tools. Create intuitive experiences for complex technical workflows.",
  },
  {
    title: "Technical Writing Intern",
    team: "Content",
    location: "Remote",
    description: "Write technical documentation, blog posts, and educational content about AI deployment and reliability.",
  },
];

const Careers: FC = () => {
  const [selectedRole, setSelectedRole] = useState<Internship | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", portfolio: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

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
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Careers</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.05] mb-8">
            Help us build the
            <br />
            <em className="text-neutral-400">future of AI</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            We're looking for talented individuals passionate about AI reliability, systems engineering,
            and building infrastructure that matters. Join us as an intern and work on real problems.
          </motion.p>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-16">
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              Why <em className="text-neutral-400">Olyxee</em>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200">
            {[
              { title: "Real problems", description: "Work on distributed systems, AI verification, and edge deployment — not busywork. Your contributions ship to production." },
              { title: "Learn by doing", description: "Mentorship from experienced engineers. Access to cutting-edge research. Build skills that matter in AI infrastructure." },
              { title: "Remote & flexible", description: "Work from anywhere on your schedule. We care about what you build, not when or where you build it." },
            ].map((item, idx) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="bg-white p-10 sm:p-12">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-16">
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900 mb-4">
              Open Internships
            </h2>
            <p className="text-neutral-400 text-sm uppercase tracking-widest font-medium">Unpaid · Remote · Flexible hours</p>
          </motion.div>

          <div className="divide-y divide-neutral-200">
            {internships.map((job, idx) => (
              <motion.div
                key={job.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="py-10 group cursor-pointer hover:px-4 transition-all"
                onClick={() => setSelectedRole(job)}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">{job.title}</h3>
                      <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">{job.team}</span>
                    </div>
                    <p className="text-neutral-500 text-sm leading-relaxed max-w-xl mb-3">{job.description}</p>
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        {job.location} · Unpaid Internship
                      </span>
                      <span className="text-neutral-300">·</span>
                      <span className="text-neutral-900 font-medium group-hover:underline">Apply →</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-neutral-900 transition-all flex-shrink-0 hidden sm:block mt-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Don't see your role?
              <br />
              <em className="text-neutral-500">Reach out anyway.</em>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              We're always looking for exceptional people. Tell us what you'd like to work on.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide">
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) { setSelectedRole(null); setSubmitted(false); } }}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-lg overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.82)',
                backdropFilter: 'blur(40px) saturate(200%)',
                WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                borderRadius: 28,
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.08)',
              }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-1">{selectedRole.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-200 font-medium">{selectedRole.team}</span>
                      <span>{selectedRole.location} · Unpaid</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedRole(null); setSubmitted(false); }}
                    className="p-2 hover:bg-white/60 rounded-full transition-all"
                  >
                    <X className="w-5 h-5 text-neutral-500" />
                  </button>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-neutral-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-neutral-900 mb-2">Application sent</h4>
                    <p className="text-sm text-neutral-500">Your email client should have opened. We'll review your application shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/60 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400/30 text-sm text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/60 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400/30 text-sm text-neutral-900 placeholder:text-neutral-400"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">Portfolio / LinkedIn</label>
                      <input
                        type="text"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/60 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400/30 text-sm text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Link to your work (optional)"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">Why this role?</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/60 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400/30 text-sm resize-none text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Tell us why you're interested and what you'd bring..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-neutral-900 text-white rounded-2xl font-medium hover:bg-black active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="w-4 h-4" /> Send Application
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;
