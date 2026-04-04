import { Suspense } from 'react'
import { Metadata } from 'next'
import PropiedadesClient from './PropiedadesClient'

export const metadata: Metadata = {
  title: 'Propiedades en Venta en Villa María',
  description:
    'Encontrá casas, departamentos, terrenos y más en venta en Villa María, Córdoba. Filtros por tipo, precio, barrio y búsqueda inteligente con IA.',
}

export default function PropiedadesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      }
    >
      <PropiedadesClient />
    </Suspense>
  )
}
