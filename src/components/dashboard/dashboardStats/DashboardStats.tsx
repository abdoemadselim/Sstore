// Libs
import { DollarSign, Package, PartyPopper, User } from "lucide-react";
import prisma from "@/lib/db";

// Components   
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card";
import { Skeleton } from "@/components/base/skeleton";

const getUserStats = async () => {
    const userCount = await prisma.user.count()

    return userCount
}

const getTotalSales = async () => {
    const orderCount = await prisma.order.count()

    return orderCount
}

const getTotalProducts = async () => {
    const productsCount = await prisma.product.count()

    return productsCount
}

const getTotalRevenue = async () => {
    const totalRevenue = await prisma.order.aggregate({
        _sum: {
            amount: true
        }
    })

    return totalRevenue._sum.amount
}

const getData = async () => {
    const data = await Promise.all([getUserStats(), getTotalSales(), getTotalProducts(), getTotalRevenue()])

    return {
        userStats: data[0],
        totalSales: data[1],
        totalProducts: data[2],
        totalRevenue: data[3] || 0
    }
}

export default async function DashboardStats() {
    const data = await getData()

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 justify-center items-center">
            <Card className="justify-center flex-col gap-3">
                <CardHeader className="flex items-center justify-between w-full">
                    <CardTitle className="text-2xl font-bold">Total Revenue</CardTitle>
                    <DollarSign className="text-green-400" />
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-2xl">${Intl.NumberFormat("en-US").format(data.totalRevenue / 100)}</p>
                    <p className="text-muted-foreground text-base mt-2">Based on {data.totalSales} Charges</p>
                </CardContent>
            </Card>

            <Card className="justify-center flex-col gap-3">
                <CardHeader className="flex items-center justify-between w-full">
                    <CardTitle className="text-2xl font-bold">Total Sales</CardTitle>
                    <Package className="text-blue-400" />
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-2xl">{data.totalSales}</p>
                    <p className="text-muted-foreground text-base mt-2">Total Sales on Sstore</p>
                </CardContent>
            </Card>

            <Card className="justify-center flex-col gap-3">
                <CardHeader className="flex items-center justify-between w-full">
                    <CardTitle className="text-2xl font-bold">Total Products</CardTitle>
                    <PartyPopper className="text-indigo-400" />
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-2xl">{data.totalProducts}</p>
                    <p className="text-muted-foreground text-base mt-2">Total Products Created</p>
                </CardContent>
            </Card>

            <Card className="justify-center flex-col gap-3">
                <CardHeader className="flex items-center justify-between w-full">
                    <CardTitle className="text-2xl font-bold">Total Users</CardTitle>
                    <User className="text-orange-400" />
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-2xl">{data.userStats}</p>
                    <p className="text-muted-foreground text-base mt-2">Total Users Signed Up</p>
                </CardContent>
            </Card>
        </section>
    )
}

export function DashboardStatusSkeleton() {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center">
            <Card className="justify-center flex-col gap-3">
                <CardHeader className="flex items-center justify-between w-full">
                    <CardTitle className="text-2xl font-bold">Total Revenue</CardTitle>
                    <DollarSign className="text-green-400" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[100px]" />
                </CardContent>
            </Card>

            <Card className="justify-center flex-col gap-3">
                <CardHeader className="flex items-center justify-between w-full">
                    <CardTitle className="text-2xl font-bold">Total Sales</CardTitle>
                    <Package className="text-blue-400" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[100px]" />
                </CardContent>
            </Card>

            <Card className="justify-center flex-col gap-3">
                <CardHeader className="flex items-center justify-between w-full">
                    <CardTitle className="text-2xl font-bold">Total Products</CardTitle>
                    <PartyPopper className="text-indigo-400" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[100px]" />
                </CardContent>
            </Card>

            <Card className="justify-center flex-col gap-3">
                <CardHeader className="flex items-center justify-between w-full">
                    <CardTitle className="text-2xl font-bold">Total Users</CardTitle>
                    <User className="text-orange-400" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[100px]" />
                </CardContent>
            </Card>
        </section>
    )
}