import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const Terms: FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-8">Terms of Use</h1>
          <p className="text-gray-500 mb-12">Last updated: October 2025</p>
          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using Olyxee's services, you agree to be bound by these Terms of Use. If you do not agree, you may not use our services.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Use of Services</h2>
              <p>You may use our services only in compliance with these terms and all applicable laws. You are responsible for maintaining the confidentiality of your account credentials.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Intellectual Property</h2>
              <p>All content, software, and materials provided through Olyxee's services are owned by Olyxee or its licensors. You may not copy, modify, or distribute these materials without permission.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. API and SDK Usage</h2>
              <p>Use of Olyxee APIs and SDKs is subject to our developer terms. You agree not to reverse engineer, misuse, or exceed rate limits on our APIs.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Limitation of Liability</h2>
              <p>Olyxee's services are provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from use of our services.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Changes to Terms</h2>
              <p>We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact</h2>
              <p>For questions about these terms, contact us at legal@olyxee.com or visit our <a href="/contact" className="text-gray-900 underline hover:text-gray-700">contact page</a>.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Terms;
