
// Libs
import prisma from "@/lib/db";

// Components   
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar";
import { Skeleton } from "@/components/base/skeleton";
import { Package2 } from "lucide-react";

const getSalesData = async () => {
    const sales = await prisma.order.findMany({
        take: 5,
        select: {
            id: true,
            amount: true,
            user: {
                select: {
                    profileImage: true,
                    firstName: true,
                    lastName: true,
                    email: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return sales;
}

export default async function DashboardRecentSales() {
    const sales = await getSalesData()

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">
                    Recent Sales
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                {
                    sales.length ? (
                        <>
                            {
                                sales.map((sale) => (
                                    <div key={sale.id} className="flex flex-row justify-between items-center gap-4">
                                        <div className="flex sm:flex-row flex-col sm:items-center sm:gap-8 gap-2">
                                            <Avatar>
                                                <AvatarFallback>{sale.user?.firstName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                                <AvatarImage
                                                    src={sale.user?.profileImage as string}
                                                    alt={sale.user?.firstName as string}
                                                >
                                                </AvatarImage>
                                            </Avatar>
                                            <div className="flex flex-col gap-1">
                                                <p>
                                                    <span className="text-sm font-medium">
                                                        {sale.user?.firstName.substring(0, 1).toUpperCase()}{sale.user?.firstName.slice(1)}
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        {sale.user?.lastName.substring(0, 1).toUpperCase()}{sale.user?.lastName.slice(1)}
                                                    </span>
                                                </p>
                                                <p className="text-sm font-medium text-muted-foreground">{sale.user?.email}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium">+${Intl.NumberFormat("en-US").format(sale.amount / 100)}</p>
                                    </div>
                                ))
                            }
                        </>
                    ) : (
                        <div className="flex justify-center flex-col items-center gap-4">
                            <Package2 size={60} className="text-primary" />
                            <p className="text-center text-muted-foreground">You have no sales yet</p>
                        </div>
                    )
                }
            </CardContent>
        </Card>
    )
}


export function DashboardRecentSalesSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">
                    Recent Sales
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                {
                    [1, 2, 3, 4, 5].map((id) => (
                        <div key={id} className="flex justify-between items-center gap-4">
                            <div className="flex gap-3 items-center">
                                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                                <Skeleton className="w-[180px] h-[40px]" />
                            </div>
                            <Skeleton className="w-[50px] h-[40px]" />
                        </div>
                    ))
                }
            </CardContent>
        </Card >
    )
}