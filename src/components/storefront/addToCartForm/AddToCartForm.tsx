'use client'

// Libs
import { FormEvent, useState } from "react";
import { toast } from "sonner";

//Components
import { ShoppingBagButton } from "@/components/base/submit-button";

export default function AddToCartForm({ productName, action }: { productName: string, action: () => void }) {
    const [pending, setPending] = useState(false)

    const handleAddToCart = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setPending(true)
            await action() // server action
            toast.success(`${productName} added to cart!`) // ✅ show toast
            setPending(false)
        } catch (err) {
            toast.error("Failed to add to cart")
            setPending(true)
        }
    }

    return (
        <form onSubmit={(e) => handleAddToCart(e)}>
            <ShoppingBagButton pending={pending} />
        </form>
    )
}
