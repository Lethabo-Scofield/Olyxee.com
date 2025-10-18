'use client';

import Image from 'next/image';

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

const TrustedOrganizationsSection = () => {
    const logos = [...LOGOS, ...LOGOS];
  
    return (
      <section className="bg-gradient-to-r from-black to-[#4a153c] py-[100px] text-center overflow-hidden">
        <style>
            {`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
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
          <p className="mt-6 text-lg leading-[1.6] text-[#c4c4c4]">
            including 88 Fortune Global Top 100 companies that use JetBrains products to deliver top-quality software.
          </p>
        </div>
        <div className="relative mt-[100px] w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex animate-marquee will-change-transform">
            {logos.map((logo, index) => (
              <div key={index} className="mx-10 flex-shrink-0 flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={48}
                  className="object-contain opacity-80 brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};
  
export default TrustedOrganizationsSection;