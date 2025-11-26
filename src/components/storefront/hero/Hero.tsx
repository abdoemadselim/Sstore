
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/base/carousel"
import prisma from "@/lib/db"
import Image from "next/image.js";

const getBanners = async () => {
    const banners = prisma.banner.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return banners;
}

export default async function Hero() {
    const banners = await getBanners()
    return (
        <Carousel className="max-w-7xl">
            <CarouselContent className="h-full rounded-xl">
                {
                    banners.map((banner) => (
                        <CarouselItem key={banner.id}>
                            <div className="h-[60vh] lg:h-[80vh] relative">
                                <Image
                                    src={banner.image}
                                    alt={banner.title}
                                    className="w-full h-full object-cover rounded-xl"
                                    fill
                                />
                                <div className="absolute top-6 left-6 bg-black/70 text-white py-6 px-10 hover:scale-105 rounded-xl shadow-xl transition-transform lg:text-4xl text-xl">{banner.title}</div>
                            </div>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
        </Carousel>
    )
}