import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get all whatsapp_click events with property info
    const events = await prisma.propertyEvent.findMany({
      where: {
        type: 'whatsapp_click',
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            slug: true,
            neighborhood: true,
            price: true,
            currency: true,
            propertyType: true,
            coverImage: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 200,
    })

    // Calculate stats
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const todayCount = events.filter((e: typeof events[0]) => e.createdAt >= today).length
    const last7Count = events.filter((e: typeof events[0]) => e.createdAt >= last7Days).length
    const last30Count = events.filter((e: typeof events[0]) => e.createdAt >= last30Days).length

    // Group by property to find hot properties
    const byProperty = new Map<string, { property: typeof events[0]['property']; count: number; lastClick: Date }>()
    for (const event of events) {
      if (!event.property) continue
      const existing = byProperty.get(event.propertyId)
      if (existing) {
        existing.count++
        if (event.createdAt > existing.lastClick) {
          existing.lastClick = event.createdAt
        }
      } else {
        byProperty.set(event.propertyId, {
          property: event.property,
          count: 1,
          lastClick: event.createdAt,
        })
      }
    }

    const topProperties = Array.from(byProperty.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return NextResponse.json({
      stats: {
        total: events.length,
        today: todayCount,
        last7: last7Count,
        last30: last30Count,
      },
      topProperties,
      recentEvents: events.slice(0, 50),
    })
  } catch (error) {
    console.error('Leads API error:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}
