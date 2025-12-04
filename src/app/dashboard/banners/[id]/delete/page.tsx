// Libs
import Link from "next/link";

// Components
import { Button } from "@/components/base/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/base/card";
import SubmitButton from "@/components/base/submit-button";
import { Input } from "@/components/base/input";

// Actions
import { deleteBanner } from "@/actions/banners";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function DeleteBannerPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const idParam = params.then((sp) => ({ id: sp.id }))
    return (
        <Suspense fallback={<div>
            <Loader2 className="animate-spin" />
            <p>Loading...</p>
        </div>}>
            <BannersDeleteContent idParam={idParam} />
        </Suspense>
    )
}

async function BannersDeleteContent({ idParam }: { idParam: Promise<{ id: string }> }) {
    const { id } = await idParam;

    return (
        <div className="w-full h-[80vh] justify-center flex items-center">
            <Card className="max-w-xl w-full">
                <CardHeader>
                    <CardTitle className="text-xl">
                        Are you absolutely sure?
                    </CardTitle>
                    <CardDescription>
                        This action cannot be undone. This will permanently delete this banner and remove all data from our servers.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between items-center">
                    <Button variant='secondary' asChild>
                        <Link href="/dashboard/banners">Cancel</Link>
                    </Button>
                    <form action={deleteBanner}>
                        <Input type="hidden" name="bannerId" value={id} />
                        <SubmitButton variant="destructive" text="Delete banner" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}