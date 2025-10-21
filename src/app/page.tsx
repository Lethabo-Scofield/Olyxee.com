"use client";

import { useState, useMemo, useEffect } from "react";
import './globals.css';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { type CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  User,
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
  X,
  Check,
  Play,
  ChevronRight,
  Zap,
} from "lucide-react";
import OlyxeeTrans from "public/Logo/Olyxee_trans.png";

type ActiveAudienceTab = "developers" | "teams" | "businesses";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveAudienceTab>("developers");
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setCookieBannerVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[1001] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-black focus:rounded-lg"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-black">
        <HeaderNavigation />

        <main id="main-content">
          <HeroGrysics />

          <AudienceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "developers" && (
                <>
                  <DeveloperToolsGrid />
                  <FeaturesCarousel />
                  <KotlinEcosystemBanner />
                </>
              )}

              {activeTab === "teams" && (
                <>
                  <TeamToolsSection />
                  <CustomerTestimonials />
                  <TeamCityPipelinesBanner />
                </>
              )}

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
            </motion.div>
          </AnimatePresence>

          <TrustedHardware />
          <DiscoverMoreCards />
        </main>

        <Footer />

        <AnimatePresence>
          {cookieBannerVisible && <CookieBanner onDismiss={() => setCookieBannerVisible(false)} />}
        </AnimatePresence>
      </div>
    </>
  );
}

// Header Navigation Component
function HeaderNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const OlyxeeLogo = () => (
    <Link href="/" aria-label="Navigate to Olyxee homepage" className="transition-opacity hover:opacity-80">
      <Image src={OlyxeeTrans} alt="Olyxee Logo" width={38} height={38} priority />
    </Link>
  );

  const menuItems = [
    { name: "Products", href: "/products" },
    { name: "Docs", href: "/docs" },
    { name: "Community", href: "/community" },
    { name: "Support", href: "/support" },
  ];

  return (
    <header className="sticky top-0 z-[1000] h-16 w-full bg-black/95 backdrop-blur-sm border-b border-white/10 font-sans text-white">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-10">
          <OlyxeeLogo />
          <nav className="hidden lg:flex h-full" aria-label="Main navigation">
            <ul className="flex h-full items-center gap-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm font-normal transition-colors hover:text-primary focus:outline-none focus:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6">
            <button
              className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
              aria-label="User account"
            >
              <User className="h-5 w-5" />
            </button>
            <button
              className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
              aria-label="Language selector"
            >
              <Globe className="h-5 w-5" />
            </button>
          </div>

          <button
            className="transition-opacity hover:opacity-80 lg:hidden focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1001]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#0a0a0a] z-[1002] lg:hidden border-l border-white/10"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Image src={OlyxeeTrans} alt="Olyxee Logo" width={32} height={32} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="p-6" aria-label="Mobile navigation">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between py-3 px-4 hover:bg-white/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-base font-medium">{item.name}</span>
                        <ChevronRight className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 transition-colors">
                    Sign In
                  </button>
                  <button className="flex-1 py-3 px-4 bg-primary text-black hover:brightness-110 font-semibold">
                    Get Started
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

// Hero Grysics Component
function HeroGrysics() {
  return (
    <section className="relative bg-black text-white overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/images/Grysics.png" alt="Grysics" width={80} height={80} className="h-16 sm:h-20 w-auto" priority />
            </div>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold leading-[1.05] tracking-tighter text-white mb-6"
            >
              Deploy Any AI Model, <span className="text-transparent bg-clip-text text-white">Anywhere</span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg lg:text-xl text-[#b3b3b3] mb-8 leading-relaxed">
              Grysics simulates, tests, and verifies your AI so it runs flawlessly on any hardware edge, lab, or cloud.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary text-black hover:brightness-110 font-semibold text-base px-8 min-w-[200px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Deploy your first Model
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 min-w-[200px]"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Demo (2 min)
              </Button>
            </div>

            <div className="flex items-center gap-3 text-sm text-[#999999]">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/50 to-purple-500/50 border-2 border-black flex items-center justify-center text-xs font-semibold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span>Join 10,000+ developers building the future</span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/junie-possibilities-1.gif?"
                alt="Grysics AI verification demo showing real-time model testing across multiple hardware platforms"
                width={700}
                height={500}
                unoptimized
                className="rounded-2xl mx-auto shadow-2xl shadow-primary/20 border border-white/10"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


function AudienceTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: ActiveAudienceTab;
  setActiveTab: (tab: ActiveAudienceTab) => void;
}) {
  const [hoveredTab, setHoveredTab] = useState<ActiveAudienceTab | null>(null);

  const tabs = [
    {
      id: "developers" as const,
      label: "For Engineers",
      icon: Code2,
      preview: "Build, test, and verify AI models on any hardware—edge, lab, or cloud.",
    },
    {
      id: "teams" as const,
      label: "For Teams",
      icon: Users,
      preview: "Collaborate on AI projects with shared pipelines, versioned models, and CI/CD automation.",
    },
    {
      id: "businesses" as const,
      label: "For Businesses",
      icon: Building,
      preview: "Deploy AI at scale with reliability, compliance, and cross-hardware support.",
    },
  ];

  return (
    <div className="bg-black py-12 border-b border-white/10">
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10 px-4" role="tablist" aria-label="Audience selection">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <div key={tab.id} className="relative">
              <button
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveTab(tab.id);
                  }
                }}
                className={cn(
                  "relative border-none bg-transparent pb-3 text-lg sm:text-xl font-semibold transition-all duration-300 flex items-center gap-2 px-2 focus:outline-none focus:ring-0",
                  activeTab === tab.id
                    ? "text-white"
                    : "text-[#666666] hover:text-[#999999]"
                )}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff2fc2]"
                    layoutId="audience-tab-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {hoveredTab === tab.id && activeTab !== tab.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 w-64 p-3 bg-[#1a1a1a] border border-white/20 shadow-xl"
                  >
                    <p className="text-sm text-[#cccccc]">{tab.preview}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Developer Tools Grid Component
function DeveloperToolsGrid() {
  const [isLoading] = useState(false);

  const tools = [
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

  return (
    <section className="bg-black py-16 md:py-24" id="developers-panel" role="tabpanel">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 text-center">
        <p className="text-xl font-medium mb-4 text-primary">For {"{developers}"}</p>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white mb-10">
          Enjoy building software
        </h2>
        <div className="bg-gradient-to-br from-[#2d1b3d] to-[#1a0f2e] rounded-[32px] p-6 sm:p-12 lg:p-16 border border-white/10">
          <p className="text-xl text-[#cccccc] max-w-3xl mx-auto mb-12">
            A rich suite of tools that provide an exceptional developer experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-[#1a0f2e] p-6 rounded-xl">
                  <div className="w-16 h-16 bg-white/10 rounded-lg mb-6" />
                  <div className="h-6 bg-white/10 rounded mb-2 w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-full" />
                </div>
              ))
              : tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block bg-[#1a0f2e] p-6 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {tool.freeBadge && (
                    <span className="absolute top-6 right-6 bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-md border border-primary/30">
                      Free
                    </span>
                  )}
                  <div className="mb-6 relative">
                    <Image
                      src={tool.icon}
                      alt={`${tool.name} logo`}
                      width={60}
                      height={60}
                      className="transition-transform group-hover:scale-110"
                    />
                  </div>
                  <h5 className="text-xl font-semibold text-white mb-1">{tool.name}</h5>
                  <p className="text-sm text-[#999999]">{tool.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              ))}
          </div>
          <a
            href="https://www.jetbrains.com/ides/#choose-your-ide"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-12 text-[#999999] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-3 py-2"
          >
            Explore all IDEs and code authoring tools
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
  const [isPaused, setIsPaused] = useState(false);

  const featuresData = [
    {
      title: "Ready for actual use right out of the box",
      description:
        "Mission-critical tools and a wide variety of supported languages and frameworks are at your fingertips – no plugin hassle included.",
      imageIsGif: false,
      imageSrc: null,
      imagePlaceholderText: "PyCharm Screenshot",
      logoSrc:
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/pycharm-1.svg?",
      productName: "PyCharm",
      productLink: "https://www.jetbrains.com/pycharm/",
    },
    {
      title: "Complex tasks become easy",
      description:
        "The IDE knows everything about your code and uses this knowledge to offer blazing-fast navigation and relevant suggestions in every context.",
      imageIsGif: false,
      imageSrc: null,
      imagePlaceholderText: "WebStorm Screenshot",
      logoSrc:
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/webstorm-2.svg?",
      productName: "WebStorm",
      productLink: "https://www.jetbrains.com/webstorm/",
    },
    {
      title: "Built-in tools",
      description:
        "Run, debug, and test your applications without leaving the IDE and the code view. All important tools are within a hand's reach.",
      imageIsGif: false,
      imageSrc: null,
      imagePlaceholderText: "IntelliJ IDEA Screenshot",
      logoSrc:
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/idea-3.svg?",
      productName: "IntelliJ IDEA",
      productLink: "https://www.jetbrains.com/idea/",
    },
    {
      title: "Customizable and extendable",
      description:
        "Your IDE is ready to be configured to match your taste and preferences and help you stay in the zone during all your coding sessions.",
      imageIsGif: true,
      imageSrc:
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/rider-2.gif?",
      imagePlaceholderText: null,
      logoSrc: null,
      productName: "Rider",
      productLink: "https://www.jetbrains.com/rider/",
    },
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
    if (!api || isPaused) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [api, isPaused]);

  return (
    <section
      className="bg-black text-white py-24 sm:py-32 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <h3 className="text-center text-4xl lg:text-5xl font-bold tracking-tighter max-w-4xl mx-auto">
          Trusted by more than <span className="text-primary">15M</span> developers
        </h3>

        <div className="mt-20 lg:mt-24 relative">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden z-10">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? `${(current / count) * 100}%` : "100%" }}
              transition={{ duration: isPaused ? 0 : 7, ease: "linear" }}
              key={current}
            />
          </div>

          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            orientation="vertical"
            className="w-full mt-4"
          >
            <CarouselContent className="h-[600px] lg:h-[500px] -mt-1">
              {featuresData.map((feature, index) => (
                <CarouselItem key={index} className="pt-1 md:basis-full flex items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
                    <div className="flex flex-col justify-center text-center lg:text-left">
                      <h4 className="text-[32px] font-bold text-white leading-tight">
                        {feature.title}
                      </h4>
                      <p className="mt-6 text-base text-[#b3b3b3] leading-relaxed max-w-md mx-auto lg:mx-0">
                        {feature.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="w-full max-w-[600px] bg-[#0d0d0d] border border-white/10 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
                        {feature.imageSrc ? (
                          <Image
                            src={feature.imageSrc}
                            alt={feature.title}
                            width={600}
                            height={375}
                            className="rounded-lg object-contain w-full"
                            unoptimized={feature.imageIsGif}
                          />
                        ) : (
                          <div className="aspect-[16/10] flex items-center justify-center rounded-lg">
                            <span className="text-[#666666]">{feature.imagePlaceholderText}</span>
                          </div>
                        )}
                      </div>
                      <a
                        href={feature.productLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center gap-2.5 text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                      >
                        {feature.logoSrc && (
                          <Image
                            src={feature.logoSrc}
                            alt={`${feature.productName} logo`}
                            width={24}
                            height={24}
                          />
                        )}
                        <span className="text-sm font-medium">{feature.productName}</span>
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Thumbnail Navigation */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featuresData.map((feature, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-primary",
                  current === index
                    ? "border-primary bg-primary/10"
                    : "border-white/20 hover:border-white/40 hover:bg-white/5"
                )}
              >
                <h5 className="font-semibold text-sm mb-1 line-clamp-1">{feature.title}</h5>
                <p className="text-xs text-[#999999] line-clamp-2">{feature.description}</p>
              </button>
            ))}
          </div>

          {/* Dot navigation */}
          <div className="flex gap-3 justify-center w-full mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary",
                  current === index ? "bg-white" : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    current === index ? "bg-black" : "bg-transparent"
                  )}
                />
              </button>
            ))}
          </div>

          <p className="text-xs text-[#666666] text-center mt-4">
            Use ← → arrow keys to navigate • Hover to pause
          </p>
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
        <div className="relative bg-black rounded-[24px] overflow-hidden border border-white/10 hover:border-white/20 transition-colors group">
          <div className="absolute inset-0">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/kotlin-section-bg-3.png?"
              alt=""
              fill
              className="object-cover object-right opacity-50 group-hover:opacity-60 transition-opacity"
              quality={100}
            />
          </div>
          <div className="relative z-10 flex items-center min-h-[500px]">
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-[60px]">
              <KotlinKLogo className="h-16 w-16 mb-6" />
              <h2 className="text-[40px] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-4">
                The JetBrains Kotlin Ecosystem
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-md leading-relaxed">
                A powerful set of tools, libraries, and integrations built around the Kotlin
                programming language to help you develop modern applications efficiently.
              </p>
              <Link
                href="https://www.jetbrains.com/kotlin-ecosystem/"
                className="inline-flex items-center gap-2 bg-white text-black font-semibold py-3 px-8 rounded-full text-base transition-all hover:brightness-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                Explore Ecosystem
                <ArrowRight className="w-4 h-4" />
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

  const ProductIcon = ({ initials, gradient }: { initials: string; gradient: string }) => (
    <div className={`w-20 h-20 p-px rounded-xl ${gradient} flex-shrink-0`}>
      <div className="bg-black w-full h-full rounded-[11px] flex items-center justify-center">
        <span className="text-white text-3xl font-bold tracking-tighter">{initials}</span>
      </div>
    </div>
  );

  return (
    <section className="bg-black text-white py-[100px]" id="teams-panel" role="tabpanel">
      <div className="max-w-[1248px] mx-auto px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-lg font-medium text-[#00d4aa]">For</span>
            <Users className="w-7 h-7 text-[#00d4aa]" />
            <span className="text-lg font-medium text-[#00d4aa]">teams</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter leading-tight max-w-4xl mx-auto">
            Minimize friction and increase productivity
          </h2>
          <h3 className="mt-8 text-2xl sm:text-[28px] text-white/90 leading-snug max-w-[690px] mx-auto">
            Ensure efficient collaboration and maintain quality codebases with a fast software
            delivery flow
          </h3>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamTools.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0a2f2f] p-8 rounded-[16px] flex flex-col text-left hover:bg-[#104242] transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <ProductIcon initials={tool.initials} gradient={tool.gradient} />
              <h4 className="mt-6 text-2xl font-bold text-white mb-2">{tool.name}</h4>
              <p className="text-base text-[#cccccc] flex-grow leading-relaxed">
                {tool.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#00d4aa] opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
        <div className="mt-12">
          <a
            href="https://www.jetbrains.com/products/#type=team"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg text-white font-medium hover:text-[#00d4aa] transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-3 py-2"
          >
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
    {
      logoSrc:
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/logo_gradle_white-4.svg?",
      logoAlt: "Gradle Inc. logo",
      quote:
        "Gradle Inc. is the company behind the Gradle Build Tool, one of the most popular open-source build automation tools used by millions of developers. For the past ten years, the Gradle Build Tool team has been relying on TeamCity for its CI/CD process, which allows it to run tens of thousands of green builds daily and maintain a high build success rate.",
      caseStudyUrl: "https://www.jetbrains.com/company/customers/experience/gradle/",
      linkText: "Read the full case study",
    },
    {
      logoSrc:
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/logo_zynex_white-5.svg?",
      logoAlt: "Zynex Medical logo",
      quote:
        "Qodana helps all our developers write the best possible code regardless of their experience and it helps our senior developers maintain their expected code quality as well. Given the various types of inspections it offers, we're hoping that Qodana can act as a developer coach in addition to helping maintain the code quality standards in our products.",
      caseStudyUrl: "https://www.jetbrains.com/company/customers/experience/zynex/",
      linkText: "Read the Qodana case study",
    },
  ];

  return (
    <section className="bg-black py-20 lg:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16 px-4">
          <p className="text-sm font-medium text-[#00d4aa] uppercase tracking-widest mb-4">
            Featured
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Many of the world's most dynamic teams find that JetBrains tools make them more
            creative and effective
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <a
              key={index}
              href={testimonial.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-[#111111] p-10 rounded-xl border border-[#333333] transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Image
                src={testimonial.logoSrc}
                alt={testimonial.logoAlt}
                width={150}
                height={40}
                className="w-[150px] h-auto mb-8"
              />
              <p className="text-base text-[#cccccc] leading-relaxed flex-grow">
                {testimonial.quote}
              </p>
              <div className="mt-8 flex items-center gap-2 font-medium text-white group-hover:text-primary transition-colors">
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
        <a
          href="https://www.jetbrains.com/teamcity/pipelines/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-[20px] p-12 overflow-hidden border border-white/10 hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          style={{
            backgroundImage:
              "radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 50%), linear-gradient(135deg, rgb(13, 77, 77), rgb(10, 51, 51))",
          }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-x-12 gap-y-8">
            <div className="flex-1 order-2 lg:order-1 text-center lg:text-left z-10">
              <h3 className="text-[32px] font-bold text-white leading-tight">
                TeamCity Pipelines
              </h3>
              <h4 className="mt-2 text-2xl font-semibold text-[#00ffff]">
                A new approach to CI/CD
              </h4>
              <p className="mt-4 text-base text-[#cccccc] leading-relaxed max-w-lg mx-auto lg:mx-0">
                Faster, self-optimizing pipelines with intelligent suggestions to make sure you're
                always operating at peak efficiency. Focus on building great things while we handle
                the rest.
              </p>
              <div className="mt-8">
                <span className="inline-flex items-center gap-2 px-8 py-3 text-base font-semibold text-black bg-white rounded-full transition-all duration-200 group-hover:scale-105">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:w-[500px] lg:flex-shrink-0">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/teamcity-pipe-4.png?"
                alt="TeamCity Pipelines visualization"
                width={500}
                height={300}
                className="w-full h-auto object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

// Trusted Hardware Component
function TrustedHardware() {
  const LOGOS = [
    { src: "/hardware-logos/intel.jpg", alt: "Intel" },
    { src: "/hardware-logos/Snap.png", alt: "Snap" },
    { src: "/hardware-logos/arduino-logo.png", alt: "Arduino" },
    { src: "/hardware-logos/ESP32-C6-DevKit-Module-Pinout-c.jpg", alt: "ESP32" },
    { src: "/hardware-logos/NVIDIA-logo-BL_thmb.jpg", alt: "NVIDIA" },
  ];

  const logos = [...LOGOS, ...LOGOS];

  return (
    <section className="bg-gradient-to-r from-black via-[#0a1a0a] to-[#04ff00]/20 py-[100px] text-center overflow-hidden border-y border-white/10">
      <div className="mx-auto max-w-[1400px] px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl sm:text-[48px] font-bold leading-[1.1] text-white mb-4">
            Trusted by top hardware & AI organizations
          </h3>
          <p className="mt-4 text-lg leading-[1.6] text-[#cccccc] max-w-2xl mx-auto">
            Our platform runs seamlessly across the most popular hardware & cloud setups.
          </p>
        </motion.div>
      </div>

      <div className="relative mt-[80px] w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        <div className="flex animate-marquee">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="mx-10 flex-shrink-0 flex items-center justify-center min-w-[160px]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={70}
                className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
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
    <section className="bg-black py-16 sm:py-24" id="businesses-panel" role="tabpanel">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="flex items-center justify-center gap-x-2 text-lg font-semibold leading-7 text-primary mb-4">
            <span>For</span>
            <Building className="h-5 w-5 text-white" />
            <span>businesses</span>
          </h2>
          <p className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Empower your team and succeed as a business
          </p>
        </div>
        <div className="mt-16 sm:mt-20">
          <Link
            href="https://www.jetbrains.com/ide-services/"
            className="group block relative mx-auto max-w-[1200px] overflow-hidden rounded-[24px] border border-white/10 hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Learn more about JetBrains IDE Services"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6b2d9e] via-[#d946a6] to-[#ff6b35]" />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/ide-services-bg-6.svg?"
              alt=""
              fill
              className="absolute inset-0 z-0 opacity-30"
              aria-hidden="true"
            />
            <div className="relative z-10 p-14 text-white">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-3">
                  <JetBrainsSimpleLogo />
                  <span className="text-lg font-bold">JetBrains IDE Services</span>
                </div>
                <h3 className="mt-12 text-[36px] font-bold leading-tight tracking-[-0.01em]">
                  Manage developer tools at scale
                </h3>
                <p className="mt-4 max-w-xl text-lg font-normal leading-relaxed">
                  Provision IDEs centrally to machines across your entire organization. Securely
                  govern AI-powered development.
                </p>
                <div className="mt-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-9 py-[14px] text-base font-semibold text-black transition-all duration-200 group-hover:scale-105">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </span>
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
    {
      icon: Rocket,
      title: "Boost developer experience",
      description:
        "Leverage AI on your terms, ensuring compliance. Amplify the satisfaction and productivity of your software teams.",
    },
    {
      icon: Code2,
      title: "Stay competitive",
      description:
        "Nurture coding best practices and ensure cleaner, more maintainable code.",
    },
    {
      icon: Shield,
      title: "Minimize risks",
      description: "Maintain business continuity with enterprise-grade support.",
    },
    {
      icon: Target,
      title: "Control costs",
      description:
        "Foster business growth through flexible licensing and cost control. Maximize your existing technology investments.",
    },
  ];

  return (
    <div className="bg-black text-white">
      <section className="mx-auto max-w-[1200px] py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl md:text-[44px] font-bold tracking-tight leading-tight mb-16">
          Solutions that scale with you as you grow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefitsData.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-[#2d1b4e] to-[#1a0f2e] rounded-2xl p-9 border border-white/10 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10"
              >
                <Icon className="h-10 w-10 text-primary mb-8" aria-hidden="true" />
                <h4 className="text-2xl font-semibold text-white mb-4">{benefit.title}</h4>
                <p className="text-[15px] text-[#b3b3b3] leading-relaxed">{benefit.description}</p>
              </motion.div>
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
    <div className="mx-auto max-w-[1200px] rounded-xl bg-gradient-to-br from-[#3d1f5c] to-[#2a1540] p-8 border border-white/10">
      <div className="flex flex-col items-start gap-8 md:flex-row">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/aicpa-soc-logo-5.png?"
          alt="AICPA SOC certification badge"
          width={100}
          height={100}
          className="flex-shrink-0 grayscale hover:grayscale-0 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        />
        <div className="text-left">
          <h4 className="text-2xl font-semibold text-white mb-2">
            Proven compliance and security
          </h4>
          <p className="text-base leading-relaxed text-[#d4d4d4]">
            JetBrains tools adhere to industry-leading security standards, including SOC 2
            certification, ensuring your organization's data is protected and our products are
            compliant with global regulations. All necessary documents, including security reports,
            policies, and certifications, are available in our{" "}
            <a
              href="https://trust-center.jetbrains.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              Trust Center
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

// Discover More Cards Component
function DiscoverMoreCards() {
  const cardData = [
    {
      icon: Download,
      title: "Choose your IDE",
      description: "Find the perfect development environment",
      buttonText: "Explore IDEs",
      href: "https://www.jetbrains.com/ides/",
    },
    {
      icon: MessageSquare,
      title: "Contact support",
      description: "Get expert help when you need it",
      buttonText: "Get help",
      href: "https://www.jetbrains.com/support/",
    },
    {
      icon: Briefcase,
      title: "Speak to sales",
      description: "Discuss enterprise solutions",
      buttonText: "Get in touch",
      href: "https://www.jetbrains.com/support/sales/",
    },
    {
      icon: BookOpen,
      title: "Annual Highlights",
      description: "See what we accomplished this year",
      buttonText: "View report",
      href: "https://www.jetbrains.com/lp/annualreport-2024",
    },
  ];

  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-12">
        <h2 className="mb-12 text-4xl sm:text-5xl font-bold leading-none tracking-tight">
          Discover more
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex h-full flex-col rounded-2xl border border-[#333333] bg-transparent p-10 transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl sm:text-[28px] font-semibold leading-tight text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#999999] leading-relaxed">{card.description}</p>
                </div>
                <div className="mt-auto pt-10">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white px-7 py-3 text-base font-medium text-white group-hover:bg-white group-hover:text-black transition-all">
                    {card.buttonText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
// Cookie Banner Component
function CookieBanner({ onDismiss }: { onDismiss: () => void }) {
  const [showSettings, setShowSettings] = useState(false);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    onDismiss();
  };

  const handleManage = () => {
    setShowSettings(!showSettings);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-[500px] z-[999]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
    >
      <div className="rounded-xl border border-white/20 bg-[#0a0a0a]/98 backdrop-blur-xl p-6 shadow-2xl">
        <h2 id="cookie-banner-title" className="text-lg font-semibold text-white mb-2">
          🍪 Cookie Settings
        </h2>
        <p className="text-sm text-[#b3b3b3] mb-4 leading-relaxed">
          We use cookies to improve your experience and analyze site usage.{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
          >
            Learn more
          </a>
        </p>
        {showSettings && (
          <div className="mb-4 space-y-2 p-3 bg-white/5 rounded-lg">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked disabled className="rounded" />
              <span className="text-sm">Essential (Required)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Analytics</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Marketing</span>
            </label>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={handleAccept}
            className="flex-1 rounded-full bg-primary text-black hover:brightness-110 font-semibold"
          >
            Accept All
          </Button>
          <Button
            onClick={handleManage}
            variant="outline"
            className="flex-1 rounded-full border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            {showSettings ? "Save" : "Customize"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Footer Component
function Footer() {
  const footerData = {
    columns: [
      {
        title: "Grysics",
        links: [
          { name: "Overview", href: "/grysics" },
          { name: "Deploy Anywhere", href: "/deploy-anywhere" },
          { name: "Verification Engine", href: "/verification" },
          { name: "Documentation", href: "/docs" },
          { name: "Blog", href: "/blog" },
        ],
      },
      {
        title: "Company",
        links: [
          { name: "About", href: "/about" },
          { name: "Careers", href: "/careers" },
          { name: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Support",
        links: [
          { name: "Help Center", href: "/help" },
          { name: "FAQ", href: "/faq" },
          { name: "Community", href: "/community" },
        ],
      },
      {
        title: "Resources",
        links: [
          { name: "Tutorials", href: "/tutorials" },
          { name: "Case Studies", href: "/case-studies" },
          { name: "Industry Insights", href: "/insights" },
        ],
      },
      {
        title: "Legal",
        links: [
          { name: "Terms of Use", href: "/terms" },
          { name: "Privacy Policy", href: "/privacy" },
          { name: "Cookie Policy", href: "/cookies" },
        ],
      },
    ],
    socials: [
      { name: "Twitter", href: "https://twitter.com/olyxee", icon: Twitter },
      { name: "Facebook", href: "https://www.facebook.com/olyxee", icon: Facebook },
      { name: "Youtube", href: "https://www.youtube.com/@olyxee", icon: Youtube },
      { name: "Instagram", href: "https://www.instagram.com/olyxee", icon: Instagram },
      { name: "LinkedIn", href: "https://www.linkedin.com/company/olyxee", icon: Linkedin },
      { name: "Blog", href: "/blog", icon: Rss },
    ],
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-[60px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
          {footerData.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-[#999999] uppercase mb-4 tracking-wider">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-[#cccccc] hover:text-white transition-colors duration-200 focus:outline-none focus:text-primary"
                    >
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
            <p>&copy; {new Date().getFullYear()} Olyxee. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            {footerData.socials.map((social) => {
              const SocialIcon = social.icon;
              return (
                <a
                  href={social.href}
                  key={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-[#999999] hover:text-white hover:border-white transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <SocialIcon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}