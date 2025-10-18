import { Facebook, Instagram, Linkedin, Rss, Twitter, Youtube } from 'lucide-react';

const footerData = {
  columns: [
    {
      title: 'AI',
      links: [
        { name: 'JetBrains AI', href: 'https://www.jetbrains.com/ai/' },
        { name: 'AI Assistant', href: 'https://www.jetbrains.com/ai-assistant/' },
        { name: 'Junie', href: 'https://www.jetbrains.com/junie/' },
        { name: 'AI in IDEs', href: 'https://www.jetbrains.com/ai-in-ides/' },
        { name: 'AI Enterprise', href: 'https://www.jetbrains.com/ai-enterprise/' },
        { name: 'AI News', href: 'https://blog.jetbrains.com/ai/' },
      ],
    },
    {
      title: 'Developer Tools',
      links: [
        { name: 'All Products', href: 'https://www.jetbrains.com/products/' },
        { name: 'IDEs', href: 'https://www.jetbrains.com/ides/' },
        { name: '.NET and Visual Studio', href: 'https://www.jetbrains.com/dotnet/' },
        { name: 'Team Tools', href: 'https://www.jetbrains.com/products/#type=team' },
        { name: 'Plugin Marketplace', href: 'https://plugins.jetbrains.com/' },
        { name: 'Toolbox App', href: 'https://www.jetbrains.com/toolbox-app/' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { name: 'Business', href: 'https://www.jetbrains.com/business/' },
        { name: 'Data', href: 'https://www.jetbrains.com/data/' },
        { name: 'IDE Services', href: 'https://www.jetbrains.com/ide-services/' },
        { name: 'Remote Development', href: 'https://www.jetbrains.com/remote-development/' },
        { name: 'Game Development', href: 'https://www.jetbrains.com/gamedev/' },
        { name: 'DevOps', href: 'https://www.jetbrains.com/devops/' },
        { name: 'C++ Tools', href: 'https://www.jetbrains.com/cpp/' },
      ],
    },
    {
      title: 'Initiatives',
      links: [
        { name: 'Kotlin', href: 'https://kotlinlang.org/' },
        { name: 'Open Source', href: 'https://www.jetbrains.com/opensource/' },
        { name: 'JetBrains Research', href: 'https://research.jetbrains.org/' },
        { name: 'JetBrains Mono', href: 'https://www.jetbrains.com/lp/mono/' },
        { name: 'MPS', href: 'https://www.jetbrains.com/mps/' },
      ],
    },
    {
      title: 'Education',
      links: [
        { name: 'Students', href: 'https://www.jetbrains.com/education/students/' },
        { name: 'Teachers', href: 'https://www.jetbrains.com/education/teachers/' },
        { name: 'Bootcamps', href: 'https://www.jetbrains.com/education/bootcamps/' },
        { name: 'Teams', href: 'https://www.jetbrains.com/education/teams/' },
        { name: 'Course Catalog', href: 'https://www.jetbrains.com/education/catalog/' },
        { name: 'University Programs', href: 'https://www.jetbrains.com/education/university/' },
      ],
    },
    {
      title: 'Store',
      links: [
        { name: 'Plans and Pricing', href: 'https://www.jetbrains.com/store/' },
        { name: 'All Products Pack', href: 'https://www.jetbrains.com/all/' },
        { name: 'dotUltimate', href: 'https://www.jetbrains.com/dotultimate/' },
        { name: 'Partners and Resellers', href: 'https://www.jetbrains.com/partners/' },
        { name: 'Customers and Awards', href: 'https://www.jetbrains.com/customers/' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Technical Support', href: 'https://www.jetbrains.com/support/' },
        { name: 'Contact Sales', href: 'https://www.jetbrains.com/support/sales/' },
        { name: 'Documentation', href: 'https://www.jetbrains.com/help/' },
        { name: 'JetBrains Account', href: 'https://account.jetbrains.com/' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: 'https://blog.jetbrains.com/' },
        { name: 'Early Access', href: 'https://www.jetbrains.com/eap/' },
        { name: 'Events and Livestreams', href: 'https://www.jetbrains.com/events/' },
        { name: 'Newsletters', href: 'https://www.jetbrains.com/subscribe/' },
        { name: 'Industry Reports', href: 'https://www.jetbrains.com/lp/devecosystem-2023/' },
        { name: 'JetBrains Guide', href: 'https://www.jetbrains.com/guide/' },
        { name: 'Inspectopedia', href: 'https://www.jetbrains.com/help/idea/code-inspection-index.html' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'User Groups', href: 'https://www.jetbrains.com/community/user-groups/' },
        { name: 'Open-Source Partnerships', href: 'https://www.jetbrains.com/community/opensource/' },
        { name: 'Developer Recognition', href: 'https://www.jetbrains.com/community/dev-recognition/' },
        { name: 'Content Creators', href: 'https://www.jetbrains.com/community/content-creators/' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: 'https://www.jetbrains.com/company/' },
        { name: 'Contacts', href: 'https://www.jetbrains.com/company/contacts/' },
        { name: 'Careers', href: 'https://www.jetbrains.com/careers/' },
        { name: 'Press and News', href: 'https://www.jetbrains.com/company/press/' },
        { name: 'Brand Assets', href: 'https://www.jetbrains.com/company/brand/' },
        { name: 'Merchandise', href: 'https://merch.jetbrains.com/' },
        { name: 'Trust Center', href: 'https://trust-center.jetbrains.com/' },
      ],
    },
  ],
  socials: [
    { name: 'Twitter', href: 'https://twitter.com/jetbrains', icon: Twitter },
    { name: 'Facebook', href: 'https://www.facebook.com/JetBrains', icon: Facebook },
    { name: 'Youtube', href: 'https://www.youtube.com/user/JetBrainsTV', icon: Youtube },
    { name: 'Instagram', href: 'https://www.instagram.com/jetbrains/', icon: Instagram },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/jetbrains', icon: Linkedin },
    { name: 'Blog', href: 'https://blog.jetbrains.com/', icon: Rss },
  ],
  legal: [
    { name: 'Terms of Use', href: 'https://www.jetbrains.com/legal/docs/company/useterms/' },
    { name: 'Privacy Policy', href: 'https://www.jetbrains.com/legal/docs/privacy/privacy/' },
    { name: 'Cookie settings', href: '#opt-out' },
  ]
};

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-[60px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
          {footerData.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-[#999999] uppercase mb-4 tracking-wider">{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-[#cccccc] leading-[2.2] hover:text-white transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col-reverse items-center gap-y-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 text-sm text-[#999999] sm:flex-row sm:gap-6">
            <p>&copy; 2000–2024 JetBrains s.r.o.</p>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerData.legal.map((link) => (
                 <a href={link.href} key={link.name} className="hover:text-white transition-colors">
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-x-4">
            {footerData.socials.map((social) => (
              <a href={social.href} key={social.name} aria-label={social.name} className="text-[#999999] hover:text-white transition-colors">
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}