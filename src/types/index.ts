import { $Enums } from "@prisma/client";

export type ProductType = {
    id: number;
    images: string[];
    slug: string;
    name: string;
    description: string;
    price: number;
    category: $Enums.ProductCategory;
}

export type CartType = {
    userId: string;
    items: Array<CartItemType>
}

export type CartItemType = {
    name: string;
    price: number;
    id: number;
    slug: string;
    images: string[];
    quantity: number;
    category: $Enums.ProductCategory
}