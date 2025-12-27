import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"

import prisma from "@/lib/db"

export const GET = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        throw new Error("Something went wrong")
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        }
    })

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "",
                profileImage: user.picture ?? `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.given_name}`
            }
        })
    }

    return NextResponse.redirect("https://sstore-jsja.vercel.app/")
}