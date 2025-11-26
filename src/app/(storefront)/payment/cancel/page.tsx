// Libs
import { XCircle } from "lucide-react";
import Link from "next/link";

// Components
import { Button } from "@/components/base/button";
import { Card, CardContent } from "@/components/base/card";

export const metadata = {
    title: "Payment Canceled - Sstore",
    description: "Your payment at Sstore was canceled. You haven't been charged. Please try again to complete your purchase.",
}

export default function PaymentCancelPage() {
    return (
        <div className="min-h-[60vh] w-full flex flex-col justify-center items-center">
            <Card className="xl:max-w-[27vw] lg:max-w-[40vw] text-center rounded-md">
                <CardContent className="flex justify-center items-center flex-col">
                    <div className="bg-red-500/20 text-red-500 justify-center items-center flex w-[50px] h-[50px] rounded-full">
                        <XCircle className="w-[35px] h-[35px]" />
                    </div>

                    <h2 className="font-medium text-xl pt-4">Payment Canceled</h2>
                    <p className="text-muted-foreground pt-2">Something went wrong with your payment. You haven{"'"}t been charged. Please try again. </p>
                    <Button asChild className="mt-4 w-full">
                        <Link href="/">Back to Homepage</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}