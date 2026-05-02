import { FC, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export interface ContactTopic {
  key: string;
  label: string;
  title: string;
  placeholder: string;
}

interface Props {
  topic: ContactTopic;
  onClose: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full px-4 py-3.5 bg-neutral-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400";

const labelClass = "block text-xs font-medium text-neutral-500 mb-2";

const ContactForm: FC<Props> = ({ topic, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): string | null => {
    if (!firstName.trim()) return "Please enter your first name.";
    if (!surname.trim()) return "Please enter your surname.";
    if (!email.trim()) return "Please enter your email.";
    if (!EMAIL_RE.test(email.trim())) return "Please enter a valid email address.";
    if (message.trim().length < 10)
      return "Please share a few details about what you need.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    const err = validate();
    if (err) return setError(err);

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.key,
          full_name: `${firstName.trim()} ${surname.trim()}`,
          email: email.trim(),
          company: company.trim(),
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
      console.error("contact submit error", err);
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-green-500" />
        </div>
        <h4 className="font-serif text-2xl tracking-tight text-neutral-900 mb-1">
          Message received
        </h4>
        <p className="text-sm text-neutral-500 max-w-xs mx-auto">
          Thanks, we've got it. We'll route this to the right person and reply within one business day.
        </p>
        <button
          onClick={onClose}
          className="mt-6 text-sm text-neutral-900 font-medium hover:text-neutral-600 transition-colors"
        >
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          {topic.label} · About 1 minute
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>First name</label>
          <input
            type="text"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
            placeholder="First name"
          />
        </div>
        <div>
          <label className={labelClass}>Surname</label>
          <input
            type="text"
            required
            autoComplete="family-name"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className={inputClass}
            placeholder="Last name"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Email address</label>
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className={labelClass}>
          Company <span className="text-neutral-400 font-normal normal-case">(optional)</span>
        </label>
        <input
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
          placeholder="Where you work"
        />
      </div>

      <div>
        <label className={labelClass}>Message</label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
          rows={5}
          placeholder={topic.placeholder}
        />
      </div>

      {error && <p className="text-sm text-red-600 leading-relaxed">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-neutral-900 text-white rounded-xl font-medium text-sm hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Send message"}
      </button>

      <p className="text-[11px] text-neutral-400 text-center pt-1">
        Your message goes directly to our team. No third parties.
      </p>
    </form>
  );
};

export default ContactForm;
