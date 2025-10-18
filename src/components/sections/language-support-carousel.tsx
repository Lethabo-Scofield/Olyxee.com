"use client";
import React from 'react';
import Image from 'next/image';
import { FaJava, FaAndroid, FaPython, FaHtml5 } from 'react-icons/fa';
import { SiDotnet, SiKotlin, SiJavascript, SiTypescript, SiPhp, SiGo } from 'react-icons/si';

// This component injects the keyframes and animation class.
// This is a workaround as we cannot modify tailwind.config.js in this context.
// This is not styled-jsx, but a standard <style> tag.
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
  { name: 'VB.net', icon: <SiDotnet className="h-12 w-12 text-[#68217A]" /> },
  { name: 'Java', icon: <FaJava className="h-12 w-12 text-white" /> },
  { name: 'Kotlin', icon: <SiKotlin className="h-12 w-12 text-[#7F52FF]" /> },
  { name: 'Android', icon: <FaAndroid className="h-12 w-12 text-[#3DDC84]" /> },
  { name: 'JavaScript', icon: <SiJavascript className="h-12 w-12 text-[#F7DF1E]" /> },
  { name: 'TypeScript', icon: <SiTypescript className="h-12 w-12 text-[#3178C6]" /> },
  { name: 'PHP', icon: <SiPhp className="h-12 w-12 text-[#777BB4]" /> },
  { name: 'C#', icon: <SiDotnet className="h-12 w-12 text-[#9B4F96]" /> },
  { name: 'Python', icon: <FaPython className="h-12 w-12 text-[#3776AB]" /> },
  { name: 'Go', icon: <SiGo className="h-12 w-12 text-[#00ADD8]" /> },
  { name: 'HTML', icon: <FaHtml5 className="h-12 w-12 text-[#E34F26]" /> },
  { 
    name: 'Scala', 
    icon: (
      <Image 
        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/icons/logo-scala-1.png?" 
        alt="Scala logo" 
        width={48} 
        height={48} 
      />
    )
  },
];

const LanguageSupportCarousel = () => {
  return (
    <section className="bg-black py-20">
      <MarqueeStyles />
      <div className="max-w-[1400px] mx-auto px-6">
        <h3 className="text-[20px] font-semibold tracking-tight text-white text-center max-w-2xl mx-auto mb-20">
          Our products are technology agnostic and support a mix of languages and{'\u00A0'}other tools that your team and project may be using now or tomorrow.
        </h3>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee-scroll">
            {[...languages, ...languages].map((lang, index) => (
              <div key={index} className="flex flex-col items-center flex-shrink-0 w-auto" style={{ paddingRight: '60px' }}>
                {lang.icon}
                <span className="mt-4 text-sm text-[#999999] whitespace-nowrap">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageSupportCarousel;