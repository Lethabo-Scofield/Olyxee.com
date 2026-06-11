import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import TalkToEnterprise from "../components/EnterpriseContactModal";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Workflow,
  CircleDollarSign,
  FileText,
  PackageCheck,
  Layers,
  BrainCircuit,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

type BrandIcon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

type Product = {
  name: string;
  tagline: string;
  href: string;
  external: boolean;
  Icon: BrandIcon;
  cta: string;
  status?: string;
  gradient: string;
};

const PRODUCTS: Product[] = [
  {
    name: "Orgni Platform",
    tagline:
      "The core. Connects your context, systems, and decisions so AI can run real operations with control and traceability.",
    href: "/technology",
    external: false,
    Icon: Layers,
    cta: "How it works",
    gradient: "/images/gradient-blue.webp",
  },
  {
    name: "Orgni Workflows",
    tagline:
      "Turn goals into finished work. Plans the steps and runs them across the tools your team already uses.",
    href: "https://ordo.olyxee.com/",
    external: true,
    Icon: Workflow,
    cta: "Visit Orgni Workflows",
    gradient: "/images/gradient-purple.webp",
  },
  {
    name: "Orgni Finance",
    tagline:
      "Financial reconciliation and integrity. Match transactions, explain mismatches, and close the books faster.",
    href: "https://addup.olyxee.com/",
    external: true,
    Icon: CircleDollarSign,
    cta: "Try Orgni Finance",
    gradient: "/images/gradient-yellow-green.webp",
  },
  {
    name: "Orgni Docs",
    tagline:
      "Document integrity. Verify, track, and trust the documents flowing through your operations.",
    href: "/document-integrity",
    external: false,
    Icon: FileText,
    cta: "Explore Orgni Docs",
    gradient: "/images/gradient-abstract-blue.webp",
  },
  {
    name: "Order Loop",
    tagline:
      "Clean order-status updates for your customers, from confirmed to delivered, sent automatically.",
    href: "https://logistics.olyxee.com/",
    external: true,
    Icon: PackageCheck,
    cta: "Open Order Loop",
    gradient: "/images/gradient-orange-pink.webp",
  },
  {
    name: "Togent",
    tagline:
      "Cost control and context optimization for AI agents, so they stop repeating expensive work.",
    href: "/contact",
    external: false,
    Icon: BrainCircuit,
    cta: "Get early access",
    status: "Coming soon",
    gradient: "/images/gradient-pink-cyan.webp",
  },
];

const ProductsPage: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Products"
        description="The Orgni family of products from Olyxee. One core platform powering Orgni Workflows, Orgni Finance, Orgni Docs, Order Loop, and Togent, so AI can run real business operations with control and traceability."
        path="/products"
        keywords={[
          "Olyxee products",
          "Orgni platform",
          "Orgni Workflows",
          "Orgni Finance",
          "Orgni Docs",
          "AI business operations",
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Orgni Workflows",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Cloud",
            description:
              "Orgni Workflows turns goals into completed multi-step workflows across the tools your team already uses, with full audit trails.",
            url: "https://ordo.olyxee.com/",
            creator: { "@type": "Organization", name: "Olyxee", url: "https://olyxee.com" },
          },
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Orgni Finance",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Cloud",
            description:
              "Orgni Finance applies AI execution to accounting, starting with reconciliation and mismatch explanation.",
            url: "https://addup.olyxee.com/",
            creator: { "@type": "Organization", name: "Olyxee", url: "https://olyxee.com" },
          },
        ]}
      />
      <div className="grain" />
      <Header />

      {/* === HERO — Orgni ecosystem === */}
      <section className="relative pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6 bg-white">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-neutral-500 mb-5">
              Products
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05] mb-6">
              One core. <em className="text-orange-500 not-italic">Every operation.</em>
            </h1>
            <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed max-w-xl mx-auto">
              Orgni is the platform that helps businesses connect AI to real operations. It gives AI the business context, memory, and controls needed to work across documents, workflows, finance, logistics, and decisions without losing track of what happened.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-12 sm:mt-16 max-w-5xl mx-auto rounded-3xl overflow-hidden border border-neutral-200/80 shadow-2xl shadow-neutral-300/40"
          >
            <Image
              src="/images/orgni-ecosystem.png"
              alt="The Orgni ecosystem: the Orgni platform at the center, surrounded by Orgni Docs, Orgni Workflows, Orgni Finance, Togent, Order Loop, and Orgni Platform."
              width={1024}
              height={768}
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="w-full h-auto block"
            />
            <div aria-hidden className="absolute inset-0 rounded-3xl pointer-events-none ring-1 ring-inset ring-black/5" />
          </motion.div>
        </div>
      </section>

      {/* === PRODUCT GRID === */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.05] mb-12 sm:mb-14 max-w-2xl"
          >
            The Orgni family.
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => {
              const inner = (
                <div className="group relative flex flex-col h-full p-3 rounded-3xl overflow-hidden ring-1 ring-neutral-200/80 hover:ring-neutral-300 hover:shadow-xl hover:shadow-neutral-200/60 transition-all duration-300">
                  <Image
                    src={p.gradient}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between p-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-md ring-1 ring-white/60 flex items-center justify-center shadow-sm">
                        <p.Icon className="w-5 h-5 text-neutral-700" strokeWidth={1.75} />
                      </div>
                      {p.status && (
                        <span className="px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md text-orange-600 text-[10px] font-mono uppercase tracking-[0.18em]">
                          {p.status}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-white/60 shadow-sm p-5 sm:p-6">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2.5">{p.name}</h3>
                      <p className="text-sm text-neutral-600 font-light leading-relaxed">
                        {p.tagline}
                      </p>

                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900">
                        {p.cta}
                        {p.external ? (
                          <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={p.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  {p.external ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full focus:outline-none"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={p.href} className="block h-full focus:outline-none">
                      {inner}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === BOTTOM CTA === */}
      <section className="relative py-20 sm:py-28 lg:py-32 bg-white border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl bg-neutral-100 border border-neutral-200/70 px-6 sm:px-12 lg:px-20 py-14 sm:py-20 lg:py-24 overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-orange-100/50 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-neutral-200/60 blur-3xl"
            />

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 leading-[1.05]">
                Built for your team
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-9 max-w-lg mx-auto">
                Talk to us about bringing Orgni into your organization, shaped around your workflows, data, and security requirements.
              </p>

              <div className="flex justify-center">
                <TalkToEnterprise />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
