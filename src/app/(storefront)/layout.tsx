// Components
import { Toaster } from "@/components/base/sonner";
import { Footer, Navbar } from "@/components/storefront";

export default function StoreFrontLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 lg:px-8 flex-1 w-full">{children}</main>
            <Footer />
            <Toaster position="top-right" />
        </div>
    );
}
