// Libs
import { Link2, LogOutIcon, MenuIcon } from "lucide-react"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs"
import Link from "next/link"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Suspense } from "react"

// Components
import { Button } from "@/components/base/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/base/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/base/dropdown-menu"
import { NavbarLinks } from "@/components/dashboard"
import { DropdownMenuSeparator } from "@/components/base/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar"
import { Skeleton } from "@/components/base/skeleton"

export default function DashboardNavbar() {
    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 w-full">
            <header className="flex items-center justify-between bg-white h-22">
                <div className="flex gap-10 items-center">
                    <Link href="/">
                        <h1 className="text-2xl font-medium"><span className="text-primary">S</span>store</h1>
                    </Link>
                    <nav className="gap-2 sm:flex hidden font-medium">
                        <Suspense>
                            <NavbarLinks />
                        </Suspense>
                    </nav>
                </div>

                {/* For Mobile Screens */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="cursor-pointer bg-transparent text-primary hover:bg-transparent sm:hidden p-2" asChild variant="outline">
                            <MenuIcon className="w-10 h-10" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="p-8" side="left">
                        <SheetHeader>
                            <SheetTitle>Sstore</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col font-bold gap-4 text-xl">
                            <Suspense>
                                <NavbarLinks />
                            </Suspense>
                        </nav>

                        <Button className="flex gap-8 mt-8 text-lg w-fit" variant="destructive" asChild>
                            <LogoutLink>
                                Log out
                                <LogOutIcon className="w-10 h-10" />
                            </LogoutLink>
                        </Button>
                    </SheetContent>
                </Sheet>

                <Suspense fallback={
                    <Skeleton className="rounded-full w-10 h-10 bg-gray-100" />
                }>
                    <UserAvatar />
                </Suspense>
            </header>
        </div>
    )
}

async function UserAvatar() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full w-10 h-10 cursor-pointer sm:flex hidden">
                    <Avatar className="w-10 h-10">
                        <AvatarFallback>{user?.given_name?.slice(0, 3)}</AvatarFallback>
                        <AvatarImage src={user?.picture as string}></AvatarImage>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50" align="end">
                <DropdownMenuLabel className="text-base">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center justify-between gap-8 cursor-pointer text-base" asChild>
                    <LogoutLink>
                        Store front
                        <Link2 className="w-10 h-10" />
                    </LogoutLink>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between gap-8 cursor-pointer text-base" variant="destructive" asChild>
                    <LogoutLink>
                        Log out
                        <LogOutIcon className="w-10 h-10" />
                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
