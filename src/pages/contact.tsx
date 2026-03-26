import { FC, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Mail, MessageSquare, Building2, Users } from "lucide-react";

const Contact: FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", type: "general", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Contact</p>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-8">
                Let's talk.
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                Whether you're evaluating Olyxee for your team, interested in research collaboration,
                or exploring partnership opportunities — we'd like to hear from you.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Building2, title: "Enterprise", description: "Custom deployments, SLAs, and dedicated support for large-scale AI operations." },
                  { icon: Users, title: "Partnerships", description: "Hardware vendors, cloud providers, and research institutions." },
                  { icon: MessageSquare, title: "Research Collaboration", description: "Joint research on AI reliability, verification, and deployment." },
                  { icon: Mail, title: "General Inquiries", description: "Questions about Olyxee, our products, or our technology." },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-gray-700" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Thank you</h2>
                  <p className="text-gray-600">We've received your message and will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 sm:p-10 border border-gray-200 space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                      placeholder="Your company (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Inquiry Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="enterprise">Enterprise</option>
                      <option value="partnership">Partnership</option>
                      <option value="research">Research Collaboration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm resize-none"
                      placeholder="Tell us about your needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gray-900 text-white rounded-full font-semibold hover:bg-black transition-all text-sm"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
