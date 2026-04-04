import { Property } from '@/types'

interface PropertyBadgesProps {
  property: Property
  size?: 'sm' | 'md'
}

export default function PropertyBadges({ property, size = 'sm' }: PropertyBadgesProps) {
  const badges = [
    property.acceptsPermuta && { label: '🔁 Acepta permuta', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    property.hasFinancing && { label: '💸 Financiación', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    property.urgentSale && { label: '⚡ Urgente', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  ].filter(Boolean) as { label: string; color: string }[]

  if (badges.length === 0) return null

  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs'
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1'

  return (
    <div className="flex flex-wrap gap-1">
      {badges.map((b) => (
        <span
          key={b.label}
          className={`inline-flex items-center ${padding} rounded-full ${textSize} font-semibold border ${b.color}`}
        >
          {b.label}
        </span>
      ))}
    </div>
  )
}
