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
      <h3 className="font-heading font-bold text-text text-sm mb-1 flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
        ¿Cuánto tenés disponible?
      </h3>
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
              <span className={`font-mono font-bold text-lg flex items-center gap-1 ${remaining > 0 ? 'text-primary' : 'text-success'}`}>
                {remaining > 0 ? (
                  formatPrice(remaining, currency)
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
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
