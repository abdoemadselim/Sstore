"use server";

// Libs
import { parseWithZod } from "@conform-to/zod/v4";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

// Schemas
import { BannerSchema } from "@/lib/schema/banners";

// Prisma Client
import prisma from "@/lib/db";

export const createBanner = async (prevState: unknown, formData: FormData) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user || user.email !== "abdulrahman3mad@gmail.com") {
        return redirect("/")
    }

    const submission = parseWithZod(formData, {
        schema: BannerSchema
    })

    if (submission.status !== 'success') {
        return submission.reply();
    }

    try {
        const banner = await prisma.banner.create({
            data: {
                title: submission.value.title,
                image: submission.value.image,
            }
        })

        if (!banner) {
            return submission.reply({
                formErrors: ['Failed to create the banner. Please try again later.'],
            });
        }
    } catch (error) {
        console.error(error)
        return submission.reply({
            formErrors: ['Failed to create the banner. Please try again later.'],
        });
    }

    redirect("/dashboard/banners")
}

export const deleteBanner = async (formData: FormData) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user || user.email !== "abdulrahman3mad@gmail.com") {
        return redirect("/")
    }

    try {
        const bannerId = formData.get("bannerId")
        await prisma.banner.delete({
            where: {
                id: bannerId as string
            },
        })
    } catch (error) {
        console.error(error)
    }

    redirect("/dashboard/banners")
}
