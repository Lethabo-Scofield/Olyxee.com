'use client';

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';

type MenuChild = { name: string; href: string; description?: string };
type MenuItem = {
    name: string;
    href?: string;
    childrenLabel?: string;
    children?: MenuChild[];
};

const menuItems: MenuItem[] = [
    { name: "Research", href: "/research" },
    { name: "Enterprise", href: "/enterprise" },
    {
        name: "Company",
        childrenLabel: "Explore Company",
        children: [
            { name: "About Us", href: "/about", description: "Our mission, beliefs, and team" },
            { name: "Careers", href: "/careers", description: "Open roles and how we hire" },
            { name: "Brand Guidelines", href: "/brand", description: "Logo, colors, and usage" },
        ],
    },
];

type SignInOption = {
    name: string;
    description: string;
    href: string;
    external: boolean;
};

const SIGNIN_OPTIONS: SignInOption[] = [
    {
        name: "Order Loop",
        description: "Logistics tracking and updates",
        href: "https://logistics.olyxee.com/",
        external: true,
    },
    {
        name: "Orgni",
        description: "Workflow execution and approvals",
        href: "https://orgni.olyxee.com/",
        external: true,
    },
    {
        name: "API platform",
        description: "Join the waitlist · read the docs",
        href: "/signup?tool=api",
        external: false,
    },
];

const Header = ({ theme = "light" }: { theme?: "light" | "dark" }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
    const lastScrollY = useRef(0);
    const firstFocusableRef = useRef<HTMLButtonElement | null>(null);
    const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();

    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#')) {
            const id = href.slice(2);
            if (pathname === '/') {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [pathname]);

    const openDropdownNow = useCallback((name: string) => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setOpenDropdown(name);
    }, []);

    const closeDropdownSoon = useCallback(() => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 120);
    }, []);

    useEffect(() => () => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY.current;

            if (currentScrollY <= 10) {
                setScrolled(false);
                setVisible(true);
            } else {
                setScrolled(true);
                if (delta > 4) {
                    setVisible(false);
                } else if (delta < -4) {
                    setVisible(true);
                }
            }

            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
                setOpenDropdown(null);
            }
        };
        if (mobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
            setTimeout(() => firstFocusableRef.current?.focus(), 100);
        } else document.body.style.overflow = 'unset';
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenDropdown(null);
        };
        if (openDropdown) document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [openDropdown]);

    const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) setMobileMenuOpen(false);
    }, []);

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-[1000] flex justify-center px-3 sm:px-4"
                initial={{ y: 0, opacity: 1 }}
                animate={{
                    y: scrolled && !visible ? -100 : 0,
                    opacity: scrolled && !visible ? 0 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                style={{
                    paddingTop: scrolled ? 12 : 0,
                }}
            >
                <motion.div
                    className="flex items-center w-full relative"
                    initial={{ maxWidth: 1400 }}
                    animate={{
                        maxWidth: scrolled ? 820 : 1400,
                        height: scrolled ? 52 : 56,
                        borderRadius: scrolled ? 50 : 0,
                        paddingLeft: scrolled ? 16 : 12,
                        paddingRight: scrolled ? 16 : 12,
                        background: scrolled
                            ? 'rgba(255, 255, 255, 0.6)'
                            : 'rgba(255, 255, 255, 0.0)',
                        boxShadow: scrolled
                            ? '0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)'
                            : '0 0 0 rgba(0,0,0,0)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                        border: 'none',
                    }}
                >
                    <Link href="/" prefetch className="focus:outline-none rounded-full transition-transform hover:scale-105 flex items-center gap-2.5 flex-shrink-0">
                        <Image src="/Logo/Olyxee_Logo_Knockout.png" alt="Olyxee Logo" width={36} height={36} priority className="cursor-pointer" style={{ width: 36, height: 36 }} unoptimized />
                        <span className={`text-[15px] font-bold hidden sm:inline transition-colors ${
                            theme === "dark" && !scrolled ? "text-white" : "text-neutral-900"
                        }`}>
                            Olyxee
                        </span>
                    </Link>

                    <nav className="hidden md:flex h-full ml-auto mr-auto" aria-label="Main navigation">
                        <ul className="flex h-full items-center gap-1">
                            {menuItems.map((item, i) => {
                                const hasChildren = !!item.children?.length;
                                const isOpen = openDropdown === item.name;
                                const linkColor = theme === "dark" && !scrolled
                                    ? "text-white/60 hover:text-white"
                                    : "text-neutral-500 hover:text-neutral-900";

                                return (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.05 + i * 0.04, type: 'spring', stiffness: 400, damping: 25 }}
                                        className="relative"
                                        onMouseEnter={() => hasChildren && openDropdownNow(item.name)}
                                        onMouseLeave={() => hasChildren && closeDropdownSoon()}
                                    >
                                        {hasChildren ? (
                                            <button
                                                type="button"
                                                onFocus={() => openDropdownNow(item.name)}
                                                onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                                                aria-haspopup="menu"
                                                aria-expanded={isOpen}
                                                className={`text-[13px] font-medium transition-colors focus:outline-none px-3.5 py-1.5 inline-flex items-center gap-1 ${linkColor}`}
                                            >
                                                {item.name}
                                                <ChevronDown
                                                    className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                                    aria-hidden
                                                />
                                            </button>
                                        ) : (
                                            <Link
                                                href={item.href!}
                                                prefetch={!item.href!.startsWith('/#')}
                                                onClick={(e) => handleNavClick(e, item.href!)}
                                                className={`text-[13px] font-medium transition-colors focus:outline-none px-3.5 py-1.5 relative ${linkColor}`}
                                            >
                                                {item.name}
                                            </Link>
                                        )}

                                        {hasChildren && (
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10, scale: 0.96, filter: 'blur(8px)' }}
                                                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                                        exit={{ opacity: 0, y: -8, scale: 0.97, filter: 'blur(6px)' }}
                                                        transition={{ type: 'spring', stiffness: 320, damping: 28, mass: 0.6 }}
                                                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-[1003]"
                                                        role="menu"
                                                        aria-label={`${item.name} menu`}
                                                    >
                                                        <div
                                                            className="relative w-[16rem] max-w-[calc(100vw-2rem)] p-2 rounded-2xl overflow-hidden"
                                                            style={{
                                                                background: '#ffffff',
                                                                border: '1px solid rgba(0,0,0,0.06)',
                                                                boxShadow: '0 24px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)',
                                                            }}
                                                        >
                                                            <ul className="space-y-0.5">
                                                                {item.children!.map((child) => (
                                                                    <li key={child.name}>
                                                                        <Link
                                                                            href={child.href}
                                                                            prefetch
                                                                            role="menuitem"
                                                                            onClick={() => setOpenDropdown(null)}
                                                                            className="block px-3 py-2 rounded-lg hover:bg-neutral-100/80 active:bg-neutral-200/60 transition-colors focus:outline-none text-[14px] font-medium text-neutral-900"
                                                                        >
                                                                            {child.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-2.5 ml-auto md:ml-0 flex-shrink-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.25, type: 'spring', stiffness: 400, damping: 25 }}
                        >
                            <a
                                href="https://www.linkedin.com/company/olyxee/?viewAsMember=true"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 text-white hover:bg-black transition-all"
                                aria-label="Discord"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                                </svg>
                            </a>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 25 }}
                            className="relative"
                            onMouseEnter={() => openDropdownNow("Sign in")}
                            onMouseLeave={closeDropdownSoon}
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "Sign in" ? null : "Sign in")
                                }
                                onFocus={() => openDropdownNow("Sign in")}
                                aria-haspopup="menu"
                                aria-expanded={openDropdown === "Sign in"}
                                className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 text-[12px] sm:text-[13px] font-medium bg-neutral-900 text-white rounded-full hover:bg-black transition-all focus:outline-none"
                            >
                                Sign in
                                <ChevronDown
                                    className={`w-3 h-3 transition-transform ${openDropdown === "Sign in" ? 'rotate-180' : ''}`}
                                    aria-hidden
                                />
                            </button>
                            <AnimatePresence>
                                {openDropdown === "Sign in" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.96, filter: 'blur(8px)' }}
                                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: -8, scale: 0.97, filter: 'blur(6px)' }}
                                        transition={{ type: 'spring', stiffness: 320, damping: 28, mass: 0.6 }}
                                        className="absolute right-0 top-full pt-3 z-[1003]"
                                        role="menu"
                                        aria-label="Sign in menu"
                                    >
                                        <div
                                            className="relative w-[14rem] max-w-[calc(100vw-2rem)] p-2 rounded-2xl overflow-hidden"
                                            style={{
                                                background: '#ffffff',
                                                border: '1px solid rgba(0,0,0,0.06)',
                                                boxShadow: '0 24px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)',
                                            }}
                                        >
                                            <ul className="space-y-0.5">
                                                {SIGNIN_OPTIONS.map((opt) => (
                                                    <li key={opt.name}>
                                                        <a
                                                            href={opt.href}
                                                            target={opt.external ? "_blank" : undefined}
                                                            rel={opt.external ? "noopener noreferrer" : undefined}
                                                            role="menuitem"
                                                            onClick={() => setOpenDropdown(null)}
                                                            className="block px-3 py-2 rounded-lg hover:bg-neutral-100/80 active:bg-neutral-200/60 transition-colors focus:outline-none text-[14px] font-medium text-neutral-900"
                                                        >
                                                            {opt.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                        <div className="md:hidden">
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                onClick={() => setMobileMenuOpen(true)}
                                className={`transition-all hover:opacity-80 active:scale-90 focus:outline-none rounded-full p-2 ${
                                    theme === "dark" && !scrolled ? "hover:bg-white/20 text-white" : "hover:bg-white/40"
                                }`}
                                aria-label="Open menu"
                            >
                                <Menu className={`h-5 w-5 ${theme === "dark" && !scrolled ? "text-white" : "text-neutral-800"}`} />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 bg-black/25 backdrop-blur-md z-[1001] md:hidden"
                            onClick={handleBackdropClick}
                            aria-hidden="true"
                        />
                        <motion.div
                            initial={{ x: '100%', opacity: 0.5 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                            className="fixed right-3 top-3 bottom-3 w-[calc(100%-24px)] max-w-sm z-[1002] md:hidden overflow-hidden flex flex-col"
                            style={{
                                background: 'rgba(255,255,255,0.75)',
                                backdropFilter: 'blur(40px) saturate(200%)',
                                WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                                borderRadius: 28,
                                border: 'none',
                                boxShadow: '0 24px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)',
                            }}
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="flex items-center justify-between p-5 pb-4">
                                <div className="flex items-center gap-2.5">
                                    <Image src="/Logo/Olyxee_Logo_Knockout.png" alt="Olyxee Logo" width={26} height={26} unoptimized />
                                    <span className="font-bold text-neutral-900 text-[15px]">Olyxee</span>
                                </div>
                                <button
                                    ref={firstFocusableRef}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 hover:bg-white/60 rounded-full transition-all active:scale-90 focus:outline-none"
                                    aria-label="Close menu"
                                >
                                    <X className="h-5 w-5 text-neutral-700" />
                                </button>
                            </div>

                            <div className="mx-5 h-px bg-neutral-200/50" />

                            <nav className="flex-1 min-h-0 p-5 overflow-y-auto">
                                <ul className="space-y-0.5">
                                    {menuItems.map((item, i) => {
                                        const hasChildren = !!item.children?.length;
                                        const expanded = !!mobileExpanded[item.name];
                                        return (
                                            <motion.li
                                                key={item.name}
                                                initial={{ opacity: 0, x: 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.08 + i * 0.05, type: 'spring', stiffness: 400, damping: 30 }}
                                            >
                                                {hasChildren ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => setMobileExpanded((s) => ({ ...s, [item.name]: !s[item.name] }))}
                                                            aria-expanded={expanded}
                                                            className="w-full flex items-center justify-between py-3 px-4 hover:bg-blue-50/50 active:bg-blue-50/80 rounded-2xl transition-all text-neutral-900 font-medium text-[15px] focus:outline-none hover:text-blue-600"
                                                        >
                                                            {item.name}
                                                            <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                                                        </button>
                                                        <AnimatePresence initial={false}>
                                                            {expanded && (
                                                                <motion.ul
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                                                    className="overflow-hidden pl-3 pt-1"
                                                                >
                                                                    {item.children!.map((child) => (
                                                                        <li key={child.name}>
                                                                            <Link
                                                                                href={child.href}
                                                                                prefetch
                                                                                onClick={() => setMobileMenuOpen(false)}
                                                                                className="flex items-center justify-between py-2.5 px-4 hover:bg-blue-50/50 active:bg-blue-50/80 rounded-2xl transition-all text-neutral-700 hover:text-blue-600 text-[14px] focus:outline-none"
                                                                            >
                                                                                {child.name}
                                                                                <span className="text-neutral-400 text-xs">→</span>
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </motion.ul>
                                                            )}
                                                        </AnimatePresence>
                                                    </>
                                                ) : (
                                                    <Link
                                                        href={item.href!}
                                                        prefetch={!item.href!.startsWith('/#')}
                                                        className="flex items-center justify-between py-3 px-4 hover:bg-blue-50/50 active:bg-blue-50/80 rounded-2xl transition-all text-neutral-900 font-medium text-[15px] focus:outline-none hover:text-blue-600"
                                                        onClick={(e) => { handleNavClick(e, item.href!); setMobileMenuOpen(false); }}
                                                    >
                                                        {item.name}
                                                        <span className="text-neutral-400 text-xs">→</span>
                                                    </Link>
                                                )}
                                            </motion.li>
                                        );
                                    })}
                                </ul>
                            </nav>

                            <motion.div
                                className="shrink-0 p-5 pt-4 border-t border-neutral-200/50 flex flex-col gap-1.5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 25 }}
                            >
                                <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.22em] px-1 mb-1">
                                    Sign in to
                                </p>
                                {SIGNIN_OPTIONS.map((opt) => (
                                    <a
                                        key={opt.name}
                                        href={opt.href}
                                        target={opt.external ? "_blank" : undefined}
                                        rel={opt.external ? "noopener noreferrer" : undefined}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 bg-white/70 hover:bg-white border border-neutral-200/70 rounded-2xl active:scale-[0.98] transition-all focus:outline-none"
                                    >
                                        <div className="min-w-0 flex-1 text-left">
                                            <p className="text-[14px] font-semibold text-neutral-900 leading-tight">
                                                {opt.name}
                                            </p>
                                            <p className="text-[11px] text-neutral-500 font-light leading-tight mt-0.5">
                                                {opt.description}
                                            </p>
                                        </div>
                                        {opt.external && (
                                            <ArrowUpRight
                                                className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0"
                                                aria-hidden
                                            />
                                        )}
                                    </a>
                                ))}
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default memo(Header);
