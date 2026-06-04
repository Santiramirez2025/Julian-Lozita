import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { PrismaClient } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'
import { uploadImage } from '../src/lib/cloudinary'

const SLUG = 'casa-premium-en-costa-de-oro'
const DIR = 'public/temp/prop1'

// Carga simple de .env.local / .env sin dependencia de dotenv.
// Solo setea variables que aún no estén definidas en process.env.
function loadEnvFile(path: string) {
  let raw: string
  try {
    raw = readFileSync(path, 'utf8')
  } catch {
    return
  }
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/)
    if (!m) continue
    const key = m[1]
    let val = m[2]
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}
loadEnvFile('.env.local')
loadEnvFile('.env')

// Re-configurar Cloudinary con los valores cargados del .env, porque
// src/lib/cloudinary.ts llama config() al importarse (cuando process.env
// todavía podía estar sin las creds). cloudinary es un singleton.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const prisma = new PrismaClient()

// Sort natural por número final del archivo:
//   "PHOTO-....jpg"      → 1  (la original sin sufijo)
//   "PHOTO-... 2.jpg"    → 2
//   "PHOTO-... 27.jpg"   → 27
function orderKey(name: string): number {
  const m = name.match(/ (\d+)\.jpg$/i)
  return m ? parseInt(m[1], 10) : 1
}

async function main() {
  // Validación temprana: si falta cualquier credencial, abortar con mensaje claro.
  const missing = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'].filter(
    (k) => !process.env[k],
  )
  if (missing.length) {
    console.error(`Faltan credenciales: ${missing.join(', ')}`)
    console.error('Completá los valores en .env.local antes de correr este script.')
    process.exit(1)
  }

  const files = readdirSync(DIR)
    .filter((f) => f.toLowerCase().endsWith('.jpg'))
    .sort((a, b) => orderKey(a) - orderKey(b))

  if (files.length === 0) {
    console.error(`No se encontraron .jpg en ${DIR}`)
    process.exit(1)
  }

  console.log(`Subiendo ${files.length} imágenes desde ${DIR}\n`)

  const urls: string[] = []
  for (let i = 0; i < files.length; i++) {
    const path = join(DIR, files[i])
    const buf = readFileSync(path)
    const base64 = 'data:image/jpeg;base64,' + buf.toString('base64')
    process.stdout.write(`  [${String(i + 1).padStart(2, '0')}/${files.length}] ${files[i]}  →  `)
    const { url } = await uploadImage(base64)
    urls.push(url)
    console.log(url)
  }

  const updated = await prisma.property.update({
    where: { slug: SLUG },
    data: {
      images: urls,
      coverImage: urls[0] ?? '',
    },
    select: { id: true, slug: true, images: true, coverImage: true },
  })

  console.log(`\nPropiedad actualizada: /${updated.slug}`)
  console.log(`  images.length = ${updated.images.length}`)
  console.log(`  coverImage    = ${updated.coverImage}`)
  console.log(`\nFotos subidas: ${urls.length}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
