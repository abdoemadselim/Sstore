
// Libs
import prisma from '@/lib/db';

// Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/base/card";
import { Skeleton } from '@/components/base/skeleton';
import Chart from './Chart';
import { LineChart } from 'lucide-react';

const getData = async () => {
    const data = (await prisma.$queryRaw`
      SELECT DATE("createdAt") AS day, SUM("amount") AS revenue
      FROM "Order"
      WHERE "createdAt" >= CURRENT_DATE - INTERVAL '6 days'
      GROUP BY DATE("createdAt")
      ORDER BY day;
    `) as {
        revenue: number,
        day: Date
    }[]

    return data.map((item) => ({
        revenue: Number(item.revenue) / 100,
        day: item.day.toISOString().split("T")[0]
    }));
}

export default async function DashboardTransactionsChart() {
    const data = await getData()
    return (
        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="text-2xl">Revenue <span className='text-base font-medium'>(Total Revenue per day)</span></CardTitle>
                <CardDescription>
                    Total revenue for the last 7 days
                </CardDescription>
            </CardHeader>
            <CardContent>
                {
                    data.length ? (
                        <Chart data={data} />
                    ) : (
                        <div className="flex justify-center flex-col items-center gap-4">
                            <LineChart size={60} className="text-primary" />
                            <p className="text-center text-muted-foreground">No orders created yet in your store</p>
                        </div>
                    )
                }
            </CardContent>
        </Card>
    )
}

export function DashboardTransactionsSkeleton() {
    return (
        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="text-2xl">Revenue <span className='text-base font-medium'>(Total Revenue per day)</span></CardTitle>
                <CardDescription>
                    Total revenue for the last 7 days
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton className='h-[400px] w-full' />
            </CardContent>
        </Card>
    )
}