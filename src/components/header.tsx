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
    { name: "Business", href: "/enterprise" },
    { name: "Pricing", href: "/pricing" },
    { name: "Careers", href: "/careers" },
    { name: "About Us", href: "/about" },
];

type SignInOption = {
    name: string;
    description: string;
    href: string;
    external: boolean;
};

const SIGNIN_OPTIONS: SignInOption[] = [
    {
        name: "Olyxee Logistics",
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
                                href="https://huggingface.co/Olyxee"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 text-white hover:bg-black transition-all"
                                aria-label="Olyxee on Hugging Face"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624"/>
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
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/30 z-[1001] md:hidden"
                            onClick={handleBackdropClick}
                            aria-hidden="true"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                            className="fixed inset-y-0 right-0 w-[86%] max-w-sm z-[1002] md:hidden bg-white flex flex-col shadow-[-8px_0_32px_rgba(0,0,0,0.08)]"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Menu"
                        >
                            <div className="flex items-center justify-between h-16 px-5 border-b border-neutral-200">
                                <div className="flex items-center gap-2.5">
                                    <Image src="/Logo/Olyxee_Logo_Knockout.png" alt="Olyxee Logo" width={24} height={24} unoptimized />
                                    <span className="font-semibold text-neutral-900 text-[15px]">Olyxee</span>
                                </div>
                                <button
                                    ref={firstFocusableRef}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-mr-2 p-2 rounded-md text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                                    aria-label="Close menu"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <nav className="flex-1 min-h-0 overflow-y-auto">
                                <ul className="divide-y divide-neutral-100">
                                    {menuItems.map((item) => {
                                        const hasChildren = !!item.children?.length;
                                        const expanded = !!mobileExpanded[item.name];
                                        return (
                                            <li key={item.name}>
                                                {hasChildren ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => setMobileExpanded((s) => ({ ...s, [item.name]: !s[item.name] }))}
                                                            aria-expanded={expanded}
                                                            className="w-full flex items-center justify-between px-5 py-4 text-left text-neutral-900 font-medium text-[16px] hover:bg-neutral-50 focus:outline-none focus-visible:bg-neutral-50"
                                                        >
                                                            {item.name}
                                                            <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                                                        </button>
                                                        {expanded && (
                                                            <ul className="pb-2 bg-neutral-50/60">
                                                                {item.children!.map((child) => (
                                                                    <li key={child.name}>
                                                                        <Link
                                                                            href={child.href}
                                                                            prefetch
                                                                            onClick={() => setMobileMenuOpen(false)}
                                                                            className="block px-5 py-2.5 pl-8 text-neutral-700 text-[15px] hover:text-neutral-900 focus:outline-none focus-visible:underline"
                                                                        >
                                                                            {child.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </>
                                                ) : (
                                                    <Link
                                                        href={item.href!}
                                                        prefetch={!item.href!.startsWith('/#')}
                                                        className="block px-5 py-4 text-neutral-900 font-medium text-[16px] hover:bg-neutral-50 focus:outline-none focus-visible:bg-neutral-50"
                                                        onClick={(e) => { handleNavClick(e, item.href!); setMobileMenuOpen(false); }}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>

                            <div className="shrink-0 px-5 py-4 border-t border-neutral-200">
                                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.18em] mb-2">Sign in</p>
                                <ul className="space-y-1">
                                    {SIGNIN_OPTIONS.map((opt) => (
                                        <li key={opt.name}>
                                            <a
                                                href={opt.href}
                                                target={opt.external ? "_blank" : undefined}
                                                rel={opt.external ? "noopener noreferrer" : undefined}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between py-2 text-[15px] text-neutral-800 hover:text-neutral-900 focus:outline-none focus-visible:underline"
                                            >
                                                {opt.name}
                                                {opt.external && <ArrowUpRight className="w-4 h-4 text-neutral-400" aria-hidden />}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default memo(Header);
