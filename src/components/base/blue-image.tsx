"use client";

import Image, { ImageProps } from "next/image";
import { useMemo } from "react";
import { blurhashToDataURL } from "@/lib/blurhash-decoder";

interface BlurImageProps extends ImageProps {
    blurHash: string;
}

export default function BlurImage({ blurHash, ...props }: BlurImageProps) {
    const blurDataURL = useMemo(() => blurhashToDataURL(blurHash), [blurHash]);

    return (
        <Image
            {...props}
            placeholder="blur"
            blurDataURL={blurDataURL}
        />
    );
}
