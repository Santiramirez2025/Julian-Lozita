'use client'

import { motion } from 'framer-motion'
import PropertyCard from './PropertyCard'
import { PropertyCardSkeleton } from '@/components/ui/Skeleton'
import { Property } from '@/types'

interface PropertyGridProps {
  properties: Property[]
  loading?: boolean
}

// Cap animation delay — only first 2 rows animate with stagger
const MAX_ANIMATED = 6
const STAGGER_DELAY = 0.06

export default function PropertyGrid({ properties, loading = false }: PropertyGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  // Empty state is handled by PropiedadesClient — this component only renders the grid
  if (properties.length === 0) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{
            duration: 0.35,
            delay: index < MAX_ANIMATED ? index * STAGGER_DELAY : 0,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </div>
  )
}