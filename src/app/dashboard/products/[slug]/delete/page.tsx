// Libs
import Link from "next/link";

// Components
import { Button } from "@/components/base/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/base/card";
import SubmitButton from "@/components/base/submit-button";
import { Input } from "@/components/base/input";

// Actions
import { deleteProduct } from "@/actions/products";

export default async function DeleteProductPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    return (
        <div className="w-full h-[80vh] justify-center flex items-center">
            <Card className="max-w-xl w-full">
                <CardHeader>
                    <CardTitle className="text-xl">
                        Are you absolutely sure?
                    </CardTitle>
                    <CardDescription>
                        This action cannot be undone. This will permanently delete this product and remove all data from our servers.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between items-center">
                    <Button variant='secondary' asChild>
                        <Link href="/dashboard/products">Cancel</Link>
                    </Button>
                    <form action={deleteProduct}>
                        <Input type="hidden" name="productSlug" value={slug} />
                        <SubmitButton variant="destructive" text="Delete product" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}