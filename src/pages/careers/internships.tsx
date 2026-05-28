import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, MapPin, CheckCircle } from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { internshipRoles } from "../../lib/careers-roles";
import { schools } from "../../lib/schools";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+\..+/i;

const inputClass =
  "w-full px-4 py-3.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-400 text-[15px] text-neutral-900 placeholder:text-neutral-400 leading-relaxed transition-colors";
const labelClass = "block text-sm font-medium text-neutral-900 mb-2";
const optionalClass = "text-neutral-500 font-normal normal-case text-[13px]";
const hintClass = "text-[14px] text-neutral-600 mt-2 leading-relaxed";

const InternshipsPage: FC = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [schoolFocused, setSchoolFocused] = useState(false);
  const [roleSlug, setRoleSlug] = useState<string>("");
  const [portfolio, setPortfolio] = useState("");
  const [why, setWhy] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const schoolBlurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const q = router.query.role;
    const fromQuery = Array.isArray(q) ? q[0] : q;
    if (fromQuery && internshipRoles.some((r) => r.slug === fromQuery)) {
      setRoleSlug(fromQuery);
    }
  }, [router.isReady, router.query.role]);

  const selectedRole = useMemo(
    () => internshipRoles.find((r) => r.slug === roleSlug) ?? null,
    [roleSlug]
  );

  const schoolSuggestions = useMemo(() => {
    const q = school.trim().toLowerCase();
    if (!q) return [];
    const matches = schools.filter((s) => s.toLowerCase().includes(q));
    if (matches.length === 1 && matches[0].toLowerCase() === q) return [];
    return matches.slice(0, 8);
  }, [school]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!firstName.trim()) return setError("Please enter your first name.");
    if (!surname.trim()) return setError("Please enter your surname.");
    if (!email.trim() || !EMAIL_RE.test(email.trim()))
      return setError("Please enter a valid email.");
    if (!roleSlug) return setError("Please choose an internship.");
    if (!portfolio.trim() || !URL_RE.test(portfolio.trim()))
      return setError(
        "Please share a link to your work (LinkedIn, GitHub, portfolio, or CV)."
      );

    const role = internshipRoles.find((r) => r.slug === roleSlug);

    setSubmitting(true);
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role_title: role?.title ?? roleSlug,
          role_slug: roleSlug,
          first_name: firstName.trim(),
          surname: surname.trim(),
          full_name: `${firstName.trim()} ${surname.trim()}`,
          email: email.trim(),
          school: school.trim(),
          portfolio: portfolio.trim(),
          message: why.trim(),
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
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SEO
        title="Internships · Careers"
        description="Apply for an unpaid internship at Olyxee. Hands-on experience on real AI infrastructure work, mentorship from the team, and a written reference."
        path="/careers/internships"
        keywords={[
          "Olyxee internships",
          "AI internship",
          "unpaid internship",
          "AI internship South Africa",
          "machine learning internship",
        ]}
      />
      <Header />

      <main className="pt-28 sm:pt-36 pb-24 sm:pb-36">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All open roles
          </Link>

          {/* HEADER — when a role is selected, the H1 becomes a short summary of that role */}
          <motion.header
            key={selectedRole?.slug ?? "default"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-b border-neutral-200 pb-10"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
              {selectedRole
                ? `${selectedRole.team} · Internship · ${selectedRole.location}`
                : "Internships at Olyxee"}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[3rem] tracking-[-0.025em] leading-[1.05] font-medium text-neutral-900 mb-5">
              {selectedRole ? (
                <>
                  {selectedRole.title}
                  <span className="block text-neutral-500 font-normal text-lg sm:text-xl mt-3 tracking-normal leading-snug">
                    {selectedRole.description}
                  </span>
                </>
              ) : (
                <>
                  Build alongside the team, on{" "}
                  <em className="font-serif italic font-normal text-neutral-500">
                    real work.
                  </em>
                </>
              )}
            </h1>
            {!selectedRole && (
              <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl">
                Our internships are open to people early in their career,
                curious, technical or otherwise, who want hands-on experience
                shipping with a real team.
              </p>
            )}
          </motion.header>

          {/* UNPAID NOTICE — clearly visible amber treatment */}
          <section className="mt-10 rounded-3xl border-2 border-amber-300 bg-amber-50 p-6 sm:p-8">
            <p className="text-[13px] sm:text-sm font-semibold uppercase tracking-[0.18em] text-amber-900 mb-3">
              Heads up · these internships are unpaid
            </p>
            <p className="text-base sm:text-lg text-neutral-900 leading-relaxed font-medium">
              You will get meaningful work alongside our team, mentorship from
              senior operators, and a written reference at the end. You will
              not receive a salary or stipend. Apply only if that trade-off
              works for you right now.
            </p>
            <ul className="mt-5 space-y-2 text-[15px] text-neutral-800 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                Remote-first. Most roles are flexible on hours.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                Typically 3 to 6 months, with the option to extend or convert
                to a paid role for exceptional work.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                One simple form. We read every application and respond within
                14 days.
              </li>
            </ul>
          </section>

          {/* ROLE DETAIL (when a specific internship is chosen) */}
          {selectedRole ? (
            <>
              <motion.section
                key={selectedRole.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="pt-10 border-b border-neutral-200 pb-10"
              >
                <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
                  {selectedRole.team} · Internship
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] tracking-[-0.02em] leading-[1.1] font-medium text-neutral-900 mb-5">
                  {selectedRole.title}
                </h2>
                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl">
                  {selectedRole.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    {selectedRole.team}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedRole.location}
                  </span>
                  {selectedRole.level && (
                    <span>{selectedRole.level}</span>
                  )}
                </div>
              </motion.section>

              {selectedRole.responsibilities?.length > 0 && (
                <section className="py-10 border-b border-neutral-200">
                  <h3 className="text-xl sm:text-2xl tracking-[-0.015em] font-medium text-neutral-900 mb-6">
                    What you&apos;ll do
                  </h3>
                  <ul className="space-y-4">
                    {selectedRole.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2.5 flex-shrink-0" />
                        <p className="text-[15px] sm:text-base text-neutral-800 leading-relaxed">
                          {r}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {selectedRole.requirements?.length > 0 && (
                <section className="py-10 border-b border-neutral-200">
                  <h3 className="text-xl sm:text-2xl tracking-[-0.015em] font-medium text-neutral-900 mb-6">
                    Who we&apos;re looking for
                  </h3>
                  <ul className="space-y-4">
                    {selectedRole.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2.5 flex-shrink-0" />
                        <p className="text-[15px] sm:text-base text-neutral-800 leading-relaxed">
                          {r}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          ) : (
            <section className="mt-12">
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
                Available internships
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {internshipRoles.map((r) => (
                  <button
                    key={r.slug}
                    type="button"
                    onClick={() => setRoleSlug(r.slug)}
                    className="text-left text-[15px] text-neutral-800 hover:text-neutral-900 transition-colors"
                  >
                    {r.title}
                    <span className="text-neutral-400"> · {r.team}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* APPLICATION */}
          <section id="apply" className={selectedRole ? "pt-12" : "mt-16"}>
            <div className="mb-8">
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-3">
                Apply
              </p>
              <h2 className="text-2xl sm:text-3xl tracking-[-0.02em] font-medium text-neutral-900 mb-3">
                {selectedRole
                  ? `Apply for the ${selectedRole.title} internship.`
                  : "One short form. Around two minutes."}
              </h2>
              <p className="text-[15px] sm:text-base text-neutral-700 leading-relaxed">
                {selectedRole
                  ? "Tell us who you are and share something you have built or are proud of. Around two minutes."
                  : "Tell us who you are, pick the internship that fits, and share something you have built or are proud of."}
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
                <p className="text-[15px] text-neutral-700 max-w-md mx-auto leading-relaxed">
                  Thanks, we have it. If we would like to move forward, you
                  will hear from us at the email you provided within 14 days.
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
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className={labelClass}>Which internship? <span className="text-neutral-400">*</span></label>
                  <select
                    required
                    value={roleSlug}
                    onChange={(e) => setRoleSlug(e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select an internship
                    </option>
                    {internshipRoles.map((r) => (
                      <option key={r.slug} value={r.slug}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                  {selectedRole && (
                    <p className={hintClass}>{selectedRole.description}</p>
                  )}
                </div>

                <div className="relative">
                  <label className={labelClass}>
                    School you attend or attended{" "}
                    <span className={optionalClass}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    onFocus={() => {
                      if (schoolBlurTimeout.current)
                        clearTimeout(schoolBlurTimeout.current);
                      setSchoolFocused(true);
                    }}
                    onBlur={() => {
                      schoolBlurTimeout.current = setTimeout(
                        () => setSchoolFocused(false),
                        120
                      );
                    }}
                    className={inputClass}
                    placeholder="Start typing your school name…"
                  />
                  {schoolFocused && schoolSuggestions.length > 0 && (
                    <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
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
                </div>

                <div>
                  <label className={labelClass}>
                    Link to your work (LinkedIn, GitHub, portfolio, or CV) <span className="text-neutral-400">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    autoComplete="url"
                    inputMode="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className={inputClass}
                    placeholder="https://…"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    A few sentences about why you&apos;re interested{" "}
                    <span className={optionalClass}>(optional)</span>
                  </label>
                  <textarea
                    value={why}
                    onChange={(e) => setWhy(e.target.value)}
                    className={`${inputClass} resize-none`}
                    rows={4}
                    placeholder="What you are hoping to learn, or anything you have built that you are proud of."
                  />
                </div>

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

export default InternshipsPage;
