// Libs
import Link from "next/link";

// Components
import { Button } from "@/components/base/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/base/card";
import SubmitButton from "@/components/base/submit-button";
import { Input } from "@/components/base/input";

// Actions
import { deleteProduct } from "@/actions/products";
import { Suspense } from "react";

export default function DeleteProductPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const slugParam = params.then((sp) => ({ slug: sp.slug }));

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DeleteProductContent slugParam={slugParam} />
        </Suspense>
    )
}

async function DeleteProductContent({ slugParam }: { slugParam: Promise<{ slug: string }> }) {
    const { slug } = await slugParam
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