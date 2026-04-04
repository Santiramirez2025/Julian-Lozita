'use client'

import { motion } from 'framer-motion'

interface QuickFiltersProps {
  activeTag: string | null
  onSelect: (tag: string | null) => void
}

const quickTags = [
  { id: 'patio', label: '🏡 Con patio', filter: { feature: 'Patio' } },
  { id: 'pileta', label: '🔥 Con pileta', filter: { feature: 'Pileta' } },
  { id: 'cochera', label: '🚗 Con cochera', filter: { feature: 'Cochera' } },
  { id: 'permuta', label: '🔁 Acepta permuta', filter: { permuta: true } },
  { id: 'financiacion', label: '💸 Financiación', filter: { financing: true } },
  { id: 'urgente', label: '⚡ Oportunidad', filter: { urgent: true } },
  { id: 'nuevas', label: '✨ Recién publicadas', filter: { recent: true } },
]

export default function QuickFilters({ activeTag, onSelect }: QuickFiltersProps) {
  return (
    <div className="mb-6">
      <p className="text-xs text-text-light mb-2 font-medium">Lo que todos buscan</p>
      <div className="flex flex-wrap gap-2">
        {quickTags.map((tag) => (
          <motion.button
            key={tag.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(activeTag === tag.id ? null : tag.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTag === tag.id
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'bg-white border border-border text-text-light hover:border-primary-light hover:text-primary'
            }`}
          >
            {tag.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Helper: apply quick filter to properties
export function applyQuickFilter(properties: any[], tagId: string | null): any[] {
  if (!tagId) return properties

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

  switch (tagId) {
    case 'patio':
      return properties.filter((p) => p.features?.includes('Patio') || p.features?.includes('Jardín'))
    case 'pileta':
      return properties.filter((p) => p.features?.includes('Pileta'))
    case 'cochera':
      return properties.filter((p) => (p.garages && p.garages > 0) || p.features?.includes('Cochera'))
    case 'permuta':
      return properties.filter((p) => p.acceptsPermuta)
    case 'financiacion':
      return properties.filter((p) => p.hasFinancing)
    case 'urgente':
      return properties.filter((p) => p.urgentSale)
    case 'nuevas':
      return properties.filter((p) => new Date(p.createdAt).getTime() > sevenDaysAgo)
    default:
      return properties
  }
}
