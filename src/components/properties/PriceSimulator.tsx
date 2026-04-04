'use client'

import { useState } from 'react'
import { formatPrice, getWhatsAppLink } from '@/lib/utils'

interface PriceSimulatorProps {
  price: number
  currency: string
  title: string
  neighborhood: string
}

export default function PriceSimulator({ price, currency, title, neighborhood }: PriceSimulatorProps) {
  const [available, setAvailable] = useState('')
  const remaining = Math.max(0, price - (parseFloat(available) || 0))
  const hasInput = parseFloat(available) > 0

  const whatsappMsg = `Hola Julián! Me interesa "${title}" en ${neighborhood}. Tengo aprox ${currency} ${parseInt(available).toLocaleString()} disponibles. ¿Podemos hablar sobre opciones?`

  return (
    <div className="rounded-2xl border border-border p-5 bg-white">
      <h3 className="font-heading font-bold text-text text-sm mb-1">💰 ¿Cuánto tenés disponible?</h3>
      <p className="text-xs text-text-light mb-4">Calculá rápido cuánto te falta</p>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-medium text-text-light">{currency}</span>
        <input
          type="number"
          value={available}
          onChange={(e) => setAvailable(e.target.value)}
          placeholder="Ej: 50000"
          className="flex-1 px-4 py-2.5 rounded-xl border border-border text-text font-mono text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/10"
        />
      </div>

      {hasInput && (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-light">Precio propiedad</span>
            <span className="font-mono font-semibold text-text">{formatPrice(price, currency)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-light">Tu disponible</span>
            <span className="font-mono font-semibold text-success">{formatPrice(parseFloat(available), currency)}</span>
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-text">
                {remaining > 0 ? 'Te faltan' : '¡Te alcanza!'}
              </span>
              <span className={`font-mono font-bold text-lg ${remaining > 0 ? 'text-primary' : 'text-success'}`}>
                {remaining > 0 ? formatPrice(remaining, currency) : '✅'}
              </span>
            </div>
          </div>

          {remaining > 0 && (
            <a
              href={getWhatsAppLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors mt-2"
            >
              Consultá opciones de financiación →
            </a>
          )}

          {remaining === 0 && (
            <a
              href={getWhatsAppLink(`Hola Julián! Me interesa "${title}" en ${neighborhood}. Tengo el presupuesto. ¿Podemos coordinar una visita?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20BD5A] transition-colors mt-2"
            >
              ¡Contactar a Julián! →
            </a>
          )}
        </div>
      )}
    </div>
  )
}
