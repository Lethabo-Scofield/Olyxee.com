import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, MapPin, AlertCircle } from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";
import CareerRoleBanner from "../../components/CareerRoleBanner";
import { internshipRoles } from "../../lib/careers-roles";
import { rememberCareerApplication } from "../../lib/career-confirmation";
import { buildCareerApplicationSummary } from "../../lib/career-application-summary";
import { schools } from "../../lib/schools";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+\..+/i;
const inputClass = "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-[15px] leading-relaxed text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900/10";
const labelClass = "mb-2 block text-sm font-medium text-neutral-900";

const InternshipsPage: FC = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [schoolFocused, setSchoolFocused] = useState(false);
  const [activeSchoolIndex, setActiveSchoolIndex] = useState(-1);
  const queryRole = Array.isArray(router.query.role) ? router.query.role[0] : router.query.role;
  const roleSlug = router.isReady
    ? internshipRoles.find((role) => role.slug === queryRole)?.slug ?? ""
    : "";
  const [portfolio, setPortfolio] = useState("");
  const [why, setWhy] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [receivedRoleSlug, setReceivedRoleSlug] = useState<string | null>(null);
  const submitted = receivedRoleSlug === roleSlug;
  const fields = useRef<Record<string, HTMLElement | null>>({});
  const schoolBlurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const schoolInput = useRef<HTMLInputElement | null>(null);
  const requestController = useRef<AbortController | null>(null);
  const roleSlugRef = useRef(roleSlug);
  roleSlugRef.current = roleSlug;
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

  useEffect(() => () => {
    requestController.current?.abort();
    requestController.current = null;
  }, [roleSlug]);

  useEffect(() => {
    setSubmitting(false);
    setError(null);
    setReceivedRoleSlug(null);
    setFieldErrors({});
  }, [roleSlug]);

  const selectedRole = useMemo(() => internshipRoles.find((role) => role.slug === roleSlug) ?? null, [roleSlug]);
  const requestedRole = Array.isArray(router.query.role) ? router.query.role[0] : router.query.role;
  const schoolSuggestions = useMemo(() => {
    const query = school.trim().toLowerCase();
    if (!query) return [];
    const matches = schools.filter((item) => item.toLowerCase().includes(query));
    if (matches.length === 1 && matches[0].toLowerCase() === query) return [];
    return matches.slice(0, 8);
  }, [school]);
  const applicationDownload = `data:text/plain;charset=utf-8,${encodeURIComponent(buildCareerApplicationSummary(selectedRole ?? internshipRoles[0], {
    first_name: firstName,
    surname,
    email,
    school,
    portfolio,
    message: why,
  }))}`;

  const changeRole = (slug: string) => {
    if (submitting) return;
    setError(null);
    setFieldErrors((previous) => ({ ...previous, role: "" }));
    if (router.isReady) {
      void router.push({ pathname: "/careers/internships", query: slug ? { role: slug } : {} }, undefined, { shallow: true, scroll: false });
    }
  };
  const setValue = (key: string, setter: (value: string) => void, value: string) => {
    setter(value);
    setFieldErrors((previous) => ({ ...previous, [key]: "" }));
  };
  const fieldError = (key: string) => fieldErrors[key] ? <p id={`${key}-error`} className="mt-2 text-sm text-red-700" role="alert">{fieldErrors[key]}</p> : null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setError(null);
    const nextErrors: Record<string, string> = {};
    if (!firstName.trim()) nextErrors.firstName = "Enter your first name.";
    if (!surname.trim()) nextErrors.surname = "Enter your surname.";
    if (!email.trim() || !EMAIL_RE.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!selectedRole) nextErrors.role = "Choose an internship before submitting.";
    if (!portfolio.trim() || !URL_RE.test(portfolio.trim())) nextErrors.portfolio = "Enter a complete link starting with https://.";
    setFieldErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      fields.current[firstInvalid]?.focus();
      fields.current[firstInvalid]?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const role = selectedRole;
    if (!role) return;
    setSubmitting(true);
    const submittedRoleSlug = roleSlug;
    const controller = new AbortController();
    requestController.current = controller;
    const isCurrentRequest = () =>
      mounted.current &&
      requestController.current === controller &&
      !controller.signal.aborted &&
      roleSlugRef.current === submittedRoleSlug;
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          role_title: role.title,
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
      setReceivedRoleSlug(submittedRoleSlug);
      if (rememberCareerApplication(roleSlug)) {
        if (!isCurrentRequest()) return;
        void router.push("/careers/application-received").catch(() => {
          if (mounted.current && !controller.signal.aborted && roleSlugRef.current === submittedRoleSlug) {
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

  return (
    <div className="min-h-[100dvh] bg-white text-neutral-900">
      <SEO title="Internships · Careers" description="Apply for an unpaid internship at Olyxee, a research and technology company exploring Organizational Intelligence." path="/careers/internships" keywords={["Olyxee internships", "Organizational Intelligence internship", "unpaid internship", "AI internship South Africa", "machine learning internship"]} />
      <Header />
      <main className="pb-24 pt-20 sm:pb-32">
        <div className="mx-auto max-w-5xl px-5 pt-8 sm:px-8 sm:pt-10">
          <Link href="/careers" className="mb-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-neutral-900"><ArrowLeft className="h-3.5 w-3.5" />All open roles</Link>
          <CareerRoleBanner title={selectedRole ? selectedRole.title : "Explore an internship."} />
          <motion.header key={selectedRole?.slug ?? "selection"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-8 grid gap-8 border-b border-neutral-200 pb-8 sm:mt-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-4 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">{selectedRole ? `${selectedRole.team} / Internship` : "Internships at Olyxee"}</p>
              <p className="max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">{selectedRole ? selectedRole.description : "Choose a role to see what the work involves and whether it fits your interests."}</p>
              {selectedRole && <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600"><span className="inline-flex items-center gap-2"><Briefcase className="h-4 w-4 text-neutral-900" />{selectedRole.team}</span><span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-neutral-900" />{selectedRole.location}</span>{selectedRole.level && <span>{selectedRole.level}</span>}</div>}
            </div>
            <a href="#apply" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">Go to application <ArrowRight className="h-4 w-4" /></a>
          </motion.header>

          <section id="internship-terms" aria-label="Internship terms" className="scroll-mt-24 border-b border-neutral-200 py-6">
            <div className="flex gap-3 border-l-4 border-red-600 bg-red-50 px-4 py-5 sm:px-5">
              <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />
              <div className="space-y-1">
                <h2 className="text-lg font-semibold leading-6 text-red-900">These internships are unpaid.</h2>
                <p className="text-sm font-medium leading-6 text-red-800">You will not receive a salary or stipend.</p>
              </div>
            </div>
            <dl className="mt-6 grid gap-5 text-sm leading-6 sm:grid-cols-2">
              <div>
                <dt className="font-medium text-neutral-900">Time and location</dt>
                <dd className="mt-1 text-neutral-600">Remote-first. Hours are usually flexible. Internships typically last 3 to 6 months.</dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-900">Mentorship and reference</dt>
                <dd className="mt-1 text-neutral-600">Work alongside our team, with mentorship from senior operators and a written reference at the end.</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-medium text-neutral-900">Future opportunities</dt>
                <dd className="mt-1 text-neutral-600">Exceptional work may lead to an extension or a full-time role. Neither is guaranteed.</dd>
              </div>
            </dl>
          </section>

          {!selectedRole && <section className="border-b border-neutral-200 py-8">
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Available internships</p>
            <ul className="grid gap-x-8 sm:grid-cols-2">{internshipRoles.map((role) => <li key={role.slug} className="border-t border-neutral-200 py-3"><button type="button" onClick={() => changeRole(role.slug)} className="flex w-full items-center justify-between gap-3 text-left text-sm font-medium text-neutral-800 hover:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800"><span>{role.title}<span className="ml-2 font-normal text-neutral-500">{role.team}</span></span><ArrowRight className="h-4 w-4 shrink-0" /></button></li>)}</ul>
          </section>}

          {selectedRole && <section className="grid gap-10 border-b border-neutral-200 py-9 md:grid-cols-2">
            <div><p className="mb-3 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">The work</p><h2 className="mb-5 text-2xl font-medium tracking-[-0.03em]">What you&apos;ll do</h2><ul className="space-y-3">{selectedRole.responsibilities.map((item) => <li key={item} className="flex gap-3 text-[15px] leading-7 text-neutral-700"><span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500" />{item}</li>)}</ul></div>
            <div><p className="mb-3 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Experience</p><h2 className="mb-5 text-2xl font-medium tracking-[-0.03em]">What you&apos;ll need</h2><ul className="space-y-3">{selectedRole.requirements.map((item) => <li key={item} className="flex gap-3 text-[15px] leading-7 text-neutral-700"><span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500" />{item}</li>)}</ul></div>
          </section>}

          <section id="apply" className="scroll-mt-28 pt-10">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><p className="mb-3 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Application</p><h2 className="text-3xl font-medium tracking-[-0.035em] sm:text-4xl">A few details to get started.</h2><p className="mt-3 max-w-xl text-[15px] leading-7 text-neutral-600">Share your contact details and one link to work you&apos;d like us to see.</p></div>
              <p className="text-sm leading-6 text-neutral-600"><span className="font-medium text-neutral-900">Required:</span> name, email, internship and work link.<br />School and note are optional.</p>
            </div>
            {submitted ? <div className="border-y border-neutral-200 py-8" role="status"><h3 className="text-2xl font-medium">Application received</h3><p className="mt-2 text-neutral-600">Your application was sent to Olyxee&apos;s hiring team.</p><Link href="/careers" className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline">Back to careers <ArrowRight className="h-4 w-4" /></Link></div> :
            <form noValidate onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClass}>First name <span aria-hidden="true">*</span></label>
                  <input
                    id="firstName"
                    ref={(node) => { fields.current.firstName = node; }}
                    required
                    aria-required="true"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setValue("firstName", setFirstName, e.target.value)}
                    className={inputClass}
                    aria-invalid={!!fieldErrors.firstName}
                    aria-describedby={fieldErrors.firstName ? "firstName-error" : undefined}
                  />
                  {fieldError("firstName")}
                </div>
                <div>
                  <label htmlFor="surname" className={labelClass}>Surname <span aria-hidden="true">*</span></label>
                  <input
                    id="surname"
                    ref={(node) => { fields.current.surname = node; }}
                    required
                    aria-required="true"
                    autoComplete="family-name"
                    value={surname}
                    onChange={(e) => setValue("surname", setSurname, e.target.value)}
                    className={inputClass}
                    aria-invalid={!!fieldErrors.surname}
                    aria-describedby={fieldErrors.surname ? "surname-error" : undefined}
                  />
                  {fieldError("surname")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className={labelClass}>Email address <span aria-hidden="true">*</span></label>
                  <input id="email" ref={(node) => { fields.current.email = node; }} required aria-required="true" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setValue("email", setEmail, e.target.value)} className={inputClass} placeholder="you@example.com" aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "email-error" : undefined} />
                  {fieldError("email")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="role" className={labelClass}>Internship <span aria-hidden="true">*</span></label>
                  <select id="role" ref={(node) => { fields.current.role = node; }} required aria-required="true" disabled={submitting} value={roleSlug} onChange={(e) => changeRole(e.target.value)} className={inputClass} aria-invalid={!!fieldErrors.role} aria-describedby={fieldErrors.role ? "role-error" : undefined}>
                    <option value="">Choose an internship</option>
                    {internshipRoles.map((role) => <option key={role.slug} value={role.slug}>{role.title} · {role.team}</option>)}
                  </select>
                  {fieldError("role")}
                  {router.isReady && requestedRole && !internshipRoles.some((role) => role.slug === requestedRole) && <p className="mt-2 text-sm text-neutral-600">That role link isn&apos;t available. Please choose from the current internships.</p>}
                </div>
                <div className="relative sm:col-span-2">
                  <label htmlFor="school" className={labelClass}>School you attend or attended <span className="text-xs font-normal text-neutral-500">(optional)</span></label>
                  <input
                    id="school"
                    ref={(node) => {
                      fields.current.school = node;
                      schoolInput.current = node;
                    }}
                    type="text"
                    autoComplete="off"
                    value={school}
                    onChange={(e) => {
                      if (schoolBlurTimeout.current) clearTimeout(schoolBlurTimeout.current);
                      setSchool(e.target.value);
                      setActiveSchoolIndex(-1);
                      setSchoolFocused(true);
                    }}
                    onFocus={() => {
                      if (schoolBlurTimeout.current) clearTimeout(schoolBlurTimeout.current);
                      setSchoolFocused(true);
                    }}
                    onBlur={() => {
                      schoolBlurTimeout.current = setTimeout(() => {
                        if (!document.getElementById("school-options")?.contains(document.activeElement)) {
                          setSchoolFocused(false);
                          setActiveSchoolIndex(-1);
                        }
                      }, 120);
                    }}
                    onKeyDown={(e) => {
                      if (!schoolFocused || schoolSuggestions.length === 0) return;
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setActiveSchoolIndex((index) => (index + 1) % schoolSuggestions.length);
                      } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setActiveSchoolIndex((index) => (index <= 0 ? schoolSuggestions.length - 1 : index - 1));
                      } else if (e.key === "Escape") {
                        e.preventDefault();
                        setSchoolFocused(false);
                        setActiveSchoolIndex(-1);
                      } else if (e.key === "Enter" && activeSchoolIndex >= 0) {
                        e.preventDefault();
                        setSchool(schoolSuggestions[activeSchoolIndex]);
                        setSchoolFocused(false);
                        setActiveSchoolIndex(-1);
                      } else if (e.key === "Enter" && schoolSuggestions.length > 0) {
                        e.preventDefault();
                        setSchool(schoolSuggestions[0]);
                        setSchoolFocused(false);
                      }
                    }}
                    className={inputClass}
                    placeholder="Start typing your school name"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-controls="school-options"
                    aria-expanded={schoolFocused && schoolSuggestions.length > 0}
                    aria-activedescendant={activeSchoolIndex >= 0 ? `school-option-${activeSchoolIndex}` : undefined}
                  />
                  {schoolFocused && schoolSuggestions.length > 0 && (
                    <ul id="school-options" role="listbox" className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto border border-neutral-200 bg-white shadow-lg">
                      {schoolSuggestions.map((item, index) => (
                        <li key={item} role="none">
                          <button
                            id={`school-option-${index}`}
                            type="button"
                            role="option"
                            aria-selected={activeSchoolIndex === index}
                            onMouseDown={(e) => e.preventDefault()}
                            onKeyDown={(e) => {
                              if (e.key === "Escape") {
                                e.preventDefault();
                                setSchoolFocused(false);
                                setActiveSchoolIndex(-1);
                                schoolInput.current?.focus();
                              }
                            }}
                            onClick={() => {
                              setSchool(item);
                              setSchoolFocused(false);
                              setActiveSchoolIndex(-1);
                              schoolInput.current?.focus();
                            }}
                            onBlur={() => {
                              schoolBlurTimeout.current = setTimeout(() => {
                                if (!document.getElementById("school-options")?.contains(document.activeElement)) {
                                  setSchoolFocused(false);
                                  setActiveSchoolIndex(-1);
                                }
                              }, 120);
                            }}
                            className={`w-full px-4 py-3 text-left text-sm text-neutral-700 hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none ${activeSchoolIndex === index ? "bg-neutral-50" : ""}`}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="sm:col-span-2"><label htmlFor="portfolio" className={labelClass}>Link to your work <span aria-hidden="true">*</span></label><p className="mb-2 text-xs leading-5 text-neutral-500">LinkedIn, GitHub, portfolio, or CV are all welcome.</p><input id="portfolio" ref={(node) => { fields.current.portfolio = node; }} required aria-required="true" type="url" autoComplete="url" inputMode="url" value={portfolio} onChange={(e) => setValue("portfolio", setPortfolio, e.target.value)} className={inputClass} placeholder="https://" aria-invalid={!!fieldErrors.portfolio} aria-describedby={fieldErrors.portfolio ? "portfolio-error" : undefined} />{fieldError("portfolio")}</div>
                <div className="sm:col-span-2"><label htmlFor="why" className={labelClass}>Anything you&apos;d like us to know? <span className="text-xs font-normal text-neutral-500">(optional)</span></label><textarea id="why" value={why} onChange={(e) => setWhy(e.target.value)} className={`${inputClass} resize-y`} rows={4} placeholder="What you hope to learn, or something you’ve built that you’re proud of." /></div>
              </div>
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800" role="alert">
                  <p>{error}</p>
                  <p className="mt-2">
                    <a className="font-medium underline underline-offset-2" href={applicationDownload} download={`olyxee-${selectedRole?.slug ?? "internship"}-application.txt`}>
                      Download completed application
                    </a>{" "}
                    to attach to an email. Or open a draft to{" "}
                    <a className="font-medium underline underline-offset-2" href={`mailto:info@olyxee.com?subject=${encodeURIComponent(`Application for ${selectedRole?.title ?? "an internship"}`)}&body=${encodeURIComponent("Hello Olyxee hiring team,\n\nI’d like to apply for this role. My name is:\n\nCV or work link:\n\n")}`}>
                      info@olyxee.com
                    </a>
                    . Attach the file, review it, and send the email yourself. The download alone does not submit your application.
                  </p>
                </div>
              )}
              <div className="border-t border-neutral-200 pt-6"><button type="submit" disabled={submitting} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-wait disabled:opacity-60 sm:w-auto">{submitting ? "Sending application…" : "Submit application"} <ArrowRight className="h-4 w-4" /></button><p className="mt-4 text-xs leading-5 text-neutral-500">Your application is sent to Olyxee&apos;s hiring team.</p></div>
            </form>}
          </section>
        </div>
      </main>
      <Footer variant="light" />
    </div>
  );
};

export default InternshipsPage;