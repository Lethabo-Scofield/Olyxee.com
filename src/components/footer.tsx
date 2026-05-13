'use client';

import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Youtube, ArrowUpRight, ArrowRight } from "lucide-react";

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
        headlineMuted: "text-neutral-300",
        muted: "text-neutral-500",
        columnTitle: "text-neutral-400",
        link: "text-neutral-700 hover:text-neutral-900",
        divider: "border-neutral-200",
        copyright: "text-neutral-500",
        social:
          "text-neutral-500 hover:text-neutral-900 ring-1 ring-neutral-200 hover:ring-neutral-300 bg-white",
        ctaPill:
          "text-neutral-900 ring-1 ring-neutral-200 hover:ring-neutral-900 bg-white",
        ctaArrow:
          "bg-neutral-900 text-white group-hover:bg-black",
        hqDot: "bg-emerald-500",
        hqText: "text-neutral-500",
        wordmark: "text-neutral-900/[0.04]",
        statusBg: "bg-neutral-50",
        glowA: "rgba(99,102,241,0.0)",
        glowB: "rgba(244,114,182,0.0)",
      }
    : {
        wrapper: "bg-neutral-950 text-white",
        eyebrow: "text-white/40",
        headline: "text-white",
        headlineMuted: "text-white/30",
        muted: "text-white/55",
        columnTitle: "text-white/40",
        link: "text-white/65 hover:text-white",
        divider: "border-white/10",
        copyright: "text-white/45",
        social:
          "text-white/55 hover:text-white ring-1 ring-white/10 hover:ring-white/30 bg-white/[0.02]",
        ctaPill:
          "text-white ring-1 ring-white/15 hover:ring-white/40 bg-white/[0.04]",
        ctaArrow:
          "bg-white text-neutral-900 group-hover:bg-neutral-200",
        hqDot: "bg-emerald-400",
        hqText: "text-white/55",
        wordmark: "text-white/[0.04]",
        statusBg: "bg-white/[0.03]",
        glowA: "rgba(99,102,241,0.18)",
        glowB: "rgba(244,114,182,0.14)",
      };

  return (
    <footer className={`relative overflow-hidden ${styles.wrapper}`} aria-label="Site footer">
      {/* Ambient glow (only meaningful in dark variant; transparent in light) */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${styles.glowA} 0%, rgba(0,0,0,0) 60%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${styles.glowB} 0%, rgba(0,0,0,0) 60%)`,
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* === Brand band === */}
        <div className="pt-16 sm:pt-24 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-end">
            <div>
              <p className={`text-[10px] font-mono uppercase tracking-[0.28em] ${styles.eyebrow} mb-6 sm:mb-8 flex items-center gap-3`}>
                <span className="inline-block w-6 h-px bg-current opacity-40" aria-hidden />
                Olyxee
              </p>
              <h2 className={`font-serif text-3xl sm:text-5xl lg:text-[3.75rem] leading-[1.04] tracking-tight ${styles.headline}`}>
                Building the infrastructure for AI that{" "}
                <em className={`not-italic ${styles.headlineMuted}`}>operates</em>.
              </h2>
            </div>
            <div className="lg:pb-2 flex flex-col gap-5 lg:items-end">
              <p className={`text-sm ${styles.muted} font-light max-w-xs leading-relaxed`}>
                Have a workflow you want AI to actually run? Let&apos;s talk.
              </p>
              <Link
                href="/contact"
                className={`group inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full text-sm font-medium transition-all ${styles.ctaPill}`}
              >
                Get in touch
                <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${styles.ctaArrow}`}>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.75} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* === Link columns === */}
        <div className={`pt-12 sm:pt-16 border-t ${styles.divider}`}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 sm:gap-x-8 gap-y-12">
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
                  <h3 className={`text-[10px] font-mono ${styles.columnTitle} uppercase tracking-[0.22em] mb-5`}>
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
        </div>

        {/* === HQ status row === */}
        <div className={`mt-14 sm:mt-20 pt-8 border-t ${styles.divider} flex flex-wrap items-center justify-between gap-y-6 gap-x-10`}>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-mono uppercase tracking-[0.22em]">
            <span className={`flex items-center gap-2.5 ${styles.hqText}`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full animate-pulse ${styles.hqDot}`} aria-hidden />
              All systems operational
            </span>
            <span className={`hidden sm:inline-block w-px h-3 ${isLight ? "bg-neutral-200" : "bg-white/15"}`} aria-hidden />
            <span className={styles.hqText}>HQ · Johannesburg, ZA</span>
            <span className={`hidden sm:inline-block w-px h-3 ${isLight ? "bg-neutral-200" : "bg-white/15"}`} aria-hidden />
            <span className={styles.hqText}>Est. 2025</span>
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

        {/* === Oversized wordmark band === */}
        <div className="relative pt-10 sm:pt-14 pb-6 sm:pb-8 overflow-hidden">
          <p
            aria-hidden
            className={`font-serif italic leading-none tracking-[-0.04em] text-center select-none ${styles.wordmark}`}
            style={{ fontSize: "clamp(5rem, 22vw, 18rem)" }}
          >
            Olyxee
          </p>
        </div>

        {/* === Bottom bar === */}
        <div className={`pt-6 pb-10 sm:pb-12 border-t ${styles.divider} flex flex-col-reverse items-center gap-y-5 sm:flex-row sm:justify-between`}>
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
            <Link href="/brand" className={`text-xs font-light ${styles.link} transition-colors`}>
              Brand
            </Link>
          </div>
          <p className={`text-[10px] font-mono uppercase tracking-[0.28em] ${styles.copyright}`}>
            Made in Johannesburg
          </p>
        </div>
      </div>
    </footer>
  );
}
