'use client';

import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Youtube } from "lucide-react";

const footerData = {
  columns: [
    {
      title: "Products",
      links: [
        { name: "Ordo", href: "/products/ordo" },
        { name: "Addup", href: "/products/addup" },
      ],
    },
    {
      title: "Enterprise",
      groups: [
        {
          title: "Enterprise Software",
          links: [
            { name: "Overview", href: "/enterprise" },
            { name: "Logistics", href: "https://logistics.olyxee.com/login", external: true },
            { name: "Contact Sales", href: "/contact" },
          ],
        },
        {
          title: "Enterprise Hardware",
          links: [
            { name: "Olyxee Robotics", href: "/enterprise/robotics", logo: "/Logo/Olyxee_Robotics_Logo.png" },
          ],
        },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Brand Guidelines", href: "/brand" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
      ],
    },
    {
      title: "Trust",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Use", href: "/terms" },
      ],
    },
  ],
  socials: [
    { name: "Twitter", href: "https://twitter.com/olyxee", icon: Twitter },
    { name: "YouTube", href: "https://www.youtube.com/@olyxee", icon: Youtube },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/olyxee", icon: Linkedin },
  ],
};

type FooterVariant = "dark" | "light";

interface FooterProps {
  variant?: FooterVariant;
}

export default function Footer({ variant = "light" }: FooterProps) {
  const isLight = variant === "light";

  const styles = isLight
    ? {
        wrapper: "bg-white text-neutral-900 border-t border-neutral-200",
        columnTitle: "text-neutral-500",
        link: "text-neutral-700 hover:text-neutral-900",
        divider: "border-neutral-200",
        copyright: "text-neutral-500",
        social: "text-neutral-500 hover:text-neutral-900",
        logoOpacity: "opacity-90",
      }
    : {
        wrapper: "bg-neutral-950 text-white",
        columnTitle: "text-neutral-500",
        link: "text-neutral-400 hover:text-white",
        divider: "border-white/10",
        copyright: "text-neutral-500",
        social: "text-neutral-500 hover:text-white",
        logoOpacity: "opacity-40",
      };

  return (
    <footer className={styles.wrapper} aria-label="Site footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-12 sm:pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-14 mb-16 sm:mb-24">
          {footerData.columns.map((column: any) => {
            const renderLink = (link: any) => {
              const content = (
                <span className="inline-flex items-center gap-2">
                  {link.logo && (
                    <Image
                      src={link.logo}
                      alt=""
                      width={16}
                      height={16}
                      className="rounded-sm"
                    />
                  )}
                  <span>{link.name}</span>
                </span>
              );
              return link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${styles.link} transition-colors duration-300 font-light`}
                >
                  {content}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className={`text-sm ${styles.link} transition-colors duration-300 font-light`}
                >
                  {content}
                </Link>
              );
            };

            return (
              <div key={column.title}>
                <h3 className={`text-[10px] font-semibold ${styles.columnTitle} uppercase tracking-widest mb-6`}>
                  {column.title}
                </h3>
                {column.groups ? (
                  <div className="space-y-6">
                    {column.groups.map((group: any) => (
                      <div key={group.title}>
                        <h4 className={`text-[10px] font-medium ${styles.columnTitle} uppercase tracking-wider mb-3 opacity-80`}>
                          {group.title}
                        </h4>
                        <ul className="space-y-3.5">
                          {group.links.map((link: any) => (
                            <li key={link.name}>{renderLink(link)}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-3.5">
                    {column.links.map((link: any) => (
                      <li key={link.name}>{renderLink(link)}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        <div className={`pt-8 border-t ${styles.divider} flex flex-col-reverse items-center gap-y-6 sm:flex-row sm:justify-between`}>
          <div className="flex items-center gap-3">
            <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee" width={18} height={18} className={styles.logoOpacity} />
            <p className={`text-xs ${styles.copyright} font-light`}>&copy; {new Date().getFullYear()} Olyxee. All rights reserved.</p>
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
                  className={`w-9 h-9 flex items-center justify-center rounded-full ${styles.social} transition-all duration-300`}
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
