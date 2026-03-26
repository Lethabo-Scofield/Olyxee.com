import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import { motion } from "framer-motion";

const Terms: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Terms of Use" description="Olyxee's terms of use governing access to our platform and services." path="/terms" />
      <div className="grain" />
      <Header />
      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Legal</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-4">
            Terms of Use
          </motion.h1>
          <p className="text-neutral-400 text-sm mb-16">Last updated: October 2025</p>
          <div className="space-y-10">
            {[
              { title: "1. Acceptance of Terms", content: "By accessing or using Olyxee's services, you agree to be bound by these Terms of Use. If you do not agree, you may not use our services." },
              { title: "2. Use of Services", content: "You may use our services only in compliance with these terms and all applicable laws. You are responsible for maintaining the confidentiality of your account credentials." },
              { title: "3. Intellectual Property", content: "All content, software, and materials provided through Olyxee's services are owned by Olyxee or its licensors. You may not copy, modify, or distribute these materials without permission." },
              { title: "4. API and SDK Usage", content: "Use of Olyxee APIs and SDKs is subject to our developer terms. You agree not to reverse engineer, misuse, or exceed rate limits on our APIs." },
              { title: "5. Limitation of Liability", content: "Olyxee's services are provided \"as is\" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from use of our services." },
              { title: "6. Changes to Terms", content: "We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the updated terms." },
              { title: "7. Contact", content: "For questions about these terms, contact us at legal@olyxee.com." },
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

export default Terms;
