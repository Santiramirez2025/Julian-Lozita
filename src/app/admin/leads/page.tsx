'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatPrice, timeAgo } from '@/lib/utils'

interface PropertyInfo {
  id: string
  title: string
  slug: string
  neighborhood: string
  price: number
  currency: string
  propertyType: string
  coverImage: string
  status: string
}

interface TopProperty {
  property: PropertyInfo
  count: number
  lastClick: string
}

interface RecentEvent {
  id: string
  propertyId: string
  type: string
  createdAt: string
  ip: string | null
  userAgent: string | null
  property: PropertyInfo | null
}

interface LeadsData {
  stats: {
    total: number
    today: number
    last7: number
    last30: number
  }
  topProperties: TopProperty[]
  recentEvents: RecentEvent[]
}

export default function AdminLeadsPage() {
  const [data, setData] = useState<LeadsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => {
        if (!res.ok) throw new Error('Failed')
        return res.json()
      })
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div>
        <div className="h-8 w-48 skeleton-shimmer rounded-lg mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 skeleton-shimmer rounded-2xl" />
          ))}
        </div>
        <div className="h-64 skeleton-shimmer rounded-2xl" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="text-center py-20">
        <p className="text-text-light mb-4">No pudimos cargar los leads.</p>
        <button
          onClick={() => window.location.reload()}
          className="text-primary text-sm font-medium underline"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-3xl text-text mb-1">Leads</h1>
        <p className="text-text-light text-sm">
          Personas que hicieron click en WhatsApp desde tus propiedades
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Hoy" value={data.stats.today} accent="primary" />
        <StatCard label="Últimos 7 días" value={data.stats.last7} accent="primary-light" />
        <StatCard label="Últimos 30 días" value={data.stats.last30} accent="accent" />
        <StatCard label="Total histórico" value={data.stats.total} accent="text" />
      </div>

      {/* Empty state */}
      {data.stats.total === 0 && (
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
          </div>
          <h3 className="font-heading font-bold text-lg text-text mb-2">Todavía no hay leads</h3>
          <p className="text-text-light text-sm max-w-sm mx-auto">
            Cuando alguien haga click en el botón de WhatsApp desde una propiedad, va a aparecer acá.
          </p>
        </div>
      )}

      {/* Top properties */}
      {data.topProperties.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading font-bold text-lg text-text mb-4">
            Propiedades más consultadas
          </h2>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            {data.topProperties.map((item, index) => (
              <Link
                key={item.property.id}
                href={`/propiedades/${item.property.slug}`}
                target="_blank"
                className="flex items-center gap-4 p-4 border-b border-border last:border-b-0 hover:bg-bg transition-colors"
              >
                {/* Rank */}
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{index + 1}</span>
                </div>

                {/* Image */}
                <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.property.coverImage}
                    alt={item.property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text text-sm truncate">{item.property.title}</p>
                  <p className="text-text-light text-xs truncate">
                    {item.property.neighborhood} · {formatPrice(item.property.price, item.property.currency)}
                  </p>
                  <p className="text-text-light text-xs mt-0.5">
                    Último click: {timeAgo(new Date(item.lastClick))}
                  </p>
                </div>

                {/* Count */}
                <div className="text-right shrink-0">
                  <p className="font-heading font-extrabold text-2xl text-primary leading-none">{item.count}</p>
                  <p className="text-text-light text-[10px] uppercase tracking-wider mt-1">clicks</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent events timeline */}
      {data.recentEvents.length > 0 && (
        <div>
          <h2 className="font-heading font-bold text-lg text-text mb-4">Actividad reciente</h2>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            {data.recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-4 border-b border-border last:border-b-0"
              >
                {/* WhatsApp icon */}
                <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  {event.property ? (
                    <>
                      <p className="text-sm text-text">
                        Click en WhatsApp desde{' '}
                        <Link
                          href={`/propiedades/${event.property.slug}`}
                          target="_blank"
                          className="font-semibold text-primary hover:underline"
                        >
                          {event.property.title}
                        </Link>
                      </p>
                      <p className="text-text-light text-xs mt-0.5">
                        {event.property.neighborhood} · {formatPrice(event.property.price, event.property.currency)}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-text-light">Click en WhatsApp (propiedad eliminada)</p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs text-text-light">{timeAgo(new Date(event.createdAt))}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Note */}
      <div className="mt-6 text-xs text-text-light text-center">
        Los leads son anónimos. Solo registramos el click — el contacto real ocurre directamente en WhatsApp.
      </div>
    </div>
  )
}

function StatCard({ label, value, accent }: { label: string; value: number; accent: string }) {
  const colors: Record<string, string> = {
    primary: 'text-primary',
    'primary-light': 'text-primary-light',
    accent: 'text-accent',
    text: 'text-text',
  }
  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <p className="text-text-light text-xs uppercase tracking-wider font-semibold mb-2">{label}</p>
      <p className={`font-heading font-extrabold text-3xl leading-none ${colors[accent] || 'text-text'}`}>
        {value}
      </p>
    </div>
  )
}
