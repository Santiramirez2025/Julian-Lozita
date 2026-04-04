'use client'

import { useEffect, useState } from 'react'

interface PropertyQRProps {
  slug: string
}

export default function PropertyQR({ slug }: PropertyQRProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://julianlozita.com'

  useEffect(() => {
    import('qrcode').then((QRCode) => {
      QRCode.toDataURL(`${siteUrl}/propiedades/${slug}`, {
        width: 200,
        margin: 2,
        color: { dark: '#1E3A5F', light: '#FFFFFF' },
        errorCorrectionLevel: 'H',
      }).then(setQrDataUrl)
    })
  }, [slug, siteUrl])

  if (!qrDataUrl) return null

  return (
    <div className="rounded-2xl border border-border p-6 bg-white text-center">
      <h3 className="font-heading font-bold text-text text-sm mb-3">Compartí esta propiedad</h3>
      <img src={qrDataUrl} alt="QR de la propiedad" className="mx-auto w-32 h-32" />
      <p className="text-xs text-text-light mt-2">Escaneá el QR con tu celular</p>
    </div>
  )
}
