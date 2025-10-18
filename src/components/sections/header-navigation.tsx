"use client";
import Link from 'next/link';
import { Search, User, ShoppingCart, Globe, Menu } from 'lucide-react';
import React from 'react';

const JetBrainsLogo = () => (
    <Link href="/" aria-label="Navigate to main page">
        <svg
            className="h-8 w-8"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14 46V18h7.525v22.667h13.623V46H14zM50 46V18h-7.525v22.667h-13.62V46H50z"
                fill="white"
            />
            <path
                d="m55.333 18 6.167 6.167-22.5 22.5-6.167-6.167L48.5 24.833l-6.167-6.166H57l-1.667-0.667z"
                fill="#FF006E"
            />
            <path
                d="m8.667 46-6.167-6.167L25 17.333l6.167 6.167-15.834 15.833 6.167 6.167H7l1.667-0.5z"
                fill="#05F"
            />
        </svg>
    </Link>
);

const menuItems = [
    { name: 'AI', href: '#' },
    { name: 'Developer Tools', href: '#' },
    { name: 'Team Tools', href: '#' },
    { name: 'Education', href: '#' },
    { name: 'Solutions', href: '#' },
    { name: 'Support', href: '#' },
    { name: 'Store', href: '#' },
];

const HeaderNavigation = () => {
    return (
        <header className="sticky top-0 z-[1000] h-16 w-full bg-black font-sans text-white">
            <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-8">
                <div className="flex h-full items-center gap-10">
                    <JetBrainsLogo />
                    <nav className="hidden h-full lg:flex">
                        <ul className="flex h-full items-center gap-8">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm font-normal transition-opacity hover:opacity-80"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                
                <div className="flex items-center gap-6">
                    <button className="transition-opacity hover:opacity-80">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </button>
                    
                    <div className="hidden items-center gap-6 lg:flex">
                        <button className="transition-opacity hover:opacity-80">
                            <User className="h-5 w-5" />
                            <span className="sr-only">User account</span>
                        </button>
                        <button className="transition-opacity hover:opacity-80">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Shopping cart</span>
                        </button>
                        <button className="transition-opacity hover:opacity-80">
                            <Globe className="h-5 w-5" />
                            <span className="sr-only">Language selector</span>
                        </button>
                    </div>

                    <button className="transition-opacity hover:opacity-80 lg:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderNavigation;