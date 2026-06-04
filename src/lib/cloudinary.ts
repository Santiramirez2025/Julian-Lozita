import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

export interface UploadResult {
  url: string
  thumbnail: string
}

export async function uploadImage(base64: string): Promise<UploadResult> {
  // Subimos una sola vez (limitando a 1920px para acotar almacenamiento).
  // Las versiones de entrega se generan on-the-fly vía transformaciones de URL,
  // que Cloudinary cachea en su CDN: más eficiente que procesar en el servidor.
  const result = await cloudinary.uploader.upload(base64, {
    folder: 'j-lozita',
    transformation: [{ width: 1920, crop: 'limit' }],
  })

  const url = cloudinary.url(result.public_id, {
    secure: true,
    width: 1920,
    crop: 'limit',
    quality: 80,
    fetch_format: 'auto',
  })

  const thumbnail = cloudinary.url(result.public_id, {
    secure: true,
    width: 400,
    crop: 'limit',
    quality: 70,
    fetch_format: 'auto',
  })

  return { url, thumbnail }
}

export async function deleteImage(url: string): Promise<void> {
  const publicId = url.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, '')
  await cloudinary.uploader.destroy(publicId)
}
