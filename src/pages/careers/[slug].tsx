import { FC, useEffect, useRef, useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, MapPin, CheckCircle, Clock3 } from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";
import CareerRoleBanner from "../../components/CareerRoleBanner";
import {
  paidRoles,
  findRoleBySlug,
  type Role,
  type Question,
} from "../../lib/careers-roles";
import { rememberCareerApplication } from "../../lib/career-confirmation";
import { buildCareerApplicationSummary } from "../../lib/career-application-summary";

interface Props { role: Role }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+\..+/i;
const inputClass = "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-[15px] leading-relaxed text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900/10";
const labelClass = "mb-2 block text-sm font-medium text-neutral-900";
const hintClass = "mt-2 text-[13px] leading-relaxed text-neutral-500";
const QUESTION_GROUPS = [
  {
    title: "Profile & background",
    ids: ["phone", "location", "linkedin_link", "current_role", "years_experience"],
  },
  {
    title: "Work & examples",
    ids: ["portfolio_link", "research_link", "certifications", "cv_link", "essay_impact", "essay_why", "essay_hard", "references"],
  },
  {
    title: "Availability",
    ids: ["salary", "start_date", "work_auth"],
  },
];

const PaidRolePage: FC<Props> = ({ role }) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fields = useRef<Record<string, HTMLElement | null>>({});
  const requestController = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    const handleRouteChange = (url: string) => {
      if (url.split("?")[0] === "/careers/application-received") return;
      requestController.current?.abort();
      requestController.current = null;
      if (mounted.current) setSubmitting(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      mounted.current = false;
      router.events.off("routeChangeStart", handleRouteChange);
      requestController.current?.abort();
      requestController.current = null;
    };
  }, [router.events]);
  const questions = role.questions ?? [];
  const groupedQuestions = QUESTION_GROUPS.map((group) => ({
    title: group.title,
    questions: questions.filter((question) => group.ids.includes(question.id)),
  })).filter((group) => group.questions.length > 0);
  const ungroupedQuestions = questions.filter(
    (question) => !QUESTION_GROUPS.some((group) => group.ids.includes(question.id))
  );
  const applicationDownload = `data:text/plain;charset=utf-8,${encodeURIComponent(buildCareerApplicationSummary(role, {
    first_name: firstName,
    surname,
    email,
    answers,
  }))}`;
  const setAnswer = (id: string, value: string) => {
    setAnswers((previous) => ({ ...previous, [id]: value }));
    setFieldErrors((previous) => ({ ...previous, [id]: "" }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setError(null);
    const nextErrors: Record<string, string> = {};
    if (!firstName.trim()) nextErrors.firstName = "Enter your first name.";
    if (!surname.trim()) nextErrors.surname = "Enter your surname.";
    if (!email.trim() || !EMAIL_RE.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    for (const question of role.questions ?? []) {
      const value = (answers[question.id] ?? "").trim();
      if (question.required && !value) nextErrors[question.id] = "Please fill in this required field.";
      else if (value && question.type === "url" && !URL_RE.test(value)) nextErrors[question.id] = "Enter a complete link starting with https://.";
    }
    if (!agree) nextErrors.agree = "Please confirm that your application is accurate.";
    setFieldErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      fields.current[firstInvalid]?.focus();
      fields.current[firstInvalid]?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    const controller = new AbortController();
    requestController.current = controller;
    const isCurrentRequest = () =>
      mounted.current &&
      requestController.current === controller &&
      !controller.signal.aborted;
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
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
      if (!isCurrentRequest()) return;
      let data: { error?: string; success?: boolean } = {};
      try {
        data = await res.json();
      } catch (parseError) {
        if (!isCurrentRequest()) throw parseError;
      }
      if (!isCurrentRequest()) return;
      if (!res.ok || data?.success !== true) {
        setError(data.error || "We couldn’t submit your application. Your answers are still here; please try again.");
        return;
      }
      if (!isCurrentRequest()) return;
      setSubmitted(true);
      if (rememberCareerApplication(role.slug)) {
        if (!isCurrentRequest()) return;
        void router.push("/careers/application-received").catch(() => {
          if (mounted.current && !controller.signal.aborted) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
      } else {
        if (isCurrentRequest()) window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      if (!isCurrentRequest() || (err instanceof Error && err.name === "AbortError")) return;
      console.error("apply error", err);
      setError("We couldn’t reach the server. Your answers are still here; check your connection and try again.");
    } finally {
      if (requestController.current === controller) {
        requestController.current = null;
        if (mounted.current) setSubmitting(false);
      }
    }
  };

  const bind = (id: string) => ({ id, ref: (node: HTMLElement | null) => { fields.current[id] = node; } });
  const fieldError = (id: string) => fieldErrors[id] ? <p id={`${id}-error`} className="mt-2 text-sm text-red-700" role="alert">{fieldErrors[id]}</p> : null;

  return (
    <div className="min-h-[100dvh] bg-white text-neutral-900">
      <SEO title={`${role.title} · Careers`} description={role.description} path={`/careers/${role.slug}`} keywords={[role.title, "Olyxee careers", "AI infrastructure jobs", role.team]} jsonLd={{
        "@context": "https://schema.org", "@type": "JobPosting", title: role.title,
        description: `${role.description}\n\nResponsibilities:\n- ${role.responsibilities.join("\n- ")}\n\nRequirements:\n- ${role.requirements.join("\n- ")}`,
        datePosted: "2026-01-01", validThrough: "2026-12-31", employmentType: "FULL_TIME",
        hiringOrganization: { "@type": "Organization", name: "Olyxee", sameAs: "https://olyxee.com", logo: "https://olyxee.com/Logo/Olyxee_Logo.png" },
        jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: role.location.includes("Johannesburg") ? "Johannesburg" : undefined, addressCountry: "ZA" } },
        jobLocationType: role.location.toLowerCase().includes("remote") ? "TELECOMMUTE" : undefined,
        industry: "Artificial Intelligence", occupationalCategory: role.team, url: `https://olyxee.com/careers/${role.slug}`,
      }} />
      <Header />
      <main className="pb-24 pt-20 sm:pb-32">
        <div className="mx-auto max-w-5xl px-5 pt-8 sm:px-8 sm:pt-10">
          <Link href="/careers" className="mb-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-neutral-900"><ArrowLeft className="h-3.5 w-3.5" />All open roles</Link>
          <CareerRoleBanner title={role.title} />
          <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-8 grid gap-8 border-b border-neutral-200 pb-9 sm:mt-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-4 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">{role.team} <span aria-hidden="true">/</span> Full-time</p>
              <p className="max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">{role.description}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
                <span className="inline-flex items-center gap-2"><Briefcase className="h-4 w-4 text-neutral-900" />{role.team}</span>
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-neutral-900" />{role.location}</span>
                {role.level && <span>{role.level}</span>}
              </div>
            </div>
            <a href="#apply" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 md:mb-1">Apply for this role <ArrowRight className="h-4 w-4" /></a>
          </motion.header>

          <section aria-label="Role overview" className="grid gap-5 border-b border-neutral-200 py-7 sm:grid-cols-2">
            {role.compensation && <div className="sm:col-span-2"><p className="mb-1 text-xs font-mono uppercase tracking-[0.16em] text-neutral-500">Compensation</p><p className="text-base leading-7 text-neutral-800">{role.compensation}</p></div>}
            {role.process?.length ? <div className="flex items-start gap-3"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-neutral-700" /><p className="text-sm leading-6 text-neutral-700">A clear, multi-step process. The written application is first; details are below.</p></div> : null}
            <div className="flex items-start gap-3"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-700" /><p className="text-sm leading-6 text-neutral-700">Required fields are marked <span className="font-medium">*</span>. You can review what to prepare before applying.</p></div>
          </section>

          <div className="grid gap-12 py-11 lg:grid-cols-[1.2fr_.8fr] lg:gap-20">
            <section>
              <p className="mb-3 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">The role</p>
              <h2 className="mb-6 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">What you&apos;ll work on</h2>
              <ul className="space-y-4">{role.responsibilities.map((item) => <li key={item} className="flex gap-3 text-[15px] leading-7 text-neutral-700"><span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500" />{item}</li>)}</ul>
            </section>
            <section>
              <p className="mb-3 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Experience</p>
                <h2 className="mb-6 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">What you&apos;ll need</h2>
              <ul className="space-y-4">{role.requirements.map((item) => <li key={item} className="flex gap-3 text-[15px] leading-7 text-neutral-700"><span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500" />{item}</li>)}</ul>
            </section>
          </div>

          {role.process && role.process.length > 0 && (
            <section className="border-t border-neutral-200 py-10">
              <p className="mb-3 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Hiring process</p>
              <h2 className="mb-7 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">What happens next</h2>
              <ol className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {role.process.map((step, index) => {
                  const detail = step.detail
                    .replace(/\s*Expect a response within 14 days, even if it is a no\./i, "")
                    .trim();
                  return (
                    <li key={step.title} className="border-t border-neutral-200 pt-4">
                      <p className="mb-2 text-xs font-mono text-neutral-500">
                        {String(index + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {role.process?.length}
                      </p>
                      <h3 className="mb-1 text-base font-medium">{step.title}</h3>
                      <p className="text-sm leading-6 text-neutral-600">{detail}</p>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          <section id="apply" className="scroll-mt-28 border-t border-neutral-300 pt-11">
            <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><p className="mb-3 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Application</p><h2 className="text-3xl font-medium tracking-[-0.035em] sm:text-4xl">Let&apos;s get to know your work.</h2><p className="mt-3 max-w-xl text-[15px] leading-7 text-neutral-600">A few focused answers help us understand your experience and what you&apos;d like to do here.</p></div>
              <div className="text-sm leading-6 text-neutral-600"><p className="font-medium text-neutral-900">Before you start</p><p>Have your CV, LinkedIn, work links and two references ready.</p></div>
            </div>
            {submitted ? <div className="border-y border-neutral-200 py-8" role="status"><h3 className="text-2xl font-medium">Application received</h3><p className="mt-2 text-neutral-600">Your application was sent to Olyxee&apos;s hiring team.</p><Link href="/careers" className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline">Back to careers <ArrowRight className="h-4 w-4" /></Link></div> :
            <form noValidate onSubmit={handleSubmit} className="space-y-10">
              <div>
                <h3 className="mb-5 text-lg font-medium">Your details</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>First name <span aria-hidden="true">*</span></label>
                    <input {...bind("firstName")} required aria-required="true" autoComplete="given-name" value={firstName} onChange={(e) => { setFirstName(e.target.value); setFieldErrors((p) => ({ ...p, firstName: "" })); }} className={inputClass} aria-invalid={!!fieldErrors.firstName} aria-describedby={fieldErrors.firstName ? "firstName-error" : undefined} />
                    {fieldError("firstName")}
                  </div>
                  <div>
                    <label htmlFor="surname" className={labelClass}>Surname <span aria-hidden="true">*</span></label>
                    <input {...bind("surname")} required aria-required="true" autoComplete="family-name" value={surname} onChange={(e) => { setSurname(e.target.value); setFieldErrors((p) => ({ ...p, surname: "" })); }} className={inputClass} aria-invalid={!!fieldErrors.surname} aria-describedby={fieldErrors.surname ? "surname-error" : undefined} />
                    {fieldError("surname")}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className={labelClass}>Email address <span aria-hidden="true">*</span></label>
                    <input {...bind("email")} required aria-required="true" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: "" })); }} className={inputClass} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "email-error" : undefined} />
                    {fieldError("email")}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium">A little about your experience</h3>
                <p className="mb-6 text-sm leading-6 text-neutral-600">Required questions are marked with *. Optional questions can be left blank.</p>
                <div className="space-y-8">
                  {[...groupedQuestions, ...(ungroupedQuestions.length ? [{ title: "More about you", questions: ungroupedQuestions }] : [])].map((group) => (
                    <fieldset key={group.title} className="space-y-5">
                      <legend className="mb-4 w-full border-b border-neutral-200 pb-3 text-base font-medium text-neutral-900">{group.title}</legend>
                      {group.questions.map((q: Question) => {
                        const describedBy = [q.hint ? `${q.id}-hint` : "", fieldErrors[q.id] ? `${q.id}-error` : ""].filter(Boolean).join(" ") || undefined;
                        return (
                          <div key={q.id}>
                            <label htmlFor={`question-${q.id}`} className={labelClass}>
                              {q.label} {q.required ? <span aria-hidden="true">*</span> : <span className="text-xs font-normal text-neutral-500">(optional)</span>}
                            </label>
                            {q.type === "textarea" ? (
                              <textarea
                                id={`question-${q.id}`}
                                ref={(node) => { fields.current[q.id] = node; }}
                                required={!!q.required}
                                aria-required={q.required || undefined}
                                value={answers[q.id] ?? ""}
                                onChange={(e) => setAnswer(q.id, e.target.value)}
                                className={`${inputClass} resize-y`}
                                rows={4}
                                placeholder={q.placeholder}
                                aria-invalid={!!fieldErrors[q.id]}
                                aria-describedby={describedBy}
                              />
                            ) : q.type === "select" ? (
                              <select
                                id={`question-${q.id}`}
                                ref={(node) => { fields.current[q.id] = node; }}
                                required={!!q.required}
                                aria-required={q.required || undefined}
                                value={answers[q.id] ?? ""}
                                onChange={(e) => setAnswer(q.id, e.target.value)}
                                className={inputClass}
                                aria-invalid={!!fieldErrors[q.id]}
                                aria-describedby={describedBy}
                              >
                                <option value="">Choose an option</option>
                                {(q.options ?? []).map((option) => <option key={option} value={option}>{option}</option>)}
                              </select>
                            ) : (
                              <input
                                id={`question-${q.id}`}
                                ref={(node) => { fields.current[q.id] = node; }}
                                type={q.type === "url" ? "url" : "text"}
                                required={!!q.required}
                                aria-required={q.required || undefined}
                                autoComplete={q.autoComplete}
                                inputMode={q.inputMode}
                                value={answers[q.id] ?? ""}
                                onChange={(e) => setAnswer(q.id, e.target.value)}
                                className={inputClass}
                                placeholder={q.placeholder}
                                aria-invalid={!!fieldErrors[q.id]}
                                aria-describedby={describedBy}
                              />
                            )}
                            {q.hint && <p id={`${q.id}-hint`} className={hintClass}>{q.hint}</p>}
                            {fieldError(q.id)}
                          </div>
                        );
                      })}
                    </fieldset>
                  ))}
                </div>
              </div>
              <div className="border-t border-neutral-200 pt-6">
                <label htmlFor="accuracy" className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-neutral-700"><input id="accuracy" ref={(node) => { fields.current.agree = node; }} type="checkbox" required aria-required="true" checked={agree} onChange={(e) => { setAgree(e.target.checked); setFieldErrors((p) => ({ ...p, agree: "" })); }} className="mt-1 h-4 w-4 shrink-0 accent-neutral-900" aria-invalid={!!fieldErrors.agree} aria-describedby={fieldErrors.agree ? "agree-error" : undefined} /><span>I confirm that the information in my application is accurate and written by me. I understand Olyxee will verify references and may conduct background checks. <span aria-hidden="true">*</span></span></label>
                {fieldError("agree")}
                {error && (
                  <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800" role="alert">
                    <p>{error}</p>
                    <p className="mt-2">
                      <a className="font-medium underline underline-offset-2" href={applicationDownload} download={`olyxee-${role.slug}-application.txt`}>
                        Download completed application
                      </a>{" "}
                      to attach to an email. Or open a draft to{" "}
                      <a className="font-medium underline underline-offset-2" href={`mailto:info@olyxee.com?subject=${encodeURIComponent(`Application for ${role.title}`)}&body=${encodeURIComponent("Hello Olyxee hiring team,\n\nI’d like to apply for this role. My name is:\n\nCV or work link:\n\n")}`}>
                        info@olyxee.com
                      </a>
                      . Attach the file, review it, and send the email yourself. The download alone does not submit your application.
                    </p>
                  </div>
                )}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"><button type="submit" disabled={submitting} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-neutral-900 px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-wait disabled:opacity-60">{submitting ? "Sending application…" : "Submit application"} <ArrowRight className="h-4 w-4" /></button><p className="text-xs leading-5 text-neutral-500">Your application is sent to Olyxee&apos;s hiring team.</p></div>
              </div>
            </form>}
          </section>
        </div>
      </main>
      <Footer variant="light" />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: paidRoles.map((r) => ({ params: { slug: r.slug } })), fallback: false });
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const role = findRoleBySlug(String(params?.slug ?? ""));
  if (!role || role.type !== "paid") return { notFound: true };
  return { props: { role } };
};
const PaidRolePageWithIsolatedState: FC<Props> = ({ role }) => (
  <PaidRolePage key={role.slug} role={role} />
);

export default PaidRolePageWithIsolatedState;