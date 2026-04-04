'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Select from '@/components/ui/Select'
import { PropertyFilters as Filters } from '@/types'

interface PropertyFiltersProps {
  filters: Filters
  onChange: (filters: Filters) => void
  neighborhoods: string[]
}

const propertyTypes = [
  { value: '', label: 'Tipo de propiedad' },
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'local', label: 'Local comercial' },
  { value: 'galpon', label: 'Galpón' },
]

const roomOptions = [
  { value: '', label: 'Ambientes' },
  { value: '1', label: '1 ambiente' },
  { value: '2', label: '2 ambientes' },
  { value: '3', label: '3 ambientes' },
  { value: '4', label: '4+ ambientes' },
]

const priceRanges = [
  { value: '', label: 'Precio' },
  { value: '0-30000', label: 'Hasta USD 30.000' },
  { value: '30000-60000', label: 'USD 30.000 – 60.000' },
  { value: '60000-100000', label: 'USD 60.000 – 100.000' },
  { value: '100000-200000', label: 'USD 100.000 – 200.000' },
  { value: '200000-999999', label: 'Más de USD 200.000' },
]

export default function PropertyFilters({
  filters,
  onChange,
  neighborhoods,
}: PropertyFiltersProps) {
  const [showMore, setShowMore] = useState(false)

  const neighborhoodOptions = useMemo(
    () => [
      { value: '', label: 'Barrio' },
      ...neighborhoods.map((n) => ({ value: n, label: n })),
    ],
    [neighborhoods]
  )

  const handleChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters }

    if (key === 'propertyType') {
      newFilters.propertyType = value || undefined
    } else if (key === 'rooms') {
      newFilters.rooms = value ? parseInt(value) : undefined
    } else if (key === 'neighborhood') {
      newFilters.neighborhood = value || undefined
    } else if (key === 'minPrice' || key === 'maxPrice') {
      if (value) {
        const [min, max] = value.split('-')
        newFilters.minPrice = parseInt(min)
        newFilters.maxPrice = parseInt(max)
      } else {
        newFilters.minPrice = undefined
        newFilters.maxPrice = undefined
      }
    }

    onChange(newFilters)
  }

  const priceValue =
    filters.minPrice !== undefined && filters.maxPrice !== undefined
      ? `${filters.minPrice}-${filters.maxPrice}`
      : ''

  // Count active secondary filters (not type — type is always visible)
  const activeSecondaryCount = [
    priceValue,
    filters.rooms?.toString(),
    filters.neighborhood,
  ].filter(Boolean).length

  return (
    <div className="mb-6">
      {/* ── Row 1: Type (always visible) + "More filters" toggle ── */}
      <div className="flex items-center gap-3">
        {/* Type — always visible on all screens */}
        <div className="flex-1 sm:flex-none sm:w-52">
          <Select
            options={propertyTypes}
            value={filters.propertyType || ''}
            onChange={(e) => handleChange('propertyType', e.target.value)}
          />
        </div>

        {/* Search tag — if user arrived via ?q= */}
        {filters.search && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/5 border border-primary/10 text-sm text-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="max-w-[120px] truncate">&ldquo;{filters.search}&rdquo;</span>
            <button
              onClick={() => onChange({ ...filters, search: undefined })}
              className="ml-0.5 hover:text-sold transition-colors"
              aria-label="Quitar búsqueda"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* More filters toggle */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm font-medium text-text-light hover:border-primary/20 hover:text-text transition-all"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="20" y2="12" />
            <line x1="12" y1="18" x2="20" y2="18" />
          </svg>
          <span className="hidden sm:inline">Más filtros</span>
          {activeSecondaryCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold">
              {activeSecondaryCount}
            </span>
          )}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={`transition-transform duration-200 ${showMore ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* ── Row 2: Secondary filters (collapsible) ── */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <Select
                options={priceRanges}
                value={priceValue}
                onChange={(e) => handleChange('minPrice', e.target.value)}
              />
              <Select
                options={roomOptions}
                value={filters.rooms?.toString() || ''}
                onChange={(e) => handleChange('rooms', e.target.value)}
              />
              <Select
                options={neighborhoodOptions}
                value={filters.neighborhood || ''}
                onChange={(e) => handleChange('neighborhood', e.target.value)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}