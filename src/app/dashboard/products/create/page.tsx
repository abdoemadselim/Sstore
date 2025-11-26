'use client'

// Libs
import { ChevronLeftIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { parseWithZod } from '@conform-to/zod/v4';
import { useForm } from '@conform-to/react';
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";

// Components
import { Button } from "@/components/base/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/base/card";
import { Label } from "@/components/base/label";
import { Input } from "@/components/base/input";
import { Textarea } from "@/components/base/textarea";
import { Switch } from "@/components/base/switch";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/base/select";
import SubmitButton from "@/components/base/submit-button";

// Actions
import { createProduct } from "@/actions/products";

// Schemas
import { ProductSchema } from "@/lib/schema/products";

export default function CreateProductPage() {
    const [lastResult, createProductAction] = useActionState(createProduct, undefined)
    const [images, setImages] = useState<string[]>([])
    const [formError, setFormError] = useState<string>("")

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: ProductSchema });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: "onInput"
    });

    const handleDeleteImage = (url: string) => {
        setImages((images) => images.filter((image) => image !== url))
    }

    return (
        <div className="flex flex-col items-start gap-4 mb-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/products">
                    <ChevronLeftIcon size={28} />
                </Link>
                <h1 className="text-3xl font-bold">Create Product</h1>
            </div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Product Details</CardTitle>
                    <CardDescription className="text-muted-foreground text-md">Add a new product to your store</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createProductAction} id={form.id} onSubmit={form.onSubmit}>
                        <p className="text-red-500 h-2">{form.errors || formError}</p>
                        <div className="flex flex-col gap-6 pt-8">
                            <div className="flex flex-col gap-3">
                                <Label className="text-xl">Name</Label>
                                <Input type="text" placeholder="Nike air" key={fields.name.key} defaultValue={fields.name.initialValue} name={fields.name.name} />

                                <p className="text-red-500 h-2">{fields.name.errors}</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Label className="text-xl">Slug</Label>
                                <Input type="text" placeholder="Nike air" key={fields.slug.key} defaultValue={fields.slug.initialValue} name={fields.slug.name} />

                                <p className="text-red-500 h-2">{fields.slug.errors}</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Label className="text-xl">Description</Label>
                                <Textarea placeholder="Write your description right here..." name={fields.description.name} key={fields.description.key} className="min-h-20" defaultValue={fields.description.initialValue} />

                                <p className="text-red-500 h-2">{fields.description.errors}</p>
                            </div>


                            <div className="flex flex-col gap-3">
                                <Label className="text-xl">Price</Label>
                                <Input type="number" className="max-w-[200px]" placeholder="$55" key={fields.price.key} defaultValue={fields.price.initialValue} name={fields.price.name} />

                                <p className="text-red-500 h-2">{fields.price.errors}</p>
                            </div>


                            <div className="flex flex-col gap-3">
                                <Label className="text-xl">Featured Product</Label>
                                <Switch key={fields.featured.key} name={fields.featured.name} defaultValue={fields.featured.initialValue} />

                                <p className="text-red-500 h-2">{fields.featured.errors}</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Label className="text-xl">Category</Label>
                                <Select key={fields.category.key} name={fields.category.name} defaultValue={fields.category.initialValue}>
                                    <SelectTrigger className="max-w-[300px] w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="women">Women</SelectItem>
                                        <SelectItem value="men">Men</SelectItem>
                                        <SelectItem value="kids">Kids</SelectItem>
                                    </SelectContent>
                                </Select>

                                <p className="text-red-500 h-2">{fields.category.errors}</p>
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <Label className="text-xl">Status</Label>
                                <Select key={fields.status.key} name={fields.status.name} defaultValue={fields.status.initialValue}>
                                    <SelectTrigger className="max-w-[300px] w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>

                                <p className="text-red-500 h-2">{fields.status.errors}</p>
                            </div>

                            <Input type="hidden" value={images} name="images" readOnly />

                            <div className="flex flex-col gap-3">
                                <Label className="text-xl">Images</Label>
                                {
                                    images.length ? (
                                        <div className="flex gap-4">
                                            {
                                                images.map((image, index) => (
                                                    <div key={index} className="w-[100px] h-[100px] relative">
                                                        <Image
                                                            unoptimized
                                                            src={image}
                                                            alt="Product Image"
                                                            width={100}
                                                            height={100}
                                                            className="w-full h-full object-cover rounded-lg border"
                                                        />

                                                        <Button type="button" onClick={() => handleDeleteImage(image)} className="absolute -top-3 -right-3 bg-red-500 p-2 w-[35px] h-[35px] flex justify-center items-center rounded-lg hover:bg-red-400 cursor-pointer">
                                                            <XIcon color="white" />
                                                        </Button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) :
                                        (
                                            <UploadButton appearance={{
                                                button: "!bg-gray-600",
                                            }}
                                                className="items-start "
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    setImages(res.map((r) => r.ufsUrl))
                                                }}
                                                onUploadError={(error: Error) => {
                                                    setFormError(error.message)
                                                }}
                                            />
                                        )
                                }
                                <p className="text-red-500 h-2">{fields.images.errors}</p>
                            </div>
                        </div>
                        <CardFooter className="pt-8 px-0" >
                            <SubmitButton text="Create product" loadingText="Creating product" />
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}