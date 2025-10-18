import Image from 'next/image';
import type { FC } from 'react';

const TeamCityPipelinesBanner: FC = () => {
  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <a
          href="https://www.jetbrains.com/teamcity/pipelines/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-[20px] p-12 overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 50%), linear-gradient(135deg, rgb(13, 77, 77), rgb(10, 51, 51))',
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
                Faster, self-optimizing pipelines with intelligent suggestions to
                make sure you’re always operating at peak efficiency. Focus on
                building great things while we handle the rest.
              </p>
              <div className="mt-8">
                <span className="inline-block px-8 py-3 text-base font-semibold text-black bg-white rounded-full transition-transform duration-200 group-hover:scale-105">
                  Learn more
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:w-[500px] lg:flex-shrink-0">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/teamcity-pipe-4.png?"
                alt="TeamCity Pipelines logo"
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
};

export default TeamCityPipelinesBanner;