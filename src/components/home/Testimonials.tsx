'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'María L.',
    text: 'Julián me ayudó a encontrar mi casa en tiempo récord. Súper transparente y siempre disponible. Lo recomiendo a todos.',
    property: 'Casa en Barrio Norte',
    initials: 'ML',
  },
  {
    name: 'Carlos R.',
    text: 'Vendí mi departamento en menos de un mes. El sistema de QR hizo que mucha gente lo viera directo desde la calle. Excelente.',
    property: 'Depto en Centro',
    initials: 'CR',
  },
  {
    name: 'Ana P.',
    text: 'Lo que más me gustó es el trato directo. Nada de intermediarios ni vueltas. Hablás con Julián y listo.',
    property: 'Terreno en Palermo',
    initials: 'AP',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-text mb-3">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-text-light max-w-md mx-auto">
            Personas reales que confiaron en J-Lozita
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-primary/5 transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-text text-sm leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{t.name}</p>
                  <p className="text-xs text-text-light">{t.property}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}