'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

interface PropertyShareProps {
  slug: string
  title: string
}

export default function PropertyShare({ slug, title }: PropertyShareProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://julianlozita.com'
  const url = `${siteUrl}/propiedades/${slug}`

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copiado!')
    })
  }

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`Mirá esta propiedad: ${title}\n${url}`)}`,
      '_blank'
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={copyLink}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-text-light text-sm hover:bg-gray-50 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
        Copiar link
      </button>
      <button
        onClick={shareWhatsApp}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-text-light text-sm hover:bg-gray-50 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
        Compartir
      </button>
    </div>
  )
}
