import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface EventRecord {
  type: string
  value: string | null
  ip: string | null
  sessionId: string | null
}

export async function POST(req: NextRequest) {
  try {
    const { propertyId, type, value, sessionId } = await req.json()

    if (!propertyId || !type) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const validTypes = ['view', 'scroll', 'whatsapp_click', 'qr_scan', 'share', 'gallery_open', 'time_on_page']
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid event type' }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || ''
    const referrer = req.headers.get('referer') || ''

    await prisma.propertyEvent.create({
      data: {
        propertyId,
        type,
        value: value?.toString(),
        ip,
        userAgent,
        referrer,
        sessionId,
      },
    })

    // Update score cache asynchronously
    updateScoreCache(propertyId).catch(() => {})

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Error tracking event' }, { status: 500 })
  }
}

async function updateScoreCache(propertyId: string) {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const events: EventRecord[] = await prisma.propertyEvent.findMany({
    where: { propertyId, createdAt: { gte: thirtyDaysAgo } },
    select: { type: true, value: true, ip: true, sessionId: true },
  })

  const totalViews = events.filter((e: any) => e.type === 'view').length
  const uniqueIps = new Set(events.filter((e: any) => e.type === 'view').map((e: any) => e.ip))
  const qrScans = events.filter((e: any) => e.type === 'qr_scan').length
  const whatsappClicks = events.filter((e: any) => e.type === 'whatsapp_click').length
  const shares = events.filter((e: any) => e.type === 'share').length

  const timeEvents = events.filter((e: any) => e.type === 'time_on_page' && e.value)
  const avgTime = timeEvents.length > 0
    ? timeEvents.reduce((sum: any, e: any) => sum + parseFloat(e.value || '0'), 0) / timeEvents.length
    : 0

  const scrollEvents = events.filter((e: any) => e.type === 'scroll' && e.value)
  const avgScroll = scrollEvents.length > 0
    ? scrollEvents.reduce((sum: any, e: any) => sum + parseFloat(e.value || '0'), 0) / scrollEvents.length
    : 0

  // Heat score: weighted formula
  const heatScore = Math.min(100, Math.round(
    (totalViews * 2) +
    (uniqueIps.size * 5) +
    (whatsappClicks * 20) +
    (qrScans * 15) +
    (shares * 10) +
    (avgTime > 30 ? 10 : avgTime * 0.33) +
    (avgScroll > 50 ? 5 : 0)
  ))

  await prisma.propertyScore.upsert({
    where: { propertyId },
    update: {
      totalViews,
      uniqueViews: uniqueIps.size,
      qrScans,
      whatsappClicks,
      avgTimeOnPage: avgTime,
      scrollDepth: avgScroll,
      shares,
      heatScore,
    },
    create: {
      propertyId,
      totalViews,
      uniqueViews: uniqueIps.size,
      qrScans,
      whatsappClicks,
      avgTimeOnPage: avgTime,
      scrollDepth: avgScroll,
      shares,
      heatScore,
    },
  })
}
