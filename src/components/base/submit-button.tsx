'use client'

import { Loader2, ShoppingBag } from "lucide-react"
import { toast } from "sonner";
import { useFormStatus } from "react-dom"

import { Button } from "./button"

interface IProps {
    text: string,
    loadingText?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function SubmitButton({
    text,
    variant = "default",
    loadingText = "Please wait..."
}: IProps) {
    const { pending } = useFormStatus()
    return (
        pending ? (
            <Button disabled className="text-lg cursor-pointer h-fit" variant={variant}>
                <Loader2 className="animate-spin" />
                {loadingText}
            </Button>
        ) :
            (
                <Button variant={variant} className="text-lg cursor-pointer h-fit" type="submit">{text}</Button>
            )
    )
}

export function ShoppingBagButton() {
    const { pending } = useFormStatus()

    const handleClick = () => {
        toast.success("Product has been added to your cart")
    }

    return (
        pending ? (
            <Button disabled size="lg" className="w-full text-lg mt-4 gap-4 cursor-pointer" variant="default">
                <Loader2 className="animate-spin" /> Please wait...
            </Button>
        ) :
            (
                <Button size="lg" className="w-full text-lg mt-4 gap-4 cursor-pointer" >
                    <ShoppingBag /> Add to cart
                </Button>
            )
    )
}

export function DeleteFromCartButton() {
    const { pending } = useFormStatus();

    return (
        pending ? (
            <p className="text-red-500 font-bold self-end text-end flex gap-2">
                <Loader2 className="animate-spin" /> Please wait...
            </p>
        ) : (
            <Button variant="ghost" className="text-red-500 font-bold self-end text-end hover:bg-transparent hover:text-red-600 cursor-pointer">X Delete</Button>
        )
    )
}

export function CheckoutButton() {
    const { pending } = useFormStatus();

    return (
        pending ? (
            <Button className="w-full text-xl mt-2 cursor-pointer gap-2" size="lg" disabled>
                <Loader2 className="animate-spin" /> Please wait...
            </Button>
        ) : (
            <Button className="w-full text-xl mt-2 cursor-pointer" size="lg">Checkout</Button>
        )
    )
}