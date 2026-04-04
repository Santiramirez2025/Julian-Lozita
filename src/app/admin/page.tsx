'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import DashboardStats from '@/components/admin/DashboardStats'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Property } from '@/types'
import { formatPrice, timeAgo, statusLabel } from '@/lib/utils'

export default function AdminDashboard() {
  const [recent, setRecent] = useState<Property[]>([])

  useEffect(() => {
    fetch('/api/propiedades?limit=5')
      .then((r) => r.json())
      .then(setRecent)
      .catch(() => {})
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-text">Dashboard</h1>
          <p className="text-text-light text-sm">Resumen de tu inmobiliaria</p>
        </div>
        <Link href="/admin/propiedades/nueva">
          <Button>+ Nueva propiedad</Button>
        </Link>
      </div>

      <DashboardStats />

      {/* Recent properties */}
      <div className="mt-8">
        <h2 className="font-heading font-bold text-lg text-text mb-4">Últimas propiedades</h2>
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {recent.map((p) => (
            <Link
              key={p.id}
              href={`/admin/propiedades/${p.id}/editar`}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-border last:border-0"
            >
              {p.coverImage && (
                <img
                  src={p.coverImage}
                  alt={p.title}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text text-sm truncate">{p.title}</p>
                <p className="text-text-light text-xs">{p.neighborhood} · {timeAgo(new Date(p.createdAt))}</p>
              </div>
              <span className="price-display text-sm text-primary">{formatPrice(p.price, p.currency)}</span>
              <Badge variant={p.status === 'available' ? 'success' : p.status === 'reserved' ? 'warning' : 'danger'}>
                {statusLabel(p.status)}
              </Badge>
            </Link>
          ))}
          {recent.length === 0 && (
            <p className="p-8 text-center text-text-light text-sm">No hay propiedades cargadas</p>
          )}
        </div>
      </div>
    </div>
  )
}
