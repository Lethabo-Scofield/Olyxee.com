import { FC, useEffect, useState, createContext, useContext } from "react";
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
  price: number | null; // ZAR amount, null = custom pricing
  popular?: boolean;
  desc: string;
  features: string[];
  note?: string;
  cta: "get-started" | "contact-sales";
};

const CURRENCIES = {
  ZAR: { symbol: "R", rate: 1, label: "ZAR" },
  USD: { symbol: "$", rate: 0.056, label: "USD" },
  EUR: { symbol: "\u20AC", rate: 0.048, label: "EUR" },
  GBP: { symbol: "\u00A3", rate: 0.042, label: "GBP" },
} as const;

type CurrencyCode = keyof typeof CURRENCIES;

const REGION_TO_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD", CA: "USD", MX: "USD", PH: "USD", SG: "USD", AE: "USD",
  GB: "GBP", IE: "EUR", DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR",
  NL: "EUR", BE: "EUR", AT: "EUR", PT: "EUR", FI: "EUR", GR: "EUR",
  ZA: "ZAR", NA: "ZAR", BW: "ZAR", LS: "ZAR", SZ: "ZAR", ZW: "ZAR",
};

const CurrencyContext = createContext<{
  currency: CurrencyCode;
  rates: Record<CurrencyCode, number>;
}>({ currency: "ZAR", rates: { ZAR: 1, USD: 0.056, EUR: 0.048, GBP: 0.042 } });

const formatPrice = (zar: number, currency: CurrencyCode, rates: Record<CurrencyCode, number>) => {
  const { symbol } = CURRENCIES[currency];
  if (zar === 0) return `${symbol}0`;
  const converted = zar * rates[currency];
  const rounded = currency === "ZAR" ? zar : converted < 20 ? Math.round(converted) : Math.round(converted / 5) * 5;
  return `${symbol}${rounded}`;
};

const ORGNI_PLANS: Plan[] = [
  {
    name: "Free",
    price: 0,
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
    price: 99,
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
    price: 999,
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
    price: null,
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
    price: 0,
    desc: "Get started running your first orders, shipments and customer tracking.",
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
    price: 99,
    popular: true,
    desc: "For growing logistics businesses managing more orders, invoicing and customer communication.",
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
    price: 499,
    desc: "For businesses running cross-border operations at higher volumes with connected systems.",
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
    price: null,
    desc: "For businesses with high volumes, multiple locations, warehouses or complex operational requirements.",
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

const PlanCard: FC<{ plan: Plan }> = ({ plan }) => {
  const { currency, rates } = useContext(CurrencyContext);
  return (
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
      <span className="text-[2.25rem] font-medium tracking-tight text-[#111]">
        {plan.price === null ? "Custom" : formatPrice(plan.price, currency, rates)}
      </span>
      {plan.price !== null && <span className="text-[15px] text-[#4a5568]">/month</span>}
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
};

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
  const [currency, setCurrency] = useState<CurrencyCode>("ZAR");
  const [rates, setRates] = useState<Record<CurrencyCode, number>>({
    ZAR: 1,
    USD: CURRENCIES.USD.rate,
    EUR: CURRENCIES.EUR.rate,
    GBP: CURRENCIES.GBP.rate,
  });

  useEffect(() => {
    // Detect visitor region from browser locale, fall back to timezone
    let region: string | undefined;
    const locale = navigator.languages?.[0] || navigator.language;
    const match = locale?.match(/-([A-Z]{2})\b/);
    if (match) region = match[1];
    if (!region) {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz.startsWith("America/")) region = "US";
      else if (tz === "Europe/London") region = "GB";
      else if (tz.startsWith("Europe/")) region = "DE";
      else if (tz.startsWith("Africa/Johannesburg")) region = "ZA";
    }
    const detected = region ? REGION_TO_CURRENCY[region] : undefined;
    if (detected) setCurrency(detected);
    else if (region && !REGION_TO_CURRENCY[region]) setCurrency("USD");

    // Refresh live exchange rates; keep built-in fallbacks if unavailable
    fetch("https://open.er-api.com/v6/latest/ZAR")
      .then((r) => r.json())
      .then((data) => {
        if (data?.result === "success" && data.rates) {
          setRates({
            ZAR: 1,
            USD: data.rates.USD ?? CURRENCIES.USD.rate,
            EUR: data.rates.EUR ?? CURRENCIES.EUR.rate,
            GBP: data.rates.GBP ?? CURRENCIES.GBP.rate,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111] font-sans selection:bg-neutral-200 selection:text-neutral-900 relative">
      <SEO
        title="Pricing: Orgni & Olyxee Logistics Plans"
        description="Simple, transparent pricing for Orgni operational intelligence and Olyxee Logistics logistics operations. Start free, upgrade from R99/month, or talk to sales about enterprise plans."
        path="/pricing"
        keywords={[
          "Olyxee pricing",
          "Orgni pricing",
          "Olyxee Logistics pricing",
          "operational intelligence software pricing",
          "business workflow software cost",
          "order tracking software pricing",
          "delivery communication platform price",
          "AI business platform pricing South Africa",
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Orgni",
            description:
              "Orgni builds a living understanding of your organisation by connecting its workflows, documents, systems and decisions.",
            brand: { "@type": "Brand", name: "Olyxee" },
            url: "https://olyxee.com/pricing",
            offers: ORGNI_PLANS.filter((p) => p.price !== null).map((p) => ({
              "@type": "Offer",
              name: `Orgni ${p.name}`,
              price: p.price,
              priceCurrency: "ZAR",
              description: p.desc,
              url: "https://olyxee.com/pricing",
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Olyxee Logistics",
            description:
              "Olyxee Logistics is a logistics operations platform for managing customers, invoices, cross-border orders, warehouse cargo matching, shipment statuses and customer tracking.",
            brand: { "@type": "Brand", name: "Olyxee" },
            url: "https://logistics.olyxee.com",
            offers: ORDER_LOOP_PLANS.filter((p) => p.price !== null).map((p) => ({
              "@type": "Offer",
              name: `Olyxee Logistics ${p.name}`,
              price: p.price,
              priceCurrency: "ZAR",
              description: p.desc,
              url: "https://logistics.olyxee.com",
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is there a free plan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Both Orgni and Olyxee Logistics have free plans: Orgni Free supports one workspace and up to 3 users, and Olyxee Logistics Free covers up to 50 orders per month with no-app customer tracking.",
                },
              },
              {
                "@type": "Question",
                name: "What currency is billing in?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Billing is in South African Rand (ZAR). The pricing page shows approximate conversions to USD, EUR and GBP based on current exchange rates.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use Orgni and Olyxee Logistics together?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Orgni and Olyxee Logistics integrate so order activity, customer communication and delivery evidence connect to the broader operational context of your business.",
                },
              },
            ],
          },
        ]}
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
          <p className="text-[1.125rem] sm:text-[1.25rem] text-[#4a5568] leading-relaxed mb-8">
            Start free, then scale as your business grows.
          </p>
          <div className="inline-flex items-center gap-1 bg-[#f5f5f5] rounded-full p-1 ring-1 ring-black/10">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  currency === c ? "bg-[#111] text-white" : "text-[#4a5568] hover:text-[#111]"
                }`}
              >
                {CURRENCIES[c].symbol} {c}
              </button>
            ))}
          </div>
          {currency !== "ZAR" && (
            <p className="mt-4 text-[13px] text-[#4a5568]">
              Prices are converted from South African Rand (ZAR) at current exchange rates and are approximate. Billing is in ZAR.
            </p>
          )}
        </motion.div>
      </section>

      <CurrencyContext.Provider value={{ currency, rates }}>
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
          name="Olyxee Logistics"
          tagline="Keep every customer informed from order to completion"
          desc="Olyxee Logistics is a logistics operations platform for managing customers, invoices, cross-border orders, warehouse cargo matching, shipment statuses and customer tracking."
          plans={ORDER_LOOP_PLANS}
        />
      </div>
      </CurrencyContext.Provider>

      {/* === TOGETHER CTA === */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 text-center max-w-4xl mx-auto border-t border-black/5">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image src="/Logo/orgni-mark.png" alt="Orgni" width={40} height={40} className="w-10 h-10 object-contain" />
          <span className="text-[1.5rem] text-[#4a5568]">+</span>
          <Image src="/Logo/order-loop-mark.png" alt="Olyxee Logistics" width={40} height={40} className="w-10 h-10 object-contain" />
        </div>
        <h2 className="text-[2rem] sm:text-[3rem] font-medium tracking-tighter text-[#111] mb-6 leading-[1.1]">
          Use Orgni and Olyxee Logistics together
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
            href="/contact"
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
