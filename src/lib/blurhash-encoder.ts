import sharp from "sharp"
import { encode } from "blurhash"

async function getImageBufferFromURL(url: string) {
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

export async function getBlurHashFromURL(url: string) {
  try {
    const imgBuffer = await getImageBufferFromURL(url)

    const image = sharp(imgBuffer).raw().ensureAlpha()
    const { data, info } = await image.toBuffer({ resolveWithObject: true })

    const blurHash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4)
    return blurHash
  } catch (error) {
    console.error("Failed blurhash generation for:", url, error)
    return null
  }
}