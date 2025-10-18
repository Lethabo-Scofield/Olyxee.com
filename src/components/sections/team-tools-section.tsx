import { Users, ArrowRight } from "lucide-react";

const teamTools = [
  {
    name: "TeamCity",
    description: "Powerful Continuous Integration out of the box",
    href: "https://www.jetbrains.com/teamcity/",
    initials: "TC",
    gradient: "bg-gradient-to-br from-[#4A39E4] to-[#A736D9]",
  },
  {
    name: "YouTrack",
    description: "Project management for all your teams",
    href: "https://www.jetbrains.com/youtrack/",
    initials: "YT",
    gradient: "bg-gradient-to-br from-[#E63984] to-[#7540E1]",
  },
  {
    name: "Qodana",
    description: "Code quality platform powered by advanced static analysis",
    href: "https://www.jetbrains.com/qodana/",
    initials: "QD",
    gradient: "bg-gradient-to-br from-[#FCCA3E] to-[#F17500]",
  },
  {
    name: "Datalore",
    description: "Self-hosted data science platform for teams",
    href: "https://www.jetbrains.com/datalore/",
    initials: "DL",
    gradient: "bg-gradient-to-br from-[#45C645] to-[#009299]",
  },
];

const ProductIcon = ({
  initials,
  gradient,
}: {
  initials: string;
  gradient: string;
}) => (
  <div className={`w-20 h-20 p-px rounded-xl ${gradient} flex-shrink-0`}>
    <div className="bg-black w-full h-full rounded-[11px] flex items-center justify-center">
      <span className="text-white text-3xl font-bold tracking-tighter">
        {initials}
      </span>
    </div>
  </div>
);

const TeamToolsSection = () => {
  return (
    <section className="bg-black text-white py-[100px]">
      <div className="max-w-[1248px] mx-auto px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-lg font-medium text-[#00d4aa]">For</span>
            <Users className="w-7 h-7 text-[#00d4aa]" />
            <span className="text-lg font-medium text-[#00d4aa]">teams</span>
          </div>
          <h2 className="text-5xl font-bold tracking-tighter leading-tight max-w-4xl mx-auto">
            Minimize friction and&nbsp;increase productivity
          </h2>
          <h3 className="mt-8 text-[28px] text-white/90 leading-snug max-w-[690px] mx-auto">
            Ensure efficient collaboration and maintain quality codebases with a
            fast software delivery flow
          </h3>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamTools.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              className="bg-[#0a2f2f] p-8 rounded-[16px] flex flex-col text-left hover:bg-[#104242] transition-colors duration-200"
            >
              <ProductIcon initials={tool.initials} gradient={tool.gradient} />
              <h4 className="mt-6 text-2xl font-bold text-white mb-2">
                {tool.name}
              </h4>
              <p className="text-base text-[#cccccc] flex-grow">
                {tool.description}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="https://www.jetbrains.com/products/#type=team"
            className="inline-flex items-center gap-2 text-lg text-white font-medium hover:text-[#00d4aa] transition-colors"
          >
            and more
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamToolsSection;