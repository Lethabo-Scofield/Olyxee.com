import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { motion } from "framer-motion";

const Privacy: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />
      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Legal</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-4">
            Privacy Policy
          </motion.h1>
          <p className="text-neutral-400 text-sm mb-16">Last updated: October 2025</p>
          <div className="space-y-10">
            {[
              { title: "1. Information We Collect", content: "We collect information you provide directly — such as when you create an account, fill out a contact form, or communicate with us. This may include your name, email address, company name, and any messages you send. We also collect technical information automatically, including IP address, browser type, device information, and usage data through cookies and similar technologies." },
              { title: "2. How We Use Your Information", content: "We use collected information to provide, maintain, and improve our services; communicate with you about products and updates; ensure security and prevent fraud; and comply with legal obligations." },
              { title: "3. Data Sharing", content: "We do not sell your personal information. We may share data with service providers who help us operate our platform, or when required by law." },
              { title: "4. Data Security", content: "We implement industry-standard security measures to protect your information. However, no method of transmission over the Internet is 100% secure." },
              { title: "5. Your Rights", content: "You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time." },
              { title: "6. Contact", content: "For questions about this policy, contact us at privacy@olyxee.com." },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold text-neutral-900 mb-3">{section.title}</h2>
                <p className="text-neutral-500 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Privacy;
