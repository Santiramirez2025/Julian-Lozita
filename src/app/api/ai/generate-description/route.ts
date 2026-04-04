import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import anthropic, { AI_MODEL, getDescriptionPrompt } from '@/lib/anthropic'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const prompt = getDescriptionPrompt(data)

    const response = await anthropic.messages.create({
      model: AI_MODEL,
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    // Parse JSON response
    const cleaned = text.replace(/```json\n?|```\n?/g, '').trim()
    const result = JSON.parse(cleaned)

    return NextResponse.json(result)
  } catch (error) {
    console.error('AI description error:', error)
    return NextResponse.json({ error: 'Error al generar descripción' }, { status: 500 })
  }
}
