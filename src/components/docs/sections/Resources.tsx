import { FC } from "react";
import Link from "next/link";
import { BookOpen, MessageSquare, FileText, Video, GitBranch, ExternalLink } from "lucide-react";

const Resources: FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">Resources</h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Guides, references, and community links to help you get the most out of Olyxee.
        </p>
      </div>

      <div className="space-y-10 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Documentation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: BookOpen, title: "Guides", description: "Step-by-step deployment tutorials and walkthroughs." },
              { icon: FileText, title: "API Reference", description: "Complete SDK, CLI, and REST API documentation." },
              { icon: Video, title: "Video Tutorials", description: "Watch deployment and optimization walkthroughs." },
              { icon: GitBranch, title: "Release Notes", description: "Track updates, fixes, and new features." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
                  <Icon className="w-5 h-5 text-gray-600 mb-3" />
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Community</h2>
          <div className="space-y-3">
            {[
              { title: "Discord", description: "Join our Discord server for real-time support and discussions.", href: "#" },
              { title: "Community Forum", description: "Ask questions, share projects, and connect with other developers.", href: "/community" },
              { title: "GitHub", description: "Browse examples, report issues, and contribute to open-source tools.", href: "#" },
            ].map((item) => (
              <a key={item.title} href={item.href} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all group">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Research</h2>
          <p className="mb-4">Read our published research on AI reliability, verification, and edge deployment.</p>
          <Link href="/research" className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
            View all research papers <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Resources;
