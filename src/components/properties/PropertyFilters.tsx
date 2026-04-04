'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { PropertyFilters as Filters } from '@/types'

interface PropertyFiltersProps {
  filters: Filters
  onChange: (filters: Filters) => void
  neighborhoods: string[]
}

const propertyTypes = [
  { value: '', label: 'Todos los tipos' },
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'local', label: 'Local comercial' },
  { value: 'galpon', label: 'Galpón' },
]

const roomOptions = [
  { value: '', label: 'Cualquier cantidad' },
  { value: '1', label: '1 ambiente' },
  { value: '2', label: '2 ambientes' },
  { value: '3', label: '3 ambientes' },
  { value: '4', label: '4+ ambientes' },
]

const priceRanges = [
  { value: '', label: 'Cualquier precio' },
  { value: '0-30000', label: 'Hasta USD 30.000' },
  { value: '30000-60000', label: 'USD 30.000 - 60.000' },
  { value: '60000-100000', label: 'USD 60.000 - 100.000' },
  { value: '100000-200000', label: 'USD 100.000 - 200.000' },
  { value: '200000-999999', label: 'Más de USD 200.000' },
]

export default function PropertyFilters({ filters, onChange, neighborhoods }: PropertyFiltersProps) {
  const [showMobile, setShowMobile] = useState(false)

  const neighborhoodOptions = [
    { value: '', label: 'Todos los barrios' },
    ...neighborhoods.map((n) => ({ value: n, label: n })),
  ]

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

  const clearFilters = () => {
    onChange({})
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined)

  const priceValue = filters.minPrice !== undefined && filters.maxPrice !== undefined
    ? `${filters.minPrice}-${filters.maxPrice}`
    : ''

  const FilterContent = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Select
        options={propertyTypes}
        value={filters.propertyType || ''}
        onChange={(e) => handleChange('propertyType', e.target.value)}
        placeholder="Tipo de propiedad"
      />
      <Select
        options={priceRanges}
        value={priceValue}
        onChange={(e) => handleChange('minPrice', e.target.value)}
        placeholder="Rango de precio"
      />
      <Select
        options={roomOptions}
        value={filters.rooms?.toString() || ''}
        onChange={(e) => handleChange('rooms', e.target.value)}
        placeholder="Ambientes"
      />
      <Select
        options={neighborhoodOptions}
        value={filters.neighborhood || ''}
        onChange={(e) => handleChange('neighborhood', e.target.value)}
        placeholder="Barrio"
      />
    </div>
  )

  return (
    <div className="mb-8">
      {/* Desktop */}
      <div className="hidden lg:block">
        <FilterContent />
        {hasActiveFilters && (
          <div className="mt-3 flex justify-end">
            <button onClick={clearFilters} className="text-sm text-primary-light hover:underline">
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Mobile toggle */}
      <div className="lg:hidden">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowMobile(!showMobile)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            Filtros
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-accent" />
            )}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${showMobile ? 'rotate-180' : ''}`}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>

        <AnimatePresence>
          {showMobile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-4"
            >
              <FilterContent />
              {hasActiveFilters && (
                <div className="mt-3">
                  <button onClick={clearFilters} className="text-sm text-primary-light hover:underline">
                    Limpiar filtros
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
