import { FC, useEffect, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm, { type ContactTopic } from "../components/contact/ContactForm";

interface FormOption {
  kind: "form";
  topic: ContactTopic;
  title: string;
  cta: string;
}

interface LinkOption {
  kind: "link";
  label: string;
  title: string;
  href: string;
  cta: string;
}

type ContactOption = FormOption | LinkOption;

const CONTACT_OPTIONS: ContactOption[] = [
  {
    kind: "form",
    topic: {
      key: "sales",
      label: "Sales",
      title: "Talk to our team about Olyxee for your company.",
      placeholder: "Tell us about your company, what you're trying to solve, and any timelines we should know about.",
    },
    title: "Talk to our team about Olyxee for your company.",
    cta: "Contact sales",
  },
  {
    kind: "form",
    topic: {
      key: "enterprise",
      label: "Enterprise",
      title: "Custom deployments, pilots, and dedicated support.",
      placeholder: "Tell us about your environment, the workflows you want to automate, and how many seats or agents you need.",
    },
    title: "Custom deployments, pilots, and dedicated support.",
    cta: "Contact enterprise",
  },
  {
    kind: "form",
    topic: {
      key: "partnerships",
      label: "Partnerships",
      title: "Vendors, integrators, cloud and infrastructure partners.",
      placeholder: "Tell us about your company and what kind of partnership you have in mind.",
    },
    title: "Vendors, integrators, cloud and infrastructure partners.",
    cta: "Contact partnerships",
  },
  {
    kind: "form",
    topic: {
      key: "research",
      label: "Research",
      title: "Joint research, datasets, and academic collaboration.",
      placeholder: "Tell us about your research focus, your team, and what kind of collaboration you have in mind.",
    },
    title: "Joint research, datasets, and academic collaboration.",
    cta: "Contact research",
  },
  {
    kind: "form",
    topic: {
      key: "support",
      label: "Support",
      title: "Existing customer with a question or issue.",
      placeholder: "Share what's happening, the product or workspace it relates to, and any error messages you're seeing.",
    },
    title: "Existing customer with a question or issue.",
    cta: "Contact support",
  },
  {
    kind: "form",
    topic: {
      key: "press",
      label: "Press",
      title: "Media, interviews, and brand assets.",
      placeholder: "Share your outlet, the story you're working on, your deadline, and what you'd like from us.",
    },
    title: "Media, interviews, and brand assets.",
    cta: "Contact press",
  },
  {
    kind: "link",
    label: "Careers",
    title: "Open paid roles and the paid internship program.",
    href: "/careers",
    cta: "View open roles",
  },
  {
    kind: "form",
    topic: {
      key: "general",
      label: "General",
      title: "Anything else, including questions about what we're building.",
      placeholder: "Tell us what's on your mind.",
    },
    title: "Anything else, including questions about what we're building.",
    cta: "Send a message",
  },
];

const Contact: FC = () => {
  const [activeTopic, setActiveTopic] = useState<ContactTopic | null>(null);
  const closeModal = () => setActiveTopic(null);

  useEffect(() => {
    if (!activeTopic) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveTopic(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [activeTopic]);

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
            email: "info@olyxee.com",
            contactPoint: [
              { "@type": "ContactPoint", contactType: "Sales", email: "info@olyxee.com" },
              { "@type": "ContactPoint", contactType: "Support", email: "info@olyxee.com" },
              { "@type": "ContactPoint", contactType: "Press", email: "info@olyxee.com" }
            ]
          }
        }}
      />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05] max-w-4xl break-words">
            Contact us
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-500 font-normal leading-relaxed max-w-2xl">
            Pick the topic that fits and we'll route your message to the right person on the team.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-28 sm:pb-36">
        <div className="max-w-6xl mx-auto border-t border-neutral-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
            {CONTACT_OPTIONS.map((opt, idx) => {
              const label = opt.kind === "form" ? opt.topic.label : opt.label;
              const content = (
                <div className="group h-full flex flex-col justify-between gap-10 p-6 sm:p-8 lg:p-10 hover:bg-neutral-50 transition-colors text-left">
                  <div>
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">{label}</p>
                    <p className="font-serif text-xl sm:text-2xl text-neutral-900 leading-snug tracking-tight">{opt.title}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900">
                    {opt.cta}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              );
              const borderClass = idx >= 3 ? "lg:border-t border-neutral-200" : "";
              if (opt.kind === "link") {
                return (
                  <Link key={label} href={opt.href} className={`block ${borderClass}`}>
                    {content}
                  </Link>
                );
              }
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveTopic(opt.topic)}
                  className={`block w-full ${borderClass}`}
                >
                  {content}
                </button>
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
            <a href="mailto:info@olyxee.com" className="text-neutral-900 hover:text-blue-500 transition-colors">info@olyxee.com</a>
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

      <AnimatePresence>
        {activeTopic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={closeModal} aria-hidden="true" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-neutral-100 px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 id="contact-modal-title" className="font-serif text-xl sm:text-2xl tracking-tight text-neutral-900 truncate">
                    Contact {activeTopic.label.toLowerCase()}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5 truncate">{activeTopic.title}</p>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-500" />
                </button>
              </div>

              <div className="px-5 sm:px-8 py-6">
                <ContactForm key={activeTopic.key} topic={activeTopic} onClose={closeModal} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
