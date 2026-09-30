import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Mail } from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { recentCareerApplication } from "../../lib/career-confirmation";
import type { Role } from "../../lib/careers-roles";

export default function ApplicationReceivedPage() {
  // A direct visit must not imply that an application was delivered.
  const [role, setRole] = useState<Role | null | undefined>(undefined);

  useEffect(() => {
    setRole(recentCareerApplication());
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SEO
        title="Application received · Careers"
        description="What happens after submitting an application to Olyxee Careers."
        path="/careers/application-received"
        noindex
      />
      <Header />
      <main className="min-h-[72vh] px-5 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-3xl">
          <Link href="/careers" className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900">
            <ArrowLeft size={15} /> Back to careers
          </Link>

          {role === undefined ? (
            <p role="status" className="mt-20 text-sm text-neutral-500">Checking your recent submission…</p>
          ) : role === null ? (
            <section className="mt-16 border-t border-neutral-200 pt-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">Olyxee Careers</p>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">No recent application found.</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600">
                This page appears after a successful application. If you have not submitted one in this tab, browse our open roles to get started.
              </p>
              <Link href="/careers" className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700">
                View open roles <ArrowRight size={16} />
              </Link>
            </section>
          ) : (
            <article className="mt-14">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50" aria-hidden="true">
                <Check size={23} strokeWidth={2} />
              </div>
              <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">Application submitted</p>
              <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">
                We&apos;ve received your application.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
                Thank you for applying for <span className="font-medium text-neutral-900">{role.title}</span>. Your application was sent to the Olyxee hiring team.
              </p>

              <section className="mt-12 border-t border-neutral-200 pt-8" aria-labelledby="next-steps">
                <h2 id="next-steps" className="text-lg font-semibold tracking-tight">What happens next</h2>
                <div className="mt-6 grid gap-7 sm:grid-cols-2">
                  <div>
                    <span className="text-xs font-semibold text-neutral-400">01 / Review</span>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">Our team will review your application and the work you shared.</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-400">02 / Next steps</span>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">If we&apos;d like to move forward, we&apos;ll contact you at the email you provided within two to three weeks.</p>
                  </div>
                </div>
              </section>

              <div className="mt-10 flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <Mail size={19} className="mt-0.5 shrink-0 text-neutral-600" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-neutral-600">
                  We&apos;ve also requested an email confirmation. If it doesn&apos;t arrive, there&apos;s no need to submit again; your application was delivered to our team.
                </p>
              </div>

              <Link href="/careers" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600">
                Explore other roles <ArrowRight size={16} />
              </Link>
            </article>
          )}
        </div>
      </main>
      <Footer variant="light" />
    </div>
  );
}