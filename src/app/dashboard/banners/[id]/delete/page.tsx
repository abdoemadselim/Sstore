// Libs
import Link from "next/link";

// Components
import { Button } from "@/components/base/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/base/card";
import SubmitButton from "@/components/base/submit-button";
import { Input } from "@/components/base/input";

// Actions
import { deleteBanner } from "@/actions/banners";

export default async function DeleteBannerPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

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