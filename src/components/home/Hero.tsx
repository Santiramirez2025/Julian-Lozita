'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

// Unsplash images - free, no attribution required
const heroImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
]

export default function Hero() {
  const [query, setQuery] = useState('')
  const [currentImage, setCurrentImage] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/propiedades')
  }

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
      {/* Background images with crossfade */}
      {heroImages.map((src, index) => (
        <motion.div
          key={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentImage ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt="Propiedad en Villa María"
            fill
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
          />
        </motion.div>
      ))}

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/60 text-sm font-medium tracking-widest uppercase mb-4"
          >
            J-Lozita Inmobiliaria
          </motion.p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.08] mb-6">
            Encontrá tu próxima propiedad en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Villa María
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/50 mb-10 max-w-lg leading-relaxed">
            Escaneá el QR en nuestros carteles y conocé cada propiedad al instante. Fotos, datos, precio y contacto directo.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex items-center gap-0 bg-white/10 backdrop-blur-xl rounded-2xl p-1.5 border border-white/10 max-w-xl">
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por barrio, tipo de propiedad..."
                  className="w-full bg-transparent text-white placeholder:text-white/40 pl-12 pr-4 py-3 text-sm focus:outline-none"
                />
              </div>
              <Button type="submit" size="sm" className="shrink-0 rounded-xl">
                Buscar
              </Button>
            </div>
          </form>

          {/* Quick type links */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Casas', tipo: 'casa' },
              { label: 'Departamentos', tipo: 'departamento' },
              { label: 'Terrenos', tipo: 'terreno' },
            ].map((item) => (
              <Link
                key={item.tipo}
                href={`/propiedades?tipo=${item.tipo}`}
                className="px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 text-sm font-medium hover:bg-white/20 hover:text-white transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentImage ? 'w-8 bg-white' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 z-10 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-8 h-12 rounded-full border border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
