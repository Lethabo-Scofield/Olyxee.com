import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
      "Qodana helps all our developers write the best possible code regardless of their experience and it helps our senior developers maintain their expected code quality as well. Given the various types of inspections it offers, we’re hoping that Qodana can act as a developer coach in addition to helping maintain the code quality standards in our products.",
    caseStudyUrl: "https://www.jetbrains.com/company/customers/experience/zynex/",
    linkText: "Read the Qodana case study",
  },
];

const CustomerTestimonials = () => {
  return (
    <section className="bg-black py-20 lg:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16 px-4">
          <p className="text-sm font-medium text-text-secondary uppercase tracking-widest mb-4">
            Featured
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            Many of the world's most dynamic teams find that JetBrains tools
            make them more creative and effective
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <a
              key={index}
              href={testimonial.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-[#111111] p-10 rounded-xl border border-[#333333] transition-all duration-300 hover:brightness-125"
            >
              <Image
                src={testimonial.logoSrc}
                alt={testimonial.logoAlt}
                width={150}
                height={40}
                className="w-[150px] h-auto"
              />
              <p
                className="mt-8 text-base text-[#cccccc]"
                style={{ lineHeight: '1.6' }}
              >
                {testimonial.quote}
              </p>
              <div className="flex-grow" />
              <div className="mt-8 flex items-center gap-2 font-medium text-white transition-colors">
                {testimonial.linkText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;