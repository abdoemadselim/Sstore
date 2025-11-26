// Libs
import { Suspense } from "react";

// Components
import { DashboardRecentSales, DashboardStats, DashboardTransactionsChart } from "@/components/dashboard";
import { DashboardStatusSkeleton } from "@/components/dashboard/dashboardStats/DashboardStats";
import { DashboardRecentSalesSkeleton } from "@/components/dashboard/dashboardRecentSales/DashboardRecentSales";
import { DashboardTransactionsSkeleton } from "@/components/dashboard/dashboardTransactionsChart/DashboardTransactionsChart";

export default function DashboardPage() {
    return (
        <>
            {/*Status Card */}
            <Suspense fallback={<DashboardStatusSkeleton />}>
                <DashboardStats />
            </Suspense>

            <section className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-8 items-start">
                <Suspense fallback={<DashboardTransactionsSkeleton />}>
                    <DashboardTransactionsChart />
                </Suspense>
                <Suspense fallback={<DashboardRecentSalesSkeleton />}>
                    <DashboardRecentSales />
                </Suspense>
            </section>
        </>
    )
}