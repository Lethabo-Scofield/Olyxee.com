import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. What are cookies?",
    body: "Cookies are small text files placed on your device when you visit a website. They are widely used to make sites work, or to work more efficiently, as well as to provide reporting information.",
  },
  {
    title: "2. How we use cookies",
    body: "Olyxee uses cookies to keep you signed in, remember preferences, measure aggregate usage, and improve product performance. We do not sell your personal information.",
  },
  {
    title: "3. Categories",
    body: "Strictly necessary cookies are required for core site functionality. Analytics cookies help us understand how our site is used in aggregate. Preference cookies remember choices you make. We do not use advertising cookies.",
  },
  {
    title: "4. Managing cookies",
    body: "You can control cookies through your browser settings. Disabling certain cookies may impact functionality of the site or product.",
  },
  {
    title: "5. Updates",
    body: "We may update this policy as our services evolve. Material changes will be reflected by the updated date below.",
  },
  {
    title: "6. Contact",
    body: "For questions about this policy, contact privacy@olyxee.com.",
  },
];

const CookiePolicy: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Cookie Policy" description="How Olyxee uses cookies and similar technologies." path="/cookie-policy" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Cookie Policy</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-serif text-4xl sm:text-5xl tracking-tight leading-[1.08] mb-4">
            Cookie Policy
          </motion.h1>
          <p className="text-neutral-400 text-sm">Last updated: May 2026</p>
        </div>
      </section>

      <section className="pb-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-semibold text-neutral-900 mb-3">{s.title}</h2>
              <p className="text-[15px] text-neutral-500 leading-relaxed font-light">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
