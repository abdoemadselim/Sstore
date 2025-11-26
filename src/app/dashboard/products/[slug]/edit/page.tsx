// Prisma Client
import prisma from "@/lib/db"

// Libs
import { notFound } from "next/navigation"

// Components
import EditForm from "@/components/dashboard/editForm/EditForm"

const getProduct = async (slug: string) => {
    const product = await prisma.product.findUnique({
        where: {
            slug: slug
        }
    })

    if (!product) {
        return notFound()
    }

    return product
}

export default async function EditProductPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const data = await getProduct(slug)

    return (
        <EditForm data={data} />
    )
}