'use client';

import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Youtube, Instagram, Facebook, ArrowUpRight } from "lucide-react";
import type { SVGProps } from "react";

const HuggingFaceIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="8.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
    <path d="M8.5 15c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8" />
    <path d="M5 13c-.7-.2-1.3.4-1.1 1.1.2.7.9 1.1 1.6.9" />
    <path d="M19 13c.7-.2 1.3.4 1.1 1.1-.2.7-.9 1.1-1.6.9" />
  </svg>
);

const footerData = {
  tagline: "AI research and infrastructure for reliable enterprise execution.",
  columns: [
    {
      title: "Products",
      links: [
        { name: "Orgni", href: "https://orgni.olyxee.com", external: true },
        { name: "Orgni Finance", href: "https://finance.olyxee.com", external: true },
        { name: "Orgni Workflows", href: "https://workflow.olyxee.com", external: true },
        { name: "Order Loop", href: "https://logistics.olyxee.com/", external: true },
      ],
    },
    {
      title: "Solutions",
      links: [
        { name: "Orgni Docs", href: "/document-integrity" },
        { name: "Enterprise Automation", href: "/enterprise" },
        { name: "Togent", href: "https://togent.olyxee.com", external: true },
      ],
    },
    {
      title: "Research & Infrastructure",
      links: [
        { name: "Papers", href: "/research#papers" },
        { name: "Technical Reports", href: "/research" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "API Reference", href: "/docs?tab=api&page=api-reference" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Brand Guidelines", href: "/brand" },
        { name: "Stories", href: "/stories" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Terms & Policies",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Security", href: "/security" },
        { name: "Compliance", href: "/compliance" },
        { name: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
  ],
  socials: [
    { name: "Twitter", href: "https://twitter.com/Olyxee", icon: Twitter },
    { name: "YouTube", href: "https://www.youtube.com/@Olyxee", icon: Youtube },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/olyxee", icon: Linkedin },
    { name: "Instagram", href: "https://www.instagram.com/olyxee", icon: Instagram },
    { name: "Facebook", href: "https://www.facebook.com/olyxee", icon: Facebook },
    { name: "Hugging Face", href: "https://huggingface.co/Olyxee", icon: HuggingFaceIcon },
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
        link: "text-neutral-900 hover:text-neutral-500",
        divider: "border-neutral-200",
        copyright: "text-neutral-500",
        social: "text-neutral-900 hover:text-neutral-500",
      }
    : {
        wrapper: "bg-neutral-950 text-white",
        columnTitle: "text-white/50",
        link: "text-white hover:text-white/60",
        divider: "border-white/10",
        copyright: "text-white/55",
        social: "text-white hover:text-white/60",
      };

  return (
    <footer className={styles.wrapper} aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* === Link columns === */}
        <div className="pt-16 sm:pt-20 pb-12 sm:pb-16">
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee" width={24} height={24} className="w-6 h-6" />
              <span className={`text-base font-medium ${styles.link}`}>Olyxee</span>
            </Link>
            <p className={`text-sm ${styles.copyright} max-w-md leading-relaxed`}>
              {footerData.tagline}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 sm:gap-x-8 gap-y-12">
            {footerData.columns.map((column) => (
              <div key={column.title}>
                <h3 className={`text-sm font-medium ${styles.columnTitle} mb-5`}>
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => {
                    const content = (
                      <span className="inline-flex items-center gap-1.5">
                        {link.name}
                        {"external" in link && link.external && (
                          <ArrowUpRight className="w-3 h-3 opacity-60" aria-hidden />
                        )}
                      </span>
                    );
                    return (
                      <li key={link.name}>
                        {"external" in link && link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${styles.link} transition-colors`}
                          >
                            {content}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className={`text-sm ${styles.link} transition-colors`}
                          >
                            {content}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* === Bottom bar === */}
        <div className={`border-t ${styles.divider} py-6 sm:py-8 flex flex-col-reverse sm:flex-row items-center sm:justify-between gap-4`}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center sm:justify-start">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee" width={20} height={20} className="w-5 h-5" />
              <span className={`text-sm ${styles.copyright}`}>
                &copy; {new Date().getFullYear()} Olyxee
              </span>
            </Link>
            <Link href="/privacy" className={`text-sm ${styles.link} transition-colors`}>
              Privacy
            </Link>
            <Link href="/terms" className={`text-sm ${styles.link} transition-colors`}>
              Terms
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {footerData.socials.map((social) => {
              const SocialIcon = social.icon;
              return (
                <a
                  href={social.href}
                  key={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`transition-colors ${styles.social}`}
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
