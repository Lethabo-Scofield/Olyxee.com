import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const Careers: FC = () => {
  const openings = [
    {
      title: "Senior Systems Engineer",
      team: "Platform",
      location: "Remote",
      type: "Full-time",
      description: "Build core infrastructure for AI deployment pipelines. Experience with distributed systems, containerization, and hardware interfaces.",
    },
    {
      title: "ML Verification Engineer",
      team: "Reliability",
      location: "Remote",
      type: "Full-time",
      description: "Develop automated testing frameworks for AI model verification across heterogeneous hardware. Strong background in ML and formal methods.",
    },
    {
      title: "Edge AI Researcher",
      team: "Research",
      location: "Remote",
      type: "Full-time",
      description: "Research model optimization techniques for resource-constrained devices. Publish papers and build prototypes that become products.",
    },
    {
      title: "Developer Experience Engineer",
      team: "Developer Tools",
      location: "Remote",
      type: "Full-time",
      description: "Build SDKs, CLIs, and documentation that make Olyxee accessible to every developer. Obsess over developer ergonomics.",
    },
    {
      title: "Product Designer",
      team: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Design interfaces for complex AI infrastructure tools. Make the hard things feel simple without hiding complexity.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Careers</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
            Build the infrastructure AI needs.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            We're a small team working on hard problems — AI reliability, distributed systems,
            edge deployment, and formal verification. If you want your work to matter, this is it.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Why Olyxee</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {[
              { title: "Hard problems", description: "Work on distributed systems, AI verification, and edge deployment at the intersection of research and production." },
              { title: "Small team, big impact", description: "Every person shapes the product. No bureaucracy, no meetings about meetings. Ship code that millions will rely on." },
              { title: "Remote-first", description: "Work from anywhere. We care about what you build, not where you sit. Async-first communication and flexible hours." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Open Positions</h2>
          <div className="space-y-4">
            {openings.map((job) => (
              <div
                key={job.title}
                className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-gray-700 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{job.team}</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </span>
                      <span className="text-xs text-gray-400">{job.type}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{job.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors flex-shrink-0 hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Don't see your role?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We're always looking for exceptional people. Send us a note about what you'd like to work on.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-black transition-all">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Careers;
