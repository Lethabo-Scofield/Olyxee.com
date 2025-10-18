import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building } from 'lucide-react';

// A simple SVG component to represent the JetBrains square logo,
// as the original asset was not provided in a usable format.
const JetBrainsSimpleLogo = () => (
  <div className="h-6 w-6 flex-shrink-0" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" fill="white" />
      <path d="M12 6L6 12L12 18L18 12L12 6Z" fill="black" />
    </svg>
  </div>
);

const BusinessIdeServicesBanner = () => {
  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="flex items-center justify-center gap-x-2 text-lg font-semibold leading-7 text-[#FF00FF]">
            <span>For</span>
            <Building className="h-5 w-5 text-white" />
            <span>businesses</span>
          </h2>
          <p className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Empower your team and succeed as a business
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <Link
            href="https://www.jetbrains.com/ide-services/"
            className="group block relative mx-auto max-w-[1200px] overflow-hidden rounded-[24px]"
            aria-label="Learn more about JetBrains IDE Services"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6b2d9e] via-[#d946a6] to-[#ff6b35]"></div>
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/svgs/ide-services-bg-6.svg?"
              alt=""
              layout="fill"
              objectFit="cover"
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
                  Provision IDEs centrally to machines across your entire organization. Securely govern AI-powered development.
                </p>

                <div className="mt-8">
                  <span className="inline-block rounded-full bg-white px-9 py-[14px] text-base font-semibold text-black transition-transform duration-200 group-hover:scale-105">
                    Learn more
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BusinessIdeServicesBanner;