'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function CTA() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534000000'

  return (
    <section className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-bg-dark overflow-hidden p-10 sm:p-16 text-center"
        >
          <div className="absolute inset-0 dot-pattern opacity-30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-4">
              ¿Buscás propiedad en Villa María?
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Contame qué estás buscando y te ayudo a encontrarlo. Te respondo en el día.
            </p>
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola Julián! Estoy buscando propiedades en Villa María.')}`} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
                Escribime por WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
