import { FC, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const EarlyAccess: FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Early Access — Olyxee"
        description="Get early access to Olyxee's AI verification and edge deployment platform. Be among the first to deploy with confidence."
        path="/early-access"
      />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-5">
              Get early <em className="text-neutral-400">access</em>
            </h1>
            <p className="text-lg text-neutral-500 font-light leading-relaxed">
              Join the first wave of teams deploying verified AI to edge hardware.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-14 h-14 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-6">
                <Check className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">You&apos;re on the list</h2>
              <p className="text-neutral-500 font-light">
                We&apos;ll reach out when your spot is ready.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors placeholder-neutral-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Work email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors placeholder-neutral-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors placeholder-neutral-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors text-neutral-900 appearance-none"
                >
                  <option value="">Select your role</option>
                  <option value="engineer">ML / AI Engineer</option>
                  <option value="devops">DevOps / MLOps</option>
                  <option value="manager">Engineering Manager</option>
                  <option value="founder">Founder / CTO</option>
                  <option value="researcher">Researcher</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide mt-4"
              >
                Request Access <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-neutral-400 text-center pt-2">
                No credit card required. We&apos;ll notify you when access opens.
              </p>
            </motion.form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EarlyAccess;
