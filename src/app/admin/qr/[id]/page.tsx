'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import QRDownloader from '@/components/admin/QRDownloader'
import { Property } from '@/types'

export default function AdminQRPage() {
  const params = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [qrUrl, setQrUrl] = useState<string | null>(null)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://julianlozita.com'

  useEffect(() => {
    if (params.id) {
      fetch(`/api/propiedades/${params.id}`)
        .then((r) => r.json())
        .then((data) => {
          setProperty(data)
          // Generate QR client side for preview
          import('qrcode').then((QRCode) => {
            QRCode.toDataURL(`${siteUrl}/propiedades/${data.slug}`, {
              width: 400,
              margin: 2,
              color: { dark: '#1E3A5F', light: '#FFFFFF' },
              errorCorrectionLevel: 'H',
            }).then(setQrUrl)
          })
        })
    }
  }, [params.id, siteUrl])

  if (!property) {
    return <div className="text-center py-12 text-text-light">Cargando...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-extrabold text-text">QR de Propiedad</h1>
        <p className="text-text-light text-sm">{property.title}</p>
      </div>

      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-2xl border border-border p-8 mb-6">
          {qrUrl && (
            <img src={qrUrl} alt="QR de la propiedad" className="mx-auto w-64 h-64 mb-4" />
          )}
          <p className="text-sm text-text-light mb-1">Este QR apunta a:</p>
          <p className="text-sm font-mono text-primary break-all">
            {siteUrl}/propiedades/{property.slug}
          </p>
        </div>

        <QRDownloader
          propertyId={property.id}
          propertyTitle={property.title}
          slug={property.slug}
        />
      </div>
    </div>
  )
}
