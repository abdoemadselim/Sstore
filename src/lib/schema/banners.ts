import { z } from 'zod'

export const BannerSchema = z.object({
    title: z.string("Banner title is required"),
    image: z.string("Image is required"),
})