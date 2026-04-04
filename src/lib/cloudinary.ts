import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

export async function uploadImage(base64: string): Promise<string> {
  const result = await cloudinary.uploader.upload(base64, {
    folder: 'j-lozita',
    quality: 'auto',
    fetch_format: 'auto',
    transformation: [
      { width: 1200, height: 800, crop: 'limit' },
    ],
  })
  return result.secure_url
}

export async function deleteImage(url: string): Promise<void> {
  const publicId = url.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, '')
  await cloudinary.uploader.destroy(publicId)
}
