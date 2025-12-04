// Libs
import prisma from "@/lib/db"
import { notFound } from "next/navigation";
import { Package } from "lucide-react";
import { Suspense } from "react";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache.js";

// Components
import { ProductCard } from "@/components/storefront";
import { ProductCardSkeleton } from "@/components/storefront/productCard/ProductCard";

export async function generateStaticParams() {
    return [{ category: "men" }, { category: "women" }, { category: "kids" }, { category: "all" }]
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params
    let title = "", description = ""

    switch (category) {
        case "all":
            title = "All Products - Sstore"
            description = "Browse all published products at Sstore. Discover the latest trends and popular items."
            break;
        case "men":
            title = "Men's Products - Sstore"
            description = "Shop our curated collection of men's products at Sstore. Find clothing, accessories, and more."
            break;
        case "women":
            title = "Women's Products - Sstore"
            description = "Explore our women's products at Sstore. Stylish clothing, accessories, and trending items."
            break;
        case "kids":
            title = "Kids' Products - Sstore"
            description = "Discover fun and safe products for kids at Sstore. Toys, clothes, and more for your little ones."
            break;
        default:
            title = "Products - Sstore"
            description = "Shop products at Sstore. Find the latest items in our store."
            break;
    }

    return {
        title,
        description,
    }
}

const getProducts = async (category: string) => {
    switch (category) {
        case "all": {
            const products = await prisma.product.findMany({
                where: {
                    status: "published"
                },
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    name: true,
                    description: true,
                    slug: true,
                    price: true,
                    images: true,
                    category: true,
                }
            })

            return {
                title: "All Products",
                products: products
            }
        }
        case "men": {
            const products = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "men"
                },
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    name: true,
                    description: true,
                    slug: true,
                    price: true,
                    images: true,
                    category: true,
                }
            })

            return {
                title: "Products for Men",
                products: products
            };
        }
        case "women": {
            const products = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "women"
                },
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    name: true,
                    description: true,
                    slug: true,
                    price: true,
                    images: true,
                    category: true,
                }
            })

            return {
                title: "Products for Women",
                products: products
            };
        }
        case "kids": {
            const products = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "kids"
                },
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    name: true,
                    description: true,
                    slug: true,
                    price: true,
                    images: true,
                    category: true,
                }
            })

            return {
                title: "Products for Kids",
                products: products
            };
        }
        default: {
            return notFound()
        }
    }
}

export default function ProductsCategoryPage({ params }: {
    params: Promise<{ category: string }>
}) {
    const categoryParma = params.then((sp) => ({ category: sp.category }))
    return (
        <Suspense fallback={<ProductsSectionSkeleton />}>
            <ProductsCategoryContent categoryParam={categoryParma} />
        </Suspense>
    )
}

async function ProductsCategoryContent({ categoryParam }: { categoryParam: Promise<{ category: string }> }) {
    'use cache'
    cacheLife("max")

    const { category } = await categoryParam

    cacheTag("products", `products-${category}`)

    return (
        <section>
            <h1 className="text-4xl font-extrabold mb-2 pt-6 tracking-tight">Products for {category.substring(0, 1).toUpperCase()}{category.slice(1)}</h1>
            <ProductsSection category={category} />
        </section>
    )
}

async function ProductsSection({ category }: { category: string }) {
    const data = await getProducts(category)
    return (
        <>
            {data.products.length ? (
                <section className="grid lg:grid-cols-3 sm:grid-cols-2 sm:gap-4 gap-8 pt-2">
                    {
                        data.products.map((product) => (
                            <ProductCard key={product.slug} item={product} />
                        ))
                    }
                </section>
            ) : (
                <div className="flex justify-center flex-col items-center gap-4 pt-8">
                    <Package size={60} className="text-primary" />
                    <p className="text-center text-muted-foreground">No products found for this category</p>
                </div>
            )
            }
        </>
    )
}

function ProductsSectionSkeleton() {
    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 sm:gap-4 gap-12 pt-2">
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <ProductCardSkeleton key={item} />
                ))
            }
        </div>
    )
}