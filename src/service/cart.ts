import { CartItemType, CartType } from "@/types"

export const getCart = async (): Promise<CartType & { total: number } | null> => {
    try {
        const res = await fetch("/api/cart") // server route returns current user cart
        const data = await res.json()
        return {
            ...data,
            total: data?.items?.reduce((sum: number, item: CartItemType) => item.quantity + sum, 0) || 0
        }
    } catch (err) {
        return null
    }
}