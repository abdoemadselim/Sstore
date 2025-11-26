// Libs
import Image from "next/image";
import Link from "next/link";

// Components
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/base/carousel";
import { Button } from "@/components/base/button";
import { Skeleton } from "@/components/base/skeleton";

interface IProps {
    item: {
        name: string;
        slug: string;
        description: string;
        price: number;
        images: string[];
    }
}

export default function ProductCard({ item }: IProps) {
    return (
        <div>
            <Carousel className="w-full">
                <CarouselContent>
                    {
                        item.images.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="h-[350px] relative">
                                    <Image
                                        src={image}
                                        alt={item.name}
                                        className="object-center object-cover"
                                        fill
                                    />
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="ml-16" />
                <CarouselNext className="mr-16" />
            </Carousel>

            <div className="flex justify-between items-center mt-3">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <span className="ring-1 ring-primary/10 ring-inset px-2 font-medium text-sm py-1 rounded-md bg-primary/10 text-primary">${item.price}</span>
            </div>
            <p className="line-clamp-2 text-gray-600 text-sm pt-4">{item.description}</p>
            <Button className="mt-4 w-full py-4" asChild>
                <Link href={`/product/${item.slug}`}>
                    Learn More
                </Link>
            </Button>
        </div>
    )
}

export function ProductCardSkeleton() {
    return (
        <div>
            <div className="h-[350px] relative">
                <Skeleton className="h-full" />
            </div>
            <div className="flex justify-between items-center mt-3">
                <Skeleton />
                <Skeleton />
            </div>
            <Skeleton className="line-clamp-2 text-gray-600 text-sm pt-4" />
            <Skeleton className="mt-4 w-full py-4 bg-blue-500/20" />
        </div>
    )
}