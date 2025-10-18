import Image from 'next/image';
import Link from 'next/link';

const KotlinKLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M64 0H0V64H64L32 32L64 0Z" fill="#7F52FF" />
    </svg>
);

export default function KotlinEcosystemBanner() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="relative bg-black rounded-[24px] overflow-hidden">
          
          <div className="absolute inset-0">
             <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/kotlin-section-bg-3.png?"
                alt="Abstract background of purple, magenta, and blue geometric shapes"
                fill
                className="object-cover object-right"
                quality={100}
                unoptimized
             />
          </div>

          <div className="relative z-10 flex items-center min-h-[500px]">
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-[60px]">
              <KotlinKLogo className="h-16 w-16 mb-6" />
              <h2 className="text-[40px] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-4">
                The JetBrains Kotlin Ecosystem
              </h2>
              <p className="text-lg text-white mb-8 max-w-md">
                A powerful set of tools, libraries, and integrations built around the Kotlin programming language to help you develop modern applications efficiently.
              </p>
              <Link
                href="https://www.jetbrains.com/kotlin-ecosystem/"
                className="inline-block bg-white text-black font-medium py-3 px-8 rounded-[24px] text-base transition-colors hover:bg-neutral-200"
              >
                Explore
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}