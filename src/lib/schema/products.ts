import { z } from 'zod'

export const ProductSchema = z.object({
    name: z.string("Product name is required"),
    slug: z.string("Product slug is required"),
    description: z.string("Product description is required"),
    price: z.number("Product price is required").min(1, "Product price should be higher than 1"),
    featured: z.enum(["on", "off"]).optional(),
    images: z.array(z.string()).min(1, "At least one image is required"),
    category: z.enum(["men", "women", "kids"], "Category should have one of the following values (men, women, kids)"),
    status: z.enum(["draft", "published", "archived"], "Status should have one of the following values (draft, published, archived)")
})