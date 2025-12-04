"use server";

// Libs
import { parseWithZod } from "@conform-to/zod/v4";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

// Schemas
import { ProductSchema } from "@/lib/schema/products";

// Prisma Client
import prisma from "@/lib/db";
import { getBlurHashFromURL } from "@/lib/blurhash-encoder";
import { revalidateTag } from "next/cache.js";

export const createProduct = async (prevState: unknown, formData: FormData) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user || user.email !== "abdulrahman3mad@gmail.com") {
        return redirect("/")
    }

    const submission = parseWithZod(formData, {
        schema: ProductSchema
    })

    if (submission.status !== 'success') {
        return submission.reply();
    }

    const images = submission.value.images.flatMap((image) => image.split(","))

    const blurHash = await getBlurHashFromURL(images[0])

    try {
        const product = await prisma.product.create({
            data: {
                name: submission.value.name,
                slug: submission.value.slug,
                category: submission.value.category,
                status: submission.value.status,
                featured: submission.value.featured === "on" ? true : false,
                images: images,
                imagesPlaceholder: blurHash as string,
                price: submission.value.price,
                description: submission.value.description
            }
        })

        if (!product) {
            return submission.reply({
                formErrors: ['Failed to create the product. Please try again later.'],
            });
        }

        revalidateTag("products", "max")
        revalidateTag(`products-${submission.value.category}`, "max")
    } catch (error) {
        console.error(error)
        return submission.reply({
            formErrors: ['Failed to create the product. Please try again later.'],
        });
    }

    redirect("/dashboard/products")
}

export const updateProduct = async (_prevState: unknown, formData: FormData) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user || user.email !== "abdulrahman3mad@gmail.com") {
        return redirect("/")
    }

    const submission = parseWithZod(formData, {
        schema: ProductSchema
    })

    if (submission.status !== 'success') {
        return submission.reply();
    }

    const images = submission.value.images.flatMap((image) => image.split(","))
    try {
        const productId = Number(formData.get("productId"))
        const product = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                name: submission.value.name,
                slug: submission.value.slug,
                category: submission.value.category,
                status: submission.value.status,
                featured: submission.value.featured === "on" ? true : false,
                images: images,
                price: submission.value.price,
                description: submission.value.description
            }
        })

        if (!product) {
            return submission.reply({
                formErrors: ['Failed to create the product. Please try again later.'],
            });
        }

        revalidateTag("products", "max")
        revalidateTag(`products-${submission.value.category}`, "max")
        revalidateTag(`product-${product.slug}`, "max")
    } catch (error) {
        console.error(error)
        return submission.reply({
            formErrors: ['Failed to create the product. Please try again later.'],
        });
    }

    redirect("/dashboard/products")
}

export const deleteProduct = async (formData: FormData) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user || user.email !== "abdulrahman3mad@gmail.com") {
        return redirect("/")
    }

    try {
        const productSlug = formData.get("productSlug")
        const product = await prisma.product.delete({
            where: {
                slug: productSlug as string
            },
        })

        revalidateTag("products", "max")
        revalidateTag(`products-${product.category}`, "max")
        revalidateTag(`product-${product.slug}`, "max")
    } catch (error) {
        console.error(error)
    }

    redirect("/dashboard/products")
}
