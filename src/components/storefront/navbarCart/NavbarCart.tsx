// Libs
import { redis } from "@/lib/redis";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";

// Types
import { CartType } from "@/types";

export default async function NavbarCart({ userId }: { userId: string }) {
    await connection()
    const cart: CartType | null = await redis.get(`cart-${userId}`)

    const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <Link href="/cart" className="flex items-center gap-2 group">
            <ShoppingBagIcon width={25} height={25} className="text-gray-500 group-hover:text-gray-600" />
            <span className="text-gray-600 group-hover:text-gray-700 font-medium">
                {total}
            </span>
        </Link>
    )
}
