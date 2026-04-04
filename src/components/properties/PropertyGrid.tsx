'use client'

import { motion } from 'framer-motion'
import PropertyCard from './PropertyCard'
import { PropertyCardSkeleton } from '@/components/ui/Skeleton'
import { Property } from '@/types'

interface PropertyGridProps {
  properties: Property[]
  loading?: boolean
}

export default function PropertyGrid({ properties, loading = false }: PropertyGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-text text-lg mb-2">
          No encontramos propiedades
        </h3>
        <p className="text-text-light text-sm max-w-sm mx-auto">
          Probá cambiando los filtros o contale a Julián qué estás buscando por WhatsApp.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </div>
  )
}
