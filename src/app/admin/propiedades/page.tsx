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
