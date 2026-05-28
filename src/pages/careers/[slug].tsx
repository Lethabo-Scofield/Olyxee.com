import { FC, useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, MapPin, CheckCircle } from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {
  paidRoles,
  findRoleBySlug,
  type Role,
  type Question,
} from "../../lib/careers-roles";

interface Props {
  role: Role;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+\..+/i;

const inputClass =
  "w-full px-4 py-3.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-400 text-[15px] text-neutral-900 placeholder:text-neutral-400 leading-relaxed transition-colors";
const labelClass = "block text-sm font-medium text-neutral-900 mb-2";
const hintClass = "text-[13px] text-neutral-500 mt-2 leading-relaxed";

const PaidRolePage: FC<Props> = ({ role }) => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (id: string, value: string) =>
    setAnswers((p) => ({ ...p, [id]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!firstName.trim()) return setError("Please enter your first name.");
    if (!surname.trim()) return setError("Please enter your surname.");
    if (!email.trim() || !EMAIL_RE.test(email.trim()))
      return setError("Please enter a valid email address.");

    for (const q of role.questions ?? []) {
      const v = (answers[q.id] ?? "").trim();
      if (q.required && !v) return setError(`Please answer: ${q.label}.`);
      if (v && q.type === "url" && !URL_RE.test(v))
        return setError(`Please enter a valid URL for: ${q.label}.`);
    }

    if (!agree)
      return setError(
        "Please confirm everything in your application is accurate."
      );

    setSubmitting(true);
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role_title: role.title,
          role_slug: role.slug,
          first_name: firstName.trim(),
          surname: surname.trim(),
          full_name: `${firstName.trim()} ${surname.trim()}`,
          email: email.trim(),
          answers,
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
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("apply error", err);
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SEO
        title={`${role.title} · Careers`}
        description={role.description}
        path={`/careers/${role.slug}`}
        keywords={[
          role.title,
          "Olyxee careers",
          "AI infrastructure jobs",
          role.team,
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: role.title,
          description: `${role.description}\n\nResponsibilities:\n- ${role.responsibilities.join(
            "\n- "
          )}\n\nRequirements:\n- ${role.requirements.join("\n- ")}`,
          datePosted: "2026-01-01",
          validThrough: "2026-12-31",
          employmentType: "FULL_TIME",
          hiringOrganization: {
            "@type": "Organization",
            name: "Olyxee",
            sameAs: "https://olyxee.com",
            logo: "https://olyxee.com/Logo/Olyxee_Logo.png",
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: role.location.includes("Johannesburg")
                ? "Johannesburg"
                : undefined,
              addressCountry: "ZA",
            },
          },
          jobLocationType: role.location.toLowerCase().includes("remote")
            ? "TELECOMMUTE"
            : undefined,
          industry: "Artificial Intelligence",
          occupationalCategory: role.team,
          url: `https://olyxee.com/careers/${role.slug}`,
        }}
      />
      <Header />

      <main className="pt-28 sm:pt-36 pb-24 sm:pb-36">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All open roles
            </Link>
          </motion.div>

          {/* HEADER */}
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="border-b border-neutral-200 pb-10"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
              {role.team} · Paid role
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[3rem] tracking-[-0.025em] leading-[1.05] font-medium text-neutral-900 mb-6">
              {role.title}
            </h1>
            <p className="text-lg text-neutral-500 font-light leading-relaxed max-w-2xl">
              {role.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                {role.team}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {role.location}
              </span>
              {role.level && (
                <span className="text-neutral-500">{role.level}</span>
              )}
            </div>
          </motion.header>

          {/* COMPENSATION */}
          {role.compensation && (
            <section className="py-10 border-b border-neutral-200">
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-3">
                Compensation
              </p>
              <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
                {role.compensation}
              </p>
            </section>
          )}

          {/* RESPONSIBILITIES */}
          <section className="py-10 border-b border-neutral-200">
            <h2 className="text-xl sm:text-2xl tracking-[-0.015em] font-medium text-neutral-900 mb-6">
              What you&apos;ll own
            </h2>
            <ul className="space-y-4">
              {role.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2.5 flex-shrink-0" />
                  <p className="text-[15px] sm:text-base text-neutral-700 leading-relaxed font-light">
                    {r}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* REQUIREMENTS */}
          <section className="py-10 border-b border-neutral-200">
            <h2 className="text-xl sm:text-2xl tracking-[-0.015em] font-medium text-neutral-900 mb-6">
              Who we&apos;re looking for
            </h2>
            <ul className="space-y-4">
              {role.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2.5 flex-shrink-0" />
                  <p className="text-[15px] sm:text-base text-neutral-700 leading-relaxed font-light">
                    {r}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* PROCESS */}
          {role.process && role.process.length > 0 && (
            <section className="py-10 border-b border-neutral-200">
              <h2 className="text-xl sm:text-2xl tracking-[-0.015em] font-medium text-neutral-900 mb-6">
                How we&apos;ll evaluate you
              </h2>
              <ol className="space-y-6">
                {role.process.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-neutral-500 mt-1 w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="text-[15px] sm:text-base font-medium text-neutral-900 mb-1.5">
                        {step.title}
                      </p>
                      <p className="text-[14px] sm:text-[15px] text-neutral-500 font-light leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* APPLICATION */}
          <section id="apply" className="pt-12">
            <div className="mb-8">
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-3">
                Apply
              </p>
              <h2 className="text-2xl sm:text-3xl tracking-[-0.02em] font-medium text-neutral-900 mb-3">
                The bar is high. Take your time.
              </h2>
              <p className="text-[15px] sm:text-base text-neutral-500 font-light leading-relaxed max-w-2xl">
                Plan for 30 to 45 minutes. Strong applications are specific,
                written in your own voice, and show real proof of work. Vague
                answers are the most common reason we say no.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 sm:p-10 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle
                    className="w-6 h-6 text-neutral-700"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="text-2xl tracking-[-0.02em] font-medium text-neutral-900 mb-2">
                  Application received
                </h3>
                <p className="text-sm text-neutral-500 max-w-md mx-auto font-light leading-relaxed">
                  Thanks for the care you put in. We read every word. If
                  we&apos;d like to move forward, you&apos;ll hear from us at
                  the email you provided within 14 days.
                </p>
                <Link
                  href="/careers"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  Back to careers <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First name <span className="text-neutral-400">*</span></label>
                    <input
                      type="text"
                      required
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Surname <span className="text-neutral-400">*</span></label>
                    <input
                      type="text"
                      required
                      autoComplete="family-name"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Email <span className="text-neutral-400">*</span></label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {(role.questions ?? []).map((q: Question) => (
                  <div key={q.id}>
                    <label className={labelClass}>
                      {q.label}
                      {q.required && (
                        <span className="text-neutral-400"> *</span>
                      )}
                    </label>
                    {q.type === "textarea" ? (
                      <textarea
                        required={q.required}
                        value={answers[q.id] ?? ""}
                        onChange={(e) => setAnswer(q.id, e.target.value)}
                        className={`${inputClass} resize-none`}
                        rows={6}
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
                    {q.hint && <p className={hintClass}>{q.hint}</p>}
                  </div>
                ))}

                <label className="flex items-start gap-3 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900/10"
                  />
                  <span className="text-[13px] text-neutral-600 font-light leading-relaxed">
                    I confirm that everything in this application is accurate
                    and written by me. I understand Olyxee will verify
                    references and may conduct background checks.
                  </span>
                </label>

                {error && (
                  <p className="text-sm text-red-600 leading-relaxed">
                    {error}
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors disabled:opacity-60 text-sm tracking-wide"
                  >
                    {submitting ? "Submitting…" : "Submit application"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[13px] text-neutral-500 mt-4 leading-relaxed">
                    Your application is sent directly to our hiring team. No
                    third parties.
                  </p>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: paidRoles.map((r) => ({ params: { slug: r.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug ?? "");
  const role = findRoleBySlug(slug);
  if (!role || role.type !== "paid") {
    return { notFound: true };
  }
  return { props: { role } };
};

export default PaidRolePage;
