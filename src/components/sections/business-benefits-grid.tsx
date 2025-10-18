import { Rocket, Code2, Shield, Target, type LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefitsData: Benefit[] = [
  {
    icon: Rocket,
    title: "Boost developer experience",
    description: "Leverage AI on your terms, ensuring compliance. Amplify the satisfaction and productivity of your software teams.",
  },
  {
    icon: Code2,
    title: "Stay competitive",
    description: "Nurture coding best practices and ensure cleaner, more maintainable code.",
  },
  {
    icon: Shield,
    title: "Minimize risks",
    description: "Maintain business continuity with enterprise-grade support.",
  },
  {
    icon: Target,
    title: "Control costs",
    description: "Foster business growth through flexible licensing and cost control. Maximize your existing technology investments.",
  },
];

const BusinessBenefitsGrid = () => {
  return (
    <div className="bg-black text-white">
      <section className="mx-auto max-w-[1200px] py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl md:text-[44px] font-bold tracking-tight leading-tight mb-16">
          Solutions that scale with you as&nbsp;you&nbsp;grow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefitsData.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="bg-[#2d1b4e] rounded-2xl p-9">
                <Icon className="h-10 w-10 text-white mb-8" aria-hidden="true" />
                <h4 className="text-2xl font-semibold text-white mb-4">
                  {benefit.title}
                </h4>
                <p className="text-[15px] text-[#b3b3b3] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default BusinessBenefitsGrid;