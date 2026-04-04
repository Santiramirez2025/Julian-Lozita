import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface EventRecord {
  type: string
  propertyId: string
  createdAt: Date
  value: string | null
  ip: string | null
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const period = searchParams.get('period') || '30' // days
  const propertyId = searchParams.get('propertyId')

  const since = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000)

  const where: Record<string, unknown> = { createdAt: { gte: since } }
  if (propertyId) where.propertyId = propertyId

  const events: EventRecord[] = await prisma.propertyEvent.findMany({
    where,
    select: {
      type: true,
      propertyId: true,
      createdAt: true,
      value: true,
      ip: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  // Global stats
  const totalViews = events.filter((e: any) => e.type === 'view').length
  const uniqueVisitors = new Set(events.filter((e: any) => e.type === 'view').map((e: any) => e.ip)).size
  const totalWhatsapp = events.filter((e: any) => e.type === 'whatsapp_click').length
  const totalQrScans = events.filter((e: any) => e.type === 'qr_scan').length
  const totalShares = events.filter((e: any) => e.type === 'share').length

  // Conversion funnel
  const viewSessions = new Set(events.filter((e: any) => e.type === 'view').map((e: any) => e.ip))
  const scrollSessions = new Set(events.filter((e: any) => e.type === 'scroll').map((e: any) => e.ip))
  const whatsappSessions = new Set(events.filter((e: any) => e.type === 'whatsapp_click').map((e: any) => e.ip))

  const funnel = {
    views: viewSessions.size,
    scrolled: scrollSessions.size,
    whatsapp: whatsappSessions.size,
    conversionRate: viewSessions.size > 0
      ? Math.round((whatsappSessions.size / viewSessions.size) * 100 * 10) / 10
      : 0,
  }

  // Views by day (last N days)
  const viewsByDay: Record<string, number> = {}
  events
    .filter((e: any) => e.type === 'view')
    .forEach((e: any) => {
      const day = e.createdAt.toISOString().split('T')[0]
      viewsByDay[day] = (viewsByDay[day] || 0) + 1
    })

  // Top neighborhoods
  const neighborhoodViews: Record<string, number> = {}
  const propertyNeighborhoods: { id: string; neighborhood: string }[] = await prisma.property.findMany({
    select: { id: true, neighborhood: true },
  })
  const neighMap = Object.fromEntries(propertyNeighborhoods.map((p: any) => [p.id, p.neighborhood]))

  events
    .filter((e: any) => e.type === 'view')
    .forEach((e: any) => {
      const neigh = neighMap[e.propertyId] || 'Desconocido'
      neighborhoodViews[neigh] = (neighborhoodViews[neigh] || 0) + 1
    })

  const topNeighborhoods = Object.entries(neighborhoodViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, views]) => ({ name, views }))

  // Top properties by score
  const topProperties = await prisma.propertyScore.findMany({
    orderBy: { heatScore: 'desc' },
    take: 10,
  })

  // Get property details for top scores
  const topPropertyIds = topProperties.map((s: any) => s.propertyId)
  const propertyDetails = await prisma.property.findMany({
    where: { id: { in: topPropertyIds } },
    select: { id: true, title: true, slug: true, neighborhood: true, price: true, currency: true, coverImage: true },
  })
  const detailsMap = Object.fromEntries(propertyDetails.map((p: any) => [p.id, p]))

  const topPropertiesWithDetails = topProperties.map((s: any) => ({
    ...s,
    property: detailsMap[s.propertyId] || null,
  }))

  return NextResponse.json({
    summary: {
      totalViews,
      uniqueVisitors,
      totalWhatsapp,
      totalQrScans,
      totalShares,
    },
    funnel,
    viewsByDay,
    topNeighborhoods,
    topProperties: topPropertiesWithDetails,
  })
}
