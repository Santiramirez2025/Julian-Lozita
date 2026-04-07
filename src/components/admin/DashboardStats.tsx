'use client'

import { useEffect, useState } from 'react'

interface Stats {
  total: number
  available: number
  reserved: number
  sold: number
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/propiedades?stats=true')
      .then((r) => {
        if (!r.ok) throw new Error('Failed')
        return r.json()
      })
      .then(setStats)
      .catch(() => setError(true))
  }, [])

  const items = [
    {
      label: 'Total propiedades',
      value: stats?.total ?? 0,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      valueColor: 'text-text',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <path d="M9 22V12h6v10" />
        </svg>
      ),
    },
    {
      label: 'Disponibles',
      value: stats?.available ?? 0,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      valueColor: 'text-emerald-600',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      label: 'Reservadas',
      value: stats?.reserved ?? 0,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      valueColor: 'text-amber-600',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      label: 'Vendidas',
      value: stats?.sold ?? 0,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
      valueColor: 'text-red-600',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ),
    },
  ]

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-border p-6 text-center">
        <p className="text-sm text-text-light mb-2">No pudimos cargar las estadísticas</p>
        <button
          onClick={() => {
            setError(false)
            setStats(null)
            fetch('/api/propiedades?stats=true')
              .then((r) => r.json())
              .then(setStats)
              .catch(() => setError(true))
          }}
          className="text-primary text-sm font-medium underline"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-2xl border border-border p-5 hover:shadow-md hover:shadow-primary/5 transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold text-text-light uppercase tracking-wider">{item.label}</p>
            <div className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
              {item.icon}
            </div>
          </div>
          {stats === null ? (
            <div className="h-9 w-16 skeleton-shimmer rounded-lg" />
          ) : (
            <p className={`text-3xl font-heading font-extrabold leading-none ${item.valueColor}`}>
              {item.value}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}