import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const Privacy: FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-8">Privacy Policy</h1>
          <p className="text-gray-500 mb-12">Last updated: October 2025</p>
          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly — such as when you create an account, fill out a contact form, or communicate with us. This may include your name, email address, company name, and any messages you send.</p>
              <p className="mt-3">We also collect technical information automatically, including IP address, browser type, device information, and usage data through cookies and similar technologies.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p>We use collected information to provide, maintain, and improve our services; communicate with you about products and updates; ensure security and prevent fraud; and comply with legal obligations.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Sharing</h2>
              <p>We do not sell your personal information. We may share data with service providers who help us operate our platform, or when required by law.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
              <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the Internet is 100% secure.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact</h2>
              <p>For questions about this policy, contact us at privacy@olyxee.com or visit our <a href="/contact" className="text-gray-900 underline hover:text-gray-700">contact page</a>.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Privacy;
