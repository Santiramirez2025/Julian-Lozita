import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const featured = searchParams.get('featured')
  const limit = searchParams.get('limit')
  const stats = searchParams.get('stats')
  const status = searchParams.get('status')

  // Return stats only
  if (stats === 'true') {
    const [total, available, reserved, sold] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: 'available' } }),
      prisma.property.count({ where: { status: 'reserved' } }),
      prisma.property.count({ where: { status: 'sold' } }),
    ])
    return NextResponse.json({ total, available, reserved, sold })
  }

  const where: Record<string, unknown> = {}

  // Public queries only show published properties
  const session = await getServerSession(authOptions)
  if (!session) {
    where.published = true
  }

  if (featured === 'true') {
    where.featured = true
    where.status = 'available'
  }

  if (status) {
    where.status = status
  }

  const properties = await prisma.property.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit ? parseInt(limit) : undefined,
  })

  return NextResponse.json(properties)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const data = await req.json()

    // Check slug uniqueness
    const existing = await prisma.property.findUnique({ where: { slug: data.slug } })
    if (existing) {
      // Append random suffix
      data.slug = `${data.slug}-${Date.now().toString(36)}`
    }

    const property = await prisma.property.create({ data })
    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json({ error: 'Error al crear propiedad' }, { status: 500 })
  }
}
