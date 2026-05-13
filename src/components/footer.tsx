'use client';

import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Youtube, ArrowUpRight } from "lucide-react";

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
      title: "Enterprise Software",
      links: [
        { name: "Logistics", href: "https://logistics.olyxee.com/login", external: true },
      ],
    },
    {
      title: "Enterprise Hardware",
      links: [
        { name: "Olyxee Robotics", href: "/enterprise/robotics" },
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
  showBrandBand?: boolean;
}

export default function Footer({ variant = "light" }: FooterProps) {
  const isLight = variant === "light";

  const styles = isLight
    ? {
        wrapper: "bg-white text-neutral-900 border-t border-neutral-200",
        eyebrow: "text-neutral-400",
        headline: "text-neutral-900",
        muted: "text-neutral-500",
        columnTitle: "text-neutral-400",
        link: "text-neutral-700 hover:text-neutral-900",
        divider: "border-neutral-200",
        copyright: "text-neutral-500",
        social:
          "text-neutral-500 hover:text-neutral-900 ring-1 ring-neutral-200 hover:ring-neutral-300 bg-white",
        ctaPrimary:
          "bg-neutral-900 text-white hover:bg-neutral-800",
        ctaSecondary:
          "text-neutral-900 bg-white ring-1 ring-neutral-200 hover:ring-neutral-300",
        logoOpacity: "opacity-90",
        wordmark: "text-neutral-900",
      }
    : {
        wrapper: "bg-neutral-950 text-white",
        eyebrow: "text-neutral-500",
        headline: "text-white",
        muted: "text-neutral-400",
        columnTitle: "text-neutral-500",
        link: "text-neutral-400 hover:text-white",
        divider: "border-white/10",
        copyright: "text-neutral-500",
        social:
          "text-neutral-400 hover:text-white ring-1 ring-white/10 hover:ring-white/20 bg-white/[0.02]",
        ctaPrimary:
          "bg-white text-neutral-900 hover:bg-neutral-100",
        ctaSecondary:
          "text-white bg-white/[0.04] ring-1 ring-white/10 hover:ring-white/20",
        logoOpacity: "opacity-70",
        wordmark: "text-white",
      };

  return (
    <footer className={styles.wrapper} aria-label="Site footer">
      <div className={`max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-10 sm:pb-14`}>
        {/* === Link columns === */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 sm:gap-x-8 gap-y-12 mb-16 sm:mb-20`}>
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
                  {link.external && (
                    <ArrowUpRight className="w-3 h-3 opacity-60" aria-hidden />
                  )}
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
                <h3 className={`text-[10px] font-semibold ${styles.columnTitle} uppercase tracking-[0.18em] mb-5`}>
                  {column.title}
                </h3>
                <ul className="space-y-3.5">
                  {column.links.map((link: any) => (
                    <li key={link.name}>{renderLink(link)}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* === Bottom bar === */}
        <div className={`pt-8 border-t ${styles.divider} flex flex-col-reverse items-center gap-y-6 sm:flex-row sm:justify-between`}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center sm:justify-start">
            <p className={`text-xs ${styles.copyright} font-light`}>
              &copy; {new Date().getFullYear()} Olyxee, Inc. All rights reserved.
            </p>
            <Link href="/privacy" className={`text-xs font-light ${styles.link} transition-colors`}>
              Privacy
            </Link>
            <Link href="/terms" className={`text-xs font-light ${styles.link} transition-colors`}>
              Terms
            </Link>
          </div>
          <div className="flex items-center gap-x-2">
            {footerData.socials.map((social) => {
              const SocialIcon = social.icon;
              return (
                <a
                  href={social.href}
                  key={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${styles.social}`}
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
