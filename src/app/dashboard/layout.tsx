// Libs
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// Components
import { DashboardNavbar } from "@/components/dashboard";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const { getUser } = getKindeServerSession()

    const user = await getUser()

    if (!user || user.email !== "abdulrahman3mad@gmail.com") {
        redirect("/")
    }

    return (
        <>
            <DashboardNavbar />
            <main className="max-w-7xl mx-auto px-4 lg:px-8 flex-1 w-full">
                {children}
            </main>
        </>
    )
}