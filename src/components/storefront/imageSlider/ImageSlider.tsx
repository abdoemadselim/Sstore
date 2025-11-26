'use client'

// Libs
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Components
import { Button } from "@/components/base/button";

export default function ImageSlider({ images }: { images: string[] }) {
    const [imageIndex, setImageIndex] = useState(0)

    const handlePreviousClick = () => {
        setImageIndex(imageIndex == 0 ? images.length - 1 : imageIndex - 1)
    }

    const handleNextClick = () => {
        setImageIndex(imageIndex == images.length - 1 ? 0 : imageIndex + 1)
    }

    return (
        <div>
            <div className="relative">
                <Image
                    src={images[imageIndex] as string}
                    alt={"Product Image"}
                    width={600}
                    height={600}
                    className="object-cover object-center lg:w-[600px] w-full h-[600px]"
                />

                <div className="inset-0 absolute flex justify-between items-center px-4">
                    <Button variant="ghost" className="cursor-pointer bg-gray-200/40 hover:bg-gray-200/80 p-1" size="lg" onClick={handlePreviousClick}>
                        <ChevronLeft />
                    </Button>

                    <Button variant="ghost" className="cursor-pointer bg-gray-200/40 hover:bg-gray-200/80 p-1" size="lg" onClick={handleNextClick}>
                        <ChevronRight />
                    </Button>
                </div>
            </div>

            <div className="grid sm:grid-cols-5 grid-cols-3 sm:gap-3 gap-1 pt-2 max-w-[600px]">
                {
                    images.map((image, index) => (
                        <div key={image} className={`relative flex justify-center items-center rounded-lg w-[104px] h-[104px] cursor-pointer ${index == imageIndex ? "border-2 border-primary" : "border border-gray-200"}`} onClick={() => setImageIndex(index)}>
                            <Image
                                src={image}
                                alt={"Product Image"}
                                width={100}
                                height={100}
                                className="object-cover object-center w-[100px] h-[100px]"
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}