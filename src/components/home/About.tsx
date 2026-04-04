'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center border border-border overflow-hidden">
              <div className="text-center p-8">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-heading font-extrabold text-primary">JL</span>
                </div>
                <p className="text-text-light text-sm">Julián Lozita</p>
              </div>
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 shadow-lg max-w-[200px]">
              <p className="text-sm font-semibold text-text">Trato directo</p>
              <p className="text-xs text-text-light">Sin intermediarios, hablás conmigo</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-text mb-6">
              Sobre J-Lozita
            </h2>
            <div className="space-y-4 text-text-light leading-relaxed">
              <p>
                Soy Julián Lozita, corredor inmobiliario en Villa María, Córdoba. Me dedico a la venta de propiedades con un enfoque simple: <span className="text-text font-medium">transparencia, trato personal y conocimiento real de la zona.</span>
              </p>
              <p>
                Conozco cada barrio de Villa María. Sé cuáles están creciendo, dónde conviene invertir y qué buscan las familias que quieren mudarse. Esa información la pongo a tu servicio.
              </p>
              <p>
                Mi forma de trabajar es directa: sin vueltas, sin letra chica. Cuando me contactás, hablás conmigo. No con un call center ni con un asistente. <span className="text-text font-medium">Conmigo.</span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: '🤝', label: 'Trato personal' },
                { icon: '📍', label: 'Zona experta' },
                { icon: '✅', label: 'Transparencia' },
              ].map((v) => (
                <div key={v.label} className="text-center p-3 rounded-xl bg-primary/5">
                  <span className="text-2xl">{v.icon}</span>
                  <p className="text-xs font-medium text-text mt-1">{v.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
