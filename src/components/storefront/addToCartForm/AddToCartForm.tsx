'use client'

// Libs
import { FormEvent } from "react";
import { toast } from "sonner";

//Components
import { ShoppingBagButton } from "@/components/base/submit-button";

export default function AddToCartForm({ productName, action }: { productName: string, action: () => void }) {
    const handleAddToCart = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await action() // server action
            toast.success(`${productName} added to cart!`) // ✅ show toast
        } catch (err) {
            toast.error("Failed to add to cart")
        }
    }

    return (
        <form onSubmit={(e) => handleAddToCart(e)}>
            <ShoppingBagButton />
        </form>
    )
}
