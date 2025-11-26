// Libs
import { MoreHorizontal, Package } from "lucide-react";
import Link from "next/link";

// Components
import { Button } from "@/components/base/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/base/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table";
import BlurImage from "@/components/base/blue-image";

// Prisma Client
import prisma from "@/lib/db";

const getProducts = async () => {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return products
}

export default async function ProductsSection() {
    const products = await getProducts()

    return (
        <>
            {
                products && products.length ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-muted-foreground font-medium text-base py-2">Image</TableHead>
                                <TableHead className="text-muted-foreground font-medium text-base">Name</TableHead>
                                <TableHead className="text-muted-foreground font-medium text-base">Category</TableHead>
                                <TableHead className="text-muted-foreground font-medium text-base">Status</TableHead>
                                <TableHead className="text-muted-foreground font-medium text-base">Price</TableHead>
                                <TableHead className="text-muted-foreground font-medium text-base">Date</TableHead>
                                <TableHead className="text-muted-foreground font-medium text-base text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="text-base pt-4 relative">
                                            <BlurImage
                                                width={64}
                                                height={64}
                                                blurHash={product.imagesPlaceholder}
                                                src={product.images[0]}
                                                alt={product.name}
                                            />
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {product.name}
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {product.category}
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {product.status}
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {product.price.toString()}
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {Intl.DateTimeFormat().format(product.createdAt)}
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
                                                        <Link href={`/dashboard/products/${product.slug}/edit`}>Edit</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/products/${product.slug}/delete`}>
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
                        <p className="text-center text-muted-foreground">No products created so for in your store...</p>
                    </div>
                )
            }
        </>
    )
}