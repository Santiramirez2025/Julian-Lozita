'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const zones = [
  {
    slug: 'centro',
    name: 'Centro',
    description: 'Departamentos, locales y oficinas en el corazón de Villa María.',
    count: 12,
    image: '/images/zones/centro.jpg',
    color: 'from-blue-900/90',
  },
  {
    slug: 'norte',
    name: 'Barrio Norte',
    description: 'Casas amplias con jardín en la zona residencial más buscada.',
    count: 8,
    image: '/images/zones/norte.jpg',
    color: 'from-emerald-900/90',
  },
  {
    slug: 'sur',
    name: 'Zona Sur',
    description: 'Terrenos y casas con excelente relación precio-calidad.',
    count: 15,
    image: '/images/zones/sur.jpg',
    color: 'from-amber-900/90',
  },
  {
    slug: 'villa-nueva',
    name: 'Villa Nueva',
    description: 'Oportunidades de inversión y casas nuevas a minutos del centro.',
    count: 6,
    image: '/images/zones/villa-nueva.jpg',
    color: 'from-violet-900/90',
  },
]

function ZoneCard({
  zone,
  index,
}: {
  zone: (typeof zones)[number]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={`/propiedades?zona=${zone.slug}`}
        title={`Ver propiedades en ${zone.name}, Villa María`}
        className="group block relative rounded-2xl overflow-hidden bg-bg-dark aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/4]"
      >
        {/* Image with fallback */}
        {!imgError ? (
          <Image
            src={zone.image}
            alt={`Propiedades en ${zone.name}, Villa María`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${zone.color} to-bg-dark`} />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          {/* Count badge */}
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-white/70 bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-2.5 py-1 border border-white/10 mb-2.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 hidden sm:block">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            {zone.count} prop.
          </span>

          <h3 className="font-heading font-bold text-white text-base sm:text-xl leading-tight mb-0.5 sm:mb-1">
            {zone.name}
          </h3>
          <p className="text-white/50 text-xs sm:text-sm leading-relaxed line-clamp-2 hidden sm:block">
            {zone.description}
          </p>
        </div>

        {/* Hover indicator */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
            <path d="M7 17l9.2-9.2M17 17V8H8" />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Zones() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-40px' })

  return (
    <section className="py-20 sm:py-28 bg-bg" id="zonas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Heading ── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50 mb-3">
              Barrios
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text leading-tight">
              Explorá por zona en{' '}
              <span className="text-primary">Villa María</span>
            </h2>
            <p className="text-text-light mt-3 text-sm sm:text-base leading-relaxed">
              Cada barrio tiene su perfil. Encontrá la zona que mejor se ajuste
              a lo que buscás: ubicación, tranquilidad o inversión.
            </p>
          </div>
          <Link
            href="/propiedades"
            className="hidden sm:inline-flex text-sm font-medium text-primary hover:text-primary-light transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60 shrink-0"
          >
            Ver todas las propiedades →
          </Link>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {zones.map((zone, i) => (
            <ZoneCard key={zone.slug} zone={zone} index={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center sm:hidden"
        >
          <Link
            href="/propiedades"
            className="text-sm font-medium text-primary hover:text-primary-light transition-colors underline underline-offset-4 decoration-primary/30"
          >
            Ver todas las propiedades →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}