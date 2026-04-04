'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import PropertyBadges from '@/components/properties/PropertyBadges'
import { Property } from '@/types'
import { formatPrice, propertyTypeLabel, timeAgo } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const isNew = new Date().getTime() - new Date(property.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000
  const isSold = property.status === 'sold'
  const isReserved = property.status === 'reserved'

  return (
    <Link href={`/propiedades/${property.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className={`rounded-2xl overflow-hidden bg-white border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 ${isSold ? 'opacity-70' : ''}`}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={property.coverImage}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Status badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isNew && !isSold && (
              <Badge variant="new" pulse>✨ Nueva</Badge>
            )}
            {isReserved && (
              <Badge variant="warning">Reservada</Badge>
            )}
            {isSold && (
              <Badge variant="danger">Vendida</Badge>
            )}
          </div>

          {/* Property type */}
          <div className="absolute top-3 right-3">
            <Badge variant="default" className="bg-white/90 backdrop-blur-sm text-text">
              {propertyTypeLabel(property.propertyType)}
            </Badge>
          </div>

          {/* Price */}
          <div className="absolute bottom-3 left-3">
            <span className="price-display text-xl text-white drop-shadow-lg">
              {formatPrice(property.price, property.currency)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-heading font-bold text-text text-base mb-1 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-text-light text-sm mb-3 flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {property.neighborhood}, Villa María
          </p>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mb-2">
            {property.rooms && (
              <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-text-light text-xs font-medium">
                {property.rooms} amb
              </span>
            )}
            {property.totalArea && (
              <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-text-light text-xs font-medium">
                {property.totalArea} m²
              </span>
            )}
            {property.bathrooms && (
              <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-text-light text-xs font-medium">
                {property.bathrooms} {property.bathrooms === 1 ? 'baño' : 'baños'}
              </span>
            )}
            {property.garages && property.garages > 0 && (
              <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-text-light text-xs font-medium">
                {property.garages} {property.garages === 1 ? 'cochera' : 'cocheras'}
              </span>
            )}
          </div>

          {/* Commercial badges */}
          <PropertyBadges property={property} size="sm" />

          {/* Time indicator */}
          <p className="text-[11px] text-text-light/50 mt-2">
            {timeAgo(new Date(property.createdAt))}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
