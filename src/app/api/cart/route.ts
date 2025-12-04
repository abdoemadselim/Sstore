// Libs
import { redis } from "@/lib/redis"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextRequest, NextResponse } from "next/server"

// Types
import { CartType } from "@/types"

export const GET = async (req: NextRequest) => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        return NextResponse.json(null)
    }

    const cart: CartType | null = await redis.get(`cart-${user.id}`)

    if (!cart || !cart.items) {
        return NextResponse.json(null)
    }

    return NextResponse.json(cart)
}