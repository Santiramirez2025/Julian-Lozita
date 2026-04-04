'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'

interface Stats {
  total: number
  available: number
  reserved: number
  sold: number
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({ total: 0, available: 0, reserved: 0, sold: 0 })

  useEffect(() => {
    fetch('/api/propiedades?stats=true')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
  }, [])

  const items = [
    { label: 'Total propiedades', value: stats.total, color: 'text-text', bg: 'bg-gray-50' },
    { label: 'Disponibles', value: stats.available, color: 'text-success', bg: 'bg-emerald-50' },
    { label: 'Reservadas', value: stats.reserved, color: 'text-reserved', bg: 'bg-amber-50' },
    { label: 'Vendidas', value: stats.sold, color: 'text-sold', bg: 'bg-red-50' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.label} className="p-5">
          <p className="text-sm text-text-light mb-1">{item.label}</p>
          <p className={`text-3xl font-heading font-extrabold ${item.color}`}>{item.value}</p>
        </Card>
      ))}
    </div>
  )
}
