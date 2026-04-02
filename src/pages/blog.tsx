import { FC, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Product", "Engineering", "Research", "Company"];

const posts = [
  {
    slug: "introducing-grysics",
    title: "Introducing Grysics: Verification-First AI Deployment",
    category: "Product",
    date: "Mar 28, 2026",
    readTime: "6 min",
    excerpt: "Today we're publicly unveiling Grysics, a verification engine that tests, validates, and monitors AI models before and after they reach production.",
    featured: true,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    content: [
      {
        heading: "The problem we set out to solve",
        body: `Every AI team hits the same wall. The model works beautifully in a notebook: high accuracy, clean outputs, fast inference. Then it ships to production, and things start breaking. Not catastrophically at first. Subtle drift, edge cases the test set didn't cover, hardware constraints nobody accounted for.\n\nWe spent months talking to engineering teams across industries. The stories were remarkably consistent: weeks of debugging deployment failures, models silently degrading in production, no clear way to know if a model would actually work on target hardware before committing to a rollout.\n\nThe tooling gap was obvious. There were great tools for training models, great tools for serving them, but almost nothing for the critical step in between: verifying that a model is actually ready for the real world.`,
      },
      {
        heading: "What Grysics does",
        body: `Grysics is a verification engine. It sits between your training pipeline and your deployment target, and it answers one question: will this model work correctly in production?\n\nIt does this through three layers of verification:\n\n**Pre-deployment testing**: Grysics runs your model against hardware-specific profiles, testing inference speed, memory footprint, numerical precision, and edge-case behavior on the exact configuration you're deploying to.\n\n**Continuous validation**: Once deployed, Grysics monitors model behavior in real-time. It tracks output distributions, latency patterns, and resource usage.\n\n**Drift detection**: When model performance degrades, whether from data drift, hardware issues, or environmental changes, Grysics detects it immediately.`,
      },
      {
        heading: "Why verification-first matters",
        body: `The AI industry has largely treated deployment as an afterthought. Train the model, optimize it a bit, push it to production, and hope for the best. When things go wrong, debug reactively.\n\nWe think this is backwards. Verification should be a first-class step in the pipeline, not something you do when things break, but something that prevents breakage in the first place.\n\nThis is the same shift that happened in software engineering with CI/CD and automated testing. Nobody ships code without tests anymore. We believe the same should be true for AI models.`,
      },
      {
        heading: "What's next",
        body: `Grysics v1.0 is available today through our developer portal. We're starting with support for PyTorch and TensorFlow models targeting edge devices and cloud endpoints.\n\nOver the coming months, we'll be expanding hardware support, adding team collaboration features, and deepening our monitoring capabilities. If you're shipping AI to production and want to stop guessing whether it'll work. We built Grysics for you.`,
      },
    ],
  },
  {
    slug: "edge-ai-latency",
    title: "Why Latency Matters More Than Accuracy at the Edge",
    category: "Engineering",
    date: "Mar 20, 2026",
    readTime: "8 min",
    excerpt: "In edge deployments, a 50ms latency spike can be more damaging than a 2% accuracy drop. Here's how we think about the tradeoff.",
    featured: false,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    slug: "oeb-architecture",
    title: "Inside the OEB Architecture: From Lab to Field",
    category: "Engineering",
    date: "Mar 14, 2026",
    readTime: "10 min",
    excerpt: "A deep dive into how Olyxee Edge Box translates research models into production-ready edge deployments across constrained hardware.",
    featured: false,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    slug: "ai-verification-landscape",
    title: "The State of AI Verification in 2026",
    category: "Research",
    date: "Mar 7, 2026",
    readTime: "12 min",
    excerpt: "An analysis of how the industry approaches model testing, where the gaps are, and what a mature verification practice looks like.",
    featured: false,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
  },
  {
    slug: "founding-story",
    title: "Why We Started Olyxee",
    category: "Company",
    date: "Feb 28, 2026",
    readTime: "5 min",
    excerpt: "The story behind Olyxee: what we saw missing in AI infrastructure and why we decided to build it ourselves.",
    featured: false,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    slug: "model-drift-detection",
    title: "Detecting Model Drift Before It Hits Production",
    category: "Product",
    date: "Feb 18, 2026",
    readTime: "7 min",
    excerpt: "How Grysics continuously monitors deployed models and catches performance degradation in real-time.",
    featured: false,
    gradient: "from-violet-500 via-purple-500 to-indigo-500",
  },
];

function ArticleCard({ post, index }: { post: typeof posts[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="group cursor-pointer"
    >
      <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${post.gradient} aspect-[16/9] mb-5`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-end p-6">
          <span className="text-white/70 text-xs font-medium uppercase tracking-widest">{post.category}</span>
        </div>
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
        <span>{post.date}</span>
        <span className="w-1 h-1 rounded-full bg-neutral-300" />
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 tracking-tight leading-snug mb-2 group-hover:text-neutral-600 transition-colors duration-300">
        {post.title}
      </h3>
      <p className="text-sm text-neutral-500 leading-relaxed font-light line-clamp-2">
        {post.excerpt}
      </p>
    </motion.div>
  );
}

const Blog: FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState(false);

  const featuredPost = posts.find(p => p.featured)!;
  const gridPosts = posts.filter(p => !p.featured);
  const filteredPosts = activeCategory === "All" ? gridPosts : gridPosts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Blog" description="Technical articles, insights, and updates from the Olyxee team on AI infrastructure, verification, and deployment." path="/blog" />
      <div className="grain" />
      <Header />

      <section className="pt-40 sm:pt-48 pb-20 sm:pb-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-3.5 py-1.5 bg-neutral-100 rounded-full text-xs font-medium text-neutral-500 uppercase tracking-widest">
              Blog
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.08] mb-5"
          >
            Insights &{" "}
            <em className="text-neutral-400">updates</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-neutral-500 leading-relaxed max-w-2xl font-light"
          >
            Technical writing on AI deployment, reliability engineering, and the future of edge AI.
          </motion.p>
        </div>
      </section>

      <section className="pb-32 sm:pb-44">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group cursor-pointer mb-20 sm:mb-28"
          >
            <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${featuredPost.gradient} aspect-[2/1] sm:aspect-[5/2] mb-8`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white uppercase tracking-widest">
                  Featured
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 lg:p-10">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 text-xs text-white/60 mb-3">
                    <span>{featuredPost.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span>{featuredPost.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span>{featuredPost.category}</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-[1.15]">
                    {featuredPost.title}
                  </h2>
                </div>
              </div>
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="max-w-3xl">
              <p className="text-lg text-neutral-600 leading-relaxed font-light mb-8">
                {featuredPost.excerpt}
              </p>

              <div className="prose-custom">
                {featuredPost.content?.slice(0, 1).map((section) => (
                  <div key={section.heading} className="mb-10">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-4 tracking-tight">{section.heading}</h3>
                    {section.body.split("\n\n").map((para, i) => (
                      <p key={i} className="text-neutral-500 leading-[1.85] mb-4 text-[15px] font-light" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-700 font-medium">$1</strong>') }} />
                    ))}
                  </div>
                ))}

                <AnimatePresence>
                  {!expanded && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative"
                    >
                      <div className="absolute inset-x-0 bottom-12 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                      <button
                        onClick={() => setExpanded(true)}
                        className="relative flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-200 text-sm font-medium text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 transition-all group/btn bg-white"
                      >
                        Continue reading
                        <ChevronDown className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {featuredPost.content?.slice(1).map((section) => (
                        <div key={section.heading} className="mb-10">
                          <h3 className="text-xl font-semibold text-neutral-900 mb-4 tracking-tight">{section.heading}</h3>
                          {section.body.split("\n\n").map((para, i) => (
                            <p key={i} className="text-neutral-500 leading-[1.85] mb-4 text-[15px] font-light" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-700 font-medium">$1</strong>') }} />
                          ))}
                        </div>
                      ))}

                      <div className="flex items-center gap-4 pt-6 border-t border-neutral-100">
                        <Link
                          href="/products/grysics"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-black transition-colors"
                        >
                          Try Grysics
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <span className="text-xs text-neutral-400">Free during beta</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-t border-neutral-100 pt-16 sm:pt-20"
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-widest">More articles</h2>
              <div className="flex items-center gap-1 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                      activeCategory === cat
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {filteredPosts.map((post, idx) => (
                <ArticleCard key={post.slug} post={post} index={idx} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-neutral-400 text-sm">No articles in this category yet.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 tracking-tight mb-1">Stay in the loop</h3>
              <p className="text-sm text-neutral-400 font-light">We publish new articles every other week. No spam.</p>
            </div>
            <Link
              href="/developers"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-black transition-colors flex-shrink-0"
            >
              Join the waitlist
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
