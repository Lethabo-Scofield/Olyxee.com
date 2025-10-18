import Image from 'next/image';

const ComplianceSecurityBanner = () => {
  return (
    <div className="mx-auto max-w-[1200px] rounded-xl bg-[#3d1f5c] p-8">
      <div className="flex flex-col items-start gap-8 md:flex-row">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c6af1086-1c42-4c7e-8bfb-3e84cfcea34c-jetbrains-com/assets/images/aicpa-soc-logo-5.png?"
          alt="AICPA SOC certification badge"
          width={100}
          height={100}
          className="flex-shrink-0 grayscale shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        />
        <div className="text-left">
          <h4 className="text-2xl font-semibold text-text-primary">
            Proven compliance and security
          </h4>
          <p className="mt-2 text-base leading-relaxed text-[#d4d4d4]">
            JetBrains tools adhere to industry-leading security standards,
            including SOC 2 certification, ensuring your organization’s data is
            protected and our products are compliant with global regulations. All
            necessary documents, including security reports, policies, and
            certifications, are available in our{' '}
            <a
              href="https://trust-center.jetbrains.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-text-primary hover:no-underline"
            >
              Trust Center
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplianceSecurityBanner;