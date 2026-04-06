import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateQRBuffer } from '@/lib/qr'
import sharp from 'sharp'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://julianlozita.com'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { searchParams } = new URL(req.url)
  const isPoster = searchParams.get('poster') === 'true'

  const property = await prisma.property.findUnique({
    where: { id },
    select: { slug: true, title: true },
  })

  if (!property) {
    return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 })
  }

  const qrBuffer = await generateQRBuffer(property.slug)

  if (!isPoster) {
    return new NextResponse(new Uint8Array(qrBuffer), {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="qr-${property.slug}.png"`,
      },
    })
  }

  // Generate A4 poster (2480x3508 at 300 DPI)
  const posterWidth = 2480
  const posterHeight = 3508
  const qrSize = 1200

  // Create poster with sharp
  const poster = await sharp({
    create: {
      width: posterWidth,
      height: posterHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      // QR code centered
      {
        input: await sharp(qrBuffer).resize(qrSize, qrSize).toBuffer(),
        top: Math.round(posterHeight * 0.35),
        left: Math.round((posterWidth - qrSize) / 2),
      },
      // Logo text "J-LOZITA" with cyan accent bar (V3 style)
      {
        input: Buffer.from(`
          <svg width="${posterWidth}" height="400">
            <rect x="${posterWidth / 2 - 120}" y="100" width="240" height="20" rx="10" fill="#00D4FF"/>
            <text x="${posterWidth / 2}" y="240" text-anchor="middle" font-family="Arial, sans-serif" font-weight="800" font-size="200" fill="#1E3A5F" letter-spacing="-8">J-LOZITA</text>
            <text x="${posterWidth / 2}" y="340" text-anchor="middle" font-family="Arial, sans-serif" font-weight="300" font-size="70" fill="#64748B" letter-spacing="30">INMOBILIARIA</text>
          </svg>
        `),
        top: Math.round(posterHeight * 0.08),
        left: 0,
      },
      // Bottom text
      {
        input: Buffer.from(`
          <svg width="${posterWidth}" height="500">
            <text x="${posterWidth / 2}" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="100" fill="#1A1A2E">Escaneá y mirá</text>
            <text x="${posterWidth / 2}" y="230" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="100" fill="#1A1A2E">esta propiedad</text>
            <text x="${posterWidth / 2}" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-weight="normal" font-size="70" fill="#64748B">${SITE_URL.replace('https://', '')}</text>
          </svg>
        `),
        top: Math.round(posterHeight * 0.72),
        left: 0,
      },
    ])
    .png()
    .toBuffer()

  return new NextResponse(new Uint8Array(poster), {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="cartel-${property.slug}.png"`,
    },
  })
}
