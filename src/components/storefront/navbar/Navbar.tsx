// Libs
import Link from "next/link";
import { LogOutIcon, MenuIcon, ShoppingBagIcon } from "lucide-react";
import { getKindeServerSession, LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redis } from "@/lib/redis";

// Components
import { NavLinks, UserDropdown } from "@/components/storefront";
import { Button } from "@/components/base/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/base/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar";

// Types
import { CartType } from "@/types";

export default async function Navbar() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const cart: CartType | null = await redis.get(`cart-${user?.id}`)

    const totalInCart = cart?.items?.reduce((sum, item) => item.quantity + sum, 0) || 0

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 w-full flex justify-between">
            <div className="flex items-center">
                <Link href="/">
                    <h1 className="text-4xl font-medium"><span className="text-primary">S</span>store</h1>
                </Link>
                <div className="md:block hidden">
                    <NavLinks />
                </div>
            </div>


            {/* For Mobile Screens */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="cursor-pointer bg-transparent text-primary hover:bg-transparent md:hidden p-2" asChild variant="outline">
                        <MenuIcon className="w-10 h-10" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="p-8" side="left">
                    <SheetHeader className="px-0 pb-0">
                        <div className="flex items-center gap-4">
                            {
                                user ? (
                                    <>
                                        <Avatar className="w-10 h-10 mb-4">
                                            <AvatarFallback>{user?.given_name?.slice(0, 3)}</AvatarFallback>
                                            <AvatarImage src={user?.picture as string}></AvatarImage>
                                        </Avatar>
                                        <p className="pb-4">{user?.given_name}</p>
                                    </>
                                ) : (
                                    <div className="flex flex-col mb-4">
                                        <p className="font-medium">Sstore</p>
                                        <p className="text-muted-foreground text-sm">Just do it with Sstore!</p>
                                    </div>
                                )
                            }
                        </div>
                    </SheetHeader>

                    <nav className="flex flex-col font-bold gap-4 text-xl">
                        <NavLinks />
                    </nav>
                    {
                        user ? (
                            <Button className="flex gap-8 mt-8 text-lg w-fit" variant="destructive" asChild>

                                <LogoutLink>
                                    Log out
                                    <LogOutIcon className="w-10 h-10" />
                                </LogoutLink>

                            </Button>
                        ) : (
                            <div className="flex flex-col items-start ml-0 pl-0 gap-2 mt-4">
                                <Button variant="ghost" className="mr-0  text-lg bg-gray-200">
                                    <LoginLink>Sign In</LoginLink>
                                </Button>
                                <Button variant="ghost" className="text-lg bg-primary/80 text-white">
                                    <RegisterLink>Create account</RegisterLink>
                                </Button>
                            </div>
                        )
                    }
                </SheetContent>
            </Sheet>
            {
                user ? (
                    <div className="md:flex hidden items-center gap-6">
                        <div className="flex items-center gap-1">
                            <Link href="/cart" className="flex items-center gap-2 group">
                                <ShoppingBagIcon width={25} height={25} className="text-gray-500 group-hover:text-gray-600" />
                                <span className="text-gray-600 group-hover:text-gray-700 font-medium">{totalInCart}</span>
                            </Link>
                        </div>
                        <UserDropdown
                            name={user.given_name as string}
                            email={user.email as string}
                            image={user.picture ?? `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.given_name}`}
                        />
                    </div>
                ) : (
                    <div className="md:flex hidden gap-1 items-center">
                        <Button variant="ghost" className="mr-0 text-lg">
                            <LoginLink>Sign In</LoginLink>
                        </Button>
                        <span className="text-gray-300">|</span>
                        <Button variant="ghost" className="text-lg">
                            <RegisterLink>Create account</RegisterLink>
                        </Button>
                    </div>
                )
            }
        </div>
    )
}