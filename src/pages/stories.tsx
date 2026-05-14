import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const STORIES = [
  {
    tag: "Logistics",
    headline: "Operational infrastructure for cross-continent freight.",
    image: "/images/stories/logistics.png",
    alt: "Warehouse worker in safety vest packaging shipments on the line",
    href: "/stories/freightshift",
  },
  {
    tag: "Accounting",
    headline: "Five-day close, now overnight.",
    image: "/images/stories/accounting.png",
    alt: "Finance team reviewing an operations dashboard together",
    href: "/stories/accounting",
  },
  {
    tag: "Automation",
    headline: "Supplier onboarding, fully automated.",
    image: "/images/stories/automation.png",
    alt: "Distributed team celebrating a launch together at the desk",
    href: "/stories/automation",
  },
];

const Stories: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Stories" description="Customer stories from teams building on Olyxee." path="/stories" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em]">Stories</p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 max-w-3xl leading-[1.05]"
          >
            <span className="relative inline-block">
              Olyxee AI Infrastructure
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-0 -bottom-2 sm:-bottom-3 w-full h-3 sm:h-[18px] overflow-visible text-orange-500"
                viewBox="0 0 300 18"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M3 11 C 55 4, 105 16, 155 8 S 250 15, 297 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
            {" "}at work, across the operations that matter
          </motion.h1>
        </div>
      </section>

      <section className="pb-32 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
            {STORIES.map((story, i) => (
              <motion.article
                key={story.tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={story.href} className="group block cursor-pointer">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-neutral-100 mb-6 ring-1 ring-neutral-900/5">
                    <Image
                      src={story.image}
                      alt={story.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 540px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.18em] mb-2">
                    {story.tag}
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 tracking-tight leading-snug group-hover:text-neutral-600 transition-colors">
                    {story.headline}
                  </h3>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stories;
