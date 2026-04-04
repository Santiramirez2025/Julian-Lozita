'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface ScoreData {
  propertyId: string
  heatScore: number
  totalViews: number
  uniqueViews: number
  whatsappClicks: number
  qrScans: number
  avgTimeOnPage: number
  scrollDepth: number
  priceAnalysis: { vsMarket: string; percentDiff: number | null; recommendation: string } | null
  aiSuggestions: { suggestions: { type: string; priority: string; text: string }[]; demandLevel: string; summary: string } | null
  property: { title: string; slug: string; price: number; currency: string; neighborhood: string; coverImage: string } | null
}

export default function ScoringPage() {
  const [scores, setScores] = useState<ScoreData[]>([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)

  const fetchScores = () => {
    setLoading(true)
    fetch('/api/scoring')
      .then((r) => r.json())
      .then((d) => { setScores(d); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchScores() }, [])

  const runAnalysis = async () => {
    setAnalyzing(true)
    try {
      const res = await fetch('/api/scoring', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
      if (!res.ok) throw new Error()
      const data = await res.json()
      toast.success(`${data.analyzed} propiedades analizadas con IA`)
      fetchScores()
    } catch {
      toast.error('Error en el análisis')
    } finally {
      setAnalyzing(false)
    }
  }

  const demandColor = (level: string) => {
    switch (level) {
      case 'hot': return 'danger'
      case 'warm': return 'warning'
      default: return 'default'
    }
  }

  const demandLabel = (level: string) => {
    switch (level) {
      case 'hot': return '🔥 Caliente'
      case 'warm': return '📈 Tibia'
      default: return '❄️ Fría'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-text">Scoring Inteligente</h1>
          <p className="text-text-light text-sm">La IA analiza rendimiento y sugiere acciones</p>
        </div>
        <Button onClick={runAnalysis} loading={analyzing}>
          ✨ Analizar con IA
        </Button>
      </div>

      {loading ? (
        <p className="text-text-light text-center py-12">Cargando...</p>
      ) : scores.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-text-light mb-4">Sin datos de scoring todavía. Las propiedades necesitan visitas para generar métricas.</p>
          <Button onClick={runAnalysis} loading={analyzing}>Ejecutar primer análisis</Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {scores.map((s) => (
            <Card key={s.propertyId} className="p-5">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Property info */}
                <div className="flex items-center gap-3 lg:w-1/3">
                  {s.property?.coverImage && (
                    <img src={s.property.coverImage} alt="" className="w-16 h-14 rounded-xl object-cover flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-text text-sm truncate">{s.property?.title}</p>
                    <p className="text-xs text-text-light">{s.property?.neighborhood} · {s.property?.currency} {s.property?.price?.toLocaleString()}</p>
                    <div className="flex gap-1 mt-1">
                      <Badge variant={s.heatScore > 50 ? 'danger' : s.heatScore > 25 ? 'warning' : 'default'}>
                        Score: {Math.round(s.heatScore)}/100
                      </Badge>
                      {s.aiSuggestions?.demandLevel && (
                        <Badge variant={demandColor(s.aiSuggestions.demandLevel) as 'danger' | 'warning' | 'default'}>
                          {demandLabel(s.aiSuggestions.demandLevel)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-3 lg:w-1/3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-text">{s.totalViews}</p>
                    <p className="text-[10px] text-text-light">Vistas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-text">{s.whatsappClicks}</p>
                    <p className="text-[10px] text-text-light">WhatsApp</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-text">{s.qrScans}</p>
                    <p className="text-[10px] text-text-light">QR Scans</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-text">{Math.round(s.avgTimeOnPage)}s</p>
                    <p className="text-[10px] text-text-light">Tiempo</p>
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="lg:w-1/3">
                  {s.priceAnalysis && (
                    <div className={`text-xs p-2 rounded-lg mb-2 ${
                      s.priceAnalysis.vsMarket === 'above' ? 'bg-red-50 text-red-700' :
                      s.priceAnalysis.vsMarket === 'below' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-gray-50 text-text-light'
                    }`}>
                      💰 {s.priceAnalysis.recommendation}
                      {s.priceAnalysis.percentDiff != null && (
                        <span className="font-bold"> ({s.priceAnalysis.percentDiff > 0 ? '+' : ''}{s.priceAnalysis.percentDiff}% vs zona)</span>
                      )}
                    </div>
                  )}
                  {s.aiSuggestions?.suggestions?.slice(0, 2).map((sug, i) => (
                    <div key={i} className="text-xs text-text-light flex items-start gap-1 mb-1">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${
                        sug.priority === 'high' ? 'bg-sold' : sug.priority === 'medium' ? 'bg-reserved' : 'bg-gray-300'
                      }`} />
                      {sug.text}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
