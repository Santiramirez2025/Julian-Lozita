'use client'

import PropertyForm from '@/components/admin/PropertyForm'

export default function NuevaPropiedadPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-extrabold text-text">Nueva propiedad</h1>
        <p className="text-text-light text-sm">Completá los datos y publicá la propiedad</p>
      </div>
      <div className="max-w-4xl">
        <PropertyForm />
      </div>
    </div>
  )
}
