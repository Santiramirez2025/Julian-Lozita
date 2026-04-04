import { NextRequest } from 'next/server'
import anthropic, { AI_MODEL, getChatSystemPrompt } from '@/lib/anthropic'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    if (!message) {
      return new Response('Mensaje requerido', { status: 400 })
    }

    // Fetch current properties from DB
    const properties = await prisma.property.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        currency: true,
        neighborhood: true,
        propertyType: true,
        rooms: true,
        bedrooms: true,
        bathrooms: true,
        totalArea: true,
        features: true,
        status: true,
        acceptsPermuta: true,
        hasFinancing: true,
        urgentSale: true,
        garages: true,
      },
    })

    const systemPrompt = getChatSystemPrompt(JSON.stringify(properties, null, 2))

    const messages = (history || []).map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }))

    // Ensure last message is the current user message
    if (messages.length === 0 || messages[messages.length - 1]?.content !== message) {
      messages.push({ role: 'user', content: message })
    }

    const stream = anthropic.messages.stream({
      model: AI_MODEL,
      max_tokens: 500,
      system: systemPrompt,
      messages,
    })

    const encoder = new TextEncoder()

    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return new Response('Error en el chat', { status: 500 })
  }
}
