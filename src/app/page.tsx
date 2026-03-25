"use client";

import { useState, useMemo, useEffect } from "react";
import './globals.css';
import Header from '../components/header';
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
    <div className="min-h-screen bg-white">
      <Header />

      <main id="main-content ">
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


          </motion.div>
        </AnimatePresence>
        <DiscoverMoreCards />
      </main>

      <Footer />

      <AnimatePresence>
        {cookieBannerVisible && <CookieBanner onDismiss={() => setCookieBannerVisible(false)} />}
      </AnimatePresence>
    </div>
  );
}

function HeroGrysics() {
  const hardwareLogos = [
    { src: "/hardware-logos/raspberrypi.png", alt: "Raspberry Pi" },
    { src: "/hardware-logos/NVIDIA-logo-BL_thmb.jpg", alt: "NVIDIA Jetson" },
    { src: "/hardware-logos/arduino-logo.png", alt: "Arduino" },
    { src: "/hardware-logos/intel.jpg", alt: "Intel" },
    { src: "/hardware-logos/ESP32.png", alt: "ESP" },
  ];

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-24 overflow-hidden">
      {/* Animated blue smoke background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white via-blue-300/40 to-white">
        <motion.svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="smokeGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="blurSmoke1" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="90" />
            </filter>
          </defs>
          <circle cx="50%" cy="40%" r="220" fill="url(#smokeGradient1)" filter="url(#blurSmoke1)" />
          <circle cx="30%" cy="60%" r="180" fill="url(#smokeGradient1)" filter="url(#blurSmoke1)" />
          <circle cx="70%" cy="55%" r="200" fill="url(#smokeGradient1)" filter="url(#blurSmoke1)" />
        </motion.svg>
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans text-gray-900 leading-tight">
          Simplifying AI Deployment Everywhere
        </h1>
        <p className="mt-6 text-base sm:text-lg md:text-xl font-light font-sans text-gray-600 max-w-md mx-auto">
          Simplifying the complexity of deploying AI on heterogeneous devices.
        </p>
      </div>
      {/* Video with floating animation */}
      <motion.div
        className="relative z-10 w-full max-w-4xl rounded-3xl overflow-hidden mb-12"
        style={{ height: "auto", aspectRatio: "16/9" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      >
        <video
          src="/videos/demo.mp4"
          className="w-full h-full object-cover rounded-2xl"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <button
          aria-label="Deploy Model"
          className="absolute bottom-6 right-6 px-6 py-3 bg-gray-200 text-black rounded-full font-semibold hover:bg-gray-300 transition-all"
        >
          Deploy Model
        </button>
      </motion.div>

      {/* Hardware logos with smaller size, transparent background, grayscale default, color on hover */}
      <div className="relative z-10 flex flex-wrap justify-center items-end gap-6 mt-8">
        {hardwareLogos.map((logo, i) => (
          <div
            key={i}
            className="flex flex-col items-center w-16 sm:w-20 md:w-24 lg:w-28 transition-transform duration-300 hover:scale-105"
          >
            <div className="w-full h-16 sm:h-20 md:h-24 lg:h-28 flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={96}
                height={96}
                unoptimized
                className="object-contain w-auto h-auto filter grayscale hover:grayscale-0 transition-all duration-300 bg-transparent"
              />
            </div>
            <span className="mt-2 text-xs sm:text-sm md:text-base text-gray-700 font-medium text-center">
              {logo.alt}
            </span>
          </div>
        ))}
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
      label: "For Engineer",
      icon: Code2,
      preview: "Build, test, and verify AI models on any hardware—edge, lab, or cloud.",
    },
    {
      id: "teams" as const,
      label: "For Teams",
      icon: Users,
      preview: "Collaborate on AI projects with shared pipelines, versioned models, and CI/CD automation.",
    },
  ];

  return (
    <div className="bg-white py-12 border-b border-gray-200">
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
                  "relative border-none bg-transparent pb-3 text-lg sm:text-xl font-semibold transition-all duration-300 flex items-center gap-2 px-2 focus:outline-none focus:ring-2 focus:ring-gray-700",
                  activeTab === tab.id
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                )}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-700"
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
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 w-64 p-3 bg-white border border-gray-200 shadow-xl"
                  >
                    <p className="text-sm text-gray-600">{tab.preview}</p>
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
    <section className="bg-white py-16 md:py-24" id="developers-panel" role="tabpanel">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 text-center">
        <p className="text-xl font-medium mb-4 text-gray-700">For {"{developers}"}</p>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-black mb-10">
          Enjoy building software
        </h2>
        <div className="bg-gray-50 rounded-[32px] p-6 sm:p-12 lg:p-16 border border-gray-200">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            A rich suite of tools that provide an exceptional developer experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 p-6 rounded-xl">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mb-6" />
                  <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              ))
              : tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block bg-white p-6 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-700 border border-gray-200"
                >
                  {tool.freeBadge && (
                    <span className="absolute top-6 right-6 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-md border border-gray-300">
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
                  <h5 className="text-xl font-semibold text-black mb-1">{tool.name}</h5>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
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
            className="inline-flex items-center gap-2 mt-12 text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-gray-700 rounded-lg px-3 py-2"
          >
            Explore all IDEs and code authoring tools
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

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
      className="bg-white text-black py-24 sm:py-32 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <h3 className="text-center text-4xl lg:text-5xl font-bold tracking-tighter max-w-4xl mx-auto">
          Trusted by more than <span className="text-gray-700">15M</span> developers
        </h3>

        <div className="mt-20 lg:mt-24 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden z-10">
            <motion.div
              className="h-full bg-gray-700"
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
            <CarouselContent className="h-[480px] sm:h-[520px] lg:h-[500px] -mt-1">
              {featuresData.map((feature, index) => (
                <CarouselItem key={index} className="pt-1 md:basis-full flex items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
                    <div className="flex flex-col justify-center text-center lg:text-left">
                      <h4 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-black leading-tight">
                        {feature.title}
                      </h4>
                      <p className="mt-6 text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                        {feature.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="w-full max-w-[600px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
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
                          <div className="aspect-[16/10] flex items-center justify-center rounded-lg bg-gray-100">
                            <span className="text-gray-600">{feature.imagePlaceholderText}</span>
                          </div>
                        )}
                      </div>
                      <a
                        href={feature.productLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center gap-2.5 text-black hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-700 rounded px-2 py-1"
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

          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {featuresData.map((feature, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-gray-700",
                  current === index
                    ? "border-gray-700 bg-gray-100"
                    : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                )}
              >
                <h5 className="font-semibold text-sm mb-1 line-clamp-1 text-black">{feature.title}</h5>
                <p className="text-xs text-gray-600 line-clamp-2">{feature.description}</p>
              </button>
            ))}
          </div>

          <div className="flex gap-3 justify-center w-full mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-gray-700",
                  current === index ? "bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
                )}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    current === index ? "bg-white" : "bg-transparent"
                  )}
                />
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-600 text-center mt-4">
            Use ← → arrow keys to navigate • Hover to pause
          </p>
        </div>
      </div>
    </section>
  );
}

function KotlinEcosystemBanner() {
  const KotlinKLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M64 0H0V64H64L32 32L64 0Z" fill="#7F52FF" />
    </svg>
  );

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="relative bg-white rounded-[24px] overflow-hidden border border-gray-200 hover:border-gray-400 transition-colors group">
          <div className="absolute inset-0">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/kotlin-section-bg-3.png?"
              alt=""
              fill
              className="object-cover object-right opacity-50 group-hover:opacity-60 transition-opacity"
              quality={100}
            />
          </div>
          <div className="relative z-10 flex items-center min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]">
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-[60px]">
              <KotlinKLogo className="h-16 w-16 mb-6" />
              <h2 className="text-3xl sm:text-[36px] lg:text-[40px] font-bold text-black leading-[1.1] tracking-[-0.02em] mb-4">
                The JetBrains Kotlin Ecosystem
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
                A powerful set of tools, libraries, and integrations built around the Kotlin
                programming language to help you develop modern applications efficiently.
              </p>
              <Link
                href="https://www.jetbrains.com/kotlin-ecosystem/"
                className="inline-flex items-center gap-2 bg-gray-700 text-white font-semibold py-3 px-8 rounded-full text-base transition-all hover:brightness-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-white"
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

function TeamToolsSection() {
  const teamTools = [
    {
      name: "TeamCity",
      description: "Powerful Continuous Integration out of the box",
      href: "https://www.jetbrains.com/teamcity/",
      initials: "TC",
      gradient: "bg-gradient-to-br from-gray-400 to-gray-600",
    },
    {
      name: "YouTrack",
      description: "Project management for all your teams",
      href: "https://www.jetbrains.com/youtrack/",
      initials: "YT",
      gradient: "bg-gradient-to-br from-gray-500 to-gray-700",
    },
    {
      name: "Qodana",
      description: "Code quality platform powered by advanced static analysis",
      href: "https://www.jetbrains.com/qodana/",
      initials: "QD",
      gradient: "bg-gradient-to-br from-gray-300 to-gray-500",
    },
    {
      name: "Datalore",
      description: "Self-hosted data science platform for teams",
      href: "https://www.jetbrains.com/datalore/",
      initials: "DL",
      gradient: "bg-gradient-to-br from-gray-200 to-gray-400",
    },
  ];

  const ProductIcon = ({ initials, gradient }: { initials: string; gradient: string }) => (
    <div className={`w-20 h-20 p-px rounded-xl ${gradient} flex-shrink-0`}>
      <div className="bg-white w-full h-full rounded-[11px] flex items-center justify-center">
        <span className="text-black text-3xl font-bold tracking-tighter">{initials}</span>
      </div>
    </div>
  );

  return (
    <section className="bg-white text-black py-[100px]" id="teams-panel" role="tabpanel">
      <div className="max-w-[1248px] mx-auto px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-lg font-medium text-gray-700">For</span>
            <Users className="w-7 h-7 text-gray-700" />
            <span className="text-lg font-medium text-gray-700">teams</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter leading-tight max-w-4xl mx-auto text-black">
            Minimize friction and increase productivity
          </h2>
          <h3 className="mt-8 text-2xl sm:text-[28px] text-gray-600 leading-snug max-w-[690px] mx-auto">
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
              className="bg-gray-50 p-8 rounded-[16px] flex flex-col text-left hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-700 border border-gray-200"
            >
              <ProductIcon initials={tool.initials} gradient={tool.gradient} />
              <h4 className="mt-6 text-2xl font-bold text-black mb-2">{tool.name}</h4>
              <p className="text-base text-gray-600 flex-grow leading-relaxed">
                {tool.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-gray-700 opacity-0 hover:opacity-100 transition-opacity">
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
            className="inline-flex items-center gap-2 text-lg text-black font-medium hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-700 rounded px-3 py-2"
          >
            and more
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

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
    <section className="bg-white py-20 lg:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16 px-4">
          <p className="text-sm font-medium text-gray-700 uppercase tracking-widest mb-4">
            Featured
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
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
              className="group flex flex-col bg-white p-10 rounded-xl border border-gray-200 transition-all duration-300 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              <Image
                src={testimonial.logoSrc}
                alt={testimonial.logoAlt}
                width={150}
                height={40}
                className="w-[150px] h-auto mb-8"
              />
              <p className="text-base text-gray-600 leading-relaxed flex-grow">
                {testimonial.quote}
              </p>
              <div className="mt-8 flex items-center gap-2 font-medium text-black group-hover:text-gray-700 transition-colors">
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

function TeamCityPipelinesBanner() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <a
          href="https://www.jetbrains.com/teamcity/pipelines/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-[20px] p-12 overflow-hidden border border-gray-200 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-700"
          style={{
            backgroundImage:
              "radial-gradient(circle at 60% 40%, rgba(0, 0, 0, 0.08) 0%, transparent 50%), linear-gradient(135deg, rgb(200, 200, 200), rgb(220, 220, 220))",
          }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-x-12 gap-y-8">
            <div className="flex-1 order-2 lg:order-1 text-center lg:text-left z-10">
              <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-black leading-tight">
                Grysics Pipeline
              </h3>
              <h4 className="mt-2 text-xl sm:text-2xl font-semibold text-gray-700">
                A new approach to CI/CD
              </h4>
              <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Faster,
              </p>
              <div className="mt-8">
                <span className="inline-flex items-center gap-2 px-8 py-3 text-base font-semibold text-white bg-gray-700 rounded-full transition-all duration-200 group-hover:scale-105">
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
    <div className="bg-white text-black">
      <section className="mx-auto max-w-[1200px] py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl md:text-[44px] font-bold tracking-tight leading-tight mb-16 text-black">
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
                className="bg-gray-50 rounded-2xl p-9 border border-gray-200 hover:border-gray-400 transition-all hover:shadow-xl hover:shadow-gray-200"
              >
                <Icon className="h-10 w-10 text-gray-700 mb-8" aria-hidden="true" />
                <h4 className="text-2xl font-semibold text-black mb-4">{benefit.title}</h4>
                <p className="text-[15px] text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ComplianceSecurityBanner() {
  return (
    <div className="mx-auto max-w-[1200px] rounded-xl bg-gray-50 p-8 border border-gray-200">
      <div className="flex flex-col items-start gap-8 md:flex-row">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/aicpa-soc-logo-5.png?"
          alt="AICPA SOC certification badge"
          width={100}
          height={100}
          className="flex-shrink-0 grayscale hover:grayscale-0 transition-all shadow-lg"
        />
        <div className="text-left">
          <h4 className="text-2xl font-semibold text-black mb-2">
            Proven compliance and security
          </h4>
          <p className="text-base leading-relaxed text-gray-600">
            JetBrains tools adhere to industry-leading security standards, including SOC 2
            certification, ensuring your organization's data is protected and our products are
            compliant with global regulations. All necessary documents, including security reports,
            policies, and certifications, are available in our{" "}
            <a
              href="https://trust-center.jetbrains.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:underline focus:outline-none focus:ring-2 focus:ring-gray-700 rounded"
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
    <section className="bg-white py-20 text-black">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-12">
        <h2 className="mb-12 text-4xl sm:text-5xl font-bold leading-none tracking-tight text-black">
          Discover more
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-10 transition-all hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-700"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center mb-6 group-hover:bg-gray-300 transition-colors">
                    <Icon className="h-6 w-6 text-gray-700" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl sm:text-[28px] font-semibold leading-tight text-black mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
                </div>
                <div className="mt-auto pt-10">
                  <span className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-7 py-3 text-base font-medium text-black group-hover:bg-gray-700 group-hover:text-white transition-all">
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
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
        <h2 id="cookie-banner-title" className="text-lg font-semibold text-black mb-2">
          🍪 Cookie Settings
        </h2>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          We use cookies to improve your experience and analyze site usage.{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:underline focus:outline-none focus:ring-2 focus:ring-gray-700 rounded"
          >
            Learn more
          </a>
        </p>
        {showSettings && (
          <div className="mb-4 space-y-2 p-3 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked disabled className="rounded" />
              <span className="text-sm text-black">Essential (Required)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-black">Analytics</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-black">Marketing</span>
            </label>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={handleAccept}
            className="flex-1 rounded-full bg-gray-700 text-white hover:brightness-110 font-semibold"
          >
            Accept All
          </Button>
          <Button
            onClick={handleManage}
            variant="outline"
            className="flex-1 rounded-full border-gray-300 bg-white text-black hover:bg-gray-100"
          >
            {showSettings ? "Save" : "Customize"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

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
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-[60px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
          {footerData.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4 tracking-wider">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 pt-8 border-t border-gray-200 flex flex-col-reverse items-center gap-y-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 text-sm text-gray-600 sm:flex-row sm:gap-6">
            <p>&copy; {new Date().getFullYear()} Olyxee. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-black transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-black transition-colors">
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
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-gray-700"
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