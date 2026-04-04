'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

interface DashboardData {
  summary: {
    totalViews: number
    uniqueVisitors: number
    totalWhatsapp: number
    totalQrScans: number
    totalShares: number
  }
  funnel: {
    views: number
    scrolled: number
    whatsapp: number
    conversionRate: number
  }
  viewsByDay: Record<string, number>
  topNeighborhoods: { name: string; views: number }[]
  topProperties: {
    propertyId: string
    heatScore: number
    totalViews: number
    whatsappClicks: number
    qrScans: number
    avgTimeOnPage: number
    property: { title: string; neighborhood: string; price: number; currency: string; coverImage: string } | null
  }[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [period, setPeriod] = useState('30')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/analytics/dashboard?period=${period}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [period])

  if (loading) return <div className="text-center py-12 text-text-light">Cargando analytics...</div>
  if (!data) return <div className="text-center py-12 text-text-light">Error cargando datos</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-text">Analytics</h1>
          <p className="text-text-light text-sm">Métricas de tu inmobiliaria en tiempo real</p>
        </div>
        <div className="flex gap-2">
          {['7', '30', '90'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                period === p ? 'bg-primary text-white' : 'bg-white border border-border text-text-light hover:bg-gray-50'
              }`}
            >
              {p}d
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Vistas totales', value: data.summary.totalViews, icon: '👁️' },
          { label: 'Visitantes únicos', value: data.summary.uniqueVisitors, icon: '👤' },
          { label: 'Clicks WhatsApp', value: data.summary.totalWhatsapp, icon: '💬' },
          { label: 'Escaneos QR', value: data.summary.totalQrScans, icon: '📱' },
          { label: 'Compartidos', value: data.summary.totalShares, icon: '🔗' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-4">
              <span className="text-xl">{stat.icon}</span>
              <p className="text-2xl font-heading font-extrabold text-text mt-1">{stat.value}</p>
              <p className="text-xs text-text-light">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Conversion funnel */}
      <Card className="p-6 mb-8">
        <h2 className="font-heading font-bold text-lg text-text mb-4">Embudo de Conversión</h2>
        <div className="flex items-end gap-4 h-40">
          {[
            { label: 'Visita', value: data.funnel.views, color: 'bg-blue-400' },
            { label: 'Scroll', value: data.funnel.scrolled, color: 'bg-blue-500' },
            { label: 'WhatsApp', value: data.funnel.whatsapp, color: 'bg-[#25D366]' },
          ].map((step) => {
            const maxVal = Math.max(data.funnel.views, 1)
            const height = Math.max(8, (step.value / maxVal) * 100)
            return (
              <div key={step.label} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-sm font-bold text-text">{step.value}</span>
                <div className={`w-full rounded-t-xl ${step.color} transition-all`} style={{ height: `${height}%` }} />
                <span className="text-xs text-text-light">{step.label}</span>
              </div>
            )
          })}
        </div>
        <div className="mt-4 text-center">
          <Badge variant={data.funnel.conversionRate > 5 ? 'success' : data.funnel.conversionRate > 2 ? 'warning' : 'danger'}>
            Tasa de conversión: {data.funnel.conversionRate}%
          </Badge>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top neighborhoods heatmap */}
        <Card className="p-6">
          <h2 className="font-heading font-bold text-lg text-text mb-4">🗺️ Barrios más buscados</h2>
          <div className="space-y-3">
            {data.topNeighborhoods.length === 0 ? (
              <p className="text-text-light text-sm">Sin datos aún</p>
            ) : (
              data.topNeighborhoods.map((n, i) => {
                const maxViews = data.topNeighborhoods[0]?.views || 1
                const width = Math.max(10, (n.views / maxViews) * 100)
                return (
                  <div key={n.name} className="flex items-center gap-3">
                    <span className="text-xs text-text-light w-6 text-right">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-text">{n.name}</span>
                        <span className="text-text-light">{n.views}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </Card>

        {/* Top properties */}
        <Card className="p-6">
          <h2 className="font-heading font-bold text-lg text-text mb-4">🔥 Propiedades calientes</h2>
          <div className="space-y-3">
            {data.topProperties.length === 0 ? (
              <p className="text-text-light text-sm">Sin datos aún</p>
            ) : (
              data.topProperties.slice(0, 5).map((s) => (
                <div key={s.propertyId} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                  {s.property?.coverImage && (
                    <img src={s.property.coverImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">{s.property?.title || 'Propiedad'}</p>
                    <p className="text-xs text-text-light">{s.totalViews} vistas · {s.whatsappClicks} WA</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${s.heatScore > 50 ? 'text-sold' : s.heatScore > 25 ? 'text-reserved' : 'text-text-light'}`}>
                      {Math.round(s.heatScore)}
                    </span>
                    <span className="text-xs text-text-light block">score</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
