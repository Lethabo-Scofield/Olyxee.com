'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('up');
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    const menuItems = [
        { name: "Products", href: "/products" },
        { name: "Docs", href: "/docs" },
        { name: "Community", href: "/community" },
        { name: "Support", href: "/support" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollDirection(currentScrollY > lastScrollY && currentScrollY > 50 ? 'down' : 'up');
            setLastScrollY(currentScrollY);
            setScrolled(currentScrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <motion.header
            className="fixed top-0 z-[1000] w-full px-6 md:px-8 transition-all"
            animate={{
                y: scrollDirection === 'down' ? -100 : 0,
            }}
            style={{
                justifyContent: scrolled ? 'center' : 'space-between',
                borderRadius: scrolled ? 16 : 0,
                maxWidth: scrolled ? 800 : '100%',
                margin: scrolled ? '0 auto' : 0,
                background: scrolled ? 'rgba(255,255,255,0.6)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
            }}
            transition={{ type: 'tween', duration: 0.3 }}
        >
            <div className={`flex items-center ${scrolled ? 'justify-center gap-6' : 'justify-between'} w-full h-16`}>
                {!scrolled && (
                    <div className="flex items-center gap-10">
                        <Link href="/">
                            <Image
                                src="/Logo/Olyxee_trans.png"
                                alt="Olyxee Logo"
                                width={32}
                                height={32}
                                className="cursor-pointer"
                            />
                        </Link>
                        <nav className="hidden lg:flex h-full">
                            <ul className="flex h-full items-center gap-8">
                                {menuItems.map(item => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-black text-sm font-normal transition-colors hover:text-gray-700"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}

                {scrolled && (
                    <nav className="hidden lg:flex gap-6">
                        {menuItems.map(item => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-black text-sm font-normal transition-colors hover:text-gray-700"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                )}

                <div className="flex items-center gap-4">
                    <button className="text-white p-2 hover:opacity-80 transition-opacity rounded-full bg-indigo-500">
                        <FaDiscord className="w-5 h-5" />
                    </button>
                    <button className="px-5 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors font-semibold">
                        Deploy Model
                    </button>

                    <div className="lg:hidden">
                        <button
                            className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-[1002] lg:hidden"
                    >
                        <div className="flex items-center justify-between p-6">
                            <Image src="/Logo/Olyxee_trans.png" alt="Olyxee Logo" width={32} height={32} />
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <nav className="p-6">
                            <ul className="space-y-2">
                                {menuItems.map(item => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="flex items-center justify-between py-3 px-4 hover:bg-gray-100 transition-colors text-black"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-8 flex flex-col gap-4 items-center">
                                <button className="w-full py-3 bg-indigo-500 text-white rounded-full flex items-center justify-center gap-2">
                                    <FaDiscord className="w-5 h-5" />
                                    Join Discord
                                </button>
                                <button className="w-full py-3 bg-gray-200 text-black rounded-full hover:bg-gray-300 font-semibold">
                                    Deploy Model
                                </button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
