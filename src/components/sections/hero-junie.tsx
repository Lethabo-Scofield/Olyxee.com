"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';

const DotPattern = () => {
  const dots = useMemo(() => {
    const rows = 12;
    const cols = 24;
    const dotArray = [];
    const dotColors = ['#00ff00', '#00cc00', '#00aa00'];

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
    <div
      aria-hidden="true"
      className="hidden lg:block absolute top-[60px] right-0 w-[400px] h-[200px] pointer-events-none -translate-y-1/4 translate-x-1/4"
      style={{
        transform: 'skewX(-20deg)',
      }}
    >
      <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-2">
        {dots.map((dot, i) =>
          dot ? (
            <div
              key={i}
              className="w-1 h-1 rounded-sm"
              style={{ backgroundColor: dot.color, opacity: dot.opacity }}
            />
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </div>
  );
};


export default function HeroJunie() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <DotPattern />
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-3 mb-8">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/junie-25.svg?"
                alt="Junie icon"
                width={36}
                height={36}
                className="h-9 w-auto"
              />
              <span className="text-4xl font-medium text-white">Junie</span>
            </div>

            <h1 className="text-[56px] font-bold leading-[1.1] tracking-tighter text-white mb-6">
              Your smart coding agent
            </h1>

            <p className="max-w-xl text-lg text-[#999999] mb-10">
              Make coding productive and enjoyable with an AI agent: explain your task, let Junie collect the context, write code and run tests for you.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="https://plugins.jetbrains.com/plugin/26104-jetbrains-junie"
                className="inline-flex items-center justify-center px-7 py-3 text-base font-semibold text-black bg-primary rounded-full transition-colors hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
                >
                Try now for free
              </a>
              <a
                href="https://www.jetbrains.com/junie/#pricing"
                className="inline-flex items-center justify-center px-7 py-3 text-base font-semibold text-white bg-transparent border border-white/30 rounded-full transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
              >
                See plans and pricing
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/junie-possibilities-1.gif?"
              alt="Junie coding agent demo"
              width={700}
              height={500}
              unoptimized
              className="rounded-xl mx-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
}