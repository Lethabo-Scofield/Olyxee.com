import { FC, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import { Mail, MapPin, Clock, Building2, Users, Beaker, MessageSquare, LifeBuoy, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

type InquiryType = "general" | "enterprise" | "partnership" | "research" | "support";

const INQUIRY_OPTIONS: { value: InquiryType; label: string; icon: typeof Mail; hint: string }[] = [
  { value: "general", label: "General", icon: MessageSquare, hint: "Anything else" },
  { value: "enterprise", label: "Enterprise", icon: Building2, hint: "Pilots, SLAs, deployments" },
  { value: "partnership", label: "Partnership", icon: Users, hint: "Vendors, channels, alliances" },
  { value: "research", label: "Research", icon: Beaker, hint: "Joint work, datasets, papers" },
  { value: "support", label: "Support", icon: LifeBuoy, hint: "Existing customer issue" },
];

const FAQS = [
  {
    q: "How fast do you respond?",
    a: "Most messages get a reply within one business day. Enterprise and support requests are prioritized.",
  },
  {
    q: "Can I email you directly?",
    a: "Yes. Reach out at scofield@olyxee.com and we'll route it to the right person on the team.",
  },
  {
    q: "Where is Olyxee based?",
    a: "Hybrid out of Johannesburg, South Africa, with collaborators across multiple time zones.",
  },
  {
    q: "Are you hiring?",
    a: "Yes. We have open paid roles and a paid internship program. Visit the Careers page to apply.",
  },
];

const Contact: FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", type: "general" as InquiryType, message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative overflow-hidden">
      <SEO
        title="Contact"
        description="Get in touch with Olyxee. Reach out for partnerships, enterprise pilots, research collaboration, or general inquiries about our AI infrastructure."
        path="/contact"
      />
      <div className="grain" />
      <Header />

      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6">
        <div
          className="absolute inset-x-0 top-0 h-[480px] -z-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 30%, #3b82f6 0%, transparent 40%), radial-gradient(circle at 75% 60%, #fb923c 0%, transparent 45%)",
          }}
        />
        <div className="max-w-6xl mx-auto relative">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div custom={0} variants={fadeUp} className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.25em]">Replying within one business day</span>
            </motion.div>
            <motion.h1 custom={1} variants={fadeUp} className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-6">
              Talk to the team behind <em className="text-blue-500">Olyxee</em>.
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
              Whether you're piloting Grysics in production, scoping a research collaboration, or just curious about what we're building, this is the right place to start the conversation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Mail, label: "Email", value: "scofield@olyxee.com", href: "mailto:scofield@olyxee.com", accent: "text-blue-500" },
            { icon: MapPin, label: "Based in", value: "Johannesburg, South Africa", accent: "text-orange-500" },
            { icon: Clock, label: "Response time", value: "Within 1 business day", accent: "text-emerald-500" },
          ].map((card, i) => {
            const Icon = card.icon;
            const inner = (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group h-full rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 hover:border-neutral-300 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)] transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-neutral-50 flex items-center justify-center flex-shrink-0 ${card.accent}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-1">{card.label}</p>
                    <p className="text-sm font-medium text-neutral-900 truncate">{card.value}</p>
                  </div>
                </div>
              </motion.div>
            );
            return card.href ? (
              <a key={card.label} href={card.href} className="block">{inner}</a>
            ) : (
              <div key={card.label}>{inner}</div>
            );
          })}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.25em] mb-3">What we hear about</p>
              <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-neutral-900 mb-6">Pick the lane that fits, or leave it on general.</h2>
              <div className="space-y-3">
                {INQUIRY_OPTIONS.filter((o) => o.value !== "general").map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <div key={opt.value} className="flex gap-3 items-start py-2">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-neutral-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{opt.label}</p>
                        <p className="text-sm text-neutral-500 font-light leading-relaxed">{opt.hint}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-6">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.25em] mb-3">Looking for a job?</p>
              <p className="text-sm text-neutral-600 font-light leading-relaxed mb-4">
                We have open paid roles and a paid internship program. Use the dedicated application form on the Careers page so we route it to the hiring team faster.
              </p>
              <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-blue-500 transition-colors">
                View open roles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <div className="bg-white rounded-2xl p-10 sm:p-12 border border-neutral-200 text-center shadow-[0_30px_80px_-40px_rgba(0,0,0,0.2)]">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-serif font-semibold mb-3 text-neutral-900">Message received.</h2>
                <p className="text-neutral-500 max-w-md mx-auto leading-relaxed">
                  Thanks for reaching out. We'll get back to you at <span className="text-neutral-900 font-medium">{formData.email}</span> within one business day.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", company: "", type: "general", message: "" });
                  }}
                  className="mt-8 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.2)] space-y-5">
                <div>
                  <label className="block text-xs font-semibold mb-2 text-neutral-500 uppercase tracking-widest">I'm reaching out about</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {INQUIRY_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const active = formData.type === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => setFormData({ ...formData, type: opt.value })}
                          className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all ${
                            active
                              ? "border-neutral-900 bg-neutral-900 text-white"
                              : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2 text-neutral-500 uppercase tracking-widest">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-sm text-neutral-900 placeholder-neutral-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 text-neutral-500 uppercase tracking-widest">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-sm text-neutral-900 placeholder-neutral-400"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-neutral-500 uppercase tracking-widest">Company <span className="text-neutral-300 normal-case font-normal tracking-normal">· optional</span></label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-sm text-neutral-900 placeholder-neutral-400"
                    placeholder="Where do you work?"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-neutral-500 uppercase tracking-widest">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-sm resize-none text-neutral-900 placeholder-neutral-400"
                    placeholder="A few sentences about what you're working on and how we might help."
                  />
                  <p className="mt-2 text-[11px] text-neutral-400">Plain text is fine. The more context, the faster we can route it.</p>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-neutral-400 text-center">
                  By sending, you agree we'll use your details to reply. We don't share or sell your information.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-28 sm:pb-36 border-t border-neutral-100 pt-20 sm:pt-28">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 sm:mb-12">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.25em] mb-3">FAQ</p>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-900">Quick answers, before you write.</h2>
          </div>
          <div className="divide-y divide-neutral-100 border-y border-neutral-100">
            {FAQS.map((f, i) => (
              <motion.div
                key={f.q}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6"
              >
                <p className="sm:col-span-5 text-base font-medium text-neutral-900">{f.q}</p>
                <p className="sm:col-span-7 text-base text-neutral-500 font-light leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
