"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Search,
  User,
  ShoppingCart,
  Globe,
  Menu,
  ArrowRight,
  Users,
  Rocket,
  Code2,
  Shield,
  Target,
  Download,
  MessageSquare,
  Briefcase,
  BookOpen,
  Building,
  Facebook,
  Instagram,
  Linkedin,
  Rss,
  Twitter,
  Youtube,
} from "lucide-react";
import { FaJava, FaAndroid, FaPython, FaHtml5 } from "react-icons/fa";
import { SiDotnet, SiKotlin, SiJavascript, SiTypescript, SiPhp, SiGo } from "react-icons/si";

type ActiveAudienceTab = "developers" | "teams" | "businesses";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveAudienceTab>("developers");
  const [cookieBannerVisible, setCookieBannerVisible] = useState(true);

  return (
    <div className="min-h-screen bg-black">
      {/* Header Navigation */}
      <HeaderNavigation />

      <main>
        {/* Hero Section */}
        <HeroJunie />

        {/* Audience Tabs */}
        <AudienceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Developers Content */}
        {activeTab === "developers" && (
          <>
            <DeveloperToolsGrid />
            <FeaturesCarousel />
            <KotlinEcosystemBanner />
          </>
        )}

        {/* Teams Content */}
        {activeTab === "teams" && (
          <>
            <TeamToolsSection />
            <CustomerTestimonials />
            <TeamCityPipelinesBanner />
          </>
        )}

        {/* Businesses Content */}
        {activeTab === "businesses" && (
          <>
            <BusinessIdeServicesBanner />
            <BusinessBenefitsGrid />
            <div className="bg-black py-16 sm:py-24">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <ComplianceSecurityBanner />
              </div>
            </div>
          </>
        )}

        {/* Common Sections */}
        <LanguageSupportCarousel />
        <TrustedOrganizationsSection />
        <DiscoverMoreCards />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cookie Banner */}
      {cookieBannerVisible && <CookieBanner onDismiss={() => setCookieBannerVisible(false)} />}
    </div>
  );
}

// Header Navigation Component
function HeaderNavigation() {
  const JetBrainsLogo = () => (
    <Link href="/" aria-label="Navigate to main page">
      <svg className="h-8 w-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 46V18h7.525v22.667h13.623V46H14zM50 46V18h-7.525v22.667h-13.62V46H50z" fill="white" />
        <path d="m55.333 18 6.167 6.167-22.5 22.5-6.167-6.167L48.5 24.833l-6.167-6.166H57l-1.667-0.667z" fill="#FF006E" />
        <path d="m8.667 46-6.167-6.167L25 17.333l6.167 6.167-15.834 15.833 6.167 6.167H7l1.667-0.5z" fill="#05F" />
      </svg>
    </Link>
  );

  const menuItems = [
    { name: "AI", href: "#" },
    { name: "Developer Tools", href: "#" },
    { name: "Team Tools", href: "#" },
    { name: "Education", href: "#" },
    { name: "Solutions", href: "#" },
    { name: "Support", href: "#" },
    { name: "Store", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-[1000] h-16 w-full bg-black font-sans text-white">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-8">
        <div className="flex h-full items-center gap-10">
          <JetBrainsLogo />
          <nav className="hidden h-full lg:flex">
            <ul className="flex h-full items-center gap-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm font-normal transition-opacity hover:opacity-80">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <button className="transition-opacity hover:opacity-80">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>
          <div className="hidden items-center gap-6 lg:flex">
            <button className="transition-opacity hover:opacity-80">
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </button>
            <button className="transition-opacity hover:opacity-80">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping cart</span>
            </button>
            <button className="transition-opacity hover:opacity-80">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Language selector</span>
            </button>
          </div>
          <button className="transition-opacity hover:opacity-80 lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// Cookie Banner Component
function CookieBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[999] p-4 sm:p-6" role="dialog" aria-modal="true">
      <div className="mx-auto w-full max-w-[600px] rounded-lg border border-white/10 bg-black/95 p-6 shadow-2xl backdrop-blur-md">
        <h2 className="text-lg font-semibold text-white">Cookie Settings</h2>
        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
          <p>
            Our website uses some cookies and records your IP address for the purposes of accessibility, security, and managing your access to the telecommunication network.{" "}
            <a href="https://www.jetbrains.com/legal/docs/privacy/cookie-notice/" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
              Learn more
            </a>
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={onDismiss} className="h-auto flex-1 rounded-full px-8 py-3 text-base font-semibold sm:flex-none">
            Accept All
          </Button>
          <Button onClick={onDismiss} variant="outline" className="h-auto flex-1 rounded-full border-white/30 bg-transparent px-8 py-3 text-base font-semibold text-white hover:bg-white/10 hover:text-white sm:flex-none">
            Manage Settings
          </Button>
        </div>
      </div>
    </div>
  );
}

// Hero Junie Component
function HeroJunie() {
  const DotPattern = () => {
    const dots = useMemo(() => {
      const rows = 12;
      const cols = 24;
      const dotArray = [];
      const dotColors = ["#00ff00", "#00cc00", "#00aa00"];
      for (let i = 0; i < rows * cols; i++) {
        if (Math.random() > 0.7) {
          dotArray.push({
            color: dotColors[Math.floor(Math.random() * dotColors.length)],
            opacity: Math.random() * 0.4 + 0.2,
          });
        } else {
          dotArray.push(null);
        }
      }
      return dotArray;
    }, []);

    return (
      <div aria-hidden="true" className="hidden lg:block absolute top-[60px] right-0 w-[400px] h-[200px] pointer-events-none -translate-y-1/4 translate-x-1/4" style={{ transform: "skewX(-20deg)" }}>
        <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-2">
          {dots.map((dot, i) => (dot ? <div key={i} className="w-1 h-1 rounded-sm" style={{ backgroundColor: dot.color, opacity: dot.opacity }} /> : <div key={i} />))}
        </div>
      </div>
    );
  };

  return (
    <section className="relative bg-black text-white overflow-hidden">
      <DotPattern />
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-3 mb-8">
              <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/junie-25.svg?" alt="Junie icon" width={36} height={36} className="h-9 w-auto" />
              <span className="text-4xl font-medium text-white">Junie</span>
            </div>
            <h1 className="text-[56px] font-bold leading-[1.1] tracking-tighter text-white mb-6">Your smart coding agent</h1>
            <p className="max-w-xl text-lg text-[#999999] mb-10">Make coding productive and enjoyable with an AI agent: explain your task, let Junie collect the context, write code and run tests for you.</p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a href="https://plugins.jetbrains.com/plugin/26104-jetbrains-junie" className="inline-flex items-center justify-center px-7 py-3 text-base font-semibold text-black bg-primary rounded-full transition-colors hover:brightness-110">
                Try now for free
              </a>
              <a href="https://www.jetbrains.com/junie/#pricing" className="inline-flex items-center justify-center px-7 py-3 text-base font-semibold text-white bg-transparent border border-white/30 rounded-full transition-colors hover:bg-white/10">
                See plans and pricing
              </a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/junie-possibilities-1.gif?" alt="Junie coding agent demo" width={700} height={500} unoptimized className="rounded-xl mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Audience Tabs Component
function AudienceTabs({ activeTab, setActiveTab }: { activeTab: ActiveAudienceTab; setActiveTab: (tab: ActiveAudienceTab) => void }) {
  const tabs = [
    { id: "developers" as const, label: "For developers" },
    { id: "teams" as const, label: "For teams" },
    { id: "businesses" as const, label: "For businesses" },
  ];

  return (
    <div className="bg-background py-10">
      <div className="flex justify-center gap-10" role="tablist">
        {tabs.map((tab) => (
          <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} className={cn("relative border-none bg-transparent pb-3 text-xl font-semibold transition-colors duration-300", activeTab === tab.id ? "text-text-primary" : "text-muted hover:text-muted-foreground")}>
            {tab.label}
            {activeTab === tab.id && <motion.div className="absolute bottom-0 left-0 right-0 h-[3px] bg-text-magenta" layoutId="audience-tab-underline" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

// Developer Tools Grid Component
function DeveloperToolsGrid() {
  const tools = [
    { name: "IntelliJ IDEA", description: "IDE for Java and Kotlin", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/intellij-idea-12.svg?", href: "https://www.jetbrains.com/idea/", freeBadge: false },
    { name: "PyCharm", description: "IDE for Python", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/pycharm-14.svg?", href: "https://www.jetbrains.com/pycharm/", freeBadge: false },
    { name: "DataGrip", description: "Tool for multiple databases", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/datagrip-8.svg?", href: "https://www.jetbrains.com/datagrip/", freeBadge: true },
    { name: "WebStorm", description: "IDE for JavaScript", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/webstorm-18.svg?", href: "https://www.jetbrains.com/webstorm/", freeBadge: true },
    { name: "Rider", description: "IDE for .NET and game dev", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/rider-15.svg?", href: "https://www.jetbrains.com/rider/", freeBadge: true },
    { name: "CLion", description: "IDE for C and C++ developers", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/clion-7.svg?", href: "https://www.jetbrains.com/clion/", freeBadge: true },
  ];

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 text-center">
        <p className="text-xl font-medium mb-4 text-[#e91e8c]">For {"{developers}"}</p>
        <h2 className="text-5xl font-bold tracking-tighter text-white mb-10">Enjoy building software</h2>
        <div className="bg-[#2d1b3d] rounded-[32px] p-6 sm:p-12 lg:p-16">
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">A rich suite of tools that provide an exceptional developer experience</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {tools.map((tool) => (
              <a key={tool.name} href={tool.href} target="_blank" rel="noopener noreferrer" className="group relative block bg-[#1a0f2e] p-6 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
                {tool.freeBadge && <span className="absolute top-6 right-6 bg-[#4d3f69] text-white text-xs font-medium px-2 py-1 rounded-sm">Free for non-commercial use</span>}
                <div className="mb-6">
                  <Image src={tool.icon} alt={`${tool.name} logo`} width={60} height={60} unoptimized />
                </div>
                <h5 className="text-xl font-semibold text-white mb-1">{tool.name}</h5>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </a>
            ))}
          </div>
          <a href="https://www.jetbrains.com/ides/#choose-your-ide" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-12 text-muted-foreground hover:text-white transition-colors">
            Explore JetBrains IDEs and code authoring tools
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Features Carousel Component
function FeaturesCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const featuresData = [
    { title: "Ready for actual use right out of the box", description: "Mission-critical tools and a wide variety of supported languages and frameworks are at your fingertips – no plugin hassle included.", imageIsGif: false, imageSrc: null, imagePlaceholderText: "PyCharm Screenshot", logoSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/pycharm-1.svg?", productName: "PyCharm", productLink: "https://www.jetbrains.com/pycharm/" },
    { title: "Complex tasks become easy", description: "The IDE knows everything about your code and uses this knowledge to offer blazing-fast navigation and relevant suggestions in every context.", imageIsGif: false, imageSrc: null, imagePlaceholderText: "WebStorm Screenshot", logoSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/webstorm-2.svg?", productName: "WebStorm", productLink: "https://www.jetbrains.com/webstorm/" },
    { title: "Built-in tools", description: "Run, debug, and test your applications without leaving the IDE and the code view. All important tools are within a hand's reach.", imageIsGif: false, imageSrc: null, imagePlaceholderText: "IntelliJ IDEA Screenshot", logoSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/idea-3.svg?", productName: "IntelliJ IDEA", productLink: "https://www.jetbrains.com/idea/" },
    { title: "Customizable and extendable", description: "Your IDE is ready to be configured to match your taste and preferences and help you stay in the zone during all your coding sessions.", imageIsGif: true, imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/rider-2.gif?", imagePlaceholderText: null, logoSrc: null, productName: "Rider", productLink: "https://www.jetbrains.com/rider/" },
  ];

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => {
      if (api) setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    return () => {
      if (api) api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="bg-black text-white py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <h3 className="text-center text-4xl lg:text-5xl font-bold tracking-tighter max-w-4xl mx-auto">
          Trusted by more than <span className="text-[#ff00ff]">15M</span> developers
        </h3>
        <div className="mt-20 lg:mt-24 relative">
          <Carousel setApi={setApi} opts={{ align: "start", loop: true }} orientation="vertical" className="w-full">
            <CarouselContent className="h-[520px] lg:h-[420px] -mt-1">
              {featuresData.map((feature, index) => (
                <CarouselItem key={index} className="pt-1 md:basis-full flex items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
                    <div className="flex flex-col justify-center text-center lg:text-left">
                      <h4 className="text-[32px] font-bold text-white leading-tight">{feature.title}</h4>
                      <p className="mt-6 text-base text-[#999999] leading-relaxed max-w-md mx-auto lg:mx-0">{feature.description}</p>
                    </div>
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="w-full max-w-[600px] bg-[#0d0d0d] border border-white/10 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                        {feature.imageSrc ? <Image src={feature.imageSrc} alt={feature.title} width={600} height={375} className="rounded-lg object-contain" unoptimized={feature.imageIsGif} /> : <div className="aspect-[16/10] flex items-center justify-center rounded-lg"><span className="text-muted-foreground">{feature.imagePlaceholderText}</span></div>}
                      </div>
                      <a href={feature.productLink} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-2.5 text-white hover:text-gray-300 transition-colors">
                        {feature.logoSrc && <Image src={feature.logoSrc} alt={`${feature.productName} logo`} width={24} height={24} />}
                        <span className="text-sm font-medium">{feature.productName}</span>
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute flex gap-3 justify-center w-full left-1/2 -translate-x-1/2 bottom-[-60px]">
              {Array.from({ length: count }).map((_, index) => (
                <button key={index} onClick={() => api?.scrollTo(index)} className={cn("w-2.5 h-2.5 rounded-full transition-colors", current === index ? "bg-white" : "bg-gray-600 hover:bg-gray-400")} aria-label={`Go to slide ${index + 1}`} />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

// Kotlin Ecosystem Banner Component
function KotlinEcosystemBanner() {
  const KotlinKLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M64 0H0V64H64L32 32L64 0Z" fill="#7F52FF" />
    </svg>
  );

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="relative bg-black rounded-[24px] overflow-hidden">
          <div className="absolute inset-0">
            <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/kotlin-section-bg-3.png?" alt="Abstract background" fill className="object-cover object-right" quality={100} unoptimized />
          </div>
          <div className="relative z-10 flex items-center min-h-[500px]">
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-[60px]">
              <KotlinKLogo className="h-16 w-16 mb-6" />
              <h2 className="text-[40px] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-4">The JetBrains Kotlin Ecosystem</h2>
              <p className="text-lg text-white mb-8 max-w-md">A powerful set of tools, libraries, and integrations built around the Kotlin programming language to help you develop modern applications efficiently.</p>
              <Link href="https://www.jetbrains.com/kotlin-ecosystem/" className="inline-block bg-white text-black font-medium py-3 px-8 rounded-[24px] text-base transition-colors hover:bg-neutral-200">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Team Tools Section Component
function TeamToolsSection() {
  const teamTools = [
    { name: "TeamCity", description: "Powerful Continuous Integration out of the box", href: "https://www.jetbrains.com/teamcity/", initials: "TC", gradient: "bg-gradient-to-br from-[#4A39E4] to-[#A736D9]" },
    { name: "YouTrack", description: "Project management for all your teams", href: "https://www.jetbrains.com/youtrack/", initials: "YT", gradient: "bg-gradient-to-br from-[#E63984] to-[#7540E1]" },
    { name: "Qodana", description: "Code quality platform powered by advanced static analysis", href: "https://www.jetbrains.com/qodana/", initials: "QD", gradient: "bg-gradient-to-br from-[#FCCA3E] to-[#F17500]" },
    { name: "Datalore", description: "Self-hosted data science platform for teams", href: "https://www.jetbrains.com/datalore/", initials: "DL", gradient: "bg-gradient-to-br from-[#45C645] to-[#009299]" },
  ];

  const ProductIcon = ({ initials, gradient }: { initials: string; gradient: string }) => (
    <div className={`w-20 h-20 p-px rounded-xl ${gradient} flex-shrink-0`}>
      <div className="bg-black w-full h-full rounded-[11px] flex items-center justify-center">
        <span className="text-white text-3xl font-bold tracking-tighter">{initials}</span>
      </div>
    </div>
  );

  return (
    <section className="bg-black text-white py-[100px]">
      <div className="max-w-[1248px] mx-auto px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-lg font-medium text-[#00d4aa]">For</span>
            <Users className="w-7 h-7 text-[#00d4aa]" />
            <span className="text-lg font-medium text-[#00d4aa]">teams</span>
          </div>
          <h2 className="text-5xl font-bold tracking-tighter leading-tight max-w-4xl mx-auto">Minimize friction and&nbsp;increase productivity</h2>
          <h3 className="mt-8 text-[28px] text-white/90 leading-snug max-w-[690px] mx-auto">Ensure efficient collaboration and maintain quality codebases with a fast software delivery flow</h3>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamTools.map((tool) => (
            <a key={tool.name} href={tool.href} className="bg-[#0a2f2f] p-8 rounded-[16px] flex flex-col text-left hover:bg-[#104242] transition-colors duration-200">
              <ProductIcon initials={tool.initials} gradient={tool.gradient} />
              <h4 className="mt-6 text-2xl font-bold text-white mb-2">{tool.name}</h4>
              <p className="text-base text-[#cccccc] flex-grow">{tool.description}</p>
            </a>
          ))}
        </div>
        <div className="mt-12">
          <a href="https://www.jetbrains.com/products/#type=team" className="inline-flex items-center gap-2 text-lg text-white font-medium hover:text-[#00d4aa] transition-colors">
            and more
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

// Customer Testimonials Component
function CustomerTestimonials() {
  const testimonials = [
    { logoSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/logo_gradle_white-4.svg?", logoAlt: "Gradle Inc. logo", quote: "Gradle Inc. is the company behind the Gradle Build Tool, one of the most popular open-source build automation tools used by millions of developers. For the past ten years, the Gradle Build Tool team has been relying on TeamCity for its CI/CD process, which allows it to run tens of thousands of green builds daily and maintain a high build success rate.", caseStudyUrl: "https://www.jetbrains.com/company/customers/experience/gradle/", linkText: "Read the full case study" },
    { logoSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/logo_zynex_white-5.svg?", logoAlt: "Zynex Medical logo", quote: "Qodana helps all our developers write the best possible code regardless of their experience and it helps our senior developers maintain their expected code quality as well. Given the various types of inspections it offers, we're hoping that Qodana can act as a developer coach in addition to helping maintain the code quality standards in our products.", caseStudyUrl: "https://www.jetbrains.com/company/customers/experience/zynex/", linkText: "Read the Qodana case study" },
  ];

  return (
    <section className="bg-black py-20 lg:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16 px-4">
          <p className="text-sm font-medium text-text-secondary uppercase tracking-widest mb-4">Featured</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">Many of the world's most dynamic teams find that JetBrains tools make them more creative and effective</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <a key={index} href={testimonial.caseStudyUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col bg-[#111111] p-10 rounded-xl border border-[#333333] transition-all duration-300 hover:brightness-125">
              <Image src={testimonial.logoSrc} alt={testimonial.logoAlt} width={150} height={40} className="w-[150px] h-auto" />
              <p className="mt-8 text-base text-[#cccccc]" style={{ lineHeight: "1.6" }}>
                {testimonial.quote}
              </p>
              <div className="flex-grow" />
              <div className="mt-8 flex items-center gap-2 font-medium text-white transition-colors">
                {testimonial.linkText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// TeamCity Pipelines Banner Component
function TeamCityPipelinesBanner() {
  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <a href="https://www.jetbrains.com/teamcity/pipelines/" target="_blank" rel="noopener noreferrer" className="group block rounded-[20px] p-12 overflow-hidden" style={{ backgroundImage: "radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 50%), linear-gradient(135deg, rgb(13, 77, 77), rgb(10, 51, 51))" }}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-x-12 gap-y-8">
            <div className="flex-1 order-2 lg:order-1 text-center lg:text-left z-10">
              <h3 className="text-[32px] font-bold text-white leading-tight">TeamCity Pipelines</h3>
              <h4 className="mt-2 text-2xl font-semibold text-[#00ffff]">A new approach to CI/CD</h4>
              <p className="mt-4 text-base text-[#cccccc] leading-relaxed max-w-lg mx-auto lg:mx-0">Faster, self-optimizing pipelines with intelligent suggestions to make sure you're always operating at peak efficiency. Focus on building great things while we handle the rest.</p>
              <div className="mt-8">
                <span className="inline-block px-8 py-3 text-base font-semibold text-black bg-white rounded-full transition-transform duration-200 group-hover:scale-105">Learn more</span>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:w-[500px] lg:flex-shrink-0">
              <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/teamcity-pipe-4.png?" alt="TeamCity Pipelines logo" width={500} height={300} className="w-full h-auto object-contain transition-transform duration-300 ease-in-out group-hover:scale-105" />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

// Language Support Carousel Component
function LanguageSupportCarousel() {
  const MarqueeStyles = () => (
    <style>
      {`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          animation: marquee-scroll 120s linear infinite;
        }
      `}
    </style>
  );

  const languages = [
    { name: "VB.net", icon: <SiDotnet className="h-12 w-12 text-[#68217A]" /> },
    { name: "Java", icon: <FaJava className="h-12 w-12 text-white" /> },
    { name: "Kotlin", icon: <SiKotlin className="h-12 w-12 text-[#7F52FF]" /> },
    { name: "Android", icon: <FaAndroid className="h-12 w-12 text-[#3DDC84]" /> },
    { name: "JavaScript", icon: <SiJavascript className="h-12 w-12 text-[#F7DF1E]" /> },
    { name: "TypeScript", icon: <SiTypescript className="h-12 w-12 text-[#3178C6]" /> },
    { name: "PHP", icon: <SiPhp className="h-12 w-12 text-[#777BB4]" /> },
    { name: "C#", icon: <SiDotnet className="h-12 w-12 text-[#9B4F96]" /> },
    { name: "Python", icon: <FaPython className="h-12 w-12 text-[#3776AB]" /> },
    { name: "Go", icon: <SiGo className="h-12 w-12 text-[#00ADD8]" /> },
    { name: "HTML", icon: <FaHtml5 className="h-12 w-12 text-[#E34F26]" /> },
    { name: "Scala", icon: <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/icons/logo-scala-1.png?" alt="Scala logo" width={48} height={48} /> },
  ];

  return (
    <section className="bg-black py-20">
      <MarqueeStyles />
      <div className="max-w-[1400px] mx-auto px-6">
        <h3 className="text-[20px] font-semibold tracking-tight text-white text-center max-w-2xl mx-auto mb-20">Our products are technology agnostic and support a mix of languages and{"\u00A0"}other tools that your team and project may be using now or tomorrow.</h3>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee-scroll">
            {[...languages, ...languages].map((lang, index) => (
              <div key={index} className="flex flex-col items-center flex-shrink-0 w-auto" style={{ paddingRight: "60px" }}>
                {lang.icon}
                <span className="mt-4 text-sm text-[#999999] whitespace-nowrap">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Business IDE Services Banner Component
function BusinessIdeServicesBanner() {
  const JetBrainsSimpleLogo = () => (
    <div className="h-6 w-6 flex-shrink-0" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="white" />
        <path d="M12 6L6 12L12 18L18 12L12 6Z" fill="black" />
      </svg>
    </div>
  );

  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="flex items-center justify-center gap-x-2 text-lg font-semibold leading-7 text-[#FF00FF]">
            <span>For</span>
            <Building className="h-5 w-5 text-white" />
            <span>businesses</span>
          </h2>
          <p className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Empower your team and succeed as a business</p>
        </div>
        <div className="mt-16 sm:mt-20">
          <Link href="https://www.jetbrains.com/ide-services/" className="group block relative mx-auto max-w-[1200px] overflow-hidden rounded-[24px]" aria-label="Learn more about JetBrains IDE Services">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6b2d9e] via-[#d946a6] to-[#ff6b35]"></div>
            <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/ide-services-bg-6.svg?" alt="" layout="fill" objectFit="cover" className="absolute inset-0 z-0 opacity-30" aria-hidden="true" />
            <div className="relative z-10 p-14 text-white">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-3">
                  <JetBrainsSimpleLogo />
                  <span className="text-lg font-bold">JetBrains IDE Services</span>
                </div>
                <h3 className="mt-12 text-[36px] font-bold leading-tight tracking-[-0.01em]">Manage developer tools at scale</h3>
                <p className="mt-4 max-w-xl text-lg font-normal leading-relaxed">Provision IDEs centrally to machines across your entire organization. Securely govern AI-powered development.</p>
                <div className="mt-8">
                  <span className="inline-block rounded-full bg-white px-9 py-[14px] text-base font-semibold text-black transition-transform duration-200 group-hover:scale-105">Learn more</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Business Benefits Grid Component
function BusinessBenefitsGrid() {
  const benefitsData = [
    { icon: Rocket, title: "Boost developer experience", description: "Leverage AI on your terms, ensuring compliance. Amplify the satisfaction and productivity of your software teams." },
    { icon: Code2, title: "Stay competitive", description: "Nurture coding best practices and ensure cleaner, more maintainable code." },
    { icon: Shield, title: "Minimize risks", description: "Maintain business continuity with enterprise-grade support." },
    { icon: Target, title: "Control costs", description: "Foster business growth through flexible licensing and cost control. Maximize your existing technology investments." },
  ];

  return (
    <div className="bg-black text-white">
      <section className="mx-auto max-w-[1200px] py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl md:text-[44px] font-bold tracking-tight leading-tight mb-16">Solutions that scale with you as&nbsp;you&nbsp;grow</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefitsData.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="bg-[#2d1b4e] rounded-2xl p-9">
                <Icon className="h-10 w-10 text-white mb-8" aria-hidden="true" />
                <h4 className="text-2xl font-semibold text-white mb-4">{benefit.title}</h4>
                <p className="text-[15px] text-[#b3b3b3] leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// Compliance Security Banner Component
function ComplianceSecurityBanner() {
  return (
    <div className="mx-auto max-w-[1200px] rounded-xl bg-[#3d1f5c] p-8">
      <div className="flex flex-col items-start gap-8 md:flex-row">
        <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/aicpa-soc-logo-5.png?" alt="AICPA SOC certification badge" width={100} height={100} className="flex-shrink-0 grayscale shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
        <div className="text-left">
          <h4 className="text-2xl font-semibold text-text-primary">Proven compliance and security</h4>
          <p className="mt-2 text-base leading-relaxed text-[#d4d4d4]">
            JetBrains tools adhere to industry-leading security standards, including SOC 2 certification, ensuring your organization's data is protected and our products are compliant with global regulations. All necessary documents, including security reports, policies, and certifications, are available in our{" "}
            <a href="https://trust-center.jetbrains.com/" target="_blank" rel="noopener noreferrer" className="underline text-text-primary hover:no-underline">
              Trust Center
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

// Trusted Organizations Section Component
function TrustedOrganizationsSection() {
  const LOGOS = [
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/volkswagen-7.svg?", alt: "Volkswagen" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/citibank-8.svg?", alt: "Citibank" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/icons/bmw-2.png?", alt: "BMW" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/booking-com-9.svg?", alt: "Booking.com" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/visa-10.svg?", alt: "Visa" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/shopify-11.svg?", alt: "Shopify" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/google-12.svg?", alt: "Google" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/nasa-13.svg?", alt: "NASA" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/tesla-14.svg?", alt: "Tesla" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/x-15.svg?", alt: "X" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/thought-works-16.svg?", alt: "ThoughtWorks" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/valve-17.svg?", alt: "Valve" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/oculus-18.svg?", alt: "Oculus" },
  ];

  const logos = [...LOGOS, ...LOGOS];

  return (
    <section className="bg-gradient-to-r from-black to-[#4a153c] py-[100px] text-center overflow-hidden">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 80s linear infinite;
          }
        `}
      </style>
      <div className="mx-auto max-w-[1400px] px-12">
        <h3 className="text-[64px] font-bold leading-[1.1] tracking-[-1.28px] text-white">
          Trusted by more than <span className="text-text-magenta">300,000 organizations</span>
        </h3>
        <p className="mt-6 text-lg leading-[1.6] text-[#c4c4c4]">including 88 Fortune Global Top 100 companies that use JetBrains products to deliver top-quality software.</p>
      </div>
      <div className="relative mt-[100px] w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-marquee will-change-transform">
          {logos.map((logo, index) => (
            <div key={index} className="mx-10 flex-shrink-0 flex items-center justify-center">
              <Image src={logo.src} alt={logo.alt} width={120} height={48} className="object-contain opacity-80 brightness-0 invert" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Discover More Cards Component
function DiscoverMoreCards() {
  const cardData = [
    { icon: Download, title: "Choose your IDE", buttonText: "Explore our IDEs", href: "https://www.jetbrains.com/ides/" },
    { icon: MessageSquare, title: <>Contact<br />support</>, buttonText: "Get help", href: "https://www.jetbrains.com/support/" },
    { icon: Briefcase, title: <>Speak to<br />sales</>, buttonText: "Get in touch", href: "https://www.jetbrains.com/support/sales/" },
    { icon: BookOpen, title: "Annual Highlights", buttonText: "View report", href: "https://www.jetbrains.com/lp/annualreport-2024" },
  ];

  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-12">
        <h2 className="mb-12 text-5xl font-bold leading-none tracking-tight">Discover more</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href} className="flex h-full flex-col rounded-2xl border border-[#333333] bg-transparent p-10 transition-colors hover:border-white">
                <div>
                  <Icon className="h-8 w-8 text-white" aria-hidden="true" />
                  <h3 className="mt-8 text-[28px] font-semibold leading-tight text-white">{card.title}</h3>
                </div>
                <div className="mt-auto pt-10">
                  <span className="inline-block rounded-full border border-white px-7 py-3 text-base font-medium text-white">{card.buttonText}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  const footerData = {
    columns: [
      { title: "AI", links: [{ name: "JetBrains AI", href: "https://www.jetbrains.com/ai/" }, { name: "AI Assistant", href: "https://www.jetbrains.com/ai-assistant/" }, { name: "Junie", href: "https://www.jetbrains.com/junie/" }, { name: "AI in IDEs", href: "https://www.jetbrains.com/ai-in-ides/" }, { name: "AI Enterprise", href: "https://www.jetbrains.com/ai-enterprise/" }, { name: "AI News", href: "https://blog.jetbrains.com/ai/" }] },
      { title: "Developer Tools", links: [{ name: "All Products", href: "https://www.jetbrains.com/products/" }, { name: "IDEs", href: "https://www.jetbrains.com/ides/" }, { name: ".NET and Visual Studio", href: "https://www.jetbrains.com/dotnet/" }, { name: "Team Tools", href: "https://www.jetbrains.com/products/#type=team" }, { name: "Plugin Marketplace", href: "https://plugins.jetbrains.com/" }, { name: "Toolbox App", href: "https://www.jetbrains.com/toolbox-app/" }] },
      { title: "Solutions", links: [{ name: "Business", href: "https://www.jetbrains.com/business/" }, { name: "Data", href: "https://www.jetbrains.com/data/" }, { name: "IDE Services", href: "https://www.jetbrains.com/ide-services/" }, { name: "Remote Development", href: "https://www.jetbrains.com/remote-development/" }, { name: "Game Development", href: "https://www.jetbrains.com/gamedev/" }, { name: "DevOps", href: "https://www.jetbrains.com/devops/" }, { name: "C++ Tools", href: "https://www.jetbrains.com/cpp/" }] },
      { title: "Initiatives", links: [{ name: "Kotlin", href: "https://kotlinlang.org/" }, { name: "Open Source", href: "https://www.jetbrains.com/opensource/" }, { name: "JetBrains Research", href: "https://research.jetbrains.org/" }, { name: "JetBrains Mono", href: "https://www.jetbrains.com/lp/mono/" }, { name: "MPS", href: "https://www.jetbrains.com/mps/" }] },
      { title: "Education", links: [{ name: "Students", href: "https://www.jetbrains.com/education/students/" }, { name: "Teachers", href: "https://www.jetbrains.com/education/teachers/" }, { name: "Bootcamps", href: "https://www.jetbrains.com/education/bootcamps/" }, { name: "Teams", href: "https://www.jetbrains.com/education/teams/" }, { name: "Course Catalog", href: "https://www.jetbrains.com/education/catalog/" }, { name: "University Programs", href: "https://www.jetbrains.com/education/university/" }] },
      { title: "Store", links: [{ name: "Plans and Pricing", href: "https://www.jetbrains.com/store/" }, { name: "All Products Pack", href: "https://www.jetbrains.com/all/" }, { name: "dotUltimate", href: "https://www.jetbrains.com/dotultimate/" }, { name: "Partners and Resellers", href: "https://www.jetbrains.com/partners/" }, { name: "Customers and Awards", href: "https://www.jetbrains.com/customers/" }] },
      { title: "Support", links: [{ name: "Technical Support", href: "https://www.jetbrains.com/support/" }, { name: "Contact Sales", href: "https://www.jetbrains.com/support/sales/" }, { name: "Documentation", href: "https://www.jetbrains.com/help/" }, { name: "JetBrains Account", href: "https://account.jetbrains.com/" }] },
      { title: "Resources", links: [{ name: "Blog", href: "https://blog.jetbrains.com/" }, { name: "Early Access", href: "https://www.jetbrains.com/eap/" }, { name: "Events and Livestreams", href: "https://www.jetbrains.com/events/" }, { name: "Newsletters", href: "https://www.jetbrains.com/subscribe/" }, { name: "Industry Reports", href: "https://www.jetbrains.com/lp/devecosystem-2023/" }, { name: "JetBrains Guide", href: "https://www.jetbrains.com/guide/" }, { name: "Inspectopedia", href: "https://www.jetbrains.com/help/idea/code-inspection-index.html" }] },
      { title: "Community", links: [{ name: "User Groups", href: "https://www.jetbrains.com/community/user-groups/" }, { name: "Open-Source Partnerships", href: "https://www.jetbrains.com/community/opensource/" }, { name: "Developer Recognition", href: "https://www.jetbrains.com/community/dev-recognition/" }, { name: "Content Creators", href: "https://www.jetbrains.com/community/content-creators/" }] },
      { title: "Company", links: [{ name: "About", href: "https://www.jetbrains.com/company/" }, { name: "Contacts", href: "https://www.jetbrains.com/company/contacts/" }, { name: "Careers", href: "https://www.jetbrains.com/careers/" }, { name: "Press and News", href: "https://www.jetbrains.com/company/press/" }, { name: "Brand Assets", href: "https://www.jetbrains.com/company/brand/" }, { name: "Merchandise", href: "https://merch.jetbrains.com/" }, { name: "Trust Center", href: "https://trust-center.jetbrains.com/" }] },
    ],
    socials: [
      { name: "Twitter", href: "https://twitter.com/jetbrains", icon: Twitter },
      { name: "Facebook", href: "https://www.facebook.com/JetBrains", icon: Facebook },
      { name: "Youtube", href: "https://www.youtube.com/user/JetBrainsTV", icon: Youtube },
      { name: "Instagram", href: "https://www.instagram.com/jetbrains/", icon: Instagram },
      { name: "LinkedIn", href: "https://www.linkedin.com/company/jetbrains", icon: Linkedin },
      { name: "Blog", href: "https://blog.jetbrains.com/", icon: Rss },
    ],
    legal: [
      { name: "Terms of Use", href: "https://www.jetbrains.com/legal/docs/company/useterms/" },
      { name: "Privacy Policy", href: "https://www.jetbrains.com/legal/docs/privacy/privacy/" },
      { name: "Cookie settings", href: "#opt-out" },
    ],
  };

  return (
    <footer className="bg-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-[60px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
          {footerData.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-[#999999] uppercase mb-4 tracking-wider">{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-[#cccccc] leading-[2.2] hover:text-white transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col-reverse items-center gap-y-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 text-sm text-[#999999] sm:flex-row sm:gap-6">
            <p>&copy; 2000–2024 JetBrains s.r.o.</p>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerData.legal.map((link) => (
                <a href={link.href} key={link.name} className="hover:text-white transition-colors">
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-x-4">
            {footerData.socials.map((social) => (
              <a href={social.href} key={social.name} aria-label={social.name} className="text-[#999999] hover:text-white transition-colors">
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}