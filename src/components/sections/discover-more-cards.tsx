import React from 'react';
import Link from 'next/link';
import { Download, MessageSquare, Briefcase, BookOpen } from 'lucide-react';

interface DiscoverCardProps {
  icon: React.ElementType;
  title: React.ReactNode;
  buttonText: string;
  href: string;
}

const cardData: DiscoverCardProps[] = [
  {
    icon: Download,
    title: 'Choose your IDE',
    buttonText: 'Explore our IDEs',
    href: 'https://www.jetbrains.com/ides/',
  },
  {
    icon: MessageSquare,
    title: <>Contact<br />support</>,
    buttonText: 'Get help',
    href: 'https://www.jetbrains.com/support/',
  },
  {
    icon: Briefcase,
    title: <>Speak to<br />sales</>,
    buttonText: 'Get in touch',
    href: 'https://www.jetbrains.com/support/sales/',
  },
  {
    icon: BookOpen,
    title: 'Annual Highlights',
    buttonText: 'View report',
    href: 'https://www.jetbrains.com/lp/annualreport-2024',
  },
];

const DiscoverCard: React.FC<DiscoverCardProps> = ({ icon: Icon, title, buttonText, href }) => {
  return (
    <Link
      href={href}
      className="flex h-full flex-col rounded-2xl border border-[#333333] bg-transparent p-10 transition-colors hover:border-white"
    >
      <div>
        <Icon className="h-8 w-8 text-white" aria-hidden="true" />
        <h3 className="mt-8 text-[28px] font-semibold leading-tight text-white">
          {title}
        </h3>
      </div>
      <div className="mt-auto pt-10">
        <span className="inline-block rounded-full border border-white px-7 py-3 text-base font-medium text-white">
          {buttonText}
        </span>
      </div>
    </Link>
  );
};

const DiscoverMoreCards = () => {
  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-12">
        <h2 className="mb-12 text-5xl font-bold leading-none tracking-tight">
          Discover more
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card) => (
            <DiscoverCard
              key={card.href}
              icon={card.icon}
              title={card.title}
              buttonText={card.buttonText}
              href={card.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverMoreCards;