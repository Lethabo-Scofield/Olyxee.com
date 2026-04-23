import { FC, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { Role, Question } from "../../lib/careers-roles";
import { schools } from "../../lib/schools";

interface Props {
  role: Role;
  onClose: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+\..+/i;

const inputClass =
  "w-full px-4 py-3.5 bg-neutral-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400";

const labelClass =
  "block text-xs font-medium text-neutral-500 mb-2";

const ApplicationForm: FC<Props> = ({ role, onClose }) => {
  const isPaid = role.type === "paid" && Array.isArray(role.questions) && role.questions.length > 0;
  const totalSteps = isPaid ? 3 : 1;

  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [schoolFocused, setSchoolFocused] = useState(false);
  const [portfolio, setPortfolio] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [whyMessage, setWhyMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const schoolBlurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const schoolSuggestions = useMemo(() => {
    const q = school.trim().toLowerCase();
    if (!q) return [];
    const matches = schools.filter((s) => s.toLowerCase().includes(q));
    if (matches.length === 1 && matches[0].toLowerCase() === q) return [];
    return matches.slice(0, 8);
  }, [school]);

  const setAnswer = (id: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const validateBasic = (): string | null => {
    if (!firstName.trim()) return "Please enter your first name.";
    if (!surname.trim()) return "Please enter your surname.";
    if (!email.trim()) return "Please enter your email.";
    if (!EMAIL_RE.test(email.trim())) return "Please enter a valid email address.";
    return null;
  };

  const validateInternshipExtras = (): string | null => {
    if (!portfolio.trim()) return "Please share a link to your work - LinkedIn, GitHub, portfolio, or CV.";
    if (!URL_RE.test(portfolio.trim())) return "That link doesn't look right. Make sure it starts with http:// or https://";
    return null;
  };

  const validateQuestions = (): string | null => {
    for (const q of role.questions ?? []) {
      const value = (answers[q.id] ?? "").trim();
      if (q.required && !value) return `Please answer: ${q.label.replace(" (optional)", "")}.`;
      if (value && q.type === "url" && !URL_RE.test(value)) {
        return `Please enter a valid URL for: ${q.label.replace(" (optional)", "")}.`;
      }
    }
    return null;
  };

  const handleNext = () => {
    setError(null);
    if (step === 0) {
      const err = validateBasic();
      if (err) return setError(err);
    } else if (step === 1 && isPaid) {
      const err = validateQuestions();
      if (err) return setError(err);
    }
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const buildPayload = () => {
    const body: Record<string, unknown> = {
      role_title: role.title,
      first_name: firstName.trim(),
      surname: surname.trim(),
      full_name: `${firstName.trim()} ${surname.trim()}`,
      email: email.trim(),
      message: whyMessage.trim(),
    };
    if (isPaid) {
      body.answers = answers;
    } else {
      body.portfolio = portfolio.trim();
      body.school = school.trim();
    }
    return body;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!isPaid) {
      const basicErr = validateBasic();
      if (basicErr) return setError(basicErr);
      const extrasErr = validateInternshipExtras();
      if (extrasErr) return setError(extrasErr);
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
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
      console.error("apply submit error", err);
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
        <h4 className="font-serif text-2xl tracking-tight text-neutral-900 mb-1">Application received</h4>
        <p className="text-sm text-neutral-500 max-w-xs mx-auto">
          Thanks, we've got it. If we'd like to move forward, you'll hear from us at the email you provided.
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
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          {isPaid ? `Apply now · Step ${step + 1} of ${totalSteps}` : "Apply now · About 1 minute"}
        </h4>
        {isPaid && (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? "w-6 bg-neutral-900" : i < step ? "w-3 bg-neutral-400" : "w-3 bg-neutral-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {step === 0 && (
            <>
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

              {!isPaid && (
                <>
                  <div className="relative">
                    <label className={labelClass}>School you attend or attended <span className="text-neutral-400 font-normal normal-case">(optional)</span></label>
                    <input
                      type="text"
                      autoComplete="off"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      onFocus={() => {
                        if (schoolBlurTimeout.current) clearTimeout(schoolBlurTimeout.current);
                        setSchoolFocused(true);
                      }}
                      onBlur={() => {
                        schoolBlurTimeout.current = setTimeout(() => setSchoolFocused(false), 120);
                      }}
                      className={inputClass}
                      placeholder="Start typing your school name..."
                    />
                    {schoolFocused && schoolSuggestions.length > 0 && (
                      <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-neutral-100 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                        {schoolSuggestions.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setSchool(s);
                              setSchoolFocused(false);
                            }}
                            className="block w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                    <p className="text-[11px] text-neutral-400 mt-1.5">Pick from the list or type your own.</p>
                  </div>
                  <div>
                    <label className={labelClass}>Link to portfolio, GitHub, LinkedIn, or CV</label>
                    <input
                      type="url"
                      required
                      autoComplete="url"
                      inputMode="url"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      className={inputClass}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className={labelClass}>A few sentences about why you're interested <span className="text-neutral-400 font-normal normal-case">(optional)</span></label>
                    <textarea
                      value={whyMessage}
                      onChange={(e) => setWhyMessage(e.target.value)}
                      className={`${inputClass} resize-none`}
                      rows={3}
                      placeholder="What you're hoping to learn, or anything you've built that you're proud of."
                    />
                  </div>
                </>
              )}
            </>
          )}

          {step === 1 && isPaid && (
            <>
              {(role.questions ?? []).map((q: Question) => (
                <div key={q.id}>
                  <label className={labelClass}>{q.label}</label>
                  {q.type === "textarea" ? (
                    <textarea
                      required={q.required}
                      value={answers[q.id] ?? ""}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      className={`${inputClass} resize-none`}
                      rows={4}
                      placeholder={q.placeholder}
                    />
                  ) : q.type === "select" ? (
                    <select
                      required={q.required}
                      value={answers[q.id] ?? ""}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {(q.options ?? []).map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={q.type === "url" ? "url" : "text"}
                      required={q.required}
                      autoComplete={q.autoComplete}
                      inputMode={q.inputMode}
                      value={answers[q.id] ?? ""}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      className={inputClass}
                      placeholder={q.placeholder}
                    />
                  )}
                </div>
              ))}
            </>
          )}

          {step === 2 && isPaid && (
            <div>
              <label className={labelClass}>Why this role at Olyxee?</label>
              <textarea
                value={whyMessage}
                onChange={(e) => setWhyMessage(e.target.value)}
                className={`${inputClass} resize-none`}
                rows={6}
                placeholder="What draws you to this role and to Olyxee specifically? What do you want to own here?"
              />
              <p className="text-[11px] text-neutral-400 mt-2">Optional, but the strongest applications take this seriously.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {error && <p className="text-sm text-red-600 leading-relaxed">{error}</p>}

      <div className="flex items-center gap-3 pt-1">
        {isPaid && step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            disabled={submitting}
            className="px-5 py-3.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors disabled:opacity-50"
          >
            Back
          </button>
        )}
        {isPaid && step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-4 bg-neutral-900 text-white rounded-xl font-medium text-sm hover:bg-black transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 py-4 bg-neutral-900 text-white rounded-xl font-medium text-sm hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Submit application"}
          </button>
        )}
      </div>

      <p className="text-[11px] text-neutral-400 text-center pt-1">
        Your information is sent directly to our hiring team. No third parties.
      </p>
    </form>
  );
};

export default ApplicationForm;
