import { FC } from "react";
import LegalLayout, { LegalSection } from "../components/LegalLayout";

const sections: LegalSection[] = [
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
    content: "We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website with a revised effective date. Your continued use of our services after changes constitutes acceptance."
  },
  {
    title: "10. Contact",
    content: "For questions, concerns, or requests related to this Privacy Policy, contact us at scofield@olyxee.com."
  },
];

const Privacy: FC = () => (
  <LegalLayout
    documentTitle="Privacy Policy"
    documentNumber="OLX-LGL-001"
    version="3.1"
    effectiveDate="May 2026"
    description="Olyxee's privacy policy. How we collect, use, and protect your data."
    path="/privacy"
    intro="This policy describes how Olyxee (Pty) Ltd (Registration No. 2026/326516/07), trading as Olyxee, collects, uses, and safeguards information when you use our websites, products, and services."
    sections={sections}
    downloadFilename="Olyxee_Privacy_Policy.txt"
    contactEmail="scofield@olyxee.com"
  />
);

export default Privacy;
