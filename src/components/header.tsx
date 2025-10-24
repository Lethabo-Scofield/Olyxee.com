'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    const [productsOpen, setProductsOpen] = useState(false);

    const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
    const firstFocusableRef = useRef<HTMLButtonElement | null>(null);

    const menuItems = [
        { name: "Products", href: "#", hasDropdown: true },
        { name: "Docs", href: "/docs" },
        { name: "Community", href: "/community" },
        { name: "Support", href: "/support" },
    ];

    const productsDropdown = [
        {
            name: "Grysics",
            href: "/products/grysics",
            description: "Next-level AI simulation & edge deployment tools.",
            bg: "bg-gray-100",
            icon: "/Logo/Olyxee_Logo.png",
            image: "/Products/product_2.jpg"
        },
        {
            name: "Neural Reality Network",
            href: "/products/nrn",
            description: "Interpretable AI that sees and explains reality.",
            bg: "bg-gray-100",
            icon: "/Logo/Olyxee_Logo.png",
            image: "/Products/product.jpg"
        },
    ];


    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    setScrollDirection(currentScrollY > lastScrollY && currentScrollY > 50 ? 'down' : 'up');
                    setLastScrollY(currentScrollY);
                    setScrolled(currentScrollY > 80);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleMouseEnterDropdown = useCallback(() => {
        if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
        setProductsOpen(true);
    }, []);

    const handleMouseLeaveDropdown = useCallback(() => {
        dropdownTimerRef.current = setTimeout(() => setProductsOpen(false), 150);
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
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

    const menuItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.3, ease: 'easeOut' } })
    };

    return (
        <>
            <motion.header
                className="fixed top-0 z-[1000] w-full px-6 md:px-8 transition-all"
                animate={{ y: scrollDirection === 'down' ? -100 : 0 }}
                style={{
                    justifyContent: scrolled ? 'center' : 'space-between',
                    borderRadius: scrolled ? 16 : 0,
                    maxWidth: scrolled ? 800 : '100%',
                    margin: scrolled ? '0 auto' : 0,
                    background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                    boxShadow: scrolled ? '0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)' : 'none',
                }}
                transition={{ type: 'tween', duration: 0.3 }}
            >
                <div className={`flex items-center ${scrolled ? 'justify-center gap-6' : 'justify-between'} w-full h-16 relative`}>
                    <Link href="/" aria-label="Home" className="focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-lg transition-transform hover:scale-110">
                        <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee Logo" width={32} height={32} className="cursor-pointer" />
                    </Link>

                    <nav className="hidden lg:flex h-full ml-6" aria-label="Main navigation">
                        <ul className="flex h-full items-center gap-8">
                            {menuItems.map(item => (
                                <li
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => item.hasDropdown && handleMouseEnterDropdown()}
                                    onMouseLeave={() => item.hasDropdown && handleMouseLeaveDropdown()}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-black text-sm font-normal transition-all hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded px-2 py-1 relative group"
                                        aria-haspopup={item.hasDropdown ? "true" : undefined}
                                        aria-expanded={item.hasDropdown ? productsOpen : undefined}
                                    >
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                                    </Link>

                                    {item.hasDropdown && (
                                        <AnimatePresence>
                                            {productsOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                                    className="absolute left-0 top-full mt-2 bg-white shadow-xl rounded-xl px-10 py-8 z-50 flex gap-8 border border-gray-200"
                                                    role="menu"
                                                >
                                                    {productsDropdown.map(product => (
                                                        <Link
                                                            key={product.name}
                                                            href={product.href}
                                                            className="relative flex flex-col min-w-[220px] p-6 rounded-xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-900 group"
                                                            role="menuitem"
                                                        >
                                                            {product.image && (
                                                                <Image
                                                                    src={product.image}
                                                                    alt=""
                                                                    fill
                                                                    className="absolute inset-0 object-cover opacity-10 -z-10 transition-opacity group-hover:opacity-20"
                                                                />
                                                            )}
                                                            {product.icon && (
                                                                <div className="mb-4 transition-transform group-hover:scale-105">
                                                                    <Image src={product.icon} alt="" width={40} height={40} />
                                                                </div>
                                                            )}
                                                            <h3 className="text-lg font-bold text-black mb-2 group-hover:text-gray-800 transition-colors">{product.name}</h3>
                                                            <p className="text-sm text-gray-700 mb-4 flex-grow">{product.description}</p>
                                                            <span className="text-gray-900 font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                                                Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4 ml-auto">
                        <button className="text-white p-2 hover:opacity-80 hover:scale-110 active:scale-95 transition-all rounded-full bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" aria-label="Join Discord">
                            <FaDiscord className="w-5 h-5" />
                        </button>
                        <button className="px-5 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400 hover:shadow-md active:scale-95 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                            Deploy Model
                        </button>

                        <div className="lg:hidden">
                            <button onClick={() => setMobileMenuOpen(true)} className="transition-all hover:opacity-80 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded p-1" aria-label="Open menu">
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
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
                                <Image src="/Logo/Olyxee_trans.png" alt="Olyxee Logo" width={32} height={32} />
                                <button ref={firstFocusableRef} onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-900" aria-label="Close menu">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <nav className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
                                <ul className="space-y-2">
                                    {menuItems.map((item, i) => (
                                        <motion.li key={item.name} custom={i} initial="hidden" animate="visible" variants={menuItemVariants}>
                                            <Link href={item.href} className="flex items-center justify-between py-3 px-4 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all text-black font-medium focus:outline-none focus:ring-2 focus:ring-gray-900" onClick={() => setMobileMenuOpen(false)}>
                                                {item.name} <span className="text-gray-400">→</span>
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                                <motion.div className="mt-8 pt-8 border-t border-gray-200 flex flex-col gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.3 }}>
                                    <button className="w-full py-3 bg-black text-white rounded-full flex items-center justify-center gap-2 hover:bg-gray-900 hover:shadow-lg active:scale-95 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                                        <FaDiscord className="w-5 h-5" /> Join Discord
                                    </button>
                                    <button className="w-full py-3 bg-gray-300 text-black rounded-full hover:bg-gray-400 hover:shadow-md active:scale-95 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                                        Deploy Model
                                    </button>
                                </motion.div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
