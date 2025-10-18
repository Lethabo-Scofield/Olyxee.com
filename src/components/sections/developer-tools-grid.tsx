import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Tool {
  name: string;
  description: string;
  icon: string;
  href: string;
  freeBadge: boolean;
}

const tools: Tool[] = [
  {
    name: "IntelliJ IDEA",
    description: "IDE for Java and Kotlin",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/intellij-idea-12.svg?",
    href: "https://www.jetbrains.com/idea/",
    freeBadge: false,
  },
  {
    name: "PyCharm",
    description: "IDE for Python",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/pycharm-14.svg?",
    href: "https://www.jetbrains.com/pycharm/",
    freeBadge: false,
  },
  {
    name: "DataGrip",
    description: "Tool for multiple databases",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/datagrip-8.svg?",
    href: "https://www.jetbrains.com/datagrip/",
    freeBadge: true,
  },
  {
    name: "WebStorm",
    description: "IDE for JavaScript",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/webstorm-18.svg?",
    href: "https://www.jetbrains.com/webstorm/",
    freeBadge: true,
  },
  {
    name: "Rider",
    description: "IDE for .NET and game dev",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/rider-15.svg?",
    href: "https://www.jetbrains.com/rider/",
    freeBadge: true,
  },
  {
    name: "CLion",
    description: "IDE for C and C++ developers",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/clion-7.svg?",
    href: "https://www.jetbrains.com/clion/",
    freeBadge: true,
  },
];

const DeveloperToolsGrid = () => {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 text-center">
        <p className="text-xl font-medium mb-4 text-[#e91e8c]">
          For {"{developers}"}
        </p>
        <h2 className="text-5xl font-bold tracking-tighter text-white mb-10">
          Enjoy building software
        </h2>

        <div className="bg-[#2d1b3d] rounded-[32px] p-6 sm:p-12 lg:p-16">
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            A rich suite of tools that provide an exceptional developer
            experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {tools.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block bg-[#1a0f2e] p-6 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
              >
                {tool.freeBadge && (
                  <span className="absolute top-6 right-6 bg-[#4d3f69] text-white text-xs font-medium px-2 py-1 rounded-sm">
                    Free for non-commercial use
                  </span>
                )}
                <div className="mb-6">
                  <Image
                    src={tool.icon}
                    alt={`${tool.name} logo`}
                    width={60}
                    height={60}
                    unoptimized
                  />
                </div>
                <h5 className="text-xl font-semibold text-white mb-1">
                  {tool.name}
                </h5>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </a>
            ))}
          </div>

          <a
            href="https://www.jetbrains.com/ides/#choose-your-ide"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-12 text-muted-foreground hover:text-white transition-colors"
          >
            Explore JetBrains IDEs and code authoring tools
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DeveloperToolsGrid;