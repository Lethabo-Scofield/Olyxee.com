import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CONTACT_OPTIONS = [
  {
    label: "Sales",
    title: "Talk to our team about Olyxee for your company.",
    href: "mailto:scofield@olyxee.com?subject=Sales%20inquiry",
    cta: "Contact sales",
  },
  {
    label: "Enterprise",
    title: "Custom deployments, pilots, and dedicated support.",
    href: "mailto:scofield@olyxee.com?subject=Enterprise%20inquiry",
    cta: "Contact enterprise",
  },
  {
    label: "Partnerships",
    title: "Vendors, integrators, cloud and infrastructure partners.",
    href: "mailto:scofield@olyxee.com?subject=Partnership%20inquiry",
    cta: "Contact partnerships",
  },
  {
    label: "Research",
    title: "Joint research, datasets, and academic collaboration.",
    href: "mailto:scofield@olyxee.com?subject=Research%20collaboration",
    cta: "Contact research",
  },
  {
    label: "Support",
    title: "Existing customer with a question or issue.",
    href: "mailto:scofield@olyxee.com?subject=Support%20request",
    cta: "Contact support",
  },
  {
    label: "Press",
    title: "Media, interviews, and brand assets.",
    href: "mailto:scofield@olyxee.com?subject=Press%20inquiry",
    cta: "Contact press",
  },
  {
    label: "Careers",
    title: "Open paid roles and the paid internship program.",
    href: "/careers",
    cta: "View open roles",
    internal: true,
  },
  {
    label: "General",
    title: "Anything else, including questions about what we're building.",
    href: "mailto:scofield@olyxee.com",
    cta: "Send a message",
  },
];

const Contact: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SEO
        title="Contact"
        description="Get in touch with Olyxee. Reach out for sales, enterprise pilots, partnerships, research collaboration, support, press, careers, or general inquiries."
        path="/contact"
        keywords={["Contact Olyxee", "Olyxee sales", "Olyxee support", "Olyxee partnerships", "AI infrastructure contact"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Olyxee",
          url: "https://olyxee.com/contact",
          mainEntity: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
            email: "scofield@olyxee.com",
            contactPoint: [
              { "@type": "ContactPoint", contactType: "Sales", email: "scofield@olyxee.com" },
              { "@type": "ContactPoint", contactType: "Support", email: "scofield@olyxee.com" },
              { "@type": "ContactPoint", contactType: "Press", email: "scofield@olyxee.com" }
            ]
          }
        }}
      />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.02] max-w-4xl">
            Contact us
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-500 font-light leading-relaxed max-w-2xl">
            Pick the topic that fits and we'll route your message to the right person on the team.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-28 sm:pb-36">
        <div className="max-w-6xl mx-auto border-t border-neutral-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
            {CONTACT_OPTIONS.map((opt, idx) => {
              const content = (
                <div className="group h-full flex flex-col justify-between gap-10 p-6 sm:p-8 lg:p-10 hover:bg-neutral-50 transition-colors">
                  <div>
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">{opt.label}</p>
                    <p className="font-serif text-xl sm:text-2xl text-neutral-900 leading-snug tracking-tight">{opt.title}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900">
                    {opt.cta}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              );
              const borderClass =
                idx >= 3 ? "lg:border-t border-neutral-200" : "";
              return opt.internal ? (
                <Link key={opt.label} href={opt.href} className={`block ${borderClass}`}>
                  {content}
                </Link>
              ) : (
                <a
                  key={opt.label}
                  href={opt.href}
                  className={`block ${borderClass}`}
                >
                  {content}
                </a>
              );
            })}
          </div>
          <div className="border-t border-neutral-200" />
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-28 sm:pb-36">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-2">Email</p>
            <a href="mailto:scofield@olyxee.com" className="text-neutral-900 hover:text-blue-500 transition-colors">scofield@olyxee.com</a>
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-2">Based in</p>
            <p className="text-neutral-900">Johannesburg, South Africa</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-2">Response time</p>
            <p className="text-neutral-900">Within 1 business day</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
