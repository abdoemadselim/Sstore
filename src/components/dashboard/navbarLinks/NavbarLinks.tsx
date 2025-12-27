'use client'

// Libs
import Link from "next/link"
import { usePathname } from "next/navigation.js"

const navLinks = [
    {
        href: "/dashboard",
        text: "Dashboard"
    },
    {
        href: "/dashboard/orders",
        text: "Orders"
    },
    {
        href: "/dashboard/products",
        text: "Products"
    },
    {
        href: "/dashboard/banners",
        text: "Banners"
    }
]

export default function NavbarLinks() {
    const pathName = usePathname()
    return (
        navLinks.map((link) => (
            <Link
                key={link.text}
                href={link.href}
                className={`${pathName == link.href.toLowerCase() && 'bg-primary/80 hover:bg-primary/80 text-white'} hover:bg-gray-200 rounded-sm px-2 py-1`}
            >{link.text}
            </Link>
        ))
    )
}
