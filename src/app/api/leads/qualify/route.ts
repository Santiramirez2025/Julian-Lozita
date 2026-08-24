import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Valores permitidos (deben coincidir con el simulador del cliente)
const ALLOWED = {
  objetivo: ['comprar_vivir', 'invertir', 'resguardar', 'vender_permuta'],
  presupuesto: ['menos_50k', '50_100k', '100_200k', 'mas_200k', 'a_definir'],
  tipo: ['casa', 'departamento', 'lote', 'local', 'otro', 'no_seguro'],
  zona: ['centro', 'barrios', 'afueras', 'no_seguro'],
  plazo: ['ya', '1_3_meses', 'explorando'],
} as const

function pick<K extends keyof typeof ALLOWED>(key: K, value: unknown): string | null {
  return typeof value === 'string' && (ALLOWED[key] as readonly string[]).includes(value)
    ? value
    : null
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 80) : ''
    const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 40) : ''
    const objetivo = pick('objetivo', body.objetivo)
    const presupuesto = pick('presupuesto', body.presupuesto)

    if (!name || !phone) {
      return NextResponse.json({ error: 'Nombre y teléfono son obligatorios' }, { status: 400 })
    }
    if (!objetivo || !presupuesto) {
      return NextResponse.json({ error: 'Perfil incompleto' }, { status: 400 })
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      null

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        objetivo,
        presupuesto,
        tipo: pick('tipo', body.tipo),
        zona: pick('zona', body.zona),
        plazo: pick('plazo', body.plazo),
        summary: typeof body.summary === 'string' ? body.summary.slice(0, 1000) : null,
        source: 'landing_simulator',
        ip,
        userAgent: req.headers.get('user-agent')?.slice(0, 300) || null,
      },
      select: { id: true },
    })

    return NextResponse.json({ ok: true, id: lead.id })
  } catch (error) {
    console.error('Qualify lead error:', error)
    // No bloqueamos al usuario: el front igual abre WhatsApp aunque falle el guardado
    return NextResponse.json({ error: 'No se pudo guardar el lead' }, { status: 500 })
  }
}
