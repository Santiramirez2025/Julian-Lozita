'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { Property } from '@/types'

interface QuickFiltersProps {
  activeTag: string | null
  onSelect: (tag: string | null) => void
}

const quickTags = [
  { id: 'nuevas', label: 'Recientes' },
  { id: 'patio', label: 'Con patio' },
  { id: 'pileta', label: 'Con pileta' },
  { id: 'cochera', label: 'Con cochera' },
  { id: 'permuta', label: 'Acepta permuta' },
  { id: 'financiacion', label: 'Financiación' },
  { id: 'urgente', label: 'Oportunidad' },
]

export default function QuickFilters({ activeTag, onSelect }: QuickFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="mb-5">
      {/* Horizontal scroll on mobile, wrap on desktop */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-container pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible"
      >
        {quickTags.map((tag) => {
          const isActive = activeTag === tag.id
          return (
            <button
              key={tag.id}
              onClick={() => onSelect(isActive ? null : tag.id)}
              className={cn(
                'shrink-0 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 whitespace-nowrap',
                'active:scale-[0.97]',
                isActive
                  ? 'bg-primary text-white shadow-sm shadow-primary/15'
                  : 'bg-white border border-border text-text-light hover:border-primary/20 hover:text-text'
              )}
            >
              {tag.label}
            </button>
          )
        })}

        {/* Clear — only visible when a filter is active */}
        {activeTag && (
          <button
            onClick={() => onSelect(null)}
            className="shrink-0 px-3 py-2 rounded-xl text-sm font-medium text-text-light/50 hover:text-text-light transition-colors"
          >
            ✕ Limpiar
          </button>
        )}
      </div>
    </div>
  )
}

// ── Apply quick filter to property list ──
export function applyQuickFilter(properties: Property[], tagId: string | null): Property[] {
  if (!tagId) return properties

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

  switch (tagId) {
    case 'nuevas':
      return properties.filter(
        (p) => new Date(p.createdAt).getTime() > sevenDaysAgo
      )
    case 'patio':
      return properties.filter(
        (p) =>
          p.features?.includes('Patio') ||
          p.features?.includes('Jardín') ||
          p.features?.includes('patio') ||
          p.features?.includes('jardín')
      )
    case 'pileta':
      return properties.filter(
        (p) =>
          p.features?.includes('Pileta') ||
          p.features?.includes('pileta') ||
          p.features?.includes('Piscina')
      )
    case 'cochera':
      return properties.filter(
        (p) =>
          (p.garages && p.garages > 0) ||
          p.features?.includes('Cochera') ||
          p.features?.includes('cochera') ||
          p.features?.includes('Garage')
      )
    case 'permuta':
      return properties.filter((p) => p.acceptsPermuta === true)
    case 'financiacion':
      return properties.filter((p) => p.hasFinancing === true)
    case 'urgente':
      return properties.filter((p) => p.urgentSale === true)
    default:
      return properties
  }
}