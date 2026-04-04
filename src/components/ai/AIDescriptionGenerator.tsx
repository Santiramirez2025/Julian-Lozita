'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { AIDescriptionResult } from '@/types'

interface AIDescriptionGeneratorProps {
  propertyData: {
    propertyType: string
    neighborhood: string
    rooms?: number
    bedrooms?: number
    bathrooms?: number
    totalArea?: number
    coveredArea?: number
    features: string[]
    price: number
    currency: string
  }
  onGenerated: (result: AIDescriptionResult) => void
}

export default function AIDescriptionGenerator({ propertyData, onGenerated }: AIDescriptionGeneratorProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData),
      })

      if (!res.ok) throw new Error('Error al generar')

      const data = await res.json()
      onGenerated(data)
    } catch {
      setError('No se pudo generar la descripción. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const isReady = propertyData.propertyType && propertyData.neighborhood && propertyData.price > 0

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={generate}
        disabled={!isReady || loading}
        loading={loading}
        variant="secondary"
        size="sm"
        className={loading ? 'sparkle-animation' : ''}
      >
        ✨ {loading ? 'Generando...' : 'Generar descripción con IA'}
      </Button>
      {error && <p className="text-xs text-sold">{error}</p>}
      {!isReady && (
        <p className="text-xs text-text-light">Completá tipo, barrio y precio para usar la IA</p>
      )}
    </div>
  )
}
