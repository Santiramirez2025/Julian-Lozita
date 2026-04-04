'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Ves el cartel',
    description: 'En la propiedad que te interesa vas a encontrar un cartel de J-Lozita con un código QR.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Escaneás el QR',
    description: 'Con la cámara de tu celular escaneás el código y accedés a toda la info de la propiedad.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
        <rect x="2" y="2" width="8" height="8" rx="1" />
        <rect x="14" y="2" width="8" height="8" rx="1" />
        <rect x="2" y="14" width="8" height="8" rx="1" />
        <rect x="14" y="14" width="4" height="4" />
        <path d="M22 14h-4v4" />
        <path d="M22 22h-8v-4h4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Me contactás',
    description: 'Ves fotos, detalles, precio y ubicación. Si te interesa, me escribís por WhatsApp.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-text mb-3">
            ¿Cómo funciona?
          </h2>
          <p className="text-text-light max-w-md mx-auto">
            Encontrar tu propiedad es más fácil de lo que pensás
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative glass rounded-2xl p-8 text-center group hover:shadow-lg transition-shadow"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent text-bg-dark text-xs font-bold flex items-center justify-center">
                {step.number}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-text mb-2">{step.title}</h3>
              <p className="text-text-light text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
