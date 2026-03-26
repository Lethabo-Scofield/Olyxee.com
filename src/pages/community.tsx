"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  MessageSquare, Users, Github, Twitter,
  Copy, Check, ExternalLink, ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

interface Channel {
  icon: FC<any>;
  title: string;
  description: string;
  members: number;
  unit: string;
  link: string;
}

const Community: FC = () => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});
  const statsRef = useRef<HTMLDivElement>(null);

  const channels: Channel[] = React.useMemo(() => [
    { icon: MessageSquare, title: "Discord", description: "Join real-time conversations with developers deploying AI at the edge.", members: 5000, unit: "members", link: "https://discord.gg/DgBEMVCh" },
    { icon: Github, title: "GitHub", description: "Contribute to our open-source tools and shape the future of edge AI.", members: 1200, unit: "stars", link: "https://github.com/Olyxee" },
    { icon: Twitter, title: "X", description: "Stay updated with the latest features, tips, and community highlights.", members: 3000, unit: "followers", link: "https://x.com/Olyxee" },
    { icon: Users, title: "Forums", description: "Deep-dive discussions on optimization strategies and deployment patterns.", members: 2000, unit: "posts", link: "#forums" },
  ], []);

  const formatNumber = (num: number) => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!statsRef.current || hasAnimated.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            channels.forEach((channel) => {
              let current = 0;
              const target = channel.members;
              const increment = Math.ceil(target / 50);
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) { current = target; clearInterval(timer); }
                setAnimatedStats((prev) => ({ ...prev, [channel.title]: current }));
              }, 30);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [channels]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <section className="pt-28 sm:pt-36 pb-28 sm:pb-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[320px] sm:h-[400px] rounded-3xl overflow-hidden mb-14"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url("/images/Community presentation.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="relative z-10 h-full flex flex-col items-center justify-end pb-10 sm:pb-14 text-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-md text-white rounded-full text-xs font-medium mb-5 border border-white/20 uppercase tracking-widest"
              >
                11.2k+ Active Members
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]"
              >
                Join the <em>community</em>
              </motion.h1>
            </div>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            Connect with developers, researchers, and engineers building reliable AI systems.
          </motion.p>
        </div>
      </section>

      <section className="py-28 sm:py-36 border-t border-neutral-100" ref={statsRef}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-16">
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              Connect <em className="text-neutral-400">with us</em>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {channels.map((channel, idx) => (
              <motion.div key={channel.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="rounded-2xl border border-neutral-200 p-8 sm:p-10 hover:border-neutral-300 transition-all group">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-colors">
                    {React.createElement(channel.icon, { className: "w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" })}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleCopyLink(channel.link)} className="p-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-all" title="Copy link" aria-label={`Copy ${channel.title} link`}>
                      {copiedLink === channel.link ? <Check className="w-4 h-4 text-neutral-900" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                    </button>
                    <a href={channel.link} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-all" aria-label={`Visit ${channel.title}`}>
                      <ExternalLink className="w-4 h-4 text-neutral-400" />
                    </a>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3">{channel.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-6">{channel.description}</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-serif italic text-neutral-900">{animatedStats[channel.title] ? formatNumber(animatedStats[channel.title]) : 0}+</span>
                  <span className="text-sm text-neutral-400">{channel.unit}</span>
                </div>
                <a href={channel.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors tracking-wide">
                  Join Now <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight mb-6">
              Ready to
              <br />
              <em className="text-neutral-500">contribute?</em>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Share your deployment stories, report issues, or suggest new features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://discord.gg/DgBEMVCh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide">
                Join Discord
              </a>
              <a href="https://github.com/Olyxee" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3.5 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide">
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Community;
