import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/ui/Toast'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'J-Lozita Inmobiliaria | Propiedades en Venta en Villa María, Córdoba',
    template: '%s | J-Lozita Villa María',
  },
  description:
    'Encontrá casas, departamentos y terrenos en venta en Villa María, Córdoba. Escaneá el QR en nuestros carteles y conocé cada propiedad al instante.',
  keywords: [
    'propiedades en venta villa maría',
    'casas en venta villa maría córdoba',
    'inmobiliaria villa maría',
    'terrenos villa maría',
    'departamentos villa maría',
  ],
  authors: [{ name: 'Julián Lozita' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://julianlozita.com',
    siteName: 'J-Lozita Inmobiliaria',
    title: 'J-Lozita Inmobiliaria | Propiedades en Venta en Villa María',
    description:
      'Encontrá casas, departamentos y terrenos en venta en Villa María, Córdoba.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://julianlozita.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'J-Lozita Inmobiliaria',
    description: 'Venta de propiedades en Villa María, Córdoba, Argentina.',
    url: 'https://julianlozita.com',
    areaServed: {
      '@type': 'City',
      name: 'Villa María',
      containedInPlace: { '@type': 'State', name: 'Córdoba' },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Villa María',
      addressRegion: 'Córdoba',
      addressCountry: 'AR',
    },
  }

  return (
    <html lang="es" className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
