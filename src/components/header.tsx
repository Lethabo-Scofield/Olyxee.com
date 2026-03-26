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
    { name: "Lab", href: "/lab" },
    { name: "Research", href: "/research" },
    { name: "Docs", href: "/docs" },
    { name: "Community", href: "/community" },
];

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
    const [scrolled, setScrolled] = useState(false);
    const lastScrollY = useRef(0);
    const firstFocusableRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) setScrollDirection('down');
            else setScrollDirection('up');
            setScrolled(currentScrollY > 80);
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
                className="fixed top-0 left-0 right-0 z-[1000] flex justify-center px-4 sm:px-6 md:px-8 transition-all"
                animate={{ y: scrollDirection === 'down' ? -100 : 0 }}
                transition={{ type: 'tween', duration: 0.3 }}
            >
                <motion.div
                    className="flex items-center justify-center gap-4 w-full h-16 relative"
                    initial={{ maxWidth: 1200 }}
                    animate={{
                        maxWidth: scrolled ? 900 : 1200,
                        borderRadius: scrolled ? 16 : 0,
                        background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0)',
                        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
                        boxShadow: scrolled ? '0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)' : '0 0 0 0 rgba(0,0,0,0)',
                    }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    style={{ WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none', paddingLeft: 16, paddingRight: 16 }}
                >
                    <Link href="/" prefetch className="focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-lg transition-transform hover:scale-110 flex items-center gap-2">
                        <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee Logo" width={32} height={32} className="cursor-pointer" />
                        {!scrolled && <span className="text-lg font-bold text-black hidden sm:inline">Olyxee</span>}
                    </Link>

                    <nav className="hidden lg:flex h-full ml-6" aria-label="Main navigation">
                        <ul className="flex h-full items-center gap-6">
                            {menuItems.map(item => (
                                <li key={item.name} className="relative">
                                    <Link
                                        href={item.href}
                                        prefetch
                                        className="text-black text-sm font-normal transition-all hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded px-2 py-1 relative group"
                                    >
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                        <button className="hidden sm:flex text-white p-2 hover:opacity-80 hover:scale-110 active:scale-95 transition-all rounded-full bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" aria-label="Join Discord">
                            <FaDiscord className="w-5 h-5" />
                        </button>
                        <Link href="/developers" className="hidden md:inline-flex px-5 py-2 bg-gray-900 text-white rounded-full hover:bg-black hover:shadow-md active:scale-95 transition-all font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                            Get Started
                        </Link>

                        <div className="lg:hidden">
                            <button onClick={() => setMobileMenuOpen(true)} className="transition-all hover:opacity-80 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded p-1" aria-label="Open menu">
                                <Menu className="h-6 w-6" />
                            </button>
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
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[1001] lg:hidden"
                            onClick={handleBackdropClick}
                            aria-hidden="true"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-[1002] lg:hidden shadow-2xl"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                    <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee Logo" width={28} height={28} />
                                    <span className="font-bold text-black">Olyxee</span>
                                </div>
                                <button ref={firstFocusableRef} onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-900" aria-label="Close menu">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <nav className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
                                <ul className="space-y-1">
                                    {menuItems.map((item, i) => (
                                        <motion.li key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                                            <Link href={item.href} prefetch className="flex items-center justify-between py-3 px-4 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all text-black font-medium focus:outline-none focus:ring-2 focus:ring-gray-900" onClick={() => setMobileMenuOpen(false)}>
                                                {item.name} <span className="text-gray-400">→</span>
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                                <motion.div className="mt-8 pt-8 border-t border-gray-200 flex flex-col gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.3 }}>
                                    <Link href="/developers" className="w-full py-3 bg-gray-900 text-white rounded-full flex items-center justify-center gap-2 hover:bg-black hover:shadow-lg active:scale-95 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" onClick={() => setMobileMenuOpen(false)}>
                                        Get Started
                                    </Link>
                                    <button className="w-full py-3 bg-white text-black border border-gray-200 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                                        <FaDiscord className="w-5 h-5" /> Join Discord
                                    </button>
                                </motion.div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default memo(Header);
