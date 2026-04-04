import type { Metadata } from 'next'
import { Suspense } from 'react'
import PropiedadesClient from './PropiedadesClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://julianlozita.com'

export const metadata: Metadata = {
  title: 'Propiedades en Venta y Alquiler en Villa María | Julián Lozita Inmobiliaria',
  description:
    'Explorá casas, departamentos, terrenos y locales en Villa María, Córdoba. Filtros por zona, precio y tipo. Fotos reales, precios actualizados y contacto directo.',
  keywords: [
    'propiedades villa maría',
    'casas en venta villa maría',
    'departamentos villa maría',
    'terrenos villa maría',
    'alquiler villa maría',
    'inmobiliaria villa maría córdoba',
  ],
  openGraph: {
    title: 'Propiedades en Villa María | Julián Lozita Inmobiliaria',
    description:
      'Casas, departamentos, terrenos y locales en venta y alquiler en Villa María.',
    url: `${siteUrl}/propiedades`,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Propiedades en Villa María — Julián Lozita Inmobiliaria',
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/propiedades`,
  },
}

export default function PropiedadesPage() {
  return (
    <Suspense>
      <PropiedadesClient />
    </Suspense>
  )
}