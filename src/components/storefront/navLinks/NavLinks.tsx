'use client'

// Libs
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/products/all",
        label: "All Products"
    },
    {
        href: "/products/men",
        label: "Men"
    },
    {
        href: "/products/women",
        label: "Women"
    },
    {
        href: "/products/kids",
        label: "Kids"
    },
]

export default function NavLinks() {
    const pathName = usePathname()
    return (
        <nav className="flex gap-4 md:ml-8 md:items-center flex-col md:flex-row">
            {
                links.map((link) => (
                    <Link
                        href={link.href}
                        key={link.label}
                        className={`font-medium ${pathName == link.href.toLowerCase() && 'bg-primary/80 hover:bg-primary/85 text-white'} hover:bg-gray-200 rounded-sm px-2 py-1`}
                    >
                        {link.label}
                    </Link>
                ))
            }
        </nav>
    )
}