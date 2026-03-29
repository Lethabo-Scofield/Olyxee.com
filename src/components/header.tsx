'use client';

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

const menuItems = [
    { name: "About", href: "/about" },
    { name: "Grysics", href: "/products/grysics" },
    { name: "EdgeAI", href: "/edgeai" },
    { name: "Docs", href: "/docs" },
    { name: "Community", href: "/community" },
];

const Header = () => {
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
                setVisible(true);
                setScrolled(false);
            } else if (delta > 4) {
                setVisible(false);
                setScrolled(true);
            } else if (delta < -4) {
                setVisible(true);
                setScrolled(true);
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
                className="fixed top-0 left-0 right-0 z-[1000] flex justify-center px-3 sm:px-5 pt-3"
                initial={{ y: 0, opacity: 1 }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            >
                <motion.div
                    className="flex items-center w-full h-14 relative"
                    animate={{
                        maxWidth: scrolled ? 820 : 1100,
                        background: scrolled
                            ? 'rgba(255, 255, 255, 0.55)'
                            : 'rgba(255, 255, 255, 0.35)',
                        boxShadow: scrolled
                            ? '0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)'
                            : '0 4px 20px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.4)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                        maxWidth: 1100,
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        border: '1px solid rgba(255,255,255,0.45)',
                        borderRadius: 50,
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}
                >
                    <Link href="/" prefetch className="focus:outline-none rounded-full transition-transform hover:scale-105 flex items-center gap-2.5 flex-shrink-0">
                        <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee Logo" width={30} height={30} className="cursor-pointer" />
                        <motion.span
                            className="text-[15px] font-bold text-neutral-900 hidden sm:inline"
                            animate={{ opacity: scrolled ? 0 : 1, width: scrolled ? 0 : 'auto' }}
                            transition={{ duration: 0.2 }}
                        >
                            Olyxee
                        </motion.span>
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
                                        className="text-neutral-700 text-[13px] font-medium transition-all hover:text-blue-600 hover:bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 rounded-full px-3.5 py-1.5 relative"
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
                            <FaDiscord className="w-4 h-4" />
                        </motion.button>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.35, type: 'spring', stiffness: 400, damping: 25 }}
                        >
                            <Link href="/developers" className="hidden md:inline-flex px-5 py-1.5 bg-neutral-900 text-white rounded-full hover:bg-black active:scale-95 transition-all font-semibold text-[13px] focus:outline-none shadow-sm">
                                Get Started
                            </Link>
                        </motion.div>

                        <div className="lg:hidden">
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                onClick={() => setMobileMenuOpen(true)}
                                className="transition-all hover:opacity-80 active:scale-90 focus:outline-none rounded-full p-2 hover:bg-white/40"
                                aria-label="Open menu"
                            >
                                <Menu className="h-5 w-5 text-neutral-800" />
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
                                    href="/developers"
                                    className="w-full py-3 bg-neutral-900 text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all font-semibold text-sm focus:outline-none shadow-sm"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Get Started
                                </Link>
                                <button className="w-full py-3 bg-white/50 text-neutral-900 border border-neutral-200/50 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/70 active:scale-[0.98] transition-all font-semibold text-sm focus:outline-none">
                                    <FaDiscord className="w-4 h-4" /> Join Discord
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
