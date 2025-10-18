`use client`;

import * as React from "react";
import Image from "next/image";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const featuresData = [
  {
    title: "Ready for actual use right out of the box",
    description: "Mission-critical tools and a wide variety of supported languages and frameworks are at your fingertips – no plugin hassle included.",
    imageIsGif: false,
    imageSrc: null, 
    imagePlaceholderText: "PyCharm Screenshot",
    logoSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/pycharm-1.svg?",
    productName: "PyCharm",
    productLink: "https://www.jetbrains.com/pycharm/",
  },
  {
    title: "Complex tasks become easy",
    description: "The IDE knows everything about your code and uses this knowledge to offer blazing-fast navigation and relevant suggestions in every context.",
    imageIsGif: false,
    imageSrc: null,
    imagePlaceholderText: "WebStorm Screenshot",
    logoSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/webstorm-2.svg?",
    productName: "WebStorm",
    productLink: "https://www.jetbrains.com/webstorm/",
  },
  {
    title: "Built-in tools",
    description: "Run, debug, and test your applications without leaving the IDE and the code view. All important tools are within a hand’s reach.",
    imageIsGif: false,
    imageSrc: null,
    imagePlaceholderText: "IntelliJ IDEA Screenshot",
    logoSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/idea-3.svg?",
    productName: "IntelliJ IDEA",
    productLink: "https://www.jetbrains.com/idea/",
  },
  {
    title: "Customizable and extendable",
    description: "Your IDE is ready to be configured to match your taste and preferences and help you stay in the zone during all your coding sessions.",
    imageIsGif: true,
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/rider-2.gif?",
    imagePlaceholderText: null,
    logoSrc: null, 
    productName: "Rider",
    productLink: "https://www.jetbrains.com/rider/",
  },
];

export default function FeaturesCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
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

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  React.useEffect(() => {
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
                <Carousel
                    setApi={setApi}
                    opts={{ align: "start", loop: true }}
                    orientation="vertical"
                    className="w-full"
                >
                    <CarouselContent className="h-[520px] lg:h-[420px] -mt-1">
                        {featuresData.map((feature, index) => (
                            <CarouselItem key={index} className="pt-1 md:basis-full flex items-center">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
                                    <div className="flex flex-col justify-center text-center lg:text-left">
                                        <h4 className="text-[32px] font-bold text-white leading-tight">
                                            {feature.title}
                                        </h4>
                                        <p className="mt-6 text-base text-[#999999] leading-relaxed max-w-md mx-auto lg:mx-0">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center lg:items-start">
                                        <div className="w-full max-w-[600px] bg-[#0d0d0d] border border-white/10 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                                           {feature.imageSrc ? (
                                              <Image
                                                src={feature.imageSrc}
                                                alt={feature.title}
                                                width={600}
                                                height={375}
                                                className="rounded-lg object-contain"
                                                unoptimized={feature.imageIsGif}
                                              />
                                           ) : (
                                            <div className="aspect-[16/10] flex items-center justify-center rounded-lg">
                                                <span className="text-muted-foreground">{feature.imagePlaceholderText}</span>
                                            </div>
                                           )}
                                        </div>
                                        <a href={feature.productLink} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-2.5 text-white hover:text-gray-300 transition-colors">
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
                    <div className="absolute flex gap-3 justify-center w-full left-1/2 -translate-x-1/2 bottom-[-60px]">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={cn(
                                    "w-2.5 h-2.5 rounded-full transition-colors",
                                    current === index ? "bg-white" : "bg-gray-600 hover:bg-gray-400"
                                )}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </Carousel>
            </div>
        </div>
    </section>
  );
}