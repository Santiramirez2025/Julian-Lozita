'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingWidgets from '@/components/layout/FloatingWidgets'
import PropertyGrid from '@/components/properties/PropertyGrid'
import PropertyFilters from '@/components/properties/PropertyFilters'
import PropertyMapInteractive from '@/components/properties/PropertyMapInteractive'
import QuickFilters, { applyQuickFilter } from '@/components/properties/QuickFilters'
import NotFoundCTA from '@/components/properties/NotFoundCTA'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Property, PropertyFilters as Filters } from '@/types'

type ViewMode = 'grid' | 'map'
type SortOption = 'newest' | 'price-asc' | 'price-desc'

export default function PropiedadesClient() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [filters, setFilters] = useState<Filters>({})
  const [quickTag, setQuickTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  // Parse all URL params on mount
  useEffect(() => {
    const newFilters: Filters = {}
    const tipo = searchParams.get('tipo')
    const zona = searchParams.get('zona')
    const q = searchParams.get('q')

    if (tipo) newFilters.propertyType = tipo
    if (zona) newFilters.neighborhood = zona
    if (q) newFilters.search = q

    if (Object.keys(newFilters).length > 0) {
      setFilters((prev) => ({ ...prev, ...newFilters }))
    }
  }, [searchParams])

  // Fetch properties
  useEffect(() => {
    setLoading(true)
    setError(false)
    fetch('/api/propiedades')
      .then((r) => {
        if (!r.ok) throw new Error('Failed')
        return r.json()
      })
      .then((data) => {
        setProperties(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const neighborhoods = useMemo(() => {
    return Array.from(new Set(properties.map((p) => p.neighborhood))).filter(Boolean).sort()
  }, [properties])

  // Filter + sort
  const filteredProperties = useMemo(() => {
    let result = [...properties]

    // Text search
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.neighborhood?.toLowerCase().includes(q) ||
          p.address?.toLowerCase().includes(q) ||
          p.propertyType?.toLowerCase().includes(q)
      )
    }

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

    // Quick tag
    result = applyQuickFilter(result, quickTag)

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        )
        break
    }

    return result
  }, [properties, filters, quickTag, sortBy])

  const hasActiveFilters = useMemo(() => {
    return (
      !!filters.propertyType ||
      !!filters.neighborhood ||
      !!filters.search ||
      filters.minPrice !== undefined ||
      filters.maxPrice !== undefined ||
      !!filters.rooms ||
      !!quickTag
    )
  }, [filters, quickTag])

  const clearAllFilters = useCallback(() => {
    setFilters({})
    setQuickTag(null)
  }, [])

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534000000'

  return (
    <>
      <Navbar />
      <main className="pt-20 sm:pt-24 pb-16 min-h-screen bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Header ── */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-text mb-1.5">
              Propiedades en{' '}
              <span className="text-primary">Villa María</span>
            </h1>
            <p className="text-text-light text-sm sm:text-base">
              {loading
                ? 'Cargando propiedades...'
                : error
                  ? 'Error al cargar propiedades'
                  : `${filteredProperties.length} propiedad${filteredProperties.length !== 1 ? 'es' : ''} encontrada${filteredProperties.length !== 1 ? 's' : ''}`}
              {!loading && !error && hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="ml-2 text-primary hover:text-primary-light text-sm font-medium underline underline-offset-2 transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
            </p>
          </div>

          {/* ── Quick filters ── */}
          <QuickFilters activeTag={quickTag} onSelect={setQuickTag} />

          {/* ── Filters + Controls row ── */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <PropertyFilters
                filters={filters}
                onChange={setFilters}
                neighborhoods={neighborhoods}
              />
            </div>

            {/* Sort + View toggle */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm bg-white border border-border rounded-xl px-3 py-2.5 text-text-light focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all"
                aria-label="Ordenar propiedades"
              >
                <option value="newest">Más recientes</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
              </select>

              {/* View toggle */}
              <div className="hidden sm:flex items-center bg-white border border-border rounded-xl p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label="Vista grilla"
                  className={cn(
                    'p-2 rounded-lg transition-all',
                    viewMode === 'grid'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-light hover:text-text'
                  )}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  aria-label="Vista mapa"
                  className={cn(
                    'p-2 rounded-lg transition-all',
                    viewMode === 'map'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-light hover:text-text'
                  )}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                    <line x1="8" y1="2" x2="8" y2="18" />
                    <line x1="16" y1="6" x2="16" y2="22" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          {viewMode === 'map' ? (
            <div className="mb-8">
              <PropertyMapInteractive properties={filteredProperties} />
            </div>
          ) : null}

          {/* Grid — always visible, map is additive */}
          <PropertyGrid properties={filteredProperties} loading={loading} />

          {/* ── Empty state ── */}
          {!loading && !error && filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary/40">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-lg text-text mb-2">
                No encontramos propiedades con estos filtros
              </h3>
              <p className="text-text-light text-sm mb-6 max-w-md mx-auto">
                Probá ampliar tu búsqueda o contactá a Julián — puede tener opciones
                que aún no están publicadas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={clearAllFilters}
                  className="text-sm font-medium text-primary hover:text-primary-light underline underline-offset-4 transition-colors"
                >
                  Limpiar filtros
                </button>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola Julián, busco propiedades en Villa María pero no encuentro lo que necesito en la web. ¿Tenés otras opciones?')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="sm">
                    Consultar a Julián
                  </Button>
                </a>
              </div>
            </div>
          )}

          {/* ── Bottom CTA — only when there ARE results ── */}
          {!loading && filteredProperties.length > 0 && (
            <NotFoundCTA />
          )}
        </div>
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  )
}