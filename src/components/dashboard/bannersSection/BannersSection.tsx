// Libs
import { MoreHorizontal, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Components
import { Button } from "@/components/base/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/base/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table";

// Prisma Client
import prisma from "@/lib/db";

const getBanners = async () => {
    const banners = await prisma.banner.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return banners
}

export default async function BannersSection() {
    const banners = await getBanners()

    return (
        <>
            {
                banners && banners.length ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-muted-foreground font-medium text-base py-2">Image</TableHead>
                                <TableHead className="text-muted-foreground font-medium text-base">Title</TableHead>
                                <TableHead className="text-muted-foreground font-medium text-base text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                banners.map((banner) => (
                                    <TableRow key={banner.id}>
                                        <TableCell className="text-base pt-4">
                                            <Image
                                                unoptimized
                                                src={banner.image}
                                                alt={banner.title}
                                                width={64}
                                                height={64}
                                            />
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {banner.title}
                                        </TableCell>
                                        <TableCell className="text-base text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/banners/${banner.id}/delete`}>
                                                            Delete
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex justify-center flex-col items-center gap-4">
                        <Package size={60} className="text-primary" />
                        <p className="text-center text-muted-foreground">No banners created so for in your store...</p>
                    </div>
                )
            }
        </>
    )
}