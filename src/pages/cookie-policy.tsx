import { FC } from "react";
import LegalLayout, { LegalSection } from "../components/LegalLayout";

const sections: LegalSection[] = [
  {
    title: "1. What Are Cookies",
    content: "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, work more efficiently, and provide reporting information to site owners. Similar technologies, including pixels and local storage, are also covered by this policy."
  },
  {
    title: "2. How We Use Cookies",
    content: "Olyxee uses cookies to:\n\n• Keep you signed in to your account\n• Remember your preferences and settings\n• Measure aggregate usage to improve product performance\n• Detect, prevent, and investigate fraudulent or abusive activity\n\nWe do not sell your personal information, and we do not use advertising cookies."
  },
  {
    title: "3. Categories",
    content: "• Strictly necessary, required for core functionality such as authentication and security. These cannot be disabled.\n• Preference, remember choices you make to personalize your experience.\n• Analytics, help us understand how our site and product are used in aggregate.\n\nWe do not use marketing or advertising cookies."
  },
  {
    title: "4. Third-Party Cookies",
    content: "Some cookies may be set by third-party services we use to operate our site, such as analytics or content delivery. These providers are bound by contractual obligations consistent with our privacy commitments."
  },
  {
    title: "5. Managing Cookies",
    content: "You can control cookies through your browser settings, including blocking or deleting cookies. Disabling certain cookies may impact functionality of the site or product. Most browsers also offer a \"Do Not Track\" signal, which we honor where technically feasible."
  },
  {
    title: "6. Updates to This Policy",
    content: "We may update this policy as our services evolve. Material changes will be reflected by an updated effective date and, where required, additional notice."
  },
  {
    title: "7. Contact",
    content: "For questions about this policy, contact scofield@olyxee.com."
  },
];

const CookiePolicy: FC = () => (
  <LegalLayout
    documentTitle="Cookie Policy"
    documentNumber="OLX-LGL-003"
    version="1.3"
    effectiveDate="May 2026"
    description="How Olyxee uses cookies and similar technologies."
    path="/cookie-policy"
    intro="This policy explains how Olyxee uses cookies and similar technologies on our websites and in our products."
    sections={sections}
    downloadFilename="Olyxee_Cookie_Policy.txt"
    contactEmail="scofield@olyxee.com"
  />
);

export default CookiePolicy;
