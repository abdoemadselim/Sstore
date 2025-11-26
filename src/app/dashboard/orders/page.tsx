// Libs
import prisma from "@/lib/db";
import { Suspense } from "react";
import { Loader2, Package } from "lucide-react";

// Components   
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/base/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table";

const getOrders = async () => {
    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            user: {
                select: {
                    email: true,
                    firstName: true,
                    lastName: true
                }
            },
            status: true,
            amount: true,
            createdAt: true
        }
    })

    return orders;
}

export default async function OrdersPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Orders</CardTitle>
                <CardDescription className="text-muted-foreground text-md">Recent orders from your store!</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                <Suspense fallback={
                    <div className="text-center text-xl text-muted-foreground flex justify-center items-center gap-2">
                        <Loader2 className="animate-spin text-primary" />
                        Loading orders...
                    </div>}>
                    <OrderSection />
                </Suspense>
            </CardContent>
        </Card>
    )
}

async function OrderSection() {
    const orders = await getOrders()

    return (
        orders && orders.length ? (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-muted-foreground font-medium text-base py-2">Customer</TableHead>
                        <TableHead className="text-muted-foreground font-medium text-base">Type</TableHead>
                        <TableHead className="text-muted-foreground font-medium text-base">Status</TableHead>
                        <TableHead className="text-muted-foreground font-medium text-base">Date</TableHead>
                        <TableHead className="text-muted-foreground font-medium text-base text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="text-base pt-4">
                                    <p>{order.user?.firstName} {order.user?.lastName}</p>
                                    <p className="text-muted-foreground text-sm">{order.user?.email}</p>
                                </TableCell>
                                <TableCell className="text-base">
                                    Order
                                </TableCell>
                                <TableCell className="text-base">
                                    {order.status.substring(0, 1).toUpperCase()}{order.status.slice(1)}
                                </TableCell>
                                <TableCell className="text-base">
                                    {Intl.DateTimeFormat("en-US").format(order.createdAt)}
                                </TableCell>
                                <TableCell className="text-base text-right">
                                    ${Intl.NumberFormat("en-US").format(order.amount / 100)}
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        ) : (
            <div className="flex justify-center flex-col items-center gap-4">
                <Package size={60} className="text-primary" />
                <p className="text-center text-muted-foreground">No orders created so for in your store...</p>
            </div>
        )
    )
}