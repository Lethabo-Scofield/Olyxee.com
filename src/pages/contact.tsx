import { FC, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Mail, MessageSquare, Building2, Users } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Contact: FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", type: "general", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div custom={0} variants={fadeUp} className="flex items-center gap-2 mb-8">
                <span className="accent-dot" />
                <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Contact</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} className="font-serif text-5xl sm:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-8">
                Let's <em className="text-neutral-400">talk.</em>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} className="text-lg text-neutral-500 leading-relaxed mb-12 font-light">
                Whether you're evaluating Olyxee for your team, interested in research collaboration,
                or exploring partnership opportunities — we'd like to hear from you.
              </motion.p>

              <div className="space-y-6">
                {[
                  { icon: Building2, title: "Enterprise", description: "Custom deployments, SLAs, and dedicated support." },
                  { icon: Users, title: "Partnerships", description: "Hardware vendors, cloud providers, and research institutions." },
                  { icon: MessageSquare, title: "Research Collaboration", description: "Joint research on AI reliability and verification." },
                  { icon: Mail, title: "General Inquiries", description: "Questions about Olyxee and our technology." },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={idx + 3} variants={fadeUp} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-neutral-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-neutral-900">{item.title}</h3>
                        <p className="text-sm text-neutral-500">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              {submitted ? (
                <div className="bg-neutral-50 rounded-2xl p-10 border border-neutral-200 text-center">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-neutral-500" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 text-neutral-900">Thank you</h2>
                  <p className="text-neutral-500">We've received your message and will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-neutral-50 rounded-2xl p-8 sm:p-10 border border-neutral-200 space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-neutral-900">Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-sm text-neutral-900" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-neutral-900">Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-sm text-neutral-900" placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-neutral-900">Company</label>
                    <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-sm text-neutral-900" placeholder="Your company (optional)" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-neutral-900">Inquiry Type</label>
                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-sm text-neutral-900">
                      <option value="general">General Inquiry</option>
                      <option value="enterprise">Enterprise</option>
                      <option value="partnership">Partnership</option>
                      <option value="research">Research Collaboration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-neutral-900">Message</label>
                    <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-sm resize-none text-neutral-900" placeholder="Tell us about your needs..." />
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide">
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
