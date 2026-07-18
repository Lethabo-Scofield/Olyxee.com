import { FC } from "react";
import Image from "next/image";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import TalkToEnterprise from "../components/EnterpriseContactModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  period?: string;
  popular?: boolean;
  desc: string;
  features: string[];
  note?: string;
  cta: "get-started" | "contact-sales";
};

const ORGNI_PLANS: Plan[] = [
  {
    name: "Free",
    price: "R0",
    period: "/month",
    desc: "For small teams exploring Orgni with one focused operational use case.",
    features: [
      "One workspace",
      "Up to 3 users",
      "Basic document uploads",
      "Basic workflow mapping",
      "Limited organisational context",
      "Standard support",
    ],
    cta: "get-started",
  },
  {
    name: "Starter",
    price: "R99",
    period: "/month",
    desc: "For teams beginning to organise business knowledge and workflows.",
    features: [
      "Up to 5 users",
      "One business function",
      "Document and workflow mapping",
      "Organisational memory",
      "Basic reporting",
      "Standard support",
    ],
    cta: "get-started",
  },
  {
    name: "Business",
    price: "R999",
    period: "/month",
    popular: true,
    desc: "For businesses connecting Orgni across teams, workflows and systems.",
    features: [
      "Multiple business functions",
      "Up to 20 users",
      "Business rules and approval flows",
      "Shared organisational context",
      "Risk, exception and bottleneck visibility",
      "API and database integrations",
      "Priority support",
    ],
    note: "Implementation and custom integrations may be quoted separately.",
    cta: "get-started",
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For organisations deploying Orgni across complex or regulated operations.",
    features: [
      "Organisation-wide deployment",
      "Custom user and usage limits",
      "Advanced governance and permissions",
      "Custom APIs and integrations",
      "Monitoring and audit trails",
      "Dedicated infrastructure support",
      "Enterprise service agreements",
    ],
    cta: "contact-sales",
  },
];

const ORDER_LOOP_PLANS: Plan[] = [
  {
    name: "Free",
    price: "R0",
    period: "/month",
    desc: "Get started and keep your first customers in the loop.",
    features: [
      "Up to 50 orders per month",
      "No-app customer tracking",
      "Email updates",
      "Basic branding",
      "Basic customer self-service",
    ],
    cta: "get-started",
  },
  {
    name: "Growth",
    price: "R99",
    period: "/month",
    popular: true,
    desc: "For growing businesses that need SMS, branding and operational evidence.",
    features: [
      "Up to 300 orders per month",
      "SMS and email communication",
      "Fully branded tracking experience",
      "Customer self-service",
      "Order and delivery evidence",
      "SMS usage billed separately or capped",
    ],
    cta: "get-started",
  },
  {
    name: "Scale",
    price: "R499",
    period: "/month",
    desc: "For businesses managing higher order volumes and connected operations.",
    features: [
      "Up to 1,000 orders per month",
      "Order Communication API",
      "Custom integrations",
      "Orgni-powered AI Call Agent",
      "Limited AI call minutes included",
      "Additional calls and usage billed separately",
    ],
    cta: "get-started",
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For businesses with high order volumes, multiple locations or complex communication requirements.",
    features: [
      "Custom order limits",
      "Multiple teams and locations",
      "Advanced integrations",
      "Custom communication workflows",
      "Dedicated infrastructure and support",
      "Custom AI call usage",
    ],
    cta: "contact-sales",
  },
];

const PlanCard: FC<{ plan: Plan }> = ({ plan }) => (
  <div
    className={`relative flex flex-col bg-white rounded-[1.5rem] p-8 ring-1 transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] ${
      plan.popular ? "ring-2 ring-[#111] shadow-[0_10px_30px_rgba(0,0,0,0.08)]" : "ring-black/10"
    }`}
  >
    {plan.popular && (
      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#111] text-white text-[12px] font-medium whitespace-nowrap">
        Most popular
      </span>
    )}
    <h3 className="text-[1.25rem] font-medium text-[#111] mb-2">{plan.name}</h3>
    <div className="flex items-baseline gap-1 mb-4">
      <span className="text-[2.25rem] font-medium tracking-tight text-[#111]">{plan.price}</span>
      {plan.period && <span className="text-[15px] text-[#4a5568]">{plan.period}</span>}
    </div>
    <p className="text-[15px] text-[#4a5568] leading-relaxed mb-6">{plan.desc}</p>
    <ul className="space-y-3 mb-8">
      {plan.features.map((f) => (
        <li key={f} className="flex items-start gap-3 text-[14px] text-[#111]">
          <Check className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2.5} />
          <span>{f}</span>
        </li>
      ))}
    </ul>
    {plan.note && (
      <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">{plan.note}</p>
    )}
    <div className="mt-auto">
      {plan.cta === "get-started" ? (
        <Link
          href="/signup"
          className={`inline-flex w-full items-center justify-center px-6 py-3 rounded-full font-medium text-[15px] transition-colors ${
            plan.popular
              ? "bg-[#111] text-white hover:bg-black"
              : "bg-white text-[#111] ring-1 ring-black/15 hover:bg-[#f5f5f5]"
          }`}
        >
          Get started
        </Link>
      ) : (
        <TalkToEnterprise
          label="Contact sales"
          className="inline-flex w-full items-center justify-center px-6 py-3 rounded-full font-medium text-[15px] bg-white text-[#111] ring-1 ring-black/15 hover:bg-[#f5f5f5] transition-colors"
        />
      )}
    </div>
  </div>
);

const ProductSection: FC<{
  logo: string;
  name: string;
  tagline: string;
  desc: string;
  plans: Plan[];
}> = ({ logo, name, tagline, desc, plans }) => (
  <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
    <div className="flex items-center gap-3 mb-4">
      <Image src={logo} alt="" width={32} height={32} className="w-8 h-8 object-contain" />
      <h2 className="text-[2rem] sm:text-[2.5rem] font-medium tracking-tighter text-[#111]">{name}</h2>
    </div>
    <p className="text-[1.25rem] sm:text-[1.5rem] font-medium tracking-tight text-[#111] mb-3">{tagline}</p>
    <p className="text-[1.05rem] text-[#4a5568] max-w-2xl leading-relaxed mb-12">{desc}</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
      {plans.map((plan) => (
        <PlanCard key={plan.name} plan={plan} />
      ))}
    </div>
  </section>
);

const Pricing: FC = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111] font-sans selection:bg-neutral-200 selection:text-neutral-900 relative">
      <SEO
        title="Pricing"
        description="Start free, then scale as your business grows. Simple pricing for Orgni and Order Loop."
        path="/pricing"
      />
      <Header />

      {/* === HERO === */}
      <section className="relative pt-40 sm:pt-48 pb-8 sm:pb-12 px-4 sm:px-6 text-center bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#e5e5e5]/40 blur-[120px] rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-[2.5rem] sm:text-[4rem] font-medium tracking-tighter leading-[1.05] mb-6">
            Pricing
          </h1>
          <p className="text-[1.125rem] sm:text-[1.25rem] text-[#4a5568] leading-relaxed">
            Start free, then scale as your business grows.
          </p>
        </motion.div>
      </section>

      <div className="bg-white pb-8">
        <ProductSection
          logo="/Logo/orgni-mark.png"
          name="Orgni"
          tagline="Operational intelligence for your business"
          desc="Orgni builds a living understanding of your organisation by connecting its workflows, documents, systems and decisions."
          plans={ORGNI_PLANS}
        />
      </div>

      <div className="bg-[#fafafa] border-t border-black/5">
        <ProductSection
          logo="/Logo/order-loop-mark.png"
          name="Order Loop"
          tagline="Keep every customer informed from order to completion"
          desc="Order Loop manages customer communication, tracking and operational evidence for deliveries and collections."
          plans={ORDER_LOOP_PLANS}
        />
      </div>

      {/* === TOGETHER CTA === */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 text-center max-w-4xl mx-auto border-t border-black/5">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image src="/Logo/orgni-mark.png" alt="Orgni" width={40} height={40} className="w-10 h-10 object-contain" />
          <span className="text-[1.5rem] text-[#4a5568]">+</span>
          <Image src="/Logo/order-loop-mark.png" alt="Order Loop" width={40} height={40} className="w-10 h-10 object-contain" />
        </div>
        <h2 className="text-[2rem] sm:text-[3rem] font-medium tracking-tighter text-[#111] mb-6 leading-[1.1]">
          Use Orgni and Order Loop together
        </h2>
        <p className="text-[1.125rem] text-[#4a5568] max-w-2xl mx-auto leading-relaxed mb-10">
          Connect order activity, customer communication and delivery evidence to the broader operational context of your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <TalkToEnterprise
            label="Contact sales"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#111] text-white rounded-full font-medium hover:bg-black transition-colors text-[15px] tracking-wide w-full sm:w-auto"
          />
          <Link
            href="/enterprise"
            className="inline-flex items-center justify-center gap-1.5 text-[#111] font-medium hover:underline underline-offset-4 text-[15px]"
          >
            Explore the platform <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
