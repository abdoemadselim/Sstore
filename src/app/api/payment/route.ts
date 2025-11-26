// Libs
import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

export const POST = async (req: NextRequest) => {
    const signature = req.headers.get("stripe-signature") as string
    const body = await req.text()

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return new Response(null, { status: 200 })
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            await prisma.order.create({
                data: {
                    amount: session.amount_total as number,
                    status: session.status as string,
                    userId: session.metadata?.userId,
                }
            })
            await redis.del(`cart-${session.metadata?.userId}`)
            break;
        default:
            console.log("Unhandled stripe event")
    }

    return new Response(null, { status: 200 })
}