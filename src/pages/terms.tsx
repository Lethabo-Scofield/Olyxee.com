import { FC } from "react";
import LegalLayout, { LegalSection } from "../components/LegalLayout";

const sections: LegalSection[] = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using any of Olyxee's services, websites, APIs, SDKs, or related products (collectively, \"Services\"), you agree to be bound by these Terms of Use. If you do not agree to these terms, you may not access or use our Services.\n\nThese terms constitute a legally binding agreement between you (or the entity you represent) and Olyxee (Pty) Ltd (Registration No. 2026/326516/07), a company incorporated in South Africa (\"Olyxee\", \"we\", or \"us\")."
  },
  {
    title: "2. Eligibility",
    content: "You must be at least 18 years of age (or the age of legal majority in your jurisdiction) to use our Services. By using our Services, you represent and warrant that you meet this requirement and have the authority to enter into these terms."
  },
  {
    title: "3. Account Responsibilities",
    content: "If you create an account with Olyxee, you are responsible for:\n\n• Maintaining the confidentiality of your account credentials\n• All activities that occur under your account\n• Notifying us immediately of any unauthorized use of your account\n• Ensuring that your account information is accurate and up to date\n\nOlyxee reserves the right to suspend or terminate accounts that violate these terms."
  },
  {
    title: "4. Permitted Use",
    content: "You may use our Services only in compliance with these terms and all applicable local, national, and international laws and regulations. You agree not to:\n\n• Use our Services for any unlawful or fraudulent purpose\n• Attempt to gain unauthorized access to our systems or networks\n• Interfere with or disrupt the integrity or performance of our Services\n• Reverse engineer, decompile, or disassemble any part of our Services\n• Use our Services to develop competing products or services\n• Exceed documented rate limits or usage quotas"
  },
  {
    title: "5. API and SDK Usage",
    content: "Use of Olyxee APIs, SDKs, and developer tools is subject to these terms and any additional developer documentation we provide. You agree to use our APIs and SDKs only as documented, respect all rate limits and usage policies, and not redistribute or sublicense access to our APIs without written permission."
  },
  {
    title: "6. Intellectual Property",
    content: "All content, software, technology, trademarks, logos, and materials provided through Olyxee's Services are owned by Olyxee or its licensors and are protected by intellectual property laws. You may not copy, modify, distribute, sell, or create derivative works from these materials without prior written permission.\n\nYou retain ownership of any data or content you submit through our Services, and grant Olyxee a limited license to use such content solely to provide the Services."
  },
  {
    title: "7. Disclaimer of Warranties",
    content: "Our Services are provided \"as is\" and \"as available\" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.\n\nOlyxee does not warrant that our Services will be uninterrupted, error-free, secure, or meet your specific requirements."
  },
  {
    title: "8. Limitation of Liability",
    content: "To the maximum extent permitted by applicable law, Olyxee and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, use, or goodwill, arising out of or in connection with your use of our Services.\n\nOlyxee's total aggregate liability shall not exceed the amount you paid to Olyxee in the twelve (12) months preceding the claim."
  },
  {
    title: "9. Indemnification",
    content: "You agree to indemnify and hold harmless Olyxee and its affiliates from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising out of your use of our Services, violation of these terms, or infringement of any third-party rights."
  },
  {
    title: "10. Termination",
    content: "Either party may terminate this agreement at any time. Olyxee may suspend or terminate your access to our Services immediately, without prior notice, if you breach these terms. Upon termination, your right to use our Services ceases immediately. Provisions that by their nature should survive termination will remain in effect."
  },
  {
    title: "11. Changes to Terms",
    content: "We may update these Terms of Use from time to time. Material changes will be communicated by posting the updated terms on our website with a revised effective date. Your continued use of our Services after such changes constitutes acceptance of the updated terms."
  },
  {
    title: "12. Governing Law",
    content: "These terms shall be governed by and construed in accordance with the laws of the Republic of South Africa, without regard to its conflict of law principles. You and Olyxee (Pty) Ltd agree to submit to the exclusive jurisdiction of the South African courts for the resolution of any disputes arising out of or relating to these terms."
  },
  {
    title: "13. Contact",
    content: "For questions about these Terms of Service, contact us at info@olyxee.com."
  },
];

const Terms: FC = () => (
  <LegalLayout
    documentTitle="Terms of Service"
    documentNumber="OLX-LGL-002"
    version="2.4"
    effectiveDate="May 2026"
    description="Olyxee's Terms of Service governing access to our platform and services."
    path="/terms"
    intro="These Terms of Service govern your access to and use of websites, products, APIs, and services provided by Olyxee (Pty) Ltd (Registration No. 2026/326516/07), a company incorporated in South Africa and trading as Olyxee, Research and Infrastructure for Artificial Intelligence. Please read them carefully."
    sections={sections}
    downloadFilename="Olyxee_Terms_of_Service.txt"
    contactEmail="info@olyxee.com"
  />
);

export default Terms;
