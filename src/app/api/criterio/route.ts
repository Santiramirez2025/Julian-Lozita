import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { prisma } from '@/lib/prisma'

/**
 * Captura de la guía /criterio → modelo GuiaLead.
 *
 * Anti-bot sin captcha:
 *   1. Honeypot: campo oculto `company` que un humano nunca completa.
 *   2. Check de tiempo: `ts` (momento de render); si el envío llega demasiado
 *      rápido (< 2.5s) o absurdamente tarde (> 2h) se descarta.
 *   3. Rate limit por IP en memoria (best-effort en serverless).
 *
 * La IP se guarda SOLO hasheada (SHA-256 + salt). La IP en claro se usa nada
 * más que en memoria, de forma transitoria, para el rate limit.
 */

// Validación de email compartida con el cliente (mismo criterio).
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// --- Rate limit por IP (ventana deslizante, en memoria) ---------------------
const RL_WINDOW_MS = 10 * 60 * 1000 // 10 minutos
const RL_MAX = 5 // máx. envíos por IP por ventana
const hits = new Map<string, number[]>()

function rateLimited(ipKey: string, now: number): boolean {
  const prev = hits.get(ipKey)?.filter((t) => now - t < RL_WINDOW_MS) ?? []
  if (prev.length >= RL_MAX) {
    hits.set(ipKey, prev)
    return true
  }
  prev.push(now)
  hits.set(ipKey, prev)
  // Limpieza oportunista para que el Map no crezca sin límite.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      const fresh = v.filter((t) => now - t < RL_WINDOW_MS)
      if (fresh.length === 0) hits.delete(k)
      else hits.set(k, fresh)
    }
  }
  return false
}

function hashIp(ip: string | null): string | null {
  if (!ip) return null
  const salt = process.env.IP_HASH_SALT || 'jl-criterio-v1'
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 })
    }

    // 1) Honeypot: si viene con contenido, es un bot. Respondemos ok para no
    //    darle señal, pero no guardamos nada.
    if (typeof body.company === 'string' && body.company.trim() !== '') {
      return NextResponse.json({ ok: true })
    }

    // 2) Check de tiempo desde el render del formulario.
    const now = Date.now()
    const ts = Number(body.ts)
    if (Number.isFinite(ts)) {
      const elapsed = now - ts
      if (elapsed < 2500 || elapsed > 2 * 60 * 60 * 1000) {
        return NextResponse.json({ ok: true })
      }
    }

    // 3) Rate limit por IP.
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      null
    if (ip && rateLimited(ip, now)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Probá de nuevo en un rato.' },
        { status: 429 }
      )
    }

    // --- Validación de datos ---
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 80) : ''
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase().slice(0, 160) : ''
    const whatsappRaw = typeof body.whatsapp === 'string' ? body.whatsapp.trim().slice(0, 40) : ''
    const whatsapp = whatsappRaw || null
    const source =
      typeof body.source === 'string' && body.source.trim()
        ? body.source.trim().slice(0, 60)
        : 'criterio'

    if (!name) {
      return NextResponse.json({ error: 'Necesitamos tu nombre' }, { status: 400 })
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'El email no parece válido' }, { status: 400 })
    }

    // Email único → upsert. Descargar dos veces no es un error.
    await prisma.guiaLead.upsert({
      where: { email },
      update: {
        name,
        whatsapp,
        source,
        ipHash: hashIp(ip),
        userAgent: req.headers.get('user-agent')?.slice(0, 300) || null,
      },
      create: {
        name,
        email,
        whatsapp,
        source,
        ipHash: hashIp(ip),
        userAgent: req.headers.get('user-agent')?.slice(0, 300) || null,
      },
      select: { id: true },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Criterio lead error:', error)
    return NextResponse.json({ error: 'No se pudo guardar. Probá de nuevo.' }, { status: 500 })
  }
}
