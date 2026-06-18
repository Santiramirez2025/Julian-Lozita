import { ReactNode } from 'react'
import Badge from '@/components/ui/Badge'
import { Property } from '@/types'
import { formatPrice, propertyTypeLabel } from '@/lib/utils'

interface PropertyDetailsProps {
  property: Property
}

const svgProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const icons = {
  type: (
    <svg {...svgProps}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  rooms: (
    <svg {...svgProps}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
  ),
  bedrooms: (
    <svg {...svgProps}>
      <path d="M2 17v-3a4 4 0 014-4h12a4 4 0 014 4v3" />
      <path d="M2 21v-4M22 21v-4" />
      <path d="M2 10V6a2 2 0 012-2h16a2 2 0 012 2v4" />
    </svg>
  ),
  bathrooms: (
    <svg {...svgProps}>
      <path d="M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2" />
      <path d="M4 10h16" />
      <path d="M5 10v6a4 4 0 004 4h6a4 4 0 004-4v-6" />
      <path d="M8 21v1M16 21v1" />
    </svg>
  ),
  garages: (
    <svg {...svgProps}>
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2" />
      <circle cx="6.5" cy="16.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  ),
  totalArea: (
    <svg {...svgProps}>
      <path d="M2 6h20M2 18h20" />
      <path d="M6 2v20M18 2v20" />
    </svg>
  ),
  coveredArea: (
    <svg {...svgProps}>
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
    </svg>
  ),
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const details = [
    { label: 'Tipo', value: propertyTypeLabel(property.propertyType), icon: icons.type },
    property.rooms != null && property.rooms > 0 ? { label: 'Ambientes', value: `${property.rooms}`, icon: icons.rooms } : null,
    property.bedrooms != null && property.bedrooms > 0 ? { label: 'Dormitorios', value: `${property.bedrooms}`, icon: icons.bedrooms } : null,
    property.bathrooms != null && property.bathrooms > 0 ? { label: 'Baños', value: `${property.bathrooms}`, icon: icons.bathrooms } : null,
    property.garages != null && property.garages > 0 ? { label: 'Cocheras', value: `${property.garages}`, icon: icons.garages } : null,
    property.totalArea != null && property.totalArea > 0 ? { label: 'm² totales', value: `${property.totalArea}`, icon: icons.totalArea } : null,
    property.coveredArea != null && property.coveredArea > 0 ? { label: 'm² cubiertos', value: `${property.coveredArea}`, icon: icons.coveredArea } : null,
  ].filter(Boolean) as { label: string; value: string; icon: ReactNode }[]

  return (
    <div>
      {/* Price */}
      <div className="mb-6">
        <span className="price-display text-3xl sm:text-4xl text-primary">
          {formatPrice(property.price, property.currency)}
        </span>
        {property.currency === 'USD' && property.price > 0 && (
          <p className="text-text-light text-sm mt-1">
            Precio en dólares estadounidenses
          </p>
        )}
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="p-3 rounded-xl bg-gray-50 text-center flex flex-col items-center gap-1"
          >
            <span className="text-primary">{detail.icon}</span>
            <p className="price-display text-lg text-text leading-tight">{detail.value}</p>
            <p className="text-xs text-text-light leading-tight">{detail.label}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="font-heading font-bold text-xl text-text mb-3">Descripción</h2>
        <div className="text-text-light leading-relaxed whitespace-pre-line">
          {property.description}
        </div>
      </div>

      {/* Features */}
      {property.features.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading font-bold text-xl text-text mb-3">Características</h2>
          <div className="flex flex-wrap gap-2">
            {property.features.map((feature) => (
              <Badge key={feature} variant="info">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Location */}
      <div>
        <h2 className="font-heading font-bold text-xl text-text mb-3">Ubicación</h2>
        <p className="text-text-light flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {property.address}, {property.neighborhood}, {property.city}
        </p>
      </div>
    </div>
  )
}
