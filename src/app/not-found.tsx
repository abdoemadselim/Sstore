import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/base/button"
import { Card, CardContent } from "@/components/base/card"

export default function NotFoundPage() {
    return (
        <div className="min-h-[60vh] w-full flex justify-center items-center">
            <Card className="xl:max-w-[27vw] lg:max-w-[40vw] text-center rounded-md">
                <CardContent className="flex flex-col justify-center items-center gap-4">
                    <div className="bg-red-500/20 text-red-500 flex justify-center items-center w-[50px] h-[50px] rounded-full">
                        <AlertCircle className="w-[30px] h-[30px]" />
                    </div>
                    <h2 className="text-2xl font-semibold">Page Not Found</h2>
                    <p className="text-muted-foreground text-center">
                        Sorry, the page you are looking for does not exist.
                    </p>
                    <Button asChild className="mt-4 w-full">
                        <Link href="/">Back to Homepage</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
