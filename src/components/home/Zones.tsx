'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const zones = [
  {
    slug: 'centro',
    name: 'Centro',
    description: 'Departamentos y locales comerciales en el corazón de la ciudad.',
    count: 12,
    image: '/images/zones/centro.jpg',
  },
  {
    slug: 'norte',
    name: 'Barrio Norte',
    description: 'Casas amplias con jardín en la zona residencial más buscada.',
    count: 8,
    image: '/images/zones/norte.jpg',
  },
  {
    slug: 'sur',
    name: 'Zona Sur',
    description: 'Terrenos y propiedades con excelente relación precio-calidad.',
    count: 15,
    image: '/images/zones/sur.jpg',
  },
  {
    slug: 'villa-nueva',
    name: 'Villa Nueva',
    description: 'Oportunidades de inversión cerca del centro comercial.',
    count: 6,
    image: '/images/zones/villa-nueva.jpg',
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
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={`/propiedades?zona=${zone.slug}`}
        className="group block relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] card-3d"
      >
        {/* Image placeholder — replace with next/image when you have zone photos */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${zone.image})` }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-white text-lg leading-tight">
                {zone.name}
              </h3>
              <p className="text-white/60 text-sm mt-1 line-clamp-2">
                {zone.description}
              </p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-white/10">
              {zone.count} prop.
            </span>
          </div>
        </div>

        {/* Hover arrow */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60 mb-3">
            Zonas
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text leading-tight">
            Propiedades por barrio en{' '}
            <span className="text-primary">Villa María</span>
          </h2>
          <p className="text-text-light mt-3 text-base sm:text-lg leading-relaxed">
            Explorá las mejores zonas de la ciudad. Cada barrio tiene su carácter
            — encontrá el que se ajuste a tu estilo de vida.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {zones.map((zone, i) => (
            <ZoneCard key={zone.slug} zone={zone} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}