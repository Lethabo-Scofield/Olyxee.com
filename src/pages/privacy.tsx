import { FC, useRef } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    content: "We collect information you provide directly, such as when you create an account, fill out a contact form, subscribe to a waitlist, or communicate with us. This may include your name, email address, company name, job title, and any messages you send.\n\nWe also collect technical information automatically when you use our services, including IP address, browser type and version, device information, operating system, referring URLs, pages visited, and usage patterns through cookies and similar technologies."
  },
  {
    title: "2. How We Use Your Information",
    content: "We use collected information to:\n\n• Provide, operate, maintain, and improve our services and products\n• Communicate with you about product updates, security alerts, and support\n• Process and respond to your requests, inquiries, and feedback\n• Analyze usage trends to improve user experience and service performance\n• Detect, investigate, and prevent fraudulent or unauthorized activity\n• Comply with applicable legal obligations and enforce our terms"
  },
  {
    title: "3. Data Sharing and Disclosure",
    content: "We do not sell, rent, or trade your personal information to third parties. We may share data with:\n\n• Service providers who help us operate our platform (hosting, analytics, communication tools), under strict contractual obligations\n• Legal authorities when required by law, regulation, legal process, or governmental request\n• Third parties in connection with a merger, acquisition, or sale of assets, with prior notice where feasible"
  },
  {
    title: "4. Data Retention",
    content: "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. When data is no longer needed, it is securely deleted or anonymized."
  },
  {
    title: "5. Data Security",
    content: "We implement industry-standard technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These include encryption in transit and at rest, access controls, regular security assessments, and incident response procedures.\n\nHowever, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security."
  },
  {
    title: "6. Your Rights",
    content: "Depending on your jurisdiction, you may have the right to:\n\n• Access the personal data we hold about you\n• Request correction of inaccurate or incomplete data\n• Request deletion of your personal data\n• Object to or restrict certain processing activities\n• Request data portability\n• Withdraw consent at any time where processing is based on consent\n• Opt out of marketing communications\n\nTo exercise any of these rights, contact us at scofield@olyxee.com."
  },
  {
    title: "7. Cookies and Tracking",
    content: "We use cookies and similar tracking technologies to collect usage data and improve our services. You can control cookie preferences through your browser settings. Disabling certain cookies may affect service functionality."
  },
  {
    title: "8. International Transfers",
    content: "Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws."
  },
  {
    title: "9. Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website with a revised \"Last updated\" date. Your continued use of our services after changes constitutes acceptance."
  },
  {
    title: "10. Contact",
    content: "For questions, concerns, or requests related to this Privacy Policy, contact us at:\n\nscofield@olyxee.com"
  },
];

const Privacy: FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    let text = "OLYXEE | PRIVACY POLICY\nLast updated: April 2026\n\n";
    sections.forEach((s) => {
      text += `${s.title}\n\n${s.content}\n\n`;
    });
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Olyxee_Privacy_Policy.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 relative">
      <SEO title="Privacy Policy" description="Olyxee's privacy policy. How we collect, use, and protect your data." path="/privacy" />
      <div className="grain" />
      <Header />
      <section className="pt-36 sm:pt-44 pb-28 sm:pb-36 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-10">
              <Image src="/Logo/Olyxee_trans.png" alt="Olyxee" width={32} height={32} />
              <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Legal</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-neutral-900 tracking-tight leading-[1.08] mb-3">
              Privacy Policy
            </h1>
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-neutral-400 text-sm">Last updated: April 2026</p>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-neutral-500 hover:text-neutral-900 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </motion.div>

          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-10"
          >
            {sections.map((section, idx) => (
              <div key={section.title} className="group">
                <h2 className="text-base font-semibold text-neutral-900 mb-3">{section.title}</h2>
                <p className="text-[15px] text-neutral-500 leading-relaxed font-light whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 pt-8 border-t border-neutral-200"
          >
            <div className="flex items-center gap-3">
              <Image src="/Logo/Olyxee_trans.png" alt="Olyxee" width={24} height={24} />
              <span className="text-sm text-neutral-400">© {new Date().getFullYear()} Olyxee. All rights reserved.</span>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Privacy;
