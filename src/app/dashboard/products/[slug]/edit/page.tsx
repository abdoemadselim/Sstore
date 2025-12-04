// Prisma Client
import prisma from "@/lib/db"

// Libs
import { notFound } from "next/navigation"

// Components
import EditForm from "@/components/dashboard/editForm/EditForm"
import { Suspense } from "react"

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

    const slugParam = params.then((sp) => ({ slug: sp.slug }))
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditProductContent slugParam={slugParam} />
        </Suspense>
    )
}

async function EditProductContent({ slugParam
}: {
    slugParam: Promise<{ slug: string }>
}) {
    const { slug } = await slugParam;
    const data = await getProduct(slug)

    return (
        <EditForm data={data} />
    )
}
