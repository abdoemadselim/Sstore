// Libs
import prisma from "@/lib/db"
import { notFound } from "next/navigation";
import { StarIcon } from "lucide-react";
import { Suspense } from "react";
import { Metadata } from "next";

// Components
import { AddToCartForm, FeaturedProducts, ImageSlider } from "@/components/storefront";
import { FeaturedProductsSkeleton } from "@/components/storefront/featuredProducts/FeaturedProducts";
import { Skeleton } from "@/components/base/skeleton";

// Types
import { ProductType } from "@/types";

// Actions
import { addToCart } from "@/actions/cart";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params

    const product = await prisma.product.findUnique({
        where: { slug },
        select: {
            name: true,
            description: true,
            images: true,
        }
    })

    if (!product) {
        return {
            title: "Product Not Found - Sstore",
            description: "This product does not exist or has been removed."
        }
    }

    return {
        title: `${product.name} - Sstore`,
        description: product.description || `Buy ${product.name} at Sstore. Check out prices, reviews, and more.`,
        openGraph: {
            title: `${product.name} - Sstore`,
            description: product.description || `Buy ${product.name} at Sstore. Check out prices, reviews, and more.`,
            url: `https://www.sstore.com/product/${slug}`,
            siteName: "Sstore",
            images: [{ url: product.images[0], width: 1200, height: 630, alt: product.name }],
            locale: "en_US",
            type: "product",
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.name} - Sstore`,
            description: product.description || `Buy ${product.name} at Sstore. Check out prices, reviews, and more.`,
            images: [product.images[0]]
        },
    }
}

const getProduct = async (slug: string) => {
    await new Promise((res) => setTimeout(res, 10000))
    const product = prisma.product.findUnique({
        where: {
            slug: slug
        },
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
            images: true,
            category: true,
        }
    })

    if (!product)
        return notFound()

    return product;
}

export default async function ProductPage({ params }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    return (
        <>
            <Suspense fallback={<ProductSkeleton />}>
                <ProductContent slug={slug} />
            </Suspense>


            <Suspense fallback={<FeaturedProductsSkeleton />}>
                <FeaturedProducts />
            </Suspense>
        </>
    )
}

async function ProductContent({ slug }: { slug: string }) {
    const product = await getProduct(slug) as ProductType
    const addToCartAction = addToCart.bind(null, product.id)

    return (
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-10 pt-4">
            <ImageSlider images={product?.images as string[]} />
            <section className="w-full">
                <h1 className="text-4xl font-extrabold">{product.name}</h1>
                <p className="pt-2 font-semibold text-xl">${product.price}</p>
                <div className="flex gap-2 items-center mt-2">
                    <StarIcon className="text-yellow-500 fill-yellow-500" size={20} />
                    <StarIcon className="text-yellow-500 fill-yellow-500" size={20} />
                    <StarIcon className="text-yellow-500 fill-yellow-500" size={20} />
                    <StarIcon className="text-yellow-500 fill-yellow-500" size={20} />
                    <StarIcon className="text-yellow-500 fill-yellow-500" size={20} />
                </div>
                <p className="text-muted-foreground text-lg mt-8">{product.description}</p>
                <AddToCartForm productName={product.name} action={addToCartAction} />
            </section>
        </section>
    )
}

function ProductSkeleton() {
    return (
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-10 pt-4 overflow-hidden">
            <div className="w-full  max-w-[600px]">
                <Skeleton className="max-w-full h-[500px]" />

                <div className="grid sm:grid-cols-5 grid-cols-3 sm:gap-3 gap-1 pt-2 max-w-[600px]" >
                    <Skeleton className="w-[100px] h-[100px]" />
                    <Skeleton className="w-[100px] h-[100px]" />
                    <Skeleton className="w-[100px] h-[100px]" />
                    <Skeleton className="w-[100px] h-[100px]" />
                    <Skeleton className="w-[100px] h-[100px]" />
                </div>
            </div>
            <section className="w-full">
                <Skeleton className="h-[15px]" />
                <Skeleton className="h-[15px] mt-4" />
                <Skeleton className="h-[15px] items-center mt-4 bg-yellow-300/20 max-w-[200px]" />

                <Skeleton className="h-[20px] mt-12" />

                <Skeleton className="h-[20px] bg-blue-500/20 mt-12" />
            </section>
        </section>
    )
}