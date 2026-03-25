"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import Header from "../components/header";
import {
  MessageSquare,
  Users,
  Github,
  Twitter,
  Calendar,
  TrendingUp,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  GitFork,
  Zap,
  Star,
} from "lucide-react";

interface Channel {
  icon: FC<any>;
  title: string;
  description: string;
  members: number;
  unit: string;
  link: string;
  gradient: string;
}

interface Event {
  date: string;
  title: string;
  description: string;
  attendees: number;
  image: string;
}

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

interface Activity {
  user: string;
  action: string;
  time: string;
}

const Community: FC = () => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  const channels: Channel[] = [
    { icon: MessageSquare, title: "Discord", description: "Join real-time conversations with developers deploying AI at the edge.", members: 5000, unit: "members", link: "https://discord.gg/DgBEMVCh", gradient: "from-indigo-500/10 to-purple-500/10" },
    { icon: Github, title: "GitHub", description: "Contribute to our open-source tools and shape the future of edge AI.", members: 1200, unit: "stars", link: "https://github.com/Olyxee", gradient: "from-gray-500/10 to-slate-500/10" },
    { icon: Twitter, title: "X", description: "Stay updated with the latest features, tips, and community highlights.", members: 3000, unit: "followers", link: "https://x.com/Olyxee", gradient: "from-blue-500/10 to-cyan-500/10" },
    { icon: Users, title: "Forums", description: "Deep-dive discussions on optimization strategies and deployment patterns.", members: 2000, unit: "posts", link: "#forums", gradient: "from-emerald-500/10 to-teal-500/10" },
  ];

  const events: Event[] = [
    { date: "Nov 15", title: "Community Meetup", description: "Monthly virtual meetup for all members", attendees: 150, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
    { date: "Nov 22", title: "Deploy-a-thon", description: "24-hour deployment challenge with prizes", attendees: 200, image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" },
    { date: "Dec 1", title: "Workshop: Edge AI", description: "Deep dive into edge optimization techniques", attendees: 80, image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop" },
  ];

  const testimonials: Testimonial[] = [
    { text: "The Discord community helped me deploy my first model in under 30 minutes. The support is incredible.", author: "Sarah Chen", role: "ML Engineer at TechCorp" },
    { text: "Best AI deployment community out there. Active contributors and amazing documentation.", author: "Mike Rodriguez", role: "DevOps Lead at StartupXYZ" },
    { text: "Monthly meetups are invaluable. I've learned so much from real-world deployment stories.", author: "Alex Kim", role: "Data Scientist at AI Labs" },
  ];

  const recentActivity: Activity[] = [
    { user: "dev_alex", action: "deployed a new model to Jetson", time: "2m ago" },
    { user: "sarah_ml", action: "shared optimization tips", time: "15m ago" },
    { user: "john_doe", action: "contributed to GitHub repo", time: "1h ago" },
    { user: "emily_ai", action: "joined Discord server", time: "2h ago" },
  ];

  const formatNumber = (num: number) => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            channels.forEach((channel) => {
              if (animatedStats[channel.title]) return; // prevent re-running
              let current = 0;
              const target = channel.members;
              const increment = Math.ceil(target / 50);
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
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
  }, [channels, animatedStats]);

  return (
    <div className="pt-24 min-h-screen bg-white text-gray-900">
      <Header />

      <section className="relative w-full max-w-6xl mx-auto h-[400px] overflow-hidden rounded-3xl px-6">
        <div
          className="absolute inset-0 rounded-3xl"
          style={{ backgroundImage: 'url("/images/Community presentation.png")', backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium mb-4 border border-white/30">
            <Sparkles className="w-4 h-4" />
            <span>11.2k+ Active Members</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Join the Community</h1>
        </div>
      </section>

      <section className="py-32 px-6 bg-white" ref={statsRef}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-semibold text-gray-900 mb-4 tracking-tight">Connect With Us</h2>
            <p className="text-xl text-gray-600">Choose your preferred platform</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {channels.map((channel) => (
              <div key={channel.title} className={`relative bg-gradient-to-br ${channel.gradient} rounded-3xl p-10 overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}>
                <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl z-0 rounded-3xl" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
                      {React.createElement(channel.icon, { className: "w-7 h-7 text-gray-900" })}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleCopyLink(channel.link)}
                        className="p-3 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all shadow-sm"
                        title="Copy link"
                        aria-label={`Copy ${channel.title} link`}
                      >
                        {copiedLink === channel.link ? <Check className="w-4 h-4 text-gray-900" /> : <Copy className="w-4 h-4 text-gray-600" />}
                      </button>
                      <a
                        href={channel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all shadow-sm"
                        aria-label={`Visit ${channel.title}`}
                      >
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-3xl font-semibold mb-4 text-gray-900">{channel.title}</h3>
                  <p className="text-gray-700 mb-8 leading-relaxed">{channel.description}</p>

                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-5xl font-bold text-gray-900">{animatedStats[channel.title] ? formatNumber(animatedStats[channel.title]) : 0}+</span>
                    <span className="text-lg text-gray-600">{channel.unit}</span>
                  </div>

                  <a href={channel.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-900 font-semibold group-hover:gap-3 transition-all">
                    <span>Join Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-20">
            <div>
              <h2 className="text-5xl font-semibold text-gray-900 mb-3 tracking-tight">Upcoming Events</h2>
              <p className="text-xl text-gray-600">Join us for workshops, meetups, and challenges</p>
            </div>
            <Calendar className="w-12 h-12 text-gray-300" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="group relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                </div>
                <div className="relative p-8 h-80 flex flex-col justify-end">
                  <div className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-semibold rounded-full mb-4 self-start">{event.date}</div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-200 text-sm mb-4">{event.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-6">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                  <button className="w-full py-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 rounded-2xl font-semibold transition-all">Register Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight">Ready to contribute?</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Share your deployment stories, report issues, or suggest new features.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://discord.gg/DgBEMVCh" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-white text-gray-900 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">Join Discord</a>
            <a href="https://github.com/Olyxee" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300">View on GitHub</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
