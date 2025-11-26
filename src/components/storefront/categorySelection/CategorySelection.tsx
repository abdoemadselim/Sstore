// Libs
import Image from "next/image";
import Link from "next/link";

export default function CategorySelection() {
    return (
        <div className="py-24 lg:py-32 h-[1100px] lg:h-[750px]">
            <div className="flex justify-between items-center md:flex-row flex-col gap-4">
                <h2 className="font-extrabold sm:text-5xl text-4xl text-center">Shop by Category</h2>
                <Link href="/products/all" className="font-bold text-lg text-primary hover:text-primary/80">
                    Browse all Products &rarr;
                </Link>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 pt-10 h-140 lg:gap-4 gap-8">
                <div className="relative rounded-lg lg:h-[560px] h-[280px]">
                    <Image
                        src="/all-categories.jpg"
                        alt="Category Image"
                        className="object-cover object-top lg:object-center absolute inset-0"
                        fill
                    />

                    <div className="bg-linear-to-b from-transparent to-black opacity-60 absolute inset-0"></div>
                    <Link href="/products/all" className="group absolute bottom-6 left-6 text-white hover:-translate-y-1">
                        <h2 className="sm:text-4xl text-3xl pb-1 font-extrabold group-hover:scale-101 group-hover:-rotate-2 transition-transform">All Products</h2>
                        <p className="text-xl pb-1 group-hover:scale-101 transition-transform group-hover:-rotate-2 group-hover:translate-y-1 group-hover:border-b w-fit">Shop now &rarr;</p>
                    </Link>
                </div>
                <div className="flex flex-col lg:gap-3 gap-8">
                    <div className="relative rounded-lg lg:h-[274px] h-[280px]">
                        <Image
                            src="/men.jpg"
                            alt="Category Image"
                            className="object-cover object-center"
                            fill
                        />

                        <div className="bg-linear-to-b from-transparent to-black opacity-50 absolute inset-0"></div>
                        <Link href="/products/men" className="group absolute bottom-6 left-6 text-white hover:-translate-y-1">
                            <h2 className="sm:text-4xl text-3xl pb-1 font-extrabold group-hover:scale-101 group-hover:rotate-2 transition-transform">Men Category</h2>
                            <p className="text-xl pb-1 group-hover:scale-101 transition-transform group-hover:rotate-2 group-hover:translate-y-1 group-hover:border-b w-fit">Shop now &rarr;</p>
                        </Link>
                    </div>
                    <div className="relative rounded-lg lg:h-[274px] h-[280px]">
                        <Image
                            src="/women.jpg"
                            alt="Category Image"
                            className="object-cover object-center"
                            fill
                        />

                        <div className="bg-linear-to-b from-transparent to-black opacity-60 absolute inset-0"></div>
                        <Link href="/products/women" className="group absolute bottom-6 left-6 text-white hover:-translate-y-1">
                            <h2 className="sm:text-4xl text-3xl pb-1 font-extrabold group-hover:scale-101 group-hover:-rotate-2 transition-transform">Women Category</h2>
                            <p className="text-xl pb-1 group-hover:scale-101 transition-transform group-hover:-rotate-2 group-hover:translate-y-1 group-hover:border-b w-fit">Shop now &rarr;</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}