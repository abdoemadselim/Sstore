// Libs
import { Loader2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// Components
import { Button } from "@/components/base/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/base/card";

// Prisma Client
import { BannersSection } from "@/components/dashboard";

export default async function BannersPage() {
    return (
        <div className="flex items-end flex-col gap-4">
            <Button className="gap-4 flex py-6 cursor-pointer" asChild>
                <Link href="/dashboard/banners/create">
                    <PlusCircle />
                    <span className="font-bold text-base">Add banner</span>
                </Link>
            </Button>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Banners</CardTitle>
                    <CardDescription className="text-muted-foreground text-md">Manage the banners displayed on your store front</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <Suspense fallback={
                        <div className="text-center text-xl text-muted-foreground flex justify-center items-center gap-2">
                            <Loader2 className="animate-spin text-primary" />
                            Loading banners...
                        </div>}>
                        <BannersSection />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}