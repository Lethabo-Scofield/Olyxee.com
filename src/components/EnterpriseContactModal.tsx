import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Phone, Mail, CheckCircle } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-400 text-[15px] text-neutral-900 placeholder:text-neutral-400 transition-colors";
const labelClass = "block text-sm font-medium text-neutral-900 mb-2";

type Preference = "email" | "call";

interface TalkToEnterpriseProps {
  label?: string;
  className?: string;
}

const DEFAULT_TRIGGER_CLASS =
  "group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/10";

const TalkToEnterprise: FC<TalkToEnterpriseProps> = ({
  label = "Talk to enterprise",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preference, setPreference] = useState<Preference>("email");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const resetAndClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setError(null);
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setPreference("email");
      setMessage("");
    }, 300);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") resetAndClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!name.trim()) return setError("Please enter your name.");
    if (!company.trim()) return setError("Please enter your company.");
    if (!email.trim() || !EMAIL_RE.test(email.trim()))
      return setError("Please enter a valid email.");
    if (preference === "call" && !phone.trim())
      return setError("Please add a phone number so we can call you.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/enterprise/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          phone: phone.trim(),
          preference,
          message: message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error("enterprise contact error", err);
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className ?? DEFAULT_TRIGGER_CLASS}
      >
        {label} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            aria-modal="true"
            role="dialog"
          >
            <div
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
              onClick={resetAndClose}
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl shadow-neutral-900/20 border border-neutral-200/70"
            >
              <button
                type="button"
                onClick={resetAndClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="px-7 sm:px-10 py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-6 h-6 text-neutral-700" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-2xl font-serif tracking-tight text-neutral-900 mb-2">
                    Message sent
                  </h3>
                  <p className="text-[15px] text-neutral-600 max-w-sm mx-auto leading-relaxed">
                    Thanks, we&apos;ve got it. A member of our team will reach out{" "}
                    {preference === "call" ? "by phone" : "by email"} shortly.
                  </p>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors text-sm"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="px-7 sm:px-10 py-9 sm:py-10">
                  <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-neutral-900 mb-2">
                    Talk to enterprise
                  </h3>
                  <p className="text-[15px] text-neutral-600 leading-relaxed mb-7">
                    Tell us a little about your team and how you&apos;d like us to reach you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          Name <span className="text-neutral-400">*</span>
                        </label>
                        <input
                          type="text"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Company <span className="text-neutral-400">*</span>
                        </label>
                        <input
                          type="text"
                          autoComplete="organization"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Email <span className="text-neutral-400">*</span>
                      </label>
                      <input
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                        placeholder="you@company.com"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>How should we reach you?</label>
                      <div className="grid grid-cols-2 gap-3">
                        {([
                          { value: "email" as Preference, label: "Email", icon: Mail },
                          { value: "call" as Preference, label: "Call", icon: Phone },
                        ]).map((opt) => {
                          const active = preference === opt.value;
                          const Icon = opt.icon;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setPreference(opt.value)}
                              aria-pressed={active}
                              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-[15px] font-medium transition-all ${
                                active
                                  ? "border-neutral-900 bg-neutral-900 text-white"
                                  : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {preference === "call" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-1">
                            <label className={labelClass}>
                              Phone number <span className="text-neutral-400">*</span>
                            </label>
                            <input
                              type="tel"
                              autoComplete="tel"
                              inputMode="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className={inputClass}
                              placeholder="+27 ..."
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <label className={labelClass}>
                        Message <span className="text-neutral-400 font-normal">(optional)</span>
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        className={`${inputClass} resize-none`}
                        placeholder="What are you hoping to do with Orgni?"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600 leading-relaxed">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors disabled:opacity-60 text-sm tracking-wide"
                    >
                      {submitting ? "Sending…" : "Send"}
                      {!submitting && <ArrowRight className="w-4 h-4" />}
                    </button>
                    <p className="text-[13px] text-neutral-500 text-center leading-relaxed">
                      Your message goes straight to our team. No third parties.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TalkToEnterprise;
