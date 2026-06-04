'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const next = useCallback(
    () => setSelectedIndex((p) => (p === images.length - 1 ? 0 : p + 1)),
    [images.length],
  )
  const prev = useCallback(
    () => setSelectedIndex((p) => (p === 0 ? images.length - 1 : p - 1)),
    [images.length],
  )

  // Keyboard nav + body scroll lock cuando el lightbox está abierto
  useEffect(() => {
    if (!lightboxOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxOpen, next, prev])

  // Swipe horizontal en mobile dentro del lightbox.
  // Umbral de 50px en cualquier dirección dispara prev/next.
  const handleSwipe = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) next()
    else if (info.offset.x > 50) prev()
  }

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] md:aspect-[4/3] rounded-2xl bg-bg-dark flex items-center justify-center">
        <p className="text-white/40 text-sm">Sin imágenes</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-3">
        {/* ── Main image ── */}
        <div
          className="relative aspect-[3/4] md:aspect-[4/3] rounded-2xl overflow-hidden cursor-zoom-in shadow-lg shadow-black/5 bg-bg-dark group"
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={images[selectedIndex]}
                alt={`${title} - Foto ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={selectedIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom affordance (top-right, sutil, solo en hover) */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-black/60 backdrop-blur-sm rounded-full p-2 text-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </div>
          </div>

          {/* Counter (bottom-right) */}
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* "Ver todas las fotos" (bottom-left, solo si hay más de 5) */}
          {images.length > 5 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxOpen(true)
              }}
              className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm hover:bg-black/75 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Ver todas las fotos ({images.length})
            </button>
          )}
        </div>

        {/* ── Thumbnails ── */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-1 scroll-container">
            {images.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Ver foto ${index + 1}`}
                className={`relative aspect-square w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 snap-start transition-all ${
                  index === selectedIndex
                    ? 'ring-2 ring-primary'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox fullscreen ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center select-none"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close */}
            <button
              type="button"
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-20"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxOpen(false)
              }}
              aria-label="Cerrar"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Counter (top-center) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full z-20">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Flechas — desktop solamente; en mobile se usa swipe */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-20 hidden md:block"
                  onClick={(e) => {
                    e.stopPropagation()
                    prev()
                  }}
                  aria-label="Anterior"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-20 hidden md:block"
                  onClick={(e) => {
                    e.stopPropagation()
                    next()
                  }}
                  aria-label="Siguiente"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            {/* Imagen con swipe */}
            <motion.div
              className="relative w-[92vw] h-[80vh]"
              drag={images.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleSwipe}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[selectedIndex]}
                    alt={`${title} - Foto ${selectedIndex + 1}`}
                    fill
                    className="object-contain pointer-events-none"
                    sizes="92vw"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
