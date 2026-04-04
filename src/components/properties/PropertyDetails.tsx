import Badge from '@/components/ui/Badge'
import { Property } from '@/types'
import { formatPrice, propertyTypeLabel } from '@/lib/utils'

interface PropertyDetailsProps {
  property: Property
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const details = [
    { label: 'Tipo', value: propertyTypeLabel(property.propertyType), icon: '🏠' },
    property.rooms ? { label: 'Ambientes', value: `${property.rooms}`, icon: '📐' } : null,
    property.bedrooms ? { label: 'Dormitorios', value: `${property.bedrooms}`, icon: '🛏️' } : null,
    property.bathrooms ? { label: 'Baños', value: `${property.bathrooms}`, icon: '🚿' } : null,
    property.garages ? { label: 'Cocheras', value: `${property.garages}`, icon: '🚗' } : null,
    property.totalArea ? { label: 'm² totales', value: `${property.totalArea}`, icon: '📏' } : null,
    property.coveredArea ? { label: 'm² cubiertos', value: `${property.coveredArea}`, icon: '🏗️' } : null,
  ].filter(Boolean) as { label: string; value: string; icon: string }[]

  return (
    <div>
      {/* Price */}
      <div className="mb-6">
        <span className="price-display text-3xl sm:text-4xl text-primary">
          {formatPrice(property.price, property.currency)}
        </span>
        {property.currency === 'USD' && (
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
            className="p-3 rounded-xl bg-gray-50 text-center"
          >
            <span className="text-lg">{detail.icon}</span>
            <p className="price-display text-lg text-text">{detail.value}</p>
            <p className="text-xs text-text-light">{detail.label}</p>
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
