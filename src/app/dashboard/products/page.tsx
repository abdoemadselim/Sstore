// Libs
import { Loader2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// Components
import { Button } from "@/components/base/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/base/card";

// Prisma Client
import { ProductsSection } from "@/components/dashboard";

export default async function ProductsPage() {
    return (
        <div className="flex items-end flex-col gap-4">
            <Button className="gap-4 flex py-6 cursor-pointer" asChild>
                <Link href="/dashboard/products/create">
                    <PlusCircle />
                    <span className="font-bold text-base">Add Product</span>
                </Link>
            </Button>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Products</CardTitle>
                    <CardDescription className="text-muted-foreground text-md">Manage your products and view their sales performance!</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <Suspense fallback={
                        <div className="text-center text-xl text-muted-foreground flex justify-center items-center gap-2">
                            <Loader2 className="animate-spin text-primary" />
                            Loading products...
                        </div>}>
                        <ProductsSection />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}