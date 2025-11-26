'use server'

// Libs
import { redis } from "@/lib/redis";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// Types
import { CartItemType, CartType } from "@/types";

const getProduct = async (productId: number) => {
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        },
        select: {
            id: true,
            name: true,
            price: true,
            slug: true,
            images: true,
            category: true
        }
    })

    return product;
}

const createCart = ({ userId, product }: { userId: string, product: Omit<CartItemType, "quantity"> }) => {
    const newCart = {
        userId: userId,
        items: [
            {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                images: product.images,
                quantity: 1,
                slug: product.slug
            }
        ]
    }

    return newCart
}

export const addToCart = async (productId: number) => {
    // check if user is signed in
    const { getUser } = getKindeServerSession();

    const user = await getUser()

    if (!user) {
        redirect("/")
    }

    // get the cart from redis if exists
    const cart = await redis.get(`cart-${user.id}`) as CartType

    const product = await getProduct(productId)

    if (!product) {
        throw new Error("Adding to cart: Product not found")
    }

    // create a new cart with the product data if not exist
    let newCart = {} as CartType
    if (!cart || !cart.items?.length) {
        newCart = createCart({ userId: user.id, product: product })
    } else {
        // cart exists 
        // 1- same product exists
        let sameProduct = false;
        const items = cart.items.map((item) => {
            if (item.id === product.id) {
                sameProduct = true;
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item;
        })

        if (sameProduct) {
            newCart.items = items;
        } else {
            newCart.items = [
                ...cart.items,
                {
                    name: product.name,
                    category: product.category,
                    id: product.id,
                    price: product.price,
                    images: product.images,
                    quantity: 1,
                    slug: product.slug
                }
            ]
        }
    }

    await redis.set(`cart-${user.id}`, newCart)

    revalidatePath("/", "layout")
}

export const deleteFromCart = async (formData: FormData) => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        redirect("/")
    }

    const productId = Number(formData.get("productId"))

    const cart: CartType | null = await redis.get(`cart-${user.id}`)

    if (cart && cart.items) {
        const newCart: CartType = {
            userId: user.id,
            items: cart.items.filter((item) => item.id !== productId)
        }

        if (newCart.items.length == 0) {
            redis.del(`cart-${user.id}`)
        } else {
            redis.set(`cart-${user.id}`, newCart)
        }

        revalidatePath("/", "layout")
    }
}