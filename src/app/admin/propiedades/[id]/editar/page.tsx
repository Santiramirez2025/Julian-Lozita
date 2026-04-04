'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PropertyForm from '@/components/admin/PropertyForm'
import { Property } from '@/types'

export default function EditarPropiedadPage() {
  const params = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/propiedades/${params.id}`)
        .then((r) => r.json())
        .then((data) => {
          setProperty(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="text-center py-12">
        <svg className="animate-spin h-8 w-8 text-primary mx-auto" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-text-light text-sm mt-3">Cargando propiedad...</p>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="text-center py-12">
        <p className="text-text-light">Propiedad no encontrada</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-extrabold text-text">Editar propiedad</h1>
        <p className="text-text-light text-sm">{property.title}</p>
      </div>
      <div className="max-w-4xl">
        <PropertyForm property={property} />
      </div>
    </div>
  )
}
