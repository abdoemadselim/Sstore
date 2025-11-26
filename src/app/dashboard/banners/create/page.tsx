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
import SubmitButton from "@/components/base/submit-button";

// Actions
import { createBanner } from "@/actions/banners";

// Schemas
import { BannerSchema } from "@/lib/schema/banners";

export default function CreateBannerPage() {
    const [lastResult, createBannerAction] = useActionState(createBanner, undefined)
    const [image, setImage] = useState<string | undefined>(undefined)

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: BannerSchema });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: "onInput"
    });

    return (
        <div className="flex flex-col items-start gap-4 mb-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/banners">
                    <ChevronLeftIcon size={28} />
                </Link>
                <h1 className="text-3xl font-bold">Create Banner</h1>
            </div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Banner Details</CardTitle>
                    <CardDescription className="text-muted-foreground text-md">Add a new banner to your store front</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createBannerAction} id={form.id} onSubmit={form.onSubmit}>
                        <p className="text-red-500 h-2">{form.errors}</p>
                        <div className="flex flex-col gap-6 pt-8">
                            <div className="flex flex-col gap-3">
                                <Label className="text-xl">Title</Label>
                                <Input type="text" placeholder="Write a title for the banner" key={fields.title.key} defaultValue={fields.title.initialValue} name={fields.title.name} />

                                <p className="text-red-500 h-2">{fields.title.errors}</p>
                            </div>

                            <Input type="hidden" value={image} name="image" readOnly />

                            <div className="flex flex-col gap-3">
                                <Label className="text-xl">Image</Label>
                                {
                                    image ? (
                                        <div className="w-[100px] h-[100px] relative">
                                            <Image
                                                unoptimized
                                                src={image}
                                                alt="Banner Image"
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-cover rounded-lg border"
                                            />

                                            <Button type="button" onClick={() => setImage(undefined)} className="absolute -top-3 -right-3 bg-red-500 p-2 w-[35px] h-[35px] flex justify-center items-center rounded-lg hover:bg-red-400 cursor-pointer">
                                                <XIcon color="white" />
                                            </Button>
                                        </div>
                                    )
                                        : (
                                            <UploadButton
                                                appearance={{
                                                    button: "!bg-gray-600",
                                                }}
                                                className="items-start "
                                                endpoint="bannerUploader"
                                                onClientUploadComplete={(res) => {
                                                    setImage(res[0].ufsUrl)
                                                }}
                                                onUploadError={(error: Error) => {
                                                    alert(`Error!: ${error.message}`)
                                                }}
                                            />
                                        )
                                }
                                <p className="text-red-500 h-2">{fields.image.errors}</p>
                            </div>
                        </div>
                        <CardFooter className="pt-8 px-0" >
                            <SubmitButton text="Create banner" />
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div >
    )
}