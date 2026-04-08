'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import ChatBot from '@/components/ai/ChatBot'
import PropertyGrid from '@/components/properties/PropertyGrid'
import PropertyFilters from '@/components/properties/PropertyFilters'
import PropertyMapInteractive from '@/components/properties/PropertyMapInteractive'
import QuickFilters, { applyQuickFilter } from '@/components/properties/QuickFilters'
import NotFoundCTA from '@/components/properties/NotFoundCTA'
import { Property, PropertyFilters as Filters } from '@/types'
import { barrioNames } from '@/lib/barrios'

export default function PropiedadesClient() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({})
  const [quickTag, setQuickTag] = useState<string | null>(null)

  // Init filters from URL params
  useEffect(() => {
    const tipo = searchParams.get('tipo')
    const barrio = searchParams.get('barrio')
    setFilters((prev) => ({
      ...prev,
      ...(tipo && { propertyType: tipo }),
      ...(barrio && { neighborhood: barrio }),
    }))
  }, [searchParams])

  useEffect(() => {
    setLoading(true)
    fetch('/api/propiedades')
      .then((r) => r.json())
      .then((data) => {
        setProperties(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const neighborhoods = useMemo(() => {
    // Use the centralized barrios list so all are available even if no properties exist yet
    return barrioNames
  }, [])

  const filteredProperties = useMemo(() => {
    let result = [...properties]

    if (filters.propertyType) {
      result = result.filter((p) => p.propertyType === filters.propertyType)
    }
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!)
    }
    if (filters.rooms) {
      result = result.filter((p) => (p.rooms || 0) >= filters.rooms!)
    }
    if (filters.neighborhood) {
      result = result.filter((p) => p.neighborhood === filters.neighborhood)
    }

    // Apply quick tag filter
    result = applyQuickFilter(result, quickTag)

    return result
  }, [properties, filters, quickTag])

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-text mb-2">
              Propiedades en Venta
            </h1>
            <p className="text-text-light">
              {loading ? 'Cargando...' : `${filteredProperties.length} propiedades encontradas en Villa María`}
            </p>
          </div>

          <QuickFilters activeTag={quickTag} onSelect={setQuickTag} />

          <PropertyFilters
            filters={filters}
            onChange={setFilters}
            neighborhoods={neighborhoods}
          />

          <PropertyMapInteractive properties={filteredProperties} />

          <PropertyGrid properties={filteredProperties} loading={loading} />

          <NotFoundCTA />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
      <ChatBot />
    </>
  )
}
