'use client';

import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Youtube, Rss } from "lucide-react";

const footerData = {
  columns: [
    {
      title: "Products",
      links: [
        { name: "Grysics", href: "/products/grysics" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Research", href: "/research" },
        { name: "Documentation", href: "/docs" },
        { name: "Developers", href: "/developers" },
        { name: "Community", href: "/community" },
      ],
    },
    {
      title: "Trust",
      links: [
        { name: "Safety & Reliability", href: "/safety" },
        { name: "Use Cases", href: "/use-cases" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Use", href: "/terms" },
      ],
    },
  ],
  socials: [
    { name: "Twitter", href: "https://twitter.com/olyxee", icon: Twitter },
    { name: "YouTube", href: "https://www.youtube.com/@olyxee", icon: Youtube },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/olyxee", icon: Linkedin },
    { name: "Blog", href: "/blog", icon: Rss },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-14 mb-24">
          {footerData.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-6">{column.title}</h3>
              <ul className="space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 font-light">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col-reverse items-center gap-y-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee" width={18} height={18} className="opacity-40" />
            <p className="text-xs text-neutral-500 font-light">&copy; {new Date().getFullYear()} Olyxee. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-x-1">
            {footerData.socials.map((social) => {
              const SocialIcon = social.icon;
              return (
                <a
                  href={social.href}
                  key={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-500 hover:text-white transition-all duration-300"
                >
                  <SocialIcon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
