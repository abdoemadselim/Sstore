// Libs
import { redis } from "@/lib/redis"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"
import Link from "next/link.js"
import { Suspense } from "react"
import { connection } from "next/server"

// Types
import { CartType } from "@/types"
import { BoxIcon } from "lucide-react"

// Components
import { Button } from "@/components/base/button"
import { CheckoutButton, DeleteFromCartButton } from "@/components/base/submit-button"
import { Skeleton } from "@/components/base/skeleton"

// Actions
import { deleteFromCart } from "@/actions/cart"
import { checkout } from "@/actions/payment"

export const metadata = {
    title: "Your Cart - Sstore",
    description: "View the items in your cart at Sstore. Easily manage products, quantities, and proceed to checkout.",
}

export default function CartPage() {
    return (
        <Suspense fallback={<CartPageSkeleton />}>
            <CartContent />
        </Suspense>
    )
}

async function CartContent() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        redirect("/")
    }

    const cart: CartType | null = await redis.get(`cart-${user.id}`)

    const totalPrice = cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0
    return (
        <div className="flex flex-col justify-center items-center pt-16 max-w-4xl mx-auto">
            {
                !cart || !cart?.items ? (
                    <div className="flex flex-col gap-2 items-center justify-center border w-full p-20 ">
                        <BoxIcon size={80} className="text-primary/60" />
                        <p className="text-lg py-2 pb-4">You have no items in your cart yet</p>
                        <Button asChild size="lg" className="text-lg">
                            <Link href='/products/all'>Shop now</Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        {
                            cart?.items?.map((item, index) => (
                                <div key={item.id} className={`flex sm:flex-row flex-col gap-2 w-full ${index < cart.items.length - 1 && "border-b"} py-4`}>
                                    <div className="sm:w-35 h-35 relative border border-primary/20 rounded-md ">
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            fill
                                            className="object-cover object-center rounded-md w-full"
                                        />
                                    </div>
                                    <div className="flex w-full justify-between sm:ml-5">
                                        <Link href={`/product/${item.slug}`} className="font-medium text-xl">{item.name}</Link>
                                        <div className="flex flex-col h-full justify-between items-end">
                                            <p className="font-medium text-xl">{item.quantity} x ${item.price}</p>
                                            <form action={deleteFromCart}>
                                                <input type="hidden" name="productId" value={item.id} />
                                                <DeleteFromCartButton />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="mt-6 w-full">
                            <div className="flex w-full justify-between items-center border-t py-2">
                                <p className="text-2xl font-medium">Subtotal:</p>
                                <p className="text-2xl font-medium">${new Intl.NumberFormat("en-US").format(totalPrice)}</p>
                            </div>
                            <form action={checkout}>
                                <CheckoutButton />
                            </form>
                        </div>
                    </>
                )
            }

        </div >
    )
}

function CartPageSkeleton() {
    return (
        <div className="flex flex-col justify-center items-center pt-16 max-w-4xl mx-auto w-full">
            <div className="flex flex-col gap-6 w-full">
                {/* Item skeleton rows */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex sm:flex-row flex-col gap-4 w-full py-4 border-b">
                        <div className="sm:w-35 h-35 relative">
                            <div className="rounded-md border border-primary/20">
                                <Skeleton className="h-36 w-36 rounded-md" />
                            </div>
                        </div>

                        <div className="flex justify-between w-full sm:ml-5">
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-6 w-40" /> {/* product name */}
                                <Skeleton className="h-4 w-28" /> {/* slug or spacing */}
                            </div>

                            <div className="flex flex-col items-end justify-between">
                                <Skeleton className="h-6 w-24" /> {/* quantity + price */}
                                <Skeleton className="h-10 w-28" /> {/* delete button */}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Subtotal */}
                <div className="mt-6 w-full">
                    <div className="flex justify-between items-center border-t py-3">
                        <Skeleton className="h-8 w-28" />
                        <Skeleton className="h-8 w-20" />
                    </div>

                    <Skeleton className="h-12 w-full mt-4 rounded-md" /> {/* checkout button */}
                </div>
            </div>
        </div>
    )
}
