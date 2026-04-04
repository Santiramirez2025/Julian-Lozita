import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import anthropic, { AI_MODEL } from '@/lib/anthropic'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const scores = await prisma.propertyScore.findMany({
    orderBy: { heatScore: 'desc' },
  })

  const propertyIds = scores.map((s: any) => s.propertyId)
  const properties = await prisma.property.findMany({
    where: { id: { in: propertyIds } },
    select: {
      id: true, title: true, slug: true, price: true, currency: true,
      neighborhood: true, propertyType: true, coverImage: true, status: true,
      createdAt: true,
    },
  })
  const propMap = Object.fromEntries(properties.map((p: any) => [p.id, p]))

  const result = scores.map((s: any) => ({
    ...s,
    property: propMap[s.propertyId] || null,
    priceAnalysis: s.priceAnalysis ? JSON.parse(s.priceAnalysis) : null,
    aiSuggestions: s.aiSuggestions ? JSON.parse(s.aiSuggestions) : null,
  }))

  return NextResponse.json(result)
}

// POST: trigger AI analysis for a property or all
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { propertyId } = await req.json()

    const properties = propertyId
      ? await prisma.property.findMany({ where: { id: propertyId } })
      : await prisma.property.findMany({ where: { status: 'available', published: true } })

    const allProperties = await prisma.property.findMany({
      where: { status: 'available', published: true },
      select: { id: true, price: true, currency: true, neighborhood: true, propertyType: true, totalArea: true },
    })

    const scores = await prisma.propertyScore.findMany()
    const scoreMap = Object.fromEntries(scores.map((s: any) => [s.propertyId, s]))

    for (const property of properties) {
      const score = scoreMap[property.id]
      const sameZone = allProperties.filter(
        (p: any) => p.neighborhood === property.neighborhood && p.propertyType === property.propertyType && p.id !== property.id
      )
      const avgZonePrice = sameZone.length > 0
        ? sameZone.reduce((sum: any, p: any) => sum + p.price, 0) / sameZone.length
        : null

      const daysSinceCreation = Math.floor((Date.now() - new Date(property.createdAt).getTime()) / (1000 * 60 * 60 * 24))

      const prompt = `Analizá esta propiedad inmobiliaria y dame sugerencias:

PROPIEDAD:
- Título: ${property.title}
- Tipo: ${property.propertyType}
- Barrio: ${property.neighborhood}
- Precio: ${property.currency} ${property.price}
- Días publicada: ${daysSinceCreation}

MÉTRICAS (últimos 30 días):
- Vistas: ${score?.totalViews || 0}
- Visitantes únicos: ${score?.uniqueViews || 0}
- Clicks WhatsApp: ${score?.whatsappClicks || 0}
- Escaneos QR: ${score?.qrScans || 0}
- Tiempo promedio: ${Math.round(score?.avgTimeOnPage || 0)}s
- Scroll promedio: ${Math.round(score?.scrollDepth || 0)}%
- Heat Score: ${score?.heatScore || 0}/100

CONTEXTO DE MERCADO:
- Precio promedio zona (${property.neighborhood}, ${property.propertyType}): ${avgZonePrice ? `${property.currency} ${Math.round(avgZonePrice)}` : 'Sin datos suficientes'}
- ${avgZonePrice ? `Diferencia vs promedio: ${Math.round(((property.price - avgZonePrice) / avgZonePrice) * 100)}%` : ''}

Respondé SOLO en JSON válido sin markdown:
{
  "priceAnalysis": {
    "vsMarket": "above|below|fair",
    "percentDiff": number o null,
    "recommendation": "texto corto en argentino"
  },
  "suggestions": [
    {"type": "price|photo|highlight|description", "priority": "high|medium|low", "text": "sugerencia en argentino"}
  ],
  "demandLevel": "hot|warm|cold",
  "summary": "resumen de 1 oración en argentino"
}`

      const response = await anthropic.messages.create({
        model: AI_MODEL,
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      })

      const text = response.content[0].type === 'text' ? response.content[0].text : ''
      const cleaned = text.replace(/```json\n?|```\n?/g, '').trim()

      try {
        const analysis = JSON.parse(cleaned)

        await prisma.propertyScore.upsert({
          where: { propertyId: property.id },
          update: {
            priceAnalysis: JSON.stringify(analysis.priceAnalysis),
            aiSuggestions: JSON.stringify({
              suggestions: analysis.suggestions,
              demandLevel: analysis.demandLevel,
              summary: analysis.summary,
            }),
          },
          create: {
            propertyId: property.id,
            priceAnalysis: JSON.stringify(analysis.priceAnalysis),
            aiSuggestions: JSON.stringify({
              suggestions: analysis.suggestions,
              demandLevel: analysis.demandLevel,
              summary: analysis.summary,
            }),
          },
        })
      } catch {
        // Skip if AI response wasn't valid JSON
      }
    }

    return NextResponse.json({ ok: true, analyzed: properties.length })
  } catch (error) {
    console.error('Scoring error:', error)
    return NextResponse.json({ error: 'Error en análisis' }, { status: 500 })
  }
}
