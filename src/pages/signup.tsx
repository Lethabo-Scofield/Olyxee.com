import { FC, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const SignUp: FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", role: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Sign Up" description="Create your Olyxee Platform account. Get access to AI verification, evaluation, and monitoring tools." path="/signup" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div custom={0} variants={fadeUp} className="flex items-center gap-2 mb-8">
                <span className="accent-dot" />
                <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Get Started</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} className="font-serif text-5xl sm:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-8">
                Join the <em className="text-blue-500">Olyxee</em> Platform
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} className="text-lg text-neutral-500 leading-relaxed mb-12 font-light">
                Sign up for access to the Olyxee Platform — tools and infrastructure to make your AI applications more reliable, accurate, and observable.
              </motion.p>

              <div className="space-y-5">
                {[
                  "Real-time verification for AI outputs",
                  "Continuous evaluation and quality scoring",
                  "Production monitoring and drift detection",
                  "Team dashboards and reporting",
                ].map((feature, idx) => (
                  <motion.div key={feature} custom={idx + 3} variants={fadeUp} className="flex gap-3 items-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              {submitted ? (
                <div className="bg-neutral-50 rounded-2xl p-10 border border-neutral-200 text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 text-neutral-900">You're on the list</h2>
                  <p className="text-neutral-500 mb-6">We'll reach out soon with your access details.</p>
                  <Link href="/" className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                    Back to home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-neutral-50 rounded-2xl p-8 sm:p-10 border border-neutral-200 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent transition-all"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">Company</label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent transition-all"
                      placeholder="Your company (optional)"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-neutral-700 mb-2">Role</label>
                    <select
                      id="role"
                      value={formData.role}
                      onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent transition-all"
                    >
                      <option value="">Select your role</option>
                      <option value="engineer">Engineer / Developer</option>
                      <option value="mlops">ML / AI Engineer</option>
                      <option value="lead">Engineering Lead</option>
                      <option value="product">Product Manager</option>
                      <option value="founder">Founder / Executive</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-neutral-900 text-white rounded-xl font-medium hover:bg-black transition-all text-sm tracking-wide flex items-center justify-center gap-2 group"
                  >
                    Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <p className="text-xs text-neutral-400 text-center leading-relaxed">
                    By signing up, you agree to our{" "}
                    <Link href="/terms" className="underline hover:text-neutral-600 transition-colors">Terms of Service</Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline hover:text-neutral-600 transition-colors">Privacy Policy</Link>.
                  </p>
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

export default SignUp;
