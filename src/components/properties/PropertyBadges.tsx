import { ReactNode } from 'react'
import { Property } from '@/types'

interface PropertyBadgesProps {
  property: Property
  size?: 'sm' | 'md'
}

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const icons = {
  permuta: (
    <svg {...svgProps} width="11" height="11">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 014-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  ),
  financing: (
    <svg {...svgProps} width="11" height="11">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  ),
  urgent: (
    <svg {...svgProps} width="11" height="11">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  business: (
    <svg {...svgProps} width="11" height="11">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  patrimony: (
    <svg {...svgProps} width="11" height="11">
      <path d="M3 21h18" />
      <path d="M3 10h18" />
      <path d="M5 21V10l7-7 7 7v11" />
      <path d="M9 21v-6h6v6" />
    </svg>
  ),
}

export default function PropertyBadges({ property, size = 'sm' }: PropertyBadgesProps) {
  const badges = [
    property.acceptsPermuta && { label: 'Acepta permuta', icon: icons.permuta, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    property.hasFinancing && { label: 'Financiación', icon: icons.financing, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    property.urgentSale && { label: 'Urgente', icon: icons.urgent, color: 'bg-orange-50 text-orange-700 border-orange-200' },
    property.forBusiness && { label: 'Negocios', icon: icons.business, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    property.forPatrimony && { label: 'Patrimonio', icon: icons.patrimony, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  ].filter(Boolean) as { label: string; icon: ReactNode; color: string }[]

  if (badges.length === 0) return null

  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs'
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1'

  return (
    <div className="flex flex-wrap gap-1">
      {badges.map((b) => (
        <span
          key={b.label}
          className={`inline-flex items-center gap-1 ${padding} rounded-full ${textSize} font-semibold border ${b.color}`}
        >
          {b.icon}
          {b.label}
        </span>
      ))}
    </div>
  )
}
