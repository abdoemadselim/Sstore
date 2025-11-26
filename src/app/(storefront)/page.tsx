// Libs
import { Suspense } from "react"

// Components
import { CategorySelection, Hero, FeaturedProducts } from "@/components/storefront"
import { FeaturedProductsSkeleton } from "@/components/storefront/featuredProducts/FeaturedProducts"
import type { Metadata } from "next"

// Metadata
export const metadata: Metadata = {
    title: "Sstore - Your Online Store",
    description: "Shop the latest products at Sstore. Discover featured items, trending categories, and exclusive deals.",
    openGraph: {
        title: "Sstore - Your Online Store",
        description: "Shop the latest products at Sstore. Discover featured items, trending categories, and exclusive deals.",
        url: "https://www.sstore.com/",
        siteName: "Sstore",
        images: [
            {
                url: "https://www.sstore.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Sstore Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
}

export default function Home() {
    return (
        <div>
            <Hero />
            <CategorySelection />
            <Suspense fallback={<FeaturedProductsSkeleton />}>
                <FeaturedProducts />
            </Suspense>
        </div>
    )
}
