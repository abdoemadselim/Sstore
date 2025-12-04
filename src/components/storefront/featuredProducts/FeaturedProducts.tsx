// Libs
import prisma from "@/lib/db";
import { Package } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache.js";

// Components
import { ProductCard } from "@/components/storefront";
import { ProductCardSkeleton } from "@/components/storefront/productCard/ProductCard";

const getProducts = async () => {
    'use cache'
    cacheLife("max")
    cacheTag("products")

    const products = prisma.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
            slug: true,
            images: true
        },
        where: {
            status: "published",
            featured: true
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 3
    })

    return products;
}

export default async function FeaturedProducts() {
    const products = await getProducts()

    return (
        <section className="py-40">
            <h2 className="text-3xl font-extrabold text-center md:text-start">Featured Products</h2>
            {
                products?.length ? (
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-8 pt-6">
                        {
                            products.map((product) => (
                                <ProductCard key={product.id} item={product} />
                            ))}
                    </div>
                ) : (
                    <div className="flex justify-center flex-col items-center gap-4 mt-6">
                        <Package size={80} className="text-primary" />
                        <p className="text-center text-lg text-muted-foreground pt-2">No products found</p>
                    </div>
                )
            }
        </section>
    )
}

export function FeaturedProductsSkeleton() {
    return (
        <section className="py-40">
            <h2 className="text-3xl font-extrabold text-center md:text-start">Featured Products</h2>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-8 pt-6">
                {
                    [1, 2, 3].map((item) => (
                        <ProductCardSkeleton key={item} />
                    ))
                }
            </div>
        </section>
    )
}