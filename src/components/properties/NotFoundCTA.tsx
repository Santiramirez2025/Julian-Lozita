'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Button from '@/components/ui/Button'

export default function NotFoundCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534222575'
  const whatsappMessage = encodeURIComponent(
    'Hola Julián, estuve viendo las propiedades en la web pero no encontré exactamente lo que busco. ¿Tenés otras opciones?'
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.4 }}
      className="mt-10 mb-4"
    >
      <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-primary/[0.05] border border-primary/[0.08] flex items-center justify-center shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-text text-base sm:text-lg leading-tight mb-1">
            ¿Buscás algo específico?
          </h3>
          <p className="text-text-light text-sm leading-relaxed">
            Julián puede tener propiedades que aún no están publicadas.
            Contale qué necesitás y te responde en minutos.
          </p>
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-full sm:w-auto"
        >
          <Button variant="whatsapp" size="md" className="w-full sm:w-auto">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.508-.654-6.365-1.787l-.444-.267-3.07 1.03 1.03-3.07-.267-.444A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            Consultar a Julián
          </Button>
        </a>
      </div>
    </motion.div>
  )
}