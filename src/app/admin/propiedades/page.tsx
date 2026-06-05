'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import QRDownloader from '@/components/admin/QRDownloader'
import { Property } from '@/types'
import { formatPrice, statusLabel, timeAgo } from '@/lib/utils'

export default function AdminPropiedadesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  const fetchProperties = () => {
    setLoading(true)
    fetch('/api/propiedades')
      .then((r) => r.json())
      .then((data) => {
        setProperties(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const deleteProperty = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)) return

    try {
      const res = await fetch(`/api/propiedades/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Propiedad eliminada')
      fetchProperties()
    } catch {
      toast.error('Error al eliminar')
    }
  }

  const togglePublished = async (id: string, current: boolean) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !current } : p)),
    )
    try {
      const res = await fetch(`/api/propiedades/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !current }),
      })
      if (!res.ok) throw new Error()
      toast.success(current ? 'Propiedad oculta' : 'Propiedad publicada')
    } catch {
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, published: current } : p)),
      )
      toast.error('No se pudo actualizar')
    }
  }

  const filtered = filter
    ? properties.filter((p) => p.status === filter)
    : properties

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-text">Propiedades</h1>
          <p className="text-text-light text-sm">{properties.length} propiedades en total</p>
        </div>
        <Link href="/admin/propiedades/nueva">
          <Button>+ Nueva propiedad</Button>
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { value: '', label: 'Todas' },
          { value: 'available', label: 'Disponibles' },
          { value: 'reserved', label: 'Reservadas' },
          { value: 'sold', label: 'Vendidas' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === tab.value
                ? 'bg-primary text-white'
                : 'bg-white text-text-light border border-border hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 text-text-light">Cargando...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-text-light">No hay propiedades</div>
        ) : (
          filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-border p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {p.coverImage && (
                <img
                  src={p.coverImage}
                  alt={p.title}
                  className="w-20 h-16 rounded-xl object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text truncate">{p.title}</p>
                <p className="text-text-light text-sm">{p.neighborhood} · {timeAgo(new Date(p.createdAt))}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="price-display text-sm text-primary">{formatPrice(p.price, p.currency)}</span>
                  <Badge variant={p.status === 'available' ? 'success' : p.status === 'reserved' ? 'warning' : 'danger'}>
                    {statusLabel(p.status)}
                  </Badge>
                  {p.featured && <Badge variant="new">⭐ Destacada</Badge>}
                  {!p.published && <Badge variant="default">Oculta</Badge>}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => togglePublished(p.id, p.published)}
                  title={p.published ? 'Ocultar al público' : 'Publicar al público'}
                  aria-label={p.published ? 'Ocultar propiedad' : 'Publicar propiedad'}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                    p.published
                      ? 'border-border bg-white text-text-light hover:border-primary/30 hover:text-primary'
                      : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  {p.published ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
                <QRDownloader propertyId={p.id} slug={p.slug} />
                <Link href={`/admin/propiedades/${p.id}/editar`}>
                  <Button variant="secondary" size="sm">✏️ Editar</Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => deleteProperty(p.id, p.title)}>
                  🗑️
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
