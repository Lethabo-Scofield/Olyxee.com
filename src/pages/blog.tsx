import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

const posts: BlogPost[] = [
  {
    title: "Why AI Systems Fail in Production (And How to Fix It)",
    excerpt: "We analyzed hundreds of AI deployment failures across industries. The patterns are consistent — and preventable. Here's what we learned.",
    category: "Engineering",
    date: "Oct 2025",
    readTime: "8 min read",
  },
  {
    title: "Introducing Grysics: Verification-First Edge AI",
    excerpt: "Today we're launching Grysics — a verification engine that tests AI models against real hardware profiles before deployment.",
    category: "Product",
    date: "Sep 2025",
    readTime: "5 min read",
  },
  {
    title: "Benchmarking Edge AI: What Metrics Actually Matter",
    excerpt: "Accuracy alone doesn't tell you if your model will work on a Raspberry Pi. We propose a multi-dimensional evaluation framework.",
    category: "Research",
    date: "Aug 2025",
    readTime: "12 min read",
  },
  {
    title: "The WAVE Architecture: How Olyxee Handles Hardware Abstraction",
    excerpt: "A technical deep-dive into how WAVE abstracts away device-specific complexity to provide a unified deployment interface.",
    category: "Technical",
    date: "Jul 2025",
    readTime: "10 min read",
  },
  {
    title: "From Notebook to Production: Bridging the AI Deployment Gap",
    excerpt: "The journey from a working Jupyter notebook to a reliable production system is longer than most teams expect. Here's a roadmap.",
    category: "Engineering",
    date: "Jun 2025",
    readTime: "7 min read",
  },
  {
    title: "Model Drift Detection at the Edge",
    excerpt: "How do you know when your deployed model is no longer performing well? We explore lightweight drift detection techniques for edge devices.",
    category: "Research",
    date: "May 2025",
    readTime: "9 min read",
  },
];

const Blog: FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Blog</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
            Insights & Updates
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Technical writing on AI deployment, reliability engineering, and the future of edge AI.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.title}
                className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;
