'use server'

// Libs
import { redis } from "@/lib/redis"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

// Types
import { CartType } from "@/types"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

export const checkout = async () => {
    const { getUser } = getKindeServerSession()

    const user = await getUser()

    if (!user) {
        redirect("/")
    }

    const cart: CartType | null = await redis.get(`cart-${user.id}`)

    if (cart && cart.items) {
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((item) => {
            return {
                quantity: item.quantity,
                price_data: {
                    currency: "usd",
                    unit_amount: item.price * 100,
                    product_data: {
                        name: item.name,
                        images: item.images,
                    }
                }
            }
        })

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: `https://sstore-jsja.vercel.app/payment/success`,
            cancel_url: `https://sstore-jsja.vercel.app/payment/cancel`,
            metadata: {
                userId: user.id
            }
        })

        return redirect(session.url as string)
    }
}