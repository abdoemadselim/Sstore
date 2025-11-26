'use client'

// Libs
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/base/button";
import { Card, CardContent } from "@/components/base/card";

// Metadata
export const metadata = {
    title: "Payment Successful - Sstore",
    description: "Thank you for your purchase at Sstore! Your payment was successful. Enjoy your new products.",
}

export default function PaymentSuccessPage() {
    const router = useRouter()
    useEffect(() => {
        // Invalidate the cache and re-render all server components to update the cart number
        router.refresh()
    }, [router]);

    return (
        <div className="min-h-[60vh] w-full flex flex-col justify-center items-center">
            <Card className="xl:max-w-[27vw] lg:max-w-[40vw] text-center rounded-md">
                <CardContent className="flex justify-center items-center flex-col">
                    <div className="bg-green-500/20 text-green-500 justify-center items-center flex w-[50px] h-[50px] rounded-full">
                        <Check className="w-[35px] h-[35px]" />
                    </div>

                    <h2 className="font-medium text-xl pt-4">Payment Successful</h2>
                    <p className="text-muted-foreground pt-2">
                        Congrats to your purchase. Your payment was successful. We hope you enjoy your product
                    </p>
                    <Button asChild className="mt-4 w-full">
                        <Link href="/">Back to Homepage</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}