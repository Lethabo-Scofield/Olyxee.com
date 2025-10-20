"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingCart, Globe, Menu } from "lucide-react";
import OlyxeeTrans from "@/assets/Logo/3d_olyxee_Logo.png";

const menuItems = [
    { name: "Products", href: "/products" },
    { name: "Docs", href: "/docs" },
    { name: "Community", href: "/community" },
    { name: "Solutions", href: "#" },
    { name: "Support", href: "#" },
];

export default function HeaderNavigation() {
    return (
        <header className="sticky top-0 z-[1000] h-16 w-full bg-black text-white">
            <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-8">
                <div className="flex h-full items-center gap-10">
                    <Link href="/" aria-label="Navigate to main page">
                        <Image src={OlyxeeTrans} alt="Olyxee Logo" width={32} height={32} />
                    </Link>

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
                    <div className="hidden items-center gap-6 lg:flex">
                        <button className="transition-opacity hover:opacity-80">
                            <User className="h-5 w-5" />
                            <span className="sr-only">User account</span>
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
}
