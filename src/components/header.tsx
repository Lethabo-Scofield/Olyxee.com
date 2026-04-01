'use client';

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const DiscordIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
);

const menuItems = [
    { name: "Research", href: "/about" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

const Header = ({ theme = "light" }: { theme?: "light" | "dark" }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const firstFocusableRef = useRef<HTMLButtonElement | null>(null);

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
            if (e.key === 'Escape') setMobileMenuOpen(false);
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

    const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) setMobileMenuOpen(false);
    }, []);

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-[1000] flex justify-center"
                initial={{ y: 0, opacity: 1 }}
                animate={{
                    y: scrolled && !visible ? -100 : 0,
                    opacity: scrolled && !visible ? 0 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                style={{
                    padding: scrolled ? '12px 12px 0' : '0',
                }}
            >
                <motion.div
                    className="flex items-center w-full relative"
                    initial={{ maxWidth: 1400 }}
                    animate={{
                        maxWidth: scrolled ? 820 : 1400,
                        height: scrolled ? 52 : 60,
                        borderRadius: scrolled ? 50 : 0,
                        paddingLeft: scrolled ? 16 : 16,
                        paddingRight: scrolled ? 16 : 16,
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
                        border: scrolled ? '1px solid rgba(255,255,255,0.45)' : '1px solid transparent',
                    }}
                >
                    <Link href="/" prefetch className="focus:outline-none rounded-full transition-transform hover:scale-105 flex items-center gap-2.5 flex-shrink-0">
                        <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee Logo" width={30} height={30} className="cursor-pointer" />
                        <span className={`text-[15px] font-bold hidden sm:inline transition-colors ${
                            theme === "dark" && !scrolled ? "text-white" : "text-neutral-900"
                        }`}>
                            Olyxee
                        </span>
                    </Link>

                    <nav className="hidden lg:flex h-full ml-auto mr-auto" aria-label="Main navigation">
                        <ul className="flex h-full items-center gap-1">
                            {menuItems.map((item, i) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 + i * 0.04, type: 'spring', stiffness: 400, damping: 25 }}
                                >
                                    <Link
                                        href={item.href}
                                        prefetch
                                        className={`text-[13px] font-medium transition-colors focus:outline-none px-3.5 py-1.5 relative ${
                                            theme === "dark" && !scrolled
                                                ? "text-white/60 hover:text-white"
                                                : "text-neutral-500 hover:text-neutral-900"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-2.5 ml-auto lg:ml-0 flex-shrink-0">
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 25 }}
                            className="hidden sm:flex text-white p-2 hover:scale-110 active:scale-95 transition-all rounded-full bg-neutral-900/90 backdrop-blur-sm focus:outline-none"
                            aria-label="Join Discord"
                        >
                            <DiscordIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.35, type: 'spring', stiffness: 400, damping: 25 }}
                        >
                            <Link href="/contact" className="hidden md:inline-flex px-5 py-1.5 bg-neutral-900 text-white rounded-full hover:bg-black active:scale-95 transition-all font-semibold text-[13px] focus:outline-none shadow-sm">
                                Get in Touch
                            </Link>
                        </motion.div>

                        <div className="lg:hidden">
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
                            className="fixed inset-0 bg-black/25 backdrop-blur-md z-[1001] lg:hidden"
                            onClick={handleBackdropClick}
                            aria-hidden="true"
                        />
                        <motion.div
                            initial={{ x: '100%', opacity: 0.5 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                            className="fixed right-3 top-3 bottom-3 w-[calc(100%-24px)] max-w-sm z-[1002] lg:hidden overflow-hidden"
                            style={{
                                background: 'rgba(255,255,255,0.75)',
                                backdropFilter: 'blur(40px) saturate(200%)',
                                WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                                borderRadius: 28,
                                border: '1px solid rgba(255,255,255,0.5)',
                                boxShadow: '0 24px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)',
                            }}
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="flex items-center justify-between p-5 pb-4">
                                <div className="flex items-center gap-2.5">
                                    <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee Logo" width={26} height={26} />
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

                            <nav className="p-5 overflow-y-auto h-[calc(100%-140px)]">
                                <ul className="space-y-0.5">
                                    {menuItems.map((item, i) => (
                                        <motion.li
                                            key={item.name}
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.08 + i * 0.05, type: 'spring', stiffness: 400, damping: 30 }}
                                        >
                                            <Link
                                                href={item.href}
                                                prefetch
                                                className="flex items-center justify-between py-3 px-4 hover:bg-blue-50/50 active:bg-blue-50/80 rounded-2xl transition-all text-neutral-900 font-medium text-[15px] focus:outline-none hover:text-blue-600"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                                <span className="text-neutral-400 text-xs">→</span>
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            <motion.div
                                className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2.5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 25 }}
                            >
                                <Link
                                    href="/contact"
                                    className="w-full py-3 bg-neutral-900 text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all font-semibold text-sm focus:outline-none shadow-sm"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Get in Touch
                                </Link>
                                <button className="w-full py-3 bg-white/50 text-neutral-900 border border-neutral-200/50 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/70 active:scale-[0.98] transition-all font-semibold text-sm focus:outline-none">
                                    <DiscordIcon className="w-4 h-4" /> Join Discord
                                </button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default memo(Header);
